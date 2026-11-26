// ===== v7.6: dinheiro mais real, regras de entrada rígidas e lesões dos outros jogadores =====
// ---------- 1) dinheiro ----------
// federação: ajuda quem está subindo; quem está no top 50 já se banca
fedSupport=function(){const m=S.me;let s=0;const r=myRank('pro'),j=meAge()<=18?myRank('jr'):null,a=meAge();
 if(isPro()&&r){s+=r<=50?0:r<=100?120:r<=300?220:r<=600?110:0;if(a<=21&&r<=600)s=Math.round(s*1.5)}
 if(j&&j<=100)s+=Math.round(900/Math.sqrt(j));if(a<18)s+=150;return Math.round(s*(.6+.8*((m&&m.fed)??50)/100))};
// patrocínios: as estrelas valem muito mais
bcSpRankF=function(){const r=myRank('pro')||9999;return r<=3?10:r<=10?6:r<=20?3.2:r<=50?1.8:r<=100?1.3:r<=250?1:.6};
// renda mínima do circuito nos valores reais (top 100: 300 mil · 101-175: 150 mil · 176-250: 75 mil)
v5BaseYear=function(){const m=S.me;if(!m||S.ended||!isPro())return;const r=myRank('pro'),earned=(m.st.prize||0)-(m.v5py??(m.st.prize||0)),fl=!r?0:r<=100?300000:r<=175?150000:r<=250?75000:0;m.v5py=m.st.prize||0;
 if(fl&&earned<fl){const pay=Math.round(fl-earned);m.money+=pay;bcLedAdd('Renda mínima do circuito',pay);news(`Renda mínima do circuito: você terminou o ano em #${r} e ganhou ${money(earned)} em prêmios. O circuito completou ${money(pay)} até o piso de ${money(fl)}.`)}};
// custo de estrada: alimentação, transporte local, lavanderia e cordas em cada torneio
function bcRoadCost(ev){const t=TIERS[ev.tier];if(!t||['FIN','EXH','OLY','NGF'].includes(ev.tier))return 0;const home=ev.iso===COUNTRIES[S.me.c][0];let c=t.cat==='jr'?220:ev.tier==='GS'?900:['M1000','A500'].includes(ev.tier)?700:['M15','M25'].includes(ev.tier)?380:520;if(home)c=Math.round(c*.6);if(S.me.coachId)c=Math.round(c*1.5);return c}
{const _en=enter;enter=function(key){const was=!!S.tour;const r=_en.apply(this,arguments);try{if(!was&&S.tour){const ev=curEv(),c=bcRoadCost(ev);if(c){S.me.money-=c;bcLedAdd('Alimentação e transporte local',-c);S.tour.log&&S.tour.log.push({c:'mut',t:`🍽️ Alimentação, transporte local e cordas na semana: ${money(c)}`})}}}catch(e){}return r}}
// ---------- 2) entrada rígida pelo ranking ----------
const BCWCMAX={GS:250,M1000:200,A500:300,A250:400,C175:600,C125:600,C100:800,C75:900,C50:900};
{const _es=entryStatus;entryStatus=function(ev){const s=_es(ev);try{const t=TIERS[ev.tier];if(!s||!t||t.cat!=='pro')return s;if((s.wc||s.txt==='Wild card'||s.txt==='Usar convite')&&!s.prot){const cap=BCWCMAX[ev.tier];const r=myRank('pro')||9999;
  if(cap&&r>cap){if(t.q&&r<=t.q)return{ok:1,main:0,txt:'Qualifying',note:`Convite só vale com ranking até #${cap}.`};return{ok:0,txt:`Convite exige ranking até #${cap}`}}}}catch(e){}return s}}
{const _wo=v5WcOdds;v5WcOdds=function(e){const cap=BCWCMAX[e.tier],r=myRank('pro')||9999;if(cap&&r>cap)return 0;return _wo.apply(this,arguments)}}
// ---------- 3) lesões dos outros jogadores ----------
const BCINJT=['no tornozelo','no punho','no ombro','na lombar','no joelho','no abdômen','na coxa','no cotovelo','no pé','na panturrilha'];
function bcInjDur(){const x=R();return x<.6?1+Math.floor(R()*3):x<.88?4+Math.floor(R()*5):x<.97?10+Math.floor(R()*11):26+Math.floor(R()*15)}
function bcInjWeek(played){const cat='pro';
 for(const p of S.pro.concat(S.jr)){if(p.inj>0){p.inj--;if(p.inj===0){const r=RK.pro[p.id];if(r&&r<=30&&S.pro.includes(p))news(`💪 ${flag(p.c)} ${p.n} (#${r}) está de volta depois de ${p.injN} semanas fora.`);p.injT=null}continue}
  const a=ageOf(p),pl=played.has(p.id),jr=!S.pro.includes(p);let h=(pl?.02:.005)*(1+Math.max(0,a-27)*.08)*(1.3-(p.fit??.5)*.6);if(jr)h*=.6;
  if(R()<h){const d=bcInjDur();p.inj=d;p.injN=d;p.injT=BCINJT[Math.floor(R()*BCINJT.length)];if(d>=10)p.r-=d/20;(p.injH=p.injH||[]).push([S.w,d,p.injT]);if(p.injH.length>6)p.injH.shift();
   const r=RK.pro[p.id];if(!jr&&r&&(r<=10||(r<=40&&d>=4)))news(`🩹 ${flag(p.c)} ${p.n} (#${r}) sofreu uma lesão ${p.injT} e deve ficar cerca de ${d} semana${d>1?'s':''} fora.`)}}}
{const _ew=endWeek;endWeek=function(){if(S.modals.length)return _ew.apply(this,arguments);const w0=S.w,pl=new Set();try{for(const k in S.draws)for(const id of S.draws[k]||[])pl.add(id)}catch(e){}
 const r=_ew.apply(this,arguments);try{if(S.w!==w0)bcInjWeek(pl)}catch(e){console.error(e)}return r}}
