// =============== v6.7 · técnico rival e torneio escolhido para cada aluno ===============
// ---------- torneios dos alunos ----------
function bcPupOk(p,e){const t=TIERS[e.tier];if(!t)return false;const jr=S.jr.includes(p);if(t.cat==='jr'){if(!jr||ageOf(p)>18)return false;const r=RK.jr[p.id]||999;return e.tier==='JGS'?r<=60:e.tier==='J500'?r<=120:true}
 if(jr||t.cat!=='pro'||['FIN','EXH','OLY','TEAM'].includes(e.tier))return false;const r=RK.pro[p.id]||9999;return ['GS','M1000'].includes(e.tier)?r<=104:['A500','A250'].includes(e.tier)?r<=160:e.tier.startsWith('C')?r<=450:true}
function bcPupEvs(p){return weekEvents(S.w).filter(e=>bcPupOk(p,e))}
function bcPupApply(){try{if(!bcV2()||!S.draws)return;const c=S.cm;for(const x of cmPups()){const p=IDX.get(x.id);if(!p)continue;const want=x.foc==='comp'&&x.ev&&x.ev.w===S.w?x.ev.key:null,out=x.foc==='treino'||x.foc==='desc';
  if(!want&&!out)continue;for(const k in S.draws){if(S.played&&S.played[k])continue;const d=S.draws[k];if(!Array.isArray(d))continue;const i=d.indexOf(p.id);if(i>=0&&k!==want)d.splice(i,1)}
  if(want&&S.draws[want]&&!S.draws[want].includes(p.id)&&!(S.played&&S.played[want])){const e=weekEvents(S.w).find(q=>q.key===want);const n=e?1<<(TIERS[e.tier].pts.length-1):64,d=S.draws[want];if(d.length>=n){const cat=TIERS[e.tier].cat;let wi=0,wv=-1;d.forEach((id,j)=>{const v=RK[cat][id]||1e6;if(v>wv){wv=v;wi=j}});d.splice(wi,1)}d.push(p.id)}}}catch(e){console.error(e)}}
{const _a=allocWeek;allocWeek=function(){const r=_a.apply(this,arguments);bcPupApply();return r}}
function bcPupEv(id,key){const x=(S.cm.pup||[]).find(q=>q.id===id);if(!x)return;x.ev=key?{w:S.w,key}:null;if(key)x.foc='comp';bcPupApply();save();render()}
{const _f=bcFoc;bcFoc=function(id,k){_f(id,k);try{bcPupApply();save()}catch(e){}}}
// ---------- técnico rival ----------
function bcRiv(){const c=S.cm;return c&&c.rv?COI.get(c.rv):null}
function bcRivA(){const c=S.cm;return(c&&c.rvA||[]).map(id=>IDX.get(id)).filter(Boolean)}
function bcRivInit(){try{const c=S.cm;if(!bcV2()||c.rv&&COI.get(c.rv))return;const m=S.me,ag=meAge();
 let rc=S.coaches.filter(x=>!x.club&&!x.fam&&x.q>=2&&x.q<=3&&!S.pro.some(p=>p.co===x.id&&(RK.pro[p.id]||999)<=50)).sort(()=>R()-.5)[0];if(!rc){rc=mkCoach(2);S.coaches.push(rc);COI.set(rc.id,rc)}
 const taken=new Set([S.rival,...cmPups().map(x=>x.id)]);const pool=(ag<=18?S.jr:S.pro).filter(p=>!taken.has(p.id)&&Math.abs(ageOf(p)-ag)<=1).sort((a,b)=>Math.abs(a.r-ovr())-Math.abs(b.r-ovr()));
 const a=pool[0];c.rv=rc.id;c.rvA=a?[a.id]:[];c.rvH={w:0,l:0};c.rvT=0;c._rvn=S.hist.length;if(a)a.co=rc.id;bcCoLv(rc);
 news(`⚔️ A imprensa já fala em duelo de técnicos: ${flag(rc.c)} ${rc.n} treina ${a?flag(a.c)+' '+a.n:'um talento da mesma geração'} e quer os mesmos troféus que você.`)}catch(e){console.error(e)}}
