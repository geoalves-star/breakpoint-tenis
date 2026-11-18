const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///home/claude/'+(process.env.FILE||'tenis54.html'));await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];S.planAsk=S.w-S.w%52;setTheme('noite');TOAST=null;render();openP(ORD.pro[2])});await p.waitForTimeout(500);await p.screenshot({path:'shots/s1.png'});
await p.evaluate(()=>{PCARD=null;const c=S.coaches.filter(x=>x.q>=4)[0];V5CO=c.id;render()});await p.waitForTimeout(400);await p.screenshot({path:'shots/s2.png'});
await p.evaluate(()=>{V5CO=null;const evs=weekEvents(S.w).map(e=>({e,st:entryStatus(e)})).filter(x=>x.st.ok);enter(evs[0].e.key);S.modals=[];VINH=null;TOAST=null;render()});await p.waitForTimeout(400);await p.screenshot({path:'shots/s3.png'});
await p.evaluate(()=>{S.tour=null;go('train');ACCO.coach=true;render();document.querySelector('#v5acc-coach').scrollIntoView()});await p.waitForTimeout(400);await p.screenshot({path:'shots/s4.png'});
console.log(JSON.stringify(errs));await b.close()})();
