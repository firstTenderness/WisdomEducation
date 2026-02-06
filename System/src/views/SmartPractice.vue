<template>
  <div class="practice-page">
    <!-- 渐变背景头部 -->
    <div class="practice-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="practice-title">趣味练习中心</h2>
          <p class="practice-subtitle">快乐学习，趣味挑战，轻松提升</p>
        </div>
        <div class="practice-actions">
          <el-select v-model="selectedSubject" placeholder="选择科目" style="width: 150px; margin-right: 10px;">
            <el-option label="全部" value="all"></el-option>
            <el-option label="语文" value="chinese"></el-option>
            <el-option label="数学" value="math"></el-option>
            <el-option label="科学" value="science"></el-option>
            <el-option label="英语" value="english"></el-option>
            <el-option label="艺术" value="art"></el-option>
          </el-select>
          <el-select v-model="selectedDifficulty" placeholder="选择难度" style="width: 150px; margin-right: 10px;">
            <el-option label="全部" value="all"></el-option>
            <el-option label="简单" value="easy"></el-option>
            <el-option label="中等" value="medium"></el-option>
            <el-option label="困难" value="hard"></el-option>
          </el-select>
          <el-button type="primary" @click="startPractice">
            <i class="el-icon-video-play"></i> 开始练习
          </el-button>
          <el-button @click="viewHistory">
            <i class="el-icon-time"></i> 练习历史
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 练习统计卡片 -->
    <div v-if="!isPracticing" class="practice-stats">
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon practice-icon"><i class="el-icon-video-play"></i></div>
          <div class="stat-info">
            <div class="stat-label">练习次数</div>
            <div class="stat-value">{{ practiceCount }}</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon correct-icon"><i class="el-icon-check"></i></div>
          <div class="stat-info">
            <div class="stat-label">正确率</div>
            <div class="stat-value">{{ correctRate }}%</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon time-icon"><i class="el-icon-time"></i></div>
          <div class="stat-info">
            <div class="stat-label">总练习时间</div>
            <div class="stat-value">{{ totalPracticeTime }}分钟</div>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" class="stat-card">
        <div class="stat-item">
          <div class="stat-icon level-icon"><i class="el-icon-medal"></i></div>
          <div class="stat-info">
            <div class="stat-label">练习等级</div>
            <div class="stat-value">{{ practiceLevel }}</div>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 练习模式选择 -->
    <div v-if="!isPracticing" class="practice-modes">
      <el-card class="mode-card single-choice" @click="selectMode('single')">
        <div class="el-card__body">
          <div class="mode-icon">
            <i class="el-icon-coin"></i>
          </div>
          <h3 class="mode-title">单题练习</h3>
          <p class="mode-description">选择单个题目进行练习，适合针对性训练</p>
          <div class="mode-features">
            <el-tag size="small" effect="plain" class="feature-tag">针对性强</el-tag>
            <el-tag size="small" effect="plain" class="feature-tag">时间灵活</el-tag>
          </div>
        </div>
      </el-card>
      <el-card class="mode-card multiple-choice" @click="selectMode('batch')">
        <div class="el-card__body">
          <div class="mode-icon">
            <i class="el-icon-s-grid"></i>
          </div>
          <h3 class="mode-title">批量练习</h3>
          <p class="mode-description">选择多个题目进行批量练习，适合综合训练</p>
          <div class="mode-features">
            <el-tag size="small" effect="plain" class="feature-tag">综合训练</el-tag>
            <el-tag size="small" effect="plain" class="feature-tag">效率高</el-tag>
          </div>
        </div>
      </el-card>
      <el-card class="mode-card true-false" @click="selectMode('exam')">
        <div class="el-card__body">
          <div class="mode-icon">
            <i class="el-icon-trophy"></i>
          </div>
          <h3 class="mode-title">模拟考试</h3>
          <p class="mode-description">按照考试标准进行模拟测试，适合考前冲刺</p>
          <div class="mode-features">
            <el-tag size="small" effect="plain" class="feature-tag">考试环境</el-tag>
            <el-tag size="small" effect="plain" class="feature-tag">限时训练</el-tag>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 练习内容 -->
    <div v-else class="practice-content">
      <div class="practice-info">
        <h3 class="practice-name">{{ currentPractice.name }}</h3>
        <div class="practice-stats">
          <span class="stat-item">
            <i class="el-icon-question"></i> 共 {{ currentPractice.questions.length }} 题
          </span>
          <span class="stat-item">
            <i class="el-icon-time"></i> 限时 {{ currentPractice.timeLimit }} 分钟
          </span>
          <span class="stat-item">
            <i class="el-icon-medal"></i> 难度：{{ getDifficultyText(currentPractice.difficulty) }}
          </span>
        </div>
      </div>
      
      <div class="questions-container">
        <el-card 
          v-for="(question, index) in currentPractice.questions" 
          :key="question.id" 
          class="question-card"
          :class="{ 'question-answered': answers[question.id] }"
        >
          <div class="question-header">
            <h4 class="question-number">第 {{ index + 1 }} 题</h4>
            <el-tag :type="getQuestionTypeTag(question.type)">{{ getQuestionTypeText(question.type) }}</el-tag>
          </div>
          
          <div class="question-content">
            <p class="question-title">{{ question.title }}</p>
            
            <!-- 选择题 -->
            <div v-if="question.type === 'single' || question.type === 'multiple'" class="question-options">
              <el-radio-group 
                v-if="question.type === 'single'" 
                v-model="answers[question.id]"
                @change="handleAnswerChange(question.id)"
              >
                <el-radio 
                  v-for="(option, optIndex) in question.options" 
                  :key="optIndex" 
                  :label="option.label"
                  class="option-item"
                >
                  {{ option.label }}. {{ option.content }}
                </el-radio>
              </el-radio-group>
              
              <el-checkbox-group 
                v-else 
                v-model="answers[question.id]"
                @change="handleAnswerChange(question.id)"
              >
                <el-checkbox 
                  v-for="(option, optIndex) in question.options" 
                  :key="optIndex" 
                  :label="option.label"
                  class="option-item"
                >
                  {{ option.label }}. {{ option.content }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            
            <!-- 填空题 -->
            <div v-else-if="question.type === 'fill'" class="question-fill">
              <el-input 
                v-model="answers[question.id]"
                placeholder="请输入答案"
                @change="handleAnswerChange(question.id)"
                class="fill-input"
              />
            </div>
            
            <!-- 简答题 -->
            <div v-else-if="question.type === 'essay'" class="question-essay">
              <el-input 
                v-model="answers[question.id]"
                type="textarea"
                :rows="4"
                placeholder="请输入答案"
                @change="handleAnswerChange(question.id)"
                class="essay-input"
              />
            </div>
          </div>
        </el-card>
      </div>
      
      <div class="practice-footer">
        <div class="progress-info">
          <el-progress 
            :percentage="progress" 
            :stroke-width="10"
            :color="getProgressColor()"
          />
          <span class="progress-text">
            已完成 {{ answeredCount }} / {{ currentPractice.questions.length }} 题
          </span>
        </div>
        <div class="footer-buttons">
          <el-button @click="cancelPractice">
            <i class="el-icon-close"></i> 取消练习
          </el-button>
          <el-button type="warning" @click="checkAnswers">
            <i class="el-icon-view"></i> 检查答案
          </el-button>
          <el-button type="primary" @click="submitPractice">
            <i class="el-icon-check"></i> 提交答案
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 练习结果 -->
    <div v-if="showResult" class="practice-result">
      <el-card class="result-card">
        <div class="result-header">
          <h3 class="result-title">练习结果</h3>
          <el-tag :type="getResultType(result.score)" size="large">{{ result.score }} 分</el-tag>
        </div>
        
        <div class="result-stats">
          <div class="stat-box correct">
            <i class="el-icon-check"></i>
            <span class="stat-number">{{ result.correctCount }}</span>
            <span class="stat-label">正确</span>
          </div>
          <div class="stat-box incorrect">
            <i class="el-icon-close"></i>
            <span class="stat-number">{{ result.incorrectCount }}</span>
            <span class="stat-label">错误</span>
          </div>
          <div class="stat-box unanswered">
            <i class="el-icon-question"></i>
            <span class="stat-number">{{ result.unansweredCount }}</span>
            <span class="stat-label">未答</span>
          </div>
          <div class="stat-box time">
            <i class="el-icon-time"></i>
            <span class="stat-number">{{ result.usedTime }}</span>
            <span class="stat-label">用时(分钟)</span>
          </div>
        </div>
        
        <div class="result-analysis">
          <h4 class="analysis-title">答题分析</h4>
          <p class="analysis-content">{{ result.analysis }}</p>
        </div>
        
        <div class="result-footer">
          <el-button @click="showResult = false; isPracticing = false">
            <i class="el-icon-back"></i> 返回
          </el-button>
          <el-button type="primary" @click="restartPractice">
            <i class="el-icon-refresh"></i> 重新练习
          </el-button>
          <el-button type="success" @click="viewExplanation">
            <i class="el-icon-view"></i> 查看解析
          </el-button>
          <el-button type="info" @click="showDialectExplanation = true">
            <i class="el-icon-microphone"></i> 乡音辅导解析
          </el-button>
        </div>
      </el-card>
    </div>
    
    <!-- 查看解析弹窗 -->
    <el-dialog
      v-model="showExplanation"
      title="题目详细解析"
      width="800px"
      class="explanation-dialog"
    >
      <div class="explanation-content">
        <div class="explanation-header">
          <h3>练习题目解析</h3>
          <p class="explanation-subtitle">详细的题目解析和知识点讲解</p>
        </div>
        
        <div class="explanation-interface">
          <el-card shadow="hover" v-for="(question, index) in currentPractice.questions" :key="question.id" class="explanation-card">
            <div class="explanation-question">
              <h4 class="question-title">第 {{ index + 1 }} 题：{{ question.title }}</h4>
              <el-tag :type="getQuestionTypeTag(question.type)">{{ getQuestionTypeText(question.type) }}</el-tag>
            </div>
            
            <!-- 显示选项（如果是选择题） -->
            <div v-if="question.type === 'single' || question.type === 'multiple'" class="explanation-options">
              <div 
                v-for="(option, optIndex) in question.options" 
                :key="optIndex" 
                class="option-item"
                :class="{ 'correct': option.label === question.correctAnswer, 'selected': answers[question.id] === option.label || (Array.isArray(answers[question.id]) && answers[question.id].includes(option.label)) }"
              >
                <span class="option-label">{{ option.label }}.</span>
                <span class="option-content">{{ option.content }}</span>
                <el-tag v-if="option.label === question.correctAnswer" type="success" size="small" class="correct-tag">正确答案</el-tag>
              </div>
            </div>
            
            <!-- 显示正确答案 -->
            <div class="explanation-correct-answer">
              <h5>正确答案：</h5>
              <p>{{ getCorrectAnswerText(question) }}</p>
            </div>
            
            <!-- 显示解析 -->
            <div class="explanation-detail">
              <h5>解析：</h5>
              <p>{{ question.explanation }}</p>
            </div>
            
            <!-- 显示知识点 -->
            <div class="explanation-knowledge">
              <h5>知识点：</h5>
              <el-tag size="small" effect="plain" v-for="(knowledge, kIndex) in getKnowledgePoints(question)" :key="kIndex" class="knowledge-tag">
                {{ knowledge }}
              </el-tag>
            </div>
          </el-card>
        </div>
        
        <div class="explanation-tips">
          <el-alert
            title="学习提示"
            type="info"
            :closable="false"
            show-icon
          >
            <div class="tips-content">
              <p>1. 仔细阅读解析，理解题目考查的知识点</p>
              <p>2. 关注自己做错的题目，加强相关知识点的学习</p>
              <p>3. 可以使用乡音辅导解析功能，通过方言获取更亲切的讲解</p>
              <p>4. 定期复习错题，巩固学习成果</p>
            </div>
          </el-alert>
        </div>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showExplanation = false">关闭</el-button>
          <el-button type="primary" @click="showExplanation = false; showDialectExplanation = true">切换到乡音辅导解析</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 乡音辅导解析弹窗 -->
    <el-dialog
      v-model="showDialectExplanation"
      title="乡音辅导解析"
      width="800px"
      class="dialect-explanation-dialog"
    >
      <div class="dialect-explanation-content">
        <div class="dialect-header">
          <h3>语音识别与方言解析</h3>
          <p class="dialect-subtitle">通过语音识别，为您提供方言版的题目解析</p>
        </div>
        
        <div class="dialect-interface">
          <div class="dialect-steps">
            <div class="step-item active">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>选择方言</h4>
                <el-select v-model="selectedDialect" placeholder="请选择方言" style="width: 200px;">
                  <el-option label="普通话" value="mandarin"></el-option>
                  <el-option label="粤语" value="cantonese"></el-option>
                  <el-option label="四川话" value="sichuan"></el-option>
                  <el-option label="东北话" value="northeast"></el-option>
                  <el-option label="上海话" value="shanghai"></el-option>
                </el-select>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>开始录音</h4>
                <div class="recording-controls">
                  <el-button 
                    type="primary" 
                    circle 
                    size="large"
                    :class="{ 'recording': isRecording }"
                    @click="toggleRecording"
                  >
                    <i class="el-icon-microphone"></i>
                  </el-button>
                  <p v-if="isRecording" class="recording-status">正在录音...</p>
                  <p v-else class="recording-tip">点击开始录音，读出题目内容</p>
                </div>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>解析结果</h4>
                <div class="explanation-result" v-if="recordingResult">
                  <el-card shadow="hover">
                    <h5>识别结果</h5>
                    <p>{{ recordingResult.recognizedText }}</p>
                    <h5>方言解析</h5>
                    <p>{{ recordingResult.dialectExplanation }}</p>
                    <h5>标准解析</h5>
                    <p>{{ recordingResult.standardExplanation }}</p>
                  </el-card>
                </div>
                <div class="explanation-placeholder" v-else>
                  <p>录音完成后，将显示解析结果</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="dialect-tips">
          <el-alert
            title="使用提示"
            type="info"
            :closable="false"
            show-icon
          >
            <div class="tips-content">
              <p>1. 请在安静的环境中进行录音</p>
              <p>2. 清晰读出题目内容，以便系统准确识别</p>
              <p>3. 系统将根据您选择的方言提供相应的解析</p>
              <p>4. 支持多种方言的解析服务</p>
            </div>
          </el-alert>
        </div>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialectExplanation = false">关闭</el-button>
          <el-button type="primary" @click="playExplanation" v-if="recordingResult">播放解析</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

const selectedSubject = ref('all')
const selectedDifficulty = ref('all')
const isPracticing = ref(false)
const showResult = ref(false)
const selectedMode = ref('')
const answers = reactive({})

// 解析相关状态
const showExplanation = ref(false)

// 乡音辅导解析相关状态
const showDialectExplanation = ref(false)
const selectedDialect = ref('mandarin')
const isRecording = ref(false)
const recordingResult = ref(null)

// 练习模式数据
const practiceModes = {
  single: {
    name: '单题练习',
    description: '选择单个题目进行练习，适合针对性训练',
    questions: 1,
    timeLimit: 5,
    difficulty: 'medium'
  },
  batch: {
    name: '批量练习',
    description: '选择多个题目进行批量练习，适合综合训练',
    questions: 10,
    timeLimit: 30,
    difficulty: 'medium'
  },
  exam: {
    name: '模拟考试',
    description: '按照考试标准进行模拟测试，适合考前冲刺',
    questions: 20,
    timeLimit: 60,
    difficulty: 'hard'
  }
}

// 模拟题目数据
const mockQuestions = [
  {
    id: 1,
    type: 'single',
    title: '以下哪个是童话故事中的角色？',
    options: [
      { label: 'A', content: '孙悟空' },
      { label: 'B', content: '小红帽' },
      { label: 'C', content: '哪吒' },
      { label: 'D', content: '葫芦娃' }
    ],
    correctAnswer: 'B',
    explanation: '小红帽是经典童话故事《小红帽》中的角色，其他选项都是中国神话或动画中的角色。'
  },
  {
    id: 2,
    type: 'single',
    title: '3 + 5 × 2 = ?',
    options: [
      { label: 'A', content: '16' },
      { label: 'B', content: '13' },
      { label: 'C', content: '10' },
      { label: 'D', content: '25' }
    ],
    correctAnswer: 'B',
    explanation: '根据数学运算顺序，先乘除后加减，所以5×2=10，然后3+10=13。'
  },
  {
    id: 3,
    type: 'multiple',
    title: '以下哪些是自然现象？',
    options: [
      { label: 'A', content: '彩虹' },
      { label: 'B', content: '火山喷发' },
      { label: 'C', content: '人工降雨' },
      { label: 'D', content: '闪电' }
    ],
    correctAnswer: ['A', 'B', 'D'],
    explanation: '彩虹、火山喷发和闪电都是自然现象，人工降雨是人类干预的结果，不属于自然现象。'
  },
  {
    id: 4,
    type: 'fill',
    title: '英语中，"猫"的单词是______。',
    correctAnswer: 'cat',
    explanation: '英语中，"猫"的单词是cat。'
  },
  {
    id: 5,
    type: 'single',
    title: '以下哪种颜色是三原色之一？',
    options: [
      { label: 'A', content: '紫色' },
      { label: 'B', content: '橙色' },
      { label: 'C', content: '绿色' },
      { label: 'D', content: '蓝色' }
    ],
    correctAnswer: 'D',
    explanation: '三原色是指红、黄、蓝三种颜色，其他颜色都可以由这三种颜色混合而成。'
  },
  {
    id: 6,
    type: 'single',
    title: '以下哪个是中国的传统节日？',
    options: [
      { label: 'A', content: '圣诞节' },
      { label: 'B', content: '感恩节' },
      { label: 'C', content: '中秋节' },
      { label: 'D', content: '万圣节' }
    ],
    correctAnswer: 'C',
    explanation: '中秋节是中国的传统节日，其他选项都是西方国家的节日。'
  },
  {
    id: 7,
    type: 'multiple',
    title: '以下哪些是植物的组成部分？',
    options: [
      { label: 'A', content: '根' },
      { label: 'B', content: '茎' },
      { label: 'C', content: '叶' },
      { label: 'D', content: '心脏' }
    ],
    correctAnswer: ['A', 'B', 'C'],
    explanation: '根、茎、叶是植物的基本组成部分，心脏是动物的器官。'
  },
  {
    id: 8,
    type: 'fill',
    title: '一年有______个季节。',
    correctAnswer: '4',
    explanation: '一年有春、夏、秋、冬四个季节。'
  },
  {
    id: 9,
    type: 'single',
    title: '以下哪个是太阳系中的行星？',
    options: [
      { label: 'A', content: '月亮' },
      { label: 'B', content: '太阳' },
      { label: 'C', content: '地球' },
      { label: 'D', content: '北斗七星' }
    ],
    correctAnswer: 'C',
    explanation: '地球是太阳系中的行星，月亮是地球的卫星，太阳是恒星，北斗七星是恒星组成的星座。'
  },
  {
    id: 10,
    type: 'single',
    title: '以下哪个数字是偶数？',
    options: [
      { label: 'A', content: '1' },
      { label: 'B', content: '3' },
      { label: 'C', content: '5' },
      { label: 'D', content: '6' }
    ],
    correctAnswer: 'D',
    explanation: '偶数是能够被2整除的数，6÷2=3，所以6是偶数。'
  }
]

// 当前练习
const currentPractice = ref({
  name: '',
  questions: [],
  timeLimit: 0,
  difficulty: 'medium'
})

// 练习结果
const result = ref({
  score: 0,
  correctCount: 0,
  incorrectCount: 0,
  unansweredCount: 0,
  usedTime: 0,
  analysis: ''
})

// 已回答题目数量
const answeredCount = computed(() => {
  return Object.keys(answers).length
})

// 练习进度
const progress = computed(() => {
  if (currentPractice.value.questions.length === 0) return 0
  return Math.round((answeredCount.value / currentPractice.value.questions.length) * 100)
})

// 选择练习模式
const selectMode = (mode) => {
  selectedMode.value = mode
  startPractice()
}

// 开始练习
const startPractice = () => {
  const mode = practiceModes[selectedMode.value]
  if (!mode) return
  
  // 生成练习题目
  const practiceQuestions = [...mockQuestions].slice(0, mode.questions)
  
  currentPractice.value = {
    name: mode.name,
    questions: practiceQuestions,
    timeLimit: mode.timeLimit,
    difficulty: mode.difficulty
  }
  
  // 重置答案
  Object.keys(answers).forEach(key => {
    delete answers[key]
  })
  
  isPracticing.value = true
  showResult.value = false
  ElMessage.success(`开始${mode.name}！`)
}

// 处理答案变化
const handleAnswerChange = (questionId) => {
  ElMessage.success('答案已保存')
}

// 取消练习
const cancelPractice = () => {
  isPracticing.value = false
  showResult.value = false
  ElMessage.info('练习已取消')
}

// 检查答案
const checkAnswers = () => {
  ElMessage.success('答案检查完成')
  // 这里可以添加检查答案的逻辑
}

// 提交答案
const submitPractice = () => {
  // 计算得分
  let score = 0
  let correctCount = 0
  let incorrectCount = 0
  let unansweredCount = 0
  
  currentPractice.value.questions.forEach(question => {
    const userAnswer = answers[question.id]
    if (!userAnswer) {
      unansweredCount++
    } else {
      let isCorrect = false
      if (question.type === 'single' || question.type === 'fill') {
        isCorrect = userAnswer === question.correctAnswer
      } else if (question.type === 'multiple') {
        isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correctAnswer.sort())
      }
      
      if (isCorrect) {
        correctCount++
        score += 100 / currentPractice.value.questions.length
      } else {
        incorrectCount++
      }
    }
  })
  
  // 设置结果
  result.value = {
    score: Math.round(score),
    correctCount,
    incorrectCount,
    unansweredCount,
    usedTime: Math.floor(Math.random() * currentPractice.value.timeLimit) + 1,
    analysis: `本次练习共${currentPractice.value.questions.length}题，你答对了${correctCount}题，答错了${incorrectCount}题，未答${unansweredCount}题。${score >= 60 ? '恭喜你通过了本次练习！' : '请继续努力，争取下次取得更好的成绩！'}`
  }
  
  showResult.value = true
  ElMessage.success('练习已提交，查看结果')
}

