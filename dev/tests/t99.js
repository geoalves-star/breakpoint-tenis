const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///home/claude/tenis55.html');await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];autoPlan('eq');S.planAsk=S.w-S.w%52;for(const k in S.me.attrs)S.me.attrs[k]+=14;setTheme('noite');TOAST=null;OPTS.voice=false;SND=false;
 for(let i=0;i<8;i++){try{quickSim()}catch(e){}S.modals=[];LIVE=null;IM=null;VINH=null}TOAST=null;PROFTAB='album';go('me')});
await p.waitForTimeout(500);await p.screenshot({path:'shots/v1.png',fullPage:false});await p.evaluate(()=>window.scrollTo(0,900));await p.waitForTimeout(300);await p.screenshot({path:'shots/v2.png'});
const r=await p.evaluate(()=>({alb:Object.keys(S.me.alb||{}).length,stp:Object.keys(S.me.stp||{})}));
console.log(JSON.stringify(r),JSON.stringify(errs));await b.close()})();
