// =============== v5.0 · novo visual ===============
const V5T={
 noite:{n:'Noite',sub:'escuro e verde-limão',d:1,pat:'repeating-linear-gradient(90deg,#D9F24A 0 18px,#15120F 18px 22px,#F3ECDC 22px 26px,#15120F 26px 30px)',v:{bg:'#0E0C0A',app:'#15120F',card:'#1F1B17',card2:'#28231E',line:'#36312A',txt:'#F3ECDC',mut:'#A39C8E',acc:'#D9F24A',acc2:'#3DDC84',acctxt:'#15120F',good:'#3DDC84',bad:'#FF6B5B',gold:'#F2C14E',merow:'#2C3214',accsoft:'#D9F24A14',avbg1:'#36312A',avbg2:'#1F1B17',hdr1:'#15120F',hdr2:'#15120F',glow:'#0E0C0A'}},
 saibro:{n:'Saibro',sub:'terra batida, quente',d:1,pat:'repeating-linear-gradient(90deg,#F08A4B 0 12px,#FBE9DC 12px 14px)',v:{bg:'#1E0D07',app:'#2A140C',card:'#3A1D12',card2:'#472419',line:'#5C3324',txt:'#FBE9DC',mut:'#C9A592',acc:'#F08A4B',acc2:'#F7C873',acctxt:'#2A140C',good:'#8FE3A2',bad:'#FF7B6B',gold:'#F7C873',merow:'#55291A',accsoft:'#F08A4B1A',avbg1:'#5C3324',avbg2:'#3A1D12',hdr1:'#2A140C',hdr2:'#2A140C',glow:'#1E0D07'}},
 grama:{n:'Grama',sub:'verde e creme',d:1,pat:'repeating-linear-gradient(90deg,#2F6B3F 0 20px,#3E8450 20px 40px)',v:{bg:'#09180F',app:'#0F2418',card:'#173322',card2:'#1E3D2A',line:'#2C5038',txt:'#F4F1E4',mut:'#A8B9A6',acc:'#C9E36B',acc2:'#B79BEB',acctxt:'#0F2418',good:'#7EE3A0',bad:'#FF7A6E',gold:'#E8C766',merow:'#244A2E',accsoft:'#C9E36B1A',avbg1:'#2C5038',avbg2:'#173322',hdr1:'#0F2418',hdr2:'#0F2418',glow:'#09180F'}},
 dura:{n:'Quadra dura',sub:'azul elétrico',d:1,pat:'repeating-linear-gradient(135deg,#5BE0FF 0 8px,#0B1830 8px 16px)',v:{bg:'#060F22',app:'#0B1830',card:'#13254A',card2:'#1A2F5C',line:'#26407A',txt:'#EAF2FF',mut:'#93A8CC',acc:'#5BE0FF',acc2:'#FFD84D',acctxt:'#0B1830',good:'#5CF0A8',bad:'#FF6B7F',gold:'#FFD84D',merow:'#1B3A6E',accsoft:'#5BE0FF1A',avbg1:'#26407A',avbg2:'#13254A',hdr1:'#0B1830',hdr2:'#0B1830',glow:'#060F22'}},
 papel:{n:'Papel',sub:'claro, de jornal',d:0,pat:'repeating-linear-gradient(90deg,#15120F 0 2px,#F3ECDC 2px 8px)',v:{bg:'#E6DDC8',app:'#F3ECDC',card:'#FFFCF4',card2:'#ECE4D1',line:'#D6CCB6',txt:'#15120F',mut:'#625A4C',acc:'#15120F',acc2:'#A4441B',acctxt:'#F3ECDC',good:'#1D7A45',bad:'#B8322A',gold:'#8A5A00',merow:'#E3E9C2',accsoft:'#15120F10',avbg1:'#D6CCB6',avbg2:'#ECE4D1',hdr1:'#F3ECDC',hdr2:'#F3ECDC',glow:'#E6DDC8'}}};
Object.keys(THEMES).forEach(k=>delete THEMES[k]);
Object.assign(THEMES,{auto:{n:'Automático',sub:'muda com o piso da semana',v:{}}},V5T);
const V5SURF={hard:'dura',clay:'saibro',grass:'grama'};
function v5AutoKey(){try{if(!S||!S.me||MENU||S.ended)return'noite';let ev=null;if(S.tour)ev=curEv();else if(S.plan&&S.plan[S.w])ev=weekEvents(S.w).find(e=>e.key===S.plan[S.w]);const s=ev?ev.surf:surfOf(S.w%52);return V5SURF[s]||'noite'}catch(e){return'noite'}}
let V5VK=null;
applyTheme=function(k){if(!THEMES[k])k='auto';THEME=k;const vk=k==='auto'?v5AutoKey():k;MIN=true;V5VK=vk;const T=THEMES[vk],B=document.body.classList;[...B].filter(c=>c.startsWith('th-')).forEach(c=>B.remove(c));B.add('th-'+vk,'v5','min');B.remove('skin-tv','light');B.toggle('min-dark',!!T.d);B.toggle('min-light',!T.d);try{localStorage.setItem('breakpoint_theme5',k)}catch(e){}const r=document.documentElement.style;for(const[a,b]of Object.entries(T.v))r.setProperty('--'+a,b);r.setProperty('--pat',T.pat);try{const m=document.querySelector('meta[name=theme-color]');if(m)m.content=T.v.app}catch(e){}};
try{THEME=localStorage.getItem('breakpoint_theme5')||'auto'}catch(e){THEME='auto'}
applyTheme(THEME);
function v5ThemePicker(){return `<div class="v5themes">${Object.entries(THEMES).map(([k,t])=>{const vk=k==='auto'?null:k,T=vk?THEMES[vk]:null;const sw=T?`<u style="background:${T.pat}"></u><s style="background:${T.v.app}"><em style="background:${T.v.acc}"></em><em style="background:${T.v.card2}"></em></s>`:`<u style="background:linear-gradient(90deg,#5BE0FF 33%,#F08A4B 33% 66%,#3E8450 66%)"></u><s style="background:linear-gradient(90deg,#0B1830 33%,#2A140C 33% 66%,#0F2418 66%)"><em style="background:#5BE0FF"></em><em style="background:#F08A4B"></em><em style="background:#C9E36B"></em></s>`;return `<button class="v5th ${THEME===k?'on':''}" onclick="setTheme('${k}')" aria-pressed="${THEME===k}"><span class="sw">${sw}</span><span class="nm"><b>${t.n}</b><span>${t.sub}</span></span></button>`}).join('')}</div>`}

