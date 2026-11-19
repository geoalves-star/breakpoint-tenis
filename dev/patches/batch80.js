// =============== v5.8: pendências obrigatórias e avançar só uma semana por vez ===============
function v5Must(){if(!S||!S.me||S.ended)return[];const m=S.me,L=[];
 if(!isPro()&&meAge()>=17&&m.jrDec!==year())L.push({id:'pro',t:'Decida: virar profissional agora?',d:'Profissional, você entra no ranking ATP/WTA e joga ITF e Challengers. No juvenil, você segue jogando os torneios juvenis até os 18 anos.',b:[['Virar profissional','v5MustPro(1)'],['Seguir no juvenil este ano','v5MustPro(0)']]});
 const un=dmUnread();if(un)L.push({id:'dm',t:`Responda ${un} mensage${un>1?'ns':'m'}`,d:'Patrocinadores, imprensa e fãs esperam resposta. Responder mexe com a sua imagem e pode render dinheiro.',b:[['Abrir mensagens',"SOCTAB='dm';go('social')"]]});
 return L}
function v5MustPro(y){const m=S.me;if(y)turnPro();else{m.jrDec=year();news('🎾 Você decidiu seguir no circuito juvenil por mais uma temporada.')}save();render()}
const v5Blocked=()=>!QUIET&&!SIMALL&&!!S&&v5Must().length>0;
function v5BlockMsg(){const n=v5Must().length;TOAST=`Resolva ${n>1?`as ${n} pendências obrigatórias`:'a pendência obrigatória'} para avançar a semana.`;TAB='home';render();window.scrollTo(0,0)}
for(const fn of['train','rest','enter']){const _f=window[fn];window[fn]=function(){if(v5Blocked()){v5BlockMsg();return}return _f.apply(this,arguments)}}
// avançar várias semanas não existe mais: uma semana por vez
quickSim=function(){TOAST='Avance uma semana por vez: escolha o que fazer e confirme.';TAB='home';render()};
autoAdvance=function(){TOAST='Avance uma semana por vez: escolha o que fazer e confirme.';TAB='home';render()};
{const _r=render0;render0=function(){_r();try{document.querySelectorAll('#app button[onclick^="quickSim("],#app button[onclick^="autoAdvance("]').forEach(b=>b.remove());
 if(S&&!MENU&&v5Must().length){document.querySelectorAll('#app .v5bar button').forEach(b=>{b.disabled=true;b.title='Resolva as pendências obrigatórias'})}}catch(e){}}}
// pendências obrigatórias na tela da semana
{const _vh=v5Home;v5Home=function(){let s=_vh();try{const M=v5Must();s=s.replace(/<div class="v5links">([^]*?)<\/div>/,(m0,inner)=>`<div class="v5links">${inner.replace(/<button[^>]*onclick="quickSim\(\)"[^>]*>[^<]*<\/button>/,'')}</div>`);
 if(M.length){const card=`<div class="v5must"><div class="v5musth"><span class="v5tdi">!</span><span><b>Obrigatório antes de avançar</b><small>${M.length>1?`${M.length} coisas precisam da sua resposta`:'Uma coisa precisa da sua resposta'} para a semana seguir.</small></span></div>${M.map(x=>`<div class="v5musti"><b>${esc(x.t)}</b><span>${esc(x.d)}</span><div class="v5mustb">${x.b.map(([l,a],i)=>`<button class="${i?'sec':''}" onclick="${a.replace(/"/g,'&quot;')}">${esc(l)}</button>`).join('')}</div></div>`).join('')}</div>`;
  {const i=s.search(/<(details|div) class="v5todo/);if(i>=0)s=s.slice(0,i)+card+s.slice(i)}
  s=s.replace(/(<button class="full big v5conf") ([^>]*)>/,'$1 disabled $2>').replace(/(<button class="full big v5conf"[^>]*>[^<]*<\/button>)/,'$1<div class="xs" style="margin-top:6px;color:var(--bad)">Resolva o que está em "Obrigatório" lá em cima para liberar.</div>');
  // a pendência de virar profissional não precisa aparecer de novo entre as opcionais
  s=s.replace(/<button class="pend" onclick="go\('tour'\)"><span>Decida se vira profissional<\/span><i>›<\/i><\/button>/,'').replace(/<button class="pend" onclick="SOCTAB='dm';go\('social'\)"><span>\d+ mensage[^<]*<\/span><i>›<\/i><\/button>/,'');const n=(s.match(/<button class="pend"/g)||[]).length;s=s.replace(/<span class="v5cnt">\d+<\/span>/,`<span class="v5cnt">${n}</span>`);if(!n)s=s.replace(/<details class="v5todo"[^]*?<\/details>/,'')}}catch(e){console.error(e)}return s}}
