const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/tenis57.html');await p.waitForTimeout(400);
const r=await p.evaluate(()=>{MENU=false;FORM.leg=false;newGame({...FORM,age:22});S.tut=null;S.modals=[];
 const mk=()=>({sv:70,rt:70,me:70,fi:70,v:1,surf:'hard'});let tb10=0,tb7=0,dec=0;
 CUR_EV={tier:'GS',name:'US Open'};IM=null;S.tour=null;
 for(let i=0;i<3000;i++){const m=simMatch(mk(),mk(),false,false);const L=m.sets[m.sets.length-1];if(m.sets.length===3&&L[2]!=null){dec++;const w=Math.max(L[0],L[1]);if(Math.max(...[L[2]])>=8)tb10++}}
 CUR_EV={tier:'A250',name:'X'};let hi=0,d2=0;for(let i=0;i<3000;i++){const m=simMatch(mk(),mk(),false,false);const L=m.sets[m.sets.length-1];if(m.sets.length===3&&L[2]!=null){d2++;if(L[2]>=8)hi++}}
 const lines=[['Roland Garros','GS','clay'],['US Open','GS','hard'],['X','A250','clay'],['X','C125','hard'],['X','C125','clay']].map(([n,t,s])=>v5Lines({name:n,tier:t,surf:s}));
 S.me.ptsPro=[[S.w-1,400,'G'],[S.w-2,10,'M'],[S.w-3,250,'O']];computeRanks();RKTAB='pro';TAB='rank';render();
 return{dec,tb10,d2,hi,lines}});
await p.waitForTimeout(200);const el=await p.$('.v5rkbox');if(el)await el.screenshot({path:'shots/rkbox.png'});
console.log(JSON.stringify(r),errs);await b.close()})();