// lesionado não entra em chave (nem nas Finals, Olimpíadas ou exibições)
{const _al=allocWeek;allocWeek=function(){const hid=[];const keep={pro:ORD.pro,jr:ORD.jr};try{for(const c of['pro','jr'])ORD[c]=ORD[c].filter(id=>id==='me'||!(IDX.get(id)&&IDX.get(id).inj>0))}catch(e){}
 try{return _al.apply(this,arguments)}finally{ORD.pro=keep.pro;ORD.jr=keep.jr}}}
function bcInjList(cat,max){const out=[];for(const id of ORD[cat]){if(id==='me')continue;const p=IDX.get(id);if(p&&p.inj>0)out.push(p);if(out.length>=max)break}return out}
function bcInjCard(cat){const L=bcInjList(cat,200).filter(p=>(RK[cat][p.id]||9999)<=(cat==='pro'?100:60)).slice(0,8);if(!L.length)return'';
 return `<div class="card bcinj"><h3>🩹 Fora por lesão</h3>${L.map(p=>`<div class="bcinjr" onclick="openP(${p.id})"><span class="xs mut">#${RK[cat][p.id]}</span><b>${flag(p.c)} ${esc(p.n)}</b><span class="xs mut">lesão ${esc(p.injT||'')} · volta em ~${p.inj} sem.</span></div>`).join('')}</div>`}
{const _rv=rankView;rankView=function(){let s=_rv.apply(this,arguments);try{if(typeof RKTAB!=='undefined'&&['pro','jr'].includes(RKTAB)){const c=bcInjCard(RKTAB);if(c)s+=c}}catch(e){console.error(e)}return s}}
{const _pc=pcardView;pcardView=function(){let s=_pc.apply(this,arguments);try{const p=IDX.get(PCARD);if(!p)return s;let h='';if(p.inj>0)h=`<div class="bcinjn">🩹 Lesionado (lesão ${esc(p.injT||'')}): deve voltar em cerca de ${p.inj} semana${p.inj>1?'s':''}.</div>`;
 const H=(p.injH||[]).slice(-3).reverse();if(H.length)h+=`<div class="xs mut" style="margin:4px 0 8px">Últimas lesões: ${H.map(([w,d,t])=>`${t.replace(/^n[oa] /,'')} (${d} sem., há ${Math.max(1,S.w-w)} sem.)`).join(' · ')}</div>`;
 if(h){const mk='<div class="v5pinfo">';const i=s.indexOf(mk);s=i>=0?s.slice(0,i)+h+s.slice(i):s+h}}catch(e){console.error(e)}return s}}
