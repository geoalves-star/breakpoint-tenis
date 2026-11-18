// =============== v5.7: partida jogável com golpes especiais, rede, km/h, replay e vibração ===============
const v5Vib=ms=>{try{if(OPTS.vib!==false&&navigator.vibrate)navigator.vibrate(ms)}catch(e){}};
// gestos: para cima curto = deixadinha, para cima longo = ataque, para baixo curto = defesa, para baixo longo = lob
v5PUp=function(e){const A=V5A;if(V5RP&&!V5RP.done){V5RP.done=1;V5PD=null;return}if(!A||!V5PD)return;const dx=e.clientX-V5PD.x,dy=e.clientY-V5PD.y,len=Math.hypot(dx,dy);V5PD=null;
 const dir=len<18?0:Math.abs(dx)>Math.abs(dy)*.45?(dx<0?-1:1):0,vert=Math.abs(dx)<Math.abs(dy)*.6;
 const kind=len<18?'neu':dy<-30?(len>=110?'atk':vert?'drop':'neu'):dy>30?(len>=120&&vert?'lob':'def'):'neu';
 if(A.phase==='srvMe'){if(len>=18&&Math.abs(dx)>Math.abs(dy)){A.aim=dx<0?-.8:.8;A.txt=A.aim<0?'Mira: aberto à esquerda':'Mira: aberto à direita';return}if(len>=18&&dy<0&&Math.abs(dx)<=Math.abs(dy)){A.aim=0;A.txt='Mira: no T';return}return v5MeServe()}
 if(A.phase==='incoming')v5MeHit(dir,kind)};
document.addEventListener('keydown',e=>{const A=V5A;if(!A||!IM||A.phase!=='incoming')return;const k=(e.key||'').toLowerCase();if(k==='d'){e.preventDefault();v5MeHit(A.kd||0,'drop');A.kd=0}else if(k==='l'){e.preventDefault();v5MeHit(A.kd||0,'lob');A.kd=0}});
{const _bp=v5BallPos;v5BallPos=function(b,now){const r=_bp(b,now);if(b.zm)r.z*=b.zm;return r}}
{const _st=v5ArcStart;v5ArcStart=function(){_st();try{const A=V5A;if(A){A.meNet=false;A.opNet=false;A.me.y=-.06;A.op.y=1.04}V5REC=[];V5RP=null}catch(e){}}}
// golpes especiais
function v5MeSpecial(dir,kind){const A=V5A,now=performance.now(),b=A.ball,m=S.me;const reach=Math.abs(A.me.x-b.x1),late=Math.max(0,(reach-v5Reach())*900),dt=now-(b.t0+b.T)+late,q=v5Q(dt);
 if(!q)return v5End(false,'ue',dt<0?'Bateu cedo demais':'Chegou atrasado');
 const side=b.x1>=A.me.x-.02?'fh':'bh',sideN=side==='fh'?'Forehand':'Backhand';let Q=q[1];if(A.oppWin)Q*=.82;
 A.flash={t:q[0],c:q[2]==='p'?'#D9F24A':q[2]==='g'?'#3DDC84':q[2]==='o'?'#F2C14E':'#FF6B5B',t0:now};if(q[2]==='p')v5Vib(12);A.shots++;
 if(kind==='drop'){const tq=Q*(1+((m.attrs.vo||60)-60)/140+((m.attrs.fh+m.attrs.bh)/2-60)/300);const pNet=clamp(.2/tq-.05+(b.lobOp?.15:0),.04,.55);
  if(Math.random()<pNet)return v5End(false,'ue',pick(['A deixadinha ficou na rede','Deixadinha curta demais','Tentou a deixadinha e errou']));
  const tx=dir?dir*.5:(Math.random()-.5)*.4;A.ball=v5Ball(A.me.x,-.02,tx,.6,800,false);A.ball.yb=.55;A.ball.zm=.55;A.ball.drop=1;A.qPrev=tq;A.lastAgr=false;A.lastDef=false;
  A.phase='outgoing';A.txt=q[0]+' · deixadinha';A.sub=`${sideN} curtinho`;setTimeout(()=>{if(V5A===A)v5OppDrop(tq)},A.ball.T);return}
 // lob
 const tq=Q*(1+((m.attrs[side]||60)-60)/170);const pLong=clamp(.14/tq-.04,.03,.4);
 if(Math.random()<pLong)return v5End(false,'ue',pick(['O lob saiu longo','Lob na rede','Faltou altura no lob']));
 const tx=dir?dir*.55:(Math.random()-.5)*.3;A.ball=v5Ball(A.me.x,-.02,tx,1.0,1150,false);A.ball.zm=2.1;A.ball.lob=1;A.qPrev=tq;A.lastAgr=false;A.lastDef=true;
 A.phase='outgoing';A.txt=q[0]+' · lob';A.sub=`${sideN} por cima`;setTimeout(()=>{if(V5A===A)v5OppLob(tq)},A.ball.T)}
