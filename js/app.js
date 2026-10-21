(function(){
"use strict";
document.documentElement.setAttribute('dir','rtl');document.documentElement.setAttribute('lang','ar');
const EMPTY=false, LIVE=true;
const LOGO='data:image/png;base64,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', KEY=EMPTY?'sankari-csr-live-v2':LIVE?'sankari-csr-data-v2':'sankari-csr-v7', PKEY='sankari-csr-prefs-v7';
const NOW=Date.now(), H=36e5;
const pad=n=>String(n).padStart(2,'0');
const isoD=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const TODAY=isoD(new Date());
const D=n=>{const d=new Date();d.setDate(d.getDate()+n);return isoD(d)};
const MON=['كانون الثاني','شباط','آذار','نيسان','أيار','حزيران','تموز','آب','أيلول','تشرين الأول','تشرين الثاني','كانون الأول'];
const fmtD=s=>{if(!s)return '';const p=s.split('-').map(Number);return p[2]+' '+MON[p[1]-1]+(p[0]!==new Date().getFullYear()?' '+p[0]:'')};
const dayKey=ms=>isoD(new Date(ms));
const hm=ms=>{const d=new Date(ms);return pad(d.getHours())+':'+pad(d.getMinutes())};
const when=ms=>{const k=dayKey(ms);if(k===TODAY)return hm(ms);if(k===D(-1))return 'أمس';return fmtD(k)};
const dayLbl=ms=>{const k=dayKey(ms);return k===TODAY?'اليوم':k===D(-1)?'أمس':fmtD(k)};
const daysTo=s=>Math.round((new Date(s+'T00:00')-new Date(TODAY+'T00:00'))/864e5);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let seq=NOW;const uid=p=>p+(seq++).toString(36);
const kb=n=>n>1048576?(n/1048576).toFixed(1)+' MB':Math.max(1,Math.round(n/1024))+' KB';
const $=s=>document.querySelector(s);
const IC={alert:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.5"/>',flow:'<rect x="14" y="3.5" width="7" height="5" rx="1.5"/><rect x="3" y="3.5" width="7" height="5" rx="1.5"/><rect x="3" y="15.5" width="7" height="5" rx="1.5"/><path d="M14 6h-4M6.5 8.5v7"/>',road:'<circle cx="19" cy="12" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="5" cy="12" r="2.2"/><path d="M16.8 12h-2.6M9.8 12H7.2"/>',board:'<rect x="15" y="4" width="5.5" height="16" rx="1.5"/><rect x="9.2" y="4" width="5" height="11" rx="1.5"/><rect x="3.5" y="4" width="5" height="7" rx="1.5"/>',table:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M3 15h18M15 5v14"/>',tasks:'<path d="M20 6l-1.5 1.5L16 5M20 12l-1.5 1.5L16 11M20 18l-1.5 1.5L16 17M13 6H4M13 12H4M13 18H4"/>',plus:'<path d="M12 5v14M5 12h14"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16v4z"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  check:'<path d="M5 12l5 5L20 7"/>',back:'<path d="M9 6l6 6-6 6"/>',cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  clip:'<path d="M20 11l-8.5 8.5a5 5 0 01-7-7L13 4a3.5 3.5 0 015 5l-8.5 8.5a2 2 0 01-3-3L14 7"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>',
  send:'<path d="M4 12l16-8-6 16-2-6z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  moon:'<path d="M20 14a8 8 0 01-10-10 8 8 0 1010 10z"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',folder:'<path d="M3 7h6l2 2h10v10H3z"/>',
  reset:'<path d="M4 12a8 8 0 108-8H8M8 1L5 4l3 3"/>',down:'<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',up:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',fwd:'<path d="M15 6l-6 6 6 6"/>',
  pause:'<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',gavel:'<path d="M14 4l6 6M12 6l6 6M5 19l7-7M11 7l6 6-3 3-6-6z"/><path d="M3 21h8"/>',
  cards:'<rect x="4" y="4" width="7" height="9" rx="1.5"/><rect x="13" y="4" width="7" height="9" rx="1.5"/><path d="M4 17h7M13 17h7"/>',
  tiles:'<rect x="4" y="4" width="4.5" height="4.5" rx="1"/><rect x="10" y="4" width="4.5" height="4.5" rx="1"/><rect x="16" y="4" width="4.5" height="4.5" rx="1"/><rect x="4" y="10" width="4.5" height="4.5" rx="1"/><rect x="10" y="10" width="4.5" height="4.5" rx="1"/><rect x="16" y="10" width="4.5" height="4.5" rx="1"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  f_p:'<path d="M4 6h16M4 10h16M4 14h16M4 18h10"/>',f_ul:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
  f_ol:'<path d="M10 6h10M10 12h10M10 18h10M4 5h1v3M4 11h2l-2 3h2M4 17h2v3H4"/>',f_steps:'<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><path d="M6 7v10M11 5h9M11 19h9M13 12h7"/>',
  f_table:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M3 15h18M10 5v14"/>',f_kpi:'<path d="M4 19V11M10 19V5M16 19v-6M22 19H2"/>'};
const ic=n=>'<svg class="i" viewBox="0 0 24 24" aria-hidden="true">'+IC[n]+'</svg>';
const AVC=['#2E4A8A','#0277B6','#17996A','#7A4FB0','#B26B0E','#B5452D'];
const VSVG='<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+['30,50 200,205 370,50','70,50 200,170 330,50','110,50 200,135 290,50','150,50 200,100 250,50'].map(p=>'<polyline points="'+p+'"/>').join('')+'</svg>';
const FMTS=[['p','فقرة','اكتب نصاً حراً.',''],['ul','نقاط','كل نقطة في سطر.','النقطة الأولى\nالنقطة الثانية'],['ol','ترقيم','كل بند في سطر، ويُرقَّم تلقائياً.','البند الأول\nالبند الثاني'],
  ['steps','مراحل وخطوات','كل مرحلة في سطر، والخطوات تحتها تبدأ بـ -','المرحلة الأولى\n- خطوة\n- خطوة\nالمرحلة الثانية\n- خطوة'],['table','جدول','كل صف: العنوان: القيمة','الفترة: 12 شهراً\nالموقع: حلب'],['kpi','أرقام','كل مؤشر: الرقم | الوصف','300 | متدرب\n40% | نسبة التشغيل']];
const SECS=[['الفكرة','p'],['الهدف العام','p'],['الأهداف الرئيسية','kpi'],['الفئات المستهدفة','p'],['النطاق','table'],['النتائج والمخرجات','ol'],['معايير النجاح','ul']];

/* seed */
const normD=x=>String(x==null?'':x).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).trim();
function hpw(s){s=normD(s);let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return 'h'+h.toString(16)}
const tmpPw=()=>'S'+Math.random().toString(36).slice(2,8);
function seed(){
  if(EMPTY)return emptySeed();
  if(LIVE)return liveSeed();
  return seed0();
}
function seed0(){
  const U=(id,name,role,login,x)=>Object.assign({id,name,role,login,pw:hpw('1234'),must:false,admin:false},x||{});
  const users=[U('m1','محمد إياد هلوبي','member','eyad',{admin:true}),U('m2','د. سلمى الخطيب','member','salma'),U('m3','أ. باسل قباني','member','basel'),
    U('e1','م. رامي الأحمد','manager','rami'),U('e2','أ. لينا حداد','manager','lina'),U('e3','م. عمر دبس','manager','omar',{pw:hpw('temp4821'),must:true}),U('o1','نور العلي','observer','nour')];
  const S=(vals,upd)=>SECS.map((t,i)=>Object.assign({id:uid('s'),title:t[0],fmt:t[1],body:vals[i]||''},upd&&upd[i]||{}));
  const sub=(n,st,x)=>Object.assign({id:uid('k'),name:n,status:st===1?'done':st===2?'doing':'todo',note:null},x||{});
  const st=(n,date,subs,x)=>Object.assign({id:uid('t'),name:n,date,subs},x||{});
  const m=(u,h,t,files)=>({id:uid('c'),u,at:NOW-h*H,t,files:files||[]});
  const rq=(title,by,h,msgs,done,dl)=>({id:uid('r'),kind:'req',title,by,at:NOW-h*H,done:!!done,deadline:dl||'',msgs,seen:{}});
  const dc=(title,by,h,options,deadline,msgs,decision)=>({id:uid('r'),kind:'dec',title,by,at:NOW-h*H,done:!!decision,options,deadline,decision:decision||null,msgs,seen:{}});
  const ps=[
   {id:uid('p'),name:'مركز سنكري للتدريب المهني',img:'',memberId:'m1',managerId:'e1',access:{plan:true,found:false},
    sections:S(['مركز يقدّم دورات مهنية قصيرة للشباب في حلب، ويربط الخريجين بفرص عمل لدى شركات المجموعة وشركائها.','تمكين الشباب اقتصادياً عبر مهارات مهنية مطلوبة في السوق.',
      '300 | شاب وشابة يتدربون في السنة الأولى\n40% | من الخريجين يعملون خلال 6 أشهر\n15 | جهة توظيف شريكة','الشباب من 18 إلى 30 عاماً، و30% من المقاعد للشابات.','المدينة: حلب\nالمقر: حي الفرقان\nالمساحة: أربع قاعات وورشتان',
      'مركز مجهّز ومرخّص\n6 مناهج تدريبية معتمدة\nقاعدة بيانات للخريجين','نسبة إتمام الدورات فوق 85%\nنسبة التشغيل بعد 6 أشهر'],{6:{u:'m2',at:NOW-5*H}}),
    steps:[st('دراسة السوق والمهن',D(-90),[sub('مسح 40 منشأة صناعية',1),sub('اعتماد قائمة المهن',1)]),
      st('تجهيز المقر',D(10),[sub('تأهيل المبنى',1),sub('تجهيز الورش بالمعدات',2,{note:{t:'وصلت الدفعة الأولى، والثانية الأسبوع القادم',u:'m2',at:NOW-3*H},u:'m2',at:NOW-3*H}),sub('استكمال الترخيص',2),sub('تركيب منظومة الطاقة')],{u:'m2',at:NOW-3*H}),
      st('الكادر والإطلاق',D(45),[sub('التعاقد مع المدربين'),sub('حملة التسجيل'),sub('إطلاق الدفعة الأولى')])],
    requests:[rq('تقرير المصاريف الفعلية لتأهيل المبنى','m1',60,[m('m1',60,'نرجو تقريراً مختصراً يقارن المصاريف الفعلية بالموازنة.'),m('e1',30,'أكيد، بجهزه خلال يومين.'),m('e1',2,'التقرير مرفق. الفرق 3.2% فوق الموازنة بسبب عزل السقف.',[{name:'تقرير-المصاريف.pdf',size:420000}])],false,D(4)),
      rq('جدول توريد معدات الورش','m1',20,[m('m1',20,'بدنا جدول بمواعيد وصول المعدات المتبقية.')],false,D(-1)),
      dc('عدد مسارات الدفعة الأولى','e1',120,['6 مسارات كما في الخطة','4 مسارات والبقية بالدفعة الثانية'],D(-3),[m('e1',120,'المعدات المتوفرة تكفي 4 مسارات فقط حالياً.')],{t:'4 مسارات والبقية بالدفعة الثانية',u:'m2',at:NOW-100*H}),
      rq('خطة الإعلان عن التسجيل','m2',300,[m('m2',300,'نرجو خطة الإعلان ومعايير القبول قبل اعتمادها.'),m('e1',250,'الخطة مرفقة.',[{name:'خطة-الإعلان.pdf',size:310000}]),m('m2',240,'واضحة ومتوافقة مع الميثاق، شكراً.')],true)]},
   {id:uid('p'),name:'إعادة تأهيل مدرسة الشهباء',img:'',access:{plan:false,found:false},memberId:'m1',managerId:'e3',
    sections:S(['ترميم مدرسة متضررة في حي الشعار بطاقة 600 طالب، وإعادتها للعمل مع مديرية التربية.','إعادة 600 طالب إلى بيئة صفية آمنة.','600 | طالب\n10% | أقصى تجاوز للموازنة','طلاب المرحلة الابتدائية في حي الشعار.','الموقع: حي الشعار\nالأعمال: المبنى والساحة ودورات المياه والسور','','']),
    steps:[st('التقييم والتصميم',D(-60),[sub('الكشف الإنشائي',1),sub('المخططات ودفتر الشروط',1),sub('ترسية المناقصة',1)]),
      st('أعمال التأهيل',D(-5),[sub('الأعمال الإنشائية',1),sub('التمديدات الكهربائية والصحية',2,{note:{t:'متوقفة على قرار المورّد',u:'m1',at:NOW-20*H}}),sub('الإكساء والدهان')]),
      st('التسليم',D(40),[sub('تسليم المبنى لمديرية التربية')])],
    requests:[dc('اعتماد مورّد التمديدات','e3',6,['المورّد الأول: أغلى بـ 18% والتوريد خلال أسبوع','المورّد الثاني: ضمن الموازنة والتوريد بعد 5 أسابيع'],D(3),[m('e3',6,'الأعمال متوقفة على هذا القرار. التفاصيل بالملف.',[{name:'عروض-الأسعار.pdf',size:540000}])]),
      rq('تقرير ميداني مصوّر عن الإنجاز','m1',200,[m('m1',200,'بدنا تقرير مصوّر لكل طابق بنسبة الإنجاز.'),m('e3',150,'التقرير المصوّر للطابق الأرضي مرفق.',[{name:'تقرير-ميداني.pdf',size:2600000}]),m('m1',140,'ناقص الطابق الثاني ودورات المياه.'),m('e3',4,'أُضيف الطابق الثاني. دورات المياه بكرا.')],false,D(1))]},
   {id:uid('p'),name:'منح التميّز الجامعي',img:'',access:{plan:false,found:false},memberId:'m2',managerId:'e2',
    sections:S(['منح سنوية تغطي الرسوم الجامعية والمواصلات لطلاب متفوقين من أسر محدودة الدخل.','','60 | منحة في العام الحالي','طلاب السنتين الأولى والثانية في الكليات العلمية.','الجامعات: جامعات محافظة حلب','60 اتفاقية منحة\nبرنامج إرشاد من 8 جلسات','نسبة الاستمرار في الدراسة']),
    steps:[st('الاختيار',D(-40),[sub('استقبال الطلبات',1),sub('المقابلات والمفاضلة',1)]),st('التعاقد والصرف',D(12),[sub('توقيع اتفاقيات المنح'),sub('صرف رسوم الفصل الأول')])],
    requests:[rq('أسباب التأخر في توقيع الاتفاقيات','m2',8,[m('m2',8,'التوقيع تأخر عن موعده. شو الأسباب والموعد الجديد؟')],false,D(-2))]},
   {id:uid('p'),name:'حاضنة المشاريع الصغيرة للنساء',img:'',access:{plan:false,found:false},memberId:'m3',managerId:null,
    sections:S(['حاضنة تقدّم تدريباً ومنحاً صغيرة وإرشاداً لنساء معيلات لإطلاق مشاريع مستدامة.','','40 | مشروعاً في الدورة الأولى','نساء معيلات بين 20 و50 عاماً.','','','']),
    steps:[st('اختيار الشريك المنفذ',D(15),[sub('قائمة الشركاء المحتملين',1),sub('زيارات ومقابلات')])],requests:[]},
   {id:uid('p'),name:'المياه النظيفة للأحياء الشرقية',img:'',access:{plan:false,found:false},memberId:'m2',managerId:null,
    sections:S(['محطات تنقية مياه صغيرة في الأحياء الأكثر حاجة، تديرها لجان محلية.','','','','المنطقة: 12 حياً في القطاع الشرقي من حلب','','']),steps:[],requests:[]}];
  ps.forEach(p=>p.requests.forEach(r=>users.forEach(u=>r.seen[u.id]=r.msgs.length)));
  ps[0].requests[0].seen.m1=1; ps[1].requests[1].seen.m1=3; ps[1].requests[0].seen.m1=0; ps[2].requests[0].seen.e2=0;
  const seen={};users.forEach(u=>{seen[u.id]={};ps.forEach(p=>seen[u.id][p.id]={plan:NOW-24*H,found:NOW-24*H,exec:NOW-24*H})});
  const ev=[];const E=(p,tab,u,h)=>ev.push({p:ps[p].id,tab,u,at:NOW-h*H});
  E(0,'plan','m2',5);E(0,'found','m2',3);E(0,'exec','e1',2);E(1,'exec','e3',4);E(1,'exec','e3',6);E(2,'exec','m2',8);
  const committee={sections:[
    {id:uid('s'),title:'ميثاق اللجنة',fmt:'p',body:'لجنة المسؤولية المجتمعية في مجموعة سنكري القابضة تتبنى المشاريع التنموية للمجموعة، وترافق كل مشروع من كتابة ميثاقه حتى تنفيذه واستدامته. تعمل اللجنة كفريق واحد، وتلتزم بالشفافية في القرار والإنفاق، وبقياس الأثر الحقيقي على المجتمع المحلي.'},
    {id:uid('s'),title:'الرؤية',fmt:'p',body:'مجتمع محلي أقوى، تصنع فيه مشاريع المجموعة أثراً يُقاس ويستمر.'},
    {id:uid('s'),title:'القيم',fmt:'ul',body:'الأثر قبل الظهور\nالشفافية في القرار والإنفاق\nالشراكة مع المجتمع المحلي\nالاستدامة'},
    {id:uid('s'),title:'مهام اللجنة',fmt:'ol',body:'كتابة ميثاق كل مشروع واعتماده\nتكليف عضو بمتابعة تأسيس المشروع\nتعيين مدير تنفيذي والإشراف على التنفيذ\nالرد على طلبات القرار في وقتها'},
    {id:uid('s'),title:'بروتوكول العمل',fmt:'steps',body:'التخطيط\n- تكتب اللجنة ميثاق المشروع كفريق\n- لا يبدأ التأسيس قبل تعبئة البنود الأساسية\nالتأسيس\n- يُكلَّف عضو من اللجنة بمتابعة الخطوات\n- لكل خطوة رئيسية موعد\nالتنفيذ\n- تعيّن اللجنة مديراً تنفيذياً\n- تُرفع الطلبات وطلبات القرار عبر المنصة'},
    {id:uid('s'),title:'الاجتماعات',fmt:'table',body:''}]};
  const perm={e1:{}};perm.e1[ps[0].id]={plan:1,found:0,exec:1};
  return {v:7,users,projects:ps,events:ev,seen,committee,perm};
}

function emptySeed(){
  const admin={id:'u0',name:'مسؤول النظام',role:'member',login:'admin',pw:hpw('admin1234'),must:true,admin:true};
  const T=['ميثاق اللجنة','الرؤية','القيم','مهام اللجنة','بروتوكول العمل','الاجتماعات'],F=['p','p','ul','ol','steps','table'];
  return {v:7,users:[admin],projects:[],events:[],seen:{},perm:{},committee:{sections:charterSecs()}};
}
function charterSecs(){const c=(t,f,b)=>({id:uid('s'),title:t,fmt:f,body:b});return[
 c('المادة الأولى: التعريف والهدف','p','لجنة المسؤولية المجتمعية هي جهة رقابية وإشرافية عليا معنية بالمشاريع التنموية التابعة للمجموعة، وتهدف إلى ضمان انسجام هذه المشاريع مع التوجهات المعتمدة، ومتابعة أدائها، والكشف المبكر عن المخاطر والانحرافات، ورفع التوصيات والقرارات المطلوبة إلى رئيس مجلس الإدارة.'),
 c('المادة الثانية: نطاق العمل','p','يشمل نطاق عمل اللجنة جميع المشاريع التنموية التابعة للمجموعة بمختلف مراحلها، سواء كانت قيد الدراسة أو التخطيط أو التأسيس أو التنفيذ أو التشغيل.\n\nوتشمل مسؤولياتها نوعين من المشاريع:\n• مشاريع تحت إدارة تنفيذية: تتولى اللجنة متابعة أدائها وخططها ومخاطرها، والتحقق من تقدمها وفق الأهداف المعتمدة.\n• مشاريع تطورها اللجنة: تتولى اللجنة تطويرها والإشراف عليها في مراحلها الأولى، وتجهيزها للتسليم إلى مدير تنفيذي، مع استمرار دورها الرقابي بعد التسليم.'),
 c('المادة الثالثة: مهام اللجنة','ol','مراجعة أهداف المشاريع وتوجهاتها وخططها الرئيسية ومدى انسجامها مع التوجهات المعتمدة.\nمتابعة الإنجاز الفعلي ومقارنته بالخطط والمواعيد والمخرجات المستهدفة.\nرصد المخاطر والتحديات والانحرافات التي قد تؤثر في نجاح المشاريع أو استمراريتها.\nمتابعة معالجة الملاحظات والانحرافات والتحقق من تنفيذ الإجراءات التصحيحية.\nدراسة المسائل الاستراتيجية المتعلقة بالمشاريع وإعداد التوصيات المناسبة بشأنها.\nمتابعة جاهزية المشاريع التي تطورها اللجنة، وضمان وضوح خططها واحتياجاتها ومسؤولياتها قبل تسليمها.\nتقديم صورة شاملة ومحدثة عن واقع المشاريع والقضايا التي تتطلب تدخلاً أو قراراً من رئيس مجلس الإدارة.'),
 c('المادة الرابعة: صلاحيات اللجنة','ol','الوصول إلى المعلومات والبيانات والوثائق المتعلقة بالمشاريع التي تحتاجها لأداء مهامها.\nالتواصل المباشر مع المديرين التنفيذيين للمشاريع وطلب التقارير والتوضيحات والتحديثات اللازمة دون الحاجة إلى المرور بالتسلسل الإداري المعتاد.\nمطالبة المدير التنفيذي بتوضيح أسباب الانحرافات وتقديم إجراءات تصحيحية محددة ومتابعة تنفيذها.\nعقد مراجعات مع المسؤولين عن المشاريع عند الحاجة لمناقشة الأداء أو المخاطر أو المسائل العالقة.\nالتصعيد المباشر إلى رئيس مجلس الإدارة في أي وقت عندما تستدعي طبيعة المسألة ذلك، دون التقيد بمواعيد الاجتماعات الدورية.\nرفع التوصيات المتعلقة بالتغييرات الجوهرية في المشاريع أو استمرارها أو إعادة توجيهها أو إنهائها.'),
 c('المادة الخامسة: حدود الدور وصلاحيات اتخاذ القرار','p','تتمتع اللجنة بسلطة رقابية وإشرافية أعلى من المديرين التنفيذيين للمشاريع التنموية ضمن نطاق الحوكمة والمتابعة، مع الحفاظ على الفصل بين الرقابة والإدارة التنفيذية.\n\nوبناءً عليه:\n• يبقى المدير التنفيذي مسؤولاً عن الإدارة التشغيلية اليومية للمشروع وتنفيذ خططه وتحقيق أهدافه.\n• لا تتولى اللجنة إدارة التفاصيل التشغيلية للمشاريع بدلاً من المدير التنفيذي، وإنما تتابع الأداء وتطلب المعالجة وتصعّد المسائل التي تتجاوز صلاحياته أو تستدعي تدخلاً أعلى.\n• تعود صلاحية اتخاذ القرارات الاستراتيجية النهائية إلى رئيس مجلس الإدارة، استناداً إلى المعلومات والتوصيات المقدمة من اللجنة.\n• لا تملك اللجنة صلاحية إيقاف مشروع أو نشاط أو إنفاق من تلقاء نفسها، ويكون دورها في هذه الحالات تصعيد المسألة إلى رئيس مجلس الإدارة وعرض مبررات التدخل والتوصيات المناسبة.'),
 c('المادة السادسة: آلية المتابعة والمنصة','p','تعتمد اللجنة منصة موحدة لمتابعة المشاريع التنموية، بحيث تكون مرجعاً أساسياً لخطط المشاريع وتحديثاتها وملاحظات اللجنة.\n\nتتكون صفحة كل مشروع من ثلاث تبويبات رئيسية:\n1. ميثاق المشروع: يتضمن تعريف المشروع وأهدافه ومبادئه وتوجهاته ونطاق عمله والنتائج المستهدفة.\n2. خطة المشروع: تتضمن المراحل الرئيسية للمشروع والمهام الأساسية ضمن كل مرحلة، مع تحديد المسؤوليات والمواعيد وحالة الإنجاز، وتحديث الخطة باستمرار وفق تطور المشروع.\n3. متابعة اللجنة: تتضمن طلبات اللجنة وملاحظاتها الموجهة إلى المدير التنفيذي، ومواعيد الاستجابة وحالة كل طلب، والتقارير والوثائق المقدمة، والإجراءات التي تتطلب متابعة أو تصعيداً.\n\nيُخصص لكل مشروع عضو من اللجنة مسؤول عن متابعته، ويقتصر تصنيف المستخدمين في المنصة على فئتين: عضو لجنة المسؤولية المجتمعية والمدير التنفيذي.\n\nيتولى المدير التنفيذي تحديث خطة المشروع وبيانات الإنجاز وتقديم التقارير والمعلومات المطلوبة، بينما يتولى العضو المسؤول عن المشروع مراجعة التحديثات ومتابعة طلبات اللجنة وملاحظاتها ورصد المسائل التي تستدعي التدخل أو التصعيد.\n\nوتُعتمد المنصة مرجعاً موحداً لمتابعة المشاريع، بما يضمن وضوح مراحلها ومسؤولياتها وتقدمها، دون الدخول في تفاصيل التنفيذ اليومية التي تقع ضمن مسؤولية المدير التنفيذي.')]}
function liveSeed(){
  const me0={id:'m1',name:'محمد إياد هلوبي',role:'member',login:'eyad',pw:hpw('admin1234'),must:true,admin:true};
  const sec=(t,f,b)=>({id:uid('s'),title:t,fmt:f,body:b||''});
  const sub=(n,st,note)=>({id:uid('k'),name:n,status:st===1?'done':st===2?'doing':'todo',note:note?{t:note,u:'m1',at:NOW-2*H}:null});
  const step=(n,d,subs)=>({id:uid('t'),name:n,date:D(d),subs});
  const link=(t,u,n)=>({id:uid('l'),title:t,url:u,note:n||''});
  const msg=(t,h)=>({id:uid('c'),u:'m1',at:NOW-(h||1)*H,t,files:[]});
  const file=(t,dl,m)=>({id:uid('r'),kind:'req',title:t,by:'m1',at:NOW-2*H,done:false,deadline:D(dl),msgs:[msg(m,2)],seen:{m1:1}});
  const A='https://claude.ai/artifact/';
  const ps=[
  {id:uid('p'),name:'DOMAINS',img:'',memberId:'m1',managerId:null,
   sections:[
    sec('الفكرة','p','مجتمع شبابي داخل جامعة حلب يطوّر الشباب نحو القيادة المجتمعية، عبر أربعة مسارات: التدريب، والفعاليات، والتوعية، والمشاريع.'),
    sec('الهدف العام','p','إعداد قادة مجتمعيين من الشباب الجامعي.'),
    sec('الأهداف الرئيسية','ul','برامج تدريبية تطبيقية يتبع كلاً منها معسكر تطبيقي\nفعاليات وأنشطة توعوية تبني مجتمعاً شبابياً فاعلاً\nمشاريع استراتيجية تخدم الطلاب والجامعة\nمجتمع تطوعي بسلّم تطور: متطوع ثم منسق ثم قائد'),
    sec('الفئات المستهدفة','p','طلاب جامعة حلب والشباب الجامعي، وطلاب البكالوريا ضمن مشروع «طريقك».'),
    sec('النطاق','table','المقر: داخل جامعة حلب\nالمرافق: 4 قاعات تدريب، مساحة فعاليات، Study Zone، مصلى، بوفيه، تراس\nالتطبيق: تطبيق DOMAINS (حجز مسبق، ميثاق سلوك، اختبار DNA)\nالجهة الإدارية: مؤسسة المجد التنموية\nالإطلاق التجريبي: 15 تموز 2026\nالإطلاق الرسمي: 10 آب 2026'),
    sec('المشاريع الاستراتيجية','table','جاهز: الجاهزية المهنية لـ 2000 طالب\nالدليل الرقمي لجامعة حلب: خريطة ودليل رقمي للجامعة\nطريقك: توجيه طلاب البكالوريا، ومعرض بـ 3000 زائر'),
    sec('النتائج والمخرجات','kpi','10 | موظفين (آب 2026)\n47 | متطوعاً بنسبة استمرار 95%\n3 | مشاريع استراتيجية\n80% | نسبة تفعيل حسابات التطبيق'),
    sec('الشركاء','ul','GIZ\nCARE International\nفريق سند\nJCI\nالهلال الأحمر العربي السوري\nالمدارس الثانوية ومراكز التدريب والمدربون المستقلون'),
    sec('معايير النجاح','ul','')],
   steps:[
    step('الإطلاق',-60,[sub('الإطلاق التجريبي (15 تموز)',1),sub('الإطلاق الرسمي (10 آب)',1)]),
    step('تطبيق DOMAINS',30,[sub('المرحلة الجديدة من عقد التحول الرقمي',2),sub('رفع نسبة تفعيل الحسابات',2,'النسبة الحالية نحو 80%')]),
    step('المقر',21,[sub('معالجة الرطوبة وتسرّب المياه'),sub('المآخذ الكهربائية والكراسي المعطلة'),sub('حل انقطاع الكهرباء')]),
    step('الفريق',30,[sub('منسق المسارات'),sub('مسؤول الفعاليات'),sub('مصمم غرافيك'),sub('مصور')]),
    step('المشاريع الاستراتيجية',90,[sub('جاهز',2),sub('الدليل الرقمي لجامعة حلب',2),sub('طريقك',2)])],
   requests:[],
   links:[link('DOMAINS · العرض التعريفي',A+'6gupe1YfKwwH6GxpQ4oqC9')]},
  {id:uid('p'),name:'مؤسسة سنكري التعليمية',img:'',memberId:'m1',managerId:null,
   sections:[
    sec('الفكرة','p','منحة تعليمية لطلاب البكالوريا والجامعة في حلب. نمنح الطالب المتميز الذي تعيقه ظروفه الفرصة، ونرافقه بالدعم والتوجيه والتأهيل حتى يبدأ مسيرته المهنية بعمل حقيقي.'),
    sec('الهدف العام','p','عطاءٌ لا يسدّ حاجة اليوم فقط… بل يصنع من آخذه مُعطياً.'),
    sec('الأهداف الرئيسية','ul','استقطاب دفعات سنوية من الطلاب المستحقين والمتميزين عبر جهات الترشيح، بلا إعلان عام\nمرافقة كل طالب بخطة تطوير فردية ومرشد\nتأهيل الطالب علمياً ومهنياً حتى حصوله على عمل بدخل مستقر\nبناء شبكة خريجين تعطي بدورها'),
    sec('الفئات المستهدفة','table','طلاب البكالوريا: من 16 إلى 18 عاماً، من جميع الفروع\nطلاب الجامعة: من السنة الأولى حتى التخرج\nالاختصاصات المبدئية: إدارة الأعمال، الهندسة المدنية، الهندسة المعلوماتية'),
    sec('النطاق','table','المدينة: حلب وريفها\nالمركز: مركز إداري وتنموي وتدريبي خاص بطلاب المنحة، والتعليم الأكاديمي خارجه\nالاستقطاب: عبر جهات الترشيح فقط\nالدفعة الأولى: نحو 50 طالباً (مبدئياً)'),
    sec('النتائج والمخرجات','ol','دليل استقطاب معتمد بمراحله التسع\nلجان مستقلة: دراسة الاستحقاق، دراسة التميز، الاعتماد\nمركز مجهّز بقاعات التدريب واللجان\nمنصة تتابع تطور الطالب علمياً ومهنياً'),
    sec('معايير النجاح','ul','عدد المتخرجين من المنحة إلى عمل حقيقي\nدقة الاستقطاب\nأمانة الصرف\nجودة المرافقة\nالاستمرارية\nحفظ الكرامة'),
    sec('مراحل الاستقطاب','ol','إعلان الاستقطاب لجهات الترشيح\nطلبات الترشيح\nالزيارة الميدانية\nدراسة الاستحقاق\nدراسة التميز\nلجنة الاعتماد\nتفعيل الحساب\nالمتابعة والتقييم\nالتخرج من المنحة')],
   steps:[
    step('فلسفة المنحة',-6,[sub('الصياغة النهائية للفلسفة',1),sub('العرض الشامل للإدارة',1)]),
    step('دليل الاستقطاب',10,[sub('المراحل التسع وتشكيل اللجان',1),sub('بطاقة الترشيح الإلكترونية',2,'مرتبطة بداشبورد لجنة القبول'),sub('بنك أسئلة المقابلة'),sub('أوزان بوابة الأولوية والحدود الدنيا'),sub('الأسئلة الشرعية')]),
    step('منصة المؤسسة',14,[sub('ميثاق المؤسسة',1),sub('الإدارة التنفيذية',2),sub('اللجان المستقلة')]),
    step('تجهيز المركز',30,[sub('توزيع الغرف',1),sub('المخطط التفاعلي',0,'بانتظار المخطط بعد التعديلات'),sub('تجهيز قاعات التدريب واللجان')]),
    step('الموارد البشرية',25,[sub('الكادر الموظف',2),sub('فرق المتطوعين: الزيارات واللجان والمرشدون'),sub('اعتماد الرواتب')]),
    step('إطلاق الدفعة الأولى',60,[sub('إبلاغ جهات الترشيح'),sub('استقبال الترشيحات'),sub('الزيارات والمقابلات'),sub('الاعتماد وتفعيل الحسابات')])],
   requests:[],
   links:[link('مركز سنكري وأشكال المنحة',A+'XcGDUtfohQ4P95CLQ3izYk'),link('مركز سنكري ومقترحات تشغيل المنحة',A+'WGh16LA7VFxAPcv9uWzAc8')]},
  {id:uid('p'),name:'EngiPath',img:'',memberId:'m1',managerId:null,
   sections:[
    sec('الفكرة','p','مسار مرحلي يأخذ المهندس من التقديم حتى فرصة عمل محتملة، بشراكة بين DOMAINS وARCHIDEN.'),
    sec('الهدف العام','p','ربط المهندسين الشباب بسوق العمل عبر تدريب عملي وفرص حقيقية.'),
    sec('الأهداف الرئيسية','kpi','100 | مهندس في ورشة EngiStart\n30 | في التدريب الميداني لمدة شهر\n20 | عقداً لمدة 3 أشهر (10 مدفوعة و10 تدريب)'),
    sec('الفئات المستهدفة','table','مدني: 40%\nعمارة: 20%\nكهرباء: 20%\nميكانيك: 20%\nالطلاب: يُسمح بالدوام الجزئي'),
    sec('النطاق','table','الشراكة: DOMAINS × ARCHIDEN\nالتكاليف: ARCHIDEN\nالاستضافة والترويج: DOMAINS\nالتدريب الميداني: مول حلب\nموعد البدء: 13 تشرين الأول 2026'),
    sec('النتائج والمخرجات','steps','التقديم\n- حتى 500 متقدم\nورشة EngiStart\n- 100 مقبول لمدة 3 أيام\nالمقابلات\n- نحو 70 مقابلة، 10 دقائق لكل منها\nالتدريب الميداني\n- 30 مهندساً لمدة شهر\nالعقود\n- 10 عقود مدفوعة لـ3 أشهر\n- 10 تدريبات غير مدفوعة لـ3 أشهر'),
    sec('معايير النجاح','ul','نسبة التثبيت بعد 3 أشهر (المعيار الأساسي)\nانطباع ممتاز لدى كل المشاركين، خصوصاً من لم يتأهل'),
    sec('الرواتب','table','العقد المدفوع: 280 دولاراً شهرياً (متوسط)\nبعد التثبيت: 350 دولاراً شهرياً (متوسط)\nالتدريب غير المدفوع: لم يُحسم'),
    sec('لجنة التقييم','table','فادي بوادقجي: مدير الإنشاء وإدارة المشاريع (مدني)\nعبد القادر سنكري: مدير التطوير وإدارة المشاريع (كل الاختصاصات)\nناصر الخطيب: مدير مشاريع (عمارة)')],
   steps:[
    step('التحضير',-2,[sub('العرض التقديمي واعتماده من الإدارة',1),sub('استبيان الانضمام',1),sub('نموذج محتوى المدربين',1),sub('توزيع مدربي الأيام الثلاثة',1)]),
    step('ورشة EngiStart',3,[sub('العرض الموحد للأيام الثلاثة',2),sub('تعريف كل مدرب بنفسه',0,'مهم جداً'),sub('الاختبار البعدي'),sub('شهادات المشاركين المئة')]),
    step('المقابلات والاختيار',10,[sub('بروتوكول المقابلات مع الموارد البشرية'),sub('جدول المقابلات'),sub('اختيار الثلاثين')]),
    step('التدريب الميداني',40,[sub('ترتيبات مول حلب'),sub('شهادات المتدربين الثلاثين'),sub('اختيار العقود والتدريبات')]),
    step('العقود والتثبيت',130,[sub('توقيع العقود المدفوعة'),sub('بدء التدريبات غير المدفوعة'),sub('قياس نسبة التثبيت')])],
   requests:[
    file('مذكرة التفاهم بين ARCHIDEN وDOMAINS',2,'نحتاج نص مذكرة التفاهم (اتفاق تعاون أدبي) جاهزاً للتوقيع بأسرع وقت.'),
    file('خطة جاهزية DOMAINS',3,'الاستضافة، المنظمون، آلية التنظيم، المشاركة بالتدريب والمقابلات، وداشبورد متابعة حضور المشاركين.'),
    file('خطة تدخل الموارد البشرية',4,'دور الموارد البشرية بالتدريب والمقابلات وأسئلتها. المطلوب انطباع ممتاز لكل المشاركين، خصوصاً من لا يتأهل.'),
    file('خطة الإعلام على المحاور الثلاثة',5,'محور DOMAINS ومحور ARCHIDEN ومحور القابضة، لكل محور أسلوبه، مع تصوير يومي للمشاركين.'),
    file('إحصائيات صفحات DOMAINS قبل وبعد',10,'الوصول والتفاعل لأشهر آب وأيلول وتشرين الأول 2026 لقياس أثر الحدث.'),
    file('تصميم الشهادات',7,'مستويان: شهادة ورشة EngiStart للمئة، وشهادة التدريب الميداني للثلاثين.'),
    {id:uid('r'),kind:'dec',title:'مكافأة التدريب غير المدفوع',by:'m1',at:NOW-3*H,done:false,deadline:D(5),options:['بدون مكافأة','مكافأة رمزية شهرية','بدل مواصلات فقط'],decision:null,msgs:[msg('لم يُحسم بعد بدل التدريب غير المدفوع لمدة 3 أشهر.',3)],seen:{m1:1}}],
   links:[link('استبيان الانضمام إلى EngiPath',A+'1iZJaGimwEwSMsPZdaKnRc'),link('فورم مدربي EngiStart',A+'NrNwhKrZW17nS9ZmzidwAu'),link('أسئلة إدارة EngiPath',A+'FcEgt2AQEeNA7Bx18FiJrL')]},
  {id:uid('p'),name:'رابطة Domains للمشجعين',img:'',memberId:'m1',managerId:null,
   sections:[
    sec('الفكرة','p','رابطة تشجيع أم ضمن Domains تنشر ثقافة التشجيع الحضاري، وتنبثق منها رابطة لكل نادٍ بلونه.'),
    sec('الهدف العام','p','تشجيع راقٍ يصنع القادة وينشر القيم.'),
    sec('الأهداف الرئيسية','ul','نشر ثقافة التشجيع الحضاري\nصناعة القادة من الشباب\nالترويج للأندية ولعبتها بطريقة صحيحة وتشويقية\nاكتشاف مواهب الشباب في الرياضة والتصوير والتنظيم\nمسابقات سلوك وأنشطة مشتركة بين الروابط'),
    sec('الفئات المستهدفة','table','الجمهور: المشجعون الشباب\nالعضوية: قيادي، عضو، مناصر\nالقاصرون: أعضاء أو مناصرون فقط، بموافقة ولي الأمر'),
    sec('النطاق','table','الكيان الأم: رابطة Domains\nالروابط الأولى: أهلي حلب، الحرية، الشبيبة\nالتوسع: مفتوح لأي نادٍ'),
    sec('النتائج والمخرجات','ol','الوثيقة التأسيسية\nالميثاق ودستور الرابطة\nالهوية والشعار الموحد\nإطلاق الروابط الثلاث مع فعالية Kick Off'),
    sec('معايير النجاح','ul','')],
   steps:[
    step('التحضير',-5,[sub('الوثيقة التأسيسية',1),sub('العرض التعريفي',1),sub('الشعار والهوية',2,'يصممه مصمم خاص'),sub('مسودة مذكرة التفاهم مع الأندية')]),
    step('الشراكة مع الأندية',14,[sub('زيارة الأندية الثلاثة'),sub('قنوات الترشيح'),sub('ضابط اتصال من كل نادٍ')]),
    step('استقطاب المؤسسين',30,[sub('الإعلان عبر Domains وترشيحات الأندية'),sub('الدورة التأهيلية'),sub('الاختبار والمقابلة لكل رابطة'),sub('اعتماد المؤسسين')]),
    step('ورشة المؤسسين',40,[sub('دستور الرابطة'),sub('تجديد الميثاق')]),
    step('إعلان التأسيس',50,[sub('إعلان التأسيس'),sub('فتح الانتساب'),sub('فعالية Kick Off')])],
   requests:[],
   links:[link('الوثيقة التأسيسية',A+'SsAnoafD8Nn8uxLf5SqeGL'),link('إطلاق رابطة Domains',A+'TkCNh52gwMcvbviwRzDMpa','المراحل والمقترحات'),link('العرض التقديمي للإدارة',A+'BU2JwhZgWSchCtgqzmqQdH')]},
  {id:uid('p'),name:'ترميم ساحة التحرير',img:'',memberId:'m1',managerId:null,
   sections:[
    sec('الفكرة','p','إعادة تأهيل ساحة التحرير في حلب لتعود فضاءً عاماً يليق بالمدينة ويجمع أهلها.'),
    sec('الهدف العام','p','ساحة تليق بحلب… وبمن يجتمع فيها.'),
    sec('الأهداف الرئيسية','ul','إعادة الساحة مكاناً للقاء والفعاليات العامة\nإضافة أكثر من 1,300 م² من المساحات المفتوحة\nهوية بصرية مستوحاة من النجمة الثمانية الحلبية\nإنارة ليلية متكاملة'),
    sec('الفئات المستهدفة','p','أهالي حلب وزوار المدينة.'),
    sec('النطاق','table','الشركاء: محافظة حلب، مجموعة سنكري القابضة (الراعي)، ARCHIDEN (التصميم والتنفيذ)\nالعناصر الرئيسية: نصب مركزي، شاشة ومنصة رئيسية بقياس 26×8 م\nالهوية: النجمة الثمانية'),
    sec('النتائج والمخرجات','ol','الإعلان الرسمي عن المشروع\nفيديو إعلان بدء الترميم\nتنفيذ أعمال الترميم\nافتتاح الساحة'),
    sec('معايير النجاح','ul','')],
   steps:[
    step('الإعلان عن المشروع',-5,[sub('نص الإعلان الرسمي',1),sub('شعارات المرحلة الأولى',1),sub('تأكيد اعتماد التصميم والاسم الرسمي للساحة',0,'قبل أي نشر')]),
    step('فيديو بدء الترميم',7,[sub('سكربت الفيديو وقائمة اللقطات',2),sub('تصوير الساحة بوضعها الحالي',0,'قبل أن يبدأ أي عمل فيها'),sub('المونتاج والنشر')]),
    step('أعمال الترميم',120,[sub('متابعة مراحل التنفيذ مع ARCHIDEN'),sub('لقطة أسبوعية من الزاوية نفسها')]),
    step('الافتتاح',150,[sub('فعالية الافتتاح'),sub('فيديو قبل وبعد')])],
   requests:[],links:[]},
  {id:uid('p'),name:'البازارات',img:'',memberId:'m1',managerId:null,
   sections:[
    sec('الفكرة','p','بازارات دورية تعرض فيها الأسر المنتجة والمشاريع الصغيرة منتجاتها وتبيعها مباشرة للجمهور.'),
    sec('الهدف العام','p',''),sec('الأهداف الرئيسية','ul',''),sec('الفئات المستهدفة','p',''),sec('النطاق','table',''),sec('النتائج والمخرجات','ol',''),sec('معايير النجاح','ul','')],
   steps:[step('التحضير',21,[sub('تحديد فكرة البازار وفئة العارضين'),sub('اختيار المكان والموعد'),sub('آلية اختيار العارضين')])],
   requests:[],links:[]}];
  const d=seed0();
  return {v:7,users:[me0],projects:ps,events:[],seen:{},perm:{},committee:{sections:charterSecs()}};
}
let data=null,okStore=true;
try{data=JSON.parse(localStorage.getItem(KEY))}catch(e){okStore=false}
if(!data||data.v!==7)data=seed();data=normalizeData(data);
let prefs={user:null,theme:null,view:'list'};try{Object.assign(prefs,JSON.parse(localStorage.getItem(PKEY))||{})}catch(e){}
function save(){data.projects.forEach(p=>(p.requests||[]).forEach(syncReq));if(SRV.on){schedulePush();return true}try{localStorage.setItem(KEY,JSON.stringify(data));return true}catch(e){if(okStore)toast('المساحة لا تكفي، جرّب صورة أصغر','error');return !okStore}}
function savePrefs(){try{localStorage.setItem(PKEY,JSON.stringify(prefs))}catch(e){}}
/* ---------- shared server sync (active only when served by server.js) ---------- */
const SRV={durable:true,on:false,token:null,rev:0,base:null,t:null,busy:false,pending:false,migrated:false};
const SKEY='sankari-csr-session';
const clone=o=>JSON.parse(JSON.stringify(o));
const J=JSON.stringify;
function sess(){try{return JSON.parse(localStorage.getItem(SKEY))||null}catch(e){return null}}
function setSess(o){try{if(o)localStorage.setItem(SKEY,JSON.stringify(o));else localStorage.removeItem(SKEY)}catch(e){}}
const CFG=window.CSR_CONFIG||null;
const SB=!!(CFG&&CFG.SUPABASE_URL&&CFG.SUPABASE_ANON_KEY);
async function rpc(fn,args){
  const r=await fetch(String(CFG.SUPABASE_URL).trim().replace(/\/+$/,'')+'/rest/v1/rpc/'+fn,{method:'POST',cache:'no-store',
    headers:{'Content-Type':'application/json',apikey:CFG.SUPABASE_ANON_KEY.trim(),Authorization:'Bearer '+CFG.SUPABASE_ANON_KEY.trim()},body:JSON.stringify(args||{})});
  let j=null;try{j=await r.json()}catch(e){}
  if(!r.ok)return {status:r.status||500,ok:false,j:j||{}};
  j=j||{};
  if(j.error==='unauthorized'||j.error==='bad_credentials')return {status:401,ok:false,j};
  if(j.conflict)return {status:409,ok:false,j};
  if(j.error)return {status:400,ok:false,j};
  return {status:200,ok:true,j}}
async function call(method,p,body){
  if(SB){
    if(p==='state')return rpc('csr_state',{});
    if(p==='login')return rpc('csr_login',{p_login:body.login,p_password:body.password});
    if(p==='bootstrap')return rpc('csr_bootstrap',{p_data:body.data});
    if(p==='password')return rpc('csr_password',{p_token:SRV.token,p_password:body.password});
    if(p==='logout')return rpc('csr_logout',{p_token:SRV.token});
    if(p.startsWith('data')){if(method==='PUT')return rpc('csr_put',{p_token:SRV.token,p_rev:body.rev,p_data:body.data});const m=p.match(/rev=(\d+)/);return rpc('csr_get',{p_token:SRV.token,p_rev:m?+m[1]:null})}
  }
  if(p==='state'||p==='logout'){}const h={'Content-Type':'application/json'};if(SRV.token)h.Authorization='Bearer '+SRV.token;
  const r=await fetch('api/'+p,{method,headers:h,body:body?JSON.stringify(body):undefined,cache:'no-store'});let j={};try{j=await r.json()}catch(e){}return {status:r.status,ok:r.ok,j}}
function migrateP(p){p.sections=p.sections||[];p.steps=p.steps||[];p.requests=p.requests||[];p.links=p.links||[];p.stages=p.stages||[];
  /* «التأسيس» القديمة تصبح ملفات تطوير في التخطيط التشغيلي (معرّفات ثابتة حتى لا تتكرر بين الأجهزة) */
  if(!Array.isArray(p.ops))p.ops=p.steps.map((st,i)=>({id:'o'+st.id,no:i+1,name:st.name,u:st.u,at:st.at,items:(st.subs||[]).map((k,j)=>({id:'i'+k.id,no:j+1,t:k.name,note:k.note&&k.note.t||'',done:k.status==='done',u:k.u,at:k.at}))}));
  p.requests.forEach(r=>{r.msgs=r.msgs||[];r.seen=r.seen||{};if(!Array.isArray(r.tasks))r.tasks=[]});
  p.ops.forEach(o=>{const pr=p.requests.filter(r=>r.src&&r.src.oid===o.id&&r.src.iid);if(!pr.length)return;
    let fr=p.requests.find(r=>r.id===o.rid)||p.requests.find(r=>r.src&&r.src.oid===o.id&&!r.src.iid);
    if(!fr){fr={id:'rf'+o.id,kind:'req',title:o.name,src:{oid:o.id,code:String(o.no),file:o.name},by:pr[0].by,at:Math.min(...pr.map(r=>r.at)),done:false,tasks:[],msgs:[],seen:{}};p.requests.splice(p.requests.indexOf(pr[0]),0,fr)}
    pr.forEach(r=>{const it=o.items.find(x=>x.id===r.src.iid);const t={id:'t'+r.id,t:r.title,note:it&&it.note||'',status:r.done?'done':'todo',due:'',src:{iid:r.src.iid,code:r.src.code},u:r.by,at:r.at};
      fr.tasks.push(t);(r.tasks||[]).forEach(k=>fr.tasks.push(Object.assign({},k,{t:k.t})));fr.msgs=fr.msgs.concat(r.msgs);if(it){it.rid=fr.id;it.tid=t.id}});
    fr.msgs.sort((x,y)=>x.at-y.at);Object.keys(Object.assign({},...pr.map(r=>r.seen),fr.seen)).forEach(k=>fr.seen[k]=fr.msgs.length);
    fr.done=fr.tasks.length>0&&fr.tasks.every(t=>t.status==='done')&&pr.every(r=>r.done);o.rid=fr.id;
    p.requests=p.requests.filter(r=>!pr.includes(r))});
  p.ops.forEach(o=>o.items.forEach(it=>{if(it.rid&&!it.tid){const r=p.requests.find(x=>x.id===it.rid);if(!r)it.rid=null}}))}
function migrateS(p){p.stages.forEach(s=>{if(!s.status)s.status='todo'});if(p.smode!=='boxes')p.smode=p.smode||'stages';(p.requests||[]).forEach(syncReq)}
function normalizeData(d){d.users=d.users||[];d.projects=d.projects||[];d.events=d.events||[];d.seen=d.seen||{};d.perm=d.perm||{};d.committee=d.committee||{sections:[]};d.projects.forEach(migrateP);d.projects.forEach(migrateS);d.v=7;return d}
const stripPw=d=>{(d.users||[]).forEach(u=>{delete u.pw});return d};
const byId=a=>new Map((a||[]).map(x=>[x.id,x]));
function mergeArr(b,l,sv,deep){b=b||[];l=l||[];sv=sv||[];const bm=byId(b),lm=byId(l);
  const out=sv.filter(x=>!(bm.has(x.id)&&!lm.has(x.id)));
  l.forEach((x,li)=>{const bx=bm.get(x.id),ix=new Map(out.map((y,i)=>[y.id,i]));
    if(!bx){if(!ix.has(x.id))out.splice(Math.min(li,out.length),0,x)}
    else if(J(bx)!==J(x)&&ix.has(x.id)){const k=ix.get(x.id),sx=out[k];out[k]=deep&&J(sx)!==J(bx)?deep(bx,x,sx):x}});
  return out}
function mergeReq(b,l,sv){const me0=prefs.user,r=clone(sv);
  Object.keys(l).forEach(k=>{if(k!=='msgs'&&k!=='seen'&&k!=='tasks'&&J(b[k])!==J(l[k]))r[k]=l[k]});
  r.msgs=mergeArr(b.msgs,l.msgs,sv.msgs).sort((x,y)=>x.at-y.at);
  r.tasks=J(b.tasks)!==J(l.tasks)?mergeArr(b.tasks,l.tasks,sv.tasks):(sv.tasks||[]);
  r.seen=Object.assign({},sv.seen||{});if(l.seen&&me0 in l.seen)r.seen[me0]=l.seen[me0];return r}
const ids=a=>J((a||[]).map(x=>x.id));
function keepOrder(out,b,l){if(ids(b)===ids(l))return out;const ix=new Map((l||[]).map((x,i)=>[x.id,i]));return out.slice().sort((x,y)=>(ix.has(x.id)?ix.get(x.id):1e6)-(ix.has(y.id)?ix.get(y.id):1e6))}
function mergeOp(b,l,sv){const o=clone(sv);Object.keys(l).forEach(k=>{if(k!=='items'&&J(b[k])!==J(l[k]))o[k]=l[k]});o.items=keepOrder(mergeArr(b.items,l.items,sv.items),b.items,l.items);return o}
function mergeProject(bp,lp,sp){const o=clone(sp);
  Object.keys(lp).forEach(k=>{if(['sections','steps','links','requests','stages','ops'].includes(k))return;if(J(bp[k])!==J(lp[k]))o[k]=lp[k]});
  ['sections','steps','links','stages'].forEach(k=>{if(J(bp[k])!==J(lp[k]))o[k]=mergeArr(bp[k],lp[k],sp[k])});
  if(J(bp.ops)!==J(lp.ops))o.ops=keepOrder(mergeArr(bp.ops,lp.ops,sp.ops,mergeOp),bp.ops,lp.ops);
  o.requests=mergeArr(bp.requests,lp.requests,sp.requests,mergeReq);return o}
function merge3(base,local,srv){const m=clone(srv);
  m.projects=mergeArr(base.projects,local.projects,srv.projects,mergeProject);
  m.users=mergeArr(base.users,local.users,srv.users);
  ['committee','perm'].forEach(k=>{if(J(base[k])!==J(local[k]))m[k]=local[k]});
  m.seen=m.seen||{};const me0=prefs.user;if(local.seen&&local.seen[me0])m.seen[me0]=local.seen[me0];
  const ek=e=>e.p+'|'+e.tab+'|'+e.u+'|'+e.at,have=new Set((m.events||[]).map(ek));m.events=m.events||[];
  (local.events||[]).forEach(e=>{if(!have.has(ek(e)))m.events.push(e)});return normalizeData(m)}
function schedulePush(){SRV.pending=true;clearTimeout(SRV.t);SRV.t=setTimeout(push,400)}
async function push(){
  if(SRV.busy){clearTimeout(SRV.t);SRV.t=setTimeout(push,300);return}
  if(!SRV.pending||!SRV.token)return;
  SRV.busy=true;SRV.pending=false;
  try{
    let sent=clone(data),r=await call('PUT','data',{rev:SRV.rev,data:sent});
    if(r.status===409){
      const merged=merge3(SRV.base||r.j.data,sent,r.j.data);
      SRV.rev=r.j.rev;SRV.base=clone(r.j.data);
      const extra=J(data)!==J(sent);
      data=extra?merge3(sent,data,merged):merged;
      sent=clone(data);r=await call('PUT','data',{rev:SRV.rev,data:sent});
      softRender();
    }
    if(r.ok){SRV.rev=r.j.rev;stripPw(sent);stripPw(data);SRV.base=sent;writeCache()}
    else if(r.status===401){sessionEnded();}
    else{SRV.pending=true;if(r.status!==409)toast('تعذّر الحفظ، ستُعاد المحاولة تلقائياً','error')}
  }catch(e){SRV.pending=true;toast('لا يوجد اتصال، ستُحفظ التعديلات عند عودته','error')}
  finally{SRV.busy=false;if(SRV.pending){clearTimeout(SRV.t);SRV.t=setTimeout(push,5000)}}
}
function uiBusy(){const a=document.activeElement;return !!ui.dragging||!!ui.edit||!!document.querySelector('#layer .scrim')||(!!a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&!a.closest('.chat'))}
function softRender(){
  const ch=layer().querySelector('.chat');
  if(ch&&!layer().querySelector('.scrim')){const id=ch.dataset.id,tx=$('#ctx'),txt=tx?tx.value:'',foc=document.activeElement===tx,cf=$('#cfile');
    if(cf&&cf.files.length)return;render();openR(id);const t2=$('#ctx');if(t2){t2.value=txt;if(!foc)t2.blur()}return}
  if(!uiBusy())render()}
async function pull(){
  if(!SRV.on||!SRV.token||SRV.busy||SRV.pending)return;
  if(uiBusy())return;
  try{const r=await call('GET','data?rev='+SRV.rev);
    if(r.status===401)return sessionEnded();
    if(!r.ok||r.j.same||SRV.busy||SRV.pending||uiBusy())return;
    SRV.rev=r.j.rev;SRV.base=clone(r.j.data);data=normalizeData(r.j.data);writeCache();softRender();
  }catch(e){}
}
async function loadData(){
  const r=await call('GET','data');
  if(!r.ok)return false;
  SRV.rev=r.j.rev;data=normalizeData(r.j.data);SRV.base=clone(data);
  const ok=!!data.users.find(u=>u.id===prefs.user);
  if(ok&&SRV.prevCache===undefined){try{SRV.prevCache=JSON.parse(localStorage.getItem(CACHE_KEY))}catch(e){SRV.prevCache=null}}
  if(ok)writeCache();return ok;
}
const blankData=()=>normalizeData({});
const CACHE_KEY='sankari-csr-cache';
function writeCache(){if(!SRV.on||!SRV.token)return;try{localStorage.setItem(CACHE_KEY,JSON.stringify({rev:SRV.rev,data}))}catch(e){}}
function sessionEnded(){SRV.token=null;setSess(null);prefs.user=null;data=blankData();closeLayer();render();toast('انتهت الجلسة، سجّل الدخول من جديد','error')}
function backupText(){return JSON.stringify(clone(data))}
function downloadBackup(){
  modal({title:'نسخة احتياطية',submit:'تم',body:'<p class="note-s">كل المشاريع والحسابات والميثاق ('+data.projects.length+' مشاريع). احفظها كملف، أو انسخها كنص إذا لم يعمل التنزيل.</p><div class="row"><button class="btn primary" type="button" id="bkDl">'+ic('down')+'تنزيل ملف</button><button class="btn" type="button" id="bkCp">نسخ كنص</button></div><textarea class="ta" id="bkTx" readonly dir="ltr" style="min-height:120px;font-size:11px"></textarea>',
    onSubmit:()=>{},after:f=>{const t=backupText(),tx=f.querySelector('#bkTx');tx.value=t;
      f.querySelector('#bkDl').onclick=()=>{try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'application/json'}));a.download='csr-backup-'+TODAY+'.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast('نُزّل الملف')}catch(e){toast('التنزيل غير متاح هنا، استخدم «نسخ كنص»','error')}};
      f.querySelector('#bkCp').onclick=()=>{const done=()=>toast('نُسخت البيانات');try{navigator.clipboard.writeText(t).then(done).catch(()=>{tx.focus();tx.select();document.execCommand('copy');done()})}catch(e){tx.focus();tx.select();try{document.execCommand('copy');done()}catch(_){toast('حدّد النص وانسخه يدوياً','error')}}}}})}
