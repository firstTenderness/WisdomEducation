<template>
  <div class="portal-container">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <img src="/src/assets/logo.svg" alt="慧学澄明教育学习平台" loading="lazy">
          <h1>慧学澄明教育学习平台</h1>
        </div>
        <!-- 桌面端菜单 -->
        <ul class="nav-menu">
          <li><a href="#home" @click="scrollToSection($event, 'home')" class="nav-link">首页</a></li>
          <li><a href="#features" @click="scrollToSection($event, 'features')" class="nav-link">特色功能</a></li>
          <li><a href="#courses" @click="scrollToSection($event, 'courses')" class="nav-link">课程中心</a></li>
          <li><a href="#policy" @click="scrollToSection($event, 'policy')" class="nav-link">乡村教育政策</a></li>
          <li><a href="#breakthrough" @click="scrollToSection($event, 'breakthrough')" class="nav-link">破茧视界</a></li>
          <li><a href="#about" @click="scrollToSection($event, 'about')" class="nav-link">关于我们</a></li>
          <li><a href="#contact" @click="scrollToSection($event, 'contact')" class="nav-link">联系我们</a></li>
        </ul>
        <!-- 桌面端按钮 -->
        <div class="nav-buttons">
          <router-link to="/login" class="btn btn-primary login-btn">登录</router-link>
          <router-link to="/register" class="btn btn-primary">注册</router-link>
        </div>
        <!-- 移动端菜单按钮 -->
        <div class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="切换菜单">
          <div class="menu-icon" :class="{ active: mobileMenuOpen }"></div>
        </div>
      </div>
      <!-- 移动端菜单 -->
      <div class="mobile-menu" :class="{ active: mobileMenuOpen }" aria-hidden="!mobileMenuOpen">
        <ul class="mobile-nav-menu">
          <li><a href="#home" @click="scrollToSection($event, 'home'); toggleMobileMenu()" class="mobile-nav-link">首页</a></li>
          <li><a href="#features" @click="scrollToSection($event, 'features'); toggleMobileMenu()" class="mobile-nav-link">特色功能</a></li>
          <li><a href="#courses" @click="scrollToSection($event, 'courses'); toggleMobileMenu()" class="mobile-nav-link">课程中心</a></li>
          <li><a href="#policy" @click="scrollToSection($event, 'policy'); toggleMobileMenu()" class="mobile-nav-link">乡村教育政策</a></li>
          <li><a href="#breakthrough" @click="scrollToSection($event, 'breakthrough'); toggleMobileMenu()" class="mobile-nav-link">破茧视界</a></li>
          <li><a href="#about" @click="scrollToSection($event, 'about'); toggleMobileMenu()" class="mobile-nav-link">关于我们</a></li>
          <li><a href="#contact" @click="scrollToSection($event, 'contact'); toggleMobileMenu()" class="mobile-nav-link">联系我们</a></li>
          <li><router-link to="/login" @click="toggleMobileMenu()" class="mobile-nav-link">登录</router-link></li>
          <li><router-link to="/register" @click="toggleMobileMenu()" class="mobile-nav-link">注册</router-link></li>
        </ul>
      </div>
    </nav>

    <!-- 英雄区 -->
    <section id="home" class="hero-section">
      <!-- 装饰元素 -->
      <div class="decor-element"></div>
      <div class="decor-element"></div>
      <div class="decor-element"></div>
      
      <div class="hero-container">
        <h2 class="hero-title">慧学澄明教育学习平台</h2>
        <p class="hero-subtitle">智能教育，引领未来学习新方式</p>
        <div class="hero-buttons">
          <a href="#courses" @click="scrollToSection($event, 'courses')" class="btn btn-primary">探索课程</a>
          <a href="#features" @click="scrollToSection($event, 'features')" class="btn btn-primary">了解更多</a>
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
            <div class="course-cover-container">
              <img :src="course.cover" :alt="course.title" class="course-cover" loading="lazy">
            </div>
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
        <!-- 标签选择器 -->
        <div class="video-tags-filter">
          <span 
            class="filter-tag" 
            :class="{ active: !activeTag }" 
            @click="activeTag = ''"
          >
            全部
          </span>
          <span 
            class="filter-tag" 
            v-for="tag in uniqueTags" 
            :key="tag"
            :class="{ active: activeTag === tag }"
            @click="activeTag = tag"
          >
            {{ tag }}
          </span>
        </div>
        <div class="video-grid">
          <div class="video-card" v-for="video in filteredVideos" :key="video.id">
            <div class="video-thumbnail" @click="playVideo(video.id)">
              <img :src="video.thumbnail" :alt="video.title" loading="lazy">
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
              <el-tab-pane label="数学榜" name="math"></el-tab-pane>
              <el-tab-pane label="语文榜" name="chinese"></el-tab-pane>
              <el-tab-pane label="英语榜" name="english"></el-tab-pane>
              <el-tab-pane label="物理榜" name="physics"></el-tab-pane>
            </el-tabs>
          </div>

          <!-- 前三名展示 -->
          <div class="herorank-top-three" v-if="heroRankTopThree.length > 0">
            <div class="herorank-item second" v-if="heroRankTopThree[1]">
              <div class="herorank-number">2</div>
              <div class="herorank-avatar">
                <img :src="heroRankTopThree[1].avatar || defaultHeroRankAvatar" :alt="heroRankTopThree[1].name" loading="lazy">
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
                <img :src="heroRankTopThree[0].avatar || defaultHeroRankAvatar" :alt="heroRankTopThree[0].name" loading="lazy">
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
                <img :src="heroRankTopThree[2].avatar || defaultHeroRankAvatar" :alt="heroRankTopThree[2].name" loading="lazy">
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
                    <img :src="item.avatar || defaultHeroRankAvatar" :alt="item.name" class="herorank-list-avatar" loading="lazy">
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
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20education%20platform%20interface%20with%20students%20learning%20and%20technology%20elements%20professional%20high%20quality&image_size=square" alt="慧学澄明教育学习平台" loading="lazy">
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

    <!-- 右下角功能按钮 -->
    <div class="floating-action-button">
      <el-dropdown trigger="click" placement="top" @command="handleFloatingAction">
        <div class="fab-button">
          <i class="el-icon-plus"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="backToTop">
              <i class="el-icon-top"></i> 返回顶部
            </el-dropdown-item>
            <el-dropdown-item command="quickAccess">
              <i class="el-icon-s-home"></i> 快速导航
            </el-dropdown-item>
            <el-dropdown-item command="contactSupport">
              <i class="el-icon-phone"></i> 联系支持
            </el-dropdown-item>
            <el-dropdown-item command="feedback">
              <i class="el-icon-message"></i> 反馈建议
            </el-dropdown-item>
            <el-dropdown-item command="darkMode">
              <i class="el-icon-moon"></i> 深色模式
            </el-dropdown-item>
            <el-dropdown-item command="fontSize">
              <i class="el-icon-s-operation"></i> 字体大小
            </el-dropdown-item>
            <el-dropdown-item command="help">
              <i class="el-icon-question"></i> 帮助中心
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

// 标签过滤
const activeTag = ref(route.query.tag || '')

// 鸿鹄榜相关数据
const activeHeroRankTab = ref('math')
const defaultHeroRankAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

// 数学榜数据
const mathRankData = {
  topThree: [
    {
      id: 1,
      name: '张明',
      score: 15000,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20math%20genius&image_size=square'
    },
    {
      id: 2,
      name: '李华',
      score: 13500,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20math%20expert&image_size=square'
    },
    {
      id: 3,
      name: '王芳',
      score: 12000,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20calculus%20expert&image_size=square'
    }
  ],
  rankList: [
    {
      id: 4,
      name: '赵强',
      score: 10500,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20statistics%20expert&image_size=square'
    },
    {
      id: 5,
      name: '陈静',
      score: 9800,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20number%20theory%20expert&image_size=square'
    },
    {
      id: 6,
      name: '刘阳',
      score: 9200,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20probability%20expert&image_size=square'
    },
    {
      id: 7,
      name: '孙伟',
      score: 8500,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20geometry%20enthusiast&image_size=square'
    }
  ]
}

