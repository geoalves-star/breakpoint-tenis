// =============== v5.2 · simulador: 1) ranking e inscrições ===============
// pontos que saem do ranking na semana w (da edição do ano anterior)
function v5Drop(w,a){a=a||S.me.ptsPro||[];let s=0;for(const[x,v]of a)if(x===w-52)s+=v;return s}
function v5Drops(k){const L=[];for(let i=0;i<k;i++){const w=S.w+i,v=v5Drop(w);if(v)L.push([w,v])}return L}
// torneios obrigatórios para o top 30 (Slams e Masters/1000, menos Monte Carlo)
const v5Mand=e=>(e.tier==='GS'||e.tier==='M1000')&&!/Monte Carlo|Monte-Carlo/i.test(e.name+' '+e.city);
const v5Commit=()=>{const r=myRank('pro');return !!(r&&r<=30)};
const V5FINE=40000;
// lucky loser
function v5LL(T,t){if(!T||!T.q||T.q.step!==T.q.n-1)return false;const ev=curEv(),p={GS:.45,M1000:.4,A500:.32,A250:.3}[ev.tier]||(ev.tier.startsWith('C')?.25:.18);if(R()>=p)return false;
 T.log.push({c:'win',t:'Lucky loser: uma desistência abriu vaga na chave principal!'});T.q=null;T.ll=1;insertMe();news(`Lucky loser no ${ev.name}: você entra na chave principal mesmo perdendo no quali.`);if(!QUIET)S.modals.push({e:'',k:'Sorte',ti:'Lucky loser!',q:`Um jogador desistiu do ${ev.name} e você, que perdeu na última rodada do quali, herda a vaga na chave principal.`,o:[{l:'Bora!',t:'Você entra na chave principal'}]});return true}
// convites pedidos
function v5WcOdds(e){const t=TIERS[e.tier],m=S.me,r=myRank('pro')||1500,home=e.iso===COUNTRIES[m.c][0];let p={GS:.02,M1000:.03,A500:.05,A250:.08,C175:.12,C125:.15,C100:.18,C75:.22,C50:.25}[e.tier]||0;if(!p)return 0;
 if(home)p*=3.5;p*=1+Math.min(1.5,(m.fol||0)/2e6);const gap=r/Math.max(1,t.cut);p*=gap<1.5?1.4:gap<3?1:gap<6?.6:.3;if(meAge()<=21)p*=1.2;return Math.min(.85,p)}
function v5WcAsked(e,w){const A=S.me.wcAsk||{};return A[w+'|'+e.key]}
function v5AskWC(w,key){const e=weekEvents(w).find(x=>x.key===key);if(!e)return;const m=S.me;m.wcAsk=m.wcAsk||{};const id=w+'|'+key;if(m.wcAsk[id])return;if(!m.wcY||m.wcY.y!==year())m.wcY={y:year(),n:0};if(m.wcY.n>=8){TOAST='Você já fez 8 pedidos de convite nesta temporada.';render();return}m.wcY.n++;const p=v5WcOdds(e),ok=R()<p;m.wcAsk[id]=ok?'sim':'nao';
 if(ok){news(`Convite aceito: a organização do ${e.name} te deu um wild card para a chave principal.`);TOAST=`Convite garantido no ${e.name}!`}else{news(`A organização do ${e.name} negou o seu pedido de convite.`);TOAST=`Convite negado no ${e.name}`}
 for(const k of Object.keys(m.wcAsk))if(+k.split('|')[0]<S.w-60)delete m.wcAsk[k];save();render()}
