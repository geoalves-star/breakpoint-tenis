// =============== v5.5 · partida jogável (modo arcade) ===============
// Cada ponto é jogado em tempo real: saque com medidor, e em cada bola você desliza o dedo (ou usa as setas + espaço)
// no momento certo. O resultado de cada ponto alimenta o mesmo motor da partida (placar, estatísticas, cansaço).
let V5A=null,V5AR=0;
const v5ArcOn=()=>!S.me||S.me.arc!==false;
function v5ArcPMe(){const I=IM,E=I.E;return eSrv(E)?E.pA:1-E.pB}
function v5ArcReady(){const I=IM;return !!(I&&v5ArcOn()&&!I.E.done&&!I.anim&&!I.toss&&!I.sig&&!I.brk&&!I.chal&&!I.rainP&&I.cramp!==1&&!I.pend)}
function v5ArcStart(){const I=IM,E=I.E,sA=eSrv(E),m=S.me;const weak=m.attrs.fh<m.attrs.bh?-1:1;// lado mais fraco: -1 = forehand (direita do destro)
 V5A={pt:I.E.TL.length,phase:sA?'srvMe':'srvOpp',t0:performance.now(),sA,serve:1,me:{x:0},op:{x:0},ball:null,aim:0,pow:0,qPrev:1,shots:0,txt:sA?'Toque no momento certo para sacar':'Prepare-se para a devolução',sub:sA?'Deslize para os lados para mirar':'',fx:null,end:null,weak,pMe:v5ArcPMe(),hint:null,last:null};
 if(!sA)setTimeout(()=>{if(V5A&&V5A.phase==='srvOpp')v5OppServe()},700);v5ArcLoop()}
function v5Q(dt){const a=Math.abs(dt);return a<=55?['PERFEITO',1.4,'p']:a<=115?['BOM',1.05,'g']:a<=185?['OK',.8,'o']:a<=270?[dt<0?'CEDO':'ATRASADO',.55,'b']:null}
// bola: de (x0,y0) até (x1,y1) com quique em yb; coordenadas de quadra: x -1..1, y 0 (sua linha de base) .. 1 (do adversário)
function v5Ball(x0,y0,x1,y1,T,toMe){const now=performance.now();return{x0,y0,x1,y1,T,t0:now,toMe,yb:toMe?.22+Math.random()*.12:.75+Math.random()*.1}}
function v5BallPos(b,now){const u=clamp((now-b.t0)/b.T,0,1.25);const x=b.x0+(b.x1-b.x0)*u,y=b.y0+(b.y1-b.y0)*u;const ub=(b.y0-b.yb)/(b.y0-b.y1);const z=u<ub?Math.sin(Math.PI*u/ub)*.9:Math.sin(Math.PI*clamp((u-ub)/(1-ub),0,1))*.45;return{x,y,z,u}}
function v5OppServe(){const I=IM,sv=I.E.SB,A=V5A;if(!A)return;const r=Math.random();const f1=A.serve===1?sv.f1r:1-sv.dfr*.9;
 if(r>f1){if(A.serve===1){A.serve=2;A.txt='Falta. Segundo saque';A.flash={t:'FALTA',c:'#FFD84D',t0:performance.now()};setTimeout(()=>v5OppServe(),650);return}return v5End(true,'df','Dupla falta do adversário')}
 if(A.serve===1&&Math.random()<sv.ac*1.05){A.ball=v5Ball(A.op.x,1.04,(Math.random()<.5?-.55:.55),-.06,620,true);A.phase='ace';setTimeout(()=>v5End(false,'ace','Ace do adversário'),640);return}
 const tx=(Math.random()<.5?-1:1)*(.25+Math.random()*.45);A.ball=v5Ball(A.op.x,1.04,tx,-.04,A.serve===1?700:880,true);A.phase='incoming';A.ret=1;A.txt='Devolva!';A.sub='Deslize no momento em que a bola chegar'}
