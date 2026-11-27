// ===== v7.9: partida mais confortável =====
// quadra no topo da tela (sem rolar a cada ponto), botão voltar sempre à vista, sair da quadra e voltar depois,
// ritmo dos pontos mais próximo do real (bola mais lenta e pausa entre pontos), e a tela não pula mais para cima.

// ---------------------------------------------------------------- 1) ritmo: bola mais lenta e pausa entre os pontos
const BCPACE={rapido:{b:1,g:700,c:1100,l:'Rápido'},normal:{b:1.3,g:1800,c:3200,l:'Normal'},real:{b:1.55,g:2800,c:5200,l:'Realista'}};
const bcPaceK=()=>BCPACE[OPTS.pace]?OPTS.pace:'normal';
function bcSetPace(k){OPTS.pace=k;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}render()}
{const _b=v5Ball;v5Ball=function(x0,y0,x1,y1,T,toMe){return _b(x0,y0,x1,y1,Math.round(T*BCPACE[bcPaceK()].b),toMe)}}
let BCPTEND=0,BCPTWAIT=0,BCPTGAME=false;
{const _e=v5End;v5End=function(aw,kind,txt){const had=V5A&&!V5A.end;const r=_e.apply(this,arguments);if(had)BCPTEND=performance.now();return r}}
{const _c=v5ArcCommit;v5ArcCommit=function(){let g0=null;try{g0=IM&&IM.E?IM.E.ga+IM.E.gb+IM.E.sets.length*100:null}catch(e){}const r=_c.apply(this,arguments);try{if(IM&&IM.E&&g0!=null)BCPTGAME=(IM.E.ga+IM.E.gb+IM.E.sets.length*100)!==g0}catch(e){}return r}}
{const _s=v5ArcStart;v5ArcStart=function(){const P=BCPACE[bcPaceK()],need=BCPTGAME?P.c:P.g,left=BCPTEND?need-(performance.now()-BCPTEND):0;
 if(left>60){if(!BCPTWAIT)BCPTWAIT=setTimeout(()=>{BCPTWAIT=0;BCPTEND=0;BCPTGAME=false;try{if(IM&&!IM.hid&&document.getElementById('v5arc')&&v5ArcReady()&&!V5A){_s();render()}}catch(e){}},left);try{v5ArcLoop()}catch(e){}return}
 BCPTEND=0;BCPTGAME=false;return _s.apply(this,arguments)}}

