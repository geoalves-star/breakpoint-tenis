// =============== v5.8: realismo — Copa Davis/BJK no formato atual, ranking de corte 3 semanas antes, special exempt ===============
// ---------- Copa Davis e BJK Cup (formato 2026) ----------
// Davis: qualificatória 1 (fev), qualificatória 2 (set), Final 8 (nov). BJK: qualificatória (abr), Finais com 8 (set).
SPW=()=>CIRC()==='WTA'?{q:14,f:38,lv:-1}:{q:5,q2:37,f:47,lv:38};
// confrontos das qualificatórias: melhor de 5 (2 simples, duplas, 2 simples) em casa ou fora
function v5Tie5(ca,cb,log){const A=teamOf(ca),B=teamOf(cb);for(const T of[A,B]){const i=T.indexOf('me');if(i>1){T.splice(i,1);T.splice(1,0,'me')}}if(A.length<3)return false;if(B.length<3)return true;let wa=0,wb=0;const H=COUNTRIES[ca][0];
 const pl=(a,b)=>{const w=matchUp(a,b,log,H);w?wa++:wb++};pl(A[0],B[1]);pl(A[1],B[0]);
 if(wa<3&&wb<3){const dr=X=>(tRat(X[1])+tRat(X[2]))/2,w=R()<1/(1+Math.pow(10,-(dr(A)-dr(B))/12));w?wa++:wb++;if(log)log.push(`👥 Duplas: ${w?'vitória':'derrota'} de ${flag(ca)} ${COUNTRIES[ca][1]}`)}
 if(wa<3&&wb<3)pl(A[0],B[0]);if(wa<3&&wb<3)pl(A[1],B[1]);
 if(log)log.push(`<b>Placar do confronto: ${COUNTRIES[ca][1]} ${wa} x ${wb} ${COUNTRIES[cb][1]}</b>`);return wa>wb}
{const _st=specialToday;specialToday=function(){const r=_st();try{const wk=S.w%52,sp=SPW();if(!r&&sp.q2!=null&&wk===sp.q2&&S.dv&&S.dv.q&&!S.dv.done[wk]&&canPlayTeam())return'q2';if(r==='f'&&sp.q2!=null&&!S.dv.q2)return null}catch(e){}return r}}
{const _ps=playSpecial;playSpecial=function(kind,accept){const m=S.me,wk=S.w%52;
 if((kind==='q'||kind==='q2')&&accept){S.dv.done[wk]=1;const others=teamCountries().filter(c=>c!==m.c);const opp=pick(others),home=R()<.5,log=[];const w=home?v5Tie5(m.c,opp,log):!v5Tie5(opp,m.c,log);
  if(kind==='q')S.dv.q=w;else S.dv.q2=w;const last=kind==='q2'||CIRC()==='WTA';const title=`${TEAMN()} · ${kind==='q'?(CIRC()==='WTA'?'Qualificatória':'Qualificatória 1'):'Qualificatória 2'}`;
  if(w){m.app=clamp((m.app??50)+3,0,100);m.fol=Math.round(m.fol*1.03);m.money+=kind==='q2'?80000:50000}
  const html=`<p class="small mut" style="margin:0 0 6px">${home?'Em casa':'Fora de casa'} · melhor de 5 jogos em dois dias</p><p><b>${flag(m.c)} ${COUNTRIES[m.c][1]} x ${flag(opp)} ${COUNTRIES[opp][1]}</b></p>${log.map(x=>`<div class="small">${x}</div>`).join('')}<p class="${w?'win':'loss'}" style="font-weight:700">${w?(last?`Vitória! ${COUNTRIES[m.c][1]} está ${CIRC()==='WTA'?'nas Finais':'no Final 8'}.`:'Vitória! Próxima fase: Qualificatória 2, em setembro.'):'Derrota. Eliminados nesta temporada.'}</p>`;
  news(`🇺🇳 ${TEAMN()}: ${COUNTRIES[m.c][1]} ${w?'venceu':'perdeu para'} ${COUNTRIES[opp][1]} na ${kind==='q'?'qualificatória':'qualificatória 2'}.`);
  S.modals.push({k:title,e:'🇺🇳',ti:title,q:'',html,o:[{l:'Continuar',t:'',fx:{}}]});save();render();return}
 return _ps(kind,accept)}}
{const _sc=specialCard;specialCard=function(){let s='';try{const k=specialToday();if(k!=='q2')s=_sc();if(k==='q2'&&!S.tour&&S.busy!==S.w){const m=S.me;s=`<div class="card" style="border-color:var(--gold)"><div class="mk" style="color:var(--gold)">🇺🇳 Convocação: ${TEAMN()} · Qualificatória 2</div><p class="small" style="margin:6px 0 6px">${COUNTRIES[m.c][1]} venceu em fevereiro e agora joga por uma vaga no Final 8 de novembro. Confronto em melhor de 5 jogos.</p>${lineupHtml(m.c)+dvDblToggle()}<div class="g2" style="margin-top:10px"><button onclick="playSpecial('q2',true)">Jogar</button><button class="sec" onclick="playSpecial('q2',false)">Recusar</button></div></div>`}
 else if(k==='q')s=s.replace('na qualificatória. Não vale pontos de ranking',`na qualificatória (${CIRC()==='WTA'?'abril, vale vaga nas Finais':'fevereiro, primeira de duas fases até o Final 8'}). Confronto em casa ou fora, melhor de 5 jogos. Não vale pontos de ranking`)}catch(e){}return s}}
