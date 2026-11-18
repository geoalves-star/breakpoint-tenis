// =============== v5.7: menu inicial com tenista ilustrado (original) sacando num estádio ===============
const V5HAV=[{sk:2,h:'curto',hc:0,sh:3,a:'faixa',ac:0,g:'m'},{sk:1,h:'rabo',hc:2,sh:6,a:'viseira',ac:3,g:'f'},{sk:4,h:'cacheado',hc:0,sh:1,a:'bone',ac:5,g:'m'},{sk:0,h:'coque',hc:3,sh:2,a:'faixa',ac:1,g:'f'}];
let V5HR=null;
function v5HeroGo(){let n=-1;for(let i=0;i<3;i++)if(slotMeta(i)){n=i;break}if(n<0)for(let i=0;i<3;i++)if(!slotMeta(i)){n=i;break}openSlot(Math.max(0,n))}
function v5HeroFrame(now){V5HR=null;const cv=document.getElementById('v5herc');if(!cv)return;const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(!W||!H){V5HR=requestAnimationFrame(v5HeroFrame);return}
 if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 const LOOP=4200,cyc=Math.floor(now/LOOP),t=now%LOOP,surf=['hard','clay','grass'][cyc%3],ev={name:'',tier:'GS',surf,city:'',iso:'BR'};
 const u=W/360,top=Math.round(H*.5),bot=Math.round(H*.93),hw=y=>W*.5-W*.25*y,P=(x,y,z=0)=>{const yy=bot-(bot-top)*y;return[W/2+x*hw(y),yy-z*(40-18*y)*(H/430)]};
 const key=['h',W,H,dpr,surf].join('|');if(!V5BG||V5BG.key!==key){V5BG=v5BgBuild(W,H,dpr,ev,P,top);V5BG.key=key}
 const cheer=t>2300&&t<3300&&Math.floor(now/150)%2===0;g.drawImage(V5BG.img[cheer?1:0],0,0,W,H);
 const me=V5HAV[(cyc*2)%4],op=V5HAV[(cyc*2+1)%4];
 // adversário ao fundo
 const ox=clamp((t-1900)/700,0,1)*.38;let opPose={mode:'ready'};if(t>2420&&t<2800)opPose={mode:'swing',side:'fh',k:(t-2420)/380};else if(t>2150&&t<=2420)opPose={mode:'prep',side:'fh'};
 {const[px,py]=P(ox,1.03);v5DrawPl(g,px,py,(hw(1.03)/hw(0))*1.15*u,op,true,{...opPose,run:t>1900&&t<2600?.8:0,ph:now/90},now)}
 // bola
 const mx=-.4,[px,py]=P(mx,.02),s=2.25*u*Math.max(.8,Math.min(1.25,H/430));
 let pose={mode:'srvReady'};if(t>=900&&t<1350)pose={mode:'toss',k:(t-900)/450};else if(t>=1350&&t<1830)pose={mode:'serve',k:(t-1350)/480};else if(t>=1830)pose={mode:'ready'};
 const cx=px+4*s,cy=py-92*s;let ball=null;
 if(t>=1560&&t<2420){const k=(t-1560)/860,[bx,by]=P(.42,.66),[ex,ey]=P(ox,1.0,.5);if(k<.62){const q=k/.62;ball=[cx+(bx-cx)*q,cy+(by-cy)*q-Math.sin(q*Math.PI)*28*u,q]}else{const q=(k-.62)/.38;ball=[bx+(ex-bx)*q,by+(ey-by)*q-Math.sin(q*Math.PI)*22*u,1]}}
 else if(t>=2420&&t<3300){const k=(t-2420)/880,[sx,sy]=P(ox,1.0,.5),[ex,ey]=P(-.6,.12);ball=[sx+(ex-sx)*k,sy+(ey-sy)*k-Math.sin(k*Math.PI)*36*u,1]}
 g.drawImage(V5BG.img[2],0,0,W,H);
 if(ball){const r=Math.max(3,5.5*u*(ball[2]<1?1.4-ball[2]*.5:.9));g.fillStyle='#E8FF4A';g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.arc(ball[0],ball[1],r,0,6.3);g.fill();g.stroke()}
 if(t>=1560&&t<1740){const k=(t-1560)/180;g.globalAlpha=1-k;v5Star(g,cx,cy,22*u*(1+k*.5),'#D9F24A',9);g.globalAlpha=1}
 v5DrawPl(g,px,py,s,me,false,pose,now);
 // vinheta para o texto
 const gr=g.createLinearGradient(0,0,0,H*.5);gr.addColorStop(0,'#0b0907ee');gr.addColorStop(1,'#0b090700');g.fillStyle=gr;g.fillRect(0,0,W,H*.5);
 const gb=g.createLinearGradient(0,H*.78,0,H);gb.addColorStop(0,'#0b090700');gb.addColorStop(1,'#0b0907cc');g.fillStyle=gb;g.fillRect(0,H*.78,W,H*.22);
 if(!OPTS.eco&&document.getElementById('v5herc'))V5HR=requestAnimationFrame(v5HeroFrame)}
{const _mv=menuView;menuView=function(){let s=_mv();try{const re=/<div class="hero" style="padding:38px 18px 14px">([^]*?)<div class="mut" style="margin-top:14px">Sua carreira no tênis, do juvenil ao número 1 do mundo\.<\/div>/;
 if(re.test(s)){const has=[0,1,2].some(i=>slotMeta(i));s=s.replace(re,(m0,brand)=>`<div class="v5hero"><canvas id="v5herc" role="img" aria-label="Ilustração de um tenista sacando num estádio"></canvas><div class="v5herot">${brand}</div><button class="v5herob" onclick="v5HeroGo()">${has?'▶ Continuar carreira':'▶ Começar carreira'}</button></div><div class="hero" style="padding:12px 18px 6px"><div class="mut">Sua carreira no tênis, do juvenil ao número 1 do mundo.</div>`);
  setTimeout(()=>{if(!V5HR)V5HR=requestAnimationFrame(v5HeroFrame)},0)}}catch(e){console.error(e)}return s}}
