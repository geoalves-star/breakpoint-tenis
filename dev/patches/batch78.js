// =============== v5.8: clareza — fonte legível, explicações em cada parte e guia "O que é cada coisa" ===============
const V5GLO=[
 ['Seus números (topo da tela)',[
  ['Ranking','Sua posição no mundo. Sobe conforme você soma pontos nos torneios. Valem os 18 melhores resultados dos últimos 12 meses. "JR" é o ranking juvenil (até 18 anos).'],
  ['Caixa','Seu dinheiro. Entra com prêmios e patrocínios; sai com viagens, inscrições, treinador e equipe. Ficar no negativo trava contratações.'],
  ['Energia','Seu cansaço. Cai jogando e treinando forte, volta descansando. Com energia baixa você rende menos e o risco de lesão sobe.'],
  ['Confiança','Seu momento. Vitórias aumentam, derrotas diminuem. Ajuda principalmente nos pontos decisivos (break points, tiebreaks).'],
  ['Linha da temporada','Cada tracinho é uma semana do ano. O tracinho com contorno é a semana atual; os dourados são os Grand Slams; os verdes são torneios que você marcou na agenda.']]],
 ['Torneios (do menor ao maior)',[
  ['Juvenil (J30 a J500)','Circuito até 18 anos. Os Slams juvenis são os maiores. Bons resultados dão convites para o profissional.'],
  ['ITF (M15, M25 / W15 a W100)','Primeiro degrau do profissional. Prêmios pequenos, poucos pontos, viagens baratas. É onde quase todo mundo começa.'],
  ['Challenger (50 a 175) / WTA 125','Segundo degrau. Mais pontos e prêmios; o caminho para o top 100.'],
  ['ATP / WTA 250 e 500','Circuito principal. Para entrar direto você precisa de ranking alto; senão, tente o qualifying.'],
  ['Masters 1000 / WTA 1000','Os maiores depois dos Slams. Para quem está no top 30, são obrigatórios.'],
  ['Grand Slam','Australian Open, Roland Garros, Wimbledon e US Open. 2000 pontos para o campeão, os maiores prêmios do ano.'],
  ['Finals','No fim do ano, só os 8 melhores do ranking jogam. Conta como bônus.']]],
 ['Como você entra num torneio',[
  ['Chave principal','A tabela do torneio. Entra direto quem tem ranking suficiente.'],
  ['Qualifying (quali)','Mini-torneio antes da chave principal, para quem não tem ranking para entrar direto. Ganhe as rodadas e você entra.'],
  ['Convite (wildcard)','Vaga dada pelo torneio. Mais fácil para jovens e para quem joga em casa.'],
  ['Lucky loser','Perdeu no quali, mas alguém desistiu: você entra no lugar.'],
  ['Cabeça de chave','Os melhores ranqueados ficam separados na tabela e só se enfrentam nas rodadas finais.'],
  ['Pontos a defender','Os pontos que você ganhou na mesma semana do ano passado saem do ranking. Se não repetir, você cai.']]],
 ['Sua semana',[
  ['Pauta da semana','O que fazer agora. O jogo sugere 3 caminhos (jogar um torneio, treinar ou descansar). Escolha um e toque no botão de baixo para fechar a semana.'],
  ['Metas da semana','Pequenos objetivos que dão bônus quando cumpridos.'],
  ['Na mesa','Decisões esperando você: propostas, convites, patrocínios. Abra e responda.'],
  ['Rival','O jogador que mais cruza o seu caminho. Vencer o rival mexe com a imprensa e a torcida.']]],
 ['Equipe e treino',[
  ['Treinador','Quanto mais estrelas, mais rápido você evolui e melhores as dicas na partida. Custa caro.'],
  ['Preparador, fisioterapeuta, psicólogo e nutricionista','Cada um melhora uma parte: físico, lesões, mental e recuperação.'],
  ['CT (base)','Onde você treina. Cidades diferentes custam e ajudam de jeitos diferentes.'],
  ['Atributos','Saque, forehand, backhand, voleio, físico, mental e devolução. Sobem com treino e jogos.']]],
 ['Na partida',[
  ['Jogar, assistir ou simular','Antes de cada partida você escolhe: jogar em tempo real, assistir os lances ou ir direto para o resultado.'],
  ['Plano de jogo','A tática da partida: equilibrada, agressiva, defensiva, saque e voleio ou atacar o backhand dele.'],
  ['Saque','Toque quando o marcador passar pela faixa verde. Deslize para o lado antes para mirar.'],
  ['Rebater','Toque quando o anel em volta da bola fechar e ficar verde. Deslize para o lado para mirar, para cima para atacar, para baixo para defender.'],
  ['Golpes especiais','Para cima curto: deixadinha. Para baixo longo: lob. Ataque bom: você sobe à rede.'],
  ['Placar','Pontos vão de 0, 15, 30, 40 até o game. 6 games fecham o set (com 2 de vantagem ou tiebreak). Vence quem ganhar 2 sets (3 nos Slams masculinos).']]]];
