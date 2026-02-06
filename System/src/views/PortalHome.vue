<template>
  <div class="portal-container">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <img src="/src/assets/logo.svg" alt="慧学澄明教育学习平台">
          <h1>慧学澄明教育学习平台</h1>
        </div>
        <ul class="nav-menu">
          <li><a href="#home" @click="scrollToSection($event, 'home')">首页</a></li>
          <li><a href="#features" @click="scrollToSection($event, 'features')">特色功能</a></li>
          <li><a href="#courses" @click="scrollToSection($event, 'courses')">课程中心</a></li>
          <li><a href="#policy" @click="scrollToSection($event, 'policy')">乡村教育政策</a></li>
          <li><a href="#breakthrough" @click="scrollToSection($event, 'breakthrough')">破茧视界</a></li>

          <li><a href="#about" @click="scrollToSection($event, 'about')">关于我们</a></li>
          <li><a href="#contact" @click="scrollToSection($event, 'contact')">联系我们</a></li>
        </ul>
        <div class="nav-buttons">
          <router-link to="/login" class="btn btn-secondary login-btn">登录</router-link>
          <router-link to="/register" class="btn btn-primary">注册</router-link>
        </div>
      </div>
    </nav>

    <!-- 英雄区 -->
    <section id="home" class="hero-section">
      <div class="hero-container">
        <h2 class="hero-title">慧学澄明教育学习平台</h2>
        <p class="hero-subtitle">智能教育，引领未来学习新方式</p>
        <div class="hero-buttons">
          <a href="#courses" @click="scrollToSection($event, 'courses')" class="btn btn-primary">探索课程</a>
          <a href="#features" @click="scrollToSection($event, 'features')" class="btn btn-secondary">了解更多</a>
        </div>
      </div>
    </section>

    <!-- 特色功能区 -->
    <section id="features" class="features-section">
      <div class="features-container">
        <h2 class="section-title">特色功能</h2>
        <p class="section-subtitle">我们提供全方位的智能教育解决方案</p>
        <div class="features-grid">
          <router-link to="/feature/zhixue-kezhan" class="feature-card-link">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-book"></i>
              </div>
              <h3 class="feature-title">智学课栈</h3>
              <p class="feature-description">智能课程推荐，个性化学习路径，让学习更高效、更有针对性。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
          <router-link to="/feature/lingxi-xiaoxitai" class="feature-card-link">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-comments"></i>
              </div>
              <h3 class="feature-title">灵犀消息台</h3>
              <p class="feature-description">智能消息推送，精准触达，及时获取学习提醒和重要通知。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
          <router-link to="/feature/miaosi-chuangzuojian" class="feature-card-link">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-pen-fancy"></i>
              </div>
              <h3 class="feature-title">妙思创作间</h3>
              <p class="feature-description">AI辅助创意生成，激发学生想象力，培养创新思维能力。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
          <router-link to="/feature/zhiji-shoucha" class="feature-card-link">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-sticky-note"></i>
              </div>
              <h3 class="feature-title">智记手札</h3>
              <p class="feature-description">智能记录和整理学习笔记，让知识管理更高效、更有序。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
          <router-link to="/feature/zhicun-yunkongjian" class="feature-card-link">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-cloud"></i>
              </div>
              <h3 class="feature-title">智存云空间</h3>
              <p class="feature-description">AI智能管理个人学习资源，安全存储，便捷访问。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
          <router-link to="/feature/lingzhi-zhishiji" class="feature-card-link">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-lightbulb"></i>
              </div>
              <h3 class="feature-title">灵智知识集</h3>
              <p class="feature-description">AI智能提炼知识精华，帮助学生快速掌握核心内容。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
          <router-link to="/feature/zhishi-yinglianchang" class="feature-card-link">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-brush"></i>
              </div>
              <h3 class="feature-title">智适应练场</h3>
              <p class="feature-description">AI个性化练习适配，根据学生水平自动调整难度，提高学习效果。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
          <router-link to="/feature/po-jian-shijie" class="feature-card-link">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-video"></i>
              </div>
              <h3 class="feature-title">破茧视界</h3>
              <p class="feature-description">打破信息茧房，拓展多元视野，通过视频学习了解更广阔的世界。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
          <router-link to="#herorank" class="feature-card-link" @click="scrollToSection($event, 'herorank')">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <h3 class="feature-title">鸿鹄榜</h3>
              <p class="feature-description">激励学习动力，展示学习成果，鸿鹄之志，志在千里。</p>
              <div class="feature-link">
                了解详情 <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 课程展示区 -->
    <section id="courses" class="courses-section">
      <div class="courses-container">
        <h2 class="section-title">热门课程</h2>
        <p class="section-subtitle">精选优质课程，满足不同学习需求</p>
        <div class="courses-grid">
          <div class="course-card" v-for="course in courses" :key="course.id">
            <img :src="course.cover" :alt="course.title" class="course-cover">
            <div class="course-content">
              <h3 class="course-title">{{ course.title }}</h3>
              <p class="course-teacher">教师：{{ course.teacher }}</p>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-footer">
                <span class="course-progress">进度：{{ course.progress }}%</span>
                <router-link :to="'/course/' + course.id" class="btn btn-primary">查看详情</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 乡村教育政策区 -->
    <section id="policy" class="policy-section">
      <div class="policy-container">
        <h2 class="section-title">乡村教育政策</h2>
        <p class="section-subtitle">关注乡村教育发展，助力乡村振兴</p>
        <div class="policy-content">
          <div class="policy-news">
            <div class="policy-news-item" v-for="(news, index) in policyNews" :key="index">
              <div class="news-date">{{ news.date }}</div>
              <div class="news-content">
                <h3 class="news-title">{{ news.title }}</h3>
                <p class="news-description">{{ news.description }}</p>
                <router-link :to="'/policy/' + news.id" class="news-link">阅读更多 <i class="fas fa-arrow-right"></i></router-link>
              </div>
            </div>
          </div>
          <div class="policy-highlights">
            <h3 class="highlights-title">政策亮点</h3>
            <ul class="highlights-list">
              <li v-for="(highlight, index) in policyHighlights" :key="index">
                <i class="fas fa-check-circle"></i> {{ highlight }}
              </li>
            </ul>
            <div class="policy-initiative">
              <h4 class="initiative-title">乡村教育振兴计划</h4>
              <p class="initiative-description">我们积极响应国家乡村振兴战略，致力于为农村地区提供优质的教育资源和服务，通过人工智能技术，缩小城乡教育差距，促进教育公平。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 破茧视界区 -->
    <section id="breakthrough" class="breakthrough-section">
      <div class="breakthrough-container">
        <h2 class="section-title">破茧视界</h2>
        <p class="section-subtitle">打破信息茧房，拓展多元视野</p>
        <div class="video-grid">
          <div class="video-card" v-for="video in videos" :key="video.id">
            <div class="video-thumbnail" @click="playVideo(video.id)">
              <img :src="video.thumbnail" :alt="video.title">
              <div class="play-icon">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <div class="video-content">
              <h3 class="video-title">{{ video.title }}</h3>
              <p class="video-description">{{ video.description }}</p>
              <div class="video-meta">
                <span>{{ video.category }} | {{ video.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 鸿鹄榜区 -->
    <section id="herorank" class="herorank-section">
      <div class="herorank-container">
        <h2 class="section-title">鸿鹄榜</h2>
        <p class="section-subtitle">鸿鹄之志，志在千里</p>
        <div class="herorank-content">
          <!-- 排行榜标签页 -->
          <div class="herorank-tabs">
            <el-tabs v-model="activeHeroRankTab" class="herorank-tabs-container">
              <el-tab-pane label="总榜" name="total"></el-tab-pane>
              <el-tab-pane label="周榜" name="weekly"></el-tab-pane>
              <el-tab-pane label="月榜" name="monthly"></el-tab-pane>
            </el-tabs>
          </div>

          <!-- 前三名展示 -->
          <div class="herorank-top-three" v-if="heroRankTopThree.length > 0">
            <div class="herorank-item second" v-if="heroRankTopThree[1]">
              <div class="herorank-number">2</div>
              <div class="herorank-avatar">
                <img :src="heroRankTopThree[1].avatar || defaultHeroRankAvatar" :alt="heroRankTopThree[1].name">
              </div>
              <div class="herorank-info">
                <h3 class="herorank-name">{{ heroRankTopThree[1].name }}</h3>
                <p class="herorank-score">{{ heroRankTopThree[1].score }} 积分</p>
              </div>
              <div class="herorank-reward">
                <span class="reward-icon">🥈</span>
              </div>
            </div>

            <div class="herorank-item first" v-if="heroRankTopThree[0]">
              <div class="herorank-number">1</div>
              <div class="herorank-avatar">
                <img :src="heroRankTopThree[0].avatar || defaultHeroRankAvatar" :alt="heroRankTopThree[0].name">
              </div>
              <div class="herorank-info">
                <h3 class="herorank-name">{{ heroRankTopThree[0].name }}</h3>
                <p class="herorank-score">{{ heroRankTopThree[0].score }} 积分</p>
                <p class="herorank-level">等级：{{ heroRankTopThree[0].level }}</p>
              </div>
              <div class="herorank-reward">
                <span class="reward-icon">🥇</span>
              </div>
            </div>

            <div class="herorank-item third" v-if="heroRankTopThree[2]">
              <div class="herorank-number">3</div>
              <div class="herorank-avatar">
                <img :src="heroRankTopThree[2].avatar || defaultHeroRankAvatar" :alt="heroRankTopThree[2].name">
              </div>
              <div class="herorank-info">
                <h3 class="herorank-name">{{ heroRankTopThree[2].name }}</h3>
                <p class="herorank-score">{{ heroRankTopThree[2].score }} 积分</p>
              </div>
              <div class="herorank-reward">
                <span class="reward-icon">🥉</span>
              </div>
            </div>
          </div>

          <!-- 排行榜列表 -->
          <div class="herorank-list" v-if="heroRankList.length > 0">
            <div class="herorank-list-header">
              <div class="herorank-list-column rank-column">排名</div>
              <div class="herorank-list-column user-column">用户</div>
              <div class="herorank-list-column score-column">积分</div>
              <div class="herorank-list-column level-column">等级</div>
            </div>
            <div class="herorank-list-body">
              <div 
                v-for="(item, index) in heroRankList" 
                :key="item.id" 
                class="herorank-list-item"
              >
                <div class="herorank-list-column rank-column">
                  <span class="herorank-list-number">{{ index + 4 }}</span>
                </div>
                <div class="herorank-list-column user-column">
                  <div class="herorank-list-user">
                    <img :src="item.avatar || defaultHeroRankAvatar" :alt="item.name" class="herorank-list-avatar">
                    <span class="herorank-list-name">{{ item.name }}</span>
                  </div>
                </div>
                <div class="herorank-list-column score-column">
                  <span class="herorank-list-score">{{ item.score }}</span>
                </div>
                <div class="herorank-list-column level-column">
                  <span class="herorank-list-level">{{ item.level }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 查看完整榜单按钮 -->
          <div class="herorank-action">
            <router-link to="/login" class="btn btn-primary">登录查看完整榜单</router-link>
            <p class="herorank-tip">登录后查看个人排名和详细数据</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于我们区 -->
    <section id="about" class="about-section">
      <div class="about-container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="about-title">关于我们</h2>
            <p class="about-description">慧学澄明教育学习平台致力于为学生提供高质量的智能教育服务，通过人工智能技术，为每个学生量身定制个性化的学习方案，激发学习兴趣，提高学习效率。</p>
            <ul class="about-features">
              <li v-for="(feature, index) in aboutFeatures" :key="index">{{ feature }}</li>
            </ul>
          </div>
          <div class="about-image">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20education%20platform%20interface%20with%20students%20learning%20and%20technology%20elements&image_size=square" alt="慧学澄明教育学习平台">
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们区 -->
    <section id="contact" class="contact-section">
      <div class="contact-container">
        <h2 class="section-title">联系我们</h2>
        <p class="section-subtitle">如有任何问题或建议，欢迎随时联系我们</p>
        <div class="contact-content">
          <div class="contact-info">
            <h3 class="contact-title">联系方式</h3>
            <ul class="contact-details">
              <li v-for="(contact, index) in contactDetails" :key="index">
                <i :class="contact.icon"></i> {{ contact.text }}
              </li>
            </ul>
          </div>
          <div class="contact-form">
            <h3 class="contact-title">留言咨询</h3>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name" class="form-label">姓名</label>
                <input type="text" id="name" v-model="formData.name" class="form-input" placeholder="请输入您的姓名">
              </div>
              <div class="form-group">
                <label for="email" class="form-label">邮箱</label>
                <input type="email" id="email" v-model="formData.email" class="form-input" placeholder="请输入您的邮箱">
              </div>
              <div class="form-group">
                <label for="subject" class="form-label">主题</label>
                <input type="text" id="subject" v-model="formData.subject" class="form-input" placeholder="请输入留言主题">
              </div>
              <div class="form-group">
                <label for="message" class="form-label">留言内容</label>
                <textarea id="message" v-model="formData.message" class="form-textarea" placeholder="请输入您的留言内容"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">提交留言</button>
            </form>
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
              <li><a href="#home" @click="scrollToSection($event, 'home')">首页</a></li>
              <li><a href="#features" @click="scrollToSection($event, 'features')">特色功能</a></li>
              <li><a href="#courses" @click="scrollToSection($event, 'courses')">课程中心</a></li>
              <li><a href="#policy" @click="scrollToSection($event, 'policy')">乡村教育政策</a></li>
              <li><a href="#breakthrough" @click="scrollToSection($event, 'breakthrough')">破茧视界</a></li>

              <li><a href="#about" @click="scrollToSection($event, 'about')">关于我们</a></li>
              <li><a href="#contact" @click="scrollToSection($event, 'contact')">联系我们</a></li>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 鸿鹄榜相关数据
const activeHeroRankTab = ref('total')
const defaultHeroRankAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const heroRankTopThree = ref([
  {
    id: 1,
    name: '张明',
    score: 12500,
    level: '学霸',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20smiling&image_size=square'
  },
  {
    id: 2,
    name: '李华',
    score: 11200,
    level: '学神',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20smiling&image_size=square'
  },
  {
    id: 3,
    name: '王强',
    score: 9800,
    level: '学霸',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20confident&image_size=square'
  }
])

const heroRankList = ref([
  {
    id: 4,
    name: '陈静',
    score: 8500,
    level: '优秀',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20smart&image_size=square'
  },
  {
    id: 5,
    name: '刘阳',
    score: 7200,
    level: '优秀',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20friendly&image_size=square'
  },
  {
    id: 6,
    name: '赵雨',
    score: 6800,
    level: '良好',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20cheerful&image_size=square'
  },
  {
    id: 7,
    name: '孙伟',
    score: 6500,
    level: '良好',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20serious&image_size=square'
  }
])

// 滚动动画
const observeElements = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const animatedElements = document.querySelectorAll('.feature-card, .course-card, .video-card, .policy-news-item, .about-content, .contact-content')
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll')
    observer.observe(el)
  })
}

