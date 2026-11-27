// ===== v7.8: o que ainda estava simplificado =====
// chaves de 56/48/28 por torneio, bye automático, Next Gen com sets curtos, calor no mundo todo,
// United Cup com elencos completos, hospedagem nos Challengers, Laver Cup no formato real e ranking protegido completo.

// ---------------------------------------------------------------- 1) tamanho da chave de cada torneio
const BCDRAWEV={ATP:{'Rolex Monte-Carlo Masters':56,'Rolex Paris Masters':56,'Barcelona Open Banc Sabadell':48,'Mubadala Citi DC Open':48},
 WTA:{'Qatar TotalEnergies Open':56,'Dubai Duty Free Tennis Championships':56,'Wuhan Open':56}};
function bcDrawN(ev){if(!ev)return 32;const t=TIERS[ev.tier];if(!t)return 32;const n=1<<(t.pts.length-1);
 const m=(BCDRAWEV[(S&&S.circ)||'ATP']||{})[ev.name];if(m&&m<=n)return m;const d=BCDRAWN[ev.tier];return d&&d<=n?d:n}
// ATP/WTA 500 ganham uma rodada a mais na tabela (chave de 48); as de 32 começam direto na 2ª
BCATPT.A500=Object.assign(BCATPT.A500||{},{pts:[500,330,200,100,50,0,0],prize:(BCORIG.A500.prize||[]).concat([Math.round(((BCORIG.A500.prize||[]).slice(-1)[0]||10000)*.6/10)*10])});
BCWTAT.A500=Object.assign(BCWTAT.A500||{},{pts:[500,325,195,108,60,1,1],prize:BCWTAT.A500.prize.concat([5000])});
BCDRAWN.A500=32;
{const _cs=bcCircSync;bcCircSync=function(){const r=_cs.apply(this,arguments);try{BCDRAWN.A500=S&&S.circ==='WTA'?28:32}catch(e){}return r}}
BCCS=null;
// cabeças de chave: 8 até 32 jogadores, 16 até 64, 32 acima
makeBracket=function(ids,cat,n){
 const s=[...ids].filter(x=>x!=null).sort((a,b)=>(RK[cat][a]??1e6)-(RK[cat][b]??1e6)||rating(b)-rating(a));const p=s.length;
 const ns=Math.min(p<=32?8:p<=64?16:32,Math.max(2,n/4),p),top=s.slice(0,ns),rest=shuffle(s.slice(ns));
 return seedOrder(n).map(x=>x<=ns?top[x-1]:x>p?null:rest.pop()??null)};
// bye sem clique: o jogo avança sozinho até o seu primeiro adversário
function bcAutoBye(T){if(!T||T.over||T.q||T.rr||!T.br)return;let g=0;const ev=curEv();
 while(T.br.length>1&&g++<4){const i=T.br.indexOf('me');if(i<0||T.br[i^1]!=null)break;
  const all=T.br.every((x,k)=>k%2||T.br[k]==null||T.br[k+1]==null);
  if(!all)T.log.push({c:'mut',t:`${roundName(T.br.length)}: bye (cabeça de chave)`});
  T.br=playRound(T.br,ev,T.round,true);T.round++;try{trackBr()}catch(e){}}}
{const _da=bcDrawAnn;bcDrawAnn=function(){try{bcAutoBye(S.tour)}catch(e){}return _da.apply(this,arguments)}}
{const _en=enter;enter=function(key){const T0=S.tour;const r=_en.apply(this,arguments);try{if(S.tour&&S.tour!==T0)bcAutoBye(S.tour)}catch(e){console.error(e)}return r}}
{const _pm=playMatch;playMatch=function(pre){let ng=false;try{const ev=S.tour&&curEv();ng=!!(ev&&ev.tier==='NGF')}catch(e){}const o=BCFMTF;if(ng)BCFMTF=BCNGF;let r;try{r=_pm.apply(this,arguments)}finally{if(ng)BCFMTF=o}try{const T=S.tour;if(T&&!T.over&&!T.q&&!T.rr&&!S.modals.length)bcAutoBye(T)}catch(e){console.error(e)}return r}}

