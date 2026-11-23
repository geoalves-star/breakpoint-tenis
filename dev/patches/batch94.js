// =============== v6.1: novo visual "transmissão" — temas claro e escuro, placar no topo, 4 abas, semana em destaque ===============
// ---------- temas ----------
const BCT={
 escuro:{n:'Escuro',sub:'preto e amarelo, como na TV',d:1,pat:'linear-gradient(90deg,#FFE14D,#FFE14D)',v:{bg:'#060607',app:'#0C0C0E',card:'#17171B',card2:'#1F1F24',line:'#2C2C31',txt:'#FFFFFF',mut:'#B4B4BC',acc:'#FFE14D',acc2:'#3DDC84',acctxt:'#0C0C0E',good:'#3DDC84',bad:'#FF5A5F',gold:'#FFE14D',merow:'#2A2610',accsoft:'#FFE14D1A',avbg1:'#2C2C31',avbg2:'#17171B',hdr1:'#000000',hdr2:'#000000',glow:'#060607',bar:'#000000',bartxt:'#FFFFFF',hi:'#FFE14D',hibar:'#FFE14D',chip:'#232328'}},
 claro:{n:'Claro',sub:'branco e verde-quadra',d:0,pat:'linear-gradient(90deg,#0F7A52,#0F7A52)',v:{bg:'#E7EAE7',app:'#F5F6F4',card:'#FFFFFF',card2:'#EEF1EE',line:'#DCE2DD',txt:'#0F1412',mut:'#4F5A55',acc:'#0F3D2E',acc2:'#0F7A52',acctxt:'#FFFFFF',good:'#0F7A52',bad:'#C8323A',gold:'#8A5A00',merow:'#DFF3E8',accsoft:'#0F3D2E12',avbg1:'#DCE2DD',avbg2:'#C3CEC7',hdr1:'#0F3D2E',hdr2:'#0F3D2E',glow:'#E7EAE7',bar:'#0F3D2E',bartxt:'#FFFFFF',hi:'#0F7A52',hibar:'#7FD1A6',chip:'#EEF1EE'}}};
{const old={...THEMES};delete old.auto;Object.keys(THEMES).forEach(k=>delete THEMES[k]);Object.assign(THEMES,{auto:{n:'Automático',sub:'segue o modo claro ou escuro do aparelho',v:{}}},BCT);for(const k in old)THEMES[k]={...old[k],n:old[k].n+' (clássico)'}}
v5AutoKey=function(){return DARKQ&&DARKQ.matches===false?'claro':'escuro'};
{const _at=applyTheme;applyTheme=function(k){_at(k);try{document.body.classList.add('bc');localStorage.setItem('breakpoint_theme6',THEME)}catch(e){}}}
try{THEME=localStorage.getItem('breakpoint_theme6')||'auto'}catch(e){THEME='auto'}
applyTheme(THEME);
// ---------- cor do piso da semana ----------
const BCSURF={hard:'#3B82F6',clay:'#E0763F',grass:'#3DA35D'};
function bcSurf(){try{let ev=null;if(S.tour)ev=curEv();else if(S.plan&&S.plan[S.w])ev=weekEvents(S.w).find(e=>e.key===S.plan[S.w]);const s=ev?ev.surf:surfOf(S.w%52);return BCSURF[s]||BCSURF.hard}catch(e){return BCSURF.hard}}
// ---------- placar do topo ----------
const BCI={msg:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',menu:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>'};
let BCPREV={};
v5Hdr=function(){const m=S.me,rp=myRank('pro'),rj=meAge()<=18?myRank('jr'):null,wk=S.w%52,Y=v5Year();
 if(!S._rk||S._rk.w!==S.w)S._rk={w:S.w,prev:S._rk?S._rk.cur:rp,cur:rp};else S._rk.cur=rp;
 const d=S._rk.prev&&rp?S._rk.prev-rp:0;
 const live=S.tour&&!S.tour.over,ev=live?curEv():null;
 const rk=rp||rj,rl=rp?`Rank ${CIRC()}`:rj?'Rank juvenil':'Ranking';
 const nx=Y.gs.find(i=>i>=wk),nxt=nx==null?'Temporada quase no fim.':nx===wk?'Semana de Grand Slam.':`Próximo Slam em ${nx-wk} sem.`;
 const conf=Math.round(m.conf??50),en=Math.round(m.energy),cash=money(m.money).replace('US$ ','').toUpperCase();
 const unread=(()=>{try{return dmUnread()}catch(e){return 0}})();
 try{document.body.style.setProperty('--surf',bcSurf())}catch(e){}
 const cell=(l,v,cls,bar)=>`<div class="bcc ${cls||''}"><span>${l}</span><b>${v}</b>${bar!=null?`<i style="--p:${clamp(bar,0,100)}%"></i>`:''}</div>`;
 return `<div class="hdr v5h bch"><div class="bchr1">${av(m.name,m.c,'sm',myAv())}<div class="bcwho"><b>${esc(m.name)}</b><span>${flag(m.c)} ${esc(COUNTRIES[m.c][1])} · ${meAge()} anos${m.injury>0?` · lesionado ${m.injury} sem.`:''}</span></div>${live?`<span class="bclive">● Ao vivo</span>`:''}<button class="bcib" aria-label="Mensagens${unread?`, ${unread} sem resposta`:''}" onclick="SOCTAB='dm';go('social')">${BCI.msg}${unread?'<span class="bcdot"></span>':''}</button><button class="bcib v5menu" aria-label="Abrir menu" onclick="INMENU=true;render()">${BCI.menu}</button></div>
 <div class="bcsc">${cell(rl,rk?`<span class="bccnt" data-k="rk" data-v="${rk}">${rk}</span>${d?`<small class="${d>0?'up':'dn'}">${d>0?'▲':'▼'}${Math.abs(d)}</small>`:''}`:'–','hl')}${cell('Caixa',cash,m.money<0?'neg':'')}${cell('Energia',`<span class="bccnt" data-k="en" data-v="${en}">${en}</span>%`,en<35?'low':'',en)}${cell('Confiança',`${conf}%`,conf<35?'low':'',conf)}</div>
 <div class="bcwl"><div class="bcwlb" aria-hidden="true"><u style="width:${Math.round((wk+1)/52*100)}%"></u>${Y.gs.map(i=>`<em style="left:${(i+.5)/52*100}%"></em>`).join('')}</div><span>${live&&ev?`${esc(ev.name)} · ao vivo.`:`${year()} · semana ${wk+1} de 52 · ${nxt}`}</span></div></div>`};