// mantém os atletas do rival com ele quando o circuito redistribui técnicos
{const _ac=assignCoaches;assignCoaches=function(){const r=_ac.apply(this,arguments);try{if(bcV2()&&S.cm.rv)bcRivA().forEach(p=>p.co=S.cm.rv)}catch(e){}return r}}
// confrontos, nível do rival e disputa de talentos
function bcRivWeek(){const c=S.cm;if(!bcV2())return;bcRivInit();const rc=bcRiv();if(!rc)return;const n=S.hist.length-(c._rvn??S.hist.length);c._rvn=S.hist.length;
 for(const h of S.hist.slice(0,Math.max(0,n))){const p=IDX.get(h.o);if(p&&(c.rvA||[]).includes(p.id)){c.rvH=c.rvH||{w:0,l:0};if(h.win){c.rvH.w++;c.trust=clamp(c.trust+1.5,0,100);c.txp=(c.txp||0)+4;news(`⚔️ Vitória no duelo de técnicos: seu atleta venceu ${p.n}, de ${rc.n}.`)}else{c.rvH.l++;news(`⚔️ ${rc.n} levou a melhor: ${p.n} venceu ${S.me.name}.`)}}}
 // disputa de talento uma vez por temporada
 if(S.w%52===20&&!S.tour&&!S.modals.length&&c.rvD!==year()){c.rvD=year();const taken=new Set([S.rival,...cmPups().map(x=>x.id),...(c.rvA||[])]);const p=S.jr.filter(q=>!taken.has(q.id)&&ageOf(q)>=14&&ageOf(q)<=15).sort((a,b)=>b.pot-a.pot)[Math.floor(R()*6)];
  if(p){const free=cmPups().length<bcSlots();if(!free){c.rvA.push(p.id);p.co=rc.id;news(`⚔️ ${rc.n} contratou ${flag(p.c)} ${p.n}, ${ageOf(p)} anos. Sem vaga na sua equipe, você nem entrou na disputa.`)}
   else S.modals.push({k:'Duelo de técnicos',e:'⚔️',ti:`Disputa por ${p.n}`,q:`${flag(p.c)} ${p.n}, ${ageOf(p)} anos (olheiros: ${scoutTxt(p.pot)}), está entre você e ${rc.n}. Uma proposta melhor pode decidir.`,o:[{l:'Fazer proposta',t:`US$ 5 mil da sua conta · chance maior com mais reputação e nível`,fx:{bcTal:[p.id,1]}},{l:`Deixar para ${rc.n.split(' ')[0]}`,t:'Sem custo, mas o rival fica mais forte',fx:{bcTal:[p.id,0]}}]})}}
 // fim de temporada: o rival sobe de nível quando os atletas dele evoluem
 if(S.w%52===0){const best=Math.min(...bcRivA().map(p=>RK.pro[p.id]||RK.jr[p.id]*3||999));if(best<=150&&rc.lv<10&&R()<.7){rc.lv++;news(`⚔️ ${rc.n}, seu rival, subiu para o nível ${rc.lv}.`)}}}
{const _ew=endWeek;endWeek=function(){const r=_ew.apply(this,arguments);try{bcRivWeek()}catch(e){console.error(e)}return r}}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcTal){const [id,bid]=fx.bcTal,c=S.cm,rc=bcRiv(),p=IDX.get(id);if(!p||!rc)return r;
 if(bid&&c.wallet>=5000){c.wallet-=5000;const pr=clamp(.5+(cmRep()-Math.ceil(rc.lv/2))*.12+(bcMyLv()-rc.lv)*.04,.15,.85);if(R()<pr){cmAddPup(id);news(`⚔️ Você venceu a disputa: ${p.n} escolheu treinar com você.`)}else{c.rvA.push(id);p.co=rc.id;news(`⚔️ ${p.n} preferiu ${rc.n}. Fica para a próxima.`)}}
 else{if(bid)TOAST='Você não tem US$ 5 mil na sua conta.';c.rvA.push(id);p.co=rc.id;news(`⚔️ ${p.n} agora treina com ${rc.n}.`)}}}catch(e){console.error(e)}return r}}
