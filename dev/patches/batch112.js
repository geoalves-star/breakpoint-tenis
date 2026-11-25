// ===== v7.1: aposentados + Hall da Fama renovado =====
let RTF={y:'all',c:'all',o:'rk'},HFF='all';
// melhor ranking de cada jogador (atualizado toda semana)
function bcBkWeek(){try{if(!S||!S.pro||!RK||!RK.pro)return;for(const p of S.pro){const r=RK.pro[p.id];if(r&&(!p.bk||r<p.bk))p.bk=r}}catch(e){}}
{const _e=endWeek;endWeek=function(){const w0=S&&S.w;const r=_e.apply(this,arguments);if(S&&S.w!==w0)bcBkWeek();return r}}
function bcRetList(){if(!S.retd){S.retd=[];(S.hof||[]).filter(h=>!h.old&&!h.me).forEach(h=>S.retd.push({n:h.n,c:h.c,y:h.y,a:null,rk:null,bk:null,gs:h.gs||0,tit:h.tit||0,m1:0,wk1:h.wk1||0,hof:1}))}return S.retd}
function bcRetAdd(p,P){try{const st=(P&&P[p.n+'|'+p.c])||{},L=bcRetList();const rk=RK.pro[p.id]||null,bk=Math.min(p.bk||999,rk||999);
 L.push({id:p.id,n:p.n,c:p.c,y:year(),a:ageOf(p),rk,bk:bk<999?bk:null,gs:st.gs||0,tit:st.tit||0,m1:st.m1000||0,wk1:st.wk1||0,hof:0});
 if(L.length>1200){L.sort((a,b)=>(a.hof?0:1)-(b.hof?0:1)||(a.bk||999)-(b.bk||999));L.length=1000}}catch(e){console.error(e)}}
{const _h=hofCheck;hofCheck=function(p,P){bcRetAdd(p,P);const n0=(S.hof||[]).length;const r=_h.apply(this,arguments);if((S.hof||[]).length>n0){const L=bcRetList(),e=L[L.length-1];if(e&&e.n===p.n)e.hof=1;const h=S.hof[S.hof.length-1];h.id=p.id;h.bk=e&&e.bk;h.m1=e&&e.m1;h.a=e&&e.a}return r}}
{const _ec=endCareer;endCareer=function(why){const r=_ec.apply(this,arguments);try{const m=S.me,st=m.st,T=st.titles,L=bcRetList();if(!L.some(x=>x.me))L.push({me:1,n:m.name,c:m.c,y:year(),a:meAge(),rk:myRank('pro')||null,bk:st.hiPro||null,gs:T.filter(t=>t.tier==='GS').length,tit:T.length,m1:T.filter(t=>t.tier==='M1000').length,wk1:st.wk1||0,hof:(S.hof||[]).some(h=>h.me)?1:0});const h=(S.hof||[]).find(h=>h.me);if(h){h.bk=st.hiPro||null;h.m1=T.filter(t=>t.tier==='M1000').length;h.a=meAge()}}catch(e){console.error(e)}return r}}
const bcRetAv=e=>e.me?av(e.n,e.c,'sm',myAv()):e.id!=null?av(e.n,e.c,'sm',aiAv({id:e.id})):av(e.n,e.c,'sm');
const bcRetScore=e=>(e.gs||0)*40+(e.m1||0)*8+(e.tit||0)*2+(e.wk1||0)/2+(e.bk?Math.max(0,120-e.bk):0);
function bcRetView(){const L0=bcRetList(),y=year();
 const ys=[...new Set(L0.map(e=>e.y))].sort((a,b)=>b-a),cs=[...new Set(L0.map(e=>e.c))].filter(c=>COUNTRIES[c]).sort((a,b)=>COUNTRIES[a][1].localeCompare(COUNTRIES[b][1]));
 if(RTF.y!=='all'&&!ys.includes(+RTF.y))RTF.y='all';
 let L=L0.filter(e=>(RTF.y==='all'||e.y===+RTF.y)&&(RTF.c==='all'||String(e.c)===String(RTF.c)));
 L=L.slice().sort(RTF.o==='y'?(a,b)=>b.y-a.y||(a.bk||999)-(b.bk||999):(a,b)=>bcRetScore(b)-bcRetScore(a));
 const last=ys[0],nl=last?L0.filter(e=>e.y===last).length:0,nh=L0.filter(e=>e.hof).length;
 const head=`<div class="card bcreth"><div class="bcrethi">👋</div><div><h3 style="margin:0">Aposentados</h3><p class="xs mut" style="margin:2px 0 0">Todo mundo que pendurou a raquete desde o início da sua carreira. As aposentadorias são anunciadas na virada de cada temporada.</p></div></div>`;
 if(!L0.length)return head+`<div class="card"><p class="mut small" style="margin:0">Ninguém se aposentou ainda. A primeira lista sai na virada da temporada ${y}/${y+1}.</p></div>`;
 const stats=`<div class="g3 bcrets"><div class="pill"><b>${L0.length}</b><span>Aposentados</span></div><div class="pill"><b>${nl}</b><span>Em ${last}</span></div><div class="pill"><b>${nh}</b><span>No Hall da Fama</span></div></div>`;
 const fil=`<div class="bcrkf"><div class="bcrkc"><span>Ano</span><select onchange="RTF.y=this.value;render()"><option value="all">Todos</option>${ys.map(v=>`<option value="${v}"${String(RTF.y)===String(v)?' selected':''}>${v}</option>`).join('')}</select></div>
 <div class="bcrkc"><span>País</span><select onchange="RTF.c=this.value;render()"><option value="all">🌍 Todos</option>${cs.map(c=>`<option value="${c}"${String(RTF.c)===String(c)?' selected':''}>${flag(c)} ${esc(COUNTRIES[c][1])}</option>`).join('')}</select></div>
 <div class="bcrka"><span>Ordem</span><div class="chips"><button class="chip ${RTF.o==='rk'?'on':''}" onclick="RTF.o='rk';render()">Maiores carreiras</button><button class="chip ${RTF.o==='y'?'on':''}" onclick="RTF.o='y';render()">Mais recentes</button></div></div>
 <div class="xs mut">${L.length} jogador${L.length===1?'':'es'}${RTF.y!=='all'||RTF.c!=='all'?` · <a href="#" onclick="RTF={y:'all',c:'all',o:RTF.o};render();return false">limpar filtros</a>`:''}</div></div>`;
 const rows=L.slice(0,150).map(e=>{const chips=[e.bk?`<span class="bcrc">melhor #${e.bk}</span>`:'',e.gs?`<span class="bcrc g">🏆 ${e.gs} Slam${e.gs>1?'s':''}</span>`:'',e.tit?`<span class="bcrc">${e.tit} título${e.tit>1?'s':''}</span>`:'',e.wk1?`<span class="bcrc">${e.wk1} sem. nº 1</span>`:''].join('');
  return `<div class="bcretr${e.me?' me':''}${e.hof?' bchf':''}">${bcRetAv(e)}<div class="bcretb"><b>${flag(e.c)} ${esc(e.n)}${e.me?' (você)':''}${e.hof?' <span class="bchofb">🏛️ Hall da Fama</span>':''}</b><div class="xs mut">Aposentou em ${e.y}${e.a?' aos '+e.a+' anos':''}${e.rk?' · era #'+e.rk:''}</div><div class="bcrcs">${chips||'<span class="xs mut">Sem títulos no período</span>'}</div></div></div>`}).join('');
 return head+stats+`<div class="card">${fil}${rows||'<p class="small mut">Ninguém neste filtro.</p>'}${L.length>150?`<p class="xs mut">Mostrando os 150 primeiros de ${L.length}.</p>`:''}</div>`}