// ---------------------------------------------------------------- 2) Next Gen: sets até 4 games, tie-break no 3-3, sem vantagem, melhor de 5
const BCNGF={sg:4,tb:3,na:1};let BCFMTF=null;
function bcFmt(){if(BCFMTF)return BCFMTF;try{if(IM&&IM.ev&&IM.ev.tier==='NGF')return BCNGF}catch(e){}return null}
TIERS.NGF.bo5=true;
{const _rp=bcRRPlay;bcRRPlay=function(pre){const ev=curEv();BCFMTF=ev&&ev.tier==='NGF'?BCNGF:null;try{return _rp.apply(this,arguments)}finally{BCFMTF=null}}}
{const _us=userMatch;userMatch=function(opp,ev,bo5,stage,pre){if(ev&&ev.tier==='NGF')bo5=true;return _us.call(this,opp,ev,bo5,stage,pre)}}
// placares da IA no formato curto
{const _fs=bcFakeSets;bcFakeSets=function(ls){if(!BCFMTF)return _fs(ls);const S1=()=>{const r=R();return r<.25?[4,3]:[4,ri(0,2)]};const w=[S1(),S1(),S1()],l=[];for(let i=0;i<ls;i++)l.push(S1().reverse());const out=[];
 while(w.length||l.length){if(l.length&&(w.length===1||R()<.45))out.push(l.pop());else out.push(w.pop())}return out}}
{const _sim=bcRRSim;bcRRSim=function(a,b,ev){if(ev.tier!=='NGF')return _sim(a,b,ev);BCFMTF=BCNGF;try{const w=R()<aiP(a,b,true,ev.surf)?a:b,r=R(),ls=r<.4?0:r<.75?1:2,sets=bcFakeSets(ls);return{a,b,w,ls,sets}}finally{BCFMTF=null}}}
{const _sa=simEventAI;simEventAI=function(ev){if(ev&&ev.tier==='NGF'){BCFMTF=BCNGF;try{return _sa(ev)}finally{BCFMTF=null}}return _sa(ev)}}
{const _dy=bcRRDayAI;bcRRDayAI=function(rr,ev,d,skipMe){if(ev&&ev.tier==='NGF'){const o=BCFMTF;BCFMTF=BCNGF;try{return _dy(rr,ev,d,skipMe)}finally{BCFMTF=o}}return _dy(rr,ev,d,skipMe)}}

// ---------------------------------------------------------------- 3) calor extremo onde ele existe (Austrália, EUA, Ásia, Golfo, América Latina)
bcHeatRoll=function(ev,stage,opp){if(!ev||climateOf(ev,S.w)!=='quente')return null;const au=ev.iso==='AU';if(R()>(au?.2:.1))return null;
 const ct=bcCourtOf(ev,stage,opp),roof=BCROOF.has(ct);let k=roof?'roof':au?'susp':ev.name==='US Open'?'break':R()<.5?'delay':'cool';return{roof,ct,k,au}};
bcHeatTxt=function(h){return h.k==='roof'?`🌡️ Política de calor extremo: o índice de estresse térmico passou do limite e o teto da ${h.ct} foi fechado. O jogo segue em condições de quadra coberta.`
 :h.k==='susp'?`🌡️ Política de calor extremo: jogo suspenso nas quadras externas por cerca de 2 horas e retomado no fim da tarde, com temperatura mais amena.`
 :h.k==='break'?`🌡️ Regra de calor do US Open: pausa de 10 minutos para resfriamento antes do set decisivo.`
 :h.k==='delay'?`🌡️ Calor acima do limite (WBGT): a organização atrasou o início do jogo para o fim da tarde.`
 :`🌡️ Regra de calor: pausas extras para resfriamento nas trocas de lado, com gelo e toalhas geladas.`};

