// =============== v6.0: Simular assistindo com intervalo de set (números do treinador e ajuste de tática) ===============
let V5WI=null;
const v5WiOn=()=>OPTS.wInt!==false;
function v5WiSimSet(){const E=V5WI.E,n0=E.sets.length;let g=0;while(!E.done&&E.sets.length===n0&&g++<1500)ePoint(E,{})}
function v5WiStart(){const T=S.tour,ev=curEv();if(!T||!ev)return false;const t=TIERS[ev.tier];const opp=T.q?T.q.opp:oppOf();if(opp==null)return false;
 const stage=T.q?`Quali R${T.q.step+1}`:roundName(T.br.length);CUR_EV=ev;const A=eff('me',ev.surf,S.me.tac,opp),B=eff(opp,ev.surf);const E=mkEngine(A,B,!T.q&&bo5Of(t));E.pA0=E.pA;E.pB0=E.pB;
 V5WI={E,opp,ev,stage,tac:'eq',n:0};v5WiSimSet();
 LIVE={res:{tl:E.TL,win:false,sets:E.sets,wi:1},opp,stage,ev,i:0,hold:0,phase:'live',feed:[],fac:'',wi:1};try{REPI=null;REPO=null}catch(e){}
 v5WiTick();render();return true}
function v5WiTick(){clearInterval(LIVET);let cnt=0;
 LIVET=setInterval(()=>{const L=LIVE;if(!L||!L.wi||!V5WI){clearInterval(LIVET);return}if(V5W||L.wiBrk)return;if(L.hold>0){L.hold--;return}
  const tl=L.res.tl,E=V5WI.E;
  if(L.i>=tl.length-1){if(E.done){clearInterval(LIVET);if(!L.fin){L.fin=1;L.res.win=E.sa>E.sb;const fe=tl[tl.length-1];if(v5WOn()&&fe){const el=document.getElementById('live');if(el)el.innerHTML=liveInner();v5WStart({...fe,ev:'match',aw:L.res.win},()=>v5WiFinish())}else v5WiFinish()}return}
   L.wiBrk=1;V5WI.n++;try{if(SND)sCrowd(.6)}catch(e){}render();return}
  L.i++;const e=tl[L.i];if(!e)return;
  if(['ace','brk','set','df'].includes(e.ev)){if(SND){try{sHit();if(e.ev!=='df')(e.aw?sCrowd(e.ev==='ace'?1:1.6):sGroan())}catch(er){}}L.hold=e.ev==='set'?6:e.ev==='brk'?3:2;L.feed.unshift(evTxt(e))}
  const el=document.getElementById('live');if(el)el.innerHTML=liveInner();
  if(v5WOn()&&(e.ev==='brk'||e.ev==='set')&&cnt<12){cnt++;v5WStart(e,()=>{})}},28)}
function v5WiFinish(){clearInterval(LIVET);V5W=null;if(!V5WI)return;const E=V5WI.E;let g=0;while(!E.done&&g++<3000)ePoint(E,{});const res=eResult(E);res.wiTac=V5WI.tac;V5WI=null;LIVE=null;playMatch(res);render()}
// pular direto para o resultado
{const _sk=skipLive;skipLive=function(){if(LIVE&&LIVE.wi&&V5WI){LIVE.wiBrk=0;return v5WiFinish()}return _sk()}}
{const _el=endLive;endLive=function(){if(LIVE&&LIVE.wi&&V5WI)return v5WiFinish();return _el()}}
{const _cl=closeLive;closeLive=function(){if(LIVE&&LIVE.wi&&V5WI)return v5WiFinish();return _cl()}}
// entra no lugar da simulação comum quando o modo é "Simular assistindo"
{const _pm=playMatch;playMatch=function(pre){try{if(!pre&&S&&S.me&&S.me.pmode==='sim'&&v5WiOn()&&!SIMALL&&!QUIET&&!LIVE&&!IM&&!V5WI&&S.tour&&!S.tour.over&&!S.modals.length){if(v5WiStart())return}}catch(e){console.error(e);V5WI=null;LIVE=null}return _pm.apply(this,arguments)}}
// números do intervalo e recomendação do treinador
function v5WiStats(){const E=V5WI.E,a=E.SA,b=E.SB,pc=(x,y)=>y?Math.round(x/y*100):0;
 return{f1:pc(a.f1,a.sp),w1:pc(a.f1w,a.f1),w2:pc(a.s2w,a.s2),ret:pc(b.sp-b.spw,b.sp),ow1:pc(b.f1w,b.f1),ow2:pc(b.s2w,b.s2),ace:a.ace,df:a.df,win:a.win,ue:a.ue,oace:b.ace,owin:b.win,oue:b.ue,bp:`${a.bpw}/${a.bpo}`,obp:`${b.bpw}/${b.bpo}`}}
