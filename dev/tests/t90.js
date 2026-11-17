const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
p.setDefaultTimeout(5000);
await p.goto('file:///home/claude/tenis50.html');await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];autoPlan('eq');S.planAsk=S.w-S.w%52;S.me.money=60000;setTheme('noite');TOAST=null;render()});
for(let i=0;i<3;i++){await p.evaluate(()=>{try{quickSim()}catch(e){}S.modals=[];LIVE=null;IM=null;VINH=null;S.tour=null;render()});}
await p.evaluate(()=>{TOAST=null;go('train')});await p.waitForTimeout(400);await p.screenshot({path:'shots/m1.png'});
await p.evaluate(()=>{ACCO.center=true;ACCO.coach=true;render();document.querySelector('#v5acc-center').scrollIntoView()});await p.waitForTimeout(300);await p.screenshot({path:'shots/m2.png'});
await p.evaluate(()=>{setBase()});await p.waitForTimeout(400);await p.screenshot({path:'shots/m3.png'});
await p.evaluate(()=>{const o=v5CtOpts().find(x=>x.city==='Barcelona');V5MV=o.i+'|'+o.city;render()});await p.waitForTimeout(400);await p.screenshot({path:'shots/m4.png'});
const before=await p.evaluate(()=>[S.me.money,S.me.center,myBase().city,REL().base,weekCost()]);
await p.evaluate(()=>v5DoMove());await p.waitForTimeout(300);
const after=await p.evaluate(()=>[S.me.money,S.me.center,myBase().city,REL().base,weekCost(),ctLv()]);
await p.evaluate(()=>{TOAST=null;V5BS=false;go('train');ACCO.coach=true;render();document.querySelector('#v5acc-coach').scrollIntoView()});await p.waitForTimeout(400);await p.screenshot({path:'shots/m5.png'});
await p.evaluate(()=>{const c=freeCoaches().filter(x=>v5CAllowed(x.q)).sort((a,b)=>b.q-a.q)[0];V5CO=c.id;render()});await p.waitForTimeout(400);await p.screenshot({path:'shots/m6.png'});
await p.evaluate(()=>{hireCoach(V5CO)});await p.waitForTimeout(300);
await p.evaluate(()=>{TOAST=null;V5CO=S.me.coachId;render()});await p.waitForTimeout(300);await p.screenshot({path:'shots/m7.png'});
// travel through a year to check logging + weekCost
await p.evaluate(()=>{V5CO=null;for(let i=0;i<6;i++){try{quickSim()}catch(e){console.error(e.message)}S.modals=[];LIVE=null;IM=null;VINH=null;}render()});
const el=await p.evaluate(()=>{const c=S.coaches.find(x=>x.q===5&&S.pro.some(p=>p.co===x.id));return [S.w, c&&v5CHist(c).slice(0,2)]});
// legacy save with bad rel.base
await p.evaluate(()=>{S.me.rel.base=3;render()});const lb=await p.evaluate(()=>S.me.rel.base);
await p.evaluate(()=>{go('me');PROFTAB='vida';render()});await p.waitForTimeout(300);await p.screenshot({path:'shots/m8.png'});
console.log(JSON.stringify({before,after,el,lb}),JSON.stringify(errs));await b.close()})();
