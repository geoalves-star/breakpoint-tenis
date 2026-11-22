// =============== v6.0: jogabilidade em quadra — tempo do golpe, tipos de golpe, saque no corpo, padrões do adversário e cansaço ===============
// ---------- cansaço dentro da partida: a janela do tempo certo diminui ----------
function v5FatK(){try{const I=IM;if(!I||!I.E)return 1;const E=I.E,G=E.sets.reduce((s,x)=>s+x[0]+x[1],0)+(E.ga||0)+(E.gb||0);const fi=S.me.attrs.fi||60,en=S.me.energy??80;
 const base=clamp((G-14)/40,0,1)*.24*clamp(1.25-(fi-50)/60,.35,1.25)+Math.max(0,(45-en))*.003;return clamp(1-base,.72,1)}catch(e){return 1}}
{const _q=v5Q;v5Q=function(dt){return _q(dt/v5FatK())}}
// ---------- registro do tempo de cada golpe ----------
function v5TimRec(){const I=IM;if(!I)return null;I.tim=I.tim||{n:0,p:0,g:0,o:0,b:0,miss:0,far:0,sum:0,cnt:0,early:0,late:0,shots:{top:0,flat:0,slice:0,drop:0,lob:0},line:[0,0]};return I.tim}
{const _h=v5MeHit;v5MeHit=function(dir,kind){const A=V5A,now=performance.now();let rec=null;
 try{if(A&&A.phase==='incoming'&&A.ball){const b=A.ball,reach=Math.abs(A.me.x-b.x1),late=Math.max(0,(reach-v5Reach())*900);rec={dt:now-(b.t0+b.T),late,t0:now,fk:v5FatK()};
  // tipo de golpe e risco na linha
  A._line=!!(dir&&A._dx>=150&&kind!=='drop'&&kind!=='lob');A._kind=kind}}catch(e){}
 _h(dir,kind);
 try{if(rec&&A){const T=v5TimRec();if(!T)return;const fl=A.flash&&A.flash.t0>=now-5?A.flash.t:null;rec.q=fl;A.tm=rec;T.n++;
  if(rec.late>40&&(!fl||fl==='CEDO'||fl==='ATRASADO'))T.far++;
  if(!fl||(A.end&&A.end.t0>=now-5&&/cedo demais|atrasado/i.test(A.end.txt||'')))T.miss++;else if(fl==='PERFEITO')T.p++;else if(fl==='BOM')T.g++;else if(fl==='OK')T.o++;else T.b++;
  if(rec.late<40){T.sum+=rec.dt;T.cnt++;if(rec.dt<-60)T.early++;else if(rec.dt>60)T.late++}
  if(A.phase==='outgoing'&&A.ball&&!A.ball.toMe){const nm=kind==='atk'?'flat':kind==='def'?'slice':kind==='drop'?'drop':kind==='lob'?'lob':'top';T.shots[nm]++;
   const lbl={top:'Top spin',flat:'Chapado',slice:'Slice',drop:'Deixadinha',lob:'Lob'}[nm];
   if(nm==='slice'){A._slice=1;A.ball.T*=1.06;A.ball.zm=Math.min(A.ball.zm||1,.7)}else A._slice=0;
   if(A._line){T.line[0]++;A.ball.x1=Math.sign(A.ball.x1||dir)*.97;const risk=.13*(kind==='atk'?1.25:1)/Math.max(.7,A.qPrev||1);if(Math.random()<risk){A._lineOut=1}else{A.qPrev*=1.2;T.line[1]++}}
   if(nm==='top'||nm==='flat'||nm==='slice')A.txt=`${fl?fl+' · ':''}${lbl}${A._line?' na linha':''}`}}}catch(e){console.error(e)}}}
