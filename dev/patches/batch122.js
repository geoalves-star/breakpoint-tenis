// ===== v8.1: duplas vivas =====
// parcerias que mudam com o tempo (fim de temporada, maus resultados, lesão do parceiro), duplas da IA jogando
// no mesmo torneio da simples, e você entrando na chave de duplas de verdade contra as duplas da IA.

// ---------------------------------------------------------------- quem pode jogar duplas em qual torneio
function bcSinglesMap(){const M={};for(const e of weekEvents(S.w)){const d=S.draws[e.key];if(d)for(const id of d)if(id!=null&&id!=='me')M[id]=e.key}return M}
const bcFitsEv=(team,ev,M)=>team.every(id=>!M[id]||M[id]===ev.key);
const bcDKey=t=>t[0]+'_'+t[1];
// time ativo da semana: lesão de um parceiro → o outro joga com um substituto
function bcDblActiveTeams(skip){const busy=new Set(skip||[]),out=[],free=new Set(S.pro.filter(p=>!(p.inj>0)).map(p=>p.id));
 for(const t of S.dteams||[])for(const id of t)free.delete(id);for(const id of busy)free.delete(id);
 const subs=[...free].map(id=>IDX.get(id)).filter(Boolean).sort((a,b)=>bcDblR(b)-bcDblR(a));
 for(const t of S.dteams||[]){if(t.some(id=>busy.has(id)))continue;const a=IDX.get(t[0]),b=IDX.get(t[1]);if(!a||!b)continue;
  const ia=a.inj>0,ib=b.inj>0;if(!ia&&!ib){out.push(t);continue}if(ia&&ib)continue;
  const ok=ia?b:a;if(bcDkOf(ok)<1.05&&R()<.6)continue;const sub=subs.shift();if(!sub)continue;const tt=[ok.id,sub.id];tt.tmp=1;out.push(tt)}
 return out}

// ---------------------------------------------------------------- chave de um torneio (com espaço para você)
function bcDblBuild(ev,teams,userTeam){const n=BCDBLN[ev.tier],T=userTeam?teams.slice(0,n-1):teams.slice(0,n);if(userTeam)T.push(userTeam);
 const pts=t=>t==='U'?(bcBest18(S.me.ptsDbl)+bcBest18((IDX.get(S.me.dpart)||{}).dpts)):bcTeamP(t);T.sort((a,b)=>pts(b)-pts(a));
 const ns=Math.min(n/4,T.length),seeds=T.slice(0,ns),rest=shuffle(T.slice(ns));
 const slots=seedOrder(n).map(x=>x<=ns?seeds[x-1]:x>T.length?null:rest.pop()||null);
 const fm={};for(const t of T)if(t!=='U')fm[bcDKey(t)]=gauss()*3.5;
 return{n,slots,fm,cache:{},ui:slots.indexOf('U'),done:false,uRes:null}}
function bcTRev(E,t){return bcTeamR(t)+(E.fm[bcDKey(t)]||0)}
// vencedor da partida (rodada r, posição pos) numa sub-chave sem você
function bcDblWin(E,r,pos){const k=r+':'+pos;if(k in E.cache)return E.cache[k];let a,b;
 if(r===0){a=E.slots[2*pos];b=E.slots[2*pos+1]}else{a=bcDblWin(E,r-1,2*pos);b=bcDblWin(E,r-1,2*pos+1)}
 let w;if(a==='U'||b==='U'){const ur=E.uRes;if(ur==null)return null;const o=a==='U'?b:a;w=(r<ur.won||ur.champ)?'U':o;if(!o)w='U'}
 else if(!a||!b)w=a||b;else{const p=1/(1+Math.pow(10,-(bcTRev(E,a)-bcTRev(E,b))/14));w=R()<p?a:b}
 E.cache[k]=w;return w}
// adversário que você enfrenta na rodada k (null = bye)
function bcDblOpp(ev,k){const E=bcDblE(ev);if(!E||E.ui<0)return null;const pos=E.ui>>k,sib=pos^1;
 if(k===0)return E.slots[sib]||null;return bcDblWin(E,k-1,sib)}
