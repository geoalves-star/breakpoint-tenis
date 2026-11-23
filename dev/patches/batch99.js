// =============== v6.5 · prêmios do técnico: prêmios da temporada, conquistas e sala de troféus ===============
const BCAW={
 cy:{i:'🏅',n:'Técnico do Ano',d:'O melhor trabalho da temporada no circuito.',$:50000,p:2},
 form:{i:'🌱',n:'Formador do Ano',d:'O melhor trabalho com juvenis.',$:20000,p:1},
 evo:{i:'📈',n:'Trabalho do Ano',d:'A maior evolução de um atleta na temporada.',$:15000,p:1},
 rev:{i:'⭐',n:'Técnico Revelação',d:'O destaque entre os técnicos novos.',$:10000,p:1}};
const BCMIL=[
 ['t1','🥇','Primeiro título','Um atleta seu ganha um torneio.',5000,1],
 ['jgs','🧒','Campeão de Slam juvenil','Um atleta seu ganha um Grand Slam juvenil.',10000,1],
 ['top100','💯','Top 100','Um atleta seu entra no top 100.',8000,1],
 ['top10','🔟','Top 10','Um atleta seu entra no top 10.',25000,1],
 ['gs','🏆','Campeão de Grand Slam','Um atleta seu ganha um Grand Slam.',60000,2],
 ['n1','👑','Número 1 do mundo','Um atleta seu chega ao topo do ranking.',100000,2],
 ['w100','🎾','100 vitórias','Seus atletas somam 100 vitórias com você.',10000,1],
 ['team4','👥','Equipe completa','Você treina 4 atletas ao mesmo tempo.',0,1],
 ['acad3','🏟️','Alto rendimento','Você constrói a academia de alto rendimento.',0,1],
 ['form3','🎓','Fábrica de talentos','3 atletas formados por você chegam ao top 100.',30000,2]];
function bcRepB(){try{const c=S.cm;if(!c||!c.tro)return 0;const n=c.tro.filter(t=>t.k==='cy').length,big=c.tro.filter(t=>BCAW[t.k]).length;return(n>=1?1:0)+(big>=4?1:0)}catch(e){return 0}}
// entrega o prêmio: dinheiro, pontos, notícia, post e cerimônia
function bcGive(k,y,why,quiet){const c=S.cm;c.tro=c.tro||[];const A=BCAW[k],M=BCMIL.find(x=>x[0]===k);const n=A?A.n:M[2],ic=A?A.i:M[1],$=A?A.$:M[4],pt=A?A.p:M[5];
 c.tro.push({k,y:y||year(),w:S.w,why:why||''});c.wallet+=$;c.pts=(c.pts||0)+pt;c.trust=clamp(c.trust+(A?4:2),0,100);
 news(`${ic} ${n}${A?' '+(y||year()):''}: ${c.n}${$?` recebe ${money($)}`:''} e ganha ${pt} ponto${pt>1?'s':''} de habilidade.`);try{hl(`${ic} ${n}${A?' '+(y||year()):''} (técnico)`)}catch(e){}
 try{addPost({a:MEDIA[0][0],h:MEDIA[0][1],t:A?`${ic} ${n} ${y||year()}: ${c.n}! ${why||''}`:`${ic} Marco na carreira de ${c.n}: ${n.toLowerCase()}.`,k:'md'})}catch(e){}
 if(!quiet)S.modals.push({k:'Prêmio',e:ic,ti:A?`${n} ${y||year()}`:`Conquista: ${n}`,q:A?`${A.d} ${why||''} Você recebe ${$?money($)+' e ':''}${pt} ponto${pt>1?'s':''} de habilidade.`:`${M[3]} ${$?`Bônus de ${money($)} e `:''}${pt} ponto${pt>1?'s':''} de habilidade.`,o:[{l:A?'Subir ao palco':'Comemorar',t:'O troféu vai para a sua sala de troféus',fx:{}}]})}
