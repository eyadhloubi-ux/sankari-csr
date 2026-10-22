'use strict';
/*
 * طبقة التخزين في PostgreSQL (بعد الترحيلات 001 و 002)
 *   csr_store  (id='main')  المستند بلا الحسابات + rev
 *   csr_users               الحسابات، كل حساب صف (مع تجزئة كلمة المرور)
 *   csr_backup              نسخة يومية من المستند الكامل (مع الحسابات)
 * الخادم يرى مستنداً واحداً {users, projects, ...} كما كان؛ هذه الطبقة تفصل الحسابات وتجمعها.
 */
const { Pool } = require('pg');

const BACKUP_EVERY_MS = 60 * 60 * 1000;
const BACKUP_KEEP_DAYS = 30;
const USER_COLS = ['id', 'login', 'name', 'role', 'admin', 'must', 'pw'];

// sslmode في الرابط هو الذي يقرّر التشفير (sslmode=require لـNeon وأمثاله، وبلا sslmode لقاعدة محلية)
function makePool(url, { max } = {}) {
  const pool = new Pool({ connectionString: url, max: max || Number(process.env.PG_POOL_MAX) || 3, idleTimeoutMillis: 10000, connectionTimeoutMillis: 15000 });
  // اتصال خامل قطعه الخادم (إعادة تشغيل القاعدة، أو نوم Neon) لا يجوز أن يُسقط العملية
  pool.on('error', e => console.warn('pg idle client error:', e.message));
  return pool;
}

const userRow = (u, i) => {
  const extra = Object.assign({}, u); USER_COLS.forEach(k => delete extra[k]);
  return [String(u.id), i, String(u.login || ''), String(u.name || ''), u.role == null ? null : String(u.role), !!u.admin, !!u.must, String(u.pw || ''), JSON.stringify(extra)];
};
const rowUser = r => {
  const u = Object.assign({ id: r.id, login: r.login, name: r.name }, r.role == null ? {} : { role: r.role }, { admin: r.admin, must: r.must, pw: r.pw }, r.extra || {});
  return u;
};

async function readAll(q) {
  const s = await q("SELECT rev, doc, updated_at FROM csr_store WHERE id='main'");
  if (!s.rows[0]) return null;
  const users = (await q('SELECT * FROM csr_users ORDER BY ord, id')).rows.map(rowUser);
  return { rev: s.rows[0].rev, doc: Object.assign({}, s.rows[0].doc, { users }), updated_at: s.rows[0].updated_at };
}

// كتابة المستند كاملاً داخل معاملة واحدة؛ seen = بصمات آخر كتابة للحسابات (لتخطّي ما لم يتغيّر)
async function writeAll(c, rev, doc, seen) {
  const users = doc.users || [];
  const rest = Object.assign({}, doc); delete rest.users;
  await c.query(`INSERT INTO csr_store (id, rev, doc, updated_at) VALUES ('main', $1, $2::jsonb, now())
    ON CONFLICT (id) DO UPDATE SET rev=EXCLUDED.rev, doc=EXCLUDED.doc, updated_at=now()`, [rev, JSON.stringify(rest)]);
  const next = new Map();
  for (let i = 0; i < users.length; i++) {
    const row = userRow(users[i], i), sig = JSON.stringify(row);
    next.set(row[0], sig);
    if (seen && seen.get(row[0]) === sig) continue;
    await c.query(`INSERT INTO csr_users (id, ord, login, name, role, admin, must, pw, extra, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET ord=EXCLUDED.ord, login=EXCLUDED.login, name=EXCLUDED.name, role=EXCLUDED.role,
        admin=EXCLUDED.admin, must=EXCLUDED.must, pw=EXCLUDED.pw, extra=EXCLUDED.extra, updated_at=now()`, row);
  }
  await c.query('DELETE FROM csr_users WHERE NOT (id = ANY($1::text[]))', [[...next.keys()]]);
  return next;
}

async function tx(pool, fn) {
  const c = await pool.connect();
  try { await c.query('BEGIN'); const r = await fn(c); await c.query('COMMIT'); return r }
  catch (e) { await c.query('ROLLBACK').catch(() => {}); throw e }
  finally { c.release() }
}

function createPgStore(pool) {
  let seen = null, lastBackup = 0, lastPrune = '';
  return {
    kind: 'postgres',
    pool,
    async load() {
      const r = await readAll((t, p) => pool.query(t, p));
      if (r) seen = new Map(r.doc.users.map((u, i) => { const row = userRow(u, i); return [row[0], JSON.stringify(row)] }));
      return r && { rev: r.rev, doc: r.doc };
    },
    async save(rev, doc) {
      try { seen = await tx(pool, c => writeAll(c, rev, doc, seen)) }
      catch (e) { seen = null; throw e } // بعد فشل لا نثق بالبصمات: الكتابة التالية تكتب كل الحسابات
      // النسخة اليومية مرة كل ساعة على الأكثر، وحذف ما مضى عليه أكثر من 30 يوماً مرة في اليوم
      const now = Date.now(), today = new Date(now).toISOString().slice(0, 10);
      if (now - lastBackup < BACKUP_EVERY_MS && today === new Date(lastBackup).toISOString().slice(0, 10)) return;
      lastBackup = now;
      try {
        await pool.query(`INSERT INTO csr_backup (day, doc, updated_at) VALUES (current_date, $1::jsonb, now())
          ON CONFLICT (day) DO UPDATE SET doc=EXCLUDED.doc, updated_at=now()`, [JSON.stringify(doc)]);
        if (lastPrune !== today) { lastPrune = today; await pool.query('DELETE FROM csr_backup WHERE day < current_date - $1::int', [BACKUP_KEEP_DAYS]) }
      } catch (e) { console.warn('backup failed:', e.message) }
    }
  };
}

module.exports = { makePool, createPgStore, readAll, writeAll, tx };