// 语文榜数据
const chineseRankData = {
  topThree: [
    {
      id: 11,
      name: '周丽',
      score: 14000,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20chinese%20literature%20expert&image_size=square'
    },
    {
      id: 12,
      name: '吴俊',
      score: 12500,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20literature%20master&image_size=square'
    },
    {
      id: 13,
      name: '郑敏',
      score: 11000,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20writing%20expert&image_size=square'
    }
  ],
  rankList: [
    {
      id: 14,
      name: '黄刚',
      score: 9800,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20poetry%20expert&image_size=square'
    },
    {
      id: 15,
      name: '林玉',
      score: 9200,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20reading%20comprehension%20expert&image_size=square'
    },
    {
      id: 16,
      name: '马涛',
      score: 8500,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20grammar%20expert&image_size=square'
    },
    {
      id: 17,
      name: '朱婷',
      score: 7800,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20literature%20enthusiast&image_size=square'
    }
  ]
}

// 英语榜数据
const englishRankData = {
  topThree: [
    {
      id: 21,
      name: '沈洋',
      score: 13500,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20expert&image_size=square'
    },
    {
      id: 22,
      name: '杨雪',
      score: 12000,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20speaking%20expert&image_size=square'
    },
    {
      id: 23,
      name: '邱明',
      score: 10500,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20writing%20expert&image_size=square'
    }
  ],
  rankList: [
    {
      id: 24,
      name: '罗丽',
      score: 9800,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20listening%20expert&image_size=square'
    },
    {
      id: 25,
      name: '宋强',
      score: 9200,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20reading%20expert&image_size=square'
    },
    {
      id: 26,
      name: '韩梅',
      score: 8500,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20english%20grammar%20expert&image_size=square'
    },
    {
      id: 27,
      name: '王磊',
      score: 7800,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20english%20vocabulary%20expert&image_size=square'
    }
  ]
}

// 物理榜数据
const physicsRankData = {
  topThree: [
    {
      id: 31,
      name: '张伟',
      score: 14500,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20physics%20expert&image_size=square'
    },
    {
      id: 32,
      name: '李娜',
      score: 13000,
      level: '学神',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20mechanics%20expert&image_size=square'
    },
    {
      id: 33,
      name: '王浩',
      score: 11500,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20electromagnetism%20expert&image_size=square'
    }
  ],
  rankList: [
    {
      id: 34,
      name: '陈静',
      score: 10000,
      level: '学霸',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20optics%20expert&image_size=square'
    },
    {
      id: 35,
      name: '刘阳',
      score: 9400,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20thermodynamics%20expert&image_size=square'
    },
    {
      id: 36,
      name: '孙伟',
      score: 8800,
      level: '优秀',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20female%20student%20avatar%20portrait%20quantum%20physics%20enthusiast&image_size=square'
    },
    {
      id: 37,
      name: '周丽',
      score: 8200,
      level: '良好',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=asian%20male%20student%20avatar%20portrait%20mechanics%20enthusiast&image_size=square'
    }
  ]
}

// 计算属性：根据当前标签页返回对应的前三名数据
const heroRankTopThree = computed(() => {
  switch (activeHeroRankTab.value) {
    case 'math':
      return mathRankData.topThree
    case 'chinese':
      return chineseRankData.topThree
    case 'english':
      return englishRankData.topThree
    case 'physics':
      return physicsRankData.topThree
    default:
      return mathRankData.topThree
  }
})

// 计算属性：根据当前标签页返回对应的排行榜列表数据
const heroRankList = computed(() => {
  switch (activeHeroRankTab.value) {
    case 'math':
      return mathRankData.rankList
    case 'chinese':
      return chineseRankData.rankList
    case 'english':
      return englishRankData.rankList
    case 'physics':
      return physicsRankData.rankList
    default:
      return mathRankData.rankList
  }
})

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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20children%20chinese%20language%20course%20cover%20with%20fairy%20tales%20and%20books%20for%20elementary%20students%20professional%20design&image_size=square',
    description: '通过阅读经典童话故事，激发学生想象力和创造力，学习写作技巧。',
    progress: 60
  },
  {
    id: 2,
    title: '数学王国大冒险',
    teacher: '王老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fun%20math%20adventure%20course%20cover%20with%20numbers%20and%20games%20for%20children%20professional%20design&image_size=square',
    description: '通过游戏和互动的方式，让学生感受数学的趣味性和实用性。',
    progress: 45
  },
  {
    id: 3,
    title: '科学实验室：自然奥秘',
    teacher: '张老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20laboratory%20course%20cover%20with%20nature%20elements%20and%20experiments%20for%20kids%20professional%20design&image_size=square',
    description: '通过有趣的科学实验，激发学生好奇心和探索精神，了解自然奥秘。',
    progress: 75
  },
  {
    id: 4,
    title: '英语趣味启蒙',
    teacher: '刘老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20language%20learning%20course%20cover%20with%20fun%20elements%20for%20children%20professional%20design&image_size=square',
    description: '通过游戏和互动的方式，让学生轻松学习英语，培养英语学习兴趣。',
    progress: 50
  },
  {
    id: 5,
    title: '艺术创想：绘画与手工',
    teacher: '陈老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=art%20and%20crafts%20course%20cover%20with%20colorful%20drawing%20and%20handmade%20projects%20for%20children%20professional%20design&image_size=square',
    description: '通过绘画和手工制作，激发学生创造力和艺术潜能。',
    progress: 65
  },
  {
    id: 6,
    title: '趣味编程：Scratch入门',
    teacher: '赵老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=computer%20programming%20course%20cover%20with%20coding%20and%20technology%20elements%20for%20children%20professional%20design&image_size=square',
    description: '通过Scratch可视化编程，培养学生逻辑思维和解决问题的能力。',
    progress: 40
  }
])

// 过滤后的视频
const filteredVideos = computed(() => {
  if (!activeTag.value) {
    return videos.value
  }
  return videos.value.filter(video => {
    // 这里假设视频数据中有tags属性，如果没有，我们可以根据category进行过滤
    if (video.tags) {
      return video.tags.includes(activeTag.value)
    }
    // 如果没有tags属性，根据category进行过滤
    return video.category === activeTag.value
  })
})

// 所有唯一标签
const uniqueTags = computed(() => {
  const tagsSet = new Set()
  videos.value.forEach(video => {
    if (video.tags) {
      video.tags.forEach(tag => tagsSet.add(tag))
    }
  })
  return Array.from(tagsSet)
})

