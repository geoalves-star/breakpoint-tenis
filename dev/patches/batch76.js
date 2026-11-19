// =============== v5.7: trilha sonora original + sons da partida em tempo real ===============
// ---------- instrumentos (sintetizados no próprio jogo) ----------
const v5Hz=m=>440*Math.pow(2,(m-69)/12);
let V5MB=null,V5MC=null;
function v5MBus(c){if(!V5MB||V5MB.context!==c){const cp=c.createDynamicsCompressor();cp.threshold.value=-18;cp.ratio.value=4;cp.connect(c.destination);V5MB=c.createGain();V5MB.gain.value=0;V5MB.connect(cp);V5MC=cp}return V5MB}
function v5Env(c,g,t,a,d,v,rel){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(v,.0002),t+a);g.gain.exponentialRampToValueAtTime(Math.max(v*.6,.0002),t+a+d*.4);g.gain.exponentialRampToValueAtTime(.0001,t+a+d+(rel||.08))}
const V5I={
 bass(c,o,t,m,d,v){const s=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();s.type='triangle';s.frequency.value=v5Hz(m);f.type='lowpass';f.frequency.value=700;v5Env(c,g,t,.01,d,.5*v);s.connect(f).connect(g).connect(o);s.start(t);s.stop(t+d+.2)},
 pad(c,o,t,ms,d,v){for(const m of ms)for(const dt of[-7,7]){const s=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();s.type='sawtooth';s.frequency.value=v5Hz(m);s.detune.value=dt;f.type='lowpass';f.frequency.value=1100;v5Env(c,g,t,.35,d,.045*v,.4);s.connect(f).connect(g).connect(o);s.start(t);s.stop(t+d+.6)}},
 lead(c,o,t,m,d,v){const s=c.createOscillator(),l=c.createOscillator(),lg=c.createGain(),f=c.createBiquadFilter(),g=c.createGain();s.type='square';s.frequency.value=v5Hz(m);l.frequency.value=5.5;lg.gain.value=4;l.connect(lg).connect(s.detune);f.type='lowpass';f.frequency.value=2400;v5Env(c,g,t,.02,d,.11*v,.12);s.connect(f).connect(g).connect(o);s.start(t);l.start(t);s.stop(t+d+.3);l.stop(t+d+.3)},
 pluck(c,o,t,m,d,v){const s=c.createOscillator(),g=c.createGain();s.type='triangle';s.frequency.value=v5Hz(m);g.gain.setValueAtTime(.22*v,t);g.gain.exponentialRampToValueAtTime(.0001,t+Math.min(.9,d+.4));s.connect(g).connect(o);s.start(t);s.stop(t+1)},
 acc(c,o,t,ms,d,v){const tr=c.createOscillator(),tg=c.createGain();tr.frequency.value=6;tg.gain.value=.25;for(const m of ms)for(const dt of[-9,9]){const s=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain(),am=c.createGain();s.type='square';s.frequency.value=v5Hz(m);s.detune.value=dt;f.type='bandpass';f.frequency.value=1300;f.Q.value=.7;v5Env(c,g,t,.03,d,.05*v,.08);tr.connect(tg).connect(am.gain);s.connect(f).connect(am).connect(g).connect(o);s.start(t);s.stop(t+d+.2)}tr.start(t);tr.stop(t+d+.2)},
 brass(c,o,t,ms,d,v){for(const m of ms){const s=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();s.type='sawtooth';s.frequency.value=v5Hz(m);f.type='lowpass';f.frequency.setValueAtTime(400,t);f.frequency.exponentialRampToValueAtTime(2600,t+.08);f.frequency.exponentialRampToValueAtTime(1200,t+d);v5Env(c,g,t,.04,d,.07*v,.2);s.connect(f).connect(g).connect(o);s.start(t);s.stop(t+d+.4)}},
 kick(c,o,t,v){const s=c.createOscillator(),g=c.createGain();s.frequency.setValueAtTime(140,t);s.frequency.exponentialRampToValueAtTime(42,t+.12);g.gain.setValueAtTime(.55*v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.25);s.connect(g).connect(o);s.start(t);s.stop(t+.3)},
 noise(c,o,t,v,ft,fq,dur,q){const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=noiseBuf(c,dur+.05);f.type=ft;f.frequency.value=fq;f.Q.value=q||.8;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(f).connect(g).connect(o);s.start(t)},
 snare(c,o,t,v){V5I.noise(c,o,t,.22*v,'bandpass',1800,.16)},hat(c,o,t,v){V5I.noise(c,o,t,.07*v,'highpass',7000,.05)},clap(c,o,t,v){for(const k of[0,.012,.024])V5I.noise(c,o,t+k,.12*v,'bandpass',1400,.09,1.5)},
 tok(c,o,t,v){const s=c.createOscillator(),g=c.createGain();s.type='sine';s.frequency.setValueAtTime(980,t);s.frequency.exponentialRampToValueAtTime(520,t+.04);g.gain.setValueAtTime(.18*v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.07);s.connect(g).connect(o);s.start(t);s.stop(t+.1);V5I.noise(c,o,t,.06*v,'bandpass',2600,.03)},
 timp(c,o,t,m,v){const s=c.createOscillator(),g=c.createGain();s.frequency.setValueAtTime(v5Hz(m)*1.04,t);s.frequency.exponentialRampToValueAtTime(v5Hz(m),t+.1);g.gain.setValueAtTime(.35*v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.9);s.connect(g).connect(o);s.start(t);s.stop(t+1)}};