// ---- Hall da Fama renovado ----
const bcHofSc=h=>(h.gs||0)*10+(h.tit||0)+(h.wk1||0)/10;
function bcHofMe(){if(!S.me||S.cm||(S.hof||[]).some(h=>h.me))return'';let L;try{L=legacy()}catch(e){return''}const pct=Math.min(100,Math.round(L.sc/130*100));
 return `<div class="card bchofme"><div class="row sb"><b>🎯 Seu caminho até o Hall</b><span class="bchofp">${L.sc}/130</span></div><div class="bchofbar"><i style="width:${pct}%"></i></div>
 <p class="xs mut" style="margin:6px 0 0">${S.ended?'Sua carreira terminou sem a pontuação mínima para o Hall da Fama.':'Você entra ao se aposentar com 130 pontos de legado.'} Cada Grand Slam vale 40, ATP Finals 12, Masters 8, cada título 2, e chegar a nº 1 vale 60.</p></div>`}
function bcHofNext(){try{const P=personStats(),out=[];const seen=new Map();for(const p of S.pro){const k=p.n+'|'+p.c,o=seen.get(k);if(!o||ageOf(p)>ageOf(o))seen.set(k,p)}for(const p of seen.values()){const st=P[p.n+'|'+p.c];if(!st)continue;if(st.gs>=2||st.wk1>=30||st.tit>=20||(st.gs>=1&&st.tit>=10))out.push({p,st})}
 out.sort((a,b)=>bcHofSc(b.st)-bcHofSc(a.st));if(!out.length)return'';
 return `<div class="card"><h3 style="margin-top:0">🔮 Futuros membros</h3><p class="xs mut" style="margin-top:-4px">Ainda em atividade, já têm currículo para entrar quando se aposentarem.</p>${out.slice(0,6).map(({p,st})=>`<div class="spn" onclick="openP(${p.id})" style="cursor:pointer">${av(p.n,p.c,'sm',pAv(p))}<div style="flex:1"><b>${flag(p.c)} ${esc(p.n)}</b><div class="xs mut">${ageOf(p)} anos · ${RK.pro[p.id]?'#'+RK.pro[p.id]:'sem ranking'} · ${st.gs} Slams · ${st.tit} títulos</div></div></div>`).join('')}</div>`}catch(e){return''}}
