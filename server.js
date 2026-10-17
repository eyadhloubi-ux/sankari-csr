'use strict';
/*
 * منصة لجنة المسؤولية المجتمعية - الخادم
 * يخدّم ملفات الموقع ويحفظ البيانات في مكان واحد مشترك لكل المستخدمين.
 * التخزين: Postgres إذا وُجد DATABASE_URL، وإلا ملف JSON داخل DATA_DIR.
 */
const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 10000;
const ROOT = __dirname;
const PUBLIC = ['/index.html', '/css/', '/js/', '/assets/'];
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const TOKEN_DAYS = 30;
const MAX_BODY = 25 * 1024 * 1024;

/* ---------- كلمات المرور ---------- */
const normD = s => String(s == null ? '' : s)
  .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).trim();
// التجزئة القديمة المستخدمة في النسخة التجريبية (تُرقّى تلقائياً عند أول دخول)
function fnv(s) { s = normD(s); let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0 } return 'h' + h.toString(16) }
function hashPw(pw) { const salt = crypto.randomBytes(16).toString('hex'); const k = crypto.scryptSync(normD(pw), salt, 64).toString('hex'); return 's$' + salt + '$' + k }
function checkPw(pw, stored) {
  if (!stored) return false;
  if (stored.startsWith('s$')) { const [, salt, k] = stored.split('$'); const t = crypto.scryptSync(normD(pw), salt, 64); const b = Buffer.from(k, 'hex'); return b.length === t.length && crypto.timingSafeEqual(b, t) }
  return fnv(pw) === stored;
}

/* ---------- الجلسات ---------- */
const sign = s => crypto.createHmac('sha256', SECRET).update(s).digest('base64url');
function makeToken(uid) { const body = Buffer.from(JSON.stringify({ u: uid, e: Date.now() + TOKEN_DAYS * 864e5 })).toString('base64url'); return body + '.' + sign(body) }
function readToken(t) {
  if (!t || t.indexOf('.') < 0) return null;
  const [body, sig] = t.split('.');
  const good = sign(body);
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  try { const o = JSON.parse(Buffer.from(body, 'base64url').toString()); return o.e > Date.now() ? o.u : null } catch (e) { return null }
}

/* ---------- التخزين ---------- */
let store;
async function makeStore() {
  if (process.env.DATABASE_URL) {
    const { Pool } = require('pg');
    const local = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL);
    const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: local ? false : { rejectUnauthorized: false } });
    await pool.query(`CREATE TABLE IF NOT EXISTS csr_store (id TEXT PRIMARY KEY, rev INTEGER NOT NULL, doc JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now());
      CREATE TABLE IF NOT EXISTS csr_backup (day DATE PRIMARY KEY, doc JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now());`);
    return {
      kind: 'postgres',
      async load() { const r = await pool.query('SELECT rev, doc FROM csr_store WHERE id=$1', ['main']); return r.rows[0] ? { rev: r.rows[0].rev, doc: r.rows[0].doc } : null },
      async save(rev, doc) {
        const j = JSON.stringify(doc);
        await pool.query(`INSERT INTO csr_store (id, rev, doc, updated_at) VALUES ('main', $1, $2::jsonb, now())
          ON CONFLICT (id) DO UPDATE SET rev=EXCLUDED.rev, doc=EXCLUDED.doc, updated_at=now()`, [rev, j]);
        await pool.query(`INSERT INTO csr_backup (day, doc, updated_at) VALUES (current_date, $1::jsonb, now())
          ON CONFLICT (day) DO UPDATE SET doc=EXCLUDED.doc, updated_at=now()`, [j]);
      }
    };
  }
  await fsp.mkdir(path.join(DATA_DIR, 'backups'), { recursive: true });
  const file = path.join(DATA_DIR, 'store.json');
  return {
    kind: 'file',
    async load() { try { return JSON.parse(await fsp.readFile(file, 'utf8')) } catch (e) { return null } },
    async save(rev, doc) {
      const j = JSON.stringify({ rev, doc });
      const tmp = file + '.tmp';
      await fsp.writeFile(tmp, j); await fsp.rename(tmp, file);
      await fsp.writeFile(path.join(DATA_DIR, 'backups', 'store-' + new Date().toISOString().slice(0, 10) + '.json'), j);
    }
  };
}

// نسخة في الذاكرة + قفل بسيط حتى لا تتداخل الكتابات
let state = null;
let lock = Promise.resolve();
const withLock = fn => { const p = lock.then(fn, fn); lock = p.catch(() => {}); return p };
async function getState() { if (!state) state = await store.load(); return state }
async function putState(doc) { const rev = ((state && state.rev) || 0) + 1; await store.save(rev, doc); state = { rev, doc }; return rev }

const strip = doc => Object.assign({}, doc, { users: (doc.users || []).map(u => { const c = Object.assign({}, u); delete c.pw; return c }) });

/* ---------- أدوات HTTP ---------- */
function send(res, code, obj) {
  const b = Buffer.from(JSON.stringify(obj));
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': b.length, 'Cache-Control': 'no-store' });
  res.end(b);
}
function readBody(req) {
  return new Promise((ok, bad) => {
    let n = 0; const parts = [];
    req.on('data', c => { n += c.length; if (n > MAX_BODY) { bad(Object.assign(new Error('too large'), { code: 413 })); req.destroy() } else parts.push(c) });
    req.on('end', () => { try { ok(parts.length ? JSON.parse(Buffer.concat(parts).toString('utf8')) : {}) } catch (e) { bad(Object.assign(e, { code: 400 })) } });
    req.on('error', bad);
  });
}
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
async function serveStatic(req, res) {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/' || !PUBLIC.some(x => p === x || (x.endsWith('/') && p.startsWith(x)))) p = '/index.html';
  let f = path.normalize(path.join(ROOT, p));
  if (!f.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end() }
  try { const st = await fsp.stat(f); if (!st.isFile()) f = path.join(ROOT, 'index.html') } catch (e) { f = path.join(ROOT, 'index.html') }
  try {
    const b = await fsp.readFile(f);
    const ext = path.extname(f);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': ['.html', '.js', '.css'].includes(ext) ? 'no-cache' : 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff' });
    res.end(b);
  } catch (e) { res.writeHead(404); res.end('Not found') }
}

