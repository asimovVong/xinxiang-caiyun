import {corridors, corridorById} from './corridors.js?v=20260927-5';

export const placeById = Object.fromEntries(corridors.flatMap(c => c.places.map(p => [p.id,{...p,corridorId:c.id}])));
export function corridorBaseIds(id) {
  const c=Object.hasOwn(corridorById,id)?corridorById[id]:null;
  return c?[...new Set([...c.baseIds,...c.places.filter(p=>p.kind==='overnight').map(p=>p.id==='fuxian-stay'?'fuxian':p.id)])]:[];
}
export function isHighland(place) {return place?.requiresHighAltitude===true||(Number.isFinite(place?.altitude)&&place.altitude>=3000);}

const definitions={
 shaxi:{name:'剑川沙溪',visualBase:'dali',title:'在古集市边，住进普通的一天',hook:'是老戏台的故事，还是不用赶回去的河边下午？',keyword:'沙溪',
  activity:{title:'沙溪古集市与河岸日',detail:'寺登街、四方街和玉津桥沿线选短段慢走。古集市是否开集另核，普通日子也值得停留。'},
  second:{title:'沙溪街巷回访日',morning:'在寺登街吃早餐，回访昨天感兴趣的一处开放老建筑或小店。',afternoon:'沿黑潓江附近允许行走的路段慢走，或留在古镇喝茶；石宝山另作整天替换。',evening:'在沙溪原住宿片区吃晚饭，今天不用收行李赶回大理。',food:'饵丝、白族家常菜',backup:'雨天留在开放院落与茶馆；不承诺一定遇到集市。',effort:'轻松'},
  pull:['在沙溪，哪一件事值得你专门住一晚？','寺登街、老戏台与河岸都在这个小镇的日常里；沙溪并非洱海沿岸散步的延长线。',[
   ['story','慢慢看寺登街和老建筑','愿意从古集市与戏台理解这里的往来。',{heritage:5,street:2}],['river','走到玉津桥，看河边生活','不需要一个接一个的门票点。',{rest:4,street:2,lake:1}],['quiet','不赶回大理，过一个安静晚上','愿意用另一次换住换来停留。',{rest:5}]]],
  depth:['沙溪只剩一个完整白天，你想怎样过？','石宝山有山路、台阶与接驳。古镇与石窟分别需要时间，不能都默认是轻松的半天。',[
   ['village','就留寺登街与河边','从早餐到傍晚都在同一片区。',{rest:4,street:3}],['stone','想另留一天看石宝山造像','愿意用一个古镇日替换，先核开放与步行强度。',{heritage:4,mountain:2}],['market','对普通集市和小店更好奇','开集日期另核，没有集市也愿意看看生活。',{street:5,food:2}]]]},
 mengzi:{name:'蒙自',visualBase:'jianshui',title:'为一碗米线，把南湖的下午也留下',hook:'是米线里的地方风味，还是铁路与城市的旧故事？',keyword:'蒙自',
  activity:{title:'蒙自米线与南湖日',detail:'从过桥米线的配料和吃法开始，南湖附近慢走。碧色寨需要另一段交通，另留一个重点日。'},
  second:{title:'碧色寨铁路记忆日',morning:'先核实碧色寨当日开放与从住处往返交通，选择一个文化或展陈重点。',afternoon:'看铁路建筑与村落关系，休息后从容返回，不同时追加多个城区点位。',evening:'回蒙自住处附近吃一顿合口味的饭。',food:'过桥米线、当地家常菜',backup:'开放或交通不合适，就用整天替换为南湖与城市文化空间。',effort:'轻松，另有往返交通'},
  pull:['蒙自吸引你的，是米线还是它背后的城市？','一顿过桥米线、南湖散步和碧色寨，是三个尺度不同的体验。',[
   ['flavor','想认真吃一顿过桥米线','看看配料和吃法，了解味道怎样组成。',{food:5,novelty:2}],['history','想认识铁路留下的城市故事','愿意为碧色寨单独留时间。',{heritage:5}],['daily','南湖边散步、吃饭就挺好','喜欢普通城市的一天。',{street:4,rest:3}]]],
  depth:['如果只能留一个蒙自下午，你会选哪里？','南湖与碧色寨不是同一条步行街。先选真正想停留的地方。',[
   ['lake','南湖附近慢慢吃与逛','不再把时间花在往返接驳上。',{rest:3,street:3,food:2}],['rail','把整天留给碧色寨','先确认开放与交通，期待是建筑和故事。',{heritage:5}],['food','去不同小店认识米线与家常菜','口味与分量按自己需要选择。',{food:5,street:2}]]]},
 mile:{name:'弥勒',visualBase:'jianshui',title:'红砖弧线，或者一整个不用赶路的下午',hook:'想留下光线与建筑，还是热气里的休息？',keyword:'弥勒',
  activity:{title:'弥勒东风韵建筑日',detail:'以东风韵的建筑、光线和空间为一天重点。景区开放与票务另核，不自动把温泉接在下午。'},
  second:{title:'弥勒休闲与温泉意向日',morning:'睡够再吃一份卤鸡米线，若已确认温泉预约、票务与适合自己的条件，再前往。',afternoon:'留给已确认的休闲安排，或住处附近吃饭散步，不追加东风韵整套行程。',evening:'在同一住宿片区吃饭休息。',food:'卤鸡米线、当地家常菜',backup:'未确认泡汤条件就改为住处附近慢逛，不把温泉当作已包含项目。',effort:'轻松，具体设施另核'},
  pull:['红砖建筑和温泉，你更愿意为哪一个留一天？','弥勒的建筑游览与泡汤是不同项目，票务、位置和花费都要分别看。',[
   ['space','在东风韵看光线、曲线与空间','愿意慢走、观察或拍照。',{heritage:3,novelty:3}],['soak','找到舒服的地方休息','泡汤只是可能的方式，设施与条件另核。',{rest:5}],['food','吃卤鸡米线，过小城日常','不需要每天都进景区。',{food:3,street:3,rest:2}]]],
  depth:['如果这两项只能保留一种，你怎么取舍？','同时安排不一定更完整，也可能让休闲变成赶场。',[
   ['architecture','保留建筑体验','把另一个下午留白，不强求泡汤。',{novelty:3,heritage:2}],['rest','保留休息，景区可以不去','先看住宿和实际价格是否值得。',{rest:5}],['decide','看到门票和交通再决定','现在不接受未核实的花费。',{}]]]},
 yuanyang:{name:'元阳哈尼梯田',visualBase:'jianshui',title:'沿山坡，看见田与村怎样一起生活',hook:'需要一面镜子般的梯田，还是想理解山地农耕？',keyword:'元阳',
  activity:{title:'元阳梯田与村落日',detail:'在天气允许、已确认开放的观景点慢看，再选择接待明确的村落认识农耕与用水。十月不保证镜面梯田。'},
  second:{title:'哈尼村落与农耕文化日',morning:'从住宿片区出发，只选一个愿意接待的村落或开放展陈。',afternoon:'了解田、村落与森林的关系，征得同意后交流，吃饭休息。',evening:'留在原住宿片区，不为追云海跨多个山头。',food:'梯田红米、哈尼家常菜',backup:'云雾遮挡仍可看展陈与听故事；具体田面和灌水状态按当季观察。',effort:'依山路与具体步行路线'},
  pull:['元阳让你心动的，是哪一种梯田？','元阳是持续耕作的地方。十月收割和灌水进度不同，不保证海报上的大面积镜面。',[
   ['land','想看山地里田与村的关系','即使没有镜面，也愿意理解农耕。',{heritage:4,mountain:3}],['image','想拍到层层田面的漂亮画面','愿意明确承认季节和天气风险。',{mountain:5}],['life','想吃红米、看看哈尼村落生活','愿意选择真实接待并尊重私人空间。',{street:3,heritage:3,food:2}]]],
  depth:['云雾挡住梯田时，这一天还值得吗？','上山、住宿片区和观景点都有交通成本。留下来的理由最好不只有一次日出。',[
   ['culture','村落和农耕文化仍然值得','把风景与生活一起看。',{heritage:5,street:2}],['wait','愿意留机动日等一等','接受等了也不保证看见。',{mountain:4}],['change','不想赌，换成别的古城体验','这次可能更适合建水或蒙自。',{street:3,food:2}]]]},
 puer:{name:'普洱思茅',visualBase:'xishuangbanna',title:'茶与咖啡之间，坐下来认识一座城',hook:'要亲手参与，还是安静地把一杯喝完？',keyword:'普洱',
  activity:{title:'普洱茶与咖啡日',detail:'从米线开始，选择介绍清楚的茶或咖啡空间。参与活动先约接待，思茅不等于景迈山。'},
  second:{title:'思茅街头慢生活日',morning:'在住宿附近吃米线，观察市场或街头食材，不追多个远处庄园。',afternoon:'找一间喜欢的茶或咖啡空间，愿意再了解制作，也可以只是喝一杯。',evening:'就近吃家常菜，留在同一个住宿基地。',food:'米线、当地家常菜、茶与咖啡',backup:'体验约不到就换成城市生活；不承诺到店就能采摘或制作。',effort:'轻松'},
  pull:['到了普洱，你希望一杯茶或咖啡带来什么？','思茅的城市日常、茶咖空间，与澜沧景迈山的村寨茶林是不同方向。',[
   ['learn','听懂制作与风味的差别','愿意预约一段介绍清楚的体验。',{craft:3,novelty:3,food:2}],['slow','慢慢喝，不再安排下一站','一杯饮料可以占去半天。',{rest:5}],['daily','从市场和小店认识当地生活','不用每一站都在庄园里。',{street:4,food:3}]]],
  depth:['如果没有采摘制作，你还愿意去普洱吗？','农时、接待与项目安排会变化，预约到的内容才算行程。',[
   ['enough','愿意，茶咖与城市生活就够','不会把是否采摘当作唯一标准。',{rest:3,street:3}],['hands','参与制作很重要，先核接待','确认之前不把它当作必有。',{craft:5}],['forest','我真正向往的是村寨古茶林','可能更应单独选择景迈山基地。',{forest:4,heritage:3}]]]},
 jingmai:{name:'景迈山古茶林与村寨',visualBase:'xishuangbanna',title:'把一杯茶，放回森林和村寨里',hook:'想认识林下种茶，还是只等待一片云海？',keyword:'景迈',
  activity:{title:'景迈茶林与村寨日',detail:'从住宿村寨出发，按当地接待安排慢看一段开放茶林，再回村喝茶吃饭。云海和制茶参与均不保证。'},
  second:{title:'景迈村寨慢住日',morning:'在原住宿村寨吃早饭，按接待者建议看一小段建筑与公共空间。',afternoon:'坐下来喝茶，征得同意后了解种茶与生活；不为了“全覆盖”连续换村。',evening:'在同一村寨看天色或休息，保留进出山道路的余量。',food:'茶、布朗族或傣族家常菜',backup:'雨天减少茶林步行，保留村寨交流；私人空间先征得同意。',effort:'轻松至中等，进出山另计'},
  pull:['景迈山的哪一部分，值得你专门进山？','这里在澜沧县，有古茶林与村寨，不能当作普洱站旁边的茶园或景洪的当日往返。',[
   ['forest','想看森林里怎样种茶','愿意慢看生态与生活的关系。',{forest:5,heritage:3}],['village','想坐在村寨里喝茶、听人说话','愿意留一个不用当晚赶回去的晚上。',{street:3,heritage:4,rest:2}],['cloud','想看到山间云海与层次','承认天气不保证，不能把云海写成必有。',{mountain:4,forest:2}]]],
  depth:['进山后的第二天，继续留在一个村寨可以吗？','村寨之间与进出山都有交通。停留要靠真正愿意做的事情支撑。',[
   ['stay','可以，茶与交谈值得慢下来','不用每天打卡另一个观景台。',{rest:4,heritage:3}],['learn','想参与一次明确接待的茶体验','农时、预约与具体工序先确认。',{craft:4,heritage:3}],['move','会想离开，可能不适合多住','这次先比较交通更简单的思茅。',{street:2,novelty:2}]]]}
};

