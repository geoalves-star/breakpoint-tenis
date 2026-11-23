// =============== v6.2 · estilo, mão e personalidade explicados e com efeito real no jogo ===============
const BCPICK={
 hand:{t:'Mão',o:{
  destro:{n:'Destro',i:'🤚',d:'O padrão do circuito.',p:['Sem ajustes: o jogo de sempre.'],c:[]},
  canhoto:{n:'Canhoto',i:'🫲',d:'Raro no circuito: o efeito do saque abre a quadra.',p:['Saque +2 desde o início.','Adversários estranham: +0,3 no saque em toda partida.'],c:[]}}},
 style:{t:'Estilo de jogo',o:{
  fundo:{n:'Fundo de quadra',i:'🧱',d:'Constrói o ponto com golpes pesados da linha de base.',p:['Forehand +4, backhand +3 e físico +1.','Rende mais no saibro (+1).','Na quadra, seus golpes de fundo pressionam mais.'],c:['Voleio −3.','Rende menos na grama (−0,6).','Desgasta coxa e tornozelo.']},
  sacador:{n:'Sacador',i:'🚀',d:'Ganha pontos rápidos com o saque e sobe à rede.',p:['Saque +6 e voleio +2.','Rende mais na grama (+1) e na quadra dura (+0,4).','Na quadra, seu saque força mais erros.'],c:['Devolução −2.','Sofre no saibro (−0,8).','Desgasta mais o ombro.']},
  contra:{n:'Contra-golpeador',i:'🛡️',d:'Devolve tudo e vence pelo cansaço.',p:['Devolução +4 e físico +4.','Cansa 30% menos em jogos longos.','Na quadra, alcança mais bolas.'],c:['Saque −3.','Rende menos na grama (−0,4).']},
  completo:{n:'Completo',i:'⚖️',d:'Sem ponto fraco e sem arma decisiva.',p:['+1 em todos os atributos.','Rende bem em todos os pisos (+0,3 em cada).'],c:['Sem um piso onde é especialista.','Nenhum golpe decide sozinho.']}}},
 pers:{t:'Personalidade',o:{
  calmo:{n:'Calmo e exemplar',i:'🧘',d:'Cabeça fria nos momentos decisivos.',p:['Mais forte em break points e tie-breaks.','A confiança cai menos depois de derrotas.','Patrocinadores pagam 10% a mais.'],c:['Seguidores crescem mais devagar.','Não ganha impulso quando está atrás no placar.']},
  normal:{n:'Normal',i:'🙂',d:'Equilibrado dentro e fora da quadra.',p:['Sem riscos de comportamento.','Imagem neutra com torcida e patrocinadores.'],c:['Sem bônus especiais.']},
  explosivo:{n:'Explosivo',i:'🔥',d:'Joga com raça e vira jogos, mas pode perder a cabeça.',p:['Cresce quando está perdendo no placar.','A confiança sobe mais com vitórias.','Seguidores crescem mais rápido.'],c:['Erra mais em pontos de pressão.','Risco de advertência e multa.','Patrocinadores pagam 8% a menos.']}}}};
const BCSTB={sacador:{sv:6,vo:2,rt:-2},fundo:{fh:4,bh:3,fi:1,vo:-3},contra:{rt:4,fi:4,sv:-3},completo:{sv:1,rt:1,fh:1,bh:1,vo:1,fi:1,me:1}};
const BCSTSF={sacador:{grass:1,hard:.4,clay:-.8},fundo:{clay:1,hard:.2,grass:-.6},contra:{clay:.6,hard:.3,grass:-.4},completo:{hard:.3,clay:.3,grass:.3}};
function bcPersOf(m){m=m||(S&&S.me);if(!m)return 'normal';if(m.pers)return m.pers;const b=m.base??40;return b<=25?'calmo':b>=55?'explosivo':'normal'}
function bcPersSp(){try{const p=bcPersOf();return p==='calmo'?1.1:p==='explosivo'?.92:1}catch(e){return 1}}
// cartões de escolha com o que cada opção faz
function bcPick(k){const P=BCPICK[k];if(k==='co0'&&!FORM.co0)FORM.co0='clube';const cur=FORM[k];
 return `<div class="sec-t">${P.t}</div><div class="bcpk bcpk-${k}">${Object.entries(P.o).map(([v,o])=>`<button class="opt bcpo ${cur===v?'on':''}" onclick="setF('${k}','${v}')"><span class="bcpi">${o.i}</span><b>${o.n}</b><small>${o.d}</small></button>`).join('')}</div>
 ${(()=>{const o=P.o[cur];if(!o)return'';return `<div class="bcpx"><div class="bcpxh">${o.i} ${o.n} na prática</div>${o.p.map(x=>`<div class="bcpp">＋ ${x}</div>`).join('')}${o.c.map(x=>`<div class="bcpc">− ${x}</div>`).join('')}</div>`})()}`}
