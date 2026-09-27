// Editorial regional corridors. Coordinates are approximate [longitude, latitude]
// anchors for a schematic overview, never navigation points. dayBudget is the
// suggested minimum number of itinerary days to reserve, not a transport quote.
// oneDay describes a settled experience day; long transfer/arrival days are extra
// decisions. Overnight branches are opt-in alternatives, never automatic add-ons.
const day = (morning, afternoon, evening, food, backup) => ({morning, afternoon, evening, food, backup});
const base = (id, name, coordinates, stayNote) => ({id, name, coordinates, stayNote});
const place = (id, name, coordinates, anchorBase, kind, dayBudget, tagline, experience, tradeoff, oneDay) => ({id, name, coordinates, anchorBase, kind, dayBudget, tagline, experience, tradeoff, oneDay});

export const corridors = [
  {
    id: 'dalibaizu', name: '苍洱与茶马古道线', region: '滇西北南段',
    tagline: '湖风、白族院落，再住进一个古集市',
    baseIds: ['dali'],
    stayBases: [
      base('dali', '大理／洱海西岸', [100.17,25.69], '古城附近、湖岸、喜洲择一作为起点，不必每天换住。'),
      base('shaxi', '剑川沙溪', [99.85,26.32], '只有舍得替换大理停留日，再安排沙溪住下来；不是洱海边顺手一拐。')
    ],
    traits: {mountain:4,lake:5,heritage:5,food:4,rest:5,novelty:3,craft:5,forest:2,street:4},
    recommendedDays: {min:5,max:7},
    stayStrategy: '少换住版：大理一个基地＋喜洲或周城。想走深一点：大理＋沙溪两个基地，再从沙溪选一天去石宝山。',
    transportCost: '洱海沿岸、周城、剑川沙溪分属不同片区。沙溪换住需要公路接驳和搬运行李；不要把大理—沙溪往返当作半天散步。',
    season: '十月田野可能已收割；苍山能见度、湖水颜色和古镇客流都不能保证。古集市以实际开集日为准。',
    chooseOneNote: '喜洲院落和周城扎染先选更心动的一天；加沙溪就删掉一部分大理清单。',
    places: [
      place('xizhou','喜洲',[100.13,25.85],'dali','daytrip',1,'院落和一份热粑粑，就能撑起一天','看白族民居格局，在街巷和农田边慢慢辨认生活的细节。','从住宿处单独安排往返；田野不等于全年金黄。',day('吃一份喜洲粑粑，选一处开放院落慢看。','留在喜洲吃家常菜，走短短几条街或坐在院子里。','回原住宿片区吃饭，今天不再追环湖日落。','喜洲粑粑、白族家常菜、烤乳扇','下雨就把田野段换成院落与小店；院落开放情况另核。')),
      place('zhoucheng','周城',[100.13,25.89],'dali','replacement',1,'把一块白布变成自己的云南','在扎染工坊看扎结、染色与展开，手作成为这一天的主角。','要先确认工坊预约、时长和成品取件；用它替换喜洲日，不在半天里挤两套体验。',day('到已确认接待的扎染工坊，先看几种花纹怎样形成。','选适合自己的简单作品，留时间等工序、散步与吃饭。','回住处晾开作品，记录这一天亲手做过的步骤。','热饵丝、白族家常菜','约不到工坊就只看工艺与街巷，不默认临时一定能做。')),
      place('shaxi','剑川沙溪',[99.85,26.32],'dali','overnight',2,'把古镇从一张照片住成日常','在寺登街看戏台与老建筑，在黑潓江边走一小段，听见古集市之外的日常。','需要换住并留转场；两天是紧凑下限，若还去石宝山应继续增加时间或删别处。',day('在寺登街吃早餐，围着四方街慢看建筑与店铺。','去玉津桥和河边走一小段，回古镇喝茶或看书。','在同一片区吃晚饭，留下不赶回大理的一晚。','当地饵丝、白族家常菜','雨天保留院落与茶馆；赶不上集市就体验普通的一天。')),
      place('shibaoshan','剑川石宝山',[99.84,26.40],'shaxi','replacement',1,'把山路和石窟留给完整一天','从沙溪出发，选择开放的寺院、石窟片区看造像与山林。','先住沙溪再安排更自然；景区片区分散、有台阶和接驳，不能把全部山路默认成轻松徒步。',day('确认当日开放与交通后，只选最想看的石窟或寺院片区。','慢看造像细节，给景区接驳和下山留时间。','回沙溪吃热饭，不叠加另一个古镇。','路餐、沙溪家常菜','雨天或不想走台阶，就把整天换成沙溪街巷与文化空间。'))
    ],
    sources: [
      {title:'剑川县文旅局：石宝山与沙溪的位置、景观和交通',url:'https://www.jianchuan.gov.cn/jcxrmzf/c108508/pc/content/1984051507287396352/content_1984051507287396352.html'},
      {title:'剑川县政府：沙溪古集市与传统村落',url:'https://www.jianchuan.gov.cn/jcxrmzf/c108508/pc/content/1984434578125852672/content_1984434578125852672.html'},
      {title:'中国非遗：白族扎染',url:'https://www.ihchina.cn/news_1_details/11139.html'}
    ]
  },
  {
    id:'northwest', name:'纳西水巷到藏地高原线', region:'滇西北',
    tagline:'白沙的院子，与经幡背后的生活', baseIds:['lijiang','shangrila'],
    stayBases:[
      base('lijiang','丽江／白沙或束河',[100.23,26.87],'大研、束河、白沙择一住宿片区，不用古镇之间每天搬行李。'),
      base('shangrila','香格里拉城区',[99.71,27.83],'为抵达、休息、寺院和湿地分别留时间，不自动继续北上。')
    ],
    traits:{mountain:5,lake:3,heritage:5,food:3,rest:3,novelty:5,craft:3,forest:4,street:4},
    recommendedDays:{min:6,max:8},
    stayStrategy:'六七天先用丽江＋香格里拉两个基地。喜欢文化就多留村落和寺院；喜欢开阔就以湿地替换部分古城日。',
    transportCost:'丽江与香格里拉可核实铁路或公路衔接；选择火车不代表会途经虎跳峡景区。额外峡谷日、雪山日各占完整时间。',
    season:'雪峰显露、纳帕海水面、草甸颜色和候鸟受季节天气影响；十月不是把所有景观一次集齐的保证。',
    chooseOneNote:'白沙／束河选一处，寺院／湿地一天一个重点。梅里、德钦和雨崩需要另一份时间预算。',
    places:[
      place('baisha','白沙',[100.22,26.96],'lijiang','daytrip',1,'在雪山方向，先听院子里的故事','看纳西村落街巷，选择开放的壁画或文化空间，吃一顿当地饭。','壁画、讲解、开放安排需核实；雪峰看不见，这一天也应当成立。',day('沿白沙街巷慢走，选一处开放文化空间细看。','吃鸡豆凉粉和家常菜，在小店坐下来。','回原住宿片区休息，不再赶束河和大研全套。','鸡豆凉粉、纳西家常菜','天气不好就缩短户外段，保留讲解与小店。')),
      place('hutiaoxia','虎跳峡',[100.10,27.19],'lijiang','replacement',1,'把江水的尺度看进眼里','选择已确认开放的观景路线，体会金沙江与峡谷的落差。','单独确认往返或包车转场方案；本安排不含中虎跳、长线徒步，也不默认为火车中途下车顺游。',day('按已确认的公路交通与开放路线出发，留足接驳时间。','只完成选定的观景段，坐下来吃饭，再按原计划返回。','回丽江休息；若当天转香格里拉，须把它整体改为转场日。','路餐或沿途热饭、返程热汤','天气或开放变化就整天改为丽江文化日，不临时拼高强度徒步。')),
      place('songzanlin','松赞林寺',[99.70,27.86],'shangrila','daytrip',1,'愿意听懂一点，胜过拍完就走','藏地建筑、色彩与寺院空间，适合有讲解地慢看。','有台阶与高原环境，保持慢节奏；参观路线与礼仪按现场安排。',day('按开放安排慢看建筑与细节，今天只设这一个重点。','回城区吃饭、喝茶、休息，不追加整圈湿地。','试一份青稞食品，整理今天最想继续了解的问题。','酥油茶、青稞食品、牦牛肉熟食','身体状态或参观安排不合适时，改为住宿附近休息和茶馆。')),
      place('napahai','纳帕海周边',[99.64,27.85],'shangrila','daytrip',1,'开阔本身，就是今天的内容','在允许游览的湿地周边选一段看水、草甸与远山。','要安排往返交通，环线不等于必须走完；不把骑马或草地进入权默认包含。',day('确认天气和可通行路段，挑一段允许停留的位置。','看云、拍照或坐着，愿意才多走一小段。','回城区吃热饭，今天不追第二个落日。','热早餐、藏地家常菜','风雨较大就改独克宗街巷与室内休息；不承诺雪山和候鸟。')),
      place('pudacuo','普达措',[99.96,27.91],'shangrila','replacement',1,'用一整天听森林和湖水','按当日开放片区游览高原森林与湖泊，把注意力交给栈道边的细节。','园区接驳与步行占时间；用它替换一个城区或湿地日，不再叠加寺院。',day('核实开放片区、交通和个人体力后出发。','只走适合自己的开放步道，保留休息、接驳与返程时间。','回城区吃饭休息，不安排夜间赶场。','完整早餐、便携路餐、热汤','风雨或游览条件不合适，就换城区慢逛；不承诺十月整片金黄。'))
    ],
    sources:[
      {title:'迪庆州政府：主要旅游资源',url:'https://www.diqing.gov.cn/dqgk/lyzy.html'},
      {title:'迪庆州政府：丽香铁路与区域交通',url:'https://www.diqing.gov.cn/xwzx/dqyw/202603/20260311_238904.html'},
      {title:'联合国教科文组织：丽江古城',url:'https://whc.unesco.org/en/list/811/'}
    ]
  },
  {
    id:'central',name:'春城植物与高原湖岸线',region:'滇中',
    tagline:'从一片叶子，到一整个空出来的下午',baseIds:['kunming','fuxian'],
    stayBases:[
      base('kunming','昆明',[102.72,25.04],'按市中心、植物园或交通接驳的优先级选住处。'),
      base('fuxian','澄江／抚仙湖',[102.88,24.54],'湖岸选一片住下，别为了不同颜色的湖水每天换岸。')
    ],
    traits:{mountain:2,lake:5,heritage:3,food:5,rest:5,novelty:3,craft:2,forest:5,street:5},
    recommendedDays:{min:5,max:7},
    stayStrategy:'昆明先过两种日常：市场与植物。再决定抚仙湖住一两晚，或只留昆明一个基地。',
    transportCost:'昆明北郊植物园、呈贡、石林与抚仙湖是不同方向。跨片区交通要单独留时间，抚仙湖不默认从昆明每天往返。',
    season:'湖色、花期与天气同步变化；国庆不把大群红嘴鸥或植物园某种花开作为保证。',
    chooseOneNote:'要地貌新鲜感，选石林一整天；要松弛感，就用这天留在湖岸。两种愿望不必同时完成。',
    places:[
      place('kunming-botanical','昆明植物园',[102.74,25.14],'kunming','replacement',1,'让一片叶子值得专程去看','选感兴趣的专类园观察植物，而非匆匆走完所有园区。','在北郊；扶荔宫需单独核实预约与讲解，普通入园不等于能进所有场馆。',day('专程到植物园，挑几种形态特别的叶子和树慢看。','继续观察或坐下读标牌，若已约好再参观专项场馆。','回原住宿片区吃饭，不再横穿去斗南。','小锅米线、烧饵块、家常菜','按当天开放调整户外段；场馆约不上就保留普通开放园区。')),
      place('shilin','石林',[103.32,24.82],'kunming','replacement',1,'第一次认真看懂石头怎样变成森林','在喀斯特石峰间选一条合适步道，给地质与彝族文化都留一点注意力。','从昆明专程往返，交通、景区接驳与步行各占时间；不与植物园、抚仙湖拼成同一天。',day('按实际车次或车辆安排抵达，先选择适合体力的游览线。','慢看石峰形态，休息后再决定是否继续。','返回昆明吃晚饭，留足返程余量。','路餐、彝族风味或昆明家常菜','雨天依开放情况缩短步行，或整天改市内博物馆与老街。')),
      place('chengjiang-museum','澄江化石地博物馆',[102.99,24.66],'fuxian','replacement',1,'从湖边，走进很久以前的海','通过展陈认识寒武纪生命，把自然风景补上一层时间感。','先核实预约与开放；博物馆并非所有湖岸住宿步行可达，需留往返交通。',day('按预约前往博物馆，先抓住生命演化主线。','只挑感兴趣的展区认真看，再回原湖岸吃饭休息。','天气舒服就在住处附近散步，不再赶另一岸。','铜锅洋芋饭、澄江小吃','闭馆或约不到就保留湖边留白日；不把化石产地当可自由采集区。')),
      place('fuxian-stay','抚仙湖慢住',[102.88,24.54],'kunming','overnight',2,'不必做什么，也拥有一个假期','选择同一片湖岸住宿，在步行、午睡和吃饭之间自由切换。','加这一段意味着换住和城市间转场；湖景房与公共湖岸视野不同，按真实报价决定。',day('吃早餐，从住处附近选一段开放湖岸走走。','吃铜锅洋芋饭，午睡、读书或者聊天。','重访同一段湖岸，再吃一顿合口味的晚饭。','铜锅洋芋饭、凉米线、家常菜','湖色灰也可以成立：选一间愿意待着的住处，把时间留给自己。'))
    ],
    sources:[
      {title:'玉溪市政府：澄江自然资源与湖泊、化石地',url:'https://www.yuxi.gov.cn/yxs/sxqjjnew/20250414/577431.html'},
      {title:'玉溪市政府：澄江化石地博物馆展陈',url:'https://www.yuxi.gov.cn/yxs/ywdtsy/20250908/1621420.html'},
      {title:'澄江市政府：湖区旅游交通分布',url:'https://www.yncj.gov.cn/cjxzfxxgk/cjswhhlyj/20260629/1668830.html'},
      {title:'联合国教科文组织：中国南方喀斯特',url:'https://whc.unesco.org/en/list/1248/'},
      {title:'昆明植物园：扶荔宫参观讲解预约',url:'https://kbg.kib.cas.cn/tzgg/202510/t20251015_783811.html'}
    ]
  },
  {
    id:'honghe',name:'红河古城与烟火支线',region:'滇东南',
    tagline:'一炉豆腐、一碗米线，或一片仍在生活的梯田',baseIds:['jianshui'],
    stayBases:[
      base('jianshui','建水',[102.83,23.62],'先住古城周边，古建、炉边豆腐和紫陶分天。'),
      base('mengzi','蒙自',[103.39,23.37],'想细吃过桥米线、看南湖与碧色寨再换住。'),
      base('mile','弥勒',[103.41,24.41],'以红砖建筑或温泉休闲替换另一座城；不与蒙自、元阳全塞。'),
      base('yuanyang','元阳梯田片区',[102.78,23.10],'选新街或梯田景区内具体片区，抵达县域不等于抵达观景点。')
    ],
    traits:{mountain:3,lake:2,heritage:5,food:5,rest:4,novelty:4,craft:5,forest:2,street:5},
    recommendedDays:{min:5,max:7},
    stayStrategy:'建水作主角，再从蒙自、弥勒、元阳中选一个第二基地。石屏或团山作为可替换的一天。',
    transportCost:'建水、蒙自、弥勒和元阳并非一条路上的连续景点。铁路城市仍要考虑车站接驳；元阳梯田另有公路与山路，不能写成顺路半天。',
    season:'元阳是活着的农耕景观；十月收割、田面与灌水进度有差异，不把冬春镜面梯田海报当作国庆保证。',
    chooseOneNote:'米线与街头生活选蒙自；建筑与休闲选弥勒；农耕与山地景观选元阳。只选一个第二方向会更从容。',
    places:[
      place('tuanshan','团山村',[102.74,23.61],'jianshui','daytrip',1,'把木雕和院子看得慢一点','看传统民居的门窗、院落与空间，感受古城之外的村落尺度。','小火车与公路是不同到达方案；车次、票务、停留与开放均需先确认。',day('按已确认交通前往团山，选开放院落慢看。','留在同片区吃饭或继续看建筑细节，再按原方案返回。','回建水古城坐下来吃烧豆腐。','草芽米线、建水烧豆腐','没有合适车次就另核公路接驳，或整天留建水，不默认小火车随到随走。')),
      place('shiping','石屏',[102.50,23.72],'jianshui','replacement',1,'另一座古城，另一种豆腐香','沿石屏老街慢走，把豆腐风味和古城日常放在同一天。','与建水不同城；先确认能接受往返交通，再整天替换一个建水日。',day('抵达石屏古城后吃早餐或午餐，选几条街慢逛。','找一个能坐下的小店尝豆腐，愿意才增加一处开放文化空间。','留足返回建水时间，不另加异龙湖整圈。','石屏豆腐、当地米线','雨天就保留室内文化空间与吃饭；交通不合适则留建水。')),
      place('mengzi','蒙自',[103.39,23.37],'jianshui','overnight',2,'为一碗米线，多留一点生活','过桥米线、南湖与城市街巷；碧色寨可作为第二个完整重点。','需换住和车站或公路接驳；南湖和碧色寨不等于同一条步行街。',day('从一份分量合适的过桥米线开始，看配料与吃法。','南湖附近慢逛、坐坐，留心普通街头生活。','就近吃一顿家常菜；碧色寨另留一天，不在今天急着穿城。','过桥米线、当地小吃','下雨可换室内文化空间；过桥米线馆也按价格和分量选，不必追单一网红店。')),
      place('mile','弥勒',[103.41,24.41],'jianshui','overnight',2,'红砖的曲线，和不赶时间的下午','以东风韵的建筑空间或温泉休闲作为一段独立停留。','从建水另作一段转场，温泉与景区各有票务；用它替换蒙自或元阳，不自动叠加。',day('到已确认开放的东风韵，慢看建筑、光线和空间。','就近吃饭休息；若更想泡汤，就把这整天换为提前确认的温泉安排。','回住宿片区吃饭，今天只保留一种主体验。','卤鸡米线、当地家常菜','雨大就以室内空间和休息为主；不承诺泡汤设施包含在景区门票内。')),
      place('yuanyang','元阳哈尼梯田',[102.78,23.10],'jianshui','overnight',3,'看见山地里，田与村怎样一起生活','看梯田、村落和森林之间的关系，也为当地饭桌留时间。','至少留进山、完整体验、离开三段时间；山路、住宿片区和观景点要另排，不当建水当日往返。',day('天气合适才去已确认开放的观景点，不强求日出。','选择一个愿意接待的村落或展陈，了解农耕与用水，再吃饭休息。','只选一个附近的晚间观景位置，或直接回住处吃饭。','梯田红米、哈尼风味家常菜','云雾遮挡就把重点转向村落与农耕文化；十月不承诺大面积灌水镜面。'))
    ],
    sources:[
      {title:'红河州文旅局：各旅游片区与线路分布',url:'https://www.hh.gov.cn/info/12711/751582.htm'},
      {title:'红河州文旅局：建水、蒙自、弥勒、元阳体验特色',url:'https://www.hh.gov.cn/info/12681/761622.htm'},
      {title:'元阳县政府：梯田旅游季节',url:'https://www.hhyy.gov.cn/info/1121/195601.htm'},
      {title:'联合国教科文组织：红河哈尼梯田文化景观',url:'https://whc.unesco.org/en/list/1111/'}
    ]
  },
  {
    id:'west',name:'德宏风味与腾冲侨乡线',region:'滇西',
    tagline:'酸辣香甜的街头，转进石巷与热气',baseIds:['mangshi','tengchong'],
    stayBases:[
      base('mangshi','芒市',[98.59,24.44],'城区选择吃饭与步行方便的位置，金塔片区专门安排。'),
      base('tengchong','腾冲／和顺',[98.49,25.02],'城区或和顺选一个住宿重点，热海、北海湿地分天。')
    ],
    traits:{mountain:2,lake:2,heritage:4,food:5,rest:5,novelty:5,craft:3,forest:3,street:5},
    recommendedDays:{min:6,max:7},
    stayStrategy:'只想吃与逛就留芒市一个基地；想换一种生活质感再加腾冲，两个基地之间留专门转场。',
    transportCost:'芒市与腾冲为跨城公路衔接，不当城区间打车散步。航班进出、车辆和假期报价需要一起核对。',
    season:'十月仍可能有雨；腾冲银杏的黄叶不是国庆保证，热海也不等同于所有门票都含泡温泉。',
    chooseOneNote:'芒市多留半天吃饭，和顺多留半天走巷子；热海与北海湿地按兴趣替换，不必都买票。',
    places:[
      place('menghuan','勐焕金塔片区',[98.61,24.42],'mangshi','daytrip',1,'从城市街头，抬头看金色的轮廓','在允许参观的建筑与观景片区慢看，再回城吃饭。','金塔与周边其他景点票务分别核实；热门时段和交通可能等待，不承诺落日。',day('早餐后按开放安排前往，慢看建筑与城市方向。','回城吃饭、午休，把热闹时段留给自由决定。','在住宿附近尝一两样小吃，而不是把清单吃完。','饵丝、泡鲁达、傣味家常菜','雨大就换城区吃饭与室内停留，建筑日可以调换。')),
      place('mangshi-flavours','芒市街头风味',[98.59,24.44],'mangshi','replacement',1,'让味觉带路，不让榜单催你','市场、撒撇、舂菜与甜品，少量多次认识不同风味。','陌生酸苦辣不一定都合口味，先问做法点小份；热门店排队可以换一家。',day('在市场或早餐铺看当地食材，吃一碗顺口的饵丝。','选一两样傣味，吃完回去休息，傍晚再决定是否继续尝鲜。','喝一份泡鲁达或吃甜品，留在同一个片区走走。','饵丝、熟食做法的撒撇、舂菜、泡鲁达','不合口味就换热汤与熟食，体验不靠挑战自己证明。')),
      place('heshun','和顺',[98.46,25.01],'tengchong','daytrip',1,'沿石巷，认识一座侨乡','院落、巷道与田边小路相互连接，适合听故事与慢慢走。','景区票务与室内点位开放另核；如果已住和顺，这就是不用搬行李的日常。',day('沿石巷吃早餐，选择一处开放展馆或院落了解侨乡故事。','吃饭后在同片区喝茶，愿意再走到田边。','留在和顺或回原住处吃晚饭，不急着赶温泉。','饵丝、大救驾、腾冲家常菜','下雨就缩短田边段，保留开放室内空间与茶馆。')),
      place('rehai','腾冲热海',[98.44,24.95],'tengchong','replacement',1,'地热的声音，和慢下来的身体','看地热景观；是否另选泡汤，根据已确认票务与设施决定。','地热观光与温泉项目分开核实；不能把火山、热海和和顺都压进一天。',day('按开放安排观察地热景观，走适合自己的路线。','若已另作泡汤安排就留完整下午；否则吃饭后回住处休息。','在住宿附近吃一顿热饭，今天不赶另一个景区。','大救驾、当地家常菜','天气或设施安排变化，就整天换和顺慢逛；不临时默认可以泡汤。')),
      place('beihai','腾冲北海湿地',[98.57,25.11],'tengchong','replacement',1,'把目光交给水面与草甸','在开放步道和观景区域观察湿地，适合比景点清单更关心自然细节的人。','游览项目、开放区和景观状态随实际安排变化；不默认能进入草甸或乘船。',day('确认开放后前往，只选自己真正想体验的项目。','在允许停留的位置看水面、植物和远山，再按原计划返回。','回腾冲吃饭休息，把热海留作另一天的替代选项。','腾冲饵丝、家常菜','天气不适合湿地，就换城区文化空间与吃饭；不承诺特定花期与鸟群。'))
    ],
    sources:[
      {title:'云南省住建厅：腾冲地热火山、和顺等景区分布',url:'https://zfcxjst.yn.gov.cn/zhengfuxinxigongkai/guihuaxinxi8780/286008.html'},
      {title:'云南省农业农村厅：腾冲和顺旅居与周边景区',url:'https://nync.yn.gov.cn/html/2026/zhoushilianbo-new_0302/1424735.html'},
      {title:'芒市政府：地方风味与景区介绍',url:'https://www.dhms.gov.cn/wclx/Web/_F0_0_65BAIB4ND840A88A627745F6A0.htm'}
    ]
  },
  {
    id:'south',name:'版纳雨林与茶林慢游线',region:'滇南／滇西南',
    tagline:'巨叶、傣味与一杯茶，各自拥有完整的一天',baseIds:['xishuangbanna'],
    stayBases:[
      base('xishuangbanna','景洪',[100.80,22.01],'把城区吃饭和市外植物园分天；住处安静程度比夜市距离更需要先想清。'),
      base('mengla-menglun','勐仑',[101.25,21.93],'若主要想看植物园，可以选择这里换住，减少反复往返景洪。'),
      base('puer','普洱思茅',[100.97,22.78],'茶与咖啡、城市日常是这一基地的重点。'),
      base('jingmai','澜沧景迈山',[100.01,22.18],'明确是另一段山地行程，需要选定村寨住宿与接驳。')
    ],
    traits:{mountain:2,lake:2,heritage:5,food:5,rest:4,novelty:5,craft:3,forest:5,street:4},
    recommendedDays:{min:6,max:8},
    stayStrategy:'七天以景洪＋周边为基础；要加第二基地，在普洱思茅和景迈山之间二选一。更想植物就以勐仑替换一段城市住宿。',
    transportCost:'景洪—普洱思茅与景洪—景迈山是不同方向的衔接。景迈山在澜沧县，不是普洱站旁边的茶园；公路、入山接驳与村寨之间移动都要另排。',
    season:'十月仍需接受温热、阵雨和园内步行；不承诺王莲最佳状态、野生动物出现或景迈云海。采茶与制茶参与取决于农时和接待安排。',
    chooseOneNote:'雨林植物、傣族村落和古茶林都值得；每多一种体验，就要明确删掉哪一天，不能靠缩短睡眠凑全。',
    places:[
      place('xtbg','勐仑热带植物园',[101.25,21.93],'xishuangbanna','replacement',1,'巨大的叶子，让尺度突然改变','把一整天交给热带植物；西区专类园与东区步道按兴趣体力选择。','园在勐仑，不在景洪城区；往返交通、园内接驳和步行都占时间，不默认一天走完东西区。',day('按核实的交通前往，先挑最感兴趣的专类园。','继续看植物或休息，只在时间体力充足时增加开放步道。','按原计划返回景洪，给返程留足时间，不再强加夜市。','完整早餐、园区或镇上正餐、傣味熟食','阵雨时按园方安排调整，减少步道，不承诺王莲等单一景观状态。')),
      place('ganlanba','勐罕／橄榄坝',[100.93,21.85],'xishuangbanna','daytrip',1,'看村寨怎样过普通的一天','在允许游览的村寨与文化空间感受傣族建筑、植物和饭桌。','确认具体村寨、交通、票务和接待方式；不把节庆表演当作每天都会发生的生活。',day('到已确认接待的村寨，慢看建筑与日常空间。','吃一顿傣味，找荫凉处休息，愿意才继续短距离走走。','回景洪吃简单晚饭，让白天的味道留下来。','竹筒饭、傣味家常菜、时令水果','下雨改室内餐食与文化空间；私人院落先问，不擅自进入。')),
      place('puer','普洱思茅',[100.97,22.78],'xishuangbanna','overnight',2,'茶和咖啡，不只是带走的特产','用一段停留认识茶、咖啡与普通街头生活；参与活动先确认接待。','铁路车次仍需实际核对、另留车站接驳；思茅不等于景迈山，不能一天同时包办。',day('吃米线，选择一家有清楚介绍的茶或咖啡空间。','预约到合适体验再参与，或只在同片区慢喝、逛街。','就近吃家常菜，留一个不用再赶车的晚上。','米线、当地家常菜、茶或咖啡','体验约不到就保留城市慢游；不承诺随到随采茶或采咖啡。')),
      place('jingmai','景迈山古茶林与村寨',[100.01,22.18],'xishuangbanna','overnight',3,'在一杯茶里，看见森林和村寨','在开放古茶林与村寨理解林下种茶，坐下来听一段真实的茶与生活。','至少留进山、完整体验、离开三段时间；按实际道路、接驳和住宿安排重排，不从景洪或普洱城区当日往返。',day('从住宿村寨出发，按接待安排选择一段开放茶林慢看。','回村喝茶、吃饭，征得同意后与接待者交流种茶和生活。','留在同一村寨看天色或继续坐着，不追多个观景台。','茶、布朗族或傣族家常菜','下雨就保留村寨与喝茶；云海不是保证，制茶参与也需另约。'))
    ],
    sources:[
      {title:'中国科学院西双版纳热带植物园：园区与开放说明',url:'https://xtbg.cas.cn/2022/ykfw/ryxz/'},
      {title:'中国科学院西双版纳热带植物园：景洪往返交通',url:'https://xtbg.cas.cn/2022/ykfw/dzsw/'},
      {title:'联合国教科文组织：普洱景迈山古茶林文化景观',url:'https://whc.unesco.org/en/list/1665/'},
      {title:'云南省农业农村厅：澜沧县景迈山村寨与茶旅',url:'https://nync.yn.gov.cn/html/2026/zhoushilianbo-new_0224/1424613.html'}
    ]
  }
];