// bola na linha que saiu: o ponto termina quando ela quica
{const _o=v5OppHit;v5OppHit=function(){const A=V5A;if(A&&A._lineOut&&!A.end){A._lineOut=0;return v5End(false,'ue',pick(['Saiu por pouco! Foi buscar a linha','Na linha... fora por centímetros','Arriscou a linha e errou']))}
 if(A&&A._lineOut)A._lineOut=0;
 const slice=A&&A._slice,body=A&&A._body;
 _o();
 try{if(V5A!==A||!A||A.end||A.phase!=='incoming'||!A.ball||!A.ball.toMe)return;const b=A.ball;
  // slice: bola baixa, a resposta dele vem mais lenta e menos perigosa
  if(slice){b.T*=1.08;if(A.oppWin&&Math.random()<.35){A.oppWin=false;A.txt='Sua vez'}A._slice=0}
  // saque no corpo: devolução apertada
  if(body){b.T*=1.1;if(A.oppWin&&Math.random()<.5){A.oppWin=false;A.txt='Devolução apertada dele'}A._body=0}
  v5PatApply(A,b);
  // cansaço: bolas chegam um pouco mais rápido no fim
  const fk=v5FatK();if(fk<.97){b.T*=(.94+.06*fk)}}catch(e){console.error(e)}}}
// ---------- saque no corpo (deslize para baixo) ----------
{const _pu=v5PUp;v5PUp=function(e){const A=V5A;try{if(A&&V5PD){const dx=e.clientX-V5PD.x,dy=e.clientY-V5PD.y;A._dx=Math.abs(dx);
  if(A.phase==='srvMe'){if(dy>30&&Math.abs(dy)>Math.abs(dx)){A.aim=0;A.aimBody=1;A.txt='Mira: no corpo';A.sub='Menos aces, mas a devolução sai apertada';V5PD=null;return}if(Math.hypot(dx,dy)>=18)A.aimBody=0}}}catch(err){}return _pu(e)}}
document.addEventListener('keydown',e=>{const A=V5A;if(!A||!IM)return;try{if(A.phase==='srvMe'){if(e.key==='ArrowDown'){A.aim=0;A.aimBody=1;A.txt='Mira: no corpo';A.sub='Menos aces, mas a devolução sai apertada'}else if(/Arrow(Left|Right|Up)/.test(e.key))A.aimBody=0}if(A.phase==='incoming')A._dx=e.shiftKey?200:0}catch(err){}});
{const _s=v5MeServe;v5MeServe=function(){const A=V5A,body=A&&A.aimBody;_s();try{if(A&&body&&A.ball&&!A.ball.toMe&&!A.end){A.ball.x1=clamp(A.op.x,-.2,.2);A._body=1;A.qPrev*=1.08;A.sub=(A.sub?A.sub.replace(/^Mira[^·]*· ?/,'')+' · ':'')+'no corpo'}}catch(e){}}}
// ---------- padrões dos adversários ----------
const V5PAT={fraco:{n:'joga no seu lado mais fraco',tip:'Ele procura o seu lado mais fraco. Quando souber disso, você sai antes para essa bola.'},
 alterna:{n:'alterna os lados para fazer você correr',tip:'Ele manda uma bola em cada lado. Depois de uma bola na direita, espere a próxima na esquerda.'},
 paralela:{n:'responde seu ataque na paralela',tip:'Quando você ataca, ele devolve na paralela, longe de onde você está.'},
 lob:{n:'usa o lob quando você sobe à rede',tip:'Na rede, espere o lob: deslize para cima para o smash.'},
 cruzada:{n:'prefere a diagonal nas trocas longas',tip:'Nas trocas longas ele joga cruzado. Cubra a diagonal.'}};
