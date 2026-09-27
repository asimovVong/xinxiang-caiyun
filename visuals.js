// A geographic orientation aid, not a navigation map. Coordinates reuse the local atlas.
const points = {
  dali: ['大理',100.197,25.79,13,4], shangrila: ['香格里拉',99.7065,27.8269,13,4],
  lijiang: ['丽江',100.234,26.872,13,4], tengchong: ['腾冲',98.49,25.03,13,4],
  mangshi: ['芒市',98.5784,24.4367,13,4], kunming: ['昆明',102.685,24.87,-12,-12],
  fuxian: ['抚仙湖',102.883,24.514,-12,17], jianshui: ['建水',102.83,23.63,-12,4],
  xishuangbanna: ['西双版纳',100.798,22.002,13,4]
};
const known = id => typeof id === 'string' && Object.hasOwn(points,id);
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pos = id => [60+(points[id][1]-98.1)*57,42+(28.15-points[id][2])*50];
const label = (x,y,text,fill='#294f61',size=13,anchor='middle') => `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" text-anchor="${anchor}" font-family="system-ui,sans-serif">${esc(text)}</text>`;
const svg = (name,body,box='0 0 360 170') => `<svg viewBox="${box}" role="img" aria-label="${esc(name)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const path = (d,fill='#9dc8bd',stroke='none',width=2) => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const wave = (x,y,w=60) => path(`M${x} ${y}q${w/4} -5 ${w/2} 0t${w/2} 0`,'none','#70b7ca',2);
const roof = (x,y,w=56) => `${path(`M${x-5} ${y}l${w/2+5} -16 ${w/2+5} 16Z`,'#416878')}<rect x="${x}" y="${y}" width="${w}" height="30" rx="2" fill="#f0ddbf"/>`;
const tree = (x,y,r=18) => `<path d="M${x} ${y}v30" stroke="#647e63" stroke-width="4"/><circle cx="${x}" cy="${y}" r="${r}" fill="#95bda3"/>`;

export function routeMap(ids=[]){
  const selected = [...new Set(Array.isArray(ids)?ids.filter(known):[])];
  const connection = selected.length>1?path(selected.map((id,i)=>`${i?'L':'M'}${pos(id).join(' ')}`).join(' '),'none','#117e96',3):'';
  const markers = Object.entries(points).map(([id,[name,,,dx,dy]])=>{
    const [x,y]=pos(id), n=selected.indexOf(id), chosen=n>=0, gateway=id==='kunming'&&!chosen;
    return `<g><circle cx="${x}" cy="${y}" r="${chosen?10:gateway?7:4}" fill="${chosen?'#0e758b':gateway?'#fff':'#9eb4bd'}" stroke="${gateway?'#728c98':'#fff'}" stroke-width="${chosen?2:1.5}"/>${chosen?label(x,y+3.5,n+1,'#fff',10):''}${label(x+dx,y+dy,name,chosen?'#123f58':'#617e8a',chosen?14:12,dx<0?'end':'start')}</g>`;
  }).join('');
  return `<figure class="route-map">${svg('云南目的地方位示意；'+(selected.length?selected.map(id=>points[id][0]).join('至'):'尚未选择路线'),`<rect x="4" y="4" width="392" height="386" rx="22" fill="#eef6f5"/>${[90,170,250,330].map(y=>path(`M28 ${y}H373`,'none','#dce9e9',1)).join('')}${label(37,35,'西北','#8ba6a9',11,'start')}${label(365,375,'东南','#8ba6a9',11,'end')}${path('M359 66V28m-5 8 5-8 5 8','none','#365e6b',2)}${label(359,20,'北', '#365e6b',11)}${connection}${markers}${label(200,409,'连线只示方位，不代表道路、班次或实际耗时','#647e86',10)}`,'0 0 400 418')}<figcaption><span class="map-key"><i class="key-route"></i>${selected.length?'这次建议停留':'先看目的地之间的位置'}</span>${!selected.includes('kunming')?'<span class="map-key"><i class="key-hub"></i>昆明为交通参照，不自动加入行程</span>':''}<span>位置按当地代表点近似标注；不是完整云南省界图。</span></figcaption></figure>`;
}

export function dayRhythm(days=[]){
  const types={arrival:['启程 / 到达','到'],transfer:['换一个基地','转'],stay:['完整停留','留'],departure:['返回日常','返']};
  const list=Array.isArray(days)?days.slice(0,9):[];
  const stays=list.filter(d=>d.type==='stay').length, moves=list.filter(d=>d.type==='transfer').length;
  return `<figure class="day-rhythm"><figcaption><strong>${stays} 个完整停留日</strong><span>${moves?`${moves} 次跨地区转场`:'一地停留，无跨地区转场'} · 去回日另留</span></figcaption><ol class="rhythm-grid">${list.map((day,i)=>{const type=Object.hasOwn(types,day?.type)?day.type:'stay', [name,symbol]=types[type];return `<li class="rhythm-day is-${type}"><span class="rhythm-num">DAY ${i+1}</span><span class="rhythm-symbol" aria-hidden="true">${symbol}</span><strong>${known(day?.base)?points[day.base][0]:'行程待定'}</strong><span>${name}</span></li>`;}).join('')}</ol><p class="rhythm-note">先看完整停留与移动怎样分布，再看每天做什么。具体交通仍需按出发地核实。</p></figure>`;
}

const sceneDrawings = {
  dali:{title:'苍山在西，洱海在东',caption:'山、湖、村落是三个不同尺度。一天选一段，慢游才有可能。',body:()=>`${path('M13 123 54 48 76 79 96 35 134 124Z','#adc4c6')}${path('m78 63 18-28 15 36-15-13Z','#edf4f2')}<ellipse cx="263" cy="116" rx="76" ry="29" fill="#addce3"/>${roof(147,108,35)}${wave(217,111,64)}${wave(246,126,56)}${label(79,150,'西 · 苍山')}${label(166,154,'村落')}${label(275,154,'东 · 洱海')}`},
  shangrila:{title:'同一片高原，两种停留',caption:'城镇与寺院偏向文化，湿地与草甸偏向开阔。不是每一天都需要看雪峰。',body:()=>`${path('M0 71 45 45 86 70 128 35 179 75 222 40 285 76 332 48 360 67V131H0Z','#d6e4df')}${roof(33,98,72)}${path('M28 98H110M53 82V70m31 12V68','none','#8e7662',3)}${path('M13 128Q180 98 349 132V142H13Z','#b9d0a0')}<ellipse cx="261" cy="119" rx="50" ry="12" fill="#9acdd5"/>${path('M144 49Q183 58 224 43','none','#677f7d',1)}${[151,168,185,202].map((x,i)=>path(`M${x} ${i<2?52:49}v12l12-11Z`,['#bd6956','#d3ba73','#6c8caa','#75a398'][i])).join('')}${label(71,162,'藏地建筑与街巷')}${label(267,162,'湿地与远山')}`},
  mangshi:{title:'让树影把街巷连起来',caption:'早市、地方小吃与树荫下的停留可以连成一天；不是雪山湖泊型目的地。',body:()=>`${path('M47 140Q100 110 166 129T318 140','none','#d5c4a7',18)}${tree(47,62,29)}${tree(310,70,30)}<rect x="117" y="81" width="89" height="49" fill="#edd7b7"/>${path('M109 80H213l-10-20H122Z','#aabc8d')}${[129,147,165,183].map(x=>`<circle cx="${x}" cy="116" r="6" fill="#c88956"/>`).join('')}${path('M238 127h39l-8-14h-23Zm6-15h27l-8-14h-11Zm8-15h11l-5-14Z','#c7a35c')}${label(60,163,'树影')}${label(160,163,'早市与小吃')}${label(284,163,'地方文化')}`},
  kunming:{title:'近看一片叶，慢过半座城',caption:'植物园可以占用半天；城市街巷与一碗米线，是另一种注意力。',body:()=>`${path('M68 125C24 74 55 27 99 28c29 46 24 87-31 97Z','#9fbea0')}${path('M70 126 86 49m-7 33L56 65m20 36 31-18','none','#3f806c',2)}${path('M178 126C142 88 159 54 204 50c13 39 7 69-26 76Z','#bed298')}${path('M177 127 192 65','none','#6c9772',2)}${path('M253 110q8 33 37 33t38-33Z','#8eaebb')}${path('M257 110q34-15 69 0','none','#ddc59c',6)}${path('M277 96q-7-10 0-20m18 20q-7-10 0-20','none','#8eaebb',2)}${label(100,158,'植物与观察')}${label(278,163,'街头与米线')}`},
  fuxian:{title:'湖是主角，岸边就是今天',caption:'不同湖岸并不挨着。选一段湖湾，比把环湖当任务更贴近留白。',body:()=>`${path('M0 76 49 54 94 77 153 50 223 79 291 56 360 77V97H0Z','#c3d7cf')}<ellipse cx="178" cy="113" rx="164" ry="34" fill="#a2d1e3"/>${wave(36,105,108)}${wave(148,119,140)}${wave(72,134,73)}${path('M285 98q30-4 69 9','none','#e2ceac',12)}<path d="M310 92v-24m-19 10q18-28 36 0Z" fill="#d7b67d" stroke="#9a855c"/>${label(108,166,'湖面与天色')}${label(283,166,'选一段岸线')}`},
  jianshui:{title:'一座院、一炉豆腐、一点手艺',caption:'看懂院落、坐下寻味、参与紫陶，是三种节奏。一天保留一个真正想做的重点。',body:()=>`${roof(18,93,94)}<rect x="48" y="104" width="28" height="30" fill="#9e9275"/>${path('M14 140H123','none','#b49a78',3)}<ellipse cx="183" cy="126" rx="38" ry="12" fill="#627676"/>${[158,180,202].map(x=>`<rect x="${x}" y="105" width="17" height="16" rx="3" fill="#e0bf78"/>`).join('')}${path('M270 79h38l-5 17q24 38-15 43-39-5-15-43Z','#a57562')}${path('M277 98h23','none','#e1b89b',3)}${label(66,162,'院落故事')}${label(182,162,'炉边豆腐')}${label(288,162,'紫陶手作')}`},
  lijiang:{title:'山下的日子，有自己的价值',caption:'古城水巷与雪山是独立安排。云挡住山时，村落与文化仍能撑起一天。',body:()=>`${path('M82 83 143 27 198 83 244 46 284 89Z','#bccdd0')}${path('m123 45 20-18 24 25-18-7-9 4Z','#f8fbf8')}${path('M111 47q18-17 39-3 16-8 36 7','none','#e6eeed',10)}${roof(26,114,60)}${roof(238,108,70)}${path('M177 97q-45 18-13 37t-13 31','none','#95c9d7',13)}${label(60,163,'村落与院落')}${label(278,159,'水巷生活')}`},
  tengchong:{title:'侨乡与地热，要分开留时间',caption:'和顺适合读院落与田园；地热观景和泡温泉也不是同一项体验。',body:()=>`${roof(25,94,88)}${path('M17 134q60-14 113 0','none','#abc094',10)}${path('M182 123 214 81l33 42Z','#b4c0af')}<ellipse cx="212" cy="81" rx="12" ry="4" fill="#879586"/><ellipse cx="294" cy="126" rx="32" ry="12" fill="#acd5d5"/>${path('M284 111q-12-13 0-25m16 25q-12-13 0-25','none','#85aeae',2)}${label(73,162,'和顺院落')}${label(214,155,'地热景观',undefined,11)}${label(299,174,'温泉另选',undefined,11)}`},
  xishuangbanna:{title:'浓绿里，时间走得更慢',caption:'园区植物、热带气候与傣味各有份量。景洪与勐仑并非一个步行片区。',body:()=>`${path('M71 139C25 91 28 43 73 26c51 35 49 82-2 113Z','#8db6a1')}${path('M70 142 74 45m-3 38L48 59m24 43 27-21','none','#427b65',2)}${path('M157 141q-10-66 5-99m-6 31q-40-42-46-7 19-9 46 7m4-8q44-42 42-5-19-12-42 5','none','#639b7d',6)}<ellipse cx="272" cy="123" rx="53" ry="17" fill="#b5c5aa"/>${path('M237 119h69l-15-27h-38Z','#a6bd72')}${path('M256 103h34m-28 8h20','none','#e2d1a0',4)}${label(93,165,'植物与浓绿')}${label(277,165,'傣味与日常')}`}
};

export function sceneDetail(id,variant='full'){
  if(!Object.hasOwn(sceneDrawings,id))return '';
  const scene=sceneDrawings[id];
  return `<figure class="scene-detail${variant==='compact'?' is-compact':''}"><figcaption><strong>${scene.title}</strong></figcaption>${svg(scene.title,scene.body(),id==='tengchong'?'0 0 360 184':'0 0 360 178')}<p>${scene.caption}</p><span class="scene-detail-note">体验关系示意 · 非实景、非距离比例</span></figure>`;
}
