// =============== v5.6: visual da partida em tempo real (estádio, jogadores HQ, efeitos) ===============
const V5INK='#140f0b',V5PAP='#F3ECDC';
let V5FX=[],V5SHK=null,V5CHR=null,V5BG=null,V5ATR=[],V5ATB=null,V5APS={me:{ph:0,lx:0,sw:null},op:{ph:0,lx:0,sw:null}},V5PAV=null;
function v5Stadium(ev){const t=ev.tier||'',n=(ev.name||'').toLowerCase();
 const fill=t==='GS'?.96:t==='M1000'||t==='OLY'||t==='WTA1000'?.86:t==='A500'||t==='WTA500'?.72:t==='A250'||t==='WTA250'?.56:/^CH/.test(t)||/125/.test(t)?.32:.12;
 let wall=ev.surf==='clay'?'#24452d':ev.surf==='grass'?'#1d4a2a':'#1b2440',acc='#D9F24A';
 if(n.includes('wimbledon')){wall='#1f4a2c';acc='#7b4bb3'}else if(n.includes('roland')){wall='#1f5236';acc='#e0763f'}else if(n.includes('us open')){wall='#16285e';acc='#ffd400'}else if(n.includes('austral')){wall='#1a3b8a';acc='#2fb7e8'}
 else if(fill<.2){wall='#2b2a27';acc='#9aa0a6'}
 return{fill,wall,acc,big:t==='GS'}}
