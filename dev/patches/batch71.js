// =============== v5.7: duplas jogáveis (pontos decisivos em tempo real, com seu parceiro) ===============
let V5DB=null,V5DBA=null;
const V5DRN=['1ª rodada','2ª rodada','Quartas de final','Semifinal','Final'];
{const _dr=doublesRun;doublesRun=function(ev){const T=S.tour;if(!T||!T.dbl||T.dblDone||QUIET||SIMALL||OPTS.dblPlay===false)return _dr(ev);
 const m=S.me,t=TIERS[ev.tier],pt=partnerOf();if(!pt)return _dr(ev);T.dblDone=1;const d=S.draws[ev.key]||[];const field=d.length?d.reduce((s,id)=>s+(id==='me'?ovr():IDX.get(id).r),0)/d.length:60;
 const chem=((m.chem||{})[pt.id]||0),team=(ovr()*.7+m.attrs.vo*.3+pt.r)/2+(myCoach()?myCoach().q*.2:0)+chem*.025+DFORM[m.dform||'cls'][2](m.attrs)*.5,L=t.pts.length,R0=Math.min(5,L-1);
 V5DB={evKey:ev.key,ev,pt:pt.id,field,team,R0,L,k:0,won:0,stage:'intro',opp:v5DbOpp(field,0)};setTimeout(v5DbShow,350)}}
function v5DbOpp(field,k){const L=ORD.pro.map(id=>IDX.get(id)).filter(p=>p&&p.id!==S.me.dpart&&Math.abs(p.r-(field*.4+52+k*2.2))<6);const a=L.length>3?L[Math.floor(R()*L.length)]:IDX.get(ORD.pro[ri(40,300)]);let b=L.length>3?L[Math.floor(R()*L.length)]:IDX.get(ORD.pro[ri(40,300)]);if(b===a)b=IDX.get(ORD.pro[ri(40,300)]);return[a.id,b.id]}
function v5DbP(){const D=V5DB,t=TIERS[D.ev.tier],opp=D.field*.4+52+D.k*2.2+(t.w>=2.5?2:0);D.oppR=D.oppR??(opp+gauss()*3);return 1/(1+Math.pow(10,-(D.team-D.oppR)/10))}
function v5DbShow(){const D=V5DB;let el=document.getElementById('v5dbo');if(!D){if(el)el.remove();return}if(!el){el=document.createElement('div');el.id='v5dbo';el.className='v5dbo';document.body.appendChild(el)}
 const pt=IDX.get(D.pt),[a,b]=D.opp.map(id=>IDX.get(id)),p0=Math.round(v5DbP()*100),rn=D.k===D.R0-1?'Final':V5DRN[D.k]||'Rodada';
 let body='';if(D.stage==='intro')body=`<p class="small mut" style="margin:0 0 10px">Você e ${flag(pt.c)} <b>${esc(pt.n)}</b> contra ${flag(a.c)} ${esc(a.n.split(' ').slice(-1)[0])} e ${flag(b.c)} ${esc(b.n.split(' ').slice(-1)[0])}. Chance de vitória: <b>${p0}%</b>.</p><p class="xs mut" style="margin:0 0 10px">Você joga 5 pontos decisivos em tempo real: as bolas que vêm para o seu lado (direita) são suas; as do lado esquerdo, seu parceiro joga. Cada ponto ganho aumenta a chance de vencer a partida.</p>
  <button class="full big" onclick="v5DbPlay()">Jogar os pontos decisivos</button><div class="g2" style="margin-top:8px"><button class="sec" onclick="v5DbSim()">Simular esta partida</button><button class="sec" onclick="v5DbSimAll()">Simular o resto</button></div>`;
 else if(D.stage==='play')body=`<div class="row sb small" style="margin:0 0 6px"><span>Ponto ${Math.min(5,D.pn+1)} de 5</span><b>Vocês ${D.pw} × ${D.pl} eles</b></div><canvas id="v5dbc" class="v5arc v5dbc" role="img" aria-label="Quadra de duplas: deslize para rebater"></canvas><div class="xs mut" style="margin-top:6px">Toque no tempo certo. Deslize para o lado para mirar, para cima para atacar, para baixo para defender.</div>`;
 else if(D.stage==='res')body=`<p style="margin:0 0 10px">${D.last}</p>${D.out?`<button class="full big" onclick="v5DbClose()">Fechar</button>`:`<button class="full big" onclick="v5DbNext()">Próxima: ${D.k===D.R0-1?'Final':V5DRN[D.k]}</button><button class="sec full" style="margin-top:8px" onclick="v5DbSimAll()">Simular o resto</button>`}`;
 const cel=D.stage==='res'&&D.champ?`<div class="v5cel${D.ev.tier==='GS'?' gs':''}" style="height:min(46vh,340px);margin:0 0 12px"><canvas id="v5celc" role="img" aria-label="Comemoração: vocês levantam o troféu"></canvas></div>`:'';
 el.innerHTML=`<div class="v5dbb"><div class="v5k a">Duplas · ${esc(D.ev.name)}</div><h2 style="margin:4px 0 8px">${D.stage==='res'?(D.out?(D.champ?'Campeões de duplas!':'Fim das duplas'):'Vitória!'):rn}</h2>${cel}${body}</div>`;
 if(cel&&!D.cel){D.cel=1;setTimeout(()=>{try{const pt=IDX.get(D.pt);v5CelStart({ev:D.ev,res:null,pt:pt.av||aiAv(pt)})}catch(e){}},40)}else if(cel)setTimeout(()=>requestAnimationFrame(v5CelFrame),40);
 if(D.stage==='play'){const cv=document.getElementById('v5dbc');cv.addEventListener('pointerdown',e=>{V5DBA&&(V5DBA.pd={x:e.clientX,y:e.clientY});e.preventDefault()});cv.addEventListener('pointerup',v5DbUp);requestAnimationFrame(v5DbFrame)}}
