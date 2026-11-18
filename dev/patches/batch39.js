// =============== alvos tocáveis na quadra ===============
let CTGT=null;
const TGTPOS={srv:{fh:[-3.6,5.7,'Aberto FH'],corpo:[-1.8,5.2,'Corpo'],T:[0,6.15,'No T'],seg:[1.8,4.4,'Seguro'],bh:[3.6,5.7,'Aberto BH'],sbx:[0,2.3,'Por baixo']},
 ret:{agr:[-3.3,9.9,'Agressiva'],fundo:[0,10.5,'Profunda'],bloq:[2.7,7.4,'Bloquear']},
 ral:{base:[0,10.3,'Do fundo'],para:[-3.7,9.7,'Paralela'],curta:[1.3,2.1,'Curtinha'],lob:[3.5,10.9,'Lob'],rede:[0,-3.4,'Subir à rede']}};
function courtTap(e){if(!CTGT||!CTGT.pts||!IM||IM.anim)return;const r=e.currentTarget.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;let best=null,bd=40;
 for(const p of CTGT.pts){const d=Math.hypot(p.x-x,p.y-y);if(d<bd){bd=d;best=p}}if(!best)return;if(CTGT.kind==='ral')imRally(best.k);else imChoose(best.k)}
function drawTargets(x,P){const T=CTGT,pos=TGTPOS[T.kind];if(!pos)return;T.pts=[];const keys=T.opts||Object.keys(pos);
 for(const k of keys){const q=pos[k];if(!q)continue;const g=P(q[0],q[1],0),hint=T.hint===k;T.pts.push({k,x:g[0],y:g[1]});
  x.beginPath();x.arc(g[0],g[1],hint?15:13,0,7);x.fillStyle='rgba(255,255,255,.92)';x.fill();x.lineWidth=hint?4:2.5;x.strokeStyle=hint?'#ffcf4d':'#0f6e56';x.stroke();
  x.beginPath();x.arc(g[0],g[1],4,0,7);x.fillStyle=hint?'#c48a00':'#0f6e56';x.fill();
  x.font='600 11px system-ui,-apple-system,sans-serif';const tw=x.measureText(q[2]).width+12,ty=g[1]+(q[1]<0?-30:19);x.fillStyle='rgba(10,20,16,.78)';x.beginPath();if(x.roundRect)x.roundRect(g[0]-tw/2,ty,tw,18,9);else x.rect(g[0]-tw/2,ty,tw,18);x.fill();x.fillStyle='#fff';x.textAlign='center';x.fillText(q[2],g[0],ty+13);x.textAlign='left'}
 x.font='500 11px system-ui,sans-serif';x.fillStyle='rgba(255,255,255,.85)';x.textAlign='center';x.fillText('Toque num alvo para jogar',x.canvas.clientWidth/2,16);x.textAlign='left'}
// =============== replays animados ===============
let REPO=null,REPRAF=0;
function repMount(){if(REPRAF)cancelAnimationFrame(REPRAF);REPRAF=0;const cv=document.getElementById('repc');if(!cv||!LIVE||REPI==null)return;const rep=(LIVE.res.reps||[])[REPI];if(!rep)return;
 if(!REPO||REPO.rep!==rep){REPO={rep,I0:{ev:LIVE.ev,stage:LIVE.stage||'',ball:{...rep.r,key:rep.key},anim:true,opp:LIVE.opp,ptn:(rep.sd||1)%2,E:null}}}
 const tick=now=>{REPRAF=0;const c=document.getElementById('repc');if(!c)return;let more=false;try{more=courtDraw(c,now,REPO.I0)}catch(e){console.error(e)}if(more)REPRAF=requestAnimationFrame(tick)};REPRAF=requestAnimationFrame(tick)}