function v5PatOf(opp){const p=IDX.get(opp);if(!p)return'cruzada';const L=p.b>=2?['paralela','fraco','alterna']:p.b<=-1?['lob','cruzada','alterna']:['alterna','fraco','cruzada','lob'];return L[Math.abs(Math.round(p.id*7919+(p.r||0)))%L.length]}
function v5PatApply(A,b){const I=IM;if(!I)return;I.pat=I.pat||v5PatOf(I.opp);const pat=I.pat;let hit=false;const side=s=>clamp(s*(.55+Math.random()*.35),-.95,.95);
 if(b.lobOp)return;
 if(pat==='fraco'&&Math.random()<.7){b.x1=side(A.weak);hit=true}
 else if(pat==='alterna'&&Math.random()<.75){I._alt=-(I._alt||1);b.x1=side(I._alt);hit=true}
 else if(pat==='paralela'&&A.lastAgr&&Math.random()<.75){b.x1=side(A.me.x>=0?-1:1);hit=true}
 else if(pat==='cruzada'&&A.shots>=3&&Math.random()<.7){b.x1=side(A.op.x>=0?-1:1);hit=true}
 else if(pat==='lob'&&A.meNet&&Math.random()<.6){b.zm=2.1;b.T=Math.max(b.T,1000);b.lobOp=1;b.y1=Math.min(b.y1,A.me.y+.02);A.txt='Lob dele! Deslize para cima: smash';hit=true}
 if(!hit)return;I.patN=(I.patN||0)+1;
 if(!I.patKnown&&I.patN>=6){I.patKnown=1;I.feed.unshift(`🔎 Você leu o jogo: ${G('ele','ela')} ${V5PAT[pat].n}.`);A.sub='Você percebeu o padrão dele'}
 // antecipação: quem conhece o padrão sai antes para a bola
 if(I.patKnown&&!b.lobOp){A.me.x+=(b.x1-A.me.x)*.35;if(Math.random()<.4)A.sub='Antecipou: você já sabia para onde ia'}}
{const _ec=enterCourt;enterCourt=function(){_ec.apply(this,arguments);try{const I=IM;if(!I)return;I.pat=v5PatOf(I.opp);const c=myCoach(),ana=(STF().ana||0)>=1;
 if(ana||(c&&c.q>=3)){I.patKnown=1;I.feed.unshift(`📊 ${ana?'Seu analista':'Seu treinador'}: ${G('ele','ela')} ${V5PAT[I.pat].n}. ${V5PAT[I.pat].tip}`)}}catch(e){}}}
// dica antes do jogo na tela da partida
function v5PatHint(opp){const pat=v5PatOf(opp),c=myCoach(),ana=(STF().ana||0)>=1;if(!(ana||(c&&c.q>=3)))return `<div class="xs mut" style="margin-top:6px">🔎 Todo adversário tem um padrão. Repare para onde ele joga: depois de algumas bolas você percebe e passa a antecipar. Treinador de 3+ estrelas ou analista contam antes.</div>`;
 return `<div class="small" style="margin-top:6px">📊 <b>Padrão dele:</b> ${V5PAT[pat].n}. <span class="mut">${V5PAT[pat].tip}</span></div>`}
// ---------- desenho: faixa do tempo do golpe e aviso de cansaço ----------
{const _f=v5ArcFrame;v5ArcFrame=function(now){_f(now);try{const A=V5A,cv=document.getElementById('v5arc');if(!cv||!IM)return;const g=cv.getContext('2d'),dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight,u=W/360;g.save();g.setTransform(dpr,0,0,dpr,0,0);
 const tm=A&&A.tm;if(tm&&now-tm.t0<1300){const t=now-tm.t0,al=t<1000?1:1-(t-1000)/300,bw=Math.min(230*u,W*.66),bh=9*u,x0=W/2-bw/2,y0=62*u,fk=tm.fk||1,R=300;
  g.globalAlpha=al;g.fillStyle='#140f0bcc';g.beginPath();g.roundRect(x0-10*u,y0-17*u,bw+20*u,bh+30*u,8);g.fill();
  const X=v=>x0+bw/2+clamp(v/R,-1,1)*bw/2;const zone=(a,c)=>{g.fillStyle=c;g.fillRect(X(-a*fk),y0,X(a*fk)-X(-a*fk),bh)};zone(270,'#FF6B5B88');zone(185,'#F2C14E');zone(115,'#3DDC84');zone(55,'#D9F24A');
  g.strokeStyle='#000';g.lineWidth=1.2;g.strokeRect(x0,y0,bw,bh);const mx=X(tm.dt+(tm.late||0));g.fillStyle='#fff';g.strokeStyle='#000';g.lineWidth=1.5;g.beginPath();g.moveTo(mx,y0-2);g.lineTo(mx-5*u,y0-9*u);g.lineTo(mx+5*u,y0-9*u);g.closePath();g.fill();g.stroke();g.fillRect(mx-1,y0,2,bh);
  g.font=`800 ${Math.round(8.5*u)}px Inter, Arial, sans-serif`;g.fillStyle='#fff';g.textAlign='left';g.fillText('CEDO',x0,y0+bh+11*u);g.textAlign='right';g.fillText('ATRASADO',x0+bw,y0+bh+11*u);g.textAlign='center';
  const d=tm.dt+(tm.late||0),lab=tm.late>40?'LONGE DA BOLA':Math.abs(d)<=55*fk?'NO TEMPO':d<0?`${Math.round(-d)} ms CEDO`:`${Math.round(d)} ms ATRASADO`;g.fillStyle=Math.abs(d)<=115*fk?'#D9F24A':'#FFB4A8';g.fillText(lab,W/2,y0+bh+11*u)}
 const fk=v5FatK();if(fk<.93&&A&&A.phase!=='end'){g.globalAlpha=1;g.font=`800 ${Math.round(8.5*u)}px Inter, Arial, sans-serif`;g.fillStyle='#FFB4A8';g.textAlign='left';g.fillText(`CANSAÇO · janela ${Math.round((1-fk)*100)}% menor`,8*u,H-8*u)}
 g.restore()}catch(e){}}}
