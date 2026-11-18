// =============== v5.7: premiação de 2026 (Slams por torneio, Challengers e ITF) ===============
// valores em US$; Roland Garros e Wimbledon convertidos de euro e libra (aproximado)
const V5GSP={'Australian Open':[2788304,1444543,839850,503910,322503,220209,151173,100782],
 'Roland Garros':[3220000,1610000,862500,540500,327750,215050,149500,100050],
 'Wimbledon':[4950000,2475000,1237500,660000,412500,254400,173250,110000],
 'US Open':[5500000,2800000,1450000,780000,480000,290000,190000,140000]};
TIERS.GS.prize=[4114576,2082386,1097463,621103,385688,244915,165981,112708];
TIERS.C175.prize=[44900,26300,15600,9070,5190,3000];TIERS.C125.prize=[33650,19700,11705,6800,3895,2255];TIERS.C100.prize=[26500,15500,9200,5350,3060,1770];
TIERS.C75.prize=[16000,9370,5570,3240,1850,1070];TIERS.C50.prize=[9420,5520,3280,1900,1090,630];TIERS.M25.prize=[4320,2520,1440,840,480,300];
{const _a=award;award=function(id,t,idx){if(id==='me'&&t===TIERS.GS){const ev=v5CurEv()||CUR_EV,P=ev&&V5GSP[ev.name];if(P){const o=t.prize;t.prize=P;try{return _a(id,t,idx)}finally{t.prize=o}}}return _a(id,t,idx)}}
