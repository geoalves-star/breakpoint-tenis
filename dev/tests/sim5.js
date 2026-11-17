const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/'+(process.env.FILE||'tenis50.html'));
const CFG=JSON.stringify({...JSON.parse(process.env.CFG),cal:JSON.parse(process.env.CAL||'{}')});const res=await p.evaluate((CFG)=>{
 window.render=()=>{};window.save=()=>{};QUIET=true;
 const C0=JSON.parse(CFG);if(window.V5CAL&&C0.cal)Object.assign(V5CAL,C0.cal);delete C0.cal;if(C0.iso){C0.c=COUNTRIES.findIndex(x=>x[0]===C0.iso);delete C0.iso}FORM={...FORM,...C0};newGame({...FORM});
 S.me.noRemind=true;
 window.SNAP=[];const years=[];let y0=year();const hl=[];
 const best=()=>{const evs=weekEvents(S.w).map(e=>({e,st:entryStatus(e),t:TIERS[e.tier]})).filter(x=>x.st.ok);if(!evs.length)return null;
  const my=ovr();// prefere a categoria mais alta em que entra direto; quali só se nível alto
  evs.forEach(x=>{const d=S.draws[x.e.key]||[];const fa=d.length?d.reduce((s,id)=>s+IDX.get(id).r,0)/d.length:40;
   const pw=1/(1+Math.pow(10,-(my-fa)/14)),L=x.t.pts.length,R=L-1;let ev=0;for(let k=0;k<=R;k++){const pr=k<R?Math.pow(pw,k)*(1-pw):Math.pow(pw,R);ev+=pr*x.t.pts[R-k]}
   if(!x.st.main)ev*=Math.pow(pw*.95,x.t.qr);
   if(x.t.cat==='jr'&&meAge()>=16)ev*=1.6;x.sc=ev;});
  evs.sort((a,b)=>b.sc-a.sc);return evs[0].e};
 const ans=()=>{while(S.modals.length){const md=S.modals[0];let i=0;if(md.k==='Entrevista')i=1;else if(md.k==='Evento')i=md.o.length-1>1?ri(0,md.o.length-1):0;answer(i)}};
 const staff=()=>{const m=S.me,inc=fedSupport()+sponPay();{const f=STF();if(m.money>60000){f.agt=Math.max(f.agt,1);f.nut=Math.max(f.nut,1)}if(m.money>200000){f.psy=Math.max(f.psy,1);f.agt=2;f.nut=2}if(m.money>600000)f.psy=2;const q=EQF();for(const k of ['rq','cd','sh'])for(const v of [1,2])if((q[k]||0)<v&&m.money>eqPrice(k,v)*6)buyEq(k,v)}
  const lv=m.money>400000?[4,2,4]:m.money>120000?[3,2,3]:m.money>40000?[2,1,1]:m.money>12000?[1,1,0]:[1,0,0];
  m.physio=lv[1];m.center=lv[2];m.life='equil';
  if(S.w%8===0){const inc=fedSupport()+sponPay()+300;const r=myRank('pro')||9999,j=meAge()<=18?(myRank('jr')||9999):9999;
   const cands=freeCoaches().filter(c=>(!CREQ[c.q]||r<=CREQ[c.q]||j<=CREQ[c.q]/10)&&c.sal<=Math.max(250,inc*.45)&&m.money>c.sal*15).sort((a,b)=>b.q-a.q);
   const cur=myCoach();if(cands[0]&&(!cur||cands[0].q>cur.q))hireCoach(cands[0].id);
   const el=S.coaches.filter(c=>c.q>=4&&(!CREQ[c.q]||r<=CREQ[c.q])&&m.money>c.sal*40&&c.sal<inc*.6&&c.id!==m.coachId).sort((a,b)=>b.q-a.q)[0];const cur2=myCoach();if(el&&(!cur2||el.q>cur2.q))hireCoach(el.id);}
  if(m.money>20e6&&!(m.don&&m.don.edu>=5e6))donate('edu',1);
  if(m.money>15e6&&!(m.don&&m.don.base))donate('base',1);
  if(m.money>60e6&&!ownB('torneio'))buyBiz('torneio');
  if(m.money>90e6&&!ownB('clube'))buyBiz('clube');
  if(m.money>12e6&&!ownB('imoveis'))buyBiz('imoveis');
  for(const P of PREV)if(m.money>P.p*4&&!(m.prev||[]).includes(P.id)&&(!P.wear||m.wear>0))buyPrev(P.id);
  for(const id of ['casa','academia','instituto','escola','jato']){const a=ASSETS.find(x=>x.id===id);if(!own(id)&&m.money>a.p*3)buyAsset(id)}
  if(m.money>25e6)invest(.3);};
 let lastSeason=null;
 for(let i=0;i<52*40&&!S.ended;i++){
  ans();staff();S.me.dbl=meAge()>=18;{const k=specialToday();if(k&&!S.tour&&S.busy!==S.w){playSpecial(k,true);ans();endWeek();ans();continue}}
  if(S.w%52===0)SNAP.push({y:year(),age:meAge(),ovr:+ovr().toFixed(1),rp:myRank('pro'),rj:meAge()<=18?myRank('jr'):null,money:Math.round(S.me.money),fol:S.me.fol,h:Math.round(S.me.health),beh:Math.round(S.me.behav),wl:S.me.st.w+'-'+S.me.st.l,rv:rival()?(RK.pro[S.rival]||RK.jr[S.rival]||null):null,big:S.me.st.big||0,app:Math.round(S.me.app),cq:S.me.coach,pot:+S.me.pot.toFixed(1),gen:S.me.gen,wc:JSON.stringify(S.me.wc||{}),fees:Math.round(S.me.st.fees||0),load:Math.round(S.me.load),nw:netWorth(),ai:[0,9,99].map(i=>Math.round(IDX.get(ORD.pro[i]).r)).join('/')});
  if(S.busy===S.w){endWeek();continue}
  let e=best();if(e&&typeof seasonLoad==='function'&&seasonLoad()>=21&&!['GS','M1000','FIN','OLY','JGS'].includes(e.tier)&&isPro())e=null;{const o=weekEvents(S.w).find(x=>x.tier==='OLY'&&entryStatus(x).ok);if(o)e=o;}
  const tired=(S.me.energy<40||(S.me.load||0)>68)&&!(e&&e.tier==='OLY'&&S.me.energy>=20);
  if(!e||S.me.injury>0||tired){ if(S.me.injury>0||S.me.energy<55)rest(true);else{S.me.focus=['sv','rt','fh','bh','fi','me','vo'][i%7];train(true)} ans();continue}
  enter(e.key);if(!S.tour){rest(true);ans();continue}
  let g=0;while(S.tour&&!S.tour.over&&g++<30){ans();const o=S.tour&&!S.tour.over?oppOf():null;
   if(o){const op=IDX.get(o),sf=curEv().surf;S.me.tac=sf==='grass'?'sv':sf==='clay'?'def':(op.r>ovr()+3?'agr':op.b<=-2?'bh':'equil')}
   playMatch()}
  ans();endWeek();ans();
  if(S.w%52===51||S.ended){}
 }
 return 0},CFG);
