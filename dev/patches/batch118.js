// ===== v7.7: auditoria de realismo =====
// juvenis no circuito pro (regra de idade), qualifying pago, ATP/WTA Finals em grupos, chaves com bye,
// tabelas próprias da WTA, envelhecimento da IA, abandonos e W.O., Next Gen Finals, United Cup,
// compromisso do top 30, quadras com nome, teto e sessão noturna, placar de duplas e política de calor.

// ---------------------------------------------------------------- 1) tabelas do circuito
var BCDRAWN={M1000:96,A250:28};
const BCORIG={};for(const k in TIERS){const t=TIERS[k];BCORIG[k]={pts:t.pts.slice(),prize:t.prize?t.prize.slice():null,cut:t.cut,q:t.q,qpts:t.qpts}}
// ATP: Masters com 96 jogadores (32 cabeças com bye), Finals com pontos por vitória
const BCATPT={GS:{qpts:30},
 M1000:{pts:[1000,650,400,200,100,50,30,10],prize:[1100000,585000,325000,185000,101000,55000,30000,19000],cut:80,q:170,qpts:20},
 A500:{qpts:25},A250:{qpts:13},C175:{qpts:6},C125:{qpts:5},C100:{qpts:5},C75:{qpts:3},C50:{qpts:3},
 FIN:{pts:[1500,1000,600],prize:[4881000,2672000,1520000]}};
// WTA: tabela de pontos própria e prêmios menores fora dos Slams
const BCWTAT={GS:{pts:[2000,1300,780,430,240,130,70,10],qpts:40},
 M1000:{pts:[1000,650,390,215,120,65,35,10],prize:[1020000,544000,298000,162000,87000,48000,26000,17000],qpts:30},
 A500:{pts:[500,325,195,108,60,1],prize:[164000,101000,57000,30000,15000,8500],qpts:25},
 A250:{pts:[250,163,98,57,30,1],prize:[34000,20000,11500,6500,3800,2400],qpts:18},
 C175:{pts:[160,95,57,29,15,1],prize:[15000,8500,4800,2800,1600,1000],qpts:6},
 C125:{pts:[160,95,57,29,15,1],prize:[15000,8500,4800,2800,1600,1000],qpts:6},
 C100:{pts:[100,65,39,21,12,1],prize:[14000,7500,4100,2300,1300,800],qpts:5},
 C75:{pts:[75,49,29,16,9,1],prize:[10500,5600,3100,1700,950,600],qpts:4},
 C50:{pts:[50,33,20,11,6,1],prize:[7100,3800,2100,1150,650,400],qpts:3},
 M25:{pts:[35,23,14,8,4,1],prize:[5100,2700,1500,800,450,280]},
 M15:{pts:[15,10,6,3,1,0],prize:[2300,1250,700,400,250,150]},
 FIN:{prize:[5150000,2900000,1650000]}};
TIERS.NGF={lbl:'Next Gen ATP Finals',cat:'pro',pts:[0,0,0],prize:[510000,260000,150000],cut:0,q:0,qr:0,qpts:0,travel:0,xp:1.3,w:2};
BCORIG.NGF={pts:[0,0,0],prize:[510000,260000,150000],cut:0,q:0,qpts:0};
if(!PRO_ORDER.includes('NGF'))PRO_ORDER.splice(1,0,'NGF');
try{GEO['Jidá']=[21.54,39.17];GEO['Sydney']=[-33.87,151.21];GEO['Perth']=GEO['Perth']||[-31.95,115.86]}catch(e){}
Object.assign(LBL_WTA,{C175:'WTA 125',C125:'WTA 125',C100:'ITF W100',C75:'ITF W75',C50:'ITF W50',M25:'ITF W35',M15:'ITF W15'});
let BCCS=null;
function bcCircSync(){if(!S)return;const W=S.circ==='WTA';if(BCCS===(W?'W':'A'))return;BCCS=W?'W':'A';
 for(const k in BCORIG){const t=TIERS[k],o=BCORIG[k];if(!t)continue;t.pts=o.pts.slice();if(o.prize)t.prize=o.prize.slice();t.cut=o.cut;t.q=o.q;t.qpts=o.qpts}
 const ap=(tab)=>{for(const k in tab){const t=TIERS[k],o=tab[k];for(const f in o)t[f]=Array.isArray(o[f])?o[f].slice():o[f]}};
 ap(BCATPT);if(W)ap(BCWTAT);
 if(W)delete BCDRAWN.A250;else BCDRAWN.A250=28}
// WTA: os dois níveis de "125" viram um só (WTA 125)
{const _we=weekEvents;weekEvents=function(w){const L=_we(w);try{if(S&&S.circ==='WTA'){for(const e of L)if(e.tier==='C125'){e.tier='C175';e.name=e.name.replace(/^(ITF W100|WTA 125|Challenger)/,'WTA 125')}}
  else if(S&&w%52===49&&!L.some(e=>e.tier==='NGF'))L.push({key:'NGF_90',tier:'NGF',name:'Next Gen ATP Finals',city:'Jidá',iso:'SA',surf:'hard',dur:1})}catch(e){}return L}}
{const _ng=newGame;newGame=function(){BCCS=null;const r=_ng.apply(this,arguments);try{bcCircSync()}catch(e){}return r}}
{const _ld=load;load=function(){BCCS=null;const r=_ld.apply(this,arguments);try{bcCircSync();bcMig77()}catch(e){console.error(e)}return r}}
{const _rd=render;render=function(){try{if(S){if(BCCS!==(S.circ==='WTA'?'W':'A'))bcCircSync();if(!S._v77)bcMig77()}}catch(e){}return _rd.apply(this,arguments)}}
function bcMig77(){if(!S||S._v77)return;S._v77=1;
 // aposentadoria média perto dos 33, como no circuito real
 for(const p of S.pro.concat(S.jr)){if((p.rt||0)>=36){const fit=p.fit??.5,n=clamp(Math.round(31+fit*5+gauss()*2),28,40);p.rt=Math.max(n,ageOf(p)+1)}}}

// ---------------------------------------------------------------- 2) chave com bye para os cabeças
// Masters de 96 e ATP 250 de 28: os primeiros cabeças estreiam na 2ª rodada
makeBracket=function(ids,cat,n){
 const s=[...ids].filter(x=>x!=null).sort((a,b)=>(RK[cat][a]??1e6)-(RK[cat][b]??1e6)||rating(b)-rating(a));const p=s.length;
 const ns=Math.min(Math.max(2,n/4),p),top=s.slice(0,ns),rest=shuffle(s.slice(ns));
 return seedOrder(n).map(x=>x<=ns?top[x-1]:x>p?null:rest.pop()??null)};