function v5DbRoundEnd(win){const D=V5DB,m=S.me;m.energy=clamp(m.energy-3,0,100);m.load=clamp((m.load||0)+2,0,100);D.oppR=null;const rn=D.k===D.R0-1?'final':(V5DRN[D.k]||'rodada').toLowerCase();
 if(win){D.won++;D.k++;if(D.k>=D.R0){D.out=1;D.champ=1;D.last=`Vocês venceram a final e são campeões de duplas em ${esc(D.ev.name)}!`;v5DbFinish()}else{D.last=`Vocês venceram a ${rn}.`;D.opp=v5DbOpp(D.field,D.k)}}
 else{D.out=1;D.last=`Vocês perderam na ${rn}.`;v5DbFinish()}D.stage='res';v5DbShow()}
function v5DbFinish(){const D=V5DB,m=S.me,ev=D.ev,t=TIERS[ev.tier],T=S.tour,pt=IDX.get(D.pt),won=D.won,R0=D.R0,L=D.L;
 m.chem=m.chem||{};m.chem[pt.id]=clamp((m.chem[pt.id]||0)+4+won*2,0,100);if(!m.dpart)m.dpart=pt.id;
 const champ=won===R0,idx=champ?0:Math.min(L-1,R0-won);const v=ev.tier==='OLY'?0:(won===0?0:Math.round((t.pts[idx]||0)*(idx>=3?.9:1))),pr=Math.round(((t.prize||[])[idx]||0)*.16);
 if(v>0)(m.ptsDbl=m.ptsDbl||[]).push([S.w,v]);m.money+=pr;m.st.prize+=pr;
 const lbl=champ?'🏆 Campeões':['1ª rodada','2ª rodada','Quartas','Semifinal','Final'][won]||'Final';
 if(T)T.log.push({c:champ?'win':'mut',t:`👥 Duplas com ${flag(pt.c)} ${pt.n}: ${lbl}${v?' · +'+v+' pts':''}${pr?' · '+money(pr):''}`});
 if(champ){(m.st.dblT=m.st.dblT||[]).push({y:year(),n:ev.name,p:pt.n,tier:ev.tier});news(`👥 Título de duplas em ${ev.name} ao lado de ${pt.n}!`);m.fol=Math.round(m.fol*1.01);if(ev.tier==='OLY')medal('ouro (duplas)',ev)}
 {const pp=[];if(v)pp.push('+'+v+' pts no ranking de duplas');if(pr)pp.push(money(pr));if(pp.length)D.last+=' '+pp.join(' · ')+'.'}save()}
