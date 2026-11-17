// mede o motor de partida: AI vs AI no top 200
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file:///home/claude/'+(process.env.FILE||'tenis52.html'));await p.waitForTimeout(300);
for(const circ of ['ATP','WTA']){
const r=await p.evaluate(([circ,ov])=>{Object.assign(V5CAL,ov);window.render=()=>{};window.save=()=>{};QUIET=true;MENU=false;FORM={...FORM,circ,age:20};newGame({...FORM});computeRanks();
 const top=ORD.pro.slice(0,200);const SURFS=ov.surfs||['hard','clay','grass'];delete ov.surfs;const out={};
 for(const surf of SURFS){let sg=0,hold=0,sp=0,spw=0,ace=0,sets=0,tbs=0,fav=0,n=0,dur=0,f1=0,bigfav=0,bign=0,games=0;
  for(let i=0;i<1500;i++){const a=top[Math.floor(Math.random()*top.length)],c=top[Math.floor(Math.random()*top.length)];if(a===c)continue;
   const A=eff(a,surf),B=eff(c,surf);const res=simMatch(A,B,false,true);n++;
   // games de saque a partir da timeline
   for(const e of res.tl){if(e.ev==='game'||e.ev==='brk'||(e.ev==='ace'&&e.p[0]===0&&e.p[1]===0&&!e.tb)){} }
   const st=res.st;sp+=st.a.sp+st.b.sp;spw+=st.a.spw+st.b.spw;ace+=st.a.ace+st.b.ace;f1+=st.a.f1+st.b.f1;dur+=st.dur;
   res.sets.forEach(x=>{sets++;if(x[2]!=null)tbs++;games+=x[0]+x[1]});
   // holds: total service games ~ games (excluindo tiebreak games); quebras = bpw
   const g=res.sets.reduce((s,x)=>s+x[0]+x[1]-(x[2]!=null?1:0),0);sg+=g;hold+=g-(st.a.bpw+st.b.bpw);
   const ra=RK.pro[a]||999,rb=RK.pro[c]||999,aw=res.win;fav+=(ra<rb)===aw?1:0;
   if(Math.min(ra,rb)<=10&&Math.max(ra,rb)>=50){bign++;bigfav+=(ra<rb)===aw?1:0}}
  out[surf]={hold:+(hold/sg*100).toFixed(1),spw:+(spw/sp*100).toFixed(1),acesPorJogoSaque:+(ace/sg).toFixed(2),pctTB:+(tbs/sets*100).toFixed(1),favVence:+(fav/n*100).toFixed(1),top10vs50mais:+(bigfav/Math.max(1,bign)*100).toFixed(1),bign,durMin:Math.round(dur/n),f1pct:+(f1/sp*100).toFixed(1),gamesPorSet:+(games/sets).toFixed(1)}}
 return out},[circ,JSON.parse(process.env.OV||'{}')]);
console.log(circ,JSON.stringify(r))}
await b.close()})();