/* ---------- واجهة البيانات ---------- */
async function api(req, res, route) {
  const auth = () => { const h = req.headers.authorization || ''; return readToken(h.replace(/^Bearer\s+/i, '')) };

  if (route === 'state' && req.method === 'GET') {
    const s = await getState();
    return send(res, 200, { initialized: !!s, storage: store.kind, durable: store.kind === 'postgres' || !!process.env.DATA_DIR || !process.env.RENDER });
  }

  // أول تشغيل فقط: رفع البيانات الموجودة على جهاز المسؤول أو البيانات الأولية
  if (route === 'bootstrap' && req.method === 'POST') {
    const body = await readBody(req);
    return withLock(async () => {
      if (await getState()) return send(res, 409, { error: 'already_initialized' });
      const doc = body && body.data;
      if (!doc || !Array.isArray(doc.users) || !doc.users.some(u => u.admin) || !Array.isArray(doc.projects)) return send(res, 400, { error: 'invalid_data' });
      const rev = await putState(doc);
      send(res, 200, { ok: true, rev });
    });
  }

  if (route === 'login' && req.method === 'POST') {
    const body = await readBody(req);
    return withLock(async () => {
      const s = await getState();
      if (!s) return send(res, 409, { error: 'not_initialized' });
      const login = normD(body.login).toLowerCase().replace(/\s+/g, '');
      const u = s.doc.users.find(x => x.login === login);
      if (!u || !checkPw(body.password, u.pw)) return send(res, 401, { error: 'bad_credentials' });
      if (!String(u.pw).startsWith('s$')) { u.pw = hashPw(body.password); await putState(s.doc) }
      send(res, 200, { token: makeToken(u.id), uid: u.id, must: !!u.must });
    });
  }

  const uid = auth();
  if (!uid) return send(res, 401, { error: 'unauthorized' });
  const s0 = await getState();
  const me = s0 && s0.doc.users.find(u => u.id === uid);
  if (!me) return send(res, 401, { error: 'unauthorized' });

  if (route === 'data' && req.method === 'GET') {
    const q = new URL(req.url, 'http://x').searchParams.get('rev');
    if (q && Number(q) === s0.rev) return send(res, 200, { rev: s0.rev, same: true });
    return send(res, 200, { rev: s0.rev, data: strip(s0.doc) });
  }

  if (route === 'data' && req.method === 'PUT') {
    const body = await readBody(req);
    return withLock(async () => {
      const s = await getState();
      if (Number(body.rev) !== s.rev) return send(res, 409, { rev: s.rev, data: strip(s.doc) });
      const doc = body.data;
      if (!doc || !Array.isArray(doc.users) || !Array.isArray(doc.projects)) return send(res, 400, { error: 'invalid_data' });
      const old = new Map(s.doc.users.map(u => [u.id, u]));
      if (me.admin) {
        // المسؤول يدير الحسابات: كلمة المرور تُحفظ فقط إذا أرسلها (حساب جديد أو كلمة مؤقتة)
        doc.users = doc.users.map(u => { const o = old.get(u.id); const c = Object.assign({}, u); if (!c.pw) c.pw = o ? o.pw : ''; return c });
        if (!doc.users.some(u => u.admin)) return send(res, 400, { error: 'no_admin' });
      } else {
        // غير المسؤول لا يغيّر الحسابات ولا الصلاحيات
        doc.users = s.doc.users;
        doc.perm = s.doc.perm;
      }
      const rev = await putState(doc);
      send(res, 200, { rev });
    });
  }

  if (route === 'password' && req.method === 'POST') {
    const body = await readBody(req);
    const pw = normD(body.password);
    if (pw.length < 6) return send(res, 400, { error: 'short' });
    return withLock(async () => {
      const s = await getState();
      const u = s.doc.users.find(x => x.id === uid);
      u.pw = hashPw(pw); u.must = false;
      const rev = await putState(s.doc);
      send(res, 200, { rev });
    });
  }

  send(res, 404, { error: 'not_found' });
}

/* ---------- التشغيل ---------- */
(async () => {
  store = await makeStore();
  await getState();
  http.createServer(async (req, res) => {
    try {
      const p = new URL(req.url, 'http://x').pathname;
      if (p === '/healthz') return send(res, 200, { ok: true });
      if (p.startsWith('/api/')) return await api(req, res, p.slice(5).replace(/\/$/, ''));
      if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end() }
      await serveStatic(req, res);
    } catch (e) {
      console.error(e);
      if (!res.headersSent) send(res, e.code === 413 ? 413 : e.code === 400 ? 400 : 500, { error: 'server_error' });
    }
  }).listen(PORT, () => {
    console.log(`CSR platform on :${PORT} · storage: ${store.kind}`);
    if (store.kind === 'file' && process.env.RENDER && !process.env.DATA_DIR) console.warn('WARNING: no DATABASE_URL set. Data is stored on the temporary disk and WILL BE LOST on restart/deploy. Set DATABASE_URL.');
  });
})().catch(e => { console.error('Startup failed:', e); process.exit(1) });
