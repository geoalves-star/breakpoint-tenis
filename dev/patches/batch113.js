// ===== v7.2: logo nova (quadra vista de cima), sons suaves e abertura nova =====
const BCLOGO=`<defs><linearGradient id="sur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#358a57"/><stop offset="1" stop-color="#256b42"/></linearGradient><linearGradient id="crt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2468b8"/><stop offset="1" stop-color="#1a5296"/></linearGradient><radialGradient id="ball" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#f4ff8a"/><stop offset=".55" stop-color="#d6f03a"/><stop offset="1" stop-color="#9cbc12"/></radialGradient></defs><rect width="512" height="512" rx="112" fill="url(#sur)"/><g id="court"><rect x="128" y="40" width="256" height="432" rx="6" fill="url(#crt)"/><g fill="none" stroke="#fff" stroke-width="10"><rect x="148" y="62" width="216" height="388"/><path d="M176 62 V450 M336 62 V450 M176 162 H336 M176 350 H336 M256 162 V350 M256 62 V76 M256 436 V450"/></g><path d="M118 256 H394" stroke="#fff" stroke-width="16" stroke-linecap="round"/><path d="M124 256 H388" stroke="#0b2240" stroke-width="5" stroke-dasharray="6 8"/><ellipse cx="300" cy="330" rx="26" ry="9" fill="#0b2240" opacity=".35"/><circle cx="300" cy="306" r="31" fill="url(#ball)"/><path d="M279 287 C 294 297, 296 314, 283 327" stroke="#fff" stroke-width="5.5" fill="none" stroke-linecap="round"/></g>`;
logoSVG=function(sz,cls){const n=++LGN;const t=BCLOGO.replace(/id="(\w+)"/g,`id="$1${n}"`).replace(/url\(#(\w+)\)/g,`url(#$1${n})`);return `<svg class="${cls||'lmark'}" viewBox="0 0 512 512" width="${sz}" height="${sz}" aria-hidden="true">${t}</svg>`};
// ---------- sons: timbres macios, reverb e menos repetição ----------
if(OPTS.mvol==null)OPTS.mvol=.3;
function bcIR(c,dur,dec){const n=Math.floor(c.sampleRate*dur),b=c.createBuffer(2,n,c.sampleRate);for(let ch=0;ch<2;ch++){const x=b.getChannelData(ch);for(let i=0;i<n;i++)x[i]=(Math.random()*2-1)*Math.pow(1-i/n,dec)}return b}
v5MBus=function(c){if(!V5MB||V5MB.context!==c){const cp=c.createDynamicsCompressor();cp.threshold.value=-20;cp.ratio.value=3;cp.connect(c.destination);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=5200;lp.connect(cp);
 V5MB=c.createGain();V5MB.gain.value=0;const dry=c.createGain();dry.gain.value=.8;V5MB.connect(dry).connect(lp);try{const cv=c.createConvolver();cv.buffer=bcIR(c,2.6,2.8);const wet=c.createGain();wet.gain.value=.34;V5MB.connect(cv).connect(wet).connect(lp)}catch(e){}V5MC=cp}return V5MB};
function bcOsc(c,o,t,type,hz,g0,a,dec,dt){const s=c.createOscillator(),g=c.createGain();s.type=type;s.frequency.value=hz;if(dt)s.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(g0,.0002),t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+dec);s.connect(g).connect(o);s.start(t);s.stop(t+a+dec+.05);return s}
Object.assign(V5I,{
 // piano elétrico suave no lugar do "quadradinho" de videogame
 lead(c,o,t,m,d,v){const hz=v5Hz(m),f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=2200;f.connect(o);const dec=Math.min(2.2,d+.9);bcOsc(c,f,t,'sine',hz,.085*v,.012,dec);bcOsc(c,f,t,'sine',hz*2,.022*v,.008,dec*.45);bcOsc(c,f,t,'triangle',hz,.025*v,.02,dec*.7)},
 pad(c,o,t,ms,d,v){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=850;f.connect(o);for(const m of ms)for(const dt of[-5,5]){const s=c.createOscillator(),g=c.createGain();s.type='triangle';s.frequency.value=v5Hz(m);s.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.026*v,t+.9);g.gain.setValueAtTime(.026*v,t+Math.max(1,d-.3));g.gain.exponentialRampToValueAtTime(.0001,t+d+1.4);s.connect(g).connect(f);s.start(t);s.stop(t+d+1.5)}},
 bass(c,o,t,m,d,v){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=420;f.connect(o);bcOsc(c,f,t,'sine',v5Hz(m),.3*v,.012,Math.min(1.6,d+.35));bcOsc(c,f,t,'triangle',v5Hz(m),.1*v,.01,Math.min(.8,d*.6+.1))},
 pluck(c,o,t,m,d,v){const hz=v5Hz(m);bcOsc(c,o,t,'sine',hz,.1*v,.006,.75);bcOsc(c,o,t,'sine',hz*3,.012*v,.004,.18)},
 acc(c,o,t,ms,d,v){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=1500;f.connect(o);for(const m of ms)for(const dt of[-6,6])bcOsc(c,f,t,'triangle',v5Hz(m),.02*v,.06,d+.25,dt)},
 brass(c,o,t,ms,d,v){for(const m of ms){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(500,t);f.frequency.linearRampToValueAtTime(1500,t+.15);f.connect(o);bcOsc(c,f,t,'triangle',v5Hz(m),.05*v,.09,d+.5);bcOsc(c,f,t,'sine',v5Hz(m)*2,.012*v,.12,d+.3)}},
 kick(c,o,t,v){const s=c.createOscillator(),g=c.createGain();s.frequency.setValueAtTime(95,t);s.frequency.exponentialRampToValueAtTime(48,t+.12);g.gain.setValueAtTime(.26*v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.22);s.connect(g).connect(o);s.start(t);s.stop(t+.25)},
 snare(c,o,t,v){const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=noiseBuf(c,.3);f.type='bandpass';f.frequency.value=2600;f.Q.value=.5;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.05*v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.24);s.connect(f).connect(g).connect(o);s.start(t)},
 clap(c,o,t,v){V5I.snare(c,o,t,v*.9)},
 hat(c,o,t,v){V5I.noise(c,o,t,.022*v,'highpass',6500,.05)},
 tok(c,o,t,v){bcOsc(c,o,t,'sine',760,.06*v,.003,.06)},
 timp(c,o,t,m,v){const s=c.createOscillator(),g=c.createGain();s.frequency.value=v5Hz(m);g.gain.setValueAtTime(.16*v,t);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);s.connect(g).connect(o);s.start(t);s.stop(t+1.2)}});
