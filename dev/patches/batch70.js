// =============== v5.7: assistir com a quadra animada + imagem para compartilhar ===============
// ---------- assistir: pontos importantes animados na quadra ----------
let V5W=null;
function v5WScript(e){const srvMe=e.ev==='brk'?!e.aw:!!e.srv,win=Math.random()<.55;let n;const ok=k=>{const last=(k-1)%2===0?srvMe:!srvMe;return win?last===e.aw:last!==e.aw};
 const opts=[1,2,3,4,5,6,7].filter(k=>ok(k)&&(k>1||win));n=opts.length?opts[Math.floor(Math.random()*Math.min(opts.length,4))]:2;
 const segs=[];let hit=srvMe,x=(srvMe?1:-1)*.3;
 for(let k=0;k<n;k++){const toMe=!hit,last=k===n-1,y0=hit?-.04:1.04;let x1,y1,T=k===0?560:620+Math.random()*180,zm=1,out=null;
  if(last&&win){x1=(Math.random()<.5?-1:1)*(.85+Math.random()*.2);y1=toMe?-.12:1.12;T=480;out='win'}
  else if(last&&!win){if(Math.random()<.5){x1=(Math.random()-.5)*.8;y1=.5;zm=.5;out='net'}else{x1=(Math.random()-.5)*.9;y1=toMe?-.3:1.3;out='long'}}
  else{x1=(Math.random()-.5)*1.3;y1=toMe?-.04:1.04}
  segs.push({x0:x,y0,x1,y1,T,toMe,zm,yb:toMe?.22+Math.random()*.12:.75+Math.random()*.1,out});x=x1;hit=!hit}
 return{segs,win,srvMe,ace:n===1&&win}}