// prévia dos atributos iniciais conforme as escolhas
function bcPrev(){const F=FORM;if(F.coach)return'';const age=F.leg?(+F.age||31):(+F.age||14);
 const base=F.leg?78.5:30+Math.min(age-14,6)*2.8+Math.max(0,age-20)*1.2+(F.tal==='elite'?3:F.tal==='medio'?1.5:1.5);
 const st=BCSTB[F.style]||{},sf=BCSTSF[F.style]||{};const rows=ATTR.map(([k,l])=>{const d=(st[k]||0)+(k==='sv'&&F.hand==='canhoto'?2:0),v=Math.round(base+d);return `<div class="bcar"><span>${l}</span><i><b style="width:${clamp(v,5,100)}%"></b></i><em class="${d>0?'up':d<0?'dn':''}">${v}${d?` <small>${d>0?'+':''}${d}</small>`:''}</em></div>`}).join('');
 const sfx=['hard','clay','grass'].map(s=>{const v=(sf[s]||0);return `<span class="bcsf ${v>0?'up':v<0?'dn':''}">${SURF[s]} ${v>0?'+':''}${v?String(v).replace('.',','):'0'}</span>`}).join('');
 return `<div class="bcprev"><div class="bcpxh">Como você começa</div>${rows}<div class="bcsfr"><span class="xs mut">Rendimento por piso</span>${sfx}</div></div>`}
// guarda a personalidade escolhida (saves antigos: deduz pelo comportamento)
{const _ng=newGame;newGame=function(o){const r=_ng.apply(this,arguments);try{if(S&&S.me){S.me.pers=o&&o.pers||'normal'}}catch(e){}return r}}
// força em quadra: piso, canhoto e completo
{const _e=eff;eff=function(id,surf,tacK,opp){const r=_e.apply(this,arguments);try{if(id==='me'&&r){const m=S.me,b=(BCSTSF[m.style]||{})[surf]||0;r.sv+=b;r.rt+=b;if(m.hand==='canhoto')r.sv+=.3;r._me=1}}catch(e){}return r}}
{const _m=mkEngine;mkEngine=function(A,B,bo5){const E=_m.apply(this,arguments);try{E.meA=!!(A&&A._me)}catch(e){}return E}}
// personalidade nos pontos: calmo cresce na pressão, explosivo cresce quando está atrás
{const _p=ePoint;ePoint=function(E,mod){try{if(E&&E.meA&&!(mod&&mod.fw!=null)){const ps=bcPersOf();if(ps!=='normal'){const sA=eSrv(E),sp=sA?E.a:E.b,rp=sA?E.b:E.a;const big=E.tb||(!E.tb&&rp>=3&&rp>sp);const behind=E.sb>E.sa||(E.sa===E.sb&&E.gb-E.ga>=2);let k=0;
  if(ps==='calmo'&&big)k=.025;if(ps==='explosivo'){if(behind)k=.03;else if(big)k=-.012}
  if(k){mod={...(mod||{}),dp:((mod&&mod.dp)||0)+(sA?k:-k)}}}}}catch(e){}return _p.call(this,E,mod)}}
