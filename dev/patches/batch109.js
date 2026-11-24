// =============== v6.9 · conselhos únicos, caminho na chave, coletiva de imprensa e seletor de treino ===============
// ---------- 1. conselhos da semana: uma pessoa diferente por opção, frases com os números da sua carreira ----------
const BCADVN={ana:['Téo','Nina','Igor','Paula','Davi'],psy:['Dra. Clara','Dr. Rui','Dra. Sônia'],nut:['Leo','Marina','Vítor']};
function bcAdvTeam(){const T=v5Team();if(!T.ana){const h=k=>{let x=0;for(const ch of String((S.me&&S.me.name)||'')+k)x=(x*31+ch.charCodeAt(0))|0;return Math.abs(x)};const r=(a,k)=>a[h(k)%a.length];T.ana=r(BCADVN.ana,'a');T.psy=r(BCADVN.psy,'p');T.nut=r(BCADVN.nut,'n')}return T}
const bcFem=n=>/^(Dra\.|Sua )/.test(n)||/a$/.test(String(n).split(' ')[0]);
function bcAdvisors(){const m=S.me,c=myCoach(),T=bcAdvTeam(),f=STF(),L={};
 if(bcV2()){L.ath=[m.name.split(' ')[0],'atleta'];const s=(S.cm&&S.cm.st)||{};if(s.fis)L.fis=[T.fis,'fisioterapia'];if(s.pf)L.pf=[T.nut,'preparação física'];if(s.sc)L.ana=[T.ana,'olheiro'];L.fam=[T.fam,'família do atleta'];return L}
 if(c)L.coach=[c.n.split(' ')[0],'treinador'];if(f.agt)L.emp=[T.emp,bcFem(T.emp)?'empresária':'empresário'];if((m.physio||0)>0)L.fis=[T.fis,'fisioterapia'];
 if(f.ana)L.ana=[T.ana,'analista'];if(f.psy)L.psy=[T.psy,bcFem(T.psy)?'psicóloga':'psicólogo'];if(f.nut)L.nut=[T.nut,'nutrição'];L.fam=[T.fam,'família'];return L}
const BCADVP={other:['emp','ana','fam','coach','psy'],ev:['emp','ana','coach','fam','ath','psy'],alt:['ana','coach','fam','emp','ath','psy'],train:['coach','pf','psy','ath','fam'],rest:['fis','psy','nut','fam','ath']};
function bcAdvFacts(cat,p){const m=S.me,F={};F.nx=(()=>{const k=S.plan&&S.plan[S.w+1];if(!k)return null;const e=weekEvents(S.w+1).find(x=>x.key===k);return e?e.name:null})();
 const A=ATTR.map(([k,n])=>[k,n,Math.round(m.attrs[k])]).sort((a,b)=>a[2]-b[2]);F.weak=A[0];F.strong=A[A.length-1];F.en=Math.round(m.energy);F.ld=Math.round(m.load||0);F.conf=Math.round(m.conf??50);
 const wk=new Set((S.hist||[]).filter(h=>h.tier!=='TEAM'&&h.w>S.w-8).map(h=>h.w));F.played=wk.size;F.age=meAge();
 if(p&&p.ev){const e=p.ev,T=TIERS[e.tier];F.e=e;F.pts=T.pts[0];F.prize=T.prize?T.prize[0]:0;F.surfN=SURF[e.surf];
  const H=(S.hist||[]).filter(h=>h.sf===e.surf&&h.tier!=='TEAM');F.sw=H.filter(h=>h.win).length;F.sl=H.length-F.sw;F.spct=H.length>=6?Math.round(F.sw/H.length*100):null;
  const R=(S.results||[]).filter(r=>r.n===e.name);F.last=R.find(r=>r.y===year()-1)||null;F.best=R.length?R.slice().sort((a,b)=>(b.p||0)-(a.p||0))[0]:null;F.home=e.iso===COUNTRIES[m.c][0];F.fav=['hard','clay','grass'][m.fs??0]===e.surf;
  try{const tp=tripOf(e,myLoc(),true);F.trip=tp&&tp.total?tp.total:0}catch(x){F.trip=0}F.money=m.money;F.rk=myRank(isPro()?'pro':'jr')}
 return F}