const bcHas=k=>!!((S.cm&&S.cm.tro)||[]).find(t=>t.k===k);
// pontuação da temporada para o Técnico do Ano
function bcCoachScore(){const c=S.cm,m=S.me,y=year(),s0=S.season||{},rp=myRank('pro'),rj=meAge()<=18?myRank('jr'):null;let s=0;
 const tier=r=>!r?0:r<=1?10:r<=5?8:r<=10?6.5:r<=20?5:r<=50?3.5:r<=100?2.5:r<=200?1.2:0;s+=tier(rp);if(!rp&&rj)s+=rj<=1?4:rj<=10?3:rj<=50?1.5:0;
 const tit=S.results.filter(r=>r.y===y&&r.r==='Campeão');s+=tit.filter(r=>r.tier==='GS').length*4+Math.min(4,tit.filter(r=>r.tier!=='GS').length*.8);
 if(s0.rp&&rp&&rp<s0.rp)s+=Math.min(3,(s0.rp-rp)/s0.rp*3);if(s0.rp&&s0.rp>100&&rp&&rp<=100)s+=1;
 for(const x of cmPups()){const p=IDX.get(x.id);if(!p)continue;s+=.5*tier(RK.pro[p.id])}return s}
function bcSeasonCoach(){const c=S.cm;if(!c||!c.v2)return'';const y=year();c.sy=c.sy||{};if(c.sy[y])return c.sy[y].h||'';const m=S.me,s0=S.season||{},rp=myRank('pro'),rj=meAge()<=18?myRank('jr'):null,won=[];
 // Técnico do Ano: contra o técnico do nº 1 e o da maior evolução do circuito
 const me=bcCoachScore(),ai=Math.max(10+R()*2.5,6+R()*5);const co1=(()=>{const p=IDX.get(ORD.pro[0]);const k=p&&p.co&&COI.get(p.co);return k&&!k.club?k:null})();
 if(me>=ai){won.push(['cy',`${m.name} fechou o ano ${rp?'como #'+rp+' do mundo':'em alta'}.`])}
 // Formador do Ano
 const pj=cmPups().map(x=>RK.jr[x.id]).filter(Boolean).sort((a,b)=>a-b)[0];const jgs=S.results.some(r=>r.y===y&&r.r==='Campeão'&&r.tier==='JGS');
 if(jgs||(rj&&rj<=5)||(rj&&rj<=10&&R()<.6)||(pj&&pj<=10&&R()<.45))won.push(['form',jgs?`${m.name} foi campeão de Slam juvenil.`:`Seu trabalho de base deu resultado.`]);
 // Trabalho do Ano: grande salto no ranking
 if(s0.rp&&rp&&rp<=150&&rp<=s0.rp*.45&&R()<.75)won.push(['evo',`${m.name} saiu do #${s0.rp} para o #${rp}.`]);
 // Revelação: nas duas primeiras temporadas, uma vez só
 const yrs=Math.floor((S.w-(c.start??c.since??0))/52);if(!bcHas('rev')&&yrs<=1&&((rp&&rp<=150)||(rj&&rj<=20)||S.results.some(r=>r.y===y&&r.r==='Campeão')))won.push(['rev','Primeira temporada de destaque.']);
 won.forEach(([k,why])=>bcGive(k,y,why));
 const lines=Object.keys(BCAW).map(k=>{const w=won.find(x=>x[0]===k);return `<div class="small ${w?'win':''}">${BCAW[k].i} ${BCAW[k].n}: ${w?'<b>você!</b>':k==='cy'&&co1?`${flag(co1.c)} ${esc(co1.n)}`:'outro técnico'}</div>`}).join('');
 const h=`<div class="sec-t" style="margin-top:10px">Prêmios de técnico</div>${lines}`;c.sy[y]={h,won:won.map(x=>x[0])};return h}
