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
          <div class="stat-icon experiment-icon"><i class="el-icon-s-marketing"></i></div>
          <div class="stat-info">
            <div class="stat-label">科学实验</div>
            <div class="stat-value">{{ experimentNotesCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon nature-icon"><i class="el-icon-picture"></i></div>
          <div class="stat-info">
            <div class="stat-label">自然观察</div>
            <div class="stat-value">{{ natureNotesCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon astronomy-icon"><i class="el-icon-moon"></i></div>
          <div class="stat-info">
            <div class="stat-label">天文观测</div>
            <div class="stat-value">{{ astronomyNotesCount }}</div>
          </div>
        </div>
      </el-card>
    </div>
    
    <div class="notes-filters">
      <el-select v-model="noteFilter" placeholder="按分类筛选" clearable style="width: 150px;">
        <el-option label="全部" value="all"></el-option>
        <el-option label="科学实验" value="experiment"></el-option>
        <el-option label="自然观察" value="nature"></el-option>
        <el-option label="天文观测" value="astronomy"></el-option>
        <el-option label="气象观测" value="weather"></el-option>
        <el-option label="环保知识" value="environmental"></el-option>
      </el-select>
      <el-input
        v-model="searchKeyword"
        placeholder="搜索笔记"
        prefix-icon="el-icon-search"
        style="width: 250px; margin-left: 20px;"
        clearable
      />
    </div>
    
    <div class="notes-content-wrapper">
      <!-- 笔记列表页面 -->
      <div v-if="!showNoteDetail && !showEditForm" class="notes-list">
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
      
      <!-- 笔记详情页面 -->
      <div v-if="showNoteDetail && selectedNote" class="note-detail-page">
        <div class="note-detail-header">
          <el-button type="info" @click="closeNoteDetail">
            <i class="el-icon-arrow-left"></i> 返回列表
          </el-button>
          <h2>{{ selectedNote.title }}</h2>
        </div>
        <div class="note-detail-content">
          <div class="note-category">
            <el-tag :type="getCategoryType(selectedNote.category)" effect="dark">
              {{ getCategoryName(selectedNote.category) }}
            </el-tag>
          </div>
          <div class="note-detail-body">
            <h3>笔记内容</h3>
            <p>{{ selectedNote.content }}</p>
          </div>
          <div class="note-detail-meta">
            <div class="meta-item">
              <i class="el-icon-time"></i>
              <span>创建时间：{{ selectedNote.createdAt }}</span>
            </div>
            <div class="meta-item">
              <i class="el-icon-refresh"></i>
              <span>更新时间：{{ selectedNote.updatedAt }}</span>
            </div>
          </div>
          <div class="note-detail-actions">
            <el-button type="primary" @click="editNote(selectedNote)">
              <i class="el-icon-edit"></i> 编辑
            </el-button>
            <el-button type="danger" @click="deleteNote(selectedNote)">
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </div>
        </div>
      </div>
      
      <!-- 编辑/新建笔记页面 -->
      <div v-if="showEditForm" class="note-edit-page">
        <div class="note-edit-header">
          <el-button type="info" @click="closeEditForm">
            <i class="el-icon-arrow-left"></i> {{ editingNote ? '返回详情' : '返回列表' }}
          </el-button>
          <h2>{{ editingNote ? '编辑笔记' : '新建笔记' }}</h2>
        </div>
        <div class="note-edit-content">
          <el-form :model="noteForm" label-width="100px">
            <el-form-item label="笔记标题">
              <el-input v-model="noteForm.title" placeholder="请输入笔记标题" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="笔记分类">
              <el-select v-model="noteForm.category" placeholder="请选择笔记分类" style="width: 100%;">
                <el-option label="科学实验" value="experiment" />
                <el-option label="自然观察" value="nature" />
                <el-option label="天文观测" value="astronomy" />
                <el-option label="气象观测" value="weather" />
                <el-option label="环保知识" value="environmental" />
              </el-select>
            </el-form-item>
            <el-form-item label="笔记内容">
              <el-input
                v-model="noteForm.content"
                type="textarea"
                rows="6"
                placeholder="请输入笔记内容"
                style="width: 100%;"
              />
            </el-form-item>
          </el-form>
          <div class="note-edit-actions">
            <el-button @click="closeEditForm">取消</el-button>
            <el-button type="primary" @click="saveNote">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const noteFilter = ref('all')
const showNoteDetail = ref(false)
const selectedNote = ref(null)
const showEditForm = ref(false)
const editingNote = ref(null)
const noteForm = ref({
  title: '',
  content: '',
  category: ''
})
const notes = ref([
  {
    id: 1,
    title: '科学小实验：水的净化',
    content: '今天做了一个关于水净化的小实验，用沙子、活性炭和棉花制作了一个简易净水器...',
    category: 'experiment',
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28'
  },
  {
    id: 2,
    title: '山区植物观察笔记',
    content: '在学校后面的山上发现了几种有趣的植物，包括野草莓、蕨类植物和一些不知名的小花...',
    category: 'nature',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-26'
  },
  {
    id: 3,
    title: '星空观测记录',
    content: '晴朗的夜晚，用简易望远镜观察了月亮和一些明亮的星星，看到了月亮上的环形山...',
    category: 'astronomy',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: 4,
    title: '气象观测日记',
    content: '连续一周记录了每天的天气变化，包括温度、湿度、风向和云量，发现了一些天气变化的规律...',
    category: 'weather',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16'
  },
  {
    id: 5,
    title: '环保小知识',
    content: '学习了如何分类垃圾、节约水资源和保护森林的知识，我们应该从身边的小事做起...',
    category: 'environmental',
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
const experimentNotesCount = computed(() => notes.value.filter(note => note.category === 'experiment').length)
const natureNotesCount = computed(() => notes.value.filter(note => note.category === 'nature').length)
const astronomyNotesCount = computed(() => notes.value.filter(note => note.category === 'astronomy').length)
const weatherNotesCount = computed(() => notes.value.filter(note => note.category === 'weather').length)

const getCategoryType = (category) => {
  const typeMap = {
    experiment: 'primary',
    nature: 'success',
    astronomy: 'warning',
    weather: 'info',
    environmental: 'danger'
  }
  return typeMap[category] || 'info'
}

const getCategoryName = (category) => {
  const nameMap = {
    experiment: '科学实验',
    nature: '自然观察',
    astronomy: '天文观测',
    weather: '气象观测',
    environmental: '环保知识'
  }
  return nameMap[category] || '其他'
}

const getCategoryIcon = (category) => {
  const iconMap = {
    experiment: 'experiment-icon',
    nature: 'nature-icon',
    astronomy: 'astronomy-icon',
    weather: 'weather-icon',
    environmental: 'environmental-icon'
  }
  return iconMap[category] || 'other-icon'
}

const rowClassName = ({ row, rowIndex }) => {
  return rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
}

const createNewNote = () => {
  editingNote.value = null
  noteForm.value = {
    title: '',
    content: '',
    category: 'experiment'
  }
  showEditForm.value = true
  ElMessage.success('新建笔记功能已触发')
}

const editNote = (note) => {
  editingNote.value = note
  noteForm.value = {
    title: note.title,
    content: note.content,
    category: note.category
  }
  showEditForm.value = true
  showNoteDetail.value = false
  ElMessage.info(`编辑笔记：${note.title}`)
}

const viewNote = (note) => {
  selectedNote.value = note
  showNoteDetail.value = true
  showEditForm.value = false
  ElMessage.success(`查看笔记：${note.title}`)
}

const deleteNote = (note) => {
  const index = notes.value.findIndex(n => n.id === note.id)
  if (index !== -1) {
    notes.value.splice(index, 1)
    showNoteDetail.value = false
    showEditForm.value = false
    selectedNote.value = null
    editingNote.value = null
    ElMessage.success('笔记已删除')
  }
}

const exportNotes = () => {
  ElMessage.success('笔记导出功能已触发')
  // 这里可以添加导出笔记的逻辑
}

const closeNoteDetail = () => {
  showNoteDetail.value = false
  selectedNote.value = null
}

const closeEditForm = () => {
  showEditForm.value = false
  editingNote.value = null
  if (selectedNote.value) {
    showNoteDetail.value = true
  }
}

const saveNote = () => {
  if (!noteForm.value.title.trim()) {
    ElMessage.warning('笔记标题不能为空')
    return
  }
  
  if (!noteForm.value.content.trim()) {
    ElMessage.warning('笔记内容不能为空')
    return
  }
  
  if (!noteForm.value.category) {
    ElMessage.warning('请选择笔记分类')
    return
  }
  
  if (editingNote.value) {
    // 编辑现有笔记
    editingNote.value.title = noteForm.value.title
    editingNote.value.content = noteForm.value.content
    editingNote.value.category = noteForm.value.category
    editingNote.value.updatedAt = new Date().toISOString().split('T')[0]
    ElMessage.success('笔记编辑成功')
  } else {
    // 创建新笔记
    const newNote = {
      id: notes.value.length + 1,
      title: noteForm.value.title,
      content: noteForm.value.content,
      category: noteForm.value.category,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    notes.value.unshift(newNote)
    ElMessage.success('笔记创建成功')
  }
  
  showEditForm.value = false
  editingNote.value = null
  if (editingNote.value) {
    selectedNote.value = editingNote.value
    showNoteDetail.value = true
  }
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

/* 笔记详情页面 */
.note-detail-page {
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.note-detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
}

.note-detail-header h2 {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.note-detail-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.note-category {
  align-self: flex-start;
}

.note-detail-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.note-detail-body h3 {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.note-detail-body p {
  font-size: 16px;
  line-height: 1.6;
  color: #606266;
  margin: 0;
  white-space: pre-line;
}

.note-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.note-detail-meta .meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #909399;
}

.note-detail-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

/* 编辑笔记页面 */
.note-edit-page {
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.note-edit-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
}

.note-edit-header h2 {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.note-edit-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.note-edit-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .note-detail-page,
  .note-edit-page {
    padding: 15px;
    margin-top: 10px;
  }
  
  .note-detail-header,
  .note-edit-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding-bottom: 15px;
  }
  
  .note-detail-header h2,
  .note-edit-header h2 {
    font-size: 20px;
  }
  
  .note-detail-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .note-detail-actions,
  .note-edit-actions {
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>