// ---------------------------------------------------------------- 4) United Cup com elenco completo e pontos para todos
function bcUCMate(c){const y=year();S.ucR=S.ucR&&S.ucR.y===y?S.ucR:{y,m:{}};if(!S.ucR.m[c]){const W=CIRC()==='WTA'?CW_ATP:CW_WTA,iso=COUNTRIES[c][0];S.ucR.m[c]={n:genName(c,CIRC()!=='WTA'),s:Math.round(58+7*Math.log(1+(W[iso]||0))+gauss()*2.5)}}return S.ucR.m[c]}
bcUCOther=function(c){return bcUCMate(c).s};
bcUCTie=function(ca,cb,best,stage,log,acc){const a=best[ca],b=best[cb],mine=a==='me'||b==='me';let wa=0;CUR_EV={tier:'UC',name:'United Cup',city:'Sydney',iso:'AU',surf:'hard'};
 const myC=mine?(a==='me'?ca:cb):null,otC=mine?(a==='me'?cb:ca):null,oppId=mine?(a==='me'?b:a):null;
 const sc=ok=>bcFakeSets(R()<.35?1:0).map(s=>ok?s.join('-'):[s[1],s[0]].join('-')).join(' ');
 const lg=(wCa,lb,txt)=>{const ok=ca===myC?wCa:!wCa;log.push(`${ok?'✅':'❌'} ${lb}: ${txt(ok)}`)};
 let w1;if(mine){const before=S.hist.length;const win=matchUp('me',oppId,log,'AU');w1=a==='me'?win:!win;
   if(win){acc.pts+=BCUCP[stage][bcUCi(RK.pro[oppId]||999)];acc.pr+=BCUCPR[stage];acc.w++}else{acc.l++;const v2=BCUCP[stage][bcUCi(RK.pro.me||999)];if(v2)award(oppId,{pts:[v2],prize:[0],cat:'pro'},0)}
   try{if(S.hist.length>before)S.hist[0].e='United Cup'}catch(e){}}
 else{w1=R()<aiP(a,b,false,'hard');const wn=w1?a:b,lo=w1?b:a,v=BCUCP[stage][bcUCi(RK.pro[lo]||999)];if(v&&wn!=='me')award(wn,{pts:[v],prize:[0],cat:'pro'},0)}
 if(w1)wa++;
 const ma=bcUCMate(ca),mb=bcUCMate(cb),w2=R()<1/(1+Math.pow(10,-(ma.s-mb.s)/10));if(w2)wa++;
 if(mine&&log){const m2=bcUCMate(myC),o2=bcUCMate(otC);lg(w2,CIRC()==='WTA'?'Simples masculino':'Simples feminino',ok=>`${flag(myC)} ${esc(m2.n)} ${ok?'venceu':'perdeu para'} ${flag(otC)} ${esc(o2.n)} (${sc(ok)})`)}
 if(wa===1){const ra=(tRat(a)+ma.s)/2,rb=(tRat(b)+mb.s)/2,w3=R()<1/(1+Math.pow(10,-(ra-rb)/10));if(w3)wa++;
  if(mine&&log){const m2=bcUCMate(myC),o2=bcUCMate(otC),op=IDX.get(oppId);lg(w3,'Duplas mistas',ok=>`você e ${esc(m2.n)} ${ok?'venceram':'perderam para'} ${op?esc(op.n):'—'} e ${esc(o2.n)} (${bcDblScore(ok,false)})`)}}
 return wa>=2};

// ---------------------------------------------------------------- 5) hospedagem: Challenger paga o hotel de quem está na chave principal
{const _lo=lodgeOf;lodgeOf=function(e,main){const v=_lo(e,main);try{if(main&&['C175','C125','C100','C75','C50'].includes(e.tier)){const base=LODGE[e.tier]||0;return Math.round(Math.max(0,v-base)/10)*10}
 if(main&&e.tier==='M25')return Math.round(v*.7/10)*10}catch(x){}return v}}

