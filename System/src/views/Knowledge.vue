<template>
  <div class="knowledge-page">
    <!-- 渐变背景头部 -->
    <div class="knowledge-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">

          <h2 class="knowledge-title">知识总结</h2>
          <p class="knowledge-subtitle">智能整理学习内容，提炼知识精华</p>
        </div>
        <div class="knowledge-actions">
          <el-select v-model="selectedCourse" placeholder="选择课程" style="width: 200px; margin-right: 12px;">
            <el-option label="趣味语文：童话阅读与写作" value="chinese"></el-option>
            <el-option label="趣味数学：生活中的数学" value="math"></el-option>
            <el-option label="趣味英语：日常会话" value="english"></el-option>
            <el-option label="趣味科学：自然探索" value="science"></el-option>
            <el-option label="趣味历史：古代文明" value="history"></el-option>
          </el-select>
          <el-button type="primary" @click="generateSummary">
            <i class="el-icon-data-analysis"></i> 生成总结
          </el-button>
          <el-button type="primary" @click="exportSummary">
            <i class="el-icon-download"></i> 导出总结
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 知识统计卡片 -->
    <div class="knowledge-stats">
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon course-icon"><i class="el-icon-notebook-2"></i></div>
          <div class="stat-info">
            <div class="stat-label">课程总数</div>
            <div class="stat-value">{{ stats.courseCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon summary-icon"><i class="el-icon-document"></i></div>
          <div class="stat-info">
            <div class="stat-label">总结数量</div>
            <div class="stat-value">{{ stats.summaryCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon knowledge-icon"><i class="el-icon-collection-tag"></i></div>
          <div class="stat-info">
            <div class="stat-label">知识点数</div>
            <div class="stat-value">{{ stats.knowledgeCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon view-icon"><i class="el-icon-view"></i></div>
          <div class="stat-info">
            <div class="stat-label">总查看次数</div>
            <div class="stat-value">{{ stats.viewCount }}</div>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 知识内容 -->
    <div class="knowledge-content">
      <div class="knowledge-main">
        <div class="knowledge-summary">
          <h3 class="summary-title">{{ currentSummary.title }}</h3>
          <div class="summary-tags">
            <el-tag v-for="tag in currentSummary.tags" :key="tag" size="small" type="primary" effect="plain">{{ tag }}</el-tag>
          </div>
          <div class="summary-section">
            <h4 class="section-title">核心知识点</h4>
            <div class="knowledge-points">
              <div v-for="point in currentSummary.knowledgePoints" :key="point.id" class="knowledge-point">
                <div class="point-icon"><i class="el-icon-check"></i></div>
                <div class="point-content">{{ point.content }}</div>
              </div>
            </div>
          </div>
          <div class="summary-section">
            <h4 class="section-title">课堂总结</h4>
            <div class="class-summary">
              <p v-for="(paragraph, index) in currentSummary.classSummary" :key="index" class="summary-paragraph">{{ paragraph }}</p>
            </div>
          </div>
          <div class="summary-section">
            <h4 class="section-title">学习建议</h4>
            <div class="learning-suggestions">
              <div v-for="suggestion in currentSummary.learningSuggestions" :key="suggestion.id" class="suggestion-item">
                <div class="suggestion-icon"><i class="el-icon-lightbulb"></i></div>
                <div class="suggestion-content">{{ suggestion.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="knowledge-sidebar">
        <el-card shadow="hover" class="sidebar-card">
          <template #header>
            <div class="card-header">
              <span>知识图谱</span>
              <el-button size="small" @click="refreshKnowledgeGraph">
                <i class="el-icon-refresh"></i> 刷新
              </el-button>
            </div>
          </template>
          <div class="knowledge-graph">
            <div v-if="loadingGraph" class="loading-graph">
              <el-icon class="loading-icon"><i class="el-icon-loading"></i></el-icon>
              <span>正在生成知识图谱...</span>
            </div>
            <div v-else class="graph-placeholder">
              <div class="graph-container">
                <div class="graph-node central-node">核心知识点</div>
                <div class="graph-node child-node node-1">知识点1</div>
                <div class="graph-node child-node node-2">知识点2</div>
                <div class="graph-node child-node node-3">知识点3</div>
                <div class="graph-node child-node node-4">知识点4</div>
                <div class="graph-connection"></div>
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="sidebar-card">
          <template #header>
            <div class="card-header">
              <span>智能学习建议</span>
            </div>
          </template>
          <div class="smart-suggestions">
            <div v-for="suggestion in smartSuggestions" :key="suggestion.id" class="smart-suggestion-item">
              <div class="suggestion-icon"><i class="el-icon-s-marketing"></i></div>
              <div class="suggestion-content">
                <h5>{{ suggestion.title }}</h5>
                <p>{{ suggestion.description }}</p>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <!-- 生成总结对话框 -->
    <el-dialog v-model="showGenerateDialog" title="生成知识总结" width="500px">
      <div class="generate-dialog-content">
        <p>系统将基于您的学习内容，自动生成知识总结和知识点提取。</p>
        <el-form :model="generateForm" label-width="80px">
          <el-form-item label="总结类型">
            <el-radio-group v-model="generateForm.summaryType">
              <el-radio label="detailed">详细总结</el-radio>
              <el-radio label="concise">简明总结</el-radio>
              <el-radio label="key_points">仅核心知识点</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="包含内容">
            <el-checkbox-group v-model="generateForm.includeContent">
              <el-checkbox label="knowledge_points">核心知识点</el-checkbox>
              <el-checkbox label="class_summary">课堂总结</el-checkbox>
              <el-checkbox label="learning_suggestions">学习建议</el-checkbox>
              <el-checkbox label="knowledge_graph">知识图谱</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="showGenerateDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmGenerateSummary">确定生成</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()


const selectedCourse = ref('chinese')
const showGenerateDialog = ref(false)
const loadingGraph = ref(false)

const stats = reactive({
  courseCount: 5,
  summaryCount: 5,
  knowledgeCount: 25,
  viewCount: 69
})

const currentSummary = reactive({
  title: '趣味语文：童话阅读与写作 - 课堂核心知识点',
  tags: ['童话', '阅读', '写作', '想象力', '表达'],
  knowledgePoints: [
    {
      id: 1,
      content: '童话的基本结构：开头、发展、高潮和结尾'
    },
    {
      id: 2,
      content: '如何分析故事中的角色特点和主题思想'
    },
    {
      id: 3,
      content: '通过童话激发想象力和创造力的方法'
    },
    {
      id: 4,
      content: '如何将童话元素应用到写作中'
    },
    {
      id: 5,
      content: '理解童话中的象征意义和隐喻'
    }
  ],
  classSummary: [
    '本次课程带领孩子们走进了童话的世界，通过阅读经典童话故事，激发了孩子们的想象力和创造力。',
    '我们学习了如何理解童话故事的情节结构，包括开头、发展、高潮和结尾，以及如何分析故事中的角色特点和主题思想。',
    '通过小组讨论和互动游戏，孩子们学会了如何从不同角度理解童话，并尝试自己创作简单的童话故事。',
    '课程还强调了童话对儿童成长的重要性，以及如何通过童话培养孩子的同理心和道德观念。'
  ],
  learningSuggestions: [
    {
      id: 1,
      content: '建议每天阅读一篇童话故事，培养阅读习惯和想象力'
    },
    {
      id: 2,
      content: '尝试每周创作一个简单的童话故事，锻炼写作能力'
    },
    {
      id: 3,
      content: '与家长或同学分享自己对童话的理解，提高表达能力'
    },
    {
      id: 4,
      content: '关注童话中的道德教育元素，培养正确的价值观'
    }
  ]
})

const smartSuggestions = reactive([
  {
    id: 1,
    title: '重点关注',
    description: '您在童话结构分析方面表现优秀，建议进一步深入学习故事创作技巧'
  },
  {
    id: 2,
    title: '学习建议',
    description: '建议多阅读不同类型的童话，拓展视野和想象力'
  },
  {
    id: 3,
    title: '练习推荐',
    description: '尝试创作一个包含道德教育元素的童话故事'
  }
])

const generateForm = reactive({
  summaryType: 'detailed',
  includeContent: ['knowledge_points', 'class_summary', 'learning_suggestions', 'knowledge_graph']
})

const generateSummary = () => {
  showGenerateDialog.value = true
}

const confirmGenerateSummary = () => {
  ElMessage.loading('正在生成知识总结...')
  setTimeout(() => {
    ElMessage.success('知识总结生成成功')
    showGenerateDialog.value = false
  }, 2000)
}

const exportSummary = () => {
  ElMessage.loading('正在导出总结...')
  setTimeout(() => {
    ElMessage.success('总结导出成功，已保存为PDF文件')
  }, 1500)
}

const refreshKnowledgeGraph = () => {
  loadingGraph.value = true
  setTimeout(() => {
    loadingGraph.value = false
    ElMessage.success('知识图谱已更新')
  }, 1500)
}
</script>

<style scoped>
.knowledge-page {
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* 渐变背景头部 */
.knowledge-header {
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
  gap: 8px;
  position: relative;
}

.knowledge-title {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.knowledge-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.knowledge-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.knowledge-actions .el-button {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.knowledge-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 知识统计卡片 */
.knowledge-stats {
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

.knowledge-icon {
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

/* 知识内容 */
.knowledge-content {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.knowledge-main {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.knowledge-sidebar {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-card {
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.sidebar-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

/* 知识总结 */
.knowledge-summary {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.summary-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.summary-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #f0f0f0;
}

.knowledge-points {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.knowledge-point {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.point-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6f7ff;
  color: #1890ff;
  flex-shrink: 0;
  margin-top: 2px;
}

.point-content {
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
  color: #303133;
}

.class-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-paragraph {
  font-size: 14px;
  line-height: 1.6;
  color: #303133;
  margin: 0;
}

.learning-suggestions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px;
  background-color: #f6ffed;
  border-radius: 8px;
  border-left: 4px solid #52c41a;
}

.suggestion-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #52c41a;
  color: white;
  flex-shrink: 0;
  margin-top: 2px;
}

.suggestion-content {
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
  color: #303133;
}

/* 知识图谱 */
.knowledge-graph {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 10px 0;
}

.loading-graph {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #606266;
}

.loading-icon {
  font-size: 32px;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.graph-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
}

.graph-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.graph-node {
  position: absolute;
  padding: 12px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.graph-node:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.central-node {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1890ff;
  z-index: 10;
}

.child-node {
  background-color: #52c41a;
}

.node-1 {
  top: 20%;
  left: 20%;
}

.node-2 {
  top: 20%;
  right: 20%;
}

.node-3 {
  bottom: 20%;
  left: 20%;
}

.node-4 {
  bottom: 20%;
  right: 20%;
}

.graph-connection {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 50% 50%, #1890ff33 0%, transparent 70%);
  pointer-events: none;
}

/* 智能学习建议 */
.smart-suggestions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px 0;
}

.smart-suggestion-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  background-color: #f0f5ff;
  border-radius: 8px;
  border-left: 4px solid #1890ff;
}

.smart-suggestion-item .suggestion-icon {
  background-color: #1890ff;
}

.smart-suggestion-item h5 {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
}

.smart-suggestion-item p {
  font-size: 13px;
  line-height: 1.4;
  color: #606266;
  margin: 0;
}

/* 生成总结对话框 */
.generate-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.generate-dialog-content p {
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .knowledge-content {
    flex-direction: column;
  }
  
  .knowledge-sidebar {
    width: 100%;
    flex-direction: row;
  }
  
  .sidebar-card {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .knowledge-actions {
    width: 100%;
    flex-wrap: wrap;
  }
  
  .knowledge-actions .el-select {
    width: 100% !important;
    margin-right: 0 !important;
    margin-bottom: 12px;
  }
  
  .knowledge-stats {
    flex-direction: column;
  }
  
  .stat-card {
    min-width: 100%;
  }
  
  .knowledge-main {
    padding: 20px;
  }
  
  .knowledge-sidebar {
    flex-direction: column;
  }
  
  .graph-node {
    padding: 8px 12px;
    font-size: 12px;
  }
  
  .node-1,
  .node-2,
  .node-3,
  .node-4 {
    position: static;
    transform: none;
    margin: 8px;
  }
  
  .graph-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .graph-connection {
    display: none;
  }
}
</style>