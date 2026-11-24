// =============== v6.8 · modo treinador: equipe técnica (preparador físico, fisioterapeuta) e olheiro ===============
const BCSTF={
 pf:{i:'💪',n:'Preparador físico',c:[0,250,550,1100],d:lv=>lv?`Alunos evoluem cerca de ${8*lv}% mais rápido. Treino físico do atleta principal +${10*lv}% e os demais +${3*lv}%.`:'Ninguém cuida da parte física da equipe.'},
 fis:{i:'🩺',n:'Fisioterapeuta',c:[0,200,450,900],d:lv=>lv?`Atleta principal: lesões ${10*lv}% menos frequentes e +${lv} de energia por semana. Alunos perdem ${25*lv}% menos confiança quando você não está no box.`:'Sem acompanhamento de lesões e recuperação.'},
 sc:{i:'🔭',n:'Olheiro',c:[0,150,350,700],d:lv=>lv?`Um relatório de jovem talento a cada ${[0,6,5,4][lv]} semanas, com estimativa de potencial ${['','aproximada','boa','muito precisa'][lv]}.`:(bcSlots()<1?'Sem relatórios de talentos. Para contratar, você precisa de vaga para alunos: construa a academia ou suba a habilidade Gestão.':'Sem relatórios de talentos.')}};
const bcSt=()=>{const c=S.cm;c.st=c.st||{pf:0,fis:0,sc:0};return c.st};
const bcStLv=k=>{try{return bcV2()?(bcSt()[k]||0):0}catch(e){return 0}};
const bcStCost=()=>{const s=bcSt();return Object.keys(BCSTF).reduce((t,k)=>t+BCSTF[k].c[s[k]||0],0)};
function bcStSet(k,lv){const s=bcSt(),c=S.cm;lv=clamp(lv,0,3);if(k==='sc'&&lv>(s.sc||0)&&bcSlots()<1){TOAST='O olheiro só ajuda quando você tem vaga para alunos. Construa a academia ou suba a habilidade Gestão.';render();return}if(lv>(s[k]||0)&&c.wallet<BCSTF[k].c[lv]*2){TOAST=`Sua conta precisa de pelo menos ${money(BCSTF[k].c[lv]*2)} para contratar.`;render();return}
 const up=lv>(s[k]||0);s[k]=lv;news(up?`🧰 ${BCSTF[k].n} ${lv>1?'promovido ao nível '+lv:'contratado'} (${money(BCSTF[k].c[lv])}/sem).`:lv?`🧰 ${BCSTF[k].n} rebaixado ao nível ${lv}.`:`🧰 Você dispensou o ${BCSTF[k].n.toLowerCase()}.`);if(k==='sc'&&up&&!c.scW)c.scW=S.w;save();render()}
// salário semanal e efeitos
{const _ew=endWeek;endWeek=function(){const w0=S.w;const r=_ew.apply(this,arguments);try{if(S.w!==w0&&bcV2()&&!S.ended){const c=S.cm,s=bcSt(),cost=bcStCost();if(cost){c.wallet-=cost;if(c.wallet<0){const k=Object.keys(BCSTF).filter(k=>s[k]).sort((a,b)=>BCSTF[b].c[s[b]]-BCSTF[a].c[s[a]])[0];if(k){s[k]=0;news(`💸 Sem dinheiro na conta: o ${BCSTF[k].n.toLowerCase()} deixou a equipe.`)}}}
  if(s.fis)S.me.energy=clamp(S.me.energy+s.fis,0,100);bcScWeek()}}catch(e){console.error(e)}return r}}
{const _p=cmPupWeek;cmPupWeek=function(){const r=_p.apply(this,arguments);try{if(bcV2()){const c=S.cm,s=bcSt();for(const x of (c.pup||[])){const p=IDX.get(x.id);if(!p)continue;if(s.pf&&p.r<p.pot)p.r=Math.min(p.pot,p.r+.0035*s.pf*(x.foc==='treino'?1.5:1));if(s.fis&&String(c.box)!==String(x.id))x.tr=clamp((x.tr??60)+.02*s.fis,0,100)}}}catch(e){}return r}}
{const _g=gain;gain=function(k,base){const lv=bcStLv('pf');return _g.call(this,k,lv?base*(k==='fi'?1+.1*lv:1+.03*lv):base)}}
{const _i=injure;injure=function(a,b){const lv=bcStLv('fis');if(lv&&R()<.1*lv){news('🩺 O fisioterapeuta da equipe segurou a dor a tempo: nada de lesão.');return}return _i.apply(this,arguments)}}
// ---------- olheiro ----------
function bcScPool(){const c=S.cm,taken=new Set([S.rival,...(c.pup||[]).map(x=>x.id),...((c.rvA)||[]),...((c.rad)||[]).map(x=>x.id)]);return(S.jr||[]).filter(p=>!taken.has(p.id)&&ageOf(p)>=14&&ageOf(p)<=17)}
function bcScWeek(){const c=S.cm,lv=bcStLv('sc');if(!lv)return;const gap=[0,6,5,4][lv];c.scW=c.scW??S.w;if(S.w-c.scW<gap)return;c.scW=S.w;
 const P=bcScPool().sort((a,b)=>b.pot-a.pot);if(!P.length)return;const top=Math.max(3,Math.round(P.length*[0,.4,.2,.1][lv]));const p=pick(P.slice(0,top));
 const est=p.pot+gauss()*[0,4,2.5,1.4][lv];const rep={id:p.id,w:S.w,est:Math.round(est*10)/10};c.scR=rep;
 const st=BCPICK.style&&BCPICK.style.o[p.style]?BCPICK.style.o[p.style].n.toLowerCase():'';
 S.modals.push({k:'Olheiro',e:'🔭',ti:`Relatório do olheiro: ${p.n}`,q:`${flag(p.c)} ${p.n}, ${ageOf(p)} anos, ${RK.jr[p.id]?'#'+RK.jr[p.id]+' juvenil':'sem ranking juvenil'}, nível ${Math.round(p.r)}${st?', '+st:''}. O olheiro acha que ${G2(p)} ${scoutTxt(est)}.`,
  o:[{l:'Convidar para a equipe',t:bcFree()?`Chance de aceitar: ${Math.round(bcScOdds()*100)}%`:'Sem vaga agora: libere uma vaga primeiro',fx:{bcScIn:p.id}},{l:'Guardar no radar',t:'Fica na lista para convidar depois',fx:{bcScR:p.id}},{l:'Dispensar o relatório',t:'',fx:{}}]})}
