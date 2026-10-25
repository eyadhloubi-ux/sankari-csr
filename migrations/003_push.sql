-- 003: إشعارات الجهاز (Web Push)
-- csr_push_sub: اشتراك لكل جهاز/متصفح فعّل الإشعارات (endpoint فريد)، مرتبط بالحساب uid
-- csr_kv: إعدادات الخادم الدائمة، ومنها مفاتيح VAPID التي تُولَّد مرة واحدة عند أول تشغيل
CREATE TABLE csr_push_sub (
  endpoint   TEXT        PRIMARY KEY,
  uid        TEXT        NOT NULL,
  sub        JSONB       NOT NULL,
  ua         TEXT        NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_ok    TIMESTAMPTZ
);
CREATE INDEX csr_push_sub_uid ON csr_push_sub (uid);

CREATE TABLE csr_kv (
  k          TEXT        PRIMARY KEY,
  v          TEXT        NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
