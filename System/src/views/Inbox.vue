<template>
  <div class="inbox-page">
    <div class="inbox-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="inbox-title">收件箱</h2>
          <p class="inbox-subtitle">查看和管理您的消息通知</p>
        </div>
        <div class="inbox-actions">
          <el-button type="primary" @click="markAllAsRead">
            <i class="el-icon-view"></i> 全部标记为已读
          </el-button>
          <el-button @click="deleteSelectedMessages" :disabled="selectedMessages.length === 0">
            <i class="el-icon-delete"></i> 删除选中
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 消息统计卡片 -->
    <div class="stats-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="stat-card">
            <div class="stat-icon total-icon"><i class="el-icon-message"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ messages.length }}</div>
              <div class="stat-label">总消息数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="stat-card">
            <div class="stat-icon unread-icon"><i class="el-icon-chat-dot-round"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ unreadCount }}</div>
              <div class="stat-label">未读消息</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="stat-card">
            <div class="stat-icon read-icon"><i class="el-icon-chat-round"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ readCount }}</div>
              <div class="stat-label">已读消息</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="inbox-filters">
      <div class="filter-section">
        <span class="filter-label">消息状态：</span>
        <el-radio-group v-model="messageFilter" @change="handleFilterChange" size="large">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="unread">未读</el-radio-button>
          <el-radio-button label="read">已读</el-radio-button>
        </el-radio-group>
      </div>
      <div class="search-section">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索消息标题、内容或发送者"
          prefix-icon="el-icon-search"
          style="width: 300px;"
          clearable
          size="large"
        />
      </div>
    </div>
    
    <el-table 
      :data="filteredMessages" 
      border 
      style="width: 100%; margin-top: 20px;"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      stripe
      :row-class-name="rowClassName"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="title" label="标题" min-width="250">
        <template #default="scope">
          <div class="message-title">
            <span class="message-icon" :class="getMessageIcon(scope.row)">
              <i :class="getMessageIconClass(scope.row)"></i>
            </span>
            <span :class="{ 'unread-title': !scope.row.read }">{{ scope.row.title }}</span>
            <span v-if="!scope.row.read" class="unread-dot"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" min-width="450">
        <template #default="scope">
          <span class="message-content">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sender" label="发送者" width="140">
        <template #default="scope">
          <el-tag size="small" :type="getSenderType(scope.row.sender)">
            {{ scope.row.sender }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="180">
        <template #default="scope">
          <span class="message-time">{{ formatTime(scope.row.time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag 
            :type="!scope.row.read ? 'danger' : 'success'"
            @click="toggleReadStatus(scope.row)"
            class="status-tag"
            effect="dark"
          >
            {{ !scope.row.read ? '未读' : '已读' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="scope">
          <el-button size="small" type="primary" @click="viewMessageDetail(scope.row)">
            <i class="el-icon-view"></i> 查看
          </el-button>
          <el-button size="small" type="danger" @click="deleteMessage(scope.row)">
            <i class="el-icon-delete"></i> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div v-if="filteredMessages.length === 0" class="empty-messages">
      <div class="empty-content">
        <div class="empty-icon"><i class="el-icon-message"></i></div>
        <h3 class="empty-title">暂无消息</h3>
        <p class="empty-description">{{ getEmptyDescription() }}</p>
        <el-button type="primary" @click="refreshMessages">
          <i class="el-icon-refresh"></i> 刷新消息
        </el-button>
      </div>
    </div>
    
    <!-- 消息详情弹窗 -->
    <el-dialog
      v-model="showMessageDetail"
      :title="selectedMessage?.title || '消息详情'"
      width="600px"
      class="message-detail-dialog"
    >
      <div v-if="selectedMessage" class="message-detail-content">
        <div class="message-detail-header">
          <div class="message-detail-icon" :class="getMessageIcon(selectedMessage)">
            <i :class="getMessageIconClass(selectedMessage)"></i>
          </div>
          <div class="message-detail-info">
            <h4>{{ selectedMessage.title }}</h4>
            <p class="message-detail-sender">发送者：{{ selectedMessage.sender }}</p>
            <p class="message-detail-time">发送时间：{{ selectedMessage.time }}</p>
          </div>
        </div>
        <div class="message-detail-body">
          <h5>消息内容</h5>
          <p class="message-detail-text">{{ selectedMessage.content }}</p>
        </div>
        <div class="message-detail-footer">
          <el-tag :type="selectedMessage.read ? 'success' : 'danger'" effect="dark">
            {{ selectedMessage.read ? '已读' : '未读' }}
          </el-tag>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeMessageDetail">关闭</el-button>
          <el-button type="primary" @click="toggleReadStatus(selectedMessage)">
            {{ selectedMessage?.read ? '标记为未读' : '标记为已读' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const searchKeyword = ref('')
const messageFilter = ref('all')
const selectedMessages = ref([])
const showMessageDetail = ref(false)
const selectedMessage = ref(null)
const messages = ref([
  {
    id: 1,
    title: '课程更新通知',
    content: '您订阅的《JavaScript基础入门》课程已经更新了新的章节，快来学习吧！',
    sender: '系统通知',
    time: '2024-01-27 10:30',
    read: false
  },
  {
    id: 2,
    title: '作业批改完成',
    content: '您提交的《Python数据分析》作业已经批改完成，请查看批改结果。',
    sender: '王老师',
    time: '2024-01-26 16:45',
    read: false
  },
  {
    id: 3,
    title: '考试安排通知',
    content: '期末考试安排已经发布，请登录系统查看详细的考试时间和地点。',
    sender: '教务处',
    time: '2024-01-25 09:15',
    read: true
  },
  {
    id: 4,
    title: '学习提醒',
    content: '您已经有3天没有登录系统学习了，继续加油哦！',
    sender: '学习助手',
    time: '2024-01-24 14:20',
    read: true
  },
  {
    id: 5,
    title: '新功能上线',
    content: '系统新增了AI课堂总结功能，快来体验吧！',
    sender: '系统通知',
    time: '2024-01-23 11:00',
    read: true
  }
])

const unreadCount = computed(() => {
  return messages.value.filter(msg => !msg.read).length
})

const readCount = computed(() => {
  return messages.value.filter(msg => msg.read).length
})

const filteredMessages = computed(() => {
  let result = [...messages.value]
  
  // 按状态筛选
  if (messageFilter.value === 'unread') {
    result = result.filter(msg => !msg.read)
  } else if (messageFilter.value === 'read') {
    result = result.filter(msg => msg.read)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(msg => 
      msg.title.toLowerCase().includes(keyword) ||
      msg.content.toLowerCase().includes(keyword) ||
      msg.sender.toLowerCase().includes(keyword)
    )
  }
  
  // 按时间排序
  return result.sort((a, b) => new Date(b.time) - new Date(a.time))
})

const rowClassName = ({ row }) => {
  return !row.read ? 'unread-row' : ''
}

const getMessageIcon = (row) => {
  if (row.sender === '系统通知') return 'system-icon'
  if (row.sender === '教务处') return 'admin-icon'
  if (row.sender === '学习助手') return 'helper-icon'
  return 'teacher-icon'
}

const getMessageIconClass = (row) => {
  if (row.sender === '系统通知') return 'el-icon-bell'
  if (row.sender === '教务处') return 'el-icon-office-building'
  if (row.sender === '学习助手') return 'el-icon-robot'
  return 'el-icon-user'
}

const getSenderType = (sender) => {
  if (sender === '系统通知') return 'primary'
  if (sender === '教务处') return 'warning'
  if (sender === '学习助手') return 'info'
  return 'success'
}

const formatTime = (timeString) => {
  const date = new Date(timeString)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else if (days === 1) {
    return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else if (days < 7) {
    return days + '天前'
  } else {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
  }
}

const getEmptyDescription = () => {
  if (messageFilter.value === 'unread') {
    return '暂无未读消息，所有消息都已阅读'
  } else if (messageFilter.value === 'read') {
    return '暂无已读消息'
  } else {
    return '暂无消息，稍后再来查看'
  }
}

const refreshMessages = () => {
  ElMessage.success('消息列表已刷新')
  // 这里可以添加刷新消息的逻辑
}

const handleSelectionChange = (val) => {
  selectedMessages.value = val
}

const handleRowClick = (row) => {
  if (!row.read) {
    row.read = true
    ElMessage.success('消息已标记为已读')
  }
}

const toggleReadStatus = (row) => {
  row.read = !row.read
  ElMessage.success(row.read ? '消息已标记为已读' : '消息已标记为未读')
}

const markAllAsRead = () => {
  messages.value.forEach(msg => {
    msg.read = true
  })
  ElMessage.success('所有消息已标记为已读')
}

const deleteMessage = (row) => {
  const index = messages.value.findIndex(msg => msg.id === row.id)
  if (index !== -1) {
    messages.value.splice(index, 1)
    ElMessage.success('消息已删除')
  }
}

const deleteSelectedMessages = () => {
  selectedMessages.value.forEach(msg => {
    const index = messages.value.findIndex(m => m.id === msg.id)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  })
  selectedMessages.value = []
  ElMessage.success('选中的消息已删除')
}

const viewMessageDetail = (row) => {
  if (!row.read) {
    row.read = true
    ElMessage.success('消息已标记为已读')
  }
  selectedMessage.value = row
  showMessageDetail.value = true
}

const closeMessageDetail = () => {
  showMessageDetail.value = false
  selectedMessage.value = null
}

const handleFilterChange = () => {
  // 筛选变化时的处理逻辑
}
</script>

<style scoped>
.inbox-page {
  padding: 0;
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%);
  position: relative;
}

.inbox-header {
  position: relative;
  overflow: hidden;
  padding: 40px 30px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20message%20background%20with%20blue%20gradient&image_size=landscape_16_9') center/cover;
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

.inbox-title {
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.inbox-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.inbox-actions {
  display: flex;
  gap: 10px;
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

.stat-icon.total-icon {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.stat-icon.unread-icon {
  background: linear-gradient(135deg, #f56c6c, #f78989);
}

.stat-icon.read-icon {
  background: linear-gradient(135deg, #67c23a, #85ce61);
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

.inbox-filters {
  margin: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.search-section {
  display: flex;
  align-items: center;
}

.el-table {
  margin: 0 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.el-table__header-wrapper {
  background: #f5f7fa;
}

.el-table__row:hover {
  background-color: #f0f9ff !important;
}

.unread-row {
  background-color: #fff7e6 !important;
}

.unread-title {
  font-weight: bold;
  color: #303133;
}

.message-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.message-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: white;
  flex-shrink: 0;
}

.message-icon.system-icon {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.message-icon.admin-icon {
  background: linear-gradient(135deg, #e6a23c, #ebb563);
}

.message-icon.helper-icon {
  background: linear-gradient(135deg, #909399, #c0c4cc);
}

.message-icon.teacher-icon {
  background: linear-gradient(135deg, #67c23a, #85ce61);
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f56c6c;
  flex-shrink: 0;
}

.message-content {
  line-height: 1.4;
  color: #606266;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.message-time {
  font-size: 12px;
  color: #909399;
}

.status-tag {
  cursor: pointer;
  transition: all 0.3s ease;
}

.status-tag:hover {
  transform: scale(1.05);
}

.empty-messages {
  margin: 50px 30px;
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  .inbox-header {
    padding: 30px 20px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .inbox-actions {
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
  
  .inbox-filters {
    margin: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .filter-section {
    width: 100%;
    justify-content: space-between;
  }
  
  .search-section {
    width: 100%;
  }
  
  .search-section .el-input {
    width: 100% !important;
  }
  
  .el-table {
    margin: 0 20px;
  }
  
  .empty-messages {
    margin: 30px 20px;
  }
  
  /* 消息详情弹窗样式 */
  .message-detail-dialog {
    border-radius: 12px;
    overflow: hidden;
  }
  
  .message-detail-content {
    padding: 20px 0;
  }
  
  .message-detail-header {
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 20px;
  }
  
  .message-detail-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    flex-shrink: 0;
  }
  
  .message-detail-icon.system-icon {
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
  }
  
  .message-detail-icon.admin-icon {
    background: linear-gradient(135deg, #e6a23c, #ebb563);
  }
  
  .message-detail-icon.helper-icon {
    background: linear-gradient(135deg, #909399, #c0c4cc);
  }
  
  .message-detail-icon.teacher-icon {
    background: linear-gradient(135deg, #67c23a, #85ce61);
  }
  
  .message-detail-info {
    flex: 1;
  }
  
  .message-detail-info h4 {
    font-size: 18px;
    font-weight: bold;
    color: #303133;
    margin: 0 0 10px 0;
  }
  
  .message-detail-sender {
    font-size: 14px;
    color: #606266;
    margin: 0 0 5px 0;
  }
  
  .message-detail-time {
    font-size: 14px;
    color: #909399;
    margin: 0;
  }
  
  .message-detail-body {
    margin-bottom: 20px;
  }
  
  .message-detail-body h5 {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin: 0 0 15px 0;
  }
  
  .message-detail-text {
    font-size: 14px;
    line-height: 1.6;
    color: #606266;
    margin: 0;
    white-space: pre-wrap;
  }
  
  .message-detail-footer {
    padding-top: 15px;
    border-top: 1px solid #e4e7ed;
    display: flex;
    justify-content: flex-end;
  }
}
</style>