export const additionalRegions=Object.entries(definitions).map(([id,d])=>{
 const place=placeById[id],corridor=corridorById[place.corridorId];
 return {id,name:d.name,subtitle:place.tagline,region:corridor.region,visual:d.visualBase,visualBase:d.visualBase,corridorId:corridor.id,tags:[place.tagline,'需要独立换住'],altitude:place.altitude??null,traits:place.traits||corridor.traits,day:place.experience,food:place.oneDay.food,tradeoff:place.tradeoff,season:corridor.season,sources:corridor.sources,coordinates:place.coordinates,
  activities:[d.activity,{title:d.second.title,detail:d.second.morning+' '+d.second.afternoon}]};
});
export const regionalScenes=Object.fromEntries(Object.entries(definitions).map(([id,d])=>[id,{title:d.title,sub:d.name+' · '+corridorById[placeById[id].corridorId].name,image:d.visualBase,visualBase:d.visualBase,sensory:placeById[id].experience+' '+placeById[id].tradeoff,hook:d.hook,color:'#6a7960',illustrationNote:'使用'+corridorById[placeById[id].corridorId].name+'的区域插画表达旅行风格，并非'+d.name+'实景。'}]));
const option=(row)=>({id:row[0],label:row[1],detail:row[2],weights:row[3],echo:'这份具体愿望会参与比较；实际交通、接待和开放仍需另外确认。'});
export const regionalQuestions=Object.entries(definitions).flatMap(([id,d])=>['pull','depth'].map(part=>({id:id+'_'+part,title:d[part][0],context:d[part][1],scene:id,stage:'深一点',options:[...d[part][2].map(option),{id:'unknown',label:'我还说不清',detail:'先保留这个未知，不必为了完成问卷强行决定。',weights:{},echo:'这份愿望还需要继续确认。'}]})));
export const additionalGuides=Object.fromEntries(Object.entries(definitions).map(([id,d])=>{
 const place=placeById[id];
 return [id,{oneLine:place.tagline,bestFor:[place.experience],paceNote:'进出和跨地区转场另留时间；每天只设一个重点。',localMove:place.tradeoff,coords:place.coordinates,foodTrail:place.oneDay.food.split(/[、，]/).map(name=>({name,when:'当地一餐',detail:'按实际口味、食材与分量选择。'})),days:[{...place.oneDay,match:[d.keyword],title:d.activity.title,effort:'依具体路线与天气'},{...d.second,match:[d.second.title]}]}];
}));
export function regionalActivityPriority(id,answers) {
 if(id==='mengzi'&&(answers.mengzi_pull==='history'||answers.mengzi_depth==='rail'))return 1;
 if(id==='mile'&&(answers.mile_pull==='soak'||answers.mile_depth==='rest'))return 1;
 if(id==='yuanyang'&&(answers.yuanyang_pull==='life'||answers.yuanyang_depth==='culture'))return 1;
 if(id==='puer'&&answers.puer_pull==='daily')return 1;
 if(id==='jingmai'&&answers.jingmai_depth==='stay')return 1;
 return 0;
}
const extraPairs=[['dali','shaxi'],['jianshui','mengzi'],['jianshui','mile'],['jianshui','yuanyang'],['xishuangbanna','puer'],['xishuangbanna','jingmai']];
export const regionalRouteTemplates=[...additionalRegions.map(r=>({id:r.id,name:r.name+'慢慢玩',destinationIds:[r.id],tradeoff:r.tradeoff})),...extraPairs.map(ids=>({id:ids.join('-'),name:'同方向两地停留',destinationIds:ids,tradeoff:placeById[ids[1]].tradeoff+' 两地之间另留一个完整转场日。'}))];