// números do topo contam até o valor novo
function bcCount(){try{document.querySelectorAll('.bccnt').forEach(el=>{const k=el.dataset.k,v=+el.dataset.v,p=BCPREV[k];BCPREV[k]=v;if(p==null||p===v||isNaN(p)||OPTS.lite)return;const t0=performance.now(),dur=650;const step=now=>{const f=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-f,3);el.textContent=Math.round(p+(v-p)*e);if(f<1)requestAnimationFrame(step)};el.textContent=p;requestAnimationFrame(step)})}catch(e){}}
// ---------- 4 abas ----------
const BCTABS=[['home','Semana'],['tour','Torneios'],['train','Equipe'],['me','Carreira']];
v5Nav=function(){return `<div class="nav v5nav bcnav">${BCTABS.map(([k,l])=>{const on=TAB===k||(k==='me'&&(TAB==='rank'||TAB==='social'));const dot=(k==='home'&&S.tour&&!S.tour.over&&TAB!=='home')||(k==='train'&&!S.me.coachId);const tut=S.tut!=null&&TUT[S.tut]&&(TUT[S.tut].tab===k||(k==='me'&&['rank','social'].includes(TUT[S.tut].tab)));return `<button class="${on?'on':''}${tut?' tutpulse':''}" onclick="go('${k}')" ${on?'aria-current="page"':''}>${dot?'<span class="dot"></span>':''}<span class="i">${NAVI[k]}</span><span class="l">${l}</span></button>`}).join('')}</div>`};
// direção da troca de aba (desliza para o lado certo)
{const _g=go;go=function(t){try{const o=BCTABS.findIndex(x=>x[0]===TAB),n=BCTABS.findIndex(x=>x[0]===t);document.body.style.setProperty('--bcdx',(n>=0&&o>=0?(n>o?1:n<o?-1:0):0)*28+'px')}catch(e){}return _g.apply(this,arguments)}}
// ---------- semana em destaque ----------
let BCLW=null;
function bcNext(){const out=[];try{for(let w=S.w+1;w<=S.w+9&&out.length<4;w++){const evs=weekEvents(w)||[];const mine=S.plan&&S.plan[w]?evs.find(e=>e.key===S.plan[w]):null;const gs=evs.find(e=>e.tier==='GS'&&isPro());let sp=null;try{const k=SPW(),wk=w%52;if(canPlayTeam()&&(wk===k.q||wk===k.q2||wk===k.f))sp=TEAMN()}catch(e){}
  if(mine){const t=TIERS[mine.tier];out.push({w:w%52+1,t:mine.name,d:`${t?t.n||mine.tier:mine.tier} · ${({hard:'duro',clay:'saibro',grass:'grama'})[mine.surf]||''}. Na sua agenda.`,c:BCSURF[mine.surf]})}
  else if(gs)out.push({w:w%52+1,t:gs.name,d:'Grand Slam. Chegue descansado.',c:'var(--hi)'});
  else if(sp)out.push({w:w%52+1,t:sp,d:'Convocação possível da seleção.',c:'var(--bad)'})}}catch(e){}
 if(!out.length)return'';return `<div class="bcnext"><span class="bcnk">Vem aí</span>${out.map(x=>`<div class="bcni"><span class="bcnd" style="border-color:${x.c}">${x.w}</span><div><b>${esc(x.t)}</b><span>${x.d}</span></div></div>`).join('')}</div>`}
{const _vh=v5Home;v5Home=function(){let s=_vh();try{const wk=S.w%52+1,Y=v5Year(),nx=Y.gs.find(i=>i>=S.w%52);const kick=nx==null?`Temporada ${year()}`:nx===S.w%52?`Temporada ${year()} · semana de Grand Slam`:`Temporada ${year()} · Slam em ${nx-S.w%52} sem.`;
  const roll=BCLW!=null&&BCLW!==S.w?' roll':'';BCLW=S.w;
  s=s.replace(/<div class="v5wkh">[\s\S]*?<\/h1><\/div>/,`<div class="bcwk"><span class="bckick">${kick}</span><h1 class="bcbig${roll}">Semana ${wk}</h1><span class="bcsub">Escolha o que fazer. O jogo cuida do resto.</span></div>`);
  const nb=bcNext();if(nb){const i=s.indexOf('<div class="v5sec"><span class="v5k">Extras da semana');s=i>=0?s.slice(0,i)+nb+s.slice(i):s+nb}}catch(e){console.error(e)}return s}}