// 重新练习
const restartPractice = () => {
  startPractice()
}

// 查看解析
const viewExplanation = () => {
  showExplanation.value = true
}

// 获取题目类型标签
const getQuestionTypeTag = (type) => {
  const tagMap = {
    single: 'primary',
    multiple: 'success',
    fill: 'warning',
    essay: 'info'
  }
  return tagMap[type] || 'info'
}

// 获取题目类型文本
const getQuestionTypeText = (type) => {
  const textMap = {
    single: '单选题',
    multiple: '多选题',
    fill: '填空题',
    essay: '简答题'
  }
  return textMap[type] || '其他'
}

// 获取难度文本
const getDifficultyText = (difficulty) => {
  const textMap = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  }
  return textMap[difficulty] || '中等'
}

// 获取进度条颜色
const getProgressColor = () => {
  if (progress.value < 30) return '#f56c6c'
  if (progress.value < 70) return '#e6a23c'
  return '#67c23a'
}

// 获取结果类型
const getResultType = (score) => {
  if (score >= 90) return 'success'
  if (score >= 60) return 'warning'
  return 'danger'
}

// 查看练习历史
const viewHistory = () => {
  ElMessage.info('练习历史功能已触发')
  // 这里可以添加查看练习历史的逻辑
}

// 切换录音状态
const toggleRecording = () => {
  if (isRecording.value) {
    // 停止录音，模拟识别结果
    isRecording.value = false
    simulateRecordingResult()
  } else {
    // 开始录音
    isRecording.value = true
    ElMessage.info('开始录音，请读出题目内容')
  }
}

