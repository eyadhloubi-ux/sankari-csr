'use strict';
/*
 * فحص قبل كل نشر: npm run check
 * 1. وضع الملف: الخادم بتخزين ملف مؤقت — الصحة · الملفات والضغط و304 · التهيئة والدخول · الحفظ والتعارض
 *    · الصلاحيات · تغيير كلمة المرور · منع الوصول لملفات الخادم · بقاء البيانات بعد إعادة التشغيل.
 * 2. وضع PostgreSQL (قاعدة PGlite حقيقية في الذاكرة عبر بروتوكول Postgres، من devDependencies):
 *    الفحوص نفسها + الترحيلات (قاعدة جديدة · قاعدة قديمة من النسخة 1.x · ملف ترحيل معدَّل · MIGRATE_ON_START=false)
 *    + استيراد store.json وتصديره.
 * إن لم تكن devDependencies مثبّتة (npm ci --omit=dev) يُتخطّى القسم 2 مع تنبيه.
 */
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const http = require('http');

const ROOT = path.join(__dirname, '..');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'csr-smoke-'));
let pass = 0, fail = 0, port = 4900 + Math.floor(Math.random() * 400);
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m) } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

// نفس التجزئة القديمة في server.js (حساب أولي يُرقّى عند أول دخول)
function fnv(s) { s = String(s).trim(); let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0 } return 'h' + h.toString(16) }
const seedDoc = () => ({ v: 7, users: [{ id: 'u1', login: 'eyad', name: 'إياد', admin: true, must: true, pw: fnv('admin1234') }, { id: 'u2', login: 'm', name: 'عضو', role: 'member', pw: fnv('member123') }], projects: [], events: [], seen: {}, perm: {}, committee: { sections: [] } });

