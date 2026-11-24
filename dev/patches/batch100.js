// =============== v6.6 · níveis de técnico (1 a 10) em todos os modos ===============
const BCLVN=['','Iniciante','Iniciante','Regional','Regional','Nacional','Nacional','Internacional','Internacional','Elite','Elite'];
const bcLvName=lv=>BCLVN[clamp(lv|0,1,10)];
// técnicos do circuito: nível de partida pela categoria (★ = 1, ★★★★★ = 9) e teto de crescimento
function bcCoLv(c){if(!c)return 0;if(c.lv==null){c.lv=c.club?1:clamp(c.q*2-1+(c.ex&&c.q>=3?1:0),1,10);c.lxp=0}return c.lv}
const bcCoCap=c=>c.fam?2:c.club?3:Math.min(10,(c.q||1)*2+1);
const bcCoNeed=lv=>40*lv;
// modo treinador: seu nível vem da experiência acumulada
const BCLVX=[0,0,30,120,270,480,750,1080,1470,1920,2430];
function bcMyLv(){const c=S.cm;if(!c)return 0;const t=c.txp||0;let lv=1;for(let i=2;i<=10;i++)if(t>=BCLVX[i])lv=i;return lv}
const bcLvMul=lv=>1.1+.115*lv;
// treino: o nível do técnico define o quanto o treino rende
{const _cm=bcCoM;bcCoM=function(){try{if(bcV2())return bcLvMul(bcMyLv());const c=myCoach();if(c){const lv=bcCoLv(c);return c.fam?1+.1*lv:bcLvMul(lv)}}catch(e){}return _cm()}}
// vagas e reputação no modo treinador
{const _s=bcSlots;bcSlots=function(){const n=_s();if(!bcV2())return n;const lv=bcMyLv();return Math.min(3,n+(lv>=4?1:0)+(lv>=8?1:0))}}
{const _r=bcRepB;bcRepB=function(){return _r()+(bcV2()&&bcMyLv()>=6?1:0)}}
// experiência: técnico contratado cresce com você; no modo treinador, você cresce
function bcLvWeek(){const m=S.me;const dw=Math.max(0,m.st.w-(m._lw10??m.st.w)),tt=m.st.titles.length+m.st.jrTitles.length,dt=Math.max(0,tt-(m._lt10??tt));m._lw10=m.st.w;m._lt10=tt;
 if(bcV2()){const c=S.cm,l0=bcMyLv();const aw=(c.tro||[]).length,da=Math.max(0,aw-(c._ltro??aw));c._ltro=aw;c.txp=(c.txp||0)+1+dw*2+dt*15+da*30;const l1=bcMyLv();if(l1>l0)bcLvUp(l1,true);return}
 const c=myCoach();if(!c)return;bcCoLv(c);c.lxp=(c.lxp||0)+1+dw*2+dt*10;const cap=bcCoCap(c);
 while(c.lv<cap&&c.lxp>=bcCoNeed(c.lv)){c.lxp-=bcCoNeed(c.lv);c.lv++;if(!c.club&&!c.fam&&c.sal>0)c.sal=Math.round(c.sal*1.08);bcLvUp(c.lv,false,c)}
 if(c.lv>=cap)c.lxp=Math.min(c.lxp,bcCoNeed(c.lv))}