// 模拟录音结果
const simulateRecordingResult = () => {
  // 模拟识别过程
  setTimeout(() => {
    // 模拟识别结果
    recordingResult.value = {
      recognizedText: '以下哪个是童话故事中的角色？A. 孙悟空 B. 小红帽 C. 哪吒 D. 葫芦娃',
      dialectExplanation: getDialectExplanation(),
      standardExplanation: '小红帽是经典童话故事《小红帽》中的角色，其他选项都是中国神话或动画中的角色。'
    }
    ElMessage.success('录音识别完成，已生成解析结果')
  }, 2000)
}

// 根据选择的方言生成解析
const getDialectExplanation = () => {
  const dialects = {
    mandarin: '小红帽是经典童话故事《小红帽》中的角色，其他选项都是中国神话或动画中的角色。',
    cantonese: '小红帽系经典童话故事《小红帽》入面嘅角色，其他选项都系中国神话或者动画入面嘅角色。',
    sichuan: '小红帽是经典童话故事《小红帽》头的角色，其他选项都是中国神话或者动画头的角色。',
    northeast: '小红帽是经典童话故事《小红帽》里的角色，其他选项都是中国神话或动画里的角色。',
    shanghai: '小红帽是经典童话故事《小红帽》里向个角色，其他选项侪是中国神话或者动画里向个角色。'
  }
  return dialects[selectedDialect.value] || dialects.mandarin
}

