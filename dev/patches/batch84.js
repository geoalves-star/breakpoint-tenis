// =============== v5.9: computador — painel lateral, barra de ação no topo e atalhos de teclado ===============
const v5Wide=()=>window.innerWidth>=1280;
function v5RailRank(){const m=S.me,cat=(meAge()<=18&&!myRank('pro'))?'jr':'pro',my=RK[cat].me,O=ORD[cat];if(!O)return'';
 const row=(id,r)=>{const me=id==='me',p=me?null:IDX.get(id);if(!me&&!p)return'';const n=me?m.name:p.n,c=me?m.c:p.c;return `<div class="v5rr${me?' me':''}${!me&&id===S.rival?' rv':''}" ${me?'':`onclick="openP(${id})"`}><span class="v5rn">${r||'–'}</span><span class="v5rnm">${flag(c)} ${esc(n)}</span><span class="v5rp">${(PTS[cat][id]||0).toLocaleString('pt-BR')}</span></div>`};
 const L=[];const top=O.slice(0,3);top.forEach(id=>L.push(row(id,RK[cat][id])));
 if(my&&my>4){L.push('<div class="v5rgap">⋯</div>');const all=[...O];all.splice(my-1,0,'me');for(let i=Math.max(3,my-3);i<Math.min(all.length,my+2);i++)L.push(row(all[i],i+1))}
 else{const all=[...O];if(my)all.splice(my-1,0,'me');for(let i=3;i<6;i++)if(all[i]!=null)L.push(row(all[i],i+1));if(!my){L.push('<div class="v5rgap">⋯</div>');L.push(row('me',null))}}
 return `<div class="v5rc"><div class="v5rh"><b>Ranking ${cat==='jr'?'juvenil':CIRC()}</b><button class="v5rl" onclick="RKTAB='${cat}';go('rank')">ver tudo ›</button></div>${L.join('')}</div>`}
function v5RailNext(){let t='',sub='',btn='',act='';
 if(S.tour&&!S.tour.over){const o=oppOf(),p=IDX.get(o),ev=curEv();t='Próxima partida';sub=p?`${ev?esc(ev.name)+' · ':''}contra ${flag(p.c)} ${esc(p.n)}`:esc(ev?ev.name:'');btn='Ir para a partida';act="go('home')"}
 else if(S.tour&&S.tour.over){t='Torneio encerrado';sub='Veja o resultado e feche a semana.';btn='Ver resultado';act="go('home')"}
 else{let L=[];try{L=v5Props().L}catch(e){}const p=L.length?L[Math.min(PSEL,L.length-1)]:null;let must=[];try{must=v5Must()}catch(e){}
  if(must.length){t='Resolva antes de seguir';sub=must.map(x=>esc(x.t||x[0]||'')).join(' · ');btn='Ver pendências';act="go('home')"}
  else if(p){t=`Semana ${S.w%52+1}`;sub=esc(p.t);btn=/^enter\(/.test(p.a)?'Inscrever':/^(train|rest|endWeek)\(/.test(p.a)?'Fechar a semana':'Confirmar';act=p.a}}
 if(!t)return'';return `<div class="v5rc v5rnext"><div class="v5rk">${t}</div><div class="v5rs">${sub}</div><button class="v5rgo" ${S.modals.length?'disabled':''} onclick="${act.replace(/"/g,'&quot;')}">${btn} <span class="v5kbd">Enter</span></button></div>`}
function v5RailRival(){const id=S.rival,p=id!=null&&IDX.get(id);if(!p)return'';const [w,l]=h2h(id),heat=Math.round(S.heat||0);
 return `<div class="v5rc" onclick="openP(${id})" style="cursor:pointer"><div class="v5rh"><b>Rival</b><span class="v5rl">${heat>=70?'🔥 em brasa':heat>=40?'esquentando':'morna'}</span></div><div class="v5rrv">${flag(p.c)} <b>${esc(p.n)}</b><span>${rkOf(id)}</span></div><div class="v5rh2h"><b class="w">${w}</b><span>confrontos</span><b class="l">${l}</b></div></div>`}
function v5RailGoals(){if(!S.goals)return'';return `<div class="v5rc"><div class="v5rh"><b>Metas ${S.goalsY||year()}</b></div>${S.goals.map(g=>{const pr=goalProg(g);return `<div class="v5rg${pr.ok?' ok':''}"><span>${pr.ok?'✓':'○'} ${esc(g.t)}</span><i style="--p:${Math.round(pr.p*100)}%"></i></div>`}).join('')}</div>`}
function v5RailUpd(){let el=document.getElementById('v5rail');const on=S&&!MENU&&!S.ended&&!IM&&v5Wide()&&document.querySelector('#app .nav');document.body.classList.toggle('v5railon',!!on);
 if(!on){if(el)el.remove();return}if(!el){el=document.createElement('aside');el.id='v5rail';el.setAttribute('aria-label','Resumo');document.body.appendChild(el)}
 let h='';try{h=v5RailNext()+v5RailRank()+v5RailRival()+v5RailGoals()}catch(e){console.error(e)}
 el.innerHTML=h+`<div class="v5rkeys"><b>Atalhos</b> <span class="v5kbd">1</span>–<span class="v5kbd">5</span> abas · <span class="v5kbd">Enter</span> confirma · <span class="v5kbd">Esc</span> volta · <span class="v5kbd">?</span> ajuda</div>`}
{const _r=render;render=function(){_r.apply(this,arguments);try{v5RailUpd()}catch(e){}}}
window.addEventListener('resize',()=>{clearTimeout(window._v5rz);window._v5rz=setTimeout(()=>{try{v5RailUpd()}catch(e){}},150)});
// atalhos de teclado
let V5KH=false;
function v5KeysHelp(){V5KH=!V5KH;let el=document.getElementById('v5kh');if(!V5KH){el&&el.remove();return}
 el=document.createElement('div');el.id='v5kh';el.className='v5kh';el.onclick=()=>v5KeysHelp();
 el.innerHTML=`<div class="v5khb" onclick="event.stopPropagation()"><h3>Atalhos de teclado</h3>${[['1 a 5','Semana, Torneios, Equipe, Social, Carreira'],['Enter','Confirma a ação da semana ou avança a partida'],['Esc','Volta ou fecha a janela aberta'],['1 a 9 (com escolha aberta)','Escolhe a opção pela ordem'],['Setas e espaço','Jogam o ponto em quadra'],['?','Abre e fecha esta ajuda']].map(([k,d])=>`<div class="v5khr"><span class="v5kbd">${k}</span><span>${d}</span></div>`).join('')}<button onclick="v5KeysHelp()">Fechar</button></div>`;document.body.appendChild(el)}
document.addEventListener('keydown',e=>{try{if(/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||'')||e.ctrlKey||e.metaKey||e.altKey)return;const k=e.key;
 if(k==='?'){e.preventDefault();v5KeysHelp();return}if(k==='Escape'&&V5KH){v5KeysHelp();return}
 if(!S||MENU||IM||LIVE||VINH||PCARD!=null||INMENU||(S.modals&&S.modals.length)||document.querySelector('.modal,.retro,.v5cel,#v5dbo,.v5arcw'))return;
 if(/^[1-5]$/.test(k)&&document.querySelector('#app .nav')){e.preventDefault();go(['home','tour','train','social','me'][+k-1]);return}
 if(k==='Enter'&&(e.target===document.body||!e.target.closest('button,[onclick],a'))){const b=document.querySelector('#v5rail .v5rgo:not([disabled])')||document.querySelector('.v5bar button:not([disabled])');if(b){e.preventDefault();b.click()}}}catch(err){}});