function parseBackup(txt){let d;try{d=JSON.parse(txt)}catch(e){return null}return d&&Array.isArray(d.projects)&&Array.isArray(d.users)?d:null}
function applyBackup(d,mode){
  const srv=data;
  if(mode==='replace'){
    const keepUsers=srv.users.map(u=>Object.assign({},u)),ids=new Set(keepUsers.map(u=>u.id)),logins=new Set(keepUsers.map(u=>u.login));
    d.users.forEach(u=>{if(!ids.has(u.id)&&!logins.has(u.login))keepUsers.push(u)});
    data=normalizeData(Object.assign({},d,{users:SRV.on?keepUsers:d.users.map(u=>{const o=srv.users.find(x=>x.id===u.id);return Object.assign({},u,{pw:u.pw||(o&&o.pw)||''})})}));
    if(!data.users.some(u=>u.id===prefs.user&&u.admin)){data=srv;toast('الملف لا يحوي حسابك كمسؤول، لم يُستورد','error');return false}
  }else{
    // دمج: مشاريع النسخة المسترجعة تحلّ محل المشاريع بنفس الاسم، وتُضاف الجديدة، وتبقى مشاريع الخادم الأخرى
    d.projects.forEach(p=>{const i=srv.projects.findIndex(x=>x.id===p.id||x.name===p.name);if(i>=0)srv.projects[i]=p;else srv.projects.push(p)});
    const ids=new Set(srv.users.map(u=>u.id)),logins=new Set(srv.users.map(u=>u.login));
    d.users.forEach(u=>{if(!ids.has(u.id)&&!logins.has(u.login))srv.users.push(u)});
    srv.perm=Object.assign({},d.perm||{},srv.perm||{});
    if(d.committee&&(d.committee.sections||[]).some(x=>x.body&&x.body.trim()))srv.committee=d.committee;
  }
  save();return true}
