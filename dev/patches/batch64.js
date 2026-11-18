// =============== v5.6: três jeitos de jogar a partida (jogar, simular assistindo, simular direto) ===============
let V5FAST=false;
const v5MM=()=>{const p=S.me.pmode||'key';return p==='fast'?'fast':p==='sim'?'watch':'play'};
function v5SetMM(k){const m=S.me;if(k==='play')m.pmode=m.lpm||'key';else if(k==='watch')m.pmode='sim';else m.pmode='fast';save();render()}
function v5SetPM(k){S.me.pmode=k;S.me.lpm=k;save();render()}
const V5MMI={play:'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><ellipse cx="9.5" cy="8.5" rx="6" ry="6.5" transform="rotate(-35 9.5 8.5)"/><path d="M13.5 13.5l6.5 7"/><circle cx="19" cy="5" r="2.2" fill="currentColor" stroke="none"/></svg>',
 watch:'<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M10 8.5v5l4.5-2.5z" fill="currentColor"/></svg>',
 fast:'<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M3 6l8 6-8 6zM12 6l8 6-8 6z"/></svg>'};
{const _v=v5Match;v5Match=function(){let s=_v();try{const mm=v5MM(),pm=S.me.pmode||'key';
 const opt=(k,t,d)=>`<button class="v5mmo ${mm===k?'on':''}" onclick="v5SetMM('${k}')" aria-pressed="${mm===k}"><i>${V5MMI[k]}</i><b>${t}</b><span>${d}</span></button>`;
 const sub=mm==='play'?`<div class="v5mmsub"><div class="chips" style="margin:0">${[['key','Só pontos decisivos'],['all','Todos os pontos']].map(([k,l])=>`<button class="${pm===k?'on':''}" onclick="v5SetPM('${k}')">${l}</button>`).join('')}</div><div class="xs mut">${pm==='all'?'Você joga cada ponto da partida.':'Você joga break points, set points, iguais e tiebreaks. O resto é simulado.'} Dá para simular o resto a qualquer momento.</div></div>`
  :mm==='watch'?`<div class="v5mmsub xs mut">A partida é simulada e você acompanha o placar ponto a ponto, com os lances importantes. Dá para pular para o final.</div>`
  :`<div class="v5mmsub xs mut">Sem placar ao vivo: a partida é simulada na hora e você vai direto para o resultado.</div>`;
 const btn=mm==='play'?['court','Entrar em quadra']:mm==='watch'?['sim','Assistir à partida']:['fast','Ver o resultado'];
 const html=`<div class="v5sec"><span class="v5k">Como você quer a partida</span></div><div class="v5mm">${opt('play','Jogar','Em quadra, em tempo real')}${opt('watch','Simular assistindo','Placar ao vivo')}${opt('fast','Simular direto','Só o resultado')}</div>${sub}<button class="full big" style="margin-top:10px" onclick="goMatch('${btn[0]}')">${btn[1]}</button>`;
 s=s.replace(/<div class="v5sec"><span class="v5k">Como jogar<\/span><\/div>[^]*?<button class="full big"[^>]*>[^<]*<\/button>/,html)}catch(e){console.error(e)}return s}}
// tela antiga (sem o visual novo): acrescenta a opção
{const _t=tourLive;tourLive=function(){let s=_t();try{if(s.includes("['sim','📺 Só assistir']")||s.includes('Só assistir</button>')){s=s.replace(/(<button class="[^"]*" onclick="S\.me\.pmode='sim';save\(\);render\(\)">[^<]*Só assistir<\/button>)/,`$1<button class="${S.me.pmode==='fast'?'on':''}" onclick="S.me.pmode='fast';save();render()">Simular direto</button>`);
  if(S.me.pmode==='fast')s=s.replace(/onclick="goMatch\('court'\)">[^<]*<\/button>/,`onclick="goMatch('fast')">Ver o resultado</button>`)}}catch(e){}return s}}
{const _g=goMatch;goMatch=function(k){V5FAST=k==='fast';if(V5FAST){const T=S.tour,old=T&&T.vin;if(T)T.vin=1;try{return _g('sim')}finally{if(T&&!old)T.vin=old}}return _g(k)}}
{const _p=playMatch;playMatch=function(pre){_p(pre);if(V5FAST&&!pre){V5FAST=false;try{if(LIVE&&LIVE.phase==='live')skipLive()}catch(e){}}}}
{const _ec=enterCourt;enterCourt=function(){_ec();try{if(IM&&(IM.mode==='fast'))IM.mode=S.me.lpm||'key'}catch(e){}}}
