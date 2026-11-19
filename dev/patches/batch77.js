// =============== v5.7: escolhas da partida (sorteio, sinal do treinador, intervalo, chuva, cãibra, desafio) por cima da quadra ===============
function v5DivEnd(s,i){const re=/<\/?div\b[^>]*>/g;re.lastIndex=i;let d=0,m;while((m=re.exec(s))){if(m[0][1]==='/'){d--;if(d===0)return re.lastIndex}else d++}return -1}
let V5OVK=null;
{const _cv=courtView;courtView=function(){let s=_cv();try{const I=IM;if(!I||!v5ArcOn()||I.E.done||I.anim||!s.includes('<canvas id="v5arc"'))return s;
 const block=I.toss==='win'||I.sig||I.cramp===1||I.rainP||I.brk||I.chal;if(!block){V5OVK=null;return s}
 const ci=s.indexOf('<canvas id="v5arc"'),ce=s.indexOf('</canvas>',ci)+9;let i=-1,e=-1;
 const marks=['<div class="card" style="margin-top:8px;border-color','<div class="sec-t" style="margin-top:8px">🪑'];for(const mk of marks){const j=s.indexOf(mk,ce);if(j>=0&&(i<0||j<i))i=j}
 if(i<0)return s;e=v5DivEnd(s,i);if(e<0)return s;if(I.brk){const j=s.indexOf('<div class="choices">',e);if(j>=0&&j-e<40){const e2=v5DivEnd(s,j);if(e2>0)e=e2}}
 const panel=s.slice(i,e);s=s.slice(0,i)+s.slice(e);const canvas=s.slice(ci,ce);
 s=s.slice(0,ci)+`<div class="v5arcw">${canvas}<div class="v5arcov">${panel}</div></div>`+s.slice(ce);
 const k=[I.toss,!!I.sig,I.cramp,!!I.rainP,!!I.brk,!!I.chal,I.E.TL.length].join('|');if(V5OVK!==k){V5OVK=k;setTimeout(()=>{const el=document.querySelector('.v5arcw');if(el)el.scrollIntoView({block:'center',behavior:'smooth'})},60)}}catch(e){console.error(e)}return s}}