// arranjos mais calmos: menos bateria, andamento mais lento
try{const T=V5TRK,C=v5Ch;
 T.tema.bpm=84;T.tema.play=function(c,o,b,s,t,d){const[r,ty]=this.ch[b%8],n=C(r,ty);if(s===0)V5I.pad(c,o,t,n,d*16,1);if(s===0)V5I.bass(c,o,t,r-24,d*6,.9);if(s===10)V5I.bass(c,o,t,r-24,d*4,.7);if(s===0)V5I.kick(c,o,t,.6);if(s===8)V5I.kick(c,o,t,.35);if(s===4||s===12)V5I.snare(c,o,t,.55);if(s%2===0)V5I.hat(c,o,t,s%4?.5:.8);if(s%4===2)V5I.pluck(c,o,t,n[(s>>2)%n.length]+12,d*2,.5)};
 T.paris.bpm=132;T.paris.play=function(c,o,b,s,t,d){const[r,ty]=this.ch[b%8],n=C(r,ty);if(s===0){V5I.bass(c,o,t,r-24,d*5,.9);V5I.pad(c,o,t,n,d*6,.5)}if(s===2||s===4)V5I.acc(c,o,t,n,d*1.4,.8);if(s%2===1)V5I.hat(c,o,t,.35)};
 T.londres.bpm=80;
 T.ny.bpm=84;T.ny.sw=.16;T.ny.play=function(c,o,b,s,t,d){const[r,ty]=this.ch[b%8],n=C(r,ty);if(s===0)V5I.pad(c,o,t,n,d*16,.8);if(s%4===0)V5I.bass(c,o,t,r-24+[0,4,7,5][s/4],d*3.6,.85);if(s===4||s===12)V5I.snare(c,o,t,.6);if(s%2===0)V5I.hat(c,o,t,.5);if(s===0)V5I.kick(c,o,t,.45)};
 T.melb.bpm=100;T.melb.play=function(c,o,b,s,t,d){const[r,ty]=this.ch[b%8],n=C(r,ty);if(s===0||s===8)V5I.kick(c,o,t,.55);if(s===4||s===12)V5I.snare(c,o,t,.45);if(s%2===1)V5I.hat(c,o,t,.45);if(s===0||s===6||s===8)V5I.bass(c,o,t,r-24,d*2,.8);if(s%2===0&&b%2===1)V5I.pluck(c,o,t,n[(s/2)%n.length]+12,d,.5);if(s===0)V5I.pad(c,o,t,n,d*16,.6)};
}catch(e){console.error(e)}
// a melodia toca uma volta sim, outra não: cansa menos
v5MusTick=function(){const c=ACX;if(!c||!V5MP.tr||c.state!=='running')return;const T=V5TRK[V5MP.tr],d=60/T.bpm/(T.spb===6?2:4),o=v5MBus(c);
 if(V5MP.next<c.currentTime-.5)V5MP.next=c.currentTime+.05;const mb=Math.max(1,Math.ceil(((T.mel[T.mel.length-1]||[0])[0]+1)/T.spb));let guard=0;
 while(V5MP.next<c.currentTime+.25&&guard++<64){const s=V5MP.step,b=V5MP.bar,t=V5MP.next+(T.sw&&s%2?d*T.sw:0);try{T.play(c,o,b,s,t,d);const cyc=Math.floor(b/mb);if(cyc%2===0){const gi=(b%mb)*T.spb+s;for(const[ms,m,len]of T.mel)if(ms===gi)V5I.lead(c,o,t,m,d*len*.95,.85+Math.random()*.2)}}catch(e){}
  V5MP.step++;if(V5MP.step>=T.spb){V5MP.step=0;V5MP.bar++}V5MP.next+=d}};