onMounted(() => {
  observeElements()
  
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar')
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)'
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)'
    } else {
      navbar.style.backgroundColor = '#fff'
      navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)'
    }
  })
})

// 课程数据
const courses = ref([
  {
    id: 1,
    title: '趣味语文：童话阅读与写作',
    teacher: '李老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20children%20chinese%20language%20course%20cover%20with%20fairy%20tales%20and%20books%20for%20elementary%20students&image_size=square',
    description: '通过阅读经典童话故事，激发学生想象力和创造力，学习写作技巧。',
    progress: 60
  },
  {
    id: 2,
    title: '数学王国大冒险',
    teacher: '王老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fun%20math%20adventure%20course%20cover%20with%20numbers%20and%20games%20for%20children&image_size=square',
    description: '通过游戏和互动的方式，让学生感受数学的趣味性和实用性。',
    progress: 45
  },
  {
    id: 3,
    title: '科学实验室：自然奥秘',
    teacher: '张老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20laboratory%20course%20cover%20with%20nature%20elements%20and%20experiments%20for%20kids&image_size=square',
    description: '通过有趣的科学实验，激发学生好奇心和探索精神，了解自然奥秘。',
    progress: 75
  },
  {
    id: 4,
    title: '英语趣味启蒙',
    teacher: '刘老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20language%20learning%20course%20cover%20with%20fun%20elements%20for%20children&image_size=square',
    description: '通过游戏和互动的方式，让学生轻松学习英语，培养英语学习兴趣。',
    progress: 50
  },
  {
    id: 5,
    title: '艺术创想：绘画与手工',
    teacher: '陈老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=art%20and%20crafts%20course%20cover%20with%20colorful%20drawing%20and%20handmade%20projects%20for%20children&image_size=square',
    description: '通过绘画和手工制作，激发学生创造力和艺术潜能。',
    progress: 65
  },
  {
    id: 6,
    title: '趣味编程：Scratch入门',
    teacher: '赵老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=computer%20programming%20course%20cover%20with%20coding%20and%20technology%20elements%20for%20children&image_size=square',
    description: '通过Scratch可视化编程，培养学生逻辑思维和解决问题的能力。',
    progress: 40
  }
])

