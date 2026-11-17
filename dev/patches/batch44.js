// =============== v4.4: balanceamento realista ===============
let SLC={w:-1,n:0};
function seasonLoad(){if(SLC.w===S.w)return SLC.n;const n=(S.me.trips||[]).filter(t=>!t.home&&t.e&&t.w>S.w-52).length;SLC={w:S.w,n};return n}
function fatPen(){const n=seasonLoad();return Math.min(4,Math.max(0,n-22)*.35)}
function fatWeek(){const m=S.me;if(!m||S.ended||m.injury>0)return;const n=seasonLoad();if(n>24&&R()<(n-24)*.006){injure(1,3);news(`🩹 Excesso de torneios: ${n} nos últimos 12 meses. O corpo cobrou a conta.`)}}
function spawnPhenom(){const ag=ri(15,16);const p=mkAI(44+R()*6+(ag-15)*4,ag,0,true);p.pot=92+R()*5;p.fit=.75+R()*.2;p.pk=27+ri(0,2);p.rt=36+ri(0,3);S.jr.push(p);p.phen=1;
 news(`🌟 Olheiros falam de um fenômeno: ${flag(p.c)} ${p.n}, ${ag} anos, é apontad${G('o','a')} como futur${G('o','a')} número 1.`)}
function bodyAsk(){const m=S.me;if(!m||S.ended||m.legEnd)return;const a=meAge(),ra=retireAge(),y=year();m.bask=m.bask||{};if(m.bask[y])return;const rk=myRank('pro');
 if(a>=31&&(ra-a<=2||(rk&&rk>250&&a>=33))){m.bask[y]=1;S.modals.push({k:'Carreira',e:'🦵',ti:'O corpo está pedindo',q:`Aos ${a} anos, a recuperação já não é a mesma${rk?` e você está em #${rk}`:''}. A equipe médica estima que o seu corpo aguenta até os ${ra} anos. Como você quer seguir?`,o:[{l:'Seguir jogando',t:'Decide de novo no ano que vem',fx:{}},{l:'Turnê de despedida',t:'Última temporada: a torcida aplaude em todo lugar (+imagem, +seguidores)',fx:{farewell:1}},{l:'Aposentar agora',t:'Encerra a carreira',fx:{retNow:1}}]})}}
ACH.push(['phenw','🌠','Caçador de fenômenos','Vença um fenômeno da nova geração',m=>!!m.st.phenW],['fare','🎻','Turnê de despedida','Faça uma turnê de despedida',m=>!!m.farewell]);
Object.assign(RARE,{phenw:1,fare:1});
{const _ef=eff;eff=function(id,surf,tac,opp){const A=_ef.apply(this,arguments);try{if(A&&id!=='me'&&RK.pro){const r=RK.pro[id];if(r&&r<=10){const x=r<=3?1.3:.8;A.sv+=x;A.rt+=x}}if(A&&id==='me'&&S.me&&!S.ended){const p=fatPen();if(p){A.sv-=p;A.rt-=p}if(S.me.farewell&&S.me.legEnd){A.sv+=.3;A.rt+=.3}}}catch(e){}return A}}
function depthKeep(){const top=ORD.pro.filter(id=>id!=='me').slice(0,10).map(id=>IDX.get(id)).filter(Boolean);if(top.length<10)return;const avg=top.reduce((s,p)=>s+p.r,0)/top.length;if(avg>=86)return;
 const C=S.pro.filter(p=>ageOf(p)<=24&&p.pot<94).sort((a,b)=>b.pot-a.pot).slice(0,4);C.forEach(p=>{p.pot=Math.min(95,p.pot+2+(86-avg)*.5);p.fit=Math.max(p.fit??.5,.65)})}
{const _ny=newYear;newYear=function(){_ny();try{if(!S.ended){if(R()<.45)spawnPhenom();try{computeRanks();depthKeep()}catch(e){}bodyAsk()}}catch(e){console.error(e)}}}
{const _af=applyFx;applyFx=function(fx){_af(fx);if(!fx)return;try{const m=S.me;if(fx.farewell){m.farewell=1;m.legEnd=meAge()+1;m.app=clamp((m.app??50)+5,0,100);m.fol=Math.round(m.fol*1.05);news(`🎻 ${m.name} anuncia que esta será a última temporada da carreira. Começa a turnê de despedida!`);hl('🎻 Anunciou a turnê de despedida');addPost({a:MEDIA[0][0],h:MEDIA[0][1],t:`🎻 ${m.name} ${flag(m.c)} anuncia a última temporada. Cada jogo agora é uma despedida.`,k:'md'})}if(fx.retNow){setTimeout(()=>{try{CONFIRM_RESET=null;endCareer('escolha');save();render()}catch(e){}},0)}}catch(e){console.error(e)}}}
{const _um=userMatch;userMatch=function(opp,ev,bo5,stage,pre){const res=_um.apply(this,arguments);try{const p=IDX.get(opp);if(res.win&&p&&p.phen)S.me.st.phenW=1}catch(e){}return res}}