// 视频数据
const videos = ref([
  {
    id: 7,
    title: '探索太阳系的行星',
    description: '深入了解太阳系八大行星的特点和奥秘，探索宇宙的神奇。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=solar%20system%20planets%20exploration%20video%20thumbnail%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '科学探索',
    duration: '18:45',
    tags: ['宇宙', '天文', '科学', '探索']
  },
  {
    id: 8,
    title: '中国古代文明的发展',
    description: '回顾中国古代文明的发展历程，了解中华文化的博大精深。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20chinese%20civilization%20history%20video%20thumbnail%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '人文历史',
    duration: '22:30',
    tags: ['历史', '文化', '中国', '文明']
  },
  {
    id: 9,
    title: '海洋生物的多样性',
    description: '探索海洋世界的生物多样性，了解海洋生态系统的重要性。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ocean%20marine%20life%20biodiversity%20video%20thumbnail%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '自然科学',
    duration: '14:20',
    tags: ['海洋', '生物', '自然', '环保']
  },
  {
    id: 10,
    title: '古典音乐欣赏',
    description: '走进古典音乐的世界，欣赏大师作品，提升音乐素养。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=classical%20music%20appreciation%20video%20thumbnail%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '艺术欣赏',
    duration: '25:15',
    tags: ['音乐', '艺术', '古典', '欣赏']
  },
  {
    id: 11,
    title: '人工智能的发展与应用',
    description: '了解人工智能的发展历程和在各个领域的应用。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=artificial%20intelligence%20technology%20video%20thumbnail%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '科技创新',
    duration: '20:40',
    tags: ['科技', '人工智能', '创新', '未来']
  },
  {
    id: 12,
    title: '健康饮食与营养搭配',
    description: '学习健康饮食知识，了解合理的营养搭配方法。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20diet%20nutrition%20video%20thumbnail%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '健康生活',
    duration: '16:30',
    tags: ['健康', '饮食', '营养', '生活']
  },
  {
    id: 1,
    title: '探索宇宙的奥秘',
    description: '带你了解太阳系的行星和宇宙的起源，感受宇宙的浩瀚与神秘。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20exploration%20video%20thumbnail%20with%20planets%20and%20galaxies%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '科学探索',
    duration: '15:30',
    tags: ['宇宙', '天文', '科学', '探索']
  },
  {
    id: 2,
    title: '世界各地的文化',
    description: '了解不同国家和地区的文化传统，拓展国际视野，培养文化素养。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=world%20cultures%20video%20thumbnail%20with%20different%20cultural%20elements%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '人文历史',
    duration: '20:15',
    tags: ['文化', '历史', '国际', '人文']
  },
  {
    id: 3,
    title: '大自然的奇妙现象',
    description: '探索自然界中的神奇现象和生物，了解自然规律，培养环保意识。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nature%20wonders%20video%20thumbnail%20with%20beautiful%20natural%20phenomena%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '自然科学',
    duration: '12:45',
    tags: ['自然', '科学', '环保', '生物']
  },
  {
    id: 4,
    title: '艺术欣赏：世界名画之旅',
    description: '走进艺术的殿堂，欣赏世界名画，了解艺术史，培养审美能力。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=art%20appreciation%20video%20thumbnail%20with%20famous%20paintings%20and%20artworks%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '艺术欣赏',
    duration: '18:20',
    tags: ['艺术', '绘画', '审美', '文化']
  },
  {
    id: 5,
    title: '科技创新：未来世界展望',
    description: '了解最新的科技发展和创新成果，展望未来世界的可能性。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20innovation%20video%20thumbnail%20with%20future%20technology%20and%20inventions%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '科技创新',
    duration: '16:50',
    tags: ['科技', '创新', '未来', '技术']
  },
  {
    id: 6,
    title: '健康生活：营养与运动',
    description: '学习健康饮食和科学运动的知识，培养良好的生活习惯。',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20and%20wellness%20video%20thumbnail%20with%20fitness%20and%20nutrition%20elements%20professional%20cinematic%20quality&image_size=landscape_16_9',
    category: '健康生活',
    duration: '14:30',
    tags: ['健康', '运动', '营养', '生活']
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
    date: '2026-03-05',
    title: '2026年全国两会关于乡村教育发展的重要部署',
    description: '2026年3月，全国两会在北京召开，乡村教育成为代表委员关注的热点话题。政府工作报告明确提出要大力发展乡村教育，促进教育公平，推动城乡教育一体化发展。'
  },
  {
    id: '2',
    date: '2025-06-18',
    title: '中共中央 国务院关于进一步深化农村改革 扎实推进乡村全面振兴的意见',
    description: '实现中国式现代化，必须加快推进乡村全面振兴。当前，农业再获丰收，农村和谐稳定，同时国际环境复杂严峻，我国发展面临的不确定难预料因素增多。越是应对风险挑战，越要夯实"三农"工作基础。'
  },
  {
    id: '4',
    date: '2023-02-20',
    title: '国家乡村振兴局关于落实党中央国务院 2023年全面推进乡村振兴重点工作部署的实施意见',
    description: '2023年是全面贯彻落实党的二十大精神的开局之年，做好乡村振兴工作意义重大。'
  },
  {
    id: '3',
    date: '2023-02-18',
    title: '中共中央 国务院关于做好2023年全面推进乡村振兴重点工作的意见',
    description: '2023年中央一号文件公布、支持定点零售药店开通门诊统筹服务……本周民生大事都是你关心的！'
  },
  {
    id: '5',
    date: '2022-05-06',
    title: '教育部发布《义务教育劳动课程标准（2022年版）》',
    description: '近日，教育部正式印发《义务教育课程方案》，将劳动从原来的综合实践活动课程中完全独立出来，并发布《义务教育劳动课程标准（2022年版）》。'
  },
  {
    id: '6',
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

// 移动端菜单
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

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

// 处理右下角功能按钮
const handleFloatingAction = (command) => {
  switch (command) {
    case 'backToTop':
      // 一键返回顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
      break
    case 'quickAccess':
      // 快速导航到首页
      scrollToSection(null, 'home')
      break
    case 'contactSupport':
      // 滚动到联系我们 section
      scrollToSection(null, 'contact')
      break
    case 'feedback':
      // 滚动到联系我们 section 并聚焦表单
      scrollToSection(null, 'contact')
      setTimeout(() => {
        document.querySelector('input[name="name"]').focus()
      }, 500)
      break
    case 'darkMode':
      // 切换深色模式（这里只是示例，实际需要实现深色模式逻辑）
      ElMessage.info('深色模式功能开发中')
      break
    case 'fontSize':
      // 字体大小调整
      ElMessage.info('字体大小调整功能开发中')
      break
    case 'help':
      // 显示帮助信息
      ElMessage.info('如有问题，请联系我们的客服团队')
      break
    default:
      break
  }
}

// 导航栏滚动效果已在前面的 onMounted 中实现，此处移除重复代码
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
    radial-gradient(circle at 20% 80%, rgba(64, 158, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(105, 192, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(64, 158, 255, 0.03) 0%, transparent 30%);
  pointer-events: none;
  z-index: 0;
  animation: gradientShift 20s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 导航栏样式 */
.navbar {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  position: relative;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 8px;
  background-color: rgba(64, 158, 255, 0.1);
}

.mobile-menu-btn:hover {
  transform: scale(1.05);
  background-color: rgba(64, 158, 255, 0.2);
}

.menu-icon {
  width: 30px;
  height: 24px;
  position: relative;
  cursor: pointer;
}

.menu-icon::before,
.menu-icon::after,
.menu-icon span {
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: #409eff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-icon span {
  top: 10.5px;
}

.menu-icon::before {
  top: 0;
}

.menu-icon::after {
  bottom: 0;
}

.menu-icon.active span {
  opacity: 0;
  transform: translateX(-20px);
}

.menu-icon.active::before {
  transform: rotate(45deg);
  top: 10.5px;
}

.menu-icon.active::after {
  transform: rotate(-45deg);
  bottom: 10.5px;
}

/* 移动端菜单 */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  z-index: 1000;
  transition: right 0.3s ease;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  overflow-y: auto;
}

.mobile-menu.active {
  right: 0;
}

.mobile-nav-menu {
  list-style: none;
  width: 100%;
  padding: 60px 30px 30px;
}

.mobile-nav-menu li {
  margin-bottom: 15px;
}

.mobile-nav-menu a {
  display: block;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 12px 16px;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.mobile-nav-menu a:hover {
  transform: translateX(10px);
  color: #f0f9ff;
  background-color: rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.02);
}

.logo img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
  transition: all 0.3s ease;
}

.logo:hover img {
  transform: rotate(5deg) scale(1.05);
}

.logo h1 {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
  margin: 0;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  list-style: none;
  align-items: center;
}

.nav-menu li {
  margin-left: 30px;
  position: relative;
}

/* 导航链接样式 */
.nav-link {
  text-decoration: none;
  color: #606266;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 12px 16px;
  border-radius: 8px;
  display: inline-block;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 16px;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.nav-link:hover {
  color: #409eff;
  transform: translateY(-2px);
  background-color: rgba(64, 158, 255, 0.1);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.nav-link:hover::after {
  width: calc(100% - 32px);
}

/* 移动端导航链接样式 */
.mobile-nav-link {
  display: block;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 12px 16px;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.mobile-nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: left 0.3s ease;
}

.mobile-nav-link:hover {
  transform: translateX(10px);
  color: #f0f9ff;
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-nav-link:hover::before {
  left: 0;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.login-btn {
  margin-right: 0;
}

/* 按钮样式优化 */
.nav-buttons .btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 8px 20px;
  font-weight: 500;
}

.nav-buttons .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
  z-index: -1;
}

.nav-buttons .btn:hover::before {
  left: 100%;
}

.nav-buttons .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.3);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .nav-container {
    padding: 12px 20px;
  }
  
  .logo h1 {
    font-size: 18px;
  }
  
  .logo img {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }
  
  .nav-buttons .btn {
    padding: 6px 16px;
    font-size: 14px;
  }
}

@media (max-width: 576px) {
  .nav-container {
    padding: 10px 16px;
  }
  
  .logo h1 {
    font-size: 16px;
  }
  
  .logo img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
  
  .nav-buttons {
    gap: 8px;
  }
  
  .nav-buttons .btn {
    padding: 5px 12px;
    font-size: 12px;
  }
  
  .mobile-menu {
    width: 90%;
  }
}

/* 英雄区 */
.hero-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 50%, var(--primary-color) 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
  color: #fff;
  padding: 140px 0 120px;
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
  background: linear-gradient(to top, var(--bg-secondary), transparent);
}

/* 装饰元素 */
.hero-section .decor-element {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(30px);
  animation: float 15s ease-in-out infinite;
}

.hero-section .decor-element:nth-child(1) {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.hero-section .decor-element:nth-child(2) {
  width: 200px;
  height: 200px;
  bottom: 20%;
  right: 15%;
  animation-delay: 3s;
}

.hero-section .decor-element:nth-child(3) {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 25%;
  animation-delay: 6s;
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
  50% {
    transform: translateY(-50px) rotate(180deg);
  }
  100% {
    transform: translateY(0) rotate(360deg);
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
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 24px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: heroTitleAnimation 1.5s ease-out;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.hero-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  border-radius: 2px;
  animation: heroTitleUnderline 2s ease-in-out infinite;
}

@keyframes heroTitleUnderline {
  0%, 100% {
    width: 120px;
    opacity: 0.8;
  }
  50% {
    width: 200px;
    opacity: 1;
  }
}

.hero-subtitle {
  font-size: 28px;
  margin-bottom: 50px;
  opacity: 0.95;
  animation: heroSubtitleAnimation 1.5s ease-out 0.3s both;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
  animation: heroButtonsAnimation 1.5s ease-out 0.6s both;
  flex-wrap: wrap;
}

@keyframes heroTitleAnimation {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes heroSubtitleAnimation {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes heroButtonsAnimation {
  from {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* 按钮悬停效果增强 */
.hero-buttons .btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-radius: 12px;
  padding: 12px 32px;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hero-buttons .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
  z-index: -1;
}

.hero-buttons .btn:hover::before {
  left: 100%;
}

.hero-buttons .btn:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.hero-buttons .btn:active {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .hero-section {
    padding: 120px 0 100px;
  }
  
  .hero-title {
    font-size: 48px;
  }
  
  .hero-subtitle {
    font-size: 24px;
  }
  
  .hero-buttons .btn {
    padding: 10px 24px;
    font-size: 16px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 100px 0 80px;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 20px;
    margin-bottom: 40px;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .hero-buttons .btn {
    padding: 10px 28px;
    width: 200px;
  }
  
  .hero-section .decor-element {
    transform: scale(0.6);
  }
}

/* 特色功能区 */
.features-section {
  padding: 120px 0;
  background-color: #fff;
  position: relative;
  overflow: hidden;
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

.features-section::after {
  content: '';
  position: absolute;
  bottom: 0;
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
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #303133;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #303133, #409eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 2px;
  animation: sectionTitleUnderline 2s ease-in-out infinite;
}

@keyframes sectionTitleUnderline {
  0%, 100% {
    width: 80px;
    opacity: 0.8;
  }
  50% {
    width: 120px;
    opacity: 1;
  }
}

.section-subtitle {
  text-align: center;
  font-size: 20px;
  color: #606266;
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
}

.feature-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  padding: 48px 32px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e4e7ed;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.1), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.feature-card::after {
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
  transform: translateY(-16px) scale(1.03);
  box-shadow: 0 32px 64px rgba(64, 158, 255, 0.25);
  border-color: #69c0ff;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover::after {
  transform: scaleX(1);
}

.feature-icon {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 24px;
  font-size: 36px;
  color: #fff;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 12px 24px rgba(64, 158, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.feature-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.feature-card:hover .feature-icon {
  transform: scale(1.2) rotate(10deg);
  box-shadow: 0 16px 32px rgba(64, 158, 255, 0.4);
}

.feature-card:hover .feature-icon::before {
  width: 140px;
  height: 140px;
}

.feature-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #303133;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.feature-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.feature-card:hover .feature-title {
  color: #409eff;
  transform: translateY(-4px);
}

.feature-card:hover .feature-title::after {
  width: 80%;
}

.feature-description {
  font-size: 16px;
  color: #606266;
  line-height: 1.7;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.feature-card:hover .feature-description {
  color: #303133;
  transform: translateY(-2px);
}

.feature-link {
  font-size: 14px;
  color: #409eff;
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 10px 20px;
  border-radius: 24px;
  background-color: rgba(64, 158, 255, 0.05);
  font-weight: 500;
}

.feature-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.feature-link:hover {
  color: #66b1ff;
  transform: translateX(8px);
  background-color: rgba(64, 158, 255, 0.1);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.feature-link:hover::before {
  width: 200px;
  height: 200px;
}

.feature-link i {
  margin-left: 8px;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-link i {
  transform: translateX(8px) rotate(20deg);
}

.feature-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: all 0.3s ease;
}

.feature-card-link:hover {
  text-decoration: none;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .features-section {
    padding: 100px 0;
  }
  
  .section-title {
    font-size: 36px;
  }
  
  .section-subtitle {
    font-size: 18px;
    margin-bottom: 60px;
  }
  
  .features-grid {
    gap: 30px;
  }
  
  .feature-card {
    padding: 40px 28px;
  }
}

@media (max-width: 576px) {
  .features-section {
    padding: 80px 0;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .section-subtitle {
    font-size: 16px;
    margin-bottom: 40px;
  }
  
  .features-grid {
    gap: 24px;
  }
  
  .feature-card {
    padding: 32px 24px;
  }
  
  .feature-icon {
    width: 80px;
    height: 80px;
    font-size: 32px;
  }
  
  .feature-title {
    font-size: 20px;
  }
  
  .feature-description {
    font-size: 15px;
  }
}

/* 课程展示区 */
.courses-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8f3ff 100%);
  position: relative;
  overflow: hidden;
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

.courses-section::after {
  content: '';
  position: absolute;
  bottom: 0;
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
  gap: 36px;
}

.course-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e4e7ed;
  position: relative;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.1), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.course-card::after {
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
  transform: translateY(-16px) scale(1.03);
  box-shadow: 0 32px 64px rgba(64, 158, 255, 0.25);
  border-color: #69c0ff;
}

.course-card:hover::before {
  left: 100%;
}

.course-card:hover::after {
  transform: scaleX(1);
}

.course-cover-container {
  position: relative;
  overflow: hidden;
  height: 220px;
  border-radius: 20px 20px 0 0;
}

.course-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.course-cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
  z-index: 1;
}

.course-card:hover .course-cover {
  transform: scale(1.1);
}

.course-content {
  padding: 32px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  z-index: 1;
}

.course-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #303133;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.course-card:hover .course-title {
  color: #409eff;
  transform: translateY(-4px);
}

.course-card:hover .course-title::after {
  width: 80%;
}

.course-teacher {
  font-size: 14px;
  color: #909399;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: rgba(64, 158, 255, 0.05);
}

.course-teacher::before {
  content: '👨‍🏫';
  margin-right: 8px;
  transition: transform 0.3s ease;
  font-size: 16px;
}

.course-card:hover .course-teacher {
  color: #606266;
  transform: translateY(-2px);
  background-color: rgba(64, 158, 255, 0.1);
}

.course-card:hover .course-teacher::before {
  transform: scale(1.2) rotate(10deg);
}

.course-description {
  font-size: 15px;
  color: #606266;
  margin-bottom: 24px;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
  flex: 1;
}

.course-card:hover .course-description {
  color: #303133;
  transform: translateY(-2px);
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
  transition: all 0.3s ease;
}

.course-card:hover .course-footer {
  border-top-color: #69c0ff;
  transform: translateY(-2px);
}

.course-progress {
  font-size: 14px;
  color: #606266;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 6px 16px;
  border-radius: 16px;
  background-color: rgba(64, 158, 255, 0.05);
  font-weight: 500;
}

.course-progress::before {
  content: '📊';
  margin-right: 8px;
  transition: transform 0.3s ease;
  font-size: 16px;
}

.course-card:hover .course-progress {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.course-card:hover .course-progress::before {
  transform: scale(1.2) rotate(10deg);
}

.course-footer .btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
}

.course-footer .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
  z-index: -1;
}

.course-footer .btn:hover::before {
  left: 100%;
}

.course-footer .btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.3);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .courses-section {
    padding: 100px 0;
  }
  
  .courses-grid {
    gap: 30px;
  }
  
  .course-content {
    padding: 28px 20px;
  }
  
  .course-title {
    font-size: 18px;
  }
}

@media (max-width: 576px) {
  .courses-section {
    padding: 80px 0;
  }
  
  .courses-grid {
    gap: 24px;
  }
  
  .course-cover-container {
    height: 180px;
  }
  
  .course-content {
    padding: 24px 16px;
  }
  
  .course-title {
    font-size: 16px;
  }
  
  .course-description {
    font-size: 14px;
  }
  
  .course-footer .btn {
    padding: 6px 16px;
    font-size: 13px;
  }
}

/* 破茧视界区 */
.breakthrough-section {
  padding: 120px 0;
  background-color: #fff;
  position: relative;
  overflow: hidden;
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

.breakthrough-section::after {
  content: '';
  position: absolute;
  bottom: 0;
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
  gap: 36px;
}

.video-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e4e7ed;
  position: relative;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.video-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.1), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.video-card::after {
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
  transform: translateY(-16px) scale(1.03);
  box-shadow: 0 32px 64px rgba(64, 158, 255, 0.25);
  border-color: #69c0ff;
}

.video-card:hover::before {
  left: 100%;
}

.video-card:hover::after {
  transform: scaleX(1);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 220px;
  background-color: #e4e7ed;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 20px 20px 0 0;
}

.video-thumbnail::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
  z-index: 1;
  transition: all 0.4s ease;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.video-card:hover .video-thumbnail img {
  transform: scale(1.1);
}

.video-card:hover .video-thumbnail {
  transform: translateY(-8px);
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.9) 0%, rgba(105, 192, 255, 0.9) 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #fff;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 12px 32px rgba(64, 158, 255, 0.4);
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.play-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.video-card:hover .play-icon {
  transform: translate(-50%, -50%) scale(1.3);
  box-shadow: 0 16px 40px rgba(64, 158, 255, 0.6);
  background: linear-gradient(135deg, rgba(64, 158, 255, 1) 0%, rgba(105, 192, 255, 1) 100%);
}

.video-card:hover .play-icon::before {
  width: 140px;
  height: 140px;
}

.play-icon i {
  transition: all 0.3s ease;
  margin-left: 8px;
  z-index: 3;
  position: relative;
}

.video-card:hover .play-icon i {
  transform: scale(1.2) rotate(10deg);
}

/* 标签选择器 */
.video-tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 40px;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9ff 0%, #ecf5ff 100%);
  border-radius: 12px;
  margin-top: 20px;
}

.filter-tag {
  background: linear-gradient(135deg, #ecf5ff 0%, #e6f7ff 100%);
  color: #409eff;
  padding: 12px 24px;
  border-radius: 28px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}

.filter-tag::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.filter-tag:hover {
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  color: #fff;
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.4);
  border-color: #69c0ff;
}

.filter-tag:hover::before {
  width: 200px;
  height: 200px;
}

.filter-tag.active {
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  color: #fff;
  border-color: #69c0ff;
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.4);
  transform: translateY(-3px) scale(1.05);
}

.filter-tag.active::before {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
}

/* 视频内容 */
.video-content {
  padding: 32px 24px;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  transition: all 0.3s ease;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.video-card:hover .video-content {
  transform: translateY(-8px);
}

.video-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #303133;
  transition: all 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  display: inline-block;
  line-height: 1.4;
}

.video-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.video-card:hover .video-title {
  color: #409eff;
  transform: translateY(-4px);
}

.video-card:hover .video-title::after {
  width: 80%;
}

.video-description {
  font-size: 15px;
  color: #606266;
  margin-bottom: 20px;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
  flex: 1;
}

.video-card:hover .video-description {
  color: #303133;
  transform: translateY(-2px);
}

.video-meta {
  font-size: 14px;
  color: #909399;
  display: flex;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 12px 20px;
  border-radius: 12px;
  background-color: rgba(64, 158, 255, 0.05);
  font-weight: 500;
  margin-top: 16px;
}

.video-card:hover .video-meta {
  color: #606266;
  border-top-color: #69c0ff;
  background-color: rgba(64, 158, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.video-meta::before {
  content: '🎬';
  margin-right: 8px;
  font-size: 16px;
  transition: transform 0.3s ease;
}

.video-card:hover .video-meta::before {
  transform: scale(1.2) rotate(10deg);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .breakthrough-section {
    padding: 100px 0;
  }
  
  .video-grid {
    gap: 30px;
  }
  
  .video-content {
    padding: 28px 20px;
  }
  
  .video-title {
    font-size: 18px;
  }
  
  .video-thumbnail {
    height: 200px;
  }
}

@media (max-width: 576px) {
  .breakthrough-section {
    padding: 80px 0;
  }
  
  .video-grid {
    gap: 24px;
  }
  
  .video-thumbnail {
    height: 180px;
  }
  
  .video-content {
    padding: 24px 16px;
  }
  
  .video-title {
    font-size: 16px;
  }
  
  .video-description {
    font-size: 14px;
  }
  
  .video-tags-filter {
    gap: 12px;
    padding: 16px;
  }
  
  .filter-tag {
    padding: 10px 20px;
    font-size: 13px;
  }
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

.about-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, var(--bg-secondary), transparent);
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
  gap: 80px;
  align-items: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.about-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.about-content:hover::before {
  left: 100%;
}

.about-content:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.about-text {
  flex: 1;
  min-width: 300px;
  position: relative;
  z-index: 2;
}

.about-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 40px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
  animation: heroTitleAnimation 1.5s ease-out;
}

.about-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.8));
  border-radius: 2px;
  animation: sectionTitleUnderline 2s ease-in-out infinite;
}

