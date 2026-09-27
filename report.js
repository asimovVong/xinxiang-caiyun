import {regionById,questionMap,axisNames} from './journey.js?v=20260927-4';
const themes={dali:'湖岸与白族村落',shangrila:'藏地与高原',kunming:'植物与春城日常',jianshui:'古城手作与风味',mangshi:'早市与边城风味',fuxian:'湖边留白',lijiang:'纳西村落与远山',tengchong:'侨乡与温泉',xishuangbanna:'热带植物与傣味'};
export function reportFor(profile,result,route,settings){
 const active=id=>result.selected.find(s=>s.question.id===id)?.option;
 const ids=route?.ids||result.ranked.filter(r=>!r.excluded).slice(0,1).map(r=>r.id);
 const theme=id=>{
  const depth=active(id+'_depth')?.id,pull=active(id+'_pull')?.id;
  if(id==='dali')return depth==='mountain'?'苍山自然探索':depth==='craft'?'白族村落与扎染':pull==='quiet'||depth==='shore'?'洱海慢住':themes[id];
  if(id==='shangrila')return depth==='life'||pull==='culture'?'藏地生活与文化':depth==='landscape'||pull==='open'?'高原开阔风景':themes[id];
  if(id==='kunming')return depth==='plants'||pull==='learn'?'植物观察的一整天':themes[id];
  if(id==='jianshui'&&pull==='hands')return '古城里的紫陶手作';
  if(id==='lijiang'&&depth==='village')return '纳西村落慢走';
  return themes[id]||regionById[id]?.subtitle||'当地生活与自然';
 };
 const keywords=ids.map(theme);if(keywords.length<3)keywords.push(result.pace==='restful'?'每天留半天自由时间':'一天一个重点');
 const reasons=[];
 for(const id of ['need',...ids.map(id=>id+'_pull'),'rest','food']){const a=active(id);if(a&&a.id!=='unknown'&&!reasons.some(x=>x.answer===a.label))reasons.push({question:questionMap[id].title,answer:a.label,detail:a.echo||a.detail,id});if(reasons.length===3)break;}
 const action=result.pace==='restful'?'少换住宿，慢慢过日子':'每天一个重点，留空间给好奇';
 const title=ids.length?ids.map(id=>regionById[id].name).join(' ＋ '):'先把想要的再说清一点';
 const shortStyle=ids.length===1?theme(ids[0]):ids.map(theme).join(' × ');
 return {title,style:result.style,shortStyle,action,ids,keywords:keywords.slice(0,3),reasons,provisional:result.unknowns.length>0||!!route?.conditional,fullDays:route?.fullDays||0,nights:settings.days-1,days:settings.days,moves:route?.moves||0,axes:result.axes.slice(0,3).map(([a])=>axisNames[a])};
}
