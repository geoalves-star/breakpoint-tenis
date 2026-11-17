const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));
p.setDefaultTimeout(5000);
await p.goto('file:///home/claude/tenis50.html');await p.waitForTimeout(400);await p.screenshot({path:'shots/e1.png'});
await p.evaluate(()=>{MENU=false;render()});await p.waitForTimeout(300);await p.screenshot({path:'shots/e2.png'});
await p.evaluate(()=>{window.scrollTo(0,900)});await p.waitForTimeout(200);await p.screenshot({path:'shots/e3.png'});
console.log(JSON.stringify(errs));await b.close()})();