.about-description {
  font-size: 20px;
  line-height: 1.8;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  opacity: 0.95;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.about-content:hover .about-description {
  transform: translateY(-4px);
  opacity: 1;
}

.about-features {
  list-style: none;
  position: relative;
  z-index: 2;
}

.about-features li {
  margin-bottom: 20px;
  font-size: 18px;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.about-features li::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.about-features li:hover {
  transform: translateX(16px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.about-features li:hover::before {
  width: 200px;
  height: 200px;
}

.about-features li::after {
  content: "✓";
  margin-right: 16px;
  font-weight: bold;
  font-size: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.about-features li:hover::after {
  transform: scale(1.2) rotate(10deg);
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.about-image {
  flex: 1;
  min-width: 300px;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-content:hover .about-image {
  transform: translateX(8px);
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.about-image::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  right: -12px;
  bottom: -12px;
  background: linear-gradient(135deg, #409eff, #69c0ff);
  border-radius: 20px;
  z-index: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-image:hover img {
  transform: translateY(-16px) scale(1.03);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.4);
}

.about-image:hover::before {
  transform: translateY(8px) scale(0.98);
  opacity: 0.8;
}

/* 关于我们动画 */
.about-content.animate-on-scroll {
  transition-delay: 0.2s;
}

.about-features li.animate-on-scroll {
  transition-delay: 0.1s;
}

/* 为列表中的元素添加交错动画 */
.about-features li:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.about-features li:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.about-features li:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.about-features li:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }
.about-features li:nth-child(5).animate-on-scroll { transition-delay: 0.5s; }
.about-features li:nth-child(6).animate-on-scroll { transition-delay: 0.6s; }

/* 乡村教育政策区 */
.policy-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #e8f3ff 0%, #f5f7fa 100%);
  position: relative;
  overflow: hidden;
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

.policy-section::after {
  content: '';
  position: absolute;
  bottom: 0;
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
  align-items: flex-start;
}

.policy-news {
  flex: 2;
  min-width: 300px;
}

.policy-news-item {
  display: flex;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.policy-news-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.1), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.policy-news-item::after {
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
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 40px rgba(64, 158, 255, 0.2);
  border-color: #69c0ff;
}

.policy-news-item:hover::before {
  left: 100%;
}

.policy-news-item:hover::after {
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
  gap: 8px;
  transition: all 0.3s ease;
}

.policy-news-item:hover .news-date {
  color: #409eff;
  border-right-color: #69c0ff;
}

.news-date::before {
  content: '📅';
  font-size: 32px;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.policy-news-item:hover .news-date::before {
  transform: scale(1.2) rotate(5deg);
}

.news-content {
  flex: 1;
  padding-left: 25px;
  transition: all 0.3s ease;
}

.policy-news-item:hover .news-content {
  transform: translateY(-4px);
}

.news-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.news-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.policy-news-item:hover .news-title {
  color: #409eff;
  transform: translateY(-2px);
}

.policy-news-item:hover .news-title::after {
  width: 60%;
}

.news-description {
  font-size: 15px;
  color: #606266;
  margin-bottom: 20px;
  line-height: 1.6;
  transition: all 0.3s ease;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.policy-news-item:hover .news-description {
  color: #303133;
}

.news-link {
  font-size: 14px;
  color: #409eff;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: rgba(64, 158, 255, 0.05);
  font-weight: 500;
  display: inline-block;
}

.news-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.news-link:hover {
  color: #66b1ff;
  transform: translateX(5px);
  background-color: rgba(64, 158, 255, 0.1);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.news-link:hover::before {
  width: 200px;
  height: 200px;
}

.policy-highlights {
  flex: 1;
  min-width: 300px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e4e7ed;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: sticky;
  top: 120px;
}

.policy-highlights:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(64, 158, 255, 0.15);
  border-color: #69c0ff;
}

.highlights-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #303133;
  position: relative;
  padding-bottom: 12px;
}

.highlights-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 2px;
}

.highlights-list {
  list-style: none;
  margin-bottom: 30px;
}

.highlights-list li {
  margin-bottom: 16px;
  font-size: 15px;
  color: #606266;
  display: flex;
  align-items: flex-start;
  transition: all 0.3s ease;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: rgba(64, 158, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.highlights-list li::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.highlights-list li:hover {
  transform: translateX(8px);
  color: #303133;
  background-color: rgba(64, 158, 255, 0.1);
}

.highlights-list li:hover::before {
  width: 200px;
  height: 200px;
}

.highlights-list li i {
  margin-right: 12px;
  color: #67c23a;
  font-size: 18px;
  margin-top: 2px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.highlights-list li:hover i {
  transform: scale(1.2) rotate(5deg);
}

.policy-initiative {
  border-top: 1px solid #e4e7ed;
  padding-top: 24px;
  transition: all 0.3s ease;
}

.policy-highlights:hover .policy-initiative {
  border-top-color: #69c0ff;
}

.initiative-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #303133;
  transition: all 0.3s ease;
}

.policy-highlights:hover .initiative-title {
  color: #409eff;
}

.initiative-description {
  font-size: 15px;
  color: #606266;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.policy-highlights:hover .initiative-description {
  color: #303133;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .policy-section {
    padding: 100px 0;
  }
  
  .policy-content {
    gap: 40px;
  }
  
  .policy-news-item {
    padding: 35px;
  }
  
  .policy-highlights {
    padding: 35px;
    position: static;
  }
}

@media (max-width: 576px) {
  .policy-section {
    padding: 80px 0;
  }
  
  .policy-content {
    gap: 30px;
  }
  
  .policy-news-item {
    padding: 28px;
    flex-direction: column;
    gap: 20px;
  }
  
  .news-date {
    flex: none;
    padding-right: 0;
    border-right: none;
    border-bottom: 2px solid #e4e7ed;
    padding-bottom: 16px;
  }
  
  .news-content {
    padding-left: 0;
  }
  
  .policy-highlights {
    padding: 28px;
  }
  
  .highlights-list li {
    padding: 10px 14px;
  }
}

/* 联系我们区 */
.contact-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #e8f3ff 0%, #f5f7fa 100%);
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
}

.contact-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  position: relative;
  z-index: 1;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 80px;
  align-items: flex-start;
}

.contact-info {
  flex: 1;
  min-width: 300px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e4e7ed;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.contact-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.05), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.contact-info:hover::before {
  left: 100%;
}

.contact-info:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(64, 158, 255, 0.15);
  border-color: #69c0ff;
}

.contact-info::after {
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

.contact-info:hover::after {
  transform: scaleX(1);
}

.contact-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 35px;
  color: #303133;
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, #303133, #409eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.contact-info:hover .contact-title::after {
  width: 100%;
}

.contact-details {
  list-style: none;
  position: relative;
  z-index: 2;
}

.contact-details li {
  margin-bottom: 24px;
  font-size: 16px;
  color: #606266;
  display: flex;
  align-items: flex-start;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(64, 158, 255, 0.05);
  position: relative;
  overflow: hidden;
}

.contact-details li::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.contact-details li:hover {
  transform: translateX(12px);
  color: #303133;
  background: rgba(64, 158, 255, 0.1);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.contact-details li:hover::before {
  width: 200px;
  height: 200px;
}

.contact-details li i {
  margin-right: 16px;
  font-size: 24px;
  color: #409eff;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.contact-details li:hover i {
  transform: scale(1.2) rotate(5deg);
  color: #66b1ff;
}

.contact-form {
  flex: 1;
  min-width: 300px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e4e7ed;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.05), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.contact-form:hover::before {
  left: 100%;
}

.contact-form::after {
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

.contact-form:hover::after {
  transform: scaleX(1);
}

.contact-form:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 48px rgba(64, 158, 255, 0.15);
  border-color: #69c0ff;
}

.form-group {
  margin-bottom: 30px;
  position: relative;
  transition: all 0.3s ease;
}

.form-group:hover {
  transform: translateY(-4px);
}

.form-label {
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.form-group:hover .form-label {
  color: #409eff;
  transform: translateX(8px);
}

.form-input {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e4e7ed;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #fff;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-input:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.15);
  transform: translateY(-2px);
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
  padding: 16px 20px;
  border: 2px solid #e4e7ed;
  border-radius: 12px;
  font-size: 16px;
  resize: vertical;
  min-height: 150px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #fff;
  font-family: inherit;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form-textarea:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.15);
  transform: translateY(-2px);
}

.form-textarea::placeholder {
  color: #c0c4cc;
  transition: color 0.3s ease;
}

.form-textarea:focus::placeholder {
  color: #909399;
}

/* 提交按钮优化 */
.contact-form button[type="submit"] {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.3);
  width: 100%;
  margin-top: 20px;
}

.contact-form button[type="submit"]::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  z-index: -1;
}

.contact-form button[type="submit"]:hover::before {
  width: 400px;
  height: 400px;
}

.contact-form button[type="submit"]:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 32px rgba(64, 158, 255, 0.4);
}

.contact-form button[type="submit"]:active {
  transform: translateY(-2px) scale(0.98);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.3);
}

/* 联系我们动画 */
.contact-info.animate-on-scroll {
  transition-delay: 0.2s;
}

.contact-form.animate-on-scroll {
  transition-delay: 0.3s;
}

.contact-details li.animate-on-scroll {
  transition-delay: 0.1s;
}

.form-group.animate-on-scroll {
  transition-delay: 0.1s;
}

/* 为列表中的元素添加交错动画 */
.contact-details li:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.contact-details li:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.contact-details li:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.contact-details li:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }

.form-group:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.form-group:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.form-group:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.form-group:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }

/* 页脚 */
.footer {
  background: linear-gradient(135deg, #303133 0%, #2a2b2d 100%);
  color: #fff;
  padding: 100px 0 40px;
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

.footer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle, rgba(64, 158, 255, 0.05) 1px, transparent 1px),
    radial-gradient(circle, rgba(64, 158, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px, 100px 100px;
  animation: float 20s linear infinite;
  pointer-events: none;
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 60px;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
}

.footer-column {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  padding: 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-column:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  border-color: rgba(64, 158, 255, 0.3);
}

.footer-column::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.05), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.footer-column:hover::before {
  left: 100%;
}

.footer-column h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 16px;
  color: #fff;
  transition: all 0.3s ease;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-column:hover h3 {
  transform: translateX(8px);
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.footer-column:hover h3::after {
  width: 100px;
}

.footer-links {
  list-style: none;
  position: relative;
  z-index: 1;
}

.footer-links li {
  margin-bottom: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  padding: 8px 12px;
  border-radius: 8px;
}

.footer-links li::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.footer-links li:hover {
  transform: translateX(12px);
  background: rgba(64, 158, 255, 0.05);
}

.footer-links li:hover::before {
  width: 100px;
  height: 100px;
}

.footer-links a {
  text-decoration: none;
  color: #909399;
  font-size: 16px;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  z-index: 1;
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.footer-links a:hover {
  color: #409eff;
  transform: translateY(-2px);
}

.footer-links a:hover::after {
  width: 100%;
}

.footer-bottom {
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  color: #909399;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.footer-bottom:hover {
  color: #c0c4cc;
}

.footer-bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #409eff, transparent);
  transition: width 0.6s ease;
}

.footer-bottom:hover::before {
  width: 80%;
}

/* 页脚动画 */
.footer-column.animate-on-scroll {
  transition-delay: 0.2s;
}

.footer-links li.animate-on-scroll {
  transition-delay: 0.1s;
}

/* 为列表中的元素添加交错动画 */
.footer-content .footer-column:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.footer-content .footer-column:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.footer-content .footer-column:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.footer-content .footer-column:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }

.footer-links li:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.footer-links li:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.footer-links li:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.footer-links li:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }
.footer-links li:nth-child(5).animate-on-scroll { transition-delay: 0.5s; }
.footer-links li:nth-child(6).animate-on-scroll { transition-delay: 0.6s; }
.footer-links li:nth-child(7).animate-on-scroll { transition-delay: 0.7s; }

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

  .nav-buttons {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .logo h1 {
    font-size: 16px;
  }

  .logo img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .nav-container {
    padding: 10px 20px;
  }

  .hero-section {
    padding: 80px 0;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .hero-buttons .btn {
    width: 200px;
    text-align: center;
  }

  .features-section,
  .courses-section,
  .breakthrough-section,
  .herorank-section,
  .about-section,
  .policy-section,
  .contact-section {
    padding: 60px 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .courses-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .about-content {
    flex-direction: column;
    gap: 40px;
  }

  .policy-content {
    flex-direction: column;
    gap: 40px;
  }

  .contact-content {
    flex-direction: column;
    gap: 40px;
  }

  .herorank-top-three {
    flex-direction: column;
    align-items: center;
  }

  .herorank-item {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 16px;
  }

  .feature-card {
    padding: 30px 20px;
  }

  .course-content {
    padding: 20px;
  }

  .video-content {
    padding: 20px;
  }

  .policy-news-item {
    flex-direction: column;
    padding: 25px;
  }

  .news-date {
    border-right: none;
    border-bottom: 2px solid #e4e7ed;
    padding-right: 0;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }

  .news-content {
    padding-left: 0;
  }

  .contact-form {
    padding: 30px 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  /* 移动端触摸优化 */
  .btn {
    padding: 16px 24px;
    font-size: 16px;
    min-height: 48px;
  }

  .feature-card-link {
    touch-action: manipulation;
  }

  .video-thumbnail {
    touch-action: manipulation;
  }

  /* 移动端滚动优化 */
  .portal-container {
    -webkit-overflow-scrolling: touch;
  }

  /* 移动端菜单优化 */
  .mobile-menu {
    width: 85%;
  }

  .mobile-nav-menu a {
    padding: 16px 0;
    font-size: 18px;
  }

  /* 移动端输入优化 */
/* 右下角功能按钮 */
.floating-action-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
}

.fab-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409eff 0%, #667eea 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
}

.fab-button:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #667eea 0%, #409eff 100%);
}

.el-dropdown-menu {
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  overflow: hidden;
}

.el-dropdown-item {
  transition: all 0.3s ease !important;
  padding: 12px 20px !important;
}

.el-dropdown-item:hover {
  background-color: #f5f7fa !important;
  color: #409eff !important;
}

.el-dropdown-item i {
  margin-right: 8px !important;
  font-size: 16px !important;
}

  .form-input,
  .form-textarea {
    padding: 16px;
    font-size: 16px;
    min-height: 48px;
  }

  /* 移动端图片优化 */
  .course-cover,
  .video-thumbnail {
    height: 180px;
  }

  /* 移动端鸿鹄榜优化 */
  .herorank-tabs-container {
    overflow-x: auto;
    white-space: nowrap;
  }

  .herorank-list {
    overflow-x: auto;
  }

  /* 移动端标签过滤优化 */
  .video-tags-filter {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
  }

  /* 防止文本溢出 */
  h1, h2, h3, h4, h5, h6 {
    word-wrap: break-word;
  }

  /* 优化移动端字体大小 */
  :root {
    --font-size-xl: 20px;
    --font-size-lg: 18px;
    --font-size-md: 16px;
    --font-size-sm: 14px;
  }

  /* 优化移动端间距 */
  :root {
    --spacing-lg: 20px;
    --spacing-xl: 24px;
    --spacing-xxl: 32px;
  }
}

