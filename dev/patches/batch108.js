// =============== v6.8.1 · janela pendente sempre aparece ===============
// Algumas decisões entram na fila depois que a semana já foi desenhada; sem redesenhar, os botões pareciam não responder.
function bcShowPending(){try{if(S&&!MENU&&!QUIET&&S.modals&&S.modals.length&&!document.querySelector('.modal'))render()}catch(e){}}
for(const fn of ['endWeek','rest','train','autoAdvance','fabAdvance']){try{const f=window[fn];if(typeof f==='function'){window[fn]=function(){const r=f.apply(this,arguments);bcShowPending();return r}}}catch(e){}}
