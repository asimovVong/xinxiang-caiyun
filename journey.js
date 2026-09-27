import {regions, routeTemplates} from './regions.js?v=20260927-5';
import {corridorById} from './corridors.js?v=20260927-5';
import {regionalScenes,regionalQuestions,regionalActivityPriority,placeById,corridorBaseIds,isHighland} from './regional-model.js?v=20260927-5';

export const regionById = Object.fromEntries(regions.map(r => [r.id, r]));
export const axisNames = {mountain:'山川的尺度',lake:'湖岸留白',heritage:'文化与故事',food:'地方风味',rest:'自在停留',novelty:'日常之外',craft:'亲手参与',forest:'植物与浓绿',street:'街头生活'};
export const scenes = {
  dali:{title:'如果今天只等一阵湖风',sub:'大理 · 洱海与白族村落',image:'dali',sensory:'午后的风把水面吹亮。沿湖走一小段，转进白族院落，在街边吃一块烤乳扇。苍山一直在远处，你不急着靠近。',hook:'湖岸的空白，还是村落里正在发生的生活？',color:'#1a7c99'},
  shangrila:{title:'让经幡替你记住这阵风',sub:'香格里拉 · 藏地与高原',image:'shangrila',sensory:'风经过经幡，吹向村落和远山。茶碗温热，草甸的边界随季节改变。你想在这里停下，是因为辽阔，还是因为一种不同的日常？',hook:'想看一个震撼的画面，还是靠近一种不熟悉的生活？',color:'#4d7197'},
  mangshi:{title:'跟着早市的香气拐个弯',sub:'芒市 · 树影与边城风味',image:'mangshi',sensory:'早市里响着锅铲声，摊前是你没认全的香草。先问问做法，再点一碗饵丝。下午在树荫下喝一杯泡鲁达，不必每一站都有名气。',hook:'陌生的味道，是旅行的主角，还是一点恰好的新鲜？',color:'#477a53'},
  jianshui:{title:'把半天坐成一顿炉边豆腐',sub:'建水 · 院落、紫陶与老街',image:'jianshui',sensory:'炭火把豆腐烤得鼓起来。走进一座院子，慢慢看木刻和屋檐，再找一家紫陶小店。一整天的故事，可以很小。',hook:'吸引你的是建筑的故事，还是坐下来一起吃东西的人间烟火？',color:'#97503c'},
  kunming:{title:'为一片没见过的叶子停下',sub:'昆明 · 植物与城市日常',image:'kunming',sensory:'早上吃一碗小锅米线，把半天交给植物园。不是追着景点走，而是看叶脉、读名字，再找一家小店坐下。普通的一天，也可以很不同。',hook:'你想认识自然，还是想在另一座城里舒服地生活？',color:'#2d795d'},
  fuxian:{title:'这一下午，真的可以没有下一站',sub:'抚仙湖 · 湖水与空白',image:'fuxian',sensory:'铜锅洋芋饭吃完了，湖面还在发亮。今天没有第二张门票，不需要拍出什么。只是走走、坐坐、等天色改变。',hook:'这样的空白让你松一口气，还是让你开始心疼假期？',color:'#176fbc'},
  lijiang:{title:'雪山在云后，水巷还在眼前',sub:'丽江 · 纳西村落与雪山方向',image:'lijiang',sensory:'在白沙慢慢走，院门里有花，水沿石巷流过。抬头时，远山也许清晰，也许藏在云后。你会把这一天的好坏交给它吗？',hook:'你心里的丽江，是一座山，还是山下的日子？',color:'#68748b'},
  tengchong:{title:'在侨乡的巷子里慢下来',sub:'腾冲 · 和顺与地热',image:'tengchong',sensory:'和顺的院子、远处的田园、热海地热景观和温泉，是需要分开安排的几段体验。先选你愿意真正停留的那一段。',hook:'你更需要热气里的放松，还是一段侨乡故事？',color:'#778852'},
  xishuangbanna:{title:'走进一整个浓绿的世界',sub:'西双版纳 · 热带植物与傣味',image:'xishuangbanna',sensory:'叶子比想象中大，植物园里一条路就能走很久。回到城里吃一顿傣味。湿热、降雨和往返园区的交通，也属于这一种云南。',hook:'你是想认识植物，还是想换一种气候和生活节奏？',color:'#28694f'}
};
Object.assign(scenes,regionalScenes);
const o=(id,label,detail,weights={},echo='')=>({id,label,detail,weights,echo});
const unsure=()=>o('unknown','我还说不清','先留着，不用为了完成问卷勉强选。',{},'这项先留白。还没确定的愿望，也值得被认真保留。');
const q=(id,title,context,scene,options,stage='深一点')=>({id,title,context,scene,options:[...options,unsure()],stage});
const questions=[
q('dali_pull','你停在洱海边，最不想离开的是什么？','同一个大理，可以是白族村落、开阔湖山，也可以只是终于没人催你。','dali',[
o('quiet','终于可以什么都不完成','坐在湖边也算认真过了一天。',{rest:5,lake:3},'你留下的似乎是“可以不完成什么”的时间。下一问，我们看看这份轻松需要什么。'),
o('village','想看看湖边的人怎样生活','院落、扎染、早饭和日常，比一张合照更有吸引力。',{heritage:3,street:3,craft:2},'你选的是湖边的生活。大理的价值，可能在你愿不愿意从湖岸再走进村落。'),
o('vast','山与湖把视野一下打开','需要能让自己真正停住脚的自然尺度。',{lake:4,mountain:3},'开阔感对这次旅行很重要。接下来要分清：需要走很多地方，还是一个好位置就够。')]),
q('dali_depth','只剩一天，你愿意怎样把大理过小一点？','喜洲、周城、苍山和环湖全程并不在同一个小范围。这里没有“全部顺路”。','dali',[
o('shore','选一小段湖岸，住下再说','允许重复走同一条路。',{rest:4,lake:3},'你愿意用范围换停留。安排大理时，应先定一个舒服的基地。'),
o('craft','在村子里多待一点','看院落，做一次扎染，听人讲讲手艺。',{craft:4,heritage:3},'你想带走参与过的细节。手作时长和预约应成为当天唯一重点。'),
o('mountain','留给苍山的一段山路','交通与具体线路先核实，不再强行环湖。',{mountain:4,forest:2},'自然探索比湖边发呆更吸引你。轻松对你可能意味着少切换，而非完全不走路。')]),
q('shangrila_pull','经幡、远山、村落，究竟是什么牵住了你？','先不把“藏地”和“雪山”当成同一种愿望。','shangrila',[
o('culture','想靠近藏地的生活与文化','寺院建筑、经幡、茶与地方日常。',{heritage:5,novelty:3,street:1},'即使没有壮观雪峰，藏地本身仍可能值得。你的行程应该给理解和停留留位置。'),
o('open','想站进一片辽阔里','远山、湿地与草甸，让视线走得很远。',{mountain:5,novelty:2},'你选中的是自然尺度。接下来要看：当画面不够完美，这份向往还剩什么。'),
o('different','想离平常的城市生活远一点','想换一种空气、节奏和熟悉事物的比例。',{novelty:5,heritage:2},'这次你更需要差异感。它可能来自高原，也可能来自一座不熟悉的小城。')]),
q('shangrila_depth','如果没有拍到想象中的雪峰，这一天还值得吗？','这是一个假设。香格里拉不等于梅里雪山；去德钦、雨崩需要另外的时间。','shangrila',[
o('life','值得，我还是想坐下喝茶、看村落','让藏地生活成为主线。',{heritage:3,street:2},'你想去的不是一张限定天气的照片。文化与日常可以成为真正稳定的期待。'),
o('landscape','湿地和远山还在，也会开心','不用每一刻都壮观，但想多亲近自然。',{mountain:3,forest:1},'你能接受自然的变化。一天留一个户外重点，会比打卡多个景点更贴近这个答案。'),
o('image','会失望，那个画面对我很重要','愿意承认这趟有一个明确的视觉目标。',{mountain:5},'把期待说得具体很有用。我们会保留天气风险，不把“多待一天”当作看见雪山的保证。')]),
q('mangshi_pull','到了早市，你更想做哪件事？','同样是寻味，有人享受陌生，有人享受一顿顺口的饭。','mangshi',[
o('flavor','问问没见过的食材，试一口','接受味道可能和预想不同。',{food:4,novelty:4},'你愿意让味觉带一点冒险。点餐前了解食材和做法，也是在认真认识当地。'),
o('daily','看当地人买菜、吃早饭','不用每一家都是网上热门。',{street:5,heritage:2},'你喜欢的是街头正在发生的日常。小店和市场比排满景点更重要。'),
o('shade','找一碗顺口的，再去树荫下坐','地方味道加上舒服的节奏就够了。',{rest:4,food:2},'你想过得舒服，也愿意有一点地方风味。没有必要把“吃遍”变成任务。')]),
q('mangshi_depth','如果几天都没有雪山和大湖，你会不会遗憾？','芒市的亮点是佛塔、树影、地方文化与风味。腾冲的火山温泉不能直接算在芒市。','mangshi',[
o('enough','这些新的日常就足够了','为一顿饭和一条街特意去，也值得。',{food:3,street:3,novelty:2},'对你而言，旅行的变化可以很近、很小。芒市有成为完整目的地的理由。'),
o('need','会，我还想有一次开阔的大风景','不一定要多城，但需要自然成为主角一次。',{mountain:3,lake:3},'风味之外，你仍需要自然尺度。结果会把这份遗憾摆出来，不把芒市直接定成答案。'),
o('short','想体验，但两天左右可能就够','更适合和同方向的停留组合。',{food:2,novelty:2},'芒市可能是一段体验，而非全部假期。跨方向增加高原，会付出明显转场代价。')]),
q('jianshui_pull','你会为什么在古城里慢下脚步？','古建筑、手艺和炉边小吃，要求的是三种不同的注意力。','jianshui',[
o('story','想听懂一座院子的故事','愿意看构件、听讲解，不只是拍门头。',{heritage:5},'你愿意把注意力交给细节。行程不应把每座院落压缩成十分钟。'),
o('hands','想自己试试陶土或手艺','留下一件亲手参与过的东西。',{craft:5,heritage:2},'参与感比数量重要。体验价格、预约和时长要提前核实。'),
o('table','想坐到烧豆腐的炉边','一顿饭里也能认识一座城。',{food:4,street:3,rest:1},'你想接近的是生活气味。街巷和饭桌可以是正经的旅行主线。')]),
q('jianshui_depth','一个下午，没有壮观景点，只有院子和吃饭呢？','建水不是元阳梯田。想看梯田要再算交通、季节与停留。','jianshui',[
o('stay','这些细节已经很丰富','愿意为一处喜欢的细节再回去一次。',{heritage:3,rest:2},'你能从小尺度的地方获得满足。建水适合慢看，而不是当成梯田前的一站。'),
o('mix','喜欢半天，再换一点自然','人文和自然需要交替。',{heritage:2,lake:2,mountain:1},'你更适合让街巷与自然交替。组合路线要为这次转换付出真实的时间。'),
o('move','会坐不住，想去开阔地方','不想为了文化丰富而勉强自己。',{mountain:4,lake:2},'这个答案帮你排除了一个看起来很正确、却未必适合自己的安排。')]),
q('kunming_pull','植物园里的哪一刻，会让你觉得值？','昆明植物园并不是“顺路拍拍花”。普通入园和扶荔宫等专门参观安排也要分开核实。','kunming',[
o('learn','认出原来不认识的植物','愿意看标牌、听讲解，停留得很慢。',{forest:5,novelty:2},'你的兴趣在观察和理解。半天是否足够，要把往返与具体园区一起算。'),
o('green','被浓绿和林荫包住','不急着记名字，喜欢置身其中。',{forest:3,rest:3},'你需要的是自然里的松弛。是否要专门园区，可按想待多久决定。'),
o('day','植物园只是舒服一天的一部分','还有米线、菜市场与城市散步。',{street:3,food:3,rest:2},'城市本身可以是目的地。昆明不必因为“只是省会”就被排除。')]),
q('kunming_depth','如果这趟更像换一座城生活，你会觉得少了什么吗？','翠湖、植物园、老街、花市并不在同一处；国庆也不承诺成群红嘴鸥。','kunming',[
o('enough','不会，我想把普通日子过舒服','一顿早饭、一段植物路就能成为记忆。',{rest:4,street:3},'对你来说，旅行不需要一直证明“来都来了”。昆明可以认真停留。'),
o('far','会，还是想有一段城市之外','昆明适合作为半天到一天的补充。',{novelty:3,mountain:2},'你愿意给昆明留一段时间，但主线仍在别处。植物园应是有余量才加入的选择。'),
o('plants','只要植物体验足够深入，就值得','愿意把一个园区当一天的重点。',{forest:5},'植物是明确的目的，不是城市行程里的装饰。结果会把这个兴趣单独记下来。')]),
q('fuxian_pull','湖边这一下午，最先浮现的感觉是什么？','假设没有下一张门票，也没有必须完成的拍照任务。','fuxian',[
o('release','松了一口气，终于不用赶','期待没有任务的时间。',{rest:5,lake:3},'空白本身就有价值。规划时必须真的为它留出时间。'),
o('company','和同行的人待着就很好','风景是陪伴的背景。',{rest:4,lake:2},'这趟的记忆也来自一起相处。同行人的节奏会比多一个景点更影响满足。'),
o('waste','会想，是不是还可以去哪儿','需要变化和可见的体验。',{novelty:3,mountain:2},'你不是不喜欢湖，而是不想让所有时间只有湖。半天体验或许更适合。')]),
q('fuxian_depth','你愿意让第二天依然是这片湖吗？','湖的颜色受天气影响。湖景房和普通住宿的差价，要看到真实报价再决定。','fuxian',[
o('repeat','愿意，同一段湖岸也会变化','重复能让我更放松。',{rest:5,lake:2},'重复对你不是浪费。少换住宿很可能是这个假期的关键。'),
o('half','半天足够，想搭配街巷和美食','湖水是一种节奏，不是全部内容。',{lake:2,food:2,street:2},'你希望留白有一个舒服的分量。湖畔加一段城市或古城，值得比较。'),
o('view','更想看漂亮水色，不一定久住','画面很吸引，但长时间闲坐未必适合。',{lake:4},'你喜欢的是湖的景色，暂时不能据此把自己定义成慢住型。')]),
q('lijiang_pull','你心里的丽江，最舍不得拿掉哪一部分？','纳西古城生活与雪山高处项目，需要分别决定。','lijiang',[
o('mountain','一座能抬头看见的雪山','愿意为它单独留一天。',{mountain:5},'雪山是一个清楚的愿望。预约、天气与高处环境也必须单独看。'),
o('naxi','白沙、水巷和纳西文化','更想慢慢走进山下的生活。',{heritage:4,street:3},'你选的是山下的生活。没有必要自动把高处索道加进来。'),
o('both','山下慢逛，再等一次山出现','接受自然与街巷交替。',{mountain:3,heritage:2,rest:1},'你愿意给两种体验各留空间，行程也应允许雪山计划被天气改变。')]),
q('lijiang_depth','如果热门雪山项目需要早起预约，你愿意吗？','索道、门票和交通需要另核；有票也不代表当天一定能按计划运行。','lijiang',[
o('worth','很想体验，愿意为这一天做功课','只安排少数重点，不每天这样。',{mountain:3},'你接受为一个重要目标付出时间。关键是确认它确实是自己的愿望。'),
o('village','更想在村子里随意走走','宁可少一个地标，也想自己决定节奏。',{rest:3,street:2,heritage:2},'自主安排的时间更重要。丽江可以只玩山下，不必照着标准清单走。'),
o('price','要看实际等待和总价','先保留，不急着答应。',{},'这个代价尚未被你接受。结果会把它留作出发前必须核对的一项。')]),
q('memory','如果没有城市名字，你想带回哪种记忆？','先选一个瞬间，不用马上知道它属于云南哪里。','dali',[
o('nature','站在很开阔的地方','让山、水和天空占据视线。',{mountain:4,lake:3},'我们先沿着自然的尺度找，而不急着替你挑城市。'),o('life','看懂另一种生活的一小部分','建筑、信仰、市场和手艺。',{heritage:4,street:2,novelty:2},'“人文”可以很具体。接下来的场景会帮助你分清喜欢什么。'),o('food','想起某一口味道还会开心','愿意为地方风味专程去。',{food:5,street:2},'味道可以成为主线，而不只是赶路之间的一顿饭。'),o('rest','回去时没有比出发时更累','一起待着，也给自己留白。',{rest:5,lake:1},'这一次，舒服的节奏本身值得优先安排。')],'心动'),
q('need','把目的地先放一边。你最想从这次假期得到什么？','选这一次的需要，不用把它当成你永远的性格。','dali',[
o('restore','不用一直做决定、赶时间','找回能慢慢吃饭和发呆的感觉。',{rest:4},'那么，“留白”应该真的出现在日程上，而不只是一句旅行口号。'),o('new','从熟悉的日常里走出去','让陌生食物、地方文化或自然带来新鲜感。',{novelty:4},'新鲜感不必靠城市数量来证明。同一地区里也可能遇见足够多的差异。'),o('understand','认真认识一个地方','宁愿看懂一些细节，也不只是到过。',{heritage:3,street:2,craft:1},'你在意理解，而非覆盖。适合把时间花在少数可慢慢接近的地方。'),o('together','和同行的人舒服地相处','想保留一起吃饭、闲聊和临时起意的空间。',{rest:3,street:1},'好的安排需要顾及两个人。答完后，可以让同行的人独立走一遍，再对照差异。')]),
q('food','一顿饭值得你专门绕路吗？','芒市的酸辣与香草、建水烧豆腐、昆明米线、藏地酥油茶，带来的快乐不同。','mangshi',[
o('adventure','值得，我想试不熟悉的风味','先问清食材与做法，接受并非每一口都喜欢。',{food:4,novelty:3},'陌生风味对你有独立的吸引力。下一步要确认愿意为它花多少时间。'),o('local','想多吃当地小吃，但也要顺口','不把挑战味觉当目标。',{food:4,street:2},'多样和舒服可以同时保留，不需要为了“正宗”勉强自己。'),o('easy','吃得舒服就好，不想排长队','食物加分，但不主导目的地。',{rest:2},'饭点应该服务于舒服的节奏，而非让整天跟着榜单移动。')]),
q('rest','午饭后，没有安排的一整个下午，你会怎样？','把自己放在真实的湖岸：不是短视频的几秒，而是四个小时。','fuxian',[
o('yes','这就是我想要的','聊天、散步、坐着，一样很充实。',{rest:5,lake:2},'你的旅行需要真正的空白。我们会给每个基地至少两个完整活动日，才称它为慢住。'),o('some','喜欢，但半天就够','之后还想换一种体验。',{rest:2,street:1},'你喜欢留白，但也需要变化。每天一个重点可能比全程躺平更合适。'),o('no','会觉得错过了很多','想把时间用在更多具体体验上。',{novelty:3,mountain:1},'你更需要体验密度。可以选择一个地区里的丰富变化，不一定马上增加转场。')],'代价'),
q('weather','想象出发前，你得知那几天可能多云。','这不是天气预报，而是在分辨你希望旅途如何面对不完美的画面。','lijiang',[
o('flexible','换成村落、园区、吃喝也会开心','让一座地方有不止一种价值。',{},'你愿意让体验随天气变化。备选活动应与主线同样值得，而不是临时凑数。'),o('must','会遗憾，我确实想看清晰山景','愿意承认旅行有一个画面目标。',{mountain:2},'这个愿望值得保留，但任何安排都不能保证天气。你需要知道自己在等待什么。'),o('avoid','不想让假期押在一次天气上','优先选择多种活动都能满足的地方。',{street:1,heritage:1},'你重视体验的稳定性。城市、古城和日常生活可以提供更多替代。')],'代价'),
q('transfer','为了另一种云南，愿意收几次行李？','一次跨地区换住，保守拿走一个日程格：退房、交通、入住。不是承诺所有转场都只需一天。','dali',[
o('one','住一个基地，周边慢慢走','把陌生感留给当地细节。',{},'少换住是明确的边界。结果只会把一地路线当作可执行候选。'),o('two','最多换一次，两个基地','愿意付出一次移动，换一种体验。',{},'你接受一次换住。我们会把这一天直接从活动时间中扣除。'),o('three','可换两次，先看实际代价','三个方向的吸引力，要值得两天移动。',{},'想多看一点可以理解。接下来会把移动时间摊开，看看是否还符合你想要的轻松。')],'代价'),
q('altitude','香格里拉的高原环境，你愿意一起考虑吗？','城区约 3200 米。这里只记录意愿，不能由回答判断身体是否能适应。','shangrila',[
o('willing','愿意讨论，并留休息余量','到达当天以休息和适应节奏为主。',{},'高原仍是一项要单独准备的条件，文化吸引力不会自动消除它。'),o('avoid','这次避开 3000 米以上住宿与活动','用其他地区的自然、村落或风味替代。',{},'这个边界会优先于分数。香格里拉不再作为推荐，丽江也不会包含高处项目。')],'代价'),
q('crowd','喜欢的地方遇上国庆，哪些等待值得？','没有哪个地区能被默认成“国庆人少”。这里谈你愿意怎样分配注意力。','jianshui',[
o('accept','一个特别想做的重点，愿意准备','其余日程保持松动。',{},'把功课集中在少数真正想要的事情上，可以避免每一天都被预约切碎。'),o('avoid','尽量减少排队，愿意换地方','能临时调整比打卡热门更重要。',{rest:1},'灵活替代应该写进路线。没有约上热门项目，不代表这一天只能作废。')],'代价'),
q('pace_conflict','你既想慢下来，也愿意换两次住。哪一项更不能让步？','两个愿望都真实，但七天里往返加两次转场，完整停留会变少。先给这一次排顺序。','fuxian',[
o('rest','保住舒服的节奏，减少地区','宁可把另一个方向留到下次。',{rest:2},'这一次，“轻松”优先。路线会按少换住、每地更完整的停留来筛选。'),o('variety','保住不同体验，接受更紧凑','我愿意为此少一些发呆时间。',{novelty:2},'你明确接受了更紧凑的代价。结果会保留转场日，不把赶路包装成慢游。')],'澄清'),
q('weather_conflict','雪山画面对你很重要，但你也不想押注天气。','这两句话并不矛盾，我们只是需要一个能让你安心的底线。','shangrila',[
o('culture','即使没见到山，藏地生活也值得','把文化与湿地作为可以独立成立的目的。',{heritage:2},'那就让藏地本身撑起这段旅程，雪峰成为有机会时的惊喜。'),o('other','这次先选不依赖雪峰的方向','山还在，下次有更合适的时间再等。',{street:2,rest:1},'你在为这次假期选择稳定感。自然愿望仍然保留，但先不让它承担全部期待。')],'澄清')
];
questions.push(
q('witness','假设这趟不发朋友圈，也没人问你去了哪里。','不是说拍照或地标不重要。只是把别人暂时移出画面，看什么仍然让你期待。','dali',[
o('same','那个画面本身，就足够吸引我','即使只有我记得，也愿意为它去。',{},'那份吸引力可以独立成立。它不需要靠别人认可才算值得。'),
o('feeling','我更在意当时怎样度过','舒服、好奇、专注，比目的地名气重要。',{rest:2,street:1},'你想保留的是一种亲身感受。接下来会把它变成可以安排的半天。'),
o('record','我也很想留下漂亮的照片','记录与表达，也是我真正的快乐。',{},'拍照同样是真实的愿望。我们会把等光、天气和拍摄时间当作明确需求，而不偷偷否定它。'),
o('company','谁一起去，比别人知不知道更重要','想留下两个人共同经历过的事情。',{rest:2},'这趟也关乎相处。同行对照时，我们会先保留双方不愿牺牲的部分。')]),
q('mirror','停一下，我这样理解，贴近你的意思吗？','这是一份根据你刚才选择写下的暂时理解，你可以纠正它。','dali',[
o('yes','贴近，我想沿这个方向再看看','让刚才说清楚的需要，成为后续比较的线索。',{},'这份理解得到你的确认。接下来看看另一个画面，会不会改变它。'),
o('change','有一部分不对，想重新说','不要把我刚才的话过早归类。',{},'那就先不采纳这份复述。下一问让你指定这次真正要保住的东西。'),
o('tentative','先当作一种可能','我还需要另一个场景来对照。',{},'它会保留为“待确认”，不写成你已经认可的结论。')]),
q('clarify','如果只能保住一种感受，你更想保住什么？','把刚才不准确的理解放下。你现在的回答会作为更重要的线索。','dali',[
o('freedom','我能自己决定怎么过这一天','不被打卡、预约和同伴期待牵着走。',{rest:6},'我们把自主安排放在前面，不再把所有轻松都理解成坐着不动。'),
o('curiosity','不断遇到值得好奇的小事','可以在同一地方慢慢发现，不一定多城。',{novelty:4,street:2},'变化和好奇比单纯的休息更重要。'),
o('participation','真正参与过一件事情','动手、听懂、学会一点点，而非路过。',{craft:4,heritage:3},'参与和理解会作为行程重点。'),
o('awe','被自然的尺度震住','想亲身站在山水里。',{mountain:4,lake:3},'保住一次开阔的自然体验，再讨论怎样让其余时间舒服。')]),
q('contrast','再借一个不同的下午，看看心动会不会变化。','选一个还舍不得放下的画面。它不等于“又要多去一个地方”，我们先比较愿望。','mangshi',[
...Object.keys(scenes).map(id=>o(id,scenes[id].title,scenes[id].sub,{},'先走进这个场景，再决定它是替代、补充，还是可以留到下次。')),
o('none','先不加，我想把刚才的方向想透','少一个候选，也是一种清晰。',{},'先把一条主线想清楚。结果仍会展示其他可能，但不会假装你都想去。')],'对照'),
q('anchor','假期只够保住一段，你最不想删掉哪一种体验？','前面说了很多喜欢。现在看哪一种如果失去，会让这次旅行最不像你。它会优先于平均分，但不会越过你明确的边界。','dali',[
o('primary','最初那个让我停下来的画面','把第一份心动里的具体体验保住。',{},'这份体验会成为建议的主线。其他地方分数再高，也不能偷偷替代它。'),
o('contrast','后来对照时出现的那份心动','我发现另一个下午更不舍得放掉。',{},'对照改变了你的优先级。这正是探索有用的地方。'),
o('need','地点可以换，过日子的方式不能丢','先保护节奏和感受，再选能承接它的地方。',{},'那么主线是你想怎样过，而不是必须到某座城。结果会继续比较不同地点。')],'取舍')
);
questions.push(
q('tengchong_pull','和顺院落、地热与温泉，哪一段值得你专门停下？','腾冲几个片区分散；看热海地热景观与泡温泉是不同安排，不能用一张门票或半天时间打包。','tengchong',[
o('heshun','想听懂和顺侨乡的故事','院落、石巷、田边与普通日常。',{heritage:4,street:3},'院落与生活会成为这段的重点，不自动加上火山和温泉全套。'),
o('geothermal','想近看地热景观怎样形成','愿意为热海单独留一天。',{novelty:4,mountain:2},'你想观察地热，泡汤不必成为附加任务；开放路线与交通另核。'),
o('soak','想找个舒服的地方泡汤休息','先核设施、票务和适合自己的条件。',{rest:5},'休息是目标。不会把泡汤的愿望自动改成走遍地热景区。')]),
q('tengchong_depth','腾冲只保留一个完整白天，你想怎样过？','和顺、热海与北海湿地分属不同方向；国庆不保证银杏已黄，也不保证某一片湿地景色。','tengchong',[
o('story','留在和顺看院落、吃饭、喝茶','不用为了项目丰富而离开喜欢的片区。',{heritage:4,street:2,rest:2},'先把侨乡的一天过完整，其他片区可留作下次。'),
o('rest','以休息为主，有合适温泉再去','报价和预约不合适，住处附近慢逛也可以。',{rest:5},'温泉是经过确认后的一种休息方式，不是必有项目。'),
o('wetland','想把目光交给北海湿地','只在开放区域观察水面与植物。',{forest:3,lake:3},'湿地可以成为唯一重点；热海不会同时塞进这一天。')]),
q('xishuangbanna_pull','版纳最吸引你的，是巨叶、村寨，还是一顿傣味？','景洪、勐仑植物园与勐罕村寨不是一个步行片区。一次只能认真选一段日常。','xishuangbanna',[
o('plants','想认一认从没见过的热带植物','愿意看标牌、停下来观察。',{forest:5,novelty:2},'植物园会获得一个完整白天，往返与园内接驳也算时间。'),
o('dai','想走近傣族建筑和生活','在明确接待的村寨看普通的一天。',{heritage:4,street:3},'我们会把真实接待和文化空间放在前面，不把节庆表演当成日常保证。'),
o('slow','想换一种气候，吃饭、午休、慢走','不想每天都从市区长途往返。',{rest:4,food:3},'热带生活的节奏也值得专门来一次，不需要每天都去雨林。')]),
q('xishuangbanna_depth','如果只剩一个白天，你愿意把交通花在哪里？','勐仑植物园专程往返、勐罕村寨与景洪城市生活，各有自己的时间成本。十月仍需考虑湿热和阵雨。','xishuangbanna',[
o('garden','留给勐仑植物园的一小部分','不追求一天走完东西区。',{forest:5},'少走一些园区，给观察与休息留位置；不再追加夜市任务。'),
o('village','留给勐罕一处明确接待的村寨','先核位置、开放与往返交通。',{heritage:4,street:3},'用这一整天了解村寨，不把它附加在植物园之后。'),
o('city','就留在景洪，吃一顿傣味再午休','夜市是可选，不是全体人的旅行目标。',{rest:4,food:3,street:2},'行程会保留城市生活日，园区与村寨成为可替换的愿望。')]),
...regionalQuestions);
export const questionMap=Object.fromEntries(questions.map(x=>[x.id,x]));
export function blankProfile(name='我'){return {name,focus:null,corridor:null,excursions:{},routeId:null,entryRouteId:null,answers:{},notes:{},excluded:[],cursor:0,complete:false};}
export function blankSession(){return {version:2,active:0,profiles:[blankProfile('我'),blankProfile('同行者')],settings:{days:7,travelDays:2,maxBases:2,budget:null},view:'home'};}
export function flowFor(p){
  const ids=questionMap[p.focus+'_pull']?[p.focus+'_pull',p.focus+'_depth']:['memory'];
  ids.push('need','witness','mirror');
  if(p.answers.mirror==='change')ids.push('clarify');
  ids.push('contrast');
  const contrast=p.answers.contrast;
  if(contrast&&contrast!==p.focus&&questionMap[contrast+'_pull'])ids.push(contrast+'_pull',contrast+'_depth');
  ids.push('food','rest','weather','transfer');
  if(['shangrila','lijiang'].includes(p.focus)||['shangrila','lijiang'].includes(contrast)||isHighland(regionById[p.focus])||isHighland(regionById[contrast])||Object.values(p.excursions||{}).some(id=>isHighland(placeById[id]))||p.answers.memory==='nature')ids.push('altitude');
  ids.push('crowd','anchor');
  if((p.answers.rest==='yes'||p.answers.need==='restore'||p.answers.need==='together')&&p.answers.transfer==='three')ids.push('pace_conflict');
  if((p.focus==='shangrila'||contrast==='shangrila')&&p.answers.shangrila_depth==='image'&&p.answers.weather==='avoid')ids.push('weather_conflict');
  return ids.map(id=>questionMap[id]);
}
export function mirrorFor(p){
  const first=questionMap[p.focus+'_pull'];
  const opt=first?.options.find(o=>o.id===p.answers[first.id]);
  const need=questionMap.need.options.find(o=>o.id===p.answers.need);
  if(!opt||opt.id==='unknown'||!need||need.id==='unknown')return {text:'有些地方已经吸引了你，但“为什么值得”还没完全清楚。我们可以保留两种可能，用另一个具体下午继续比较。',evidence:[],confirmed:false};
  const endings={restore:'如果这仍准确，少赶路和留白应该先被保护。',new:'如果这仍准确，要寻找具体的新鲜感，而不是只增加地名。',understand:'如果这仍准确，应给理解与参与留整段时间。',together:'如果这仍准确，要把共同相处的舒服程度也放进安排。'};
  let text=`你在场景里留下了“${opt.label}”，又希望这次能够“${need.label}”。${endings[need.id]||''}`;
  if(['quiet','release','shore'].includes(opt.id)&&need.id==='new')text='你被没有任务的湖边时间吸引，也希望走出熟悉的日常。也许这次想要的是：在一个新地方拥有能自己安排的时间，而不一定是更多项目。这个理解贴近吗？';
  if(opt.id==='open'&&need.id==='restore')text='你选了远山和开阔的视野，也想不用一直赶时间。也许吸引你的既是风景，也是停在风景里、暂时不必奔向下一站的余量。两部分对你都重要吗？';
  if(opt.id==='daily'&&need.id==='understand')text='你想看当地人怎样过早晨，也想认真认识一个地方。也许先边看、边吃、遇到问题再问，比排满景点更贴近你理解一座城的方式。还是我把你的“认识”理解窄了？';
  if(['hands','village'].includes(opt.id)&&need.id==='understand')text='你留下了村落或动手参与的细节，也希望看懂一个地方。也许一次真正参与，会比多到几处更有记忆；也可能你只是很享受那个具体活动。哪一种更贴近，仍由你来确认。';
  if(opt.id==='company'&&(need.id==='together'||p.answers.witness==='company'))text='你两次把一起度过的时间放在前面。也许景色更像相处的背景，舒服地吃饭和闲聊也是正经的旅行内容。这是你这一轮的愿望；同伴是否一样，还要听他的答案。';
  if(p.answers.witness==='record'&&['open','vast','mountain'].includes(opt.id))text='你选了开阔的山水，也明确想留下喜欢的照片。拍摄本身可以是这次旅行的目标，不需要再找一个更“深刻”的理由。只是需要继续分清：更想要特定画面，还是享受在现场观察和记录？';
  return {text,evidence:[opt.label,need.label],confirmed:p.answers.mirror==='yes'};
}
export function selectedFor(p){return flowFor(p).map(question=>({question,option:question.options.find(o=>o.id===p.answers[question.id])}));}
export function protectedRegionFor(p){const id=p.answers.anchor==='primary'?p.focus:p.answers.anchor==='contrast'?p.answers.contrast:null;return Object.hasOwn(regionById,id)?id:null;}
export function paceFor(p){const conflict=flowFor(p).some(q=>q.id==='pace_conflict')?p.answers.pace_conflict:null;return conflict==='variety'?'balanced':conflict==='rest'||p.answers.rest==='yes'||p.answers.need==='restore'?'restful':'balanced';}
export function recommend(p,settings){
  const selected=selectedFor(p), weights={},activeIds=new Set(selected.map(s=>s.question.id));
  selected.forEach(({option})=>Object.entries(option?.weights||{}).forEach(([k,v])=>weights[k]=(weights[k]||0)+v));
  const total=Object.values(weights).reduce((a,b)=>a+b,0);
  const hasPreferences=total>0, protectedRegion=protectedRegionFor(p);
  const ranked=regions.map(r=>{
    const raw=hasPreferences?Object.entries(weights).reduce((s,[k,v])=>s+v*r.traits[k],0)/total/5*100:null;
    const firstImpression=raw!==null&&p.focus===r.id?4:0;
    const penalty=(p.answers.weather==='avoid'&&['shangrila','lijiang'].includes(r.id)?5:0)+(activeIds.has('weather_conflict')&&p.answers.weather_conflict==='other'&&['shangrila','lijiang'].includes(r.id)?8:0);
    const excluded=p.excluded.includes(r.id)||(isHighland(r)&&p.answers.altitude==='avoid');
    const evidence=selected.filter(({question,option})=>option&&Object.keys(option.weights).length&&!(r.id!=='shangrila'&&((question.id==='shangrila_pull'&&option.id==='culture')||(question.id==='shangrila_depth'&&option.id==='life')))).map(({question,option})=>({question:question.title,answer:option.label,echo:option.echo,fit:Object.entries(option.weights).reduce((s,[k,v])=>s+v*r.traits[k],0)/Object.values(option.weights).reduce((a,b)=>a+b,0)})).filter(e=>e.fit>=3.5).sort((a,b)=>b.fit-a.fit).slice(0,3);
    return {...r,score:raw===null?null:Math.max(0,Math.min(100,Math.round(raw+firstImpression-penalty))),raw,firstImpression,penalty,excluded,evidence,conditional:isHighland(r)&&p.answers.altitude!=='willing'};
  }).sort((a,b)=>Number(a.excluded)-Number(b.excluded)||(b.score||0)-(a.score||0));
  const byId=Object.fromEntries(ranked.map(r=>[r.id,r]));
  const pace=paceFor(p), min=pace==='restful'?2:1;
  const cap=Math.min(settings.maxBases, {one:1,two:2,three:3}[p.answers.transfer]||settings.maxBases,pace==='restful'?2:3);
  const routes=routeTemplates.map(t=>{
    const ids=t.destinationIds, moves=ids.length-1, fullDays=settings.days-2-moves;
    const blocked=[];
    if(ids.length>cap)blocked.push('超过这次愿意接受的住宿基地数量');
    if(ids.some(id=>byId[id].excluded))blocked.push('包含明确不去或需要避开的高原地区');
    if(fullDays<min*ids.length)blocked.push('扣除到达、返程和转场后，完整停留太少');
    const score=hasPreferences?Math.max(0,Math.round(ids.reduce((s,id)=>s+byId[id].score,0)/ids.length-moves*(pace==='restful'?6:4))):null;
    return {...t,ids,name:ids.map(id=>byId[id].name).join(' ＋ '),score,blocked,moves,fullDays,conditional:ids.some(id=>byId[id].conditional),min};
  }).sort((a,b)=>(b.score||0)-(a.score||0)||a.moves-b.moves);
  const available=routes.filter(r=>!r.blocked.length);
  const corridor=Object.hasOwn(corridorById,p.corridor)?corridorById[p.corridor]:null;
  const corridorBases=new Set(corridorBaseIds(p.corridor));
  routes.forEach(route=>{route.inSelectedCorridor=!!corridor&&route.ids.every(id=>corridorBases.has(id));});
  const pick=options=>options.find(r=>r.inSelectedCorridor&&!r.conditional)||options.find(r=>r.inSelectedCorridor)||options.find(r=>!r.conditional)||options[0]||null;
  const protectedRoutes=protectedRegion?available.filter(r=>r.ids.includes(protectedRegion)):[];
  const primary=hasPreferences?(pick(protectedRoutes)||pick(available)):null;
  const axes=Object.entries(weights).sort((a,b)=>b[1]-a[1]);
  const unknowns=selected.filter(({option})=>!option||option.id==='unknown').map(({question})=>question);
  const styles={mountain:'把视线交给辽阔',lake:'在湖风里留一段空白',heritage:'慢慢走进另一种生活',food:'跟着味道认识云南',rest:'把日子还给自己',novelty:'去日常之外走一走',craft:'留下一件参与过的小事',forest:'为一片叶子停下',street:'在街头生活里停留'};
  const selectedExcursions=Object.fromEntries(Object.entries(p.excursions||{}).filter(([base,id])=>typeof id==='string'&&Object.hasOwn(regionById,base)&&Object.hasOwn(placeById,id)&&placeById[id].anchorBase===base&&placeById[id].kind!=='overnight'));
  const entryRouteId=routeTemplates.some(route=>route.id===p.entryRouteId)?p.entryRouteId:null;
  const result={entryRouteId,ranked,weights,axes,hasPreferences,selected,unknowns,pace,routes,available,primary,protectedRegion,corridor,selectedExcursions,excursionSelections:Object.values(selectedExcursions).map(id=>placeById[id]),altitudePreference:p.answers.altitude||'unknown',style:axes.length?styles[axes[0][0]]:'让向往再清楚一点',answered:selected.filter(x=>x.option&&x.option.id!=='unknown').length,totalQuestions:selected.length};
  routes.forEach(route=>{route.excursionStatus=excursionPlanFor(route,result,settings).status;});
  return result;
}
function activitiesFor(id,result){
  // Only the current exploration branch may influence a day's priority.
  const answer=key=>result.selected.find(s=>s.question.id===key)?.option?.id;
  const pull=answer(id+'_pull'),depth=answer(id+'_depth'),activities=regionById[id].activities;
  let first=regionalActivityPriority(id,Object.fromEntries(result.selected.filter(s=>s.option).map(s=>[s.question.id,s.option.id]))),preferred=null;
  if(id==='kunming'&&(depth==='plants'||['learn','green'].includes(pull)))first=1;
  if(id==='dali'){
    if(depth==='mountain'){
      first=2;preferred={title:'苍山意向日',detail:'先为苍山留出一整段时间；具体路线、索道、天气与票务另核。若条件不合适，再改为古城散步与喝茶。'};
    }else if(depth==='craft'){
      first=1;preferred={title:'周城扎染意向日',detail:'把周城扎染作为这一天的重点，先核实开放、预约和体验时长；其余时间留给村落散步与吃饭。'};
    }else if(depth!=='shore'&&pull==='village')first=1;
  }
  if(id==='shangrila'&&(depth==='landscape'||depth==='image'||(depth!=='life'&&pull==='open')))first=1;
  if(id==='jianshui'&&pull==='hands'){
    first=1;preferred={title:'紫陶手作意向日',detail:'先给紫陶小店与动手体验留时间，确认预约、时长和价格后再安排；其余时间吃当地家常菜，不把多个古建景点塞进同一天。'};
  }
  if(id==='mangshi')first=pull==='flavor'?1:['daily','shade'].includes(pull)?2:0;
  if(id==='tengchong'){
    if(depth==='wetland')first=2;
    else if(depth==='rest'||(depth!=='story'&&pull==='soak')){
      first=1;preferred={title:'温泉休息意向日',detail:'只在确认温泉设施、票务和适合自己的条件后安排泡汤；其他时间留在同一片区休息。没有合适安排就改住处附近慢逛，不追加热海地热观光。'};
    }else if(depth!=='story'&&pull==='geothermal')first=1;
  }
  if(id==='xishuangbanna'){
    if(depth==='village'||(depth!=='garden'&&depth!=='city'&&pull==='dai')){
      first=1;preferred={title:'勐罕傣族村寨意向日',detail:'专程去一处已确认接待的村寨或文化空间，先核交通、开放与票务；留出往返时间，不叠加勐仑植物园。'};
    }else if(depth==='city'||(depth!=='garden'&&pull==='slow'))first=1;
  }
  if(id==='lijiang'&&(depth==='worth'||(pull==='mountain'&&depth!=='village'))){
    first=1;preferred={title:'雪山方向意向日',detail:'留一天给雪山方向，先核实天气、交通和票务；高处项目须单独确认，未确认前不安排索道。若条件不合适，改为纳西村落散步。'};
  }
  return [preferred||activities[first],...activities.filter((_,i)=>i!==first)];
}
function baseItineraryFor(route,result,settings){
  if(!route||route.blocked.length)return [];
  const ids=route.ids, play=ids.map(()=>route.min);
  for(let n=play.reduce((a,b)=>a+b,0);n<route.fullDays;n++){
    const idx=ids.reduce((best,id,i)=>((result.ranked.find(r=>r.id===id).score||50)/(play[i]+1))>((result.ranked.find(r=>r.id===ids[best]).score||50)/(play[best]+1))?i:best,0);play[idx]++;
  }
  const days=[{type:'arrival',title:'到达 '+regionById[ids[0]].name,detail:settings.travelDays===1?'只有已核实交通可半天完成，才把余下半天用于住宿附近散步。':'把这天留给出发、交通和入住。晚到就休息。',base:ids[0],overnight:true}];
  ids.forEach((id,i)=>{
    const activities=activitiesFor(id,result);
    if(i)days.push({type:'transfer',title:regionById[ids[i-1]].name+' → '+regionById[id].name,detail:'跨地区退房、交通、入住，保守预留一整天。班次和实际耗时另核。'+(id==='shangrila'?' 到达后以休息为主。':''),base:id,overnight:true});
    for(let d=0;d<play[i];d++){const act=activities[d]||{title:'再去一次喜欢的地方',detail:'天气变化、回访、吃饭、闲坐，都可以使用这一天。'};days.push({type:'stay',title:act.title,detail:act.detail+(result.pace==='restful'?' 留半天给临时起意和休息。':''),base:id,overnight:true,protected:result.protectedRegion===id&&d===0,visualBase:regionById[id].visualBase||regionById[id].visual});}
  });
  days.push({type:'departure',title:'返程',detail:settings.travelDays===1?'仅在返程确能半天完成时，保留附近早餐或散步。':'留足退房和返程时间。进出顺序按实际票务整体调整。',base:ids.at(-1),overnight:false});
  return days.map((d,i)=>({...d,day:i+1}));
}
function excursionPlanFor(route,result,settings){
  const days=baseItineraryFor(route,result,settings),status=[];
  Object.entries(result.selectedExcursions||{}).forEach(([base,placeId])=>{
    const place=placeById[placeId];
    const skipped=reason=>status.push({baseId:base,placeId,name:place.name,status:'skipped',reason});
    if(!route||route.blocked.length||!route.ids.includes(base)){skipped('这条路线没有该住宿基地，所选支线不加入本方案。');return;}
    if(isHighland(place)&&result.altitudePreference==='avoid'){skipped('你明确避开 3000 米以上活动，这条支线不加入。');return;}
    const candidates=days.map((day,index)=>({day,index})).filter(({day})=>day.type==='stay'&&day.base===base&&!day.protected);
    if(place.dayBudget>1||!candidates.length){skipped('保留你最想保护的第一段体验后，没有足够的完整停留日；请延长停留或明确更换主体验。');return;}
    const {day,index}=candidates.at(-1);
    days[index]={...day,title:place.name+' · '+place.tagline,detail:place.experience+' '+place.tradeoff+' 本日替换一个原有停留日，晚上仍住'+regionById[base].name+'。',excursionId:placeId,visualBase:place.visualBase||regionById[base].visual,conditional:isHighland(place)&&result.altitudePreference!=='willing'};
    status.push({baseId:base,placeId,name:place.name,status:'applied',day:day.day,replacedTitle:day.title,conditional:days[index].conditional,reason:'替换一个原有停留日，保留原住宿基地与总天数。'});
  });
  return {days,status};
}
export function itineraryFor(route,result,settings){return excursionPlanFor(route,result,settings).days;}
export function excursionStatusFor(route,result,settings){return excursionPlanFor(route,result,settings).status;}
export function validateSession(input){
  const fail=()=>{throw new Error('这不是本版心向彩云的有效手记，原有答案没有改变。');};
  if(!input||input.version!==2||!Array.isArray(input.profiles)||input.profiles.length!==2||![0,1].includes(input.active))fail();
  const s=input.settings;
  if(!s||!Number.isInteger(s.days)||s.days<3||s.days>9||![1,2].includes(s.travelDays)||![1,2,3].includes(s.maxBases)||!(s.budget===null||(Number.isFinite(s.budget)&&s.budget>=0&&s.budget<=1000000)))fail();
  const out=blankSession();out.active=input.active;out.settings={days:s.days,travelDays:s.travelDays,maxBases:s.maxBases,budget:s.budget};
  out.profiles=input.profiles.map(p=>{
    if(!p||typeof p.name!=='string'||p.name.length>20||!(p.focus===null||(typeof p.focus==='string'&&(p.focus==='unknown'||Object.hasOwn(regionById,p.focus))))||!p.answers||typeof p.answers!=='object'||Array.isArray(p.answers)||!p.notes||typeof p.notes!=='object'||Array.isArray(p.notes)||!Array.isArray(p.excluded)||p.excluded.some(id=>typeof id!=='string'||!Object.hasOwn(regionById,id)))fail();
    const entryRouteId=p.entryRouteId===undefined?null:p.entryRouteId;
    if(!(entryRouteId===null||routeTemplates.some(route=>route.id===entryRouteId)))fail();
    const routeId=p.routeId===undefined?null:p.routeId;
    if(!(routeId===null||routeTemplates.some(route=>route.id===routeId)))fail();
    const corridor=p.corridor===undefined?null:p.corridor;
    if(!(corridor===null||(typeof corridor==='string'&&Object.hasOwn(corridorById,corridor))))fail();
    const inputExcursions=p.excursions===undefined?{}:p.excursions,excursions={};
    if(!inputExcursions||typeof inputExcursions!=='object'||Array.isArray(inputExcursions))fail();
    Object.entries(inputExcursions).forEach(([base,id])=>{if(typeof id!=='string'||!Object.hasOwn(regionById,base)||!Object.hasOwn(placeById,id)||placeById[id].anchorBase!==base||!['daytrip','replacement'].includes(placeById[id].kind))fail();excursions[base]=id;});
    const answers={},notes={};
    Object.entries(p.answers).forEach(([id,value])=>{if(!Object.hasOwn(questionMap,id)||!questionMap[id].options.some(o=>o.id===value))fail();answers[id]=value;});
    Object.entries(p.notes).forEach(([id,value])=>{if(!Object.hasOwn(questionMap,id)||typeof value!=='string'||value.length>500)fail();notes[id]=value;});
    return {name:p.name,focus:p.focus,corridor,excursions,routeId,entryRouteId,answers,notes,excluded:[...new Set(p.excluded)],cursor:Number.isInteger(p.cursor)?Math.max(0,Math.min(p.cursor,20)):0,complete:p.complete===true};
  });out.view=['home','journey','results','compare'].includes(input.view)?input.view:'home';return out;
}
export function compareProfiles(session){
  const results=session.profiles.map(p=>recommend(p,session.settings));
  const bothReady=results.every(r=>r.hasPreferences);
  const common=regions.map(r=>{const values=results.map(result=>result.ranked.find(d=>d.id===r.id));return {region:r,values,excluded:values.some(v=>v.excluded),score:bothReady?Math.round(Math.min(...values.map(v=>v.score))*.7+(values[0].score+values[1].score)/2*.3):null};}).sort((a,b)=>Number(a.excluded)-Number(b.excluded)||(b.score||0)-(a.score||0));
  const differences=['rest','transfer','altitude','weather','food'].filter(id=>session.profiles.every(p=>p.answers[id]&&p.answers[id]!=='unknown')&&session.profiles[0].answers[id]!==session.profiles[1].answers[id]);
  return {results,bothReady,common,differences};
}