// 视频数据
const videos = ref([
  {
    id: 1,
    title: '探索宇宙的奥秘',
    description: '带你了解太阳系的行星和宇宙的起源，感受宇宙的浩瀚与神秘。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20exploration%20video%20thumbnail%20with%20planets%20and%20galaxies&image_size=landscape_16_9',
    category: '科学探索',
    duration: '15:30'
  },
  {
    id: 2,
    title: '世界各地的文化',
    description: '了解不同国家和地区的文化传统，拓展国际视野，培养文化素养。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=world%20cultures%20video%20thumbnail%20with%20different%20cultural%20elements&image_size=landscape_16_9',
    category: '人文历史',
    duration: '20:15'
  },
  {
    id: 3,
    title: '大自然的奇妙现象',
    description: '探索自然界中的神奇现象和生物，了解自然规律，培养环保意识。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nature%20wonders%20video%20thumbnail%20with%20beautiful%20natural%20phenomena&image_size=landscape_16_9',
    category: '自然科学',
    duration: '12:45'
  },
  {
    id: 4,
    title: '艺术欣赏：世界名画之旅',
    description: '走进艺术的殿堂，欣赏世界名画，了解艺术史，培养审美能力。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=art%20appreciation%20video%20thumbnail%20with%20famous%20paintings%20and%20artworks&image_size=landscape_16_9',
    category: '艺术欣赏',
    duration: '18:20'
  },
  {
    id: 5,
    title: '科技创新：未来世界展望',
    description: '了解最新的科技发展和创新成果，展望未来世界的可能性。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20innovation%20video%20thumbnail%20with%20future%20technology%20and%20inventions&image_size=landscape_16_9',
    category: '科技创新',
    duration: '16:50'
  },
  {
    id: 6,
    title: '健康生活：营养与运动',
    description: '学习健康饮食和科学运动的知识，培养良好的生活习惯。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20and%20wellness%20video%20thumbnail%20with%20fitness%20and%20nutrition%20elements&image_size=landscape_16_9',
    category: '健康生活',
    duration: '14:30'
  }
])

