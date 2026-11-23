// =============== v6.4 · modo treinador novo: você cria o técnico, escolhe o talento na peneira e cuida da equipe ===============
BCPICK.cori={t:'Sua origem',o:{
 ex:{n:'Ex-jogador',i:'🎾',d:'Você já jogou o circuito.',p:['Quando você está no box, seu atleta ganha +0,3 no saque e na devolução.'],c:['Sem bônus no treino.']},
 tat:{n:'Estudioso do jogo',i:'📊',d:'Vive de vídeo e estatística.',p:['Ajustes nos intervalos de set 50% mais fortes.','O atleta segue mais as suas instruções.','Os olheiros erram menos na peneira.'],c:['Sem bônus físico.']},
 fis:{n:'Preparador físico',i:'💪',d:'Corpo em primeiro lugar.',p:['Cansaço 15% menor nas partidas.','A carga física cai mais rápido.','Treino de físico rende 10% a mais.'],c:['Ajustes táticos sem bônus.']},
 psi:{n:'Psicólogo esportivo',i:'🧠',d:'Cabeça de campeão.',p:['A confiança cai 40% menos depois de derrotas.','Treino mental rende 30% a mais.'],c:['Sem bônus técnico.']}}};
BCPICK.cfil={t:'Sua filosofia',o:{
 ofensiva:{n:'Ofensiva',i:'⚡',d:'Ganhar o ponto antes do adversário.',p:['Saque, forehand e voleio evoluem 15% mais rápido.'],c:['Devolução e físico sem bônus.']},
 defensiva:{n:'Defensiva',i:'🛡️',d:'Devolver tudo e esperar o erro.',p:['Devolução, backhand e físico evoluem 15% mais rápido.'],c:['Saque e voleio sem bônus.']},
 formadora:{n:'Formadora',i:'🌱',d:'Construir o atleta para o futuro.',p:['Atletas de até 18 anos evoluem 12% mais rápido em tudo.','Seus alunos também crescem mais.'],c:['Depois dos 18, sem bônus.']}}};
const BCSK={tat:['📊','Leitura de jogo','+10% na força dos ajustes por nível.'],dev:['🌱','Desenvolvimento','+4% no treino e +10% na evolução dos alunos por nível.'],mot:['🔥','Motivação','A confiança em você sobe 10% mais e o atleta segue mais as instruções.'],ges:['💼','Gestão','+5% na sua renda por nível e +1 vaga na equipe nos níveis 2 e 4.']};
const BCDEM={none:['✅','Sem exigências.'],fee:['💸','A família pede ajuda de custo: US$ 120 por semana da sua conta.'],excl:['🔒','Quer exclusividade: nada de outros alunos no primeiro ano.'],comp:['🏆','Muito competitivo: já começa confiando em você.'],shy:['🙈','Tímido: começa desconfiado, mas a confiança cresce 30% mais rápido.']};
const bcV2=()=>!!(S&&S.cm&&S.cm.v2);
function bcSlots(){if(!bcV2())return CMMAX;const c=S.cm,g=(c.sk&&c.sk.ges)||0;return Math.min(3,(c.acad||0)+(g>=2?1:0)+(g>=4?1:0))}
// ---------- peneira ----------
let PEN=null,BCSKO=false;
function bcPenOpen(){const F=FORM;if(!(F.cname||'').trim()){TOAST='Escreva o seu nome de técnico.';render();return}
 const fe=F.circ==='WTA',hs=fe?['rabo','longo','coque','medio','trancas','cacheado','blackpower']:['curto','degrade','topete','raspado','cacheado','medio','blackpower'];const L=[];const dems=['none','fee','excl','comp','shy'].sort(()=>Math.random()-.5);
 for(let i=0;i<4;i++){const c=i<2?F.c:pickCountry();const tal=['elite','medio','sorte','sorte','medio'][Math.floor(Math.random()*5)];const age=Math.random()<.5?14:15;const style=['fundo','sacador','contra','completo'][Math.floor(Math.random()*4)];const pers=['calmo','normal','normal','explosivo'][Math.floor(Math.random()*4)];
  const pot=tal==='elite'?4.4:tal==='medio'?3.2:2+Math.random()*2.6,err=F.cori==='tat'?.5:1.1,est=clamp(Math.round(pot+(Math.random()-.5)*2*err),1,5);
  const lvl=Math.round(30+Math.min(age-14,6)*2.8+(tal==='elite'?3:1.5)+(Math.random()-.5)*4);
  L.push({n:genName(c,fe),c,age,style,pers,hand:Math.random()<.12?'canhoto':'destro',tal,est,lvl,dem:dems[i],av:{g:fe?'f':'m',sk:Math.floor(Math.random()*6),h:hs[Math.floor(Math.random()*hs.length)],hc:Math.floor(Math.random()*5),a:Math.random()<.3?'faixa':'nada',sh:Math.floor(Math.random()*8),ey:Math.floor(Math.random()*3),bs:0}})}
 PEN={L,sel:0};render();window.scrollTo(0,0)}