function restoreModal(d,title,note){
  modal({title:title||'استرجاع بيانات',submit:'دمج مع الموجود',
    body:'<p class="note-s">'+(note||'')+'</p><div class="cred"><div>في النسخة المسترجعة<code>'+d.projects.length+' مشاريع · '+d.users.length+' حسابات</code></div><div>الموجود الآن<code>'+data.projects.length+' مشاريع · '+data.users.length+' حسابات</code></div></div><p class="note-s"><b>الدمج</b> (المقترح): مشاريع النسخة المسترجعة تحلّ محل المشاريع التي تحمل الاسم نفسه، وتُضاف الناقصة، وتبقى المشاريع الأخرى. <b>الاستبدال</b>: تصبح المشاريع مطابقة للنسخة المسترجعة فقط. في الحالتين تبقى الحسابات الحالية ويُضاف الناقص منها.</p>',
    extra:'<button class="btn danger" type="button" id="rsRep">استبدال الكل</button>',
    after:f=>{f.querySelector('#rsRep').onclick=()=>{if(applyBackup(d,'replace')){closeLayer();toast('استُرجعت البيانات');go('home')}}},
    onSubmit:()=>{if(applyBackup(d,'add')){toast('دُمجت البيانات');setTimeout(()=>go('home'),0)}}})}
function importBackup(){
  modal({title:'استيراد نسخة احتياطية',submit:'متابعة',body:'<div class="f"><label for="imF">ملف النسخة الاحتياطية</label><input type="file" id="imF" accept="application/json,.json"></div><div class="f"><label for="imT">أو الصق النص المنسوخ</label><textarea class="ta" id="imT" dir="ltr" style="min-height:110px;font-size:11px"></textarea></div>',
    onSubmit:(v,f)=>{const fi=f.querySelector('#imF'),tx=f.querySelector('#imT').value.trim();
      const go2=t=>{const d=parseBackup(t);if(!d){toast('الملف أو النص غير صالح','error');return}setTimeout(()=>restoreModal(d,'استيراد نسخة احتياطية'),0)};
      if(fi.files[0]){const fr=new FileReader();fr.onload=()=>{closeLayer();go2(fr.result)};fr.readAsText(fi.files[0]);return false}
      if(tx){go2(tx);return}toast('اختر ملفاً أو الصق النص','error');return false}})}
const LOCAL_KEYS=['__cache__','sankari-csr-data-v2','sankari-csr-live-v2','sankari-csr-data-v1','sankari-csr-live-v1','sankari-csr-v7'];
function localCandidates(){const out=[];
  LOCAL_KEYS.slice(1).forEach(k=>{try{const d=JSON.parse(localStorage.getItem(k));if(d&&Array.isArray(d.projects)&&Array.isArray(d.users)&&d.users.some(u=>u.admin))out.push({k,d})}catch(e){}});
  // النسخة الآمنة تُعرض فقط إذا كانت قاعدة البيانات أقدم منها (فقدت بيانات أو أُعيد إنشاؤها)
  const pc=SRV.prevCache;if(pc&&pc.data&&Array.isArray(pc.data.projects)&&+pc.rev>SRV.rev)out.push({k:'cache',d:pc.data});return out}
function findLocalData(){
  let handled={};try{handled=JSON.parse(localStorage.getItem('csr-local-handled2'))||{}}catch(e){}
  const sp=new Set(data.projects.map(p=>J(p)));
  for(const c of localCandidates()){const sig=J(c.d.projects).length+':'+c.d.projects.length;
    if(handled[c.k]===sig)continue;
    const covered=c.d.projects.every(p=>sp.has(J(p)));
    if(covered){handled[c.k]=sig;try{localStorage.setItem('csr-local-handled2',JSON.stringify(handled))}catch(e){}continue}
    return Object.assign(c,{sig,handled})}
  return null}
function offerLocalRecovery(){
  if(!SRV.on||!cur()||!cur().admin||cur().must||layer().innerHTML)return;
  const f=findLocalData();if(!f)return;
  const mark=()=>{f.handled[f.k]=f.sig;try{localStorage.setItem('csr-local-handled2',JSON.stringify(f.handled))}catch(e){}};
  modal({title:'وجدنا بيانات محفوظة على هذا الجهاز',submit:'استرجاعها',body:'<p class="note-s">'+(f.k==='cache'?'هذا المتصفح يحتفظ بنسخة من بيانات المنصة تختلف عن الموجودة الآن في قاعدة البيانات.':'هذا المتصفح يحتفظ ببيانات أدخلتها سابقاً ولم تصل إلى قاعدة البيانات بعد.')+' هل تريد استرجاعها؟</p><div class="cred"><div>على هذا الجهاز<code>'+f.d.projects.length+' مشاريع · '+f.d.users.length+' حسابات</code></div><div>في قاعدة البيانات<code>'+data.projects.length+' مشاريع · '+data.users.length+' حسابات</code></div></div>',
    extra:'<button class="btn ghost" type="button" id="lrNo">ليس الآن</button>',
    after:fm=>{fm.querySelector('#lrNo').onclick=()=>{mark();closeLayer()}},
    onSubmit:()=>{mark();setTimeout(()=>restoreModal(f.d,'استرجاع بيانات هذا الجهاز','الدمج يُرجع مشاريعك ويحافظ على أي مشروع آخر موجود.'),0)}})}
window.addEventListener('beforeunload',e=>{if(SRV.on&&(SRV.pending||SRV.busy)){e.preventDefault();e.returnValue=''}});

const ui={view:'home',pid:null,tab:'plan',menu:false,edit:null,prev:{},openDone:{},folded:{},rtOpen:{},editMsg:null};

const cur=()=>data.users.find(u=>u.id===prefs.user)||null;
const me=()=>cur()||data.users[0];
const isM=()=>me().role==='member';
const user=id=>data.users.find(u=>u.id===id);
const uname=id=>{const u=user(id);return u?u.name:''};
const proj=id=>data.projects.find(p=>p.id===id);
const av=(id,c)=>{const u=user(id);if(!u)return '';return '<span class="av '+(c||'')+'" style="background:'+AVC[data.users.indexOf(u)%AVC.length]+'">'+esc(u.name.replace(/^(د\.|م\.|أ\.)\s*/,'').charAt(0))+'</span>'};
const TABS=[['plan','ميثاق المشروع'],['found','التخطيط'],['exec','الإدارة التنفيذية'],['dec','القرارات'],['links','ملفات المشروع']];
const PTABS=TABS.filter(t=>t[0]!=='dec');
function seenOf(pid,tab){const s=data.seen[me().id]||(data.seen[me().id]={});const p=s[pid]||(s[pid]={});return p[tab]||0}
function setSeen(pid,tab){seenOf(pid,tab);data.seen[me().id][pid][tab]=Date.now()}
const badge=(p,tab)=>data.events.filter(e=>e.p===p.id&&e.tab===tab&&e.u!==me().id&&e.at>seenOf(p.id,tab)).length;
const pBadge=p=>tabsFor(p).reduce((a,t)=>a+badge(p,t[0]),0);
function touch(p,tab){data.events.push({p:p.id,tab,u:me().id,at:Date.now()});if(data.events.length>800)data.events=data.events.slice(-600)}
const emptyN=p=>p.sections.filter(s=>!s.body.trim()).length;
const runread=r=>r.msgs.slice(r.seen[me().id]||0).filter(m=>m.u!==me().id).length;
const pendDec=p=>p.requests.filter(r=>r.kind==='dec'&&!r.decision);
const isLateR=r=>r.kind==='req'?fileLate(r):(!r.done&&!!r.deadline&&r.deadline<TODAY);
const dueChip=r=>r.deadline&&!r.done?'<span class="duec'+(isLateR(r)?' late':'')+'">'+(isLateR(r)?ic('alert'):ic('cal'))+deadline(r.deadline)+'</span>':'';
function defPerm(u,p){if(u.admin||u.role==='member')return{plan:1,found:1,exec:1,links:1};if(u.role==='observer')return{plan:0,found:0,exec:1,links:0};return{plan:0,found:0,exec:p.managerId===u.id?1:0,links:0}}
function permOf(u,p){const o=data.perm&&data.perm[u.id]&&data.perm[u.id][p.id];return o||defPerm(u,p)}
const canTab=(p,t)=>!!permOf(me(),p)[t==='dec'?'exec':t];
const canSee=p=>TABS.some(t=>canTab(p,t[0]));
const visible=()=>data.projects.filter(canSee);
const tabsFor=p=>TABS.filter(t=>canTab(p,t[0]));
const sDone=k=>k.status==='done';
const isNewMark=(x,tab)=>!!(x&&x.at&&x.u&&x.u!==me().id&&x.at>(ui.prev[tab]||0));
const NEW='<span class="newpill">جديد</span>';
const HEART='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>';
const isObs=()=>me().role==='observer';

function toast(msg,kind,undo){const t=document.createElement('div');t.className='toast'+(kind?' '+kind:'');t.innerHTML='<span>'+esc(msg)+'</span>';
  if(undo){const b=document.createElement('button');b.textContent='تراجع';b.onclick=()=>{undo();t.remove()};t.appendChild(b)}
  $('#toasts').appendChild(t);setTimeout(()=>t.remove(),undo?5000:2600)}
const layer=()=>$('#layer');
function closeLayer(){layer().innerHTML='';document.body.style.overflow=''}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(layer().innerHTML){closeLayer();render()}else if(ui.menu){ui.menu=false;renderTop()}else if(ui.edit){ui.edit=null;render()}}});
function modal(o){
  layer().innerHTML='<div class="scrim"><form class="modal" novalidate role="dialog" aria-modal="true" aria-labelledby="mt"><div class="m-h"><h2 id="mt">'+esc(o.title)+'</h2><button type="button" class="tb" data-x aria-label="إغلاق">'+ic('x')+'</button></div><div class="m-b">'+o.body+'</div><div class="m-f"><button class="btn '+(o.danger?'danger solid':'primary')+'" type="submit">'+esc(o.submit||'حفظ')+'</button><button class="btn ghost" type="button" data-x>إلغاء</button><span class="sp"></span>'+(o.extra||'')+'</div></form></div>';
  document.body.style.overflow='hidden';const f=layer().querySelector('form');
  f._submit=()=>{let ok=true;f.querySelectorAll('[data-req]').forEach(x=>{if(!x.value.trim()){x.classList.add('err');ok=false}});if(!ok){f.querySelector('.err').focus();return}
    const v={};new FormData(f).forEach((x,k)=>{if(typeof x==='string')v[k]=x.trim()});if(o.onSubmit(v,f)!==false)closeLayer()};
  layer().querySelectorAll('[data-x]').forEach(b=>b.onclick=closeLayer);const s=layer().querySelector('.scrim');s.addEventListener('mousedown',e=>{if(e.target===s)closeLayer()});
  const fst=f.querySelector('.fi,.ta');if(fst)fst.focus();if(o.after)o.after(f)}
function confirmBox(t,txt,yes,fn){modal({title:t,danger:true,submit:yes,body:'<p style="color:var(--ink-2);font-weight:300">'+esc(txt)+'</p>',onSubmit:()=>{fn()}})}
const imgHtml=(p,i)=>'<div class="img">'+(p.img?'<img class="photo" src="'+p.img+'" alt="">':'<div class="vph" style="--hx:'+(15+((i||0)*23)%70)+'%">'+VSVG+'</div>')+'</div>';
function readImg(file){return new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,1000/im.width);const c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.8))};im.onerror=rej;im.src=fr.result};fr.onerror=rej;fr.readAsDataURL(file)})}
const curTheme=()=>document.documentElement.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
const deadline=d=>{if(!d)return '';const n=daysTo(d);return n<0?'تأخر '+(-n)+' يوم':n===0?'اليوم':'خلال '+n+' يوم'};

/* top */
function renderTop(){
  $('#themeBtn').innerHTML=ic(curTheme()==='dark'?'sun':'moon');$('#themeBtn').setAttribute('aria-label',curTheme()==='dark'?'الوضع الفاتح':'الوضع الداكن');
  const u=cur();$('#rolesBtn').hidden=!(u&&!u.must&&u.admin);$('#charterBtn').hidden=!(u&&!u.must);$('#charterBtn').classList.toggle('on',ui.view==='about');
  if(!u||u.must){$('#uchip').innerHTML='';return}
  let h='<button type="button" data-a="menu" aria-expanded="'+ui.menu+'"><span class="nm">'+esc(u.name)+'</span>'+av(u.id)+'</button>';
  if(ui.menu)h+='<div class="menu"><div class="mg">'+(u.admin?'مسؤول النظام · ':'')+({member:'عضو لجنة',manager:'مدير تنفيذي',observer:'مراقب'}[u.role]||'')+'</div><button type="button" data-a="myPw">'+ic('edit')+'تغيير كلمة المرور</button>'+(u.admin||u.role==='member'?'<button type="button" data-a="backup">'+ic('down')+'نسخة احتياطية</button>':'')+(u.admin?'<button type="button" data-a="restore">'+ic('up')+'استيراد نسخة احتياطية</button>'+(SRV.on?'':'<button type="button" data-a="reset">'+ic('reset')+'استعادة البيانات الأولية</button>'):'')+'<hr><button type="button" data-a="logout">'+ic('back')+'تسجيل الخروج</button><div class="note">'+(SRV.on?'البيانات محفوظة على الخادم ومشتركة بين الجميع':'نسخة محلية · البيانات في هذا المتصفح فقط')+'<br>الإصدار 11</div></div>';
  $('#uchip').innerHTML=h}