// fundo em cache: arquibancada, muro, quadra, linhas (duas versões da torcida: sentada e em pé)
function v5BgBuild(W,H,dpr,ev,P,top){const st=v5Stadium(ev),sc=SURFC[ev.surf]||SURFC.hard,R=seeded(((ev.name||'x').length*131+(ev.city||'').length*17+W)|0),out=[];
 const wallB=P(0,1.24)[1],wallT=wallB-Math.max(16,H*.045);
 const crowd=[];for(let y=wallT-4;y>-8;y-=8.5){const row=[];for(let x=-4;x<W+6;x+=6.4+R()*1.6){row.push({x:x+R()*2,on:R()<st.fill,sk:SKIN[Math.floor(R()*6)],c:['#e8312f','#2f6bff','#ffffff','#ffd400','#18b39b','#ff7a3d','#1d1d1d','#ff5fa2','#c8f04f','#7b5cff'][Math.floor(R()*10)],hat:R()<.18,up:R()<.62})}crowd.push({y,row})}
 for(const up of [0,1]){const c=document.createElement('canvas');c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);const g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
  // arquibancada
  const gr=g.createLinearGradient(0,0,0,wallT);gr.addColorStop(0,'#0c0a09');gr.addColorStop(1,shade(st.wall,-.45));g.fillStyle=gr;g.fillRect(0,0,W,wallT);
  for(const r of crowd){g.fillStyle='#ffffff10';g.fillRect(0,r.y+3,W,1.2);for(const p of r.row){if(!p.on){g.fillStyle='#ffffff0d';g.fillRect(p.x-2.2,r.y-1,4.4,4);continue}const b=up&&p.up?-1.6:0;
    g.fillStyle=p.c;g.beginPath();g.roundRect(p.x-2.6,r.y+b,5.2,6,2);g.fill();g.fillStyle=p.sk;g.beginPath();g.arc(p.x,r.y-1.8+b,2.1,0,6.3);g.fill();if(p.hat){g.fillStyle=st.acc;g.fillRect(p.x-2.3,r.y-4.2+b,4.6,1.6)}
    if(up&&p.up){g.strokeStyle=p.sk;g.lineWidth=1.1;g.beginPath();g.moveTo(p.x-2.4,r.y+1+b);g.lineTo(p.x-3.6,r.y-4.5+b);g.moveTo(p.x+2.4,r.y+1+b);g.lineTo(p.x+3.6,r.y-4.5+b);g.stroke()}}}
  // muro de fundo com o nome do torneio
  g.fillStyle=st.wall;g.fillRect(0,wallT,W,wallB-wallT+2);g.fillStyle=st.acc;g.fillRect(0,wallT,W,2);g.fillStyle=V5INK;g.fillRect(0,wallB,W,2);
  g.font=`800 ${Math.round(Math.max(9,H*.026))}px Archivo, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=V5PAP;const nm=(ev.name||'').toUpperCase();
  try{g.letterSpacing='2px'}catch(e){}g.fillText(nm.length>30?nm.slice(0,30)+'…':nm,W/2,(wallT+wallB)/2+1);g.font=`700 ${Math.round(Math.max(7,H*.018))}px 'JetBrains Mono', monospace`;g.fillStyle=st.acc;g.fillText((typeof bcBanner==='function'?bcBanner(ev):'BREAKPOINT'),W*.11,(wallT+wallB)/2+1);g.fillText((ev.city||'').toUpperCase().slice(0,12),W*.89,(wallT+wallB)/2+1);try{g.letterSpacing='0px'}catch(e){}g.textBaseline='alphabetic';
  // chão em volta
  const q=(x0,y0,x1,y1)=>{const a=P(x0,y0),b=P(x1,y0),c=P(x1,y1),d=P(x0,y1);g.beginPath();g.moveTo(...a);g.lineTo(...b);g.lineTo(...c);g.lineTo(...d);g.closePath()};
  const outC=ev.surf==='hard'?sc[1]:shade(sc[0],-.12),inC=sc[0];g.fillStyle=outC;g.fillRect(0,wallB+2,W,H);
  if(ev.surf==='grass'){for(let i=0,y=-.2;y<1.16;y+=.075,i++){q(-3,y,3,Math.min(1.16,y+.075));g.fillStyle=i%2?shade(inC,-.07):shade(inC,.05);g.fill()}}
  else{q(-1.2,-.13,1.2,1.22);g.fillStyle=inC;g.fill()}
  if(ev.surf==='clay'){for(let i=0;i<420;i++){const x=(R()*2.6-1.3),y=R()*1.3-.15,[a,b]=P(x,y),[c2]=P(x+.05+R()*.08,y);g.strokeStyle=R()<.5?'#ffffff16':'#5a1f0a1c';g.lineWidth=1;g.beginPath();g.moveTo(a,b);g.lineTo(c2,b);g.stroke()}}
  if(ev.surf==='hard'){for(let i=0;i<500;i++){const[a,b]=P(R()*2.4-1.2,R()*1.26-.13);g.fillStyle=R()<.5?'#ffffff0c':'#0000000c';g.fillRect(a,b,1.2,1.2)}}
  // desgaste perto das linhas de base
  const wear=ev.surf==='grass'?'#b99a5a':ev.surf==='clay'?'#f2a774':null;if(wear){for(const yb of [0,1]){const[cx,cy]=P(0,yb),[ex]=P(.42,yb);g.fillStyle=wear+'55';g.beginPath();g.ellipse(cx,cy,ex-cx,(14-6*yb)*(H/430),0,0,6.3);g.fill()}}
  // linhas com perspectiva
  const ln=(x0,y0,x1,y1)=>{const a=P(x0,y0),b=P(x1,y1);g.lineWidth=Math.max(1,(2.6-1.2*(y0+y1)/2)*(W/360));g.beginPath();g.moveTo(...a);g.lineTo(...b);g.stroke()};
  g.strokeStyle=ev.surf==='clay'?'#fbf3e6':'#F7F3EA';g.lineCap='butt';
  ln(-1,0,1,0);ln(-1,1,1,1);ln(-1,0,-1,1);ln(1,0,1,1);ln(-.75,0,-.75,1);ln(.75,0,.75,1);ln(-.75,.27,.75,.27);ln(-.75,.73,.75,.73);ln(0,.27,0,.73);ln(0,0,0,.025);ln(0,1,0,.975);
  // vinheta
  const vg=g.createRadialGradient(W/2,H*.62,H*.25,W/2,H*.62,H*.85);vg.addColorStop(0,'#0000');vg.addColorStop(1,'#0007');g.fillStyle=vg;g.fillRect(0,wallB,W,H);
  out.push(c)}
 // rede + cadeira do árbitro (camada separada para ficar na frente da bola do outro lado)
 const c=document.createElement('canvas');c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);const g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 const nL=P(-1.1,.5,0),nR=P(1.1,.5,0),tL=P(-1.1,.5,.62),tR=P(1.1,.5,.62),tC=P(0,.5,.52);
 g.fillStyle='#0000002e';g.beginPath();g.moveTo(...nL);g.lineTo(...nR);g.lineTo(nR[0]+4,nR[1]+9);g.lineTo(nL[0]-4,nL[1]+9);g.closePath();g.fill();
 g.save();g.beginPath();g.moveTo(...nL);g.lineTo(...nR);g.lineTo(...tR);g.lineTo(...tC);g.lineTo(...tL);g.closePath();g.fillStyle='#140f0b55';g.fill();g.clip();
 g.strokeStyle='#ffffff2a';g.lineWidth=.8;for(let x=nL[0];x<nR[0];x+=3.2){g.beginPath();g.moveTo(x,tL[1]-6);g.lineTo(x,nL[1]);g.stroke()}for(let y=tC[1];y<nL[1];y+=3.2){g.beginPath();g.moveTo(nL[0],y);g.lineTo(nR[0],y);g.stroke()}g.restore();
 g.strokeStyle=V5INK;g.lineWidth=1.4;g.beginPath();g.moveTo(...nL);g.lineTo(...nR);g.stroke();
 g.strokeStyle=V5PAP;g.lineWidth=2.6*(W/360);g.beginPath();g.moveTo(...tL);g.lineTo(...tC);g.lineTo(...tR);g.stroke();g.lineWidth=1.6;g.beginPath();g.moveTo(...tC);g.lineTo(...P(0,.5,0));g.stroke();
 for(const p of [[nL,tL],[nR,tR]]){g.fillStyle='#2b2a27';g.strokeStyle=V5INK;g.lineWidth=1.4;g.beginPath();g.roundRect(p[0][0]-2.5,p[1][1]-3,5,p[0][1]-p[1][1]+3,1.5);g.fill();g.stroke()}
 // cadeira do árbitro
 {const[ux,uy]=P(-1.32,.5),k=W/360;g.strokeStyle=V5INK;g.lineWidth=2;g.beginPath();g.moveTo(ux-6*k,uy);g.lineTo(ux-4*k,uy-26*k);g.moveTo(ux+6*k,uy);g.lineTo(ux+4*k,uy-26*k);g.moveTo(ux-5*k,uy-13*k);g.lineTo(ux+5*k,uy-13*k);g.stroke();
  g.fillStyle=st.wall;g.beginPath();g.roundRect(ux-7*k,uy-30*k,14*k,5*k,1.5);g.fill();g.stroke();g.fillStyle='#2b2a27';g.beginPath();g.roundRect(ux-4.5*k,uy-41*k,9*k,11*k,3);g.fill();g.stroke();g.fillStyle=SKIN[2];g.beginPath();g.arc(ux,uy-45*k,3.6*k,0,6.3);g.fill();g.stroke()}
 out.push(c);return{key:'',img:out,wallB,st}}
// ---------- jogador em traço de HQ ----------
function v5Limb(g,a,b,w,col){g.strokeStyle=V5INK;g.lineWidth=w+2.6;g.beginPath();g.moveTo(...a);g.lineTo(...b);g.stroke();g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(...a);g.lineTo(...b);g.stroke()}
function v5Lerp(k,arr){const n=arr.length-1,f=clamp(k,0,1)*n,i=Math.min(n-1,Math.floor(f)),t=f-i;return arr[i]+(arr[i+1]-arr[i])*t}
function v5Ease(k){return k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2}
// pose: {mode:'ready'|'prep'|'swing'|'srvReady'|'toss'|'serve', side:'fh'|'bh', k:0..1, ph: fase da corrida, run:0..1}
function v5DrawPl(g,px,py,s,av,front,pose,now,rk){const sk=SKIN[av.sk]||SKIN[1],hc=HAIRC[av.hc]||HAIRC[0],sh=SHIRT[av.sh]||SHIRT[0],ac=ACCC[av.ac??0]||'#fff',f=av.g==='f';
 const shorts=av.sh===5?'#F3ECDC':shade(sh,-.6),rkC=rk||(ac==='#ffffff'?'#e8312f':ac);
 g.save();g.translate(px,py);g.scale(front?-s:s,s);g.lineCap='round';g.lineJoin='round';
 // sombra
 g.fillStyle='#0000004d';g.beginPath();g.ellipse(2,1,17,4.5,0,0,6.3);g.fill();
 const run=pose.run||0,ph=pose.ph||0,bob=run>.05?-Math.abs(Math.sin(ph))*2.2:Math.sin(now/170)*.7;
 // pernas
 const lf=[-7+Math.sin(ph)*4*run,-Math.max(0,Math.sin(ph))*4*run],rf=[7-Math.sin(ph)*4*run,-Math.max(0,-Math.sin(ph))*4*run];
 for(const[ft,hx]of[[lf,-4],[rf,4]]){v5Limb(g,[hx,-22+bob],[ft[0]*.8,ft[1]-9],4.6,sk);v5Limb(g,[ft[0]*.8,ft[1]-9],[ft[0],ft[1]-2.5],4.2,'#ffffff');g.fillStyle='#ffffff';g.strokeStyle=V5INK;g.lineWidth=1.5;g.beginPath();g.ellipse(ft[0]+(front?0:0),ft[1]-1.5,4,2.4,0,0,6.3);g.fill();g.stroke()}
 // shorts / saia
 g.fillStyle=f?sh:shorts;g.strokeStyle=V5INK;g.lineWidth=1.8;g.beginPath();if(f){g.moveTo(-8,-30+bob);g.lineTo(8,-30+bob);g.lineTo(11,-19+bob);g.lineTo(-11,-19+bob)}else{g.moveTo(-8.5,-30+bob);g.lineTo(8.5,-30+bob);g.lineTo(9.5,-20+bob);g.lineTo(1,-20+bob);g.lineTo(0,-24+bob);g.lineTo(-1,-20+bob);g.lineTo(-9.5,-20+bob)}g.closePath();g.fill();g.stroke();
 // pose dos braços e da raquete (destro; o espelho cuida do jogador de frente)
 let hR=[4,-33],aR=-148,hL=[-6,-35],ball=null;const k=pose.k||0,m=pose.mode;
 if(m==='prep'){if(pose.side==='fh'){hR=[14,-37];aR=25}else{hR=[-12,-37];aR=155;hL=[-9,-37]}}
 else if(m==='swing'){const e=v5Ease(k);if(pose.side==='fh'){hR=[14-22*e,-37-11*Math.sin(e*3.1)];aR=25-235*e;hL=[-8+6*e,-36]}else{hR=[-12+24*e,-37-11*Math.sin(e*3.1)];aR=155+185*e;hL=[-9+14*e,-37-4*e]}}
 else if(m==='srvReady'){hR=[10,-36];aR=60;hL=[-5,-32-Math.abs(Math.sin(now/220))*4];ball=[hL[0],hL[1]-3-Math.abs(Math.sin(now/220))*7]}
 else if(m==='toss'){hL=[-6,-36-30*k];hR=[12,-48];aR=100;ball=[-6,-40-46*Math.sin(Math.min(1,k)*1.57)]}
 else if(m==='troph'){const e=v5Ease(k),up=e;hR=[v5Lerp(up,[10,7]),v5Lerp(up,[-40,-70])-Math.abs(Math.sin(now/260))*2*up];hL=[v5Lerp(up,[-10,-7]),v5Lerp(up,[-40,-70])-Math.abs(Math.sin(now/260))*2*up]}
 else if(m==='serve'){const e=v5Ease(k);hR=[v5Lerp(e,[12,8,4,-8]),v5Lerp(e,[-50,-60,-71,-42])];aR=v5Lerp(e,[100,200,270,195]);hL=[v5Lerp(e,[-6,-6,-8,-6]),v5Lerp(e,[-66,-58,-42,-36])]}
 const body=()=>{// tronco
  g.fillStyle=sh;g.strokeStyle=V5INK;g.lineWidth=1.8;g.beginPath();g.moveTo(-11,-46+bob);g.quadraticCurveTo(0,-49+bob,11,-46+bob);g.lineTo(9,-28+bob);g.lineTo(-9,-28+bob);g.closePath();g.fill();g.stroke();
  g.strokeStyle=shade(sh,-.25);g.lineWidth=1;g.beginPath();if(front){g.moveTo(-3,-47+bob);g.lineTo(0,-43+bob);g.lineTo(3,-47+bob)}else{g.moveTo(0,-45+bob);g.lineTo(0,-31+bob)}g.stroke();
  // cabeça
  const hy=-54+bob;if(av.h==='longo'||av.h==='medio'){g.fillStyle=hc;g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.roundRect(-7.5,hy-2,15,av.h==='longo'?15:9,4);g.fill();g.stroke()}
  if(av.h==='rabo'){const sw=Math.sin(ph)*3*run;g.fillStyle=hc;g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.ellipse(sw*.5+(front?0:0),hy+7,2.6,6.5,sw*.06,0,6.3);g.fill();g.stroke()}
  g.fillStyle=sk;g.strokeStyle=V5INK;g.lineWidth=1.8;g.beginPath();g.arc(0,hy,7.3,0,6.3);g.fill();g.stroke();
  g.fillStyle=hc;g.beginPath();if(front){if(av.h!=='raspado'){g.arc(0,hy,7.3,Math.PI*1.05,Math.PI*1.95);g.quadraticCurveTo(2,hy-3.5,-7,hy-1.2)}}else{if(av.h==='raspado'){g.globalAlpha=.55}g.arc(0,hy,7.3,Math.PI*.82,Math.PI*2.18)}g.closePath();g.fill();g.globalAlpha=1;g.stroke();
  if(av.h==='cacheado'){g.fillStyle=hc;for(let a=3.3;a<6.2;a+=.55){g.beginPath();g.arc(Math.cos(a)*7.3,hy+Math.sin(a)*7.3,2.6,0,6.3);g.fill()}}
  if(av.h==='coque'){g.fillStyle=hc;g.strokeStyle=V5INK;g.lineWidth=1.5;g.beginPath();g.arc(0,hy-8.5,3.4,0,6.3);g.fill();g.stroke()}
  if(front){g.fillStyle=V5INK;g.beginPath();g.arc(-2.6,hy+.6,.95,0,6.3);g.arc(2.6,hy+.6,.95,0,6.3);g.fill();g.strokeStyle=V5INK;g.lineWidth=.9;g.beginPath();g.moveTo(-1.6,hy+3.8);g.quadraticCurveTo(0,hy+4.6,1.6,hy+3.8);g.stroke()}
  if(av.a==='faixa'||av.a==='viseira'){g.strokeStyle=V5INK;g.lineWidth=3.4;g.beginPath();g.arc(0,hy,7.3,Math.PI*1.08,Math.PI*1.92);g.stroke();g.strokeStyle=ac;g.lineWidth=2;g.stroke();if(av.a==='viseira'&&front){g.fillStyle=ac;g.strokeStyle=V5INK;g.lineWidth=1.2;g.beginPath();g.ellipse(0,hy-3,8,2.4,0,0,3.15);g.fill();g.stroke()}}
  if(av.a==='bone'){g.fillStyle=ac;g.strokeStyle=V5INK;g.lineWidth=1.5;g.beginPath();g.arc(0,hy-.5,7.6,Math.PI,Math.PI*2);g.closePath();g.fill();g.stroke();if(front){g.beginPath();g.ellipse(0,hy-1,8.5,2.6,0,0,3.15);g.fill();g.stroke()}}};
 const arms=()=>{v5Limb(g,[-10,-44+bob],hL,4,sk);// braço esquerdo
  const rx=hR[0]+Math.cos(aR*Math.PI/180)*9,ry=hR[1]+Math.sin(aR*Math.PI/180)*9,cx=hR[0]+Math.cos(aR*Math.PI/180)*19,cy=hR[1]+Math.sin(aR*Math.PI/180)*19;
  if(!pose.noRk){v5Limb(g,hR,[rx,ry],2.2,'#2b2a27');g.save();g.translate(cx,cy);g.rotate(aR*Math.PI/180);g.fillStyle='#F3ECDC88';g.strokeStyle=V5INK;g.lineWidth=4.4;g.beginPath();g.ellipse(0,0,10,7.2,0,0,6.3);g.stroke();g.strokeStyle=rkC;g.lineWidth=2.4;g.stroke();g.fill();
  g.strokeStyle='#14100b55';g.lineWidth=.6;g.beginPath();for(let i=-6;i<=6;i+=3){g.moveTo(i,-6);g.lineTo(i,6)}for(let i=-4;i<=4;i+=2.7){g.moveTo(-8.5,i);g.lineTo(8.5,i)}g.stroke();g.restore();}
  v5Limb(g,[10,-44+bob],hR,4,sk);if(pose.cup)pose.cup(g,(hL[0]+hR[0])/2,Math.min(hL[1],hR[1])-2);g.fillStyle=sk;g.strokeStyle=V5INK;g.lineWidth=1.3;for(const h of[hL,hR]){g.beginPath();g.arc(h[0],h[1],2.4,0,6.3);g.fill();g.stroke()}
  if(ball){g.fillStyle='#E8FF4A';g.strokeStyle=V5INK;g.lineWidth=1.2;g.beginPath();g.arc(ball[0],ball[1],2.8,0,6.3);g.fill();g.stroke()}};
 if(front){arms();body()}else{body();arms()}
 g.restore()}
function v5Star(g,x,y,r,col,n){g.beginPath();for(let i=0;i<n*2;i++){const a=i*Math.PI/n-Math.PI/2,rr=i%2?r*.48:r;g.lineTo(x+Math.cos(a)*rr*1.25,y+Math.sin(a)*rr*.8)}g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=V5INK;g.lineWidth=2.4;g.stroke()}
// ---------- ganchos para animações ----------
{const _h=v5MeHit;v5MeHit=function(dir,kind){const A=V5A,now=performance.now();let side='fh';try{if(A&&A.ball)side=A.ball.x1>=A.me.x-.02?'fh':'bh'}catch(e){}_h(dir,kind);try{if(A){V5APS.me.sw={t0:now,side,mode:'swing'};const q=A.flash&&A.flash.t0>=now-5?A.flash.t:'';V5FX.push({k:'star',me:1,x:A.me.x+(side==='fh'?.07:-.07),y:-.05,z:.32,t0:now,big:q==='PERFEITO',c:A.flash&&A.flash.c||'#fff'})}}catch(e){}}}
{const _s=v5MeServe;v5MeServe=function(){const A=V5A,now=performance.now();_s();try{if(A){V5APS.me.sw={t0:now,mode:'serve'};V5FX.push({k:'star',me:1,x:A.me.x,y:-.05,z:.95,t0:now+170,big:A.flash&&A.flash.t==='PERFEITO',c:A.flash&&A.flash.c||'#fff'})}}catch(e){}}}
{const _o=v5OppHit;v5OppHit=function(){const A=V5A,b0=A&&A.ball;_o();try{if(A&&A.ball&&A.ball!==b0&&A.ball.toMe){const now=performance.now();V5APS.op.sw={t0:now,side:A.ball.x1<A.op.x?'fh':'bh',mode:'swing'};V5FX.push({k:'star',x:A.op.x,y:1.02,z:.3,t0:now,c:'#F3ECDC'})}}catch(e){}}}
{const _os=v5OppServe;v5OppServe=function(){const A=V5A,b0=A&&A.ball;_os();try{if(A&&A.ball&&A.ball!==b0){const now=performance.now();V5APS.op.sw={t0:now,mode:'serve'};V5FX.push({k:'star',x:A.op.x,y:1.04,z:.95,t0:now,c:'#F3ECDC'})}else if(A&&A.serve===2&&!A.ball)V5APS.op.sw={t0:performance.now(),mode:'serve'}}catch(e){}}}
{const _e=v5End;v5End=function(aw,kind,txt){const had=V5A&&!V5A.end;_e(aw,kind,txt);try{if(had){const now=performance.now();if(kind==='win'||kind==='ace')V5SHK={t0:now,a:aw?5:3};if(aw)V5CHR={t0:now,d:kind==='win'||kind==='ace'?1500:900}}}catch(e){}}}
{const _st=v5ArcStart;v5ArcStart=function(){_st();V5APS.me.sw=null;V5APS.op.sw=null;V5FX=[];V5ATR=[];V5ATB=null}}
// ---------- quadro a quadro ----------
function v5ArcFrame(now){V5AR=0;const cv=document.getElementById('v5arc');if(!cv||!IM)return;if(!cv.dataset.on){cv.dataset.on=1;cv.addEventListener('pointerdown',v5PDown);cv.addEventListener('pointerup',v5PUp);cv.addEventListener('pointercancel',()=>V5PD=null)}
 const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(!W||!H){v5ArcLoop();return}if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 const A=V5A,I=IM,ev=I.ev,u=W/360,top=Math.round(H*.33),bot=H-40;
 const hw=y=>W*.43-W*.19*y,P=(x,y,z=0)=>{const yy=bot-(bot-top)*y;return[W/2+x*hw(y),yy-z*(34-15*y)*(H/430)]},sAt=y=>Math.max(.66,hw(y)/hw(0))*1.05*Math.max(.8,Math.min(1.25,H/430));
 const key=[W,H,dpr,ev.name,ev.surf,ev.tier].join('|');if(!V5BG||V5BG.key!==key){V5BG=v5BgBuild(W,H,dpr,ev,P,top);V5BG.key=key}
 // tremida
 g.save();if(V5SHK){const t=now-V5SHK.t0;if(t<260){const a=V5SHK.a*(1-t/260);g.translate((Math.random()-.5)*a,(Math.random()-.5)*a)}else V5SHK=null}
 const cheer=V5CHR&&now-V5CHR.t0<V5CHR.d;if(!cheer)V5CHR=null;g.drawImage(V5BG.img[cheer&&Math.floor((now-V5CHR.t0)/150)%2===0?1:0],0,0,W,H);
 // movimento automático dos jogadores (mesma regra de antes)
 if(A){const b=A.ball;if(b&&b.toMe&&A.phase==='incoming'){const sp=v5Reach()*.0045*16;A.me.x+=clamp(b.x1-A.me.x,-sp,sp)}else A.me.x*=.96;
  if(b&&!b.toMe){A.op.x+=clamp(b.x1-A.op.x,-.03,.03)}}
 if(A){A.me.y=A.me.y==null?-.06:A.me.y;A.op.y=A.op.y==null?1.04:A.op.y;A.me.y+=((A.meNet?.28:-.06)-A.me.y)*.12;A.op.y+=((A.opNet?.76:1.04)-A.op.y)*.12}
 const RPF=typeof v5RpCur==='function'?v5RpCur(now):null;let mx=A?A.me.x:0,ox=A?A.op.x:0,myy=A?A.me.y:-.06,opy=A?A.op.y:1.04;if(RPF){mx=RPF.mx;ox=RPF.ox;myy=RPF.myy;opy=RPF.opy}for(const[k,x]of[['me',mx],['op',ox]]){const p=V5APS[k],dx=Math.abs(x-p.lx);p.lx=x;p.run=clamp((p.run||0)*.8+dx*60,0,1);p.ph+=dx*55+(p.run>.05?.12:0)}
 // marcadores no chão
 let hitRing=null;
 if(A&&A.phase==='srvMe'){const[ax,ay]=P(A.aim*.8,.62),[sx,sy]=P(mx,0);g.strokeStyle='#D9F24Acc';g.setLineDash([6,6]);g.lineWidth=2;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo((sx+ax)/2,Math.min(sy,ay)-40*u,ax,ay);g.stroke();g.setLineDash([]);
  const pr=1+.15*Math.sin(now/160);g.strokeStyle='#D9F24A';g.lineWidth=2.5;g.beginPath();g.ellipse(ax,ay,13*u*pr,5*u*pr,0,0,6.3);g.stroke();g.beginPath();g.moveTo(ax-17*u,ay);g.lineTo(ax+17*u,ay);g.moveTo(ax,ay-6*u);g.lineTo(ax,ay+6*u);g.lineWidth=1.2;g.stroke()}
 if(A&&A.ball&&A.phase==='incoming'){const b=A.ball,bu=(now-b.t0)/b.T,ub=(b.y0-b.yb)/(b.y0-b.y1);hitRing=bu;
  if(bu<ub){const[qx,qy]=P(b.x0+(b.x1-b.x0)*ub,b.yb),a=1-bu/ub;g.strokeStyle=`rgba(243,236,220,${.25+.45*a})`;g.lineWidth=1.6;g.setLineDash([3,3]);g.beginPath();g.ellipse(qx,qy,(5+10*a)*u*sAt(b.yb),(2+4*a)*u*sAt(b.yb),0,0,6.3);g.stroke();g.setLineDash([])}
  const[px,py]=P(b.x1,(b.y1!=null?b.y1:-.04)),ok=Math.abs(1-bu)*b.T<=115,rz=17*u,r=rz*(1+Math.max(0,1-bu)*2.6);
  g.fillStyle=ok?'#D9F24A33':'#F3ECDC14';g.beginPath();g.ellipse(px,py,rz,rz*.42,0,0,6.3);g.fill();g.strokeStyle='#D9F24Aaa';g.lineWidth=1.6;g.setLineDash([4,3]);g.stroke();g.setLineDash([]);
  g.strokeStyle=ok?'#D9F24A':'#F3ECDC';g.lineWidth=ok?4:2.4;g.beginPath();g.ellipse(px,py,r,r*.42,0,0,6.3);g.stroke()}
 // poses
 const poseOf=(k,me)=>{const p=V5APS[k],sw=p.sw;let pose={mode:'ready',run:p.run,ph:p.ph};
  if(sw){const t=now-sw.t0;if(t<0){}else if(sw.mode==='serve'&&t<480){pose={...pose,mode:'serve',k:t/480}}else if(sw.mode==='swing'&&t<380){pose={...pose,mode:'swing',side:sw.side,k:t/380}}else p.sw=null}
  if(pose.mode==='ready'&&A){if(me&&A.phase==='srvMe')pose.mode='srvReady';else if(!me&&A.phase==='srvOpp'){const t=now-A.t0;pose.mode=t>250?'toss':'srvReady';pose.k=clamp((t-250)/450,0,1)}
   const b=A.ball;if(b&&b.toMe===me&&A.phase!=='end'){const bu=(now-b.t0)/b.T;if(bu>.5){pose.mode='prep';pose.side=me?(b.x1>=A.me.x-.02?'fh':'bh'):(b.x1<A.op.x?'fh':'bh')}}}
  return pose};
 const avMe=myAv();let avOp=V5PAV&&V5PAV.id===I.opp?V5PAV.av:null;if(!avOp){try{const o=IDX.get(I.opp);avOp=o.av||aiAv(o)}catch(e){avOp={sk:2,h:'curto',hc:0,sh:4,a:'nada',g:CIRC()==='WTA'?'f':'m'}}V5PAV={id:I.opp,av:avOp}}
 const PO=RPF?RPF.po:poseOf('op',false),PM=RPF?RPF.pm:poseOf('me',true);
 {const[px,py]=P(ox,opy);v5DrawPl(g,px,py,sAt(opy)*u,avOp,true,PO,now);g.font=`700 ${Math.round(9*u)}px 'JetBrains Mono', monospace`;g.textAlign='center';const nm=IDX.get(I.opp).n.split(' ').slice(-1)[0].toUpperCase();const tw=g.measureText(nm).width;g.fillStyle='#140f0bcc';g.beginPath();g.roundRect(px-tw/2-5,py+4,tw+10,13*u,4);g.fill();g.fillStyle=V5PAP;g.fillText(nm,px,py+4+9.5*u)}
 // bola: rastro, sombra, quique
 let bp=null,bS=null,bH=null;if(RPF){if(RPF.bp){bp=RPF.bp;bS=P(bp.x,bp.y,0);bH=P(bp.x,bp.y,bp.z);V5ATR=[]}}else if(A&&A.ball){const b=A.ball;bp=v5BallPos(b,now);bS=P(bp.x,bp.y,0);bH=P(bp.x,bp.y,bp.z);if(V5ATB!==b){V5ATB=b;V5ATR=[]}V5ATR.push(bH);if(V5ATR.length>7)V5ATR.shift();
  const ub=(b.y0-b.yb)/(b.y0-b.y1);if(bp.u>=ub&&!b.bn){b.bn=1;V5FX.push({k:'dust',x:b.x0+(b.x1-b.x0)*ub,y:b.yb,t0:now,s:ev.surf})}}
 const drawBall=()=>{if(!bp)return;const r=(6-1.8*bp.y)*u;g.fillStyle='#00000055';g.beginPath();g.ellipse(bS[0],bS[1],r*(1-bp.z*.35),r*.4*(1-bp.z*.35),0,0,6.3);g.fill();
  for(let i=0;i<V5ATR.length-1;i++){const t=V5ATR[i],a=(i+1)/V5ATR.length;g.fillStyle=`rgba(232,255,74,${a*.35})`;g.beginPath();g.arc(t[0],t[1],r*a*.9,0,6.3);g.fill()}
  g.fillStyle='#E8FF4A';g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.arc(bH[0],bH[1],r,0,6.3);g.fill();g.stroke();g.strokeStyle='#ffffffcc';g.lineWidth=1;g.beginPath();g.arc(bH[0]-r*.9,bH[1],r*.75,-.9,.9);g.stroke()};
 if(bp&&bp.y>.5)drawBall();
 g.drawImage(V5BG.img[2],0,0,W,H);
 if(bp&&bp.y<=.5)drawBall();
 {const[px,py]=P(mx,myy);v5DrawPl(g,px,py,sAt(myy)*u,avMe,false,PM,now,S.me.rkc)}
 if(!RPF&&A&&!A.end&&typeof v5RpRec==='function')v5RpRec(now,{mx,ox,myy,opy,bp:bp?{...bp}:null,pm:{...PM},po:{...PO}});
 if(RPF&&typeof v5RpDraw==='function')v5RpDraw(g,W,H,u,now);
 // efeitos
 V5FX=V5FX.filter(f=>{const t=now-f.t0;if(t<0)return true;if(f.k==='star'){if(t>200)return false;const[x,y]=P(f.x,f.y,f.z),s=(f.big?20:13)*u*(f.me?1:.6)*(1+t/400);g.globalAlpha=1-t/200;v5Star(g,x,y,s,f.c,f.big?9:7);if(f.big){g.strokeStyle=f.c;g.lineWidth=2;for(let i=0;i<6;i++){const a=i*1.05+.3;g.beginPath();g.moveTo(x+Math.cos(a)*s*1.3,y+Math.sin(a)*s*.9);g.lineTo(x+Math.cos(a)*s*2.1,y+Math.sin(a)*s*1.4);g.stroke()}}g.globalAlpha=1;return true}
  if(f.k==='dust'){if(t>520)return false;const[x,y]=P(f.x,f.y),sc=sAt(f.y)*u,a=1-t/520,col=f.s==='clay'?'#f0a070':f.s==='grass'?'#a9e08a':'#ffffff';g.globalAlpha=a*.85;g.strokeStyle=col;g.lineWidth=1.5;g.beginPath();g.ellipse(x,y,(4+t/18)*sc,(1.6+t/50)*sc,0,0,6.3);g.stroke();
   if(f.s==='clay'){g.fillStyle=col;for(let i=0;i<7;i++){const a2=i*.9,d=t/12*sc;g.beginPath();g.arc(x+Math.cos(a2)*d*1.4,y-Math.abs(Math.sin(a2))*d*.6-t/40,1.6*sc*a+.4,0,6.3);g.fill()}}g.globalAlpha=1;return true}return false});
 // medidor de saque vertical
 if(A&&A.phase==='srvMe'){const k=(Math.sin((now-A.t0)/260)+1)/2,bx=W-26*u,by0=top-8,bh=Math.max(120,(bot-top)*.62),bw=13*u;
  g.fillStyle='#140f0bdd';g.beginPath();g.roundRect(bx-4,by0-18,bw+8,bh+26,8);g.fill();g.fillStyle='#ffffff22';g.beginPath();g.roundRect(bx,by0,bw,bh,5);g.fill();
  const Y=v=>by0+bh*(1-v);g.fillStyle='#F2C14E';g.fillRect(bx,Y(1),bw,Y(.64)-Y(1));g.fillStyle='#3DDC84';g.fillRect(bx,Y(.98),bw,Y(.74)-Y(.98));g.fillStyle='#D9F24A';g.fillRect(bx,Y(.91),bw,Y(.81)-Y(.91));
  g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.roundRect(bx,by0,bw,bh,5);g.stroke();const my=Y(k);g.fillStyle='#fff';g.strokeStyle=V5INK;g.lineWidth=2;g.beginPath();g.moveTo(bx-6,my);g.lineTo(bx-1,my-5);g.lineTo(bx+bw+1,my-5);g.lineTo(bx+bw+6,my);g.lineTo(bx+bw+1,my+5);g.lineTo(bx-1,my+5);g.closePath();g.fill();g.stroke();
  g.font=`800 ${Math.round(8*u)}px 'JetBrains Mono', monospace`;g.fillStyle=V5PAP;g.textAlign='center';g.fillText(A.serve===2?'2º':'SAQUE',bx+bw/2,by0-6)}
 // textos em balão de HQ
 const cap=(txt,y,big)=>{g.font=`900 ${Math.round((big?13:10)*u)}px Archivo, sans-serif`;const tw=g.measureText(txt).width,w=tw+18*u,h=(big?24:18)*u;g.save();g.translate(W/2,y);g.rotate(big?-.018:.012);g.fillStyle=big?V5PAP:V5INK;g.strokeStyle=V5INK;g.lineWidth=2.2;g.beginPath();g.roundRect(-w/2,-h/2,w,h,4);g.fill();g.stroke();if(big){g.fillStyle=V5INK;g.fillRect(-w/2+3,h/2,w-2,3)}g.fillStyle=big?V5INK:V5PAP;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,0,1);g.restore()};
 if(A){cap(A.txt.toUpperCase(),18*u,true);if(A.sub&&!A.end)cap(A.sub,44*u,false);
  if(A.flash&&now-A.flash.t0<650){const t=now-A.flash.t0,a=t<450?1:1-(t-450)/200,sc=1+.3*Math.max(0,1-t/110),y=H*.55-(t/650)*14;g.save();g.globalAlpha=a;g.translate(W/2,y);g.scale(sc,sc);g.font=`900 ${Math.round(17*u)}px Archivo, sans-serif`;const tw=g.measureText(A.flash.t).width;
   g.globalAlpha=a*.92;v5Star(g,0,0,Math.max(30*u,tw*.86),A.flash.c,12);g.fillStyle=V5INK;g.textAlign='center';g.textBaseline='middle';g.fillText(A.flash.t,0,1);g.restore()}
  if(A.end&&!RPF){const t=now-A.end.t0,sl=Math.min(1,t/140),aw=A.end.aw;g.fillStyle=aw?'#3DDC841f':'#FF6B5B1f';g.fillRect(0,0,W,H);const rw=W*.7,rx=W/2-rw/2+(1-sl)*(aw?-W:W),ry=H*.42;g.save();g.translate(rx+rw/2,ry);g.rotate(-.03);g.fillStyle=aw?'#3DDC84':'#FF6B5B';g.strokeStyle=V5INK;g.lineWidth=2.4;g.beginPath();g.roundRect(-rw/2,-15*u,rw,30*u,5);g.fill();g.stroke();g.fillStyle=V5INK;g.font=`900 ${Math.round(15*u)}px Archivo, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(aw?'PONTO SEU':'PONTO DELE',0,1);g.restore()}}
 else{g.textAlign='center';g.font="700 13px Archivo, sans-serif";g.fillStyle=V5PAP;g.fillText(I.E.done?'Fim de partida':'',W/2,22)}
 g.restore();
 if(hitRing!=null&&A.ball&&hitRing>1.35)v5End(false,A.oppWin?'win':'ue',A.oppWin?'Não alcançou a bola':'Deixou a bola passar');
 if(A||document.getElementById('v5arc'))v5ArcLoop()}