function bcPenView(){const F=FORM;const st=(n)=>'★'.repeat(n)+'<span class="mut">'+'★'.repeat(5-n)+'</span>';
 return `<div class="bcpen"><button class="bcback" onclick="PEN=null;render()">‹ Voltar para o técnico</button>
 <div class="bckick">Peneira · ${esc(F.cname||'')}</div><h1 class="bcbig">Escolha seu talento.</h1><p class="small mut">Quatro ${F.circ==='WTA'?'meninas':'meninos'} fizeram o teste hoje. O potencial é uma estimativa dos olheiros${F.cori==='tat'?', e como estudioso do jogo você erra menos':''}. Toque para ver e escolha um.</p>
 <div class="bcpl">${PEN.L.map((p,i)=>{const so=BCPICK.style.o[p.style],po=BCPICK.pers.o[p.pers],dm=BCDEM[p.dem];return `<button class="bcpcd ${PEN.sel===i?'on':''}" onclick="PEN.sel=${i};render()">
  <div class="bcpa">${avSVG({...p.av,bd:false})}</div><div class="bcpb"><b>${esc(p.n)}</b><span>${flag(p.c)} ${esc(COUNTRIES[p.c][1])} · ${p.age} anos${p.hand==='canhoto'?' · canhoto':''}</span>
  <div class="bcpt"><em>${so.i} ${so.n}</em><em>${po.i} ${po.n}</em></div>
  <div class="bcpr"><span>Nível hoje</span><i><b style="width:${p.lvl}%"></b></i><strong>${p.lvl}</strong></div>
  <div class="bcpr"><span>Potencial</span><strong class="bcst">${st(p.est)}</strong></div>
  <div class="bcpd ${p.dem==='none'||p.dem==='comp'?'ok':''}">${dm[0]} ${dm[1]}</div></div></button>`}).join('')}</div>
 <button class="full big bcpgo" onclick="bcPenGo()">Treinar ${esc(PEN.L[PEN.sel].n.split(' ')[0])} →</button></div>`}
function bcPenGo(){const p=PEN.L[PEN.sel],F=FORM;const cav={...F.av,g:F.cg==='f'?'f':'m'};const cc=F.c;
 PEN=null;newGame({...F,name:p.n,age:p.age,c:p.c,style:p.style,pers:p.pers,hand:p.hand,tal:p.tal,av:p.av,coach:true,leg:false});
 try{const c=S.cm,m=S.me;Object.assign(c,{v2:1,start:S.w,ori:F.cori||'ex',fil:F.cfil||'formadora',sk:{tat:0,dev:0,mot:0,ges:0},xp:0,pts:0,lw:m.st.w,lt2:0,c:cc,av:cav,f:F.cg==='f',dem:p.dem,box:'me'});
  c.trust=p.dem==='comp'?78:p.dem==='shy'?48:62;const d=p.lvl-ovr();ATTR.forEach(([k])=>m.attrs[k]=clamp(m.attrs[k]+d,10,95));m.pmode='sim';OPTS.wInt=true;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}
  S.news=(S.news||[]).filter(x=>!/assume o trabalho/.test(x.t||x));news(`🧑‍🏫 Peneira concluída: ${c.n} escolheu ${flag(m.c)} ${m.name}, ${p.age} anos.`);save()}catch(e){console.error(e)}
 render();window.scrollTo(0,0)}