// ---------------------------------------------------------------- 3) qualifying: prêmio e pontos para quem perde
const BCQL={GS:[0,8,16],M1000:[0,10],A500:[0,13],A250:[0,6],C175:[0,3],C125:[0,3],C100:[0,2],C75:[0,1],C50:[0,1]};
const BCQLW={GS:[2,12,20],M1000:[2,20],A500:[1,18],A250:[1,12],C175:[0,3],C125:[0,3],C100:[0,2],C75:[0,1],C50:[0,1]};
const BCQP={GS:[20000,28000,40000],M1000:[9000,16000],A500:[4000,7500],A250:[1500,3000],C175:[500,900],C125:[400,700],C100:[300,550],C75:[250,450],C50:[200,350]};
function bcQualiPay(T,ev,step){const W=CIRC()==='WTA',L=(W?BCQLW:BCQL)[ev.tier],P=BCQP[ev.tier];if(!L&&!P)return;
 const v=L?(L[Math.min(step,L.length-1)]||0):0;let pr=P?(P[Math.min(step,P.length-1)]||0):0;if(W&&ev.tier!=='GS')pr=Math.round(pr*.55/50)*50;if(T.ll)pr=0;
 if(!v&&!pr)return;const a=award('me',{pts:[v],prize:[pr],cat:'pro'},0)||{v,pr:0};
 try{const r=S.results[0];if(r&&r.n===ev.name&&r.y===year())r.p=(r.p||0)+v}catch(e){}
 T.log.push({c:'mut',t:`💵 Qualifying (rodada ${step+1}): ${v?'+'+v+' pts':'sem pontos'}${a.pr?' · '+money(a.pr):''}`})}

// ---------------------------------------------------------------- 4) juvenis no circuito profissional (regra de idade)
const BCAMLIM={14:5,15:7,16:10,17:14,18:20};
const bcAmLim=a=>BCAMLIM[a]??(a<14?0:20);
const bcAmUsed=()=>{const x=S.me.amPro;return x&&x.y===year()?x.n:0};
const bcAmateur=()=>!!(S&&S.me&&!S.ended&&!isPro());
{const _es=entryStatus;entryStatus=function(ev){const s=_es(ev);try{const t=TIERS[ev.tier];if(!t||!S||!S.me)return s;
 if(ev.tier==='NGF'){if(CIRC()!=='ATP')return{ok:0,txt:'Só no circuito ATP'};if(!isPro())return{ok:0,txt:'Só profissionais'};if(meAge()>20)return{ok:0,txt:'Só até 20 anos'};
  const rm=RK.pro.me||9999,ahead=ORD.pro.filter(id=>{if(id==='me')return false;const p=IDX.get(id);return p&&ageOf(p)<=20&&!(p.inj>0)&&(RK.pro[id]||9999)<rm}).length;return ahead<8&&rm<9999?{ok:1,main:1,txt:'Classificado (Race to Jeddah)'}:{ok:0,txt:'Só os 8 melhores até 20 anos'}}
 if(t.cat==='pro'&&bcAmateur()&&!['FIN','EXH','OLY','NGF','TEAM'].includes(ev.tier)){
  if((S.me.susp||0)>S.w)return s;const a=meAge();if(a<14)return{ok:0,txt:'Circuito profissional a partir dos 14'};
  const lim=bcAmLim(a),used=bcAmUsed();if(used>=lim)return{ok:0,txt:`Regra de idade: ${lim} torneios pro por ano aos ${a}`};
  const r=myRank('pro')??1e6,rj=myRank('jr')||9999;
  if(r<=t.cut)return{ok:1,main:1,am:1,txt:'Inscrever (amador)'};
  if(ev.tier==='M25'&&rj<=10)return{ok:1,main:1,am:1,txt:'Vaga de juvenil (top 10)'};
  if(['C50','C75'].includes(ev.tier)&&rj<=20&&a>=16)return{ok:1,main:1,am:1,txt:'Programa de acesso juvenil'};
  if(t.q&&r<=t.q)return{ok:1,main:0,am:1,txt:'Qualifying (amador)'};
  return{ok:0,txt:'Sem ranking'}}}catch(e){console.error(e)}return s}}
{const _en=enter;enter=function(key){const T0=S.tour;const r=_en.apply(this,arguments);try{if(S.tour&&S.tour!==T0){const ev=curEv();if(TIERS[ev.tier].cat==='pro'&&bcAmateur()){const m=S.me,y=year();if(!m.amPro||m.amPro.y!==y)m.amPro={y,n:0};m.amPro.n++;S.tour.am=1;
  S.tour.log.push({c:'mut xs',t:`🎓 Você joga como amador: os pontos valem, mas o prêmio em dinheiro fica com a organização. Torneios pro no ano: ${m.amPro.n}/${bcAmLim(meAge())}.`})}}}catch(e){console.error(e)}return r}}

// ---------------------------------------------------------------- 5) prêmios: amador sem dinheiro, Finals por vitória
{const _a=award;award=function(id,t,idx){
 if(t===TIERS.FIN||t===TIERS.NGF){if(id==='me'){const rr=S.tour&&S.tour.rr;return{v:rr?rr.pts:0,pr:rr?rr.pr:0}}return{v:0,pr:0}}
 if(id==='me'&&t&&t.cat==='pro'&&bcAmateur()){const m=S.me,k=[m.money,m.st.prize,m.wkInc,m.st.fees];const r=_a(id,t,idx);const won=r&&r.pr||0;
  if(won){m.money=k[0];m.st.prize=k[1];m.wkInc=k[2];m.st.fees=k[3];m.st.amLost=(m.st.amLost||0)+won}return r?{...r,pr:0,am:won}:r}
 return _a(id,t,idx)}}

// ---------------------------------------------------------------- 6) ATP/WTA Finals e Next Gen em grupos
const BCRR={FIN:{rr:[200,395000],sf:[400,1150000],f:[500,2210000],part:[0,331000]},NGF:{rr:[0,50000],sf:[0,110000],f:[0,210000],part:[0,40000]}};
const BCRRS=[[[0,3],[1,2]],[[0,2],[3,1]],[[0,1],[2,3]]];
const bcIsRR=t=>t==='FIN'||t==='NGF';
function bcRRPay(id,ev,kind){const c=BCRR[ev.tier];if(!c||id==null)return;const k=c[kind];if(!k)return;let pr=k[1];if(CIRC()==='WTA'&&ev.tier==='FIN')pr=Math.round(pr*1.05);CUR_EV=ev;
 const a=award(id,{pts:[k[0]],prize:[pr],cat:'pro'},0);if(id==='me'&&S.tour&&S.tour.rr){S.tour.rr.pts+=k[0];S.tour.rr.pr+=(a&&a.pr)||0}}
function bcRRSeedOrd(ids,ev){if(ev.tier==='FIN'){const ro=raceOrd().map(x=>x.id);return ids.slice().sort((a,b)=>{const ia=ro.indexOf(a),ib=ro.indexOf(b);return(ia<0?999:ia)-(ib<0?999:ib)})}
 return ids.slice().sort((a,b)=>(RK.pro[a]||9999)-(RK.pro[b]||9999))}