// 关于我们特色
const aboutFeatures = ref([
  '智能课程推荐，个性化学习路径',
  'AI辅助创意生成，激发学生想象力',
  '智能记录和整理学习笔记',
  'AI个性化练习适配，提高学习效果',
  '打破信息茧房，拓展多元视野',
  '专业教师团队，优质课程内容'
])

// 联系方式
const contactDetails = ref([
  { icon: 'fas fa-map-marker-alt', text: '地址：广东省清远市广东建设职业技术学院' },
  { icon: 'fas fa-phone', text: '电话：19075706783' },
  { icon: 'fas fa-envelope', text: '邮箱：13138399389@163.com' },
  { icon: 'fas fa-clock', text: '工作时间：周一至周五 9:00-18:00' }
])

// 乡村教育政策新闻
const policyNews = ref([
  {
    id: '1',
    date: '2025-06-18',
    title: '中共中央 国务院关于进一步深化农村改革 扎实推进乡村全面振兴的意见',
    description: '实现中国式现代化，必须加快推进乡村全面振兴。当前，农业再获丰收，农村和谐稳定，同时国际环境复杂严峻，我国发展面临的不确定难预料因素增多。越是应对风险挑战，越要夯实"三农"工作基础。'
  },
  {
    id: '2',
    date: '2023-02-18',
    title: '中共中央 国务院关于做好2023年全面推进乡村振兴重点工作的意见',
    description: '2023年中央一号文件公布、支持定点零售药店开通门诊统筹服务……本周民生大事都是你关心的！'
  },
  {
    id: '3',
    date: '2023-02-06',
    title: '国家乡村振兴局关于落实党中央国务院 2023年全面推进乡村振兴重点工作部署的实施意见',
    description: '2023年是全面贯彻落实党的二十大精神的开局之年，做好乡村振兴工作意义重大。'
  },
  {
    id: '4',
    date: '2022-05-06',
    title: '教育部发布《义务教育劳动课程标准（2022年版）》',
    description: '近日，教育部正式印发《义务教育课程方案》，将劳动从原来的综合实践活动课程中完全独立出来，并发布《义务教育劳动课程标准（2022年版）》。'
  },
  {
    id: '5',
    date: '2022-02-22',
    title: '中共中央 国务院关于做好2022年全面推进乡村振兴重点工作的意见',
    description: '当前，全球新冠肺炎疫情仍在蔓延，世界经济复苏脆弱，气候变化挑战突出，我国经济社会发展各项任务极为繁重艰巨。'
  }
])