// fecha a chave depois do seu resultado e distribui os pontos da IA
function bcDblFinish(ev,won,champ){const E=bcDblE(ev);if(!E||E.done)return;E.uRes={won,champ:!!champ};E.done=true;bcDblSettle(ev,E)}
function bcDblSettle(ev,E){const RD=Math.log2(E.n),T=bcDTable(ev),wins=new Map();
 for(let r=0;r<RD;r++){const nM=E.n>>(r+1);for(let pos=0;pos<nM;pos++){let a,b;if(r===0){a=E.slots[2*pos];b=E.slots[2*pos+1]}else{a=bcDblWin(E,r-1,2*pos);b=bcDblWin(E,r-1,2*pos+1)}
   const w=bcDblWin(E,r,pos);if(!a||!b)continue;const lo=w===a?b:a;wins.set(w,(wins.get(w)||0)+1);
   if(lo!=='U'){const v=wins.get(lo)?T[Math.min(RD-r,T.length-1)]:0;if(v>0)for(const id of lo)(IDX.get(id).dpts=IDX.get(id).dpts||[]).push([S.w,v]);bcDblForm(lo,r===0)}}}
 const ch=bcDblWin(E,RD-1,0);S.dchem=S.dchem||{};
 for(const t of E.slots)if(t&&t!=='U'){const k=bcDKey(t);S.dchem[k]=Math.min(100,(S.dchem[k]||0)+1)}
 if(ch&&ch!=='U'){for(const id of ch)(IDX.get(id).dpts=IDX.get(id).dpts||[]).push([S.w,T[0]]);const k=bcDKey(ch);S.dchem[k]=Math.min(100,(S.dchem[k]||0)+8);bcDblForm(ch,false);
  if(['GS','M1000'].includes(ev.tier)){const a=IDX.get(ch[0]),b=IDX.get(ch[1]);news(`👥 Duplas em ${ev.name}: ${flag(a.c)} ${a.n} e ${flag(b.c)} ${b.n} são campeões.`)}
  S.dchamps=S.dchamps||{};(S.dchamps[ev.name]=S.dchamps[ev.name]||[]).push([year(),ch[0],ch[1]]);if(S.dchamps[ev.name].length>12)S.dchamps[ev.name].shift()}
 S.dDone=S.dDone||{};S.dDone[ev.key]=S.w}
const bcDblE=ev=>S.dbr&&S.dbr.w===S.w?S.dbr.E[ev.key]:null;

// ---------------------------------------------------------------- semana: monta todas as chaves respeitando a simples
bcDblWeek=function(){if(!S||!S.pro||S.dblW===S.w)return;S.dblW=S.w;bcDblInit();if(S.w%13===0)bcDblPair();
 const evs=weekEvents(S.w).filter(e=>BCDBLN[e.tier]&&TIERS[e.tier].cat==='pro');if(!evs.length)return;
 S.dbr=S.dbr&&S.dbr.w===S.w?S.dbr:{w:S.w,E:{}};const used=new Set();for(const k in S.dbr.E)for(const t of S.dbr.E[k].slots)if(t&&t!=='U')t.forEach(id=>used.add(id));
 const pd=S.me&&S.me.dpart;if(pd&&S.tour&&S.tour.dbl)used.add(pd);
 const M=bcSinglesMap(),avail=bcDblActiveTeams([...used]).filter(t=>t.every(id=>{const p=IDX.get(id),r=RK.pro[id]||999;return R()<(bcDkOf(p)>1.15?.95:M[id]?(r<=20?.2:.45):.6)}));
 avail.sort((a,b)=>bcTeamP(b)-bcTeamP(a)||bcTeamR(b)-bcTeamR(a));
 for(const tier of['GS','M1000','A500','A250','C175','C125','C100','C75','C50','M25','M15'])for(const ev of evs.filter(e=>e.tier===tier)){
  let E=S.dbr.E[ev.key];if(!E){const pick=[];for(let i=0;i<avail.length&&pick.length<BCDBLN[tier];i++){if(bcFitsEv(avail[i],ev,M)){pick.push(avail[i]);avail.splice(i,1);i--}}if(pick.length<4)continue;E=S.dbr.E[ev.key]=bcDblBuild(ev,pick,null)}
  if(!E.done){if(E.ui>=0&&!E.uRes)E.uRes={won:0,champ:false};E.done=true;bcDblSettle(ev,E)}}}
