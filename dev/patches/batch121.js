// ===== v8.0: ranking de duplas de verdade =====
// duplas fixas da IA (especialistas e simplistas), chaves de duplas em todos os torneios da semana,
// pontos pela tabela real e ranking calculado pelos resultados (não mais estimado).

// ---------------------------------------------------------------- tabela e chaves
function bcDblRounds(ev){const t=ev&&ev.tier;return t==='GS'?6:t==='M1000'?5:4}
function bcDTable(ev){const t=TIERS[ev.tier];if(!t)return[0];const R=bcDblRounds(ev),w=t.pts[0]||0,f=[1,.6,.36,.18,.09,.045];const a=[];for(let i=0;i<R;i++)a.push(Math.round(w*f[i]));a.push(0);return a}
function bcDblUserPts(ev,won,R0){if(!ev||ev.tier==='OLY')return 0;const T=bcDTable(ev),R=R0||bcDblRounds(ev);const champ=won>=R;const idx=champ?0:R-won;return T[Math.min(idx,T.length-1)]||0}
function bcDblRN(R0,k){const n=Math.pow(2,R0-k);return n<=2?'Final':n===4?'Semifinal':n===8?'Quartas de final':n===16?'Oitavas de final':`${k+1}ª rodada`}
// habilidade de duplas: especialistas (dk alto) dominam, como no circuito real
const bcDkOf=p=>{if(p.dk==null)p.dk=+(R()<.1?1.2+R()*.5:.3+R()*.8).toFixed(2);return p.dk};
const bcDblR=p=>p.r*.55+bcDkOf(p)*25;
function bcBest18(a){const lo=S.w-53;return(a||[]).filter(e=>e[0]>lo).map(e=>e[1]).sort((x,y)=>y-x).slice(0,18).reduce((x,y)=>x+y,0)}
function bcDblPtsOf(p){if(S&&S.dblSim&&p.dpts)return bcBest18(p.dpts);return Math.round((PTS.pro[p.id]||0)*bcDkOf(p)*((RK.pro[p.id]||999)<=20?.45:1)+(p.dk>1.15?2200*p.dk:0))}

// ---------------------------------------------------------------- parcerias
function bcDblPair(){const used=new Set();for(const t of(S.dteams||[]))if(t.every(id=>IDX.get(id)))t.forEach(id=>used.add(id));
 S.dteams=(S.dteams||[]).filter(t=>t.every(id=>IDX.get(id)));
 const pool=S.pro.filter(p=>!used.has(p.id)).sort((a,b)=>bcDblR(b)-bcDblR(a)).slice(0,Math.max(0,280-used.size));
 const free=pool.map(p=>p.id);while(free.length>1){const a=free.shift(),pa=IDX.get(a);let bi=0,bs=-1e9;for(let i=0;i<Math.min(8,free.length);i++){const pb=IDX.get(free[i]);const s=-Math.abs(bcDblR(pa)-bcDblR(pb))+(pb.c===pa.c?3:0);if(s>bs){bs=s;bi=i}}const b=free.splice(bi,1)[0];S.dteams.push([a,b])}}
function bcDblInit(){if(S.dblSim)return;for(const p of S.pro){const est=bcDblPtsOf(p);p.dpts=[];if(est>0){const ws=[];for(let j=0;j<8;j++)ws.push(R()+.3);const s=ws.reduce((a,b)=>a+b);ws.forEach(x=>p.dpts.push([S.w-1-Math.floor(R()*50),Math.max(1,Math.round(est*x/s))]))}}
 S.dteams=[];bcDblPair();S.dblSim=1}
const bcTeamR=t=>{const a=IDX.get(t[0]),b=IDX.get(t[1]);return(bcDblR(a)+bcDblR(b))/2+((S.dchem||{})[t[0]+'_'+t[1]]||0)*.02};
const bcTeamP=t=>bcBest18(IDX.get(t[0]).dpts)+bcBest18(IDX.get(t[1]).dpts);