// ---------------------------------------------------------------- 6) Laver Cup no formato real: 3 dias, 1/2/3 pontos por jogo, quem chegar a 13 vence
const BCLVC=[['Berlim','DE'],['São Francisco','US'],['Londres','GB'],['Boston','US'],['Praga','CZ'],['Chicago','US'],['Genebra','CH'],['Vancouver','CA']];
function bcLaver(){const m=S.me,eu=c=>EUR.includes(COUNTRIES[c][0]),mine=eu(m.c);const pool=x=>ORD.pro.filter(id=>id!=='me'&&IDX.get(id)&&!(IDX.get(id).inj>0)&&eu(IDX.get(id).c)===x);
 let own,opp;if(typeof bcLvTeams==='function'){const T=bcLvTeams();own=T.own.slice();opp=T.opp.slice()}else{own=pool(mine).slice(0,5).concat(['me']).sort((a,b)=>(RK.pro[a]||999)-(RK.pro[b]||999)).slice(0,6);opp=pool(!mine).slice(0,6)}if(!own.includes('me')){own.pop();own.push('me')}while(own.length<6)own.push(pool(mine).find(x=>!own.includes(x)));while(opp.length<6)opp.push(pool(!mine).find(x=>!opp.includes(x)))
 const yi=((year()-2024)%BCLVC.length+BCLVC.length)%BCLVC.length,[city,iso]=BCLVC[yi],log=[],rat=id=>id==='me'?ovr():IDX.get(id).r;let pa=0,pb=0;const myM={w:0,l:0};
 const nm=id=>id==='me'?'você':`${flag(IDX.get(id).c)} ${IDX.get(id).n}`;
 const sing=(a,b,pts,day)=>{let w;if(a==='me'||b==='me'){const o=a==='me'?b:a;const win=matchUp('me',o,log,iso);w=a==='me'?win:!win;win?myM.w++:myM.l++}else w=R()<aiP(a,b,false,'hard');w?pa+=pts:pb+=pts;
  if(a!=='me'&&b!=='me')log.push(`<span class="mut">Dia ${day} · simples: ${w?'✅':'❌'} ${nm(w?a:b)} venceu ${nm(w?b:a)} (+${pts} para ${w?'o seu time':'os rivais'})</span>`);};
 const dbl=(a1,a2,b1,b2,pts,day)=>{const ra=(rat(a1)+rat(a2))/2,rb=(rat(b1)+rat(b2))/2,w=R()<1/(1+Math.pow(10,-(ra-rb)/9));w?pa+=pts:pb+=pts;const me=[a1,a2].includes('me');
  log.push(`${me?'':'<span class="mut">'}Dia ${day} · duplas: ${nm(a1)} e ${nm(a2)} ${w?'venceram':'perderam para'} ${nm(b1)} e ${nm(b2)} (${bcDblScore(w,false)}) (+${pts} para ${w?'o seu time':'os rivais'})${me?'':'</span>'}`)};
 const end=()=>pa>=13||pb>=13;
 const plan=[[1,[[5,4],[4,5],[3,3]],[1,4,1,4]],[2,[[2,2],[1,0],[0,1]],[0,3,0,3]],[3,[[0,0],[1,1],[2,2]],[2,5,2,5]]];
 for(const[day,S3,D]of plan){log.push(`<b>Dia ${day} · cada vitória vale ${day} ponto${day>1?'s':''}</b>`);if(day===3&&!end())dbl(own[D[0]],own[D[1]],opp[D[2]],opp[D[3]],3,3);
  for(const[i,j]of S3){if(end())break;sing(own[i],opp[j],day,day)}if(day<3&&!end())dbl(own[D[0]],own[D[1]],opp[D[2]],opp[D[3]],day,day);if(end())break}
 if(!end()&&pa===12&&pb===12){log.push('<b>12 a 12: duplas decisivas, set único</b>');dbl(own[0],own[1],opp[0],opp[1],1,3)}
 const w=pa>pb,rk=myRank('pro')||999;CUR_EV={tier:'LV',name:'Laver Cup',city,iso,surf:'hard'};const fee=(rk<=5?750000:rk<=10?400000:200000)+(w?250000:0);const a=award('me',{pts:[0],prize:[fee],cat:'pro'},0)||{pr:0};
 recTeam('Laver Cup',w===mine?'Time Europa':'Time Mundo',w===mine?COUNTRIES.findIndex(c=>c[0]==='GB'):COUNTRIES.findIndex(c=>c[0]==='US'),w);m.app=clamp((m.app??50)+2,0,100);m.fol=Math.round(m.fol*1.04);m.energy=clamp(m.energy-6,0,100);
 if(w){m.st.titles.push({y:year(),n:'Laver Cup',tier:'TEAM'});news('🏆 Você venceu a Laver Cup com seu time!')}
 const html=`<p class="small mut" style="margin:0 0 6px">${esc(city)} · sem pontos no ranking · time de 6 contra 6</p><p><b>Time ${mine?'Europa':'Mundo'}</b> ${pa} x ${pb} <b>Time ${mine?'Mundo':'Europa'}</b></p>${log.map(x=>`<div class="small">${x}</div>`).join('')}<p class="${w?'win':'loss'}" style="font-weight:700">${w?'Seu time venceu a Laver Cup!':'Seu time perdeu.'}</p><p class="small">Você: ${myM.w}V ${myM.l}D nas simples · cachê ${money(a.pr||0)}</p>`;
 S.busy=S.w;S.busyName='Laver Cup';S.busyMsg='Você jogou a Laver Cup nesta semana.';S.modals.push({k:'Laver Cup',e:'🌍',ti:'Laver Cup',q:'',html,o:[{l:'Continuar',t:'',fx:{}}]});save();render()}
{const _ps=playSpecial;playSpecial=function(kind,accept){if(kind==='lv'&&accept){S.dv.done[S.w%52]=1;try{bcLaver()}catch(e){console.error(e);return _ps.apply(this,arguments)}return}return _ps.apply(this,arguments)}}