function v5MeServe(){const A=V5A,I=IM,sv=I.E.SA,m=S.me;const k=(Math.sin((performance.now()-A.t0)/260)+1)/2;// medidor 0..1
 const d=k-.86,q=Math.abs(d)<=.05?['PERFEITO',1.4,'p']:Math.abs(d)<=.12?['BOM',1.05,'g']:Math.abs(d)<=.22?['OK',.8,'o']:['FRACO',.55,'b'];A.flash={t:q[0],c:q[2]==='p'?'#D9F24A':q[2]==='g'?'#3DDC84':q[2]==='o'?'#F2C14E':'#FF6B5B',t0:performance.now()};
 const aim=A.aim,risk=Math.abs(aim)>.5?.08:aim===0?-.03:0;let pin=(A.serve===1?sv.f1r:1-sv.dfr)+(q[1]-1)*.12-risk*(A.serve===1?1:.4);pin=clamp(pin,.35,.97);
 if(Math.random()>pin){if(A.serve===1){A.serve=2;A.txt='Falta! Segundo saque';A.sub='Mais seguro: mire no meio';A.t0=performance.now();return}return v5End(false,'df','Dupla falta')}
 const ace=A.serve===1&&Math.random()<sv.ac*(q[1]*q[1])*(Math.abs(aim)>.5?1.5:aim===0?.5:1.1);const tx=aim||((Math.random()-.5)*.3);
 A.ball=v5Ball(A.me.x,-.04,tx*.8,1.02,A.serve===1?480:620,false);A.phase='outgoing';A.qPrev=q[1]*(A.serve===1?1.15:.85);A.txt=q[0];A.sub='';
 setTimeout(()=>{if(!V5A)return;if(ace)return v5End(true,'ace','Ace!');v5OppHit()},A.ball.T)}
// o adversário rebate (ou erra) depois do seu golpe
function v5OppHit(){const A=V5A;if(!A)return;const a=A.pMe,Qp=A.lastAgr?Math.pow(A.qPrev,1.4):Math.pow(A.qPrev,.8),h=.3*(A.lastAgr?1.5:A.lastDef?.7:1)+(A.shots===0&&A.sA?.05:0);
 const pErr=clamp(h*a*Qp,0,.75),pWin=clamp(h*(1-a)/Qp,0,.6);const r=Math.random();
 if(r<pErr){const st=A.lastAgr&&A.qPrev>1.1?'winner':'erro';return v5End(true,st==='winner'?'win':'ue',st==='winner'?pick(['Winner!','Bola vencedora!','Na linha, winner!']):pick(['Erro do adversário','Bola na rede do adversário','A bola dele foi longa']))}
 const ang=A.weak*(Math.random()<.6?1:-1)*(.3+Math.random()*.55),wide=pWin>.18?1:.7;let tx=clamp(ang*wide,-.95,.95);
 const fast=r<pErr+pWin;A.oppWin=fast;A.ball=v5Ball(A.op.x,1.02,tx,-.03,fast?620:700+Math.random()*200,true);A.phase='incoming';A.txt=fast?'Bola difícil!':'Sua vez';A.sub=''}
