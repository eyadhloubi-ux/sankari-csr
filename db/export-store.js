'use strict';
/*
 * تصدير البيانات من PostgreSQL إلى ملف store.json (نسخة احتياطية كاملة، أو للعودة إلى تخزين الملف)
 *   npm run db:export -- [مسار-الملف]      (الافتراضي: csr-store-YYYY-MM-DD.json)
 * الصيغة {rev, doc} نفسها التي يقرؤها الخادم ويقبلها db:import، مع تجزئات كلمات المرور. قراءة فقط.
 */
const fs = require('fs');
const path = require('path');
const { makePool, readAll } = require('./store-pg');

const url = process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL is not set'); process.exit(1) }
const out = path.resolve(process.argv[2] || 'csr-store-' + new Date().toISOString().slice(0, 10) + '.json');

(async () => {
  const pool = makePool(url, { max: 1 });
  try {
    const r = await readAll((t, p) => pool.query(t, p));
    if (!r) throw new Error('the database has no data');
    fs.writeFileSync(out, JSON.stringify({ rev: r.rev, doc: r.doc }));
    console.log(`OK: rev ${r.rev} · ${r.doc.users.length} users · ${(r.doc.projects || []).length} projects → ${out}`);
  } catch (e) {
    console.error('FAILED: ' + e.message); process.exitCode = 1;
  } finally { await pool.end() }
})();
