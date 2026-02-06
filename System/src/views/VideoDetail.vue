<template>
  <div class="video-detail-container">
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

    <!-- 视频详情区 -->
    <section class="video-detail-section">
      <div class="video-detail-container-inner">
        <!-- 视频播放器 -->
        <div class="video-player">
          <div class="video-wrapper">
            <iframe :src="video.embedUrl" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>

        <!-- 视频信息 -->
        <div class="video-info">
          <h1 class="video-title">{{ video.title }}</h1>
          <div class="video-meta">
            <span class="video-category">{{ video.category }}</span>
            <span class="video-duration">{{ video.duration }}</span>
            <span class="video-views">{{ video.views }} 次观看</span>
            <span class="video-date">{{ video.date }}</span>
          </div>
          <p class="video-description">{{ video.description }}</p>
          <div class="video-tags">
            <span class="tag" v-for="(tag, index) in video.tags" :key="index">{{ tag }}</span>
          </div>
          <div class="video-actions">
            <button class="action-btn like-btn">
              <i class="fas fa-thumbs-up"></i> {{ video.likes }}
            </button>
            <button class="action-btn share-btn">
              <i class="fas fa-share-alt"></i> 分享
            </button>
            <button class="action-btn save-btn">
              <i class="fas fa-bookmark"></i> 收藏
            </button>
          </div>
        </div>

        <!-- 相关视频 -->
        <div class="related-videos">
          <h3>相关视频</h3>
          <div class="related-videos-list">
            <div class="related-video-item" v-for="(relatedVideo, index) in relatedVideos" :key="index">
              <div class="related-video-thumbnail">
                <img :src="relatedVideo.thumbnail" :alt="relatedVideo.title">
                <div class="play-icon-small">
                  <i class="fas fa-play"></i>
                </div>
                <span class="video-duration-small">{{ relatedVideo.duration }}</span>
              </div>
              <div class="related-video-info">
                <router-link :to="'/video/' + relatedVideo.id" class="related-video-title">{{ relatedVideo.title }}</router-link>
                <span class="related-video-meta">{{ relatedVideo.category }} | {{ relatedVideo.views }} 次观看</span>
              </div>
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
const videoId = route.params.id

// 视频数据
const videos = ref([
  {
    id: '1',
    title: '探索宇宙的奥秘',
    description: '带你了解太阳系的行星和宇宙的起源，感受宇宙的浩瀚与神秘。从地球到遥远的星系，从黑洞到暗物质，让我们一起探索宇宙的无限可能。',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: '科学探索',
    duration: '15:30',
    views: '12,458',
    likes: '1,245',
    date: '2024-01-15',
    tags: ['宇宙', '天文', '科学', '探索']
  },
  {
    id: '2',
    title: '世界各地的文化',
    description: '了解不同国家和地区的文化传统，拓展国际视野，培养文化素养。从亚洲到非洲，从欧洲到美洲，探索各种文化的独特魅力。',
    thumbnail: 'https://images.unsplash.com/photo-1492937419561-2710f590117f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: '人文历史',
    duration: '20:15',
    views: '8,923',
    likes: '956',
    date: '2024-01-10',
    tags: ['文化', '历史', '人文', '国际']
  },
  {
    id: '3',
    title: '大自然的奇妙现象',
    description: '探索自然界中的神奇现象和生物，了解自然规律，培养环保意识。从北极光到火山爆发，从热带雨林到深海世界，感受大自然的鬼斧神工。',
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: '自然科学',
    duration: '12:45',
    views: '15,678',
    likes: '1,543',
    date: '2024-01-05',
    tags: ['自然', '科学', '环保', '生物']
  },
  {
    id: '4',
    title: '艺术的魅力',
    description: '欣赏世界名画和艺术作品，了解艺术史和艺术流派，培养艺术鉴赏能力。从文艺复兴到现代艺术，从绘画到雕塑，探索艺术的无限魅力。',
    thumbnail: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: '艺术鉴赏',
    duration: '18:20',
    views: '7,892',
    likes: '876',
    date: '2023-12-28',
    tags: ['艺术', '绘画', '雕塑', '鉴赏']
  },
  {
    id: '5',
    title: '科技的未来',
    description: '了解最新的科技发展和创新成果，展望科技的未来趋势，培养科技素养。从人工智能到量子计算，从虚拟现实到区块链，探索科技的无限可能。',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: '科技创新',
    duration: '22:10',
    views: '19,345',
    likes: '2,109',
    date: '2023-12-20',
    tags: ['科技', '创新', '未来', '人工智能']
  }
])

// 根据ID获取视频信息
const video = computed(() => {
  return videos.value.find(v => v.id === videoId) || videos.value[0]
})

// 相关视频
const relatedVideos = computed(() => {
  return videos.value.filter(v => v.id !== videoId).slice(0, 4)
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
.video-detail-container {
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

/* 视频详情区 */
.video-detail-section {
  padding: 60px 0;
  background-color: #f5f7fa;
}

.video-detail-container-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

/* 视频播放器 */
.video-player {
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.video-wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 宽高比 */
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 视频信息 */
.video-info {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.video-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #303133;
  line-height: 1.3;
}

.video-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #909399;
}

.video-description {
  font-size: 16px;
  line-height: 1.8;
  color: #606266;
  margin-bottom: 30px;
}

.video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.tag {
  background-color: #ecf5ff;
  color: #409eff;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
}

.video-actions {
  display: flex;
  gap: 20px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  border-color: #409eff;
  color: #409eff;
  background-color: #ecf5ff;
}

/* 相关视频 */
.related-videos {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.related-videos h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #303133;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.related-videos-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.related-video-item {
  display: flex;
  gap: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.related-video-item:hover {
  background-color: #ecf5ff;
}

.related-video-thumbnail {
  flex: 0 0 200px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.related-video-thumbnail img {
  width: 100%;
  height: 112px;
  object-fit: cover;
}

.play-icon-small {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
}

.video-duration-small {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 2px 6px;
  border-radius: 2px;
  font-size: 12px;
}

.related-video-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.related-video-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
  text-decoration: none;
  transition: color 0.3s;
}

.related-video-title:hover {
  color: #409eff;
}

.related-video-meta {
  font-size: 14px;
  color: #909399;
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

  .video-title {
    font-size: 24px;
  }

  .related-video-item {
    flex-direction: column;
  }

  .related-video-thumbnail {
    flex: 1;
  }

  .related-video-thumbnail img {
    height: 200px;
  }
}
</style>