// você inscrito em duplas: sua dupla entra na chave real antes dos jogos
function bcDblPrepUser(ev){S.dbr=S.dbr&&S.dbr.w===S.w?S.dbr:{w:S.w,E:{}};if(S.dbr.E[ev.key])return S.dbr.E[ev.key];bcDblInit();
 const pd=S.me.dpart||(partnerOf()||{}).id,M=bcSinglesMap(),used=new Set([pd]);for(const k in S.dbr.E)for(const t of S.dbr.E[k].slots)if(t&&t!=='U')t.forEach(id=>used.add(id));
 const avail=bcDblActiveTeams([...used]).filter(t=>bcFitsEv(t,ev,M)).sort((a,b)=>bcTeamP(b)-bcTeamP(a));
 // a chave deste torneio pega duplas do nível dele: as melhores vão para os torneios maiores da semana
 const bigger=weekEvents(S.w).filter(e=>BCDBLN[e.tier]&&TIERS[e.tier].cat==='pro'&&TIERS[e.tier].w>TIERS[ev.tier].w).reduce((s,e)=>s+BCDBLN[e.tier],0);
 const pool=avail.slice(Math.min(bigger,Math.max(0,avail.length-BCDBLN[ev.tier])));
 const E=bcDblBuild(ev,pool.length>=4?pool:avail,'U');S.dbr.E[ev.key]=E;return E}
// resultado simulado (sem o modo interativo): rodada a rodada contra as duplas reais
function bcDblUserRun(ev,pt,team,R0){const m=S.me,t=TIERS[ev.tier];bcDblPrepUser(ev);let won=0;const path=[];
 for(let k=0;k<R0;k++){const o=bcDblOpp(ev,k);if(!o){won++;path.push(null);continue}
  const oppR=30+bcTeamR(o)*.75+(t.w>=2.5?2:0)+gauss()*3,p=1/(1+Math.pow(10,-(team-oppR)/10));m.energy=clamp(m.energy-3,0,100);m.load=clamp((m.load||0)+2,0,100);path.push(o);if(R()<p)won++;else break}
 const champ=won>=R0;bcDblFinish(ev,won,champ);BCDLAST={path,won,champ};return Math.min(won,R0)}
let BCDLAST=null;
const bcTeamNm=t=>t&&t.map?t.map(id=>{const p=IDX.get(id);return p?`${flag(p.c)} ${p.n.split(' ').slice(-1)[0]}`:'?'}).join(' / '):'';
{const _dr=doublesRun;doublesRun=function(ev){BCDLAST=null;const T=S.tour,n0=T&&T.log?T.log.length:0;const r=_dr.apply(this,arguments);
 try{const D=V5DB;if(D&&D.evKey===ev.key&&!D.bcReal&&D.stage==='intro'){D.bcReal=1;D.opp=v5DbOpp(D.field,0)}}catch(e){console.error(e)}
 try{if(BCDLAST&&T&&T.log.length>n0){const e=T.log[T.log.length-1];if(/^👥 Duplas/.test(e.t)){const L=BCDLAST.path.filter(Boolean),last=L[L.length-1];
   if(last)e.t+=BCDLAST.champ?` · final contra ${bcTeamNm(last)}`:` · ${BCDLAST.won>=L.length?'venceu':'perdeu para'} ${bcTeamNm(last)}`}}}catch(e){}return r}}