function bcRRGroups(ord){const A=[ord[0]],B=[ord[1]];for(const[i,j]of[[2,3],[4,5],[6,7]]){const x=ord[i],y=ord[j];if(R()<.5){A.push(x);B.push(y)}else{A.push(y);B.push(x)}}return[A,B]}
function bcFakeSets(ls){const S1=()=>{const r=R();return r<.18?[7,6]:r<.4?[7,5]:[6,ri(0,4)]};const w1=S1(),w2=S1(),l=S1().reverse();return ls?(R()<.5?[w1,l,w2]:[l,w1,w2]):[w1,w2]}
function bcRRSim(a,b,ev){const w=R()<aiP(a,b,false,ev.surf)?a:b,ls=R()<.38?1:0,sets=bcFakeSets(ls);return{a,b,w,ls,sets}}
function bcRRMatchRec(rr,m){rr.res.push(m)}
function bcRRTable(rr,gi){const G=rr.g[gi],st={};G.forEach(id=>st[id]={id,w:0,l:0,sw:0,sl:0,gw:0,gl:0});
 for(const m of rr.res){if(!st[m.a]||!st[m.b])continue;const wn=m.w,lo=m.w===m.a?m.b:m.a;st[wn].w++;st[lo].l++;{const ws=m.sets.filter(x=>x[0]>x[1]).length,ls=m.sets.length-ws;st[wn].sw+=ws;st[wn].sl+=ls;st[lo].sw+=ls;st[lo].sl+=ws}
  for(const s of m.sets){const[x,y]=s;if(x>y){st[wn].gw+=x;st[lo].gl+=x;st[wn].gl+=y;st[lo].gw+=y}else{st[lo].gw+=y;st[wn].gl+=y;st[lo].gl+=x;st[wn].gw+=x}}}
 const L=Object.values(st);const h2h=(a,b)=>{const m=rr.res.find(x=>(x.a===a&&x.b===b)||(x.a===b&&x.b===a));return m?(m.w===a?-1:1):0};
 const pct=(x,y)=>x+y?x/(x+y):0;
 L.sort((a,b)=>b.w-a.w||(L.filter(x=>x.w===a.w).length===2?h2h(a.id,b.id):0)||pct(b.sw,b.sl)-pct(a.sw,a.sl)||pct(b.gw,b.gl)-pct(a.gw,a.gl)||G.indexOf(a.id)-G.indexOf(b.id));return L}
function bcRRDayAI(rr,ev,d,skipMe){for(let g=0;g<2;g++)for(const[i,j]of BCRRS[d]){const a=rr.g[g][i],b=rr.g[g][j];if(a==null||b==null)continue;if(a==='me'||b==='me'){if(skipMe)continue;const o=a==='me'?b:a;// você desistiu: W.O.
    rr.res.push({a,b,w:o,ls:0,sets:[[6,0],[6,0]],wo:1});bcRRPay(o,ev,'rr');continue}
  const m=bcRRSim(a,b,ev);rr.res.push(m);bcRRPay(m.w,ev,'rr')}}
function bcRRSemis(rr){const A=bcRRTable(rr,0),B=bcRRTable(rr,1);return[A[0].id,B[1].id,B[0].id,A[1].id]}
function bcRRKO(br,ev,r0){let br2=br,r=r0||0;while(br2.length>1){const pre=br2;br2=playRound(br2,ev,r,null);r++;if(pre.length===2){recFinal(ev,pre[0],pre[1],br2[0]);recTV(ev,br2[0],br2[0]===pre[0]?pre[1]:pre[0])}}return br2}
// IA: torneio inteiro sem você
{const _se=simEventAI;simEventAI=function(ev){if(!bcIsRR(ev.tier))return _se(ev);const t=TIERS[ev.tier];CUR_EV=ev;
 const ids=bcRRSeedOrd((S.draws[ev.key]||[]).filter(x=>x!=null&&x!=='me'),ev).slice(0,8);if(ids.length<8){S.played[ev.key]=1;return}
 const rr={g:bcRRGroups(ids),res:[],day:0,pts:0,pr:0};for(const id of ids)bcRRPay(id,ev,'part');for(let d=0;d<3;d++)bcRRDayAI(rr,ev,d,false);
 const br=bcRRKO(bcRRSemis(rr),ev,0);S.lastRR=S.lastRR||{};S.lastRR[ev.tier]={y:year(),g:rr.g,res:rr.res,ch:br[0]};
 if(br[0]!=null){recChamp(ev,br[0]);bigNews(ev,br[0])}S.played[ev.key]=1}}
// você na chave: monta os grupos
{const _im=insertMe;insertMe=function(){const T=S.tour,ev=curEv();if(!bcIsRR(ev.tier))return _im.apply(this,arguments);
 const ai=bcRRSeedOrd((S.draws[ev.key]||[]).filter(x=>x!=null&&x!=='me'),ev).slice(0,7),ord=bcRRSeedOrd(ai.concat(['me']),ev);
 S.draws[ev.key]=ord.slice();const g=bcRRGroups(ord),mine=g[0].includes('me')?0:1;
 T.rr={g,mine,res:[],day:0,ph:'rr',pts:0,pr:0,seed:ord.slice()};T.round=0;T.brs=null;
 for(const id of ord)bcRRPay(id,ev,'part');
 T.br=['me',bcRROpp(T)];
 T.log.push({c:'mut',t:`🎲 Sorteio dos grupos: você está no Grupo ${'AB'[mine]} com ${g[mine].filter(x=>x!=='me').map(x=>oppLabel(x)).join(', ')}. Os dois melhores de cada grupo vão à semifinal.`});
 if(T.rr.pr)T.log.push({c:'mut xs',t:`💵 Cachê de participação: ${money(T.rr.pr)}`})}}
