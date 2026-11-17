const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///home/claude/tenis50.html');await p.waitForTimeout(500);
await p.screenshot({path:'shots/a0_menu.png'});
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:19});S.tut=null;S.modals=[];S.me.energy=80;TAB='home';render()});await p.waitForTimeout(400);
await p.screenshot({path:'shots/a1_home.png'});
await p.screenshot({path:'shots/a1_full.png',fullPage:true});
for(const t of ['noite','saibro','grama','papel']){await p.evaluate(t=>{setTheme(t)},t);await p.waitForTimeout(150);await p.screenshot({path:`shots/a2_${t}.png`})}
await p.evaluate(()=>setTheme('auto'));
for(const t of ['tour','train','me']){await p.evaluate(t=>go(t),t);await p.waitForTimeout(250);await p.screenshot({path:`shots/a3_${t}.png`})}
console.log(JSON.stringify(errs));await b.close()})();
