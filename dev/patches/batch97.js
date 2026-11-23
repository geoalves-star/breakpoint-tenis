// =============== v6.3 · todo atleta tem técnico ===============
BCPICK.co0={t:'Primeiro técnico',o:{
 clube:{n:'Técnico do clube',i:'🏘️',d:'Quem cuida dos talentos do seu clube.',p:['Grátis.','Treino rende 20% mais do que treinar sozinho.'],c:['Sem especialidade.','Divide a atenção com outros alunos.']},
 familia:{n:'Família',i:'👨‍👧',d:'Quem te ensinou a jogar.',p:['Grátis e confiança total.','Nunca pede aumento e nunca vai embora.'],c:['Conhecimento técnico limitado: treino rende só 10% a mais.']},
 ex:{n:'Ex-jogador da região',i:'🎾',d:'Já jogou o circuito e conhece o caminho.',p:['Especialista em um golpe: esse treino rende 30% a mais.','Treino rende 20% mais no geral.'],c:['Cobra US$ 200 por semana.','Pode ir embora se a confiança cair.']}}};
// treino: família rende menos que um técnico de verdade
function bcCoM(){const c=myCoach();if(c&&c.fam)return 1.1;return COACH[S.me.coach||0].m}
// técnico do clube: sempre disponível, sem custo
function bcClubCo(){const m=S.me;let c=m.clubCo&&COI.get(m.clubCo);if(!c){c=mkCoach(1);c.club=1;c.sal=0;c.sp=null;c.st='equilibrado';c.c=m.c;c.n=genName(m.c,R()<.3);S.coaches.push(c);COI.set(c.id,c);m.clubCo=c.id}return c}
function bcSetCo(c,silent){const m=S.me;m.coachId=c.id;m.coach=c.q;m.cTrust=c.fam?95:70;m.cUntil=S.w+52;if(!silent)news(`🧑‍🏫 ${c.fam?'Sua família':c.n} volta a cuidar do seu treino.`)}
function bcEnsureCo(){try{if(!S||!S.me||S.cm||S.ended||!S.coaches)return;const m=S.me;if(m.coachId&&COI.get(m.coachId))return;const fam=m.famCo&&COI.get(m.famCo);bcSetCo(fam||bcClubCo())}catch(e){}}
// pendência: lembra de trocar quando dá para pagar algo melhor
function bcCoUp(){try{const m=S.me,c=myCoach();if(S.cm||!c)return false;if(!(c.club||c.fam))return false;if(meAge()<15)return false;return m.money>=COACH[2].c*26}catch(e){return false}}
{const _ng=newGame;newGame=function(o){const r=_ng.apply(this,arguments);try{if(S&&S.me&&!(o&&o.coach)){const m=S.me,k=(o&&o.co0)||'clube';
  if(o&&o.leg){let c=freeCoaches().filter(x=>x.q===3).sort(()=>R()-.5)[0];if(!c){c=mkCoach(3);S.coaches.push(c);COI.set(c.id,c)}if(c){bcSetCo(c,true);news(`🧑‍🏫 ${flag(c.c)} ${c.n} (${COACH[c.q].n}) é seu treinador.`)}}
  else if(k==='familia'){const c=mkCoach(1);c.fam=1;c.club=1;c.sal=0;c.sp=null;c.c=m.c;const sn=(m.name||'').trim().split(' ').slice(1).join(' ');const fe=R()<.4;c.f=fe;c.n=(genName(m.c,fe).split(' ')[0])+(sn?' '+sn:'');S.coaches.push(c);COI.set(c.id,c);m.famCo=c.id;bcSetCo(c,true);news(`👨‍👧 ${fe?'Sua mãe':'Seu pai'}, ${c.n}, é ${fe?'sua treinadora':'seu treinador'}.`)}
  else if(k==='ex'){const c=mkCoach(1);c.ex=true;c.sal=200;c.c=m.c;S.coaches.push(c);COI.set(c.id,c);bcSetCo(c,true);news(`🎾 ${c.n}, ex-jogador da região, é seu treinador. Especialidade: ${(ATTR.find(a=>a[0]===c.sp)||['',''])[1]}.`)}
  else{bcSetCo(bcClubCo(),true);news(`🏘️ ${myCoach().n}, técnico do clube, cuida do seu treino.`)}}}catch(e){}return r}}
// o técnico do clube e a família não renovam contrato nem pedem demissão
{const _cw=coachWeek;coachWeek=function(){const c=myCoach();if(c&&(c.club||c.fam)){S.me.cUntil=S.w+52;return}return _cw.apply(this,arguments)}}
// nunca fica sem técnico: ao dispensar, perder o técnico ou ficar sem dinheiro, volta o do clube
{const _ew=endWeek;endWeek=function(){const r=_ew.apply(this,arguments);bcEnsureCo();return r}}
{const _f=fireCoach;fireCoach=function(){const r=_f.apply(this,arguments);bcEnsureCo();try{save();render()}catch(e){}return r}}
// todos os atletas do circuito têm técnico (profissionais e juvenis)
{const _a=assignCoaches;assignCoaches=function(){const r=_a.apply(this,arguments);try{const used=new Set();S.pro.concat(S.jr).forEach(p=>{if(p.co&&COI.get(p.co))used.add(p.co)});
  // remove técnicos de clube que ficaram sem atleta (menos os seus)
  const mine=new Set([S.me&&S.me.coachId,S.me&&S.me.clubCo,S.me&&S.me.famCo]);S.coaches=S.coaches.filter(c=>!c.club||used.has(c.id)||mine.has(c.id));COI=new Map();S.coaches.forEach(c=>COI.set(c.id,c));
  for(const p of S.pro.concat(S.jr)){if(p.co&&COI.get(p.co))continue;const c=mkCoach(1);c.club=1;c.sal=0;c.c=p.c;S.coaches.push(c);COI.set(c.id,c);p.co=c.id}}catch(e){}return r}}
// juvenis que entram no circuito ao longo do jogo também ganham técnico
{const _ew2=endWeek;endWeek=function(){const r=_ew2.apply(this,arguments);try{if(S&&S.coaches&&S.w%4===0){for(const p of S.pro.concat(S.jr)){if(p.co&&COI.get(p.co))continue;const c=mkCoach(1);c.club=1;c.sal=0;c.c=p.c;S.coaches.push(c);COI.set(c.id,c);p.co=c.id}}}catch(e){}return r}}
// saves antigos: garante técnico já na primeira tela
{const _r=render;render=function(...a){try{if(S&&S.me&&!S.cm&&!S.ended&&S.coaches&&!S.me.coachId&&!MENU)bcEnsureCo()}catch(e){}return _r.apply(this,a)}}