const v5Ch=(r,t)=>t==='m'?[r,r+3,r+7]:t==='7'?[r,r+4,r+7,r+10]:[r,r+4,r+7];
const v5Pat=(p,i)=>p[i%p.length]!=='.';
// ---------- faixas: cada uma com o clima de um lugar do circuito ----------
const V5TRK={
 tema:{n:'Breakpoint (tema)',bpm:110,spb:16,ch:[[60,''],[67,''],[69,'m'],[65,''],[60,''],[67,''],[65,''],[67,'']],
  mel:[[0,76,2],[2,74,2],[4,72,4],[8,74,2],[10,76,2],[12,79,4],[16,79,2],[18,77,2],[20,76,4],[24,74,6],[32,72,2],[34,74,2],[36,76,4],[40,77,2],[42,76,2],[44,74,4],[48,72,2],[50,74,2],[52,76,2],[54,79,2],[56,79,8],[64,81,4],[68,79,4],[72,77,4],[76,76,4],[80,74,2],[82,76,2],[84,77,4],[88,76,8],[96,72,2],[98,74,2],[100,76,4],[104,74,2],[106,72,2],[108,71,4],[112,72,12]],
  play(c,o,b,s,t,d){const[r,ty]=this.ch[b%8];if(s===0)V5I.pad(c,o,t,v5Ch(r,ty),d*16,1);if([0,6,8,14].includes(s))V5I.bass(c,o,t,r-24,d*1.6,1);if(v5Pat('k.......k.......',s))V5I.kick(c,o,t,.9);if(v5Pat('....s.......s...',s))V5I.snare(c,o,t,.8);if(s%2===0)V5I.hat(c,o,t,.8);if(v5Pat('......t.......t.',s))V5I.tok(c,o,t,.9)}},
 paris:{n:'Saibro em Paris',bpm:168,spb:6,ch:[[57,'m'],[62,'m'],[64,'7'],[57,'m'],[53,''],[62,'m'],[64,'7'],[57,'m']],
  mel:[[0,76,2],[2,77,1],[3,76,1],[4,74,2],[6,72,3],[9,71,3],[12,74,2],[14,72,1],[15,71,1],[16,69,4],[20,68,2],[22,71,2],[24,76,2],[26,77,1],[27,76,1],[28,74,2],[30,77,3],[33,76,3],[36,74,2],[38,72,2],[40,71,2],[42,69,6]],
  play(c,o,b,s,t,d){const[r,ty]=this.ch[b%8];if(s===0)V5I.bass(c,o,t,r-24,d*1.8,1.1);if(s===2||s===4)V5I.acc(c,o,t,v5Ch(r,ty),d*1.4,1);if(s%2===0)V5I.hat(c,o,t,.5)}},
 londres:{n:'Grama em Londres',bpm:88,spb:16,ch:[[62,''],[69,''],[71,'m'],[67,''],[62,''],[69,''],[67,''],[69,'']],
  mel:[[0,74,4],[4,78,4],[8,81,8],[16,79,4],[20,78,4],[24,76,8],[32,74,4],[36,76,4],[40,78,4],[44,79,4],[48,81,8],[56,76,8]],
  play(c,o,b,s,t,d){const[r,ty]=this.ch[b%8],n=v5Ch(r,ty);if(s===0){V5I.pad(c,o,t,n,d*16,1.2);V5I.timp(c,o,t,r-24,.7)}if(s%2===0)V5I.pluck(c,o,t,n[(s/2)%n.length]+12,d*2,.8);if(s===0||s===8)V5I.bass(c,o,t,r-24,d*7,.8)}},
 ny:{n:'Noite em Nova York',bpm:94,spb:16,sw:.12,ch:[[64,'m'],[60,''],[67,''],[62,''],[64,'m'],[60,''],[67,''],[62,'']],
  mel:[[2,71,1],[3,74,2],[6,76,2],[10,74,1],[11,71,3],[34,71,1],[35,74,2],[38,79,2],[42,78,1],[43,76,3]],
  play(c,o,b,s,t,d){const[r,ty]=this.ch[b%8];if(v5Pat('k......k..k.....',s))V5I.kick(c,o,t,1);if(v5Pat('....s.......s...',s))V5I.clap(c,o,t,1);if(s%2===0)V5I.hat(c,o,t,s%4?.6:1);if(v5Pat('b..b..b...b.b...',s))V5I.bass(c,o,t,r-24+(s===10?7:0),d*1.5,1.1);if(s===0)V5I.pad(c,o,t,v5Ch(r,ty),d*16,.7);if(s===15)V5I.tok(c,o,t,.8)}},
 melb:{n:'Verão em Melbourne',bpm:122,spb:16,ch:[[65,''],[60,''],[62,'m'],[58,''],[65,''],[60,''],[62,'m'],[58,'']],
  mel:[[0,77,2],[2,81,2],[4,84,2],[6,81,2],[8,79,4],[12,77,4],[16,76,2],[18,79,2],[20,84,2],[22,79,2],[24,77,8]],
  play(c,o,b,s,t,d){const[r,ty]=this.ch[b%8],n=v5Ch(r,ty);if(s%4===0)V5I.kick(c,o,t,.9);if(s===4||s===12)V5I.clap(c,o,t,.8);if(s%2===1)V5I.hat(c,o,t,.7);if(s%2===0)V5I.bass(c,o,t,r-24+(s%4?12:0),d*.9,.9);if(s%2===0&&b%2===1)V5I.pluck(c,o,t,n[(s/2)%n.length]+12,d,.6);if(s===0)V5I.pad(c,o,t,n,d*16,.6)}}};
