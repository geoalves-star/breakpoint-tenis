const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
p.setDefaultTimeout(5000);
await p.goto('file:///home/claude/tenis50.html');await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];autoPlan('eq');S.planAsk=S.w-S.w%52;for(const k in S.me.attrs)S.me.attrs[k]+=10;TAB='home';render()});
for(let i=0;i<6;i++){await p.evaluate(()=>{try{quickSim()}catch(e){console.error('qs '+e.message)}S.modals=[];LIVE=null;IM=null;VINH=null;render()});await p.waitForTimeout(100)}
const w=await p.evaluate(()=>S.w);
const views=[['home',null],['tour','week'],['tour','cal'],['tour','hist'],['tour','map'],['train',null],['social','feed'],['social','dm'],['social','press'],['social','me'],['social','post'],['rank',null],['me','stats'],['me','career'],['me','vida'],['me','hist'],['me','spon'],['me','bens'],['me','look']];
for(const [t,s] of views){await p.evaluate(([t,s])=>{if(t==='tour'&&s)TOURTAB=s;if(t==='social'&&s)SOCTAB=s;if(t==='me'&&s)PROFTAB=s;go(t)},[t,s]);await p.waitForTimeout(120)}
await p.evaluate(()=>{TOURTAB='week';go('tour')});await p.waitForTimeout(300);await p.screenshot({path:'shots/d1.png'});
await p.evaluate(()=>{go('home')});await p.waitForTimeout(300);await p.screenshot({path:'shots/d2.png'});
await p.evaluate(()=>{INMENU=true;render()});await p.waitForTimeout(300);await p.screenshot({path:'shots/d3.png'});
await p.evaluate(()=>{INMENU=false;MENU=true;render()});await p.waitForTimeout(300);await p.screenshot({path:'shots/d4.png'});
console.log(w,JSON.stringify(errs));await b.close()})();
