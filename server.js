'use strict';
/*
 * منصة لجنة المسؤولية المجتمعية - الخادم
 * يخدّم ملفات الموقع ويحفظ البيانات في مكان واحد مشترك لكل المستخدمين.
 * التخزين: PostgreSQL إذا وُجد DATABASE_URL (الجداول بترحيلات SQL مرقّمة في migrations/ تُطبَّق
 * عند التشغيل، وطبقة التخزين في db/store-pg.js)، وإلا ملف JSON داخل DATA_DIR (للتطوير المحلي).
 * الاستهلاك: الملفات الثابتة تُقرأ وتُضغط مرة واحدة عند التشغيل وتُخدَّم بـETag (304)، وردود JSON تُضغط gzip.
 */
const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');
const zlib = require('zlib');
const { makePush } = require('./lib/push');
const { tick, fresh, noteIds } = require('./lib/meetings');

const PORT = Number(process.env.PORT) || 10000;
const ROOT = __dirname;
const PUBLIC = ['/index.html', '/sw.js', '/manifest.webmanifest', '/css/', '/js/', '/assets/'];
const NO_CACHE = ['/index.html', '/sw.js', '/manifest.webmanifest'];
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
// تجديد تلقائي: إذا بقي على الرمز أقل من 25 يوماً يُعطى رمزاً جديداً، فمن يفتح المنصة (أو التطبيق) ولو مرة في الشهر لا يخرج من حسابه
function tokenLeft(t) { try { return JSON.parse(Buffer.from(String(t).split('.')[0], 'base64url').toString()).e - Date.now() } catch (e) { return 0 } }

/* ---------- التخزين ---------- */
let store, schema = '';
async function makeStore() {
  if (process.env.DATABASE_URL) {
    const { makePool, createPgStore } = require('./db/store-pg');
    const { migrate, status } = require('./db/migrate');
    const pool = makePool(process.env.DATABASE_URL);
    // الترحيلات تُطبَّق تلقائياً عند التشغيل (آمن مع أكثر من تشغيل بفضل القفل). إن كان خط النشر (CI/CD)
    // يشغّل npm run migrate بنفسه فاضبط MIGRATE_ON_START=false، وعندها يرفض الخادم العمل على مخطط ناقص.
    if (process.env.MIGRATE_ON_START === 'false') {
      const st = await status(pool);
      if (st.pending.length) throw new Error('database schema is not up to date, run: npm run migrate (pending: ' + st.pending.map(f => f.name).join(', ') + ')');
      schema = st.files.length ? st.files[st.files.length - 1].version : '000';
    } else schema = (await migrate(pool, { log: console.log })).version;
    return createPgStore(pool);
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
    },
    // إشعارات الجهاز في وضع الملف: data/push.json
    ...filePush(path.join(DATA_DIR, 'push.json'))
  };
}

