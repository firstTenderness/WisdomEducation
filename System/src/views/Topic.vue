<template>
  <div class="topic-page">
    <div class="topic-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="topic-title">科普创作</h2>
          <p class="topic-subtitle">分享科学知识，记录探索发现</p>
        </div>
        <div class="topic-actions">
          <el-button type="primary" @click="createNewTopic">
            <i class="el-icon-plus"></i> 新建专题
          </el-button>
          <el-button @click="exportTopics">
            <i class="el-icon-download"></i> 导出专题
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 专题统计卡片 -->
    <div class="stats-container">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="stat-card">
            <div class="stat-icon total-icon"><i class="el-icon-document"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ topics.length }}</div>
              <div class="stat-label">总专题数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="stat-card">
            <div class="stat-icon published-icon"><i class="el-icon-s-flag"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ publishedCount }}</div>
              <div class="stat-label">已发布专题</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="stat-card">
            <div class="stat-icon views-icon"><i class="el-icon-view"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ totalViews }}</div>
              <div class="stat-label">总浏览量</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="topic-filters">
      <div class="filter-section">
        <span class="filter-label">专题状态：</span>
        <el-select v-model="topicFilter" placeholder="按状态筛选" clearable style="width: 150px;">
          <el-option label="全部" value="all"></el-option>
          <el-option label="草稿" value="draft"></el-option>
          <el-option label="发布" value="published"></el-option>
        </el-select>
      </div>
      <div class="search-section">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索专题"
          prefix-icon="el-icon-search"
          style="width: 250px;"
          clearable
        />
      </div>
    </div>
    
    <div class="topic-content-wrapper">
      <div class="topic-grid" v-if="!showTopicDetail && !showEditDialog">
        <el-row :gutter="20">
          <el-col :span="8" v-for="topic in filteredTopics" :key="topic.id">
            <el-card class="topic-card">
              <div class="topic-cover">
                <img :src="topic.cover" alt="专题封面" />
                <div class="topic-status-badge" :class="topic.status">
                  {{ topic.status === 'published' ? '已发布' : '草稿' }}
                </div>
              </div>
              <div class="topic-card-header">
                <h3 class="topic-name">{{ topic.title }}</h3>
              </div>
              <p class="topic-description">{{ topic.description }}</p>
              <div class="topic-meta">
                <div class="meta-item">
                  <i class="el-icon-time"></i>
                  <span>{{ formatDate(topic.createdAt) }}</span>
                </div>
                <div class="meta-item">
                  <i class="el-icon-view"></i>
                  <span>{{ topic.views }} 浏览</span>
                </div>
                <div class="meta-item">
                  <i class="el-icon-data-analysis"></i>
                  <span>{{ topic.category }}</span>
                </div>
              </div>
              <div class="topic-footer">
                <el-button type="primary" size="small" @click="editTopic(topic)">
                  <i class="el-icon-edit"></i> 编辑
                </el-button>
                <el-button size="small" @click="viewTopic(topic)">
                  <i class="el-icon-view"></i> 查看
                </el-button>
                <el-button 
                  size="small" 
                  :type="topic.status === 'published' ? 'warning' : 'success'"
                  @click="togglePublish(topic)"
                >
                  <i :class="topic.status === 'published' ? 'el-icon-s-finish' : 'el-icon-s-flag'"></i>
                  {{ topic.status === 'published' ? '下线' : '发布' }}
                </el-button>
                <el-button size="small" type="danger" @click="deleteTopic(topic)">
                  <i class="el-icon-delete"></i> 删除
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      
      <!-- 专题详情页面 -->
      <div v-if="showTopicDetail && selectedTopic" class="topic-detail-page">
        <div class="topic-detail-header">
          <el-button type="info" @click="closeTopicDetail">
            <i class="el-icon-arrow-left"></i> 返回列表
          </el-button>
          <h2>{{ selectedTopic.title }}</h2>
        </div>
        <div class="topic-detail-content">
          <div class="topic-detail-cover">
            <img :src="selectedTopic.cover" alt="专题封面" />
          </div>
          <div class="topic-detail-info">
            <div class="topic-status">
              <el-tag :type="selectedTopic.status === 'published' ? 'success' : 'warning'">
                {{ selectedTopic.status === 'published' ? '已发布' : '草稿' }}
              </el-tag>
            </div>
            <div class="topic-detail-body">
              <h3>专题介绍</h3>
              <p>{{ selectedTopic.description }}</p>
            </div>
            <div class="topic-detail-meta">
              <div class="meta-item">
                <i class="el-icon-time"></i>
                <span>创建时间：{{ formatDate(selectedTopic.createdAt) }}</span>
              </div>
              <div class="meta-item">
                <i class="el-icon-view"></i>
                <span>浏览量：{{ selectedTopic.views }}</span>
              </div>
              <div class="meta-item">
                <i class="el-icon-data-analysis"></i>
                <span>分类：{{ selectedTopic.category }}</span>
              </div>
            </div>
          </div>
          <div class="topic-detail-actions">
            <el-button type="primary" @click="editTopic(selectedTopic)">
              <i class="el-icon-edit"></i> 编辑
            </el-button>
            <el-button :type="selectedTopic.status === 'published' ? 'warning' : 'success'" @click="togglePublish(selectedTopic)">
              <i :class="selectedTopic.status === 'published' ? 'el-icon-s-finish' : 'el-icon-s-flag'"></i>
              {{ selectedTopic.status === 'published' ? '下线' : '发布' }}
            </el-button>
            <el-button type="danger" @click="deleteTopic(selectedTopic)">
              <i class="el-icon-delete"></i> 删除
            </el-button>
          </div>
        </div>
      </div>
      
      <!-- 编辑专题页面 -->
      <div v-if="showEditDialog" class="topic-edit-page">
        <div class="topic-edit-header">
          <el-button type="info" @click="closeEditDialog">
            <i class="el-icon-arrow-left"></i> {{ editingTopic ? '返回详情' : '返回列表' }}
          </el-button>
          <h2>{{ editingTopic ? '编辑专题' : '新建专题' }}</h2>
        </div>
        <div class="topic-edit-content">
          <el-form :model="topicForm" label-width="100px">
            <el-form-item label="专题标题">
              <el-input v-model="topicForm.title" placeholder="请输入专题标题" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="专题描述">
              <el-input
                v-model="topicForm.description"
                type="textarea"
                rows="4"
                placeholder="请输入专题描述"
                style="width: 100%;"
              />
            </el-form-item>
            <el-form-item label="专题分类">
              <el-select v-model="topicForm.category" placeholder="请选择分类" style="width: 100%;">
                <el-option label="生物科普" value="生物科普" />
                <el-option label="气象科普" value="气象科普" />
                <el-option label="实验科普" value="实验科普" />
                <el-option label="天文科普" value="天文科普" />
                <el-option label="环保科普" value="环保科普" />
              </el-select>
            </el-form-item>
            <el-form-item label="专题状态">
              <el-radio-group v-model="topicForm.status">
                <el-radio label="published">已发布</el-radio>
                <el-radio label="draft">草稿</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div class="topic-edit-actions">
            <el-button @click="closeEditDialog">取消</el-button>
            <el-button type="primary" @click="saveTopic">保存</el-button>
          </div>
        </div>
      </div>
      
      <div v-if="filteredTopics.length === 0 && !showTopicDetail && !showEditDialog" class="empty-topics">
        <div class="empty-content">
          <div class="empty-icon"><i class="el-icon-document"></i></div>
          <h3 class="empty-title">暂无专题</h3>
          <p class="empty-description">开始创建您的第一个专题吧！</p>
          <el-button type="primary" @click="createNewTopic">
            <i class="el-icon-plus"></i> 新建专题
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
const topicFilter = ref('all')
const showTopicDetail = ref(false)
const selectedTopic = ref(null)
const showEditDialog = ref(false)
const editingTopic = ref(null)
const topicForm = ref({
  title: '',
  description: '',
  category: '',
  status: 'draft'
})
const topics = ref([
  {
    id: 1,
    title: '大山里的奇妙生物',
    description: '探索山区常见的动植物，了解它们的生活习性和生态价值，培养对自然的热爱。',
    status: 'published',
    createdAt: '2024-01-20',
    views: 1567,
    category: '生物科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20mountain%20wildlife%20science%20cover%20with%20animals%20and%20plants%20for%20children&image_size=square'
  },
  {
    id: 2,
    title: '神奇的天气变化',
    description: '了解天气的形成原因，学习观察云的变化预测天气，探索山区独特的气候现象。',
    status: 'published',
    createdAt: '2024-01-18',
    views: 1234,
    category: '气象科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magic%20weather%20changes%20science%20cover%20with%20clouds%20and%20rainbow%20for%20kids&image_size=square'
  },
  {
    id: 3,
    title: '简单有趣的科学小实验',
    description: '用身边的材料做科学实验，探索科学原理，培养动手能力和科学思维。',
    status: 'published',
    createdAt: '2024-01-15',
    views: 987,
    category: '实验科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fun%20science%20experiments%20cover%20with%20kids%20doing%20experiments%20for%20children&image_size=square'
  },
  {
    id: 4,
    title: '星空探秘',
    description: '认识常见的星座和天体，了解宇宙的奥秘，培养对天文学的兴趣。',
    status: 'published',
    createdAt: '2024-01-10',
    views: 1890,
    category: '天文科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starry%20sky%20exploration%20science%20cover%20with%20constellations%20for%20kids&image_size=square'
  },
  {
    id: 5,
    title: '山区环境保护',
    description: '了解山区生态环境的重要性，学习如何保护我们的家园，从小树立环保意识。',
    status: 'draft',
    createdAt: '2024-01-05',
    views: 0,
    category: '环保科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mountain%20environmental%20protection%20cover%20with%20green%20nature%20for%20children&image_size=square'
  }
])

