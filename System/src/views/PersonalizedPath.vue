<template>
  <div class="personalized-path">
    <!-- 移动端菜单遮罩层 -->
    <div v-if="isCollapse && isMobile" class="sidebar-overlay" @click="toggleCollapse"></div>
    
    <div class="path-header">
      <h2 class="path-title">个性化学习路径</h2>
      <p class="path-subtitle">根据您的学习情况，为您定制专属学习计划</p>
    </div>
    
    <!-- 学习情况分析 -->
    <div class="analysis-section">
      <h3 class="section-title">
        <i class="el-icon-data-analysis"></i> 学习情况分析
      </h3>
      <div class="analysis-content">
        <el-card class="analysis-card">
          <div class="analysis-item">
            <span class="analysis-label">当前学习水平</span>
            <span class="analysis-value">{{ currentLevel }}</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-label">已完成课程</span>
            <span class="analysis-value">{{ completedCourses }} 门</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-label">学习时长</span>
            <span class="analysis-value">{{ totalStudyHours }} 小时</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-label">擅长科目</span>
            <span class="analysis-value">{{ strongSubjects.join(', ') }}</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-label">薄弱科目</span>
            <span class="analysis-value">{{ weakSubjects.join(', ') }}</span>
          </div>
        </el-card>
      </div>
    </div>
    
    <!-- 推荐学习路径 -->
    <div class="recommended-path-section">
      <h3 class="section-title">
        <i class="el-icon-s-finished"></i> 推荐学习路径
      </h3>
      <div class="path-content">
        <div class="path-steps">
          <div 
            v-for="(step, index) in recommendedPath" 
            :key="index"
            class="path-step"
            :class="{ 'current': index === currentStepIndex, 'completed': index < currentStepIndex }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-description">{{ step.description }}</p>
              <div class="step-courses">
                <el-tag 
                  v-for="(course, courseIndex) in step.courses" 
                  :key="courseIndex"
                  class="course-tag"
                >
                  {{ course }}
                </el-tag>
              </div>
              <div class="step-actions">
                <el-button 
                  v-if="index === currentStepIndex" 
                  type="primary" 
                  @click="startStep(step)"
                >
                  开始学习
                </el-button>
                <el-button 
                  v-else-if="index < currentStepIndex" 
                  type="success" 
                  disabled
                >
                  已完成
                </el-button>
                <el-button 
                  v-else 
                  type="info" 
                  disabled
                >
                  待开始
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 学习目标设置 -->
    <div class="goals-section">
      <h3 class="section-title">
        <i class="el-icon-s-flag"></i> 学习目标设置
      </h3>
      <div class="goals-content">
        <el-card class="goals-card">
          <div class="goal-item">
            <el-checkbox v-model="goals.masterMath" label="masterMath">掌握数学基础概念</el-checkbox>
          </div>
          <div class="goal-item">
            <el-checkbox v-model="goals.improveEnglish" label="improveEnglish">提高英语听说能力</el-checkbox>
          </div>
          <div class="goal-item">
            <el-checkbox v-model="goals.exploreScience" label="exploreScience">探索科学实验</el-checkbox>
          </div>
          <div class="goal-item">
            <el-checkbox v-model="goals.enhanceCreativity" label="enhanceCreativity">增强创造力</el-checkbox>
          </div>
          <div class="goal-actions">
            <el-button type="primary" @click="saveGoals">保存目标</el-button>
            <el-button @click="resetGoals">重置</el-button>
          </div>
        </el-card>
      </div>
    </div>
    
    <!-- 学习计划日历 -->
    <div class="calendar-section">
      <h3 class="section-title">
        <i class="el-icon-date"></i> 学习计划日历
      </h3>
      <div class="calendar-content">
        <el-calendar v-model="currentDate">
          <template #dateCell="{ date, data }">
            <div class="calendar-date" :class="{ 'has-task': hasTask(date) }">
              {{ data.day }}
              <span v-if="hasTask(date)" class="task-dot"></span>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

// 移动端菜单控制
const isMobile = ref(false)
const isCollapse = ref(false)

// 检测屏幕尺寸
const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    isCollapse.value = false
  }
}

// 切换菜单
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 生命周期
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})


// 学习情况数据
const currentLevel = ref('中级')
const completedCourses = ref(5)
const totalStudyHours = ref(45)
const strongSubjects = ref(['数学', '科学'])
const weakSubjects = ref(['英语', '语文'])

// 推荐学习路径
const recommendedPath = ref([
  {
    title: '基础巩固',
    description: '巩固已学知识，打好基础',
    courses: ['数学王国大冒险', '趣味语文：童话阅读与写作', '快乐英语：日常会话']
  },
  {
    title: '能力提升',
    description: '提升学习能力，拓展知识',
    courses: ['科学小实验：探索自然', '小小数学家：趣味算术', '英语动画配音']
  },
  {
    title: '综合应用',
    description: '综合应用所学知识，解决实际问题',
    courses: ['历史故事：中华五千年', '美术天地：创意绘画', '音乐乐园：儿歌演唱']
  },
  {
    title: '创新实践',
    description: '培养创新思维，实践应用',
    courses: ['体育小健将：基础运动', '科学小实验：探索自然', '妙思创作间']
  }
])