function filePush(file) {
  let mem = null;
  const load = async () => { if (!mem) { try { mem = JSON.parse(await fsp.readFile(file, 'utf8')) } catch (e) { mem = { kv: {}, subs: [] } } } return mem };
  const flush = async () => { const tmp = file + '.tmp'; await fsp.writeFile(tmp, JSON.stringify(mem)); await fsp.rename(tmp, file) };
  return {
    async kvGet(k) { const m = await load(); return k in m.kv ? m.kv[k] : null },
    async kvSet(k, v) { const m = await load(); m.kv[k] = v; await flush() },
    async subAdd(uid, sub, ua) { const m = await load(); m.subs = m.subs.filter(x => x.sub.endpoint !== sub.endpoint); m.subs.push({ uid, sub, ua: String(ua || '').slice(0, 200) }); await flush() },
    async subDel(endpoint) { const m = await load(); m.subs = m.subs.filter(x => x.sub.endpoint !== endpoint); await flush() },
    async subsOf(uids) { const m = await load(); return m.subs.filter(x => uids.includes(x.uid)) }
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
const gzipOk = req => /\bgzip\b/.test(req.headers['accept-encoding'] || '');
function send(res, code, obj) {
  let b = Buffer.from(JSON.stringify(obj));
  const h = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Vary': 'Accept-Encoding' };
  // المستند الكامل (مع الصور) هو أثقل ما يخرج من الخادم؛ الضغط يقلّصه عدة أضعاف
  if (b.length > 1024 && res.req && gzipOk(res.req)) { b = zlib.gzipSync(b, { level: 6 }); h['Content-Encoding'] = 'gzip' }
  h['Content-Length'] = b.length;
  res.writeHead(code, h);
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
const ZIP_EXT = ['.html', '.css', '.js', '.svg', '.json', '.webmanifest'];

// الملفات الثابتة في الذاكرة: تُقرأ وتُضغط مرة واحدة، ولكل ملف ETag
const files = new Map();
async function loadStatic() {
  const walk = async rel => {
    const abs = path.join(ROOT, rel);
    let st; try { st = await fsp.stat(abs) } catch (e) { return }
    if (st.isDirectory()) { for (const n of await fsp.readdir(abs)) await walk(rel + '/' + n); return }
    const body = await fsp.readFile(abs), ext = path.extname(abs);
    files.set(rel, { body, gz: ZIP_EXT.includes(ext) ? zlib.gzipSync(body, { level: 9 }) : null, type: MIME[ext] || 'application/octet-stream', etag: '"' + crypto.createHash('sha1').update(body).digest('base64url').slice(0, 20) + '"' });
  };
  for (const x of PUBLIC) await walk(x.replace(/\/$/, ''));
}
function serveStatic(req, res) {
  const u = new URL(req.url, 'http://x');
  let p; try { p = decodeURIComponent(u.pathname) } catch (e) { p = '/' }
  if (p === '/' || !PUBLIC.some(x => p === x || (x.endsWith('/') && p.startsWith(x)))) p = '/index.html';
  let f = files.get(p);
  if (!f) { if (p.startsWith('/index.html') || !path.extname(p)) f = files.get('/index.html'); else { res.writeHead(404); return res.end('Not found') } }
  // ملف برقم إصدار (?v=N) لا يتغيّر أبداً ⇒ يُخزَّن في المتصفح سنة؛ غيره يُتحقَّق منه بـETag (رد 304 بلا جسم)
  const cache = NO_CACHE.includes(p) ? 'no-cache' : u.searchParams.has('v') ? 'public, max-age=31536000, immutable' : 'public, max-age=86400';
  const h = { 'Content-Type': f.type, 'Cache-Control': cache, 'ETag': f.etag, 'Vary': 'Accept-Encoding', 'X-Content-Type-Options': 'nosniff' };
  if (req.headers['if-none-match'] === f.etag) { res.writeHead(304, h); return res.end() }
  let b = f.body;
  if (f.gz && gzipOk(req)) { b = f.gz; h['Content-Encoding'] = 'gzip' }
  h['Content-Length'] = b.length;
  res.writeHead(200, h);
  res.end(req.method === 'HEAD' ? undefined : b);
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
      doc.roles2 = 1; // بيانات جديدة: أدوارها بالتسمية الحالية (لا تحتاج تحويل «مراقب» القديم)
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
    const tok = req.headers.authorization.replace(/^Bearer\s+/i, ''), extra = tokenLeft(tok) < 25 * 864e5 ? { token: makeToken(uid) } : {};
    if (q && Number(q) === s0.rev) return send(res, 200, Object.assign({ rev: s0.rev, same: true }, extra));
    return send(res, 200, Object.assign({ rev: s0.rev, data: strip(s0.doc) }, extra));
  }

  if (route === 'data' && req.method === 'PUT') {
    const body = await readBody(req);
    return withLock(async () => {
      const s = await getState();
      if (Number(body.rev) !== s.rev) return send(res, 409, { rev: s.rev, data: strip(s.doc) });
      let doc = body.data;
      if (!doc || !Array.isArray(doc.users) || !Array.isArray(doc.projects)) return send(res, 400, { error: 'invalid_data' });
      if (!me.admin && me.role === 'observer') doc = observerDoc(s.doc, doc, uid);
      if (s.doc.roles2) doc.roles2 = s.doc.roles2;
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
      const before = noteIds(s.doc);
      const rev = await putState(doc);
      send(res, 200, { rev });
      pushNotes(fresh(before, doc, Date.now()));
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

  // إشعارات الجهاز
  if (route === 'push/key' && req.method === 'GET') return send(res, 200, { key: push ? push.key() : null });
  if (route === 'push/sub' && req.method === 'POST') {
    const b = await readBody(req), sub = b && b.sub;
    if (!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint) || !sub.keys || !sub.keys.p256dh || !sub.keys.auth) return send(res, 400, { error: 'invalid_sub' });
    await store.subAdd(uid, { endpoint: sub.endpoint, keys: { p256dh: String(sub.keys.p256dh), auth: String(sub.keys.auth) } }, req.headers['user-agent']);
    return send(res, 200, { ok: true });
  }
  if (route === 'push/unsub' && req.method === 'POST') {
    const b = await readBody(req);
    if (b && b.endpoint) await store.subDel(String(b.endpoint));
    return send(res, 200, { ok: true });
  }
  if (route === 'push/test' && req.method === 'POST') {
    if (!push) return send(res, 200, { sent: 0 });
    const n = await push.send([uid], { t: 'الإشعارات تعمل', b: 'ستصلك هنا الدعوات والتذكيرات والرسائل', u: '/#notes', tag: 'test' });
    return send(res, 200, { sent: n });
  }

  send(res, 404, { error: 'not_found' });
}

/* ---------- المراقب: اطلاع فقط ----------
 * يُقبل منه فقط: روابط المشروع التي أضافها هو (إضافة/تعديل/حذف)، وحالة القراءة الخاصة به، والإشعارات والأحداث،
 * ورده على دعوات الاجتماعات. كل ما عدا ذلك يبقى كما هو على الخادم. */
function observerDoc(cur, inc, uid) {
  const out = JSON.parse(JSON.stringify(cur));
  const ip = new Map((inc.projects || []).filter(Boolean).map(p => [p.id, p]));
  (out.projects || []).forEach(p => {
    const q = ip.get(p.id); if (!q) return;
    const sv = Array.isArray(p.links) ? p.links : [], cl = (Array.isArray(q.links) ? q.links : []).filter(l => l && l.by === uid);
    p.links = sv.filter(l => !l || l.by !== uid || cl.some(x => x.id === l.id)).map(l => l && l.by === uid ? cl.find(x => x.id === l.id) : l)
      .concat(cl.filter(x => !sv.some(l => l && l.id === x.id)));
  });
  out.seen = Object.assign({}, out.seen || {}); if (inc.seen && inc.seen[uid]) out.seen[uid] = inc.seen[uid];
  if (Array.isArray(inc.notes)) out.notes = inc.notes;
  if (Array.isArray(inc.events)) out.events = inc.events;
  const im = new Map((inc.meetings || []).filter(Boolean).map(m => [m.id, m]));
  (out.meetings || []).forEach(m => { const q = im.get(m.id); if (q && q.rsvp && q.rsvp[uid] && (m.inv || []).includes(uid)) m.rsvp = Object.assign({}, m.rsvp, { [uid]: q.rsvp[uid] }) });
  return out;
}
// مرة واحدة: دور «مراقب» القديم كان المتدرب، فيصبح «متدرب»؛ وصار «مراقب» دوراً جديداً للاطلاع فقط
function migrateRoles() {
  return withLock(async () => {
    const s = await getState();
    if (!s || !s.doc || s.doc.roles2) return;
    const doc = JSON.parse(JSON.stringify(s.doc)); let n = 0;
    (doc.users || []).forEach(u => { if (u.role === 'observer') { u.role = 'trainee'; n++ } });
    doc.roles2 = 1; await putState(doc);
    console.log('roles: ' + n + ' observer account(s) are now trainee');
  });
}

/* ---------- الإشعارات والاجتماعات ---------- */
let push = null;
function pushNotes(list) {
  if (!push || !list.length) return;
  for (const n of list) {
    const to = n.to.filter(u => u && u !== n.by);
    if (to.length) push.send(to, { t: String(n.t || 'إشعار جديد').slice(0, 120), b: String(n.b || '').slice(0, 240), u: '/#n-' + n.id, tag: n.id }).catch(e => console.warn('push:', e.message));
  }
}
// كل دقيقة: تذكيرات الاجتماعات والجلسة التالية للاجتماع الدوري
function meetingTick() {
  return withLock(async () => {
    const s = await getState();
    if (!s || !s.doc) return;
    const doc = JSON.parse(JSON.stringify(s.doc)), now = Date.now(), before = noteIds(s.doc);
    if (!tick(doc, now)) return;
    await putState(doc);
    pushNotes(fresh(before, doc, now));
  }).catch(e => console.warn('meeting tick failed:', e.message));
}

/* ---------- التشغيل ---------- */
(async () => {
  await loadStatic();
  store = await makeStore();
  await getState();
  await migrateRoles();
  push = makePush(store);
  try { await push.init() } catch (e) { push = null; console.warn('push disabled:', e.message) }
  setInterval(meetingTick, Number(process.env.TICK_MS) || 60000).unref();
  setTimeout(meetingTick, 5000).unref();
  const server = http.createServer(async (req, res) => {
    try {
      const p = new URL(req.url, 'http://x').pathname;
      if (p === '/healthz') return send(res, 200, { ok: true });
      if (p.startsWith('/api/')) return await api(req, res, p.slice(5).replace(/\/$/, ''));
      if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end() }
      serveStatic(req, res);
    } catch (e) {
      console.error(e);
      if (!res.headersSent) send(res, e.code === 413 ? 413 : e.code === 400 ? 400 : 500, { error: 'server_error' });
    }
  }).listen(PORT, () => {
    console.log(`CSR platform on :${PORT} · storage: ${store.kind}` + (schema ? ` · schema ${schema}` : '') + (push ? ' · push on' : ''));
    if (store.kind === 'file' && process.env.NODE_ENV === 'production') console.warn('WARNING: production without DATABASE_URL. Data is kept in ' + DATA_DIR + ' only; a deploy that replaces the app folder will delete it. Set DATABASE_URL.');
    if (store.kind === 'file' && process.env.RENDER && !process.env.DATA_DIR) console.warn('WARNING: no DATABASE_URL set. Data is stored on the temporary disk and WILL BE LOST on restart/deploy. Set DATABASE_URL.');
    if (!process.env.SESSION_SECRET) console.warn('WARNING: no SESSION_SECRET set. Everyone will be logged out on every restart.');
  });
  // Render يرسل SIGTERM عند النوم وعند كل نشر: ننهي الطلبات الجارية (والكتابة على القاعدة) ثم نغلق
  process.on('SIGTERM', () => {
    server.close(() => withLock(async () => { if (store.pool) await store.pool.end().catch(() => {}) }).then(() => process.exit(0)));
    setTimeout(() => process.exit(0), 8000).unref();
  });
})().catch(e => { console.error('Startup failed:', e); process.exit(1) });
