'use strict';
/*
 * إشعارات الجهاز (Web Push) — تصل إلى الموبايل واللابتوب حتى والتطبيق مغلق.
 * مفاتيح VAPID: من متغيري البيئة VAPID_PUBLIC_KEY و VAPID_PRIVATE_KEY إن وُجدا، وإلا تُولَّد مرة واحدة
 * وتُحفظ في التخزين (csr_kv) فلا تتغيّر بين عمليات النشر. تغيّرها يُبطل اشتراكات كل الأجهزة.
 */
const webpush = require('web-push');

function makePush(store) {
  let keys = null;
  async function init() {
    if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) keys = { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY };
    else {
      const k = await store.kvGet('vapid');
      if (k) keys = JSON.parse(k);
      else { keys = webpush.generateVAPIDKeys(); await store.kvSet('vapid', JSON.stringify(keys)) }
    }
    webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'https://csr.sankariportal.com', keys.publicKey, keys.privateKey);
  }
  // يرسل إلى كل أجهزة الحسابات المذكورة؛ الاشتراك المنتهي (404/410) يُحذف تلقائياً
  async function send(uids, payload) {
    uids = [...new Set(uids || [])];
    if (!keys || !uids.length) return 0;
    const subs = await store.subsOf(uids);
    let n = 0;
    await Promise.all(subs.map(async r => {
      try {
        await webpush.sendNotification(r.sub, JSON.stringify(payload), { TTL: 3 * 86400, urgency: 'high' });
        n++; if (store.subOk) store.subOk(r.sub.endpoint).catch(() => {});
      } catch (e) {
        if (e.statusCode === 404 || e.statusCode === 410) await store.subDel(r.sub.endpoint).catch(() => {});
        else console.warn('push failed:', e.statusCode || e.message);
      }
    }));
    return n;
  }
  return { init, send, key: () => keys && keys.publicKey };
}

module.exports = { makePush };
