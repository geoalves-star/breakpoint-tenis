const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/tenis56.html');await p.waitForTimeout(400);
const r=await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];const a=v5AlbumView();return {alb:(a.match(/<svg/g)||[]).length,und:a.includes('undefined')}});console.log(JSON.stringify(r),errs);await b.close()})();
