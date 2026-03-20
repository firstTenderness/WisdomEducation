<template>
  <div class="topic-page">
    <div class="topic-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">

          <h2 class="topic-title">妙思创作间</h2>
          <p class="topic-subtitle">AI驱动的创意创作平台</p>
        </div>
        <div class="topic-actions">
          <el-button type="primary" @click="createNewTopic" class="action-button primary">
            <i class="el-icon-plus"></i> 新建专题
          </el-button>
          <el-button type="success" @click="openAICreativity" class="action-button success">
            <i class="el-icon-lightbulb"></i> AI创意灵感
          </el-button>
          <el-button type="warning" @click="openCreationTools" class="action-button warning">
            <i class="el-icon-edit"></i> 多元创作工具
          </el-button>
          <el-button @click="exportTopics" class="action-button default">
            <i class="el-icon-download"></i> 导出专题
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 专题统计卡片 -->
    <div class="stats-container">
      <el-row :gutter="24">
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
          class="search-input"
        />
      </div>
    </div>
    
    <div class="topic-content-wrapper">
      <div class="topic-grid" v-if="!showTopicDetail && !showEditDialog">
        <div class="topic-container">
          <div v-for="topic in filteredTopics" :key="topic.id" class="topic-item">
            <el-card class="topic-card">
              <div class="topic-cover">
                <div v-if="!topic.coverLoaded && !topic.coverError" class="image-loading">
                  <i class="el-icon-loading"></i>
                  <span>加载中...</span>
                </div>
                <img 
                  :src="topic.cover" 
                  alt="专题封面" 
                  @load="topic.coverLoaded = true; topic.coverError = false"
                  @error="topic.coverError = true; topic.coverLoaded = false"
                  loading="lazy"
                  decoding="async"
                />
                <div v-if="topic.coverError" class="image-error">
                  <i class="el-icon-picture-outline"></i>
                  <span>图片加载失败</span>
                </div>
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
                <el-button type="primary" size="small" @click="editTopic(topic)" class="topic-btn edit">
                  <i class="el-icon-edit"></i> 编辑
                </el-button>
                <el-button size="small" @click="viewTopic(topic)" class="topic-btn view">
                  <i class="el-icon-view"></i> 查看
                </el-button>
                <el-button 
                  size="small" 
                  :type="topic.status === 'published' ? 'warning' : 'success'"
                  @click="togglePublish(topic)"
                  class="topic-btn publish"
                >
                  <i :class="topic.status === 'published' ? 'el-icon-s-finish' : 'el-icon-s-flag'"></i>
                  {{ topic.status === 'published' ? '下线' : '发布' }}
                </el-button>
                <el-button size="small" type="danger" @click="deleteTopic(topic)" class="topic-btn delete">
                  <i class="el-icon-delete"></i> 删除
                </el-button>
              </div>
            </el-card>
          </div>
        </div>
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
            <div v-if="!selectedTopic.coverLoaded && !selectedTopic.coverError" class="image-loading">
              <i class="el-icon-loading"></i>
              <span>加载中...</span>
            </div>
            <img 
              :src="selectedTopic.cover" 
              alt="专题封面" 
              @load="selectedTopic.coverLoaded = true; selectedTopic.coverError = false"
              @error="selectedTopic.coverError = true; selectedTopic.coverLoaded = false"
              loading="lazy"
              decoding="async"
            />
            <div v-if="selectedTopic.coverError" class="image-error">
              <i class="el-icon-picture-outline"></i>
              <span>图片加载失败</span>
            </div>
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
    
    <!-- AI创意灵感弹窗 -->
    <el-dialog
      v-model="showAICreativityDialog"
      title="AI创意灵感"
      width="800px"
      class="ai-creativity-dialog"
    >
      <div class="ai-creativity-content">
        <el-form :model="aiForm" label-width="120px">
          <el-form-item label="创作类型">
            <el-select v-model="aiForm.type" placeholder="选择创作类型" style="width: 100%;">
              <el-option label="科普文章" value="science" />
              <el-option label="故事创作" value="story" />
              <el-option label="诗歌创作" value="poetry" />
              <el-option label="实验设计" value="experiment" />
            </el-select>
          </el-form-item>
          <el-form-item label="主题关键词">
            <el-input v-model="aiForm.keywords" placeholder="输入主题关键词，用逗号分隔" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="创意要求">
            <el-input
              v-model="aiForm.requirements"
              type="textarea"
              rows="3"
              placeholder="输入创意要求和方向"
              style="width: 100%;"
            />
          </el-form-item>
        </el-form>
        <div class="ai-loading" v-if="aiLoading">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>AI正在生成创意灵感...</span>
        </div>
        <div class="ai-results" v-else-if="aiResults.length > 0">
          <h4>AI生成的创意灵感：</h4>
          <el-divider />
          <div v-for="(result, index) in aiResults" :key="index" class="ai-result-item">
            <div class="result-title">创意 {{ index + 1 }}</div>
            <div class="result-content">{{ result }}</div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAICreativityDialog = false">取消</el-button>
          <el-button type="primary" @click="generateCreativity" :loading="aiLoading">生成灵感</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 多元创作工具弹窗 -->
    <el-dialog
      v-model="showCreationToolsDialog"
      title="多元创作工具"
      width="900px"
      class="creation-tools-dialog"
    >
      <div class="creation-tools-content">
        <el-tabs v-model="activeTool">
          <el-tab-pane label="文字创作" name="text">
            <div class="tool-content">
              <el-input
                v-model="textContent"
                type="textarea"
                rows="10"
                placeholder="在这里进行文字创作..."
                style="width: 100%;"
              />
              <div class="tool-actions">
                <el-button type="primary" @click="saveTextCreation">保存创作</el-button>
                <el-button @click="clearTextCreation">清空</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图像创作" name="image">
            <div class="tool-content">
              <el-input
                v-model="imagePrompt"
                placeholder="输入图像描述，AI将生成相应的图像"
                style="width: 100%; margin-bottom: 20px;"
              />
              <div class="image-preview" v-if="generatedImage">
                <img :src="generatedImage" alt="生成的图像" />
              </div>
              <div class="image-loading" v-if="imageLoading">
                <el-icon class="is-loading"><Loading /></el-icon>
                <span>正在生成图像...</span>
              </div>
              <div class="tool-actions">
                <el-button type="primary" @click="generateImage" :loading="imageLoading">生成图像</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="音频创作" name="audio">
            <div class="tool-content">
              <el-input
                v-model="audioText"
                placeholder="输入文本，AI将转换为语音"
                style="width: 100%; margin-bottom: 20px;"
              />
              <div class="audio-player" v-if="audioUrl">
                <el-button type="primary" @click="playAudio">播放音频</el-button>
              </div>
              <div class="audio-loading" v-if="audioLoading">
                <el-icon class="is-loading"><Loading /></el-icon>
                <span>正在生成音频...</span>
              </div>
              <div class="tool-actions">
                <el-button type="primary" @click="generateAudio" :loading="audioLoading">生成音频</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCreationToolsDialog = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()


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