function v5WiRec(){const E=V5WI.E,s=v5WiStats(),ls=E.sets[E.sets.length-1],won=ls&&ls[0]>ls[1];
 if(s.ue>=s.win+4)return['def',`Você está errando demais: ${s.ue} erros não forçados contra ${s.win} winners. Jogue mais seguro.`];
 if(s.ret<30)return['dev',`${G('Ele','Ela')} está dominando com o saque: você só ganhou ${s.ret}% dos pontos na devolução. Pressione a devolução.`];
 if(s.w2<42)return['agr',`${G('Ele','Ela')} está atacando o seu segundo saque (você ganhou só ${s.w2}% desses pontos). Saque e golpes mais agressivos.`];
 if(!won)return['agr','Set perdido, mas os números estão equilibrados. Hora de tomar a iniciativa.'];
 return['eq','Está funcionando. Mantenha o plano.']}
{const _li=liveInner;liveInner=function(){let s=_li();try{const L=LIVE;if(!L||!L.wi||!L.wiBrk||!V5WI)return s;const E=V5WI.E,st=v5WiStats(),c=myCoach(),[rk,rt]=v5WiRec(),ls=E.sets[E.sets.length-1],p=IDX.get(L.opp),on=p?esc(p.n.split(' ').slice(-1)[0]):'Ele';
  const row=(l,me,op)=>`<tr><td>${l}</td><td><b>${me}</b></td><td>${op}</td></tr>`;
  const html=`<div class="v5wib"><div class="mk">🪑 Intervalo · ${ls[0]}-${ls[1]} no ${E.sets.length}º set</div>
   <table class="v5wit"><tr><th></th><th>Você</th><th>${on}</th></tr>${row('1º saque dentro',st.f1+'%',Math.round((E.SB.f1/(E.SB.sp||1))*100)+'%')}${row('Pontos no 1º saque',st.w1+'%',st.ow1+'%')}${row('Pontos no 2º saque',st.w2+'%',st.ow2+'%')}${row('Pontos na devolução',st.ret+'%',(100-Math.round((E.SA.spw/(E.SA.sp||1))*100))+'%')}${row('Aces / duplas faltas',st.ace+' / '+st.df,st.oace+' / '+E.SB.df)}${row('Winners / erros',st.win+' / '+st.ue,st.owin+' / '+st.oue)}${row('Break points',st.bp,st.obp)}</table>
   <p class="small" style="margin:8px 0">${c?`<b>${esc(c.n.split(' ')[0])}:</b> "${rt}"`:'<span class="mut">Sem treinador: os números estão aí, a decisão é sua.</span>'}</p>
   <div class="v5wio">${SETTAC.map(([k,l,d])=>`<button class="sec${c&&k===rk?' rec':''}${V5WI.tac===k?' on':''}" onclick="v5WiTac('${k}')"><b>${l}${c&&k===rk?' · sugestão':''}</b><small>${d}</small></button>`).join('')}</div></div>`;
  return s.replace('<div class="sec-t">Momento</div>',html+'<div class="sec-t">Momento</div>')}catch(e){console.error(e);return s}}}
function v5WiTac(k){if(!V5WI||!LIVE)return;const o=SETTAC.find(x=>x[0]===k);if(!o)return;const E=V5WI.E;E.pA=E.pA0+o[3];E.pB=E.pB0-o[4];
 try{const c=myCoach();if(c&&!c.me&&c.q>=3)cTrust(k===v5WiRec()[0]?.25:-.15)}catch(e){}
 V5WI.tac=k;LIVE.feed.unshift(k==='eq'?'📋 Plano mantido para o próximo set.':`📋 Nova tática para o próximo set: ${o[1]}.`);LIVE.wiBrk=0;v5WiSimSet();render()}
function v5WiOpt(){return `<button class="opt${v5WiOn()?' on':''}" style="margin-top:8px" onclick="setOptG('wInt',!v5WiOn())"><b>${v5WiOn()?'✓ ':''}Intervalos no Simular assistindo</b><small>A partida para entre os sets: você vê os números e escolhe se muda a tática.</small></button>`}