/* 小屏幕设备优化 */
@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .section-title {
    font-size: 24px;
  }

  .feature-card {
    padding: 25px 15px;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }

  .course-cover,
  .video-thumbnail {
    height: 150px;
  }

  .policy-news-item {
    padding: 20px;
  }

  .contact-form {
    padding: 25px 15px;
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
  padding: 120px 0;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8f3ff 100%);
  position: relative;
  overflow: hidden;
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

.herorank-section::after {
  content: '';
  position: absolute;
  bottom: 0;
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
  border-radius: 20px;
  padding: 60px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e4e7ed;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
}

.herorank-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.05), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.herorank-content:hover::before {
  left: 100%;
}

.herorank-tabs {
  margin-bottom: 50px;
}

.herorank-tabs-container {
  background: rgba(64, 158, 255, 0.05);
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.herorank-tabs-container::before {
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

.herorank-tabs-container:hover::before {
  transform: scaleX(1);
}

.herorank-tabs-container .el-tabs__nav {
  border-bottom: none;
}

.herorank-tabs-container .el-tabs__active-bar {
  background-color: #409eff;
  height: 3px;
  border-radius: 2px;
}

.herorank-tabs-container .el-tab-pane {
  padding: 0;
}

.herorank-tabs-container .el-tabs__item {
  color: #606266;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  margin: 0 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-weight: 500;
}

.herorank-tabs-container .el-tabs__item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.herorank-tabs-container .el-tabs__item:hover {
  color: #409eff;
  background: rgba(64, 158, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.herorank-tabs-container .el-tabs__item:hover::before {
  width: 200px;
  height: 200px;
}

.herorank-tabs-container .el-tabs__item.is-active {
  color: #fff;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  font-weight: 600;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.3);
}

/* 前三名展示 */
.herorank-top-three {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 40px;
  margin-bottom: 50px;
  padding: 40px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e4e7ed;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.herorank-top-three::before {
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

.herorank-top-three:hover::before {
  transform: scaleX(1);
}

.herorank-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 200px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.herorank-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.herorank-item:hover {
  transform: translateY(-16px) scale(1.05);
  box-shadow: 0 12px 32px rgba(64, 158, 255, 0.25);
  z-index: 10;
}

.herorank-item:hover::before {
  width: 300px;
  height: 300px;
}

.herorank-item.first {
  order: 2;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
  border: 2px solid #ffc107;
  transform: scale(1.15);
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.2);
}

.herorank-item.second {
  order: 1;
  background: linear-gradient(135deg, #e2e3e5 0%, #d6d8db 100%);
  border: 2px solid #6c757d;
  box-shadow: 0 8px 24px rgba(108, 117, 125, 0.2);
}

.herorank-item.third {
  order: 3;
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border: 2px solid #dc3545;
  box-shadow: 0 8px 24px rgba(220, 53, 69, 0.2);
}

.herorank-number {
  font-size: 64px;
  font-weight: bold;
  margin-bottom: 20px;
  opacity: 0.2;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;
}

.herorank-item:hover .herorank-number {
  opacity: 0.3;
  transform: scale(1.1);
}

.herorank-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 4px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}

.herorank-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.3) 100%);
  transition: all 0.3s ease;
  z-index: 1;
}

.herorank-item:hover .herorank-avatar {
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.herorank-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 0;
  transition: transform 0.4s ease;
}

.herorank-item:hover .herorank-avatar img {
  transform: scale(1.1);
}

.herorank-info {
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
}

.herorank-name {
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 8px 0;
  color: #303133;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.herorank-name::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.herorank-item:hover .herorank-name {
  color: #409eff;
  transform: translateY(-4px);
}

.herorank-item:hover .herorank-name::after {
  width: 80%;
}

.herorank-score {
  font-size: 18px;
  color: #606266;
  margin: 0 0 8px 0;
  font-weight: 500;
  transition: all 0.3s ease;
}

.herorank-item:hover .herorank-score {
  color: #303133;
  transform: translateY(-2px);
}

.herorank-level {
  font-size: 14px;
  color: #909399;
  margin: 0;
  transition: all 0.3s ease;
  padding: 4px 12px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.6);
  display: inline-block;
}

.herorank-item:hover .herorank-level {
  color: #606266;
  background-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.herorank-reward {
  font-size: 48px;
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

.herorank-item:hover .herorank-reward {
  transform: scale(1.3) rotate(10deg);
}

/* 排行榜列表 */
.herorank-list {
  margin-bottom: 50px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e4e7ed;
  position: relative;
  backdrop-filter: blur(10px);
}

.herorank-list::before {
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

.herorank-list:hover::before {
  transform: scaleX(1);
}

.herorank-list-header {
  display: flex;
  background: linear-gradient(135deg, #409eff 0%, #69c0ff 100%);
  padding: 20px 30px;
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.herorank-list-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
  z-index: -1;
}

.herorank-list-header:hover::before {
  left: 100%;
}

.herorank-list-column {
  display: flex;
  align-items: center;
}

.herorank-list .rank-column {
  width: 120px;
}

.herorank-list .user-column {
  flex: 2;
  min-width: 250px;
}

.herorank-list .score-column {
  width: 150px;
}

.herorank-list .level-column {
  width: 120px;
}

.herorank-list-body {
  padding: 0 30px;
}

.herorank-list-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e4e7ed;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin: 0 -10px;
  padding-left: 10px;
  padding-right: 10px;
}

.herorank-list-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.05);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  pointer-events: none;
}

.herorank-list-item:hover {
  background-color: rgba(64, 158, 255, 0.05);
  transform: translateX(10px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
}

.herorank-list-item:hover::before {
  width: 400px;
  height: 400px;
}

.herorank-list-item:hover + .herorank-list-item {
  margin-top: 8px;
}

.herorank-list-number {
  font-size: 18px;
  font-weight: bold;
  color: #606266;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(64, 158, 255, 0.05);
}

.herorank-list-item:hover .herorank-list-number {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
  transform: scale(1.2);
}

.herorank-list-user {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.herorank-list-item:hover .herorank-list-user {
  transform: translateX(8px);
}

.herorank-list-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(64, 158, 255, 0.1);
  transition: all 0.4s ease;
  position: relative;
}

.herorank-list-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, rgba(64, 158, 255, 0.2) 100%);
  transition: all 0.3s ease;
}

.herorank-list-item:hover .herorank-list-avatar {
  transform: scale(1.15) rotate(5deg);
  border-color: rgba(64, 158, 255, 0.3);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

.herorank-list-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.herorank-list-item:hover .herorank-list-avatar img {
  transform: scale(1.1);
}

.herorank-list-name {
  font-size: 16px;
  color: #303133;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.herorank-list-name::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #69c0ff);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.herorank-list-item:hover .herorank-list-name {
  color: #409eff;
}

.herorank-list-item:hover .herorank-list-name::after {
  width: 100%;
}

.herorank-list-score {
  font-size: 16px;
  font-weight: 600;
  color: #606266;
  transition: all 0.3s ease;
  padding: 6px 16px;
  border-radius: 16px;
  background-color: rgba(64, 158, 255, 0.05);
  font-family: 'Arial', sans-serif;
}

.herorank-list-item:hover .herorank-list-score {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
}

.herorank-list-level {
  font-size: 14px;
  color: #909399;
  transition: all 0.3s ease;
  padding: 4px 12px;
  border-radius: 12px;
  background-color: rgba(64, 158, 255, 0.05);
  font-weight: 500;
}

.herorank-list-item:hover .herorank-list-level {
  color: #606266;
  background-color: rgba(64, 158, 255, 0.1);
  transform: scale(1.05);
}

/* 操作按钮 */
.herorank-action {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  border-radius: 20px;
  border: 1px solid #bae6fd;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.herorank-action::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 158, 255, 0.1), transparent);
  transition: left 0.6s ease;
  pointer-events: none;
}

.herorank-action:hover::before {
  left: 100%;
}

.herorank-action:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(64, 158, 255, 0.15);
  border-color: #69c0ff;
}

.herorank-action .btn {
  font-size: 18px;
  padding: 14px 36px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.3);
}

