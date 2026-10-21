'use strict';
/*
 * فحص سريع قبل كل نشر: npm run check
 * يشغّل الخادم بتخزين ملف مؤقت (بلا Neon) ويتحقق من: الصحة · الملفات والضغط و304 · التهيئة والدخول
 * · قراءة البيانات وحفظها وتعارض الإصدارات · تغيير كلمة المرور · منع الوصول لملفات الخادم.
 */
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const PORT = 4900 + Math.floor(Math.random() * 90);
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'csr-smoke-'));
const BASE = 'http://127.0.0.1:' + PORT;
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('  ✗ ' + m) } };

// نفس التجزئة القديمة في server.js (حساب أولي يُرقّى عند أول دخول)
const normD = s => String(s == null ? '' : s).trim();
function fnv(s) { s = normD(s); let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0 } return 'h' + h.toString(16) }

async function req(method, p, body, headers) {
  const r = await fetch(BASE + p, { method, headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {}), body: body ? JSON.stringify(body) : undefined });
  let j = null; const t = await r.text(); try { j = JSON.parse(t) } catch (e) {}
  return { status: r.status, h: r.headers, j, t };
}

(async () => {
  for (const f of ['server.js', 'js/app.js', 'tools/copy-db.js']) {
    try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)]); ok(true) } catch (e) { ok(false, 'syntax: ' + f) }
  }
  const env = Object.assign({}, process.env, { PORT: String(PORT), DATA_DIR: DATA, SESSION_SECRET: 'smoke-secret' });
  delete env.DATABASE_URL; delete env.RENDER;
  const srv = spawn(process.execPath, [path.join(ROOT, 'server.js')], { env, stdio: ['ignore', 'pipe', 'pipe'] });
  let log = ''; srv.stdout.on('data', d => log += d); srv.stderr.on('data', d => log += d);
  try {
    for (let i = 0; i < 50; i++) { try { if ((await fetch(BASE + '/healthz')).ok) break } catch (e) {} await new Promise(r => setTimeout(r, 100)) }
    ok((await req('GET', '/healthz')).status === 200, 'healthz');

    // الملفات الثابتة: ضغط · ETag · 304 · تخزين طويل للملفات ذات ?v=
    const raw = await new Promise((res, rej) => require('http').get(BASE + '/', { headers: { 'Accept-Encoding': 'gzip' } }, r => { const c = []; r.on('data', x => c.push(x)); r.on('end', () => res({ r, b: Buffer.concat(c) })) }).on('error', rej));
    ok(raw.r.statusCode === 200 && raw.r.headers['content-encoding'] === 'gzip', 'index gzip');
    ok(/<html/.test(zlib.gunzipSync(raw.b).toString()), 'index gunzip content');
    ok(raw.r.headers['cache-control'] === 'no-cache' && !!raw.r.headers.etag, 'index no-cache + etag');
    const r304 = await fetch(BASE + '/', { headers: { 'If-None-Match': raw.r.headers.etag } });
    ok(r304.status === 304, 'index 304');
    const js = await fetch(BASE + '/js/app.js?v=12');
    ok(js.status === 200 && /immutable/.test(js.headers.get('cache-control')), 'versioned js immutable');
    ok((await fetch(BASE + '/assets/logo-mark.png')).headers.get('content-type') === 'image/png', 'png');
    ok((await fetch(BASE + '/css/nope.css')).status === 404, 'missing asset 404');
    const trav = await (await fetch(BASE + '/css/..%2fserver.js')).text();
    ok(!/require\(/.test(trav), 'no server source leak');
    ok(/<html/.test(await (await fetch(BASE + '/some/route')).text()), 'spa fallback');

    // التهيئة والدخول
    let s = await req('GET', '/api/state');
    ok(s.status === 200 && s.j.initialized === false && s.j.storage === 'file', 'state uninit');
    const doc = { v: 7, users: [{ id: 'u1', login: 'eyad', name: 'إياد', admin: true, must: true, pw: fnv('admin1234') }, { id: 'u2', login: 'm', name: 'عضو', role: 'member', pw: fnv('member123') }], projects: [], events: [], seen: {}, perm: {}, committee: { sections: [] } };
    ok((await req('POST', '/api/bootstrap', { data: doc })).status === 200, 'bootstrap');
    ok((await req('POST', '/api/bootstrap', { data: doc })).status === 409, 'bootstrap twice refused');
    ok((await req('POST', '/api/login', { login: 'eyad', password: 'wrong' })).status === 401, 'bad password');
    const L = await req('POST', '/api/login', { login: 'Eyad', password: 'admin١٢٣٤' });
    ok(L.status === 200 && L.j.token && L.j.must === true, 'login');
    const H = { Authorization: 'Bearer ' + L.j.token };
    ok((await req('GET', '/api/data', null, { Authorization: 'Bearer x.y' })).status === 401, 'bad token');

    // البيانات: قراءة · لا تغيير · حفظ · تعارض · كلمات المرور لا تخرج
    let d = await req('GET', '/api/data', null, H);
    ok(d.status === 200 && d.j.data.users.every(u => !('pw' in u)), 'data without pw');
    const rev = d.j.rev;
    ok((await req('GET', '/api/data?rev=' + rev, null, H)).j.same === true, 'same rev');
    const big = Object.assign({}, d.j.data, { projects: [{ id: 'p1', name: 'مشروع', img: 'data:image/jpeg;base64,' + 'A'.repeat(200000) }] });
    const P = await req('PUT', '/api/data', { rev, data: big }, H);
    ok(P.status === 200 && P.j.rev === rev + 1, 'put');
    ok((await req('PUT', '/api/data', { rev, data: big }, H)).status === 409, 'stale put 409');
    const gz = await fetch(BASE + '/api/data', { headers: Object.assign({ 'Accept-Encoding': 'gzip' }, H) });
    ok(gz.headers.get('content-encoding') === 'gzip', 'data gzip');
    const L2 = await req('POST', '/api/login', { login: 'eyad', password: 'admin1234' });
    ok(L2.status === 200, 'login after pw upgrade');

    // غير المسؤول لا يغيّر الحسابات
    const M = await req('POST', '/api/login', { login: 'm', password: 'member123' });
    const MH = { Authorization: 'Bearer ' + M.j.token };
    const md = await req('GET', '/api/data', null, MH);
    const hack = Object.assign({}, md.j.data, { users: md.j.data.users.map(u => Object.assign({}, u, { admin: true })) });
    ok((await req('PUT', '/api/data', { rev: md.j.rev, data: hack }, MH)).status === 200, 'member put');
    ok((await req('GET', '/api/data', null, H)).j.data.users.find(u => u.id === 'u2').admin !== true, 'member cannot escalate');

    // تغيير كلمة المرور
    ok((await req('POST', '/api/password', { password: '123' }, H)).status === 400, 'short pw');
    ok((await req('POST', '/api/password', { password: 'NewPass-2026' }, H)).status === 200, 'change pw');
    ok((await req('POST', '/api/login', { login: 'eyad', password: 'NewPass-2026' })).j.must === false, 'login new pw');
    ok((await req('GET', '/api/nothing', null, H)).status === 404, 'api 404');
    ok(/storage: file/.test(log), 'startup log');
  } catch (e) { fail++; console.log('  ✗ exception: ' + e.stack) }
  srv.kill();
  fs.rmSync(DATA, { recursive: true, force: true });
  console.log(`${fail ? 'FAILED' : 'OK'} ${pass}/${pass + fail}`);
  if (fail) { console.log(log); process.exit(1) }
})();