function bcRROpp(T){const rr=T.rr,d=Math.min(rr.day,2),G=rr.g[rr.mine],i=G.indexOf('me');for(const[a,b]of BCRRS[d]){if(a===i)return G[b];if(b===i)return G[a]}return null}
let _bcRN=roundName;roundName=function(n){try{const T=S&&S.tour;if(n===2&&T&&T.rr&&T.rr.ph==='rr'&&!T.over)return`Grupo ${'AB'[T.rr.mine]} · ${T.rr.day+1}ª rodada`}catch(e){}return _bcRN(n)};
function bcRRPlay(pre){const T=S.tour;if(!T||T.over||S.modals.length||LIVE||(IM&&!pre))return;const ev=curEv(),rr=T.rr,d=rr.day,opp=bcRROpp(T),stage=roundName(2);
 const res=userMatch(opp,ev,false,stage,pre);startLive(res,opp,stage,ev);
 T.log.push({c:res.win?'win':'loss',t:`${stage}: ${res.win?'V':'D'} vs ${oppLabel(opp)}${opp===S.rival?' ⚔️':''} — ${scoreStr(res.sets)}`});
 try{maybeInterview(ev,opp,res.win,stage)}catch(e){}
 const sets=res.sets.map(s=>[s[0],s[1]]),myS=sets.filter(s=>s[0]>s[1]).length,opS=sets.length-myS;
 rr.res.push({a:'me',b:opp,w:res.win?'me':opp,ls:Math.min(1,res.win?opS:myS),sets:res.win?sets:sets.map(s=>[s[1],s[0]])});
 if(res.win&&!res.inj)bcRRPay('me',ev,'rr');else if(!res.win)bcRRPay(opp,ev,'rr');
 bcRRDayAI(rr,ev,d,true);rr.day++;
 if(res.inj){T.log.push({c:'loss',t:'🚑 Você se lesionou e deixou o torneio. Um reserva assume suas partidas.'});finishTour('Fase de grupos (abandono)',{v:rr.pts,pr:rr.pr});return}
 if(rr.day>=3){const tb=bcRRTable(rr,rr.mine),pos=tb.findIndex(x=>x.id==='me')+1,me=tb[pos-1];
  if(pos<=2){rr.ph='ko';T.br=bcRRSemis(rr);T.round=0;T.brs=[T.br.slice()];T.seed={};rr.seed.slice(0,8).forEach((id,i)=>T.seed[id]=i+1);
   T.log.push({c:'win',t:`✅ Você terminou em ${pos}º no Grupo ${'AB'[rr.mine]} (${me.w}V ${me.l}D) e está na semifinal!`})}
  else{T.log.push({c:'loss',t:`Você terminou em ${pos}º no Grupo ${'AB'[rr.mine]} (${me.w}V ${me.l}D) e não avançou.`});finishTour('Fase de grupos',{v:rr.pts,pr:rr.pr});return}}
 else T.br=['me',bcRROpp(T)];
 save();render()}
{const _ft=finishTour;finishTour=function(label,a){const T=S.tour;try{if(T&&T.rr&&T.rr.ph==='rr'&&!T.rr.done){const ev=curEv(),rr=T.rr;rr.done=1;rr.ph='out';
  for(let d=rr.day;d<3;d++)bcRRDayAI(rr,ev,d,false);rr.day=3;const br=bcRRKO(bcRRSemis(rr),ev,0);T.br=br;T.round=2;
  if(a==null||a.v===0&&a.pr===0)a={v:rr.pts,pr:rr.pr}}}catch(e){console.error(e)}return _ft.call(this,label,a)}}
{const _ch=champion;champion=function(ev){try{const T=S.tour;if(T&&T.rr)S.lastRR=Object.assign(S.lastRR||{},{[ev.tier]:{y:year(),g:T.rr.g,res:T.rr.res,ch:'me'}})}catch(e){}return _ch.apply(this,arguments)}}
// mata-mata das Finals: bônus por vitória (semifinal e final); bye ganha ponto da 1ª rodada; abandonos e W.O. entre a IA
const BCWON={};
function bcInjSet(p,why){if(!p||p.id==='me')return;const d=bcInjDur?bcInjDur():2;p.inj=Math.max(p.inj||0,d);p.injN=p.inj;p.injT=p.injT||BCINJT[Math.floor(R()*BCINJT.length)];p.injW=S.w;(p.injH=p.injH||[]).push([S.w,d,p.injT]);if(p.injH.length>6)p.injH.shift()}
{const _pr=playRound;playRound=function(br,ev,round,userWon){const t=TIERS[ev.tier];let b2=br;
 try{if(t&&!bcIsRR(ev.tier)&&ev.tier!=='OLY'){b2=br.slice();for(let i=0;i<b2.length;i+=2){const a=b2[i],b=b2[i+1];if(a==null||b==null||a==='me'||b==='me')continue;
   for(const k of[i,i+1]){const p=IDX.get(b2[k]);if(p&&p.inj>0&&p.injW===S.w){const o=IDX.get(b2[k^1]);if((RK.pro[p.id]||999)<=20)news(`🩹 ${flag(p.c)} ${p.n} deu W.O. em ${ev.name}${o?' e '+o.n+' avançou sem jogar':''}.`);b2[k]=null;break}}}
  }}catch(e){console.error(e)}
 const L=t?t.pts.length:0,snap={},W=BCWON[ev.key]||(BCWON[ev.key]=new Set());if(round===0)W.clear();
 try{if(round>0&&t&&!bcIsRR(ev.tier))for(let i=0;i<b2.length;i+=2){const a=b2[i],b=b2[i+1];if(a==null||b==null)continue;for(const id of[a,b]){if(id==='me'||W.has(id))continue;const p=IDX.get(id);if(p)snap[id]=p.pts.length}}}catch(e){}
 const nx=_pr(b2,ev,round,userWon);
 try{// quem perde sem ter vencido nenhum jogo (estreou depois de bye/W.O.) leva os pontos da 1ª rodada
  for(let i=0;i<b2.length;i+=2){const a=b2[i],b=b2[i+1];if(a!=null&&b!=null&&nx[i/2]!=null)W.add(nx[i/2])}
  for(const id in snap){const p=IDX.get(+id)||IDX.get(id);if(!p||nx.includes(p.id))continue;if(p.pts.length>snap[id]){const e=p.pts[p.pts.length-1];e[1]=t.pts[L-1]||0;if(!e[1])p.pts.pop()}}
  if(t&&bcIsRR(ev.tier)){const kind=b2.length===4?'sf':b2.length===2?'f':null;if(kind)for(const w of nx)bcRRPay(w,ev,kind)}
  else if(t&&ev.tier!=='OLY'){for(let i=0;i<b2.length;i+=2){const a=b2[i],b=b2[i+1];if(a==null||b==null||a==='me'||b==='me')continue;const w=nx[i/2],lo=w===a?b:a,p=IDX.get(lo);
    if(p&&R()<.012){bcInjSet(p);if((RK.pro[lo]||999)<=20||(RK.pro[w]||999)<=5){const pw=IDX.get(w);news(`🚑 ${flag(p.c)} ${p.n} abandonou contra ${pw?pw.n:'o adversário'} em ${ev.name} (lesão ${p.injT}).`)}}
    else{const pw=IDX.get(w);if(pw&&R()<.003)bcInjSet(pw)}}}}catch(e){console.error(e)}
 return nx}}
// você: bye + derrota na estreia também vale os pontos da 1ª rodada
{const _a=award;award=function(id,t,idx){if(id==='me'&&t&&S.tour&&!S.tour.meWon&&!S.tour.q&&!S.tour.rr&&S.tour.round>0&&t.pts&&idx===t.pts.length-1-S.tour.round&&t===TIERS[curEv().tier]){const arr=t.cat==='pro'?S.me.ptsPro:S.me.ptsJr,n0=arr.length;const r=_a(id,t,idx);
  try{if(arr.length>n0){const e=arr[arr.length-1],v=t.pts[t.pts.length-1]||0;if(v)e[1]=v;else arr.pop();if(r)r.v=v}}catch(e){}return r}return _a(id,t,idx)}}
// W.O. do seu adversário (lesionado na semana ou desistência de última hora)
function bcWOCheck(){const T=S.tour;if(!T||T.over||T.q||T.rr||!T.br)return null;const i=T.br.indexOf('me');if(i<0)return null;const opp=T.br[i^1];if(opp==null){if(T.round===0)T.byeMe=1;return null}
 const p=IDX.get(opp);if(!p)return null;if(T.woChk===T.round)return null;T.woChk=T.round;
 const hit=(p.inj>0&&p.injW===S.w)||R()<.006*(ageOf(p)>=30?1.6:1);if(!hit)return null;if(!(p.inj>0))bcInjSet(p);T.br[i^1]=null;if(T.round===0)T.byeMe=1;T.wo={id:opp,r:T.round};return opp}
function bcWOLog(T){if(!T||!T.wo||T.wo.done)return;for(let k=T.log.length-1;k>=0;k--){const e=T.log[k];if(/: bye$/.test(e.t)){const p=IDX.get(T.wo.id);e.t=e.t.replace(/bye$/,`W.O. — ${oppLabel(T.wo.id)} desistiu (lesão ${p&&p.injT||''})`.trim());e.c='win';T.wo.done=1;break}}}
{const _ec=enterCourt;enterCourt=function(){const T=S.tour;try{if(T&&!T.over&&!S.modals.length&&!LIVE&&!IM){bcWOCheck();if(T.rr&&T.rr.ph==='rr')T.br=['me',bcRROpp(T)]}}catch(e){console.error(e)}
 const r=_ec.apply(this,arguments);try{bcWOLog(S.tour);if(IM&&T&&T.rr&&T.rr.ph==='rr')IM.stage=roundName(2);bcHeatIM()}catch(e){}return r}}

