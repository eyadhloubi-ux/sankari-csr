'use strict';
/*
 * مشغّل ترحيلات SQL المرقّمة (migrations/NNN_name.sql)
 * - يطبّق الملفات الناقصة بالترتيب، كل ملف داخل معاملة (transaction) مستقلة.
 * - يسجّل ما طُبّق في الجدول schema_migrations مع بصمة الملف (checksum)،
 *   ويرفض العمل إذا تغيّر ملف طُبّق سابقاً: التعديل يكون دائماً بملف ترحيل جديد.
 * - قفل pg_advisory_lock يمنع تشغيلين متزامنين (نشر + إعادة تشغيل في اللحظة نفسها).
 *
 * من سطر الأوامر (يقرأ DATABASE_URL):
 *   npm run migrate            تطبيق الناقص
 *   npm run migrate:status     عرض المطبَّق والناقص دون تغيير
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DIR = path.join(__dirname, '..', 'migrations');
const LOCK_ID = 7352001; // رقم ثابت خاص بهذه المنصة للقفل

function listFiles(dir = DIR) {
  return fs.readdirSync(dir).filter(f => /^\d{3,}_[\w-]+\.sql$/.test(f)).sort().map(f => {
    // توحيد نهايات الأسطر قبل البصمة حتى لا يختلف الملف بين ويندوز ولينكس
    const sql = fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r\n/g, '\n');
    return { version: f.split('_')[0], name: f, sql, checksum: crypto.createHash('sha256').update(sql).digest('hex') };
  });
}

async function withClient(pool, fn) {
  const c = await pool.connect();
  try {
    await c.query('SELECT pg_advisory_lock($1)', [LOCK_ID]);
    try {
      await c.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
        version TEXT PRIMARY KEY, name TEXT NOT NULL, checksum TEXT NOT NULL, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
      return await fn(c);
    } finally { await c.query('SELECT pg_advisory_unlock($1)', [LOCK_ID]).catch(() => {}) }
  } finally { c.release() }
}

async function readState(c, dir) {
  const files = listFiles(dir);
  const applied = new Map((await c.query('SELECT version, name, checksum, applied_at FROM schema_migrations ORDER BY version')).rows.map(r => [r.version, r]));
  for (const f of files) {
    const a = applied.get(f.version);
    if (a && a.checksum !== f.checksum) throw new Error(`migration ${f.name} was changed after it was applied. Never edit an applied migration: add a new file instead.`);
  }
  return { files, applied, pending: files.filter(f => !applied.has(f.version)) };
}

// يطبّق الناقص ويعيد { applied: [أسماء ما طُبّق الآن], version: آخر رقم }
async function migrate(pool, { dir, log = () => {} } = {}) {
  return withClient(pool, async c => {
    const st = await readState(c, dir);
    const done = [];
    for (const f of st.pending) {
      try {
        await c.query('BEGIN');
        await c.query(f.sql);
        await c.query('INSERT INTO schema_migrations (version, name, checksum) VALUES ($1, $2, $3)', [f.version, f.name, f.checksum]);
        await c.query('COMMIT');
      } catch (e) {
        await c.query('ROLLBACK').catch(() => {});
        throw new Error(`migration ${f.name} failed (nothing from it was applied): ${e.message}`);
      }
      done.push(f.name); log('migration applied: ' + f.name);
    }
    const last = st.files.length ? st.files[st.files.length - 1].version : '000';
    return { applied: done, version: last };
  });
}

async function status(pool, { dir } = {}) {
  return withClient(pool, c => readState(c, dir));
}

module.exports = { migrate, status, listFiles };

if (require.main === module) {
  const { makePool } = require('./store-pg');
  const url = process.env.DATABASE_URL;
  if (!url) { console.error('DATABASE_URL is not set'); process.exit(1) }
  const pool = makePool(url, { max: 1 });
  (async () => {
    if (process.argv.includes('--status')) {
      const st = await status(pool);
      for (const f of st.files) console.log((st.applied.has(f.version) ? '  applied  ' : '  PENDING  ') + f.name);
      console.log(st.pending.length ? st.pending.length + ' pending' : 'up to date');
    } else {
      const r = await migrate(pool, { log: console.log });
      console.log(r.applied.length ? `done: ${r.applied.length} applied, schema ${r.version}` : `up to date (schema ${r.version})`);
    }
  })().catch(e => { console.error('FAILED: ' + e.message); process.exitCode = 1 }).finally(() => pool.end());
}
