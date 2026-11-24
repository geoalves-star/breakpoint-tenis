// =============== v6.9 · inscrição respeitada, desistência com multa, defesa de pontos e números em português ===============
// ---------- defesa de pontos ----------
function bcRdTxt(r){r=String(r||'');if(/^Campe/.test(r))return'com o título';if(/^Vice/.test(r)||r==='Final')return'na final';if(/^Semi/.test(r))return'na semifinal';if(/^Quartas/.test(r))return'nas quartas';if(/^Oitavas/.test(r))return'nas oitavas';if(/Qualif/i.test(r))return'no qualifying';if(/^R\d+|^Rodada/.test(r))return'na estreia';return'na campanha'}
function bcRdOf(r){r=String(r||'');if(/^Campe/.test(r))return'do título';if(/^Vice/.test(r)||r==='Final')return'da final';if(/^Semi/.test(r))return'da semifinal';if(/^Quartas/.test(r))return'das quartas';if(/^Oitavas/.test(r))return'das oitavas';return'da campanha'}
// os pontos de um torneio valem até a semana do torneio no ano seguinte; nela você "defende" esses pontos
function bcDefOf(w){const m=S.me;if(!m)return{pts:0};const pro=isPro(),A=(pro?m.ptsPro:m.ptsJr)||[];const pts=A.filter(x=>x[0]===w-52).reduce((s,x)=>s+(x[1]||0),0);if(!pts)return{pts:0};
 const H=(S.hist||[]).filter(h=>h.w===w-52&&h.tier!=='TEAM');const ev=H.length?H[0].e:null;const res=ev?(S.results||[]).find(r=>r.n===ev&&r.y===year0(w-52)):null;
 return{pts,ev,r:res?res.r:null,y:year0(w-52),cat:pro?'pro':'jr'}}
function bcProj(drop){try{const pro=isPro(),A=(pro?S.me.ptsPro:S.me.ptsJr)||[],mine=sumPts(A)-drop;const L=pro?S.pro:S.jr;let n=1;for(const p of L)if(sumPts(p.pts||[])>mine)n++;return n}catch(e){return null}}
function bcNeedRound(ev,pts){const t=TIERS[ev.tier];if(!t||!t.pts)return null;const nm=['ao título','à final','à semifinal','às quartas','às oitavas','à 2ª rodada','à 3ª rodada'];for(let i=t.pts.length-1;i>=0;i--){if((t.pts[i]||0)>=pts)return nm[i]||'à chave principal'}return 'ao título'}
function bcDefCard(){if(!S||S.tour||S.ended||bcV2())return'';const d=bcDefOf(S.w);if(!d.pts)return'';const now=myRank(d.cat),pj=bcProj(d.pts);
 const evNow=d.ev?weekEvents(S.w).find(e=>e.name===d.ev):null;
 return `<div class="card bcdef"><div class="bcdefh"><span class="bcdefi" aria-hidden="true">🛡️</span><div><span class="bckick">Defesa de pontos</span><b>${d.pts} pts em jogo nesta semana</b></div></div>
 <p class="small" style="margin:8px 0 0">${d.ev?`São os pontos ${bcRdOf(d.r)} no ${esc(d.ev)} ${d.y}. `:''}Eles saem do seu ranking no fim desta semana.${evNow?` Jogando o ${esc(evNow.name)} de novo, você mantém tudo se chegar ${bcNeedRound(evNow,d.pts)}.`:''}</p>
 ${now&&pj?`<div class="bcdefr"><div><span>Hoje</span><b>#${now}</b></div><div><span>Se não somar pontos</span><b class="loss">#${pj}</b></div></div>`:''}</div>`}
// ---------- inscrição: semana com torneio agendado ----------
const BCWDF={GS:0,FIN:0,OLY:0,M1000:15000,A500:8000,A250:4000,C175:1500,C125:1200,C100:1000,C75:800,C50:600,M25:300,M15:200};
const bcWdFine=ev=>{const m=S.me;if(m.injury>0||m.energy<30||(m.load||0)>78)return 0;return BCWDF[ev.tier]??0};
function bcPlanned(){const k=S.plan&&S.plan[S.w];if(!k||S.tour||S.busy===S.w)return null;const e=weekEvents(S.w).find(x=>x.key===k);if(!e)return null;return{e,st:entryStatus(e)}}
function bcWdAsk(){const P=bcPlanned();if(!P)return;const f=bcWdFine(P.e),health=S.me.injury>0||S.me.energy<30||(S.me.load||0)>78;
 S.modals.push({k:'Inscrição',e:'📋',ti:`Desistir do ${P.e.name}?`,q:health?'Com o corpo nesse estado, a organização aceita a desistência por motivo médico, sem multa.':`Você está ${G('inscrito','inscrita')} e o seu nome já está na chave. Desistir em cima da hora tem multa${f?` de ${money(f)}`:''} e pega mal com a organização.`,
  o:[{l:'Manter a inscrição',t:'Você joga o torneio',fx:{}},{l:'Desistir mesmo assim',t:health?'Sem multa: motivo médico':`${f?`Multa de ${money(f)} · `:''}imagem um pouco pior`,fx:{bcWd:P.e.key}}]});render()}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcWd){const k=fx.bcWd,e=weekEvents(S.w).find(x=>x.key===k);if(e&&S.plan[S.w]===k){const f=bcWdFine(e);delete S.plan[S.w];S.wdW=S.w;if(f){S.me.money-=f;S.me.app=clamp((S.me.app??50)-2,0,100)}news(`📋 ${S.me.name} desistiu do ${e.name}${f?` e pagou ${money(f)} de multa`:' por motivo médico'}.`);PSEL=0}}}catch(e){console.error(e)}return r}}
{const _vp=v5Props;v5Props=function(){const r=_vp.apply(this,arguments);try{
  // moeda igual ao resto do jogo
  r.L.forEach(p=>{if(p.tags)p.tags=p.tags.map(t=>t.replace(/viagem \$/,'viagem US$ '))});
  const P=bcPlanned();if(P&&P.st.ok){const key=`enter('${P.e.key}')`;let card=r.L.find(p=>p.a===key);if(card){card.reg=1;card.t=`${P.st.main?'Jogar':'Jogar o qualifying de'} ${P.e.name}`;card.tags=[`<span class="v5t g">✓ ${G('inscrito','inscrita')}</span>`].concat(card.tags||[]);
    const f=bcWdFine(P.e),adv=card.w&&card.w[0]==='Você'?null:card.w;
    const wd={w:null,t:'Desistir da inscrição',q:f?`Multa de ${money(f)} por desistência tardia.`:'Sem multa: motivo médico.',tags:[`<span class="v5t ${f?'b':'n'}">${f?'multa '+money(f):'sem multa'}</span>`],a:'bcWdAsk()',cta:'Desistir'};
    r.L=[card,wd];if(PSEL>=r.L.length)PSEL=0}}
 }catch(e){console.error(e)}return r}}