// confiança depois da partida
{const _u=userMatch;userMatch=function(){const m=S.me,c0=m.conf??50;const r=_u.apply(this,arguments);try{const d=(m.conf??50)-c0,ps=bcPersOf();if(d<0&&ps==='calmo')m.conf=clamp(c0+d*.7,10,95);if(d>0&&ps==='explosivo')m.conf=clamp(c0+d*1.3,10,95);if(d<0&&ps==='explosivo')m.conf=clamp(c0+d*1.1,10,95)}catch(e){}return r}}
// seguidores
{const _f=folTarget;folTarget=function(){const v=_f();try{return bcPersOf()==='calmo'?v*.92:v}catch(e){return v}}}
// cansaço: contra-golpeador cansa menos (simulação e quadra)
{const _f=fatOf;fatOf=function(E,me){const v=_f(E,me);try{if(me&&E.meA&&S.me.style==='contra')return v*.7}catch(e){}return v}}
{const _k=v5FatK;v5FatK=function(){const k=_k();try{if(S.me.style==='contra')return 1-(1-k)*.7}catch(e){}return k}}
// quadra: saque do sacador e golpes do fundo de quadra pressionam mais
{const _s=v5MeServe;v5MeServe=function(){const A=V5A;_s.apply(this,arguments);try{if(A&&A===V5A&&A.phase==='outgoing'&&S.me.style==='sacador')A.qPrev*=1.1}catch(e){}}}
{const _h=v5MeHit;v5MeHit=function(dir,kind){const A=V5A,b0=A&&A.ball,net=A&&A.meNet;_h.apply(this,arguments);try{if(A&&A===V5A&&A.phase==='outgoing'&&A.ball!==b0){const st=S.me.style;if(st==='fundo'&&!net)A.qPrev*=1.06;if(st==='sacador'&&net)A.qPrev*=1.05}}catch(e){}}}
// tela Equipe: estilo explicado e personalidade
{const _sc=styleCard;styleCard=function(){let h=_sc();try{const m=S.me,o=BCPICK.style.o[m.style]||BCPICK.style.o.completo,ps=BCPICK.pers.o[bcPersOf()],sf=BCSTSF[m.style]||{};
 const box=`<div class="bcpx"><div class="bcpxh">${o.i} ${o.n}: ${o.d.replace(/\.$/,'')}.</div>${o.p.map(x=>`<div class="bcpp">＋ ${x}</div>`).join('')}${o.c.map(x=>`<div class="bcpc">− ${x}</div>`).join('')}<div class="bcsfr">${['hard','clay','grass'].map(s=>{const v=sf[s]||0;return `<span class="bcsf ${v>0?'up':v<0?'dn':''}">${SURF[s]} ${v>0?'+':''}${v?String(v).replace('.',','):'0'}</span>`}).join('')}</div></div>
 <div class="bcpx"><div class="bcpxh">${ps.i} Personalidade: ${ps.n}</div>${ps.p.map(x=>`<div class="bcpp">＋ ${x}</div>`).join('')}${ps.c.map(x=>`<div class="bcpc">− ${x}</div>`).join('')}<div class="xs mut" style="margin-top:6px">A personalidade vem da criação. O comportamento do dia a dia muda com suas escolhas.</div></div>`;
 h=h.replace(/<div class="xs mut">Saque [\s\S]*?adaptação\.<\/div>/,box+'<div class="xs mut">Mudar de estilo exige 12 semanas de adaptação.</div>')}catch(e){}return h}}
// =============== correções achadas no teste de 10 temporadas ===============
// quadra: cronômetros que disparam depois que a partida já fechou
{const _o=v5OppServe;v5OppServe=function(){if(!IM||!IM.E||!V5A)return;return _o.apply(this,arguments)}}
{const _c=v5ArcCommit;v5ArcCommit=function(){if(!V5A||!V5A.end||!IM||!IM.E)return;return _c.apply(this,arguments)}}
// caixa sempre em valores inteiros
{const _ew=endWeek;endWeek=function(){const r=_ew.apply(this,arguments);try{if(S&&S.me&&Number.isFinite(S.me.money))S.me.money=Math.round(S.me.money)}catch(e){}return r}}