/* auth */
function renderLogin(){
  $('#view').innerHTML='<div class="auth"><form class="auth-card" data-form="login" novalidate><span class="auth-logo"><img src="'+LOGO+'" alt="سنكري القابضة"></span><h1>لجنة المسؤولية المجتمعية</h1><p class="sub">سنكري القابضة</p>'+
    '<div class="f"><label for="lu">اسم المستخدم</label><input class="fi" id="lu" name="u" dir="ltr" autocomplete="username" data-focus></div><div class="f"><label for="lp">كلمة المرور</label><input class="fi" id="lp" name="p" type="password" dir="ltr" autocomplete="current-password"></div><span class="ferr-l" id="lerr"></span>'+
    '<button class="btn primary" type="submit">دخول</button>'+(EMPTY||LIVE?'':'<div class="demo">حسابات تجريبية بكلمة المرور <code>1234</code>:<br>اللجنة: <code>eyad</code> (مسؤول النظام) · <code>salma</code> · <code>basel</code><br>المدراء: <code>rami</code> · <code>lina</code> · <code>omar</code> (كلمة مؤقتة <code>temp4821</code>)<br>المراقبون: <code>nour</code><div class="row" style="margin-top:6px">'+[['eyad','1234','محمد (مسؤول النظام)'],['salma','1234','سلمى'],['rami','1234','رامي (مدير)'],['omar','temp4821','عمر (أول دخول)'],['nour','1234','نور (مراقب)']].map(x=>'<button class="btn sm" type="button" data-a="quick" data-u="'+x[0]+'" data-p="'+x[1]+'">'+x[2]+'</button>').join('')+'</div></div>')+'</form></div>';focusMark()}
function renderSetPw(){const u=cur();
  $('#view').innerHTML='<div class="auth"><form class="auth-card" data-form="setpw" novalidate><span class="auth-logo"><img src="'+LOGO+'" alt=""></span><h1>أهلاً '+esc(u.name)+'</h1><p class="sub">اختر كلمة مرور جديدة لحسابك</p>'+
    '<div class="f"><label for="n1">كلمة المرور الجديدة</label><input class="fi" id="n1" name="a" type="password" dir="ltr" autocomplete="new-password" data-focus></div><div class="f"><label for="n2">تأكيدها</label><input class="fi" id="n2" name="b" type="password" dir="ltr" autocomplete="new-password"></div><span class="ferr-l" id="lerr"></span>'+
    '<button class="btn primary" type="submit">تثبيت كلمة المرور</button><button class="btn ghost" type="button" data-a="logout">تسجيل الخروج</button></form></div>';focusMark()}
function pwOk(a,b){if(a.length<6)return 'كلمة المرور 6 أحرف على الأقل';if(a!==b)return 'كلمتا المرور غير متطابقتين';return ''}

/* roles */
function renderRoles(){const u0=cur();if(!u0.admin){go('home');return}
  const row=u=>'<div class="urow">'+av(u.id)+'<span class="tx"><b>'+esc(u.name)+'</b><small><span class="ltr">'+esc(u.login)+'</span></small></span>'+(u.admin?'<span class="pill2">مسؤول النظام</span>':'')+(u.must?'<span class="pill2 warn">لم يثبّت كلمة المرور</span>':'')+
    '<span class="uacts"><button class="btn sm" type="button" data-a="access" data-id="'+u.id+'">الوصول للمشاريع</button><button class="tb" type="button" data-a="editUser" data-id="'+u.id+'" aria-label="تعديل">'+ic('edit')+'</button><button class="tb" type="button" data-a="resetPw" data-id="'+u.id+'" title="كلمة مرور مؤقتة" aria-label="كلمة مرور مؤقتة">'+ic('reset')+'</button>'+(u.id!==u0.id?'<button class="tb del" type="button" data-a="delUser" data-id="'+u.id+'" aria-label="حذف">'+ic('trash')+'</button>':'')+'</span></div>';
  let h='<button class="back" type="button" data-a="home">'+ic('back')+'المشاريع</button><div class="ph-row"><h2>الأدوار والحسابات</h2><span class="n">'+data.users.length+'</span><span class="sp"></span><button class="btn primary" type="button" data-a="addUser">'+ic('plus')+'إضافة شخص</button></div>';
  h+='<div class="grp">أعضاء اللجنة</div><div class="users">'+data.users.filter(u=>u.role==='member').map(row).join('')+'</div>';
  h+='<div class="grp">المدراء التنفيذيون</div><div class="users">'+(data.users.filter(u=>u.role==='manager').map(row).join('')||'<div class="urow note-s">لا يوجد بعد</div>')+'</div>';
  h+='<div class="grp">المراقبون (متدربون) · يرون الإدارة التنفيذية فقط ولا يظهرون لأحد</div><div class="users">'+(data.users.filter(u=>u.role==='observer').map(row).join('')||'<div class="urow note-s">لا يوجد بعد</div>')+'</div>';
  $('#view').innerHTML='<div class="wrap in">'+h+'</div>'}
function credModal(u,pw){
  modal({title:'بيانات الدخول',submit:'تم',body:'<p class="note-s">أرسلها إلى '+esc(u.name)+'. سيُطلب منه تثبيت كلمة مرور جديدة عند أول دخول.</p><div class="cred"><div>اسم المستخدم<code>'+esc(u.login)+'</code></div><div>كلمة المرور المؤقتة<code>'+esc(pw)+'</code></div></div><button class="btn sm" type="button" id="cpy">نسخ البيانات</button>',
    onSubmit:()=>{render()},after:f=>{f.querySelector('#cpy').onclick=()=>{const t='اسم المستخدم: '+u.login+'\nكلمة المرور: '+pw;try{navigator.clipboard.writeText(t).then(()=>toast('نُسخت')).catch(()=>toast('حدّد النص وانسخه يدوياً','error'))}catch(e){toast('حدّد النص وانسخه يدوياً','error')}}}})}
function userForm(u){const isNew=!u;const pw=tmpPw();
  modal({title:isNew?'إضافة شخص':'تعديل الحساب',submit:isNew?'إنشاء الحساب':'حفظ',
    body:'<div class="f"><label for="un">الاسم</label><input class="fi" id="un" name="name" value="'+esc(u?u.name:'')+'" data-req></div>'+
      '<div class="two"><div class="f"><label for="ul">اسم المستخدم</label><input class="fi" id="ul" name="login" dir="ltr" value="'+esc(u?u.login:'')+'" data-req></div><div class="f"><label for="ur">الدور</label><select id="ur" name="role"><option value="member"'+(u&&u.role==='member'?' selected':'')+'>عضو لجنة</option><option value="manager"'+(u&&u.role==='manager'?' selected':'')+'>مدير تنفيذي</option><option value="observer"'+(u&&u.role==='observer'?' selected':'')+'>مراقب (متدرب)</option></select></div></div>'+
      (isNew?'<div class="f"><label for="up">كلمة مرور مؤقتة</label><input class="fi" id="up" name="pw" dir="ltr" value="'+pw+'" data-req><span class="help">يغيّرها صاحب الحساب عند أول دخول</span></div>':'')+
      '<label class="chk"><input type="checkbox" name="admin"'+(u&&u.admin?' checked':'')+(u&&u.id===cur().id?' disabled':'')+'> مسؤول النظام (يدير الحسابات والصلاحيات)</label>',
    onSubmit:(v,f)=>{const login=v.login.toLowerCase().replace(/\s+/g,'');const adm=f.querySelector('[name=admin]').checked;
      if(data.users.some(x=>x.login===login&&x!==u)){const el=f.querySelector('#ul');el.classList.add('err');el.focus();toast('اسم المستخدم مستخدم من قبل','error');return false}
      if(isNew){const nu={id:uid('u'),name:v.name,role:v.role,login,pw:hpw(v.pw),must:true,admin:adm&&v.role==='member'};data.users.push(nu);save();credModal(nu,v.pw);return false}
      Object.assign(u,{name:v.name,login,role:v.role,admin:u.id===cur().id?u.admin:(adm&&v.role==='member')});save();toast('حُفظ');render()}})}
function accessForm(u){
  const ps=data.projects,full=u.admin;
  modal({title:'الوصول للمشاريع · '+u.name,submit:'حفظ',
    body:(full?'<p class="note-s">مسؤول النظام يصل إلى كل المشاريع والتبويبات.</p>':'<p class="note-s">'+(u.role==='member'?'عضو اللجنة يصل إلى كل شيء افتراضياً.':u.role==='observer'?'المراقب يرى تبويبة الإدارة التنفيذية للاطلاع فقط.':'المدير يصل إلى الإدارة التنفيذية لمشاريعه فقط افتراضياً.')+'</p>')+
      '<table class="acc-t"><thead><tr><th>المشروع</th>'+PTABS.map(t=>'<th>'+t[1]+'</th>').join('')+'</tr></thead><tbody>'+ps.map(p=>{const x=permOf(u,p);return '<tr><td>'+esc(p.name)+(p.managerId===u.id?' <span class="pill2">مديره</span>':'')+'</td>'+PTABS.map(t=>'<td><input type="checkbox" data-p="'+p.id+'" data-t="'+t[0]+'" aria-label="'+esc(p.name)+' · '+t[1]+'"'+(x[t[0]]?' checked':'')+(full?' disabled':'')+'></td>').join('')+'</tr>'}).join('')+'</tbody></table>'+
      (full?'':'<button class="btn sm ghost" type="button" id="defP" style="align-self:flex-start">الرجوع للافتراضي</button>'),
    after:f=>{const d=f.querySelector('#defP');if(d)d.onclick=()=>{ps.forEach(p=>{const x=defPerm(u,p);PTABS.forEach(t=>{f.querySelector('[data-p="'+p.id+'"][data-t="'+t[0]+'"]').checked=!!x[t[0]]})})}},
    onSubmit:(v,f)=>{if(full)return;data.perm=data.perm||{};const m={};ps.forEach(p=>{const o={};PTABS.forEach(t=>o[t[0]]=f.querySelector('[data-p="'+p.id+'"][data-t="'+t[0]+'"]').checked?1:0);const d=defPerm(u,p);if(PTABS.some(t=>!!o[t[0]]!==!!d[t[0]]))m[p.id]=o});data.perm[u.id]=m;save();toast('حُفظت صلاحيات '+u.name)}})}

/* home */
function flags(p){const b=pBadge(p),d=pendDec(p).length;return (b||d)?'<span class="flags">'+(d?'<span class="dchip">'+ic('pause')+'قرار</span>':'')+(b?'<span class="rb">'+b+'</span>':'')+'</span>':''}
function renderHome(){
  const ps=visible(),v=prefs.view,ch=data.committee.sections[0];
  const cover='<section class="hero2 in"><span class="h-mark" role="img" aria-label="سنكري القابضة"></span><p class="h-org">سنكري القابضة</p><h1>لجنة المسؤولية المجتمعية</h1><span class="h-rule" aria-hidden="true"></span></section>';
  let h='';
  h+='<div class="ph-row"><h2>المشاريع</h2><span class="pcount"><b>'+ps.length+'</b>'+(ps.length===1?'مشروع':ps.length===2?'مشروعان':ps.length<=10?'مشاريع':'مشروعاً')+'</span><span class="sp"></span><div class="seg" role="group" aria-label="طريقة العرض">'+[['cards','بطاقات'],['tiles','مربعات'],['list','قائمة']].map(x=>'<button type="button" data-a="view" data-v="'+x[0]+'" class="'+(v===x[0]?'on':'')+'" title="'+x[1]+'" aria-label="'+x[1]+'" aria-pressed="'+(v===x[0])+'">'+ic(x[0])+'</button>').join('')+'</div>'+(isM()?'<button class="btn primary" type="button" data-a="newP">'+ic('plus')+'مشروع جديد</button>':'')+'</div>';
  if(!ps.length)h+='<div class="empty"><span class="e">'+ic('folder')+'</span><b>لا مشاريع بعد</b>'+(isM()?'<button class="btn primary" type="button" data-a="newP">'+ic('plus')+'مشروع جديد</button>':'<span>ستظهر هنا المشاريع المسندة إليك</span>')+'</div>';
  else if(v==='tiles')h+='<div class="tiles">'+ps.map(p=>'<button type="button" class="tile" data-a="open" data-id="'+p.id+'">'+flags(p)+imgHtml(p,data.projects.indexOf(p))+'<b>'+esc(p.name)+'</b></button>').join('')+'</div>';
  else if(v==='list')h+='<div class="list">'+ps.map(p=>'<button type="button" class="lrow" data-a="open" data-id="'+p.id+'">'+imgHtml(p,data.projects.indexOf(p))+'<span class="tx"><b>'+esc(p.name)+'</b><span class="who">'+av(p.memberId,'sm')+esc(uname(p.memberId))+'</span></span>'+flags(p)+'</button>').join('')+'</div>';
  else h+='<div class="grid">'+ps.map(p=>'<button type="button" class="card" data-a="open" data-id="'+p.id+'">'+flags(p)+imgHtml(p,data.projects.indexOf(p))+'<div class="card-b"><h3>'+esc(p.name)+'</h3><span class="who">'+av(p.memberId,'sm')+esc(uname(p.memberId))+'</span></div></button>').join('')+'</div>';
  const warn=SRV.on&&!SRV.durable&&cur()&&cur().admin?'<div class="warnbar">'+ic('alert')+'<span><b>البيانات غير محفوظة بشكل دائم.</b> الخادم يعمل بدون قاعدة بيانات، وستُفقد البيانات عند إعادة تشغيله. أضِف <span class="ltr">DATABASE_URL</span> في إعدادات Render (التفاصيل في README).</span></div>':'';
  $('#view').innerHTML='<div class="wrap home-wrap">'+warn+cover+'<div class="in">'+h+'</div></div>'}

/* section rendering (shared by project charter and committee page) */
function bodyHtml(s){const ls=s.body.split('\n').map(x=>x.trim()).filter(Boolean);const f=s.fmt||(ls.length>1?'ul':'p');
  if(f==='ul')return '<ul class="b-ul">'+ls.map(x=>'<li>'+esc(x.replace(/^[-•]\s*/,''))+'</li>').join('')+'</ul>';
  if(f==='ol')return '<ol class="b-ol">'+ls.map(x=>'<li>'+esc(x.replace(/^[-•\d.]+\s*/,''))+'</li>').join('')+'</ol>';
  if(f==='steps'){const g=[];ls.forEach(l=>{if(/^[-–•]/.test(l)&&g.length)g[g.length-1].c.push(l.replace(/^[-–•]\s*/,''));else g.push({t:l.replace(/^[-–•]\s*/,''),c:[]})});
    return '<div class="b-steps">'+g.map((x,i)=>'<div class="stg"><span class="sn">'+(i+1)+'</span><div><b>'+esc(x.t)+'</b>'+(x.c.length?'<ul>'+x.c.map(c=>'<li>'+esc(c)+'</li>').join('')+'</ul>':'')+'</div></div>').join('')+'</div>'}
  if(f==='table')return '<table class="b-tb">'+ls.map(l=>{const i=l.search(/[:|]/);return '<tr><td>'+esc(i>0?l.slice(0,i).trim():l)+'</td><td>'+esc(i>0?l.slice(i+1).trim():'')+'</td></tr>'}).join('')+'</table>';
  if(f==='kpi')return '<div class="b-kpi">'+ls.map(l=>{const i=l.indexOf('|');return '<div><b>'+esc(i>=0?l.slice(0,i).trim():l)+'</b><span>'+esc(i>=0?l.slice(i+1).trim():'')+'</span></div>'}).join('')+'</div>';
  return '<p class="b-p">'+esc(s.body)+'</p>'}
function secEditor(s,ctx,full){const isNewS=!s;s=s||{id:'new',title:'',fmt:'ul',body:''};const f=FMTS.find(x=>x[0]===(s.fmt||'p'))||FMTS[0];
  return '<form class="sec editing'+(full?' full':'')+'" data-form="sec" data-ctx="'+ctx+'" data-id="'+s.id+'"><input class="fi" name="title" value="'+esc(s.title)+'" placeholder="عنوان البند" aria-label="عنوان البند" data-req'+(isNewS?' data-focus':'')+'>'+
   '<div class="fmts" role="radiogroup" aria-label="طريقة العرض">'+FMTS.map(x=>'<label><input type="radio" name="fmt" value="'+x[0]+'"'+(x[0]===f[0]?' checked':'')+'>'+ic('f_'+x[0])+x[1]+'</label>').join('')+'</div>'+
   '<textarea class="ta" name="body" aria-label="المحتوى" placeholder="'+esc(f[3]||'المحتوى')+'"'+(isNewS?'':' data-focus')+'>'+esc(s.body)+'</textarea><span class="fhint">'+esc(f[2])+'</span>'+
   '<div class="row"><button class="btn sm primary" type="submit">'+(isNewS?'إضافة':'حفظ')+'</button><button class="btn sm ghost" type="button" data-a="cancel">إلغاء</button><span class="sp"></span>'+(isNewS?'':'<button class="btn sm danger" type="button" data-a="delSec" data-ctx="'+ctx+'" data-id="'+s.id+'">'+ic('trash')+'حذف</button>')+'</div></form>'}
function secsHtml(list,ctx,ed,tabKey){
  let h='<div class="secs">';
  list.forEach((s,i)=>{const full=ctx==='about'||i===0||s.fmt==='steps'||s.fmt==='kpi';
    if(ui.edit==='s:'+s.id){h+=secEditor(s,ctx,true);return}
    const empty=!s.body.trim();const lead=i===0&&!empty;
    const nw=tabKey&&isNewMark(s,tabKey);h+='<div class="sec'+(empty?' empty':'')+(lead?' lead':'')+(full?' full':'')+(nw?' isnew':'')+'"><div class="sec-h"><span class="num">'+(i+1)+'</span><h3>'+esc(s.title)+(nw?' '+NEW:'')+'</h3>'+(ed&&!empty?'<span class="tools"><button class="tb" type="button" data-a="editSec" data-id="'+s.id+'" aria-label="تعديل">'+ic('edit')+'</button></span>':'')+'</div>'+
      (empty?'<div class="row"><span class="hint">لم يُعبّأ بعد</span><span class="sp"></span>'+(ed?'<button class="btn sm" type="button" data-a="editSec" data-id="'+s.id+'">'+ic('edit')+'تعبئة</button>':'')+'</div>':bodyHtml(s))+'</div>'});
  if(ed)h+=ui.edit==='s:new'?secEditor(null,ctx,true):'<button class="addcard" type="button" data-a="addSec">'+ic('plus')+'إضافة بند رئيسي</button>';
  return h+'</div>'}

/* project */
function renderProject(){
  const p=proj(ui.pid);if(!p||!canSee(p)){go('home');return}
  if(!canTab(p,ui.tab)){ui.tab='exec';enterTab(p,'exec')}
  let h='<button class="back" type="button" data-a="home">'+ic('back')+'المشاريع</button>';
  const xT=ui.tab==='exec'||ui.tab==='dec';const whoH=xT?(p.managerId?av(p.managerId,'sm')+esc(uname(p.managerId))+' <em>· المدير التنفيذي</em>':'<em>لم يُحدَّد المدير التنفيذي</em>'):av(p.memberId,'sm')+esc(uname(p.memberId))+' <em>· العضو المسؤول</em>';
  h+='<div class="phd">'+imgHtml(p,data.projects.indexOf(p))+'<div class="t"><h1>'+esc(p.name)+'</h1><span class="who">'+whoH+'</span></div>'+(isM()&&!xT?'<button class="tb" type="button" data-a="editP" aria-label="تعديل المشروع">'+ic('edit')+'</button>':'')+'</div>';
  h+='<div class="tabs"><div class="tabs-in" role="tablist">'+tabsFor(p).map(t=>{const b=t[0]===ui.tab?0:badge(p,t[0]);const e=t[0]==='plan'&&isM()?emptyN(p):0;const d=t[0]==='dec'&&ui.tab!=='dec'?pendDec(p).length:0;
    return '<button type="button" role="tab" class="tab'+(ui.tab===t[0]?' on':'')+'" aria-selected="'+(ui.tab===t[0])+'" data-a="tab" data-t="'+t[0]+'">'+t[1]+(b?'<span class="rb">'+b+'</span>':'')+(e?'<span class="ab" title="بنود لم تُعبّأ">'+e+'</span>':'')+(d&&!b?'<span class="rb" style="background:var(--amber)" title="بحاجة لقرار">'+d+'</span>':'')+'</button>'}).join('')+'</div></div>';
  h+='<div class="in">'+(ui.tab==='plan'?planTab(p):ui.tab==='found'?foundTab(p):ui.tab==='links'?linksTab(p):ui.tab==='dec'?decTab(p):execTab(p))+'</div>';
  $('#view').innerHTML='<div class="wrap">'+h+'</div>';focusMark();if($('#flow'))requestAnimationFrame(drawFlow);
  if(ui.scrollNew){ui.scrollNew=false;const n=$('#view .isnew, #view .rq.unread, #view .dcard');if(n&&n.getBoundingClientRect().top>window.innerHeight-80)n.scrollIntoView({behavior:'smooth',block:'center'})}}
window.addEventListener('resize',()=>{clearTimeout(window.__fr);window.__fr=setTimeout(()=>{if($('#flow'))drawFlow()},120)});
function focusMark(){const f=$('#view [data-focus]');if(f){f.focus();if(f.setSelectionRange&&f.value)f.setSelectionRange(f.value.length,f.value.length)}}

function planTab(p){const n=p.sections.length,filled=n-emptyN(p);
  return '<div class="bar-h"><div class="meter"><span class="tr"><i style="width:'+(n?filled/n*100:0)+'%"></i></span>'+filled+' من '+n+' معبّأة</div></div>'+secsHtml(p.sections,'plan',isM(),'plan')}

/* ---------- planning: strategic + operational ---------- */
const SST=[['todo','لم تبدأ'],['doing','قيد التنفيذ'],['done','منجزة']];
const GST=[['todo','لم تبدأ'],['doing','قيد التنفيذ'],['hold','متوقفة'],['done','منجزة']];
const stLbl=v=>(SST.find(x=>x[0]===v)||SST[0])[1];
const gLbl=v=>v==='disc'?'للمناقشة':(GST.find(x=>x[0]===v)||GST[0])[1];
const tLate=t=>t.status!=='done'&&!!t.due&&t.due<TODAY;
const rt=r=>r&&r.kind==='dec'?'dec':'exec';
function segH(k,opts,v){return '<div class="seg" role="group" aria-label="طريقة العرض">'+opts.map(x=>'<button type="button" data-a="pv" data-k="'+k+'" data-v="'+x[0]+'" class="'+(v===x[0]?'on':'')+'" title="'+x[1]+'" aria-label="'+x[1]+'" aria-pressed="'+(v===x[0])+'">'+ic(x[2])+'</button>').join('')+'</div>'}
function foundTab(p){const s=prefs.sub==='ops'?'ops':'strat';
  const sw='<div class="subtabs" role="tablist">'+[['strat','التخطيط الاستراتيجي'],['ops','التخطيط التشغيلي']].map(x=>'<button type="button" role="tab" class="'+(s===x[0]?'on':'')+'" aria-selected="'+(s===x[0])+'" data-a="subtab" data-v="'+x[0]+'">'+x[1]+'</button>').join('')+'</div>';
  return sw+(s==='ops'?opsView(p):stratView(p))}

/* numbering: done first (take the first numbers, shown at the bottom), then the rest, in their saved order */
function numOrder(arr,isDone){const d=arr.filter(isDone),o=arr.filter(x=>!isDone(x)),no=new Map();d.forEach((x,i)=>no.set(x.id,i+1));o.forEach((x,i)=>no.set(x.id,d.length+i+1));return {no,view:o.concat(d)}}

/* ===== strategic ===== */
function stLevels(st){const m=new Map(st.map(s=>[s.id,s])),lv={};
  const f=(s,path)=>{if(lv[s.id]!=null)return lv[s.id];if(path.has(s.id))return 0;path.add(s.id);const ds=(s.after||[]).map(i=>m.get(i)).filter(Boolean);const v=ds.length?1+Math.max(...ds.map(d=>f(d,path))):0;path.delete(s.id);lv[s.id]=v;return v};
  st.forEach(s=>f(s,new Set()));return lv}