function bcPlanNote(){const k=S.plan&&S.plan[S.w];if(!k||S.tour||S.busy===S.w||S.wdW===S.w)return'';const e=weekEvents(S.w).find(x=>x.key===k);if(!e)return'';const st=entryStatus(e);if(st.ok)return'';
 return `<div class="card bcpln"><b>📋 Você não entrou no ${esc(e.name)}</b><p class="small" style="margin:4px 0 0">${esc(st.txt||'A inscrição não foi aceita')}. A agenda foi liberada: escolha outra opção para esta semana.</p></div>`}
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(S&&S.me&&!MENU&&TAB==='home'&&!S.modals.length){const wk=document.querySelector('.bcwk');if(wk&&!S.tour&&!document.querySelector('.bcdef,.bcpln')){const h=bcPlanNote()+bcDefCard();if(h)wk.insertAdjacentHTML('afterend',h)}
   // botão principal: quem já está inscrito "joga", não "se inscreve"
   const P=bcPlanned();if(P&&P.st.ok&&(PSEL||0)===0)document.querySelectorAll('button').forEach(b=>{for(const n of b.childNodes)if(n.nodeType===3&&/^Inscrever/.test(n.nodeValue))n.nodeValue=n.nodeValue.replace(/^Inscrever/,'Ir para o torneio')})}
  // defesa no torneio em andamento
  if(S&&S.tour&&!S.tour.over&&TAB==='home'){const box=document.querySelector('.bcpath .bcstake');const d=bcDefOf(S.w);if(box&&d.pts&&!box.querySelector('.bcdf')){const ev=curEv();box.insertAdjacentHTML('beforeend',`<div class="bcdf"><span>Defendendo</span><b>${d.pts} pts${d.ev===ev.name?` · chegar ${bcNeedRound(ev,d.pts)}`:''}</b></div>`)}}
 }catch(e){console.error(e)}return v}}
// ---------- números em português: vírgula decimal (inglês continua com ponto) ----------
const bcPtNum=()=>{try{return (OPTS.lang||'pt')!=='en'}catch(e){return true}};
function bcDecFix(root){if(!bcPtNum()||!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const re=/([+−-]\d+)\.(\d)(?!\d)/g;while(n=w.nextNode()){const t=n.nodeValue;if(re.test(t)){re.lastIndex=0;n.nodeValue=t.replace(re,'$1,$2')}re.lastIndex=0}}
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{bcDecFix(document.getElementById('app'))}catch(e){}return v}}
// ---------- se o torneio começou, a tela de inscrição não pode continuar aparecendo ----------
{const _e=enter;enter=function(){const r=_e.apply(this,arguments);try{if(S&&S.tour&&!MENU&&document.querySelector('#app [onclick^="enter("]')){TAB='home';render()}}catch(e){}return r}}