function baseEnv(extra) {
  const env = Object.assign({}, process.env, { SESSION_SECRET: 'smoke-secret', PG_POOL_MAX: '1' }, extra);
  for (const k of ['DATABASE_URL', 'RENDER', 'MIGRATE_ON_START', 'NODE_ENV']) if (!(extra && k in extra)) delete env[k];
  return env;
}
// غير متزامن عمداً: قاعدة PGlite تعمل داخل هذه العملية، وأمر متزامن يجمّدها فلا تردّ
function run(script, args, env) {
  return new Promise(res => {
    const c = spawn(process.execPath, [path.join(ROOT, script)].concat(args), { env, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = ''; c.stdout.on('data', d => out += d); c.stderr.on('data', d => out += d);
    c.on('close', code => res({ code, out }));
  });
}
async function startServer(env) {
  const p = ++port, base = 'http://127.0.0.1:' + p;
  const srv = spawn(process.execPath, [path.join(ROOT, 'server.js')], { env: Object.assign({}, env, { PORT: String(p) }), stdio: ['ignore', 'pipe', 'pipe'] });
  const s = { srv, base, log: '', exited: null };
  srv.stdout.on('data', d => s.log += d); srv.stderr.on('data', d => s.log += d); srv.on('exit', c => s.exited = c);
  for (let i = 0; i < 100 && s.exited === null; i++) { try { if ((await fetch(base + '/healthz')).ok) break } catch (e) {} await sleep(100) }
  s.req = async (method, pth, body, headers) => {
    const r = await fetch(base + pth, { method, headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {}), body: body ? JSON.stringify(body) : undefined });
    let j = null; const t = await r.text(); try { j = JSON.parse(t) } catch (e) {}
    return { status: r.status, h: r.headers, j, t };
  };
  s.stop = () => new Promise(r => { if (s.exited !== null) return r(); srv.on('exit', () => r()); srv.kill() });
  return s;
}

// الفحوص المشتركة بين الوضعين؛ kind = 'file' | 'postgres'
async function apiSuite(env, kind, tag) {
  let S = await startServer(env);
  const req = S.req, T = m => tag + ': ' + m;
  try {
    ok((await req('GET', '/healthz')).status === 200, T('healthz'));
    if (kind === 'file') {
      // الملفات الثابتة (مرة واحدة تكفي، لا تتعلق بالتخزين)
      const raw = await new Promise((res, rej) => http.get(S.base + '/', { headers: { 'Accept-Encoding': 'gzip' } }, r => { const c = []; r.on('data', x => c.push(x)); r.on('end', () => res({ r, b: Buffer.concat(c) })) }).on('error', rej));
      ok(raw.r.statusCode === 200 && raw.r.headers['content-encoding'] === 'gzip', 'index gzip');
      ok(/<html/.test(zlib.gunzipSync(raw.b).toString()), 'index gunzip content');
      ok(raw.r.headers['cache-control'] === 'no-cache' && !!raw.r.headers.etag, 'index no-cache + etag');
      ok((await fetch(S.base + '/', { headers: { 'If-None-Match': raw.r.headers.etag } })).status === 304, 'index 304');
      const js = await fetch(S.base + '/js/app.js?v=12');
      ok(js.status === 200 && /immutable/.test(js.headers.get('cache-control')), 'versioned js immutable');
      ok((await fetch(S.base + '/assets/logo-mark.png')).headers.get('content-type') === 'image/png', 'png');
      ok((await fetch(S.base + '/css/nope.css')).status === 404, 'missing asset 404');
      for (const leak of ['/css/..%2fserver.js', '/db/store-pg.js', '/migrations/001_core.sql', '/package.json'])
        ok(!/require\(|CREATE TABLE|"dependencies"/.test(await (await fetch(S.base + leak)).text()), 'no server file leak: ' + leak);
      ok(/<html/.test(await (await fetch(S.base + '/some/route')).text()), 'spa fallback');
    }

    // التهيئة والدخول
    const s = await req('GET', '/api/state');
    ok(s.status === 200 && s.j.initialized === false && s.j.storage === kind, T('state uninit'));
    ok((await req('POST', '/api/bootstrap', { data: seedDoc() })).status === 200, T('bootstrap'));
    ok((await req('POST', '/api/bootstrap', { data: seedDoc() })).status === 409, T('bootstrap twice refused'));
    ok((await req('POST', '/api/login', { login: 'eyad', password: 'wrong' })).status === 401, T('bad password'));
    const L = await req('POST', '/api/login', { login: 'Eyad', password: 'admin١٢٣٤' });
    ok(L.status === 200 && L.j.token && L.j.must === true, T('login (arabic digits)'));
    const H = { Authorization: 'Bearer ' + L.j.token };
    ok((await req('GET', '/api/data', null, { Authorization: 'Bearer x.y' })).status === 401, T('bad token'));

    // البيانات: قراءة · لا تغيير · حفظ · تعارض · كلمات المرور لا تخرج
    const d = await req('GET', '/api/data', null, H);
    ok(d.status === 200 && d.j.data.users.length === 2 && d.j.data.users.every(u => !('pw' in u)), T('data without pw'));
    const rev = d.j.rev;
    ok((await req('GET', '/api/data?rev=' + rev, null, H)).j.same === true, T('same rev'));
    const big = Object.assign({}, d.j.data, { projects: [{ id: 'p1', name: 'مشروع «تجربة» & \'اقتباس\'', img: 'data:image/jpeg;base64,' + 'A'.repeat(200000), requests: [{ id: 'r1', msgs: [{ id: 'c1', u: 'u1', at: 1, t: 'مرحبا' }] }] }] });
    const P = await req('PUT', '/api/data', { rev, data: big }, H);
    ok(P.status === 200 && P.j.rev === rev + 1, T('put'));
    ok((await req('PUT', '/api/data', { rev, data: big }, H)).status === 409, T('stale put 409'));
    const gz = await fetch(S.base + '/api/data', { headers: Object.assign({ 'Accept-Encoding': 'gzip' }, H) });
    ok(gz.headers.get('content-encoding') === 'gzip', T('data gzip'));
    ok((await req('POST', '/api/login', { login: 'eyad', password: 'admin1234' })).status === 200, T('login after pw upgrade'));

    // غير المسؤول لا يغيّر الحسابات؛ المسؤول يضيف حساباً
    const M = await req('POST', '/api/login', { login: 'm', password: 'member123' });
    const MH = { Authorization: 'Bearer ' + M.j.token };
    const md = await req('GET', '/api/data', null, MH);
    const hack = Object.assign({}, md.j.data, { users: md.j.data.users.map(u => Object.assign({}, u, { admin: true })) });
    ok((await req('PUT', '/api/data', { rev: md.j.rev, data: hack }, MH)).status === 200, T('member put'));
    const ad = await req('GET', '/api/data', null, H);
    ok(ad.j.data.users.find(u => u.id === 'u2').admin !== true, T('member cannot escalate'));
    const add = Object.assign({}, ad.j.data, { users: ad.j.data.users.concat([{ id: 'u3', login: 'new', name: 'جديد', role: 'observer', must: true, pw: fnv('temp-555'), color: 3 }]) });
    ok((await req('PUT', '/api/data', { rev: ad.j.rev, data: add }, H)).status === 200, T('admin adds user'));
    ok((await req('POST', '/api/login', { login: 'new', password: 'temp-555' })).status === 200, T('new user login'));

    // تغيير كلمة المرور
    ok((await req('POST', '/api/password', { password: '123' }, H)).status === 400, T('short pw'));
    ok((await req('POST', '/api/password', { password: 'NewPass-2026' }, H)).status === 200, T('change pw'));
    ok((await req('POST', '/api/login', { login: 'eyad', password: 'NewPass-2026' })).j.must === false, T('login new pw'));
    ok((await req('GET', '/api/nothing', null, H)).status === 404, T('api 404'));
    ok(new RegExp('storage: ' + kind).test(S.log), T('startup log'));

    // بقاء كل شيء بعد إعادة التشغيل
    await S.stop(); S = await startServer(env);
    const L3 = await S.req('POST', '/api/login', { login: 'eyad', password: 'NewPass-2026' });
    ok(L3.status === 200, T('login after restart'));
    const d3 = await S.req('GET', '/api/data', null, { Authorization: 'Bearer ' + L3.j.token });
    const u3 = d3.j && d3.j.data.users.find(u => u.id === 'u3');
    ok(d3.j && d3.j.data.users.length === 3 && u3 && u3.color === 3 && u3.role === 'observer', T('users persisted (with extra fields)'));
    ok(d3.j && d3.j.data.projects[0].img.length === big.projects[0].img.length && d3.j.data.projects[0].name === big.projects[0].name, T('projects persisted'));
    ok((await S.req('POST', '/api/login', { login: 'new', password: 'temp-555' })).status === 200, T('new user login after restart'));
  } catch (e) { fail++; console.log('  ✗ ' + tag + ' exception: ' + e.stack + '\n' + S.log) }
  await S.stop();
}

async function pgSuite() {
  let PGlite, PGLiteSocketServer;
  try { ({ PGlite } = await import('@electric-sql/pglite')); ({ PGLiteSocketServer } = await import('@electric-sql/pglite-socket')) }
  catch (e) { console.log('  ! PostgreSQL checks skipped: run npm install (devDependencies) to enable them'); return }
  const dbs = [];
  const newDb = async () => {
    const db = await PGlite.create(), p = ++port;
    const srv = new PGLiteSocketServer({ db, port: p, host: '127.0.0.1', maxConnections: 4 }); await srv.start();
    dbs.push({ db, srv });
    return { db, url: `postgresql://postgres:postgres@127.0.0.1:${p}/postgres` };
  };
  try {
    // أ. قاعدة جديدة: الترحيلات ثم كل فحوص الواجهة
    const A = await newDb(), envA = baseEnv({ DATABASE_URL: A.url });
    let r = await run('db/migrate.js', ['--status'], envA);
    ok(r.code === 0 && /PENDING\s+001_core\.sql/.test(r.out) && /2 pending/.test(r.out), 'migrate:status on empty db');
    r = await run('db/migrate.js', [], envA);
    ok(r.code === 0 && /001_core\.sql/.test(r.out) && /002_users\.sql/.test(r.out) && /schema 002/.test(r.out), 'migrate applies 001+002');
    r = await run('db/migrate.js', [], envA);
    ok(r.code === 0 && /up to date/.test(r.out), 'migrate twice = no-op');
    await apiSuite(envA, 'postgres', 'pg');
    const urows = (await A.db.query('SELECT id, pw FROM csr_users ORDER BY ord')).rows;
    ok(urows.length === 3 && urows[0].id === 'u1' && /^s\$/.test(urows[0].pw), 'csr_users rows + scrypt hash');
    ok(!(await A.db.query("SELECT doc ? 'users' AS h FROM csr_store WHERE id='main'")).rows[0].h, 'csr_store doc has no users');
    ok((await A.db.query('SELECT count(*)::int n FROM csr_backup')).rows[0].n === 1, 'daily backup row');

    // ب. التصدير ثم الاستيراد في قاعدة أخرى (مع مجلد backups بجانب الملف)
    const exp = path.join(TMP, 'exp', 'store.json'); fs.mkdirSync(path.join(TMP, 'exp', 'backups'), { recursive: true });
    r = await run('db/export-store.js', [exp], envA);
    ok(r.code === 0 && /3 users/.test(r.out), 'db:export');
    const ex = JSON.parse(fs.readFileSync(exp, 'utf8'));
    ok(ex.rev > 1 && ex.doc.users.length === 3 && ex.doc.users.every(u => u.pw), 'export has users with hashes');
    fs.writeFileSync(path.join(TMP, 'exp', 'backups', 'store-2026-10-20.json'), JSON.stringify(ex));
    const B = await newDb(), envB = baseEnv({ DATABASE_URL: B.url });
    r = await run('db/import-store.js', [exp], envB);
    ok(r.code === 0 && /3 users/.test(r.out) && /1 daily backups/.test(r.out), 'db:import (runs migrations itself)');
    r = await run('db/import-store.js', [exp], envB);
    ok(r.code !== 0 && /already has data/.test(r.out), 'db:import refuses non-empty db');
    r = await run('db/import-store.js', [exp, '--force'], envB);
    ok(r.code === 0, 'db:import --force');
    const exp2 = path.join(TMP, 'exp2.json');
    await run('db/export-store.js', [exp2], envB);
    const ex2 = JSON.parse(fs.readFileSync(exp2, 'utf8'));
    ok(ex2.rev === ex.rev && JSON.stringify(ex2.doc) === JSON.stringify(ex.doc), 'export → import → export is identical');
    const SB = await startServer(envB);
    ok((await SB.req('POST', '/api/login', { login: 'eyad', password: 'NewPass-2026' })).status === 200, 'login on imported db');
    await SB.stop();

    // ج. قاعدة قديمة من النسخة 1.x (الحسابات داخل المستند، بلا schema_migrations) — مثل Neon السابقة
    const C = await newDb();
    await C.db.exec(`CREATE TABLE csr_store (id TEXT PRIMARY KEY, rev INTEGER NOT NULL, doc JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now());
      CREATE TABLE csr_backup (day DATE PRIMARY KEY, doc JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now());`);
    const legacy = seedDoc(); legacy.projects = [{ id: 'p9', name: 'قديم' }];
    await C.db.query("INSERT INTO csr_store (id, rev, doc) VALUES ('main', 2072, $1::jsonb)", [JSON.stringify(legacy)]);
    const SC = await startServer(baseEnv({ DATABASE_URL: C.url }));
    ok(/migration applied: 002_users\.sql/.test(SC.log) && /schema 002/.test(SC.log), 'legacy db migrated on start');
    const LC = await SC.req('POST', '/api/login', { login: 'm', password: 'member123' });
    ok(LC.status === 200, 'legacy password works after migration');
    const dc = await SC.req('GET', '/api/data', null, { Authorization: 'Bearer ' + LC.j.token });
    ok(dc.j && dc.j.rev === 2073 && dc.j.data.users.length === 2 && dc.j.data.users[0].id === 'u1' && dc.j.data.projects[0].name === 'قديم', 'legacy data intact (rev 2072 +1 for the hash upgrade · order · projects)');
    await SC.stop();

    // د. MIGRATE_ON_START=false مع ترحيلات ناقصة ⇒ الخادم يرفض البدء
    const D = await newDb();
    const SD = await startServer(baseEnv({ DATABASE_URL: D.url, MIGRATE_ON_START: 'false' }));
    for (let i = 0; i < 50 && SD.exited === null; i++) await sleep(100);
    ok(SD.exited !== null && SD.exited !== 0 && /schema is not up to date/.test(SD.log), 'MIGRATE_ON_START=false refuses pending schema');
    await SD.stop();
    await run('db/migrate.js', [], baseEnv({ DATABASE_URL: D.url }));
    const SD2 = await startServer(baseEnv({ DATABASE_URL: D.url, MIGRATE_ON_START: 'false' }));
    ok((await SD2.req('GET', '/api/state')).status === 200, 'MIGRATE_ON_START=false starts when up to date');
    await SD2.stop();

    // هـ. ملف ترحيل تغيّر بعد تطبيقه ⇒ رفض
    await D.db.query("UPDATE schema_migrations SET checksum='x' WHERE version='001'");
    r = await run('db/migrate.js', [], baseEnv({ DATABASE_URL: D.url }));
    ok(r.code !== 0 && /was changed after it was applied/.test(r.out), 'changed migration refused');
  } catch (e) { fail++; console.log('  ✗ pg exception: ' + e.stack) }
  for (const x of dbs) { try { await x.srv.stop() } catch (e) {} try { await x.db.close() } catch (e) {} }
}

(async () => {
  for (const f of ['server.js', 'js/app.js', 'db/migrate.js', 'db/store-pg.js', 'db/import-store.js', 'db/export-store.js'])
    try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)]); ok(true) } catch (e) { ok(false, 'syntax: ' + f) }
  await apiSuite(baseEnv({ DATA_DIR: path.join(TMP, 'data') }), 'file', 'file');
  await pgSuite();
  fs.rmSync(TMP, { recursive: true, force: true });
  console.log(`${fail ? 'FAILED' : 'OK'} ${pass}/${pass + fail}`);
  process.exit(fail ? 1 : 0);
})();