const BCQ={
 ev:{
  emp:[F=>F.prize?`Campeão aqui leva ${money(F.prize)}. Patrocinador gosta de ver você nessas fotos.`:null,F=>F.home?'Jogar em casa rende manchete e contrato. A torcida vende ingresso para você.':null,F=>F.trip&&F.trip>F.money*.2?`A viagem custa ${money(F.trip)}. Só vale se você for longe.`:null,F=>`Um bom resultado em ${F.e.name} aparece em todo lugar. É vitrine.`,F=>F.rk&&F.rk<=100?'Top 100 que joga torneio grande vira assunto. Vamos aparecer.':null],
  ana:[F=>F.spct!=null?`Na ${F.surfN.toLowerCase()} você ganha ${F.spct}% das partidas (${F.sw}–${F.sl}). Os números apoiam.`:null,F=>F.last?`Ano passado você parou ${bcRdTxt(F.last.r)} aqui. Dá para ir além.`:null,F=>`Campeão leva ${F.pts} pontos. Cada rodada vencida já mexe no seu ranking.`,F=>F.best&&F.best.r==='Campeão'?'Você já foi campeão aqui. Os dados dizem: esse torneio combina com você.':null,F=>F.fav?`Piso favorito. Seu índice de vitórias sobe na ${F.surfN.toLowerCase()}.`:null],
  coach:[F=>F.fav?`Na ${F.surfN.toLowerCase()} o seu ${F.strong[1].toLowerCase()} machuca. Vamos explorar isso.`:null,F=>`Ritmo de jogo agora vale mais que treino. Quero você em quadra.`,F=>F.last&&F.last.r!=='Campeão'?`Aqui você parou ${bcRdTxt(F.last.r)} no ano passado. Tenho um plano diferente.`:null,F=>F.conf>=60?'Você está confiante. Hora de transformar isso em vitórias.':'Uma boa campanha devolve a confiança. Vamos buscar.'],
  fam:[F=>F.home?'Vai ter gente da família na arquibancada. Joga por nós!':null,F=>F.trip>2000?'Longe de casa de novo... mas a gente assiste daqui.':null,F=>'Lembra quando você sonhava em jogar torneios assim? Chegou a hora.',F=>F.age>=30?'Cada torneio agora é especial. Aproveita cada jogo.':null],
  ath:[F=>`Quero jogar ${F.e.name}. Sinto que é o meu momento.`,F=>F.fav?`Na ${F.surfN.toLowerCase()} eu me sinto em casa, técnico.`:null,F=>F.last?`Ano passado eu parei ${bcRdTxt(F.last.r)} aqui. Quero mais.`:null],
  psy:[F=>F.conf<45?'Uma vitória aqui faz mais pela sua cabeça que qualquer sessão.':null,F=>'Entre sem pensar no resultado. Ponto a ponto.']},
 train:{
  coach:[F=>`O seu ${F.weak[1].toLowerCase()} (${F.weak[2]}) é o ponto mais baixo. Uma semana focada nele muda partidas.`,F=>F.nx?`Semana que vem tem ${F.nx}. Quero você afiado até lá.`:null,F=>`Seu ${F.strong[1].toLowerCase()} (${F.strong[2]}) já é arma. Agora é deixar o resto no mesmo nível.`,F=>F.played>=4?`Você jogou ${F.played} das últimas 8 semanas. Hora de construir jogo.`:null],
  pf:[F=>F.ld>=50?`Carga em ${F.ld}. Treino bem dosado agora evita lesão depois.`:null,F=>`Físico em ${Math.round(S.me.attrs.fi)}. Base física é o que sustenta o terceiro set.`],
  psy:[F=>F.conf<50?'Treinar bem devolve a sensação de controle. Isso aparece no próximo torneio.':null,F=>'Semana sem jogo também é semana de cabeça fresca.'],
  ath:[F=>`Quero melhorar meu ${F.weak[1].toLowerCase()}. Me sinto pronto para evoluir.`,F=>F.nx?`Quero chegar bem em ${F.nx}.`:null],
  fam:[F=>'Uma semana perto de casa, treinando. A gente gosta!',F=>`Você sempre foi de treinar duro. Isso nunca falhou.`]},
 rest:{
  fis:[F=>F.ld>=40?`Sua carga está em ${F.ld}. Descansar agora derruba esse número e afasta lesão.`:null,F=>F.en<60?`Energia em ${F.en}%. Uma semana parado volta quase tudo.`:null,F=>F.played>=4?`Foram ${F.played} semanas de jogo nas últimas 8. O corpo pede pausa.`:null,F=>'Músculo também cresce no descanso. Uma semana leve faz bem.'],
  psy:[F=>F.conf<45?'Cabeça cansada perde ponto importante. Respira esta semana.':null,F=>'Desligar um pouco também é treino mental.'],
  nut:[F=>'Semana de descanso é hora de ajustar a alimentação e dormir bem.'],
  fam:[F=>'Vem passar uns dias em casa. Todo mundo está com saudade.',F=>F.played>=4?'Você está sempre viajando. Uma semana em casa faz bem.':null],
  ath:[F=>F.en<60?`Estou cansado, técnico. Energia em ${F.en}%.`:null,F=>'Uma semana para respirar e voltar com tudo.']}};
