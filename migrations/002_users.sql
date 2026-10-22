-- 002: الحسابات في جدول مستقل بدل داخل المستند
-- كلمة المرور (تجزئة scrypt) في عمود خاص لا يخرج من الخادم، وبقية حقول الحساب في extra.
-- ord يحفظ ترتيب الحسابات (الواجهة تلوّن الصور الرمزية حسب الترتيب).
CREATE TABLE csr_users (
  id         TEXT        PRIMARY KEY,
  ord        INTEGER     NOT NULL DEFAULT 0,
  login      TEXT        NOT NULL DEFAULT '',
  name       TEXT        NOT NULL DEFAULT '',
  role       TEXT,
  admin      BOOLEAN     NOT NULL DEFAULT false,
  must       BOOLEAN     NOT NULL DEFAULT false,
  pw         TEXT        NOT NULL DEFAULT '',
  extra      JSONB       NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX csr_users_login ON csr_users (lower(login));

-- نقل الحسابات الموجودة في مستند قديم (قاعدة أنشأتها النسخة 1.x) ثم حذفها من المستند
INSERT INTO csr_users (id, ord, login, name, role, admin, must, pw, extra)
SELECT u->>'id',
       (n - 1)::int,
       coalesce(u->>'login', ''),
       coalesce(u->>'name', ''),
       u->>'role',
       coalesce((u->>'admin')::boolean, false),
       coalesce((u->>'must')::boolean, false),
       coalesce(u->>'pw', ''),
       u - 'id' - 'login' - 'name' - 'role' - 'admin' - 'must' - 'pw'
FROM csr_store s,
     jsonb_array_elements(coalesce(s.doc->'users', '[]'::jsonb)) WITH ORDINALITY AS t(u, n)
WHERE s.id = 'main' AND u ? 'id'
ON CONFLICT (id) DO NOTHING;

UPDATE csr_store SET doc = doc - 'users' WHERE id = 'main' AND doc ? 'users';
