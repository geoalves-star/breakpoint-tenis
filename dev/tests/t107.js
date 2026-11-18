const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/'+(process.env.F||'tenis57.html'));await p.waitForTimeout(400);
const r=await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];const w=S.w;
 const a=[];for(let i=0;i<4;i++)a.push([w-i,100,'G']);for(let i=0;i<8;i++)a.push([w-10-i,10,'M']);for(let i=0;i<10;i++)a.push([w-20-i,50+i,'O']);a.push([w-30,300,'F']);
 const c=v5Count(a);return{tot:c.tot,used:c.used.length,out:c.out.length,exp:400+80+(59+58+57+56+55+54)+300}});
console.log(JSON.stringify(r),errs);await b.close()})();
