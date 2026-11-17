const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/tenis50.html');await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:19});S.tut=null;S.modals=[];S.planAsk=S.w-S.w%52;S.me.energy=85;TAB='home';render()});await p.waitForTimeout(500);
await p.screenshot({path:'shots/b1.png'});
// escolhe o 2o e fecha
await p.click('.v5prop >> nth=1');await p.waitForTimeout(200);await p.screenshot({path:'shots/b2.png'});
await p.click('.v5bar button');await p.waitForTimeout(600);await p.screenshot({path:'shots/b3.png'});
// limpa modais e avança 6 semanas pela barra
for(let i=0;i<8;i++){await p.evaluate(()=>{S.modals=[];S.tut=null;if(S.tour){S.tour=null}TAB='home';render()});const bt=await p.$('.v5bar button');if(bt){await bt.click().catch(()=>{});await p.waitForTimeout(150)}}
await p.evaluate(()=>{S.modals=[];render()});await p.waitForTimeout(300);await p.screenshot({path:'shots/b4.png'});
console.log(JSON.stringify(errs),await p.evaluate(()=>S.w));await b.close()})();