function bcLvUp(lv,mine,c){const nm=mine?S.cm.n:c.n,tn=bcLvName(lv);
 if(mine){const fx=[`treino ${Math.round((bcLvMul(lv)-1)*100)}% mais rendoso`];if(lv===4||lv===8)fx.push('+1 vaga na equipe');if(lv===6)fx.push('+1 estrela de reputação');
  news(`📈 Você subiu para o nível ${lv}: ${G('técnico','técnica')} ${tn.toLowerCase()}.`);S.modals.push({k:'Nível',e:'📈',ti:`Nível ${lv} · ${tn}`,q:`Sua experiência no circuito cresceu. Agora: ${fx.join(', ')}.`,o:[{l:'Continuar',t:'Mais experiência vem de vitórias, títulos e prêmios',fx:{}}]})}
 else{news(`🧑‍🏫 ${nm} subiu para o nível ${lv} (${tn.toLowerCase()}): o treino rende mais${c.sal>0?` e o salário vai para ${money(c.sal)}/sem`:''}.`);TOAST=`${nm.split(' ')[0]} subiu para o nível ${lv}.`}}
{const _ew=endWeek;endWeek=function(){const w0=S&&S.w;const r=_ew.apply(this,arguments);try{if(S&&S.me&&!S.ended&&S.w!==w0)bcLvWeek()}catch(e){console.error(e)}return r}}
// painel do nível
function bcLvBar(lv,x,need,cap,lbl){const top=lv>=cap;return `<div class="bclv"><div class="bclvh"><b>Nível ${lv}</b><span>${bcLvName(lv)}</span>${lbl?`<em>${lbl}</em>`:''}</div><div class="bclvt">${[1,2,3,4,5,6,7,8,9,10].map(i=>`<u class="${i<=lv?'on':''}${i>cap?' x':''}"></u>`).join('')}</div><div class="xs mut">${top?(lv>=10?'Nível máximo.':'Chegou ao teto deste técnico.'):`${Math.round(x)}/${need} de experiência para o nível ${lv+1}.`}</div></div>`}
// carreira: nível do seu técnico na aba Equipe
{const _cc=coachCard;coachCard=function(){let h=_cc.apply(this,arguments);try{if(!S.cm){const c=myCoach();if(c){const lv=bcCoLv(c);const pnl=bcLvBar(lv,c.lxp||0,bcCoNeed(lv),bcCoCap(c),`treino +${Math.round(((c.fam?1+.1*lv:bcLvMul(lv))-1)*100)}%`)+`<p class="xs mut" style="margin:6px 0 10px">O técnico ganha experiência trabalhando com você: vitórias e títulos ajudam. Cada nível deixa o treino mais rendoso. ${c.fam?'A família chega no máximo ao nível 2.':c.club?'O técnico do clube chega no máximo ao nível 3.':`Este técnico pode chegar ao nível ${bcCoCap(c)}.`}</p>`;h=pnl+h}}}catch(e){}return h}}
// modo treinador: nível no topo e no painel da equipe
{const _h=v5Hdr;v5Hdr=function(){let s=_h.apply(this,arguments);try{if(bcV2()){const lv=bcMyLv();s=s.replace(/(<div class="bcwho"><b>[^<]*<\/b><span>)(Técnic[oa]) ★+/,`$1$2 nível ${lv}`)}}catch(e){}return s}}
{const _tp=bcTeamPanel;bcTeamPanel=function(){let h=_tp();try{const c=S.cm,lv=bcMyLv(),nx=BCLVX[Math.min(10,lv+1)];const pnl=bcLvBar(lv,(c.txp||0)-BCLVX[lv],lv>=10?1:nx-BCLVX[lv],10,`treino +${Math.round((bcLvMul(lv)-1)*100)}%`);h=h.replace('<div class="bcsk">','<div class="bcsk">'+pnl)}catch(e){}return h}}
// selo de nível nos técnicos do mercado e na partida; modo treinador sem "jogar os pontos" na preparação
{const _r=render;render=function(...a){const v=_r.apply(this,a);try{if(S&&!MENU){document.querySelectorAll('.v5co[onclick]').forEach(b=>{if(b.querySelector('.bclvb'))return;const id=(b.getAttribute('onclick').match(/V5CO='([^']+)'/)||[])[1];const c=id&&COI.get(id);if(!c)return;const lv=bcCoLv(c);const t=b.querySelector('b');if(t)t.insertAdjacentHTML('afterend',` <span class="bclvb">Nv ${lv}</span>`)});
  if(bcV2())document.querySelectorAll('[onclick^="S.me.pmode=\'key\'"],[onclick^="S.me.pmode=\'all\'"]').forEach(e=>e.style.display='none')}}catch(e){}return v}}