function v5GuideView(){return `<div class="modal"><div class="box"><button class="sec" onclick="INMENU=${S?'true':'false'};render()">← Voltar</button><h3 style="margin:12px 0 4px">O que é cada coisa</h3><p class="small mut" style="margin:0 0 12px">Guia rápido do jogo. Toque num tema para abrir.</p>
 ${V5GLO.map(([t,L],i)=>`<details class="v5glo"${i===0?' open':''}><summary>${esc(t)}</summary>${L.map(([k,d])=>`<div class="v5glr"><b>${esc(k)}</b><span>${esc(d)}</span></div>`).join('')}</details>`).join('')}</div></div>`}
function v5Guide(){INMENU='guia';render();window.scrollTo(0,0)}
{const _s=inMenuSub;inMenuSub=function(){if(INMENU==='guia')return v5GuideView();return _s()}}
{const _m=inMenuView;inMenuView=function(){let s=_m();try{s=s.replace(/(<button class="opt" onclick="INMENU='names';render\(\)">)/,`<button class="opt" onclick="v5Guide()">📖 O que é cada coisa<small>Guia rápido: ranking, torneios, equipe, partida.</small></button>$1`)}catch(e){}return s}}
// ---------- explicação ao tocar nos números do topo ----------
let V5TIP=null;
const V5TIPS={ranking:0,caixa:1,energia:2,confiança:3,temporada:4};
function v5Tip(k){const i=V5TIPS[k];const it=V5GLO[0][1][i];V5TIP=it?{t:it[0],d:it[1]}:null;v5TipShow()}
function v5TipShow(){let el=document.getElementById('v5tip');if(!V5TIP){if(el)el.remove();return}if(!el){el=document.createElement('div');el.id='v5tip';el.className='v5tip';document.body.appendChild(el)}
 el.innerHTML=`<div class="v5tipb" role="dialog" aria-label="${esc(V5TIP.t)}"><b>${esc(V5TIP.t)}</b><p>${esc(V5TIP.d)}</p><div class="g2"><button class="sec" onclick="V5TIP=null;v5TipShow();v5Guide()">Ver guia completo</button><button onclick="V5TIP=null;v5TipShow()">Entendi</button></div></div>`;el.onclick=e=>{if(e.target===el){V5TIP=null;v5TipShow()}}}
{const _h=v5Hdr;v5Hdr=function(){let s=_h();try{
 s=s.replace(/<div class="st k5"><span class="k5l">(Ranking[^<]*|Caixa|Energia|Confiança)<\/span>/g,(m0,l)=>{const k=/^Ranking/.test(l)?'ranking':l.toLowerCase();return `<div class="st k5" role="button" tabindex="0" onclick="v5Tip('${k}')" title="O que é isso?"><span class="k5l">${l} <i class="v5q">?</i></span>`});
 s=s.replace(/<div class="v5tlh"><span>(\d{4}) · semana (\d+) de 52<\/span>/,(m0,y,w)=>`<div class="v5tlh" role="button" onclick="v5Tip('temporada')"><span>Temporada ${y} · semana ${w} de 52 <i class="v5q">?</i></span>`);
 s=s.replace('</div></div>',`</div></div>`)}catch(e){}return s}}
// ---------- uma frase de ajuda no topo de cada aba ----------
const V5TABH={home:'Aqui você decide a semana: escolha um dos caminhos (torneio, treino ou descanso) e confirme no botão de baixo.',tour:'Calendário do ano. Toque num torneio para ver se você entra direto, pelo qualifying ou com convite.',train:'Sua equipe e o seu treino. Equipe melhor faz você evoluir mais rápido, mas custa dinheiro toda semana.',social:'Suas redes sociais. Posts e vitórias trazem seguidores, e seguidores trazem patrocínio.',rank:'Ranking do mundo. Sua posição vem da soma dos seus 18 melhores resultados dos últimos 12 meses.',me:'Seu perfil: atributos, títulos, álbum de vitórias e opções da carreira.'};
function v5TabHelpOff(t){OPTS.thOff=OPTS.thOff||{};OPTS.thOff[t]=1;try{localStorage.setItem('breakpoint_opts',JSON.stringify(OPTS))}catch(e){}render()}
{const _r=render0;render0=function(){_r();try{if(MENU||!S||INMENU||S.tour||S.ended||IM||LIVE)return;const t=TAB,h=V5TABH[t];if(!h||(OPTS.thOff&&OPTS.thOff[t]))return;const app=document.getElementById('app');if(app.querySelector('.v5tabh'))return;
 const sec=app.querySelector('#app .v5lede')||app.querySelector('.v5page section, section');const div=document.createElement('div');div.className='v5tabh';div.innerHTML=`<span>💡 ${esc(h)}</span><div><button class="ghost" onclick="v5Guide()">Guia</button><button class="ghost" onclick="v5TabHelpOff('${t}')" aria-label="Fechar dica">✕</button></div>`;
 if(sec&&sec.parentNode)sec.parentNode.insertBefore(div,sec.nextSibling);}catch(e){}}}