// ---------------------------------------------------------------- 7) política de calor (Australian Open e verão australiano)
let BCHEAT=null;
function bcHeatRoll(ev,stage,opp){if(!ev||ev.iso!=='AU'||(S.w%52)>4||climateOf(ev,S.w)!=='quente')return null;if(R()>.2)return null;const ct=bcCourtOf(ev,stage,opp);return{roof:BCROOF.has(ct),ct}}
function bcHeatTxt(h){return h.roof?`🌡️ Política de calor extremo: o índice de estresse térmico chegou a 5 e o teto da ${h.ct} foi fechado. O jogo segue em condições de quadra coberta.`:`🌡️ Política de calor extremo: jogo suspenso nas quadras externas por cerca de 2 horas e retomado no fim da tarde, com temperatura mais amena.`}
function bcHeatIM(){const I=IM;if(!I||I._heat)return;I._heat=1;const h=bcHeatRoll(I.ev,I.stage,I.opp);if(!h)return;if(h.roof)I.covered=1;I.feed.unshift(bcHeatTxt(h));S.me.energy=clamp(S.me.energy+3,0,100)}

// ---------------------------------------------------------------- 8) jogar partida: grupos, W.O., qualifying pago, calor
{const _pm=playMatch;playMatch=function(pre){const T=S.tour;
 if(T&&T.rr&&T.rr.ph==='rr'&&!T.over)return bcRRPlay(pre);
 let q0=null,h=null,n0=T?T.log.length:0;
 try{if(T&&!T.over&&!S.modals.length&&!LIVE&&(!IM||pre)){if(!pre)bcWOCheck();if(T.q)q0={step:T.q.step,ev:curEv()};
   if(!pre){const ev=curEv(),opp=T.q?T.q.opp:oppOf();if(opp!=null)h=bcHeatRoll(ev,T.q?'Quali':roundName(T.br.length),opp)}}}catch(e){console.error(e)}
 const r=_pm.apply(this,arguments);
 try{if(T&&S.tour===T){bcWOLog(T);if(T.log.slice(n0).some(e=>e.c==='win'&&/: V vs /.test(e.t)&&!/^Quali/.test(e.t)))T.meWon=1;
   if(q0){const lost=T.log.slice(n0).some(e=>e.c==='loss'&&/^Quali R\d/.test(e.t));if(lost)bcQualiPay(T,q0.ev,q0.step)}
   if(h&&T.log.length>n0){T.log.splice(n0,0,{c:'mut xs',t:bcHeatTxt(h)});S.me.energy=clamp(S.me.energy+3,0,100)}}}catch(e){console.error(e)}
 return r}}
// quadro: tabela dos grupos
{const _dv=drawView;drawView=function(){const T=S.tour;if(!T||!T.rr)return _dv.apply(this,arguments);let h=bcRRView(T.rr,curEv());if(T.brs)try{h+=_dv.apply(this,arguments)}catch(e){}return h}}
function bcRRView(rr,ev){const nm=id=>id==='me'?`<b class="win">${flag(S.me.c)} ${esc(S.me.name)}</b>`:(()=>{const p=IDX.get(id);return p?`${flag(p.c)} ${esc(p.n)}`:'—'})();
 const tbl=gi=>{const L=bcRRTable(rr,gi);return`<div class="bcrrg"><div class="mk">Grupo ${'AB'[gi]}</div><table class="bcrrt"><tr><th></th><th>V-D</th><th>Sets</th><th>Games</th></tr>${L.map((x,i)=>`<tr class="${i<2&&rr.day>=3?'q':''}"><td>${i+1}. ${nm(x.id)}</td><td>${x.w}-${x.l}</td><td>${x.sw}-${x.sl}</td><td>${x.gw}-${x.gl}</td></tr>`).join('')}</table>
  <div class="xs mut" style="margin-top:4px">${rr.res.filter(m=>rr.g[gi].includes(m.a)).map(m=>`${nm(m.w)} venceu ${nm(m.w===m.a?m.b:m.a)}${m.wo?' (W.O.)':' '+m.sets.map(s=>s.join('-')).join(' ')}`).join('<br>')||'Os jogos aparecem aqui dia a dia.'}</div></div>`};
 return`<div class="card bcrr"><h3>🏟️ ${esc(ev.name)} · fase de grupos</h3><p class="xs mut" style="margin:0 0 8px">Todos jogam contra todos no grupo. Os dois primeiros vão à semifinal (1º do A x 2º do B e 1º do B x 2º do A). Desempate: vitórias, confronto direto, % de sets, % de games.</p>${tbl(0)}${tbl(1)}</div>`}

// ---------------------------------------------------------------- 9) United Cup (seleções mistas, início de janeiro)
const BCUCP={G:[55,45,40,35,25,20,15],Q:[80,65,55,45,35,25,20],S:[120,100,80,65,50,35,30],F:[180,150,120,100,75,55,45]};
const BCUCPR={G:40000,Q:60000,S:90000,F:140000};
const bcUCi=r=>r<=10?0:r<=20?1:r<=30?2:r<=50?3:r<=100?4:r<=250?5:6;
function bcUCBest(){const best={};for(const id of ORD.pro){const c=id==='me'?S.me.c:(IDX.get(id)||{}).c;if(c==null||best[c]!=null)continue;if(id!=='me'&&IDX.get(id).inj>0)continue;best[c]=id}
 try{const m=S.me,rm=RK.pro.me;if(rm&&isPro()&&!S.ended&&(best[m.c]==null||best[m.c]==='me'||rm<(RK.pro[best[m.c]]||9999)))best[m.c]='me'}catch(e){}return best}
function bcUCTeams(){const best=bcUCBest(),au=COUNTRIES.findIndex(c=>c[0]==='AU');const L=Object.keys(best).map(Number).sort((a,b)=>(RK.pro[best[a]]||9999)-(RK.pro[best[b]]||9999));let T=L.slice(0,18);if(au>=0&&best[au]!=null&&!T.includes(au)){T=T.slice(0,17);T.push(au)}return{T,best}}
function bcUCCan(){const m=S.me;if(!m||S.ended||!isPro()||m.injury>0||(m.susp||0)>S.w||S.tour||S.busy===S.w)return false;const r=myRank('pro');if(!r||r>200)return false;const{T,best}=bcUCTeams();return best[m.c]==='me'&&T.includes(m.c)}
function bcUCOther(c){const W=CIRC()==='WTA'?CW_ATP:CW_WTA,iso=COUNTRIES[c][0];return 58+7*Math.log(1+(W[iso]||0))}
function bcUCTie(ca,cb,best,stage,log,acc){const a=best[ca],b=best[cb],mine=a==='me'||b==='me';let wa=0;
 // simples do seu circuito
 let w1;if(mine){const opp=a==='me'?b:a;const before=S.hist.length;const win=matchUp('me',opp,log,'AU');w1=a==='me'?win:!win;
  if(win){const v=BCUCP[stage][bcUCi(RK.pro[opp]||999)];acc.pts+=v;acc.pr+=BCUCPR[stage];acc.w++}else acc.l++;try{if(S.hist.length>before)S.hist[0].e='United Cup'}catch(e){}}
 else w1=R()<aiP(a,b,false,'hard');if(w1)wa++;
 // simples do outro circuito (convocação do país)
 const oa=bcUCOther(ca),ob=bcUCOther(cb),w2=R()<1/(1+Math.pow(10,-(oa-ob)/10));if(w2)wa++;
 const lg=(w,lb)=>{const mA=ca===S.me.c,ok=mA?w:!w,my=mA?ca:cb,ot=mA?cb:ca;log.push(`${ok?'✅':'❌'} ${lb}: ${flag(my)} ${ok?'venceu':'perdeu para'} ${flag(ot)}`)};
 if(mine&&log)lg(w2,CIRC()==='WTA'?'Simples masculino':'Simples feminino');
 let w3=null;if(wa===1){const ra=(tRat(a)+oa)/2,rb=(tRat(b)+ob)/2;w3=R()<1/(1+Math.pow(10,-(ra-rb)/10));if(w3)wa++;if(mine&&log)lg(w3,'Duplas mistas (match tie-break no 3º set)')}
 return wa>=2}