// 播放解析
const playExplanation = () => {
  ElMessage.info('开始播放解析')
  // 模拟播放解析
  setTimeout(() => {
    ElMessage.success('解析播放完成')
  }, 3000)
}

// 获取正确答案文本
const getCorrectAnswerText = (question) => {
  if (question.type === 'single' || question.type === 'fill') {
    return question.correctAnswer
  } else if (question.type === 'multiple') {
    return question.correctAnswer.join(', ')
  }
  return ''
}

// 获取知识点
const getKnowledgePoints = (question) => {
  // 模拟知识点数据
  const knowledgeMap = {
    1: ['童话故事', '文学常识'],
    2: ['数学运算', '四则混合运算'],
    3: ['自然现象', '科学常识'],
    4: ['英语词汇', '基础单词'],
    5: ['色彩理论', '美术基础'],
    6: ['传统节日', '文化常识'],
    7: ['植物结构', '生物学'],
    8: ['季节变化', '自然常识'],
    9: ['太阳系', '天文学'],
    10: ['偶数概念', '数学基础']
  }
  return knowledgeMap[question.id] || ['知识点解析']
}
</script>

<style scoped>
.practice-page {
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%);
  position: relative;
}

/* 渐变背景头部 */
.practice-header {
  position: relative;
  overflow: hidden;
  padding: 40px 30px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  margin-bottom: 30px;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20education%20practice%20background%20with%20blue%20gradient&image_size=landscape_16_9') center/cover;
  opacity: 0.2;
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.header-left {
  flex: 1;
}

.practice-title {
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: white;
}

.practice-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
  color: white;
}

