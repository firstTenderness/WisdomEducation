<template>
  <div class="policy-detail-container">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <img src="/src/assets/logo.svg" alt="Logo">
          <h1>慧学澄明教育学习平台</h1>
        </div>
        <ul class="nav-menu">
          <li><router-link to="/portal">首页</router-link></li>
          <li><router-link to="/portal#features">特色功能</router-link></li>
          <li><router-link to="/portal#courses">课程中心</router-link></li>
          <li><router-link to="/portal#policy">乡村教育政策</router-link></li>
          <li><router-link to="/portal#breakthrough">破茧视界</router-link></li>
          <li><router-link to="/portal#about">关于我们</router-link></li>
          <li><router-link to="/portal#contact">联系我们</router-link></li>
        </ul>
        <div class="nav-buttons">
          <router-link to="/login" class="btn btn-secondary login-btn">登录</router-link>
          <router-link to="/login" class="btn btn-primary">注册</router-link>
        </div>
      </div>
    </nav>

    <!-- 政策详情区 -->
    <section class="policy-detail-section">
      <div class="policy-detail-container-inner">
        <!-- 政策头部信息 -->
        <div class="policy-header">
          <div class="policy-meta">
            <span class="policy-date">{{ policy.date }}</span>
            <span class="policy-source">{{ policy.source }}</span>
          </div>
          <h1 class="policy-title">{{ policy.title }}</h1>
          <div class="policy-share">
            <span>分享：</span>
            <a href="#" class="share-icon"><i class="fab fa-weixin"></i></a>
            <a href="#" class="share-icon"><i class="fab fa-weibo"></i></a>
            <a href="#" class="share-icon"><i class="fas fa-link"></i></a>
          </div>
        </div>

        <!-- 政策内容 -->
        <div class="policy-content">
          <div class="policy-body" v-html="policy.content"></div>
          <div class="policy-highlights">
            <h3>政策要点</h3>
            <ul>
              <li v-for="(point, index) in policy.highlights" :key="index">{{ point }}</li>
            </ul>
          </div>
        </div>

        <!-- 相关政策 -->
        <div class="related-policies">
          <h3>相关政策</h3>
          <div class="related-policies-list">
            <div class="related-policy-item" v-for="(relatedPolicy, index) in relatedPolicies" :key="index">
              <span class="related-policy-date">{{ relatedPolicy.date }}</span>
              <router-link :to="'/policy/' + relatedPolicy.id" class="related-policy-title">{{ relatedPolicy.title }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>慧学澄明教育学习平台</h3>
            <p>智能教育，引领未来学习新方式</p>
          </div>
          <div class="footer-column">
            <h3>快速链接</h3>
            <ul class="footer-links">
              <li><router-link to="/portal">首页</router-link></li>
              <li><router-link to="/portal#features">特色功能</router-link></li>
              <li><router-link to="/portal#courses">课程中心</router-link></li>
              <li><router-link to="/portal#policy">乡村教育政策</router-link></li>
              <li><router-link to="/portal#breakthrough">破茧视界</router-link></li>
              <li><router-link to="/portal#about">关于我们</router-link></li>
              <li><router-link to="/portal#contact">联系我们</router-link></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>课程分类</h3>
            <ul class="footer-links">
              <li><a href="#">语文</a></li>
              <li><a href="#">数学</a></li>
              <li><a href="#">英语</a></li>
              <li><a href="#">科学</a></li>
              <li><a href="#">艺术</a></li>
              <li><a href="#">编程</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>联系我们</h3>
            <ul class="footer-links">
              <li><a href="#">电话：19075706783</a></li>
              <li><a href="#">邮箱：13138399389@163.com</a></li>
              <li><a href="#">地址：广东省清远市广东建设职业技术学院</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 慧学澄明教育学习平台 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const policyId = route.params.id

// 政策数据
const policies = ref([
  {
    id: '1',
    title: '中共中央 国务院关于进一步深化农村改革 扎实推进乡村全面振兴的意见',
    date: '2025-06-18',
    source: '中共中央 国务院',
    content: `
      <p>实现中国式现代化，必须加快推进乡村全面振兴。当前，农业再获丰收，农村和谐稳定，同时国际环境复杂严峻，我国发展面临的不确定难预料因素增多。越是应对风险挑战，越要夯实"三农"工作基础。</p>
      <p>做好2025年和今后一个时期"三农"工作，要坚持以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的二十大和二十届二中全会精神，深入贯彻落实习近平总书记关于"三农"工作的重要论述，坚持和加强党对"三农"工作的全面领导，坚持农业农村优先发展，坚持城乡融合发展，强化科技创新和制度创新，坚决守牢确保粮食安全、防止规模性返贫等底线，扎实推进乡村发展、乡村建设、乡村治理等重点工作，全面推进乡村振兴，加快农业农村现代化，为全面建设社会主义现代化国家开好局起好步打下坚实基础。</p>
      <h3>一、抓紧抓好粮食和重要农产品稳产保供</h3>
      <p>（一）全力抓好粮食生产。确保全国粮食产量保持在1.3万亿斤以上，各省（自治区、直辖市）都要稳住面积、主攻单产、力争多增产。</p>
      <p>（二）加力扩种大豆油料。深入推进大豆和油料产能提升工程。</p>
      <p>（三）发展现代设施农业。实施设施农业现代化提升行动。</p>
      <p>（四）构建多元化食物供给体系。树立大食物观，加快构建粮经饲统筹、农林牧渔结合、植物动物微生物并举的多元化食物供给体系。</p>
      <p>（五）统筹做好粮食和重要农产品调控。加强粮食应急保障能力建设。</p>
      <h3>二、加强农业基础设施建设</h3>
      <p>（一）加强耕地保护和用途管控。严格耕地占补平衡管理，实行部门联合开展补充耕地验收评定和"市县审核、省级复核、社会监督"机制，确保补充的耕地数量相等、质量相当、产能不降。</p>
      <p>（二）加强高标准农田建设。完成高标准农田新建和改造提升年度任务，重点补上土壤改良、农田灌排设施等短板，统筹推进高效节水灌溉，健全长效管护机制。</p>
      <p>（三）加强水利基础设施建设。扎实推进重大水利工程建设，加快构建国家水网骨干网络。</p>
      <p>（四）强化农业防灾减灾能力建设。健全基层动植物疫病虫害监测预警网络。</p>
      <h3>三、强化农业科技和装备支撑</h3>
      <p>（一）推动农业关键核心技术攻关。坚持产业需求导向，构建梯次分明、分工协作、适度竞争的农业科技创新体系，加快前沿技术突破。</p>
      <p>（二）深入实施种业振兴行动。完成全国农业种质资源普查。构建开放协作、共享应用的种质资源精准鉴定评价机制。</p>
      <p>（三）加快先进农机研发推广。加紧研发大型智能农机装备、丘陵山区适用小型机械和园艺机械。</p>
      <p>（四）推进农业绿色发展。加快农业投入品减量增效技术推广应用，推进水肥一体化，建立健全秸秆、农膜、农药包装废弃物、畜禽粪污等农业废弃物收集利用处理体系。</p>
      <h3>四、巩固拓展脱贫攻坚成果</h3>
      <p>（一）坚决守住不发生规模性返贫底线。健全防止返贫动态监测和帮扶机制，及时发现、及时干预、及时帮扶。</p>
      <p>（二）增强脱贫地区和脱贫群众内生发展动力。把增加脱贫群众收入作为根本要求，把促进脱贫县加快发展作为主攻方向，更加注重扶志扶智，聚焦产业就业，不断缩小收入差距、发展差距。</p>
      <p>（三）稳定完善帮扶政策。落实巩固拓展脱贫攻坚成果同乡村振兴有效衔接政策。</p>
      <h3>五、推动乡村产业高质量发展</h3>
      <p>（一）做大做强农产品加工流通业。实施农产品加工业提升行动，支持家庭农场、农民合作社和中小微企业等发展农产品产地初加工，引导大型农业企业发展农产品精深加工。</p>
      <p>（二）加快发展现代乡村服务业。全面推进县域商业体系建设。加快完善县乡村电子商务和快递物流配送体系，建设县域集采集配中心，推动农村客货邮融合发展，大力发展共同配送、即时零售等新模式，推动冷链物流服务网络向乡村下沉。</p>
      <p>（三）培育乡村新产业新业态。继续支持创建农业产业强镇、现代农业产业园、优势特色产业集群。</p>
      <p>（四）培育壮大县域富民产业。完善县乡村产业空间布局，提升县城产业承载和配套服务功能，增强重点镇集聚功能。</p>
      <h3>六、扎实推进宜居宜业和美乡村建设</h3>
      <p>（一）加强村庄规划建设。坚持县域统筹，支持有条件有需求的村庄分区分类编制村庄规划，合理确定村庄布局和建设边界。</p>
      <p>（二）扎实推进农村人居环境整治提升。加大村庄公共空间整治力度，持续开展村庄清洁行动。</p>
      <p>（三）持续加强乡村基础设施建设。加强农村公路养护和安全管理，推动与沿线配套设施、产业园区、旅游景区、乡村旅游重点村一体化建设。</p>
      <p>（四）提升基本公共服务能力。推动基本公共服务资源下沉，着力加强薄弱环节。</p>
      <h3>七、健全党组织领导的乡村治理体系</h3>
      <p>（一）强化农村基层党组织政治功能和组织功能。突出大抓基层的鲜明导向，强化县级党委抓乡促村责任，深入推进抓党建促乡村振兴。</p>
      <p>（二）提升乡村治理效能。坚持以党建引领乡村治理，强化县乡村三级治理体系功能，压实县级责任，推动乡镇扩权赋能，夯实村级基础。</p>
      <p>（三）加强农村精神文明建设。深入开展社会主义核心价值观宣传教育，继续在乡村开展听党话、感党恩、跟党走宣传教育活动。</p>
      <h3>八、强化政策保障和体制机制创新</h3>
      <p>（一）健全乡村振兴多元投入机制。坚持把农业农村作为一般公共预算优先保障领域，压实地方政府投入责任。</p>
      <p>（二）加强乡村人才队伍建设。实施乡村振兴人才支持计划，组织引导教育、卫生、科技、文化、社会工作、精神文明建设等领域人才到基层一线服务，支持培养本土急需紧缺人才。</p>
      <p>（三）推进县域城乡融合发展。健全城乡融合发展体制机制和政策体系，畅通城乡要素流动。</p>
      <h3>九、加强组织领导</h3>
      <p>（一）强化责任落实。健全乡村振兴责任制，坚持五级书记抓乡村振兴。</p>
      <p>（二）强化监督考核。统筹开展乡村振兴战略实绩考核、巩固拓展脱贫攻坚成果同乡村振兴有效衔接考核评估，将抓党建促乡村振兴情况作为市县乡党委书记抓基层党建述职评议考核的重要内容。</p>
      <p>（三）强化正向激励。对乡村振兴各项工作中表现突出的单位和个人，按照国家有关规定给予表彰奖励。</p>
    `,
    highlights: [
      '坚持农业农村优先发展，坚持城乡融合发展',
      '强化科技创新和制度创新，坚决守牢确保粮食安全、防止规模性返贫等底线',
      '扎实推进乡村发展、乡村建设、乡村治理等重点工作',
      '全面推进乡村振兴，加快农业农村现代化',
      '加强农业基础设施建设，强化农业科技和装备支撑',
      '巩固拓展脱贫攻坚成果，推动乡村产业高质量发展',
      '扎实推进宜居宜业和美乡村建设，健全党组织领导的乡村治理体系'
    ]
  },
  {
    id: '2',
    title: '中共中央 国务院关于做好2023年全面推进乡村振兴重点工作的意见',
    date: '2023-02-18',
    source: '中共中央 国务院',
    content: `
      <p>党的二十大擘画了以中国式现代化全面推进中华民族伟大复兴的宏伟蓝图。全面建设社会主义现代化国家，最艰巨最繁重的任务仍然在农村。世界百年未有之大变局加速演进，我国发展进入战略机遇和风险挑战并存、不确定难预料因素增多的时期，守好"三农"基本盘至关重要、不容有失。党中央认为，必须坚持不懈把解决好"三农"问题作为全党工作重中之重，举全党全社会之力全面推进乡村振兴，加快农业农村现代化。</p>
      <p>做好2023年和今后一个时期"三农"工作，要坚持以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的二十大精神，深入贯彻落实习近平总书记关于"三农"工作的重要论述，坚持和加强党对"三农"工作的全面领导，坚持农业农村优先发展，坚持城乡融合发展，强化科技创新和制度创新，坚决守牢确保粮食安全、防止规模性返贫等底线，扎实推进乡村发展、乡村建设、乡村治理等重点工作，加快建设农业强国，建设宜居宜业和美乡村，为全面建设社会主义现代化国家开好局起好步打下坚实基础。</p>
      <h3>一、抓紧抓好粮食和重要农产品稳产保供</h3>
      <p>（一）全力抓好粮食生产。确保全国粮食产量保持在1.3万亿斤以上，各省（自治区、直辖市）都要稳住面积、主攻单产、力争多增产。</p>
      <p>（二）加力扩种大豆油料。深入推进大豆和油料产能提升工程。</p>
      <p>（三）发展现代设施农业。实施设施农业现代化提升行动。</p>
      <p>（四）构建多元化食物供给体系。树立大食物观，加快构建粮经饲统筹、农林牧渔结合、植物动物微生物并举的多元化食物供给体系。</p>
      <p>（五）统筹做好粮食和重要农产品调控。加强粮食应急保障能力建设。</p>
      <h3>二、加强农业基础设施建设</h3>
      <p>（一）加强耕地保护和用途管控。严格耕地占补平衡管理，实行部门联合开展补充耕地验收评定和"市县审核、省级复核、社会监督"机制，确保补充的耕地数量相等、质量相当、产能不降。</p>
      <p>（二）加强高标准农田建设。完成高标准农田新建和改造提升年度任务，重点补上土壤改良、农田灌排设施等短板，统筹推进高效节水灌溉，健全长效管护机制。</p>
      <p>（三）加强水利基础设施建设。扎实推进重大水利工程建设，加快构建国家水网骨干网络。</p>
      <p>（四）强化农业防灾减灾能力建设。健全基层动植物疫病虫害监测预警网络。</p>
      <h3>三、强化农业科技和装备支撑</h3>
      <p>（一）推动农业关键核心技术攻关。坚持产业需求导向，构建梯次分明、分工协作、适度竞争的农业科技创新体系，加快前沿技术突破。</p>
      <p>（二）深入实施种业振兴行动。完成全国农业种质资源普查。构建开放协作、共享应用的种质资源精准鉴定评价机制。</p>
      <p>（三）加快先进农机研发推广。加紧研发大型智能农机装备、丘陵山区适用小型机械和园艺机械。</p>
      <p>（四）推进农业绿色发展。加快农业投入品减量增效技术推广应用，推进水肥一体化，建立健全秸秆、农膜、农药包装废弃物、畜禽粪污等农业废弃物收集利用处理体系。</p>
      <h3>四、巩固拓展脱贫攻坚成果</h3>
      <p>（一）坚决守住不发生规模性返贫底线。健全防止返贫动态监测和帮扶机制，及时发现、及时干预、及时帮扶。</p>
      <p>（二）增强脱贫地区和脱贫群众内生发展动力。把增加脱贫群众收入作为根本要求，把促进脱贫县加快发展作为主攻方向，更加注重扶志扶智，聚焦产业就业，不断缩小收入差距、发展差距。</p>
      <p>（三）稳定完善帮扶政策。落实巩固拓展脱贫攻坚成果同乡村振兴有效衔接政策。</p>
      <h3>五、推动乡村产业高质量发展</h3>
      <p>（一）做大做强农产品加工流通业。实施农产品加工业提升行动，支持家庭农场、农民合作社和中小微企业等发展农产品产地初加工，引导大型农业企业发展农产品精深加工。</p>
      <p>（二）加快发展现代乡村服务业。全面推进县域商业体系建设。加快完善县乡村电子商务和快递物流配送体系，建设县域集采集配中心，推动农村客货邮融合发展，大力发展共同配送、即时零售等新模式，推动冷链物流服务网络向乡村下沉。</p>
      <p>（三）培育乡村新产业新业态。继续支持创建农业产业强镇、现代农业产业园、优势特色产业集群。</p>
      <p>（四）培育壮大县域富民产业。完善县乡村产业空间布局，提升县城产业承载和配套服务功能，增强重点镇集聚功能。</p>
      <h3>六、扎实推进宜居宜业和美乡村建设</h3>
      <p>（一）加强村庄规划建设。坚持县域统筹，支持有条件有需求的村庄分区分类编制村庄规划，合理确定村庄布局和建设边界。</p>
      <p>（二）扎实推进农村人居环境整治提升。加大村庄公共空间整治力度，持续开展村庄清洁行动。</p>
      <p>（三）持续加强乡村基础设施建设。加强农村公路养护和安全管理，推动与沿线配套设施、产业园区、旅游景区、乡村旅游重点村一体化建设。</p>
      <p>（四）提升基本公共服务能力。推动基本公共服务资源下沉，着力加强薄弱环节。</p>
      <h3>七、健全党组织领导的乡村治理体系</h3>
      <p>（一）强化农村基层党组织政治功能和组织功能。突出大抓基层的鲜明导向，强化县级党委抓乡促村责任，深入推进抓党建促乡村振兴。</p>
      <p>（二）提升乡村治理效能。坚持以党建引领乡村治理，强化县乡村三级治理体系功能，压实县级责任，推动乡镇扩权赋能，夯实村级基础。</p>
      <p>（三）加强农村精神文明建设。深入开展社会主义核心价值观宣传教育，继续在乡村开展听党话、感党恩、跟党走宣传教育活动。</p>
      <h3>八、强化政策保障和体制机制创新</h3>
      <p>（一）健全乡村振兴多元投入机制。坚持把农业农村作为一般公共预算优先保障领域，压实地方政府投入责任。</p>
      <p>（二）加强乡村人才队伍建设。实施乡村振兴人才支持计划，组织引导教育、卫生、科技、文化、社会工作、精神文明建设等领域人才到基层一线服务，支持培养本土急需紧缺人才。</p>
      <p>（三）推进县域城乡融合发展。健全城乡融合发展体制机制和政策体系，畅通城乡要素流动。</p>
      <h3>九、加强组织领导</h3>
      <p>（一）强化责任落实。健全乡村振兴责任制，坚持五级书记抓乡村振兴。</p>
      <p>（二）强化监督考核。统筹开展乡村振兴战略实绩考核、巩固拓展脱贫攻坚成果同乡村振兴有效衔接考核评估，将抓党建促乡村振兴情况作为市县乡党委书记抓基层党建述职评议考核的重要内容。</p>
      <p>（三）强化正向激励。对乡村振兴各项工作中表现突出的单位和个人，按照国家有关规定给予表彰奖励。</p>
    `,
    highlights: [
      '坚持农业农村优先发展，坚持城乡融合发展',
      '强化科技创新和制度创新，坚决守牢确保粮食安全、防止规模性返贫等底线',
      '扎实推进乡村发展、乡村建设、乡村治理等重点工作',
      '加快建设农业强国，建设宜居宜业和美乡村',
      '加强农业基础设施建设，强化农业科技和装备支撑',
      '巩固拓展脱贫攻坚成果，推动乡村产业高质量发展',
      '扎实推进宜居宜业和美乡村建设，健全党组织领导的乡村治理体系'
    ]
  },
  {
    id: '3',
    title: '国家乡村振兴局关于落实党中央国务院 2023年全面推进乡村振兴重点工作部署的实施意见',
    date: '2023-02-06',
    source: '国家乡村振兴局',
    content: `
      <p>2023年是全面贯彻落实党的二十大精神的开局之年，做好乡村振兴工作意义重大。为深入贯彻落实《中共中央 国务院关于做好2023年全面推进乡村振兴重点工作的意见》，现提出如下实施意见。</p>
      <h3>一、总体要求</h3>
      <p>坚持以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的二十大精神，深入贯彻落实习近平总书记关于"三农"工作的重要论述，坚持和加强党对"三农"工作的全面领导，坚持农业农村优先发展，坚持城乡融合发展，强化科技创新和制度创新，坚决守牢确保粮食安全、防止规模性返贫等底线，扎实推进乡村发展、乡村建设、乡村治理等重点工作，全面推进乡村振兴，加快农业农村现代化，为全面建设社会主义现代化国家开好局起好步打下坚实基础。</p>
      <h3>二、重点任务</h3>
      <p>（一）坚决守牢防止规模性返贫底线。健全防止返贫动态监测和帮扶机制，及时发现、及时干预、及时帮扶。</p>
      <p>（二）增强脱贫地区和脱贫群众内生发展动力。把增加脱贫群众收入作为根本要求，把促进脱贫县加快发展作为主攻方向，更加注重扶志扶智，聚焦产业就业，不断缩小收入差距、发展差距。</p>
      <p>（三）加快推进易地扶贫搬迁后续扶持。聚焦搬迁群众就业和融入社区两个关键，持续加大安置区产业培育力度，开展搬迁群众就业帮扶专项行动。</p>
      <p>（四）加强乡村振兴人才队伍建设。实施乡村振兴人才支持计划，组织引导教育、卫生、科技、文化、社会工作、精神文明建设等领域人才到基层一线服务，支持培养本土急需紧缺人才。</p>
      <p>（五）推进县域城乡融合发展。健全城乡融合发展体制机制和政策体系，畅通城乡要素流动。</p>
      <h3>三、保障措施</h3>
      <p>（一）强化组织领导。健全乡村振兴责任制，坚持五级书记抓乡村振兴。</p>
      <p>（二）强化资金保障。坚持把农业农村作为一般公共预算优先保障领域，压实地方政府投入责任。</p>
      <p>（三）强化监督考核。统筹开展乡村振兴战略实绩考核、巩固拓展脱贫攻坚成果同乡村振兴有效衔接考核评估。</p>
      <p>（四）强化宣传引导。深入宣传党中央关于乡村振兴的决策部署，宣传乡村振兴取得的显著成效，宣传乡村振兴中的先进典型，营造全社会关心、支持、参与乡村振兴的浓厚氛围。</p>
    `,
    highlights: [
      '坚决守牢防止规模性返贫底线',
      '增强脱贫地区和脱贫群众内生发展动力',
      '加快推进易地扶贫搬迁后续扶持',
      '加强乡村振兴人才队伍建设',
      '推进县域城乡融合发展',
      '强化组织领导和资金保障',
      '强化监督考核和宣传引导'
    ]
  },
  {
    id: '4',
    title: '教育部发布《义务教育劳动课程标准（2022年版）》',
    date: '2022-05-06',
    source: '教育部',
    content: `
      <p>近日，教育部正式印发《义务教育课程方案》，将劳动从原来的综合实践活动课程中完全独立出来，并发布《义务教育劳动课程标准（2022年版）》。文件中指出，2022年秋季开学起，劳动课将正式成为中小学的一门独立课程。</p>
      <h3>一、课程性质与理念</h3>
      <p>劳动课程是实施劳动教育的重要途径，具有鲜明的思想性、突出的社会性和显著的实践性，在培养学生正确的世界观、人生观、价值观，形成良好的道德品质和行为习惯，促进学生全面发展中发挥着重要作用。</p>
      <h3>二、课程目标</h3>
      <p>劳动课程要培养学生正确的劳动观念、必备的劳动能力、积极的劳动精神和良好的劳动习惯。</p>
      <h3>三、课程内容</h3>
      <p>劳动课程内容共设置十个任务群，每个任务群由若干项目组成。</p>
      <p>（一）日常生活劳动。包括清洁与卫生、整理与收纳、烹饪与营养、家用器具使用与维护四个任务群。</p>
      <p>（二）生产劳动。包括农业生产劳动、传统工艺制作、工业生产劳动、新技术体验与应用四个任务群。</p>
      <p>（三）服务性劳动。包括现代服务业劳动、公益劳动与志愿服务两个任务群。</p>
      <h3>四、课程实施</h3>
      <p>（一）课时安排。劳动课程平均每周不少于1课时，用于活动策划、技能指导、练习实践、总结交流等。</p>
      <p>（二）教学实施。劳动课程教学以实践为主，注重激发学生参与劳动的主动性、积极性和创造性。</p>
      <p>（三）评价方式。劳动课程评价要坚持过程性评价和结果性评价相结合，注重对学生劳动观念、劳动能力、劳动精神和劳动习惯的综合评价。</p>
      <p>（四）资源开发。各地要加强劳动课程资源建设，充分利用现有资源，开发地方和学校特色劳动课程资源。</p>
    `,
    highlights: [
      '劳动课将正式成为中小学的一门独立课程',
      '劳动课程内容共设置十个任务群',
      '包括日常生活劳动、生产劳动和服务性劳动',
      '劳动课程平均每周不少于1课时',
      '注重激发学生参与劳动的主动性、积极性和创造性',
      '坚持过程性评价和结果性评价相结合',
      '加强劳动课程资源建设'
    ]
  },
  {
    id: '5',
    title: '中共中央 国务院关于做好2022年全面推进乡村振兴重点工作的意见',
    date: '2022-02-22',
    source: '中共中央 国务院',
    content: `
      <p>当前，全球新冠肺炎疫情仍在蔓延，世界经济复苏脆弱，气候变化挑战突出，我国经济社会发展各项任务极为繁重艰巨。党中央认为，从容应对百年变局和世纪疫情，推动经济社会平稳健康发展，必须着眼国家重大战略需要，稳住农业基本盘、做好"三农"工作，接续全面推进乡村振兴，确保农业稳产增产、农民稳步增收、农村稳定安宁。</p>
      <h3>一、全力抓好粮食生产和重要农产品供给</h3>
      <p>（一）稳定全年粮食播种面积和产量。坚持中国人的饭碗任何时候都要牢牢端在自己手中，饭碗主要装中国粮，全面落实粮食安全党政同责，严格粮食安全责任制考核，确保粮食播种面积稳定、产量保持在1.3万亿斤以上。</p>
      <p>（二）大力实施大豆和油料产能提升工程。加大耕地轮作补贴和产油大县奖励力度，集中支持适宜区域、重点品种、经营服务主体，在黄淮海、西北、西南地区推广玉米大豆带状复合种植，在东北地区开展粮豆轮作，在黑龙江省部分地下水超采区、寒地井灌稻区推进水改旱、稻改豆试点，在长江流域开发冬闲田扩种油菜。</p>
      <p>（三）保障"菜篮子"产品供给。加大力度落实"菜篮子"市长负责制。稳定生猪生产长效性支持政策，稳定基础产能，防止生产大起大落。</p>
      <p>（四）合理保障农民种粮收益。按照让农民种粮有利可图、让主产区抓粮有积极性的目标要求，健全农民种粮收益保障机制。</p>
      <p>（五）统筹做好重要农产品调控。健全农产品全产业链监测预警体系，推动建立统一的农产品供需信息发布制度，分类分品种加强调控和应急保障。</p>
      <h3>二、强化现代农业基础支撑</h3>
      <p>（一）落实"长牙齿"的耕地保护硬措施。实行耕地保护党政同责，严守18亿亩耕地红线。</p>
      <p>（二）全面完成高标准农田建设阶段性任务。多渠道增加投入，2022年建设高标准农田1亿亩，累计建成高效节水灌溉面积4亿亩。</p>
      <p>（三）大力推进种源等农业关键核心技术攻关。全面实施种业振兴行动方案。</p>
      <p>（四）提升农机装备研发应用水平。全面梳理短板弱项，加强农机装备工程化协同攻关，加快大马力机械、丘陵山区和设施园艺小型机械、高端智能机械研发制造并纳入国家重点研发计划予以长期稳定支持。</p>
      <p>（五）加快发展设施农业。因地制宜发展塑料大棚、日光温室、连栋温室等设施。</p>
      <p>（六）有效防范应对农业重大灾害。加大农业防灾减灾救灾能力建设和投入力度。</p>
      <h3>三、坚决守住不发生规模性返贫底线</h3>
      <p>（一）完善监测帮扶机制。精准确定监测对象，将有返贫致贫风险和突发严重困难的农户纳入监测范围，简化工作流程，缩短认定时间。</p>
      <p>（二）促进脱贫人口持续增收。推动脱贫地区更多依靠发展来巩固拓展脱贫攻坚成果，让脱贫群众生活更上一层楼。</p>
      <p>（三）加大对乡村振兴重点帮扶县和易地搬迁集中安置区支持力度。在乡村振兴重点帮扶县实施一批补短板促发展项目。</p>
      <p>（四）推动脱贫地区帮扶政策落地见效。保持主要帮扶政策总体稳定，细化落实过渡期各项帮扶政策，开展政策效果评估。</p>
      <h3>四、聚焦产业促进乡村发展</h3>
      <p>（一）持续推进农村一二三产业融合发展。鼓励各地拓展农业多种功能、挖掘乡村多元价值，重点发展农产品加工、乡村休闲旅游、农村电商等产业。</p>
      <p>（二）大力发展县域富民产业。支持大中城市疏解产业向县域延伸，引导产业有序梯度转移。</p>
      <p>（三）加强县域商业体系建设。实施县域商业建设行动，促进农村消费扩容提质升级。</p>
      <p>（四）促进农民就地就近就业创业。落实各类农民工稳岗就业政策。</p>
      <p>（五）推进农业农村绿色发展。加强农业面源污染综合治理，深入推进农业投入品减量化、废弃物资源化、产业模式生态化。</p>
      <h3>五、扎实稳妥推进乡村建设</h3>
      <p>（一）健全乡村建设实施机制。坚持数量服从质量、进度服从实效，求好不求快，把握乡村建设的时度效。</p>
      <p>（二）接续实施农村人居环境整治提升五年行动。从农民实际需求出发推进农村改厕，具备条件的地方可推广水冲卫生厕所，统筹做好供水保障和污水管网衔接，不具备条件的可建设卫生旱厕。</p>
      <p>（三）扎实开展重点领域农村基础设施建设。有序推进乡镇通三级及以上等级公路、较大人口规模自然村（组）通硬化路，实施农村公路安全生命防护工程和危桥改造。</p>
      <p>（四）大力推进数字乡村建设。推进智慧农业发展，促进信息技术与农机农艺融合应用。</p>
      <p>（五）加强基本公共服务县域统筹。加快推进以县城为重要载体的城镇化建设，加强普惠性、基础性、兜底性民生建设，推动基本公共服务供给由注重机构行政区域覆盖向注重常住人口服务覆盖转变。</p>
      <h3>六、突出实效改进乡村治理</h3>
      <p>（一）加强农村基层组织建设。强化县级党委抓乡促村职责，深化乡镇管理体制改革，健全乡镇党委统一指挥和统筹协调机制，加强乡镇、村集中换届后领导班子建设，全面开展农村基层干部乡村振兴主题培训。</p>
      <p>（二）创新农村精神文明建设有效平台载体。依托新时代文明实践中心、县级融媒体中心等平台开展对象化分众化宣传教育，弘扬和践行社会主义核心价值观。</p>
      <p>（三）切实维护农村社会平安稳定。推进更高水平的平安法治乡村建设。</p>
      <h3>七、加大政策保障和体制机制创新力度</h3>
      <p>（一）扩大乡村振兴投入。继续把农业农村作为一般公共预算优先保障领域，中央预算内投资进一步向农业农村倾斜，压实地方政府投入责任。</p>
      <p>（二）强化乡村振兴金融服务。对机构法人在县域、业务在县域、资金主要用于乡村振兴的地方法人金融机构，加大支农支小再贷款、再贴现支持力度，实施更加优惠的存款准备金政策。</p>
      <p>（三）加强乡村振兴人才队伍建设。发现和培养使用农业领域战略科学家。启动"神农英才"计划，加快培养科技领军人才、青年科技人才和高水平创新团队。</p>
      <p>（四）抓好农村改革重点任务落实。开展第二轮土地承包到期后再延长30年整县试点。</p>
      <h3>八、坚持和加强党对"三农"工作的全面领导</h3>
      <p>（一）压实全面推进乡村振兴责任。制定乡村振兴责任制实施办法，明确中央和国家机关各部门推进乡村振兴责任，强化五级书记抓乡村振兴责任。</p>
      <p>（二）建强党的农村工作机构。各级党委农村工作领导小组要发挥"三农"工作牵头抓总、统筹协调等作用，一体承担巩固拓展脱贫攻坚成果、全面推进乡村振兴议事协调职责。</p>
      <p>（三）抓点带面推进乡村振兴全面展开。开展"百县千乡万村"乡村振兴示范创建，采取先创建后认定方式，分级创建一批乡村振兴示范县、示范乡镇、示范村。</p>
    `,
    highlights: [
      '全力抓好粮食生产和重要农产品供给',
      '强化现代农业基础支撑',
      '坚决守住不发生规模性返贫底线',
      '聚焦产业促进乡村发展',
      '扎实稳妥推进乡村建设',
      '突出实效改进乡村治理',
      '加大政策保障和体制机制创新力度'
    ]
  }
])

// 根据ID获取政策信息
const policy = computed(() => {
  return policies.value.find(p => p.id === policyId) || policies.value[0]
})

// 相关政策
const relatedPolicies = computed(() => {
  return policies.value.filter(p => p.id !== policyId).slice(0, 5)
})

// 导航栏滚动效果
onMounted(() => {
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar')
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
      navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)'
    } else {
      navbar.style.backgroundColor = '#fff'
      navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)'
    }
  })
})
</script>