function v5DbSim(){const D=V5DB;v5DbRoundEnd(R()<v5DbP())}
function v5DbSimAll(){const D=V5DB;while(V5DB&&!D.out){const w=R()<v5DbP();const m=S.me;m.energy=clamp(m.energy-3,0,100);D.oppR=null;if(w){D.won++;D.k++;if(D.k>=D.R0){D.out=1;D.champ=1;D.last='Vocês foram campeões de duplas!'}else D.opp=v5DbOpp(D.field,D.k)}else{D.out=1;D.last=`Vocês caíram na ${(V5DRN[D.k]||'rodada').toLowerCase()}.`}}v5DbFinish();D.stage='res';v5DbShow()}
function v5DbNext(){V5DB.stage='intro';v5DbShow()}
function v5DbClose(){V5DB=null;V5DBA=null;v5DbShow();render()}
// se a semana avançar com as duplas abertas, termina simulando
{const _ew=endWeek;endWeek=function(){if(V5DB){if(!V5DB.out)v5DbSimAll();V5DB=null;V5DBA=null;v5DbShow()}return _ew()}}
// ---------- mini quadra de duplas ----------
function v5DbPlay(){const D=V5DB;D.stage='play';D.pn=0;D.pw=0;D.pl=0;v5DbShow();v5DbPoint()}
function v5DbPoint(){const D=V5DB;if(!D)return;V5DBA={phase:'wait',t0:performance.now(),ball:null,me:{x:.45},pa:{x:-.45},o1:{x:-.45},o2:{x:.45},sw:{},txt:'Prepare-se',sub:'',end:null,shots:0};setTimeout(()=>v5DbOppHit(true),650)}
function v5DbBall(x0,y0,x1,y1,T,toUs){return{x0,y0,x1,y1,T,t0:performance.now(),toMe:toUs,yb:toUs?.22+Math.random()*.12:.75+Math.random()*.1}}
function v5DbOppHit(first){const A=V5DBA,D=V5DB;if(!A||A.end)return;const who=Math.random()<.5?'o1':'o2';A.sw[who]=performance.now();const toMe=Math.random()<.55,tx=toMe?.2+Math.random()*.6:-(.2+Math.random()*.6);
 A.ball=v5DbBall(A[who].x,1.0,tx,-.03,first?620:560+Math.random()*180,true);A.phase='in';A.mine=toMe;A.txt=toMe?'Sua bola!':'Bola do parceiro';A.sub=''; if(!toMe)setTimeout(()=>v5DbPartner(),A.ball.T-40)}
function v5DbPartner(){const A=V5DBA,D=V5DB;if(!A||A.end)return;const pt=IDX.get(D.pt),ps=clamp(.62+(pt.r-D.oppR)/90,.35,.85);A.sw.pa=performance.now();if(Math.random()>ps)return v5DbEnd(false,pick(['Erro do parceiro','O parceiro mandou na rede','Bola do parceiro saiu']));
 if(Math.random()<.18)return v5DbEnd(true,pick(['Voleio vencedor do parceiro!','Winner do parceiro!']));v5DbOut(1,(Math.random()-.5)*1.2)}
