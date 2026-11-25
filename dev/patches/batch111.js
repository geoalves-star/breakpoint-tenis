// =============== v7.0 · quadra nunca em branco, placar explicado, números do intervalo explicados e filtros no ranking ===============
// ---------- placar explicado (assistir, simular assistindo e jogar em quadra) ----------
const BCORD=['1º','2º','3º','4º','5º'];
const bcPV={'0':0,'15':1,'30':2,'40':3,'AD':4,'Ad':4,'V':4};
function bcBoardHead(nDone,live){return `<tr class="bchd"><td></td>${Array.from({length:nDone},(_,i)=>`<td>${BCORD[i]||i+1} set</td>`).join('')}${live?`<td>${BCORD[nDone]||nDone+1} set</td><td>Game</td>`:'<td></td>'}</tr>`}
function bcExplain(o){const L=[],opp=o.opp,me=o.sets.filter(x=>x[0]>x[1]).length,op=o.sets.filter(x=>x[1]>x[0]).length;
 if(o.done){L.push(`<b>Fim de jogo.</b> Sets: você ${me} x ${op} ${esc(opp)}.`);return L.join(' ')}
 L.push(`<b>Sets: você ${me} x ${op} ${esc(opp)}</b> · vence quem fizer ${o.need}.`);
 const n=o.sets.length+1,ga=o.g[0],gb=o.g[1];L.push(`No ${n}º set: ${ga}-${gb}${ga>gb?' para você':gb>ga?` para ${esc(opp)}`:''}. ${o.srvMe?'Você saca.':`${esc(opp)} saca.`}`);
 if(o.tb){L.push('<span class="bcx2">Tie-break: vence quem fizer 7 pontos, com 2 de vantagem.</span>');return L.join(' ')}
 const a=bcPV[o.pa]??0,b=bcPV[o.pb]??0,sv=o.srvMe?a:b,rc=o.srvMe?b:a;
 if(rc>=3&&rc>sv)L.push(o.srvMe?'<span class="bcx3">⚠️ Break point contra: perder este ponto é perder o seu saque.</span>':'<span class="bcx2">🔥 Break point para você: ganhe este ponto e você quebra o saque.</span>');
 else if(sv>=3&&sv>rc)L.push(o.srvMe?'<span class="bcx2">Game point: mais um ponto e o game é seu.</span>':`<span class="bcx1">Game point para ${esc(opp)}.</span>`);
 else if(a===3&&b===3)L.push('<span class="bcx1">Iguais (40-40): precisa ganhar 2 pontos seguidos.</span>');
 return L.join(' ')}
const bcHow=()=>`<details class="bchow"><summary>❓ Como entender a partida</summary><ul>
 <li><b>Placar:</b> cada coluna "set" mostra os games daquele set. A coluna "Game" mostra os pontos do game atual: 0, 15, 30, 40 e game.</li>
 <li><b>🎾 ao lado do nome</b> mostra quem está sacando. Quem saca tem vantagem: perder o próprio saque se chama <b>quebra</b>.</li>
 <li><b>Set:</b> vence quem chegar a 6 games com 2 de diferença. Em 6-6 tem tie-break.</li>
 <li><b>Momento:</b> a barra mostra quem ganhou mais dos últimos 20 pontos.</li>
 ${IM?'<li><b>Como jogar:</b> deslize para o lado para mirar; para cima e forte ataca; para cima curto faz deixadinha; para baixo defende; para baixo e longo é lob. No teclado: setas, espaço, D e L.</li>':bcV2()?'<li><b>Você está no box:</b> nos intervalos de set, escolha a tática. A confiança do atleta decide se ele segue o plano.</li>':'<li><b>Simulando:</b> os lances decisivos aparecem na quadra. Nos intervalos de set você vê os números e escolhe a tática.</li>'}</ul></details>`;
function bcBoardFix(html,o){if(!html||html.indexOf('<table class="board">')<0)return html;
 html=html.replace('<table class="board">',`<table class="board">${bcBoardHead(o.sets.length,!o.done)}`);
 const i=html.indexOf('</table>',html.indexOf('<table class="board">'));if(i<0)return html;
 return html.slice(0,i+8)+`<div class="bcexp">${bcExplain(o)}</div>`+html.slice(i+8)}