// ---- cabeçalho ----
let V5TL=null;
function v5Year(){const y0=S.w-S.w%52;if(V5TL&&V5TL.y0===y0&&V5TL.c===CIRC())return V5TL;const gs=[];for(let i=0;i<52;i++){try{if(weekEvents(y0+i).some(e=>e.tier==='GS'))gs.push(i)}catch(e){}}V5TL={y0,gs,c:CIRC()};return V5TL}
function v5Hdr(){const m=S.me,rp=myRank('pro'),rj=meAge()<=18?myRank('jr'):null,wk=S.w%52,Y=v5Year();
 if(!S._rk||S._rk.w!==S.w)S._rk={w:S.w,prev:S._rk?S._rk.cur:rp,cur:rp};else S._rk.cur=rp;
 const d=S._rk.prev&&rp?S._rk.prev-rp:0,dl=d?`<small style="color:${d>0?'var(--good)':'var(--bad)'}">${d>0?'▲':'▼'}${Math.abs(d)}</small>`:'';
 const live=S.tour&&!S.tour.over,ev=live?curEv():null;
 const rk=rp?`#${rp}${dl}`:rj?`#${rj}<small style="color:var(--mut)">JR</small>`:'—';
 const bar=(l,v,c)=>`<div class="st k5"><span class="k5l">${l}</span><div class="k5b"><i style="width:${clamp(v,0,100)}%;background:${c}"></i></div><b class="k5n">${Math.round(v)}</b></div>`;
 const segs=[];for(let i=0;i<52;i++){const c=[];if(i<wk)c.push('p');if(Y.gs.includes(i))c.push('gs');if(S.plan&&S.plan[Y.y0+i]&&i>wk)c.push('pl');if(i===wk)c.push('c');segs.push(`<i class="${c.join(' ')}"></i>`)}
 const nx=Y.gs.find(i=>i>=wk),nxt=nx==null?'temporada quase no fim':nx===wk?'semana de Grand Slam':`próximo Slam em ${nx-wk} sem.`;
 const conf=Math.round(m.conf??50),en=Math.round(m.energy);
 return `<div class="hdr v5h"><div class="v5pat"></div><div class="v5hin">
 <div class="v5top">${av(m.name,m.c,'sm',myAv())}<div class="v5who"><b>${esc(m.name)}</b><span>${meAge()} anos · ${esc(COUNTRIES[m.c][1])}${m.injury>0?` · lesionado ${m.injury} sem.`:''}</span></div>${live?`<span class="v5live">● AO VIVO</span>`:''}<button class="v5menu" aria-label="Abrir menu" onclick="INMENU=true;render()"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg></button></div>
 <div class="v5kpi"><div class="st k5"><span class="k5l">Ranking ${CIRC()}</span><b>${rk}</b></div><div class="st k5"><span class="k5l">Caixa</span><b style="${m.money<0?'color:var(--bad)':''}">${money(m.money).replace('US$ ','$').replace(' mil','k').replace(' mi','M')}</b></div>${bar('Energia',en,en<35?'var(--bad)':'var(--acc)')}${bar('Confiança',conf,conf<35?'var(--bad)':conf>=65?'var(--good)':'var(--gold)')}</div>
 <div class="v5tl"><div class="v5tlh"><span>${year()} · semana ${wk+1} de 52</span><span>${live&&ev?esc(ev.name):nxt}</span></div><div class="v5seg" aria-hidden="true">${segs.join('')}</div></div>
 </div></div>`}
function v5Nav(){const tabs=[['home','Semana'],['tour','Torneios'],['train','Equipe'],['social','Social'],['me','Carreira']];
 return `<div class="nav v5nav">${tabs.map(([k,l])=>{const on=TAB===k||(k==='me'&&TAB==='rank');const dot=(k==='home'&&S.tour&&!S.tour.over&&TAB!=='home')||(k==='social'&&dmUnread())||(k==='train'&&!S.me.coachId);const tut=S.tut!=null&&TUT[S.tut]&&(TUT[S.tut].tab===k||(k==='me'&&TUT[S.tut].tab==='rank'));return `<button class="${on?'on':''}${tut?' tutpulse':''}" onclick="go('${k}')" ${on?'aria-current="page"':''}>${dot?'<span class="dot"></span>':''}<span class="i">${NAVI[k]}</span>${l}</button>`}).join('')}</div>`}
{const _r0=render0;render0=function(){if(THEME==='auto'){const vk=v5AutoKey();if(vk!==V5VK)applyTheme('auto')}_r0();try{if(S&&S.me&&!MENU&&!S.ended){const a=document.getElementById('app');const h=a.querySelector(':scope > .hdr');if(h)h.outerHTML=v5Hdr();const n=a.querySelector(':scope > .nav');if(n)n.outerHTML=v5Nav();if(TAB==='home'&&!S.tour&&!INMENU&&!DRAWV){const b=v5Bar();if(b)a.insertAdjacentHTML('beforeend',b)}}}catch(e){console.error(e)}}}
{const _f=fabView;fabView=function(){if(S&&TAB==='home'&&!S.tour)return'';return _f()}}

// ---- pauta da semana ----
let PSEL=0,PSELW=-1;
const V5N={emp:['Marta','Helena','Otávio','Bruno','Lúcia'],fis:['Bia','Rafa','Duda','Caio','Lia'],fam:['Sua mãe','Seu pai','Sua avó','Seu irmão']};
function v5Team(){if(!S.v5tm){const r=a=>a[Math.floor(Math.random()*a.length)];S.v5tm={emp:r(V5N.emp),fis:r(V5N.fis),fam:r(V5N.fam)}}return S.v5tm}
function v5Who(kind){const m=S.me,c=myCoach(),T=v5Team(),f=STF();
 if(kind==='coach'&&c)return[c.n.split(' ')[0],'treinador'];if(kind==='coach')return['Você','sem treinador'];
 if(kind==='emp'&&f.agt)return[T.emp,'empresária'];
 if(kind==='emp'&&c)return[c.n.split(' ')[0],'treinador'];
 if(kind==='fis'&&(m.physio||0)>0)return[T.fis,'fisioterapia'];
 return[T.fam,'família']}
