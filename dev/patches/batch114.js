// ===== v7.3: sorteio de chave mais justo, anúncio do sorteio e emblemas próprios dos torneios =====
// ---------- 1) chaves: campos realistas por nível ----------
const BCTGT={pro:{C175:110,C125:150,C100:190,C75:240,C50:290,M25:380,M15:620},jr:{J300:90,J200:140,J100:190,J60:280,J30:420}};
const BCLIM={pro:{C175:20,C125:30,C100:45,C75:60,C50:80,M25:150,M15:250},jr:{J100:25,J60:60,J30:120}};
allocWeek=function(){S.draws={};S.played={};const evs=weekEvents(S.w);
 for(const cat of['pro','jr']){const ord=cat==='pro'?PRO_ORDER:JR_ORDER;const list=evs.filter(e=>TIERS[e.tier].cat===cat).sort((a,b)=>ord.indexOf(a.tier)-ord.indexOf(b.tier));
  let avail=ORD[cat].filter(id=>id!=='me'&&R()<(cat==='jr'&&IDX.get(id).r>58?.45:.8));
  for(const tier of ord){const grp=list.filter(e=>e.tier===tier);if(!grp.length)continue;const n=1<<(TIERS[tier].pts.length-1);
   if(tier==='OLY'){const cnt={},d=[];for(const id of ORD.pro){if(id==='me')continue;const c=IDX.get(id).c;cnt[c]=(cnt[c]||0);if(cnt[c]<4){cnt[c]++;d.push(id)}if(d.length>=64)break}S.draws[grp[0].key]=d;avail=avail.filter(id=>!d.includes(id));continue}
   if(tier==='EXH'){const d=ORD.pro.filter(x=>x!=='me').slice(0,8);S.draws[grp[0].key]=d;avail=avail.filter(id=>!d.includes(id));continue}
   if(tier==='NGF'){const d=ORD.pro.filter(id=>id!=='me'&&IDX.get(id)&&ageOf(IDX.get(id))<=20&&!(IDX.get(id).inj>0)).slice(0,8);S.draws[grp[0].key]=d;avail=avail.filter(id=>!d.includes(id));continue}
   if(tier==='FIN'){const d=raceOrd().filter(x=>x.id!=='me'&&!(IDX.get(x.id)&&IDX.get(x.id).inj>0)).slice(0,8).map(x=>x.id);S.draws[grp[0].key]=d;avail=avail.filter(id=>!d.includes(id));continue}
   const caps=grp.map(e=>typeof bcDrawN==='function'?bcDrawN(e):n),need=caps.reduce((a,b)=>a+b,0),lim=(BCLIM[cat]||{})[tier]||0;
   // quem é forte demais para o nível fica de fora (só entra se faltar gente)
   let keep=[];if(lim){keep=avail.filter(id=>(RK[cat][id]||9999)<=lim);avail=avail.filter(id=>(RK[cat][id]||9999)>lim)}
   const tg=(BCTGT[cat]||{})[tier];
   if(tg){// cada nível puxa quem tem ranking perto do nível dele (com sorte no meio)
    const sc={};for(const id of avail){const r=RK[cat][id]||(cat==='pro'?900:600);sc[id]=Math.abs(Math.log(r/tg))+R()*.55}avail.sort((a,b)=>sc[a]-sc[b])}
   else if(RANDOM_FILL.includes(tier))shuffle(avail);
   let take=avail.splice(0,need);
   if(take.length<need&&keep.length){keep.sort((a,b)=>(RK[cat][b]||9999)-(RK[cat][a]||9999));take=take.concat(keep.splice(0,need-take.length))}
   avail=keep.concat(avail);grp.forEach(e=>S.draws[e.key]=[]);{let k=0;for(const id of take){let tr=0;while(S.draws[grp[k%grp.length].key].length>=caps[k%grp.length]&&tr++<grp.length)k++;S.draws[grp[k%grp.length].key].push(id);k++}}}}};