// o prêmio antigo (sorteado) fica só para carreiras de treinador antigas
{const _sa=seasonAwards;seasonAwards=function(){let h=_sa();try{if(bcV2())h+=bcSeasonCoach()}catch(e){console.error(e)}return h}}
// conquistas: confere toda semana
function bcMsCheck(){const c=S.cm;if(!c||!c.v2||S.ended)return;const m=S.me;c.tro=c.tro||[];
 const ranks=[myRank('pro')].concat(cmPups().map(x=>RK.pro[x.id])).filter(Boolean),best=ranks.length?Math.min(...ranks):null;
 const tt=m.st.titles.concat(m.st.jrTitles);c.cw=(c.cw||0)+Math.max(0,m.st.w-(c.lw9??m.st.w));c.lw9=m.st.w;
 const formed=(c.formed||[]).filter(f=>f.hi&&f.hi<=100).length+cmPups().filter(x=>x.hi&&x.hi<=100).length+((m.st.hiPro||999)<=100?1:0);
 const T={t1:tt.length>0,jgs:m.st.jrTitles.some(t=>t.tier==='JGS'),top100:best&&best<=100,top10:best&&best<=10,gs:m.st.titles.some(t=>t.tier==='GS'),n1:best===1,w100:c.cw>=100,team4:cmPups().length>=3,acad3:(c.acad||0)>=3,form3:formed>=3};
 for(const [k] of BCMIL)if(T[k]&&!bcHas(k))bcGive(k,year())}
{const _ew=endWeek;endWeek=function(){const r=_ew.apply(this,arguments);try{if(bcV2())bcMsCheck()}catch(e){console.error(e)}return r}}
// sala de troféus
function bcTroCard(){const c=S.cm,T=c.tro||[];const aw=T.filter(t=>BCAW[t.k]),ms=new Set(T.filter(t=>!BCAW[t.k]).map(t=>t.k));
 const cnt=k=>aw.filter(t=>t.k===k).length;
 return `<div class="card bctro"><div class="bctmt"><span class="bckick">Sala de troféus</span><span class="xs mut">${T.length} troféu${T.length===1?'':'s'} · reputação ${'★'.repeat(cmRep())}</span></div>
 <div class="bctrg">${Object.entries(BCAW).map(([k,a])=>`<div class="bctri ${cnt(k)?'on':''}"><span>${a.i}</span><b>${a.n}</b><em>${cnt(k)?`${cnt(k)}× · ${aw.filter(t=>t.k===k).map(t=>t.y).slice(-3).join(', ')}`:'ainda não'}</em></div>`).join('')}</div>
 <div class="sec-t" style="margin-top:12px">Conquistas · ${ms.size}/${BCMIL.length}</div>
 <div class="bcmsg">${BCMIL.map(([k,i,n,d,$,p])=>`<div class="bcmsi ${ms.has(k)?'on':''}" title="${esc(d)}"><span>${ms.has(k)?i:'🔒'}</span><div><b>${n}</b><em>${esc(d)}${!ms.has(k)?` · ${$?money($)+' + ':''}${p} pt`:''}</em></div></div>`).join('')}</div>
 <p class="xs mut" style="margin:10px 0 0">Os prêmios de técnico saem no fim de cada temporada. Cada troféu dá dinheiro e pontos de habilidade. O Técnico do Ano também aumenta a sua reputação.</p></div>`}
{const _tp=bcTeamPanel;bcTeamPanel=function(){let h=_tp();try{const T=S.cm.tro||[];if(T.length){const last=T[T.length-1],A=BCAW[last.k],M=BCMIL.find(x=>x[0]===last.k);
 const strip=`<button class="bctrs" onclick="PROFTAB='career';go('me')"><span>🏆 ${T.length} troféu${T.length===1?'':'s'}</span><em>Último: ${A?A.i+' '+A.n+' '+last.y:M[1]+' '+M[2]}</em><i>›</i></button>`;h=h.replace(/<\/div>$/,strip+'</div>')}}catch(e){}return h}}
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(bcV2()&&!MENU&&TAB==='me'&&!document.querySelector('.bctro')){const ct=document.querySelector('.bcsoc')||document.querySelector('#app .cnt > *');if(ct)ct.insertAdjacentHTML('afterend',bcTroCard())}}catch(e){console.error(e)}return v}}