const v5ne=t=>String(t).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{FE0F}\u{200D}]/gu,'').replace(/\s+/g,' ').replace(/ ([,.])/g,'$1').trim();
const v5ini=n=>esc(n.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase());
const v5pick=a=>a[(S.w*7+a.length)%a.length];
function v5Props(){const D=decide(),m=S.me,L=[];
 const tagT=(t,c)=>`<span class="v5t ${c}">${t}</span>`;
 const evProp=(e,st,alt)=>{const T=TIERS[e.tier],fav=['hard','clay','grass'][m.fs??0]===e.surf,home=e.iso===COUNTRIES[m.c][0];let tp=null;try{tp=tripOf(e,myLoc(),!!st.main)}catch(x){}
  const w=v5Who(alt?'coach':'emp');const q=alt?v5pick(['Menos holofote, mais chance de ganhar jogos.','Lá você chega mais longe na chave.','Ritmo de jogo vale ouro agora.']):fav?v5pick(['É o seu piso. Dá para ir longe.','Nesse piso você joga em casa, mesmo longe.']):home?'Jogar com a torcida a favor muda tudo.':v5pick(['Os pontos desta semana valem muito.','É o torneio certo para o seu momento.','Cada vitória aqui sobe você no ranking.']);
  const tags=[tagT(`até ${T.pts[0]} pts`,'g'),tagT(st.main?'chave principal':'qualifying','n')];if(fav)tags.push(tagT('seu piso','g'));if(home)tags.push(tagT('em casa','g'));tags.push(tp&&tp.total?tagT(`viagem ${money(tp.total).replace('US$ ','$')}`,'m'):tagT('sem viagem','n'));if(m.energy<50)tags.push(tagT('energia baixa','b'));
  const sc=SURFC[e.surf]||['#555','#222'];
  return{w,t:`${st.main?'Jogar':'Tentar o qualifying de'} ${e.name}`,q,tags,band:`<div class="v5evband" style="background:linear-gradient(110deg,${sc[1]},${sc[0]})"><div style="flex:1;min-width:0"><span>${esc(tl(e.tier)).toUpperCase()} · ${SURF[e.surf].toUpperCase()}</span><br><b>${esc(e.name)}</b></div>${emb(e,40)}</div>`,a:`enter('${e.key}')`,cta:'Ir para o torneio'}};
 let bestKey=null;
 D.b.forEach(([lbl,act])=>{
  const em=/enter\('([^']+)'\)/.exec(act);
  if(em){const e=weekEvents(S.w).find(x=>x.key===em[1]);if(e){bestKey=e.key;L.push(evProp(e,entryStatus(e),false));return}}
  if(/^train\(/.test(act)){const E=planEst(),w=v5Who('coach'),c=myCoach();L.push({w,t:'Treinar a semana inteira',q:c?v5pick(['Uma semana boa de treino aparece no próximo torneio.','Vamos atacar o seu ponto fraco.','Sem jogo, a gente constrói jogo.']):'Sem treinador, o treino rende menos. Mas rende.',tags:[tagT('atributos ↑','g'),tagT(`energia ${E.en>=0?'+':''}${E.en}`,E.en>=0?'g':'b'),tagT(`carga ${E.ld>0?'+':''}${E.ld}`,E.ld>0?'b':'g')],a:act,cta:'Treinar'});return}
  if(/^rest\(/.test(act)){const w=v5Who('fis');L.push({w,t:m.injury>0?'Focar na recuperação':'Semana de descanso',q:m.injury>0?'O corpo primeiro. Volta mais forte.':m.energy<40?'Você está no limite. Descansar agora evita lesão.':'Um respiro também é estratégia.',tags:[tagT('energia +38','g'),tagT('carga −18','g'),tagT('sem evolução','n')],a:act,cta:m.injury>0?'Recuperar':'Descansar'});return}
  L.push({w:null,t:lbl.replace(/^[^\wÀ-ú]+/,''),q:'',tags:[],a:act,cta:'Confirmar'})});
 if(bestKey&&m.energy>=35&&!m.injury){const alt=weekEvents(S.w).map(e=>({e,st:entryStatus(e)})).filter(x=>x.st.ok&&x.e.key!==bestKey).map(x=>({...x,v:evScore(x.e,S.w)})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v)[0];if(alt){const p=evProp(alt.e,alt.st,true);L.splice(1,0,p)}}
 return{D,L}}
function v5Home(){const m=S.me;if(PSELW!==S.w){PSEL=0;PSELW=S.w}
 const{D,L}=v5Props();if(PSEL>=L.length)PSEL=0;
 const n=L.length;
 const props=L.map((p,i)=>`<button class="v5prop ${i===PSEL?'on':''}" onclick="PSEL=${i};render()" aria-pressed="${i===PSEL}">${p.w||i===PSEL?`<span class="v5who2">${p.w?`<span class="v5ini">${v5ini(p.w[0])}</span><span><b>${esc(p.w[0])}</b> · ${p.w[1]}</span>`:''}${i===PSEL?'<span class="v5stamp">ESCOLHIDO</span>':''}</span>`:''}${p.band||''}<span class="v5pt">${esc(p.t)}</span>${p.q?`<span class="v5q">“${p.q}”</span>`:''}${p.tags.length?`<span class="v5tags">${p.tags.join('')}</span>`:''}</button>`).join('');
 const W=wmGet();
 const metas=W&&W.L.length?`<div class="v5mini"><span class="v5k">Metas da semana</span>${W.L.map(x=>{const ok=x.ok||wmTest(x.id);return `<div class="v5chk ${ok?'ok':''}"><i>${ok?'✓':''}</i><span>${WMP[x.id][0]}</span></div>`}).join('')}</div>`:'';
 const rv=rival();let rivc='';if(rv){const[hw,hl]=h2h(rv.id);rivc=`<div class="v5mini"><span class="v5k">Rival</span><b>${flag(rv.c)} ${esc(rv.n)}</b><span class="small mut">${rkOf(rv.id)} · confrontos ${hw}–${hl}</span></div>`}
 const pend=pendings();
 const grade=t=>/🏆|campe[ãa]o?|título|conquist/i.test(t)?'A':/final|semifinal|recorde|top ?\d/i.test(t)?'B':/les[ãa]o|perdeu|elimina|caiu|derrota|vermelho/i.test(t)?'D':/qualif|estreia|contrat|patroc/i.test(t)?'C':'x';
 const feed=S.news.slice(0,5).map(nw=>{const tx=nw.t.replace(/<[^>]+>/g,'').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{FE0F}\u{200D}]/gu,'').replace(/\s+/g,' ').trim();const g=grade(tx);return `<div><span class="gr ${g}">${g==='x'?'·':g}</span><span>${esc(tx)}<small>${dateOf(nw.w)}</small></span></div>`}).join('');
 const inc=fedSupport()+sponPay()+brandInc(),cost=weekCost(),dg=digestCard(),tv=tvCard();
 return legCard()+specialCard()
 +`<section><span class="v5k a">Pauta da semana · ${n} ${n===1?'caminho':'caminhos'}</span><h1 class="v5h1">${esc(D.t.replace(/^[^\wÀ-ú]+/,''))}</h1>${D.d?`<p class="v5lede">${v5ne(D.d)}</p>`:''}<div class="v5p">${props}</div>
 ${S.busy!==S.w?`<div class="v5links"><button onclick="TOURTAB='week';go('tour')">Ver todos os torneios</button><button ${S.modals.length?'disabled':''} onclick="quickSim()">Avançar várias semanas</button></div>`:''}</section>`
 +(metas||rivc?`<div class="v5sec"><span class="v5k">Esta semana</span></div><div class="v5g2">${metas}${rivc}</div>`:'')
 +(pend.length?`<div class="v5sec"><span class="v5k">Na mesa · ${pend.length}</span></div>${pend.map(([e,t,a])=>`<button class="pend" onclick="${a}"><span>${t}</span><i>›</i></button>`).join('')}`:'')
 +(feed?`<div class="v5sec"><span class="v5k">Agora no circuito</span></div><div class="card v5feed" style="padding:4px 16px">${feed}</div>`:'')
 +`<div class="v5sec"><span class="v5k">Mais</span></div>`+dashCard()
 +((dg||tv)?acc('week','Resumo do tênis',S.tv&&S.tv.L.length?`${S.tv.L.length} finais`:'resumo',dg+tv,false):'')
 +acc('agenda','Sua agenda',(()=>{const k=Object.keys(S.plan).filter(w=>+w>=S.w).length;return k?`${k} agendado(s)`:'nada agendado'})(),agendaCard(),false)
 +(S.goals?acc('goals','Metas da temporada',`${S.goals.map(goalProg).filter(x=>x.ok).length}/3`,goalsCard(),false):'')
 +cnAcc()+(rv?acc('rival','Rival',`${esc(rv.n.split(' ').slice(-1)[0])}`,rivalCard(),false):'')
 +acc('fin','Finanças',`${inc-cost>=0?'+':'−'}${money(Math.abs(inc-cost))}/sem`,`<div class="g3"><div class="pill"><b class="win">+${kfmt(inc)}</b><span>Receitas</span></div><div class="pill"><b class="loss">−${kfmt(cost)}</b><span>Custos</span></div><div class="pill"><b>${m.spons.length}/3</b><span>Patrocínios</span></div></div><p class="xs mut" style="margin:10px 0 0">${v5CutTxt()}. Fora do seu país, o torneio retém imposto na fonte (até 18% com os acordos), e vale o maior entre esse e o imposto do seu país.</p>`,false)}