function stCols(st){const lv=stLevels(st),cols=[];st.forEach(s=>{(cols[lv[s.id]]=cols[lv[s.id]]||[]).push(s)});return cols.filter(Boolean)}
function descOf(st,id){const out=new Set([id]);let ch=true;while(ch){ch=false;st.forEach(s=>{if(!out.has(s.id)&&(s.after||[]).some(a=>out.has(a))){out.add(s.id);ch=true}})}return out}
const colState=c=>c.every(s=>s.status==='done')?'done':c.some(s=>s.status==='hold')?'hold':c.some(s=>s.status==='doing'||s.status==='done')?'doing':c.every(s=>s.status==='disc')?'disc':'todo';
const isBoxes=p=>p.smode==='boxes';
const sNoun=p=>isBoxes(p)?'ملف':'مرحلة';
function stCard(p,s,n,ed,quick){const nw=isNewMark(s,'found'),disc=s.status==='disc';
  const body='<span class="sgc-top"><span class="sgc-n">'+n+'</span><span class="gst g-'+s.status+'">'+gLbl(s.status)+'</span></span><b class="sgc-t">'+esc(s.name)+(nw?' '+NEW:'')+'</b>'+(s.when?'<span class="sgc-w">'+ic('cal')+esc(s.when)+'</span>':'')+(s.note?'<span class="sgc-d">'+esc(s.note)+'</span>':'');
  const cls='sgc st-'+s.status+(nw?' isnew':'');
  if(disc)return '<div class="'+cls+'" data-sid="'+s.id+'">'+body+(ed?'<span class="sgc-f"><button class="btn sm ok" type="button" data-a="gOk" data-id="'+s.id+'">'+ic('check')+'اعتماد</button><button class="btn sm ghost rej" type="button" data-a="gNo" data-id="'+s.id+'">رفض</button><span class="sp"></span><button class="tb" type="button" data-a="stage" data-id="'+s.id+'" aria-label="تعديل">'+ic('edit')+'</button></span>':'')+'</div>';
  if(quick&&ed)return '<div class="'+cls+'" data-sid="'+s.id+'">'+body+'<span class="sgc-f"><label class="sr" for="sg-'+s.id+'">الحالة</label><select class="stsel s-'+s.status+'" id="sg-'+s.id+'" data-ch="stst" data-id="'+s.id+'">'+GST.map(o=>'<option value="'+o[0]+'"'+(o[0]===s.status?' selected':'')+'>'+o[1]+'</option>').join('')+'</select><span class="sp"></span><button class="tb" type="button" data-a="stage" data-id="'+s.id+'" aria-label="تعديل">'+ic('edit')+'</button></span></div>';
  return ed?'<button type="button" class="'+cls+'" data-a="stage" data-id="'+s.id+'" data-sid="'+s.id+'">'+body+'</button>':'<div class="'+cls+'" data-sid="'+s.id+'">'+body+'</div>'}
function stratView(p){const ed=isM(),st=p.stages,bx=isBoxes(p),nn=sNoun(p);
  const vs=bx?[['grid','مربعات','tiles'],['rows','قائمة','list']]:[['flow','مخطط تدفق','flow'],['tl','خط زمني','list'],['road','خارطة طريق','road']];
  const key=bx?'bv':'sv';let v=prefs[key];if(!vs.some(x=>x[0]===v))v=bx?'grid':(window.innerWidth<760?'tl':'flow');
  let h='<div class="bar-h">'+(ed?'<div class="seg txt" role="group" aria-label="النمط"><button type="button" class="'+(bx?'':'on')+'" data-a="smode" data-v="stages" aria-pressed="'+!bx+'">'+ic('flow')+'مراحل مترابطة</button><button type="button" class="'+(bx?'on':'')+'" data-a="smode" data-v="boxes" aria-pressed="'+bx+'">'+ic('tiles')+'ملفات منفصلة</button></div>':'<h2>'+(bx?'الملفات الاستراتيجية':'مراحل المشروع')+'</h2>')+'<span class="sp"></span>'+(st.length?segH(key,vs,v):'')+(ed?'<button class="btn sm primary" type="button" data-a="stAdd" data-next="1">'+ic('plus')+nn+'</button>':'')+'</div>';
  if(!st.length)return h+'<div class="empty"><span class="e">'+ic(bx?'tiles':'flow')+'</span><b>'+(bx?'لا ملفات بعد':'لا مراحل بعد')+'</b><span>'+(bx?'ملفات استراتيجية مستقلة، كل واحد يُناقش ويُعتمد لوحده':'مراحل متتالية أو متوازية أو مزيج بينهما')+'</span>'+(ed?'<button class="btn primary" type="button" data-a="stAdd" data-next="1">'+ic('plus')+(bx?'أول ملف':'أول مرحلة')+'</button>':'')+'</div>';
  if(bx){const num=new Map(st.map((s,i)=>[s.id,i+1]));
    if(v==='rows')return h+'<div class="bxrows">'+st.map(s=>stCard(p,s,num.get(s.id),ed,true)).join('')+'</div>';
    return h+'<div class="bxgrid">'+st.map(s=>stCard(p,s,num.get(s.id),ed,true)).join('')+(ed?'<button type="button" class="sg-add big" data-a="stAdd" data-next="1">'+ic('plus')+'ملف جديد</button>':'')+'</div>'}
  const cols=stCols(st);let n=0;const num=new Map();cols.forEach(cl=>cl.forEach(s=>num.set(s.id,++n)));
  const addPar=i=>ed?'<button type="button" class="sg-add" data-a="stAdd" data-col="'+i+'">'+ic('plus')+'بالتوازي</button>':'';
  if(v==='tl')return h+'<div class="vtl">'+cols.map((cl,i)=>{const cs=colState(cl);
      return '<div class="vt-g c-'+cs+'"><span class="vt-dot">'+(cs==='done'?ic('check'):i+1)+'</span><div class="vt-b">'+(cl.length>1?'<span class="vt-par">'+cl.length+' مراحل متوازية</span>':'')+'<div class="vt-cards'+(cl.length>1?' multi':'')+'">'+cl.map(s=>stCard(p,s,num.get(s.id),ed,true)).join('')+'</div>'+addPar(i)+'</div></div>'}).join('')+
    (ed?'<div class="vt-g vt-end"><span class="vt-dot">'+ic('plus')+'</span><div class="vt-b"><button type="button" class="sg-add big" data-a="stAdd" data-next="1">'+ic('plus')+'مرحلة تالية</button></div></div>':'')+'</div>';
  if(v==='road')return h+'<div class="road"><div class="rd-in">'+cols.map((cl,i)=>{const cs=colState(cl);
      return '<div class="rd-st c-'+cs+(cs==='done'?' lnk':'')+(i===cols.length-1?' last':'')+'"><span class="rd-dot">'+(cs==='done'?ic('check'):i+1)+'</span>'+(cl.length>1?'<span class="rd-par">بالتوازي</span>':'')+'<div class="rd-items">'+cl.map(s=>stCard(p,s,num.get(s.id),ed)).join('')+'</div></div>'}).join('')+'</div></div>';
  return h+'<div class="flow" id="flow"><div class="fl-in"><svg class="fl-svg" aria-hidden="true"></svg>'+cols.map((cl,i)=>'<div class="fl-col c-'+colState(cl)+'"><span class="fl-h">'+(cl.length>1?'بالتوازي':'المرحلة '+(i+1))+'</span>'+cl.map(s=>stCard(p,s,num.get(s.id),ed)).join('')+addPar(i)+'</div>').join('')+
    (ed?'<div class="fl-col fl-end"><button type="button" class="sg-add big" data-a="stAdd" data-next="1">'+ic('plus')+'مرحلة تالية</button></div>':'')+'</div></div>'}
function drawFlow(){const w=$('#flow');if(!w)return;const inn=w.querySelector('.fl-in'),svg=w.querySelector('svg'),p=proj(ui.pid);if(!p||!inn)return;
  const R=inn.getBoundingClientRect();svg.setAttribute('width',inn.scrollWidth);svg.setAttribute('height',inn.scrollHeight);svg.setAttribute('viewBox','0 0 '+inn.scrollWidth+' '+inn.scrollHeight);
  const box=id=>{const e=inn.querySelector('[data-sid="'+id+'"]');return e?e.getBoundingClientRect():null};
  let g='<defs><marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L8 4L0 8z" fill="context-stroke"/></marker></defs>';
  p.stages.forEach(s=>(s.after||[]).forEach(a=>{const A=box(a),B=box(s.id);if(!A||!B)return;
    const x1=A.left-R.left,y1=A.top-R.top+A.height/2,x2=B.right-R.left+3,y2=B.top-R.top+B.height/2,dx=Math.max(22,(x1-x2)/2);
    const dn=p.stages.find(x=>x.id===a);const cls=dn&&dn.status==='done'?'ok':dn&&dn.status==='hold'?'hold':s.status==='disc'?'disc':'';
    g+='<path class="'+cls+'" d="M'+x1+' '+y1+' C'+(x1-dx)+' '+y1+' '+(x2+dx)+' '+y2+' '+x2+' '+y2+'" marker-end="url(#ah)"/>'}));
  svg.innerHTML=g}
function removeStage(p,s){p.stages.forEach(x=>{if((x.after||[]).includes(s.id))x.after=[...new Set(x.after.filter(a=>a!==s.id).concat(s.after||[]))]});p.stages=p.stages.filter(x=>x!==s)}
function stageForm(s,preset){const p=proj(ui.pid),st=p.stages,isNew=!s,bx=isBoxes(p),nn=sNoun(p);
  const block=s?descOf(st,s.id):new Set(),opts=st.filter(x=>!block.has(x.id));
  const after=s?(s.after||[]):(preset||[]);
  const same=(a,b)=>a.length===b.length&&a.every(x=>b.includes(x));
  let pos='start';if(after.length===1&&opts.some(o=>o.id===after[0]))pos='after:'+after[0];else if(after.length>1)pos='adv';
  if(after.length){const par=opts.find(o=>o!==s&&same(o.after||[],after));if(par&&after.length>1)pos='par:'+par.id}
  const nm=x=>esc(x.name),disc=!s||s.status==='disc';
  modal({title:isNew?(bx?'ملف جديد':'مرحلة جديدة'):(bx?'تعديل الملف':'تعديل المرحلة'),submit:isNew?'إضافة':'حفظ',
    body:'<div class="f"><label for="gn">'+(bx?'اسم الملف':'اسم المرحلة')+'</label><input class="fi" id="gn" name="name" value="'+esc(s?s.name:'')+'" data-req></div>'+
      '<div class="two"><div class="f"><label for="gw">الفترة (اختياري)</label><input class="fi" id="gw" name="when" value="'+esc(s?s.when||'':'')+'" placeholder="مثال: الربع الأول 2027"></div><div class="f"><label for="gs">الحالة</label>'+(disc?'<input class="fi" id="gs" value="للمناقشة" disabled><span class="help">تُعتمد أو تُرفض من البطاقة</span>':'<select id="gs" name="status">'+GST.map(o=>'<option value="'+o[0]+'"'+(o[0]===s.status?' selected':'')+'>'+o[1]+'</option>').join('')+'</select>')+'</div></div>'+
      '<div class="f"><label for="gt">وصف مختصر (اختياري)</label><textarea class="ta" id="gt" name="note" style="min-height:64px">'+esc(s?s.note||'':'')+'</textarea></div>'+
      (!bx&&opts.length?'<div class="f"><label for="gp">موقعها في المسار</label><select id="gp" name="pos"><option value="start"'+(pos==='start'?' selected':'')+'>من بداية المشروع</option><optgroup label="تبدأ بعد">'+opts.map(o=>'<option value="after:'+o.id+'"'+(pos==='after:'+o.id?' selected':'')+'>بعد: '+nm(o)+'</option>').join('')+'</optgroup><optgroup label="تسير بالتوازي مع">'+opts.filter(o=>o!==s).map(o=>'<option value="par:'+o.id+'"'+(pos==='par:'+o.id?' selected':'')+'>بالتوازي مع: '+nm(o)+'</option>').join('')+'</optgroup><option value="adv"'+(pos==='adv'?' selected':'')+'>بعد عدة مراحل معاً…</option></select>'+
        '<div class="afters" id="gadv"'+(pos==='adv'?'':' hidden')+'>'+opts.map(x=>'<label class="chk"><input type="checkbox" name="after" value="'+x.id+'"'+(after.includes(x.id)?' checked':'')+'> '+nm(x)+'</label>').join('')+'</div><span class="help">مرحلتان تبدآن بعد نفس المرحلة تسيران بالتوازي.</span></div>':''),
    extra:s?'<button class="btn danger" type="button" id="gdel">'+ic('trash')+'حذف</button>':'',
    after:f=>{const ps=f.querySelector('#gp');if(ps)ps.onchange=()=>{f.querySelector('#gadv').hidden=ps.value!=='adv'};
      const dl=f.querySelector('#gdel');if(dl)dl.onclick=()=>confirmBox('حذف '+(bx?'الملف':'المرحلة'),'سيُحذف «'+s.name+'»'+(bx?'.':'، وتتصل المراحل التي بعدها بما قبلها.'),'حذف',()=>{removeStage(p,s);touch(p,'found');save();render()})},
    onSubmit:(v,f)=>{let af=s?(s.after||[]):[];
      if(!bx){af=[];const ps=v.pos||'start';if(ps.startsWith('after:'))af=[ps.slice(6)];else if(ps.startsWith('par:')){const o=st.find(x=>x.id===ps.slice(4));af=o?(o.after||[]).slice():[]}else if(ps==='adv')af=[...f.querySelectorAll('[name=after]:checked')].map(x=>x.value)}
      const o={name:v.name,when:v.when||'',status:disc?'disc':(v.status||s.status),note:v.note||'',after:af,u:me().id,at:Date.now()};
      if(s)Object.assign(s,o);else st.push(Object.assign({id:uid('g')},o));
      touch(p,'found');setSeen(p.id,'found');save();setTimeout(()=>{render();if(isNew)toast('أُضيف «'+v.name+'» للمناقشة')},0)}})}
function stApprove(id){const p=proj(ui.pid),s=p.stages.find(x=>x.id===id);if(!s)return;
  modal({title:'اعتماد «'+s.name+'»',submit:'اعتماد',body:'<p class="note-s">بعد الاعتماد تصبح جاهزة للتنفيذ، وتبدأ بحالة «لم تبدأ».</p>',
    onSubmit:()=>{s.status='todo';s.ok={u:me().id,at:Date.now()};s.u=me().id;s.at=Date.now();touch(p,'found');setSeen(p.id,'found');save();setTimeout(()=>{render();toast('اعتُمد «'+s.name+'»')},0)}})}
function stReject(id){const p=proj(ui.pid),s=p.stages.find(x=>x.id===id);if(!s)return;
  confirmBox('رفض «'+s.name+'»','عند الرفض يُحذف نهائياً من التخطيط الاستراتيجي.','رفض وحذف',()=>{removeStage(p,s);touch(p,'found');save();render();toast('رُفض «'+s.name+'» وحُذف')})}

/* ===== operational ===== */
function itLink(p,it){if(!it.rid||!it.tid)return null;const r=p.requests.find(x=>x.id===it.rid);const t=r&&(r.tasks||[]).find(x=>x.id===it.tid);return t?{r,t}:null}
function itState(p,it){const l=itLink(p,it);if(l)return l.t.status==='done'?'done':'sent';return it.done?'done':'draft'}
const itDone=(p,it)=>itState(p,it)==='done';
const opDone=(p,o)=>o.items.length>0&&o.items.every(it=>itDone(p,it));
const opNums=p=>numOrder(p.ops,o=>opDone(p,o));
const itNums=(p,o)=>numOrder(o.items,it=>itDone(p,it));
function codeOf(p,oid,iid){const o=(p.ops||[]).find(x=>x.id===oid);if(!o)return '';const fn=opNums(p).no.get(o.id);if(!iid)return String(fn);const it=o.items.find(x=>x.id===iid);return it?fn+'.'+itNums(p,o).no.get(it.id):''}
const fileReq=(p,o)=>o.rid?p.requests.find(r=>r.id===o.rid&&r.kind==='req')||null:null;
function itCtl(p,o,it,s,ed){
  if(s==='draft')return ed?'<button class="btn sm apv" type="button" data-a="approve" data-oid="'+o.id+'" data-id="'+it.id+'" title="ترحيل إلى الإدارة التنفيذية">'+ic('fwd')+'ترحيل</button>':'<span class="ist i-draft">لم تُرحَّل</span>';
  const l=itLink(p,it);if(!l)return '<span class="ist i-done">'+ic('check')+'منجزة</span>';
  const t=l.t,late=tLate(t),can=canTab(p,'exec');
  return '<span class="itc">'+(t.due?'<span class="date'+(late?' past':'')+'">'+(late?ic('alert'):ic('cal'))+fmtD(t.due)+'</span>':t.status!=='done'?'<span class="nodue">بلا موعد</span>':'')+
    (can?'<label class="sr" for="it-'+t.id+'">حالة المهمة</label><select class="stsel s-'+t.status+'" id="it-'+t.id+'" data-ch="tkst" data-rid="'+l.r.id+'" data-id="'+t.id+'">'+SST.map(x=>'<option value="'+x[0]+'"'+(x[0]===t.status?' selected':'')+'>'+x[1]+'</option>').join('')+'</select>':'<span class="stsel s-'+t.status+'">'+stLbl(t.status)+'</span>')+'</span>'}
function itTools(p,o,it,s){if(!isM())return '';const ok=s==='draft'||(!it.rid&&s==='done')||cur().admin;
  return '<span class="tools"><button class="tb" type="button" data-a="editItem" data-oid="'+o.id+'" data-id="'+it.id+'" aria-label="تعديل">'+ic('edit')+'</button>'+(ok?'<button class="tb del" type="button" data-a="delItem" data-oid="'+o.id+'" data-id="'+it.id+'" aria-label="حذف">'+ic('trash')+'</button>':'')+'</span>'}
const DRAG='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="6" r="1.3"/><circle cx="15" cy="6" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="9" cy="18" r="1.3"/><circle cx="15" cy="18" r="1.3"/></svg>';
function opsView(p){const ed=isM(),ops=p.ops,v=['list','board','table'].includes(prefs.ov)?prefs.ov:'list',ON=opNums(p);
  const all=ON.view.flatMap(o=>{const IN=itNums(p,o);return IN.view.map(it=>({o,it,s:itState(p,it),code:ON.no.get(o.id)+'.'+IN.no.get(it.id)}))});const n=k=>all.filter(x=>x.s===k).length;
  let h='<div class="kpis"><div class="kp"><b>'+ops.length+'</b><small>ملفات التطوير</small></div><div class="kp a"><b>'+n('draft')+'</b><small>مهام لم تُرحَّل</small></div><div class="kp b"><b>'+n('sent')+'</b><small>مرحّلة قيد العمل</small></div><div class="kp d"><b>'+n('done')+'</b><small>منجزة</small></div></div>';
  h+='<div class="bar-h" style="margin-top:18px"><h2>ملفات التطوير</h2><span class="sp"></span>'+(ops.length?segH('ov',[['list','ملفات','list'],['board','لوحة','board'],['table','جدول','table']],v):'')+(ed?'<button class="btn sm primary" type="button" data-a="newOp">'+ic('plus')+'ملف تطوير</button>':'')+'</div>';
  if(!ops.length)return h+'<div class="empty"><span class="e">'+ic('folder')+'</span><b>لا ملفات تطوير بعد</b><span>مثال: التطبيق، مسار التطوع، الفعاليات، الميديا</span>'+(ed?'<button class="btn primary" type="button" data-a="newOp">'+ic('plus')+'أول ملف</button>':'')+'</div>';
  if(v==='board'){const colH=(k,t)=>{const xs=all.filter(x=>x.s===k);return '<div class="bcol c-'+k+'"><div class="bc-h"><b>'+t+'</b><span class="n">'+xs.length+'</span></div>'+(xs.map(x=>{const nw=isNewMark(x.it,'found');
      return '<div class="bcard'+(nw?' isnew':'')+'"><span class="code">'+x.code+'</span><b>'+esc(x.it.t)+(nw?' '+NEW:'')+'</b><small>'+esc(x.o.name)+'</small><div class="row">'+itCtl(p,x.o,x.it,k,ed)+itTools(p,x.o,x.it,k)+'</div></div>'}).join('')||'<span class="bempty">لا شيء</span>')+'</div>'};
    return h+'<div class="board">'+colH('draft','لم تُرحَّل')+colH('sent','مرحّلة قيد العمل')+colH('done','منجزة')+'</div>'}
  if(v==='table')return h+'<div class="tblw"><table class="otab"><thead><tr><th>الرمز</th><th>المهمة</th><th>الملف</th><th>الحالة</th></tr></thead><tbody>'+all.map(x=>'<tr class="r-'+x.s+'"><td><span class="code">'+x.code+'</span></td><td>'+esc(x.it.t)+(x.it.note?'<small>'+esc(x.it.note)+'</small>':'')+'</td><td>'+esc(x.o.name)+'</td><td>'+itCtl(p,x.o,x.it,x.s,ed)+'</td></tr>').join('')+'</tbody></table></div>';
  return h+'<div class="ofiles" data-dlist="ops">'+ON.view.map(o=>{const IN=itNums(p,o),fno=ON.no.get(o.id),its=IN.view.map(it=>({it,s:itState(p,it)})),od=opDone(p,o);
    const appr=its.filter(x=>x.it.rid&&x.it.tid&&x.s!=='draft'),ad=appr.filter(x=>x.s==='done').length,dn=its.filter(x=>x.s==='done').length;
    const nw=isNewMark(o,'found')||o.items.some(it=>isNewMark(it,'found')),exp=nw||!ui.folded[o.id],r=fileReq(p,o);
    const canDelO=ed&&(!r||cur().admin);
    let x='<section class="ofile'+(od?' o-done':r?' o-sent':'')+(nw?' isnew':'')+'" data-did="'+o.id+'" data-grp="'+(od?'d':'o')+'"><div class="of-h">'+(ed&&v==='list'?'<span class="dh" data-drag title="اسحب لتغيير الترتيب" aria-label="تغيير الترتيب">'+DRAG+'</span>':'')+'<span class="of-n">'+(od?ic('check'):fno)+'</span><div class="of-t"><b>'+(od?'<span class="code">'+fno+'</span>':'')+esc(o.name)+(isNewMark(o,'found')?' '+NEW:'')+'</b><small>'+o.items.length+' مهام'+(dn&&!appr.length?' · '+dn+' منجزة':'')+'</small></div>'+
      (appr.length?'<button class="opr'+(ad===appr.length?' full':'')+'" type="button" data-a="goR" data-id="'+(r?r.id:'')+'" title="فتح في الإدارة التنفيذية"><span class="opr-bar"><i style="width:'+(ad/appr.length*100)+'%"></i></span>أُنجز <b>'+ad+'</b> من <b>'+appr.length+'</b> مرحّلة'+ic('fwd')+'</button>':'')+
      (ed?'<span class="tools on"><button class="tb" type="button" data-a="editOp" data-id="'+o.id+'" aria-label="تعديل الملف">'+ic('edit')+'</button>'+(canDelO?'<button class="tb del" type="button" data-a="delOp" data-id="'+o.id+'" aria-label="حذف الملف">'+ic('trash')+'</button>':'')+'</span>':'')+
      '<button class="fold'+(exp?' open':'')+'" type="button" data-a="ofold" data-id="'+o.id+'" aria-expanded="'+exp+'" aria-label="'+(exp?'إخفاء المهام':'إظهار المهام')+'"><svg class="i" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button></div><div class="st-p"><i style="width:'+(its.length?dn/its.length*100:0)+'%"></i></div>';
    if(exp){x+='<div class="subs" data-dlist="it:'+o.id+'">'+its.map(({it,s})=>{const inw=isNewMark(it,'found'),d=s==='done';
        return '<div class="oit s-'+s+(inw?' isnew':'')+'" data-did="'+it.id+'" data-grp="'+(d?'d':'o')+'">'+(ed?'<span class="dh sm" data-drag title="اسحب لتغيير الترتيب" aria-label="تغيير الترتيب">'+DRAG+'</span>':'')+'<span class="code">'+fno+'.'+IN.no.get(it.id)+'</span><span class="nmw"><span class="nm">'+esc(it.t)+(inw?' '+NEW:'')+'</span>'+(it.note?'<span class="snote"><span>'+esc(it.note)+'</span></span>':'')+'</span>'+itCtl(p,o,it,s,ed)+itTools(p,o,it,s)+'</div>'}).join('');
      if(ed)x+='<form class="subadd" data-form="addItem" data-oid="'+o.id+'"><input class="fi" name="t" placeholder="'+(o.items.length?'+ مهمة فرعية':'أضف أول مهمة فرعية لهذا الملف')+'" aria-label="مهمة فرعية جديدة"'+(ui.focusSub==='o'+o.id?' data-focus':'')+'><button class="btn sm primary" type="submit">'+ic('plus')+'إضافة</button></form>';
      x+='</div>'}
    return x+'</section>'}).join('')+'</div>'}
