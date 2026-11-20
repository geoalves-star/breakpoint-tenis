// =============== v5.8: tela da semana limpa, em passos (pendências → escolha → confirmar) ===============
function v5Cut(s,mk){const i=s.indexOf(mk);if(i<0)return['',s];const j=s.indexOf('<div class="v5sec">',i+mk.length);const e=j<0?s.length:j;return[s.slice(i,e),s.slice(0,i)+s.slice(e)]}
{const _vh=v5Home;v5Home=function(){const s0=_vh();try{let s=s0;const a=s.indexOf('<section>'),b=s.indexOf('</section>');if(a<0||b<0)return s0;const sec=s.slice(a,b+10);let rest=s.slice(0,a)+s.slice(b+10);
 const ip=sec.indexOf('<div class="v5p">');if(ip<0)return s0;const ep=v5DivEnd(sec,ip);const cards=sec.slice(ip,ep);const il=sec.indexOf('<div class="v5links">');const links=il>=0?sec.slice(il,v5DivEnd(sec,il)):'';
 let week,mesa,news;[week,rest]=v5Cut(rest,'<div class="v5sec"><span class="v5k">Esta semana</span></div>');[mesa,rest]=v5Cut(rest,'<div class="v5sec"><span class="v5k">Na mesa');[news,rest]=v5Cut(rest,'<div class="v5sec"><span class="v5k">Agora no circuito</span></div>');
 const pend=(mesa.match(/<button class="pend"[^]*?<\/button>/g)||[]);
 let L=[];try{L=v5Props().L}catch(e){}const p=L[Math.min(PSEL,L.length-1)]||null;const dis=S.modals.length?'disabled':'';
 const act=p?(/^enter\(/.test(p.a)?'Inscrever':/^(train|rest|endWeek)\(/.test(p.a)?'Confirmar':'Confirmar'):'';
 const wk=S.w%52+1;
 const todo=pend.length?`<details class="v5todo"${pend.length<=3?' open':''}><summary><span class="v5tdi">!</span><span><b>Pendências</b><small>Coisas esperando uma resposta sua. Não são obrigatórias, mas ajudam.</small></span><span class="v5cnt">${pend.length}</span></summary><div class="v5tdl">${pend.join('')}</div></details>`:`<div class="v5todo ok"><span class="v5tdi">✓</span><span><b>Sem pendências</b><small>Tudo em dia. Agora é escolher a semana.</small></span></div>`;
 const html=`<div class="v5wk"><div class="v5wkh"><span class="v5k a">Semana ${wk} de 52 · Temporada ${year()}</span><h1 class="v5h1">O que fazer agora</h1></div>${todo}
  <div class="v5step"><span class="v5stn">1</span><div><b>Escolha o que fazer nesta semana</b><small>Toque numa opção: jogar um torneio, treinar ou descansar.</small></div></div>${cards}${links}
  ${p?`<div class="v5step"><span class="v5stn">2</span><div><b>Confirme a escolha</b><small>${esc(p.t)}</small></div></div><button class="full big v5conf" ${dis} onclick="${p.a.replace(/"/g,'&quot;')}">${act}: ${esc(p.t)} →</button>${S.modals.length?'<div class="xs mut" style="margin-top:6px">Responda a mensagem aberta para continuar.</div>':''}`:''}</div>`;
 const wk2=week?week.replace('<div class="v5sec"><span class="v5k">Esta semana</span></div>','<div class="v5sec"><span class="v5k">Extras da semana</span></div>'):'';
 const nw=news?`<details class="card acc v5news"><summary><span class="acct">📰 Notícias do circuito</span><span class="accs">o que aconteceu na semana</span><i class="acci">›</i></summary><div class="accb">${news.replace('<div class="v5sec"><span class="v5k">Agora no circuito</span></div>','')}</div></details>`:'';
 rest=rest.replace(/<details id="v5acc-dash" class="card acc" open /,'<details id="v5acc-dash" class="card acc" ');
 return html+wk2+nw+rest}catch(e){console.error(e);return s0}}}
// a barra de baixo repete o botão de confirmar: some na tela da semana
{const _r=render0;render0=function(){_r();try{if(document.querySelector('.v5wk')){const b=document.querySelector('.v5bar');if(b)b.style.display='none'}}catch(e){}}}