// assistir / simular assistindo
{const _li=liveInner;liveInner=function(){let s=_li.apply(this,arguments);try{const L=LIVE;if(!L||L.phase!=='live')return s;const tl=L.res.tl,e=tl[L.i]||tl[0];if(!e)return s;const p=IDX.get(L.opp);const[pa,pb]=ptS(e.p[0],e.p[1],e.tb);
  const need=(L.wi&&V5WI&&V5WI.E&&V5WI.E.need)||L.res.need||2;
  s=bcBoardFix(s,{sets:e.s||[],g:e.g||[0,0],pa:String(pa),pb:String(pb),tb:e.tb,srvMe:!!e.srv,need,opp:p?p.n.split(' ').slice(-1)[0]:'adversário',done:e.ev==='match'});
  s=s.replace('<div class="sec-t">Momento</div>','<div class="sec-t">Momento <span class="xs mut" style="text-transform:none;letter-spacing:0">· quem ganhou mais dos últimos 20 pontos</span></div>');
  if(!s.includes('bchow'))s=s.replace('<div class="lvprog">',bcHow()+'<div class="lvprog">');
  // números do intervalo: cor para quem está melhor e explicação de cada número
  if(L.wiBrk)s=bcBrkFix(s);
  if(!V5W)requestAnimationFrame(bcWIdle)}catch(e){console.error(e)}return s}}
// jogar em quadra
{const _cv=courtView;courtView=function(){let s=_cv.apply(this,arguments);try{const I=IM;if(!I||!I.E)return s;const E=I.E,p=IDX.get(I.opp);const[pa,pb]=ptS(E.a,E.b,E.tb);
  s=bcBoardFix(s,{sets:E.sets||[],g:[E.ga,E.gb],pa:String(pa),pb:String(pb),tb:E.tb,srvMe:!!eSrv(E),need:E.need||2,opp:p?p.n.split(' ').slice(-1)[0]:'adversário',done:!!E.done});
  if(!s.includes('bchow')){const i=s.indexOf('<div class="bcexp">');if(i>=0){const j=s.indexOf('</div>',i)+6;s=s.slice(0,j)+bcHow()+s.slice(j)}}}catch(e){console.error(e)}return s}}
const BCGLO={'1º saque dentro':['Quantos primeiros saques entram.','Acima de 60% é bom.'],'Pontos no 1º saque':['Pontos ganhos quando o 1º saque entra.','Acima de 70% é bom.'],'Pontos no 2º saque':['Pontos ganhos com o 2º saque, que é mais fraco.','Acima de 50% é bom.'],'Pontos na devolução':['Pontos ganhos quando o outro saca.','Acima de 40% é ótimo.'],'Aces / duplas faltas':['Saques que o outro nem toca / dois erros seguidos no saque.','Quanto mais aces e menos duplas, melhor.'],'Winners / erros':['Bolas vencedoras / erros não forçados.','Mais winners que erros é bom sinal.'],'Break points':['Saques do outro que você quebrou / chances que teve.','Converter as chances decide sets.']};
function bcBrkFix(s){return s.replace(/<tr><td>([^<]+)<\/td><td><b>([^<]+)<\/b><\/td><td>([^<]+)<\/td><\/tr>/g,(m0,l,a,b)=>{const g=BCGLO[l];if(!g)return m0;
  const num=x=>{const t=String(x).trim();if(t.includes('/')){const[u,v]=t.split('/').map(z=>parseFloat(z)||0);return l==='Break points'?u:u-v}return parseFloat(t)||0};
  const da=num(a),db=num(b),cl=da>db?'g':da<db?'r':'';
  return `<tr class="bcgr ${cl}"><td>${l}<small>${g[0]} ${g[1]}</small></td><td><b>${a}</b></td><td>${b}</td></tr>`}).replace('<table class="v5wit">','<div class="xs mut" style="margin:4px 0 6px">Verde: você está melhor nesse número. Vermelho: o adversário está melhor.</div><table class="v5wit">')}
// ---------- quadra nunca em branco: quadra parada com o placar quando não há lance passando ----------
function bcWIdle(){try{if(V5W||!LIVE)return;const cv=document.getElementById('v5wc');if(!cv)return;const dpr=Math.min(2,window.devicePixelRatio||1),W=cv.clientWidth,H=cv.clientHeight;if(!W||!H)return;
 if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);
 const ev=LIVE.ev,top=Math.round(H*.33),bot=H-40,hw=y=>W*.43-W*.19*y,P=(x,y,z=0)=>{const yy=bot-(bot-top)*y;return[W/2+x*hw(y),yy-z*(34-15*y)*(H/430)]};
 const key=['w',W,H,dpr,ev.name,ev.surf,ev.tier].join('|');if(typeof V5BG==='undefined'||!V5BG||V5BG.key!==key){V5BG=v5BgBuild(W,H,dpr,ev,P,top);V5BG.key=key}g.drawImage(V5BG.img[0],0,0,W,H);
 const tl=LIVE.res.tl,e=tl[LIVE.i]||tl[0];const p=IDX.get(LIVE.opp),on=p?p.n.split(' ').slice(-1)[0]:'';const u=W/360;const tr=x=>{try{if((OPTS.lang||'pt')==='pt')return x;const r=v5Tr(x);return r==null?x:r.trim()}catch(e){return x}};
 let t1,t2,t3;if(LIVE.wiBrk&&e){const ls=e.s[e.s.length-1]||[0,0];t1='🪑 INTERVALO';t2=`${ls[0]}-${ls[1]} no ${e.s.length}º set`;t3='Veja os números abaixo e escolha a tática'}
 else if(e){const n=e.s.length+1;t1=`${n}º SET · ${e.g[0]}-${e.g[1]}`;t2=e.srv?'🎾 Você saca':`🎾 ${on} saca`;t3='Os lances decisivos passam aqui'}else return;
 const bw=Math.min(W-40*u,300*u),bh=96*u,bx=(W-bw)/2,by=(H-bh)/2-10*u;g.fillStyle='rgba(8,14,12,.72)';g.beginPath();if(g.roundRect)g.roundRect(bx,by,bw,bh,14*u);else g.rect(bx,by,bw,bh);g.fill();
 g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.font=`900 ${Math.round(26*u)}px "Barlow Condensed", sans-serif`;g.fillText(tr(t1),W/2,by+30*u);
 g.font=`700 ${Math.round(17*u)}px "Barlow Condensed", sans-serif`;g.fillStyle='#FFE14D';g.fillText(tr(t2),W/2,by+56*u);g.font=`600 ${Math.round(12*u)}px Barlow, sans-serif`;g.fillStyle='#cfd8d4';g.fillText(tr(t3),W/2,by+78*u)}catch(e){}}

