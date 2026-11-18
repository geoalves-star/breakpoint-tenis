const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///home/claude/tenis56.html');await p.waitForTimeout(400);
const setup=async()=>p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];S.planAsk=S.w-S.w%52;setTheme('noite');TOAST=null;OPTS.voice=false;SND=false;
 const evs=weekEvents(S.w).map(e=>({e,st:entryStatus(e)})).filter(x=>x.st.ok);enter(evs[0].e.key);S.modals=[];VINH=null;render()});
const out={};
for(const mm of ['play','watch','fast']){await setup();await p.evaluate(m=>{v5SetMM(m)},mm);await p.waitForTimeout(200);
 const el=await p.$('.v5mm');if(el){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(100);const bb=await el.boundingBox();await p.screenshot({path:`shots/mm_${mm}.png`,clip:{x:0,y:Math.max(0,bb.y-40),width:390,height:300}})}
 await p.evaluate(()=>{const b=[...document.querySelectorAll('button.full.big')].find(x=>/goMatch/.test(x.getAttribute('onclick')));b.click()});await p.waitForTimeout(500);if(await p.evaluate(()=>!!VINH))await p.evaluate(()=>vinGo());await p.waitForTimeout(300);
 out[mm]=await p.evaluate(()=>({IM:!!IM,mode:IM&&IM.mode,LIVE:LIVE&&LIVE.phase,log:S.tour&&S.tour.log.slice(-1)[0]}));await p.screenshot({path:`shots/mm_${mm}_after.png`});
 await p.evaluate(()=>{try{closeLive()}catch(e){}IM=null;V5A=null});}
console.log(JSON.stringify(out),JSON.stringify(errs.slice(0,5)));await b.close()})();
