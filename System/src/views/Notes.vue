<template>
  <div class="notes-page">
    <!-- 渐变背景头部 -->
    <div class="notes-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="notes-title">学习笔记</h2>
          <p class="notes-subtitle">记录学习点滴，沉淀知识财富</p>
        </div>
        <div class="notes-actions">
          <el-button type="primary" @click="createNewNote">
            <i class="el-icon-plus"></i> 新建笔记
          </el-button>
          <el-button @click="exportNotes">
            <i class="el-icon-download"></i> 导出笔记
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 笔记统计卡片 -->
    <div class="notes-stats">
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon note-icon"><i class="el-icon-document"></i></div>
          <div class="stat-info">
            <div class="stat-label">总笔记数</div>
            <div class="stat-value">{{ totalNotes }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon course-icon"><i class="el-icon-notebook-2"></i></div>
          <div class="stat-info">
            <div class="stat-label">课程笔记</div>
            <div class="stat-value">{{ courseNotesCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon reading-icon"><i class="el-icon-read"></i></div>
          <div class="stat-info">
            <div class="stat-label">读书心得</div>
            <div class="stat-value">{{ readingNotesCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon tech-icon"><i class="el-icon-s-marketing"></i></div>
          <div class="stat-info">
            <div class="stat-label">技术总结</div>
            <div class="stat-value">{{ techNotesCount }}</div>
          </div>
        </div>
      </el-card>
    </div>
    
    <div class="notes-filters">
      <el-select v-model="noteFilter" placeholder="按分类筛选" clearable style="width: 150px;">
        <el-option label="全部" value="all"></el-option>
        <el-option label="课程笔记" value="course"></el-option>
        <el-option label="读书心得" value="reading"></el-option>
        <el-option label="技术总结" value="tech"></el-option>
        <el-option label="其他" value="other"></el-option>
      </el-select>
      <el-input
        v-model="searchKeyword"
        placeholder="搜索笔记"
        prefix-icon="el-icon-search"
        style="width: 250px; margin-left: 20px;"
        clearable
      />
    </div>
    
    <el-table 
      :data="filteredNotes" 
      border 
      style="width: 100%; margin-top: 20px;"
      stripe
      :row-class-name="rowClassName"
    >
      <el-table-column prop="title" label="标题" min-width="200">
        <template #default="scope">
          <div class="note-title-cell">
            <i class="el-icon-document" :class="getCategoryIcon(scope.row.category)"></i>
            <span class="note-title">{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类" width="120">
        <template #default="scope">
          <el-tag :type="getCategoryType(scope.row.category)" effect="dark">
            {{ getCategoryName(scope.row.category) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="300">
        <template #default="scope">
          <span class="note-content">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180" />
      <el-table-column prop="updatedAt" label="更新时间" width="180" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editNote(scope.row)" round>
            编辑
          </el-button>
          <el-button size="small" @click="viewNote(scope.row)" round>
            查看
          </el-button>
          <el-button size="small" type="danger" @click="deleteNote(scope.row)" round>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div v-if="filteredNotes.length === 0" class="empty-notes">
      <div class="empty-container">
        <div class="empty-icon"><i class="el-icon-document-copy"></i></div>
        <h3 class="empty-title">暂无笔记</h3>
        <p class="empty-description">开始创建你的第一条笔记吧，记录学习的每一个瞬间</p>
        <el-button type="primary" @click="createNewNote">
          <i class="el-icon-plus"></i> 新建笔记
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const noteFilter = ref('all')
const notes = ref([
  {
    id: 1,
    title: 'JavaScript闭包详解',
    content: '闭包是指有权访问另一个函数作用域中变量的函数...',
    category: 'tech',
    createdAt: '2024-01-27',
    updatedAt: '2024-01-27'
  },
  {
    id: 2,
    title: 'Vue3 Composition API使用心得',
    content: 'Composition API提供了更好的代码组织方式...',
    category: 'tech',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-26'
  },
  {
    id: 3,
    title: 'Python数据分析课程笔记',
    content: 'NumPy是Python中用于科学计算的核心库...',
    category: 'course',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 4,
    title: '《深入理解计算机系统》读后感',
    content: '这本书从程序员的视角讲解了计算机系统的各个层次...',
    category: 'reading',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16'
  },
  {
    id: 5,
    title: '数据库索引优化策略',
    content: '合理的索引设计可以显著提高查询性能...',
    category: 'tech',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12'
  }
])

const filteredNotes = computed(() => {
  let result = [...notes.value]
  
  // 按分类筛选
  if (noteFilter.value !== 'all') {
    result = result.filter(note => note.category === noteFilter.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(note => 
      note.title.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword)
    )
  }
  
  // 按更新时间排序
  return result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
})

// 统计数据计算属性
const totalNotes = computed(() => notes.value.length)
const courseNotesCount = computed(() => notes.value.filter(note => note.category === 'course').length)
const readingNotesCount = computed(() => notes.value.filter(note => note.category === 'reading').length)
const techNotesCount = computed(() => notes.value.filter(note => note.category === 'tech').length)

const getCategoryType = (category) => {
  const typeMap = {
    course: 'primary',
    reading: 'success',
    tech: 'warning',
    other: 'info'
  }
  return typeMap[category] || 'info'
}

const getCategoryName = (category) => {
  const nameMap = {
    course: '课程笔记',
    reading: '读书心得',
    tech: '技术总结',
    other: '其他'
  }
  return nameMap[category] || '其他'
}

const getCategoryIcon = (category) => {
  const iconMap = {
    course: 'course-icon',
    reading: 'reading-icon',
    tech: 'tech-icon',
    other: 'other-icon'
  }
  return iconMap[category] || 'other-icon'
}

const rowClassName = ({ row, rowIndex }) => {
  return rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
}

const createNewNote = () => {
  ElMessage.success('新建笔记功能已触发')
  // 这里可以添加打开新建笔记对话框的逻辑
}

const editNote = (note) => {
  ElMessage.info(`编辑笔记：${note.title}`)
  // 这里可以添加打开编辑笔记对话框的逻辑
}

const viewNote = (note) => {
  ElMessage.success(`查看笔记：${note.title}`)
  // 这里可以添加打开笔记详情对话框的逻辑
}

const deleteNote = (note) => {
  const index = notes.value.findIndex(n => n.id === note.id)
  if (index !== -1) {
    notes.value.splice(index, 1)
    ElMessage.success('笔记已删除')
  }
}

const exportNotes = () => {
  ElMessage.success('笔记导出功能已触发')
  // 这里可以添加导出笔记的逻辑
}
</script>

<style scoped>
.notes-page {
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* 渐变背景头部 */
.notes-header {
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

.notes-title {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.notes-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.notes-actions {
  display: flex;
  gap: 12px;
}

.notes-actions .el-button {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.notes-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 笔记统计卡片 */
.notes-stats {
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

.note-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.course-icon {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.reading-icon {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.tech-icon {
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

/* 筛选器 */
.notes-filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 表格样式 */
.el-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.el-table__header-wrapper th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.note-title-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-title-cell i {
  font-size: 16px;
}

.note-title {
  font-weight: 500;
  color: #303133;
  transition: color 0.3s ease;
}

.note-title:hover {
  color: #409eff;
}

.note-content {
  line-height: 1.4;
  color: #606266;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-icon {
  color: #409eff;
}

.reading-icon {
  color: #67c23a;
}

.tech-icon {
  color: #e6a23c;
}

.other-icon {
  color: #909399;
}

.even-row {
  background-color: #f8f9fa;
}

.odd-row {
  background-color: white;
}

/* 空状态美化 */
.empty-notes {
  margin-top: 60px;
  text-align: center;
  padding: 40px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.empty-container {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 64px;
  color: #c0c4cc;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.empty-description {
  font-size: 14px;
  color: #909399;
  margin-bottom: 24px;
  line-height: 1.5;
}

.empty-notes .el-button {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.empty-notes .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notes-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .notes-stats {
    flex-direction: column;
  }
  
  .stat-card {
    min-width: 100%;
  }
  
  .notes-filters {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .notes-filters .el-select,
  .notes-filters .el-input {
    width: 100% !important;
    margin-left: 0 !important;
  }
}
</style>