// ---------------------------------------------------------------- simulação semanal das chaves de duplas
const BCDBLN={GS:64,M1000:32,A500:16,A250:16,C175:16,C125:16,C100:16,C75:16,C50:16,M25:16,M15:16};
function bcDblWeek(){if(!S||!S.pro||S.dblW===S.w)return;S.dblW=S.w;bcDblInit();if(S.w%13===0)bcDblPair();
 const evs=weekEvents(S.w).filter(e=>BCDBLN[e.tier]&&TIERS[e.tier].cat==='pro');if(!evs.length)return;
 const avail=(S.dteams||[]).filter(t=>t.every(id=>{const p=IDX.get(id);if(!p||p.inj>0)return false;const r=RK.pro[id]||999;return bcDkOf(p)>1.15||R()<(r<=20?.25:r<=100?.55:.7)}));
 avail.sort((a,b)=>bcTeamP(b)-bcTeamP(a)||bcTeamR(b)-bcTeamR(a));
 const order=['GS','M1000','A500','A250','C175','C125','C100','C75','C50','M25','M15'];
 for(const tier of order){const grp=evs.filter(e=>e.tier===tier);for(const ev of grp){const n=BCDBLN[tier],tm=avail.splice(0,n);if(tm.length<4)continue;bcDblEvent(ev,tm,n)}}}
function bcDblEvent(ev,tm,n){const T=bcDTable(ev),RD=Math.log2(n),ns=Math.min(n/4,tm.length);const seeds=tm.slice(0,ns),rest=shuffle(tm.slice(ns));
 const FM=new Map(tm.map(t=>[t,gauss()*3.5]));const TR=t=>bcTeamR(t)+FM.get(t);let br=seedOrder(n).map(x=>x<=ns?seeds[x-1]:x>tm.length?null:rest.pop()||null);let r=0;const won=new Map();
 while(br.length>1){const nx=[];for(let i=0;i<br.length;i+=2){const a=br[i],b=br[i+1];if(!a||!b){nx.push(a||b);continue}
   const pa=1/(1+Math.pow(10,-(TR(a)-TR(b))/14)),w=R()<pa?a:b,lo=w===a?b:a;nx.push(w);won.set(w,(won.get(w)||0)+1);
   // pontos de quem perdeu (sem vitória = 0, como na tabela real)
   const idx=RD-r,v=won.get(lo)?T[Math.min(idx,T.length-1)]:0;if(v>0)for(const id of lo)(IDX.get(id).dpts=IDX.get(id).dpts||[]).push([S.w,v])}
  br=nx;r++}
 const ch=br[0];if(ch){for(const id of ch)(IDX.get(id).dpts=IDX.get(id).dpts||[]).push([S.w,T[0]]);S.dchem=S.dchem||{};const k=ch[0]+'_'+ch[1];S.dchem[k]=Math.min(100,(S.dchem[k]||0)+8);
  if(['GS','M1000'].includes(ev.tier)){const a=IDX.get(ch[0]),b=IDX.get(ch[1]);news(`👥 Duplas em ${ev.name}: ${flag(a.c)} ${a.n} e ${flag(b.c)} ${b.n} são campeões.`)}
  S.dchamps=S.dchamps||{};(S.dchamps[ev.name]=S.dchamps[ev.name]||[]).push([year(),ch[0],ch[1]]);if(S.dchamps[ev.name].length>12)S.dchamps[ev.name].shift()}}
{const _ew=endWeek;endWeek=function(){try{if(S&&!S.ended&&!(S.modals&&S.modals.length))bcDblWeek()}catch(e){console.error(e)}return _ew.apply(this,arguments)}}
// limpa pontos de duplas muito antigos para o save não crescer
{const _ny=newYear;newYear=function(){const r=_ny.apply(this,arguments);try{for(const p of S.pro)if(p.dpts)p.dpts=p.dpts.filter(e=>e[0]>S.w-60)}catch(e){}return r}}
