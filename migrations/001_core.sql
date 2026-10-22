-- 001: الجداول الأساسية للمنصة
-- csr_store: المستند الحي (صف واحد id='main') مع رقم الإصدار rev
-- csr_backup: نسخة يومية من المستند الكامل (صف لكل يوم)
-- IF NOT EXISTS حتى يعمل الترحيل أيضاً على قاعدة قديمة أنشأتها النسخ السابقة بالأسماء نفسها
CREATE TABLE IF NOT EXISTS csr_store (
  id         TEXT        PRIMARY KEY,
  rev        INTEGER     NOT NULL,
  doc        JSONB       NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS csr_backup (
  day        DATE        PRIMARY KEY,
  doc        JSONB       NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);