<style scoped>
.policy-detail-container {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
}

/* 导航栏样式 */
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.logo h1 {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
  margin: 0;
}

.nav-menu {
  display: flex;
  list-style: none;
}

.nav-menu li {
  margin-left: 30px;
}

.nav-menu a {
  text-decoration: none;
  color: #606266;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #409eff;
}

.nav-buttons {
  display: flex;
  align-items: center;
}

.login-btn {
  margin-right: 10px;
}

/* 政策详情区 */
.policy-detail-section {
  padding: 60px 0;
  background-color: #f5f7fa;
}

.policy-detail-container-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

/* 政策头部信息 */
.policy-header {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.policy-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.policy-date {
  font-size: 14px;
  color: #909399;
}

.policy-source {
  font-size: 14px;
  color: #409eff;
}

.policy-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #303133;
  line-height: 1.3;
}

.policy-share {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 14px;
  color: #606266;
}

.share-icon {
  font-size: 18px;
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
}

.share-icon:hover {
  color: #66b1ff;
}

/* 政策内容 */
.policy-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.policy-body {
  font-size: 16px;
  line-height: 1.8;
  color: #303133;
  margin-bottom: 40px;
}

.policy-body h3 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #303133;
}

.policy-body p {
  margin-bottom: 15px;
}