// ---------- filtros no ranking: país e idade ----------
let RKF={c:'all',a:'all'};
const BCAGE={all:['Todas',()=>true],u20:['Até 20',a=>a<=20],a2125:['21 a 25',a=>a>=21&&a<=25],a2630:['26 a 30',a=>a>=26&&a<=30],a31:['31+',a=>a>=31]};
function bcRkOk(id){const me=id==='me',p=me?null:IDX.get(+id);if(!me&&!p)return false;const c=me?S.me.c:p.c,age=me?meAge():ageOf(p);
 if(RKF.c!=='all'&&String(c)!==String(RKF.c==='me'?S.me.c:RKF.c))return false;return BCAGE[RKF.a][1](age)}
function bcRkBar(cat,n){const C=new Map();for(const id of Object.keys(RK[cat]).filter(id=>RK[cat][id]&&RK[cat][id]<=400)){const c=id==='me'?S.me.c:(IDX.get(+id)||{}).c;if(c!=null)C.set(c,(C.get(c)||0)+1)}
 const opts=[...C.entries()].filter(([c])=>c!==S.me.c).sort((a,b)=>COUNTRIES[a[0]][1].localeCompare(COUNTRIES[b[0]][1]));
 return `<div class="bcrkf"><label class="bcrkc"><span>País</span><select onchange="RKF.c=this.value;render()"><option value="all"${RKF.c==='all'?' selected':''}>🌍 Todos</option><option value="me"${RKF.c==='me'?' selected':''}>${flag(S.me.c)} ${esc(COUNTRIES[S.me.c][1])} (seu país)</option>${opts.map(([c])=>`<option value="${c}"${String(RKF.c)===String(c)?' selected':''}>${flag(c)} ${esc(COUNTRIES[c][1])}</option>`).join('')}</select></label>
 <div class="bcrka"><span>Idade</span><div class="chips">${Object.entries(BCAGE).map(([k,v])=>`<button class="chip ${RKF.a===k?'on':''}" onclick="RKF.a='${k}';render()">${v[0]}</button>`).join('')}</div></div>
 ${n!=null?`<div class="xs mut">${n} jogador${n===1?'':'es'} no filtro · o número é a posição no ranking mundial${RKF.c!=='all'||RKF.a!=='all'?` · <a href="#" onclick="RKF={c:'all',a:'all'};render();return false">limpar filtros</a>`:''}</div>`:''}</div>`}
{const _rv=rankView;rankView=function(){const cat=RKTAB==='jr'?'jr':RKTAB==='pro'||!RKTAB?'pro':null;if(!cat||!S||!S.me||(typeof RKQ!=='undefined'&&RKQ.trim()))return _rv.apply(this,arguments);
 const on=RKF.c!=='all'||RKF.a!=='all';let keep=null,n=null;
 if(on){keep=RK[cat];const f={};for(const id of Object.keys(keep))if(keep[id]&&bcRkOk(id))f[id]=keep[id];n=Object.keys(f).length;RK[cat]=f}
 let s;try{s=_rv.apply(this,arguments)}finally{if(keep)RK[cat]=keep}
 try{if(on)s=s.replace('<p class="mut small">Você ainda não pontuou neste ranking.</p>','').replace('<p class="mut small">Você não está mais no circuito juvenil.</p>','');const i=s.indexOf('<table');if(i>=0)s=s.slice(0,i)+bcRkBar(cat,n)+(on&&!n?'<p class="small mut">Ninguém neste filtro.</p>':'')+s.slice(i)}catch(e){console.error(e)}return s}}
