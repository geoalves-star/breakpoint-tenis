// =============== v5.5 · ranking online entre amigos ===============
function v5RkOn(){if(!RKG1.some(x=>x[0]==='online'))RKG1.push(['online',()=>'Online'])}
let V5ON={list:null,fr:null,at:0,err:null,tab:'fr',busy:false};
function v5OnCfg(){try{return JSON.parse(localStorage.getItem('bp_online')||'{}')}catch(e){return{}}}
function v5OnSave(c){try{localStorage.setItem('bp_online',JSON.stringify(c))}catch(e){}}
const v5Rid=()=>Math.random().toString(36).slice(2,10).replace(/[^a-z0-9]/g,'x').padEnd(8,'x');
function v5OnSum(){const m=S.me,st=m.st;return{id:S.onl&&S.onl.id,nick:v5OnCfg().nick||'Anônimo',circ:CIRC(),pais:COUNTRIES[m.c][0],best:st.hiPro||0,titles:(st.titles||[]).length,slams:(st.titles||[]).filter(t=>t.tier==='GS').length,w:st.w,l:st.l,prize:st.prize||0,age:meAge(),ended:!!S.ended}}
async function v5OnSync(force){if(QUIET||SIMALL||!S||!S.me||!S.onl||!S.onl.id)return;if(!force&&Date.now()-(S.onl.at||0)<5*60e3)return;S.onl.at=Date.now();try{const r=await fetch('/api/ranking',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(v5OnSum())});if(!r.ok)throw new Error(r.status)}catch(e){V5ON.err='off'}}
async function v5OnLoad(){if(V5ON.busy)return;V5ON.busy=true;V5ON.err=null;try{const c=v5OnCfg(),ids=[...(c.fr||[]),S.onl&&S.onl.id].filter(Boolean);
 const [g,f]=await Promise.all([fetch('/api/ranking?circ='+CIRC()).then(r=>r.ok?r.json():Promise.reject(r.status)),ids.length?fetch('/api/ranking?ids='+ids.join(',')).then(r=>r.ok?r.json():Promise.reject(r.status)):Promise.resolve({list:[]})]);
 V5ON.list=g.list||[];V5ON.fr=f.list||[];V5ON.at=Date.now()}catch(e){V5ON.err=e===503?'cfg':'off'}V5ON.busy=false;if(TAB==='rank'&&RKTAB==='online')render()}
function v5OnJoin(){const el=document.getElementById('v5nick'),nick=(el&&el.value||'').replace(/[<>"'`\\]/g,'').trim().slice(0,18);if(nick.length<2){TOAST='Escolha um apelido com pelo menos 2 letras';render();return}const c=v5OnCfg();c.nick=nick;v5OnSave(c);S.onl={id:v5Rid(),at:0};save();v5OnSync(true).then(()=>v5OnLoad());TOAST='Você entrou no ranking online';render()}
function v5OnAdd(){const el=document.getElementById('v5fcode'),code=(el&&el.value||'').trim().toLowerCase();if(!/^[a-z0-9]{6,12}$/.test(code)){TOAST='Código inválido';render();return}const c=v5OnCfg();c.fr=[...new Set([...(c.fr||[]),code])].slice(0,40);v5OnSave(c);TOAST='Amigo adicionado';v5OnLoad();render()}
function v5OnRem(code){const c=v5OnCfg();c.fr=(c.fr||[]).filter(x=>x!==code);v5OnSave(c);v5OnLoad();render()}
function v5OnLeave(){S.onl=null;save();render()}
function v5OnView(){const c=v5OnCfg();if(!S.onl){return `<div class="card"><h3>Ranking online</h3><p class="small">Compare sua carreira com amigos e com quem joga o Breakpoint. Só vão para o ranking um apelido e os números da carreira (melhor ranking, títulos, Slams, vitórias e prêmios). Nada de nome real, e-mail ou localização.</p><label class="small" for="v5nick">Seu apelido</label><input id="v5nick" maxlength="18" value="${esc(c.nick||'')}" placeholder="ex.: Saque de Ouro" style="width:100%;margin:6px 0 10px"><button class="full" onclick="v5OnJoin()">Entrar no ranking online</button></div>`}
 if(!V5ON.busy&&Date.now()-V5ON.at>60e3){setTimeout(()=>{v5OnSync();v5OnLoad()},0)}
 const me=S.onl.id,row=(e,i,fr)=>`<div class="v5onr ${e.id===me?'me':''}"><span class="v5onp">${i+1}</span><span class="v5onn"><b>${esc(e.nick)}${e.id===me?' (você)':''}</b><small>${esc(e.pais||'')} · ${e.circ} · melhor #${e.best||'—'} · ${e.titles} títulos${e.slams?` · ${e.slams} Slam${e.slams>1?'s':''}`:''}${e.ended?' · aposentado':''}</small></span><span class="v5ons">${e.score}</span>${fr&&e.id!==me?`<button class="ghost" aria-label="Remover amigo" onclick="v5OnRem('${e.id}')">×</button>`:''}</div>`;
 const err=V5ON.err==='cfg'?'O ranking online ainda não foi ativado no servidor do jogo.':V5ON.err==='off'?'Sem conexão com o ranking online agora. Ele funciona no site oficial do jogo, com internet.':'';
 const L=V5ON.tab==='fr'?V5ON.fr:V5ON.list;
 return `<div class="card"><div class="row sb"><h3 style="margin:0">Ranking online</h3><button class="ghost" onclick="v5OnLoad()">Atualizar</button></div>
 <p class="small" style="margin:6px 0 10px">Seu código de amigo: <b class="v5code">${me}</b> <button class="ghost" onclick="try{navigator.clipboard.writeText('${me}');TOAST='Código copiado';render()}catch(e){}">Copiar</button></p>
 <div class="row" style="gap:8px"><input id="v5fcode" maxlength="12" placeholder="Código de um amigo" style="flex:1"><button onclick="v5OnAdd()">Adicionar</button></div>
 <div class="chips v5tabs" style="margin-top:12px"><button class="${V5ON.tab==='fr'?'on':''}" onclick="V5ON.tab='fr';render()">Amigos</button><button class="${V5ON.tab==='all'?'on':''}" onclick="V5ON.tab='all';render()">Geral ${CIRC()}</button></div>
 ${err?`<p class="small" style="color:var(--gold)">${err}</p>`:''}${L==null?'<p class="small mut">Carregando…</p>':L.length?L.map((e,i)=>row(e,i,V5ON.tab==='fr')).join(''):`<p class="small mut">${V5ON.tab==='fr'?'Adicione amigos pelo código para comparar carreiras.':'Ninguém no ranking ainda.'}</p>`}
 <p class="xs mut" style="margin-top:10px">Pontos de carreira: 1.000 por Slam, 40 por título, até 1.000 pelo melhor ranking e 1 a cada 2 vitórias.</p><button class="ghost" onclick="v5OnLeave()">Sair do ranking online neste save</button></div>`}
{const _rv2=rankView;rankView=function(){v5RkOn();if(RKTAB!=='online')return _rv2();return v5Head('Classificação','Rankings','')+rankTabs()+v5OnView()}}
{const _ny3=newYear;newYear=function(){const r=_ny3();try{v5OnSync(true)}catch(e){}return r}}