function v5OppDrop(tq){const A=V5A;if(!A)return;const I=IM,op=IDX.get(I.opp),fi=(op&&op.r)||60;
 const pWin=clamp(.32+(tq-1)*.4+(A.opNet?-.25:0)-(fi-60)/220,.08,.62),r=Math.random();
 if(r<pWin)return v5End(true,'win',pick(['Deixadinha vencedora!','Ele nem chegou!','Deixadinha perfeita!']));
 if(r<pWin+.22)return v5End(false,'win',pick(['Ele chegou e devolveu na cruzada','Chegou correndo e passou você','Contra-deixadinha dele']));
 A.opNet=true;const tx=(Math.random()-.5)*.9;A.ball=v5Ball(A.op.x,.72,tx,A.meNet?A.me.y+.02:-.03,760,true);A.ball.zm=.7;A.ball.weak=1;A.oppWin=false;A.phase='incoming';A.txt='Ele chegou! Passe ou lob';A.sub='Ele está na rede'}
function v5OppLob(tq){const A=V5A;if(!A)return;if(A.opNet){const pWin=clamp(.48+(tq-1)*.45,.2,.78),r=Math.random();if(r<pWin)return v5End(true,'win',pick(['Lob vencedor por cima!','Por cima dele, que lob!','Lob perfeito!']));if(r<pWin+.25&&tq<1)return v5End(false,'win','Lob curto: smash dele');A.opNet=false}
 A.qPrev=tq*.85;A.lastAgr=false;A.lastDef=true;v5OppHit()}
{const _h=v5MeHit;v5MeHit=function(dir,kind){const A=V5A;if(!A||A.phase!=='incoming'||!A.ball)return;if(kind==='drop'||kind==='lob')return v5MeSpecial(dir,kind);
 const wasNet=A.meNet,b0=A.ball,lob=b0.lobOp;_h(dir,kind);try{if(V5A===A&&A.phase==='outgoing'){const m=S.me;
  if(A.flash&&A.flash.t==='PERFEITO')v5Vib(12);
  if(wasNet){A.qPrev*=1.08+((m.attrs.vo||60)-60)/160;A.lastAgr=true;A.sub=lob?(kind==='atk'?'Smash!':'Smash defensivo'):'Voleio'+(dir?dir<0?' na esquerda':' na direita':'');if(lob&&kind==='atk')A.qPrev*=1.25;A.ball.T*=.82}
  else if(lob)A.qPrev*=.8;
  if(A.opNet){if(dir)A.qPrev*=1.18;else A.qPrev*=.82;A.sub=dir?'Passada'+(dir<0?' na cruzada':' na paralela'):A.sub}
  if(!wasNet&&kind==='atk'&&A.qPrev>=1.02&&Math.random()<.5){A.meNet=true;A.sub+=' · subiu à rede'}}}catch(e){}}}
{const _o=v5OppHit;v5OppHit=function(){const A=V5A;_o();try{if(V5A===A&&A.phase==='incoming'&&A.ball&&A.ball.toMe){const b=A.ball;
 if(A.meNet){b.y1=A.me.y+.02;b.yb=Math.min(b.yb,A.me.y+.12);if(Math.random()<.2){b.zm=2.1;b.T=Math.max(b.T,1000);b.lobOp=1;A.txt='Lob dele! Deslize para cima: smash';A.sub=''}else b.T*=.85}
 if(A.oppWin&&!A.opNet&&Math.random()<.3){A.opNet=true;A.sub='Ele subiu à rede'}}}catch(e){}}}
