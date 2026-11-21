// =============== v5.9: vídeo do título (comemoração em vídeo vertical para Instagram/X) ===============
let V5VREC=null;
function v5RecMime(){const L=['video/mp4;codecs=avc1.42E01E','video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'];try{for(const m of L)if(window.MediaRecorder&&MediaRecorder.isTypeSupported(m))return m}catch(e){}return ''}
function v5CelRec(){if(V5VREC)return;const src=document.getElementById('v5celc');if(!src||!V5CEL||!window.MediaRecorder){TOAST='Seu navegador não grava vídeo. Use o card de compartilhar.';render();return}
 const mime=v5RecMime(),W=720,H=1280,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');let st;try{st=cv.captureStream(30)}catch(e){TOAST='Não deu para gravar neste navegador.';render();return}
 let rec;try{rec=new MediaRecorder(st,mime?{mimeType:mime,videoBitsPerSecond:4e6}:{videoBitsPerSecond:4e6})}catch(e){try{rec=new MediaRecorder(st)}catch(e2){TOAST='Não deu para gravar neste navegador.';render();return}}
 const chunks=[];rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};
 // recomeça a comemoração para o vídeo pegar a animação inteira
 try{V5CEL.t0=performance.now();V5CEL.conf.forEach(c=>{c.y=Math.random()*1.15-.35})}catch(e){}
 const L=V5CEL.L,m=S.me,ev=L.ev,gs=V5CEL.gs,dur=7000,t0=performance.now(),rk=myRank('pro')||myRank('jr');
 const btn=document.querySelector('.v5celrec');if(btn){btn.disabled=true}
 V5VREC={rec,t0};
 const frame=now=>{if(!V5VREC)return;const t=now-t0;g.fillStyle=gs?'#1a1204':'#0b1020';g.fillRect(0,0,W,H);
  const s=document.getElementById('v5celc');if(s&&s.width){const sw=s.width,sh=s.height,sc=Math.min(W/sw,(H*.66)/sh),dw=sw*sc,dh=sh*sc;g.drawImage(s,(W-dw)/2,H*.17,dw,dh)}
  g.textAlign='center';g.fillStyle='#fff';g.font='900 54px Archivo, Arial, sans-serif';g.fillText(m.name,W/2,110);
  g.font='700 26px Inter, Arial, sans-serif';g.fillStyle='#ffffffb0';g.fillText(`${COUNTRIES[m.c][1]}${rk?' · #'+rk+' do mundo':''}`,W/2,152);
  const yb=H*.17+Math.min(H*.66,W*(s?s.height/s.width:1))+70;g.font='800 30px Inter, Arial, sans-serif';g.fillStyle=gs?'#f5c84c':'#D9F24A';g.fillText(`${ev.name} ${year()}`,W/2,Math.min(H-150,yb));
  g.font='600 24px Inter, Arial, sans-serif';g.fillStyle='#ffffff99';g.fillText('Breakpoint Tênis · breakpoint-vercel-one.vercel.app',W/2,H-60);
  const bar=Math.min(1,t/dur);g.fillStyle='#ffffff22';g.fillRect(0,H-8,W,8);g.fillStyle=gs?'#f5c84c':'#D9F24A';g.fillRect(0,H-8,W*bar,8);
  if(btn)btn.textContent=`Gravando… ${Math.max(0,Math.ceil((dur-t)/1000))}s`;
  if(t<dur)requestAnimationFrame(frame);else{try{rec.stop()}catch(e){}}};
 rec.onstop=()=>{V5VREC=null;const type=(rec.mimeType||mime||'video/webm').split(';')[0],ext=type.includes('mp4')?'mp4':'webm',blob=new Blob(chunks,{type}),name=`breakpoint-titulo-${(ev.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'-')}.${ext}`;
  if(btn){btn.disabled=false;btn.textContent='🎬 Gravar de novo'}
  const file=new File([blob],name,{type});
  const done=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);TOAST=`Vídeo salvo: ${name}${ext==='webm'?' (se o app não aceitar, converta para MP4)':''}`;render()};
  try{if(navigator.canShare&&navigator.canShare({files:[file]})){navigator.share({files:[file],title:'Meu título no Breakpoint',text:`Campeão de ${ev.name} no Breakpoint Tênis! 🏆🎾`}).catch(done)}else done()}catch(e){done()}};
 rec.start(250);requestAnimationFrame(frame)}
{const _vr=v5Res;v5Res=function(){let s=_vr();try{if(s.includes('id="v5celc"')&&!s.includes('v5celrec'))s=s.replace('</canvas></div>',`</canvas></div><button class="v5celrec sec" onclick="v5CelRec()">🎬 Gravar vídeo do título</button>`)}catch(e){}return s}}