// ---------- 2) entrada na chave: rival sem "marmelada" ----------
insertMe=function(){const T=S.tour,ev=curEv(),t=TIERS[ev.tier],n=1<<(t.pts.length-1);let d=[...S.draws[ev.key]].filter(x=>x!=='me');
 const rv=S.rival,rvOk=rv!=null&&RK[t.cat][rv]!==undefined&&S[t.cat].some(p=>p.id===rv);let addRv=false;
 if(rvOk&&!d.includes(rv)&&ev.tier!=='FIN'){const rks=d.map(id=>RK[t.cat][id]||9999).sort((a,b)=>a-b),lo=rks[0]||1,hi=rks[rks.length-1]||9999,r=RK[t.cat][rv]||9999,fits=r>=lo*.7&&r<=hi*1.2,met=S.hist.filter(h=>h.o===rv&&h.w>S.w-52).length;
  if(R()<(fits?(met<2?.4:.12):.06)){for(const k in S.draws)if(k!==ev.key)S.draws[k]=S.draws[k].filter(x=>x!==rv);addRv=true}}
 const cap=typeof bcDrawN==='function'?bcDrawN(ev):n;while(d.length>=cap)d.pop();d.push('me');if(addRv){if(d.length>=cap){let wi=-1,wr=-1;d.forEach((id,i)=>{if(id==='me')return;const r=RK[t.cat][id]||9999;if(r>wr){wr=r;wi=i}});if(wi>=0)d.splice(wi,1)}d.push(rv)}
 S.draws[ev.key]=d;T.br=makeBracket(d,t.cat,n);T.round=0;
 // de vez em quando o rival cai no mesmo quarto da chave (nunca forçado na estreia)
 {const br=T.br,ui=br.indexOf('me'),rvi=br.indexOf(rv);if(addRv&&rvi>=0&&n>=16&&R()<.25){const q=n/4,base=Math.floor(ui/q)*q;const sm=seedMap(br,t.cat),cand=[];for(let i=base;i<base+q;i++)if(i!==ui&&i!==(ui^1)&&br[i]!=null&&!sm[br[i]])cand.push(i);if(cand.length){const tg=cand[Math.floor(R()*cand.length)];[br[tg],br[rvi]]=[br[rvi],br[tg]]}}}
 T.brs=[T.br.slice()];T.seed=seedMap(T.br,t.cat);
 try{if(!QUIET)bcDrawAnn()}catch(e){console.error(e)}};
// ---------- 3) qualifying: cabeças de chave no qualifying também ----------
qualiOpp=function(t){const o=ORD[t.cat].filter(x=>x!=='me'),lo=Math.max(0,Math.min(t.cut,o.length-60)),hi=Math.max(lo+1,Math.min(t.q===BIG?o.length:t.q,o.length));const span=hi-lo,sd=Math.max(1,Math.round(span/4));
 const step=(S.tour&&S.tour.q&&S.tour.q.step)||0,last=S.tour&&S.tour.q&&step>=S.tour.q.n-1&&step>0;const seedP=last?.55:step?.4:.25;
 const i=R()<seedP?lo+Math.floor(R()*sd):lo+sd+Math.floor(R()*Math.max(1,span-sd));return o[Math.min(o.length-1,i)]};
