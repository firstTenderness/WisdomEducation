<template>
  <div class="course-page">
    <div class="course-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="course-title">我的课程</h2>
          <p class="course-subtitle">探索知识的海洋，开启学习之旅</p>
        </div>
        <div class="course-actions">
          <el-select v-model="selectedCategory" placeholder="按分类筛选" style="width: 150px; margin-right: 10px;">
            <el-option label="全部" value="all"></el-option>
            <el-option v-for="category in categories" :key="category" :label="category" :value="category"></el-option>
          </el-select>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索课程"
            prefix-icon="el-icon-search"
            style="width: 200px; margin-right: 10px;"
            clearable
          />
          <el-button type="primary" @click="refreshCourses">
            <i class="el-icon-refresh"></i> 刷新
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 学习统计卡片 -->
    <div class="stats-container">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-icon course-icon"><i class="el-icon-menu"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ courses.length }}</div>
              <div class="stat-label">总课程数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-icon progress-icon"><i class="el-icon-data-line"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ completedCourses }}</div>
              <div class="stat-label">已完成课程</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-icon study-icon"><i class="el-icon-time"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ totalStudyHours }}h</div>
              <div class="stat-label">总学习时长</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-icon average-icon"><i class="el-icon-star-on"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ averageProgress }}%</div>
              <div class="stat-label">平均完成率</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="course-grid">
      <el-row :gutter="20">
        <el-col :span="6" v-for="course in filteredCourses" :key="course.id">
          <el-card :body-style="{ padding: 0 }" class="course-card">
            <div class="course-cover">
              <img :src="course.cover" alt="课程封面" />
              <div class="course-badge" :class="course.level">
                {{ course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级' }}
              </div>
              <div class="course-category">{{ course.category }}</div>
            </div>
            <div class="course-content">
              <h3 class="course-name">{{ course.title }}</h3>
              <p class="course-teacher">讲师：{{ course.teacher }}</p>
              <div class="course-progress">
                <el-progress 
                  :percentage="course.progress" 
                  :stroke-width="6"
                  :color="getProgressColor(course.progress)"
                />
                <p class="course-progress-text">
                  已学 {{ course.finished }} / 共 {{ course.total }} 课时
                </p>
              </div>
              <div class="course-footer">
                <el-button type="primary" size="small" @click="enterCourse(course)">
                  进入学习
                </el-button>
                <el-button size="small" @click="viewCourseDetail(course)">
                  查看详情
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div v-if="filteredCourses.length === 0" class="empty-courses">
      <div class="empty-content">
        <div class="empty-icon"><i class="el-icon-reading"></i></div>
        <h3 class="empty-title">暂无课程</h3>
        <p class="empty-description">快去发现感兴趣的课程吧！</p>
        <el-button type="primary" @click="refreshCourses">
          <i class="el-icon-refresh"></i> 刷新课程
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const selectedCategory = ref('all')
const courses = ref([
  {
    id: 1,
    title: 'JavaScript基础入门',
    teacher: '张老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20programming%20course%20cover%20with%20JavaScript%20logo%20and%20code%20symbols&image_size=square',
    progress: 44,
    finished: 2,
    total: 16,
    level: 'beginner',
    category: '编程'
  },
  {
    id: 2,
    title: 'Python数据分析',
    teacher: '王老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20data%20analysis%20course%20cover%20with%20Python%20logo%20and%20charts&image_size=square',
    progress: 98,
    finished: 19,
    total: 19,
    level: 'intermediate',
    category: '数据分析'
  },
  {
    id: 3,
    title: 'HTML5 & CSS3 实战',
    teacher: '李老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20development%20course%20cover%20with%20HTML5%20and%20CSS3%20logos&image_size=square',
    progress: 15,
    finished: 3,
    total: 18,
    level: 'beginner',
    category: '前端'
  },
  {
    id: 4,
    title: 'Vue3 从入门到精通',
    teacher: '刘老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20Vue.js%20course%20cover%20with%20Vue%20logo%20and%20modern%20UI&image_size=square',
    progress: 45,
    finished: 2,
    total: 12,
    level: 'intermediate',
    category: '前端'
  },
  {
    id: 5,
    title: 'React 高级开发',
    teacher: '陈老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20React%20course%20cover%20with%20React%20logo%20and%20components&image_size=square',
    progress: 54,
    finished: 8,
    total: 17,
    level: 'advanced',
    category: '前端'
  },
  {
    id: 6,
    title: 'Node.js 后端开发',
    teacher: '赵老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20Node.js%20course%20cover%20with%20Node.js%20logo%20and%20server%20icons&image_size=square',
    progress: 17,
    finished: 3,
    total: 19,
    level: 'intermediate',
    category: '后端'
  },
  {
    id: 7,
    title: '数据库原理与应用',
    teacher: '周老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20database%20course%20cover%20with%20database%20icons%20and%20tables&image_size=square',
    progress: 71,
    finished: 14,
    total: 19,
    level: 'intermediate',
    category: '数据库'
  },
  {
    id: 8,
    title: '人工智能基础',
    teacher: '吴老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20artificial%20intelligence%20course%20cover%20with%20AI%20symbols&image_size=square',
    progress: 97,
    finished: 14,
    total: 15,
    level: 'advanced',
    category: 'AI'
  },
  {
    id: 9,
    title: '数据结构与算法',
    teacher: '郑老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20data%20structures%20and%20algorithms%20course%20cover%20with%20graphs&image_size=square',
    progress: 0,
    finished: 0,
    total: 20,
    level: 'intermediate',
    category: '计算机基础'
  },
  {
    id: 10,
    title: '网络安全基础',
    teacher: '孙老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20network%20security%20course%20cover%20with%20security%20icons&image_size=square',
    progress: 0,
    finished: 0,
    total: 18,
    level: 'beginner',
    category: '网络'
  }
])

const categories = computed(() => {
  const categorySet = new Set(courses.value.map(course => course.category))
  return Array.from(categorySet)
})

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesCategory = selectedCategory.value === 'all' || course.category === selectedCategory.value
    const matchesSearch = !searchKeyword.value || 
      course.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchKeyword.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const completedCourses = computed(() => {
  return courses.value.filter(course => course.progress >= 100).length
})

const totalStudyHours = computed(() => {
  const totalHours = courses.value.reduce((sum, course) => {
    return sum + (course.finished * 45 / 60) // 假设每课时45分钟
  }, 0)
  return Math.round(totalHours)
})

const averageProgress = computed(() => {
  if (courses.value.length === 0) return 0
  const totalProgress = courses.value.reduce((sum, course) => sum + course.progress, 0)
  return Math.round(totalProgress / courses.value.length)
})

const getProgressColor = (progress) => {
  if (progress < 30) return '#f56c6c'
  if (progress < 70) return '#e6a23c'
  return '#67c23a'
}

const enterCourse = (course) => {
  ElMessage.success(`正在进入课程：${course.title}`)
  // 这里可以添加跳转到课程详情页的逻辑
}

const viewCourseDetail = (course) => {
  ElMessage.info(`查看课程详情：${course.title}`)
  // 这里可以添加打开课程详情对话框的逻辑
}

const refreshCourses = () => {
  // 模拟刷新课程列表
  ElMessage.success('课程列表已刷新')
}
</script>

<style scoped>
.course-page {
  padding: 0;
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%);
  position: relative;
}

.course-header {
  position: relative;
  overflow: hidden;
  padding: 40px 30px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20education%20background%20with%20light%20blue%20gradient&image_size=landscape_16_9') center/cover;
  opacity: 0.2;
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-left {
  flex: 1;
}

.course-title {
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.course-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.course-actions {
  display: flex;
  gap: 10px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stats-container {
  padding: 0 30px;
  margin-top: -30px;
  position: relative;
  z-index: 3;
}

.stat-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.stat-card .el-card__body {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-icon.course-icon {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.stat-icon.progress-icon {
  background: linear-gradient(135deg, #67c23a, #85ce61);
}

.stat-icon.study-icon {
  background: linear-gradient(135deg, #e6a23c, #ebb563);
}

.stat-icon.average-icon {
  background: linear-gradient(135deg, #f56c6c, #f78989);
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.stat-label {
  font-size: 14px;
  color: #606266;
  margin: 5px 0 0 0;
}

.course-grid {
  padding: 30px;
  margin-top: 20px;
}

.course-card {
  transition: all 0.3s ease;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.course-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.course-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.course-card:hover .course-cover img {
  transform: scale(1.1);
}

.course-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.course-card:hover .course-badge {
  transform: scale(1.05);
}

.course-badge.beginner {
  background-color: #67c23a;
}

.course-badge.intermediate {
  background-color: #e6a23c;
}

.course-badge.advanced {
  background-color: #f56c6c;
}

.course-category {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  font-size: 12px;
  font-weight: 500;
}

.course-content {
  padding: 20px;
}

.course-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 12px 0;
  color: #303133;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-teacher {
  font-size: 14px;
  color: #606266;
  margin: 0 0 18px 0;
  display: flex;
  align-items: center;
}

.course-teacher::before {
  content: '👨‍🏫';
  margin-right: 8px;
}

.course-progress {
  margin: 0 0 18px 0;
}

.course-progress-text {
  font-size: 12px;
  color: #909399;
  margin: 10px 0 0 0;
  text-align: right;
  font-weight: 500;
}

.course-footer {
  display: flex;
  gap: 10px;
}

.course-footer .el-button {
  flex: 1;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.course-footer .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.empty-courses {
  margin-top: 80px;
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 30px;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.empty-icon {
  font-size: 64px;
  color: #dcdfe6;
  margin-bottom: 20px;
}

.empty-title {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.empty-description {
  font-size: 14px;
  color: #909399;
  margin: 0;
  max-width: 400px;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .course-header {
    padding: 30px 20px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .course-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .stats-container {
    padding: 0 20px;
  }
  
  .stat-card .el-card__body {
    padding: 15px;
    gap: 15px;
  }
  
  .stat-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .course-grid {
    padding: 20px;
  }
  
  .course-cover {
    height: 140px;
  }
  
  .course-content {
    padding: 15px;
  }
  
  .course-name {
    font-size: 16px;
  }
}
</style>