// ---------- tocador ----------
let V5MP={tr:null,next:0,step:0,bar:0,timer:null,want:null,lvl:1,since:0};
const v5MusOn=()=>SND&&OPTS.mus!==false&&!QUIET&&!SIMALL;
function v5MusTick(){const c=ACX;if(!c||!V5MP.tr||c.state!=='running')return;const T=V5TRK[V5MP.tr],d=60/T.bpm/(T.spb===6?2:4),o=v5MBus(c);
 if(V5MP.next<c.currentTime-.5)V5MP.next=c.currentTime+.05;let guard=0;while(V5MP.next<c.currentTime+.25&&guard++<64){const s=V5MP.step,b=V5MP.bar,t=V5MP.next+(T.sw&&s%2?d*T.sw:0);try{T.play(c,o,b,s,t,d);const gi=(b%Math.max(1,Math.ceil(((T.mel[T.mel.length-1]||[0])[0]+1)/T.spb)))*T.spb+s;for(const[ms,m,len]of T.mel)if(ms===gi)V5I.lead(c,o,t,m,d*len*.95,1)}catch(e){}
  V5MP.step++;if(V5MP.step>=T.spb){V5MP.step=0;V5MP.bar++}V5MP.next+=d}}
function v5MusSet(tr,lvl){const c=v5MusOn()?ax():null;if(!c){if(V5MB)try{V5MB.gain.setTargetAtTime(0,(ACX||{}).currentTime||0,.3)}catch(e){}V5MP.tr=null;return}
 const bus=v5MBus(c),vol=(OPTS.mvol??.35)*lvl;
 if(V5MP.tr!==tr){bus.gain.cancelScheduledValues(c.currentTime);bus.gain.setTargetAtTime(0,c.currentTime,.25);const go=()=>{V5MP.tr=tr;V5MP.step=0;V5MP.bar=0;V5MP.next=c.currentTime+.08;bus.gain.cancelScheduledValues(c.currentTime);bus.gain.setTargetAtTime(vol,c.currentTime,.6)};if(V5MP.tr)setTimeout(go,700);else go();V5MP.lvl=lvl;V5MP.since=Date.now()}
 else if(V5MP.lvl!==lvl){bus.gain.setTargetAtTime(vol,c.currentTime,.5);V5MP.lvl=lvl}
 if(!V5MP.timer)V5MP.timer=setInterval(v5MusTick,60)}