const publishedCount = computed(() => {
  return topics.value.filter(topic => topic.status === 'published').length
})

const totalViews = computed(() => {
  return topics.value.reduce((sum, topic) => sum + topic.views, 0)
})

const filteredTopics = computed(() => {
  let result = [...topics.value]
  
  // 按状态筛选
  if (topicFilter.value !== 'all') {
    result = result.filter(topic => topic.status === topicFilter.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(topic => 
      topic.title.toLowerCase().includes(keyword) ||
      topic.description.toLowerCase().includes(keyword)
    )
  }
  
  // 按创建时间排序
  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const createNewTopic = () => {
  editingTopic.value = null
  topicForm.value = {
    title: '',
    description: '',
    category: '',
    status: 'draft'
  }
  showEditDialog.value = true
}

const editTopic = (topic) => {
  editingTopic.value = topic
  topicForm.value = {
    title: topic.title,
    description: topic.description,
    category: topic.category,
    status: topic.status
  }
  showEditDialog.value = true
}

const viewTopic = (topic) => {
  topic.views++
  selectedTopic.value = topic
  showTopicDetail.value = true
}

const closeTopicDetail = () => {
  showTopicDetail.value = false
  selectedTopic.value = null
}

const closeEditDialog = () => {
  showEditDialog.value = false
  editingTopic.value = null
}

const saveTopic = () => {
  if (!topicForm.value.title.trim()) {
    ElMessage.warning('专题标题不能为空')
    return
  }
  
  if (!topicForm.value.description.trim()) {
    ElMessage.warning('专题描述不能为空')
    return
  }
  
  if (!topicForm.value.category) {
    ElMessage.warning('请选择专题分类')
    return
  }
  
  if (editingTopic.value) {
    // 编辑现有专题
    editingTopic.value.title = topicForm.value.title
    editingTopic.value.description = topicForm.value.description
    editingTopic.value.category = topicForm.value.category
    editingTopic.value.status = topicForm.value.status
    ElMessage.success('专题编辑成功')
  } else {
    // 创建新专题
    const newTopic = {
      id: topics.value.length + 1,
      title: topicForm.value.title,
      description: topicForm.value.description,
      status: topicForm.value.status,
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
      category: topicForm.value.category,
      cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20education%20topic%20cover%20with%20colorful%20elements%20for%20children&image_size=square'
    }
    topics.value.unshift(newTopic)
    ElMessage.success('专题创建成功')
  }
  
  closeEditDialog()
}

const togglePublish = (topic) => {
  topic.status = topic.status === 'published' ? 'draft' : 'published'
  ElMessage.success(topic.status === 'published' ? '专题已发布' : '专题已下线')
}

const deleteTopic = (topic) => {
  const index = topics.value.findIndex(t => t.id === topic.id)
  if (index !== -1) {
    topics.value.splice(index, 1)
    ElMessage.success('专题已删除')
  }
}

const exportTopics = () => {
  ElMessage.success('专题导出功能已触发')
  // 这里可以添加导出专题的逻辑
}
</script>

<style scoped>
.topic-page {
  padding: 0;
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%);
  position: relative;
}

.topic-header {
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
  background: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20education%20topic%20background%20with%20blue%20gradient&image_size=landscape_16_9') center/cover;
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

.topic-title {
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.topic-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.topic-actions {
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

.stat-icon.published-icon {
  background: linear-gradient(135deg, #67c23a, #85ce61);
}

.stat-icon.views-icon {
  background: linear-gradient(135deg, #e6a23c, #ebb563);
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

.topic-filters {
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

.topic-grid {
  padding: 0 30px 30px;
}

.topic-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.topic-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.topic-cover {
    position: relative;
    height: 120px;
    overflow: hidden;
  }
  
  .topic-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .topic-card:hover .topic-cover img {
    transform: scale(1.1);
  }
  
  .topic-status-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 6px 14px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

.topic-card:hover .topic-status-badge {
  transform: scale(1.05);
}

.topic-status-badge.published {
  background-color: #67c23a;
}

.topic-status-badge.draft {
  background-color: #e6a23c;
}

.topic-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.topic-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #303133;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topic-description {
  margin: 0 0 15px 0;
  line-height: 1.4;
  color: #606266;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
  font-size: 12px;
  color: #909399;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-item i {
  font-size: 12px;
}

.topic-footer {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.topic-footer .el-button {
  flex: 1;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.topic-footer .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.empty-topics {
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
  .topic-header {
    padding: 30px 20px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .topic-actions {
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
  
  .topic-filters {
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
  
  .topic-grid {
    padding: 0 20px 20px;
  }
  
  .topic-cover {
    height: 140px;
    position: relative;
  }
  
  .topic-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .topic-status-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .topic-status-badge.published {
    background-color: #f0f9eb;
    color: #67c23a;
    border: 1px solid #e1f5dc;
  }
  
  .topic-status-badge.draft {
    background-color: #fdf6ec;
    color: #e6a23c;
    border: 1px solid #faecd8;
  }
  
  .topic-card-header {
    margin: 15px 0 10px;
  }
  
  .topic-name {
    font-size: 16px;
    font-weight: bold;
    color: #303133;
    margin: 0;
  }
  
  .topic-description {
    font-size: 14px;
    line-height: 1.5;
    color: #606266;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .topic-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .topic-meta .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #909399;
  }
  
  .topic-footer {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .empty-topics {
    margin: 30px 20px;
  }
  
  /* 专题详情页面样式 */
  .topic-detail-page {
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }
  
  .topic-detail-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
  }
  
  .topic-detail-header h2 {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
    margin: 0;
  }
  
  .topic-detail-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .topic-detail-cover {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 8px;
  }
  
  .topic-detail-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .topic-detail-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .topic-status {
    align-self: flex-start;
  }
  
  .topic-detail-body h3 {
    font-size: 18px;
    font-weight: bold;
    color: #303133;
    margin: 0 0 15px 0;
  }
  
  .topic-detail-body p {
    font-size: 16px;
    line-height: 1.6;
    color: #606266;
    margin: 0;
  }
  
  .topic-detail-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-top: 20px;
    border-top: 1px solid #e4e7ed;
  }
  
  .topic-detail-meta .meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #909399;
  }
  
  .topic-detail-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-start;
    padding-top: 20px;
    border-top: 1px solid #e4e7ed;
  }
  
  /* 编辑专题页面样式 */
  .topic-edit-page {
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }
  
  .topic-edit-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
  }
  
  .topic-edit-header h2 {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
    margin: 0;
  }
  
  .topic-edit-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  .topic-edit-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    padding-top: 20px;
    border-top: 1px solid #e4e7ed;
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .topic-detail-page,
    .topic-edit-page {
      padding: 15px;
      margin: 10px 0;
    }
    
    .topic-detail-header,
    .topic-edit-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding-bottom: 15px;
    }
    
    .topic-detail-header h2,
    .topic-edit-header h2 {
      font-size: 20px;
    }
    
    .topic-detail-cover {
      max-height: 250px;
    }
    
    .topic-detail-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .topic-detail-actions,
    .topic-edit-actions {
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .topic-footer {
      flex-direction: column;
    }
    
    .topic-footer .el-button {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .topic-detail-cover {
      max-height: 200px;
    }
    
    .topic-detail-body p {
      font-size: 14px;
    }
  }
}
</style>