// coletar dados por ano a partir dos resultados / hist
const cmx=await p.evaluate(()=>({cm:S.cm?{n:S.cm.n,age:S.cm.born!=null?ageOf(S.cm):null,formed:S.cm.formed,awards:S.cm.awards,backs:S.cm.backs,pupT:S.cm.pupT,wallet:S.cm.wallet,acad:S.cm.acad,pup:(S.cm.pup||[]).length}:null,retros:Object.keys(S.me.retros||{}).length,press:S.me.st.press,why:S.ended&&S.ended.why}));console.log(JSON.stringify(cmx));
const out=await p.evaluate(()=>{const m=S.me,st=m.st,T=st.titles||[],cnt={};T.forEach(t=>{const k=['C175','C125','C100','C75','C50'].includes(t.tier)?'CH':['M25','M15'].includes(t.tier)?'ITF':t.tier;cnt[k]=(cnt[k]||0)+1});
 const gs=T.filter(t=>t.tier==='GS').map(t=>t.n+' '+t.y);
 return {inj:(m.injH||[]).length,injw:(m.injH||[]).reduce((s,h)=>s+h.w,0),fines:m.st.fines||0,ll:(S.news||[]).length,name:m.name,pais:COUNTRIES[m.c][1],circ:CIRC(),lvl:S.lvl,ini:SNAP[0]&&SNAP[0].age,fim:meAge(),why:S.ended&&S.ended.why,hiPro:st.hiPro,hiJr:st.hiJr,wl:st.w+'-'+st.l,pct:Math.round(st.w/Math.max(1,st.w+st.l)*100),tit:T.length,cnt,gs,jrT:(st.jrTitles||[]).length,prize:Math.round(st.prize),nw:netWorth(),fol:m.fol,ach:Object.keys(m.ach||{}).length,n1w:st.n1w||st.wkN1||0,cn:S.cn?{terms:S.cn.terms||0,laws:(S.cn.laws||[]).length}:null,rules:Object.keys(S.rules||{}),fed:Math.round(m.fed??50),
 cm:S.cm?{age:S.cm.born!=null?ageOf(S.cm):null,formed:(S.cm.formed||[]).length,awards:(S.cm.awards||[]).length,backs:S.cm.backs||0,pupT:S.cm.pupT||0,wallet:Math.round(S.cm.wallet||0),best:(S.cm.formed||[]).reduce((b,f)=>f.hi&&(!b||f.hi<b)?f.hi:b,null)}:null,
 path:SNAP.filter((x,i)=>i%3===0).map(x=>`${x.age}:${x.rp?'#'+x.rp:x.rj?'J'+x.rj:'-'}(${Math.round(x.ovr)}|${x.ai})`).join(' ')}});
console.log(JSON.stringify(out));console.log('ERRS',JSON.stringify(errs.slice(0,5)));await b.close()})();
