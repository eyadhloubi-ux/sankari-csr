'use strict';
/*
 * استيراد ملف store.json إلى PostgreSQL (مرة واحدة عند الانتقال من تخزين الملف إلى القاعدة)
 *   npm run db:import -- <مسار store.json> [--force]
 * - يطبّق الترحيلات أولاً، ثم يكتب المستند والحسابات (مع تجزئات كلمات المرور كما هي) في معاملة واحدة.
 * - إن وُجد مجلد backups/ بجانب الملف تُستورد نسخه اليومية store-YYYY-MM-DD.json أيضاً.
 * - يرفض الكتابة فوق قاعدة فيها بيانات، إلا مع --force.
 * أوقف خدمة المنصة قبل التشغيل: الخادم يحتفظ بالبيانات في الذاكرة ويكتب فوق القاعدة مع أول حفظ.
 */
const fs = require('fs');
const path = require('path');
const { makePool, tx, writeAll } = require('./store-pg');
const { migrate } = require('./migrate');

const file = process.argv.slice(2).find(a => !a.startsWith('--'));
const force = process.argv.includes('--force');
const url = process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL is not set'); process.exit(1) }
if (!file) { console.error('Usage: npm run db:import -- <path/to/store.json> [--force]'); process.exit(1) }

// يقبل صيغة الخادم {rev, doc} أو نسخة الواجهة الاحتياطية (المستند مباشرة، بلا كلمات مرور)
function readStore(p) {
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const doc = j && j.doc && Array.isArray(j.doc.users) ? j.doc : j;
  if (!doc || !Array.isArray(doc.users) || !Array.isArray(doc.projects)) throw new Error(p + ': not a platform data file');
  return { rev: Number(j && j.rev) || 1, doc };
}

(async () => {
  const pool = makePool(url, { max: 1 });
  try {
    const { rev, doc } = readStore(path.resolve(file));
    if (!doc.users.some(u => u.admin)) throw new Error('the file has no admin account');
    const noPw = doc.users.filter(u => !u.pw).length;
    const r = await migrate(pool, { log: console.log });
    const has = await pool.query("SELECT rev FROM csr_store WHERE id='main'");
    if (has.rows[0] && !force) throw new Error(`the database already has data (rev ${has.rows[0].rev}). Add --force to replace it`);

    const bdir = path.join(path.dirname(path.resolve(file)), 'backups');
    const backups = fs.existsSync(bdir) ? fs.readdirSync(bdir).filter(f => /^store-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort() : [];
    await tx(pool, async c => {
      await writeAll(c, rev, doc, null);
      for (const f of backups) {
        const b = readStore(path.join(bdir, f));
        await c.query(`INSERT INTO csr_backup (day, doc, updated_at) VALUES ($1::date, $2::jsonb, now())
          ON CONFLICT (day) DO UPDATE SET doc=EXCLUDED.doc, updated_at=now()`, [f.slice(6, 16), JSON.stringify(b.doc)]);
      }
    });

    const chk = await pool.query("SELECT s.rev, (SELECT count(*)::int FROM csr_users) AS u, jsonb_array_length(s.doc->'projects') AS p FROM csr_store s WHERE id='main'");
    console.log(`OK: schema ${r.version} · rev ${chk.rows[0].rev} · ${chk.rows[0].u} users · ${chk.rows[0].p} projects · ${backups.length} daily backups`);
    if (noPw) console.log(`NOTE: ${noPw} account(s) have no password (file from the in-app backup). The admin must give them a temporary password.`);
  } catch (e) {
    console.error('FAILED: ' + e.message); process.exitCode = 1;
  } finally { await pool.end() }
})();