// 政策亮点
const policyHighlights = ref([
  '加大乡村教育投入，改善办学条件',
  '加强乡村教师队伍建设，提高教师待遇',
  '推动优质教育资源向乡村辐射',
  '发展乡村特色教育，传承乡土文化',
  '利用信息技术，促进城乡教育均衡发展',
  '建立健全乡村教育资助体系',
  '鼓励社会力量参与乡村教育振兴'
])

// 表单数据
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// 滚动到指定 section
const scrollToSection = (event, sectionId) => {
  // 阻止默认行为，防止页面跳转
  if (event) {
    event.preventDefault()
  }
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 播放视频
const playVideo = (videoId) => {
  router.push(`/video/${videoId}`)
}

// 提交表单
const submitForm = () => {
  // 表单验证
  if (!formData.value.name || !formData.value.email || !formData.value.subject || !formData.value.message) {
    ElMessage.warning('请填写所有必填字段')
    return
  }
  // 提交逻辑
  ElMessage.success('留言提交成功！我们会尽快与您联系。')
  // 重置表单
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}

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
.portal-container {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8f3ff 100%);
  position: relative;
  overflow-x: hidden;
}

.portal-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(64, 158, 255, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(105, 192, 255, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(64, 158, 255, 0.02) 0%, transparent 30%);
  pointer-events: none;
  z-index: 0;
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

/* 英雄区 */
.hero-section {
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 50%, #409eff 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
  color: #fff;
  padding: 120px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px, 100px 100px;
  animation: float 20s linear infinite;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, #f5f7fa, transparent);
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-50px) rotate(360deg);
  }
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 24px;
  margin-bottom: 40px;
  opacity: 0.95;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  animation: fadeInUp 1s ease-out 0.6s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 特色功能区 */
