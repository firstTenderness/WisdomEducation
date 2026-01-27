<template>
  <div class="cloud-page">
    <!-- 渐变背景头部 -->
    <div class="cloud-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="cloud-title">资源宝库</h2>
          <p class="cloud-subtitle">丰富的学习资源，助力山区孩子成长</p>
        </div>
        <div class="cloud-actions">
          <el-button type="primary" @click="uploadFile">
            <i class="el-icon-upload"></i> 上传文件
          </el-button>
          <el-button type="primary" @click="createFolder">
            <i class="el-icon-plus"></i> 新建文件夹
          </el-button>
          <el-button @click="deleteSelectedFiles" :disabled="selectedFiles.length === 0">
            <i class="el-icon-delete"></i> 删除选中
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 云盘统计卡片 -->
    <div class="cloud-stats">
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon file-icon"><i class="el-icon-document"></i></div>
          <div class="stat-info">
            <div class="stat-label">总文件数</div>
            <div class="stat-value">{{ totalFiles }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon folder-icon"><i class="el-icon-folder"></i></div>
          <div class="stat-info">
            <div class="stat-label">文件夹数</div>
            <div class="stat-value">{{ folderCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon size-icon"><i class="el-icon-s-data"></i></div>
          <div class="stat-info">
            <div class="stat-label">总存储空间</div>
            <div class="stat-value">{{ totalSize }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon type-icon"><i class="el-icon-collection-tag"></i></div>
          <div class="stat-info">
            <div class="stat-label">文件类型</div>
            <div class="stat-value">{{ fileTypes }}</div>
          </div>
        </div>
      </el-card>
    </div>
    
    <div class="cloud-filters">
      <el-select v-model="fileFilter" placeholder="按类型筛选" clearable style="width: 150px;">
        <el-option label="全部" value="all"></el-option>
        <el-option label="文件夹" value="folder"></el-option>
        <el-option label="文件" value="file"></el-option>
      </el-select>
      <el-input
        v-model="searchKeyword"
        placeholder="搜索文件"
        prefix-icon="el-icon-search"
        style="width: 250px; margin-left: 20px;"
        clearable
      />
    </div>
    
    <el-table 
      :data="filteredFiles" 
      border 
      style="width: 100%; margin-top: 20px;"
      @selection-change="handleSelectionChange"
      @row-dblclick="handleRowDblclick"
      stripe
      :row-class-name="rowClassName"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="图标" width="60">
        <template #default="scope">
          <div class="file-icon-container">
            <i v-if="scope.row.type === 'folder'" class="el-icon-folder" style="font-size: 24px; color: #409eff;"></i>
            <i v-else-if="scope.row.extension === 'doc' || scope.row.extension === 'docx'" class="el-icon-document" style="font-size: 24px; color: #2196f3;"></i>
            <i v-else-if="scope.row.extension === 'xls' || scope.row.extension === 'xlsx'" class="el-icon-data-analysis" style="font-size: 24px; color: #4caf50;"></i>
            <i v-else-if="scope.row.extension === 'ppt' || scope.row.extension === 'pptx'" class="el-icon-picture-outline-round" style="font-size: 24px; color: #ff9800;"></i>
            <i v-else-if="scope.row.extension === 'pdf'" class="el-icon-document-copy" style="font-size: 24px; color: #f44336;"></i>
            <i v-else-if="scope.row.extension === 'txt'" class="el-icon-notebook-2" style="font-size: 24px; color: #607d8b;"></i>
            <i v-else-if="scope.row.extension === 'jpg' || scope.row.extension === 'jpeg' || scope.row.extension === 'png' || scope.row.extension === 'gif'" class="el-icon-picture" style="font-size: 24px; color: #9c27b0;"></i>
            <i v-else-if="scope.row.extension === 'mp3' || scope.row.extension === 'mp4'" class="el-icon-video-camera" style="font-size: 24px; color: #e91e63;"></i>
            <i v-else class="el-icon-document" style="font-size: 24px; color: #606266;"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="文件名" min-width="300">
        <template #default="scope">
          <div class="file-name-container">
            <span :class="{ 'folder-name': scope.row.type === 'folder', 'file-name': scope.row.type === 'file' }">{{ scope.row.name }}</span>
            <el-tag v-if="scope.row.type === 'folder'" size="small" type="primary" effect="plain" class="file-type-tag">文件夹</el-tag>
            <el-tag v-else size="small" type="info" effect="plain" class="file-type-tag">{{ scope.row.extension?.toUpperCase() }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" width="120">
        <template #default="scope">
          {{ scope.row.type === 'folder' ? '--' : (scope.row.size / 1024).toFixed(2) }} {{ scope.row.type === 'folder' ? '' : 'KB' }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="180" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="downloadFile(scope.row)" round>
            <i class="el-icon-download"></i> 下载
          </el-button>
          <el-button size="small" @click="previewFile(scope.row)" round>
            <i class="el-icon-view"></i> 预览
          </el-button>
          <el-button size="small" type="danger" @click="deleteFile(scope.row)" round>
            <i class="el-icon-delete"></i> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div v-if="filteredFiles.length === 0" class="empty-files">
      <div class="empty-container">
        <div class="empty-icon"><i class="el-icon-folder"></i></div>
        <h3 class="empty-title">暂无文件</h3>
        <p class="empty-description">开始上传文件或创建文件夹，构建你的个人云存储空间</p>
        <div class="empty-actions">
          <el-button type="primary" @click="uploadFile">
            <i class="el-icon-upload"></i> 上传文件
          </el-button>
          <el-button @click="createFolder">
            <i class="el-icon-plus"></i> 新建文件夹
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const fileFilter = ref('all')
const selectedFiles = ref([])
const files = ref([
  {
    id: 1,
    name: '科学实验资料',
    type: 'folder',
    size: 0,
    updateTime: '2024-01-27 10:00:00'
  },
  {
    id: 2,
    name: '自然探索',
    type: 'folder',
    size: 0,
    updateTime: '2024-01-26 15:30:00'
  },
  {
    id: 3,
    name: '天文知识手册.pdf',
    type: 'file',
    extension: 'pdf',
    size: 20480,
    updateTime: '2024-01-25 09:15:00'
  },
  {
    id: 4,
    name: '山区生物图鉴.docx',
    type: 'file',
    extension: 'docx',
    size: 15360,
    updateTime: '2024-01-24 14:20:00'
  },
  {
    id: 5,
    name: '科学小实验指南.pptx',
    type: 'file',
    extension: 'pptx',
    size: 25600,
    updateTime: '2024-01-23 11:00:00'
  },
  {
    id: 6,
    name: '气象观测记录.xlsx',
    type: 'file',
    extension: 'xlsx',
    size: 10240,
    updateTime: '2024-01-22 16:45:00'
  },
  {
    id: 7,
    name: '环保知识手册.pdf',
    type: 'file',
    extension: 'pdf',
    size: 8192,
    updateTime: '2024-01-21 13:10:00'
  },
  {
    id: 8,
    name: '星空观测笔记.txt',
    type: 'file',
    extension: 'txt',
    size: 2048,
    updateTime: '2024-01-20 10:30:00'
  },
  {
    id: 9,
    name: '山区植物照片.png',
    type: 'file',
    extension: 'png',
    size: 12288,
    updateTime: '2024-01-19 09:45:00'
  },
  {
    id: 10,
    name: '科普视频',
    type: 'folder',
    size: 0,
    updateTime: '2024-01-18 14:50:00'
  }
])

const filteredFiles = computed(() => {
  let result = [...files.value]
  
  // 按类型筛选
  if (fileFilter.value !== 'all') {
    result = result.filter(file => file.type === fileFilter.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(file => 
      file.name.toLowerCase().includes(keyword)
    )
  }
  
  // 按修改时间排序
  return result.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))
})

// 统计数据计算属性
const totalFiles = computed(() => files.value.length)
const folderCount = computed(() => files.value.filter(file => file.type === 'folder').length)
const fileCount = computed(() => files.value.filter(file => file.type === 'file').length)
const totalSize = computed(() => {
  const totalBytes = files.value
    .filter(file => file.type === 'file')
    .reduce((sum, file) => sum + file.size, 0)
  return (totalBytes / (1024 * 1024)).toFixed(2) + ' MB'
})
const fileTypes = computed(() => {
  const extensions = new Set()
  files.value
    .filter(file => file.type === 'file' && file.extension)
    .forEach(file => extensions.add(file.extension.toLowerCase()))
  return extensions.size
})

const rowClassName = ({ row, rowIndex }) => {
  return rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
}

const handleSelectionChange = (val) => {
  selectedFiles.value = val
}

const handleRowDblclick = (row) => {
  if (row.type === 'folder') {
    ElMessage.info(`打开文件夹：${row.name}`)
    // 这里可以添加打开文件夹的逻辑
  } else {
    previewFile(row)
  }
}

const uploadFile = () => {
  ElMessage.success('上传文件功能已触发')
  // 这里可以添加打开文件上传对话框的逻辑
}

const createFolder = () => {
  ElMessage.success('新建文件夹功能已触发')
  // 这里可以添加打开新建文件夹对话框的逻辑
}

const downloadFile = (row) => {
  ElMessage.success(`下载文件：${row.name}`)
  // 这里可以添加文件下载的逻辑
}

const previewFile = (row) => {
  ElMessage.success(`预览文件：${row.name}`)
  // 这里可以添加文件预览的逻辑
}

const deleteFile = (row) => {
  const index = files.value.findIndex(file => file.id === row.id)
  if (index !== -1) {
    files.value.splice(index, 1)
    ElMessage.success('文件已删除')
  }
}

const deleteSelectedFiles = () => {
  selectedFiles.value.forEach(file => {
    const index = files.value.findIndex(f => f.id === file.id)
    if (index !== -1) {
      files.value.splice(index, 1)
    }
  })
  selectedFiles.value = []
  ElMessage.success('选中的文件已删除')
}
</script>

<style scoped>
.cloud-page {
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* 渐变背景头部 */
.cloud-header {
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
  background: linear-gradient(135deg, #3494e6 0%, #ec6ead 100%);
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

.cloud-title {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.cloud-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.cloud-actions {
  display: flex;
  gap: 12px;
}

.cloud-actions .el-button {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.cloud-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 云盘统计卡片 */
.cloud-stats {
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

.file-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.folder-icon {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.size-icon {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.type-icon {
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
.cloud-filters {
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

.file-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.file-icon-container:hover {
  transform: scale(1.1);
}

.file-name-container {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.folder-name {
  font-weight: 600;
  color: #409eff;
  transition: color 0.3s ease;
}

.folder-name:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.file-name {
  font-weight: 500;
  color: #303133;
  transition: color 0.3s ease;
}

.file-name:hover {
  color: #409eff;
}

.file-type-tag {
  margin-left: auto;
  flex-shrink: 0;
}

.even-row {
  background-color: #f8f9fa;
}

.odd-row {
  background-color: white;
}

/* 空状态美化 */
.empty-files {
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
  font-size: 80px;
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

.empty-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.empty-actions .el-button {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.empty-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .cloud-header {
    padding: 20px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .cloud-stats {
    flex-direction: column;
  }
  
  .stat-card {
    min-width: 100%;
  }
  
  .cloud-filters {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .cloud-filters .el-select,
  .cloud-filters .el-input {
    width: 100% !important;
    margin-left: 0 !important;
  }
  
  .empty-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>