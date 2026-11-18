// =============== v5.7: tela da partida com o botão de jogar no topo e preparação em tela separada ===============
let V5PREP=0;
{const _m=v5Match;v5Match=function(){const s=_m();try{
 const iF=s.indexOf('<div class="v5sec"><span class="v5k">Sua forma</span>'),iT=s.indexOf('<div class="v5sec"><span class="v5k">Plano de jogo</span>'),iE=s.indexOf('<details id="v5acc-v5ext"'),iM=s.indexOf('<div class="v5sec"><span class="v5k">Como você quer a partida</span>');
 if(iF<0||iT<0||iM<0||!(iF<iT&&iT<iM))return s;
 const bre=/<button class="full big"[^>]*>[^<]*<\/button>/,mb=s.slice(iM).match(bre);if(!mb)return s;const iB=iM+s.slice(iM).indexOf(mb[0]),big=mb[0],rest=s.slice(iB+big.length);
 const head=s.slice(0,iF),form=s.slice(iF,iT),tacs=s.slice(iT,iE>iT&&iE<iM?iE:iM),ext=iE>iT&&iE<iM?s.slice(iE,iM):'',modes=s.slice(iM,iB);
 const tac=(tacs.match(/class="v5tac on"[^>]*><b>([^<]+)<\/b>/)||[])[1]||'Equilibrada',mm=v5MM(),pm=S.me.pmode||'key';
 const ml=mm==='play'?`Jogar · ${pm==='all'?'todos os pontos':'pontos decisivos'}`:mm==='watch'?'Simular assistindo':'Simular direto';
 const bigTop=big.replace('style="margin-top:10px"','');
 if(V5PREP){let opp='';try{const p=IDX.get(curOpp());opp=p?`contra ${flag(p.c)} ${esc(p.n)}`:''}catch(e){}
  return `<div class="v5prep"><button class="sec" onclick="V5PREP=0;render();window.scrollTo(0,0)">← Voltar para a partida</button><section style="margin-top:10px"><span class="v5k a">Preparação</span><h1 class="v5h1">Preparar partida</h1><p class="v5lede">${opp}</p></section>
   ${modes}${tacs}${ext}${form}<div class="v5gofix">${bigTop}</div></div>`}
 const go=`<div class="v5go">${bigTop}<button class="sec full v5prepb" onclick="V5PREP=1;render();window.scrollTo(0,0)"><span><b>Preparar partida</b><small>${ml} · Plano: ${esc(tac)}</small></span><i>›</i></button></div>`;const iS=head.indexOf('</section>');
 return (iS>=0?head.slice(0,iS+10)+go+head.slice(iS+10):head+go)+form+rest}catch(e){console.error(e);return s}}}
{const _g=goMatch;goMatch=function(k){V5PREP=0;return _g(k)}}
const curOpp=()=>{try{return oppOf()}catch(e){return null}};
