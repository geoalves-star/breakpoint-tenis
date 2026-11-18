const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///home/claude/tenis57.html');await p.waitForTimeout(400);
await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:20});S.tut=null;S.modals=[];TOAST=null;const evs=weekEvents(S.w).map(e=>({e,st:entryStatus(e)})).filter(x=>x.st.ok);enter(evs[0].e.key);S.modals=[];VINH=null;render()});
await p.waitForTimeout(300);const sec=await p.$('section');const bb=await sec.boundingBox();await p.screenshot({path:'shots/cond.png',clip:{x:0,y:bb.y,width:390,height:bb.height+60}});
const tags=await p.evaluate(()=>[...document.querySelectorAll('.v5tags .v5t')].map(x=>x.textContent));
await p.evaluate(()=>{S.me.pmode='all';goMatch('court');if(VINH){clearTimeout(VT);vinGo()}S.modals=[];if(IM){IM.toss=null;IM.sig=null;IM.ev={...IM.ev,name:'US Open',surf:'hard',tier:'GS',city:'Nova York',iso:COUNTRIES[S.me.c][0]}}V5BG=null;render()});
await p.waitForTimeout(1500);const el=await p.$('#v5arc');if(el)await el.screenshot({path:'shots/uso.png'});
const pace=await p.evaluate(()=>[v5PaceOf({city:'Xangai'}),v5PaceOf({city:'Indian Wells'}),v5B0({surf:'hard'})]);
console.log(JSON.stringify({tags,pace}),errs);await b.close()})();