function opForm(o){const p=proj(ui.pid);
  modal({title:o?'تعديل ملف التطوير':'ملف تطوير جديد',submit:o?'حفظ':'إنشاء',body:'<div class="f"><label for="on">اسم الملف</label><input class="fi" id="on" name="name" value="'+esc(o?o.name:'')+'" placeholder="مثال: مسار التطوع" data-req></div>',
    onSubmit:v=>{if(o){o.name=v.name;o.u=me().id;o.at=Date.now();const r=fileReq(p,o);if(r){r.title=v.name;if(r.src)r.src.file=v.name;touch(p,'exec')}}
      else{const no={id:uid('o'),name:v.name,items:[],u:me().id,at:Date.now()};p.ops.push(no);ui.focusSub='o'+no.id;ui.folded[no.id]=false}
      touch(p,'found');setSeen(p.id,'found');save();setTimeout(()=>{render();ui.focusSub=null},0)}})}
function itemForm(o,it){const p=proj(ui.pid),l=itLink(p,it);
  modal({title:'المهمة '+codeOf(p,o.id,it.id),submit:'حفظ',
    body:'<div class="f"><label for="it">المهمة الفرعية</label><input class="fi" id="it" name="t" value="'+esc(it.t)+'" data-req></div><div class="f"><label for="inote">تفاصيل للمدير التنفيذي (اختياري)</label><textarea class="ta" id="inote" name="note" style="min-height:80px">'+esc(it.note||'')+'</textarea>'+(l?'<span class="help">تتحدّث المهمة في الإدارة التنفيذية أيضاً</span>':'<span class="help">تُرسل مع المهمة عند ترحيلها</span>')+'</div>'+(l?'':'<label class="chk"><input type="checkbox" name="done"'+(it.done?' checked':'')+'> منجزة دون ترحيل إلى الإدارة التنفيذية</label>'),
    onSubmit:(v,f)=>{it.t=v.t;it.note=v.note||'';if(!l)it.done=f.querySelector('[name=done]').checked;else{l.t.t=v.t;l.t.note=it.note;touch(p,'exec')}it.u=me().id;it.at=Date.now();touch(p,'found');setSeen(p.id,'found');save();setTimeout(render,0)}})}
function ensureFileReq(p,o){let r=fileReq(p,o);if(r)return [r,false];const now=Date.now();
  r={id:uid('r'),kind:'req',title:o.name,src:{oid:o.id,file:o.name},by:me().id,at:now,done:false,tasks:[],seen:{},msgs:[{id:uid('c'),u:me().id,at:now,t:'ملف مرحّل من التخطيط التشغيلي · '+o.name,files:[]}]};
  data.users.forEach(u=>r.seen[u.id]=u.id===me().id?1:0);p.requests.unshift(r);o.rid=r.id;return [r,true]}
function approveItem(oid,iid){const p=proj(ui.pid),o=p.ops.find(x=>x.id===oid),it=o&&o.items.find(x=>x.id===iid);if(!it||itState(p,it)!=='draft')return;
  const now=Date.now(),[r,created]=ensureFileReq(p,o),wasDone=r.done;
  const t={id:uid('k'),t:it.t,note:it.note||'',status:'todo',due:'',src:{iid:it.id},u:me().id,at:now};
  r.tasks=r.tasks||[];r.tasks.push(t);it.rid=r.id;it.tid=t.id;it.done=false;it.u=me().id;it.at=now;ui.rtOpen[r.id]=true;
  touch(p,'found');touch(p,'exec');setSeen(p.id,'found');save();render();const code=codeOf(p,o.id,it.id);
  toast('رُحّلت '+code+(created?' وانتقل ملف «'+o.name+'» إلى الإدارة التنفيذية':' إلى ملف «'+o.name+'»'),null,()=>{r.tasks=r.tasks.filter(x=>x!==t);r.done=wasDone;it.rid=null;it.tid=null;if(created){p.requests=p.requests.filter(x=>x!==r);o.rid=null}save();render()})}
function unlinkReq(p,r){(p.ops||[]).forEach(o=>{if(o.rid===r.id)o.rid=null;o.items.forEach(it=>{if(it.rid===r.id){it.rid=null;it.tid=null}})})}
function delOpFlow(p,o){const r=fileReq(p,o);
  modal({title:'حذف ملف التطوير',danger:true,submit:'حذف',body:'<p class="note-s">سيُحذف «'+esc(o.name)+'» ومهامه ('+o.items.length+') من التخطيط التشغيلي، ويُعاد ترقيم باقي الملفات.</p>'+(r?'<label class="chk"><input type="checkbox" name="alsoR" checked> حذف ملفه في الإدارة التنفيذية أيضاً، مع محادثته ومهامه</label>':''),
    onSubmit:(v,f)=>{const also=r&&f.querySelector('[name=alsoR]').checked;p.ops=p.ops.filter(x=>x!==o);if(also){p.requests=p.requests.filter(x=>x!==r);touch(p,'exec')}else if(r&&r.src){delete r.src.oid}
      touch(p,'found');save();setTimeout(render,0);toast('حُذف «'+o.name+'»')}})}
function delItemFlow(p,o,it){const l=itLink(p,it),i=o.items.indexOf(it),code=codeOf(p,o.id,it.id);
  const run=()=>{o.items.splice(o.items.indexOf(it),1);let ti=-1;if(l){ti=l.r.tasks.indexOf(l.t);l.r.tasks.splice(ti,1);touch(p,'exec')}touch(p,'found');save();render();
    toast('حُذفت المهمة '+code,null,()=>{o.items.splice(i,0,it);if(l)l.r.tasks.splice(ti,0,l.t);save();render()})};
  if(l)confirmBox('حذف مهمة مرحّلة','المهمة '+code+' مرحّلة، وستُحذف من الإدارة التنفيذية أيضاً.','حذف',run);else run()}

/* drag to reorder (mouse + touch) */
function commitOrder(key,ids){const p=proj(ui.pid);if(!p)return;const ix=new Map(ids.map((id,i)=>[id,i])),srt=a=>a.slice().sort((x,y)=>(ix.has(x.id)?ix.get(x.id):1e6)-(ix.has(y.id)?ix.get(y.id):1e6));
  let arr,set;if(key==='ops'){arr=p.ops;set=v=>p.ops=v}else if(key.startsWith('it:')){const o=p.ops.find(x=>x.id===key.slice(3));if(!o)return;arr=o.items;set=v=>o.items=v}else return;
  const nv=srt(arr);if(J(nv.map(x=>x.id))===J(arr.map(x=>x.id))){render();return}set(nv);touch(p,'found');setSeen(p.id,'found');save();render()}
let DRAG_END=null;
document.addEventListener('pointerdown',e=>{const hd=e.target.closest('[data-drag]');if(!hd||(e.pointerType==='mouse'&&e.button!==0))return;if(DRAG_END)DRAG_END(false);
  const el=hd.closest('[data-did]'),list=el&&el.parentElement;if(!list||!list.dataset.dlist)return;
  e.preventDefault();const grp=el.dataset.grp,startY=e.clientY;let moved=false,raf=0,lastY=startY;
  ui.dragging=true;el.classList.add('dragging');document.body.classList.add('is-drag');
  const sib=()=>[...list.children].filter(x=>x.dataset&&x.dataset.did&&x.dataset.grp===grp&&x!==el);
  const place=y=>{const s=sib();let before=null;for(const x of s){const r=x.getBoundingClientRect();if(y<r.top+r.height/2){before=x;break}}
    if(before){if(before!==el.nextElementSibling)list.insertBefore(el,before)}else{const last=s[s.length-1];if(last&&last.nextElementSibling!==el)last.after(el)}};
  const tick=()=>{raf=0;if(lastY<80)window.scrollBy(0,-12);else if(lastY>window.innerHeight-80)window.scrollBy(0,12);place(lastY);if(lastY<80||lastY>window.innerHeight-80)raf=requestAnimationFrame(tick)};
  const mv=ev=>{lastY=ev.clientY;if(Math.abs(lastY-startY)>4)moved=true;if(!raf)raf=requestAnimationFrame(tick);ev.preventDefault()};
  const end=commit=>{if(DRAG_END!==end)return;DRAG_END=null;if(raf)cancelAnimationFrame(raf);
    window.removeEventListener('pointermove',mv);window.removeEventListener('pointerup',onUp);window.removeEventListener('pointercancel',onCancel);window.removeEventListener('blur',onCancel);document.removeEventListener('keydown',onKey);
    el.classList.remove('dragging');document.body.classList.remove('is-drag');ui.dragging=false;
    if(commit&&moved)commitOrder(list.dataset.dlist,[...list.children].filter(x=>x.dataset&&x.dataset.did).map(x=>x.dataset.did));else render()};
  const onUp=()=>end(true),onCancel=()=>end(false),onKey=k=>{if(k.key==='Escape')end(false)};
  DRAG_END=end;
  window.addEventListener('pointermove',mv,{passive:false});window.addEventListener('pointerup',onUp);window.addEventListener('pointercancel',onCancel);window.addEventListener('blur',onCancel);document.addEventListener('keydown',onKey)});
/* ===== execution: files with sub-tasks ===== */
function syncReq(r){if(r.kind!=='req')return;const ts=(r.tasks||[]).filter(t=>!t.pending);if(ts.length)r.done=ts.every(t=>t.status==='done')}
const fileLate=r=>r.kind==='req'&&!r.done&&(r.tasks||[]).some(tLate);
const nextDue=r=>(r.tasks||[]).filter(t=>t.status!=='done'&&t.due).map(t=>t.due).sort()[0]||'';
const canDue=p=>canTab(p,'exec')&&(!isM()||!p.managerId);
function taskView(p,r){const ts=r.tasks||[],o=r.src&&r.src.oid&&(p.ops||[]).find(x=>x.id===r.src.oid);
  const IN=o?itNums(p,o):null,pos=new Map(IN?IN.view.map((it,i)=>[it.id,i]):[]);
  const key=t=>{const iid=t.src&&t.src.iid;return iid&&pos.has(iid)?pos.get(iid):1e4+(t.status==='done'?1e4:0)+ts.indexOf(t)};
  return ts.slice().sort((a,b)=>key(a)-key(b)).map(t=>({t,code:o&&t.src&&t.src.iid&&IN.no.has(t.src.iid)?codeOf(p,o.id,t.src.iid):''}))}
function taskStrip(p,r){const ts=r.tasks||[],can=canTab(p,'exec'),add=can;if(!ts.length&&!add)return '';
  const open=!!ui.rtOpen[r.id]||ui.focusSub==='r'+r.id,dn=ts.filter(t=>t.status==='done').length,lt=ts.filter(tLate).length,dg=ts.filter(t=>t.status==='doing').length,nd=ts.filter(t=>t.status!=='done'&&!t.due&&!t.pending).length,pn=ts.filter(t=>t.pending).length;
  let h='<button type="button" class="rt-sum'+(open?' open':'')+'" data-a="rtTog" data-id="'+r.id+'" aria-expanded="'+open+'">'+ic('tasks')+(ts.length?'<span>أُنجز <b>'+dn+'</b> من <b>'+ts.length+'</b> مهام</span><span class="rt-bar"><i style="width:'+(dn/ts.length*100)+'%"></i></span>'+(dg?'<span class="rt-c d">'+dg+' قيد التنفيذ</span>':'')+(lt?'<span class="rt-c l">'+lt+' متأخرة</span>':'')+(nd&&p.managerId?'<span class="rt-c w">'+nd+' بلا موعد</span>':'')+(pn?'<span class="rt-c p">'+pn+' بانتظار اعتماد اللجنة</span>':''):'<span>إضافة مهام فرعية</span>')+'<svg class="i chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>';
  if(!open)return h;
  const cd=canDue(p);
  h+='<div class="rtasks">'+taskView(p,r).map(({t,code})=>{const late=tLate(t),nw=isNewMark(t,'exec');
    const due=t.due?(cd?'<button type="button" class="date'+(late?' past':'')+'" data-a="editTask" data-rid="'+r.id+'" data-id="'+t.id+'" title="تعديل الموعد">'+(late?ic('alert'):ic('cal'))+fmtD(t.due)+'</button>':'<span class="date'+(late?' past':'')+'">'+(late?ic('alert'):ic('cal'))+fmtD(t.due)+'</span>'):t.status==='done'?'':cd?'<button type="button" class="setdue" data-a="editTask" data-rid="'+r.id+'" data-id="'+t.id+'">'+ic('cal')+'تحديد الموعد</button>':'<span class="nodue">بانتظار موعد من المدير</span>';
    const mine=t.u===me().id;
    return '<div class="tk s-'+t.status+(t.pending?' pend':'')+(nw?' isnew':'')+'">'+(code?'<span class="code">'+code+'</span>':'')+'<span class="nmw"><span class="nm">'+esc(t.t)+(nw?' '+NEW:'')+'</span>'+(t.note?'<span class="snote"><span>'+esc(t.note)+'</span></span>':'')+(t.pending?'<span class="pnote">'+ic('pause')+'أضافها '+esc(shortName(t.u))+' · بانتظار اعتماد اللجنة</span>':'')+'</span>'+(t.pending&&isM()?'<span class="tkok"><button class="btn sm ok" type="button" data-a="tkOk" data-rid="'+r.id+'" data-id="'+t.id+'">'+ic('check')+'اعتماد</button><button class="btn sm ghost rej" type="button" data-a="tkNo" data-rid="'+r.id+'" data-id="'+t.id+'">رفض</button></span>':'')+due+
      (can?'<label class="sr" for="tk-'+t.id+'">حالة المهمة</label><select class="stsel s-'+t.status+'" id="tk-'+t.id+'" data-ch="tkst" data-rid="'+r.id+'" data-id="'+t.id+'">'+SST.map(o=>'<option value="'+o[0]+'"'+(o[0]===t.status?' selected':'')+'>'+o[1]+'</option>').join('')+'</select>':'<span class="stsel s-'+t.status+'">'+stLbl(t.status)+'</span>')+
      (isM()||(t.pending&&mine)?'<span class="tools"><button class="tb" type="button" data-a="editTask" data-rid="'+r.id+'" data-id="'+t.id+'" aria-label="تعديل">'+ic('edit')+'</button><button class="tb del" type="button" data-a="delTask" data-rid="'+r.id+'" data-id="'+t.id+'" aria-label="حذف">'+ic('trash')+'</button></span>':'')+'</div>'}).join('');
  if(add)h+=isM()?'<form class="tkadd" data-form="addTask" data-rid="'+r.id+'"><input class="fi" name="t" placeholder="+ مهمة فرعية للمدير التنفيذي" aria-label="مهمة فرعية جديدة" data-req'+(ui.focusSub==='r'+r.id?' data-focus':'')+'><button class="btn sm primary" type="submit">إضافة</button></form>':'<form class="tkadd mg" data-form="addTask" data-rid="'+r.id+'"><input class="fi" name="t" placeholder="+ مهمة فرعية تقترحها على اللجنة" aria-label="مهمة فرعية جديدة" data-req'+(ui.focusSub==='r'+r.id?' data-focus':'')+'><input class="fi" type="date" name="due" aria-label="تاريخ الإنجاز" value="'+D(7)+'"><button class="btn sm primary" type="submit">إرسال</button></form>';
  return h+'</div>'}
function linkToPlan(p,r,t){const o=r.src&&r.src.oid&&(p.ops||[]).find(x=>x.id===r.src.oid);if(!o)return;const it={id:uid('i'),t:t.t,note:t.note||'',done:false,rid:r.id,tid:t.id,u:me().id,at:Date.now()};o.items.push(it);t.src={iid:it.id};touch(p,'found')}
function approveTask(rid,tid){const p=proj(ui.pid),r=p.requests.find(x=>x.id===rid),t=r&&(r.tasks||[]).find(x=>x.id===tid);if(!t||!t.pending)return;
  modal({title:'اعتماد مهمة من المدير التنفيذي',submit:'اعتماد',body:'<p class="note-s"><b>'+esc(t.t)+'</b></p><p class="note-s">'+(r.src&&r.src.oid?'تُضاف إلى ملف «'+esc(r.title)+'» في التخطيط التشغيلي كمهمة مرحّلة.':'تُعتمد ضمن مهام هذا الملف.')+'</p>',
    onSubmit:()=>{delete t.pending;t.ok={u:me().id,at:Date.now()};linkToPlan(p,r,t);touch(p,'exec');setSeen(p.id,'exec');save();setTimeout(()=>{render();toast('اعتُمدت «'+t.t+'»')},0)}})}
function rejectTask(rid,tid){const p=proj(ui.pid),r=p.requests.find(x=>x.id===rid),t=r&&(r.tasks||[]).find(x=>x.id===tid);if(!t)return;
  confirmBox('رفض المهمة','ستُحذف «'+t.t+'» المقترحة من المدير التنفيذي.','رفض وحذف',()=>{r.tasks=r.tasks.filter(x=>x!==t);touch(p,'exec');save();render();toast('رُفضت «'+t.t+'»')})}
function taskForm(r,t){const p=proj(ui.pid),cd=canDue(p),m=isM()||(!!t.pending&&t.u===me().id);
  modal({title:m?'تعديل المهمة':'موعد المهمة',submit:'حفظ',body:(m?'<div class="f"><label for="tt">المهمة</label><input class="fi" id="tt" name="t" value="'+esc(t.t)+'" data-req></div>':'<p class="note-s"><b>'+esc(t.t)+'</b></p>')+
      '<div class="two">'+(cd?'<div class="f"><label for="td">تاريخ التسليم</label><input class="fi" type="date" id="td" name="due" value="'+esc(t.due||'')+'"'+(m?'':' data-req data-focus')+'></div>':'')+'<div class="f"><label for="ts">الحالة</label><select id="ts" name="status">'+SST.map(o=>'<option value="'+o[0]+'"'+(o[0]===t.status?' selected':'')+'>'+o[1]+'</option>').join('')+'</select></div></div>'+(!cd?'<span class="help">موعد التسليم يحدّده المدير التنفيذي</span>':''),
    onSubmit:v=>{if(m&&v.t){t.t=v.t;const it=(p.ops||[]).flatMap(o=>o.items).find(x=>x.tid===t.id);if(it){it.t=v.t;touch(p,'found')}}if(cd)t.due=v.due||'';t.status=v.status;t.u=me().id;t.at=Date.now();touch(p,'exec');setSeen(p.id,'exec');save();setTimeout(render,0)}})}

const linkIcon='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>';
function hostOf(u){try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return u}}
function linkKind(u){const h=hostOf(u);
  if(/claude\.ai/.test(h))return['page','صفحة تفاعلية','<svg class="i" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/></svg>'];
  if(/drive\.google|docs\.google|dropbox|onedrive|sharepoint/.test(h))return['doc','مستند أو مجلد','<svg class="i" viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/></svg>'];
  if(/youtube|youtu\.be|vimeo/.test(h))return['vid','فيديو','<svg class="i" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10 9.5v5l4-2.5z"/></svg>'];
  if(/figma|canva/.test(h))return['des','تصميم','<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/></svg>'];
  return['web','رابط',linkIcon]}
function linksTab(p){const ed=isM(),ls=p.links||[];
  let h='<div class="bar-h"><h2>روابط المشروع</h2><span class="sp"></span>'+(ed?'<button class="btn sm primary" type="button" data-a="newLink">'+ic('plus')+'رابط جديد</button>':'')+'</div>';
  if(!ls.length)return h+'<div class="empty"><span class="e">'+linkIcon+'</span><b>لا روابط بعد</b><span>العروض والوثائق والمجلدات الخاصة بالمشروع</span></div>';
  return h+'<div class="links">'+ls.map(l=>{const k=linkKind(l.url),nw=isNewMark(l,'links');
    return '<div class="lk-card'+(nw?' isnew':'')+'"><a class="lk-main" href="'+esc(l.url)+'" target="_blank" rel="noopener noreferrer"><span class="lk-ic k-'+k[0]+'">'+k[2]+'</span><span class="tx"><b>'+esc(l.title)+(nw?' '+NEW:'')+'</b><small>'+k[1]+' · <span class="ltr">'+esc(hostOf(l.url))+'</span></small>'+(l.note?'<span class="lk-note">'+esc(l.note)+'</span>':'')+'</span></a>'+
      (ed?'<span class="tools"><button class="tb" type="button" data-a="editLink" data-id="'+l.id+'" aria-label="تعديل">'+ic('edit')+'</button><button class="tb del" type="button" data-a="delLink" data-id="'+l.id+'" aria-label="حذف">'+ic('trash')+'</button></span>':'')+'</div>'}).join('')+'</div>'}