function v5WStart(e,done){const sc=v5WScript(e);let t=performance.now()+350;sc.segs.forEach(s=>{s.t0=t;t+=s.T});V5W={e,sc,done,end:t+900,mx:0,ox:0,pm:{ph:0,lx:0,sw:null},po:{ph:0,lx:0,sw:null},bg:null};requestAnimationFrame(v5WFrame)}
function v5WFrame(now){const W0=V5W;if(!W0||!LIVE)return;const cv=document.getElementById('v5wc');if(!cv){if(now>W0.end){const d=W0.done;V5W=null;d&&d()}else requestAnimationFrame(v5WFrame);return}
 const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 const ev=LIVE.ev,u=W/360,top=Math.round(H*.33),bot=H-40,hw=y=>W*.43-W*.19*y,P=(x,y,z=0)=>{const yy=bot-(bot-top)*y;return[W/2+x*hw(y),yy-z*(34-15*y)*(H/430)]},sAt=y=>Math.max(.66,hw(y)/hw(0))*1.05*Math.max(.8,Math.min(1.25,H/430));
 const key=['w',W,H,dpr,ev.name,ev.surf,ev.tier].join('|');if(!V5BG||V5BG.key!==key){V5BG=v5BgBuild(W,H,dpr,ev,P,top);V5BG.key=key}
 const segs=W0.sc.segs;let si=-1;for(let i=0;i<segs.length;i++)if(now>=segs[i].t0)si=i;const s=si>=0?segs[si]:null;const ended=si===segs.length-1&&now>s.t0+s.T;
 const cheer=ended&&W0.e.aw&&Math.floor(now/150)%2===0;g.drawImage(V5BG.img[cheer?1:0],0,0,W,H);
 // movimento
 const tgt=s&&!ended?s.x1:0;if(s&&s.toMe)W0.mx+=clamp(tgt-W0.mx,-.03,.03);else W0.mx*=.97;if(s&&!s.toMe)W0.ox+=clamp(tgt-W0.ox,-.03,.03);else W0.ox*=.97;
 for(const[k,x]of[['pm',W0.mx],['po',W0.ox]]){const p=W0[k],dx=Math.abs(x-p.lx);p.lx=x;p.run=clamp((p.run||0)*.8+dx*60,0,1);p.ph+=dx*55+(p.run>.05?.12:0)}
 const pose=(me)=>{const p=me?W0.pm:W0.po;let mode='ready',side='fh',k=0;for(let i=0;i<=si;i++){const q=segs[i],hitMe=!q.toMe;if(hitMe===me){const t=now-q.t0;if(t>=0&&t<380){mode=i===0?'serve':'swing';k=t/(i===0?480:380);side=Math.random()<0?'bh':'fh'}}}
  if(mode==='ready'&&s&&!ended&&s.toMe===me&&(now-s.t0)/s.T>.5)mode='prep';return{mode,side,k:clamp(k,0,1),run:p.run,ph:p.ph}};
 let avOp;try{const o=IDX.get(LIVE.opp);avOp=o.av||aiAv(o)}catch(e){avOp={sk:2,h:'curto',hc:0,sh:4,a:'nada',g:'m'}}
 {const[px,py]=P(W0.ox,1.04);v5DrawPl(g,px,py,sAt(1.04)*u,avOp,true,pose(false),now)}
 let bp=null;if(s&&!(ended&&now>s.t0+s.T+500)){bp=v5BallPos({...s},now);if(s.zm)bp.z*=s.zm}
 const drawB=()=>{if(!bp)return;const[sx,sy]=P(bp.x,bp.y,0),[hx,hy]=P(bp.x,bp.y,bp.z),r=(6-1.8*bp.y)*u;g.fillStyle='#00000055';g.beginPath();g.ellipse(sx,sy,r,r*.4,0,0,6.3);g.fill();g.fillStyle='#E8FF4A';g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.arc(hx,hy,r,0,6.3);g.fill();g.stroke()};
 if(bp&&bp.y>.5)drawB();g.drawImage(V5BG.img[2],0,0,W,H);if(bp&&bp.y<=.5)drawB();
 {const[px,py]=P(W0.mx,-.06);v5DrawPl(g,px,py,sAt(-.06)*u,myAv(),false,pose(true),now,S.me.rkc)}
 // legenda
 const e=W0.e,lab={brk:'QUEBRA',set:'SET',match:'MATCH POINT',ace:'ACE'}[e.ev]||'PONTO IMPORTANTE';g.font=`900 ${Math.round(13*u)}px Archivo, sans-serif`;const tw=g.measureText(lab).width;g.save();g.translate(W/2,18*u);g.rotate(-.018);g.fillStyle=V5PAP;g.strokeStyle=V5INK;g.lineWidth=2.2;g.beginPath();g.roundRect(-tw/2-9*u,-12*u,tw+18*u,24*u,4);g.fill();g.stroke();g.fillStyle=V5INK;g.textAlign='center';g.textBaseline='middle';g.fillText(lab,0,1);g.restore();
 if(ended){const t=now-(s.t0+s.T),aw=e.aw,txt=W0.sc.win?(W0.sc.ace?'ACE!':(aw?'WINNER SEU!':'WINNER DELE')):(s.out==='net'?'NA REDE!':'FORA!');const sl=Math.min(1,t/140),rw=W*.66;g.save();g.translate(W/2+(1-sl)*(aw?-W:W),H*.45);g.rotate(-.03);g.fillStyle=aw?'#3DDC84':'#FF6B5B';g.strokeStyle=V5INK;g.lineWidth=2.4;g.beginPath();g.roundRect(-rw/2,-15*u,rw,30*u,5);g.fill();g.stroke();g.fillStyle=V5INK;g.font=`900 ${Math.round(15*u)}px Archivo, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,0,1);g.restore()}
 g.fillStyle=V5PAP;g.font=`700 ${Math.round(9*u)}px 'JetBrains Mono', monospace`;g.textAlign='center';g.fillText('toque para pular',W/2,H-6*u);
 if(now>W0.end){const d=W0.done;V5W=null;d&&d();return}requestAnimationFrame(v5WFrame)}
function v5WSkip(){if(V5W){V5W.end=0}}
const v5WOn=()=>OPTS.wc!==false&&!OPTS.eco;
{const _li=liveInner;liveInner=function(){let s=_li();try{if(v5WOn()&&LIVE&&LIVE.phase==='live'){s=s.replace('<table class="board">','<canvas id="v5wc" class="v5arc v5wc" onclick="v5WSkip()" role="img" aria-label="Lance importante na quadra"></canvas><table class="board">')}}catch(e){}return s}}
{const _sl=startLive;startLive=function(res,opp,stage,ev){_sl(res,opp,stage,ev);try{if(!LIVE||LIVE.phase!=='live'||!v5WOn())return;clearInterval(LIVET);const n=res.tl.length,tick=clamp(Math.round(4200/n),16,45);let cnt=0;
  LIVET=setInterval(()=>{if(!LIVE){clearInterval(LIVET);return}if(V5W)return;if(LIVE.hold>0){LIVE.hold--;return}LIVE.i++;const e=LIVE.res.tl[LIVE.i];if(!e||LIVE.i>=n-1){LIVE.i=n-1;clearInterval(LIVET);const fe=LIVE.res.tl[n-1];if(fe&&!LIVE.fin){LIVE.fin=1;const el=document.getElementById('live');if(el)el.innerHTML=liveInner();v5WStart({...fe,ev:'match',aw:LIVE.res.win},()=>{if(LIVE)endLive()})}else endLive();return}
   if(['ace','brk','set','df'].includes(e.ev)){if(SND){sHit();if(e.ev!=='df')(e.aw?sCrowd(e.ev==='ace'?1:1.6):sGroan())}LIVE.hold=e.ev==='set'?6:e.ev==='brk'?3:2;LIVE.feed.unshift(evTxt(e))}
   const el=document.getElementById('live');if(el)el.innerHTML=liveInner();
   if((e.ev==='brk'||e.ev==='set')&&cnt<10){cnt++;v5WStart(e,()=>{})}},tick)}catch(err){console.error(err)}}}
{const _el=endLive;endLive=function(){V5W=null;return _el()}}
// ---------- imagem para compartilhar ----------
function v5SvgImg(svg){return new Promise(res=>{try{let s=svg.replace(/var\(--avbg1\)/g,'#E8E1CF').replace(/var\(--avbg2\)/g,'#C9BFA8').replace(/var\(--[a-z0-9-]+\)/g,'#cfc6b2');if(!/xmlns=/.test(s))s=s.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"');const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}catch(e){res(null)}})}
async function v5ShareCard(){const L=LIVE;if(!L||!L.res)return null;const r=L.res,m=S.me,p=IDX.get(L.opp),T=S.tour,ev=L.ev,W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
 try{await document.fonts.ready}catch(e){}
 const rr=T&&T.over?S.results[0]:null,champ=r.win&&rr&&rr.r==='Campeão',sc=SURFC[ev.surf]||SURFC.hard,INK='#140f0b',PAP='#F3ECDC';
 g.fillStyle=PAP;g.fillRect(0,0,W,H);g.fillStyle='#e6dcc6';for(let y=0;y<H;y+=18)for(let x=(y/18%2)*9;x<W;x+=18){g.beginPath();g.arc(x,y,2.2,0,6.3);g.fill()}
 g.fillStyle=sc[0];g.fillRect(0,0,W,300);g.fillStyle=sc[1];g.fillRect(0,300,W,16);
 g.fillStyle=INK;g.fillRect(36,36,W-72,6);g.fillRect(36,H-42,W-72,6);
 g.fillStyle=PAP;g.font='800 34px "JetBrains Mono", monospace';g.textAlign='left';g.fillText((tl(ev.tier)+' · '+ev.city).toUpperCase().slice(0,40),70,110);
 let fs=92,nm=ev.name.toUpperCase();g.font=`900 ${fs}px Archivo, sans-serif`;while(g.measureText(nm).width>W-140&&fs>54){fs-=4;g.font=`900 ${fs}px Archivo, sans-serif`}while(g.measureText(nm).width>W-140&&nm.length>6)nm=nm.slice(0,-2);g.fillText(nm,70,215);
 g.font='700 34px "JetBrains Mono", monospace';g.fillText(String(year()),70,272);
 const head=champ?G('CAMPEÃO','CAMPEÃ'):r.win?'VITÓRIA':'DERROTA';g.save();g.translate(W/2,445);g.rotate(-.03);g.font='900 150px Archivo, sans-serif';g.textAlign='center';g.lineWidth=14;g.strokeStyle=INK;g.strokeText(head,0,0);g.fillStyle=champ?'#D9F24A':r.win?'#3DDC84':'#FF6B5B';g.fillText(head,0,0);g.restore();
 const ims=await Promise.all([v5SvgImg(avSVG(myAv())),v5SvgImg(avSVG(pAv(p)))]);
 const card=(x,im,name,sub)=>{g.save();g.translate(x,560);g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=6;g.beginPath();g.roundRect(-190,0,380,430,18);g.fill();g.stroke();if(im)g.drawImage(im,-150,24,300,300);g.fillStyle=INK;g.textAlign='center';g.font='900 40px Archivo, sans-serif';let n=name;while(g.measureText(n).width>350&&n.length>4)n=n.slice(0,-2);g.fillText(n,0,370);g.font='700 26px "JetBrains Mono", monospace';g.fillText(sub,0,408);g.restore()};
 const myR=myRank('pro');card(290,ims[0],m.name,`${flagTxt(m.c)}${myR?'#'+myR:'sem ranking'}`);card(W-290,ims[1],p.n,`${flagTxt(p.c)}${rkOf(L.opp)}`);
 g.fillStyle=INK;g.font='900 64px Archivo, sans-serif';g.textAlign='center';g.fillText('VS',W/2,790);
 g.font='800 84px "JetBrains Mono", monospace';g.fillText(scoreStr(r.sets),W/2,1100);
 g.font='700 32px "JetBrains Mono", monospace';g.fillStyle='#4a4136';g.fillText(`${L.stage}${rr&&rr.p&&T.over?' · +'+rr.p+' pts':''}`.toUpperCase(),W/2,1160);
 try{const st=v5Stamp(L);if(st){g.save();g.translate(W-200,1000);g.rotate(.18);g.strokeStyle='#d6402f';g.lineWidth=8;g.beginPath();g.roundRect(-150,-50,300,100,10);g.stroke();g.fillStyle='#d6402f';g.font='900 54px Archivo, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(st,0,4);g.restore()}}catch(e){}
 const a=r.st&&r.st.a;if(a){g.fillStyle=INK;g.font='700 30px "JetBrains Mono", monospace';g.fillText(`${a.ace} aces · ${a.win} winners${a.bpo?` · ${a.bpw}/${a.bpo} break points`:''}`,W/2,1215)}
 g.fillStyle=INK;g.font='900 36px Archivo, sans-serif';g.textAlign='left';g.fillText('BREAKPOINT TÊNIS',70,H-70);g.font='700 26px "JetBrains Mono", monospace';g.textAlign='right';g.fillText('breakpoint-vercel-one.vercel.app',W-70,H-70);
 return c}
const flagTxt=c=>{try{return COUNTRIES[c][0]+' · '}catch(e){return''}};
async function v5Share(){const b=document.getElementById('v5shb');if(b){b.disabled=true;b.textContent='Gerando imagem…'}try{const c=await v5ShareCard();if(!c)throw 0;const blob=await new Promise(r=>c.toBlob(r,'image/png'));const fn='breakpoint_'+(LIVE.ev.name||'partida').toLowerCase().replace(/[^a-z0-9]+/g,'_')+'.png',file=new File([blob],fn,{type:'image/png'});
 if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'Breakpoint Tênis',text:'Minha carreira no Breakpoint Tênis 🎾 breakpoint-vercel-one.vercel.app'})}else{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);TOAST='Imagem salva.';render()}}catch(e){if(e&&e.name!=='AbortError'){TOAST='Não deu para gerar a imagem aqui.';render()}}if(b){b.disabled=false;b.textContent='Compartilhar imagem'}}
{const _vr=v5Res;v5Res=function(){let s=_vr();try{if(LIVE&&LIVE.res&&LIVE.res.st)s+=`<button id="v5shb" class="sec full" style="margin-top:10px" onclick="v5Share()">Compartilhar imagem</button>`}catch(e){}return s}}
{const _m=inMenuView;inMenuView=function(){let s=_m();try{s=s.replace(/(<button class="opt" onclick="v5NpToggle\(\)">)/,`<button class="opt" onclick="OPTS.wc=OPTS.wc===false;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}render()">${OPTS.wc!==false?'✅':'⬜'} Lances na quadra ao assistir<small>No modo Simular assistindo, quebras, sets e o match point aparecem animados na quadra.</small></button>$1`)}catch(e){}return s}}