.features-section {
  padding: 100px 0;
  background-color: #fff;
  position: relative;
}

.features-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.section-title {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #303133;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 2px;
}

.section-subtitle {
  text-align: center;
  font-size: 18px;
  color: #606266;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.feature-card {
  background: linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(64, 158, 255, 0.15);
  border-color: rgba(64, 158, 255, 0.2);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff, #69c0ff);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  font-size: 32px;
  color: #fff;
  transition: all 0.4s ease;
  box-shadow: 0 8px 16px rgba(64, 158, 255, 0.3);
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 12px 24px rgba(64, 158, 255, 0.4);
}

.feature-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
}

.feature-description {
  font-size: 16px;
  color: #606266;
  line-height: 1.6;
  text-decoration: none;
}

.feature-link {
  font-size: 14px;
  color: #409eff;
  margin-top: 15px;
  display: inline-block;
  text-decoration: none;
  transition: color 0.3s;
}

.feature-link:hover {
  color: #66b1ff;
}

.feature-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.feature-card-link:hover {
  text-decoration: none;
}

/* 课程展示区 */
.courses-section {
  padding: 100px 0;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8f3ff 100%);
  position: relative;
}

.courses-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
}

.courses-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.course-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  position: relative;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(64, 158, 255, 0.15);
  border-color: rgba(64, 158, 255, 0.2);
}

.course-card:hover::before {
  transform: scaleX(1);
}

.course-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.course-card:hover .course-cover {
  transform: scale(1.05);
}

.course-content {
  padding: 24px;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.course-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
  transition: color 0.3s ease;
}

.course-card:hover .course-title {
  color: #409eff;
}

.course-teacher {
  font-size: 14px;
  color: #909399;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.course-teacher::before {
  content: '👨‍🏫';
  margin-right: 6px;
}

.course-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 20px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #e4e7ed;
}

.course-progress {
  font-size: 14px;
  color: #606266;
  display: flex;
  align-items: center;
}

.course-progress::before {
  content: '📊';
  margin-right: 6px;
}

/* 破茧视界区 */
.breakthrough-section {
  padding: 100px 0;
  background-color: #fff;
  position: relative;
}

.breakthrough-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
}

.breakthrough-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.video-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  position: relative;
}

.video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.video-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(64, 158, 255, 0.15);
  border-color: rgba(64, 158, 255, 0.2);
}

.video-card:hover::before {
  transform: scaleX(1);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #e4e7ed;
  cursor: pointer;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.video-card:hover .video-thumbnail img {
  transform: scale(1.1);
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.9), rgba(105, 192, 255, 0.9));
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.4);
}

.video-card:hover .play-icon {
  transform: translate(-50%, -50%) scale(1.15);
  box-shadow: 0 12px 30px rgba(64, 158, 255, 0.5);
}