function linkForm(l){const p=proj(ui.pid);p.links=p.links||[];
  modal({title:l?'تعديل الرابط':'رابط جديد',submit:l?'حفظ':'إضافة',body:'<div class="f"><label for="lt">العنوان</label><input class="fi" id="lt" name="t" value="'+esc(l?l.title:'')+'" placeholder="مثال: العرض التقديمي للإدارة" data-req></div><div class="f"><label for="lu2">الرابط</label><input class="fi" id="lu2" name="u" dir="ltr" value="'+esc(l?l.url:'')+'" placeholder="https://" data-req></div><div class="f"><label for="ln">ملاحظة (اختياري)</label><input class="fi" id="ln" name="n" value="'+esc(l?l.note:'')+'"></div>',
    onSubmit:v=>{let u=v.u.trim();if(!/^https?:\/\//i.test(u))u='https://'+u;try{new URL(u)}catch(e){toast('الرابط غير صحيح','error');return false}
      if(l)Object.assign(l,{title:v.t,url:u,note:v.n,u:me().id,at:Date.now()});else p.links.push({id:uid('l'),title:v.t,url:u,note:v.n,u:me().id,at:Date.now()});
      touch(p,'links');setSeen(p.id,'links');save();setTimeout(render,0)}})}
function fileCard(p,r,no){const n=runread(r),lm=r.msgs[r.msgs.length-1],late=fileLate(r),nd=nextDue(r),ts=r.tasks||[],td=ts.filter(t=>t.status==='done').length;
  const last=lm?lm.at:r.at,sub=lm?shortName(lm.u)+': '+(lm.t||'مرفق'):'';
  const end=r.done?'<span class="donetag">'+ic('check')+'أُنجزت كل المهام</span>':nd?'<span class="duec'+(late?' late':'')+'">'+(late?ic('alert'):ic('cal'))+deadline(nd)+'</span>':'<small>'+when(last)+'</small>';
  return '<div class="fcard'+(r.done?' done':'')+(late?' late':'')+(n?' unread':'')+'"><button type="button" class="fc-main" data-a="openR" data-id="'+r.id+'"><span class="fc-ic">'+(no?'<b>'+no+'</b>':ic(r.done?'check':'chat'))+'</span><span class="tx"><b>'+esc(r.title)+'</b><small>'+esc(sub)+'</small></span><span class="end">'+end+(n?'<span class="rb">'+n+'</span>':'')+'</span></button>'+taskStrip(p,r)+'</div>'}
function execTab(p){
  const m=p.managerId,files=p.requests.filter(r=>r.kind==='req'),openF=files.filter(r=>!r.done),doneF=files.filter(r=>r.done);
  const tks=files.flatMap(r=>r.tasks||[]),pc=tks.length?Math.round((tks.filter(t=>t.status==='done').length+tks.filter(t=>t.status==='doing').length*.5)/tks.length*100):0;
  const lateF=openF.filter(fileLate).length;
  const mAt=Math.max(0,...p.requests.flatMap(r=>r.msgs.filter(x=>x.u===m).map(x=>x.at)));
  let h='<div class="kpis"><div class="kp"><b>'+openF.length+'</b><small>ملفات قيد العمل</small></div><div class="kp'+(lateF?' l':'')+'"><b>'+lateF+'</b><small>ملفات فيها تأخير</small></div><div class="kp b"><b>'+pc+'<small>%</small></b><small>إنجاز المهام</small></div><div class="kp d"><b>'+doneF.length+'</b><small>أُنجزت كل مهامها</small></div></div>';
  if(tks.length){const tc=st=>tks.filter(t=>t.status===st).length,tl=tks.filter(tLate).length;
    h+='<div class="tkstats"><span class="lbl">'+ic('tasks')+'المهام الفرعية · '+tks.length+'</span><span class="tsc"><i class="d0"></i>لم تبدأ <b>'+tc('todo')+'</b></span><span class="tsc"><i class="d1"></i>قيد التنفيذ <b>'+tc('doing')+'</b></span><span class="tsc"><i class="d2"></i>منجزة <b>'+tc('done')+'</b></span>'+(tl?'<span class="tsc late"><i class="d3"></i>متأخرة <b>'+tl+'</b></span>':'')+'<span class="tbar">'+['done','doing','todo'].map(st=>'<i class="s-'+st+'" style="width:'+(tc(st)/tks.length*100)+'%"></i>').join('')+'</span></div>'}
  h+='<p class="lastact">'+(m?'آخر نشاط للمدير التنفيذي: '+(mAt?when(mAt):'لا يوجد بعد'):'')+'</p>';
  h+='<div class="bar-h"><h2>الملفات</h2><span class="sp"></span>'+(isM()&&canTab(p,'exec')?'<button class="btn sm primary" type="button" data-a="newR">'+ic('plus')+'ملف جديد</button>':'')+'</div>';
  if(!files.length)return h+'<div class="empty"><span class="e">'+ic('chat')+'</span><b>لا ملفات بعد</b><span>تصل هنا ملفات التخطيط التشغيلي عند اعتماد أول مهمة منها، أو افتح ملفاً جديداً</span></div>';
  const ON=opNums(p),opos=new Map(ON.view.map((o,i)=>[o.id,i])),noOf=r=>r.src&&r.src.oid&&ON.no.has(r.src.oid)?ON.no.get(r.src.oid):0;
  const last=r=>r.msgs.length?r.msgs[r.msgs.length-1].at:r.at;
  const ord=(a,b)=>{const x=noOf(a)?opos.get(a.src.oid):1e4,y=noOf(b)?opos.get(b.src.oid):1e4;return x-y||(last(b)-last(a))};
  h+='<div class="fcards">'+[...openF].sort(ord).map(r=>fileCard(p,r,noOf(r))).join('')+'</div>';
  if(doneF.length){const op=!!ui.openDone['exec'];h+='<button type="button" class="done-h dtog'+(op?' open':'')+'" data-a="xp" data-id="exec" aria-expanded="'+op+'">'+ic('check')+'ملفات أُنجزت كل مهامها · '+doneF.length+'<svg class="i chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>';
    if(op)h+='<div class="fcards">'+[...doneF].sort(ord).map(r=>fileCard(p,r,noOf(r))).join('')+'</div>'}
  return h}
function decTab(p){const ds=p.requests.filter(r=>r.kind==='dec'),pend=ds.filter(r=>!r.decision),ok=ds.filter(r=>r.decision&&!r.decision.rej),rej=ds.filter(r=>r.decision&&r.decision.rej);
  let h='<div class="kpis k3"><div class="kp a"><b>'+pend.length+'</b><small>بانتظار قرار اللجنة</small></div><div class="kp d"><b>'+ok.length+'</b><small>معتمدة</small></div><div class="kp"><b>'+rej.length+'</b><small>لم تُعتمد</small></div></div>';
  h+='<div class="bar-h" style="margin-top:18px"><h2>القرارات</h2><span class="sp"></span>'+(canTab(p,'dec')?'<button class="btn sm amber" type="button" data-a="newD">'+ic('pause')+'طلب قرار</button>':'')+'</div>';
  if(!ds.length)return h+'<div class="empty"><span class="e">'+ic('gavel')+'</span><b>لا قرارات بعد</b><span>أي أمر يتوقف على موافقة اللجنة يُطلب من هنا</span></div>';
  if(pend.length)h+='<div class="pend">'+pend.map(r=>{const n=runread(r);return '<button type="button" class="dcard'+(isLateR(r)?' late':'')+'" data-a="openR" data-id="'+r.id+'">'+(n?'<span class="rb">'+n+'</span>':'')+'<b>'+esc(r.title)+'</b><span class="meta">'+ic('pause')+(r.options&&r.options.length?r.options.length+' خيارات':'بانتظار قرار')+(r.deadline?' · '+deadline(r.deadline):'')+' · '+esc(shortName(r.by))+'</span></button>'}).join('')+'</div>';
  const done=[...ok,...rej].sort((a,b)=>b.decision.at-a.decision.at);
  if(done.length)h+='<div class="done-h">القرارات المتخذة · '+done.length+'</div><div class="fcards">'+done.map(r=>{const n=runread(r),rj=r.decision.rej;
    return '<div class="fcard dec'+(rj?' rej':'')+(n?' unread':'')+'"><button type="button" class="fc-main" data-a="openR" data-id="'+r.id+'"><span class="fc-ic">'+ic(rj?'x':'gavel')+'</span><span class="tx"><b>'+esc(r.title)+'</b><small>'+(rj?'لم يُعتمد'+(r.decision.t?': '+esc(r.decision.t):''):'القرار: '+esc(r.decision.t))+'</small></span><span class="end"><small>'+dayLbl(r.decision.at)+'</small>'+(n?'<span class="rb">'+n+'</span>':'<span class="donetag'+(rj?' rej':'')+'">'+(rj?'لم يُعتمد':ic('check')+'اعتُمد')+'</span>')+'</span></button></div>'}).join('')+'</div>';
  return h}

/* chat */
function openR(rid){
  const p=proj(ui.pid),r=p.requests.find(x=>x.id===rid);if(!r)return;
  const was=r.seen[me().id]||0,unr=runread(r);if(r.seen[me().id]!==r.msgs.length){r.seen[me().id]=r.msgs.length;save()}
  let b='',lastDay='';
  r.msgs.forEach((m,i)=>{const dk=dayKey(m.at);if(dk!==lastDay){b+='<div class="day">'+dayLbl(m.at)+'</div>';lastDay=dk}
    if(unr&&i===was)b+='<div class="unl">رسائل جديدة</div>';
    const mine=m.u===me().id,mu=user(m.u),mg=!!mu&&mu.role==='manager',fresh=Date.now()-m.at<864e5;
    const pm=r.msgs[i-1],showWho=!mine&&(!pm||pm.u!==m.u||dayKey(pm.at)!==dk);
    const canDel=(mine&&fresh)||cur().admin,canEd=!!m.t&&!r.done&&((mine&&fresh)||cur().admin);const lks=m.likes||[],iL=lks.includes(me().id),canLike=canTab(p,'exec');
    const acts=(canLike?'<button class="like'+(iL?' on':'')+'" type="button" data-a="like" data-i="'+i+'" aria-label="إعجاب" aria-pressed="'+iL+'">'+HEART+'</button>':'')+(canEd?'<button class="bed" type="button" data-a="editMsg" data-id="'+m.id+'" aria-label="تعديل الرسالة" title="تعديل">'+ic('edit')+'</button>':'')+(canDel?'<button class="bdel" type="button" data-a="delMsg" data-i="'+i+'" aria-label="حذف الرسالة" title="حذف">'+ic('trash')+'</button>':'');
    b+='<div class="bub'+(mine?' me':'')+(mg?' mg':'')+(ui.editMsg===m.id?' editing':'')+(showWho?'':' cont')+'">'+(acts?'<span class="bacts">'+acts+'</span>':'')+(showWho?'<span class="who2">'+esc(mu?mu.name:'—')+'<em> · '+roleLbl(mu)+'</em></span>':'')+(m.t?'<p>'+esc(m.t)+'</p>':'')+(m.files||[]).map(f=>'<span class="file">'+ic('clip')+esc(f.name)+' · '+kb(f.size)+'</span>').join('')+(lks.length?'<span class="rx"><span class="lk" title="'+esc(lks.map(uname).join('، '))+'">'+HEART+lks.length+'</span></span>':'')+'<time>'+(m.ed?'معدّلة · ':'')+hm(m.at)+'</time></div>'});
  if(r.kind==='req'&&r.done)b+='<div class="donebar">'+ic('check')+'أُنجزت كل مهام الملف</div>';
  let top='';
  if(r.kind==='dec'){
    if(r.decision)top=r.decision.rej?'<div class="decided rej"><small>لم تعتمد اللجنة الطلب · '+dayLbl(r.decision.at)+'</small>'+(r.decision.t?'<b>'+esc(r.decision.t)+'</b>':'')+'</div>':'<div class="decided"><small>قرار اللجنة · '+dayLbl(r.decision.at)+'</small><b>'+esc(r.decision.t)+'</b></div>';
    else top='<div class="dctx"><span class="lb">'+ic('pause')+'متوقف على قرار اللجنة'+(r.deadline?' · '+deadline(r.deadline):'')+'</span>'+r.options.map((o,i)=>'<div class="opt"><span>'+esc(o)+'</span>'+(isM()?'<button class="btn sm" type="button" data-a="decide" data-i="'+i+'">اعتماد</button>':'')+'</div>').join('')+(isM()?'<div class="row"><span class="note-s sp">أو اكتب قراراً آخر بالأسفل.</span><button class="btn sm danger" type="button" data-a="reject">عدم اعتماد</button></div>':'')+'</div>';
  }
  const canWrite=!r.done&&canTab(p,rt(r));
  let headBtn='';
  if(isM()&&r.kind==='dec')headBtn='<button class="tb" type="button" data-a="editDec" aria-label="تعديل القرار" title="تعديل">'+ic('edit')+'</button><button class="tb del" type="button" data-a="delR" aria-label="حذف القرار" title="حذف">'+ic('trash')+'</button>';
  if(r.kind==='req'&&(r.tasks||[]).length){const td=r.tasks.filter(t=>t.status==='done').length;headBtn='<span class="hprog'+(r.done?' full':'')+'">'+(r.done?ic('check'):'')+td+'/'+r.tasks.length+'</span>'}
  if(cur().admin&&r.kind==='req')headBtn+='<button class="tb del" type="button" data-a="delR" aria-label="حذف الملف" title="حذف الملف">'+ic('trash')+'</button>';
  layer().innerHTML='<div class="dscrim" data-x></div><aside class="chat" role="dialog" aria-modal="true" aria-labelledby="ct" data-id="'+r.id+'"><div class="c-h"><button class="tb" type="button" data-x aria-label="إغلاق">'+ic('x')+'</button><div class="tx"><b id="ct">'+codeChip(r)+esc(r.title)+'</b><small>'+(r.kind==='dec'?'بحاجة لقرار · '+(user(r.by).role==='member'?'من اللجنة':'من المدير التنفيذي'):'ملف'+(r.src&&r.src.file?' · من التخطيط التشغيلي':'')+' · اللجنة والمدير التنفيذي')+(r.kind==='dec'&&r.deadline&&!r.done?' · مطلوب قبل '+fmtD(r.deadline)+(isLateR(r)?' (متأخر)':''):'')+(r.kind==='req'&&!r.done&&nextDue(r)?' · أقرب تسليم '+fmtD(nextDue(r))+(fileLate(r)?' (فيه تأخير)':''):'')+(isM()&&!r.done&&r.kind==='dec'?' <button class=\"xp\" type=\"button\" data-a=\"editDue\">تعديل الموعد</button>':'')+'</small></div>'+headBtn+'</div>'+top+'<div class="c-b" id="cb">'+b+'</div>'+
    (ui.editMsg&&canWrite&&r.msgs.some(x=>x.id===ui.editMsg)?'<div class="edbar">'+ic('edit')+'<span>تعديل الرسالة</span><button class="xp" type="button" data-a="cancelEditMsg">إلغاء</button></div>':'')+'<form class="c-f" id="cf">'+(canWrite?'<label class="att" title="إرفاق">'+ic('clip')+'<input type="file" id="cfile" multiple aria-label="إرفاق ملف"><span class="rb" id="fc" hidden></span></label><textarea class="ta" id="ctx" rows="1" placeholder="اكتب رسالة" aria-label="رسالة"></textarea>'+(isM()&&r.kind==='dec'?'<button class="btn sm amber" type="button" data-a="decideTxt" style="height:42px">اعتماد كقرار</button>':'')+'<button class="send" type="submit" aria-label="إرسال">'+ic('send')+'</button>':'<span class="closed">'+(r.kind==='dec'?'تم اتخاذ القرار':r.done?'أُنجزت كل مهام الملف':'للاطلاع')+'</span>')+'</form></aside>';
  document.body.style.overflow='hidden';
  layer().querySelectorAll('[data-x]').forEach(x=>x.onclick=()=>{closeLayer();render()});
  const cb=$('#cb');cb.scrollTop=cb.scrollHeight;
  const tx=$('#ctx');if(tx){tx.focus();tx.addEventListener('input',()=>{tx.style.height='42px';tx.style.height=Math.min(140,tx.scrollHeight)+'px'});
    tx.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();doSubmit($('#cf'))}});
    const cf=$('#cfile');cf.addEventListener('change',()=>{const fc=$('#fc');fc.hidden=!cf.files.length;fc.textContent=cf.files.length});
    const em=ui.editMsg&&r.msgs.find(x=>x.id===ui.editMsg);if(em){tx.value=em.t;tx.style.height=Math.min(140,tx.scrollHeight)+'px'}else ui.editMsg=null;
    $('#cf')._submit=()=>{const t=tx.value.trim(),files=Array.from(cf.files).map(f=>({name:f.name,size:f.size}));
      if(em){if(!t)return;if(t!==em.t){em.t=t;em.ed=Date.now();touch(p,rt(r));save()}ui.editMsg=null;openR(r.id);return}
      if(!t&&!files.length)return;
      r.msgs.push({id:uid('c'),u:me().id,at:Date.now(),t,files});r.seen[me().id]=r.msgs.length;touch(p,rt(r));setSeen(p.id,rt(r));save();openR(r.id)}}
}
const roleLbl=u=>!u?'':u.role==='manager'?'المدير التنفيذي':u.role==='observer'?'مراقب':'اللجنة';
const shortName=id=>{const u=user(id);return u?u.name.replace(/^(د\.|م\.|أ\.)\s*/,'').split(' ')[0]:''};
const codeChip=r=>{const p=proj(ui.pid),c=p&&r.src&&r.src.oid?codeOf(p,r.src.oid):'';return c?'<span class="code">'+c+'</span>':''};
const curR=()=>{const c=layer().querySelector('.chat');return c?proj(ui.pid).requests.find(x=>x.id===c.dataset.id):null};
function decForm(r){const p=proj(ui.pid),dc=r.decision;
  modal({title:'تعديل القرار',submit:'حفظ',
    body:'<div class="f"><label for="et">القرار المطلوب</label><input class="fi" id="et" name="title" value="'+esc(r.title)+'" data-req></div>'+
      '<div class="f"><label for="eo">الخيارات المقترحة</label><textarea class="ta" id="eo" name="opts" style="min-height:80px" placeholder="كل خيار في سطر">'+esc((r.options||[]).join('\n'))+'</textarea></div>'+
      '<div class="f"><label for="ed">مطلوب قبل</label><input class="fi" type="date" id="ed" name="deadline" value="'+esc(r.deadline||'')+'"></div>'+
      (dc?'<div class="f"><label for="ex">'+(dc.rej?'سبب عدم الاعتماد':'نص القرار')+'</label><input class="fi" id="ex" name="dt" value="'+esc(dc.t||'')+'"'+(dc.rej?'':' data-req')+'></div><label class="chk"><input type="checkbox" name="undo"> التراجع عن القرار وإعادته لانتظار قرار اللجنة</label>':''),
    onSubmit:(v,f)=>{r.title=v.title;r.options=(v.opts||'').split('\n').map(x=>x.trim()).filter(Boolean);r.deadline=v.deadline||'';
      const say=t=>{r.msgs.push({id:uid('c'),u:me().id,at:Date.now(),t,files:[]});r.seen[me().id]=r.msgs.length};
      if(dc){if(f.querySelector('[name=undo]').checked){r.decision=null;r.done=false;say('أُلغي القرار، وعاد الطلب لانتظار قرار اللجنة')}
        else if((v.dt||'')!==(dc.t||'')){dc.t=v.dt||'';dc.at=Date.now();say(dc.rej?'عُدّل: لم يُعتمد'+(dc.t?': '+dc.t:''):'عُدّل القرار: '+dc.t)}}
      touch(p,'dec');setSeen(p.id,'dec');save();setTimeout(()=>{render();openR(r.id)},0)}})}
function decide(text,rej){const p=proj(ui.pid),r=p.requests.find(x=>x.id===layer().querySelector('.chat').dataset.id);
  r.decision={t:text||'',u:me().id,at:Date.now(),rej:!!rej};r.done=true;r.msgs.push({id:uid('c'),u:me().id,at:Date.now(),t:rej?'لم يُعتمد'+(text?': '+text:''):'القرار: '+text,files:[]});r.seen[me().id]=r.msgs.length;
  touch(p,'dec');setSeen(p.id,'dec');save();render();openR(r.id);toast(rej?'لم يُعتمد':'اعتُمد القرار')}

/* forms */
function projectForm(p){
  let img=p?p.img:'';const prev=()=>img?'<div class="img"><img class="photo" src="'+img+'" alt=""></div>':'<div class="img"><div class="vph">'+VSVG+'</div></div>';
  const opts=(r,sel,none)=>(none?'<option value="">'+none+'</option>':'')+data.users.filter(u=>u.role===r).map(u=>'<option value="'+u.id+'"'+(sel===u.id?' selected':'')+'>'+esc(u.name)+'</option>').join('');
  modal({title:p?'تعديل المشروع':'مشروع جديد',submit:p?'حفظ':'إنشاء',
    body:'<div class="f"><label for="pn">اسم المشروع</label><input class="fi" id="pn" name="name" value="'+esc(p?p.name:'')+'" data-req></div>'+
      '<div class="f"><span class="lb">الصورة</span><div class="drop"><span id="pv">'+prev()+'</span><span class="tx"><b>اختر صورة</b>أو اسحبها هنا</span><input type="file" id="pi" accept="image/*" aria-label="صورة المشروع"></div></div>'+
      '<div class="two"><div class="f"><label for="pm">العضو المسؤول</label><select id="pm" name="memberId">'+opts('member',p?p.memberId:me().id)+'</select></div><div class="f"><label for="pe">المدير التنفيذي</label><select id="pe" name="managerId">'+opts('manager',p?p.managerId:'','لم يُحدَّد')+'</select></div></div>',
    extra:p?'<button class="btn danger" type="button" id="dp">'+ic('trash')+'حذف</button>':'',
    after:f=>{const fi=f.querySelector('#pi');fi.addEventListener('change',async()=>{if(!fi.files[0])return;try{img=await readImg(fi.files[0]);f.querySelector('#pv').innerHTML=prev()}catch(e){toast('تعذّرت قراءة الصورة','error')}});
      const dp=f.querySelector('#dp');if(dp)dp.onclick=()=>confirmBox('حذف المشروع','سيُحذف «'+p.name+'» بكل محتواه.','حذف',()=>{data.projects=data.projects.filter(x=>x!==p);save();go('home')})},
    onSubmit:v=>{
      if(p){const o={name:p.name,img:p.img,memberId:p.memberId,managerId:p.managerId};const mg=v.managerId||null;if(mg!==p.managerId)touch(p,'exec');Object.assign(p,{name:v.name,img,memberId:v.memberId,managerId:mg});if(!save()){Object.assign(p,o);return false}render()}
      else{const np={id:uid('p'),links:[],name:v.name,img,memberId:v.memberId,managerId:v.managerId||null,access:{plan:false,found:false},sections:SECS.map(t=>({id:uid('s'),title:t[0],fmt:t[1],body:''})),steps:[],requests:[]};data.projects.unshift(np);
        if(!save()){data.projects.shift();return false}go('project',np.id,'plan')}}})}
function reqForm(kind){const p=proj(ui.pid),dec=kind==='dec';
  modal({title:dec?'بحاجة لقرار':'ملف جديد',submit:'إرسال',
    body:'<div class="f"><label for="rt">'+(dec?'القرار المطلوب':'عنوان الملف')+'</label><input class="fi" id="rt" name="title" placeholder="'+(dec?'مثال: اعتماد المورّد':'مثال: تقرير المصاريف الشهري')+'" data-req></div>'+
      '<div class="f"><label for="rm">'+(dec?'ما الذي توقّف عليه؟':'رسالة')+'</label><textarea class="ta" id="rm" name="msg" placeholder="التفاصيل"'+(dec?' data-req':'')+'></textarea></div>'+
      (dec?'<div class="f"><label for="ro">الخيارات المقترحة</label><textarea class="ta" id="ro" name="opts" style="min-height:80px" placeholder="كل خيار في سطر (اختياري)"></textarea></div><div class="f"><label for="rd">مطلوب قبل</label><input class="fi" type="date" id="rd" name="deadline" value="'+D(3)+'" data-req></div>':'<span class="help">تضيف اللجنة المهام الفرعية للملف، ويحدّد المدير التنفيذي مواعيد تسليمها.</span>'),
    onSubmit:v=>{const r={id:uid('r'),kind:dec?'dec':'req',title:v.title,by:me().id,at:Date.now(),done:false,msgs:v.msg?[{id:uid('c'),u:me().id,at:Date.now(),t:v.msg,files:[]}]:[],seen:{}};
      r.tasks=[];if(dec){r.deadline=v.deadline;r.options=(v.opts||'').split('\n').map(x=>x.trim()).filter(Boolean);r.decision=null}
      data.users.forEach(u=>r.seen[u.id]=u.id===me().id?r.msgs.length:0);
      p.requests.unshift(r);touch(p,rt(r));setSeen(p.id,rt(r));save();render();openR(r.id);return false}})}

/* committee page */
function renderAbout(){const c=data.committee;
  let h='<button class="back" type="button" data-a="home">'+ic('back')+'المشاريع</button>';
  h+='<div class="cm-hd"><img src="'+LOGO+'" alt=""><div><small>سنكري القابضة</small><h1>ميثاق لجنة المسؤولية المجتمعية</h1></div></div>';
  h+=secsHtml(c.sections,'about',isM(),null);
  h+='<div class="bar-h" style="margin-top:26px"><h2>أعضاء اللجنة</h2></div><div class="mems">'+data.users.filter(u=>u.role==='member').map(u=>'<span class="mem">'+av(u.id)+esc(u.name)+'</span>').join('')+'</div>';
  $('#view').innerHTML='<div class="wrap in">'+h+'</div>';focusMark()}

/* routing */
function go(v,pid,tab){ui.view=v;ui.menu=false;ui.edit=null;closeLayer();
  if(pid){ui.pid=pid;ui.tab=tab||'plan';enterTab(proj(pid),ui.tab)}
  try{history.replaceState(null,'','#'+(v==='project'?'p-'+ui.pid+'-'+ui.tab:v))}catch(e){}render();window.scrollTo(0,0)}
function enterTab(p,tab){ui.prev[tab]=seenOf(p.id,tab);setSeen(p.id,tab);save()}
function renderSetup(){
  $('#view').innerHTML='<div class="auth"><div class="auth-card" style="width:min(560px,100%)"><span class="auth-logo"><img src="'+LOGO+'" alt=""></span><h1>ربط المنصة بقاعدة البيانات</h1><p class="sub">خطوة لمرة واحدة، حتى تُحفظ البيانات وتكون مشتركة بين الجميع</p>'+
   '<ol class="b-ol" style="font-size:13.5px"><li>أنشئ حساباً مجانياً على <span class="ltr">supabase.com</span> ثم مشروعاً جديداً.</li><li>من <b>SQL Editor</b> الصق محتوى ملف <code class="ltr">supabase-setup.sql</code> واضغط <b>Run</b>.</li><li>من <b>Project Settings ← API</b> انسخ <b>Project URL</b> و<b>anon public key</b>.</li><li>على GitHub افتح ملف <code class="ltr">config.js</code> والصق القيمتين ثم احفظ.</li></ol>'+
   '<button class="btn" type="button" data-a="reload">'+ic('reset')+'أعد التحميل بعد الربط</button><button class="btn ghost sm" type="button" data-a="localMode">تجربة محلية على هذا الجهاز فقط</button></div></div>'}
function renderDown(){
  $('#view').innerHTML='<div class="auth"><div class="auth-card"><span class="auth-logo"><img src="'+LOGO+'" alt=""></span><h1>تعذّر الوصول إلى قاعدة البيانات</h1><p class="sub">'+(SRV.down==='net'?'تحقق من الاتصال بالإنترنت.':'تحقق من قيمتي config.js ومن تشغيل ملف supabase-setup.sql.')+'</p><button class="btn primary" type="button" data-a="reload">'+ic('reset')+'إعادة المحاولة</button></div></div>'}
function render(){if(SRV.needSetup){renderTop();renderSetup();return}if(SB&&!SRV.on){renderTop();renderDown();return}document.body.classList.toggle('on-home',!!cur()&&!cur().must&&!['project','about','roles'].includes(ui.view));renderTop();const u=cur();if(!u){renderLogin();return}if(u.must){renderSetPw();return}if(ui.view==='project')renderProject();else if(ui.view==='about')renderAbout();else if(ui.view==='roles')renderRoles();else renderHome()}
const secList=ctx=>ctx==='about'?data.committee.sections:proj(ui.pid).sections;

