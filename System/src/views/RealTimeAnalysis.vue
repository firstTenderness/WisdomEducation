<template>
  <div class="real-time-analysis">
    <div class="analysis-header">
      <h2 class="analysis-title">实时学习分析</h2>
      <p class="analysis-subtitle">全方位掌握学习状态，及时调整学习策略</p>
    </div>
    
    <!-- 学习概览卡片 -->
    <div class="overview-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="overview-card active">
            <div class="card-icon study-time-icon"><i class="el-icon-time"></i></div>
            <div class="card-info">
              <div class="card-value">{{ todayStudyTime }}h</div>
              <div class="card-label">今日学习时长</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="overview-card">
            <div class="card-icon course-icon"><i class="el-icon-menu"></i></div>
            <div class="card-info">
              <div class="card-value">{{ completedToday }}</div>
              <div class="card-label">今日完成课程</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="overview-card">
            <div class="card-icon progress-icon"><i class="el-icon-data-line"></i></div>
            <div class="card-info">
              <div class="card-value">{{ weekProgress }}%</div>
              <div class="card-label">本周学习进度</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="overview-card">
            <div class="card-icon focus-icon"><i class="el-icon-view"></i></div>
            <div class="card-info">
              <div class="card-value">{{ focusScore }}</div>
              <div class="card-label">专注度评分</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <!-- 学习趋势图表 -->
    <div class="chart-container">
      <el-card class="chart-card">
        <template #header>
          <div class="chart-header">
            <span>学习趋势分析</span>
            <el-select v-model="chartPeriod" placeholder="选择周期">
              <el-option label="近7天" value="7"></el-option>
              <el-option label="近30天" value="30"></el-option>
              <el-option label="近90天" value="90"></el-option>
            </el-select>
          </div>
        </template>
        <div class="chart-content">
          <div ref="trendChartRef" class="chart"></div>
        </div>
      </el-card>
    </div>
    
    <!-- 学科分析 -->
    <div class="subject-analysis">
      <h3 class="section-title">学科学习分析</h3>
      <div class="subject-cards">
        <el-card 
          v-for="subject in subjectData" 
          :key="subject.name"
          class="subject-card"
          :class="{ 'weak-subject': subject.isWeak }"
        >
          <div class="subject-header">
            <div class="subject-icon" :style="{ backgroundColor: subject.color }">{{ subject.icon }}</div>
            <div class="subject-info">
              <h4 class="subject-name">{{ subject.name }}</h4>
              <p class="subject-progress">{{ subject.progress }}% 完成</p>
            </div>
            <el-button 
              type="primary" 
              size="small" 
              @click="viewSubjectDetail(subject)"
            >
              查看详情
            </el-button>
          </div>
          <div class="subject-stats">
            <div class="stat-item">
              <span class="stat-value">{{ subject.studyHours }}h</span>
              <span class="stat-label">学习时长</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ subject.completedCourses }}</span>
              <span class="stat-label">完成课程</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ subject.averageScore }}</span>
              <span class="stat-label">平均成绩</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <!-- 学习行为分析 -->
    <div class="behavior-analysis">
      <h3 class="section-title">学习行为分析</h3>
      <div class="behavior-cards">
        <el-card class="behavior-card">
          <div class="behavior-header">
            <h4>学习时段分布</h4>
          </div>
          <div class="behavior-content">
            <div ref="timeDistributionChartRef" class="chart"></div>
          </div>
        </el-card>
        <el-card class="behavior-card">
          <div class="behavior-header">
            <h4>学习方式偏好</h4>
          </div>
          <div class="behavior-content">
            <div ref="learningMethodChartRef" class="chart"></div>
          </div>
        </el-card>
      </div>
    </div>
    
    <!-- 学习建议 -->
    <div class="learning-suggestions">
      <h3 class="section-title">智能学习建议</h3>
      <div class="suggestion-list">
        <el-card 
          v-for="(suggestion, index) in suggestions" 
          :key="index"
          class="suggestion-card"
        >
          <div class="suggestion-content">
            <div class="suggestion-icon" :class="suggestion.type">
              <i :class="suggestion.icon"></i>
            </div>
            <div class="suggestion-info">
              <h4 class="suggestion-title">{{ suggestion.title }}</h4>
              <p class="suggestion-desc">{{ suggestion.description }}</p>
              <el-button 
                type="primary" 
                size="small" 
                @click="applySuggestion(suggestion)"
                v-if="suggestion.action"
              >
                {{ suggestion.action }}
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <!-- 详细数据表格 -->
    <div class="detailed-data">
      <h3 class="section-title">详细学习数据</h3>
      <el-table :data="detailedData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="120"></el-table-column>
        <el-table-column prop="course" label="课程" width="180"></el-table-column>
        <el-table-column prop="duration" label="学习时长(h)" width="120"></el-table-column>
        <el-table-column prop="progress" label="完成度(%)" width="120">
          <template #default="scope">
            <el-progress 
              :percentage="scope.row.progress" 
              :stroke-width="8"
              :color="getProgressColor(scope.row.progress)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="score" label="测试成绩" width="120"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'completed' ? 'success' : 'info'">{{ scope.row.status === 'completed' ? '已完成' : '进行中' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()


// 响应式数据
const chartPeriod = ref('7')
const trendChartRef = ref(null)
const timeDistributionChartRef = ref(null)
const learningMethodChartRef = ref(null)
const trendChart = ref(null)
const timeDistributionChart = ref(null)
const learningMethodChart = ref(null)

// 模拟数据
const todayStudyTime = ref(3.5)
const completedToday = ref(2)
const weekProgress = ref(65)
const focusScore = ref(85)

const subjectData = ref([
  {
    name: '数学',
    icon: '数',
    color: '#409eff',
    progress: 75,
    studyHours: 12,
    completedCourses: 4,
    averageScore: 85,
    isWeak: false
  },
  {
    name: '语文',
    icon: '语',
    color: '#67c23a',
    progress: 80,
    studyHours: 10,
    completedCourses: 3,
    averageScore: 90,
    isWeak: false
  },
  {
    name: '英语',
    icon: '英',
    color: '#e6a23c',
    progress: 60,
    studyHours: 8,
    completedCourses: 2,
    averageScore: 75,
    isWeak: true
  },
  {
    name: '物理',
    icon: '物',
    color: '#f56c6c',
    progress: 65,
    studyHours: 9,
    completedCourses: 3,
    averageScore: 80,
    isWeak: false
  }
])

const suggestions = ref([
  {
    type: 'warning',
    icon: 'el-icon-warning',
    title: '英语学习时间不足',
    description: '您的英语学习时间明显少于其他学科，建议增加英语学习时间至少2小时/天。',
    action: '制定学习计划'
  },
  {
    type: 'success',
    icon: 'el-icon-success',
    title: '数学学习效果良好',
    description: '您的数学学习进度和成绩都很优秀，继续保持这种学习状态。',
    action: null
  },
  {
    type: 'info',
    icon: 'el-icon-info',
    title: '建议调整学习时间',
    description: '您在深夜学习的时间较长，建议调整为白天学习，提高学习效率。',
    action: '调整学习计划'
  }
])

const detailedData = ref([
  {
    date: '2026-01-20',
    course: '数学王国大冒险',
    duration: 1.5,
    progress: 85,
    score: 90,
    status: 'completed'
  },
  {
    date: '2026-01-20',
    course: '趣味语文：童话阅读与写作',
    duration: 2.0,
    progress: 60,
    score: 85,
    status: 'completed'
  },
  {
    date: '2026-01-19',
    course: '快乐英语：日常会话',
    duration: 1.0,
    progress: 45,
    score: 75,
    status: 'in_progress'
  },
  {
    date: '2026-01-19',
    course: '科学小实验：探索自然',
    duration: 1.5,
    progress: 70,
    score: 82,
    status: 'in_progress'
  },
  {
    date: '2026-01-18',
    course: '数学王国大冒险',
    duration: 2.0,
    progress: 75,
    score: 88,
    status: 'in_progress'
  }
])

// 计算属性
const chartData = computed(() => {
  const days = parseInt(chartPeriod.value)
  const data = []
  const dates = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`)
    data.push(Math.floor(Math.random() * 4) + 1) // 1-5小时随机
  }
  
  return { dates, data }
})

// 方法
const getProgressColor = (progress) => {
  if (progress < 30) return '#f56c6c'
  if (progress < 70) return '#e6a23c'
  return '#67c23a'
}

const viewSubjectDetail = (subject) => {
  ElMessage.success(`查看${subject.name}学科详情`)
  // 这里可以添加查看学科详情的逻辑
}

const applySuggestion = (suggestion) => {
  ElMessage.success(`应用建议：${suggestion.title}`)
  // 这里可以添加应用建议的逻辑
}

const initCharts = () => {
  // 学习趋势图表
  if (trendChartRef.value) {
    trendChart.value = echarts.init(trendChartRef.value)
    const { dates, data } = chartData.value
    
    trendChart.value.setOption({
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}小时'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates
      },
      yAxis: {
        type: 'value',
        name: '学习时长(小时)',
        min: 0,
        max: 5
      },
      series: [
        {
          name: '学习时长',
          type: 'line',
          stack: 'Total',
          data: data,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(64, 158, 255, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(64, 158, 255, 0.1)'
              }
            ])
          },
          lineStyle: {
            color: '#409eff'
          },
          itemStyle: {
            color: '#409eff'
          }
        }
      ]
    })
  }
  
  // 学习时段分布图表
  if (timeDistributionChartRef.value) {
    timeDistributionChart.value = echarts.init(timeDistributionChartRef.value)
    timeDistributionChart.value.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '学习时段',
          type: 'pie',
          radius: '60%',
          data: [
            { value: 30, name: '上午' },
            { value: 40, name: '下午' },
            { value: 20, name: '晚上' },
            { value: 10, name: '深夜' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  
  // 学习方式偏好图表
  if (learningMethodChartRef.value) {
    learningMethodChart.value = echarts.init(learningMethodChartRef.value)
    learningMethodChart.value.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '学习方式',
          type: 'pie',
          radius: '60%',
          data: [
            { value: 45, name: '视频学习' },
            { value: 25, name: '练习做题' },
            { value: 20, name: '阅读资料' },
            { value: 10, name: '互动讨论' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
}

const resizeCharts = () => {
  trendChart.value?.resize()
  timeDistributionChart.value?.resize()
  learningMethodChart.value?.resize()
}

// 生命周期
onMounted(() => {
  initCharts()
  window.addEventListener('resize', resizeCharts)
})
</script>

<style scoped>
.real-time-analysis {
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%);
}

.analysis-header {
  position: relative;
  text-align: center;
  margin-bottom: 30px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  border-color: white;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: white;
  color: white;
}

.analysis-title {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.analysis-subtitle {
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
}

.overview-cards {
  margin-bottom: 30px;
}

.overview-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.overview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.overview-card.active {
  border: 2px solid #409eff;
}

.overview-card .el-card__body {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
}

.card-icon {
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

.card-icon.study-time-icon {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.card-icon.course-icon {
  background: linear-gradient(135deg, #67c23a, #85ce61);
}

.card-icon.progress-icon {
  background: linear-gradient(135deg, #e6a23c, #ebb563);
}

.card-icon.focus-icon {
  background: linear-gradient(135deg, #f56c6c, #f78989);
}

.card-info {
  flex: 1;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.card-label {
  font-size: 14px;
  color: #606266;
  margin: 5px 0 0 0;
}

.chart-container {
  margin-bottom: 30px;
}

.chart-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.chart-content {
  padding: 20px;
}

.chart {
  width: 100%;
  height: 400px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #e4e7ed;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, #409eff, #667eea);
}

.subject-analysis {
  margin-bottom: 30px;
}

.subject-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.subject-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.subject-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.subject-card.weak-subject {
  border: 2px solid #f56c6c;
}

.subject-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 15px;
}

.subject-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.subject-info {
  flex: 1;
}

.subject-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #303133;
}

.subject-progress {
  font-size: 14px;
  color: #606266;
  margin: 0;
}

.subject-stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat-item {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  color: #606266;
}

.behavior-analysis {
  margin-bottom: 30px;
}

.behavior-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
}

.behavior-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.behavior-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e4e7ed;
}

.behavior-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.behavior-content {
  padding: 20px;
}

.learning-suggestions {
  margin-bottom: 30px;
}

.suggestion-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.suggestion-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.suggestion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.suggestion-content {
  display: flex;
  gap: 15px;
  padding: 20px;
}

.suggestion-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  flex-shrink: 0;
}

.suggestion-icon.warning {
  background: linear-gradient(135deg, #e6a23c, #ebb563);
}

.suggestion-icon.success {
  background: linear-gradient(135deg, #67c23a, #85ce61);
}

.suggestion-icon.info {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.suggestion-info {
  flex: 1;
}

.suggestion-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #303133;
}

.suggestion-desc {
  font-size: 14px;
  color: #606266;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.detailed-data {
  margin-bottom: 30px;
}

.detailed-data .el-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.detailed-data .el-table th {
  background-color: #f5f7fa;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .real-time-analysis {
    padding: 10px;
  }
  
  .analysis-header {
    padding: 30px 15px;
  }
  
  .analysis-title {
    font-size: 24px;
  }
  
  .analysis-subtitle {
    font-size: 14px;
  }
  
  .back-button {
    top: 15px;
    left: 15px;
  }
  
  .overview-cards .el-row {
    margin-left: -10px;
    margin-right: -10px;
  }
  
  .overview-cards .el-col {
    width: 50%;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 15px;
  }
  
  .overview-card .el-card__body {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
  
  .card-icon {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
  
  .card-value {
    font-size: 20px;
  }
  
  .card-label {
    font-size: 12px;
  }
  
  .chart {
    height: 250px;
  }
  
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .section-title {
    font-size: 18px;
  }
  
  .subject-cards,
  .behavior-cards,
  .suggestion-list {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .subject-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .subject-name {
    font-size: 16px;
  }
  
  .subject-stats {
    flex-direction: column;
    gap: 10px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .suggestion-content {
    flex-direction: column;
    text-align: center;
  }
  
  .suggestion-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .suggestion-title {
    font-size: 14px;
  }
  
  .suggestion-desc {
    font-size: 13px;
  }
  
  .detailed-data .el-table {
    font-size: 12px;
  }
  
  .detailed-data .el-table th,
  .detailed-data .el-table td {
    padding: 8px;
  }
  
  /* 确保表格在移动端可滚动 */
  .detailed-data {
    overflow-x: auto;
  }
  
  .detailed-data table {
    min-width: 600px;
  }
}
</style>