function bcUCPlay(){const m=S.me,{T,best}=bcUCTeams();if(!T.includes(m.c))return;const log=[],acc={pts:0,pr:0,w:0,l:0};
 const ord=T.slice().sort((a,b)=>(RK.pro[best[a]]||9999)-(RK.pro[best[b]]||9999)),G=[[],[],[],[],[],[]];ord.forEach((c,i)=>{const r=Math.floor(i/6),k=i%6;G[r%2?5-k:k].push(c)});
 const r0=myRank('pro')||999;acc.pr+=r0<=10?150000:r0<=30?90000:r0<=100?45000:25000;
 const first=[],second=[];let myOut=false;
 for(const g of G){const sc=g.map(c=>({c,w:0,r:0}));for(const[i,j]of[[0,1],[1,2],[0,2]]){if(g[i]==null||g[j]==null)continue;const mine=g[i]===m.c||g[j]===m.c;if(mine)log.push(`<b>Grupo: ${flag(g[i])} ${COUNTRIES[g[i]][1]} x ${flag(g[j])} ${COUNTRIES[g[j]][1]}</b>`);
   const w=bcUCTie(g[i],g[j],best,'G',mine?log:null,acc);(w?sc[i]:sc[j]).w++;(w?sc[i]:sc[j]).r+=2;(w?sc[j]:sc[i]).r+=1}
  sc.sort((x,y)=>y.w-x.w||y.r-x.r);first.push(sc[0].c);if(sc[1])second.push(sc[1])}
 second.sort((x,y)=>y.w-x.w||y.r-x.r);let qf=first.concat(second.slice(0,2).map(x=>x.c));{let n2=1;while(n2*2<=qf.length)n2*=2;qf=qf.slice(0,n2)}
 if(!qf.includes(m.c)){log.push(`Seu país não passou da fase de grupos.`);myOut=true}
 let br=shuffle(qf.slice()),stg=['Q','S','F'],k=0,champ=null;
 while(br.length>1){const nx=[];for(let i=0;i<br.length;i+=2){const a=br[i],b=br[i+1],mine=a===m.c||b===m.c;if(mine)log.push(`<b>${{Q:'Quartas',S:'Semifinal',F:'Final'}[stg[k]]}: ${flag(a)} ${COUNTRIES[a][1]} x ${flag(b)} ${COUNTRIES[b][1]}</b>`);
   const w=bcUCTie(a,b,best,stg[k],mine?log:null,acc)?a:b;nx.push(w)}br=nx;k++}
 champ=br[0];recTeam('United Cup',COUNTRIES[champ][1],champ,champ===m.c);
 CUR_EV={tier:'UC',name:'United Cup',city:'Sydney',iso:'AU',surf:'hard'};const a=award('me',{pts:[acc.pts],prize:[acc.pr],cat:'pro'},0)||{pr:0};
 S.busy=S.w;S.busyName='United Cup';m.energy=clamp(m.energy-4,0,100);m.app=clamp((m.app??50)+2,0,100);
 if(champ===m.c){m.st.titles.push({y:year(),n:'United Cup',tier:'TEAM'});hl(`🌏 Campeão da United Cup com ${COUNTRIES[m.c][1]}`);m.fol=Math.round(m.fol*1.06);news(`🏆 ${COUNTRIES[m.c][1]} conquista a United Cup com ${m.name}!`)}
 else news(`🌏 United Cup: ${flag(champ)} ${COUNTRIES[champ][1]} foi ${CIRC()==='WTA'?'campeã':'campeão'}.`);
 const html=`<p class="small mut" style="margin:0 0 6px">Sydney e Perth · cada confronto tem simples masculino, simples feminino e duplas mistas</p>${log.map(x=>`<div class="small">${x}</div>`).join('')}<p style="font-weight:700" class="${champ===m.c?'win':''}">${champ===m.c?'🏆 CAMPEÕES!':`Campeão: ${flag(champ)} ${COUNTRIES[champ][1]}`}</p><p class="small">Seu saldo: ${acc.w}V ${acc.l}D nas simples · +${acc.pts} pts · ${money(a.pr||0)}</p>`;
 S.modals.push({k:'United Cup',e:'🌏',ti:'United Cup',q:'',html,o:[{l:'Continuar',t:'',fx:{}}]})}
{const _st=specialToday;specialToday=function(){const r=_st();try{if(!r&&S&&S.me&&S.w%52===0&&S.dv&&!S.dv.done.uc&&bcUCCan())return'uc'}catch(e){}return r}}
{const _sc=specialCard;specialCard=function(){let k=null;try{k=specialToday()}catch(e){}if(k!=='uc')return _sc.apply(this,arguments);
 const m=S.me,{T}=bcUCTeams();return`<div class="card" style="border-color:var(--gold)"><div class="mk" style="color:var(--gold)">🌏 Convocação: United Cup</div><p class="small" style="margin:6px 0 6px">Você é ${G('o','a')} número 1 de ${COUNTRIES[m.c][1]} e o país está entre as ${T.length} seleções da competição mista em Sydney e Perth. Vale pontos no ranking e substitui o torneio desta semana.</p><div class="g2" style="margin-top:10px"><button onclick="playSpecial('uc',true)">Jogar</button><button class="sec" onclick="playSpecial('uc',false)">Recusar</button></div></div>`}}
{const _ps=playSpecial;playSpecial=function(kind,accept){if(kind!=='uc')return _ps.apply(this,arguments);S.dv.done.uc=1;if(accept){try{bcUCPlay()}catch(e){console.error(e)}}else news('Você abriu mão da United Cup para jogar o circuito nesta semana.');save();render()}}