.policy-highlights {
  border-top: 2px solid #409eff;
  padding-top: 30px;
}

.policy-highlights h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #303133;
}

.policy-highlights ul {
  list-style: none;
  padding-left: 0;
}

.policy-highlights li {
  margin-bottom: 12px;
  padding-left: 25px;
  position: relative;
  font-size: 16px;
  color: #606266;
}

.policy-highlights li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #409eff;
  font-size: 20px;
  line-height: 1;
}

/* 相关政策 */
.related-policies {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.related-policies h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #303133;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.related-policies-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.related-policy-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.related-policy-item:hover {
  background-color: #ecf5ff;
}

.related-policy-date {
  font-size: 14px;
  color: #909399;
  flex: 0 0 120px;
}

.related-policy-title {
  font-size: 16px;
  color: #303133;
  text-decoration: none;
  flex: 1;
  transition: color 0.3s;
}

.related-policy-title:hover {
  color: #409eff;
}

/* 页脚 */
.footer {
  background-color: #303133;
  color: #fff;
  padding: 60px 0 30px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  text-decoration: none;
  color: #909399;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #409eff;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #404244;
  font-size: 14px;
  color: #909399;
}

/* 自定义按钮样式 */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #409eff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #fff;
  color: #409eff;
  border: 2px solid #409eff;
}

.btn-secondary:hover {
  background-color: #f0f9ff;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .policy-title {
    font-size: 24px;
  }

  .policy-meta {
    flex-direction: column;
    gap: 10px;
  }

  .related-policy-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .related-policy-date {
    flex: 1;
  }
}
</style>