// velocidade do saque
function v5Kmh(sv,q,second,wta){return Math.round((wta?150:172)+(sv-50)*1.15+(q==='PERFEITO'?12:q==='BOM'?6:q==='OK'?0:-8)-(second?32:0)+(Math.random()*8-4))}
{const _s=v5MeServe;v5MeServe=function(){const A=V5A,sv2=A&&A.serve===2;_s();try{if(A&&(A.ball||A.end)){const k=v5Kmh(S.me.attrs.sv||60,A.flash&&A.flash.t,sv2,CIRC()==='WTA');A.sub=(A.sub?A.sub+' · ':'')+k+' km/h';IM.spd=IM.spd||{me:[],op:[]};IM.spd.me.push(k)}}catch(e){}}}
{const _os=v5OppServe;v5OppServe=function(){const A=V5A,sv2=A&&A.serve===2;_os();try{if(A&&(A.ball||A.end)){const op=IDX.get(IM.opp),k=v5Kmh(op?Math.max(40,op.r+((op.sv||0)-0)):60,'OK',sv2,CIRC()==='WTA');A.sub=(IM.E.TL.length<8?'Deslize no momento certo · ':'')+k+' km/h';IM.spd=IM.spd||{me:[],op:[]};IM.spd.op.push(k)}}catch(e){}}}
// vibração e replay dos pontos importantes
let V5REC=[],V5RP=null;
function v5RpRec(now,f){f.t=now;V5REC.push(f);if(V5REC.length>420)V5REC.splice(0,V5REC.length-420)}
function v5RpCur(now){const R=V5RP;if(!R||R.done)return null;if(now<R.t0)return null;const tt=R.f[0].t+(now-R.t0)*R.sp;const last=R.f[R.f.length-1];if(tt>last.t+250){R.done=1;return null}let i=R.i||0;while(i<R.f.length-1&&R.f[i+1].t<=tt)i++;R.i=i;return R.f[i]}
function v5RpDraw(g,W,H,u,now){g.fillStyle='#140f0bcc';g.fillRect(0,0,W,12*u);g.fillRect(0,H-12*u,W,12*u);g.save();g.translate(14*u,H*.2);g.rotate(-.04);g.fillStyle='#FF6B5B';g.strokeStyle=V5INK;g.lineWidth=2;g.beginPath();g.roundRect(0,-12*u,78*u,24*u,4);g.fill();g.stroke();g.fillStyle=V5INK;g.font=`900 ${Math.round(12*u)}px Archivo, sans-serif`;g.textBaseline='middle';g.fillText('● REPLAY',8*u,1);g.restore();g.fillStyle=V5PAP;g.font=`700 ${Math.round(9*u)}px 'JetBrains Mono', monospace`;g.textAlign='center';g.fillText('toque para pular',W/2,H-4*u)}
{const _e=v5End;v5End=function(aw,kind,txt){const A=V5A,had=A&&!A.end;let key=null;try{key=IM&&eKey(IM.E)}catch(e){}_e(aw,kind,txt);try{if(had){v5Vib(aw?(kind==='win'||kind==='ace'?[30,40,30]:25):18);
 if(aw&&OPTS.rp!==false&&key&&/(SET|MATCH|BREAK) POINT A FAVOR/.test(key)&&V5REC.length>40&&(kind==='win'||kind==='ace'||A.shots>=2)){const fr=V5REC.slice(-150);V5RP={t0:performance.now()+700,f:fr,sp:.45,i:0,until:performance.now()+700+(fr[fr.length-1].t-fr[0].t)/.45+300}}}}catch(e){}}}
{const _c=v5ArcCommit;v5ArcCommit=function(){if(V5RP&&!V5RP.done&&performance.now()<V5RP.until){setTimeout(v5ArcCommit,120);return}V5RP=null;V5REC=[];return _c()}}
{const _pd=v5PDown;v5PDown=function(e){if(V5RP&&!V5RP.done){V5RP.done=1;e.preventDefault();return}return _pd(e)}}
// estatísticas de transmissão no resultado
{const _vr=v5Res;v5Res=function(){let s=_vr();try{const r=LIVE&&LIVE.res;if(r&&r.st){const sp=(LIVE.spd||(IM&&IM.spd))||null,km=((r.st.dur||90)*.045*(1+Math.random()*.08)).toFixed(1).replace('.',',');
  const L=[`<div><b>${km} km</b><span>distância percorrida (estimada)</span></div>`];if(sp&&sp.me&&sp.me.length){const mx=Math.max(...sp.me),av=Math.round(sp.me.reduce((a,b)=>a+b,0)/sp.me.length);L.push(`<div><b>${mx} km/h</b><span>seu saque mais rápido</span></div><div><b>${av} km/h</b><span>média do seu saque</span></div>`)}if(sp&&sp.op&&sp.op.length)L.push(`<div><b>${Math.max(...sp.op)} km/h</b><span>saque mais rápido dele</span></div>`);
  const h=`<div class="v5sec"><span class="v5k">Na transmissão</span></div><div class="v5rkg">${L.join('')}</div>`;s=s.includes('<div class="v5sec"><span class="v5k">Momentos</span>')?s.replace('<div class="v5sec"><span class="v5k">Momentos</span>',h+'<div class="v5sec"><span class="v5k">Momentos</span>'):s+h}}catch(e){}return s}}
{const _f=imFinish;imFinish=function(){try{if(IM&&IM.spd)V5LSPD=IM.spd}catch(e){}return _f.apply(this,arguments)}}
let V5LSPD=null;{const _pm=playMatch;playMatch=function(pre){_pm(pre);try{if(LIVE&&pre&&V5LSPD){LIVE.spd=V5LSPD}V5LSPD=null}catch(e){}}}
// dica do jogo e opções
{const _cv=courtView;courtView=function(){let s=_cv();try{s=s.replace('<span>Para baixo: defesa</span><span>Teclado: setas + espaço</span>','<span>Para cima curto: deixadinha</span><span>Para baixo: defesa</span><span>Para baixo longo: lob</span><span>Ataque bom: você sobe à rede</span><span>Teclado: setas, espaço, D e L</span>')}catch(e){}return s}}
{const _m=inMenuView;inMenuView=function(){let s=_m();try{s=s.replace(/(<button class="opt" onclick="v5NpToggle\(\)">)/,`<button class="opt" onclick="OPTS.vib=OPTS.vib===false;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}render()">${OPTS.vib!==false?'✅':'⬜'} Vibração na partida<small>O celular vibra em golpes perfeitos, aces e no fim de cada ponto.</small></button><button class="opt" onclick="OPTS.rp=OPTS.rp===false;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}render()">${OPTS.rp!==false?'✅':'⬜'} Replay dos pontos decisivos<small>Mostra em câmera lenta os break points, set points e match points que você ganha.</small></button>$1`)}catch(e){}return s}}