// ---------------------------------------------------------------- 10) compromisso do top 30: bônus de fim de ano
// juvenis fortes viram profissionais antes dos 19 e chegam com pontos de ITF/Challenger já somados
function bcSeedPts(p){const pos=S.pro.filter(q=>q!==p&&q.r>p.r).length+1,T=Math.round(11000*Math.pow(pos,-.7)*.85);if(T<1)return;const ws=[];for(let j=0;j<8;j++)ws.push(R()+.3);const s=ws.reduce((a,b)=>a+b);p.pts=ws.map(x=>[S.w-ri(1,50),Math.max(1,Math.round(T*x/s))])}
{const _ny=newYear;newYear=function(){let early=[],grads=[];try{if(S&&S.jr){grads=S.jr.filter(p=>ageOf(p)>=19);early=S.jr.filter(p=>{const a=ageOf(p);return a<19&&((a>=18&&p.r>=56)||(a>=17&&p.r>=60)||(a>=16&&p.r>=65))});
  if(early.length){S.jr=S.jr.filter(p=>!early.includes(p));for(const p of early){p.pts=[];S.pro.push(p)}}}}catch(e){console.error(e)}
 const r=_ny.apply(this,arguments);
 try{// nível do circuito estável ao longo dos anos (sem inflação de rating)
  const rs=S.pro.map(p=>p.r).sort((a,b)=>b-a);if(rs.length>=100){const d=clamp(75-rs[99],-3,3)*.7;if(Math.abs(d)>.05){for(const p of S.pro.concat(S.jr)){p.r+=d;if(p.pot!=null)p.pot=Math.min(97,p.pot+d)}}}}catch(e){}
 try{for(const p of early.concat(grads))if(S.pro.includes(p)&&!(p.pts&&p.pts.length))bcSeedPts(p);if(early.length>2){const b=early.sort((a,b)=>b.r-a.r)[0];news(`🌱 ${early.length} juvenis viraram profissionais antes dos 19 anos, entre eles ${flag(b.c)} ${b.n} (${ageOf(b)} anos).`)}}catch(e){console.error(e)}
 return r}}
// quem ainda está bem no ranking adia a aposentadoria; quem caiu muito pendura a raquete mais cedo
{const _ny=newYear;newYear=function(){try{if(S&&S.pro)for(const p of S.pro){const a=ageOf(p),r=RK.pro[p.id]||9999;
  if(a+1>=(p.rt||34)&&r<=100&&(p.rt||34)<40&&R()<(r<=30?.92:r<=60?.85:.7))p.rt=(p.rt||34)+1;
  else if(a>=29&&r>300&&R()<.22)p.rt=Math.min(p.rt||34,a)}}catch(e){}return _ny.apply(this,arguments)}}
const BCBONUS=[2000000,1600000,1300000,1100000,950000,820000,720000,640000,570000,510000,460000,420000];
{const _ny=newYear;newYear=function(){try{const m=S.me;if(m&&!S.ended&&isPro()){const r=myRank('pro');const y0=S.w-52;
  const miss=(m.ptsPro||[]).filter(e=>e[0]>=y0&&e[0]<S.w&&e[1]===0&&e[2]!=='G').length;
  if(r&&r<=12){const base=BCBONUS[r-1]*(CIRC()==='WTA'?.9:1),cut=Math.min(1,.25*miss),v=Math.round(base*(1-cut)/1000)*1000;
   if(v>0){m.money+=v;m.st.prize=(m.st.prize||0)+v;try{bcLedAdd('Bônus de fim de ano',v)}catch(e){}news(`💰 Bônus de fim de temporada ${CIRC()==='WTA'?'da WTA':'da ATP'} (top 12 com compromisso cumprido): ${money(v)}${miss?` · descontado ${Math.round(cut*100)}% por ${miss} obrigatório(s) perdido(s)`:''}.`)}
   else news(`Você terminou no top 12, mas perdeu o bônus de fim de temporada por faltar a ${miss} torneios obrigatórios.`)}}}catch(e){console.error(e)}return _ny.apply(this,arguments)}}

// ---------------------------------------------------------------- 11) quadras: nome, teto, sessão noturna e placas de patrocínio
const BCCOURTS={'Australian Open':['Rod Laver Arena','Margaret Court Arena','John Cain Arena'],'Roland Garros':['Court Philippe-Chatrier','Court Suzanne-Lenglen','Court Simonne-Mathieu'],
 'Wimbledon':['Centre Court','No. 1 Court','No. 2 Court'],'US Open':['Arthur Ashe Stadium','Louis Armstrong Stadium','Grandstand'],
 'BNP Paribas Open':['Stadium 1','Stadium 2','Stadium 3'],'Miami Open':['Stadium Court','Grandstand','Butch Buchholz Court'],'Rolex Monte-Carlo Masters':['Court Rainier III','Court des Princes'],
 'Mutua Madrid Open':['Estadio Manolo Santana','Estadio Arantxa Sánchez Vicario','Estadio 3'],'Cincinnati Open':['Center Court','Grandstand'],'Rolex Shanghai Masters':['Stadium Court','Grandstand'],
 'Rolex Paris Masters':['Court Central','Court 1'],'China Open':['Diamond Court','Lotus Court'],'Wuhan Open':['Center Court','Court 1'],'Nitto ATP Finals':['Arena de Turim'],'WTA Finals':['Arena de Riad'],'Next Gen ATP Finals':['Arena de Jidá']};
const BCCOURTC={Roma:['Campo Centrale','Grandstand Arena','Campo Pietrangeli'],Toronto:['Centre Court','Grandstand'],Montreal:['Court Central','Banque Court']};
const BCROOF=new Set(['Rod Laver Arena','Margaret Court Arena','John Cain Arena','Court Philippe-Chatrier','Court Suzanne-Lenglen','Centre Court','No. 1 Court','Arthur Ashe Stadium','Louis Armstrong Stadium','Estadio Manolo Santana','Estadio Arantxa Sánchez Vicario','Estadio 3','Stadium Court','Diamond Court','Arena de Turim','Arena de Riad','Arena de Jidá']);
function bcCourtOf(ev,stage,opp){if(!ev)return'Quadra Central';const L=BCCOURTS[ev.name]||BCCOURTC[ev.city]||null,t=ev.tier,st=String(stage||'');
 if(bcIsRR(t))return(L||['Quadra Central'])[0];const cat=(TIERS[t]||{}).cat||'pro',mr=(RK[cat]||{}).me||999,orr=opp!=null&&opp!=='me'?((RK[cat]||{})[opp]||999):999,best=Math.min(mr,orr);
 let lvl=/Final|Semi/.test(st)?0:/Quartas/.test(st)?(t==='GS'||t==='M1000'?0:0):best<=(t==='GS'?6:10)?0:best<=(t==='GS'?30:40)||/Oitavas/.test(st)?1:best<=(t==='GS'?80:120)?2:3;
 if(['C175','C125','C100','C75','C50','M25','M15','J300','J200','J100','J60','J30','J500','JGS'].includes(t))lvl=/Final|Semi/.test(st)?0:best<=150?1:3;
 const h=seedHash((ev.key||'')+'|'+st+'|'+opp);
 if(lvl===0)return L?L[0]:'Quadra Central';if(L&&lvl<L.length)return L[lvl];if(L&&lvl===1&&L[1])return L[1];
 return lvl===1?'Quadra 1':`Quadra ${2+h%(t==='GS'?16:7)}`}
