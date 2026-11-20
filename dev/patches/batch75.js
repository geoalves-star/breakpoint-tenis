// =============== v5.7: comemoração de título (troféu, confete, flashes) ===============
let V5CEL=null;
function v5CupDraw(g,x,y,gs,sc){sc=sc||1;const gold=gs?'#f5c84c':'#d9e3ea',dark=gs?'#b8860b':'#8d9aa6';g.save();g.translate(x,y);g.scale(sc,sc);g.lineWidth=1.8;g.strokeStyle=V5INK;
 g.fillStyle=gold;g.beginPath();g.moveTo(-9,-22);g.lineTo(9,-22);g.quadraticCurveTo(9,-8,2,-5);g.lineTo(2,0);g.lineTo(-2,0);g.lineTo(-2,-5);g.quadraticCurveTo(-9,-8,-9,-22);g.closePath();g.fill();g.stroke();
 g.beginPath();g.arc(-10,-16,4,Math.PI*.5,Math.PI*1.5,false);g.stroke();g.beginPath();g.arc(10,-16,4,-Math.PI*.5,Math.PI*.5,false);g.stroke();
 g.fillStyle=dark;g.beginPath();g.roundRect(-6,0,12,4,1.5);g.fill();g.stroke();g.fillStyle='#ffffff99';g.beginPath();g.ellipse(-4,-16,1.6,4,0,0,6.3);g.fill();g.restore()}
function v5CelStart(L){const gs=L.ev.tier==='GS',n=gs?170:L.ev.tier==='M1000'||L.ev.tier==='FIN'?120:80,R2=seeded(Date.now()%1e6|0),cols=gs?['#f5c84c','#ffffff','#D9F24A','#ffd400','#e8312f','#2f6bff']:['#D9F24A','#ffffff','#3DDC84','#ff7a3d','#2f6bff'];
 V5CEL={t0:performance.now(),gs,L,pt:L.pt||null,conf:Array.from({length:n},()=>({x:R2(),y:R2()*1.15-.35,v:.13+R2()*.17,w:(R2()-.5)*.6,r:R2()*6.3,vr:(R2()-.5)*.3,c:cols[Math.floor(R2()*cols.length)],s:.6+R2()*.8})),fl:[]};try{SND&&sCrowd(2)}catch(e){}try{v5Vib([40,60,40,60,80])}catch(e){}
 requestAnimationFrame(v5CelFrame)}