.herorank-action .btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  z-index: -1;
}

.herorank-action .btn:hover::before {
  width: 400px;
  height: 400px;
}

.herorank-action .btn:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 12px 32px rgba(64, 158, 255, 0.4);
}

.herorank-tip {
  font-size: 16px;
  color: #606266;
  margin: 0;
  transition: all 0.3s ease;
  line-height: 1.6;
}

.herorank-action:hover .herorank-tip {
  color: #303133;
  transform: translateY(-4px);
}

/* 鸿鹄榜动画 */
.herorank-item.animate-on-scroll {
  transition-delay: 0.2s;
}

.herorank-list-item.animate-on-scroll {
  transition-delay: 0.1s;
}

/* 为网格中的元素添加交错动画 */
.herorank-top-three .herorank-item:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.herorank-top-three .herorank-item:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.herorank-top-three .herorank-item:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }

.herorank-list-body .herorank-list-item:nth-child(1).animate-on-scroll { transition-delay: 0.1s; }
.herorank-list-body .herorank-list-item:nth-child(2).animate-on-scroll { transition-delay: 0.2s; }
.herorank-list-body .herorank-list-item:nth-child(3).animate-on-scroll { transition-delay: 0.3s; }
.herorank-list-body .herorank-list-item:nth-child(4).animate-on-scroll { transition-delay: 0.4s; }
.herorank-list-body .herorank-list-item:nth-child(5).animate-on-scroll { transition-delay: 0.5s; }
.herorank-list-body .herorank-list-item:nth-child(6).animate-on-scroll { transition-delay: 0.6s; }
.herorank-list-body .herorank-list-item:nth-child(7).animate-on-scroll { transition-delay: 0.7s; }
.herorank-list-body .herorank-list-item:nth-child(8).animate-on-scroll { transition-delay: 0.8s; }