// AI创意灵感相关
const showAICreativityDialog = ref(false)
const aiForm = ref({
  type: '',
  keywords: '',
  requirements: ''
})
const aiLoading = ref(false)
const aiResults = ref([])

// 多元创作工具相关
const showCreationToolsDialog = ref(false)
const activeTool = ref('text')
const textContent = ref('')
const imagePrompt = ref('')
const generatedImage = ref('')
const imageLoading = ref(false)
const audioText = ref('')
const audioUrl = ref('')
const audioLoading = ref(false)
const topics = ref([
  {
    id: 1,
    title: '大山里的奇妙生物',
    description: '探索山区常见的动植物，了解它们的生活习性和生态价值，培养对自然的热爱。',
    status: 'published',
    createdAt: '2024-01-20',
    views: 1567,
    category: '生物科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20mountain%20wildlife%20science%20cover%20with%20animals%20and%20plants%20for%20children&image_size=square',
    coverLoaded: false,
    coverError: false
  },
  {
    id: 2,
    title: '神奇的天气变化',
    description: '了解天气的形成原因，学习观察云的变化预测天气，探索山区独特的气候现象。',
    status: 'published',
    createdAt: '2024-01-18',
    views: 1234,
    category: '气象科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magic%20weather%20changes%20science%20cover%20with%20clouds%20and%20rainbow%20for%20kids&image_size=square',
    coverLoaded: false,
    coverError: false
  },
  {
    id: 3,
    title: '简单有趣的科学小实验',
    description: '用身边的材料做科学实验，探索科学原理，培养动手能力和科学思维。',
    status: 'published',
    createdAt: '2024-01-15',
    views: 987,
    category: '实验科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fun%20science%20experiments%20cover%20with%20kids%20doing%20experiments%20for%20children&image_size=square',
    coverLoaded: false,
    coverError: false
  },
  {
    id: 4,
    title: '星空探秘',
    description: '认识常见的星座和天体，了解宇宙的奥秘，培养对天文学的兴趣。',
    status: 'published',
    createdAt: '2024-01-10',
    views: 1890,
    category: '天文科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starry%20sky%20exploration%20science%20cover%20with%20constellations%20for%20kids&image_size=square',
    coverLoaded: false,
    coverError: false
  },
  {
    id: 5,
    title: '山区环境保护',
    description: '了解山区生态环境的重要性，学习如何保护我们的家园，从小树立环保意识。',
    status: 'draft',
    createdAt: '2024-01-05',
    views: 0,
    category: '环保科普',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mountain%20environmental%20protection%20cover%20with%20green%20nature%20for%20children&image_size=square',
    coverLoaded: false,
    coverError: false
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
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20education%20topic%20cover%20with%20colorful%20elements%20for%20children&image_size=square',
    coverLoaded: false,
    coverError: false
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

// AI创意灵感相关方法
const openAICreativity = () => {
  showAICreativityDialog.value = true
  aiResults.value = []
}

const openCreationTools = () => {
  showCreationToolsDialog.value = true
}

const generateCreativity = async () => {
  if (!aiForm.value.type) {
    ElMessage.warning('请选择创作类型')
    return
  }
  
  if (!aiForm.value.keywords) {
    ElMessage.warning('请输入主题关键词')
    return
  }
  
  aiLoading.value = true
  
  try {
    // 模拟AI生成创意灵感
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 生成模拟结果
    aiResults.value = [
      `基于关键词"${aiForm.value.keywords}"的${aiForm.value.type === 'science' ? '科普文章' : aiForm.value.type === 'story' ? '故事创作' : aiForm.value.type === 'poetry' ? '诗歌创作' : '实验设计'}创意：探索自然的奥秘，从微观世界到宏观宇宙，发现科学的魅力。`,
      `创意方向：结合${aiForm.value.keywords}，通过生动的案例和实验，让读者深入了解科学原理，培养科学思维。`,
      `创新点：将${aiForm.value.keywords}与日常生活相结合，通过有趣的现象和实验，激发读者的好奇心和探索欲。`
    ]
    
    ElMessage.success('创意灵感生成成功')
  } catch (error) {
    ElMessage.error('生成创意灵感失败')
  } finally {
    aiLoading.value = false
  }
}

// 多元创作工具相关方法
const saveTextCreation = () => {
  if (!textContent.value.trim()) {
    ElMessage.warning('请输入创作内容')
    return
  }
  
  ElMessage.success('文字创作保存成功')
  // 这里可以添加保存文字创作的逻辑
}

const clearTextCreation = () => {
  textContent.value = ''
  ElMessage.info('已清空创作内容')
}

const generateImage = async () => {
  if (!imagePrompt.value.trim()) {
    ElMessage.warning('请输入图像描述')
    return
  }
  
  imageLoading.value = true
  
  try {
    // 模拟生成图像
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 生成模拟图像URL
    generatedImage.value = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(imagePrompt.value)}&image_size=square`
    
    ElMessage.success('图像生成成功')
  } catch (error) {
    ElMessage.error('生成图像失败')
  } finally {
    imageLoading.value = false
  }
}

const generateAudio = async () => {
  if (!audioText.value.trim()) {
    ElMessage.warning('请输入文本内容')
    return
  }
  
  audioLoading.value = true
  
  try {
    // 模拟生成音频
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 生成模拟音频URL
    audioUrl.value = 'https://example.com/audio.mp3'
    
    ElMessage.success('音频生成成功')
  } catch (error) {
    ElMessage.error('生成音频失败')
  } finally {
    audioLoading.value = false
  }
}

const playAudio = () => {
  ElMessage.success('音频播放功能已触发')
  // 这里可以添加音频播放的逻辑
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
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  flex-wrap: wrap;
}

.action-button {
  border-radius: 25px !important;
  padding: 8px 20px !important;
  font-weight: 500 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

.action-button:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
}

.action-button.primary {
  background: linear-gradient(135deg, #3b82f6, #60a5fa) !important;
  border: none !important;
  color: white !important;
}

.action-button.success {
  background: linear-gradient(135deg, #67c23a, #85ce61) !important;
  border: none !important;
  color: white !important;
}

.action-button.warning {
  background: linear-gradient(135deg, #e6a23c, #ebb563) !important;
  border: none !important;
  color: white !important;
}

.action-button.default {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: white !important;
}

.stats-container {
  padding: 0 30px;
  margin-top: -30px;
  position: relative;
  z-index: 3;
}

.stat-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.stat-card .el-card__body {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
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
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.stat-label {
  font-size: 14px;
  color: #606266;
  margin: 8px 0 0 0;
}

.topic-filters {
  margin: 30px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.search-section {
  display: flex;
  align-items: center;
}

.search-input {
  border-radius: 25px !important;
  border: 1px solid #e4e7ed !important;
  transition: all 0.3s ease !important;
}

.search-input:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
}

.topic-grid {
  padding: 0 30px 30px;
}

.topic-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 0 -12px;
}

.topic-item {
  flex: 1 1 300px;
  max-width: calc(33.333% - 24px);
  padding: 0 12px;
}

@media (max-width: 1024px) {
  .topic-item {
    max-width: calc(50% - 24px);
  }
}

@media (max-width: 768px) {
  .topic-item {
    max-width: 100%;
    flex: 1 1 100%;
  }
  
  .topic-container {
    margin: 0 -10px;
    gap: 20px;
  }
  
  .topic-item {
    padding: 0 10px;
  }
}

.topic-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  background: white;
  position: relative;
}

.topic-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.topic-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  background-color: #f5f7fa;
}

.topic-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  color: #606266;
  font-size: 14px;
}

.image-loading i {
  font-size: 24px;
  margin-bottom: 8px;
  animation: spin 1s linear infinite;
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fef0f0;
  color: #f56c6c;
  font-size: 14px;
}

.image-error i {
  font-size: 24px;
  margin-bottom: 8px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.topic-card:hover .topic-cover img {
  transform: scale(1.1);
}

.topic-status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.topic-card:hover .topic-status-badge {
  transform: scale(1.05);
}

.topic-status-badge.published {
  background: linear-gradient(135deg, #67c23a, #85ce61);
}

.topic-status-badge.draft {
  background: linear-gradient(135deg, #e6a23c, #ebb563);
}

.topic-card .el-card__body {
  padding: 24px;
}

.topic-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.topic-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 16px 0;
  color: #303133;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topic-description {
  margin: 0 0 20px 0;
  line-height: 1.5;
  color: #606266;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 13px;
  color: #909399;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-item i {
  font-size: 13px;
}

.topic-footer {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.topic-btn {
  flex: 1;
  border-radius: 20px !important;
  padding: 6px 0 !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
}

.topic-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.topic-btn.edit {
  background: linear-gradient(135deg, #3b82f6, #60a5fa) !important;
  border: none !important;
  color: white !important;
}

.topic-btn.view {
  background: transparent !important;
  border: 1px solid #3b82f6 !important;
  color: #3b82f6 !important;
}

.topic-btn.publish {
  background: transparent !important;
  border: 1px solid #67c23a !important;
  color: #67c23a !important;
}

.topic-btn.publish[type="warning"] {
  border: 1px solid #e6a23c !important;
  color: #e6a23c !important;
}

.topic-btn.delete {
  background: transparent !important;
  border: 1px solid #f56c6c !important;
  color: #f56c6c !important;
}

.topic-btn.delete:hover {
  background: rgba(245, 108, 108, 0.1) !important;
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
  background-color: #f5f7fa;
  position: relative;
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

/* AI创意灵感弹窗样式 */
.ai-creativity-dialog .el-dialog__body {
  padding: 30px;
}

.ai-creativity-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ai-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 10px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.ai-results {
  margin-top: 20px;
}

.ai-result-item {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.result-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}

.result-content {
  color: #606266;
  line-height: 1.5;
}

/* 多元创作工具弹窗样式 */
.creation-tools-dialog .el-dialog__body {
  padding: 30px;
}

.creation-tools-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tool-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;
}

.image-preview {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-loading,
.audio-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 10px;
  background-color: #f5f7fa;
  border-radius: 8px;
  margin: 20px 0;
}

.audio-player {
  margin: 20px 0;
}
</style>