// o rival disputa os prêmios da temporada
{const _sc=bcSeasonCoach;bcSeasonCoach=function(){const c=S.cm;const done=c&&c.sy&&c.sy[year()];let h=_sc();try{if(done||!bcV2())return h;const rc=bcRiv();if(!rc)return h;const won=(c.sy[year()]||{}).won||[];
 const best=Math.min(...bcRivA().map(p=>RK.pro[p.id]||999).concat([999]));const sc=(best<=1?10:best<=5?8:best<=10?6.5:best<=20?5:best<=50?3.5:best<=100?2.5:0)+R()*4+rc.lv*.3;
 if(!won.includes('cy')&&sc>=10.5){c.rvT=(c.rvT||0)+1;news(`⚔️ ${rc.n}, seu rival, foi eleito Técnico do Ano ${year()}.`);h+=`<div class="small loss">⚔️ Seu rival ${esc(rc.n)} levou o Técnico do Ano.</div>`}
 c.sy[year()].h=h}catch(e){console.error(e)}return h}}
// painel: duelo de técnicos e torneio de cada aluno
{const _tp=bcTeamPanel;bcTeamPanel=function(){let h=_tp();try{const c=S.cm;
 // escolha de torneio para cada aluno que vai competir
 for(const x of cmPups()){const p=IDX.get(x.id);if(!p||x.foc!=='comp')continue;const evs=bcPupEvs(p);const cur=x.ev&&x.ev.w===S.w?x.ev.key:'';
  const sel=`<div class="bcpev"><span>Torneio da semana</span><select onchange="bcPupEv(${p.id},this.value)"><option value="">Automático</option>${evs.map(e=>`<option value="${e.key}" ${cur===e.key?'selected':''}>${esc(e.name)} · ${TIERS[e.tier].lbl||e.tier}</option>`).join('')}</select></div>`;
  h=h.replace(new RegExp(`(<div class="bcfoc">(?:(?!<div class="bcfoc">)[\\s\\S])*?bcFoc\\(${p.id},'desc'\\)[\\s\\S]*?</div>)`),`$1${sel}`)}
 const rc=bcRiv();if(rc){const A=bcRivA().sort((a,b)=>(RK.pro[a.id]||RK.jr[a.id]*3||9999)-(RK.pro[b.id]||RK.jr[b.id]*3||9999))[0];const rk=A?(RK.pro[A.id]?'#'+RK.pro[A.id]:RK.jr[A.id]?'#'+RK.jr[A.id]+' juvenil':'sem ranking'):'—';const H=c.rvH||{w:0,l:0};
  const strip=`<div class="bcrv"><span class="bckick">⚔️ Duelo de técnicos</span><div class="bcrvb"><div><b>${esc(rc.n)}</b><em>nível ${bcCoLv(rc)} · ${bcLvName(bcCoLv(rc)).toLowerCase()}${c.rvT?` · ${c.rvT}× Técnico do Ano`:''}</em><em>${A?`Melhor atleta: ${esc(A.n)} (${rk})`:'Sem atletas no momento'}</em></div><div class="bcrvs"><strong>${H.w}–${H.l}</strong><span>confrontos</span></div></div></div>`;
  h=h.replace(/<\/div>$/,strip+'</div>')}}catch(e){console.error(e)}return h}}
// preparação: aviso quando o adversário é do rival
{const _vm=v5Match;v5Match=function(){let s=_vm.apply(this,arguments);try{if(bcV2()){const rc=bcRiv(),o=oppOf();if(rc&&(S.cm.rvA||[]).includes(o)){const H=S.cm.rvH||{w:0,l:0};s=s.replace('<div class="bcoco">',`<div class="bcrvx">⚔️ Duelo de técnicos: você × ${esc(rc.n)} · ${H.w}–${H.l} nos confrontos</div><div class="bcoco">`)}}}catch(e){}return s}}
{const _pg=bcPenGo;bcPenGo=function(){const r=_pg.apply(this,arguments);try{bcRivInit();save();render()}catch(e){}return r}}