function bcAdvApply(L){if(!S||!L||!L.length)return;const ADV=bcAdvisors(),used=new Set(),C=S.advC&&S.advC.w===S.w?S.advC:(S.advC={w:S.w,m:{}});S.advU=S.advU||[];
 let nEv=0;const cats=L.map(p=>{const m=/enter\('([^']+)'\)/.exec(p.a||'');if(m){const ev=weekEvents(S.w).find(x=>x.key===m[1]);return{c:nEv++?'alt':'ev',ev}}if(/^train\(/.test(p.a))return{c:'train'};if(/^rest\(/.test(p.a))return{c:'rest'};return p.w?{c:'other'}:null});
 const ord=L.map((p,i)=>i).sort((a,b)=>{const pr={train:0,rest:1,ev:2,alt:3,other:4};return((cats[a]&&pr[cats[a].c])??9)-((cats[b]&&pr[cats[b].c])??9)});
 const seenQ=new Set();
 for(const i of ord){const p=L[i],k=cats[i];if(!k)continue;const key=p.a;if(C.m[key]){p.w=C.m[key][0];p.q=C.m[key][1];used.add(C.m[key][2]);seenQ.add(p.q);continue}
  const pref=BCADVP[k.c].filter(r=>ADV[r]);let role=pref.find(r=>!used.has(r))||pref[0]||'fam';used.add(role);
  const F=bcAdvFacts(k.c,{ev:k.ev});const bank=((BCQ[k.c==='alt'?'ev':k.c]||{})[role]||[]).map((fn,j)=>{let t=null;try{t=fn(F)}catch(e){}return t?{id:k.c+role+j,t}:null}).filter(Boolean);
  let opts=bank.filter(x=>!seenQ.has(x.t)&&!S.advU.includes(x.id));if(!opts.length)opts=bank.filter(x=>!seenQ.has(x.t));
  if(opts.length){const pick=opts[(S.w*13+i*7+role.length)%opts.length];p.q=pick.t;S.advU.push(pick.id);if(S.advU.length>14)S.advU.shift()}
  p.w=ADV[role]||p.w;seenQ.add(p.q);C.m[key]=[p.w,p.q,role]}}
{const _vp=v5Props;v5Props=function(){const r=_vp.apply(this,arguments);try{bcAdvApply(r.L);r.L.forEach(p=>{if(p.w&&/^empresári/.test(p.w[1]))p.w=[p.w[0],bcFem(p.w[0])?'empresária':'empresário']})}catch(e){console.error(e)}return r}}

// ---------- 2. caminho na chave ----------
const bcRShort=n=>n===2?'Final':n===4?'Semi':n===8?'Quartas':n===16?'Oitavas':`R${n}`;
const bcSur=n=>{const s=String(n||'').split(' ');return s.length>1?s.slice(-1)[0]:s[0]};
function bcPathCard(){const T=S.tour;if(!T)return'';const ev=curEv();if(!ev)return'';const t=TIERS[ev.tier];const H=(S.hist||[]).filter(h=>h.w===S.w&&h.e===ev.name&&h.tier!=='TEAM');
 if(T.q){const n=T.q.n,st=T.q.step;const steps=[];for(let i=0;i<n;i++){const h=H.find(x=>/qualif/i.test(x.rd||'')&&x.qs===i)||null;steps.push({l:`Quali ${i+1}`,st:i<st?'ok':i===st&&!T.over?'now':'nx'})}steps.push({l:'Chave principal',st:'nx',icon:'🎟️'});
  return `<div class="card bcpath"><div class="bcpathh"><span class="bckick">Seu caminho · qualifying</span><span class="xs mut">vença ${n} jogo${n>1?'s':''} para entrar na chave</span></div><div class="bcsteps">${steps.map(s=>`<div class="bcst ${s.st}"><i>${s.st==='ok'?'✓':s.icon||''}</i><b>${s.l}</b><span>${s.st==='now'?'hoje':''}</span></div>`).join('')}</div></div>`}
 const N0=(T.brs&&T.brs[0]&&T.brs[0].length)||(T.br?T.br.length:0);if(!N0)return'';const cur=T.over?0:(T.br?T.br.length:0);const sizes=[];for(let n=N0;n>=2;n/=2)sizes.push(n);
 const lg=n=>Math.round(Math.log2(n));const ptsAt=n=>t.pts[lg(n)]??0,przAt=n=>(t.prize||[])[lg(n)]??0;
 const i0=T.br?T.br.indexOf('me'):-1;
 const prob=(n)=>{if(!T.br||i0<0||!cur)return null;const k=lg(cur)-lg(n);const bs=Math.pow(2,k+1),start=Math.floor(i0/bs)*bs,half=Math.floor(i0/(bs/2))*(bs/2);const pool=T.br.slice(start,start+bs).filter((id,j)=>(start+j<half||start+j>=half+bs/2)&&id!=='me');if(!pool.length)return null;const best=pool.slice().sort((a,b)=>(RK.pro[a]||RK.jr[a]||9999)-(RK.pro[b]||RK.jr[b]||9999))[0];const p=IDX.get(best);return p?{p,r:rkOf(best)}:null};
 const st=sizes.map(n=>{const h=H.find(x=>x.rd===roundName(n));if(h)return{n,st:h.win?'ok':'out',h};if(n===cur)return{n,st:'now'};if(n>cur||T.over)return{n,st:'skip'};return{n,st:'nx'}});
 const won=T.over&&H.length&&H[0].win&&H[0].rd==='Final';
 const cell=s=>{const lab=bcRShort(s.n);if(s.st==='ok'||s.st==='out'){const h=s.h;return `<div class="bcst ${s.st}"><i>${s.st==='ok'?'✓':'✕'}</i><b>${lab}</b><span>${flag(h.oc)} ${esc(bcSur(h.on))}</span><em>${esc(h.s||'')}</em></div>`}
  if(s.st==='now'){const o=IDX.get(oppOf());return `<div class="bcst now"><i>●</i><b>${lab}</b><span>${o?`${flag(o.c)} ${esc(bcSur(o.n))}`:''}</span><em>hoje</em></div>`}
  if(s.st==='nx'){const pr=prob(s.n);return `<div class="bcst nx"><i></i><b>${lab}</b><span>${pr?`${flag(pr.p.c)} ${esc(bcSur(pr.p.n))}`:'—'}</span><em>${pr?'provável':''}</em></div>`}
  return `<div class="bcst skip"><i></i><b>${lab}</b><span></span><em></em></div>`};
 const trophy=`<div class="bcst cup ${won?'ok':''}"><i>🏆</i><b>Título</b><span>${t.pts[0]} pts</span><em>${money((t.prize||[])[0]||0)}</em></div>`;
 let stake='';if(cur&&!T.over){const g=ptsAt(cur),w=ptsAt(cur/2),pg=przAt(cur),pw=przAt(cur/2);stake=`<div class="bcstake"><div><span>Em jogo hoje</span><b>+${Math.max(0,w-g)} pts · +${money(Math.max(0,pw-pg))}</b></div><div><span>Já garantido</span><b>${g} pts · ${money(pg)}</b></div></div>`}
 else if(T.over){const last=H[0];stake=`<div class="bcstake"><div><span>Resultado</span><b>${won?'🏆 Campeão':last?`Parou: ${bcRShort(sizes.find(n=>roundName(n)===last.rd)||2)}`:'—'}</b></div></div>`}
 return `<div class="card bcpath"><div class="bcpathh"><span class="bckick">Seu caminho na chave</span><span class="xs mut">${N0} jogadores</span></div><div class="bcsteps">${st.map(cell).join('')}${trophy}</div>${stake}</div>`}
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(S&&S.tour&&!MENU&&TAB==='home'&&!S.modals.length&&!IM&&!LIVE&&!document.querySelector('.bcpath')){const h=document.querySelector('.v5h1');const sec=h&&h.closest('section');if(sec){const c=bcPathCard();if(c){sec.insertAdjacentHTML('afterend',c);const now=document.querySelector('.bcst.now');if(now){const sc=now.parentNode;sc.scrollLeft=Math.max(0,now.offsetLeft-sc.clientWidth/2+now.clientWidth/2)}}}}}catch(e){console.error(e)}return v}}