// ---------- Carreira: atalho para o Social ----------
{const _pv=profileView;profileView=function(){let s=_pv();try{const u=dmUnread();s=`<div class="bcsoc"><span class="bcnk">Social</span><div><button class="sec" onclick="SOCTAB='feed';go('social')">Feed</button><button class="sec" onclick="SOCTAB='dm';go('social')">Mensagens${u?` (${u})`:''}</button><button class="sec" onclick="SOCTAB='press';go('social')">Imprensa</button></div></div>`+s}catch(e){}return s}}
{const _sv=socialView;socialView=function(){let s=_sv();try{s=`<button class="ghost bcback" onclick="go('me')">‹ Voltar para Carreira</button>`+s}catch(e){}return s}}
// ---------- frases com ponto final ----------
const BCPX='button,h1,h2,h3,h4,h5,label,option,select,textarea,input,th,nav,.bch,.chips,.v5pt,.mk,.sec-t,.v5k,.bckick,.bcnk,svg,canvas,code,.v5noi18n,.pill,.lg,.v5stamp,.v5stamp2,b,strong,.tag,.badge,summary .acct,.acct,.v5tl,.bcc,.flash,#v5rail .v5rh,.v5rr,.k5l,.fxt,.fxl,.btag,.brandbig';
function bcDot(el){try{if(!el||el.nodeType!==1||el.closest(BCPX))return;const tx=el.textContent.replace(/\s+/g,' ').trim();if(tx.length<22||tx.split(' ').length<4)return;if(!/^[A-ZÀ-Ý"“(¿¡0-9]/.test(tx))return;if(!/[a-zà-ÿ]/.test(tx))return;if(/[.!?…:;»”")\]]$/.test(tx)&&!/[A-Za-zÀ-ú0-9]\)$/.test(tx))return;if(/[→›▶↗+]$/.test(tx))return;
 let n=el.lastChild;while(n&&n.nodeType===3&&!n.nodeValue.trim())n=n.previousSibling;if(!n||n.nodeType!==3)return;n.nodeValue=n.nodeValue.replace(/\s*$/,'')+'.'}catch(e){}}
function bcDotScan(root){if(!root||root.nodeType!==1)return;const L=root.querySelectorAll('p,small,span,div,li,dd,.small,.xs');for(const el of L){if(el.children.length>3)continue;bcDot(el)}}
(function(){try{let busy=0;const mo=new MutationObserver(ms=>{if(busy)return;busy=1;try{for(const m of ms)m.addedNodes.forEach(n=>{if(n.nodeType===1){bcDot(n);bcDotScan(n)}})}finally{busy=0}});const go2=()=>mo.observe(document.body,{childList:true,subtree:true});document.body?go2():document.addEventListener('DOMContentLoaded',go2)}catch(e){}})();
// ---------- depois de cada render ----------
{const _r=render;render=function(){_r.apply(this,arguments);try{bcCount()}catch(e){}}}
// guias abertos só nas primeiras visitas de cada aba
{const _g2=go;go=function(t){try{OPTS.bcSeen=OPTS.bcSeen||{};OPTS.bcSeen[t]=(OPTS.bcSeen[t]||0)+1;if(OPTS.bcSeen[t]>=3){OPTS.gdOff=OPTS.gdOff||{};if(OPTS.gdOff[t]==null)OPTS.gdOff[t]=true}localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}return _g2.apply(this,arguments)}}