// ---------------------------------------------------------------- 2) tela da quadra: placar e quadra juntos no topo
function bcBar(label,action,extra){return`<div class="bcbar"><button class="bcback" onclick="${action}">${label}</button>${extra||''}</div>`}
function bcLeaveCourt(){if(!IM)return;try{if(V5A&&!V5A.end)V5A=null}catch(e){}IM.hid=1;render();window.scrollTo(0,0)}
function bcBackCourt(){if(!IM)return;IM.hid=0;render()}
{const _cv=courtView;courtView=function(){if(IM&&IM.hid)return'';let s=_cv.apply(this,arguments);try{
 const pk=bcPaceK(),pace=`<div class="bcpace"><span>Ritmo dos pontos</span>${Object.entries(BCPACE).map(([k,v])=>`<button class="${k===pk?'on':''}" onclick="bcSetPace('${k}')">${v.l}</button>`).join('')}</div>`;
 s=s.replace(/^(\s*<div class="liveov courtov[^"]*">)/,`$1${bcBar('← Sair da quadra','bcLeaveCourt()','<span class="bcbart">a partida fica pausada</span>')}`);
 s=s.replace('<div class="liveov courtov"','<div class="liveov courtov bcfocus"');
 s=s.replace(/(<div class="lastpt)/,pace+'$1')}catch(e){}return s}}
// partida pausada: atalho fixo para voltar à quadra
{const _r=render;render=function(...a){const ov=document.querySelector('.liveov'),st=ov?ov.scrollTop:0,k0=ov?(IM?'im':LIVE?'live':''):null;const v=_r.apply(this,a);
 try{const ov2=document.querySelector('.liveov');if(ov2&&k0&&k0===(IM?'im':LIVE?'live':'')&&st)ov2.scrollTop=st}catch(e){}
 try{let pill=document.getElementById('bcimback');if(IM&&IM.hid&&!MENU){if(!pill){pill=document.createElement('button');pill.id='bcimback';pill.className='bcimback';pill.onclick=bcBackCourt;document.body.appendChild(pill)}
   const p=IDX.get(IM.opp);pill.innerHTML=`🎾 Partida pausada${p?' contra '+esc(p.n.split(' ').slice(-1)[0]):''} · <b>voltar à quadra</b>`}else if(pill)pill.remove()}catch(e){}
 return v}}

// ---------------------------------------------------------------- 3) botão voltar sempre visível
{const _li=liveInner;liveInner=function(){const s=_li.apply(this,arguments);try{return bcBar('← Voltar',"try{skipLive()}catch(e){};closeLive()",'<span class="bcbart">vai direto ao resultado</span>')+s}catch(e){return s}}}
{const _ri=resultInner;resultInner=function(){const s=_ri.apply(this,arguments);try{return bcBar('← Voltar','closeLive()')+s}catch(e){return s}}}
{const _mv=modalView;modalView=function(){let s=_mv.apply(this,arguments);try{const md=S.modals[0];if(md&&md.o&&md.o.length===1&&(md.html||'').length>300)s=s.replace('<div class="box">',`<div class="box">${bcBar('← '+esc(md.o[0].l||'Voltar'),'answer(0)')}`)}catch(e){}return s}}
// "Entrar em quadra" com a partida pausada retoma a mesma partida
{const _ec=enterCourt;enterCourt=function(){if(IM&&IM.hid){bcBackCourt();return}return _ec.apply(this,arguments)}}

// ---------------------------------------------------------------- 4) mensagens: só travam a semana se ficarem sem resposta por mais de 1 semana
{const _mu=v5Must;v5Must=function(){const L=_mu.apply(this,arguments);try{const D=(S.dms||[]).filter(d=>!d.done);if(D.length&&D.every(d=>(d.w??S.w)>=S.w-1))return L.filter(x=>x.id!=='dm')}catch(e){}return L}}

// ---------------------------------------------------------------- 5) agenda pesada: aviso no calendário e ao se inscrever
function bcPlanWarn(base,off){try{const from=base+(off?0:S.w%52),W=Object.keys(S.plan||{}).map(Number).filter(w=>w>=from&&w<base+52).sort((a,b)=>a-b);let run=1,max=W.length?1:0,n=0;
 for(let i=1;i<=W.length;i++){if(i<W.length&&W[i]===W[i-1]+1)run++;else{if(run>=4)n++;max=Math.max(max,run);run=1}}
 return max>=4?`<br><b style="color:var(--bad,#c0392b)">⚠️ ${n} sequência${n>1?'s':''} de ${max} semanas seguidas.</b> Mais de 3 torneios seguidos derruba a energia, aumenta o risco de lesão e encarece as viagens. Encaixe uma semana de descanso.`:''}catch(e){return''}}
function bcWkStreak(){const m=S.me;const W=new Set((m.plw||[]));let k=0;for(let w=S.w-1;W.has(w);w--)k++;return k}
{const _en=enter;enter=function(key){const T0=S.tour;const r=_en.apply(this,arguments);try{if(S.tour&&S.tour!==T0){const m=S.me;m.plw=(m.plw||[]).filter(w=>w>S.w-12);if(!m.plw.includes(S.w))m.plw.push(S.w);const k=bcWkStreak();
  if(k>=3){const t=`⚠️ ${k+1}ª semana seguida de torneio: o cansaço acumula e o risco de lesão sobe. Uma semana de descanso devolve a energia.`;S.tour.log.push({c:'loss',t});if(!QUIET)TOAST=t}}}catch(e){}return r}}

// ---------------------------------------------------------------- 6) Laver Cup: 3 pelo ranking e 3 escolhidos pelo capitão
function bcLvTeams(){const y=year();if(S.lvT&&S.lvT.y===y)return S.lvT;const eu=c=>EUR.includes(COUNTRIES[c][0]),m=S.me,mine=eu(m.c);
 const pool=x=>{const L=ORD.pro.filter(id=>id!=='me'&&IDX.get(id)&&!(IDX.get(id).inj>0)&&eu(IDX.get(id).c)===x).slice(0,20);if(x===mine&&isPro()&&RK.pro.me&&!(m.injury>0))L.push('me');return L.sort((a,b)=>(RK.pro[a]||999)-(RK.pro[b]||999))};
 const pick6=L=>{const t=L.slice(0,3),rest=L.slice(3),fame=id=>id==='me'?Math.log10(10+(m.fol||0))*1.2+(m.app??50)/50:1.5+R()*1.5;
  const sc=rest.map(id=>({id,s:20/(RK.pro[id]||50)+fame(id)*.6+R()*1.2}));sc.sort((a,b)=>b.s-a.s);return t.concat(sc.slice(0,3).map(x=>x.id)).sort((a,b)=>(RK.pro[a]||999)-(RK.pro[b]||999))};
 const own=pick6(pool(mine)),opp=pick6(pool(!mine)).filter(x=>x!=='me');S.lvT={y,own,opp,pick:own.includes('me')&&own.indexOf('me')>=0&&pool(mine).indexOf('me')>=3};return S.lvT}
{const _st=specialToday;specialToday=function(){const r=_st.apply(this,arguments);try{const sp=SPW();if(S&&S.me&&S.w%52===sp.lv&&!S.ended&&CIRC()==='ATP'&&!(S.dv&&S.dv.done[S.w%52])){const T=bcLvTeams();return T.own.includes('me')&&!(S.me.injury>0)?'lv':(r==='lv'?null:r)}}catch(e){}return r}}
{const _sc=specialCard;specialCard=function(){let s=_sc.apply(this,arguments);try{if(specialToday()==='lv'&&S.lvT&&S.lvT.pick)s=s.replace(/(<\/div>)/,`$1<p class="small" style="margin:4px 0 0">🎖️ Você foi escolhido pelo capitão: não estava entre os 3 classificados pelo ranking.</p>`)}catch(e){}return s}}