// ---------------------------------------------------------------- 7) ranking protegido como no regulamento
v5ProtTick=function(){const m=S.me;if(!m||S.ended)return;const W=CIRC()==='WTA';
 if(m.prot&&m.prot.until&&S.w>m.prot.until){news(`${W?'Seu ranking especial':'Seu ranking protegido'} expirou${m.prot.n?` com ${m.prot.n} uso(s) sobrando`:''}.`);m.prot=null}
 if(m.injury>0){m.injW=(m.injW||0)+1;if(m.injW<=13){const r=myRank('pro');if(r)(m.prRs=m.prRs||[]).push(r)}}
 else if(m.injW){if(m.injW>=26&&m.prRs&&m.prRs.length){const avg=Math.round(m.prRs.reduce((a,b)=>a+b,0)/m.prRs.length),long=m.injW>=52,n=W?(long?12:8):(long?12:9),wk=long?52:39;
   m.prot={r:avg,n,until:S.w+wk};news(`${W?'Ranking especial':'Ranking protegido'}: depois de ${m.injW} semanas fora, você pode usar o ranking #${avg} (média dos 3 primeiros meses da lesão) em ${n} torneios nos próximos ${Math.round(wk/4.33)} meses. Não vale para Finals nem eventos por equipe.`)}
  m.injW=0;m.prRs=null;m.prR=null}};

// ---------------------------------------------------------------- 8) dinheiro do juvenil: família, federação e reembolso de amador
// amador (menor de 18) em torneio profissional: família e federação dividem a viagem, como nos juvenis
{const _to=tripOf;tripOf=function(e,from,main){const r=_to.apply(this,arguments);try{if(r&&e&&TIERS[e.tier]&&TIERS[e.tier].cat==='pro'&&bcAmateur()&&meAge()<18&&!r.fam&&!r.paid){r.c=Math.round(r.c*.35/10)*10;r.lodge=Math.round(r.lodge*.35/10)*10;r.total=r.c+r.lodge;r.fam=1}}catch(x){}return r}}
// regra da ITF: o amador pode receber o reembolso das despesas até o valor do prêmio
function bcAmRefund(won){const T=S.tour;if(!T||!won)return 0;const ev=curEv();let cap=0;try{cap=tripOf(ev,null,true).total+bcRoadCost(ev)}catch(e){cap=1500}const left=Math.max(0,cap-(T.amRef||0)),v=Math.min(won,left);if(v<=0)return 0;
 T.amRef=(T.amRef||0)+v;S.me.money+=v;try{bcLedAdd('Reembolso de despesas (amador)',v)}catch(e){}T.log.push({c:'mut xs',t:`🎓 Reembolso de despesas (regra do amador): ${money(v)} de ${money(won)} do prêmio.`});return v}
{const _a=award;award=function(id,t,idx){const r=_a(id,t,idx);try{if(id==='me'&&r&&r.am)bcAmRefund(r.am)}catch(e){}return r}}
// menor de idade não fica no vermelho: a família cobre até US$ 30 mil por ano
{const _ew=endWeek;endWeek=function(){const r=_ew.apply(this,arguments);try{const m=S.me;if(m&&!S.ended&&meAge()<18&&m.money<0){const y=year();if(!m.famY||m.famY.y!==y)m.famY={y,v:0};const c=Math.min(-m.money,30000-m.famY.v);
  if(c>0){m.money+=c;m.famY.v+=c;try{bcLedAdd('Apoio da família',c)}catch(e){}if(!m.famY.n){m.famY.n=1;news(`👨‍👩‍👧 Sua família cobriu ${money(c)} das despesas da temporada. O limite é de ${money(30000)} por ano: escolha bem os torneios.`)}}}}catch(e){}return r}}
