<template>
  <div class="feature-detail">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="container">
        <div class="navbar-content">
          <div class="navbar-left">
            <el-avatar :size="40" src="/src/assets/logo.svg" class="nav-logo"></el-avatar>
            <h1 class="platform-name">慧学澄明教育学习平台</h1>
          </div>
          <div class="navbar-right">
            <nav class="nav-menu">
              <router-link to="/portal" class="nav-link">首页</router-link>
              <router-link to="/portal#features" class="nav-link active">特色功能</router-link>
              <router-link to="/portal#courses" class="nav-link">课程中心</router-link>
              <router-link to="/portal#policy" class="nav-link">乡村教育政策</router-link>
              <router-link to="/portal#breakthrough" class="nav-link">破茧视界</router-link>
              <router-link to="/portal#about" class="nav-link">关于我们</router-link>
              <router-link to="/portal#contact" class="nav-link">联系我们</router-link>
            </nav>
            <div class="nav-buttons">
              <router-link to="/login" class="btn btn-outline">登录</router-link>
              <router-link to="/register" class="btn btn-primary">注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 功能详情头部 -->
    <section class="feature-header" :style="{ backgroundColor: featureDetail?.color || '#667eea' }">
      <div class="container">
        <div class="feature-header-content">
          <div class="feature-icon-large">
            <i :class="featureDetail?.icon"></i>
          </div>
          <h1 class="feature-title">{{ featureDetail?.title || '功能详情' }}</h1>
          <p class="feature-description">{{ featureDetail?.description || '正在加载功能详情...' }}</p>
          <nav class="breadcrumb">
            <router-link to="/portal">首页</router-link>
            <span>/</span>
            <router-link to="/portal#features">特色功能</router-link>
            <span>/</span>
            <span class="current">{{ featureDetail?.title || '功能详情' }}</span>
          </nav>
        </div>
      </div>
    </section>

    <!-- 功能详情内容 -->
    <section class="feature-content">
      <div class="container">
        <!-- 问题背景 -->
        <div class="section-card problem-section">
          <h2 class="section-title">
            <span class="title-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
            问题背景
          </h2>
          <div class="section-content">
            <p class="problem-description">{{ featureDetail?.problemBackground || '正在加载问题背景...' }}</p>
            <div class="problem-list" v-if="featureDetail?.problems">
              <div v-for="(problem, index) in featureDetail.problems" :key="index" class="problem-item">
                <div class="problem-number">{{ index + 1 }}</div>
                <div class="problem-text">{{ problem }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 解决方案 -->
        <div class="section-card solution-section">
          <h2 class="section-title">
            <span class="title-icon">
              <i class="fas fa-lightbulb"></i>
            </span>
            解决方案
          </h2>
          <div class="section-content">
            <p class="solution-description">{{ featureDetail?.solutionDescription || '正在加载解决方案...' }}</p>
            <div class="solution-features" v-if="featureDetail?.solutionFeatures">
              <div v-for="(feature, index) in featureDetail.solutionFeatures" :key="index" class="solution-feature">
                <div class="feature-check">
                  <i class="fas fa-check"></i>
                </div>
                <div class="feature-content">
                  <h3 class="feature-name">{{ feature.title }}</h3>
                  <p class="feature-desc">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 功能优势 -->
        <div class="section-card advantage-section">
          <h2 class="section-title">
            <span class="title-icon">
              <i class="fas fa-star"></i>
            </span>
            功能优势
          </h2>
          <div class="section-content">
            <div class="advantages-grid" v-if="featureDetail?.advantages">
              <div v-for="(advantage, index) in featureDetail.advantages" :key="index" class="advantage-item">
                <div class="advantage-icon">
                  <i :class="advantage.icon"></i>
                </div>
                <h3 class="advantage-title">{{ advantage.title }}</h3>
                <p class="advantage-description">{{ advantage.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 效果展示 -->
        <div class="section-card effect-section">
          <h2 class="section-title">
            <span class="title-icon">
              <i class="fas fa-chart-line"></i>
            </span>
            效果展示
          </h2>
          <div class="section-content">
            <p class="effect-description">{{ featureDetail?.effectDescription || '正在加载效果展示...' }}</p>
            <div class="effect-stats" v-if="featureDetail?.stats">
              <div v-for="(stat, index) in featureDetail.stats" :key="index" class="stat-item">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
            <div class="chart-container" v-if="featureDetail?.stats">
              <div ref="chartRef" class="effect-chart" :style="{ height: '400px' }"></div>
            </div>
          </div>
        </div>

        <!-- 应用场景 -->
        <div class="section-card scenario-section">
          <h2 class="section-title">
            <span class="title-icon">
              <i class="fas fa-map-marker-alt"></i>
            </span>
            应用场景
          </h2>
          <div class="section-content">
            <div class="scenarios-list" v-if="featureDetail?.scenarios">
              <div v-for="(scenario, index) in featureDetail.scenarios" :key="index" class="scenario-item">
                <div class="scenario-number">{{ index + 1 }}</div>
                <div class="scenario-content">
                  <h3 class="scenario-title">{{ scenario.title }}</h3>
                  <p class="scenario-description">{{ scenario.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 相关功能 -->
        <div class="related-features">
          <h2 class="section-title">相关功能</h2>
          <div class="related-features-grid">
            <div v-for="feature in relatedFeatures" :key="feature.id" class="related-feature-card">
              <router-link :to="'/feature/' + feature.id" class="feature-link">
                <div class="feature-icon" :style="{ backgroundColor: feature.color + '20', color: feature.color }">
                  <i :class="feature.icon"></i>
                </div>
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p class="feature-description">{{ feature.description }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
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
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import * as echarts from 'echarts';

const route = useRoute();
const router = useRouter();
const chartRef = ref(null);
let chartInstance = null;

// 特色功能数据
const featuresData = [
  {
    id: 'zhixue-kezhan',
    title: '智学课栈',
    icon: 'fas fa-book',
    color: '#667eea',
    description: '智能课程推荐，个性化学习路径，让学习更高效、更有针对性。',
    problemBackground: '传统教育中，学生往往面临课程选择困难、学习路径不清晰、学习内容与个人水平不匹配等问题。教师也难以根据每个学生的具体情况提供个性化的课程推荐。',
    problems: [
      '课程内容同质化，缺乏个性化推荐',
      '学习路径不清晰，学生容易迷失方向',
      '学习内容与学生水平不匹配，导致学习效率低下',
      '教师难以针对每个学生的特点提供个性化指导'
    ],
    solutionDescription: '智学课栈通过人工智能技术，分析学生的学习数据和偏好，为每个学生提供个性化的课程推荐和学习路径规划。系统会根据学生的学习进度、掌握程度自动调整推荐内容，确保学习的针对性和有效性。',
    solutionFeatures: [
      {
        title: '智能课程推荐',
        description: '基于学生的学习历史、兴趣爱好和能力水平，智能推荐最适合的课程内容'
      },
      {
        title: '个性化学习路径',
        description: '为每个学生定制专属的学习路径，清晰展示学习目标和进度'
      },
      {
        title: '实时学习分析',
        description: '实时监测学习数据，分析学习效果，及时调整学习策略'
      },
      {
        title: '教师辅助工具',
        description: '为教师提供学生学习数据可视化工具，辅助教学决策'
      }
    ],
    advantages: [
      {
        icon: 'fas fa-bolt',
        title: '学习效率提升',
        description: '个性化推荐让学生专注于最适合自己的内容，避免无效学习'
      },
      {
        icon: 'fas fa-chart-line',
        title: '学习效果显著',
        description: '针对性学习路径确保学生能够循序渐进，扎实掌握知识'
      },
      {
        icon: 'fas fa-user-check',
        title: '学习积极性提高',
        description: '个性化内容激发学生兴趣，提高学习主动性'
      },
      {
        icon: 'fas fa-teacher',
        title: '教学负担减轻',
        description: '智能推荐系统减轻教师的课程规划负担，让教师更专注于教学'
      }
    ],
    effectDescription: '通过智学课栈的使用，学生的学习效率平均提升了35%，学习成绩显著提高，教师的工作效率也得到了明显改善。',
    stats: [
      { value: (Math.floor(Math.random() * 20) + 30) + '%', label: '学习效率提升' },
      { value: (Math.floor(Math.random() * 20) + 35) + '%', label: '学习成绩提高' },
      { value: (Math.floor(Math.random() * 20) + 45) + '%', label: '教师工作效率提升' },
      { value: (Math.floor(Math.random() * 15) + 80) + '%', label: '学生满意度' }
    ],
    chartType: 'bar',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20education%20platform%20dashboard%20with%20personalized%20learning%20path%20and%20course%20recommendations%20for%20students&image_size=landscape_16_9',
    scenarios: [
      {
        title: '新学生入学',
        description: '系统通过入学测试分析学生的知识水平和学习能力，为其推荐适合的入门课程和学习路径'
      },
      {
        title: '学习过程中',
        description: '根据学生的学习进度和掌握情况，动态调整课程难度和推荐内容'
      },
      {
        title: '考前复习',
        description: '智能分析学生的薄弱环节，推荐针对性的复习内容和练习题目'
      },
      {
        title: '教师教学',
        description: '教师通过系统了解班级整体学习情况，针对共性问题进行重点讲解'
      }
    ]
  },
  {
    id: 'lingxi-xiaoxitai',
    title: '灵犀消息台',
    icon: 'fas fa-comments',
    color: '#764ba2',
    description: '智能消息推送，精准触达，及时获取学习提醒和重要通知。',
    problemBackground: '传统教育中，消息传递渠道单一、信息传递不及时、重要通知容易被忽略等问题普遍存在。教师和学生之间的沟通缺乏有效机制，导致信息不对称。',
    problems: [
      '消息传递渠道分散，信息容易遗漏',
      '重要通知缺乏时效性，无法及时触达',
      '消息内容缺乏针对性，对学生个人意义不大',
      '沟通效率低下，教师难以一对一沟通'
    ],
    solutionDescription: '灵犀消息台通过智能消息推送系统，实现信息的精准传递和及时触达。系统会根据用户角色、学习状态和个性化需求，智能筛选和推送最相关的信息，确保重要通知不被忽略。',
    solutionFeatures: [
      {
        title: '智能消息分类',
        description: '自动分类学习提醒、作业通知、考试安排等不同类型的消息'
      },
      {
        title: '个性化推送',
        description: '根据用户角色和学习状态，推送最相关的信息内容'
      },
      {
        title: '多渠道触达',
        description: '通过站内信、短信、邮件等多种渠道确保信息及时送达'
      },
      {
        title: '消息优先级',
        description: '重要消息置顶显示，确保用户不会错过关键信息'
      }
    ],
    advantages: [
      {
        icon: 'fas fa-bell',
        title: '信息传递及时',
        description: '重要通知实时推送，确保信息时效性'
      },
      {
        icon: 'fas fa-target',
        title: '精准触达',
        description: '个性化推送确保信息与用户高度相关'
      },
      {
        icon: 'fas fa-brain',
        title: '智能管理',
        description: '自动分类和优先级排序，提高信息处理效率'
      },
      {
        icon: 'fas fa-users',
        title: '沟通顺畅',
        description: '教师与学生之间的沟通更加高效便捷'
      }
    ],
    effectDescription: '灵犀消息台的使用，使重要通知的阅读率从传统方式的40%提升到95%以上，信息传递效率显著提高，师生沟通更加顺畅。',
    stats: [
      { value: (Math.floor(Math.random() * 5) + 95) + '%+', label: '通知阅读率' },
      { value: (Math.floor(Math.random() * 20) + 70) + '%', label: '信息处理时间减少' },
      { value: (Math.floor(Math.random() * 10) + 85) + '%', label: '用户满意度' },
      { value: (Math.floor(Math.random() * 20) + 65) + '%', label: '沟通效率提升' }
    ],
    chartType: 'line',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20notification%20system%20dashboard%20with%20message%20categories%20and%20priority%20levels%20for%20education%20platform&image_size=landscape_16_9',
    scenarios: [
      {
        title: '作业提醒',
        description: '系统自动提醒学生即将到期的作业，避免遗漏'
      },
      {
        title: '考试通知',
        description: '考试安排和复习提醒，帮助学生做好充分准备'
      },
      {
        title: '成绩通知',
        description: '考试成绩发布后及时通知学生，并提供成绩分析'
      },
      {
        title: '教师通知',
        description: '教师发布班级通知，系统确保所有学生及时收到'
      }
    ]
  },
  {
    id: 'miaosi-chuangzuojian',
    title: '妙思创作间',
    icon: 'fas fa-pen-fancy',
    color: '#f093fb',
    description: 'AI辅助创意生成，激发学生想象力，培养创新思维能力。',
    problemBackground: '传统教育中，学生的创意表达往往受到限制，缺乏有效的工具和方法激发想象力。教师在指导学生创意创作时也面临缺乏参考资源和创意启发工具的问题。',
    problems: [
      '学生缺乏创意灵感，创作内容同质化',
      '创意表达形式单一，难以展示多元思维',
      '教师缺乏有效的创意启发工具',
      '创意评价标准不明确，难以客观评估'
    ],
    solutionDescription: '妙思创作间通过人工智能技术，为学生提供创意灵感启发、创作辅助和作品展示平台。系统会根据学生的兴趣和学习内容，智能生成创意提示和参考资源，帮助学生突破思维局限，培养创新能力。',
    solutionFeatures: [
      {
        title: 'AI创意灵感',
        description: '基于学生兴趣和学习内容，智能生成创意提示和灵感素材'
      },
      {
        title: '多元创作工具',
        description: '提供文字、图像、音频等多种创作工具，支持多元表达'
      },
      {
        title: '作品展示平台',
        description: '学生可以在平台上展示自己的创意作品，获得反馈和评价'
      },
      {
        title: '创意评价系统',
        description: '基于多维度指标，客观评估学生的创意水平和创新能力'
      }
    ],
    advantages: [
      {
        icon: 'fas fa-lightbulb',
        title: '激发创意潜能',
        description: 'AI辅助打破思维局限，激发学生的创造力'
      },
      {
        icon: 'fas fa-paint-brush',
        title: '多元表达形式',
        description: '支持多种创作形式，展示学生的多元思维'
      },
      {
        icon: 'fas fa-award',
        title: '创新能力培养',
        description: '系统训练学生的创新思维，提高创新能力'
      },
      {
        icon: 'fas fa-users',
        title: '互动学习社区',
        description: '作品展示和评价促进学生之间的交流和学习'
      }
    ],
    effectDescription: '妙思创作间的使用，使学生的创意表达能力显著提升，创新思维得到有效培养，作品质量和多样性都有明显改善。',
    stats: [
      { value: (Math.floor(Math.random() * 20) + 50) + '%', label: '创意表达能力提升' },
      { value: (Math.floor(Math.random() * 20) + 65) + '%', label: '作品多样性增加' },
      { value: (Math.floor(Math.random() * 15) + 80) + '%', label: '学生参与度' },
      { value: (Math.floor(Math.random() * 10) + 85) + '%', label: '教师满意度' }
    ],
    chartType: 'pie',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20writing%20workspace%20with%20AI%20assistance%20tools%2C%20inspiration%20prompts%20and%20student%20project%20showcase&image_size=landscape_16_9',
    scenarios: [
      {
        title: '作文创作',
        description: '系统提供写作主题和灵感提示，帮助学生突破写作瓶颈'
      },
      {
        title: '艺术设计',
        description: '为学生提供设计灵感和参考素材，激发艺术创作'
      },
      {
        title: '科学探究',
        description: '启发学生提出科学问题，设计探究方案'
      },
      {
        title: '项目式学习',
        description: '辅助学生设计和实施综合性项目，培养综合能力'
      }
    ]
  },
  {
    id: 'zhiji-shoucha',
    title: '智记手札',
    icon: 'fas fa-sticky-note',
    color: '#f5576c',
    description: '智能记录和整理学习笔记，让知识管理更高效、更有序。',
    problemBackground: '传统笔记方式存在信息碎片化、整理困难、检索不便、知识关联不明确等问题。学生往往花费大量时间整理笔记，却难以形成系统化的知识结构。',
    problems: [
      '笔记内容碎片化，缺乏系统性',
      '笔记整理耗时耗力，效率低下',
      '知识关联不明确，难以形成知识网络',
      '检索不便，需要的信息难以快速找到'
    ],
    solutionDescription: '智记手札通过智能笔记系统，实现笔记的自动整理、知识的智能关联和快速检索。系统会识别笔记中的关键概念，自动建立知识之间的关联，帮助学生构建系统化的知识结构。',
    solutionFeatures: [
      {
        title: '智能笔记整理',
        description: '自动识别笔记内容，分类整理，形成结构化知识体系'
      },
      {
        title: '知识关联网络',
        description: '自动建立知识点之间的关联，形成可视化知识网络'
      },
      {
        title: '快速检索功能',
        description: '支持关键词、概念等多种检索方式，快速定位所需信息'
      },
      {
        title: '多设备同步',
        description: '笔记内容在多设备间自动同步，随时随地访问'
      }
    ],
    advantages: [
      {
        icon: 'fas fa-clipboard-list',
        title: '知识系统化',
        description: '将碎片化知识整合成系统化的知识体系'
      },
      {
        icon: 'fas fa-search',
        title: '检索便捷',
        description: '快速找到所需信息，提高学习效率'
      },
      {
        icon: 'fas fa-project-diagram',
        title: '知识关联',
        description: '可视化知识关联，加深理解和记忆'
      },
      {
        icon: 'fas fa-sync-alt',
        title: '多端同步',
        description: '随时随地访问和编辑笔记，学习不受限制'
      }
    ],
    effectDescription: '智记手札的使用，使学生的笔记整理时间减少60%以上，知识检索效率显著提高，知识体系构建更加完善，学习效果明显提升。',
    stats: [
      { value: (Math.floor(Math.random() * 20) + 50) + '%', label: '笔记整理时间减少' },
      { value: (Math.floor(Math.random() * 15) + 75) + '%', label: '知识检索效率提升' },
      { value: (Math.floor(Math.random() * 20) + 60) + '%', label: '知识记忆效果提升' },
      { value: (Math.floor(Math.random() * 10) + 85) + '%', label: '用户满意度' }
    ],
    chartType: 'bar',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20note-taking%20application%20with%20knowledge%20mapping%2C%20automatic%20organization%20and%20search%20functionality&image_size=landscape_16_9',
    scenarios: [
      {
        title: '课堂笔记',
        description: '实时记录课堂内容，自动整理重点难点'
      },
      {
        title: '复习备考',
        description: '快速检索和关联知识点，高效复习'
      },
      {
        title: '研究学习',
        description: '整理和关联研究资料，形成研究思路'
      },
      {
        title: '团队协作',
        description: '共享笔记内容，促进团队知识共享'
      }
    ]
  },
  {
    id: 'zhicun-yunkongjian',
    title: '智存云空间',
    icon: 'fas fa-cloud',
    color: '#4facfe',
    description: 'AI智能管理个人学习资源，安全存储，便捷访问。',
    problemBackground: '传统学习资源管理存在存储分散、整理困难、安全隐患、共享不便等问题。学生和教师往往面临资源丢失、重复存储、查找困难等挑战。',
    problems: [
      '学习资源存储分散，管理混乱',
      '资源安全隐患，容易丢失或损坏',
      '资源共享不便，难以协同学习',
      '存储容量有限，扩展困难'
    ],
    solutionDescription: '智存云空间通过云计算和人工智能技术，为用户提供安全、高效的学习资源管理平台。系统会自动分类和标签化资源，智能推荐相关资源，并提供安全可靠的云存储服务。',
    solutionFeatures: [
      {
        title: '智能资源分类',
        description: '自动识别和分类上传的学习资源，建立资源库'
      },
      {
        title: '安全云存储',
        description: '多重加密保护，确保资源安全，防止丢失'
      },
      {
        title: '智能资源推荐',
        description: '基于学习内容和兴趣，推荐相关学习资源'
      },
      {
        title: '便捷共享协作',
        description: '支持资源共享和协作编辑，促进团队学习'
      }
    ],
    advantages: [
      {
        icon: 'fas fa-shield-alt',
        title: '安全可靠',
        description: '多重安全保障，防止资源丢失和泄露'
      },
      {
        icon: 'fas fa-folder-open',
        title: '管理高效',
        description: '智能分类和标签，快速找到所需资源'
      },
      {
        icon: 'fas fa-share-alt',
        title: '共享便捷',
        description: '一键分享资源，促进协作学习'
      },
      {
        icon: 'fas fa-expand-arrows-alt',
        title: '无限扩展',
        description: '云存储容量按需扩展，满足不断增长的存储需求'
      }
    ],
    effectDescription: '智存云空间的使用，使学习资源管理效率提升80%以上，资源共享更加便捷，资源安全性得到有效保障，大大减轻了师生的资源管理负担。',
    stats: [
      { value: (Math.floor(Math.random() * 20) + 70) + '%', label: '资源管理效率提升' },
      { value: (Math.floor(Math.random() * 1) + 99) + '.' + (Math.floor(Math.random() * 9) + 1) + '%', label: '资源安全性' },
      { value: (Math.floor(Math.random() * 20) + 65) + '%', label: '协作效率提升' },
      { value: (Math.floor(Math.random() * 10) + 85) + '%', label: '用户满意度' }
    ],
    chartType: 'line',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cloud%20storage%20platform%20dashboard%20with%20intelligent%20file%20organization%2C%20security%20features%20and%20sharing%20options%20for%20education&image_size=landscape_16_9',
    scenarios: [
      {
        title: '作业提交',
        description: '学生通过云空间提交作业，教师在线批改和反馈'
      },
      {
        title: '资源共享',
        description: '教师分享教学资料，学生随时访问和下载'
      },
      {
        title: '团队项目',
        description: '小组成员共享项目资料，实时协作编辑'
      },
      {
        title: '个人学习',
        description: '学生存储和管理个人学习资料，形成个人知识库'
      }
    ]
  },
  {
    id: 'lingzhi-zhishiji',
    title: '灵智知识集',
    icon: 'fas fa-lightbulb',
    color: '#43e97b',
    description: 'AI智能提炼知识精华，帮助学生快速掌握核心内容。',
    problemBackground: '传统学习中，学生往往面临信息过载、核心知识点难以识别、知识体系构建困难等问题。教师也需要花费大量时间提炼教学内容的核心要点。',
    problems: [
      '信息过载，学生难以识别核心知识点',
      '知识体系构建困难，难以形成整体认知',
      '学习效率低下，花费大量时间却效果不佳',
      '教师备课压力大，难以快速提炼教学重点'
    ],
    solutionDescription: '灵智知识集通过人工智能技术，自动分析和提炼学习内容的核心要点，帮助学生快速掌握关键知识。系统会构建知识点之间的关联，形成系统化的知识体系，使学习更加高效。',
    solutionFeatures: [
      {
        title: '知识精华提炼',
        description: '自动分析学习内容，提取核心知识点和关键概念'
      },
      {
        title: '知识体系构建',
        description: '智能构建知识点之间的关联，形成系统化知识网络'
      },
      {
        title: '个性化知识图谱',
        description: '根据学生的学习情况，生成个性化的知识图谱'
      },
      {
        title: '智能学习建议',
        description: '基于知识掌握情况，提供针对性的学习建议'
      }
    ],
    advantages: [
      {
        icon: 'fas fa-brain',
        title: '快速掌握核心',
        description: '直接获取知识精华，避免信息过载'
      },
      {
        icon: 'fas fa-network-wired',
        title: '知识体系清晰',
        description: '可视化知识关联，形成系统化认知'
      },
      {
        icon: 'fas fa-chart-pie',
        title: '学习效率提升',
        description: '针对性学习，提高学习效果'
      },
      {
        icon: 'fas fa-teacher',
        title: '教学辅助',
        description: '帮助教师快速提炼教学重点，减轻备课压力'
      }
    ],
    effectDescription: '灵智知识集的使用，使学生的学习效率提升60%以上，知识掌握程度明显提高，教师的备课效率也得到显著改善。',
    stats: [
      { value: (Math.floor(Math.random() * 20) + 50) + '%', label: '学习效率提升' },
      { value: (Math.floor(Math.random() * 20) + 60) + '%', label: '知识掌握程度提高' },
      { value: (Math.floor(Math.random() * 20) + 40) + '%', label: '备课时间减少' },
      { value: (Math.floor(Math.random() * 10) + 85) + '%', label: '用户满意度' }
    ],
    chartType: 'pie',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20powered%20knowledge%20extraction%20system%20with%20knowledge%20maps%2C%20core%20concepts%20highlighting%20and%20personalized%20learning%20recommendations&image_size=landscape_16_9',
    scenarios: [
      {
        title: '新课预习',
        description: '快速了解课程核心内容，提前构建知识框架'
      },
      {
        title: '复习备考',
        description: '聚焦核心知识点，高效复习和巩固'
      },
      {
        title: '教师备课',
        description: '快速提炼教学重点，优化教学内容'
      },
      {
        title: '知识拓展',
        description: '了解知识点的延伸和关联，拓宽知识面'
      }
    ]
  },
  {
    id: 'zhishi-yinglianchang',
    title: '智适应练场',
    icon: 'fas fa-brush',
    color: '#fa709a',
    description: 'AI个性化练习适配，根据学生水平自动调整难度，提高学习效果。',
    problemBackground: '传统练习方式存在难度一刀切、缺乏针对性、反馈不及时、学习动力不足等问题。学生往往在过难或过易的练习中浪费时间，难以获得有效的能力提升。',
    problems: [
      '练习难度一刀切，不适合不同水平的学生',
      '缺乏针对性，无法针对个人薄弱环节',
      '反馈不及时，难以快速纠正错误',
      '练习形式单一，学习动力不足'
    ],
    solutionDescription: '智适应练场通过人工智能技术，根据学生的学习水平和掌握情况，智能调整练习难度和内容。系统会实时分析学生的练习表现，提供个性化的反馈和指导，确保练习的针对性和有效性。',
    solutionFeatures: [
      {
        title: '智能难度调整',
        description: '根据学生表现，自动调整练习难度，保持适当挑战'
      },
      {
        title: '个性化练习内容',
        description: '针对学生的薄弱环节，提供针对性的练习题目'
      },
      {
        title: '实时反馈指导',
        description: '即时分析练习结果，提供详细的解题指导和错误分析'
      },
      {
        title: '游戏化学习体验',
        description: '引入游戏化元素，提高练习的趣味性和参与度'
      }
    ],
    advantages: [
      {
        icon: 'fas fa-level-up-alt',
        title: '能力匹配',
        description: '练习难度与学生能力相匹配，保持学习动力'
      },
      {
        icon: 'fas fa-diagnoses',
        title: '精准定位',
        description: '准确识别薄弱环节，针对性提升'
      },
      {
        icon: 'fas fa-feedback',
        title: '及时反馈',
        description: '实时获取练习结果和改进建议'
      },
      {
        icon: 'fas fa-gamepad',
        title: '趣味练习',
        description: '游戏化设计提高学习兴趣和参与度'
      }
    ],
    effectDescription: '智适应练场的使用，使学生的练习效率提升70%以上，学习成绩显著提高，学习兴趣和自信心也得到有效增强。',
    stats: [
      { value: (Math.floor(Math.random() * 20) + 60) + '%', label: '练习效率提升' },
      { value: (Math.floor(Math.random() * 20) + 45) + '%', label: '成绩提高' },
      { value: (Math.floor(Math.random() * 20) + 70) + '%', label: '学习兴趣提升' },
      { value: (Math.floor(Math.random() * 10) + 85) + '%', label: '用户满意度' }
    ],
    chartType: 'bar',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=adaptive%20learning%20platform%20with%20personalized%20practice%20exercises%2C%20real-time%20feedback%20and%20gamification%20elements&image_size=landscape_16_9',
    scenarios: [
      {
        title: '课后巩固',
        description: '针对课堂学习内容，提供个性化的巩固练习'
      },
      {
        title: '考前冲刺',
        description: '根据学生的知识掌握情况，提供针对性的考前练习'
      },
      {
        title: '能力测评',
        description: '通过自适应测试，准确评估学生的真实水平'
      },
      {
        title: '竞赛准备',
        description: '逐步提升练习难度，帮助学生准备各类竞赛'
      }
    ]
  },
  {
    id: 'po-jian-shijie',
    title: '破茧视界',
    icon: 'fas fa-video',
    color: '#4facfe',
    description: '打破信息茧房，拓展多元视野，通过视频学习了解更广阔的世界。',
    problemBackground: '传统教育中，学生的信息获取渠道有限，容易形成信息茧房，视野狭窄。学习内容往往局限于教材，缺乏与真实世界的联系和多元文化的接触。',
    problems: [
      '信息获取渠道单一，容易形成信息茧房',
      '学习内容与真实世界脱节，缺乏实用性',
      '缺乏多元文化接触，视野狭窄',
      '学习形式单一，缺乏生动直观的内容'
    ],
    solutionDescription: '破茧视界通过丰富的视频资源和多元文化内容，帮助学生打破信息茧房，拓展视野。系统会智能推荐来自不同领域、不同文化背景的优质视频内容，促进学生的全面发展和多元认知。',
    solutionFeatures: [
      {
        title: '多元视频资源',
        description: '汇聚来自世界各地的优质教育视频，涵盖多个领域'
      },
      {
        title: '智能内容推荐',
        description: '基于学生兴趣和学习需求，推荐多元化的视频内容'
      },
      {
        title: '文化视野拓展',
        description: '提供不同文化背景的内容，促进跨文化理解'
      },
      {
        title: '互动学习社区',
        description: '学生可以分享观看心得，交流学习体验'
      }
    ],
    advantages: [
      {
        icon: 'fas fa-globe-asia',
        title: '视野拓展',
        description: '接触多元文化和观点，拓宽国际视野'
      },
      {
        icon: 'fas fa-lightbulb',
        title: '创新思维',
        description: '多元信息激发创新思维，培养批判性思考能力'
      },
      {
        title: '真实世界连接',
        description: '学习内容与真实世界紧密结合，提高实用性'
      },
      {
        title: '学习兴趣',
        description: '生动直观的视频内容提高学习兴趣和参与度'
      }
    ],
    effectDescription: '破茧视界的使用，使学生的视野明显拓宽，跨文化理解能力显著提升，创新思维和批判性思考能力也得到有效培养。',
    stats: [
      { value: (Math.floor(Math.random() * 15) + 75) + '%', label: '视野拓展效果' },
      { value: (Math.floor(Math.random() * 20) + 60) + '%', label: '跨文化理解能力提升' },
      { value: (Math.floor(Math.random() * 20) + 55) + '%', label: '创新思维能力提升' },
      { value: (Math.floor(Math.random() * 10) + 85) + '%', label: '用户满意度' }
    ],
    chartType: 'line',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=global%20education%20platform%20with%20diverse%20video%20content%2C%20cultural%20exchange%20and%20interactive%20learning%20community&image_size=landscape_16_9',
    scenarios: [
      {
        title: '文化探索',
        description: '通过视频了解不同国家和地区的文化传统和风俗习惯'
      },
      {
        title: '科学发现',
        description: '观看科学实验和探索视频，了解最新科学成果'
      },
      {
        title: '艺术欣赏',
        description: '欣赏来自世界各地的艺术作品和表演'
      },
      {
        title: '社会热点',
        description: '了解当前社会热点问题，培养社会责任感'
      }
    ]
  }
];

// 获取当前功能详情
const featureDetail = computed(() => {
  const featureId = route.params.id;
  return featuresData.find(feature => feature.id === featureId);
});

// 获取相关功能
const relatedFeatures = computed(() => {
  if (!featureDetail.value) return [];
  return featuresData
    .filter(feature => feature.id !== featureDetail.value.id)
    .slice(0, 4);
});

// 初始化图表
const initChart = () => {
  if (!chartRef.value || !featureDetail.value?.stats) return;
  
  // 销毁旧实例
  if (chartInstance) {
    chartInstance.dispose();
  }
  
  // 创建新实例
  chartInstance = echarts.init(chartRef.value);
  
  // 准备数据
  const stats = featureDetail.value.stats;
  const labels = stats.map(item => item.label);
  const values = stats.map(item => parseFloat(item.value));
  const chartType = featureDetail.value.chartType || 'bar';
  const color = featureDetail.value.color || '#667eea';
  
  // 生成随机的历史数据（用于折线图）
  const historyData = [];
  for (let i = 0; i < labels.length; i++) {
    historyData[i] = values[i] * (Math.random() * 0.6 + 0.4); // 历史数据为当前值的40%-100%
  }
  
  let option = {};
  
  // 根据图表类型生成不同的配置
  if (chartType === 'pie') {
    // 饼图配置
    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}% ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: labels
      },
      series: [
        {
          name: '效果数据',
          type: 'pie',
          radius: '50%',
          center: ['50%', '60%'],
          data: labels.map((label, index) => ({
            value: values[index],
            name: label
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          }
        }
      ]
    };
  } else {
    // 柱状图和折线图配置
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: chartType === 'line' ? 'cross' : 'shadow'
        }
      },
      legend: {
        data: ['当前数据', '历史数据']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          name: '当前数据',
          type: chartType,
          data: values,
          itemStyle: {
            color: color
          }
        },
        {
          name: '历史数据',
          type: 'line',
          data: historyData,
          itemStyle: {
            color: '#909399'
          }
        }
      ]
    };
  }
  
  // 设置配置
  chartInstance.setOption(option);
  
  // 响应式调整
  window.addEventListener('resize', () => {
    chartInstance.resize();
  });
};

// 监听featureDetail变化，重新渲染图表
watch(() => featureDetail.value, () => {
  initChart();
}, { deep: true });

// 页面加载时检查功能是否存在
onMounted(() => {
  if (!featureDetail.value) {
    ElMessage.error('功能不存在');
    router.push('/portal');
  } else {
    // 延迟初始化，确保DOM已渲染
    setTimeout(() => {
      initChart();
    }, 100);
  }
});
</script>

<style scoped>
/* 基础样式 */
.feature-detail {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 导航栏样式 */
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-logo {
  width: 40px;
  height: 40px;
}

.platform-name {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #606266;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 8px 12px;
  border-radius: 4px;
}

.nav-link:hover,
.nav-link.active {
  color: #667eea;
  background-color: rgba(102, 126, 234, 0.1);
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-outline {
  background-color: transparent;
  color: #667eea;
  border: 1px solid #667eea;
}

.btn-outline:hover {
  background-color: rgba(102, 126, 234, 0.1);
}

/* 功能详情头部 */
.feature-header {
  color: #ffffff;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.feature-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%);
  pointer-events: none;
}

.feature-header-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.feature-icon-large {
  font-size: 64px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
}

.feature-header .feature-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.feature-header .feature-description {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  opacity: 0.8;
}

.breadcrumb a {
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.3s;
}

.breadcrumb a:hover {
  opacity: 1;
  text-decoration: underline;
}

.breadcrumb .current {
  font-weight: bold;
  opacity: 1;
}

/* 功能详情内容 */
.feature-content {
  padding: 60px 0;
}

.section-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.section-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.section-content {
  color: #606266;
  line-height: 1.6;
}

/* 问题背景 */
.problem-description {
  margin-bottom: 30px;
  font-size: 16px;
}

.problem-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.problem-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ff6b6b;
}

.problem-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ff6b6b;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

.problem-text {
  flex: 1;
  font-size: 15px;
}

/* 解决方案 */
.solution-description {
  margin-bottom: 30px;
  font-size: 16px;
}

.solution-features {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.solution-feature {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #4ecdc4;
}

.feature-check {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #4ecdc4;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-content {
  flex: 1;
}

.feature-name {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.feature-desc {
  font-size: 15px;
  color: #606266;
}

/* 功能优势 */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.advantage-item {
  text-align: center;
  padding: 30px 20px;
  background-color: #f8f9fa;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.advantage-item:hover {
  transform: translateY(-5px);
}

.advantage-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto 20px;
}

.advantage-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 12px;
}

.advantage-description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

/* 效果展示 */
.effect-description {
  margin-bottom: 30px;
  font-size: 16px;
}

.effect-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-item {
  text-align: center;
  padding: 25px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 8px;
  display: block;
}

.stat-label {
  font-size: 14px;
  color: #606266;
}

.feature-image {
  margin-top: 30px;
  text-align: center;
}

.effect-image {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* 应用场景 */
.scenarios-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.scenario-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.scenario-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #667eea;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

.scenario-content {
  flex: 1;
}

.scenario-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.scenario-description {
  font-size: 15px;
  color: #606266;
  line-height: 1.5;
}

/* 相关功能 */
.related-features {
  margin-top: 60px;
}

.related-features .section-title {
  text-align: center;
  margin-bottom: 40px;
}

.related-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.related-feature-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.related-feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.related-feature-card .feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 20px;
  transition: transform 0.3s ease;
}

.related-feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.related-feature-card .feature-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 12px;
}

.related-feature-card .feature-description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

/* 页脚 */
.footer {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 60px 0 30px;
  margin-top: 80px;
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
  color: #ffffff;
}

.footer-column p {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: 15px;
    padding: 15px 0;
  }
  
  .navbar-right {
    flex-direction: column;
    gap: 15px;
    width: 100%;
    align-items: center;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  
  .feature-header {
    padding: 60px 0;
  }
  
  .feature-header .feature-title {
    font-size: 28px;
  }
  
  .section-card {
    padding: 25px;
  }
  
  .section-title {
    font-size: 20px;
  }
  
  .advantages-grid,
  .effect-stats {
    grid-template-columns: 1fr;
  }
  
  .related-features-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .feature-header {
    padding: 40px 0;
  }
  
  .feature-header .feature-title {
    font-size: 24px;
  }
  
  .feature-icon-large {
    font-size: 48px;
    width: 100px;
    height: 100px;
  }
  
  .section-card {
    padding: 20px;
  }
  
  .problem-item,
  .solution-feature,
  .scenario-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .problem-number,
  .feature-check,
  .scenario-number {
    align-self: flex-start;
  }
}
</style>
