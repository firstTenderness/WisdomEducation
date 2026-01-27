<template>
  <div class="ai-summary-page">
    <!-- 渐变背景头部 -->
    <div class="ai-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="ai-title">AI课堂总结</h2>
          <p class="ai-subtitle">智能分析课堂内容，提取核心知识点</p>
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
  { id: '1', title: 'JavaScript基础入门' },
  { id: '2', title: 'Python数据分析' },
  { id: '3', title: 'Vue3从入门到精通' },
  { id: '4', title: 'React高级开发' },
  { id: '5', title: '数据库原理与应用' }
])

const summaryData = ref({
  '1': {
    keywords: ['JavaScript', '变量', '数据类型', '函数', '闭包'],
    content: '本次课程主要讲解了JavaScript的基础知识，包括变量的定义与使用、常见的数据类型（字符串、数字、布尔值、数组、对象等）、函数的声明与调用方式，以及JavaScript中特有的闭包概念。\n\n通过实例演示，我们学习了如何在实际开发中应用这些知识点，特别是闭包的使用场景和注意事项。闭包可以帮助我们实现数据私有化，避免全局变量污染，同时也是许多设计模式的基础。\n\n课程还强调了代码规范的重要性，包括变量命名、代码缩进、注释添加等方面的最佳实践。良好的代码规范可以提高代码的可读性和可维护性。',
    suggestions: [
      '建议多做一些变量和数据类型的练习题，巩固基础知识',
      '尝试编写一些简单的函数，理解函数的参数传递和返回值',
      '深入理解闭包的概念，尝试在实际项目中应用',
      '养成良好的代码规范习惯，提高代码质量'
    ],
    generatedTime: '2024-01-27 10:30:00',
    viewCount: 5
  },
  '2': {
    keywords: ['Python', '数据分析', 'NumPy', 'Pandas', 'Matplotlib'],
    content: '本次课程介绍了Python在数据分析领域的应用，主要讲解了三个核心库：NumPy、Pandas和Matplotlib。\n\nNumPy是Python中用于科学计算的核心库，提供了高效的多维数组操作和数学函数。我们学习了如何创建NumPy数组、进行数组运算，以及使用NumPy的广播机制。\n\nPandas是基于NumPy构建的数据分析库，提供了DataFrame和Series等数据结构，非常适合处理结构化数据。我们学习了如何读取数据、数据清洗、数据转换和数据聚合等操作。\n\nMatplotlib是Python中最常用的绘图库，可以创建各种类型的图表。我们学习了如何绘制折线图、柱状图、散点图等，并对图表进行美化。',
    suggestions: [
      '建议安装Anaconda，它包含了数据分析所需的所有库',
      '尝试使用Pandas处理一些实际的数据集，熟悉数据操作',
      '练习使用Matplotlib创建各种类型的图表，提高数据可视化能力',
      '学习一些数据分析的实战案例，积累项目经验'
    ],
    generatedTime: '2024-01-26 15:45:00',
    viewCount: 3
  },
  '3': {
    keywords: ['Vue3', 'Composition API', '响应式', '组件', '生命周期'],
    content: '本次课程主要讲解了Vue3的核心特性，特别是Composition API的使用。\n\nComposition API是Vue3中引入的新特性，它提供了一种更灵活的方式来组织组件逻辑。我们学习了如何使用setup函数、ref和reactive创建响应式数据，以及如何使用computed和watch进行计算和监听。\n\n课程还介绍了Vue3的组件系统，包括组件的定义、 props的传递、事件的触发与监听等。我们通过实例演示了如何创建可复用的组件。\n\n此外，我们还学习了Vue3的生命周期钩子函数，以及如何在Composition API中使用它们。生命周期钩子函数可以帮助我们在组件的不同阶段执行相应的逻辑。',
    suggestions: [
      '建议先熟悉Vue2的基础知识，再学习Vue3',
      '尝试使用Composition API重构一些Vue2的组件，体会其优势',
      '学习Vue3的路由和状态管理，构建完整的应用',
      '关注Vue3的性能优化技巧，提高应用的运行效率'
    ],
    generatedTime: '2024-01-25 09:20:00',
    viewCount: 7
  },
  '4': {
    keywords: ['React', 'Hooks', '状态管理', '性能优化', '路由'],
    content: '本次课程深入讲解了React的高级特性，包括Hooks、状态管理、性能优化和路由等。\n\nHooks是React 16.8中引入的新特性，它允许我们在函数组件中使用状态和其他React特性。我们学习了useState、useEffect、useContext等常用Hooks的使用方法和最佳实践。\n\n课程还介绍了React的状态管理方案，包括Context API和第三方库（如Redux）。我们学习了如何在不同组件之间共享状态，以及如何管理复杂的应用状态。\n\n此外，我们还学习了React的性能优化技巧，如使用memo、useMemo和useCallback来避免不必要的渲染，以及如何使用React DevTools进行性能分析。',
    suggestions: [
      '建议先掌握React的基础知识，再学习高级特性',
      '多练习使用Hooks，理解其设计理念和使用场景',
      '学习一些React的设计模式，如高阶组件、渲染属性等',
      '关注React的最新发展，如Concurrent Mode和Suspense'
    ],
    generatedTime: '2024-01-24 14:15:00',
    viewCount: 4
  },
  '5': {
    keywords: ['数据库', 'SQL', '索引', '事务', '优化'],
    content: '本次课程主要讲解了数据库的基本原理和应用，重点介绍了SQL语言和数据库优化。\n\nSQL是结构化查询语言，是操作关系型数据库的标准语言。我们学习了如何使用SQL进行数据查询、插入、更新和删除操作，以及如何使用聚合函数、分组和排序等高级查询功能。\n\n课程还介绍了数据库索引的原理和使用方法。索引可以大大提高查询性能，但也会增加插入、更新和删除操作的开销。我们学习了如何根据实际情况选择合适的索引策略。\n\n此外，我们还学习了数据库事务的概念和ACID特性，以及如何使用事务来保证数据的一致性和完整性。',
    suggestions: [
      '建议多做一些SQL练习题，熟悉SQL语法',
      '尝试设计一些简单的数据库 schema，理解数据库设计原则',
      '学习数据库的备份和恢复策略，保证数据安全',
      '关注NoSQL数据库的发展，了解其适用场景'
    ],
    generatedTime: '2024-01-23 11:45:00',
    viewCount: 2
  }
})

const summaryHistory = ref([
  { id: 1, courseId: '1', courseTitle: 'JavaScript基础入门', generatedTime: '2024-01-27 10:30:00', viewCount: 5 },
  { id: 2, courseId: '2', courseTitle: 'Python数据分析', generatedTime: '2024-01-26 15:45:00', viewCount: 3 },
  { id: 3, courseId: '3', courseTitle: 'Vue3从入门到精通', generatedTime: '2024-01-25 09:20:00', viewCount: 7 },
  { id: 4, courseId: '4', courseTitle: 'React高级开发', generatedTime: '2024-01-24 14:15:00', viewCount: 4 },
  { id: 5, courseId: '5', courseTitle: '数据库原理与应用', generatedTime: '2024-01-23 11:45:00', viewCount: 2 }
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