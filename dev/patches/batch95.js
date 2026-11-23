// =============== v6.1 · cabelos redesenhados, novos cortes e menu organizado ===============
setTimeout(()=>{try{Object.assign(HAIRS,{degrade:'Degradê',topete:'Topete',blackpower:'Black power',trancas:'Tranças'})}catch(e){}},0);
// novos cortes também para os outros jogadores (fixo por jogador)
{const _ai=aiAv;aiAv=function(p){const a=_ai(p);try{const r=seeded(p.id*31+11)();if(a.g==='f'){if(r<.1)a.h='trancas';else if(r<.16)a.h='blackpower'}else{if(r<.15)a.h='degrade';else if(r<.24)a.h='topete';else if(r<.3&&a.sk>=3)a.h='blackpower'}}catch(e){}return a}}
// boneco da quadra: os novos cortes usam o desenho mais próximo
{const _dp=v5DrawPl;const M={trancas:'longo',degrade:'curto',topete:'curto',blackpower:'cacheado'};v5DrawPl=function(g,px,py,s,av,...r){return _dp(g,px,py,s,av&&M[av.h]?{...av,h:M[av.h]}:av,...r)}}

// desenho dos cabelos (coordenadas do rosto de 100x100; contorno de nanquim vem do estilo HQ)
function bcHair(c,o){
 const {HR,H,hc,ac,f}=o,k=c.h;
 const INK='stroke="#140f0b" stroke-width="1.5" stroke-linejoin="round" paint-order="stroke"';
 const P=d=>`<path d="${d}" fill="${HR}"/>`;
 const S=(d,col,w,op)=>`<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" opacity="${op}" stroke-linecap="round"/>`;
 const hi=d=>S(d,H(.45),.6,.6),lo=d=>S(d,H(-.55),.6,.55),gl=d=>S(d,H(.7),1.7,.3);
 // borda em mechas: pontos alternando raiz e ponta
 const f1=v=>(+v).toFixed(1);
 const zig=(st,pr)=>{let d=`L${st[0]} ${st[1]}`,P=st;for(const [tx,ty,bx,by] of pr){d+=` Q${f1(P[0]-(P[0]-tx)*.15)} ${f1(ty-(ty-P[1])*.3)} ${tx} ${ty} Q${f1(bx+(tx-bx)*.55)} ${f1(by+(ty-by)*.45)} ${bx} ${by}`;P=[bx,by]}return d};
 const dots=(n,seed,inside)=>{const r=seeded(seed);let s='';for(let i=0;i<n*3&&s.length<n*95;i++){const x=30+r()*40,y=15+r()*34;if(!inside(x,y))continue;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r=".28" fill="${i%2?H(-.55):H(.4)}" opacity=".45"/>`}return s};
 const curl=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${HR}" ${INK}/><path d="M${(x-r*.55).toFixed(1)} ${(y+r*.15).toFixed(1)} a${(r*.42).toFixed(2)} ${(r*.42).toFixed(2)} 0 1 1 ${(r*.62).toFixed(2)} ${(r*.32).toFixed(2)}" stroke="${H(.45)}" stroke-width=".55" fill="none" opacity=".65" stroke-linecap="round"/><path d="M${(x-r*.6).toFixed(1)} ${(y+r*.45).toFixed(1)} q${(r*.6).toFixed(2)} ${(r*.5).toFixed(2)} ${(r*1.2).toFixed(2)} 0" stroke="${H(-.5)}" stroke-width=".5" fill="none" opacity=".55"/>`;
 const sides=(op)=>`<path d="M31.8 47.4 C30.8 38 32 31.6 35 27.6 L37.6 31.2 C35.4 34.4 34.4 39.4 34.4 48Z" fill="${hc}" opacity="${op}"/><path d="M68.2 47.4 C69.2 38 68 31.6 65 27.6 L62.4 31.2 C64.6 34.4 65.6 39.4 65.6 48Z" fill="${hc}" opacity="${op}"/>`+dots(26,7,(x,y)=>(x<36||x>64)&&y>30&&y<47);
 const sleek=`M32.4 45 C31.2 26 39.6 16.4 50 16.4 C60.4 16.4 68.8 26 67.6 45 L66.4 45 C66 37 63.4 31.6 59 29.6 Q54.6 28.2 50 28.4 Q45.4 28.2 41 29.6 C36.6 31.6 34 37 33.6 45Z`;
 const braid=(x0,y0,x1,y1,n,w)=>{let s='';for(let i=0;i<n;i++){const t=i/(n-1),x=x0+(x1-x0)*t,y=y0+(y1-y0)*t;s+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${w}" ry="${(w*.85).toFixed(2)}" fill="${HR}" stroke="#140f0b" stroke-width=".7"/><path d="M${(x-w*.5).toFixed(1)} ${(y-w*.2).toFixed(1)} q${(w*.5).toFixed(2)} ${(w*.5).toFixed(2)} ${w} 0" stroke="${H(.45)}" stroke-width=".45" fill="none" opacity=".7"/>`}return s};
 let back='',front='';
 if(k==='curto'){
  front=P(`M31 46.4 C29 30 33 17.6 44 14.6 C50 13 57 13.4 62 16 C68.6 19.6 71.4 29 69 46.4 L68 49 L66.6 48.4 `+`L66.2 39 L64.8 30.8 `+zig([64.8,30.8],[[62,35.4,59.6,30],[55.2,34.6,53,29.6],[48.4,34.4,46.4,30],[41.6,35,39.6,31.6],[35.6,37.6,34.4,39.4]])+` L33.8 48.4 L32.2 49Z`)
   +hi('M61 18.4 Q58.4 25 55 34 M53 16.4 Q50 23.6 48 33.6 M45.4 17.4 Q42.6 25 41.4 34.2 M65 23 Q64 29 61 34.6')+lo('M57 19.4 Q54 26 51.6 29.8 M49 19 Q46 25.6 45.2 30.2 M40.6 21 Q38 27 38.8 31.6')+gl('M40 19.8 Q48 15.4 58.6 17.8');
 }else if(k==='degrade'){
  front=sides(.62)+P(`M33.6 37.4 C32 24 39 15.6 50 15.2 C61 15.6 68 24 66.4 37.4 `.trim()+' '+`L66.4 37.4 L64.6 31 `+zig([64.6,31],[[61.6,33.6,59.4,29.8],[55.4,32.8,53.4,29.4],[49,32.6,47.2,29.6],[42.4,33,40.6,30.6],[35.4,35.4,33.6,37.4]])+`Z`)
   +hi('M58 18.6 Q56 24 54.4 32 M50 17.4 Q48.6 24 47.6 31.6 M42.6 19.6 Q41.6 25 41 32.4')+lo('M54 19.4 Q52 25 51 29.8 M46 19.6 Q45 25 44.4 30.2')+gl('M41 19.4 Q49 15.6 58 18');
 }else if(k==='topete'){
  front=sides(.62)+P(`M34.4 36.4 C32.8 25 35.6 17 42.6 12.4 C47.6 9.4 55.4 8.6 61.4 10.2 C66 11.6 68.6 14.6 67.6 17.4 C66.8 19.4 64.8 19.8 63.4 19.4 C65.4 23.4 66.4 28.6 66 36.4 C63.6 32 59.6 29.8 55 29.6 C48 29.4 41 31 34.4 36.4Z`)
   +hi('M38.4 31 Q39.4 19 51 12.4 M44.4 29.8 Q46 19 57.4 11.6 M52 29.2 Q54.4 20 63.2 14.4 M59.6 30 Q62 24 63.4 19.6')+lo('M41 30.4 Q42.6 21 53 13.4 M48 29.4 Q50.4 20.6 60 13')+gl('M43.4 15.6 Q52 9.8 61 11');
 }else if(k==='raspado'){
  front=`<path d="M32 45 C31 26 39.6 18 50 18 C60.4 18 69 26 68 45 L66.8 47 L65.4 46.4 C65.6 39 64.4 34 62.4 31.4 Q56 28.6 50 28.8 Q44 28.6 37.6 31.4 C35.6 34 34.4 39 34.6 46.4 L33.2 47Z" fill="${hc}" opacity=".8" stroke="${H(-.5)}" stroke-width=".5"/>`
   +dots(150,c.hc*7+3,(x,y)=>{const a=((x-50)/17.2)**2+((y-41)/22)**2<1&&y<42;const face=((x-50)/13.6)**2+((y-44)/15.4)**2<1;return a&&!face})+gl('M40 22.6 Q48 18.8 57 20.6');
 }else if(k==='cacheado'){
  if(f)back=P(`M29 44 C26.6 22 37 12 50 12 C63 12 73.4 22 71 44 C72 54 73 60 72 66 L28 66 C27 60 28 54 29 44Z`)+[[28.6,50,4.6],[27.6,58,4.4],[29.4,65,4.2],[71.4,50,4.6],[72.4,58,4.4],[70.6,65,4.2]].map(a=>curl(...a)).join('');
  front=P(`M31 47 C28.4 30 33 15 50 13.4 C67 15 71.6 30 69 47 L66.6 47 C66 39 64.6 34 62 31.6 Q56 29.8 50 30 Q44 29.8 38 31.6 C35.4 34 34 39 33.4 47Z`)
   +[[32.4,40,4.4],[33,31.6,4.8],[37.6,24,5],[44.4,18.6,5.2],[52,17,5.2],[59.6,19.4,5],[65.6,25,4.8],[67.6,33,4.6],[67.6,41,4.4],[41,27.6,4],[48.6,24.6,4.2],[56.4,25.6,4],[62.4,29.6,3.6],[36.6,32.6,3.4],[43.6,31.4,3.2],[50,30.4,3.2],[56.6,31.2,3.2],[62.8,33.6,3]].map(a=>curl(...a)).join('');
 }else if(k==='blackpower'){
  let d='';const n=24,cx=50,cy=31,rx=25,ry=22;for(let i=0;i<=n;i++){const a=Math.PI*2*i/n,x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;if(!i){d+=`M${x.toFixed(1)} ${y.toFixed(1)}`;continue}const am=Math.PI*2*(i-.5)/n;d+=` Q${(cx+Math.cos(am)*rx*1.1).toFixed(1)} ${(cy+Math.sin(am)*ry*1.1).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`}
  const r=seeded(c.hc*13+5);let t='';for(let i=0;i<70;i++){const a=r()*Math.PI*2,q=Math.sqrt(r())*.92,x=cx+Math.cos(a)*rx*q,y=cy+Math.sin(a)*ry*q;if(y>29&&Math.abs(x-50)<16)continue;t+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)} a1 1 0 1 1 1.4 .6" stroke="${i%2?H(.42):H(-.5)}" stroke-width=".5" fill="none" opacity=".6"/>`}
  back=`<path d="${d}Z" fill="${HR}"/>`+t+gl('M34 18 Q44 10.6 58 11.4');
  front=`<path d="M31.6 45 C30.6 26 39 16.6 50 16.6 C61 16.6 69.4 26 68.4 45 L65.8 45 C65.6 38 64 34.6 61.4 32.4 Q56 30.6 50 30.8 Q44 30.6 38.6 32.4 C36 34.6 34.4 38 34.2 45Z" stroke="none" fill="${HR}"/>`+hi('M38 30 q2 -1.4 4 -.6 M46 28.8 q2 -1 4 0 M54 28.8 q2 -1 4 .2 M60.6 30 q1.6 .2 3 1.4');
 }else if(k==='medio'){
  back=P(`M30 44 C28 22 38 13 50 13 C62 13 72 22 70 44 C70.6 54 72 61 73.6 67.4 L70 65 L69.2 69.8 L65.6 66.4 L63 70.4 C58 71 42 71 37 70.4 L34.4 66.4 L30.8 69.8 L30 65 L26.4 67.4 C28 61 29.4 54 30 44Z`)+hi('M31.6 50 Q30.6 60 28.6 66 M68.4 50 Q69.4 60 71.4 66')+lo('M33 56 Q33 64 32.6 69 M67 56 Q67 64 67.4 69');
  front=P(`M30.6 50 C28.6 26 37 14.4 50 14.4 C63 14.4 71.4 26 69.4 50 L68.8 60.6 L66.6 56.6 L66.4 46 C66 38 64.2 33.4 61.4 30.4 `+zig([61.4,30.4],[[57.8,36,55.2,29.2],[49.8,34.4,47.4,28.4],[42,32.4,39.6,28.6]])+` C35.6 32 33.8 38 33.6 46 L33.4 56.6 L31.2 60.6Z`)
   +hi('M44 16.4 Q49 22 53.4 34 M51 15.6 Q56 21 59.8 35 M38 19 Q42 23 47.2 33 M64 26 Q67 34 67.6 50 M35.6 25 Q33.4 34 33 50')+lo('M41 17.4 Q46 22 50.8 28.6 M58 18 Q62 22 64 30')+gl('M44.4 17.4 Q52 14.8 60.6 18.6');
 }else if(k==='longo'){
  back=P(`M29.6 44 C27.6 21 38 12.6 50 12.6 C62 12.6 72.4 21 70.4 44 C71.6 60 75 76 78.6 92 L74 89 L72.6 95 L68 91 C60 94 40 94 32 91 L27.4 95 L26 89 L21.4 92 C25 76 28.4 60 29.6 44Z`)+hi('M31 52 Q29 70 25 88 M69 52 Q71 70 75 88 M34 58 Q33 74 30 90 M66 58 Q67 74 70 90')+lo('M32.6 64 Q30.6 78 28 92 M67.4 64 Q69.4 78 72 92');
  front=P(`M31 52 C28.6 26 37.6 14.4 50 14.4 C62.4 14.4 71.4 26 69 52 L69.6 68 L67.4 64 L66.6 72.4 L64.4 66.6 C65.4 58 66 50 65.8 44 C65.4 35 61 27 53.4 22.6 Q51 21 50.2 18.6 Q49.4 21 46.6 22.6 C39 27 34.6 35 34.2 44 C34 50 34.6 58 35.6 66.6 L33.4 72.4 L32.6 64 L30.4 68Z`)
   +hi('M50 18.6 Q42 22.6 37.4 33 Q35 45 34.6 60 M50.6 18.6 Q58 22.6 62.6 33 Q65 45 65.4 60 M46 18.4 Q39 22 35 30')+lo('M47.4 21 Q41 25 38.4 32 M53 21 Q59 25 61.6 32')+gl('M40 20.6 Q44.6 16.8 49 16.4 M60 20.6 Q55.4 16.8 51.4 16.4');
 }else if(k==='rabo'){
  back=P(`M62.4 24.6 C70 21.6 76.4 26 77.8 34 C79.4 44 77.4 56 80.6 70 C81.6 76 80.8 82 78 86.6 C78.4 80.4 76.6 76 74 72 C70.4 64 68.4 54 67 46 C66 38 64.2 31 62.4 24.6Z`)+hi('M68 29.6 Q74.6 40 73.4 56 Q74.4 66 78 80')+lo('M66.4 34 Q70.4 46 71.4 60 M71 30 Q77 40 76.4 54')
   +`<ellipse cx="64.4" cy="26.4" rx="2.6" ry="2.2" fill="${ac}" ${INK}/>`;
  front=P(sleek)+hi('M37 34 Q43 24 60 22.4 M41.4 30 Q50 24.4 62.4 24.4 M50 28.6 Q57 25.6 63.4 25.8')+lo('M39 31.6 Q46 25.4 58 24')+gl('M39.6 22.6 Q47 17.8 57 18.8')+S('M34.2 38.4 q-1.2 4 -.4 8.2 M65.8 38.4 q1.2 4 .4 8.2',hc,.55,.8);
 }else if(k==='coque'){
  back=P(`M41.4 17.4 C41 11.6 45.6 8.6 50.2 8.6 C55 8.6 59.2 11.4 58.8 17 C58.4 20.4 54.6 21.8 50.2 21.8 C45.6 21.8 41.6 20.4 41.4 17.4Z`)+hi('M43.4 13.4 Q50 9.6 57 12.6 M42.6 17 Q50 13.4 58.2 16.4')+lo('M44.4 19.6 Q50 21.4 56 19.6');
  front=P(sleek)+hi('M37 35 Q40 24 48 20.4 M63 35 Q60 24 52 20.4 M42 30 Q45 23 49.4 21 M58 30 Q55 23 50.6 21')+S('M43.4 20.2 Q50 22.8 56.6 20.2',ac,1.7,1)+gl('M40.6 24 Q45 19.6 49 19')+S('M34.2 38.4 q-1.2 4 -.4 8.2 M65.8 38.4 q1.2 4 .4 8.2',hc,.55,.8);
 }else if(k==='trancas'){
  back=P(`M30 42 C28 22 38 13 50 13 C62 13 72 22 70 42 C72 60 74.6 76 76.6 92 L23.4 92 C25.4 76 28 60 30 42Z`)+[[26,46,20,94],[30,48,25,96],[70,48,75,96],[74,46,80,94]].map(([a,b,c2,d])=>braid(a,b,c2,d,15,1.9)).join('');
  front=P(`M32 46 C30.6 26 39.4 15.4 50 15.4 C60.6 15.4 69.4 26 68 46 L66.4 46 C66 37 63.6 31.8 59.4 29.8 Q54.8 28.4 50 28.6 Q45.2 28.4 40.6 29.8 C36.4 31.8 34 37 33.6 46Z`)
   +lo('M42 29.6 Q44 22 47 16.2 M50 28.6 L50 15.8 M58 29.6 Q56 22 53 16.2 M36 35 Q38 26 43.4 18 M64 35 Q62 26 56.6 18')+hi('M46 29 Q47.4 22 48.6 16.4 M54 29 Q52.6 22 51.4 16.4 M39.4 31.6 Q41 24 45 17.4 M60.6 31.6 Q59 24 55 17.4')
   +braid(32.6,47,28.6,84,13,1.8)+braid(67.4,47,71.4,84,13,1.8)+`<rect x="26.6" y="85" width="4" height="3.2" rx="1.2" fill="${ac}" ${INK}/><rect x="69.4" y="85" width="4" height="3.2" rx="1.2" fill="${ac}" ${INK}/>`;
 }else return null;
 return{back,front}}

// =============== menu dentro do jogo: atalhos e seções que abrem e fecham ===============
let BCMS=null;
const BCMSEC=[['visual','Visual e idioma',['Tema de cores','Idioma','Tamanho do texto','Modo econômico']],
 ['partida','Partida e som',['Narração','Vibração','Replay','Lances','Jogar as duplas','Intervalos','Trilha sonora','Volume da música','Música baixinha','Volume dos sons']],
 ['carreira','Carreira e jogadores',['Sem polêmicas','Pular entrevistas','Editor de jogadores','Imagens dos torneios']],
 ['backup','Backup e amigos',['Enviar backup','Exportar como texto','Desafio entre amigos','Instalar como app']],
 ['a11y','Acessibilidade',['Cores','Alto contraste']],
 ['ajuda','Ajuda',['O que é cada coisa','Sobre e novidades','Reportar um problema','Rever o passo a passo']]];
const BCMQ=[['Salvar agora','<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>'],['Baixar backup','<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'],['Sons','<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/>'],['Como jogar','<circle cx="12" cy="12" r="9"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5v.6M12 17h.01"/>']];
function bcMsT(k){BCMS=BCMS===k?null:k;document.querySelectorAll('.bcms').forEach(e=>e.classList.toggle('on',e.dataset.k===BCMS))}
function bcMenuFix(){try{if(INMENU!==true)return;const box=document.querySelector('.modal .box');if(!box||box.dataset.bcm)return;const mk=box.querySelector(':scope>.mk');if(!mk||!/Menu/i.test(mk.textContent))return;
 const tx=e=>{const c=e.cloneNode(true);c.querySelectorAll('small').forEach(x=>x.remove());return c.textContent.replace(/\s+/g,' ').trim().replace(/^[^A-Za-zÀ-ú]+/,'')};
 const items=[];let cur=null,h2=null,tail=[];
 for(const e of [...box.children]){if(e===mk)continue;if(e.tagName==='H2'){h2=e;continue}
  if(e.classList.contains('sec-t')||e.classList.contains('small')){cur={k:tx(e),els:[e]};items.push(cur);continue}
  if(e.matches('button.opt,div.opt')){cur=null;items.push({k:tx(e),els:[e]});continue}
  if(e.matches('button.full')){tail.push(e);continue}
  if(cur)cur.els.push(e);else items.push({k:tx(e),els:[e]})}
 const take=pre=>{const i=items.findIndex(x=>x.k.startsWith(pre));return i<0?null:items.splice(i,1)[0]};
 box.dataset.bcm=1;box.classList.add('bcmenu');
 const top=document.createElement('div');top.className='bcmtop';top.innerHTML=`<div></div><button class="bcmx" onclick="INMENU=false;render()" aria-label="Fechar">✕</button>`;top.firstChild.append(mk);if(h2)top.firstChild.append(h2);box.append(top);
 const q=document.createElement('div');q.className='bcmq';for(const [pre,ic] of BCMQ){const it=take(pre);if(!it)continue;const b=it.els[0];b.insertAdjacentHTML('afterbegin',`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ic}</svg>`);q.append(...it.els)}box.append(q);
 const mp=take('Menu principal');const op=take('Opções');if(op)op.els.forEach(e=>e.remove());
 const sec=(key,title,list)=>{if(!list.length)return;const d=document.createElement('div');d.className='bcms'+(BCMS===key?' on':'');d.dataset.k=key;d.innerHTML=`<button class="bcmh" onclick="bcMsT('${key}')"><span>${title}</span><em>${list.length} ${list.length>1?'itens':'item'}</em><i>›</i></button><div class="bcmb"></div>`;list.forEach(x=>d.lastChild.append(...x.els));box.append(d)};
 for(const [key,title,pres] of BCMSEC)sec(key,title,pres.map(take).filter(Boolean));
 sec('mais','Mais',items.splice(0));
 if(mp)box.append(...mp.els);box.append(...tail)}catch(e){console.error(e)}}
{const _r=render;render=function(...a){const v=_r.apply(this,a);bcMenuFix();return v}}
