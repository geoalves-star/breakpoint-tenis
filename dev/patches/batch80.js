// =============== v5.8: pendências obrigatórias e avançar só uma semana por vez ===============
function v5Must(){if(!S||!S.me||S.ended)return[];const m=S.me,L=[];
 if(!isPro()&&meAge()>=17&&m.jrDec!==year())L.push({id:'pro',t:'Decida: virar profissional agora?',d:'Profissional, você entra no ranking ATP/WTA e joga ITF e Challengers. No juvenil, você segue jogando os torneios juvenis até os 18 anos.',b:[['Virar profissional','v5MustPro(1)'],['Seguir no juvenil este ano','v5MustPro(0)']]});
 const un=dmUnread();if(un)L.push({id:'dm',t:`Responda ${un} mensage${un>1?'ns':'m'}`,d:'Patrocinadores, imprensa e fãs esperam resposta. Responder mexe com a sua imagem e pode render dinheiro.',b:[['Abrir mensagens',"SOCTAB='dm';go('social')"]]});
 if(m.chron&&(m.chronAck==null||S.w-m.chronAck>=26))L.push({id:'chron',t:`Decida o que fazer com a dor no ${m.chron.p}`,d:'A dor crônica tira rendimento e aumenta o risco de lesão. O tratamento intensivo custa US$ 80 mil e deixa você 3 semanas fora, com 55% de chance de curar.',b:[[m.money>=80000?'Tratar agora (US$ 80 mil)':'Tratar (falta dinheiro)',m.money>=80000?'chronTreat()':"ACCO.chron=true;go('train')"],['Conviver com a dor por enquanto','v5MustChron()']]});
 return L}
function v5MustChron(){S.me.chronAck=S.w;news(`🦴 Você decidiu seguir jogando com a dor no ${S.me.chron.p}. A decisão volta daqui a 6 meses.`);save();render()}
function v5MustPro(y){const m=S.me;if(y)turnPro();else{m.jrDec=year();news('🎾 Você decidiu seguir no circuito juvenil por mais uma temporada.')}save();render()}
const v5Blocked=()=>!QUIET&&!SIMALL&&!!S&&v5Must().length>0;
function v5BlockMsg(){const n=v5Must().length;TOAST=`Resolva ${n>1?`as ${n} pendências obrigatórias`:'a pendência obrigatória'} para avançar a semana.`;TAB='home';render();window.scrollTo(0,0)}
for(const fn of['train','rest','enter']){const _f=window[fn];window[fn]=function(){if(v5Blocked()){v5BlockMsg();return}return _f.apply(this,arguments)}}
// avançar várias semanas não existe mais: uma semana por vez
quickSim=function(){TOAST='Avance uma semana por vez: escolha o que fazer e confirme.';TAB='home';render()};
autoAdvance=function(){TOAST='Avance uma semana por vez: escolha o que fazer e confirme.';TAB='home';render()};
{const _r=render0;render0=function(){_r();try{document.querySelectorAll('#app button[onclick^="quickSim("],#app button[onclick^="autoAdvance("]').forEach(b=>b.remove());
 if(S&&!MENU&&v5Must().length){document.querySelectorAll('#app .v5bar button').forEach(b=>{b.disabled=true;b.title='Resolva as pendências obrigatórias'})}}catch(e){}}}
