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
          <el-button @click="refreshFiles">
            <i class="el-icon-refresh"></i> 刷新
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
      <el-table-column label="操作" width="280" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="downloadFile(scope.row)" round>
            <i class="el-icon-download"></i> 下载
          </el-button>
          <el-button size="small" @click="previewFile(scope.row)" round>
            <i class="el-icon-view"></i> 预览
          </el-button>
          <el-dropdown @command="(command) => handleCommand(command, scope.row)">
            <el-button size="small" round>
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="rename">
                  <i class="el-icon-edit"></i> 重命名
                </el-dropdown-item>
                <el-dropdown-item command="copy">
                  <i class="el-icon-document-copy"></i> 复制
                </el-dropdown-item>
                <el-dropdown-item command="move">
                  <i class="el-icon-folder-opened"></i> 移动
                </el-dropdown-item>
                <el-dropdown-item command="share">
                  <i class="el-icon-share"></i> 分享
                </el-dropdown-item>
                <el-dropdown-item command="delete" divided>
                  <i class="el-icon-delete"></i> 删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
    
    <!-- 上传文件对话框 -->
    <el-dialog v-model="showUploadDialog" title="上传文件" width="500px">
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :auto-upload="false"
        :on-change="handleFileChange"
        :on-progress="handleUploadProgress"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        multiple
        :file-list="uploadFiles"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            支持上传任意类型文件，单个文件大小不超过100MB
          </div>
        </template>
      </el-upload>
      <div v-if="uploadProgress > 0" class="upload-progress">
        <el-progress :percentage="uploadProgress" :status="uploadProgress === 100 ? 'success' : ''"></el-progress>
      </div>
      <template #footer>
        <el-button @click="showUploadDialog = false">取消</el-button>
        <el-button type="primary" @click="handleUploadSuccess(null, uploadFiles[0])">确定上传</el-button>
      </template>
    </el-dialog>
    
    <!-- 新建文件夹对话框 -->
    <el-dialog v-model="showFolderDialog" title="新建文件夹" width="400px">
      <el-form :model="{ name: newFolderName }" label-width="80px">
        <el-form-item label="文件夹名称">
          <el-input v-model="newFolderName" placeholder="请输入文件夹名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showFolderDialog = false">取消</el-button>
        <el-button type="primary" @click="saveFolder">确定</el-button>
      </template>
    </el-dialog>
    
    <!-- 文件预览对话框 -->
    <el-dialog v-model="showPreviewDialog" :title="`预览文件：${currentPreviewFile?.name || ''}`" width="600px">
      <div v-if="currentPreviewFile" class="file-preview-content">
        <div class="preview-icon">
          <i v-if="currentPreviewFile.type === 'folder'" class="el-icon-folder" style="font-size: 48px; color: #409eff;"></i>
          <i v-else-if="currentPreviewFile.extension === 'doc' || currentPreviewFile.extension === 'docx'" class="el-icon-document" style="font-size: 48px; color: #2196f3;"></i>
          <i v-else-if="currentPreviewFile.extension === 'xls' || currentPreviewFile.extension === 'xlsx'" class="el-icon-data-analysis" style="font-size: 48px; color: #4caf50;"></i>
          <i v-else-if="currentPreviewFile.extension === 'ppt' || currentPreviewFile.extension === 'pptx'" class="el-icon-picture-outline-round" style="font-size: 48px; color: #ff9800;"></i>
          <i v-else-if="currentPreviewFile.extension === 'pdf'" class="el-icon-document-copy" style="font-size: 48px; color: #f44336;"></i>
          <i v-else-if="currentPreviewFile.extension === 'txt'" class="el-icon-notebook-2" style="font-size: 48px; color: #607d8b;"></i>
          <i v-else-if="currentPreviewFile.extension === 'jpg' || currentPreviewFile.extension === 'jpeg' || currentPreviewFile.extension === 'png' || currentPreviewFile.extension === 'gif'" class="el-icon-picture" style="font-size: 48px; color: #9c27b0;"></i>
          <i v-else-if="currentPreviewFile.extension === 'mp3' || currentPreviewFile.extension === 'mp4'" class="el-icon-video-camera" style="font-size: 48px; color: #e91e63;"></i>
          <i v-else class="el-icon-document" style="font-size: 48px; color: #606266;"></i>
        </div>
        <div class="preview-info">
          <div class="info-item">
            <span class="info-label">文件名：</span>
            <span class="info-value">{{ currentPreviewFile.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">文件类型：</span>
            <span class="info-value">{{ currentPreviewFile.type === 'folder' ? '文件夹' : currentPreviewFile.extension?.toUpperCase() }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">文件大小：</span>
            <span class="info-value">{{ currentPreviewFile.type === 'folder' ? '--' : (currentPreviewFile.size / 1024).toFixed(2) + ' KB' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">修改时间：</span>
            <span class="info-value">{{ currentPreviewFile.updateTime }}</span>
          </div>
        </div>
        <div class="preview-actions">
          <el-button type="primary" @click="downloadFile(currentPreviewFile)">
            <i class="el-icon-download"></i> 下载文件
          </el-button>
          <el-button type="danger" @click="deleteFile(currentPreviewFile); closePreviewDialog()">
            <i class="el-icon-delete"></i> 删除文件
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchKeyword = ref('')
const fileFilter = ref('all')
const selectedFiles = ref([])
const showUploadDialog = ref(false)
const showFolderDialog = ref(false)
const showPreviewDialog = ref(false)
const currentPreviewFile = ref(null)
const uploadProgress = ref(0)
const newFolderName = ref('')
const uploadFiles = ref([])
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
  uploadFiles.value = []
  uploadProgress.value = 0
  showUploadDialog.value = true
}

const handleFileChange = (file) => {
  uploadFiles.value.push(file)
}

const handleUploadProgress = (event) => {
  uploadProgress.value = Math.floor(event.percent)
}

const handleUploadSuccess = (response, file) => {
  const newFile = {
    id: files.value.length + 1,
    name: file.name,
    type: 'file',
    extension: file.name.split('.').pop().toLowerCase(),
    size: file.size || Math.floor(Math.random() * 50000) + 5000,
    updateTime: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
  files.value.unshift(newFile)
  ElMessage.success(`文件 ${file.name} 上传成功`)
  showUploadDialog.value = false
  uploadFiles.value = []
  uploadProgress.value = 0
}

const handleUploadError = () => {
  ElMessage.error('文件上传失败')
  uploadProgress.value = 0
}

const createFolder = () => {
  newFolderName.value = ''
  showFolderDialog.value = true
}

const saveFolder = () => {
  if (!newFolderName.value.trim()) {
    ElMessage.warning('文件夹名称不能为空')
    return
  }
  
  const newFolder = {
    id: files.value.length + 1,
    name: newFolderName.value,
    type: 'folder',
    size: 0,
    updateTime: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
  files.value.unshift(newFolder)
  ElMessage.success('文件夹创建成功')
  showFolderDialog.value = false
  newFolderName.value = ''
}

const downloadFile = (row) => {
  ElMessage.success(`开始下载文件：${row.name}`)
  // 模拟下载进度
  setTimeout(() => {
    ElMessage.success(`文件 ${row.name} 下载完成`)
  }, 2000)
}

const previewFile = (row) => {
  if (row.type === 'folder') {
    ElMessage.info(`打开文件夹：${row.name}`)
    return
  }
  currentPreviewFile.value = row
  showPreviewDialog.value = true
  ElMessage.success(`预览文件：${row.name}`)
}

const closePreviewDialog = () => {
  showPreviewDialog.value = false
  currentPreviewFile.value = null
}

const deleteFile = (row) => {
  const index = files.value.findIndex(file => file.id === row.id)
  if (index !== -1) {
    files.value.splice(index, 1)
    ElMessage.success('文件已删除')
  }
}

const deleteSelectedFiles = () => {
  if (selectedFiles.value.length === 0) {
    ElMessage.warning('请先选择要删除的文件')
    return
  }
  
  ElMessageBox.confirm(`确定要删除选中的 ${selectedFiles.value.length} 个文件吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    selectedFiles.value.forEach(file => {
      const index = files.value.findIndex(f => f.id === file.id)
      if (index !== -1) {
        files.value.splice(index, 1)
      }
    })
    selectedFiles.value = []
    ElMessage.success('选中的文件已删除')
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 刷新文件列表
const refreshFiles = () => {
  ElMessage.loading('正在刷新文件列表...')
  setTimeout(() => {
    ElMessage.success('文件列表已刷新')
  }, 1000)
}

// 重命名文件
const renameFile = (row) => {
  ElMessageBox.prompt('请输入新的文件名', '重命名文件', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: row.name
  }).then(({ value }) => {
    if (value && value.trim()) {
      const file = files.value.find(f => f.id === row.id)
      if (file) {
        file.name = value.trim()
        ElMessage.success('文件重命名成功')
      }
    } else {
      ElMessage.warning('文件名不能为空')
    }
  }).catch(() => {
    ElMessage.info('已取消重命名')
  })
}

// 复制文件
const copyFile = (row) => {
  const newFile = {
    ...row,
    id: files.value.length + 1,
    name: `${row.name} (副本)`,
    updateTime: new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
  files.value.unshift(newFile)
  ElMessage.success('文件已复制')
}

// 移动文件
const moveFile = (row) => {
  ElMessage.info('移动文件功能开发中...')
}

// 分享文件
const shareFile = (row) => {
  ElMessage.success(`文件 ${row.name} 分享链接已复制到剪贴板`)
  setTimeout(() => {
    ElMessage.info('链接有效期：7天')
  }, 1000)
}

// 处理下拉菜单命令
const handleCommand = (command, row) => {
  switch (command) {
    case 'rename':
      renameFile(row)
      break
    case 'copy':
      copyFile(row)
      break
    case 'move':
      moveFile(row)
      break
    case 'share':
      shareFile(row)
      break
    case 'delete':
      deleteFile(row)
      break
  }
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

/* 上传对话框样式 */
.upload-demo {
  margin-bottom: 20px;
}

.upload-progress {
  margin-top: 20px;
}

/* 文件预览对话框样式 */
.file-preview-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preview-header {
  display: flex;
  gap: 30px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.preview-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
  min-width: 80px;
}

.info-value {
  font-size: 14px;
  color: #303133;
}

.preview-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .preview-header {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .preview-icon {
    width: 80px;
    height: 80px;
  }
  
  .preview-icon i {
    font-size: 40px !important;
  }
  
  .preview-info {
    width: 100%;
  }
  
  .preview-actions {
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>