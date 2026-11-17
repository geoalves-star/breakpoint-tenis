const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1})).newPage();p.on('pageerror',e=>errs.push(e.message));
p.setDefaultTimeout(5000);const F=process.env.F||'tenis50.html';
await p.goto('file:///home/claude/'+F);await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];autoPlan('eq');S.planAsk=S.w-S.w%52;for(const k in S.me.attrs)S.me.attrs[k]+=10;TAB='home';render()});
for(let i=0;i<5;i++){await p.evaluate(()=>{try{quickSim()}catch(e){}S.modals=[];LIVE=null;IM=null;VINH=null;render()});}
await p.evaluate(()=>{setTheme('noite');TOAST=null});
const shots=[['tour','week'],['tour','cal'],['tour','hist'],['tour','map'],['train',null],['social','feed'],['social','dm'],['social','press'],['social','me'],['social','post'],['rank','pro'],['rank','rec'],['me','stats'],['me','career'],['me','vida'],['me','hist'],['me','spon'],['me','bens']];
let i=0;for(const [t,s] of shots){await p.evaluate(([t,s])=>{if(t==='tour'&&s)TOURTAB=s;if(t==='social'&&s)SOCTAB=s;if(t==='me'&&s)PROFTAB=s;if(t==='rank'&&s)RKTAB=s;go(t)},[t,s]);await p.waitForTimeout(450);await p.screenshot({path:`shots/f${String(i++).padStart(2,'0')}_${t}_${s}.png`})}
// overlays
await p.evaluate(()=>{go('home');INMENU=true;render()});await p.waitForTimeout(150);await p.screenshot({path:`shots/g0_inmenu.png`});
await p.evaluate(()=>{INMENU=false;render();const evs=weekEvents(S.w).map(e=>({e,st:entryStatus(e)})).filter(x=>x.st.ok);if(!S.tour&&evs[0])enter(evs[0].e.key);S.modals=[];VINH=null;render()});
await p.evaluate(()=>{try{S.me.pmode='key';goMatch('court');if(VINH){clearTimeout(VT);vinGo()}}catch(e){console.log(e.message)}});await p.waitForTimeout(400);await p.screenshot({path:`shots/g1_court.png`});
await p.evaluate(()=>{IM=null;S.me.pmode='sim';try{goMatch('sim');if(VINH){clearTimeout(VT);vinGo()}}catch(e){}});await p.waitForTimeout(900);await p.screenshot({path:`shots/g2_live.png`});
await p.evaluate(()=>{LIVE&&closeLive();S.modals=[];render()});
// um modal de evento
await p.evaluate(()=>{S.modals.push({e:'',k:'Evento',ti:'Convite para um podcast',q:'Um podcast famoso quer entrevistar você nesta semana.',o:[{t:'Aceitar',d:'+fãs'},{t:'Recusar',d:'foco'}]});render()});await p.waitForTimeout(150);await p.screenshot({path:`shots/g3_modal.png`});
console.log(JSON.stringify(errs));await b.close()})();