/* 响应式设计 */
@media (max-width: 1024px) {
  .nav-menu li {
    margin-left: 20px;
  }
  
  .hero-title {
    font-size: 48px;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .herorank-top-three {
    gap: 20px;
  }
  
  .herorank-item {
    min-width: 150px;
  }
}

@media (max-width: 768px) {
  .nav-menu,
  .nav-buttons {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .logo h1 {
    font-size: 16px;
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
    gap: 15px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .policy-content {
    flex-direction: column;
    gap: 30px;
  }
  
  .policy-news,
  .policy-highlights {
    width: 100%;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
  }
  
  .herorank-top-three {
    flex-direction: column;
    align-items: center;
  }
  
  .herorank-item {
    margin-bottom: 20px;
    width: 100%;
    max-width: 300px;
  }
  
  .herorank-item.first {
    transform: scale(1);
  }
  
  .about-content {
    flex-direction: column;
  }
  
  .about-text,
  .about-image {
    width: 100%;
  }
  
  .contact-content {
    flex-direction: column;
  }
  
  .contact-info,
  .contact-form {
    width: 100%;
  }
  
  .footer-content {
    flex-direction: column;
  }
  
  .footer-column {
    width: 100%;
    margin-bottom: 30px;
  }
  
  .nav-container {
    padding: 15px 20px;
  }
  
  .hero-container,
  .features-container,
  .courses-container,
  .policy-container,
  .breakthrough-container,
  .herorank-container,
  .about-container,
  .contact-container,
  .footer-container {
    padding: 0 20px;
  }
  
  .herorank-content {
    padding: 20px;
  }
  
  .herorank-top-three {
    padding: 20px;
  }
  
  .herorank-list-header {
    padding: 10px 15px;
  }
  
  .herorank-list .rank-column {
    width: 60px;
  }
  
  .herorank-list .score-column {
    width: 80px;
  }
  
  .herorank-list .level-column {
    width: 80px;
  }
  
  .herorank-action {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .logo h1 {
    font-size: 14px;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .hero-subtitle {
    font-size: 16px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .section-subtitle {
    font-size: 14px;
  }
  
  .feature-title {
    font-size: 18px;
  }
  
  .course-title {
    font-size: 16px;
  }
  
  .video-title {
    font-size: 16px;
  }
  
  .herorank-name {
    font-size: 16px;
  }
  
  .about-title {
    font-size: 24px;
  }
  
  .contact-title {
    font-size: 18px;
  }
  
  .herorank-content {
    padding: 15px;
  }
  
  .herorank-top-three {
    padding: 15px;
  }
  
  .herorank-item {
    padding: 15px;
  }
  
  .herorank-avatar {
    width: 60px;
    height: 60px;
  }
  
  .herorank-number {
    font-size: 36px;
  }
  
  .herorank-reward {
    font-size: 24px;
  }
}
</style>