function v5MusPick(){if(!v5MusOn())return[null,0];if(MENU||!S)return['tema',1];if(S.ended)return['londres',.9];let ev=null;try{ev=S.tour?curEv():null;if(!ev){const L=weekEvents(S.w);ev=L.find(e=>e.tier==='GS')||L[0]}}catch(e){}
 const inMatch=!!(IM||LIVE||V5DB),lv=inMatch?(OPTS.musMatch===false?0:.32):1;if(!ev)return['tema',lv];
 const n=ev.name||'',sf=ev.surf;let tr=sf==='clay'?'paris':sf==='grass'?'londres':(/Austral|Brisbane|Adelaide|Auckland/i.test(n)||S.w%52<10)?'melb':'ny';if(/Roland/i.test(n))tr='paris';if(/Wimbledon/i.test(n))tr='londres';if(/US Open/i.test(n))tr='ny';if(/Australian/i.test(n))tr='melb';return[tr,lv]}
function v5MusCheck(){try{const[tr,lv]=v5MusPick();if(!tr||!lv){if(V5MP.tr&&ACX&&V5MB){V5MB.gain.setTargetAtTime(0,ACX.currentTime,.4)}if(!tr)V5MP.tr=null;else V5MP.lvl=0;return}v5MusSet(tr,lv)}catch(e){}}
{const _r=render0;render0=function(){_r();setTimeout(v5MusCheck,0)}}
document.addEventListener('pointerdown',()=>{if(v5MusOn()){ax();v5MusCheck()}},{passive:true});
document.addEventListener('visibilitychange',()=>{try{if(!ACX)return;document.hidden?ACX.suspend():ACX.resume()}catch(e){}});
{const _t=sndToggle;sndToggle=function(){_t();if(!SND&&V5MB&&ACX)V5MB.gain.setTargetAtTime(0,ACX.currentTime,.1);setTimeout(v5MusCheck,0)}}
// ---------- sons da partida em tempo real ----------
function sShot(q,kind,far){const c=ax();if(!c)return;const t=c.currentTime,v=(far?.55:1)*(q==='PERFEITO'?1.25:q==='ATRASADO'?.7:1)*(kind==='smash'||kind==='atk'?1.2:kind==='drop'?.55:1),o=MG(c);
 V5I.noise(c,o,t,.35*v,'bandpass',q==='PERFEITO'?3200:2300,.05,1.2);const s=c.createOscillator(),g=c.createGain();s.frequency.setValueAtTime(far?260:320,t);s.frequency.exponentialRampToValueAtTime(90,t+.08);g.gain.setValueAtTime(.4*v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.12);s.connect(g).connect(o);s.start(t);s.stop(t+.15)}
