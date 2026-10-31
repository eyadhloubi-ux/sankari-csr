-- 004: الملفات المرفوعة (روابط المشروع ومرفقات المحادثات)
-- المحتوى في عمود bytea، والحد الأقصى للملف يضبطه الخادم (FILE_MAX_MB، الافتراضي 25).
-- المستند يحمل فقط {id, name, size, type} لكل ملف، فلا يكبر حجمه مع الملفات.
CREATE TABLE csr_files (
  id         TEXT        PRIMARY KEY,
  name       TEXT        NOT NULL,
  type       TEXT        NOT NULL DEFAULT 'application/octet-stream',
  size       INTEGER     NOT NULL,
  uid        TEXT        NOT NULL,
  data       BYTEA       NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