// modo interativo: os adversários de cada rodada são as duplas reais da chave
if(typeof v5DbOpp==='function'){const _o=v5DbOpp;v5DbOpp=function(field,k){try{const D=V5DB;if(D&&D.ev){bcDblPrepUser(D.ev);for(let kk=k;kk<D.R0;kk++){const o=bcDblOpp(D.ev,kk);if(o){if(kk>k){D.k=kk;D.won=kk}return o.slice()}}}}catch(e){console.error(e)}return _o(field,k)}}
if(typeof v5DbP==='function'){const _p=v5DbP;v5DbP=function(){const D=V5DB;try{if(D&&D.opp&&IDX.get(D.opp[0])&&IDX.get(D.opp[1])){if(D.oppR==null)D.oppR=30+bcTeamR(D.opp)*.75+(TIERS[D.ev.tier].w>=2.5?2:0)+gauss()*3;return 1/(1+Math.pow(10,-(D.team-D.oppR)/10))}}catch(e){}return _p.apply(this,arguments)}}
if(typeof v5DbFinish==='function'){const _fi=v5DbFinish;v5DbFinish=function(){const D=V5DB;try{if(D&&D.ev)bcDblFinish(D.ev,D.won,!!D.champ)}catch(e){console.error(e)}const T=S.tour,n0=T&&T.log?T.log.length:0,op=D&&D.opp,ch=D&&D.champ;const r=_fi.apply(this,arguments);try{if(op&&T&&T.log.length>n0){const e=T.log[T.log.length-1];if(/^👥 Duplas/.test(e.t))e.t+=ch?` · final contra ${bcTeamNm(op)}`:` · perdeu para ${bcTeamNm(op)}`}}catch(e){}return r}}

// ---------------------------------------------------------------- parcerias que mudam com o tempo
function bcDblForm(t,firstRoundLoss){S.dstk=S.dstk||{};const k=bcDKey(t);if(t.tmp)return;if(firstRoundLoss)S.dstk[k]=(S.dstk[k]||0)+1;else S.dstk[k]=0;
 if(S.dstk[k]>=4&&R()<.2)bcDblSplit(t,'depois de uma sequência de derrotas na estreia')}
function bcDblSplit(t,why){const i=(S.dteams||[]).findIndex(x=>x[0]===t[0]&&x[1]===t[1]);if(i<0)return;S.dteams.splice(i,1);const k=bcDKey(t);if(S.dstk)delete S.dstk[k];
 const a=IDX.get(t[0]),b=IDX.get(t[1]);if(a&&b&&((RK.dbl||{})[a.id]||999)<=25)news(`💔 Duplas: ${flag(a.c)} ${a.n} e ${flag(b.c)} ${b.n} encerram a parceria ${why}.`)}
{const _ny=newYear;newYear=function(){try{if(S&&S.dteams&&S.dblSim){const L=S.dteams.slice(),byP=L.slice().sort((a,b)=>bcTeamP(b)-bcTeamP(a)),byR=L.slice().sort((a,b)=>bcTeamR(b)-bcTeamR(a));
   for(const t of L){const rp=byP.indexOf(t),rr=byR.indexOf(t),ch=(S.dchem||{})[bcDKey(t)]||0;let pr=.12;if(rp-rr>20)pr=.45;if(ch>60)pr*=.5;
    const a=IDX.get(t[0]),b=IDX.get(t[1]);if(a&&b&&Math.abs(bcDblR(a)-bcDblR(b))>8)pr+=.2;if(R()<pr)bcDblSplit(t,'para a nova temporada')}
   bcDblPair();const nw=S.dteams.slice(-12).filter(t=>t.every(id=>((RK.dbl||{})[id]||999)<=30));for(const t of nw.slice(0,2)){const a=IDX.get(t[0]),b=IDX.get(t[1]);if(a&&b)news(`🤝 Nova dupla para a temporada: ${flag(a.c)} ${a.n} e ${flag(b.c)} ${b.n}.`)}}}catch(e){console.error(e)}return _ny.apply(this,arguments)}}
