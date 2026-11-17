// =============== v5.2 · 4) economia ===============
// imposto retido na fonte (estrangeiros) por país do torneio, aproximado
const V5WH={US:.30,ES:.24,IT:.30,FR:.15,GB:.20,DE:.158,AU:.30,CN:.20,JP:.2042,CA:.15,MX:.25,BR:.25,AR:.35,NL:.20,CH:.15,AT:.20,SE:.20,MC:0,AE:0,QA:0,SA:0,IN:.20,KR:.22,TR:.20,PT:.25,BE:.18,RS:.20,HR:.12,GR:.20,PL:.20,CZ:.15};
function v5Tax(){const h=TAXR(),e=S.tour?curEv():null;if(!e||!S.me)return h;const t=TIERS[e.tier];if(!t||t.cat!=='pro'||['M15','M25','EXH'].includes(e.tier))return h;if(e.iso===COUNTRIES[S.me.c][0])return h;const wh=V5WH[e.iso]??.15;return Math.max(h,wh)}
// treinador recebe uma porcentagem do prêmio (prática comum no circuito)
function v5CoachCut(){const c=myCoach(),e=S.tour?curEv():null;if(!c||c.me||!e)return 0;const t=TIERS[e.tier];if(!t||t.cat!=='pro'||e.tier==='EXH')return 0;return c.q>=3?.10:.05}
function v5CutTxt(){const c=myCoach();return c?`${esc(c.n.split(' ')[0])} fica com ${c.q>=3?10:5}% dos prêmios`:'sem treinador'}
// cláusulas de patrocínio por ranking
function v5SponWeek(){const m=S.me;if(!m||S.ended||!isPro()||!(m.spons||[]).length)return;const r=myRank('pro');if(!r)return;m.v5hi=m.v5hi||9999;
 for(const lv of [100,50,20,10,1]){if(r<=lv&&m.v5hi>lv){const b=Math.round(sponPay()*(lv===1?20:lv===10?12:lv===20?8:lv===50?6:4));m.money+=b;news(`Bônus de patrocínio: entrar no top ${lv===1?'1 (número 1 do mundo!)':lv} rendeu ${money(b)} dos seus patrocinadores.`);break}}
 m.v5hi=Math.min(m.v5hi,r);
 (m.spons||[]).forEach(c=>{const sp=SPONSORS.find(x=>x.id===c.id);if(!sp||!sp.req||!sp.req.pro)return;const bad=r>sp.req.pro*2;if(bad&&(c.pm||1)>=1){c.pm=.7;news(`${sp.n} cortou 30% do contrato: o seu ranking caiu muito abaixo do combinado (top ${sp.req.pro}).`)}else if(!bad&&c.pm&&c.pm<1&&r<=sp.req.pro){c.pm=1;news(`${sp.n} restabeleceu o valor integral do contrato.`)}})}
{const _ew4=endWeek;endWeek=function(){const go=!S.modals.length;const r=_ew4();if(go)try{v5SponWeek()}catch(e){console.error(e)}return r}}
