<template>
  <div class="ai-summary-page">
    <!-- 渐变背景头部 -->
    <div class="ai-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="ai-title">知识总结</h2>
          <p class="ai-subtitle">智能整理学习内容，提炼科普知识精华</p>
        </div>
        <div class="ai-actions">
          <el-select v-model="selectedCourse" placeholder="选择课程" style="width: 200px; margin-right: 10px;">
            <el-option v-for="course in courses" :key="course.id" :label="course.title" :value="course.id"></el-option>
          </el-select>
          <el-button type="primary" @click="generateSummary">
            <i class="el-icon-refresh"></i> 生成总结
          </el-button>
          <el-button @click="exportSummary">
            <i class="el-icon-download"></i> 导出总结
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- AI总结统计卡片 -->
    <div class="ai-stats">
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon course-icon"><i class="el-icon-notebook-2"></i></div>
          <div class="stat-info">
            <div class="stat-label">课程总数</div>
            <div class="stat-value">{{ courses.length }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon summary-icon"><i class="el-icon-document"></i></div>
          <div class="stat-info">
            <div class="stat-label">总结数量</div>
            <div class="stat-value">{{ summaryHistory.length }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon keyword-icon"><i class="el-icon-collection-tag"></i></div>
          <div class="stat-info">
            <div class="stat-label">知识点数</div>
            <div class="stat-value">{{ totalKeywords }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon view-icon"><i class="el-icon-view"></i></div>
          <div class="stat-info">
            <div class="stat-label">总查看次数</div>
            <div class="stat-value">{{ totalViews }}</div>
          </div>
        </div>
      </el-card>
    </div>
    
    <el-card class="ai-summary-card" style="margin-top: 20px;">
      <div class="card-header">
        <h3 class="card-title">
          {{ currentCourse?.title || '课程' }} - 课堂核心知识点
        </h3>
        <el-tag type="success" size="small">AI 生成</el-tag>
      </div>
      
      <div class="keywords-section">
        <h4 class="section-title">核心知识点</h4>
        <div class="keywords">
          <el-tag 
            v-for="keyword in currentSummary.keywords" 
            :key="keyword" 
            closable 
            @close="removeKeyword(keyword)"
            class="keyword-tag"
          >
            {{ keyword }}
          </el-tag>
          <div v-if="currentSummary.keywords.length === 0" class="empty-keywords">
            <span class="empty-text">暂无核心知识点</span>
          </div>
        </div>
      </div>
      
      <div class="summary-section">
        <h4 class="section-title">课堂总结</h4>
        <div class="summary-content">
          <p v-for="(paragraph, index) in currentSummary.content.split('\n')" :key="index" class="summary-paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>
      
      <div class="suggestions-section">
        <h4 class="section-title">学习建议</h4>
        <ul class="suggestions-list">
          <li v-for="(suggestion, index) in currentSummary.suggestions" :key="index" class="suggestion-item">
            <div class="suggestion-icon"><i class="el-icon-check"></i></div>
            <div class="suggestion-text">{{ suggestion }}</div>
          </li>
          <li v-if="currentSummary.suggestions.length === 0" class="empty-suggestion">
            <span class="empty-text">暂无学习建议</span>
          </li>
        </ul>
      </div>
      
      <div class="summary-footer">
        <div class="summary-meta">
          <span class="meta-item">
            <i class="el-icon-time"></i> 生成时间：{{ currentSummary.generatedTime }}
          </span>
          <span class="meta-item">
            <i class="el-icon-view"></i> 查看次数：{{ currentSummary.viewCount }}
          </span>
        </div>
        <el-button size="small" @click="shareSummary" round>
          <i class="el-icon-share"></i> 分享
        </el-button>
      </div>
    </el-card>
    
    <div class="history-section" style="margin-top: 30px;">
      <div class="history-header">
        <h3 class="history-title">历史总结记录</h3>
        <el-button type="info" size="small" @click="refreshHistory">
          <i class="el-icon-s-operation"></i> 刷新记录
        </el-button>
      </div>
      <el-table :data="summaryHistory" style="width: 100%;" stripe>
        <el-table-column prop="courseTitle" label="课程" min-width="200">
          <template #default="scope">
            <span class="course-name">{{ scope.row.courseTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="generatedTime" label="生成时间" width="180" />
        <el-table-column prop="viewCount" label="查看次数" width="100">
          <template #default="scope">
            <el-tag size="small" type="info" effect="plain">{{ scope.row.viewCount }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="viewHistorySummary(scope.row)" round>
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="summaryHistory.length === 0" class="empty-history">
        <el-empty description="暂无历史总结记录" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const selectedCourse = ref('1')
const courses = ref([
  { id: '1', title: '趣味语文：童话阅读与写作' },
  { id: '2', title: '数学王国大冒险' },
  { id: '3', title: '科学实验室：自然奥秘' },
  { id: '4', title: '英语趣味启蒙' },
  { id: '5', title: '艺术创想：绘画与手工' }
])

const summaryData = ref({
  '1': {
    keywords: ['童话', '阅读', '写作', '想象力', '表达'],
    content: '本次课程带领孩子们走进了童话的世界，通过阅读经典童话故事，激发了孩子们的想象力和创造力。\n\n我们学习了如何理解童话故事的情节结构，包括开头、发展、高潮和结尾，以及如何分析故事中的角色特点和主题思想。\n\n在写作环节，孩子们尝试创作自己的童话故事，学习了如何展开想象，构建有趣的情节，塑造生动的角色，以及如何用生动的语言表达自己的想法。\n\n课程还强调了阅读的重要性，鼓励孩子们多读书、读好书，通过阅读开拓视野，增长知识。',
    suggestions: [
      '建议每天阅读一篇童话故事，培养阅读习惯',
      '尝试写日记，记录自己的想法和感受',
      '和同学分享自己喜欢的童话故事，交流阅读心得',
      '参加班级故事分享会，锻炼表达能力'
    ],
    generatedTime: '2024-01-27 10:30:00',
    viewCount: 15
  },
  '2': {
    keywords: ['数学', '游戏', '逻辑', '解决问题', '趣味'],
    content: '本次课程通过游戏和互动的方式，让孩子们感受到了数学的趣味性和实用性。\n\n我们学习了基本的数学概念，如数字、加减乘除等，通过有趣的数学游戏和竞赛，激发了孩子们的学习兴趣和竞争意识。\n\n课程还介绍了一些数学思维方法，如逻辑推理、空间想象、问题分解等，帮助孩子们培养解决问题的能力。\n\n此外，我们还学习了如何将数学知识应用到日常生活中，如购物算账、时间管理、测量等，让孩子们体会到数学的实用价值。',
    suggestions: [
      '建议每天做一些趣味数学题，保持数学思维活跃',
      '和家人一起玩数学游戏，如扑克牌、数独等',
      '观察生活中的数学现象，尝试用数学知识解释',
      '参加数学竞赛，锻炼自己的数学能力'
    ],
    generatedTime: '2024-01-26 15:45:00',
    viewCount: 12
  },
  '3': {
    keywords: ['科学', '实验', '自然', '观察', '探索'],
    content: '本次课程带领孩子们走进了科学的世界，通过有趣的科学实验，激发了孩子们的好奇心和探索精神。\n\n我们学习了一些基本的科学概念，如物质的状态变化、声音的传播、光的反射等，通过亲手做实验，观察实验现象，记录实验结果，培养了孩子们的科学探究能力。\n\n课程还介绍了一些自然现象的科学原理，如彩虹的形成、种子的发芽、昆虫的变态等，让孩子们了解自然的奥秘。\n\n此外，我们还学习了如何使用简单的科学工具，如放大镜、温度计、测力计等，提高了孩子们的动手能力。',
    suggestions: [
      '建议在家做一些安全的小实验，如种植绿豆、观察水的结冰等',
      '观察周围的自然现象，记录自己的发现',
      '阅读科普书籍，了解更多科学知识',
      '参加科学兴趣小组，和同学一起探索科学奥秘'
    ],
    generatedTime: '2024-01-25 09:20:00',
    viewCount: 18
  },
  '4': {
    keywords: ['英语', '单词', '对话', '游戏', '趣味'],
    content: '本次课程通过游戏和互动的方式，让孩子们轻松学习英语，培养了英语学习兴趣。\n\n我们学习了一些基本的英语单词，如动物、水果、颜色、数字等，通过有趣的游戏和歌曲，帮助孩子们记忆单词。\n\n在对话环节，孩子们学习了一些简单的日常用语，如问候、自我介绍、询问等，通过角色扮演和情景对话，提高了孩子们的英语口语能力。\n\n课程还介绍了一些英语国家的文化知识，如节日、饮食习惯、礼仪等，拓宽了孩子们的国际视野。',
    suggestions: [
      '建议每天听英语儿歌，培养英语语感',
      '用英语和同学打招呼，练习日常用语',
      '看英语动画片，学习地道的英语表达',
      '参加英语角活动，和更多人用英语交流'
    ],
    generatedTime: '2024-01-24 14:15:00',
    viewCount: 10
  },
  '5': {
    keywords: ['艺术', '绘画', '手工', '创造力', '表达'],
    content: '本次课程通过绘画和手工制作，激发了孩子们的创造力和艺术潜能。\n\n我们学习了一些基本的绘画技巧，如线条、色彩、构图等，通过自由创作和主题绘画，让孩子们表达自己的想法和感受。\n\n在手工制作环节，孩子们学习了如何使用简单的材料，如纸张、剪刀、胶水等，制作各种手工作品，如纸飞机、纸灯笼、贺卡等，提高了孩子们的动手能力。\n\n课程还介绍了一些艺术大师的作品和艺术风格，拓宽了孩子们的艺术视野，培养了孩子们的审美能力。',
    suggestions: [
      '建议每天进行一些艺术创作，如绘画、手工等',
      '参观当地的艺术展览，欣赏艺术作品',
      '和同学一起合作完成艺术项目，培养团队合作精神',
      '参加学校的艺术活动，展示自己的艺术才华'
    ],
    generatedTime: '2024-01-23 11:45:00',
    viewCount: 14
  }
})

const summaryHistory = ref([
  { id: 1, courseId: '1', courseTitle: '趣味语文：童话阅读与写作', generatedTime: '2024-01-27 10:30:00', viewCount: 15 },
  { id: 2, courseId: '2', courseTitle: '数学王国大冒险', generatedTime: '2024-01-26 15:45:00', viewCount: 12 },
  { id: 3, courseId: '3', courseTitle: '科学实验室：自然奥秘', generatedTime: '2024-01-25 09:20:00', viewCount: 18 },
  { id: 4, courseId: '4', courseTitle: '英语趣味启蒙', generatedTime: '2024-01-24 14:15:00', viewCount: 10 },
  { id: 5, courseId: '5', courseTitle: '艺术创想：绘画与手工', generatedTime: '2024-01-23 11:45:00', viewCount: 14 }
])

const currentCourse = computed(() => {
  return courses.value.find(course => course.id === selectedCourse.value)
})

const currentSummary = computed(() => {
  const summary = summaryData.value[selectedCourse.value]
  if (summary) {
    // 增加查看次数
    summary.viewCount++
    return summary
  }
  return {
    keywords: [],
    content: '请选择课程并生成总结',
    suggestions: [],
    generatedTime: new Date().toLocaleString(),
    viewCount: 0
  }
})

// 统计数据计算属性
const totalKeywords = computed(() => {
  let count = 0
  Object.values(summaryData.value).forEach(summary => {
    count += summary.keywords.length
  })
  return count
})

const totalViews = computed(() => {
  return summaryHistory.value.reduce((sum, history) => sum + history.viewCount, 0)
})

const generateSummary = () => {
  ElMessage.success('AI总结已生成')
  // 这里可以添加生成总结的逻辑
}

const exportSummary = () => {
  ElMessage.success('总结已导出')
  // 这里可以添加导出总结的逻辑
}

const shareSummary = () => {
  ElMessage.success('总结分享链接已复制到剪贴板')
  // 这里可以添加分享总结的逻辑
}

const removeKeyword = (keyword) => {
  const index = currentSummary.value.keywords.indexOf(keyword)
  if (index !== -1) {
    currentSummary.value.keywords.splice(index, 1)
    ElMessage.success('知识点已移除')
  }
}

const viewHistorySummary = (historyItem) => {
  selectedCourse.value = historyItem.courseId
  ElMessage.info(`查看历史总结：${historyItem.courseTitle}`)
}

const refreshHistory = () => {
  ElMessage.success('历史记录已刷新')
  // 这里可以添加刷新历史记录的逻辑
}
</script>

<style scoped>
.ai-summary-page {
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* 渐变背景头部 */
.ai-header {
  position: relative;
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  color: white;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ai-title {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.ai-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.ai-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai-actions .el-button {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.ai-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ai-actions .el-select {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.ai-actions .el-select:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.ai-actions .el-select .el-input__inner {
  color: white;
}

.ai-actions .el-select .el-input__icon {
  color: white;
}

/* AI总结统计卡片 */
.ai-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1;
  min-width: 200px;
  border-radius: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
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
}

.course-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.summary-icon {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.keyword-icon {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.view-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

/* AI总结卡片 */
.ai-summary-card {
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.ai-summary-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #303133;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 20px 0;
  color: #303133;
  position: relative;
  padding-left: 12px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.keywords-section {
  margin-bottom: 30px;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.keyword-tag {
  transition: all 0.3s ease;
  border-radius: 16px;
  padding: 4px 12px;
}

.keyword-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.empty-keywords {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
  text-align: center;
  width: 100%;
}

.empty-text {
  color: #909399;
  font-size: 14px;
}

.summary-section {
  margin-bottom: 30px;
}

.summary-content {
  line-height: 1.8;
  color: #606266;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.summary-paragraph {
  margin: 0 0 12px 0;
  text-indent: 2em;
}

.summary-paragraph:last-child {
  margin-bottom: 0;
}

.suggestions-section {
  margin-bottom: 30px;
}

.suggestions-list {
  margin: 0;
  padding-left: 0;
  color: #606266;
  list-style: none;
}

.suggestion-item {
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.suggestion-icon {
  margin-right: 12px;
  margin-top: 2px;
  flex-shrink: 0;
}

.suggestion-icon i {
  color: #67c23a;
  font-size: 16px;
}

.suggestion-text {
  flex: 1;
  line-height: 1.5;
}

.empty-suggestion {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 0;
}

.summary-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
  color: #909399;
  font-size: 14px;
  flex-wrap: wrap;
  gap: 12px;
}

.summary-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 历史总结记录 */
.history-section {
  margin-top: 30px;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.history-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #303133;
  position: relative;
  padding-left: 16px;
}

.history-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.history-section .el-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.history-section .el-table__header-wrapper th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.course-name {
  font-weight: 500;
  color: #303133;
  transition: color 0.3s ease;
}

.course-name:hover {
  color: #409eff;
  text-decoration: underline;
}

.empty-history {
  margin-top: 40px;
  text-align: center;
  padding: 40px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ai-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .ai-actions {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .ai-actions .el-select {
    width: 100% !important;
    margin-right: 0 !important;
  }
  
  .ai-actions .el-button {
    flex: 1;
    min-width: 120px;
  }
  
  .ai-stats {
    flex-direction: column;
  }
  
  .stat-card {
    min-width: 100%;
  }
  
  .summary-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .summary-meta {
    gap: 16px;
  }
  
  .history-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>