// ranking protegido
function v5ProtTick(){const m=S.me;if(!m||S.ended)return;if(m.injury>0){m.injW=(m.injW||0)+1;if(m.injW===1)m.prR=myRank('pro')||null}else if(m.injW){if(m.injW>=26&&m.prR){m.prot={r:m.prR,n:9};news(`Ranking protegido: depois de ${m.injW} semanas fora, você pode usar o ranking #${m.prR} para entrar em 9 torneios.`)}m.injW=0;m.prR=null}}
{const _es=entryStatus;entryStatus=function(ev){const s=_es(ev);try{const m=S.me,t=TIERS[ev.tier];if(!s.main&&t.cat==='pro'&&isPro()&&!['OLY','EXH','FIN'].includes(ev.tier)){const w=ev.w!=null?ev.w:S.w;
  if(m.wcAsk&&m.wcAsk[w+'|'+ev.key]==='sim')return{ok:1,main:1,wc:2,txt:'Wild card'};
  if(m.prot&&m.prot.n>0){const r=m.prot.r;if(r<=t.cut)return{ok:1,main:1,prot:1,txt:'Ranking protegido'};if(t.q&&r<=t.q&&!s.ok)return{ok:1,main:0,prot:1,txt:'Qualifying (protegido)'}}}}catch(e){}return s}}
{const _we=weekEvents;weekEvents=function(w){const L=_we(w);for(const e of L)if(e.w==null)e.w=w;return L}}
{const _en=enter;enter=function(key){const e=weekEvents(S.w).find(x=>x.key===key),st=e?entryStatus(e):null;_en(key);if(S.tour&&e){S._pw=S.w;if(st&&st.prot&&S.me.prot){S.me.prot.n--;if(S.me.prot.n<=0)S.me.prot=null}}}}
{const _ew=endWeek;endWeek=function(){if(S.modals.length)return _ew();try{const m=S.me;if(m&&!S.ended&&isPro()&&v5Commit()&&S._pw!==S.w&&!(m.injury>0)&&S.busy!==S.w){const md=weekEvents(S.w).find(e=>v5Mand(e)&&e.tier!=='GS');if(md){m.money-=V5FINE;news(`Multa de ${money(V5FINE)}: ${G('jogadores','jogadoras')} do top 30 são obrigados a jogar o ${md.name}.`)}}}catch(e){}try{v5ProtTick()}catch(e){}return _ew()}}
// pauta: avisos
{const _vp=v5Props;v5Props=function(){const R0=_vp();try{const m=S.me,dr=v5Drop(S.w);const md=isPro()&&v5Commit()?weekEvents(S.w).find(e=>v5Mand(e)&&e.tier!=='GS'):null;
 R0.L.forEach(p=>{if(/^enter\(/.test(p.a)){if(dr)p.tags.push(`<span class="v5t b">${dr} pts do ano passado saem nesta semana</span>`);const k=/enter\('([^']+)'\)/.exec(p.a);const e=k&&weekEvents(S.w).find(x=>x.key===k[1]);if(e&&v5Mand(e)&&v5Commit())p.tags.push('<span class="v5t m">obrigatório no top 30</span>')}
  else if(md&&/^(train|rest)\(/.test(p.a)&&!(m.injury>0))p.tags.push(`<span class="v5t b">multa de ${money(V5FINE)} por faltar ao ${esc(md.name)}</span>`)});
 // pedir convite: torneio da semana em que você só entraria no quali (ou nem isso)
 if(isPro()&&!S.tour&&S.busy!==S.w&&!(m.wcY&&m.wcY.y===year()&&m.wcY.n>=8)){const c=weekEvents(S.w).map(e=>({e,st:entryStatus(e),p:v5WcOdds(e)})).filter(x=>!x.st.main&&x.p>0&&!v5WcAsked(x.e,S.w)&&TIERS[x.e.tier].cat==='pro').sort((a,b)=>TIERS[b.e.tier].w*b.p-TIERS[a.e.tier].w*a.p)[0];
  if(c){const w=v5Who('emp');R0.L.push({w,t:`Pedir convite para o ${c.e.name}`,q:c.e.iso===COUNTRIES[m.c][0]?'Torneio em casa. Eles gostam de dar vaga para a prata da casa.':'Não custa pedir. No máximo eles dizem não.',tags:[`<span class="v5t n">chance de ${Math.round(c.p*100)}%</span>`,`<span class="v5t g">chave principal se aceitarem</span>`],a:`v5AskWC(${S.w},'${c.e.key}')`,cta:'Pedir'})}}}catch(e){console.error(e)}return R0}}
// temporada: pontos a defender, convites e ranking protegido
{const _vs=v5Season;v5Season=function(){let s=_vs();try{const m=S.me,D=v5Drops(10),tot=D.reduce((a,b)=>a+b[1],0);
 const up=[];for(let i=1;i<=6;i++){const w=S.w+i;weekEvents(w).forEach(e=>{if(TIERS[e.tier].cat!=='pro'||!isPro())return;const st=entryStatus(e);const asked=v5WcAsked(e,w);if(!st.main&&v5WcOdds(e)>=.08||asked)up.push({w,e,st,asked})})}
 let html='';
 if(D.length)html+=`<div class="v5sec"><span class="v5k">Pontos a defender · ${tot} nas próximas 10 semanas</span></div><div class="card v5feed" style="padding:4px 16px">${D.map(([w,v])=>`<div><span class="gr D">−</span><span>${v} pts saem na semana ${w%52+1}<small>${wkDate(w)} · resultado do ano passado</small></span></div>`).join('')}</div>`;
 if(m.prot)html+=`<div class="v5next" style="margin-top:12px">Ranking protegido #${m.prot.r} · vale para mais ${m.prot.n} torneio${m.prot.n>1?'s':''}</div>`;
 if(up.length)html+=`<div class="v5sec"><span class="v5k">Pedir convite (wild card)</span></div>${up.slice(0,5).map(x=>`<div class="v5srow"><span class="v5sb2" style="background:${(SURFC[x.e.surf]||['#888'])[0]}"></span><span class="v5sn"><b>${esc(x.e.name)}</b><small>${wkDate(x.w)} · ${esc(tl(x.e.tier))} · ${x.asked==='sim'?'convite aceito':x.asked==='nao'?'pedido negado':`chance ${Math.round(v5WcOdds(x.e)*100)}%`}</small></span>${x.asked?'':`<button class="sec" style="grid-column:2;justify-self:start;min-height:36px;padding:6px 12px;font-size:13px" onclick="v5AskWC(${x.w},'${x.e.key}')">Pedir convite</button>`}</div>`).join('')}`;
 s=s.replace(/<\/section>$/,html+'</section>')}catch(e){console.error(e)}return s}}
// motor: o piso chega até a partida
{const _ef=eff;eff=function(id,surf,t,o){const r=_ef(id,surf,t,o);if(r)r.surf=surf;return r}}
