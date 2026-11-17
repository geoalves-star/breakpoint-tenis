const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await p.goto('file:///home/claude/tenis50.html');await p.waitForTimeout(400);
console.log(await p.evaluate(()=>{const e=document.querySelector('.bw');const c=getComputedStyle(e);return [e.className,e.outerHTML.slice(0,200),c.fontSize,c.fontStretch,c.fontFamily,e.getBoundingClientRect().width]}));await b.close()})();