function v5Bar(){if(!S||S.tour||S.ended)return'';let L;try{L=v5Props().L}catch(e){return''}if(!L.length)return'';const p=L[Math.min(PSEL,L.length-1)];const dis=S.modals.length?'disabled':'';
 return `<div class="v5bar"><div class="v5bl"><b>Semana ${S.w%52+1}</b><span>${esc(p.t)}</span></div><button ${dis} onclick="${p.a.replace(/"/g,'&quot;')}">${/^enter\(/.test(p.a)?'Inscrever →':/^(train|rest|endWeek)\(/.test(p.a)?'Fechar a semana →':'Confirmar →'}</button></div>`}
{const _h=homeView;homeView=function(){if(S.tour||S.ended||DRAWV)return _h();try{return v5Home()}catch(e){console.error(e);return _h()}}}

// ---- dia de jogo ----
function v5Match(){const m=S.me,T=S.tour,ev=curEv(),opp=oppOf(),p=IDX.get(opp),[hw,hl]=h2h(opp),isRv=opp===S.rival;
 const stage=T.q?`Qualifying · rodada ${T.q.step+1} de ${T.q.n}`:roundName(T.br.length);
 let wp=null;try{wp=winProb(opp)}catch(e){}
 const sc=SURFC[ev.surf]||['#3f7fd6','#173c75'],c=myCoach(),bt=bestTac(opp,ev.surf),sug=c&&c.q>=3?bt:null;
 const form=S.hist.filter(h=>h.tier!=='TEAM').slice(0,5).reverse();
 const fchips=form.length?form.map(h=>`<span class="v5wl ${h.win?'w':'l'}">${h.win?'V':'D'}</span>`).join(''):'<span class="small mut">Ainda sem partidas.</span>';
 const myR=myRank('pro'),pm=(m.pmode||'key');
 const tip=c?(c.q>=3?`${TAC[bt].d}`:`Talvez ${TAC[bt].n.toLowerCase()} funcione. Treinadores com 3 estrelas ou mais leem melhor o jogo.`):'Sem treinador, sem leitura do adversário.';
 const tacs=Object.entries(TAC).map(([k,t])=>`<button class="v5tac ${(m.tac||'equil')===k?'on':''}" onclick="setOpt('tac','${k}')" aria-pressed="${(m.tac||'equil')===k}"><b>${t.n}</b><span>${sug===k?'<em>sugestão do treinador</em>':esc(t.d.split('.')[0])}</span></button>`).join('');
 const extra=anaCard(opp)+h2hCard(opp)+tenCard(ev)+(!T.q?`<div class="sec-t" style="margin-top:12px">Sessão</div><div class="chips">${[['dia','Dia'],['noite','Noite']].map(([k,l])=>`<button class="${(T.sess||'dia')===k?'on':''}" onclick="pickSess('${k}')">${l}</button>`).join('')}</div><div class="xs mut">${(T.sess||'dia')==='noite'?'Mais público e, em casa, mais apoio. Sem o calor do dia.':'No calor, quem tem bom físico leva vantagem.'}${T.sessMsg?' '+T.sessMsg:''}</div>`:'');
 return `<section><span class="v5k a">${esc(tl(ev.tier))} · ${SURF[ev.surf]} · ${esc(stage)}${isRv?(S.rvRev?' · revanche':' · clássico'):''}</span><h1 class="v5h1">${esc(ev.name)}</h1><p class="v5lede" style="font-style:italic">${esc(ev.city)}${T.sess==='noite'?' · sessão noturna':''} · dia de jogo</p></section>
 <div class="v5vs" style="--s1:${sc[0]};--s2:${sc[1]}"><div class="v5vsp">
  <div class="v5pl">${av(m.name,m.c,'lg',myAv())}<b>${esc(m.name)}</b><span>${myR?'#'+myR:'sem ranking'} · ${meAge()} anos</span></div>
  <div class="v5x">VS</div>
  <div class="v5pl" onclick="openP(${p.id})" style="cursor:pointer">${av(p.n,p.c,'lg '+(isRv?'rv':'md'),pAv(p))}<b>${esc(p.n)}</b><span>${rkOf(opp)} · ${ageOf(p)} anos</span></div>
 </div><div class="v5vss"><div><span>Confrontos</span><b>${hw}–${hl}</b></div><div><span>Chance</span><b style="color:${wp==null?'inherit':wp>=50?'var(--good)':'var(--gold)'}">${wp==null?'—':wp+'%'}</b></div><div><span>Estilo dele</span><b style="font-size:14px">${oppStyle(p)}</b></div></div></div>
 <div class="v5sec"><span class="v5k">Sua forma</span><span class="v5k">nível ${ovr().toFixed(0)} × ${Math.round(p.r)}</span></div><div class="v5form">${fchips}</div>
 <div class="v5coach"><span class="v5ini">${c?v5ini(c.n):'—'}</span><span>${c?`<b>${esc(c.n.split(' ')[0])}:</b> `:''}${tip}</span></div>
 <div class="v5sec"><span class="v5k">Plano de jogo</span></div><div class="v5tacs">${tacs}</div>
 ${extra.trim()?acc('v5ext','Análise e detalhes','corda, sessão, rival',extra,false):''}
 <div class="v5sec"><span class="v5k">Como jogar</span></div><div class="chips" style="margin-top:0">${[['key','Pontos decisivos'],['all','Todos os pontos'],['sim','Só assistir']].map(([k,l])=>`<button class="${pm===k?'on':''}" onclick="S.me.pmode='${k}';save();render()">${l}</button>`).join('')}</div>
 <button class="full big" style="margin-top:10px" onclick="goMatch('${pm==='sim'?'sim':'court'}')">${pm==='sim'?'Assistir à partida':'Entrar em quadra'}</button>
 <button class="sec full" style="margin-top:8px" onclick="simAll()">Simular o torneio inteiro</button>
 <div class="v5sec"><span class="v5k">Seu torneio</span></div><div class="card"><div class="log">${T.log.map(l=>`<div class="${l.c}">${l.t}</div>`).join('')||'<div class="mut">A primeira partida ainda não começou.</div>'}</div></div>${T.brs?`<button class="sec full" style="margin-bottom:12px" onclick="DRAWV=true;DRWR=Math.max(0,S.tour.brs.length-1);render();window.scrollTo(0,0)">Ver a chave completa</button>`:''}${pastChampsCard(ev)}`}
{const _t=tourLive;tourLive=function(){try{const T=S.tour;if(T&&!T.over&&oppOf()!=null)return v5Match()}catch(e){console.error(e)}return _t()}}