// ---------- 3. entrevista e coletiva com cara de transmissão ----------
const BCIVT={'Humilde':'🙏','Confiante':'💪','Polêmico':'🔥','Polêmica':'🔥','Respeitoso':'🤝','Respeitosa':'🤝','Desviar':'🤐','Provocar':'😈','Emocionado':'🥹','Emocionada':'🥹','Agradecido':'💛','Agradecida':'💛','Sincero':'🗣️','Sincera':'🗣️','Diplomático':'🕊️','Diplomática':'🕊️','Ambicioso':'🚀','Ambiciosa':'🚀','Engraçado':'😄','Engraçada':'😄'};
const BCREP=['Bia Martins','Caio Rezende','Lu Prado','Rafa Teixeira','Nina Lopes','Téo Barros','Duda Fontes','Gabi Rocha'];
const bcHash=s=>{let h=0;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))|0;return Math.abs(h)};
const bcOutCol=n=>['#e4572e','#2e86de','#10ac84','#a55eea','#f7b731','#eb3b5a'][bcHash(n)%6];
function bcIvView(md){const coletiva=md.k==='Coletiva de imprensa';const parts=String(md.ti||'').split(' · ');const out=parts[0];const qn=coletiva?(parts.find(x=>/pergunta/.test(x))||''):'';const evn=coletiva?parts[1]||'':'';
 const med=(typeof MEDIA!=='undefined'?MEDIA:[]).find(x=>x[0]===out);const rep=BCREP[bcHash(out+S.w)%BCREP.length];const ini=out.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
 const h=S.hist&&S.hist[0]&&S.hist[0].w===S.w&&S.hist[0].tier!=='TEAM'?S.hist[0]:null;
 const ctx=h?`<div class="bcivx ${h.win?'w':'l'}"><span>${h.win?'Vitória':'Derrota'}</span><b>${esc(h.s||'')}</b><em>${esc(h.rd||'')} · vs ${flag(h.oc)} ${esc(h.on||'')}</em></div>`:'';
 const chips=fx=>{const t=fxText(fx||{});if(!t)return'';return t.split(' · ').map(x=>{const neg=/^[−-]|polêmic|multa|esquenta|−|perde/i.test(x)&&!/imagem mais limpa/.test(x);return `<span class="${neg?'n':'p'}">${esc(x)}</span>`}).join('')};
 return `<div class="modal bcivm"><div class="box bciv">
  <div class="bcivh"><span class="bclive">● AO VIVO</span><span class="bcivk">${coletiva?'Coletiva de imprensa':'Entrevista'}</span>${qn?`<span class="bcivn">${esc(qn)}</span>`:''}</div>
  <div class="bcivr"><span class="bcivlogo" style="background:${bcOutCol(out)}">${esc(ini)}</span><div><b>${esc(out)}</b><small>${esc(rep)}${med?` · ${esc(med[1])}`:''}${evn?` · ${esc(evn)}`:''}</small></div><span class="bcivmic" aria-hidden="true">🎙️</span></div>
  ${ctx}
  <div class="bcivq"><span class="bcivqi" aria-hidden="true">“</span>${esc(md.q||'')}</div>
  <div class="bcivl">Sua resposta</div>
  ${md.o.map((o,i)=>`<button class="bcivo" onclick="answer(${i})"><span class="bcivt"><i>${BCIVT[o.l]||'💬'}</i><b>${esc(o.l)}</b></span><span class="bcivs">${esc(o.t||'')}</span>${md.k!=='Resumo da temporada'&&fxText(o.fx||{})?`<span class="bcivf">${chips(o.fx)}</span>`:''}</button>`).join('')}
  <div class="xs mut" style="margin-top:8px;text-align:center">O que você disser pode virar manchete.</div></div></div>`}
{const _mv=modalView;modalView=function(){try{const md=S.modals[0];if(md&&(md.k==='Entrevista'||md.k==='Coletiva de imprensa'))return bcIvView(md)}catch(e){console.error(e)}return _mv.apply(this,arguments)}}
// números decimais em português nos efeitos (1,0% e 0,3)
{const _ft=fxText;fxText=function(){const t=_ft.apply(this,arguments);return typeof t==='string'&&(typeof bcPtNum!=='function'||bcPtNum())?t.replace(/(\d)\.(\d)(?!\d)/g,'$1,$2'):t}}