// WTA: a chave da 1ª semana já nasce com o tamanho certo
{const _ng=newGame;newGame=function(){const r=_ng.apply(this,arguments);try{BCCS=null;bcCircSync();if(S&&S.circ==='WTA')allocWeek()}catch(e){console.error(e)}return r}}

// ---------------------------------------------------------------- 9) fluidez: pendência obrigatória sempre no topo da semana
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(S&&!MENU&&TAB==='home'){const mu=document.querySelector('#app .v5wk > .v5must'),ob=document.querySelector('#app .v5wk > .bcob');if(mu&&ob&&ob.compareDocumentPosition(mu)&Node.DOCUMENT_POSITION_FOLLOWING)ob.before(mu)}}catch(e){}return v}}
// inscrever-se num torneio não avança a semana: as pendências só travam o "avançar"
{const _en=enter;enter=function(){const o=SIMALL;SIMALL=true;try{return _en.apply(this,arguments)}finally{SIMALL=o}}}
// clima: Golfo e norte da África só são "calor forte" de abril a outubro (Doha e Dubai em fevereiro são amenos)
{const _cl=climateOf;climateOf=function(ev,w){const c=_cl(ev,w);try{if(c==='quente'&&ev&&['QA','AE','SA','EG','TN','MA'].includes(ev.iso)){const wk=w%52;if(wk<14||wk>41)return'ameno'}}catch(e){}return c}}

// ---------------------------------------------------------------- 10) placar: tie-break com nome certo e ponto decisivo no no-ad
if(typeof bcBoardHead==='function'){const _bh=bcBoardHead;bcBoardHead=function(nDone,live){let h=_bh.apply(this,arguments);try{if(live&&IM&&IM.E&&IM.E.tb)h=h.replace('<td>Game</td>','<td>Tie-break</td>')}catch(e){}return h}}
if(typeof bcExplain==='function'){const _bx=bcExplain;bcExplain=function(o){let h=_bx.apply(this,arguments);try{if(bcFmt()&&bcFmt().na)h=h.replace('Iguais (40-40): precisa ganhar 2 pontos seguidos.','Iguais (40-40), sem vantagem: quem ganhar o próximo ponto leva o game.')}catch(e){}return h}}
// ---------------------------------------------------------------- 11) aviso de versão nova (o app aberto há horas continua com o código antigo)
function bcVerCheck(){try{if(!/^https?:$/.test(location.protocol)||!/vercel\.app$/.test(location.hostname))return;
 fetch('index.html?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.text():'').then(t=>{const mm=t&&t.match(/const VERSION='([\d.]+)'/);if(!mm||mm[1]===VERSION||document.getElementById('bcupd'))return;
  const d=document.createElement('div');d.id='bcupd';d.className='bcupd';d.innerHTML=`<span>Nova versão ${mm[1]} disponível. ${IM||LIVE?'Atualize quando terminar a partida.':'Seu progresso fica salvo.'}</span><button onclick="try{save()}catch(e){};location.reload()">Atualizar</button>`;document.body.appendChild(d)}).catch(()=>{})}catch(e){}}
setTimeout(bcVerCheck,5000);setInterval(bcVerCheck,15*60*1000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)bcVerCheck()});