// ---------- formulário do técnico ----------
function bcCoachForm(){try{if(S&&!MENU)return;if(!FORM.coach||PEN)return;const nm=document.getElementById('fName');if(!nm)return;const app=document.getElementById('app');if(!app||app.querySelector('.bccf'))return;
 const hide=['Mão','Estilo de jogo','Personalidade','Primeiro técnico','Talento'];
 [...app.querySelectorAll('.sec-t')].forEach(h=>{const t=h.textContent.trim();if(!hide.some(x=>t.startsWith(x)))return;let e=h;const L=[h];while((e=e.nextElementSibling)&&!e.classList.contains('sec-t')&&e.tagName!=='LABEL'&&e.tagName!=='BUTTON')L.push(e);L.forEach(x=>x.style.display='none')});
 const lb=nm.previousElementSibling;if(lb&&lb.tagName==='LABEL')lb.style.display='none';nm.style.display='none';
 const sel=[...app.querySelectorAll('select')].find(s=>s.previousElementSibling&&/pa[ií]s/i.test(s.previousElementSibling.textContent));
 [...app.querySelectorAll('label')].forEach(l=>{if(l.textContent.trim()==='País')l.textContent='Seu país'});
 [...app.querySelectorAll('h3')].forEach(h=>{if(h.textContent.trim()==='Visual')h.textContent='Seu visual de técnico'});
 
 if(!FORM.cg)FORM.cg=FORM.circ==='WTA'?'f':'m';if(!FORM.cori)FORM.cori='ex';if(!FORM.cfil)FORM.cfil='formadora';
 const extra=`<div class="bccf"></div><div class="sec-t">Você é</div><div class="chips"><button class="chip ${FORM.cg!=='f'?'on':''}" onclick="FORM.cg='m';render()">Técnico</button><button class="chip ${FORM.cg==='f'?'on':''}" onclick="FORM.cg='f';render()">Técnica</button></div>${bcPick('cori')}${bcPick('cfil')}<div class="bcpx"><div class="bcpxh">🧑‍🏫 Como funciona</div><div class="bcpp">＋ Você não joga os pontos: assiste do box e ajusta nos intervalos.</div><div class="bcpp">＋ Começa com 1 atleta, escolhido na peneira, e chega a 4 com a academia.</div><div class="bcpp">＋ Ganha pontos de habilidade com vitórias e títulos.</div></div>`;
 if(sel)sel.insertAdjacentHTML('afterend',extra);
 const go=[...app.querySelectorAll('button')].find(b=>/^newGame/.test(b.getAttribute('onclick')||''));if(go){go.setAttribute('onclick','bcPenOpen()');go.textContent='Ir para a peneira →'}}catch(e){console.error(e)}}