// ---------- resultado: como foi o seu tempo ----------
{const _er=eResult;eResult=function(E){const r=_er(E);try{if(IM&&IM.E===E){if(IM.tim)r.tim=IM.tim;if(IM.pat)r.pat={k:IM.pat,known:!!IM.patKnown}}}catch(e){}return r}}
function v5TimCard(T,pat){if(!T||T.n<4)return'';const ok=T.p+T.g+T.o,pc=x=>Math.round(x/T.n*100),avg=T.cnt?Math.round(T.sum/T.cnt):0;
 const tip=T.far>=Math.max(3,T.n*.15)?`Você chegou longe da bola ${T.far} vezes. Físico melhor ajuda a alcançar, e conhecer o padrão do adversário faz você sair antes.`:avg<-45?`Você bateu em média ${-avg} ms antes da hora. Espere a bola chegar mais perto.`:avg>45?`Você bateu em média ${avg} ms atrasado. Comece o movimento um pouco antes.`:'Seu tempo esteve bom. Para ganhar mais pontos, varie o golpe e arrisque a linha quando estiver bem posicionado.';
 const sh=T.shots,tot=Object.values(sh).reduce((a,b)=>a+b,0)||1,top=Object.entries(sh).sort((a,b)=>b[1]-a[1])[0];
 const bar=(l,v,c)=>`<div class="v5tmr"><span>${l}</span><i style="--p:${pc(v)}%;--c:${c}"></i><b>${pc(v)}%</b></div>`;
 return `<div class="card v5tmc"><div class="mk">Seu tempo nos golpes</div>${bar('Perfeito',T.p,'#D9F24A')}${bar('Bom',T.g,'#3DDC84')}${bar('OK',T.o,'#F2C14E')}${bar('Fora do tempo',T.b+T.miss,'#FF6B5B')}
 <p class="small" style="margin:8px 0 0">${tip}</p><p class="xs mut" style="margin:6px 0 0">Golpe que você mais usou: ${({top:'top spin',flat:'chapado',slice:'slice',drop:'deixadinha',lob:'lob'})[top[0]]} (${Math.round(top[1]/tot*100)}%).${T.line[0]?` Na linha: ${T.line[1]} de ${T.line[0]} entraram.`:''}${pat?` Padrão do adversário: ${G('ele','ela')} ${V5PAT[pat.k].n}${pat.known?'':' (você não chegou a perceber)'}.`:''}</p></div>`}
{const _vr=v5Res;v5Res=function(){let s=_vr();try{if(LIVE&&LIVE.res&&LIVE.res.tim){const c=v5TimCard(LIVE.res.tim,LIVE.res.pat);const i=s.indexOf('<button id="v5shb"');s=i>=0?s.slice(0,i)+c+s.slice(i):s+c}}catch(e){}return s}}
{const _m=v5Match;v5Match=function(){let s=_m();try{if(V5PREP){const o=curOpp();if(o!=null){const h=`<div class="card"><div class="mk">Leitura do adversário</div>${v5PatHint(o)}</div>`;const i=s.indexOf('<div class="v5gofix">');if(i>=0)s=s.slice(0,i)+h+s.slice(i)}}}catch(e){}return s}}