// ---------- inscrição: vale o ranking de 3 semanas antes; special exempt ----------
{const _ew=endWeek;endWeek=function(){try{if(S&&S.me){const m=S.me;m.rkw=m.rkw||{};m.rkw[S.w]=myRank('pro')||null;for(const r of S.results.slice(0,3))if(r.w0==null&&r.y===year())r.w0=S.w;for(const k in m.rkw)if(+k<S.w-8)delete m.rkw[k]}}catch(e){}return _ew()}}
const V5DEAD=3;
function v5DeadRank(){const m=S.me;const w=S.w-V5DEAD;return m.rkw&&m.rkw[w]!==undefined?m.rkw[w]:undefined}
{const _es=entryStatus;entryStatus=function(ev){const st=_es(ev);try{const t=TIERS[ev.tier];if(!t||t.cat!=='pro'||!isPro()||['OLY','EXH','FIN','TEAM'].includes(ev.tier)||(ev.w!=null&&ev.w!==S.w))return st;
 // ranking de corte: o da data de inscrição (3 semanas antes)
 const dr=v5DeadRank(),now=myRank('pro');if(dr!==undefined&&now&&st.ok&&st.main&&st.txt==='Inscrever'&&(dr==null||dr>t.cut)&&now<=t.cut){return{...st,main:0,txt:'Qualifying',note:`Na data de inscrição (3 semanas atrás) você era ${dr?'#'+dr:'sem ranking'}: entra pelo quali.`}}
 if(dr!==undefined&&now&&dr&&dr<=t.cut&&now>t.cut&&st.ok&&!st.main){return{...st,ok:1,main:1,txt:'Inscrever',note:`Você entra direto pelo ranking da data de inscrição (#${dr}).`}}
 // special exempt: semifinal ou melhor na semana anterior e só entraria no quali
 if(st.ok&&!st.main&&ev.tier!=='GS'){const last=S.results[0];if(last&&last.w0===S.w-1&&!(S.busy===S.w)&&['Campeão','Final','Semifinal'].includes(last.r)&&TIERS[last.tier]&&TIERS[last.tier].cat==='pro')return{...st,main:1,se:1,txt:'Special exempt',note:'Special exempt: você foi longe na semana passada e ganha vaga direto na chave.'}}}catch(e){}return st}}

// aviso das regras de inscrição na aba Torneios
{const _tw=tourWeekView;tourWeekView=function(){let h=_tw();try{const N=weekEvents(S.w).map(e=>({e,st:entryStatus(e)})).filter(x=>x.st.note);if(N.length){const box=`<div class="card" style="border-left:3px solid var(--gold);padding:10px 14px"><div class="small"><b>📋 Inscrições desta semana</b></div>${N.map(x=>`<div class="xs" style="margin-top:4px"><b>${esc(x.e.name)}:</b> ${x.st.note}</div>`).join('')}<div class="xs mut" style="margin-top:6px">Como no circuito real, a lista de entrada usa o ranking da data de inscrição, 3 semanas antes do torneio.</div></div>`;const i=h.indexOf('<div class="ev');h=i>=0?h.slice(0,i)+box+h.slice(i):h+box}}catch(e){}return h}}
// ---------- velocidade das quadras pelo Court Pace Index (CPI) medido ----------
// CPI medido nos Masters 1000 (2026 quando divulgado; senão 2025). Quanto maior, mais rápida.
const V5CPI={'Indian Wells':[39.3,2026],'Miami':[39.2,2026],'Montreal':[35.4,2026],'Toronto':[44.6,2025],'Cincinnati':[38.1,2026],'Xangai':[43.3,2026],'Monte Carlo':[29,2025],'Roma':[28.9,2025],'Madri':[26.1,2025]};
const v5CpiPace=c=>Math.max(-.012,Math.min(.012,(c-37)*.0012));
{const _pf=v5PaceOf;v5PaceOf=function(ev){if(!ev)return 0;if(/Paris Masters/i.test(ev.name||''))return .012;const c=V5CPI[ev.city];if(c){let p=v5CpiPace(c[0]);if(ev.city==='Madri')p+=.014;return p}return _pf(ev)}}
{const _ct=v5CondTags;v5CondTags=function(ev){let h=_ct(ev);try{const c=ev&&V5CPI[ev.city];if(/Paris Masters/i.test(ev&&ev.name||''))h=h.replace(/(<span class="v5t n">)([^<]*)(<\/span>)/,'$1$2 · a mais rápida dos Masters em 2026$3');else if(c)h=h.replace(/(<span class="v5t n">)([^<]*)(<\/span>)/,`$1$2 · CPI ${String(c[0]).replace('.',',')} (${c[1]})${ev.city==='Madri'?' + altitude':''}$3`)}catch(e){}return h}}
// glossário
try{V5GLO.push(['Regras do circuito',[
 ['Data de inscrição','A lista de entrada de cada torneio usa o seu ranking de 3 semanas antes. Subir no ranking na véspera não garante vaga direta, e cair na véspera não tira a vaga.'],
 ['Special exempt','Se você chegou à semifinal ou mais longe na semana anterior e só entraria pelo qualifying, ganha vaga direta na chave principal. Não vale para Grand Slams.'],
 ['Copa Davis','Qualificatória 1 em fevereiro e Qualificatória 2 em setembro, em casa ou fora, melhor de 5 jogos. Quem vence as duas vai ao Final 8 de novembro.'],
 ['BJK Cup','Qualificatória em abril, em casa ou fora. As vencedoras vão às Finais de setembro, com 8 seleções.'],
 ['Velocidade da quadra (CPI)','O Court Pace Index mede a velocidade do piso: quanto maior, mais rápida. Quadra rápida favorece saque e aces; lenta favorece trocas longas.']]])}catch(e){}