// ---------- topo do técnico ----------
{const _h=v5Hdr;v5Hdr=function(){if(!bcV2())return _h.apply(this,arguments);try{let s=_h.apply(this,arguments);const c=S.cm,m=S.me,stars='★'.repeat(cmRep());
 const who=`<div class="bcwho"><b>${esc(c.n)}</b><span>${c.f?'Técnica':'Técnico'} ${stars} · ${esc(m.name.split(' ')[0])}${m.injury>0?` · lesionado ${m.injury} sem.`:''}</span></div>`;
 s=s.replace(/<div class="bchr1">[\s\S]*?<div class="bcwho">[\s\S]*?<\/div>/,`<div class="bchr1">${av(c.n,c.c??m.c,'sm',c.av||myAv())}${who}`);
 s=s.replace(/<div class="bcc [^"]*"><span>Caixa<\/span><b>[^<]*<\/b><\/div>/,`<div class="bcc"><span>Sua conta</span><b>${money(c.wallet).replace('US$ ','').toUpperCase()}</b></div>`);
 s=s.replace(/<span>Confiança<\/span><b>\d+%<\/b>(<i style="--p:)\d+%/,`<span>Confia em você</span><b>${Math.round(c.trust)}%</b>$1${Math.round(c.trust)}%`);return s}catch(e){return _h.apply(this,arguments)}}}
// ---------- equipe na tela da semana ----------
const BCFOC={comp:['🎾','Competir'],treino:['🏋️','Treinar forte'],desc:['🛌','Descansar']};
function bcBox(id){const c=S.cm;if(!c)return;if(c.boostId){const q=IDX.get(c.boostId);if(q)q.r-=1.5;c.boostId=null}c.box=id;if(id!=='me'){const p=IDX.get(+id);if(p){p.r+=1.5;c.boostId=p.id}}save();render()}
function bcFoc(id,k){const x=(S.cm.pup||[]).find(q=>q.id===id);if(x){x.foc=k;save();render()}}
function bcSkUp(k){const c=S.cm;if(!c||!(c.pts>0)||(c.sk[k]||0)>=5)return;c.sk[k]=(c.sk[k]||0)+1;c.pts--;news(`📈 ${BCSK[k][1]} subiu para o nível ${c.sk[k]}.`);save();render()}
function bcTeamPanel(){const c=S.cm,m=S.me,pu=cmPups(),box=c.box||'me',mr=myRank('pro'),mj=myRank('jr');
 const ath=(id,n,cc,avo,sub,extra,on)=>`<div class="bctm ${on?'on':''}"><div class="bctmh">${av(n,cc,'sm',avo)}<div><b>${esc(n)}</b><span>${sub}</span></div><button class="bcboxb ${on?'on':''}" onclick="bcBox('${id}')">${on?'🪑 No box':'Ir ao box'}</button></div>${extra}</div>`;
 const bar=(l,v,cls)=>`<div class="bctb"><span>${l}</span><i><b class="${cls||''}" style="width:${clamp(v,0,100)}%"></b></i><em>${Math.round(v)}</em></div>`;
 let h=`<div class="card bcteam"><div class="bctmt"><span class="bckick">Sua equipe · ${pu.length+1}/${bcSlots()+1}</span>${pu.length?'<span class="xs mut">Quem tem você no box joga melhor.</span>':''}</div>`;
 h+=ath('me',m.name,m.c,myAv(),`${mr?'#'+mr+' '+CIRC():mj?'#'+mj+' juvenil':'sem ranking'} · nível ${Math.round(ovr())}`,bar('Energia',m.energy,m.energy<35?'low':'')+bar('Confia em você',c.trust,c.trust<30?'low':''),box==='me'||!pu.length);
 for(const x of pu){const p=IDX.get(x.id);if(!p)continue;const rk=RK.pro[p.id],rj=RK.jr[p.id];x.tr=x.tr??60;x.foc=x.foc||'comp';
  h+=ath(p.id,p.n,p.c,pAv(p),`${rk?'#'+rk:rj?'#'+rj+' juvenil':'sem ranking'} · nível ${Math.round(p.r)} · ${ageOf(p)} anos`,bar('Confia em você',x.tr,x.tr<30?'low':'')+`<div class="bcfoc">${Object.entries(BCFOC).map(([k,[i,l]])=>`<button class="${x.foc===k?'on':''}" onclick="bcFoc(${p.id},'${k}')">${i} ${l}</button>`).join('')}</div>`,String(box)===String(p.id))}
 if(!pu.length)h+=`<p class="xs mut" style="margin:8px 0 0">${(c.acad||0)<1?'Construa uma quadra própria na aba Equipe para abrir vaga para mais um atleta.':'Você tem vaga: propostas de novos alunos chegam conforme a sua reputação cresce.'}</p>`;
 // habilidades (abre e fecha)
 const need=40,head=`<button class="bctmt bcskt" onclick="BCSKO=!BCSKO;render()"><span class="bckick">Suas habilidades ${BCSKO?'▾':'▸'}</span><span class="xs mut">${c.pts>0?`<b style="color:var(--hi,var(--acc))">${c.pts} ponto${c.pts>1?'s':''} para usar</b>`:`Próximo ponto: ${Math.round(c.xp)}/${need}`}</span></button>`;
 h+=`<div class="bcsk">${head}${BCSKO?`<div class="bcskg">${Object.entries(BCSK).map(([k,[i,l,d]])=>`<div class="bcsi"><div><b>${i} ${l}</b><span>${d}</span></div><div class="bcsl">${[1,2,3,4,5].map(n=>`<u class="${(c.sk[k]||0)>=n?'on':''}"></u>`).join('')}</div>${c.pts>0&&(c.sk[k]||0)<5?`<button onclick="bcSkUp('${k}')" aria-label="Subir ${l}">+</button>`:''}</div>`).join('')}</div><div class="xs mut" style="margin-top:6px">${BCPICK.cori.o[c.ori].i} ${BCPICK.cori.o[c.ori].n} · ${BCPICK.cfil.o[c.fil].i} Filosofia ${BCPICK.cfil.o[c.fil].n.toLowerCase()}. Vitórias e títulos dão experiência.</div>`:''}</div></div>`;
 return h}
// ---------- efeitos do técnico ----------
function bcTrainMul(k){const c=S.cm;if(!bcV2())return 1;let f=1+.04*(c.sk.dev||0);if(c.fil==='ofensiva'&&['sv','fh','vo'].includes(k))f*=1.15;if(c.fil==='defensiva'&&['rt','bh','fi'].includes(k))f*=1.15;if(c.fil==='formadora'&&meAge()<=18)f*=1.12;if(c.ori==='fis'&&k==='fi')f*=1.1;if(c.ori==='psi'&&k==='me')f*=1.3;return f}
{const _g=gain;gain=function(k,base){return _g(k,base*bcTrainMul(k))}}
{const _cm=bcCoM;bcCoM=function(){if(bcV2())return 1.2+.05*(cmRep()-1);return _cm()}}
{const _e=eff;eff=function(id,surf){const r=_e.apply(this,arguments);try{if(id==='me'&&r&&bcV2()){const c=S.cm,here=(c.box||'me')==='me';if(here&&c.ori==='ex'){r.sv+=.3;r.rt+=.3}if(!here){r.sv-=.4;r.rt-=.4}}}catch(e){}return r}}
{const _f=fatOf;fatOf=function(E,me){const v=_f(E,me);try{if(me&&E.meA&&bcV2()&&S.cm.ori==='fis')return v*.85}catch(e){}return v}}
{const _u=userMatch;userMatch=function(){const m=S.me,c0=m.conf??50;const r=_u.apply(this,arguments);try{if(bcV2()&&S.cm.ori==='psi'){const d=(m.conf??50)-c0;if(d<0)m.conf=clamp(c0+d*.6,10,95)}}catch(e){}return r}}
// intervalo de set: a instrução pode ser ignorada; estudioso e leitura de jogo deixam o ajuste mais forte
{const _t=v5WiTac;v5WiTac=function(k){if(!bcV2()||!V5WI||k==='eq')return _t.apply(this,arguments);const c=S.cm,o=SETTAC.find(x=>x[0]===k);if(!o)return _t.apply(this,arguments);
 const E=V5WI.E,key=(E.sa||0)+(E.sb||0);if(V5WI._ivk===key&&V5WI._ign){TOAST='Você já falou neste intervalo.';render();return}V5WI._ivk=key;
 const fol=clamp(.5+c.trust/200+(c.ori==='tat'?.1:0)+.04*(c.sk.mot||0),.3,.97);
 if(R()>fol){V5WI._ign=1;try{LIVE.feed.unshift(`🙉 ${S.me.name.split(' ')[0]} ouviu, mas preferiu manter o plano.`)}catch(e){}c.trust=clamp(c.trust-.3,0,100);render();return}
 V5WI._ign=0;const K=(c.ori==='tat'?1.5:1)*(1+.1*(c.sk.tat||0)),a=o[3],b=o[4];o[3]=a*K;o[4]=b*K;try{return _t.apply(this,arguments)}finally{o[3]=a;o[4]=b}}}
// confiança e renda
{const _w=cmWeek;cmWeek=function(){if(!bcV2())return _w.apply(this,arguments);const c=S.cm,t0=c.trust,w0=c.wallet;const r=_w.apply(this,arguments);try{const dt=c.trust-t0;if(dt>0)c.trust=clamp(t0+dt*(1+.1*(c.sk.mot||0))*(c.dem==='shy'?1.3:1),0,100);const dw=c.wallet-w0;if(dw>0)c.wallet=Math.round(w0+dw*(1+.05*(c.sk.ges||0)));if(c.dem==='fee')c.wallet-=120}catch(e){}return r}}
{const _p=cmPupWeek;cmPupWeek=function(){if(!bcV2())return _p.apply(this,arguments);const c=S.cm,w0=c.wallet;const r=_p.apply(this,arguments);try{c.wallet=Math.round(w0+(c.wallet-w0)*(1+.05*(c.sk.ges||0)));
  for(const x of (c.pup||[]).slice()){const p=IDX.get(x.id);if(!p)continue;x.tr=x.tr??60;const g=(1+.1*(c.sk.dev||0))*(c.fil==='formadora'?1.25:1);
   if(x.foc==='treino'){if(p.r<p.pot)p.r=Math.min(p.pot,p.r+.02*g);x.tr=clamp(x.tr-.25,0,100)}else if(x.foc==='desc'){x.tr=clamp(x.tr+.6,0,100)}else{if(p.r<p.pot)p.r=Math.min(p.pot,p.r+.004*g)}
   if(String(c.box)===String(x.id))x.tr=clamp(x.tr+.8,0,100);else x.tr=clamp(x.tr-.08,0,100);
   if(x.tr<12){news(`🚪 ${x.n} perdeu a confiança no seu trabalho e saiu da equipe.`);cmDrop(x.id)}}}catch(e){}return r}}
{const _o=cmOffer;cmOffer=function(){try{const c=S.cm;if(bcV2()&&c.dem==='excl'&&S.w<(c.since||0)+52)return}catch(e){}return _o.apply(this,arguments)}}
// experiência e pontos de habilidade; o box volta para o atleta principal depois da semana
{const _ew=endWeek;endWeek=function(){const r=_ew.apply(this,arguments);try{if(bcV2()){const c=S.cm,m=S.me;const dw=Math.max(0,m.st.w-(c.lw??m.st.w)),tt=m.st.titles.length+m.st.jrTitles.length,dt=Math.max(0,tt-(c.lt2??tt));c.lw=m.st.w;c.lt2=tt;c.xp=(c.xp||0)+dw*2+dt*15;
  while(c.xp>=40){c.xp-=40;c.pts=(c.pts||0)+1;news('📈 Você ganhou um ponto de habilidade de técnico.')}
  if(c.boostId){const q=IDX.get(c.boostId);if(q)q.r-=1.5;c.boostId=null}c.box='me';if(!['sim','fast'].includes(m.pmode))m.pmode='sim'}}catch(e){}return r}}
// quem treina é você
{const _v=v5Who;v5Who=function(kind){if(bcV2()&&kind==='coach')return[S.cm.n.split(' ')[0],'você, técnico'];return _v.apply(this,arguments)}}
// partidas do box: sem opção de jogar os pontos
{const _s=v5SetMM;v5SetMM=function(k){if(bcV2()&&k==='play')k='watch';return _s.call(this,k)}}
// montagem na tela
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(PEN&&(!S||MENU)){const app=document.getElementById('app');if(app)app.innerHTML=bcPenView();return v}bcCoachForm();
 if(bcV2()&&!MENU){if(!['sim','fast'].includes(S.me.pmode))S.me.pmode='sim';document.querySelectorAll('[onclick^="v5SetMM(\'play\')"],[onclick^="v5SetPM("]').forEach(e=>e.style.display='none');
  if(TAB==='home'&&!S.tour){const wk=document.querySelector('.bcwk');if(wk&&!document.querySelector('.bcteam'))wk.insertAdjacentHTML('afterend',bcTeamPanel())}}}catch(e){console.error(e)}return v}}