function bcRoofOf(ev,stage,opp){try{return BCROOF.has(bcCourtOf(ev,stage,opp))}catch(e){return false}}
function bcNight(ev,stage,cl,opp){if(cl==='indoor'||!ev)return 0;const ct=bcCourtOf(ev,stage,opp),st=String(stage||'');
 if(ev.name==='Wimbledon')return 0;if(/^Final$/.test(st)&&ev.name==='Roland Garros')return 0;
 const main=(BCCOURTS[ev.name]||BCCOURTC[ev.city]||['Quadra Central'])[0]===ct;if(!main)return 0;
 const h=seedHash((ev.key||'')+'|'+st+'|'+opp)%10;if(ev.name==='Australian Open'&&/^Final$/.test(st))return 1;
 return h<(ev.tier==='GS'?4:ev.tier==='M1000'||ev.tier==='A500'?3:2)?1:0}
function bcCourtTag(ev,stage,opp){try{const ct=bcCourtOf(ev,stage,opp),cl=climateOf(ev,S.w);const n=bcNight(ev,stage,cl,opp);return` · ${ct}${n?' · 🌙 sessão noturna':''}`}catch(e){return''}}
function bcBanner(ev){try{const L=(SPONSORS||[]).filter(s=>s.cat&&['relogio','carro','banco','aerea','bebida','tech'].includes(s.cat)&&s.n);if(!L.length)return'BREAKPOINT';
 const s=L[seedHash((ev&&ev.name)||'x')%L.length];return String(s.n).toUpperCase()}catch(e){return'BREAKPOINT'}}

// ---------------------------------------------------------------- 12) duplas: no-ad e match tie-break [10]
function bcDblScore(win,gs){const S1=()=>{const r=R();return r<.2?[7,6]:r<.42?[7,5]:[6,ri(1,4)]};let sets;
 if(R()<.58)sets=[S1(),S1()];else{const l=S1().reverse();sets=R()<.5?[S1(),l]:[l,S1()];if(gs){const r=R();sets.push(r<.25?[7,6]:[6,ri(2,4)])}else{const x=ri(0,8);sets.push([10,x>=9?x+2:x])}}
 const fmt=s=>s.map((x,i)=>gs||i<2?`${x[0]}-${x[1]}`:`[${x[0]}-${x[1]}]`).join(' ');if(!win)sets=sets.map(x=>[x[1],x[0]]);return fmt(sets)}
{const _dr=doublesRun;doublesRun=function(ev){const T=S.tour,n0=T&&T.log?T.log.length:0;const r=_dr.apply(this,arguments);
 try{if(T&&T.log.length>n0){const e=T.log[T.log.length-1];if(/^👥 Duplas/.test(e.t)&&!/\d-\d/.test(e.t)){const won=/Campeões/.test(e.t),gs=ev.tier==='GS';e.t+=` · ${won?'final':'última partida'}: ${bcDblScore(won,gs)}${gs?'':' (no-ad, match tie-break)'}`}}}catch(e){}return r}}
if(typeof v5DbRoundEnd==='function'){const _re=v5DbRoundEnd;v5DbRoundEnd=function(win){const D=V5DB;let sc='';try{if(D)sc=bcDblScore(win,D.ev.tier==='GS')}catch(e){}if(D)D.lastSc=sc;
 const r=_re.apply(this,arguments);try{if(D&&sc&&D.last){D.last=D.last.replace(/\.$/,` (${sc}${D.ev.tier==='GS'?'':', no-ad'}).`);v5DbShow()}}catch(e){}return r}}
if(typeof v5DbFinish==='function'){const _fi=v5DbFinish;v5DbFinish=function(){const D=V5DB,T=S.tour,n0=T&&T.log?T.log.length:0;const r=_fi.apply(this,arguments);try{if(T&&D&&D.lastSc&&T.log.length>n0){const e=T.log[T.log.length-1];if(/^👥/.test(e.t))e.t+=` · ${D.champ?'final':'última partida'}: ${D.lastSc}`}}catch(e){}return r}}
// cartão "seu caminho" na fase de grupos
if(typeof bcPathCard==='function'){const _pc=bcPathCard;bcPathCard=function(){const T=S.tour;if(!T||!T.rr)return _pc.apply(this,arguments);try{return bcRRPath(T)}catch(e){console.error(e);return''}}}
function bcRRPath(T){const rr=T.rr,ev=curEv(),c=BCRR[ev.tier],G=rr.g[rr.mine],i=G.indexOf('me'),mine=rr.res.filter(x=>x.a==='me'||x.b==='me');
 const H=(S.hist||[]).filter(h=>h.w===S.w&&h.e===ev.name);const sur=id=>{const p=IDX.get(id);return p?`${flag(p.c)} ${esc(bcSur(p.n))}`:''};
 const cells=[];for(let d=0;d<3;d++){let o=null;for(const[a,b]of BCRRS[d]){if(a===i)o=G[b];if(b===i)o=G[a]}const m=mine[d];
  if(m){const ok=m.w==='me';cells.push(`<div class="bcst ${ok?'ok':'out'}"><i>${ok?'✓':'✕'}</i><b>Grupo ${d+1}</b><span>${sur(o)}</span><em>${m.wo?'W.O.':esc(m.sets.map(s=>ok?s.join('-'):[s[1],s[0]].join('-')).join(' '))}</em></div>`)}
  else cells.push(`<div class="bcst ${d===rr.day&&!T.over&&rr.ph==='rr'?'now':'nx'}"><i>${d===rr.day&&rr.ph==='rr'?'●':''}</i><b>Grupo ${d+1}</b><span>${sur(o)}</span><em>${d===rr.day&&rr.ph==='rr'&&!T.over?'hoje':''}</em></div>`)}
 const ko=n=>{const lab=n===4?'Semi':'Final',h=H.find(x=>x.rd===(n===4?'Semifinal':'Final'));if(h)return`<div class="bcst ${h.win?'ok':'out'}"><i>${h.win?'✓':'✕'}</i><b>${lab}</b><span>${flag(h.oc)} ${esc(bcSur(h.on))}</span><em>${esc(h.s||'')}</em></div>`;
  const now=rr.ph==='ko'&&!T.over&&T.br&&T.br.length===n;return`<div class="bcst ${now?'now':rr.ph==='out'||T.over?'skip':'nx'}"><i>${now?'●':''}</i><b>${lab}</b><span>${now?sur(oppOf()):''}</span><em>${now?'hoje':''}</em></div>`};
 const t=TIERS[ev.tier],won=T.over&&S.results[0]&&S.results[0].r==='Campeão';
 const trophy=`<div class="bcst cup ${won?'ok':''}"><i>🏆</i><b>Título</b><span>${t.pts[0]?t.pts[0]+' pts':'sem pontos'}</span><em>${money((t.prize||[])[0]||0)}</em></div>`;
 let stake='';if(!T.over){const k=rr.ph==='rr'?c.rr:T.br&&T.br.length===4?c.sf:c.f;stake=`<div class="bcstake"><div><span>Em jogo hoje</span><b>${k[0]?'+'+k[0]+' pts · ':''}+${money(k[1])}</b></div><div><span>Já garantido</span><b>${rr.pts} pts · ${money(rr.pr)}</b></div></div>`}
 return`<div class="card bcpath"><div class="bcpathh"><span class="bckick">Seu caminho · fase de grupos</span><span class="xs mut">Grupo ${'AB'[rr.mine]} · 2 avançam</span></div><div class="bcsteps">${cells.join('')}${ko(4)}${ko(2)}${trophy}</div>${stake}</div>`}
