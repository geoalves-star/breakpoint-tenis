// =============== v6.8.1 · janela pendente sempre aparece ===============
// Algumas decisões entram na fila depois que a semana já foi desenhada; sem redesenhar, os botões pareciam não responder.
function bcShowPending(){try{if(S&&!MENU&&!QUIET&&S.modals&&S.modals.length&&!document.querySelector('.modal'))render()}catch(e){}}
for(const fn of ['endWeek','rest','train','autoAdvance','fabAdvance']){try{const f=window[fn];if(typeof f==='function'){window[fn]=function(){const r=f.apply(this,arguments);bcShowPending();return r}}}catch(e){}}
// =============== v6.8.2 · "Continuar carreira" abre a última carreira jogada e avisa quando não consegue abrir ===============
{const _sn=saveNow;saveNow=function(){const r=_sn.apply(this,arguments);try{if(S&&SLOT!=null)localStorage.setItem('bp_last',String(SLOT))}catch(e){}return r}}
function bcLastSlot(){const M=[0,1,2].map(i=>({i,m:slotMeta(i)})).filter(x=>x.m);if(!M.length)return -1;let last=-1;try{last=+localStorage.getItem('bp_last')}catch(e){}
 const act=M.filter(x=>!x.m.ended),pool=act.length?act:M;const L=pool.find(x=>x.i===last);if(L)return L.i;
 return pool.slice().sort((a,b)=>(b.m.ts||0)-(a.m.ts||0))[0].i}
v5HeroGo=function(){const n=bcLastSlot();if(n>=0){openSlot(n);return}for(let i=0;i<3;i++)if(!slotMeta(i)){openSlot(i);return}openSlot(0)};
{const _o=openSlot;openSlot=function(n){window.LOADERR=null;let fail=null;try{_o.apply(this,arguments)}catch(e){fail=e;console.error(e)}
 if(fail&&S&&!MENU){try{IM=null;LIVE=null;S.modals=S.modals||[];INMENU=false;TAB='home';render();return}catch(e2){fail=e2}}
 if((fail||MENU)&&slotMeta(n)){const er=fail||window.LOADERR;MENU=true;S=null;TOAST=`⚠️ Não consegui abrir essa carreira agora. Feche e abra o jogo e tente de novo. Se continuar, importe seu backup no menu.${er&&er.message?' (erro: '+String(er.message).slice(0,60)+')':''}`;try{render()}catch(e){}}}}