function v5DbOut(Q,tx){const A=V5DBA,D=V5DB;A.ball=v5DbBall(A.mine?A.me.x:A.pa.x,-.02,tx,1.0,560,false);A.phase='out';const pRet=clamp(.6-(Q-1)*.4+(D.oppR-D.team)/120,.2,.85);setTimeout(()=>{if(V5DBA!==A||A.end)return;if(Math.random()<pRet)v5DbOppHit(false);else v5DbEnd(true,Q>1.15?pick(['Winner!','Bola vencedora entre os dois!']):pick(['Erro dos adversários','Eles mandaram na rede']))},A.ball.T)}
function v5DbUp(e){const A=V5DBA;if(!A||!A.pd)return;const dx=e.clientX-A.pd.x,dy=e.clientY-A.pd.y,len=Math.hypot(dx,dy);A.pd=null;if(A.phase!=='in'||!A.mine||!A.ball)return;
 const dir=len<18?0:Math.abs(dx)>Math.abs(dy)*.45?(dx<0?-1:1):0,kind=len<18?'neu':dy<-60&&len>110?'atk':dy>30?'def':'neu';const now=performance.now(),b=A.ball,dt=now-(b.t0+b.T),q=v5Q(dt);A.sw.me=now;
 if(!q)return v5DbEnd(false,dt<0?'Bateu cedo demais':'Chegou atrasado');let Q=q[1]*(1+((S.me.attrs.vo||60)-60)/150);A.flash={t:q[0],t0:now,c:q[2]==='p'?'#D9F24A':q[2]==='g'?'#3DDC84':q[2]==='o'?'#F2C14E':'#FF6B5B'};if(q[2]==='p')v5Vib(12);
 const pErr=clamp((kind==='atk'?.2:kind==='def'?.06:.1)/Q,0,.6);if(Math.random()<pErr)return v5DbEnd(false,kind==='atk'?'Arriscou e errou':'Erro não forçado');
 if(kind==='atk')Q*=1.22;else if(kind==='def')Q*=.8;A.txt=q[0];v5DbOut(Q,dir?dir*.75:(Math.random()-.5)*.4)}
function v5DbEnd(aw,txt){const A=V5DBA,D=V5DB;if(!A||A.end)return;A.end={aw,t0:performance.now()};A.txt=txt;A.phase='end';v5Vib(aw?25:18);try{aw?sCrowd(1.2):sGroan()}catch(e){}
 setTimeout(()=>{if(!V5DB)return;D.pn++;aw?D.pw++:D.pl++;if(D.pn>=5){const p=clamp(v5DbP()+(D.pw-D.pl)*.09,.05,.95);V5DBA=null;v5DbRoundEnd(R()<p)}else{v5DbShow();v5DbPoint()}},900)}