// efeitos: batida de bola real, sem "piu-piu"
sHit=function(t0){const c=ax();if(!c)return;const t=c.currentTime+(t0||0),o=MG(c);V5I.noise(c,o,t,.1,'bandpass',2100,.035,1.1);bcOsc(c,o,t,'sine',240,.14,.002,.07)};
sJingle=function(){const c=ax();if(!c)return;const o=MG(c);[[72,0],[76,.14],[79,.28]].forEach(([m,dl])=>{const t=c.currentTime+dl;bcOsc(c,o,t,'sine',v5Hz(m),.07,.006,1.1);bcOsc(c,o,t,'sine',v5Hz(m)*4,.008,.003,.25)})};
// ---------- abertura nova: estádio acendendo, quadra se desenhando, bola quicando ----------
let BCH0=0;
const bcEase=x=>x<=0?0:x>=1?1:1-Math.pow(1-x,3);
v5HeroFrame=function(now){V5HR=null;const cv=document.getElementById('v5herc');if(!cv)return;const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(!W||!H){V5HR=requestAnimationFrame(v5HeroFrame);return}
 if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 let still=!!OPTS.eco;try{still=still||matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
 if(!BCH0)BCH0=now;const t=still?60000:now-BCH0;
 // câmera: aproximação lenta e leve balanço lateral
 const push=bcEase(Math.min(1,t/4200)),Zc=-10.5+2.5*push,camX=still?0:Math.sin(t/11000)*.7,camH=7.2,f=W*.8,hy=H*.97-f*camH/(0-Zc);
 const P=(X,Z,Y=0)=>{const d=Math.max(.5,Z-Zc);return[W/2+f*(X-camX)/d,hy+f*(camH-Y)/d]};
 const L1=bcEase(Math.min(1,Math.max(0,(t-150)/500))),L2=bcEase(Math.min(1,Math.max(0,(t-450)/500))),lit=Math.max(L1,L2)*.55+Math.min(L1,L2)*.45;
 const flick=(k,s)=>k>0&&k<1?(Math.sin(s*t)>.2?1:.55):1;
 // fundo
 let gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#040907');gr.addColorStop(.55,'#08180f');gr.addColorStop(1,'#0b2419');g.fillStyle=gr;g.fillRect(0,0,W,H);
 // refletores
 for(const[lx,k,sd]of[[W*.08,L1,.09],[W*.92,L2,.07]]){if(k<=0)continue;const a=k*flick(k,sd);const rg=g.createRadialGradient(lx,-H*.04,0,lx,-H*.04,H*.95);rg.addColorStop(0,`rgba(215,235,255,${.16*a})`);rg.addColorStop(.45,`rgba(160,200,230,${.05*a})`);rg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=rg;g.fillRect(0,0,W,H);
  g.fillStyle=`rgba(225,240,255,${.035*a})`;g.beginPath();g.moveTo(lx-6,-4);g.lineTo(lx+6,-4);g.lineTo(W/2+(lx<W/2?-1:1)*W*.05,H*.86);g.lineTo(W/2+(lx<W/2?-1:1)*W*.42,H*.86);g.closePath();g.fill();g.fillStyle=`rgba(255,255,255,${.9*a})`;g.beginPath();g.arc(lx,4,3.5,0,6.3);g.fill()}
 const poly=(pts,fill)=>{g.beginPath();pts.forEach((p,i)=>{const[x,y]=P(...p);i?g.lineTo(x,y):g.moveTo(x,y)});g.closePath();g.fillStyle=fill;g.fill()};
 g.globalAlpha=.25+.75*lit;
 poly([[-10,-8],[10,-8],[10,31],[-10,31]],'#1c573a');
 poly([[-5.485,0],[5.485,0],[5.485,23.77],[-5.485,23.77]],'#1f5aa0');
 // brilho no centro da quadra
 {const[cx,cy]=P(0,10);const rg=g.createRadialGradient(cx,cy,0,cx,cy,W*.6);rg.addColorStop(0,'rgba(120,170,235,.22)');rg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=rg;g.fillRect(0,0,W,H)}
 // linhas se desenhando
 const pl=bcEase(Math.min(1,Math.max(0,(t-700)/1500))),lw=.07;
 const line=(x1,z1,x2,z2,del)=>{const k=bcEase(Math.min(1,Math.max(0,(pl*1.4-(del||0))/1)));if(k<=0)return;const x3=x1+(x2-x1)*k,z3=z1+(z2-z1)*k,dx=x3-x1,dz=z3-z1,len=Math.hypot(dx,dz)||1,nx=-dz/len*lw,nz=dx/len*lw;poly([[x1+nx,z1+nz],[x3+nx,z3+nz],[x3-nx,z3-nz],[x1-nx,z1-nz]],'rgba(255,255,255,.92)')};
 const D=5.485,Sg=4.115,Lz=23.77,sv1=5.485,sv2=18.285;
 line(-D,0,D,0,0);line(-D,Lz,D,Lz,.1);line(-D,0,-D,Lz,.05);line(D,0,D,Lz,.05);line(-Sg,0,-Sg,Lz,.15);line(Sg,0,Sg,Lz,.15);line(-Sg,sv1,Sg,sv1,.25);line(-Sg,sv2,Sg,sv2,.25);line(0,sv1,0,sv2,.32);line(0,0,0,.25,.3);line(0,Lz,0,Lz-.25,.3);
 g.globalAlpha=1;
 // rede
 const na=bcEase(Math.min(1,Math.max(0,(t-1700)/700)));if(na>0){const nz=11.885;g.globalAlpha=na*(.3+.7*lit);
  g.beginPath();[[-6.4,0],[6.4,0],[6.4,1.07],[0,.914],[-6.4,1.07]].forEach(([x,y],i)=>{const[px,py]=P(x,nz,y);i?g.lineTo(px,py):g.moveTo(px,py)});g.closePath();g.fillStyle='rgba(8,14,22,.55)';g.fill();
  g.strokeStyle='rgba(255,255,255,.12)';g.lineWidth=1;for(let x=-6;x<=6;x+=.75){const[a1,b1]=P(x,nz,0),[a2,b2]=P(x,nz,.95);g.beginPath();g.moveTo(a1,b1);g.lineTo(a2,b2);g.stroke()}
  g.strokeStyle='#f4f7f9';g.lineWidth=Math.max(1.5,W/220);g.beginPath();{const[a1,b1]=P(-6.4,nz,1.07),[a2,b2]=P(0,nz,.914),[a3,b3]=P(6.4,nz,1.07);g.moveTo(a1,b1);g.lineTo(a2,b2);g.lineTo(a3,b3)}g.stroke();
  g.strokeStyle='#c9ced4';g.lineWidth=Math.max(2,W/160);for(const x of[-6.4,6.4]){const[a1,b1]=P(x,nz,0),[a2,b2]=P(x,nz,1.07);g.beginPath();g.moveTo(a1,b1);g.lineTo(a2,b2);g.stroke()}g.globalAlpha=1}
 // poeira de luz nos refletores
 if(!still&&lit>.5){g.fillStyle='rgba(230,240,255,.16)';for(let i=0;i<16;i++){const sx=(i*97.3)%1,sy=((i*53.1)%1+t/(26000+i*900))%1;g.beginPath();g.arc(W*(.12+sx*.76),H*(.95-sy*.8),.6+(i%3)*.5,0,6.3);g.fill()}}
 // bola: saque cruzando a quadra, quique e saída
 const BP=(k)=>{if(k<650){const q=k/650;return{X:1.3+(-1.7-1.3)*q,Z:24.4+(8.6-24.4)*q,Y:2.95*(1-q)+.45*Math.sin(Math.PI*q)}}if(k<1250){const q=(k-650)/600;return{X:-1.7+(-2.9+1.7)*q,Z:8.6+(-3.5-8.6)*q,Y:1.7*Math.sin(Math.PI*q*.82)}}return null};
 const kk=still?-1:(t-2600)%6800;
 if(!still&&t>2600&&kk<1250){const b=BP(kk);if(b){for(let i=6;i>=1;i--){const p=BP(kk-i*18);if(!p)continue;const[x,y]=P(p.X,p.Z,p.Y),d=p.Z-Zc;g.fillStyle=`rgba(214,240,58,${.05*(7-i)})`;g.beginPath();g.arc(x,y,Math.max(2,f*.09/d),0,6.3);g.fill()}
  const d=b.Z-Zc,[sx,sy]=P(b.X,b.Z,0),[bx,by]=P(b.X,b.Z,b.Y),r=Math.max(3.4,f*.11/d);g.fillStyle=`rgba(0,0,0,${.35/(1+b.Y*.6)})`;g.beginPath();g.ellipse(sx,sy,r*1.3,r*.45,0,0,6.3);g.fill();
  const bg=g.createRadialGradient(bx-r*.35,by-r*.4,0,bx,by,r);bg.addColorStop(0,'#f6ff9a');bg.addColorStop(.6,'#d6f03a');bg.addColorStop(1,'#93b310');g.fillStyle=bg;g.beginPath();g.arc(bx,by,r,0,6.3);g.fill()}}
 // marca do quique
 if(!still&&t>2600&&kk>=650&&kk<1350){const q=(kk-650)/700,[cx,cy]=P(-1.7,8.6),d=8.6-Zc,rr=f*(.15+q*.9)/d;g.strokeStyle=`rgba(255,255,255,${.35*(1-q)})`;g.lineWidth=1.2;g.beginPath();g.ellipse(cx,cy,rr,rr*.32,0,0,6.3);g.stroke()}
 // vinhetas para o texto
 gr=g.createLinearGradient(0,0,0,H*.5);gr.addColorStop(0,'rgba(4,9,7,.85)');gr.addColorStop(1,'rgba(4,9,7,0)');g.fillStyle=gr;g.fillRect(0,0,W,H*.5);
 gr=g.createLinearGradient(0,H*.8,0,H);gr.addColorStop(0,'rgba(4,9,7,0)');gr.addColorStop(1,'rgba(4,9,7,.75)');g.fillStyle=gr;g.fillRect(0,H*.8,W,H*.2);
 if(!still&&document.getElementById('v5herc'))V5HR=requestAnimationFrame(v5HeroFrame)};
{const _mv=menuView;menuView=function(){let s=_mv();try{s=s.replace('aria-label="Ilustração de um tenista sacando num estádio"','aria-label="Quadra de tênis à noite, com os refletores acendendo e a bola quicando"');if(s.includes('id="v5herc"')){if(!window.BCID)setTimeout(()=>{window.BCID=1;document.body.classList.add('bcid')},3200)}}catch(e){}return s}}