.video-content {
  padding: 24px;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.video-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
  transition: color 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-card:hover .video-title {
  color: #409eff;
}

.video-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  font-size: 14px;
  color: #909399;
  display: flex;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

.video-meta::before {
  content: '🎬';
  margin-right: 6px;
}

/* 关于我们区 */
.about-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 50%, #409eff 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px, 100px 100px;
  animation: float 20s linear infinite;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.about-content {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}

.about-text {
  flex: 1;
  min-width: 300px;
}

.about-title {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 35px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.about-description {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 35px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.about-features {
  list-style: none;
}

.about-features li {
  margin-bottom: 18px;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.about-features li:hover {
  transform: translateX(10px);
}

.about-features li:before {
  content: "✓";
  margin-right: 12px;
  font-weight: bold;
  font-size: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.about-image {
  flex: 1;
  min-width: 300px;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.about-image:hover img {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
}

/* 乡村教育政策区 */
.policy-section {
  padding: 100px 0;
  background: linear-gradient(180deg, #e8f3ff 0%, #f5f7fa 100%);
  position: relative;
}

.policy-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
}

.policy-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.policy-content {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}

.policy-news {
  flex: 2;
  min-width: 300px;
}

.policy-news-item {
  display: flex;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 35px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.policy-news-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.policy-news-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(64, 158, 255, 0.15);
  border-color: rgba(64, 158, 255, 0.2);
}

.policy-news-item:hover::before {
  transform: scaleX(1);
}

.news-date {
  flex: 0 0 120px;
  font-size: 14px;
  color: #909399;
  text-align: center;
  padding-right: 25px;
  border-right: 2px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.news-date::before {
  content: '📅';
  font-size: 24px;
  margin-bottom: 5px;
}

.news-content {
  flex: 1;
  padding-left: 25px;
}

.news-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}

.news-description {
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
  line-height: 1.5;
}

.news-link {
  font-size: 14px;
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
}

.news-link:hover {
  color: #66b1ff;
}

.policy-highlights {
  flex: 1;
  min-width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.highlights-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #303133;
}

.highlights-list {
  list-style: none;
  margin-bottom: 30px;
}

.highlights-list li {
  margin-bottom: 15px;
  font-size: 14px;
  color: #606266;
  display: flex;
  align-items: flex-start;
}

.highlights-list li i {
  margin-right: 10px;
  color: #67c23a;
  font-size: 16px;
  margin-top: 2px;
}

.policy-initiative {
  border-top: 1px solid #e4e7ed;
  padding-top: 20px;
}

.initiative-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}

.initiative-description {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

/* 联系我们区 */
.contact-section {
  padding: 100px 0;
  background-color: #f5f7fa;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
}

.contact-info {
  flex: 1;
  min-width: 300px;
}

.contact-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #303133;
}

.contact-details {
  list-style: none;
}

.contact-details li {
  margin-bottom: 20px;
  font-size: 16px;
  color: #606266;
  display: flex;
  align-items: center;
}

.contact-details li i {
  margin-right: 15px;
  font-size: 20px;
  color: #409eff;
}

.contact-form {
  flex: 1;
  min-width: 300px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 45px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contact-form:hover {
  box-shadow: 0 15px 40px rgba(64, 158, 255, 0.15);
  border-color: rgba(64, 158, 255, 0.2);
}

.contact-form:hover::before {
  transform: scaleX(1);
}

.form-group {
  margin-bottom: 25px;
  position: relative;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #303133;
  transition: color 0.3s ease;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #fff;
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.form-input::placeholder {
  color: #c0c4cc;
  transition: color 0.3s ease;
}

.form-input:focus::placeholder {
  color: #909399;
}

.form-textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 130px;
  transition: all 0.3s ease;
  background-color: #fff;
  font-family: inherit;
}

.form-textarea:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.form-textarea::placeholder {
  color: #c0c4cc;
  transition: color 0.3s ease;
}

.form-textarea:focus::placeholder {
  color: #909399;
}

/* 页脚 */
.footer {
  background: linear-gradient(135deg, #303133 0%, #2a2b2d 100%);
  color: #fff;
  padding: 80px 0 30px;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff, #409eff);
  background-size: 200% 100%;
  animation: gradientShift 10s ease infinite;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 50px;
}

.footer-column h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 12px;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 2px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}

.footer-links li:hover {
  transform: translateX(5px);
}

.footer-links a {
  text-decoration: none;
  color: #909399;
  font-size: 14px;
  transition: color 0.3s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: #409eff;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  color: #909399;
  position: relative;
}

/* 自定义按钮样式 */
.btn {
  display: inline-block;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary {
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #66b1ff 0%, #409eff 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.4);
}

.btn-secondary {
  background-color: #fff;
  color: #409eff;
  border: 2px solid #409eff;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.2);
}

.btn-secondary:hover {
  background-color: #f0f9ff;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .courses-grid {
    grid-template-columns: 1fr;
  }

  .video-grid {
    grid-template-columns: 1fr;
  }

  .about-content {
    flex-direction: column;
  }

  .contact-content {
    flex-direction: column;
  }
}

/* 滚动动画 */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-card.animate-on-scroll {
  transition-delay: 0.1s;
}

.course-card.animate-on-scroll {
  transition-delay: 0.2s;
}

.video-card.animate-on-scroll {
  transition-delay: 0.3s;
}

.policy-news-item.animate-on-scroll {
  transition-delay: 0.1s;
}

/* 为网格中的元素添加交错动画 */
.features-grid .feature-card:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.features-grid .feature-card:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.features-grid .feature-card:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.features-grid .feature-card:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }
.features-grid .feature-card:nth-child(5).animate-on-scroll { transition-delay: 0.5s; }
.features-grid .feature-card:nth-child(6).animate-on-scroll { transition-delay: 0.6s; }
.features-grid .feature-card:nth-child(7).animate-on-scroll { transition-delay: 0.7s; }
.features-grid .feature-card:nth-child(8).animate-on-scroll { transition-delay: 0.8s; }

.courses-grid .course-card:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.courses-grid .course-card:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.courses-grid .course-card:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.courses-grid .course-card:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }
.courses-grid .course-card:nth-child(5).animate-on-scroll { transition-delay: 0.5s; }
.courses-grid .course-card:nth-child(6).animate-on-scroll { transition-delay: 0.6s; }

.video-grid .video-card:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.video-grid .video-card:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.video-grid .video-card:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.video-grid .video-card:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }
.video-grid .video-card:nth-child(5).animate-on-scroll { transition-delay: 0.5s; }
.video-grid .video-card:nth-child(6).animate-on-scroll { transition-delay: 0.6s; }

/* 鸿鹄榜区 */
.herorank-section {
  padding: 100px 0;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8f3ff 100%);
  position: relative;
}

.herorank-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
}

.herorank-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.herorank-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid transparent;
}