// ---- resultado ----
let V5PRE=null,V5J=null;
{const _g=goMatch;goMatch=function(k){const m=S.me;V5PRE={money:m.money,en:m.energy,conf:m.conf??50,fol:m.fol};return _g(k)}}
function v5Stamp(L){const r=L.res,T=S.tour,rr=T&&T.over?S.results[0]:null;if(r.ret)return'ABANDONO';if(r.win&&rr&&rr.r==='Campeão')return G('CAMPEÃO','CAMPEÃ');if(!r.win&&L.stage==='Final')return'VICE';const or=RK.pro[L.opp],mr=myRank('pro')||999;if(r.win&&or&&or<=mr/2&&or<=150)return'ZEBRA';if(r.win&&r.sets[0]&&r.sets[0][0]<r.sets[0][1])return'VIRADA';if(r.win&&r.sets.some(x=>x[0]===6&&x[1]===0))return'PNEU';if(r.win&&r.sets.every(x=>x[0]>x[1])&&r.sets.length>=2)return'SEM PERDER SET';return''}
function v5Notable(L){const r=L.res,T=S.tour,rr=T&&T.over?S.results[0]:null,t=TIERS[L.ev.tier]||{w:1};if(L.ev.tier==='TEAM')return false;if(r.win&&rr&&rr.r==='Campeão')return true;if(L.stage==='Final')return true;if(r.win&&L.stage==='Semifinal')return true;if(r.win&&/^Quartas/.test(L.stage)&&t.w>=1)return true;const or=RK.pro[L.opp],mr=myRank('pro')||999;return !!(r.win&&or&&or<=Math.min(30,mr/2))}
function v5Res(){const L=LIVE,r=L.res,a=r.st.a,b=r.st.b,p=IDX.get(L.opp),m=S.me,win=r.win,T=S.tour;
 const pc=(x,y)=>y?Math.round(x/y*100):0,stamp=v5Stamp(L);
 let next='';if(T){if(T.over){const rr=S.results[0];next=rr&&rr.r==='Campeão'?`${G('Campeão','Campeã')} do ${L.ev.name}`:`Fim do torneio${rr?` · ${rr.r}${rr.p?` · +${rr.p} pts`:''}`:''}`}else if(T.q)next=`Próxima: qualifying, rodada ${T.q.step+1}`;else if(T.br&&win)next=`Próxima: ${roundName(T.br.length)}`}
 const pts=(r.tl||[]).filter(e=>e.aw!=null&&e.ev!=='match');const n=pts.length,cols=n>220?20:16;
 const grid=pts.map((e,i)=>{const k=e.aw?(e.ev==='ace'&&e.srv?'a':e.ev==='brk'?'k':'g'):'l';return `<i class="${k}" style="animation-delay:${Math.min(i*7,1800)}ms"></i>`}).join('');
 let run=0,best=0;pts.forEach(e=>{run=e.aw?run+1:0;best=Math.max(best,run)});
 const won=pts.filter(e=>e.aw).length;
 const moms=[];if(best>=5)moms.push(['Sequência',`${best} pontos seguidos sem perder nenhum.`]);moms.push(['Quebras',a.bpo?`Converteu ${a.bpw} de ${a.bpo} break points.`:'Nenhuma chance de quebra no jogo.']);moms.push(['Saque',`${a.ace} aces e ${pc(a.f1w,a.f1)}% dos pontos com o 1º saque.`]);
 const P=V5PRE,chg=[];if(P){const dm=m.money-P.money,de=Math.round(m.energy-P.en),dc=Math.round((m.conf??50)-P.conf),df=m.fol-P.fol;if(dm>0)chg.push([`+${money(dm)}`,'g']);if(T&&T.over&&S.results[0]&&S.results[0].p)chg.push([`+${S.results[0].p} pts no ranking`,'g']);if(dc)chg.push([`confiança ${dc>0?'+':''}${dc}`,dc>0?'g':'b']);if(de)chg.push([`energia ${de>0?'+':''}${de}`,de>0?'g':'b']);if(df>0)chg.push([`+${kfmt(df)} seguidores`,'g'])}
 const sets=r.sets.map(x=>x);const cell=(v,w,tb)=>`<td class="${w?'w':''}">${v}${tb!=null?`<sup>${tb}</sup>`:''}</td>`;
 const row=me=>`<tr><th>${esc(me?m.name:p.n)}<small>${me?(myRank('pro')?'#'+myRank('pro'):''):rkOf(L.opp)}</small></th>${sets.map(x=>cell(me?x[0]:x[1],me?x[0]>x[1]:x[1]>x[0],x[2]!=null&&(me?x[0]<x[1]:x[1]<x[0])?x[2]:null)).join('')}</tr>`;
 const note=v5Notable(L);if(note)L.v5j=1;
 const stats=`${statRow('Aces',a.ace,b.ace)}${statRow('Duplas faltas',a.df,b.df,null,null,false)}${statRow('1º saque em quadra',pc(a.f1,a.sp),pc(b.f1,b.sp),pc(a.f1,a.sp)+'%',pc(b.f1,b.sp)+'%')}${statRow('Pontos com 1º saque',pc(a.f1w,a.f1),pc(b.f1w,b.f1),pc(a.f1w,a.f1)+'%',pc(b.f1w,b.f1)+'%')}${statRow('Pontos com 2º saque',pc(a.s2w,a.s2),pc(b.s2w,b.s2),pc(a.s2w,a.s2)+'%',pc(b.s2w,b.s2)+'%')}${statRow('Break points',a.bpw,b.bpw,`${a.bpw}/${a.bpo}`,`${b.bpw}/${b.bpo}`)}${statRow('Winners',a.win,b.win)}${statRow('Erros não forçados',a.ue,b.ue,null,null,false)}${statRow('Pontos ganhos',a.pts,b.pts)}`;
 return `<div class="v5res"><div class="v5pat"></div><div class="v5resin">
 <span class="v5k" style="color:var(--acc)">${esc(L.ev.name)} · ${esc(L.stage)}${typeof bcCourtTag==='function'?bcCourtTag(L.ev,L.stage,L.opp):''} · ${Math.floor(r.st.dur/60)}h${String(r.st.dur%60).padStart(2,'0')}</span>
 <div class="v5big ${win?'w':'l'}">${win?'Vitória':r.ret?'Abandono':'Derrota'}${stamp?`<span class="v5stamp2">${stamp}</span>`:''}</div>
 <table class="v5sb">${row(true)}${row(false)}</table>
 ${next?`<div class="v5next">${esc(next)}</div>`:''}
 ${n?`<div class="v5sec"><span class="v5k">Ponto a ponto · ${n} pontos</span><span class="v5k">${won}–${n-won}</span></div><div class="v5grid" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${grid}</div><div class="v5leg"><span><i class="g"></i>ganho</span><span><i class="l"></i>perdido</span><span><i class="a"></i>ace</span><span><i class="k"></i>quebra</span></div>`:''}
 <div class="v5sec"><span class="v5k">Momentos</span></div><div class="v5mom">${moms.map(([k,t])=>`<div><span>${k}</span><p>${t}</p></div>`).join('')}</div>
 ${chg.length?`<div class="v5sec"><span class="v5k">O que mudou</span></div><div class="v5tags">${chg.map(([t,c])=>`<span class="v5t ${c}" style="font-size:13px;padding:6px 10px">${t}</span>`).join('')}</div>`:''}
 
 <div style="margin-top:16px">${acc('v5st','Estatísticas completas',`${a.pts}–${b.pts} pontos`,stats,false)}</div>${courtInterview(L)}${smapCard(r)}${replayCard()}
 <button class="sec full" style="margin-top:4px" onclick="shareResult()">Compartilhar resultado</button>
 <div class="v5resbtn">${note?`<button class="full big" onclick="v5OpenJ()">Ler o jornal de amanhã →</button><button class="sec full" onclick="closeLive()">Continuar</button>`:`<button class="full big" onclick="closeLive()">Continuar →</button>`}</div>
 </div></div>`}
{const _ri=resultInner;resultInner=function(){try{return v5Res()}catch(e){console.error(e);return _ri()}}}

