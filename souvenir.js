import qrcode from './vendor/qrcode.mjs?v=20260927-5';
import {scenes, regionById} from './journey.js?v=20260927-5';

const WIDTH=1080, HEIGHT=1600;
const COLORS={paper:'#f6fafb',ink:'#173f5f',teal:'#087b91',muted:'#5d7888',line:'#c8dce2',white:'#ffffff'};
const SERIF='"Songti SC", "Noto Serif CJK SC", "STSong", "SimSun", serif';
const SANS='"PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif';
const text=value=>String(value??'').replace(/[\u0000-\u001f\u007f]/g,' ').trim();

function rounded(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
}
function panel(ctx,x,y,w,h,r,fill){rounded(ctx,x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();}
function font(ctx,size,family=SANS,weight=400){ctx.font=`${weight} ${size}px ${family}`;ctx.textBaseline='top';}
function fitted(ctx,value,maxWidth){
  const chars=Array.from(text(value));if(ctx.measureText(chars.join('')).width<=maxWidth)return chars.join('');
  while(chars.length&&ctx.measureText(chars.join('')+'…').width>maxWidth)chars.pop();
  return chars.join('')+'…';
}
function paragraph(ctx,value,x,y,maxWidth,lineHeight,maxLines){
  if(maxLines===1){ctx.fillText(fitted(ctx,value,maxWidth),x,y);return lineHeight;}
  const chars=Array.from(text(value)),lines=[];let line='';
  for(let i=0;i<chars.length;i++){
    if(ctx.measureText(line+chars[i]).width>maxWidth&&line){
      lines.push(line);line='';
      if(lines.length===maxLines-1){line=fitted(ctx,chars.slice(i).join(''),maxWidth);break;}
    }
    line+=chars[i];
  }
  if(line)lines.push(line);
  lines.slice(0,maxLines).forEach((s,i)=>ctx.fillText(s,x,y+i*lineHeight));
  return Math.min(lines.length,maxLines)*lineHeight;
}
async function imageFor(id){
  const src=new URL(`./assets/${scenes[id].image}.webp`,import.meta.url).href;
  return new Promise((resolve,reject)=>{
    const image=new Image();let timer;
    image.onload=()=>{clearTimeout(timer);resolve(image);};
    image.onerror=()=>{clearTimeout(timer);reject(new Error('旅行插画加载失败，请刷新后重试。'));};
    timer=setTimeout(()=>reject(new Error('旅行插画加载超时，请检查网络后重试。')),15000);
    image.src=src;
  });
}
function cropImage(ctx,image,x,y,w,h){
  const scale=Math.max(w/image.naturalWidth,h/image.naturalHeight);
  const sw=w/scale,sh=h/scale;
  ctx.drawImage(image,(image.naturalWidth-sw)/2,(image.naturalHeight-sh)/2,sw,sh,x,y,w,h);
}
export function qrUrl(publicUrl){
  let url;try{url=new URL(publicUrl);}catch{throw new Error('请先提供公开网页地址，才能生成分享二维码。');}
  if(!['https:','http:'].includes(url.protocol)||url.username||url.password||url.hostname==='localhost'||/^(127\.|0\.0\.0\.0$|\[::1\]$)/.test(url.hostname))throw new Error('分享二维码需要公开的 http 或 https 网页地址。');
  // Keep only our fixed card campaign; never serialize answers or arbitrary URL data.
  const cardCampaign=url.origin==='https://asimovvong.github.io'&&url.pathname==='/xinxiang-caiyun/'&&url.searchParams.get('utm_source')==='card'&&url.searchParams.get('utm_campaign')==='card';
  url.search='';url.hash='';
  if(cardCampaign){url.searchParams.set('utm_source','card');url.searchParams.set('utm_campaign','card');}
  if(url.href.length>500)throw new Error('公开网址过长，请使用网站首页地址。');
  return url;
}
function drawQr(ctx,url,x,y,size){
  const qr=qrcode(0,'M');qr.addData(url,'Byte');qr.make();
  const quiet=4,count=qr.getModuleCount(),unit=Math.floor(size/(count+quiet*2));
  const drawn=(count+quiet*2)*unit,offset=Math.floor((size-drawn)/2);
  ctx.fillStyle=COLORS.white;ctx.fillRect(x,y,size,size);ctx.fillStyle=COLORS.ink;
  for(let row=0;row<count;row++)for(let col=0;col<count;col++)if(qr.isDark(row,col))ctx.fillRect(x+offset+(col+quiet)*unit,y+offset+(row+quiet)*unit,unit,unit);
}

/**
 * Create a shareable 1080 × 1600 PNG locally; this function does not download or upload it.
 * dayLabels accepts strings or { title, type } entries. type='stay' enables an accurate
 * complete-activity-day count. Only pass non-personal presentation text to this API.
 * Returns Promise<{blob: Blob, dataUrl: string, width: number, height: number}>.
 */
export async function createTravelCard({title,subtitle,routeName,regionIds=[],days,nights,keywords=[],dayLabels=[],publicUrl,provisional=true}={}){
  if(typeof document==='undefined'||typeof Image==='undefined')throw new Error('旅行小卡需要在网页浏览器中生成。');
  const url=qrUrl(publicUrl),ids=[...new Set(regionIds)].filter(id=>Object.hasOwn(scenes,id)&&Object.hasOwn(regionById,id)).slice(0,3);
  if(!ids.length)throw new Error('先保留至少一个想去的地区，再生成旅行小卡。');
  const images=await Promise.all(ids.map(imageFor));
  if(document.fonts?.ready)await document.fonts.ready;
  const canvas=document.createElement('canvas');canvas.width=WIDTH;canvas.height=HEIGHT;
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('当前浏览器暂时无法绘制旅行小卡。');
  ctx.fillStyle=COLORS.paper;ctx.fillRect(0,0,WIDTH,HEIGHT);
  const wash=ctx.createLinearGradient(0,0,WIDTH,HEIGHT);wash.addColorStop(0,'#eaf6f8');wash.addColorStop(.5,'#ffffff');wash.addColorStop(1,'#e8f0f4');
  ctx.fillStyle=wash;ctx.fillRect(0,0,WIDTH,HEIGHT);

  font(ctx,28,SERIF,600);ctx.fillStyle=COLORS.ink;ctx.fillText('心向彩云',52,43);
  font(ctx,17);ctx.fillStyle=COLORS.muted;ctx.fillText('A LITTLE MORE LIKE YOU',205,50);
  panel(ctx,833,38,195,39,19,'#dceef1');font(ctx,20,SANS,500);ctx.fillStyle=COLORS.teal;ctx.fillText(provisional?'一张愿望草案':'这次想这样去云南',852,47);
  font(ctx,21,SANS,500);ctx.fillStyle=COLORS.teal;ctx.fillText('我的云南，不必和别人一样',52,109);
  font(ctx,66,SERIF,600);ctx.fillStyle=COLORS.ink;paragraph(ctx,title||'把日子还给自己',48,151,980,79,2);
  font(ctx,27);ctx.fillStyle=COLORS.muted;paragraph(ctx,subtitle||'先想清楚怎么过，再决定去哪里。',52,322,960,37,2);

  const hero={x:52,y:411,w:976,h:435};
  const imageSlots=ids.length===1?[{x:hero.x,w:hero.w}]:ids.length===2?[{x:52,w:604},{x:664,w:364}]:[{x:52,w:320},{x:380,w:320},{x:708,w:320}];
  ctx.save();rounded(ctx,hero.x,hero.y,hero.w,hero.h,16);ctx.clip();
  ctx.fillStyle=COLORS.paper;ctx.fillRect(hero.x,hero.y,hero.w,hero.h);
  imageSlots.forEach((slot,index)=>cropImage(ctx,images[index],slot.x,hero.y,slot.w,hero.h));
  const veil=ctx.createLinearGradient(0,hero.y+hero.h-145,0,hero.y+hero.h);veil.addColorStop(0,'rgba(11,37,51,0)');veil.addColorStop(1,'rgba(11,37,51,.65)');ctx.fillStyle=veil;ctx.fillRect(hero.x,hero.y,hero.w,hero.h);
  font(ctx,35,SERIF,600);ctx.fillStyle=COLORS.white;
  imageSlots.forEach((slot,index)=>ctx.fillText(fitted(ctx,regionById[ids[index]].name,slot.w-48),slot.x+24,774));
  font(ctx,15);ctx.fillStyle='rgba(255,255,255,.88)';ctx.fillText('情境插画 · 非真实照片',76,821);ctx.restore();

  font(ctx,18,SANS,600);ctx.fillStyle=COLORS.teal;ctx.fillText('这次想去',52,879);
  font(ctx,45,SERIF,600);ctx.fillStyle=COLORS.ink;paragraph(ctx,routeName||ids.map(id=>regionById[id].name).join(' ＋ '),52,910,966,54,1);
  const rows=(Array.isArray(dayLabels)?dayLabels:[]).slice(0,9);
  const calendarDays=Number.isInteger(days)&&days>0?days:rows.length;
  const overnight=Number.isInteger(nights)&&nights>=0?nights:null;
  const typedDays=rows.length>0&&rows.every(d=>d&&typeof d==='object'&&typeof d.type==='string');
  const completeDays=typedDays?rows.filter(d=>d.type==='stay').length:null;
  const facts=[calendarDays?`${calendarDays} 个日历天`:null,overnight!==null?`${overnight} 晚停留`:null,completeDays!==null?`${completeDays} 个完整活动日`:null].filter(Boolean);
  font(ctx,25,SANS,500);ctx.fillStyle=COLORS.muted;ctx.fillText(fitted(ctx,facts.join('  ·  '),960),52,978);
  let tagX=52; font(ctx,23,SANS,500);
  [...new Set(keywords.map(text).filter(Boolean))].slice(0,3).forEach(value=>{
    const label=fitted(ctx,value,250),w=ctx.measureText(label).width+40;
    panel(ctx,tagX,1026,w,44,22,'#deeff1');ctx.fillStyle=COLORS.teal;ctx.fillText(label,tagX+20,1036);tagX+=w+14;
  });

  font(ctx,19,SANS,500);ctx.fillStyle=COLORS.teal;ctx.fillText('把向往放进日子里',52,1101);
  if(rows.length){
    rows.forEach((value,index)=>{
      const label=typeof value==='object'?value?.title:value,x=52+(index%3)*330,y=1140+Math.floor(index/3)*75;
      font(ctx,17,SANS,600);ctx.fillStyle=COLORS.teal;ctx.fillText(`DAY ${String(index+1).padStart(2,'0')}`,x,y);
      font(ctx,22,SANS,500);ctx.fillStyle=COLORS.ink;paragraph(ctx,label||'留给临时起意',x,y+25,300,25,1);
    });
  }else{
    font(ctx,26,SERIF);ctx.fillStyle=COLORS.ink;paragraph(ctx,'不急着排满。先为最舍不得的体验，留一整段时间。',52,1150,915,39,3);
  }

  ctx.strokeStyle=COLORS.line;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(52,1381);ctx.lineTo(1028,1381);ctx.stroke();
  font(ctx,31,SERIF,600);ctx.fillStyle=COLORS.ink;ctx.fillText('去云南，你想过哪一种日子？',52,1413);
  font(ctx,23);ctx.fillStyle=COLORS.muted;ctx.fillText('扫一下，也找到属于你的旅行提案',52,1462);
  font(ctx,20);ctx.fillStyle=COLORS.teal;ctx.fillText(fitted(ctx,url.host+url.pathname.replace(/\/$/,''),738),52,1500);
  drawQr(ctx,url.href,859,1405,170);
  font(ctx,17);ctx.fillStyle=COLORS.muted;ctx.fillText('探索建议 · 非预订行程；交通、价格与开放信息出发前核实',52,1544);
  font(ctx,15);ctx.fillText('仅展示旅行愿望，不含姓名、回答原文或个人测试数据。',52,1572);

  let blob,dataUrl;
  try{blob=await new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('图片生成失败，请重试。')),'image/png'));dataUrl=canvas.toDataURL('image/png');}
  catch(error){if(error?.name==='SecurityError')throw new Error('当前打开方式限制了图片导出，请从在线网页打开后重试。');throw error;}
  return {blob,dataUrl,width:WIDTH,height:HEIGHT};
}