.herorank-tabs {
  margin-bottom: 40px;
}

.herorank-tabs-container {
  background: rgba(64, 158, 255, 0.05);
  border-radius: 8px;
  padding: 5px;
}

.herorank-tabs-container .el-tabs__nav {
  border-bottom: none;
}

.herorank-tabs-container .el-tabs__active-bar {
  background-color: #409eff;
}

.herorank-tabs-container .el-tab-pane {
  padding: 0;
}

.herorank-tabs-container .el-tabs__item {
  color: #606266;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 6px;
  margin: 0 5px;
  transition: all 0.3s ease;
}

.herorank-tabs-container .el-tabs__item:hover {
  color: #409eff;
  background: rgba(64, 158, 255, 0.1);
}

.herorank-tabs-container .el-tabs__item.is-active {
  color: #fff;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  font-weight: 600;
}

/* 前三名展示 */
.herorank-top-three {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.herorank-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.4s ease;
  min-width: 180px;
}

.herorank-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.2);
}

.herorank-item.first {
  order: 2;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
  border: 2px solid #ffc107;
  transform: scale(1.1);
}

.herorank-item.second {
  order: 1;
  background: linear-gradient(135deg, #e2e3e5 0%, #d6d8db 100%);
  border: 2px solid #6c757d;
}

.herorank-item.third {
  order: 3;
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border: 2px solid #dc3545;
}

.herorank-number {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 15px;
  opacity: 0.2;
}

.herorank-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  border: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.herorank-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.herorank-info {
  text-align: center;
  margin-bottom: 15px;
}

.herorank-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #303133;
}

.herorank-score {
  font-size: 16px;
  color: #606266;
  margin: 0 0 5px 0;
}

.herorank-level {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.herorank-reward {
  font-size: 32px;
}

/* 排行榜列表 */
.herorank-list {
  margin-bottom: 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.herorank-list-header {
  display: flex;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  padding: 15px 20px;
  font-weight: bold;
  color: #fff;
  font-size: 14px;
}

.herorank-list-column {
  display: flex;
  align-items: center;
}

.herorank-list .rank-column {
  width: 100px;
}

.herorank-list .user-column {
  flex: 2;
  min-width: 200px;
}

.herorank-list .score-column {
  width: 120px;
}

.herorank-list .level-column {
  width: 100px;
}

.herorank-list-body {
  padding: 0 20px;
}

.herorank-list-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e4e7ed;
  transition: all 0.3s ease;
}

.herorank-list-item:hover {
  background-color: rgba(64, 158, 255, 0.05);
}

.herorank-list-number {
  font-size: 16px;
  font-weight: bold;
  color: #606266;
}

.herorank-list-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.herorank-list-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.herorank-list-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.herorank-list-name {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.herorank-list-score {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.herorank-list-level {
  font-size: 14px;
  color: #909399;
}

/* 操作按钮 */
.herorank-action {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  border-radius: 12px;
  border: 1px solid #bae6fd;
}

.herorank-action .btn {
  font-size: 16px;
  padding: 12px 30px;
  margin-bottom: 15px;
}

.herorank-tip {
  font-size: 14px;
  color: #606266;
  margin: 0;
}

/* 鸿鹄榜动画 */
.herorank-item.animate-on-scroll {
  transition-delay: 0.2s;
}

.herorank-list-item.animate-on-scroll {
  transition-delay: 0.1s;
}

</style>