const G2=p=>CIRC()==='WTA'?'ela':'ele';
const bcFree=()=>cmPups().length<bcSlots();
const bcScOdds=()=>clamp(.4+.06*bcMyLv()+.05*(cmRep()-1),.4,.95);
function bcScInvite(id){const c=S.cm,p=IDX.get(id);if(!p)return;if(!bcFree()){TOAST='Sem vaga na equipe. Libere uma vaga ou construa estrutura para mais alunos.';return}
 if(R()<bcScOdds()){c.pup=c.pup||[];c.pup.push({id,since:S.w,r0:p.r,n:p.n,c:p.c,t:0,tr:58,foc:'comp'});c.pupN=(c.pupN||0)+1;c.rad=(c.rad||[]).filter(x=>x.id!==id);news(`🔭 ${flag(p.c)} ${p.n} aceitou o convite e entrou na sua equipe.`);TOAST=`✅ ${p.n} entrou na sua equipe`}
 else{c.rad=(c.rad||[]).filter(x=>x.id!==id);c.rad.push({id,w:S.w,no:S.w});news(`🔭 ${p.n} agradeceu o convite, mas preferiu esperar. Fica no seu radar.`);TOAST=`${p.n} preferiu esperar`}}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcScIn!=null)bcScInvite(fx.bcScIn);if(fx&&fx.bcScR!=null){const c=S.cm;c.rad=(c.rad||[]).filter(x=>x.id!==fx.bcScR);c.rad.push({id:fx.bcScR,w:S.w,est:(c.scR&&c.scR.id===fx.bcScR)?c.scR.est:null});if(c.rad.length>5)c.rad.shift();TOAST='🔭 Guardado no radar'}}catch(e){console.error(e)}return r}}
function bcRadInv(id){const c=S.cm,x=(c.rad||[]).find(q=>q.id===id);if(x&&x.no!=null&&S.w-x.no<8){TOAST=`Espere mais ${8-(S.w-x.no)} semana(s) para convidar de novo.`;render();return}bcScInvite(id);save();render()}
// ---------- painel da equipe ----------
function bcStaffHtml(){const c=S.cm,s=bcSt(),cost=bcStCost();
 const rows=Object.entries(BCSTF).map(([k,o])=>{const lv=s[k]||0;return `<div class="bcsti"><div class="bcsth"><b>${o.i} ${o.n}${lv?` · nível ${lv}`:''}</b><div class="bcsl">${[1,2,3].map(n=>`<u class="${lv>=n?'on':''}"></u>`).join('')}</div></div><span>${o.d(lv)}</span>
  <div class="bcstb">${lv?`<button class="sec" onclick="bcStSet('${k}',${lv-1})">${lv===1?'Dispensar':'Baixar para nível '+(lv-1)}</button>`:''}${lv<3?`<button onclick="bcStSet('${k}',${lv+1})">${lv?'Subir para nível '+(lv+1):'Contratar'} · ${money(o.c[lv+1])}/sem</button>`:''}</div></div>`}).join('');
 const R0=(c.rad||[]).filter(x=>IDX.get(x.id)&&!(c.pup||[]).some(q=>q.id===x.id));c.rad=R0;
 const rad=R0.length?`<div class="bckick" style="margin-top:10px">🔭 Radar do olheiro</div>${R0.map(x=>{const p=IDX.get(x.id);return `<div class="bcrad"><span>${flag(p.c)} <b>${esc(p.n)}</b> · ${ageOf(p)} anos · nível ${Math.round(p.r)}${x.est?` · ${scoutTxt(x.est)}`:''}</span><button onclick="bcRadInv(${p.id})">Convidar</button></div>`}).join('')}`:'';
 return `<div class="bcstf"><div class="bctmt"><span class="bckick">Equipe técnica</span><span class="xs mut">${cost?`${money(cost)}/sem da sua conta`:'Ninguém contratado'}</span></div>${rows}${rad}</div>`}
{const _tp=bcTeamPanel;bcTeamPanel=function(){let h=_tp();try{if(bcV2())h=h.replace('<div class="bcsk">',bcStaffHtml()+'<div class="bcsk">')}catch(e){console.error(e)}return h}}
// ---------- contador anônimo de visitas (Vercel Web Analytics: sem cookies, só no site oficial) ----------
try{if(/vercel\.app$/.test(location.hostname)){window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};const s=document.createElement('script');s.defer=true;s.src='/_vercel/insights/script.js';document.head.appendChild(s)}}catch(e){}