function sBounce(surf,far){const c=ax();if(!c)return;const t=c.currentTime,v=far?.35:.6,o=MG(c);if(surf==='clay')V5I.noise(c,o,t,.3*v,'lowpass',650,.09);else if(surf==='grass')V5I.noise(c,o,t,.22*v,'lowpass',420,.07);else{V5I.noise(c,o,t,.28*v,'bandpass',1100,.05,1.4);const s=c.createOscillator(),g=c.createGain();s.frequency.value=180;g.gain.setValueAtTime(.15*v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.06);s.connect(g).connect(o);s.start(t);s.stop(t+.08)}}
function sNet(){const c=ax();if(!c)return;const t=c.currentTime,o=MG(c);V5I.noise(c,o,t,.35,'lowpass',380,.25);V5I.noise(c,o,t+.03,.12,'bandpass',900,.18,3)}
let V5AMB=null;function v5Amb(on,lvl){const c=ax();if(!c){return}if(!V5AMB&&on){const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=noiseBuf(c,4);s.loop=true;f.type='bandpass';f.frequency.value=520;f.Q.value=.5;g.gain.value=0;s.connect(f).connect(g).connect(MG(c));s.start();V5AMB={s,g}}if(V5AMB)V5AMB.g.gain.setTargetAtTime(on?lvl:0,c.currentTime,on?.8:.3);if(!on&&V5AMB){const A=V5AMB;setTimeout(()=>{try{if(V5AMB===A&&A.g.gain.value<.002){A.s.stop();V5AMB=null}}catch(e){}},2500)}}
const v5AmbLvl=()=>{try{const t=IM.ev.tier;return t==='GS'?.07:t==='M1000'||t==='FIN'?.055:t==='A500'||t==='A250'?.04:.022}catch(e){return .03}};
{const _h=v5MeHit;v5MeHit=function(dir,kind){const A=V5A,b0=A&&A.ball;_h(dir,kind);try{if(A&&A.ball&&A.ball!==b0&&!A.ball.toMe)sShot(A.flash&&A.flash.t,A.ball.lob?'lob':A.ball.drop?'drop':kind)}catch(e){}}}
{const _s=v5MeServe;v5MeServe=function(){const A=V5A,b0=A&&A.ball;_s();try{if(A&&(A.ball!==b0||A.end))sShot(A.flash&&A.flash.t,'atk')}catch(e){}}}
{const _o=v5OppHit;v5OppHit=function(){const A=V5A,b0=A&&A.ball;_o();try{if(A&&A.ball&&A.ball!==b0&&A.ball.toMe)sShot('OK','neu',true)}catch(e){}}}
{const _os=v5OppServe;v5OppServe=function(){const A=V5A,b0=A&&A.ball;_os();try{if(A&&A.ball&&A.ball!==b0)sShot('BOM','atk',true)}catch(e){}}}
{const _e=v5End;v5End=function(aw,kind,txt){_e(aw,kind,txt);try{if(/rede/i.test(txt||''))sNet();if(IM)v5Amb(true,v5AmbLvl())}catch(e){}}}
{const _st=v5ArcStart;v5ArcStart=function(){_st();try{v5Amb(true,v5AmbLvl()*.35)}catch(e){}}}
// quique: detectado no desenho (mesma regra da poeira)
{const _bp=v5BallPos;v5BallPos=function(b,now){const r=_bp(b,now);try{if(V5A&&b===V5A.ball&&!b.snd){const ub=(b.y0-b.yb)/(b.y0-b.y1);if(r.u>=ub){b.snd=1;sBounce(IM&&IM.ev&&IM.ev.surf,!b.toMe)}}}catch(e){}return r}}
{const _ec=enterCourt;enterCourt=function(){_ec();try{v5Amb(true,v5AmbLvl())}catch(e){}}}
{const _cl=closeLive;closeLive=function(){try{v5Amb(false)}catch(e){}return _cl()}}
// ---------- fanfarra de título ----------
function sFanfare(gs){const c=ax();if(!c)return;const o=MG(c),t=c.currentTime+.15,b=60/(gs?96:108);const seq=gs?[[[60,64,67],0,1],[[65,69,72],1,1],[[67,71,74],2,1],[[72,76,79],3,2.5],[[69,72,76],5.5,.5],[[71,74,79],6,.5],[[72,76,79,84],6.5,3]]:[[[60,64,67],0,1],[[65,69,72],1,1],[[67,71,74],2,1],[[72,76,79],3,3]];
 for(const[ms,st,len]of seq)V5I.brass(c,o,t+st*b,ms,len*b,gs?2.2:1.8);for(let i=0;i<(gs?8:4);i++)V5I.timp(c,o,t+i*b,i%2?43:36,gs?.9:.7);if(V5MB)V5MB.gain.setTargetAtTime(.02,c.currentTime,.2);setTimeout(()=>{try{v5MusCheck()}catch(e){}},(gs?10:6)*b*1000)}
{const _cs=v5CelStart;v5CelStart=function(L){_cs(L);try{sFanfare(L.ev.tier==='GS')}catch(e){}}}
// ---------- opções ----------
function v5MusTog(){OPTS.mus=OPTS.mus===false;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}if(OPTS.mus!==false&&!SND)sndToggle();else{render();setTimeout(v5MusCheck,0)}}
function v5MusVol(v){OPTS.mvol=clamp(+v,0,1);try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}if(V5MB&&ACX)V5MB.gain.setTargetAtTime(OPTS.mvol*(V5MP.lvl||1),ACX.currentTime,.1)}
{const _m=inMenuView;inMenuView=function(){let s=_m();try{const now=V5MP.tr?V5TRK[V5MP.tr].n:null;s=s.replace(/(<button class="opt" onclick="v5NpToggle\(\)">)/,`<button class="opt" onclick="v5MusTog()">${OPTS.mus!==false?'✅':'⬜'} Trilha sonora<small>Músicas originais do jogo, cada uma com o clima de um lugar do circuito: Paris, Londres, Nova York e Melbourne.${now&&OPTS.mus!==false&&SND?` Tocando agora: ${now}.`:''}</small></button>
 <div class="opt" style="cursor:default">Volume da música<input type="range" min="0" max="1" step="0.05" value="${OPTS.mvol??.35}" oninput="v5MusVol(this.value)" aria-label="Volume da música" style="width:100%;margin-top:6px"></div>
 <button class="opt" onclick="OPTS.musMatch=OPTS.musMatch===false;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}render()">${OPTS.musMatch!==false?'✅':'⬜'} Música baixinha durante a partida<small>Desligado, você ouve só a torcida, as batidas na bola e o quique.</small></button>$1`)}catch(e){}return s}}
