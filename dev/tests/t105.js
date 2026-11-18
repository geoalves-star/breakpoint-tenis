const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/tenis56.html');await p.waitForTimeout(600);
const r=await p.evaluate(()=>({pix:pixPayload(),on:pixOn(),card:!!document.getElementById('apoio'),links:typeof contactLinks==='function'?contactLinks():''}));
await p.screenshot({path:'shots/menu.png',fullPage:true});const el=await p.$('#apoio');if(el){await el.scrollIntoViewIfNeeded();await el.screenshot({path:'shots/apoio.png'})}
console.log(JSON.stringify(r),errs);await b.close()})();
