// =============== v5.9: carreira rápida (5 temporadas, menos interrupções) ===============
const V5QN=5;
const v5Quick=()=>!!(S&&S.quick);
{const _ng=newGame;newGame=function(o){_ng(o);try{if(o&&o.quick&&S){S.quick={y0:year(),n:V5QN};S.me.pmode='fast';try{autoPlan('eq')}catch(e){}news(`⏱️ Carreira rápida: ${V5QN} temporadas, calendário montado automaticamente e menos interrupções.`)}}catch(e){}}}
{const _qi=queueInterview;queueInterview=function(){if(v5Quick())return;return _qi.apply(this,arguments)}}
{const _pc=pressConf;pressConf=function(){if(v5Quick())return;return _pc.apply(this,arguments)}}
{const _mu=v5Must;v5Must=function(){const L=_mu();return v5Quick()?L.filter(x=>x.id!=='dm'):L}}
// planejamento automático a cada ano novo e fim após 5 temporadas
{const _ny=newYear;newYear=function(){const r=_ny.apply(this,arguments);try{if(v5Quick()&&!S.ended){const done=year()-S.quick.y0;if(done>=S.quick.n){endCareer(`Fim da carreira rápida: ${S.quick.n} temporadas.`)}else{try{autoPlan('eq')}catch(e){}news(`⏱️ Carreira rápida: temporada ${done+1} de ${S.quick.n}.`)}}}catch(e){console.error(e)}return r}}
// indicador no topo da semana
{const _hv=homeView;homeView=function(){let s=_hv();try{if(v5Quick()&&!S.ended){const n=year()-S.quick.y0+1;s=`<div class="v5qk"><span>⏱️ Carreira rápida</span><b>Temporada ${n} de ${S.quick.n}</b><i style="--p:${Math.round(((n-1)*52+S.w%52)/(S.quick.n*52)*100)}%"></i></div>`+s}}catch(e){}return s}}
