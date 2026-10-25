'use strict';
/*
 * الاجتماعات على الخادم: مؤقّت كل دقيقة يرسل التذكيرات وينشئ الجلسة التالية للاجتماع الدوري.
 * المستند: meetings: [{ id, sid, kind:'once'|'series', rep:'w'|'2w'|'m', title, at (ms), dur (دقائق), place,
 *   link, linkAt, inv:[uid], rsvp:{uid:{s:'yes'|'no', at, why}}, agenda:[{id,t,u,at,min,done,out}],
 *   minutes, by, cat, cancel, stop, r24, r15, nx }]
 * notes: [{ id, to:[uid], by, at, k, t, b, go }] — الإشعارات؛ كل إشعار جديد يُرسل أيضاً إلى أجهزة المستلمين.
 */
const H = 36e5, MIN = 6e4;
const TZ = process.env.APP_TZ || 'Asia/Damascus';
const rid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const fmt = ms => { try { return new Intl.DateTimeFormat('ar-SY-u-nu-latn', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(ms) } catch (e) { return new Date(ms).toISOString().slice(0, 16).replace('T', ' ') } };
function nextAt(at, rep) { const d = new Date(at); if (rep === 'm') d.setMonth(d.getMonth() + 1); else d.setDate(d.getDate() + (rep === '2w' ? 14 : 7)); return d.getTime() }

function tick(doc, now) {
  let changed = false;
  const add = n => { (doc.notes = doc.notes || []).push(Object.assign({ id: rid('n'), by: 'sys', at: now }, n)); changed = true };
  const ms = doc.meetings || [];
  const st = (m, u) => m.rsvp && m.rsvp[u] && m.rsvp[u].s;
  for (const m of ms.slice()) {
    if (m.cancel || !m.at) continue;
    const T = m.at, end = T + (m.dur || 60) * MIN, inv = m.inv || [];
    const yes = inv.filter(u => st(m, u) === 'yes'), pend = inv.filter(u => !st(m, u));
    if (!m.r24 && now >= T - 24 * H && now < T - H) {
      m.r24 = now; changed = true;
      if (yes.length) add({ to: yes, k: 'rem', t: 'تذكير: ' + m.title, b: 'الاجتماع ' + fmt(T), go: { m: m.id } });
      if (pend.length) add({ to: pend, k: 'rem', t: 'لم تؤكد حضورك بعد: ' + m.title, b: 'الاجتماع ' + fmt(T) + ' · أكّد حضورك أو اعتذر', go: { m: m.id } });
    }
    if (!m.r15 && now >= T - 15 * MIN && now < end) {
      m.r15 = now; changed = true;
      if (yes.length) add({ to: yes, k: 'rem', t: 'يبدأ بعد قليل: ' + m.title, b: m.link && m.linkAt ? 'رابط الاجتماع جاهز، اضغط للدخول' : m.place ? 'المكان: ' + m.place : 'خلال 15 دقيقة', go: { m: m.id } });
    }
    if (m.kind === 'series' && !m.stop && !m.nx && now >= end) {
      let at = nextAt(T, m.rep);
      while (at + (m.dur || 60) * MIN <= now) at = nextAt(at, m.rep);
      // بنود الأجندة التي لم تُناقش تنتقل تلقائياً إلى الجلسة التالية
      const carry = (m.agenda || []).filter(a => !a.done && !a.out && !a.moved);
      const n = { id: rid('m'), sid: m.sid || m.id, kind: 'series', rep: m.rep, title: m.title, at, dur: m.dur || 60, place: m.place || '',
        link: m.link || '', linkAt: m.link && m.linkAt ? now : 0, inv: inv.slice(), rsvp: {}, minutes: '', by: m.by, cat: now,
        agenda: carry.map(a => ({ id: rid('a'), t: a.t, u: a.u, at: a.at, min: a.min || 0, from: m.id })) };
      carry.forEach(a => { a.moved = n.id });
      m.nx = n.id; ms.push(n); doc.meetings = ms; changed = true;
      if (n.inv.length) add({ to: n.inv, k: 'inv', t: 'دعوة: ' + n.title, b: 'الاجتماع الدوري التالي ' + fmt(at) + ' · أكّد حضورك', go: { m: n.id } });
    }
  }
  // الإشعارات: آخر 500 خلال 90 يوماً
  if (Array.isArray(doc.notes) && doc.notes.length) {
    const keep = doc.notes.filter(n => n.at > now - 90 * 864e5).slice(-500);
    if (keep.length !== doc.notes.length) { doc.notes = keep; changed = true }
  }
  return changed;
}

// الإشعارات الجديدة في doc مقارنة بمجموعة المعرّفات القديمة (حديثة فقط، حتى لا يُعاد إرسال القديم عند الاسترجاع)
function fresh(oldIds, doc, now) {
  return (doc.notes || []).filter(n => n && n.id && !oldIds.has(n.id) && Array.isArray(n.to) && n.at > now - 15 * MIN).slice(-30);
}
const noteIds = doc => new Set(((doc && doc.notes) || []).map(n => n && n.id));

module.exports = { tick, fresh, noteIds, nextAt, fmt };
