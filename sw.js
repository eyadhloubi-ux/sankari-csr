/* منصة لجنة المسؤولية المجتمعية — عامل الخدمة (Service Worker)
 * - يجعل المنصة قابلة للتثبيت كتطبيق على الموبايل واللابتوب.
 * - يستقبل إشعارات الجهاز ويعرضها، والضغط على الإشعار يفتح التطبيق على المكان المقصود.
 * - البيانات (/api) لا تُخزَّن أبداً؛ الصفحة نفسها تُحفظ نسخة منها لتفتح حتى مع اتصال ضعيف.
 */
const CACHE = 'csr-shell-1';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/'])).catch(() => {})); self.skipWaiting() });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())) });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put('/', c)).catch(() => {}); return res }).catch(() => caches.match('/')));
    return;
  }
  // ملفات برقم إصدار (?v=N) لا تتغيّر: من النسخة المحفوظة إن وُجدت
  if (u.searchParams.has('v') || u.pathname.startsWith('/assets/')) {
    e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(CACHE).then(x => x.put(r, c)).catch(() => {}) } return res })));
  }
});
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {} } catch (_) { d = { t: e.data && e.data.text() } }
  e.waitUntil(self.registration.showNotification(d.t || 'لجنة المسؤولية المجتمعية', {
    body: d.b || '', icon: '/assets/icon-192.png', badge: '/assets/badge.png', tag: d.tag || undefined,
    lang: 'ar', dir: 'rtl', data: { u: d.u || '/#notes' }, renotify: !!d.tag
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.u) || '/#notes', location.origin).href;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const w = list.find(c => new URL(c.url).origin === location.origin);
    if (w) { w.postMessage({ go: new URL(url).hash }); return w.focus() }
    return self.clients.openWindow(url);
  }));
});
self.addEventListener('pushsubscriptionchange', e => {
  // المتصفح جدّد الاشتراك: التطبيق يعيد تسجيله عند أول فتح (الدالة pushSync في js/app.js)
});