function v5DbFrame(now){const A=V5DBA,D=V5DB,cv=document.getElementById('v5dbc');if(!A||!D||!cv)return;const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 const ev=D.ev,u=W/360,top=Math.round(H*.33),bot=H-40,hw=y=>W*.43-W*.19*y,P=(x,y,z=0)=>{const yy=bot-(bot-top)*y;return[W/2+x*hw(y),yy-z*(34-15*y)*(H/430)]},sAt=y=>Math.max(.66,hw(y)/hw(0))*1.05*Math.max(.8,Math.min(1.25,H/430));
 const key=['d',W,H,dpr,ev.name,ev.surf,ev.tier].join('|');if(!V5BG||V5BG.key!==key){V5BG=v5BgBuild(W,H,dpr,ev,P,top);V5BG.key=key}g.drawImage(V5BG.img[A.end&&A.end.aw&&Math.floor(now/150)%2===0?1:0],0,0,W,H);
 const b=A.ball;if(b&&A.phase==='in'){const t=b.x1;if(A.mine)A.me.x+=clamp(t-A.me.x,-.035,.035);else A.pa.x+=clamp(t-A.pa.x,-.035,.035)}else{A.me.x+=(.45-A.me.x)*.05;A.pa.x+=(-.45-A.pa.x)*.05}if(b&&A.phase==='out'){for(const k of['o1','o2']){A[k].x+=clamp(b.x1-A[k].x,-.02,.02)*(Math.abs(b.x1-A[k].x)<.6?1:.2)}}
 const pose=k=>{const t=now-(A.sw[k]||-1e9);return t<380?{mode:'swing',side:'fh',k:t/380}:{mode:'ready'}};
 const av=id=>{try{const p=IDX.get(id);return p.av||aiAv(p)}catch(e){return{sk:2,h:'curto',hc:0,sh:4,a:'nada',g:'m'}}};
 const[o1,o2]=D.opp;for(const[k,id,y]of[['o1',o1,1.04],['o2',o2,.82]]){const[px,py]=P(A[k].x,y);v5DrawPl(g,px,py,sAt(y)*u,av(id),true,pose(k),now)}
 let bp=null;if(b&&!(A.end&&now-A.end.t0>500))bp=v5BallPos(b,now);const drawB=()=>{if(!bp)return;const[sx,sy]=P(bp.x,bp.y,0),[hx,hy]=P(bp.x,bp.y,bp.z),r=(6-1.8*bp.y)*u;g.fillStyle='#00000055';g.beginPath();g.ellipse(sx,sy,r,r*.4,0,0,6.3);g.fill();g.fillStyle='#E8FF4A';g.strokeStyle=V5INK;g.lineWidth=1.6;g.beginPath();g.arc(hx,hy,r,0,6.3);g.fill();g.stroke()};
 if(bp&&bp.y>.5)drawB();g.drawImage(V5BG.img[2],0,0,W,H);if(bp&&bp.y<=.5)drawB();
 if(b&&A.phase==='in'&&A.mine){const bu=(now-b.t0)/b.T,[px,py]=P(b.x1,-.04),ok=Math.abs(1-bu)*b.T<=115,rz=17*u,r=rz*(1+Math.max(0,1-bu)*2.6);g.strokeStyle=ok?'#D9F24A':'#F3ECDC';g.lineWidth=ok?4:2.4;g.beginPath();g.ellipse(px,py,r,r*.42,0,0,6.3);g.stroke();if(bu>1.35)v5DbEnd(false,'Deixou a bola passar')}
 {const[px,py]=P(A.pa.x,.2);v5DrawPl(g,px,py,sAt(.2)*u,av(D.pt),false,pose('pa'),now)}
 {const[px,py]=P(A.me.x,-.06);v5DrawPl(g,px,py,sAt(-.06)*u,myAv(),false,pose('me'),now,S.me.rkc)}
 g.font=`900 ${Math.round(13*u)}px Archivo, sans-serif`;const tx=(A.txt||'').toUpperCase(),tw=g.measureText(tx).width;g.fillStyle=V5PAP;g.strokeStyle=V5INK;g.lineWidth=2.2;g.beginPath();g.roundRect(W/2-tw/2-9*u,6*u,tw+18*u,24*u,4);g.fill();g.stroke();g.fillStyle=V5INK;g.textAlign='center';g.textBaseline='middle';g.fillText(tx,W/2,18*u+1);g.textBaseline='alphabetic';
 if(A.end){const aw=A.end.aw,rw=W*.62;g.save();g.translate(W/2,H*.45);g.rotate(-.03);g.fillStyle=aw?'#3DDC84':'#FF6B5B';g.strokeStyle=V5INK;g.lineWidth=2.4;g.beginPath();g.roundRect(-rw/2,-15*u,rw,30*u,5);g.fill();g.stroke();g.fillStyle=V5INK;g.font=`900 ${Math.round(15*u)}px Archivo, sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(aw?'PONTO DE VOCÊS':'PONTO DELES',0,1);g.restore()}
 requestAnimationFrame(v5DbFrame)}
{const _m=inMenuView;inMenuView=function(){let s=_m();try{s=s.replace(/(<button class="opt" onclick="v5NpToggle\(\)">)/,`<button class="opt" onclick="OPTS.dblPlay=OPTS.dblPlay===false;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}render()">${OPTS.dblPlay!==false?'✅':'⬜'} Jogar as duplas<small>Quando você joga duplas num torneio, escolhe jogar os pontos decisivos de cada partida em tempo real.</small></button>$1`)}catch(e){}return s}}