// 当前步骤
const currentStepIndex = ref(0)

// 学习目标
const goals = ref({
  masterMath: true,
  improveEnglish: true,
  exploreScience: false,
  enhanceCreativity: false
})

// 当前日期
const currentDate = ref(new Date())

// 有任务的日期
const taskDates = ref([
  new Date(2026, 2, 10),
  new Date(2026, 2, 12),
  new Date(2026, 2, 15),
  new Date(2026, 2, 18),
  new Date(2026, 2, 20)
])

// 检查日期是否有任务
const hasTask = (date) => {
  return taskDates.value.some(taskDate => {
    return taskDate.getFullYear() === date.getFullYear() &&
           taskDate.getMonth() === date.getMonth() &&
           taskDate.getDate() === date.getDate()
  })
}

// 开始学习步骤
const startStep = (step) => {
  ElMessage.success(`开始学习：${step.title}`)
  // 这里可以添加跳转到具体课程的逻辑
}

// 保存目标
const saveGoals = () => {
  ElMessage.success('学习目标已保存')
  // 这里可以添加保存目标的逻辑
}

// 重置目标
const resetGoals = () => {
  goals.value = {
    masterMath: false,
    improveEnglish: false,
    exploreScience: false,
    enhanceCreativity: false
  }
  ElMessage.info('目标已重置')
}
</script>

<style scoped>
.personalized-path {
  padding: 20px;
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%);
}

.path-header {
  position: relative;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
}

.path-title {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 10px 0;
}

.path-subtitle {
  font-size: 16px;
  color: #606266;
  margin: 0;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e4e7ed;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #667eea);
}

.analysis-section,
.recommended-path-section,
.goals-section,
.calendar-section {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.analysis-card {
  border-radius: 8px;
}

.analysis-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.analysis-item:last-child {
  border-bottom: none;
}

.analysis-label {
  font-size: 14px;
  color: #606266;
}

.analysis-value {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.path-steps {
  position: relative;
  padding-left: 40px;
}

.path-steps::before {
  content: '';
  position: absolute;
  left: 19px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e4e7ed;
}

.path-step {
  position: relative;
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.path-step:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.path-step.current {
  background: #ecf5ff;
  border-left: 4px solid #409eff;
}

.path-step.completed {
  background: #f0f9eb;
  border-left: 4px solid #67c23a;
}

.step-number {
  position: absolute;
  left: -40px;
  top: 20px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: #606266;
  transition: all 0.3s ease;
}

.path-step.current .step-number {
  background: #409eff;
  color: white;
}

.path-step.completed .step-number {
  background: #67c23a;
  color: white;
}

.step-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 10px 0;
}

.step-description {
  font-size: 14px;
  color: #606266;
  margin: 0 0 15px 0;
}

.step-courses {
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.course-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}

.step-actions {
  display: flex;
  gap: 10px;
}

.goals-card {
  border-radius: 8px;
}

.goal-item {
  margin-bottom: 15px;
}

.goal-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.calendar-content {
  border-radius: 8px;
  overflow: hidden;
}

.calendar-date {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.calendar-date.has-task {
  background-color: #ecf5ff;
  border-radius: 4px;
}

.task-dot {
  position: absolute;
  bottom: 5px;
  width: 6px;
  height: 6px;
  background-color: #409eff;
  border-radius: 50%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .personalized-path {
    padding: 10px;
  }
  
  .path-header {
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .path-title {
    font-size: 22px;
  }
  
  .path-subtitle {
    font-size: 14px;
  }
  
  .back-button {
    top: 15px;
    left: 15px;
    padding: 6px 12px;
  }
  
  .analysis-section,
  .recommended-path-section,
  .goals-section,
  .calendar-section {
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .path-steps {
    padding-left: 30px;
  }
  
  .step-number {
    left: -30px;
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
  
  .path-step {
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .step-title {
    font-size: 16px;
  }
  
  .step-description {
    font-size: 13px;
    margin-bottom: 10px;
  }
  
  .step-courses {
    margin-bottom: 10px;
  }
  
  .course-tag {
    font-size: 12px;
    padding: 4px 8px;
  }
  
  .step-actions {
    flex-direction: column;
  }
  
  .step-actions .el-button {
    width: 100%;
  }
  
  .goal-item {
    margin-bottom: 10px;
  }
  
  .goal-actions {
    flex-direction: column;
    margin-top: 15px;
  }
  
  .goal-actions .el-button {
    width: 100%;
  }
  
  .analysis-item {
    padding: 8px 0;
  }
  
  .analysis-label,
  .analysis-value {
    font-size: 13px;
  }
  
  .calendar-content {
    font-size: 12px;
  }
  
  .calendar-date {
    padding: 5px;
  }
}

/* 小屏幕设备额外优化 */
@media (max-width: 480px) {
  .path-title {
    font-size: 20px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .step-title {
    font-size: 15px;
  }
  
  .path-step {
    padding: 12px;
  }
  
  .analysis-section,
  .recommended-path-section,
  .goals-section,
  .calendar-section {
    padding: 12px;
  }
}

/* 移动端菜单遮罩层 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>