.practice-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.practice-actions .el-button {
  border-radius: 4px;
  transition: all 0.3s ease;
}

.practice-actions .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.practice-actions .el-select {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.practice-actions .el-select:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.practice-actions .el-select .el-input__inner {
  color: white;
}

.practice-actions .el-select .el-input__icon {
  color: white;
}

/* 练习模式选择 */
.practice-modes {
  display: flex;
  gap: 20px;
  margin: 30px;
  flex-wrap: wrap;
}

.mode-card {
  flex: 1;
  min-width: 280px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.mode-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  border-color: #409eff;
}

.mode-card .el-card__body {
  padding: 40px 30px;
  position: relative;
  z-index: 2;
}

.mode-icon {
  font-size: 48px;
  margin-bottom: 20px;
  color: #409eff;
  transition: all 0.3s ease;
}

.mode-card:hover .mode-icon {
  transform: scale(1.1);
}

.mode-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 10px 0;
  color: #303133;
}

.mode-description {
  color: #606266;
  margin: 0;
  line-height: 1.4;
}

/* 卡片渐变装饰 */
.mode-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd);
}

/* 单选模式特殊样式 */
.mode-card.single-choice::before {
  background: linear-gradient(90deg, #67c23a, #85ce61, #a5d6a7);
}

.mode-card.single-choice .mode-icon {
  color: #67c23a;
}

.mode-card.single-choice:hover {
  border-color: #67c23a;
}

/* 多选模式特殊样式 */
.mode-card.multiple-choice::before {
  background: linear-gradient(90deg, #e6a23c, #ebb563, #f3d19e);
}

.mode-card.multiple-choice .mode-icon {
  color: #e6a23c;
}

.mode-card.multiple-choice:hover {
  border-color: #e6a23c;
}

/* 判断题模式特殊样式 */
.mode-card.true-false::before {
  background: linear-gradient(90deg, #f56c6c, #f78989, #fbcfe8);
}

.mode-card.true-false .mode-icon {
  color: #f56c6c;
}

.mode-card.true-false:hover {
  border-color: #f56c6c;
}

/* 练习内容 */
.practice-content {
  margin-top: 20px;
}

.practice-info {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.practice-name {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 15px 0;
  color: #303133;
}

.practice-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}

/* 题目容器 */
.questions-container {
  margin-bottom: 30px;
}

.question-card {
  margin-bottom: 20px;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.question-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.question-answered {
  border-left-color: #67c23a;
  background-color: rgba(103, 194, 58, 0.05);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.question-number {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #303133;
}

.question-content {
  line-height: 1.6;
}

.question-title {
  margin: 0 0 20px 0;
  color: #303133;
}

.question-options {
  padding-left: 20px;
}

.option-item {
  margin-bottom: 10px;
  display: block;
}

.fill-input {
  width: 100%;
  max-width: 400px;
}

.essay-input {
  width: 100%;
}

/* 练习底部 */
.practice-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.progress-info {
  margin-bottom: 20px;
}

.progress-text {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #606266;
}

.footer-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 练习结果 */
.practice-result {
  margin-top: 30px;
}

.result-card {
  transition: all 0.3s ease;
}

.result-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
}

.result-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #303133;
}

.result-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-box {
  flex: 1;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.stat-box.correct {
  background-color: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}

.stat-box.incorrect {
  background-color: rgba(245, 108, 108, 0.1);
  color: #f56c6c;
}

.stat-box.unanswered {
  background-color: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
}

.stat-box.time {
  background-color: rgba(64, 158, 255, 0.1);
  color: #409eff;
}

.stat-box i {
  font-size: 32px;
  margin-bottom: 10px;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
}

.result-analysis {
  margin-bottom: 30px;
}

.analysis-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 15px 0;
  color: #303133;
}

.analysis-content {
  line-height: 1.6;
  color: #606266;
  margin: 0;
}

.result-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

/* 查看解析弹窗样式 */
.explanation-dialog {
  .el-dialog__body {
    padding: 30px;
  }
}

.explanation-content {
  .explanation-header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
    
    h3 {
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 10px 0;
      color: #303133;
    }
    
    .explanation-subtitle {
      color: #606266;
      margin: 0;
    }
  }
  
  .explanation-interface {
    margin-bottom: 30px;
  }
  
  .explanation-card {
    margin-bottom: 20px;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .explanation-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
      .question-title {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        color: #303133;
      }
    }
    
    .explanation-options {
      margin-bottom: 20px;
      
      .option-item {
        display: flex;
        align-items: center;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: #f5f7fa;
        }
        
        &.correct {
          background-color: rgba(103, 194, 58, 0.1);
          border-left: 4px solid #67c23a;
        }
        
        &.selected {
          background-color: rgba(64, 158, 255, 0.1);
        }
        
        .option-label {
          font-weight: bold;
          margin-right: 10px;
          min-width: 20px;
        }
        
        .option-content {
          flex: 1;
        }
        
        .correct-tag {
          margin-left: 10px;
        }
      }
    }
    
    .explanation-correct-answer,
    .explanation-detail,
    .explanation-knowledge {
      margin-bottom: 20px;
      
      h5 {
        font-size: 14px;
        font-weight: bold;
        margin: 0 0 10px 0;
        color: #303133;
      }
      
      p {
        margin: 0;
        color: #606266;
        line-height: 1.5;
      }
    }
    
    .explanation-knowledge {
      .knowledge-tag {
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
  
  .explanation-tips {
    margin-top: 30px;
    
    .tips-content {
      p {
        margin: 5px 0;
        font-size: 14px;
        color: #606266;
      }
    }
  }
}

/* 乡音辅导解析弹窗样式 */
.dialect-explanation-dialog {
  .el-dialog__body {
    padding: 30px;
  }
}

.dialect-explanation-content {
  .dialect-header {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
    
    h3 {
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 10px 0;
      color: #303133;
    }
    
    .dialect-subtitle {
      color: #606266;
      margin: 0;
    }
  }
  
  .dialect-interface {
    margin-bottom: 30px;
  }
  
  .dialect-steps {
    .step-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 30px;
      padding: 20px;
      background-color: #f5f7fa;
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &.active {
        background-color: #ecf5ff;
        border-left: 4px solid #409eff;
      }
      
      .step-number {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #409eff;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 20px;
        flex-shrink: 0;
      }
      
      .step-content {
        flex: 1;
        
        h4 {
          font-size: 16px;
          font-weight: bold;
          margin: 0 0 15px 0;
          color: #303133;
        }
      }
    }
  }
  
  .recording-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
    .el-button {
      width: 80px;
      height: 80px;
      font-size: 24px;
      
      &.recording {
        background-color: #f56c6c;
        border-color: #f56c6c;
        animation: pulse 1.5s infinite;
      }
    }
    
    .recording-status {
      color: #f56c6c;
      font-weight: 500;
    }
    
    .recording-tip {
      color: #606266;
    }
  }
  
  .explanation-result {
    margin-top: 15px;
    
    .el-card {
      transition: all 0.3s ease;
      
      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      h5 {
        font-size: 14px;
        font-weight: bold;
        margin: 0 0 10px 0;
        color: #303133;
      }
      
      p {
        margin: 0 0 15px 0;
        color: #606266;
        line-height: 1.5;
      }
    }
  }
  
  .explanation-placeholder {
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 8px;
    text-align: center;
    color: #909399;
  }
  
  .dialect-tips {
    margin-top: 30px;
    
    .tips-content {
      p {
        margin: 5px 0;
        font-size: 14px;
        color: #606266;
      }
    }
  }
}

/* 录音按钮动画 */
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

/* 响应式设计 */
@media (max-width: 768px) {
  .practice-modes {
    flex-direction: column;
  }
  
  .practice-stats {
    flex-direction: column;
    gap: 10px;
  }
  
  .result-stats {
    flex-direction: column;
  }
  
  .footer-buttons,
  .result-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .dialect-explanation-dialog {
    width: 90% !important;
  }
  
  .dialect-steps {
    .step-item {
      flex-direction: column;
      align-items: center;
      text-align: center;
      
      .step-number {
        margin-right: 0;
        margin-bottom: 15px;
      }
    }
  }
}
</style>