// seu golpe: dt = diferença de tempo para o momento ideal; dir -1/0/1; kind: 'atk','def','neu'
function v5MeHit(dir,kind){const A=V5A,now=performance.now();if(!A||A.phase!=='incoming'||!A.ball)return;const b=A.ball,ideal=b.t0+b.T;
 const reach=Math.abs(A.me.x-b.x1),late=Math.max(0,(reach-v5Reach())*900);const dt=now-ideal+late;const q=v5Q(dt);
 const side=b.x1>=A.me.x-.02?'fh':'bh',m=S.me,at=(m.attrs[side]||60);
 if(!q){return v5End(false,'ue',dt<0?'Bateu cedo demais':'Chegou atrasado')}
 let Q=q[1]*(1+(at-60)/150);if(A.oppWin)Q*=.82;A.flash={t:q[0],c:q[2]==='p'?'#D9F24A':q[2]==='g'?'#3DDC84':q[2]==='o'?'#F2C14E':'#FF6B5B',t0:now};
 const agr=kind==='atk',def=kind==='def';const a=A.pMe,h=.3*(agr?1.5:def?.7:1);const Qm=agr?Math.pow(Q,1.4):def?Math.pow(Q,.6):Q;
 const pErr=clamp(h*(1-a)/Qm+(A.oppWin?.08:0),0,.8);if(Math.random()<pErr){A.shots++;return v5End(false,'ue',pick(agr?['Arriscou e errou','Bola longa','Na rede!']:['Erro não forçado','A bola não passou da rede','Saiu por pouco']))}
 A.shots++;A.qPrev=Q;A.lastAgr=agr;A.lastDef=def;const tx=dir?dir*(agr?.85:.6):(Math.random()-.5)*.3;
 A.ball=v5Ball(A.me.x,-.02,tx,1.02,agr?480:def?780:600,false);A.phase='outgoing';A.txt=q[0]+(agr?' · ataque':def?' · defesa':'');A.sub=`${side==='fh'?'Forehand':'Backhand'}${dir?dir<0?' na cruzada esquerda':' na paralela direita':''}`;
 setTimeout(()=>{if(V5A===A)v5OppHit()},A.ball.T)}
const v5Reach=()=>clamp((.35+((S.me.attrs.fi||60)-50)/110)*(S.me.style==='contra'?1.15:1),.3,.9);
function v5End(aw,kind,txt){const A=V5A;if(!A||A.end)return;A.end={aw,kind,txt,t0:performance.now()};A.phase='end';A.txt=txt;A.sub=aw?'Ponto seu':'Ponto do adversário';try{aw?sCrowd(kind==='ace'||kind==='win'?2:1):sGroan()}catch(e){}
 setTimeout(()=>v5ArcCommit(),650)}
function v5ArcCommit(){const A=V5A,I=IM;if(!A||!I)return;V5A=null;const sA=eSrv(I.E);V5ARC={fw:sA?A.end.aw:!A.end.aw,fev:A.end.kind==='ace'?'ace':A.end.kind==='df'?'df':'forced',txt:A.end.txt,kind:A.end.kind,aw:A.end.aw};
 I.pend={k:'arc',sA};const _ct=cTrust;cTrust=()=>{};try{imRally('arc')}finally{cTrust=_ct}
 try{const W=V5ARC.aw?I.E.SA:I.E.SB,L=V5ARC.aw?I.E.SB:I.E.SA;if(V5ARC.kind==='win')W.win++;else if(V5ARC.kind==='ue')L.ue++;else if(V5ARC.kind==='ace')W.ace++;else if(V5ARC.kind==='df')L.df++}catch(e){}V5ARC=null}
let V5ARC=null;
{const _im=imMod;imMod=function(k){if(k==='arc'&&V5ARC)return{fw:V5ARC.fw,fev:V5ARC.fev};return _im(k)}}
{const _rm=rallyMod;rallyMod=function(k){if(k==='arc')return{dp:0};return _rm(k)}}
{const _it=imTxt;imTxt=function(r){if(r&&r.rl==='arc'&&V5ARC)return V5ARC.txt+(r.ev==='brk'?' · QUEBRA!':r.ev==='set'?' · SET!':r.ev==='match'?' · FIM DE JOGO!':'');return _it(r)}}
// entrada: deslizar (toque) e teclado
let V5PD=null;
function v5PDown(e){V5PD={x:e.clientX,y:e.clientY,t:performance.now()};const A=V5A;if(A&&A.phase==='srvMe'){}e.preventDefault()}
function v5PUp(e){const A=V5A;if(!A||!V5PD)return;const dx=e.clientX-V5PD.x,dy=e.clientY-V5PD.y,len=Math.hypot(dx,dy);V5PD=null;
 const dir=len<18?0:Math.abs(dx)>Math.abs(dy)*.45?(dx<0?-1:1):0,kind=len<18?'neu':dy<-60&&len>110?'atk':dy>30?'def':'neu';
 if(A.phase==='srvMe'){if(len>=18&&Math.abs(dx)>Math.abs(dy)){A.aim=dx<0?-.8:.8;A.txt=A.aim<0?'Mira: aberto à esquerda':'Mira: aberto à direita';return}if(len>=18&&dy<0&&Math.abs(dx)<=Math.abs(dy)){A.aim=0;A.txt='Mira: no T';return}return v5MeServe()}
 if(A.phase==='incoming')v5MeHit(dir,kind)}