// ---------- 4. seletor do treino de cada dia ----------
const BCTRI={sv:['🎯','Aces e pontos rápidos no seu saque'],rt:['🛡️','Quebrar o saque do adversário'],fh:['🎾','O golpe principal do fundo de quadra'],bh:['🔄','Segura as trocas pelo lado do backhand'],vo:['🕸️','Fecha os pontos na rede'],fi:['💪','Aguenta jogos longos e evita lesões'],me:['🧠','Pontos importantes e pressão'],geral:['📋','Um pouco de tudo, com leitura de jogo'],rest:['😴','Recupera energia e baixa a carga']};
function bcDayLbl(k){const a=ATTR.find(x=>x[0]===k);return a?a[1]:k==='geral'?'Tático/geral':'Descanso'}
function bcDayOpen(i){const m=S.me,P=wplan(),cur=P[i];const A=ATTR.map(([k])=>Math.round(m.attrs[k])),mn=Math.min(...A),mx=Math.max(...A);
 const cards=DOPT.map(([k,l])=>{const at=ATTR.find(x=>x[0]===k),v=at?Math.round(m.attrs[k]):null,ic=BCTRI[k]||['•',''];const tag=mn===mx?'':v!=null&&v===mn?'<em class="w">ponto fraco</em>':v!=null&&v===mx?'<em class="s">mais forte</em>':'';const room=v!=null&&m.pot?Math.max(0,Math.round(m.pot-v)):null;
  return `<button class="bctrc ${cur===k?'on':''} ${k==='rest'?'rest':''}" onclick="bcDayPick(${i},'${k}')"><span class="bctri">${ic[0]}</span><span class="bctrt"><b>${esc(l)}${tag}</b><small>${ic[1]}</small>${v!=null?`<span class="bctrb"><i style="width:${v}%"></i></span>`:''}</span><span class="bctrv">${v!=null?`<b>${v}</b><small>${room!=null?(room>0?`até +${room}`:'no limite'):''}</small>`:''}</span></button>`}).join('');
 bcDayClose();document.body.insertAdjacentHTML('beforeend',`<div class="bcsheet" onclick="if(event.target===this)bcDayClose()"><div class="bcsheetb" role="dialog" aria-label="Treino de ${DAYS[i]}"><div class="bcsheeth"><div><span class="bckick">${DAYS[i]} · treino do dia</span><b>O que treinar?</b></div><button class="ghost" onclick="bcDayClose()" aria-label="Fechar">✕</button></div><div class="bctrl">${cards}</div></div></div>`);requestAnimationFrame(()=>{const s=document.querySelector('.bcsheet');s&&s.classList.add('on')})}
function bcDayClose(){document.querySelectorAll('.bcsheet').forEach(e=>e.remove())}
function bcDayPick(i,k){bcDayClose();setDay(i,k)}
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(S&&!MENU&&TAB==='train'){const P=wplan(),m=S.me;document.querySelectorAll('.wday select').forEach((sel,i)=>{if(sel.dataset.bc)return;sel.dataset.bc=1;sel.style.display='none';const k=P[i],at=ATTR.find(x=>x[0]===k),v=at?Math.round(m.attrs[k]):null,ic=BCTRI[k]||['•',''];
  sel.insertAdjacentHTML('afterend',`<button class="bcdayb ${k==='rest'?'rest':''}" onclick="bcDayOpen(${i})"><span class="bctri">${ic[0]}</span><span class="bcdayt"><b>${esc(bcDayLbl(k))}</b>${v!=null?`<span class="bctrb"><i style="width:${v}%"></i></span>`:`<small>${esc(ic[1])}</small>`}</span>${v!=null?`<span class="bcdayv">${v}</span>`:''}<span class="bcdayc" aria-hidden="true">›</span></button>`)})}}catch(e){console.error(e)}return v}}
