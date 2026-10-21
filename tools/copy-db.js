'use strict';
/*
 * نقل بيانات المنصة من قاعدة Neon قديمة إلى قاعدة جديدة (مرة واحدة).
 * ينسخ الجدولين csr_store (البيانات الحية مع كلمات المرور المشفّرة) و csr_backup (النسخ اليومية)
 * كما هما، فتبقى الحسابات وكلمات المرور والمشاريع والمحادثات دون أي تغيير.
 *
 * الاستعمال (من مجلد المشروع بعد npm install):
 *   node tools/copy-db.js "postgresql://...القديمة..." "postgresql://...الجديدة..."
 * يرفض الكتابة إذا كانت القاعدة الجديدة فيها بيانات، إلا بإضافة --force في الآخر.
 */
const { Pool } = require('pg');

const [from, to] = process.argv.slice(2).filter(a => !a.startsWith('--'));
const force = process.argv.includes('--force');
if (!from || !to) { console.error('الاستعمال: node tools/copy-db.js <OLD_DATABASE_URL> <NEW_DATABASE_URL> [--force]'); process.exit(1) }
if (from === to) { console.error('الرابطان متطابقان'); process.exit(1) }

const mk = url => new Pool({ connectionString: url, ssl: /localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: false }, max: 1 });

(async () => {
  const a = mk(from), b = mk(to);
  try {
    const main = await a.query("SELECT rev, doc FROM csr_store WHERE id='main'");
    if (!main.rows[0]) throw new Error('القاعدة القديمة لا تحوي بيانات (csr_store فارغ)');
    const backups = await a.query('SELECT day, doc, updated_at FROM csr_backup ORDER BY day').catch(() => ({ rows: [] }));
    const d = main.rows[0].doc;
    console.log(`القديمة: rev ${main.rows[0].rev} · ${(d.users || []).length} حساب · ${(d.projects || []).length} مشروع · ${backups.rows.length} نسخة يومية`);

    await b.query(`CREATE TABLE IF NOT EXISTS csr_store (id TEXT PRIMARY KEY, rev INTEGER NOT NULL, doc JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now());
      CREATE TABLE IF NOT EXISTS csr_backup (day DATE PRIMARY KEY, doc JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now());`);
    const has = await b.query("SELECT rev FROM csr_store WHERE id='main'");
    if (has.rows[0] && !force) throw new Error(`القاعدة الجديدة فيها بيانات (rev ${has.rows[0].rev}). أضف --force للكتابة فوقها`);

    await b.query('BEGIN');
    await b.query(`INSERT INTO csr_store (id, rev, doc, updated_at) VALUES ('main', $1, $2::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET rev=EXCLUDED.rev, doc=EXCLUDED.doc, updated_at=now()`, [main.rows[0].rev, JSON.stringify(d)]);
    for (const r of backups.rows)
      await b.query(`INSERT INTO csr_backup (day, doc, updated_at) VALUES ($1, $2::jsonb, $3)
        ON CONFLICT (day) DO UPDATE SET doc=EXCLUDED.doc, updated_at=EXCLUDED.updated_at`, [r.day, JSON.stringify(r.doc), r.updated_at]);
    await b.query('COMMIT');

    const chk = await b.query("SELECT rev, jsonb_array_length(doc->'users') AS u, jsonb_array_length(doc->'projects') AS p FROM csr_store WHERE id='main'");
    console.log(`الجديدة: rev ${chk.rows[0].rev} · ${chk.rows[0].u} حساب · ${chk.rows[0].p} مشروع — تم النقل`);
  } catch (e) {
    await b.query('ROLLBACK').catch(() => {});
    console.error('فشل:', e.message); process.exitCode = 1;
  } finally { await a.end(); await b.end() }
})();
