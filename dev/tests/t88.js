const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1})).newPage();p.on('pageerror',e=>errs.push(e.message));
p.setDefaultTimeout(5000);
await p.goto('file:///home/claude/tenis50.html');await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.modals=[];setTheme('noite');TOAST=null;render()});await p.waitForTimeout(400);
await p.screenshot({path:'shots/k0_tut.png'});
await p.evaluate(()=>{S.tut=null;S.modals=[];autoPlan('eq');S.planAsk=S.w-S.w%52;for(const k in S.me.attrs)S.me.attrs[k]+=10;render()});
for(let i=0;i<4;i++){await p.evaluate(()=>{try{quickSim()}catch(e){}S.modals=[];LIVE=null;IM=null;VINH=null;render()});}
await p.evaluate(()=>{const ev=weekEvents(S.w).find(e=>e.tier==='GS')||weekEvents(S.w)[0];VINH={kind:'sim',opp:ORD.pro[5]||S.rival,ev};clearTimeout(VT);render()});await p.waitForTimeout(500);await p.screenshot({path:'shots/k1_vin.png'});
await p.evaluate(()=>{VINH=null;go('social');SOCTAB='feed';render()});await p.waitForTimeout(400);await p.screenshot({path:'shots/k2_social.png'});
await p.evaluate(()=>{go('me');PROFTAB='stats';render()});await p.waitForTimeout(300);await p.evaluate(()=>window.scrollTo(0,500));await p.waitForTimeout(200);await p.screenshot({path:'shots/k3_stats.png'});
await p.evaluate(()=>{window.scrollTo(0,0);endCareer('escolha');render()});await p.waitForTimeout(1500);await p.screenshot({path:'shots/k4_cer.png'});
await p.evaluate(()=>{if(S.cer){S.cer=null}render()});await p.waitForTimeout(400);await p.screenshot({path:'shots/k5_post.png'});
console.log(JSON.stringify(errs));await b.close()})();