const placeTraits = {
  xizhou:{heritage:5,street:5,craft:3,lake:2}, zhoucheng:{heritage:5,craft:5,lake:1,rest:4},
  shaxi:{heritage:5,street:5,rest:5,lake:1,forest:3}, shibaoshan:{mountain:5,heritage:5,rest:2,lake:1},
  baisha:{heritage:5,street:5,rest:4}, hutiaoxia:{mountain:5,heritage:2,rest:1,street:1},
  songzanlin:{heritage:5,mountain:3,forest:1,rest:3}, napahai:{lake:5,mountain:5,heritage:2,rest:4},
  pudacuo:{forest:5,lake:5,mountain:4,rest:2,street:1},
  'kunming-botanical':{forest:5,lake:1,heritage:2,novelty:4,street:1},
  shilin:{mountain:5,lake:1,rest:2,forest:2,novelty:5},
  'chengjiang-museum':{heritage:4,forest:2,novelty:5,lake:2,street:1},
  'fuxian-stay':{lake:5,rest:5,street:2,forest:2,heritage:2},
  tuanshan:{heritage:5,craft:4,street:4},shiping:{heritage:4,food:5,rest:4,street:5},
  mengzi:{heritage:4,food:5,rest:4,street:5,craft:2},
  mile:{heritage:3,food:4,rest:5,novelty:4,craft:2,street:3},
  yuanyang:{mountain:5,heritage:5,rest:2,novelty:5,forest:4,street:2,craft:2},
  menghuan:{heritage:4,novelty:5,rest:3},'mangshi-flavours':{food:5,street:5,novelty:5,rest:5},
  heshun:{heritage:5,street:5,rest:5},rehai:{mountain:3,forest:3,novelty:5,rest:4,heritage:1},
  beihai:{lake:5,forest:4,rest:4,heritage:1,street:1},
  xtbg:{forest:5,novelty:5,rest:2,heritage:2,street:1},ganlanba:{heritage:5,food:5,street:4,forest:4},
  puer:{forest:4,food:5,rest:5,street:5,heritage:3},
  jingmai:{forest:5,heritage:5,novelty:5,rest:3,craft:4,street:3}
};
const visualByAnchor = {dali:'dali',shaxi:'dali',lijiang:'lijiang',shangrila:'shangrila',kunming:'kunming',fuxian:'fuxian',jianshui:'jianshui',mangshi:'mangshi',tengchong:'tengchong',xishuangbanna:'xishuangbanna'};
for (const corridor of corridors) {
  for (const option of corridor.places) {
    // These are editorial preference signals, not measured satisfaction scores.
    option.traits = {...corridor.traits,...placeTraits[option.id]};
    option.altitude = null; // Exact stay / attraction elevation is not verified here.
    option.requiresHighAltitude = ['songzanlin','napahai','pudacuo'].includes(option.id);
    option.visualBase = visualByAnchor[option.anchorBase];
    option.visualCaption = '区域氛围插画，不代表此地点实景';
    option.recommendedMinDays = option.dayBudget;
    if (option.kind === 'overnight') option.stayBaseId = option.id === 'fuxian-stay' ? 'fuxian' : option.id;
  }
}

export const corridorById = Object.fromEntries(corridors.map(corridor => [corridor.id,corridor]));

// Return editorial options only; matching a base does not select its neighbours.
export function getCorridorsForBases(ids = []) {
  if (!Array.isArray(ids)) return [];
  const selected = new Set(ids.filter(id => typeof id === 'string'));
  return corridors.filter(corridor => corridor.baseIds.some(id => selected.has(id)) || corridor.stayBases.some(base => selected.has(base.id)));
}