// ---- o jornal do dia seguinte ----
const V5COL=['Clara Moura','Joaquim Reis','Ana Bittencourt','Téo Valadares'];
function v5MakeJ(L){const r=L.res,m=S.me,p=IDX.get(L.opp),T=S.tour,rr=T&&T.over?S.results[0]:null,champ=r.win&&rr&&rr.r==='Campeão';
 const fn=m.name.split(' ')[0],ln=m.name.split(' ').slice(-1)[0],on=p.n.split(' ').slice(-1)[0],or=RK.pro[L.opp],city=L.ev.city,age=meAge(),st=v5Stamp(L);
 const sc=r.sets.map(x=>`${x[0]}/${x[1]}`).join(' ');
 let h;if(champ)h=v5pick([`${m.name} é ${G('campeão','campeã')} em ${city}`,`Título! ${fn} ${ln} conquista o ${L.ev.name}`]);
 else if(!r.win&&L.stage==='Final')h=`${ln} para na final, mas sai de ${city} maior do que chegou`;
 else if(!r.win)h=`${ln} cai em ${city} e promete voltar mais forte`;
 else if(st==='ZEBRA'&&or)h=`Aos ${age} anos, ${ln} derruba o nº ${or} em ${city}`;
 else if(st==='VIRADA')h=`${ln} vira o jogo contra ${on} e segue vivo em ${city}`;
 else h=`${ln} vence ${on} e avança à ${T&&T.br?roundName(T.br.length).toLowerCase():'próxima fase'} em ${city}`;
 const sub=`${r.win?'Vitória':'Derrota'} por ${sc} em ${Math.floor(r.st.dur/60)}h${String(r.st.dur%60).padStart(2,'0')}. ${champ?`${rr.p?`São ${rr.p} pontos no ranking.`:''}`:r.win&&T&&T.br?`Agora vem a ${roundName(T.br.length).toLowerCase()}.`:''}`;
 const a=r.st.a,q1=r.win?v5pick(['Eu sabia que ia ter uma chance. Só precisava estar pronto quando ela viesse.','Joguei um ponto de cada vez. Hoje deu certo.','A torcida me empurrou nos momentos difíceis.','Treinamos exatamente isso a semana inteira.']):v5pick(['Dói, mas eu aprendi mais hoje do que em muitas vitórias.','Ele foi melhor nos pontos importantes. Volto mais forte.','Faltou pouco. E pouco, no tênis, é muito.']);
 const p1=`${fn} terminou com ${a.ace} aces e ${a.win} winners${a.bpo?`, convertendo ${a.bpw} de ${a.bpo} break points`:''}. Foram ${a.pts} pontos ganhos contra ${r.st.b.pts} do adversário.`;
 const op=r.win?v5pick(['Tem cabeça de quem já jogou muita final.','O circuito precisa prestar atenção nesse nome.','Ganhou jogando feio quando precisou. Isso é raro.','Se mantiver o físico, vai longe.']):v5pick(['A derrota ensina o que o treino não mostra.','Ainda falta consistência, mas o talento está ali.','Perdeu, mas mostrou que pertence a esse nível.']);
 const rk=myRank('pro');let rl=[];if(rk){const inv={};Object.entries(RK.pro).forEach(([id,v])=>{if(v)inv[v]=id});rl=[rk-1,rk,rk+1].filter(x=>x>0&&inv[x]).map(x=>{const id=inv[x];return[x,id==='me'?m.name:(IDX.get(+id)||{n:'—'}).n,id==='me']})}
 const more=S.news.slice(0,6).map(nw=>v5ne(nw.t.replace(/<[^>]+>/g,''))).filter(t=>!t.includes(ln)).slice(0,2);
 return{h,sub,p1,q1,op,col:v5pick(V5COL),rl,more,surf:L.ev.surf,sec:`${tl(L.ev.tier)} · ${L.stage}`,w:S.w}}