function v5CelFrame(now){const C=V5CEL,cv=document.getElementById('v5celc');if(!C||!cv){V5CEL=cv?V5CEL:null;return}const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(!W){requestAnimationFrame(v5CelFrame);return}
 if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 const L=C.L,ev=L.ev,t=now-C.t0,u=W/360,top=Math.round(H*.5),bot=Math.round(H*.96),hw=y=>W*.5-W*.25*y,P=(x,y,z=0)=>{const yy=bot-(bot-top)*y;return[W/2+x*hw(y),yy-z*(40-18*y)*(H/430)]};
 const key=['c',W,H,dpr,ev.name,ev.surf,ev.tier].join('|');if(!V5BG||V5BG.key!==key){V5BG=v5BgBuild(W,H,dpr,ev,P,top);V5BG.key=key}
 g.drawImage(V5BG.img[Math.floor(now/140)%2],0,0,W,H);
 // flashes de câmera na arquibancada
 if(Math.random()<(C.gs?.5:.3))C.fl.push({x:Math.random()*W,y:Math.random()*H*.36,t0:now});C.fl=C.fl.filter(f=>now-f.t0<160);for(const f of C.fl){const a=1-(now-f.t0)/160;g.fillStyle=`rgba(255,255,255,${a})`;g.beginPath();g.arc(f.x,f.y,(2+a*4)*u,0,6.3);g.fill();g.fillStyle=`rgba(255,255,255,${a*.25})`;g.beginPath();g.arc(f.x,f.y,(9+a*8)*u,0,6.3);g.fill()}
 // luz de holofote
 const gl=g.createRadialGradient(W/2,H*.78,10,W/2,H*.78,H*.45);gl.addColorStop(0,C.gs?'#f5c84c40':'#ffffff30');gl.addColorStop(1,'#0000');g.fillStyle=gl;g.fillRect(0,0,W,H);
 // jogador levantando o troféu
 const k=clamp(t/650,0,1),jump=t>650?Math.abs(Math.sin((t-650)/300))*6*u:0,[px,py]=P(0,.1),s=2.1*u*Math.max(.8,Math.min(1.25,H/430));
 if(C.pt){const[qx,qy]=P(-.3,.12),[rx,ry]=P(.3,.12),s2=s*.9;v5DrawPl(g,qx,qy-jump*.8,s2,C.pt,true,{mode:'troph',k,noRk:1},now);v5DrawPl(g,rx,ry-jump,s2,myAv(),true,{mode:'troph',k,noRk:1,cup:(gg,x,y)=>v5CupDraw(gg,x-24,y-4,C.gs,1.05)},now,S.me.rkc)}else v5DrawPl(g,px,py-jump,s,myAv(),true,{mode:'troph',k,noRk:1,cup:(gg,x,y)=>v5CupDraw(gg,x,y,C.gs,1.05)},now,S.me.rkc);
 // confete
 for(const c of C.conf){c.y+=c.v*.016*(1+c.s*.3);c.x+=c.w*.004*Math.sin(now/400+c.r);c.r+=c.vr;if(c.y>1.05){c.y=-.05;c.x=Math.random()}g.save();g.translate(c.x*W,c.y*H);g.rotate(c.r);g.fillStyle=c.c;g.fillRect(-3*c.s*u,-1.6*c.s*u,6*c.s*u,3.2*c.s*u);g.restore()}
 // títulos
 const pop=t<120?0:Math.min(1,(t-120)/260),sc=.6+.4*v5Ease(pop)+(pop>=1?0:.12*Math.sin(pop*3.14));g.save();g.translate(W/2,H*.15);g.scale(sc,sc);g.rotate(-.025);
 const head=C.pt?'CAMPEÕES':G('CAMPEÃO','CAMPEÃ');g.font=`900 ${Math.round((C.gs?50:44)*u)}px Archivo, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=8*u;g.strokeStyle=V5INK;g.strokeText(head,0,0);g.fillStyle=C.gs?'#f5c84c':'#D9F24A';g.fillText(head,0,0);g.restore();
 if(t>350){const a=Math.min(1,(t-350)/300);g.globalAlpha=a;const sub=(C.gs?'GRAND SLAM · ':'')+(ev.name||'').toUpperCase()+' '+year();g.font=`800 ${Math.round(12*u)}px 'JetBrains Mono', monospace`;const tw=g.measureText(sub).width;g.fillStyle=V5INK;g.beginPath();g.roundRect(W/2-tw/2-10*u,H*.15+26*u,tw+20*u,22*u,5);g.fill();g.fillStyle=V5PAP;g.textAlign='center';g.textBaseline='middle';g.fillText(sub,W/2,H*.15+37*u+1);
  g.font=`900 ${Math.round(20*u)}px 'JetBrains Mono', monospace`;g.lineWidth=5*u;g.strokeStyle=V5INK;const sc2=L.res?scoreStr(L.res.sets):(C.pt?'CAMPEÕES DE DUPLAS':'');if(sc2){g.strokeText(sc2,W/2,H*.15+68*u);g.fillStyle='#fff';g.fillText(sc2,W/2,H*.15+68*u)}g.globalAlpha=1;g.textBaseline='alphabetic'}
 requestAnimationFrame(v5CelFrame)}
const v5IsTitle=L=>{try{const T=S.tour;return!!(L&&L.res&&L.res.win&&T&&T.over&&S.results[0]&&S.results[0].r==='Campeão'&&S.results[0].n===L.ev.name)}catch(e){return false}};
{const _vr=v5Res;v5Res=function(){let s=_vr();try{const L=LIVE;if(v5IsTitle(L)){const gs=L.ev.tier==='GS';
  s=s.replace(/<div class="v5big w">Vitória(<span class="v5stamp2">[^<]*<\/span>)?/,`<div class="v5big w v5champ${gs?' gs':''}">${G('Campeão','Campeã')}`);
  s=s.replace('<div class="v5resin">',`<div class="v5resin"><div class="v5cel${gs?' gs':''}"><canvas id="v5celc" role="img" aria-label="Comemoração: você levanta o troféu"></canvas></div>`);
  if(!V5CEL||V5CEL.L!==L)setTimeout(()=>v5CelStart(L),30);else setTimeout(()=>requestAnimationFrame(v5CelFrame),30)}}catch(e){console.error(e)}return s}}
{const _cl=closeLive;closeLive=function(){V5CEL=null;return _cl()}}