function repPlay(){if(REPO)REPO.I0._C=null;repMount()}
// =============== evolução semanal ===============
let EVOM='rank',EVOD=null;
function hxRec(){const m=S.me;if(!m||S.ended)return;const h=m.hx=m.hx||[];const row=[S.w,myRank('pro')||0,meAge()<=18?(myRank('jr')||0):0,Math.round(ovr()*10)];if(h.length&&h[h.length-1][0]===S.w)h[h.length-1]=row;else h.push(row)}
function evoSeries(){const m=S.me;let H=(m.hx||[]).map(r=>({w:r[0],rp:r[1]||null,rj:r[2]||null,o:r[3]/10}));
 const Y=(m.yh||[]).map(x=>({w:(x.y-2027)*52+51,rp:x.rp||null,rj:x.rj||null,o:x.o,a:x.a}));const w0=H.length?H[0].w:1e9;H=Y.filter(x=>x.w<w0).concat(H);return{H,Y}}
function evoChart(){const {H,Y}=evoSeries(),modes=[['rank','Ranking'],['o','Nível geral']].concat(ATTR.map(([k,l])=>[k,l]));
 const chips=`<div class="chips">${modes.map(([k,l])=>`<button class="${EVOM===k?'on':''}" onclick="EVOM='${k}';render()">${l}</button>`).join('')}</div>`;
 let pts=[],series2=[],inv=false,fmtV=v=>Math.round(v);
 if(EVOM==='rank'){pts=H.filter(x=>x.rp).map(x=>({w:x.w,v:x.rp}));series2=H.filter(x=>x.rj).map(x=>({w:x.w,v:x.rj}));inv=true;fmtV=v=>'#'+Math.round(v)}
 else if(EVOM==='o')pts=H.filter(x=>x.o).map(x=>({w:x.w,v:x.o}));else pts=Y.filter(x=>x.a&&x.a[EVOM]!=null).map(x=>({w:x.w,v:x.a[EVOM]}));
 const all=pts.concat(series2);if(all.length<2)return `<div class="card"><h3>📈 Evolução</h3>${chips}<p class="small mut">O gráfico aparece depois de algumas semanas de carreira${EVOM!=='rank'&&EVOM!=='o'?' (atributos: a cada fim de temporada)':''}.</p></div>`;
 const W=340,Ht=180,L=34,Rr=10,T0=14,B=24,w0=Math.min(...all.map(p=>p.w)),w1=Math.max(...all.map(p=>p.w),w0+1);
 let v0,v1,py;if(inv){v0=1;v1=Math.max(10,...all.map(p=>p.v));const lg=v=>Math.log10(v);py=v=>T0+(lg(v)-lg(v0))/((lg(v1)-lg(v0))||1)*(Ht-T0-B)}else{v0=Math.max(0,Math.min(...all.map(p=>p.v))-3);v1=Math.min(100,Math.max(...all.map(p=>p.v))+3);py=v=>Ht-B-(v-v0)/((v1-v0)||1)*(Ht-T0-B)}
 const px=w=>L+(w-w0)/(w1-w0)*(W-L-Rr);const line=a=>a.map((p,i)=>(i?'L':'M')+px(p.w).toFixed(1)+' '+py(p.v).toFixed(1)).join('');
 const ticks=inv?[1,10,100,1000].filter(v=>v<=v1*1.01):[v0,(v0+v1)/2,v1];const yrs=[];for(let y=2027+Math.ceil(w0/52);y<=2027+Math.floor(w1/52);y++)yrs.push(y);const ystep=Math.ceil(yrs.length/6);
 EVOD={pts:pts.length?pts:series2,px,py,fmtV,W,inv,j:series2,lbl:EVOM==='rank'?CIRC():''};
 const best=inv&&pts.length?pts.reduce((a,b)=>b.v<a.v?b:a):null;
 return `<div class="card"><h3>📈 Evolução</h3>${chips}<div style="position:relative"><svg id="evosvg" viewBox="0 0 ${W} ${Ht}" style="width:100%;touch-action:none;cursor:crosshair" onpointerdown="evoTap(event)" onpointermove="if(event.buttons||event.pointerType==='mouse')evoTap(event)">
 ${ticks.map(v=>`<line x1="${L}" x2="${W-Rr}" y1="${py(v)}" y2="${py(v)}" stroke="currentColor" opacity=".12"/><text x="${L-5}" y="${py(v)+3}" font-size="9" fill="currentColor" opacity=".55" text-anchor="end">${inv?'#'+v:Math.round(v)}</text>`).join('')}
 ${yrs.filter((y,i)=>i%ystep===0).map(y=>{const x=px((y-2027)*52);return x>=L&&x<=W-Rr?`<text x="${x}" y="${Ht-6}" font-size="9" fill="currentColor" opacity=".55" text-anchor="middle">${y}</text>`:''}).join('')}
 ${series2.length>1?`<path d="${line(series2)}" fill="none" stroke="var(--gold)" stroke-width="2" stroke-dasharray="4 3"/>`:''}
 ${pts.length>1?`<path d="${line(pts)}" fill="none" stroke="var(--acc)" stroke-width="2.5" stroke-linejoin="round"/>`:''}
 ${best?`<circle cx="${px(best.w)}" cy="${py(best.v)}" r="4" fill="var(--acc)"/><text x="${Math.min(W-30,px(best.w)+6)}" y="${py(best.v)-6}" font-size="9.5" font-weight="700" fill="var(--acc)">melhor #${best.v}</text>`:''}
 <line id="evoln" x1="0" x2="0" y1="${T0}" y2="${Ht-B}" stroke="currentColor" opacity="0" stroke-width="1"/><circle id="evodot" r="5" fill="var(--txt)" opacity="0"/></svg>
 <div id="evotip" class="small" style="min-height:20px;margin-top:4px;color:var(--mut)">Toque no gráfico para ver os valores.</div></div>
 ${EVOM==='rank'&&series2.length?`<div class="xs mut">Linha cheia: ranking ${CIRC()} · tracejada: ranking juvenil.</div>`:''}</div>`}
function evoTap(e){const svg=document.getElementById('evosvg');if(!svg||!EVOD)return;const r=svg.getBoundingClientRect(),xs=(e.clientX-r.left)/r.width*EVOD.W;const P=EVOD.pts.concat(EVOD.pts===EVOD.j?[]:EVOD.j);let b=null,bd=1e9;for(const p of P){const d=Math.abs(EVOD.px(p.w)-xs);if(d<bd){bd=d;b=p}}if(!b)return;
 const ln=document.getElementById('evoln'),dt=document.getElementById('evodot'),tp=document.getElementById('evotip'),x=EVOD.px(b.w),y=EVOD.py(b.v);ln.setAttribute('x1',x);ln.setAttribute('x2',x);ln.setAttribute('opacity',.35);dt.setAttribute('cx',x);dt.setAttribute('cy',y);dt.setAttribute('opacity',1);
 const age=Math.floor((b.w-S.me.born)/52),jr=EVOD.j.includes(b);tp.innerHTML=`<b style="color:var(--txt)">${EVOD.fmtV(b.v)}${EVOD.inv?(jr?' juvenil':' '+EVOD.lbl):''}</b> · ${dateOf(b.w)} · ${age} anos`}
// =============== desafio entre amigos ===============
const CH_ALPHA='23456789ABCDEFGHJKMNPQRSTUVWXYZ';
function chNewCode(){let c='';for(let i=0;i<6;i++)c+=CH_ALPHA[Math.floor(Math.random()*CH_ALPHA.length)];return c}
function chBuild(code){code=String(code||'').toUpperCase().replace(/[^0-9A-Z]/g,'').slice(0,6);if(code.length<4)return null;const old=RNG;RNG=seeded(seedHash('DESAFIO'+code));try{
 const surf=pick(['hard','hard','clay','grass']),evn=pick(['Copa dos Amigos','Desafio Breakpoint','Taça da Rivalidade','Open dos Desafiantes']),city=pick([['Florianópolis','BR'],['Valência','ES'],['Monte Carlo','MC'],['Miami','US'],['Melbourne','AU'],['Londres','GB'],['Buenos Aires','AR'],['Tóquio','JP']]);
 const field=[];for(let i=0;i<15;i++){const c=ri(0,34);field.push({n:genName(c,CIRC()==='WTA'),c,d:0,b:ri(-3,3)})}
 // caminho: R16, QF, SF, F
 const path=[R()*4-6,R()*4-3,R()*3,R()*3+2.5];return{code,surf,name:evn,city:city[0],iso:city[1],field,path,round:0,res:[],over:false,tac:S.me.tac||'equil',base:null}}finally{RNG=old}}
function chStart(code){const c=chBuild(code||chNewCode());if(!c){TOAST='Código inválido. Use 4 a 6 letras ou números.';render();return}c.base=Math.round(ovr());S.chal=c;INMENU='chal';save();render()}
function chOpp(c){const i=c.round,p=c.field[[0,8,12,14][i]];return{...p,r:Math.round((c.base+c.path[i])*10)/10}}
const CHR=['Oitavas','Quartas','Semifinal','Final'];
function chPlay(){const c=S.chal;if(!c||c.over)return;const o=chOpp(c),ev={iso:c.iso,city:c.city,surf:c.surf,key:'DESAFIO',tier:'A250',name:c.name};const ce=CUR_EV;CUR_EV=ev;
 try{const A=eff('me',c.surf,c.tac,null),f=.8,B={sv:o.r+o.b+f,rt:o.r-o.b+f,me:o.r,v:2,fi:o.r*.85+7};const res=simMatch(A,B,false,false);c.res.push({o:o.n,oc:o.c,or:o.r,win:res.win,s:scoreStr(res.sets),tac:c.tac});if(res.win){c.round++;if(c.round>=4){c.over=true;c.champ=true}}else c.over=true}finally{CUR_EV=ce}
 save();render()}
function chStage(c){return c.champ?'Campeão':c.over?(['nas oitavas','nas quartas','na semifinal','na final'][c.round]):(CHR[c.round])}
function chShareText(c){return `🎾 Desafio Breakpoint ${c.code}: ${c.champ?'fui campeão':'caí '+chStage(c)} (${c.res.map(r=>(r.win?'V ':'D ')+r.s).join(' · ')}). Consegue fazer melhor? No Breakpoint, abra ☰ → Desafio entre amigos e digite ${c.code}.`}
function chShare(){const c=S.chal;if(!c)return;const t=chShareText(c);try{if(navigator.share){navigator.share({text:t}).catch(()=>{});return}}catch(e){}try{navigator.clipboard.writeText(t).then(()=>{TOAST='Resultado copiado. Cole para o seu amigo.';render()},()=>{TOAST=t;render()})}catch(e){TOAST=t;render()}}
function chView(){const c=S.chal;const back=`<button class="sec" onclick="INMENU=true;render()">← Voltar</button>`;
 if(!c)return `<div class="modal"><div class="box">${back}<h3 style="margin:12px 0 4px">🤝 Desafio entre amigos</h3><p class="small mut" style="margin:0 0 12px">Uma chave de 16 jogadores gerada por um código. Quem digitar o mesmo código enfrenta os mesmos adversários, no mesmo piso, com força proporcional ao nível de cada um. Vale só pela resenha: não mexe no seu ranking, energia ou estatísticas.</p>
  <button class="full big" onclick="chStart()">Criar desafio novo</button><div class="sec-t" style="margin-top:14px">Recebeu um código?</div><div class="row" style="gap:8px"><input id="chcode" placeholder="Ex.: K7Q2PX" maxlength="6" style="flex:1;text-transform:uppercase"><button onclick="chStart(document.getElementById('chcode').value)">Aceitar</button></div></div></div>`;
 const o=c.over?null:chOpp(c);
 return `<div class="modal"><div class="box">${back}<div class="mk" style="margin-top:12px">Código ${c.code} · ${SURF[c.surf]} · ${c.city}</div><h3 style="margin:4px 0 8px">${c.name}</h3>
 <div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:10px">${CHR.map((n,i)=>`<span class="chip ${i<c.round||c.champ?'s-grass':i===c.round&&!c.over?'t':''}" style="${i===c.round&&!c.over?'outline:1px solid var(--acc)':''}">${n}</span>`).join('')}</div>
 ${c.res.map(r=>`<div class="small" style="padding:6px 0;border-bottom:1px solid var(--line)"><b class="${r.win?'win':'loss'}">${r.win?'V':'D'}</b> ${flag(r.oc)} ${esc(r.o)} <span class="mut">(nível ${Math.round(r.or)})</span> · ${r.s}</div>`).join('')}
 ${o?`<div class="card" style="margin-top:10px"><div class="mk">${CHR[c.round]}</div><div class="row" style="margin:6px 0"><b style="flex:1">${flag(o.c)} ${esc(o.n)}</b><span class="small mut">nível ${Math.round(o.r)} · ${o.b>=2?'sacador':o.b<=-2?'devolvedor':'completo'}</span></div>
  <div class="chips">${Object.entries(TAC).map(([k,t])=>`<button class="${c.tac===k?'on':''}" onclick="S.chal.tac='${k}';render()">${t.n}</button>`).join('')}</div><div class="xs mut" style="margin-bottom:8px">${TAC[c.tac].d}</div><button class="full" onclick="chPlay()">Jogar ${CHR[c.round].toLowerCase()}</button></div>`
 :`<div class="card dec" style="margin-top:10px"><div class="mk">Resultado</div><h2 class="dect">${c.champ?'🏆 Campeão do desafio!':'Você caiu '+chStage(c)}</h2><p class="small">Mande o código <b>${c.code}</b> para um amigo e veja quem vai mais longe.</p><div class="g2"><button onclick="chShare()">Compartilhar</button><button class="sec" onclick="S.chal=null;render()">Novo desafio</button></div></div>`}
 </div></div>`}
// =============== selos das conquistas ===============
function badgeSVG(id,e,on){const rr=RARE[id]??1,col=RARL[rr][1],n='bg'+id;const pts=rr>=2?Array.from({length:24},(_,i)=>{const a=i*Math.PI/12,R0=i%2?27:31;return(32+R0*Math.sin(a)).toFixed(1)+','+(32-R0*Math.cos(a)).toFixed(1)}).join(' '):null;
 return `<svg viewBox="0 0 64 72" width="56" height="63" aria-hidden="true" style="${on?'':'filter:grayscale(1);opacity:.45'}"><defs><linearGradient id="${n}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="${col}"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>
 <path d="M20 52 L14 70 L22 66 L27 71 L31 54 Z" fill="${col}" opacity=".85"/><path d="M44 52 L50 70 L42 66 L37 71 L33 54 Z" fill="${col}" opacity=".65"/>
 ${pts?`<polygon points="${pts}" fill="url(#${n})"/>`:`<circle cx="32" cy="32" r="29" fill="url(#${n})"/>`}<circle cx="32" cy="32" r="21" fill="#10221b" stroke="#ffffff55" stroke-width="1.2"/>${rr===3?`<circle cx="32" cy="32" r="24.5" fill="none" stroke="#fff6" stroke-dasharray="2 3"/>`:''}
 ${on?`<text x="32" y="39" font-size="19" text-anchor="middle">${e}</text>`:`<path d="M26 31v-4a6 6 0 0 1 12 0v4" fill="none" stroke="#cfd6d2" stroke-width="2.4"/><rect x="24" y="30" width="16" height="12" rx="2.5" fill="#cfd6d2"/>`}</svg>`}
function achCard(){const m=S.me,A=m.ach||{},n=Object.keys(A).length;const byR=[3,2,1,0].map(r=>ACH.filter(a=>(RARE[a[0]]??1)===r));
 return `<div class="card"><h3>🏅 Galeria de troféus <span class="xs mut">${n}/${ACH.length}</span></h3><div class="bar" style="margin:4px 0 12px"><i style="width:${n/ACH.length*100}%"></i></div>
 ${byR.map((L,ri)=>L.length?`<div class="sec-t" style="color:${RARL[3-ri][1]}">${RARL[3-ri][0]} · ${L.filter(a=>A[a[0]]).length}/${L.length}</div><div class="badg">${L.map(([id,e,nm,d])=>`<div class="bdg ${A[id]?'on':''}" title="${esc(d)}">${badgeSVG(id,e,!!A[id])}<b>${nm}</b><span>${A[id]?year0(A[id]):d}</span></div>`).join('')}</div>`:'').join('')}</div>`}