hofView=function(){seedHof();const all=S.hof.slice().sort((a,b)=>bcHofSc(b)-bcHofSc(a)),rank=new Map(all.map((h,i)=>[h,i]));
 const L=all.filter(h=>HFF==='all'||(HFF==='old'?h.old:!h.old)),cls=[...new Set(S.hof.filter(h=>!h.old).map(h=>h.y))].sort((a,b)=>b-a);
 const hero=`<div class="card bchofh"><div class="bchofi">🏛️</div><h3>Hall da Fama do Tênis</h3><p>${S.hof.length} membros${cls.length?' · última turma: '+cls[0]:''}</p><p class="xs" style="opacity:.8;margin:6px 0 0">Entram ao se aposentar com 2+ Grand Slams, 30+ semanas como nº 1, 20+ títulos, ou 1 Slam e 10+ títulos.</p><button class="bchofl" onclick="RKTAB='ret';render();scrollTo(0,0)">👋 Ver todos os aposentados →</button></div>`;
 const fil=`<div class="chips" style="margin:0 0 10px"><button class="${HFF==='all'?'on':''}" onclick="HFF='all';render()">Todos</button><button class="${HFF==='new'?'on':''}" onclick="HFF='new';render()">Eleitos na sua era</button><button class="${HFF==='old'?'on':''}" onclick="HFF='old';render()">Lendas antigas</button></div>`;
 const pl=L.map(h=>{const i=rank.get(h),md=i<3?['🥇','🥈','🥉'][i]:'#'+(i+1),avh=h.me?av(h.n,h.c,'',myAv()):h.id!=null?av(h.n,h.c,'',aiAv({id:h.id})):av(h.n,h.c,'');
  return `<div class="bcplq${h.me?' me':''}${i<3?' top':''}"><div class="bcplqm">${md}</div>${avh}<div class="bcplqb"><b>${flag(h.c)} ${esc(h.n)}${h.me?' (você)':''}</b><div class="xs mut">${h.old?'Lenda de antes de 2017':'Turma de '+h.y}${h.a?' · aposentou aos '+h.a:''}</div>
  <div class="bcplqs"><div><b>${h.gs||0}</b><span>Slams</span></div><div><b>${h.tit||0}</b><span>Títulos</span></div><div><b>${h.wk1||0}</b><span>Sem. nº 1</span></div>${h.bk?`<div><b>#${h.bk}</b><span>Melhor</span></div>`:''}</div></div></div>`}).join('');
 return hero+bcHofMe()+`<div class="card">${fil}${pl||'<p class="small mut">Ninguém nesta lista ainda.</p>'}</div>`+bcHofNext()};
// aba nova no Circuito
function bcRetTab(){try{if(!RKG2.some(x=>x[0]==='ret')){const i=RKG2.findIndex(x=>x[0]==='hof');RKG2.splice(i+1,0,['ret',()=>'👋 Aposentados'])}}catch(e){}}
setTimeout(bcRetTab,0);
function bcTabCenter(){requestAnimationFrame(()=>{try{document.querySelectorAll('#app .chips').forEach(c=>{const b=c.querySelector('button.on');if(b&&c.scrollWidth>c.clientWidth)c.scrollLeft=b.offsetLeft-c.offsetLeft-c.clientWidth/2+b.offsetWidth/2})}catch(e){}})}
{const _rv=rankView;rankView=function(){bcRetTab();bcTabCenter();if(RKTAB==='ret'&&S&&S.me)return careerSeg()+tip('rankc')+`<div class="card">${rankTabs()}</div>`+bcRetView();return _rv.apply(this,arguments)}}