function v5OpenJ(){try{V5J=v5MakeJ(LIVE)}catch(e){console.error(e);V5J=null}closeLive()}
function v5JView(){const J=V5J,sc=SURFC[J.surf]||['#3f7fd6','#173c75'];
 return `<div class="v5j" role="dialog" aria-label="Jornal do dia seguinte"><div class="v5jin">
 <div class="v5jm"><span>${dateOf(J.w).toUpperCase()} · EDIÇÃO ${1000+J.w}</span><b>GAZETA DA QUADRA</b><em>o jornal do circuito, desde o seu primeiro saque</em></div>
 <div class="v5jn"><span>ESPORTES</span><span>RANKING</span><span>OPINIÃO</span><span>CIRCUITO</span></div>
 <span class="v5jk">${esc(J.sec).toUpperCase()}</span><h1>${esc(J.h)}</h1><p class="v5js">${esc(J.sub)}</p>
 <svg role="img" aria-label="Ilustração de uma quadra de tênis vista de cima" viewBox="0 0 354 170" style="width:100%;height:auto;border-radius:4px;display:block"><rect width="354" height="170" fill="${sc[1]}"/><rect x="40" y="20" width="274" height="130" fill="${sc[0]}" stroke="#F3ECDC" stroke-width="2.5"/><line x1="40" y1="36" x2="314" y2="36" stroke="#F3ECDC" stroke-width="2"/><line x1="40" y1="134" x2="314" y2="134" stroke="#F3ECDC" stroke-width="2"/><line x1="177" y1="20" x2="177" y2="150" stroke="#15120F" stroke-width="4"/><line x1="105" y1="36" x2="105" y2="134" stroke="#F3ECDC" stroke-width="2"/><line x1="249" y1="36" x2="249" y2="134" stroke="#F3ECDC" stroke-width="2"/><line x1="105" y1="85" x2="249" y2="85" stroke="#F3ECDC" stroke-width="2"/><circle cx="226" cy="58" r="6" fill="#D9F24A"/><path d="M226 58 C 200 70, 150 90, 92 118" stroke="#D9F24A" stroke-width="2" stroke-dasharray="4 5" fill="none"/></svg>
 <div class="v5jc"><p>${esc(J.p1)}</p><p>“${esc(J.q1)}”, disse na zona mista, ainda suado.</p></div>
 <div class="v5jg">${J.rl.length?`<div><span class="v5jk">RANKING AO VIVO</span>${J.rl.map(([r,n,me])=>`<div class="v5jr ${me?'me':''}"><span>${r} · ${esc(n)}</span></div>`).join('')}</div>`:''}<div><span class="v5jk">OPINIÃO</span><p class="v5jo">“${esc(J.op)}”</p><small>${J.col}, colunista</small></div></div>
 ${J.more.length?`<div class="v5jt"><span class="v5jk">TAMBÉM NESTA EDIÇÃO</span>${J.more.map(t=>`<p>${esc(t)}</p>`).join('')}</div>`:''}
 <button class="full big v5jb" onclick="V5J=null;render();window.scrollTo(0,0)">Voltar para a semana</button></div></div>`}
{const _r1=render0;render0=function(){_r1();try{if(V5J&&S&&!MENU){document.getElementById('app').insertAdjacentHTML('beforeend',v5JView())}}catch(e){console.error(e);V5J=null}}}

// ---- temporada ----
function v5Season(){const m=S.me,y=year(),y0=S.w-S.w%52,wk=S.w%52;
 const H=(m.hx||[]).filter(r=>r[0]>=y0&&r[1]).map(r=>[r[0]-y0,r[1]]);const rp=myRank('pro');if(rp)H.push([wk,rp]);
 let chart='';if(H.length>=2){const mx=Math.max(...H.map(x=>x[1])),mn=Math.min(...H.map(x=>x[1]));const sy=v=>mx===mn?45:10+(v-mn)/(mx-mn)*70;const pts=H.map(([w,v])=>`${(w/51*320).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');const L=H[H.length-1];
  chart=`<svg role="img" aria-label="Ranking ao longo de ${y}: de ${H[0][1]} para ${L[1]}" viewBox="0 0 320 90" style="width:100%;height:auto;margin-top:6px"><polyline points="${pts}" fill="none" stroke="var(--txt)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${(L[0]/51*320).toFixed(1)}" cy="${sy(L[1]).toFixed(1)}" r="6" fill="var(--acc)"/><text x="2" y="${Math.max(12,sy(H[0][1])-6)}" fill="var(--mut)" style="font:500 10px var(--fm)">#${H[0][1]}</text></svg>`}
 const Hh=S.hist.filter(h=>h.w>=y0&&h.tier!=='TEAM'),v=Hh.filter(h=>h.win).length,tt=(m.st.titles||[]).filter(t=>t.y===y).length;
 const gr=r=>r==='Campeão'?['S','var(--acc)']:/^Final|Vice/.test(r)?['A','var(--good)']:/Semi/.test(r)?['A','var(--good)']:/Quartas/.test(r)?['B','var(--gold)']:/Oitavas/.test(r)?['C','var(--gold)']:['D','var(--bad)'];
 const res=S.results.filter(r=>r.y===y).slice(0,6).map(r=>{const[g,c]=gr(r.r);return `<div class="v5srow"><span class="v5gr" style="color:${c};border-color:${c}">${g}</span><span class="v5sn"><b>${esc(r.n)}</b><small>${esc(tl(r.tier))} · ${esc(r.r)}${r.p?` · +${r.p} pts`:''}</small></span></div>`}).join('');
 const nx=Object.keys(S.plan).map(Number).filter(w=>w>S.w).sort((a,b)=>a-b).slice(0,3).map(w=>{const e=weekEvents(w).find(x=>x.key===S.plan[w]);if(!e)return'';const c=(SURFC[e.surf]||['#888'])[0];return `<div class="v5srow fut"><span class="v5sb2" style="background:${c}"></span><span class="v5sn"><b>${esc(e.name)}</b><small>${wkDate(w)} · ${esc(tl(e.tier))} · ${SURF[e.surf]}</small></span></div>`}).join('');
 return `<section style="margin-bottom:14px"><span class="v5k a">Temporada ${y}</span><h1 class="v5h1" style="font-size:24px">${rp?(rp<=10?'No topo do mundo':rp<=50?'Entre os melhores':rp<=100?'Rumo ao top 50':rp<=250?'Rumo ao top 100':'Subindo degraus'):'Começando a jornada'}</h1>
 <div class="card" style="margin-top:12px"><div class="row sb"><b style="font-weight:900;font-size:30px;font-stretch:118%">${rp?'#'+rp:'—'}</b><span class="v5k">semana ${wk+1} de 52</span></div>${chart}<div class="g3" style="margin-top:10px"><div class="pill"><b>${v}–${Hh.length-v}</b><span>V–D</span></div><div class="pill"><b>${tt}</b><span>Títulos</span></div><div class="pill"><b>${S.results.filter(r=>r.y===y).length}</b><span>Torneios</span></div></div></div>
 ${res?`<div class="v5sec"><span class="v5k">Nota por torneio</span></div>${res}`:''}${nx?`<div class="v5sec"><span class="v5k">Próximos na agenda</span></div>${nx}`:''}</section>`}


// =============== v5.0 · estilo em todo o jogo ===============
let EMOJI_T=null;
deEmoji=function(root){if(!MIN||!root)return;if(!EMOJI_T)EMOJI_T=new RegExp(EMOJI_RE.source,'u');const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||p.closest('.fl,svg,.thm,.v5keep,textarea,script,style,.ic'))return NodeFilter.FILTER_REJECT;return EMOJI_T.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});const L=[];let n;while(n=tw.nextNode())L.push(n);
 for(const t of L){const v=t.nodeValue.replace(/(\d)\s?⚡\s?energia/g,'$1 de energia').replace(/(\d)\s?⚡/g,'$1 de energia').replace(EMOJI_RE,'');if(!v.trim()){const el=t.parentElement;if(!el||!el.textContent.replace(t.nodeValue,'').trim())continue}t.nodeValue=v}};