// ---------- 4) anúncio do sorteio ----------
function bcSect(br,ui,size){const b=Math.floor(ui/size)*size,h=size/2,mine=Math.floor(ui/h)*h;const o=[];for(let i=b;i<b+size;i++)if(i<mine||i>=mine+h)if(br[i]!=null)o.push(br[i]);return o}
function bcBestOf(ids,cat){return ids.slice().sort((a,b)=>(RK[cat][a]||9999)-(RK[cat][b]||9999))[0]}
function bcDrawAnn(){const T=S.tour;if(!T||!T.br)return;const ev=curEv(),t=TIERS[ev.tier],cat=t.cat,br=T.br,n=br.length,ui=br.indexOf('me'),seed=T.seed||{},opp=br[ui^1];
 const rn=r=>{const left=Math.log2(n)-r;return left===0?'Final':left===1?'Semifinal':left===2?'Quartas':`${r+1}ª rodada`};
 const pc=(id,ns)=>{const rk=RK[cat][id];if(id==='me')return `${flag(S.me.c)} <b>Você</b> <span class="xs mut">${rk?'#'+rk:'sem ranking'}</span>`;const p=IDX.get(id);if(!p)return'';return `${flag(p.c)} <b>${esc(p.n)}</b>${seed[id]&&!ns?` <span class="bcsd">[${seed[id]}]</span>`:''} <span class="xs mut">${rk?'#'+rk:'sem ranking'}</span>`};
 let favTxt='',fav='';if(opp!=null){let v=null;try{v=winProb(opp)}catch(e){}if(v!=null){fav=v>=60?'g':v>=40?'n':'b';favTxt=v>=60?`Você é ${G('favorito','favorita')} (${v}%)`:v>=40?`Jogo equilibrado (${v}%)`:`Você é a zebra (${v}%)`}}
 const p=opp!=null?IDX.get(opp):null,[hw,hl]=opp!=null?h2h(opp):[0,0];
 const first=opp==null?`<div class="bcda"><b>Bye na estreia</b><p class="xs mut" style="margin:2px 0 0">Você começa direto na 2ª rodada.</p></div>`:
  `<div class="bcda">${av(p.n,p.c,'sm',pAv(p))}<div style="flex:1;min-width:0"><div class="xs mut">${rn(0)} · sua estreia</div><div>${pc(opp)}</div><div class="xs mut">${ageOf(p)} anos${hw+hl?` · confronto ${hw}-${hl}`:' · primeiro encontro'}${opp===S.rival?' · 🔥 seu rival':''}</div></div>${favTxt?`<span class="bcfav ${fav}">${favTxt}</span>`:''}</div>`;
 const path=[];for(let r=1;r<Math.min(4,Math.log2(n));r++){const ids=bcSect(br,ui,1<<(r+1));if(!ids.length)continue;const b=bcBestOf(ids,cat);path.push(`<li><span>${rn(r)}</span><span>provável: ${pc(b)}</span></li>`)}
 const sl=Object.entries(seed).sort((a,b)=>a[1]-b[1]).slice(0,4).map(([id,s])=>{const i=br.indexOf(isNaN(id)?id:+id),half=i>=0&&(i<n/2)===(ui<n/2);const me=id==='me';return `<li><span>[${s}]</span><span>${pc(isNaN(id)?id:+id,1)}</span><span class="xs ${me?'mut':half?'loss':'mut'}">${me?'':half?'no seu lado':'outro lado'}</span></li>`}).join('');
 const html=`<div class="bcdh">${emb(ev,52)}<div><b>${esc(ev.name)}</b><div class="xs mut">${esc(t.lbl)} · ${esc(SURFL[ev.surf]||ev.surf)} · ${esc(ev.city||'')} · chave de ${n}</div></div></div>${first}
  ${path.length?`<div class="bcdk">Seu caminho provável</div><ul class="bcdp">${path.join('')}</ul>`:''}${sl?`<div class="bcdk">Cabeças de chave</div><ul class="bcdp bcds">${sl}</ul>`:''}
  <p class="xs mut" style="margin:8px 0 0">${seed.me?`Você é cabeça de chave [${seed.me}]: só encontra outro cabeça a partir das rodadas finais.`:'Os cabeças de chave ficam separados até o fim. Quem não é cabeça pode cair contra qualquer um na estreia.'}</p>`;
 S.modals.push({k:'Sorteio da chave',e:'🎾',ti:`Saiu a chave do ${ev.name}`,q:'',html,o:[{l:'Vamos nessa',t:'Ir para a estreia',fx:{}},{l:'Ver a chave completa',t:'Abrir o quadro do torneio',fx:{bcDrw:1}}]})}
{const _af=applyFx;applyFx=function(fx){const r=_af.apply(this,arguments);try{if(fx&&fx.bcDrw)DRAWV=true}catch(e){}return r}}
{const _ft=fxText;fxText=function(fx){if(fx&&(fx.bcDrw||fx.bcWdKeep)&&Object.keys(fx).length===1)return'';return _ft.apply(this,arguments)}}
// ---------- 5) emblemas próprios: cor do país, símbolo da cidade e formato do nível ----------
const BCPAL={AU:['#0b3d91','#f2b705'],FR:['#1d3f8f','#e24a3b'],GB:['#173a6b','#c8102e'],US:['#1b2f6b','#c8102e'],ES:['#b31d1d','#f2b705'],IT:['#1f7a3d','#c8102e'],DE:['#262626','#e0a400'],BR:['#138a45','#f2c200'],AR:['#3f86d4','#f6c33a'],CN:['#b71c1c','#f4c430'],JP:['#b0102a','#f1e7dc'],CA:['#b4141d','#f1f1f1'],MC:['#c8102e','#f1f1f1'],CH:['#c8102e','#f1f1f1'],NL:['#e2661b','#1f3b8f'],QA:['#7a1636','#f1f1f1'],AE:['#00732f','#c8102e'],MX:['#006847','#ce1126'],SE:['#00599c','#f9c900'],AT:['#c8102e','#f1f1f1'],HR:['#1f3b8f','#c8102e'],PT:['#00602a','#d41f1f'],KZ:['#0094b8','#f6c33a'],BE:['#262626','#f4c430'],NZ:['#1b2a5b','#c8102e'],HK:['#c8102e','#f1f1f1'],RO:['#1f3b8f','#f6c33a'],MA:['#b31d1d','#1f7a3d'],CL:['#1f3b8f','#d52b1e'],CO:['#1f3b8f','#f6c33a'],PE:['#c8102e','#f1f1f1'],UY:['#2a62b8','#f6c33a'],PY:['#c8102e','#1f3b8f'],EG:['#a51c1c','#e8c15a'],TN:['#c8102e','#f1f1f1'],KR:['#1f3b8f','#c8102e'],TW:['#1f3b8f','#c8102e'],IN:['#d9701a','#138a45'],FI:['#1f4fa0','#f1f1f1'],CZ:['#1f3b8f','#c8102e']};
const BCGSP={Melbourne:['#0a6fc2','#62d2f2'],Paris:['#b9522a','#e8c15a'],Londres:['#1f5e3a','#efe6cf'],'Nova York':['#1c2f6b','#3a9be6']};
const BCMOT={Melbourne:'sun',Paris:'tower',Londres:'crown','Nova York':'sky','Indian Wells':'peak',Miami:'wave','Monte Carlo':'sail',Madri:'castle',Roma:'column',Toronto:'leaf',Cincinnati:'bridge',Xangai:'pagoda',Turim:'crown',Dallas:'star',Roterdã:'wind',Doha:'dome','Rio de Janeiro':'peak',Dubai:'sky',Acapulco:'wave',Barcelona:'sun',Munique:'castle',Hamburgo:'light',Halle:'flower',Washington:'dome',Pequim:'pagoda',Tóquio:'flower',Basileia:'bridge',Viena:'column',Brisbane:'sun','Hong Kong':'sky',Adelaide:'wave',Auckland:'sail',Montpellier:'sun','Delray Beach':'palm',Houston:'star',Marrakech:'dome',Bucareste:'castle',Genebra:'sail',Stuttgart:'castle',"'s-Hertogenbosch":'wind',Mallorca:'wave',Eastbourne:'light',Båstad:'sail',Gstaad:'peak',Umag:'wave',Kitzbühel:'peak',Estoril:'light','Los Cabos':'wave','Winston-Salem':'leaf',Chengdu:'leaf',Hangzhou:'pagoda',Almaty:'peak',Lyon:'bridge',Bruxelas:'column',Estocolmo:'crown',Santiago:'peak','Buenos Aires':'sun',Santos:'wave',Florianópolis:'light',Cancún:'palm','Sharm el-Sheikh':'sun',Monastir:'wave',Oeiras:'light',Barletta:'castle',Busan:'wave',Yokohama:'bridge',Montevidéu:'light',Bogotá:'peak',Ningbo:'pagoda',Taipei:'sky',Bengaluru:'flower',Lima:'wave',Helsinki:'sail',Canberra:'leaf',Ottawa:'leaf',Monterrey:'peak',Praga:'castle',Heilbronn:'leaf',Sevilha:'sun',Todi:'column',Milão:'dome',Offenbach:'bridge',Birmingham:'bridge',Ilkley:'peak',Nottingham:'castle',Surbiton:'flower','São Paulo':'sky',Brasília:'dome',Curitiba:'leaf','Porto Alegre':'sun','Belo Horizonte':'peak',Campinas:'leaf',Córdoba:'sun',Assunção:'flower',Indianápolis:'star',Orléans:'castle',Brest:'light','Aix-en-Provence':'flower',Osaka:'castle',Bradenton:'palm',Plantation:'palm','Abu Dhabi':'dome'};
function bcMot(k,c,c2){const s=`fill="${c}"`,st=`fill="none" stroke="${c}" stroke-linecap="round" stroke-linejoin="round"`;switch(k){
 case 'sun':return `<circle cx="50" cy="44" r="10" ${s}/>`+Array.from({length:8},(_,i)=>{const a=i*Math.PI/4,x1=50+15*Math.cos(a),y1=44+15*Math.sin(a),x2=50+21*Math.cos(a),y2=44+21*Math.sin(a);return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" ${st} stroke-width="4"/>`}).join('');
 case 'wave':return `<path d="M27 40 q6 -7 12 0 t12 0 t12 0 t12 0" ${st} stroke-width="4.5"/><path d="M27 51 q6 -7 12 0 t12 0 t12 0 t12 0" ${st} stroke-width="4.5" opacity=".75"/>`;
 case 'palm':return `<path d="M50 66 C 49 54, 49 44, 52 32" ${st} stroke-width="4"/><path d="M52 32 C 44 24, 34 27, 30 34 M52 32 C 60 24, 70 27, 73 34 M52 32 C 47 26, 46 20, 49 16 M52 32 C 58 27, 63 22, 62 17" ${st} stroke-width="4"/>`;
 case 'peak':return `<path d="M24 62 L42 32 L52 46 L60 36 L76 62 Z" ${s}/><path d="M38 39 L42 32 L46 38 L43 37 Z" fill="${c2}"/>`;
 case 'tower':return `<path d="M50 20 L56 44 L62 64 L56 64 L50 52 L44 64 L38 64 L44 44 Z" ${s}/><path d="M42 45 H58" stroke="${c2}" stroke-width="2.5"/><path d="M44 36 H56" stroke="${c2}" stroke-width="2"/>`;
 case 'sky':return `<path d="M28 64 V44 H36 V64 M38 64 V30 H47 V64 M49 64 V38 H57 V64 M59 64 V26 H66 V64 M68 64 V46 H74 V64" ${s}/>`;
 case 'crown':return `<path d="M28 58 L30 34 L41 46 L50 28 L59 46 L70 34 L72 58 Z" ${s}/><circle cx="50" cy="26" r="3.5" ${s}/>`;
 case 'sail':return `<path d="M50 22 L50 58 L28 58 Z" ${s}/><path d="M54 30 L54 58 L72 58 Z" ${s} opacity=".8"/><path d="M26 63 H74" ${st} stroke-width="4"/>`;
 case 'castle':return `<path d="M28 64 V36 H34 V42 H40 V36 H46 V42 H54 V36 H60 V42 H66 V36 H72 V64 Z" ${s}/><path d="M46 64 V54 a4 4 0 0 1 8 0 V64 Z" fill="${c2}"/>`;
 case 'column':return `<path d="M26 34 L50 22 L74 34 Z" ${s}/><path d="M33 38 V60 M43 38 V60 M57 38 V60 M67 38 V60" ${st} stroke-width="5"/><path d="M27 64 H73" ${st} stroke-width="4"/>`;
 case 'leaf':return `<path d="M50 20 L54 33 L66 28 L61 40 L73 44 L60 50 L64 58 L52 55 L50 66 L48 55 L36 58 L40 50 L27 44 L39 40 L34 28 L46 33 Z" ${s}/>`;
 case 'bridge':return `<path d="M24 58 H76" ${st} stroke-width="4"/><path d="M26 58 Q50 22 74 58" ${st} stroke-width="4"/><path d="M38 58 V44 M50 58 V38 M62 58 V44" ${st} stroke-width="2.5"/>`;
 case 'pagoda':return `<path d="M50 20 L50 26" ${st} stroke-width="3"/><path d="M34 34 Q50 24 66 34 Z M30 46 Q50 36 70 46 Z M26 58 Q50 48 74 58 Z" ${s}/><path d="M40 36 H60 V44 H40 Z M37 48 H63 V56 H37 Z" ${s} opacity=".8"/>`;
 case 'star':return `<path d="M50 22 L57 38 L75 39 L61 50 L66 67 L50 57 L34 67 L39 50 L25 39 L43 38 Z" ${s}/>`;
 case 'dome':return `<path d="M30 62 V54 a20 20 0 0 1 40 0 V62 Z" ${s}/><path d="M50 34 V24" ${st} stroke-width="3"/><circle cx="50" cy="22" r="3" ${s}/><path d="M26 64 H74" ${st} stroke-width="4"/>`;
 case 'light':return `<path d="M45 64 L47 34 H53 L55 64 Z" ${s}/><path d="M44 34 H56 V28 H44 Z" ${s}/><path d="M50 28 V22" ${st} stroke-width="3"/><path d="M36 30 L42 31 M64 30 L58 31" ${st} stroke-width="3"/><path d="M47 42 H53 M46 52 H54" stroke="${c2}" stroke-width="3"/>`;
 case 'wind':return `<path d="M46 64 L48 42 H52 L54 64 Z" ${s}/><g transform="rotate(20 50 38)"><path d="M50 38 L50 18 L56 20 L52 38 Z M50 38 L70 38 L68 44 L50 40 Z M50 38 L50 58 L44 56 L48 38 Z M50 38 L30 38 L32 32 L50 36 Z" ${s}/></g>`;
 case 'flower':return Array.from({length:6},(_,i)=>{const a=i*Math.PI/3,x=50+11*Math.cos(a),y=44+11*Math.sin(a);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" ${s}/>`}).join('')+`<circle cx="50" cy="44" r="6" fill="${c2}"/>`;
 default:return `<circle cx="50" cy="44" r="17" ${s}/><path d="M38 33 C 46 39, 46 50, 38 56 M62 33 C 54 39, 54 50, 62 56" stroke="${c2}" stroke-width="3" fill="none"/>`}}
let BCEN=0;
function bcDk(c,f){const m=/^#([0-9a-f]{6})$/i.exec(c);if(!m){const h=/hsl\((\d+) (\d+)% (\d+)%\)/.exec(c);return h?`hsl(${h[1]} ${h[2]}% ${Math.round(h[3]*(1-f))}%)`:c}const n=parseInt(m[1],16),k=1-f;return '#'+[n>>16,(n>>8)&255,n&255].map(v=>Math.round(v*k).toString(16).padStart(2,'0')).join('')}
const BCTT={M1000:'1000',A500:'500',A250:'250',C175:'CH 175',C125:'CH 125',C100:'CH 100',C75:'CH 75',C50:'CH 50',M25:'M25',M15:'M15',JGS:'JÚNIOR',J500:'J500',J300:'J300',J200:'J200',J100:'J100',J60:'J60',J30:'J30',FIN:'FINALS',EXH:'EXIBIÇÃO',OLY:'JOGOS'};
function bcEmb(ev,sz){const t=ev.tier,id='be'+(++BCEN),city=ev.city||'',gs=t==='GS'||t==='JGS';const P=(gs&&BCGSP[city])||BCPAL[ev.iso]||(()=>{const h=seedHash(city),H=h%360;return[`hsl(${H} 55% 32%)`,`hsl(${(H+40)%360} 75% 62%)`]})();
 const A=P[0],B=P[1],sf=(SURFC[ev.surf]||SURFC.hard)[0],mot=BCMOT[city]||['star','leaf','flower','sun','bridge','castle','column','ball'][seedHash(city)%8],big=sz>=56,lowT=t==='M15'||t==='M25'||t==='J30'||t==='J60',jr=t.startsWith('J');
 const lt=/^#f|^#e/i.test(B);const ink='#ffffff',band=B,bandInk=lt?'#1b1b1b':'#ffffff';
 let shape;const gr=`url(#${id})`,sw=3.2;
 if(gs){const leaves=Array.from({length:8},(_,i)=>{const a=(205+i*17)*Math.PI/180,x=50+44*Math.cos(a),y=50+44*Math.sin(a);return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6.5" ry="2.8" transform="rotate(${205+i*17+90} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#e8c15a"/><ellipse cx="${(100-x).toFixed(1)}" cy="${y.toFixed(1)}" rx="6.5" ry="2.8" transform="rotate(${-(205+i*17+90)} ${(100-x).toFixed(1)} ${y.toFixed(1)})" fill="#e8c15a"/>`}).join('');shape=`${leaves}<circle cx="50" cy="48" r="37" fill="${gr}" stroke="${B}" stroke-width="3.5"/><circle cx="50" cy="48" r="31.5" fill="none" stroke="#ffffff" stroke-width="1" opacity=".45"/>`}
 else if(t==='FIN'){const pts=Array.from({length:10},(_,i)=>{const r=i%2?24:46,a=-Math.PI/2+i*Math.PI/5;return(50+r*Math.cos(a)).toFixed(1)+','+(52+r*Math.sin(a)).toFixed(1)}).join(' ');shape=`<polygon points="${pts}" fill="${gr}" stroke="#e8c15a" stroke-width="3" stroke-linejoin="round"/>`}
 else if(t==='M1000')shape=`<path d="M50 5 L89 17 L85 57 C81 76 67 88 50 96 C33 88 19 76 15 57 L11 17Z" fill="${gr}" stroke="${B}" stroke-width="${sw}"/><path d="M50 5 L89 17 L88 26 L12 26 L11 17Z" fill="${B}" opacity=".9"/>`;
 else if(t==='A500')shape=`<polygon points="50,5 90,27 90,73 50,95 10,73 10,27" fill="${gr}" stroke="${B}" stroke-width="${sw}" stroke-linejoin="round"/>`;
 else if(t==='A250')shape=`<rect x="9" y="9" width="82" height="82" rx="22" fill="${gr}" stroke="${B}" stroke-width="${sw}"/>`;
 else if(t==='OLY')shape=`<path d="M34 2 L50 26 L66 2" fill="none" stroke="${B}" stroke-width="9"/><circle cx="50" cy="58" r="38" fill="${gr}" stroke="#e8c15a" stroke-width="4"/>`;
 else if(t==='EXH')shape=`<rect x="18" y="18" width="64" height="64" rx="10" transform="rotate(45 50 50)" fill="${gr}" stroke="${B}" stroke-width="${sw}"/>`;
 else if(jr&&!lowT)shape=`<path d="M50 6 L61 17 L77 15 L79 31 L92 42 L83 56 L87 72 L71 77 L63 92 L50 85 L37 92 L29 77 L13 72 L17 56 L8 42 L21 31 L23 15 L39 17 Z" fill="${gr}" stroke="${B}" stroke-width="2.6" stroke-linejoin="round"/>`;
 else if(lowT)shape=`<rect x="10" y="12" width="80" height="76" rx="14" fill="${gr}" stroke="${B}" stroke-width="2.4"/>`;
 else shape=`<circle cx="50" cy="50" r="42" fill="${gr}" stroke="${B}" stroke-width="${sw}"/><circle cx="50" cy="50" r="35" fill="none" stroke="#ffffff" stroke-width="1" opacity=".35"/>`;
 const oy=t==='OLY'?10:t==='M1000'?6:0;
 const mono=monogram(ev),motif=lowT&&!big?`<text x="50" y="47" text-anchor="middle" dominant-baseline="central" font-family="'Barlow Condensed',system-ui,sans-serif" font-weight="900" font-size="${mono.length>=3?26:32}" fill="${ink}">${esc(mono)}</text>`:`<g transform="translate(50 ${45+oy}) scale(${gs?.86:.84}) translate(-50 -44)">${bcMot(mot,ink,band)}</g>`;
 const tag=BCTT[t]||'',cityS=city.replace(/^'s-/,'').toUpperCase(),cs=cityS.length>11?cityS.slice(0,10)+'.':cityS;
 const label=big?`<rect x="${gs?18:16}" y="${66+oy}" width="${gs?64:68}" height="15" rx="4" fill="${band}"/><text x="50" y="${74+oy}" text-anchor="middle" dominant-baseline="central" font-family="'Barlow Condensed',system-ui,sans-serif" font-weight="800" font-size="${cs.length>8?9:10.5}" letter-spacing=".6" fill="${bandInk}">${esc(cs)}</text>`:
  `<rect x="${gs?30:28}" y="${66+oy}" width="${gs?40:44}" height="12" rx="3.5" fill="${band}"/>`+(gs?`<path d="M38 ${72+oy} h0 M46 ${72+oy} h0 M54 ${72+oy} h0 M62 ${72+oy} h0" stroke="${bandInk}" stroke-width="3.4" stroke-linecap="round"/>`:`<text x="50" y="${72.5+oy}" text-anchor="middle" dominant-baseline="central" font-family="'Barlow Condensed',system-ui,sans-serif" font-weight="800" font-size="${tag.length>4?8:9.5}" fill="${bandInk}">${esc(tag.replace('CH ',''))}</text>`);
 const tierTop=big&&tag&&!gs&&!['FIN','OLY','EXH'].includes(t)?`<text x="50" y="${t==='M1000'?15.5:88}" text-anchor="middle" dominant-baseline="central" font-family="'Barlow Condensed',system-ui,sans-serif" font-weight="800" font-size="7.5" letter-spacing=".8" fill="${t==='M1000'?bandInk:ink}" opacity=".92">${esc(tag)}</text>`:'';
 return `<svg viewBox="0 0 100 100" width="${sz}" height="${sz}" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${A}"/><stop offset="1" stop-color="${bcDk(A,.38)}"/></linearGradient></defs>${shape}${motif}${label}${tierTop}</svg>`}
{const _em=emblemSVG;emblemSVG=function(ev,sz){try{if(ev&&v5LogoOf(ev.name))return _em(ev,sz);if(ev)return bcEmb(ev,sz)}catch(e){console.error(e)}return _em(ev,sz)}}