// pendências obrigatórias na tela da semana
{const _vh=v5Home;v5Home=function(){let s=_vh();try{const M=v5Must();s=s.replace(/<div class="v5links">([^]*?)<\/div>/,(m0,inner)=>`<div class="v5links">${inner.replace(/<button[^>]*onclick="quickSim\(\)"[^>]*>[^<]*<\/button>/,'')}</div>`);
 if(M.length){const card=`<div class="v5must"><div class="v5musth"><span class="v5tdi">!</span><span><b>Obrigatório antes de avançar</b><small>${M.length>1?`${M.length} coisas precisam da sua resposta`:'Uma coisa precisa da sua resposta'} para a semana seguir.</small></span></div>${M.map(x=>`<div class="v5musti"><b>${esc(x.t)}</b><span>${esc(x.d)}</span><div class="v5mustb">${x.b.map(([l,a],i)=>`<button class="${i?'sec':''}" onclick="${a.replace(/"/g,'&quot;')}">${esc(l)}</button>`).join('')}</div></div>`).join('')}</div>`;
  {const i=s.search(/<(details|div) class="v5todo/);if(i>=0)s=s.slice(0,i)+card+s.slice(i)}
  s=s.replace(/(<button class="full big v5conf") ([^>]*)>/,'$1 disabled $2>').replace(/(<button class="full big v5conf"[^>]*>[^<]*<\/button>)/,'$1<div class="xs" style="margin-top:6px;color:var(--bad)">Resolva o que está em "Obrigatório" lá em cima para liberar.</div>');
  // a pendência de virar profissional não precisa aparecer de novo entre as opcionais
  s=s.replace(/<button class="pend" onclick="go\('tour'\)"><span>Decida se vira profissional<\/span><i>›<\/i><\/button>/,'').replace(/<button class="pend" onclick="SOCTAB='dm';go\('social'\)"><span>\d+ mensage[^<]*<\/span><i>›<\/i><\/button>/,'');const n=(s.match(/<button class="pend"/g)||[]).length;s=s.replace(/<span class="v5cnt">\d+<\/span>/,`<span class="v5cnt">${n}</span>`);if(!n)s=s.replace(/<details class="v5todo"[^]*?<\/details>/,'')}}catch(e){console.error(e)}return s}}

// =============== v5.8: tutorial inicial refeito (6 passos, alinhado à tela nova) ===============
let V5TUTD=0;function v5TutFix(){if(V5TUTD)return;V5TUTD=1;TUT.length=0;TUT.push(
 {tab:'home',t:'👋 Bem-vindo ao Breakpoint Tênis!',d:'Você comanda uma carreira do juvenil ao topo do mundo. Toda semana são só 2 passos: escolher o que fazer (jogar um torneio, treinar ou descansar) e confirmar no botão grande.'},
 {tab:'home',t:'🔴 Pendências',d:'Se aparecer o cartão vermelho "Obrigatório antes de avançar", responda ali mesmo: a semana só segue depois disso. As pendências amarelas são opcionais, mas ajudam.'},
 {tab:'home',t:'📊 Seus números',d:'No topo ficam Ranking, Caixa, Energia e Confiança. Toque em qualquer um (no "?") para ver o que é. A linha embaixo é o ano: cada tracinho é uma semana.'},
 {tab:'tour',t:'🎾 Torneios',d:'Aqui está o calendário. Cada torneio diz se você entra direto, pelo qualifying ou só com convite. Até os 17 anos você joga o juvenil; depois decide quando virar profissional.'},
 {tab:'train',t:'💪 Equipe',d:'Treinador e equipe fazem você evoluir mais rápido, mas custam dinheiro toda semana. Comece com pouco e contrate conforme os prêmios entram.'},
 {tab:'home',t:'🏁 Na partida',d:'Antes de cada jogo: "Entrar em quadra" para jogar em tempo real, ou "Preparar partida" para escolher assistir, simular e a tática. Dúvidas? Menu ☰ → "O que é cada coisa". Boa sorte!'});}
{const _tv=tutView;tutView=function(){v5TutFix();return _tv()}}{const _tg=tutGo;tutGo=function(i){v5TutFix();return _tg(i)}}

// ---------- guias em passos nas abas Torneios e Equipe ----------
function v5GuideCard(id,title,steps,extra){const off=OPTS.gdOff&&OPTS.gdOff[id];return `<details class="v5gd"${off?'':' open'} ontoggle="OPTS.gdOff=OPTS.gdOff||{};OPTS.gdOff['${id}']=!this.open;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}"><summary><b>${title}</b><i>›</i></summary><div class="v5gdb">${steps.map((t,i)=>`<div class="v5step"><span class="v5stn">${i+1}</span><div><b>${t[0]}</b><small>${t[1]}</small></div></div>`).join('')}${extra||''}</div></details>`}
{const _tw=tourWeekView;tourWeekView=function(){const s=_tw();try{if(TOURTAB&&TOURTAB!=='week')return s;
 const leg=`<div class="v5leg"><span><b class="lg g">Inscrever</b> você entra direto na chave</span><span><b class="lg y">Qualifying</b> precisa ganhar o quali antes</span><span><b class="lg b">Pedir convite</b> só entra se o torneio aceitar</span><span><b class="lg r">Sem ranking</b> ainda não dá para entrar</span></div>`;
 return v5GuideCard('tour','Como escolher um torneio',[['Veja os torneios desta semana','Cada cartão mostra categoria, piso, pontos, prêmio e o custo da viagem saindo da sua base.'],['Confira o botão de cada um','O texto do botão diz como você entra (veja abaixo).'],['Toque para se inscrever','A partida aparece na aba Semana. Só dá para jogar um torneio por semana.']],leg)+s}catch(e){return s}}}
{const _tr=trainView;trainView=function(){const s=_tr();try{const c=weekCost(),inc=fedSupport()+sponPay()+brandInc();
 const g=v5GuideCard('train','Como montar sua equipe',[['Escolha o plano de treino','Use um modelo pronto e a intensidade. Depois o jogador segue sozinho, toda semana.'],['Contrate um treinador primeiro','É quem mais acelera a evolução. Os de mais estrelas só aceitam quem tem ranking melhor.'],['Acompanhe o custo','Toda a equipe é paga por semana. Contrate o resto conforme os prêmios entram.']],`<div class="v5gdm"><span>Gasto por semana<b>${money(c)}</b></span><span>Entra por semana<b>${money(inc)}</b></span><span>Caixa<b>${money(S.me.money)}</b></span></div><div class="xs mut" style="margin-top:6px">Viagens de torneio são cobradas à parte, quando você se inscreve.</div>`);const i=s.indexOf('</section>');return i>=0?s.slice(0,i+10)+g+s.slice(i+10):g+s}catch(e){return s}}}