const A={
  home:()=>go('home'),about:()=>go('about'),roles:()=>go('roles'),
  quick:d=>{$('#lu').value=d.u;$('#lp').value=d.p;doSubmit($('.auth-card'))},
  reload:()=>location.reload(),
  localMode:()=>{try{localStorage.setItem('csr-local-mode','1')}catch(e){}location.reload()},
  logout:()=>{const out=()=>{prefs.user=null;savePrefs();ui.menu=false;if(SRV.on){if(SB)call('POST','logout').catch(()=>{});SRV.token=null;setSess(null);data=blankData()}go('home')};if(SRV.on&&(SRV.pending||SRV.busy)){toast('جارٍ حفظ التعديلات…');const w=setInterval(()=>{if(!SRV.pending&&!SRV.busy){clearInterval(w);out()}},300);push()}else out()},
  backup:()=>{ui.menu=false;renderTop();downloadBackup()},
  restore:()=>{ui.menu=false;renderTop();importBackup()},
  myPw:()=>{ui.menu=false;renderTop();modal({title:'تغيير كلمة المرور',body:'<div class="f"><label for="m1">كلمة المرور الجديدة</label><input class="fi" id="m1" name="a" type="password" dir="ltr" data-req></div><div class="f"><label for="m2">تأكيدها</label><input class="fi" id="m2" name="b" type="password" dir="ltr" data-req></div>',onSubmit:v=>{const e=pwOk(v.a,v.b);if(e){toast(e,'error');return false}
      if(SRV.on){call('POST','password',{password:v.a}).then(r=>{if(r.ok){SRV.rev=r.j.rev;toast('تغيّرت كلمة المرور')}else toast('تعذّر تغيير كلمة المرور','error')}).catch(()=>toast('تعذّر الاتصال بالخادم','error'));return}
      cur().pw=hpw(v.a);save();toast('تغيّرت كلمة المرور')}})},
  addUser:()=>userForm(null),editUser:d=>userForm(user(d.id)),access:d=>accessForm(user(d.id)),
  resetPw:d=>{const u=user(d.id);confirmBox('كلمة مرور مؤقتة','ستُلغى كلمة مرور '+u.name+' الحالية ويُطلب منه تثبيت كلمة جديدة.','إنشاء',()=>{const pw=tmpPw();u.pw=hpw(pw);u.must=true;save();setTimeout(()=>credModal(u,pw),0)})},
  delUser:d=>{const u=user(d.id);confirmBox('حذف الحساب','سيُحذف حساب '+u.name+'.','حذف',()=>{data.users=data.users.filter(x=>x!==u);if(data.perm)delete data.perm[u.id];data.projects.forEach(p=>{if(p.managerId===u.id)p.managerId=null;if(p.memberId===u.id)p.memberId=cur().id});save();render()})},
  like:d=>{const p=proj(ui.pid),r=p.requests.find(x=>x.id===layer().querySelector('.chat').dataset.id),m=r.msgs[+d.i];if(!m)return;m.likes=m.likes||[];const k=m.likes.indexOf(me().id);if(k>=0)m.likes.splice(k,1);else m.likes.push(me().id);save();const sc=$('#cb').scrollTop;openR(r.id);$('#cb').scrollTop=sc},
  newStep:()=>{const p=proj(ui.pid);modal({title:'خطوة جديدة',submit:'إضافة',body:'<div class="f"><label for="sn">الخطوة الرئيسية</label><input class="fi" id="sn" name="name" data-req></div><div class="f"><label for="sd">الموعد المستهدف</label><input class="fi" id="sd" name="date" type="date" value="'+D(30)+'"></div>',
    onSubmit:v=>{const s={id:uid('t'),name:v.name,date:v.date,subs:[],u:me().id,at:Date.now()};p.steps.push(s);ui.focusSub=s.id;touch(p,'found');setSeen(p.id,'found');save();setTimeout(()=>{render();ui.focusSub=null},0)}})},
  fold:d=>{if(d.full==='1')ui.openDone[d.id]=!ui.openDone[d.id];else ui.folded[d.id]=!ui.folded[d.id];render()},
  editDue:()=>{const p=proj(ui.pid),r=p.requests.find(x=>x.id===layer().querySelector('.chat').dataset.id);modal({title:'موعد الملف',body:'<div class="f"><label for="nd">مطلوب قبل</label><input class="fi" id="nd" type="date" name="d" value="'+esc(r.deadline||D(7))+'" data-req></div>',onSubmit:v=>{r.deadline=v.d;touch(p,rt(r));setSeen(p.id,rt(r));save();setTimeout(()=>{render();openR(r.id)},0)}})},
  newLink:()=>linkForm(null),editLink:d=>{const p=proj(ui.pid);linkForm((p.links||[]).find(x=>x.id===d.id))},
  delLink:d=>{const p=proj(ui.pid),l=p.links.find(x=>x.id===d.id);confirmBox('حذف الرابط','سيُحذف رابط «'+l.title+'».','حذف',()=>{p.links=p.links.filter(x=>x!==l);touch(p,'links');save();render()})},
  delMsg:d=>{const p=proj(ui.pid),r=p.requests.find(x=>x.id===layer().querySelector('.chat').dataset.id),i=+d.i,m=r.msgs[i];if(!m)return;if(Date.now()-m.at>=864e5){toast('لا يمكن حذف رسالة مضى عليها يوم','error');return}
    const dec={};r.msgs.splice(i,1);Object.keys(r.seen).forEach(k=>{if(r.seen[k]>i){r.seen[k]--;dec[k]=1}});save();openR(r.id);
    toast('حُذفت الرسالة',null,()=>{r.msgs.splice(i,0,m);Object.keys(dec).forEach(k=>r.seen[k]++);save();openR(r.id)})},
  reject:()=>{const t=$('#ctx')?$('#ctx').value.trim():'';decide(t,true)},open:d=>{const p=proj(d.id);ui.scrollNew=true;go('project',d.id,canTab(p,'plan')?'plan':'exec')},
  openDec:d=>{go('project',d.pid,'dec');openR(d.id)},
  tab:d=>{const p=proj(ui.pid);ui.tab=d.t;ui.edit=null;ui.scrollNew=true;enterTab(p,d.t);try{history.replaceState(null,'','#p-'+p.id+'-'+d.t)}catch(e){}render()},
  view:d=>{prefs.view=d.v;savePrefs();render()},
  menu:()=>{ui.menu=!ui.menu;renderTop()},
  as:d=>{prefs.user=d.id;savePrefs();ui.menu=false;const p=ui.pid&&proj(ui.pid);if(ui.view==='project'&&p&&canSee(p)){if(!canTab(p,ui.tab))ui.tab='exec';enterTab(p,ui.tab);render()}else if(ui.view==='about')render();else go('home');toast(me().name)},
  theme:()=>{const n=curTheme()==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);prefs.theme=n;savePrefs();renderTop()},
  reset:()=>{ui.menu=false;renderTop();confirmBox('استعادة البيانات التجريبية','ستُستبدل كل التعديلات في هذا المتصفح.','استعادة',()=>{data=seed();save();go('home')})},
  newP:()=>projectForm(null),editP:()=>projectForm(proj(ui.pid)),
  cancel:()=>{ui.edit=null;render()},
  editSec:d=>{ui.edit='s:'+d.id;render()},addSec:()=>{ui.edit='s:new';render()},
  delSec:d=>{const list=secList(d.ctx),s=list.find(x=>x.id===d.id);confirmBox('حذف البند','سيُحذف بند «'+s.title+'».','حذف',()=>{list.splice(list.indexOf(s),1);ui.edit=null;if(d.ctx==='plan')touch(proj(ui.pid),'plan');save();render()})},
  editStep:d=>{ui.edit='t:'+d.id;render()},editSub:d=>{ui.edit='k:'+d.id;render()},
  xp:d=>{ui.openDone[d.id]=!ui.openDone[d.id];render()},
  delStep:d=>{const p=proj(ui.pid),s=p.steps.find(x=>x.id===d.id);confirmBox('حذف الخطوة','ستُحذف «'+s.name+'» ومهامها الفرعية.','حذف',()=>{p.steps=p.steps.filter(x=>x!==s);touch(p,'found');save();render()})},
  delSub:d=>{const p=proj(ui.pid),s=p.steps.find(x=>x.id===d.sid),i=s.subs.findIndex(x=>x.id===d.id),k=s.subs[i];s.subs.splice(i,1);touch(p,'found');save();render();
    toast('حُذفت «'+k.name+'»',null,()=>{s.subs.splice(i,0,k);save();render()})},
  tog:d=>{const p=proj(ui.pid),s=p.steps.find(x=>x.id===d.sid),k=s.subs.find(x=>x.id===d.id);const prevSt=k.status;k.status=sDone(k)?'todo':'done';k.u=me().id;k.at=Date.now();touch(p,'found');setSeen(p.id,'found');save();render();
    if(sDone(k))toast(s.subs.every(sDone)?'اكتملت «'+s.name+'»':'أُنجزت «'+k.name+'»',null,()=>{k.status=prevSt;save();render()})},
  doing:d=>{const p=proj(ui.pid),s=p.steps.find(x=>x.id===d.sid),k=s.subs.find(x=>x.id===d.id);k.status=k.status==='doing'?'todo':'doing';k.u=me().id;k.at=Date.now();touch(p,'found');setSeen(p.id,'found');save();render()},
  note:d=>{ui.edit='n:'+d.id;render()},
  newR:()=>reqForm('req'),newD:()=>reqForm('dec'),openR:d=>openR(d.id),
  decide:d=>{const r=proj(ui.pid).requests.find(x=>x.id===layer().querySelector('.chat').dataset.id);decide(r.options[+d.i])},
  decideTxt:()=>{const t=$('#ctx').value.trim();if(!t){$('#ctx').classList.add('err');$('#ctx').focus();toast('اكتب نص القرار','error');return}decide(t)},
  doneR:()=>{const p=proj(ui.pid),r=p.requests.find(x=>x.id===layer().querySelector('.chat').dataset.id);r.done=true;touch(p,'exec');setSeen(p.id,'exec');save();render();openR(r.id);toast('تم الطلب')},
  pv:d=>{prefs[d.k]=d.v;savePrefs();render()},
  subtab:d=>{prefs.sub=d.v;savePrefs();ui.edit=null;render()},
  newStage:()=>stageForm(null),stage:d=>{const p=proj(ui.pid);stageForm(p.stages.find(x=>x.id===d.id))},
  newOp:()=>opForm(null),editOp:d=>opForm(proj(ui.pid).ops.find(x=>x.id===d.id)),
  stAdd:d=>{const p=proj(ui.pid),cols=stCols(p.stages);let pre=[];if(d.col!=null&&cols[+d.col]){const f=cols[+d.col][0];pre=(f.after||[]).slice()}else if(cols.length)pre=cols[cols.length-1].map(x=>x.id);stageForm(null,pre)},
  tkOk:d=>approveTask(d.rid,d.id),tkNo:d=>rejectTask(d.rid,d.id),
  gOk:d=>stApprove(d.id),gNo:d=>stReject(d.id),
  smode:d=>{const p=proj(ui.pid);if(!isM()||p.smode===d.v)return;p.smode=d.v;touch(p,'found');setSeen(p.id,'found');save();render()},
  delOp:d=>{const p=proj(ui.pid),o=p.ops.find(x=>x.id===d.id);if(o)delOpFlow(p,o)},
  ofold:d=>{ui.folded[d.id]=!ui.folded[d.id];render()},
  editItem:d=>{const p=proj(ui.pid),o=p.ops.find(x=>x.id===d.oid);itemForm(o,o.items.find(x=>x.id===d.id))},
  delItem:d=>{const p=proj(ui.pid),o=p.ops.find(x=>x.id===d.oid),it=o&&o.items.find(x=>x.id===d.id);if(it)delItemFlow(p,o,it)},
  approve:d=>approveItem(d.oid,d.id),
  goR:d=>{const p=proj(ui.pid);if(!canTab(p,'exec')){toast('ليست لديك صلاحية على الإدارة التنفيذية','error');return}go('project',p.id,'exec');openR(d.id)},
  rtTog:d=>{ui.rtOpen[d.id]=!ui.rtOpen[d.id];render()},
  editTask:d=>{const p=proj(ui.pid),r=p.requests.find(x=>x.id===d.rid);taskForm(r,r.tasks.find(x=>x.id===d.id))},
  delTask:d=>{const p=proj(ui.pid),r=p.requests.find(x=>x.id===d.rid),i=r.tasks.findIndex(x=>x.id===d.id),t=r.tasks[i];if(!isM()&&!(t.pending&&t.u===me().id))return;r.tasks.splice(i,1);
    let lo=null,li=-1,lit=null;(p.ops||[]).forEach(o=>{const k=o.items.findIndex(x=>x.tid===t.id);if(k>=0){lo=o;li=k;lit=o.items[k];o.items.splice(k,1)}});touch(p,'exec');if(lo)touch(p,'found');save();render();
    toast('حُذفت «'+t.t+'»',null,()=>{r.tasks.splice(i,0,t);if(lo)lo.items.splice(li,0,lit);save();render()})},
  editMsg:d=>{ui.editMsg=d.id;const r=curR();if(r)openR(r.id)},
  cancelEditMsg:()=>{ui.editMsg=null;const r=curR();if(r)openR(r.id)},
  editDec:()=>{const r=curR();if(r)decForm(r)},
  delR:()=>{const p=proj(ui.pid),r=curR();if(!r)return;const dec=r.kind==='dec';if(!dec&&!cur().admin)return;confirmBox(dec?'حذف القرار':'حذف الملف','سيُحذف «'+r.title+'» نهائياً مع محادثته'+(dec?'':' ومهامه')+'.','حذف',()=>{p.requests=p.requests.filter(x=>x!==r);unlinkReq(p,r);touch(p,rt(r));save();render();toast(dec?'حُذف القرار':'حُذف الملف')})},
  reopen:()=>{const p=proj(ui.pid),r=p.requests.find(x=>x.id===layer().querySelector('.chat').dataset.id);r.done=false;touch(p,'exec');setSeen(p.id,'exec');save();render();openR(r.id)}
};
document.addEventListener('click',e=>{const a=e.target.closest('[data-a]');if(ui.menu&&!e.target.closest('.uchip')){ui.menu=false;renderTop()}if(!a||a.disabled)return;const f=A[a.dataset.a];if(f){e.preventDefault();f(a.dataset)}});
document.addEventListener('input',e=>{if(e.target.classList.contains('err'))e.target.classList.remove('err')});
document.addEventListener('change',e=>{const t=e.target;
  if(t.dataset.ch==='subst'){const p=proj(ui.pid),s=p.steps.find(x=>x.id===t.dataset.sid),k=s.subs.find(x=>x.id===t.dataset.id),prev=k.status;k.status=t.value;k.u=me().id;k.at=Date.now();touch(p,'found');setSeen(p.id,'found');save();render();
    toast(t.value==='done'?(s.subs.every(sDone)?'اكتملت «'+s.name+'»':'أُنجزت «'+k.name+'»'):t.value==='doing'?'قيد التنفيذ: «'+k.name+'»':'أُعيدت «'+k.name+'» إلى لم تبدأ',null,()=>{k.status=prev;save();render()});return}
  if(t.dataset.ch==='stst'){const p=proj(ui.pid),g=p.stages.find(x=>x.id===t.dataset.id);g.status=t.value;g.u=me().id;g.at=Date.now();touch(p,'found');setSeen(p.id,'found');save();render();return}
  if(t.dataset.ch==='tkst'){const p=proj(ui.pid),r=p.requests.find(x=>x.id===t.dataset.rid),k=r.tasks.find(x=>x.id===t.dataset.id),prev=k.status;k.status=t.value;k.u=me().id;k.at=Date.now();touch(p,'exec');setSeen(p.id,'exec');save();render();
    toast(t.value==='done'?'أُنجزت «'+k.t+'»':t.value==='doing'?'قيد التنفيذ: «'+k.t+'»':'أُعيدت «'+k.t+'» إلى لم تبدأ',null,()=>{k.status=prev;save();render()});return}
  if(t.dataset.ch==='mgr'){const p=proj(ui.pid);p.managerId=t.value||null;touch(p,'exec');setSeen(p.id,'exec');save();render();toast(t.value?'المدير التنفيذي: '+uname(t.value):'أُزيل المدير التنفيذي');return}
  if(t.dataset.ch==='acc'){const p=proj(ui.pid);p.access=p.access||{};p.access[t.dataset.k]=t.checked;save();const tl=(TABS.find(x=>x[0]===t.dataset.k)||[0,''])[1];toast(t.checked?'صار المدير يطّلع على '+tl:'أُخفيت '+tl+' عن المدير');return}if(t.name==='fmt'&&t.closest('[data-form="sec"]')){const f=FMTS.find(x=>x[0]===t.value),form=t.closest('form');form.querySelector('.fhint').textContent=f[2];form.querySelector('textarea[name=body]').placeholder=f[3]||'المحتوى'}});
function handleForm(f){const k=f.dataset.form;if(!k)return;
  const req=f.querySelector('[data-req]');if(req&&!req.value.trim()){req.classList.add('err');req.focus();return}
  const v={};new FormData(f).forEach((x,n)=>v[n]=String(x).trim());const stamp=o=>{o.u=me().id;o.at=Date.now()};
  if(k==='sec'){const list=secList(f.dataset.ctx);if(f.dataset.id==='new'){const s={id:uid('s'),title:v.title,fmt:v.fmt||'p',body:v.body||''};stamp(s);list.push(s)}else{const s=list.find(x=>x.id===f.dataset.id);Object.assign(s,{title:v.title,fmt:v.fmt||s.fmt,body:v.body});stamp(s)}
    ui.edit=null;if(f.dataset.ctx==='plan'){const p=proj(ui.pid);touch(p,'plan');setSeen(p.id,'plan')}save();render();return}
  if(k==='login'&&SRV.on){const btn=f.querySelector('button[type=submit]');btn.disabled=true;(async()=>{try{
      const r=await call('POST','login',{login:normD(v.u).toLowerCase(),password:v.p||''});
      if(!r.ok){$('#lerr').textContent=r.status===401?(/[\u0600-\u06FF]/.test(v.u||'')?'اكتب اسم المستخدم بالأحرف الإنجليزية':'اسم المستخدم أو كلمة المرور غير صحيحة'):'تعذّر الاتصال بالخادم، حاول مجدداً';return}
      SRV.token=r.j.token;prefs.user=r.j.uid;setSess({token:r.j.token,uid:r.j.uid});
      if(!(await loadData())){$('#lerr').textContent='تعذّر تحميل البيانات، حاول مجدداً';return}
      go('home');setTimeout(offerLocalRecovery,300)}catch(e){$('#lerr').textContent='تعذّر الاتصال بالخادم، حاول مجدداً'}finally{btn.disabled=false}})();return}
  if(k==='login'){const ln=normD(v.u).toLowerCase();const u=data.users.find(x=>x.login===ln);if(!u||u.pw!==hpw(v.p||'')){$('#lerr').textContent=/[\u0600-\u06FF]/.test(v.u||'')?'اكتب اسم المستخدم بالأحرف الإنجليزية':'اسم المستخدم أو كلمة المرور غير صحيحة';return}prefs.user=u.id;savePrefs();go('home');return}
  if(k==='setpw'&&SRV.on){const e=pwOk(v.a||'',v.b||'');if(e){$('#lerr').textContent=e;return}(async()=>{try{
      const r=await call('POST','password',{password:v.a});if(!r.ok){$('#lerr').textContent='تعذّر الحفظ، حاول مجدداً';return}
      await loadData();toast('تم تثبيت كلمة المرور');go('home');setTimeout(offerLocalRecovery,300)}catch(e){$('#lerr').textContent='تعذّر الاتصال بالخادم'}})();return}
  if(k==='setpw'){const e=pwOk(v.a||'',v.b||'');if(e){$('#lerr').textContent=e;return}const u=cur();u.pw=hpw(v.a);u.must=false;save();toast('تم تثبيت كلمة المرور');go('home');return}
  const p=proj(ui.pid);
  if(k==='addStep'){const s={id:uid('t'),name:v.name,date:v.date,subs:[]};stamp(s);p.steps.push(s);ui.focusSub=s.id;touch(p,'found')}
  else if(k==='step'){const s=p.steps.find(x=>x.id===f.dataset.id);s.name=v.name;s.date=v.date;stamp(s);touch(p,'found');ui.edit=null}
  else if(k==='addSub'){if(!v.name)return;const s=p.steps.find(x=>x.id===f.dataset.sid);s.subs.push({id:uid('k'),name:v.name,status:'todo',note:null});stamp(s);ui.focusSub=s.id;touch(p,'found')}
  else if(k==='note'){const s=p.steps.find(x=>x.id===f.dataset.sid),kk=s.subs.find(x=>x.id===f.dataset.id);kk.note=v.t?{t:v.t,u:me().id,at:Date.now()}:null;kk.u=me().id;kk.at=Date.now();touch(p,'found');ui.edit=null}
  else if(k==='addItem'){if(!v.t)return;const o=p.ops.find(x=>x.id===f.dataset.oid);const it={id:uid('i'),t:v.t,note:'',done:false};stamp(it);o.items.push(it);ui.focusSub='o'+o.id;touch(p,'found')}
  else if(k==='addTask'){if(!v.t)return;const r=p.requests.find(x=>x.id===f.dataset.rid);r.tasks=r.tasks||[];const t={id:uid('k'),t:v.t,due:isM()?'':(v.due||''),status:'todo',note:''};stamp(t);if(isM())linkToPlan(p,r,t);else t.pending=true;r.tasks.push(t);ui.focusSub='r'+r.id;ui.rtOpen[r.id]=true;touch(p,'exec')}
  else if(k==='sub'){const s=p.steps.find(x=>x.id===f.dataset.sid);s.subs.find(x=>x.id===f.dataset.id).name=v.name;stamp(s);touch(p,'found');ui.edit=null}
  setSeen(p.id,ui.tab);save();render();ui.focusSub=null}
function doSubmit(f){if(!f)return;if(f._submit)f._submit();else handleForm(f)}
document.addEventListener('click',e=>{const b=e.target.closest('button[type=submit]');if(b&&b.form){e.preventDefault();doSubmit(b.form)}},true);
document.addEventListener('keydown',e=>{const t=e.target;if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing&&t.tagName==='INPUT'&&t.form&&!['checkbox','radio','file'].includes(t.type)){e.preventDefault();doSubmit(t.form)}});
document.addEventListener('submit',e=>{e.preventDefault();doSubmit(e.target)});

document.documentElement.setAttribute('data-theme','light');
function routeFromHash(){const h=(location.hash||'').slice(1);if(!cur())return;if(h==='about'||h==='roles')ui.view=h;else if(h.startsWith('p-')){const a=h.split('-');const p=proj(a[1]);if(p&&canSee(p)){ui.view='project';ui.pid=a[1];ui.tab=['plan','found','exec','dec','links'].includes(a[2])&&canTab(p,a[2])?a[2]:(canTab(p,'plan')?'plan':'exec');enterTab(p,ui.tab)}}}
async function boot(){
  let st=null;
  if(SB){try{const r=await call('GET','state');if(r.ok)st=r.j;else SRV.down=r.status}catch(e){SRV.down='net'}}
  else if(/^https?:$/.test(location.protocol)){
    try{const r=await fetch('api/state',{cache:'no-store'});if(r.ok&&/json/.test(r.headers.get('content-type')||''))st=await r.json()}catch(e){}
    let lm=false;try{lm=localStorage.getItem('csr-local-mode')==='1'}catch(e){}
    if(!st&&CFG&&!lm)SRV.needSetup=true;
  }
  if(st){SRV.on=true;SRV.durable=st.durable!==false;
    if(!st.initialized){let local=null;
      for(const k of LOCAL_KEYS.slice(1)){try{const d=JSON.parse(localStorage.getItem(k));if(d&&Array.isArray(d.users)&&d.users.some(u=>u.admin&&u.pw)&&Array.isArray(d.projects)){local=d;break}}catch(e){}}
      const b=await call('POST','bootstrap',{data:normalizeData(local||seed())});if(b.ok&&local)SRV.migrated=true}
    const ss=sess();prefs.user=null;
    if(ss&&ss.token){SRV.token=ss.token;prefs.user=ss.uid;if(!(await loadData())){SRV.token=null;setSess(null);prefs.user=null}}
    if(!SRV.token)data=blankData();
    /* التحديث كل 15ث فقط والصفحة ظاهرة وفيها نشاط خلال آخر 10 دقائق؛ الصفحة المنسية تتوقف فينام خادم Render (الخطة المجانية) ويعود التحديث فور أول لمسة */
    const IDLE_MS=10*60*1000;let lastAct=Date.now();
    const wake=()=>{const was=Date.now()-lastAct>IDLE_MS;lastAct=Date.now();if(was&&!document.hidden)pull()};
    ['pointerdown','pointermove','keydown','wheel','touchstart'].forEach(t=>window.addEventListener(t,wake,{passive:true,capture:true}));
    setInterval(()=>{if(!document.hidden&&Date.now()-lastAct<IDLE_MS)pull()},15000);
    window.addEventListener('focus',()=>{lastAct=Date.now();pull()});document.addEventListener('visibilitychange',()=>{if(!document.hidden){lastAct=Date.now();pull()}});
  }
  routeFromHash();render();
  if(SRV.migrated)setTimeout(()=>toast('نُقلت بياناتك من هذا الجهاز إلى قاعدة البيانات، وصارت مشتركة للجميع'),400);
  else if(SRV.on&&cur()&&!cur().must)setTimeout(offerLocalRecovery,500);
}
boot();
})();
