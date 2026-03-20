<template>
  <div class="breakthrough-page">
    <!-- 渐变背景头部 -->
    <div class="breakthrough-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">

          <h2 class="breakthrough-title">破茧视界</h2>
          <p class="breakthrough-subtitle">打破信息茧房，拓展多元视野</p>
        </div>
      </div>
    </div>
    
    <!-- 视频分类 -->
    <div class="video-categories">
      <el-tag 
        v-for="category in videoCategories" 
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="switchCategory(category)"
        class="category-tag"
      >
        {{ category }}
      </el-tag>
    </div>
    
    <!-- 视频网格 -->
    <div class="video-grid">
      <el-card 
        v-for="video in filteredVideos" 
        :key="video.id"
        shadow="hover"
        class="video-card"
      >
        <div class="video-thumbnail">
          <img :src="video.thumbnail" :alt="video.title" class="thumbnail-img">
          <div class="play-icon" @click="playVideo(video)">
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <h4 class="video-title">{{ video.title }}</h4>
        <p class="video-description">{{ video.description }}</p>
        <div class="video-meta">
          <span class="video-category">{{ video.category }}</span>
          <span class="video-duration">{{ video.duration }}</span>
        </div>
        <el-button type="primary" class="watch-btn" @click="playVideo(video)">立即观看</el-button>
      </el-card>
    </div>
    
    <!-- 文化视野拓展 -->
    <div class="culture-section">
      <h3 class="section-title">文化视野拓展</h3>
      <p class="section-subtitle">提供不同文化背景的内容，促进跨文化理解</p>
      <div class="culture-cards">
        <el-card shadow="hover" class="culture-card">
          <div class="culture-icon">
            <i class="el-icon-globe"></i>
          </div>
          <h4 class="culture-title">世界文化之旅</h4>
          <p class="culture-description">探索世界各地的文化传统、风俗习惯和历史遗产</p>
          <el-button type="primary" @click="exploreCulture('world')">开始探索</el-button>
        </el-card>
        <el-card shadow="hover" class="culture-card">
          <div class="culture-icon">
            <i class="el-icon-collection-tag"></i>
          </div>
          <h4 class="culture-title">艺术欣赏</h4>
          <p class="culture-description">欣赏不同时期、不同流派的艺术作品，培养审美能力</p>
          <el-button type="primary" @click="exploreCulture('art')">开始欣赏</el-button>
        </el-card>
        <el-card shadow="hover" class="culture-card">
          <div class="culture-icon">
            <i class="el-icon-notebook-2"></i>
          </div>
          <h4 class="culture-title">历史探索</h4>
          <p class="culture-description">了解人类历史的发展进程，从历史中汲取智慧</p>
          <el-button type="primary" @click="exploreCulture('history')">开始探索</el-button>
        </el-card>
      </div>
    </div>
    
    <!-- 互动学习社区 -->
    <div class="community-section">
      <h3 class="section-title">互动学习社区</h3>
      <p class="section-subtitle">学生可以分享观看心得，交流学习体验</p>
      <div class="community-content">
        <div class="community-posts">
          <el-card shadow="hover" v-for="post in communityPosts" :key="post.id" class="post-card">
            <div class="post-header">
              <div class="post-author">
                <el-avatar :size="48" :src="post.author.avatar" class="author-avatar"></el-avatar>
                <div class="author-info">
                  <h5 class="author-name">{{ post.author.name }}</h5>
                  <p class="post-time">{{ post.time }}</p>
                </div>
              </div>
              <div class="post-video">
                <el-tag type="primary" size="small" effect="plain" class="video-tag">{{ post.videoTitle }}</el-tag>
              </div>
            </div>
            <div class="post-content">
              <p>{{ post.content }}</p>
            </div>
            <div class="post-actions">
              <div class="action-button" :class="['like-button', { liked: post.liked }]" @click="likePost(post.id)">
                <span class="icon-wrapper">{{ post.liked ? '❤️' : '🤍' }}</span>
                <span class="action-count">{{ post.likes }}</span>
              </div>
              <div class="action-button comment-button" @click="commentPost(post.id)">
                <span class="icon-wrapper">💬</span>
                <span class="action-count">{{ post.comments }}</span>
              </div>
              <div class="action-button share-button" @click="sharePost(post.id)">
                <span class="icon-wrapper">📤</span>
                <span class="action-text">分享</span>
              </div>
            </div>
          </el-card>
          
          <!-- 发布帖子区域 -->
          <div class="post-create">
            <el-card shadow="hover" class="create-card">
              <template #header>
                <div class="card-header">
                  <span>分享你的想法</span>
                </div>
              </template>
              <div class="create-content">
                <el-avatar :size="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="create-avatar"></el-avatar>
                <div class="create-input">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="分享你的观看心得..."
                    class="post-textarea"
                  ></el-input>
                  <div class="create-actions">
                    <el-button type="primary" class="post-btn">发布</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div class="community-sidebar">
          <el-card shadow="hover" class="sidebar-card hot-topics-card">
            <template #header>
              <div class="card-header">
                <span>热门话题</span>
                <el-badge value="5" class="topic-badge" />
              </div>
            </template>
            <div class="hot-topics">
              <div v-for="topic in hotTopics" :key="topic.id" class="topic-item" :class="{ 'top-topic': topic.rank <= 3 }">
                <span class="topic-rank" :class="{ 'top-rank': topic.rank <= 3 }">{{ topic.rank }}</span>
                <span class="topic-title">{{ topic.title }}</span>
                <span class="topic-count">{{ topic.count }} 讨论</span>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" class="sidebar-card rules-card">
            <template #header>
              <div class="card-header">
                <span>社区规则</span>
              </div>
            </template>
            <div class="community-rules">
              <div class="rule-item">
                <i class="el-icon-s-flag rule-icon"></i>
                <span>尊重他人，文明交流</span>
              </div>
              <div class="rule-item">
                <i class="el-icon-s-marketing rule-icon"></i>
                <span>分享有价值的内容</span>
              </div>
              <div class="rule-item">
                <i class="el-icon-s-lock rule-icon"></i>
                <span>保护个人隐私</span>
              </div>
              <div class="rule-item">
                <i class="el-icon-s-flag rule-icon"></i>
                <span>遵守法律法规</span>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" class="sidebar-card active-users-card">
            <template #header>
              <div class="card-header">
                <span>活跃用户</span>
              </div>
            </template>
            <div class="active-users">
              <div v-for="user in activeUsers" :key="user.id" class="user-item">
                <el-avatar :size="32" :src="user.avatar"></el-avatar>
                <div class="user-info">
                  <span class="user-name">{{ user.name }}</span>
                  <span class="user-posts">{{ user.posts }} 帖子</span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    
    <!-- 视频播放弹窗 -->
    <el-dialog
      v-model="showVideoDialog"
      :title="currentVideo?.title"
      width="800px"
      class="video-dialog"
    >
      <div class="video-player">
        <div class="video-container">
          <img :src="currentVideo?.thumbnail" :alt="currentVideo?.title" class="video-poster">
          <div class="play-button" @click="playVideo(currentVideo)">
            <i class="el-icon-video-play"></i>
          </div>
        </div>
        <div class="video-info">
          <h4>{{ currentVideo?.title }}</h4>
          <p class="video-desc">{{ currentVideo?.description }}</p>
          <div class="video-meta-info">
            <span class="category">{{ currentVideo?.category }}</span>
            <span class="duration">{{ currentVideo?.duration }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="showVideoDialog = false">关闭</el-button>
        <el-button type="primary" @click="shareVideo(currentVideo)">分享视频</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()


const selectedCategory = ref('全部')
const showVideoDialog = ref(false)
const currentVideo = ref(null)

// 视频分类
const videoCategories = ref(['全部', '科学探索', '人文历史', '自然科学', '艺术欣赏', '科技创新'])

// 视频数据
const videos = ref([
  {
    id: 1,
    title: '探索宇宙的奥秘',
    description: '带你了解太阳系的行星和宇宙的起源',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=space%20exploration%20video%20thumbnail%20with%20planets%20and%20galaxies&image_size=landscape_16_9',
    url: 'https://www.example.com/video1',
    category: '科学探索',
    duration: '15:30'
  },
  {
    id: 2,
    title: '世界各地的文化',
    description: '了解不同国家和地区的文化传统',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=world%20cultures%20video%20thumbnail%20with%20different%20cultural%20elements&image_size=landscape_16_9',
    url: 'https://www.example.com/video2',
    category: '人文历史',
    duration: '20:15'
  },
  {
    id: 3,
    title: '大自然的奇妙现象',
    description: '探索自然界中的神奇现象和生物',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nature%20wonders%20video%20thumbnail%20with%20beautiful%20natural%20phenomena&image_size=landscape_16_9',
    url: 'https://www.example.com/video3',
    category: '自然科学',
    duration: '12:45'
  },
  {
    id: 4,
    title: '现代艺术欣赏',
    description: '了解现代艺术的发展和主要流派',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20art%20appreciation%20video%20thumbnail&image_size=landscape_16_9',
    url: 'https://www.example.com/video4',
    category: '艺术欣赏',
    duration: '18:20'
  },
  {
    id: 5,
    title: '科技创新的未来',
    description: '探索人工智能和未来科技的发展趋势',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=科技创新的未来%20video%20thumbnail%20with%20AI%20and%20future%20technology&image_size=landscape_16_9',
    url: 'https://www.example.com/video5',
    category: '科技创新',
    duration: '22:10'
  },
  {
    id: 6,
    title: '古代文明的智慧',
    description: '探索古代文明的伟大成就和智慧',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20civilizations%20wisdom%20video%20thumbnail&image_size=landscape_16_9',
    url: 'https://www.example.com/video6',
    category: '人文历史',
    duration: '16:45'
  }
])

// 过滤后的视频
const filteredVideos = computed(() => {
  if (selectedCategory.value === '全部') {
    return videos.value
  }
  return videos.value.filter(video => video.category === selectedCategory.value)
})

// 切换分类
const switchCategory = (category) => {
  selectedCategory.value = category
  ElMessage.success(`已切换到${category}分类`)
}

// 播放视频
const playVideo = (video) => {
  currentVideo.value = video
  showVideoDialog.value = true
  ElMessage.success(`正在播放：${video.title}`)
}

// 分享视频
const shareVideo = (video) => {
  ElMessage.success(`视频链接已复制到剪贴板：${video.url}`)
}

// 探索文化
const exploreCulture = (type) => {
  ElMessage.success(`正在探索${type === 'world' ? '世界文化' : type === 'art' ? '艺术欣赏' : '历史探索'}`)
}

// 社区帖子
const communityPosts = ref([
  {
    id: 1,
    author: {
      name: '小明',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    videoTitle: '探索宇宙的奥秘',
    content: '这个视频太棒了！让我对宇宙有了更深刻的认识，特别是关于黑洞的部分，非常震撼。推荐给所有对科学感兴趣的同学！',
    time: '2小时前',
    likes: 15,
    comments: 3,
    liked: false
  },
  {
    id: 2,
    author: {
      name: '小红',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    videoTitle: '世界各地的文化',
    content: '通过这个视频，我了解了很多不同国家的文化习俗，尤其是印度的婚礼习俗，非常有趣。希望能看到更多这样的视频！',
    time: '5小时前',
    likes: 23,
    comments: 5,
    liked: false
  },
  {
    id: 3,
    author: {
      name: '小李',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    videoTitle: '大自然的奇妙现象',
    content: '大自然真是太神奇了！极光、彩虹、海市蜃楼这些现象的形成原因原来如此复杂，涨知识了！',
    time: '1天前',
    likes: 18,
    comments: 4,
    liked: false
  }
])

// 热门话题
const hotTopics = ref([
  { id: 1, rank: 1, title: '你最喜欢的科学视频', count: 45 },
  { id: 2, rank: 2, title: '文化差异的有趣之处', count: 38 },
  { id: 3, rank: 3, title: '未来科技的发展趋势', count: 32 },
  { id: 4, rank: 4, title: '大自然的奇妙现象', count: 28 },
  { id: 5, rank: 5, title: '艺术作品的欣赏角度', count: 25 }
])

// 活跃用户
const activeUsers = ref([
  { id: 1, name: '小明', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', posts: 12 },
  { id: 2, name: '小红', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', posts: 9 },
  { id: 3, name: '小李', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', posts: 7 },
  { id: 4, name: '小张', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', posts: 5 }
])

// 点赞帖子
const likePost = (postId) => {
  const post = communityPosts.value.find(p => p.id === postId)
  if (post) {
    if (post.liked) {
      post.likes--
      post.liked = false
      ElMessage.info('取消点赞')
    } else {
      post.likes++
      post.liked = true
      ElMessage.success('点赞成功')
    }
  }
}

// 评论帖子
const commentPost = (postId) => {
  ElMessage.success('评论功能开发中...')
}

// 分享帖子
const sharePost = (postId) => {
  ElMessage.success('帖子链接已复制到剪贴板')
}
</script>

<style scoped>
.breakthrough-page {
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%);
  position: relative;
}

/* 渐变背景头部 */
.breakthrough-header {
  position: relative;
  overflow: hidden;
  padding: 60px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  margin-bottom: 40px;
  text-align: center;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20breakthrough%20vision%20background%20with%20purple%20gradient&image_size=landscape_16_9') center/cover;
  opacity: 0.2;
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  border-color: white;
  z-index: 10;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: white;
  color: white;
}

.header-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  position: relative;
}

.breakthrough-title {
  font-size: 36px;
  font-weight: bold;
  margin: 0 0 15px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: white;
}

.breakthrough-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin: 0;
  color: white;
}

/* 视频分类 */
.video-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
  padding: 0 30px;
}

.category-tag {
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  color: #667eea;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-tag:hover {
  background-color: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.category-tag.active {
  background-color: #667eea;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 视频网格 */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  padding: 0 30px;
  margin-bottom: 60px;
}

.video-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.video-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.video-thumbnail {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-card:hover .thumbnail-img {
  transform: scale(1.05);
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.play-icon:hover {
  transform: translate(-50%, -50%) scale(1.2);
  background-color: #667eea;
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.video-card .el-card__body {
  padding: 20px;
}

.video-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #303133;
  line-height: 1.4;
}

.video-description {
  font-size: 14px;
  color: #606266;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 12px;
  color: #909399;
}

.watch-btn {
  width: 100%;
  border-radius: 25px;
  padding: 10px 0;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border: none;
  transition: all 0.3s ease;
}

.watch-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  background: linear-gradient(90deg, #764ba2, #667eea);
}

/* 文化视野拓展 */
.culture-section {
  background-color: white;
  padding: 40px 30px;
  margin-bottom: 60px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 10px 0;
  text-align: center;
}

.section-subtitle {
  font-size: 16px;
  color: #606266;
  margin: 0 0 40px 0;
  text-align: center;
}

.culture-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.culture-card {
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.culture-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.culture-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  font-size: 32px;
  color: white;
  transition: all 0.3s ease;
}

.culture-card:hover .culture-icon {
  transform: scale(1.1) rotate(5deg);
}

.culture-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 15px 0;
}

.culture-description {
  font-size: 14px;
  color: #606266;
  margin: 0 0 25px 0;
  line-height: 1.5;
}

.culture-card .el-button {
  border-radius: 25px;
  padding: 8px 24px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border: none;
  transition: all 0.3s ease;
}

.culture-card .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  background: linear-gradient(90deg, #764ba2, #667eea);
}

/* 互动学习社区 */
.community-section {
  background-color: white;
  padding: 40px 30px;
  margin-bottom: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.community-content {
  display: flex;
  gap: 30px;
}

.community-posts {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.post-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  border: 2px solid #667eea;
  transition: all 0.3s ease;
}

.post-card:hover .author-avatar {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.author-info h5 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  transition: color 0.3s ease;
}

.post-card:hover .author-info h5 {
  color: #667eea;
}

.post-time {
  margin: 0;
  font-size: 12px;
  color: #909399;
  transition: color 0.3s ease;
}

.post-card:hover .post-time {
  color: #667eea;
}

.video-tag {
  border-radius: 12px;
  padding: 4px 12px;
  font-size: 12px;
  transition: all 0.3s ease;
}

.post-card:hover .video-tag {
  background-color: #667eea;
  color: white;
}

.post-content {
  margin-bottom: 20px;
  padding: 0 5px;
}

.post-content p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #606266;
  transition: color 0.3s ease;
}

.post-card:hover .post-content p {
  color: #303133;
}

.post-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 25px;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  justify-content: center;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.icon-wrapper {
  font-size: 18px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.action-button:hover .icon-wrapper {
  transform: scale(1.2);
}

.action-count {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.action-text {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

/* 点赞按钮 */
.like-button {
  color: #909399;
}

.like-button i {
  color: #909399;
  transition: all 0.3s ease;
  font-size: 18px;
}

.like-button:hover {
  background-color: #fef0f0;
  border-color: #f56c6c;
}

.like-button:hover i {
  color: #f56c6c;
  transform: scale(1.2);
}

.like-button.liked {
  background-color: #fef0f0;
  border-color: #f56c6c;
  animation: pulse 0.6s ease-in-out;
}

.like-button.liked i {
  color: #f56c6c;
  animation: bounce 0.6s ease-in-out;
}

/* 评论按钮 */
.comment-button {
  color: #909399;
}

.comment-button i {
  color: #9c27b0;
  transition: all 0.3s ease;
  font-size: 18px;
}

.comment-button:hover {
  background-color: #f3e5f5;
  border-color: #9c27b0;
}

.comment-button:hover i {
  color: #9c27b0;
  transform: scale(1.2);
}

/* 分享按钮 */
.share-button {
  color: #909399;
}

.share-button:hover {
  background-color: #f0f9eb;
  border-color: #67c23a;
  color: #67c23a;
}

.action-count {
  font-size: 14px;
  font-weight: 500;
}

.action-text {
  font-size: 14px;
  font-weight: 500;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}

/* 发布帖子区域 */
.post-create {
  margin-top: 30px;
}

.create-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.create-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.create-content {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.create-avatar {
  border: 2px solid #667eea;
  flex-shrink: 0;
}

.create-input {
  flex: 1;
}

.post-textarea {
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
  resize: none;
}

.post-textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.create-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.post-btn {
  border-radius: 20px;
  padding: 6px 24px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border: none;
  transition: all 0.3s ease;
}

.post-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  background: linear-gradient(90deg, #764ba2, #667eea);
}

.community-sidebar {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.sidebar-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.card-header {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topic-badge {
  background-color: #f56c6c;
}

.hot-topics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.topic-item:hover {
  background-color: #f8f9fa;
  padding-left: 10px;
  border-radius: 8px;
}

.top-topic {
  background-color: #f0f5ff;
  border-radius: 8px;
  padding-left: 10px;
}

.topic-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #909399;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.top-rank {
  background-color: #f56c6c;
  box-shadow: 0 2px 4px rgba(245, 108, 108, 0.3);
}

.topic-item:hover .topic-rank {
  transform: scale(1.1);
}

.topic-title {
  flex: 1;
  font-size: 14px;
  color: #303133;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.topic-item:hover .topic-title {
  color: #667eea;
  font-weight: 500;
}

.topic-count {
  font-size: 12px;
  color: #909399;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.topic-item:hover .topic-count {
  color: #667eea;
}

/* 社区规则 */
.community-rules {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  transition: all 0.3s ease;
}

.rule-item:hover {
  background-color: #f8f9fa;
  padding-left: 10px;
  border-radius: 8px;
}

.rule-icon {
  color: #667eea;
  font-size: 16px;
  flex-shrink: 0;
}

.rule-item span {
  font-size: 14px;
  color: #606266;
  transition: color 0.3s ease;
}

.rule-item:hover span {
  color: #303133;
  font-weight: 500;
}

/* 活跃用户 */
.active-users {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.user-item:hover {
  background-color: #f8f9fa;
  padding-left: 10px;
  border-radius: 8px;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  transition: color 0.3s ease;
}

.user-item:hover .user-name {
  color: #667eea;
}

.user-posts {
  font-size: 12px;
  color: #909399;
  transition: color 0.3s ease;
}

.user-item:hover .user-posts {
  color: #667eea;
}

/* 视频播放弹窗 */
.video-dialog {
  .el-dialog__body {
    padding: 30px;
  }
}

.video-player {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-container {
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #000;
}

.video-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background-color: rgba(102, 126, 234, 0.8);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background-color: #667eea;
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
}

.video-info h4 {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.video-desc {
  margin: 0 0 15px 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.video-meta-info {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #909399;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .community-content {
    flex-direction: column;
  }
  
  .community-sidebar {
    width: 100%;
    flex-direction: row;
  }
  
  .sidebar-card {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .breakthrough-header {
    padding: 40px 20px;
  }
  
  .breakthrough-title {
    font-size: 28px;
  }
  
  .video-categories {
    padding: 0 20px;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
  
  .culture-section,
  .community-section {
    padding: 30px 20px;
  }
  
  .culture-cards {
    grid-template-columns: 1fr;
  }
  
  .community-sidebar {
    flex-direction: column;
  }
  
  .video-container {
    height: 250px;
  }
  
  .video-dialog {
    width: 90% !important;
  }
}
</style>