const v5Head=(k,t,l)=>`<section class="v5head"><span class="v5k a">${k}</span><h1 class="v5h1 v5h1s">${t}</h1>${l?`<p class="v5lede">${l}</p>`:''}</section>`;
const v5tabify=s=>s.replace('<div class="chips" style="margin-top:0">','<div class="chips v5tabs" style="margin-top:0">');
// barra de ação em todas as abas
fabView=function(){return''};
function v5BarAll(){if(!S||!S.me||S.ended||MENU||IM||LIVE||INMENU||S.modals.length)return'';if(TAB==='home'&&!S.tour)return v5Bar();
 if(TAB==='home'&&S.tour)return'';const fut=Object.keys(S.plan).some(w=>+w>=S.w);let lbl,sub;
 if(S.tour){const ev=curEv();lbl='Ir para a partida';sub=ev?ev.name:'Torneio em andamento'}else if(S.busy===S.w){lbl='Avançar semana';sub=S.busyName||'Semana ocupada'}else if(fut){lbl='Avançar até o torneio';const w=Object.keys(S.plan).map(Number).filter(w=>w>=S.w).sort((a,b)=>a-b)[0];const e=weekEvents(w).find(x=>x.key===S.plan[w]);sub=e?`${e.name} · ${wkDate(w)}`:'próximo torneio'}else{lbl='Ver a pauta';sub='decisões da semana';return `<div class="v5bar"><div class="v5bl"><b>Semana ${S.w%52+1}</b><span>${sub}</span></div><button onclick="go('home')">${lbl} →</button></div>`}
 return `<div class="v5bar"><div class="v5bl"><b>Semana ${S.w%52+1}</b><span>${esc(sub)}</span></div><button onclick="fabAdvance()">${lbl} →</button></div>`}
{const _r2=render0;render0=function(){_r2();try{if(S&&S.me&&!MENU&&!S.ended&&TAB!=='home'){const b=v5BarAll();if(b)document.getElementById('app').insertAdjacentHTML('beforeend',b)}}catch(e){console.error(e)}}}

// torneios
{const _tv=tourView;tourView=function(){let s=_tv();if(S.tour)return v5Head(`Circuito ${CIRC()} · ${year()}`,'Torneios','')+v5tabify(s);return v5Head(`Circuito ${CIRC()} · ${year()}`,'Torneios','')+v5tabify(s)}}
tourWeekView=(f=>function(){const b=f();try{if(TOURTAB!=='week')return b;const i=b.indexOf('<div class="chips" style="margin-top:0">');if(i<0)return v5Season()+b;let d=0,j=i;const re=/<\/?div\b/g;re.lastIndex=i;let mm;while(mm=re.exec(b)){d+=mm[0]==='<div'?1:-1;if(d===0){j=b.indexOf('>',mm.index)+1;break}}return b.slice(0,j)+v5Season()+b.slice(j)}catch(e){return b}})(tourWeekView);
// equipe
function v5Roster(){const m=S.me,c=myCoach(),f=STF(),T=v5Team();
 const P=[[c?c.n:'Vago','Treinador',c?'★'.repeat(c.q):'contrate',!!c,'coach'],[(m.physio||0)>0?T.fis:'Vago','Fisioterapia',PHYSIO[m.physio||0].n.replace('Sem fisioterapeuta','contrate'),(m.physio||0)>0,'physio'],[f.agt?T.emp:'Vago','Empresário',STAFF.agt.L[f.agt||0][0],!!f.agt,'staff'],[f.psy?'Psicólogo':'Vago','Mental',STAFF.psy.L[f.psy||0][0],!!f.psy,'staff'],[f.nut?'Nutricionista':'Vago','Nutrição',STAFF.nut.L[f.nut||0][0],!!f.nut,'staff']];
 if(STAFF.ana)P.push([f.ana?'Analista':'Vago','Análise',STAFF.ana.L[f.ana||0][0],!!f.ana,'staff']);
 return `<div class="v5roster">${P.map(([n,r,d,on,k])=>`<button class="v5mem ${on?'on':''}" onclick="ACCO['${k}']=true;render();setTimeout(()=>{const e=document.querySelector('#v5acc-${k}');if(e)e.scrollIntoView({behavior:'smooth',block:'start'})},30)"><span class="v5ini">${on?v5ini(n):'+'}</span><b>${esc(n.split(' ')[0])}</b><span>${r}</span><small>${esc(d)}</small></button>`).join('')}</div>`}
{const _tr=trainView;trainView=function(){let s=_tr();s=s.replace(/<div class="card dec"><div class="mk">Sua semana<\/div>[\s\S]*?<\/button><\/div><\/div>/,'');const E=planEst(),I=S.me.wint||'mod';return v5Head('Sua equipe','Equipe',`Plano atual: ${E.tr} dias de treino, intensidade ${INT[I].n.toLowerCase()}. Ajuste uma vez e o jogador segue sozinho.`)+v5Roster()+s}}
// social
{const _sv=socialView;socialView=function(){let s=_sv();const tp=tip('social');if(tp&&s.startsWith(tp))s=s.slice(tp.length);const un=dmUnread();s=s.replace(/<div class="igapp">[\s\S]*?<\/span><\/span><\/div>/,`<div class="igapp v5ig"><div><span class="v5k a">Rede social</span><h1 class="v5h1 v5h1s" style="margin:2px 0 0">Quadra</h1></div><button class="v5menu" aria-label="Mensagens${un?`, ${un} novas`:''}" onclick="SOCTAB='dm';render()" style="position:relative"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H8l-4 4z"/></svg>${un?`<i class="ndot">${un}</i>`:''}</button></div>`+tp);return s}}
// carreira
function v5ProfHero(){const m=S.me,st=m.st,rp=myRank('pro'),tot=st.w+st.l;return `<div class="v5ph"><div class="v5pat"></div><div class="v5phin">${av(m.name,m.c,'lg',myAv())}<div class="v5phd"><span class="v5k a">${isPro()?'Profissional':'Juvenil'} · ${CIRC()}</span><b>${esc(m.name)}</b><span>${meAge()} anos · ${esc(COUNTRIES[m.c][1])} · <span class="stars">${stars()}</span></span></div></div>
 <div class="v5phs"><div><span>Ranking</span><b>${rp?'#'+rp:'—'}</b></div><div><span>Melhor</span><b>${st.hiPro?'#'+st.hiPro:'—'}</b></div><div><span>Títulos</span><b>${(st.titles||[]).length}</b></div><div><span>V–D</span><b>${st.w}–${st.l}</b></div></div></div>`}
{const _pv=profileView;profileView=function(){return v5ProfHero()+v5tabify(_pv())}}
{const _rv=rankView;rankView=function(){const c=RKG2.some(x=>x[0]===RKTAB);return v5Head(c?'História do tênis':`Classificação · ${CIRC()}`,c?'Circuito':'Rankings','')+_rv()}}
{const _rt=rankTabs;rankTabs=function(){return v5tabify(_rt())}}
acc=(f=>function(k,...a){return f(k,...a).replace('<details ',`<details id="v5acc-${k}" `)})(acc);