function v5Key(e){const A=V5A;if(!A||!IM)return;if(e.key==='ArrowLeft'){A.kd=-1;if(A.phase==='srvMe'){A.aim=-.8;A.txt='Mira: aberto à esquerda'}e.preventDefault()}else if(e.key==='ArrowRight'){A.kd=1;if(A.phase==='srvMe'){A.aim=.8;A.txt='Mira: aberto à direita'}e.preventDefault()}else if(e.key==='ArrowUp'){A.kk='atk';if(A.phase==='srvMe'){A.aim=0;A.txt='Mira: no T'}e.preventDefault()}else if(e.key==='ArrowDown'){A.kk='def';e.preventDefault()}
 else if(e.key===' '||e.key==='Enter'){e.preventDefault();if(A.phase==='srvMe')v5MeServe();else if(A.phase==='incoming'){v5MeHit(A.kd||0,A.kk||'neu');A.kd=0;A.kk=null}}}
document.addEventListener('keydown',v5Key);
// desenho
function v5ArcLoop(){if(V5AR)return;V5AR=requestAnimationFrame(v5ArcFrame)}
function v5ArcFrame(now){V5AR=0;const cv=document.getElementById('v5arc');if(!cv||!IM)return;if(!cv.dataset.on){cv.dataset.on=1;cv.addEventListener('pointerdown',v5PDown);cv.addEventListener('pointerup',v5PUp);cv.addEventListener('pointercancel',()=>V5PD=null)}
 const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==Math.round(W*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 const A=V5A,I=IM,ev=I.ev,sc=SURFC[ev.surf]||['#2D7FD3','#173c75'];const top=62,bot=H-44,P=(x,y,z=0)=>{const yy=bot-(bot-top)*y,hw=(W*.46)-(W*.17)*y;return[W/2+x*hw,yy-z*(28-12*y)]};
 // fundo
 g.fillStyle=sc[1];g.fillRect(0,0,W,H);const q=(x0,y0,x1,y1)=>{const a=P(x0,y0),b=P(x1,y0),c=P(x1,y1),d=P(x0,y1);g.beginPath();g.moveTo(...a);g.lineTo(...b);g.lineTo(...c);g.lineTo(...d);g.closePath()};
 q(-1.18,-.12,1.18,1.12);g.fillStyle=sc[0];g.fill();g.strokeStyle='#F3ECDC';g.lineWidth=2;q(-1,0,1,1);g.stroke();q(-.75,0,.75,1);g.stroke();
 g.beginPath();g.moveTo(...P(-.75,.27));g.lineTo(...P(.75,.27));g.moveTo(...P(-.75,.73));g.lineTo(...P(.75,.73));g.moveTo(...P(0,.27));g.lineTo(...P(0,.73));g.stroke();
 // rede
 g.strokeStyle='#140f0b';g.lineWidth=4;g.beginPath();g.moveTo(...P(-1.1,.5,0));g.lineTo(...P(1.1,.5,0));g.stroke();g.strokeStyle='#F3ECDC';g.lineWidth=1.5;g.beginPath();g.moveTo(...P(-1.1,.5,.55));g.lineTo(...P(1.1,.5,.55));g.stroke();
 // movimento automático dos jogadores
 if(A){const b=A.ball;if(b&&b.toMe&&A.phase==='incoming'){const t=clamp((now-b.t0)/b.T,0,1),sp=v5Reach()*.0045*16;A.me.x+=clamp(b.x1-A.me.x,-sp,sp)}else A.me.x*=.96;
  if(b&&!b.toMe){A.op.x+=clamp(b.x1-A.op.x,-.03,.03)}}
 const drawP=(x,y,me)=>{const[px,py]=P(x,y),s=me?1:.62;g.save();g.translate(px,py);g.scale(s,s);g.fillStyle='#0006';g.beginPath();g.ellipse(0,4,16,5,0,0,6.3);g.fill();
  g.fillStyle=me?'#D9F24A':'#F08A4B';g.strokeStyle='#140f0b';g.lineWidth=2.5;g.beginPath();g.roundRect(-11,-30,22,26,7);g.fill();g.stroke();g.fillStyle='#e8b98c';g.beginPath();g.arc(0,-38,9,0,6.3);g.fill();g.stroke();
  g.strokeStyle='#140f0b';g.lineWidth=3;g.beginPath();g.moveTo(10,-22);g.lineTo(22,-30);g.stroke();g.beginPath();g.ellipse(26,-36,6,8,.5,0,6.3);g.stroke();g.restore()};
 drawP(A?A.op.x:0,1.03,false);{const[nx,ny]=P(A?A.op.x:0,1.03);g.font="700 10px 'JetBrains Mono', monospace";g.textAlign='center';g.fillStyle='#F3ECDC';g.fillText(IDX.get(I.opp).n.split(' ').slice(-1)[0].toUpperCase(),nx,ny+14)}
 // bola
 let hitRing=null;if(A&&A.ball){const bp=v5BallPos(A.ball,now);const[bx,by]=P(bp.x,bp.y,0),[hx,hy]=P(bp.x,bp.y,bp.z);g.fillStyle='#0005';g.beginPath();g.ellipse(bx,by,5,2,0,0,6.3);g.fill();g.fillStyle='#E8FF4A';g.strokeStyle='#140f0b';g.lineWidth=1.5;g.beginPath();g.arc(hx,hy,5.5-bp.y*1.5,0,6.3);g.fill();g.stroke();
  if(A.phase==='incoming'){const u=(now-A.ball.t0)/A.ball.T;hitRing=u;if(u>1.35)v5End(false,A.oppWin?'win':'ue',A.oppWin?'Não alcançou a bola':'Deixou a bola passar')}}
 drawP(A?A.me.x:0,-.06,true);
 // anel de tempo
 if(hitRing!=null){const[px,py]=P(A.me.x,-.06);const r=12+Math.max(0,1-hitRing)*60;const ok=Math.abs(1-hitRing)*A.ball.T<=115;g.strokeStyle=ok?'#D9F24A':'#F3ECDC';g.lineWidth=ok?4:2.5;g.beginPath();g.ellipse(px,py-18,r*1.3,r*.6,0,0,6.3);g.stroke();g.strokeStyle='#D9F24A66';g.lineWidth=2;g.beginPath();g.ellipse(px,py-18,15.6,7.2,0,0,6.3);g.stroke()}
 // medidor de saque
 if(A&&A.phase==='srvMe'){const k=(Math.sin((now-A.t0)/260)+1)/2,bw=W*.62,bx=(W-bw)/2,by=H-22;g.fillStyle='#140f0bcc';g.fillRect(bx-3,by-3,bw+6,14);g.fillStyle='#ffffff22';g.fillRect(bx,by,bw,8);g.fillStyle='#3DDC84';g.fillRect(bx+bw*.74,by,bw*.24,8);g.fillStyle='#D9F24A';g.fillRect(bx+bw*.81,by,bw*.1,8);g.fillStyle='#fff';g.fillRect(bx+bw*k-2,by-4,4,16);
  const[ax,ay]=P(A.aim*.8,.62);g.strokeStyle='#D9F24A';g.setLineDash([5,5]);g.lineWidth=2;g.beginPath();g.moveTo(...P(A.me.x,0));g.lineTo(ax,ay);g.stroke();g.setLineDash([])}
 // textos
 if(A){g.textAlign='center';g.font="900 15px Archivo, sans-serif";g.fillStyle='#F3ECDC';g.strokeStyle='#140f0b';g.lineWidth=4;g.strokeText(A.txt.toUpperCase(),W/2,22);g.fillText(A.txt.toUpperCase(),W/2,22);if(A.sub){g.font="500 11px 'JetBrains Mono', monospace";g.lineWidth=3;g.strokeText(A.sub,W/2,H*.5+18);g.fillText(A.sub,W/2,H*.5+18)}
  if(A.flash&&now-A.flash.t0<600){const a=1-(now-A.flash.t0)/600;g.globalAlpha=a;g.font="900 30px Archivo, sans-serif";g.fillStyle=A.flash.c;g.lineWidth=5;const y=H*.62-(1-a)*20;g.strokeText(A.flash.t,W/2,y);g.fillText(A.flash.t,W/2,y);g.globalAlpha=1}
  if(A.end){g.fillStyle=A.end.aw?'#3DDC8433':'#FF6B5B33';g.fillRect(0,0,W,H)}}
 else{g.textAlign='center';g.font="700 13px Archivo, sans-serif";g.fillStyle='#F3ECDC';g.fillText(I.E.done?'Fim de partida':'',W/2,22)}
 if(A||document.getElementById('v5arc'))v5ArcLoop()}
// integra na tela da quadra
{const _cv=courtView;courtView=function(){let s=_cv();try{if(!v5ArcOn()||!IM)return s;s=s.replace('<canvas id="courtc" class="courtc" role="img" aria-label="Quadra"></canvas>','<canvas id="v5arc" class="v5arc" role="img" aria-label="Quadra: deslize para rebater" tabindex="0"></canvas><div class="v5arch"><span>Toque: golpe no meio</span><span>Deslize para o lado: mira</span><span>Para cima e forte: ataque</span><span>Para baixo: defesa</span><span>Teclado: setas + espaço</span></div>');
  s=s.replace(/Escolha o saque ou a devolução e depois a jogada do rali\.[^<]*/,'Jogue cada ponto em tempo real. No saque, toque quando o marcador estiver na faixa verde (deslize antes para mirar). Nas trocas de bola, deslize no momento em que a bola chega ao anel: para o lado mira (bem longo vai na linha, mais arriscado), para cima com força é o chapado, para baixo é o slice, toque é o top spin. No saque, deslize para baixo para sacar no corpo. A faixa no alto mostra se você bateu cedo ou atrasado. Seu físico define o quanto você alcança.');if(v5ArcReady())s=s.replace(/<div class="sec-t" style="margin-top:8px">[^]*?<div class="choices">[^]*?<\/div>/,'');
  s=s.replace('<div class="g3" style="margin-top:6px">','<button class="ghost" style="width:100%;margin-top:6px" onclick="S.me.arc=false;V5A=null;render()">Modo clássico: escolher jogadas por botões</button><div class="g3" style="margin-top:6px">')}catch(e){console.error(e)}return s}}
{const _r6=render0;render0=function(){_r6();try{if(IM&&v5ArcOn()&&document.getElementById('v5arc')){if(v5ArcReady()&&(!V5A||V5A.pt!==IM.E.TL.length&&!V5A.end))v5ArcStart();else v5ArcLoop()}else if(!IM)V5A=null}catch(e){console.error(e)}}}
// voltar ao arcade a partir do modo clássico
{const _cv2=courtView;courtView=function(){let s=_cv2();try{if(IM&&!v5ArcOn())s=s.replace('<div class="g3" style="margin-top:6px">','<button class="ghost" style="width:100%;margin-top:6px" onclick="S.me.arc=true;render()">Jogar em tempo real (deslizar para rebater)</button><div class="g3" style="margin-top:6px">')}catch(e){}return s}}
