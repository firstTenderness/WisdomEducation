<template>
  <div class="course-page">
    <div class="course-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-left">
          <h2 class="course-title">快乐学习课堂</h2>
          <p class="course-subtitle">轻松学知识，快乐成长每一天</p>
        </div>
        <div class="course-actions">
          <el-select v-model="selectedCategory" placeholder="按分类筛选" style="width: 150px; margin-right: 10px;">
            <el-option label="全部" value="all"></el-option>
            <el-option v-for="category in categories" :key="category" :label="category" :value="category"></el-option>
          </el-select>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索课程"
            prefix-icon="el-icon-search"
            style="width: 200px; margin-right: 10px;"
            clearable
          />
          <el-button type="primary" @click="refreshCourses" :loading="isRefreshing">
            <i class="el-icon-refresh" :class="{ 'refreshing': isRefreshing }"></i> 刷新
          </el-button>
        </div>
      </div>
    </div>
    
    <!-- 学习统计卡片 -->
    <div class="stats-container">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-icon course-icon"><i class="el-icon-menu"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ courses.length }}</div>
              <div class="stat-label">总课程数</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-icon progress-icon"><i class="el-icon-data-line"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ completedCourses }}</div>
              <div class="stat-label">已完成课程</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-icon study-icon"><i class="el-icon-time"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ totalStudyHours }}h</div>
              <div class="stat-label">总学习时长</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="stat-card">
            <div class="stat-icon average-icon"><i class="el-icon-star-on"></i></div>
            <div class="stat-info">
              <div class="stat-value">{{ averageProgress }}%</div>
              <div class="stat-label">平均完成率</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="course-grid">
      <el-row :gutter="20">
        <el-col :span="6" v-for="course in filteredCourses" :key="course.id">
          <el-card :body-style="{ padding: 0 }" class="course-card">
            <div class="course-cover">
              <img :src="course.cover" alt="课程封面" />
              <div class="course-badge" :class="course.level">
                {{ course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级' }}
              </div>
              <div class="course-category">{{ course.category }}</div>
              <el-button 
                type="text" 
                class="course-favorite-btn"
                @click="toggleFavorite(course)"
                :icon="course.isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'"
              ></el-button>
            </div>
            <div class="course-content">
              <h3 class="course-name">{{ course.title }}</h3>
              <p class="course-teacher">讲师：{{ course.teacher }}</p>
              <div class="course-rating">
                <el-rate v-model="course.rating" disabled :max="5" size="small" />
                <span class="course-rating-text">{{ course.rating.toFixed(1) }}</span>
              </div>
              <div class="course-progress">
                <el-progress 
                  :percentage="course.progress" 
                  :stroke-width="6"
                  :color="getProgressColor(course.progress)"
                />
                <p class="course-progress-text">
                  已学 {{ course.finished }} / 共 {{ course.total }} 课时
                </p>
              </div>
              <div class="course-footer">
                <el-button type="primary" size="small" @click="enterCourse(course)">
                  进入学习
                </el-button>
                <el-button size="small" @click="viewCourseDetail(course)">
                  查看详情
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div v-if="filteredCourses.length === 0" class="empty-courses">
      <div class="empty-content">
        <div class="empty-icon"><i class="el-icon-reading"></i></div>
        <h3 class="empty-title">暂无课程</h3>
        <p class="empty-description">快去发现感兴趣的课程吧！</p>
        <el-button type="primary" @click="refreshCourses" :loading="isRefreshing">
          <i class="el-icon-refresh"></i> 刷新课程
        </el-button>
      </div>
    </div>
    
    <!-- 课程详情弹窗 -->
    <el-dialog
      v-model="showCourseDetail"
      :title="selectedCourse?.title || '课程详情'"
      width="800px"
      class="course-detail-dialog"
    >
      <div v-if="selectedCourse" class="course-detail-content">
        <div class="course-detail-header">
          <div class="course-detail-cover">
            <img :src="selectedCourse.cover" alt="课程封面" />
          </div>
          <div class="course-detail-info">
            <h3 class="course-detail-title">{{ selectedCourse.title }}</h3>
            <p class="course-detail-teacher">讲师：{{ selectedCourse.teacher }}</p>
            <div class="course-detail-meta">
              <el-tag :class="selectedCourse.level">{{ selectedCourse.level === 'beginner' ? '初级' : selectedCourse.level === 'intermediate' ? '中级' : '高级' }}</el-tag>
              <el-tag>{{ selectedCourse.category }}</el-tag>
              <span class="course-detail-students"><i class="el-icon-user"></i> {{ selectedCourse.students }} 人学习</span>
            </div>
            <div class="course-detail-rating">
              <el-rate v-model="selectedCourse.rating" disabled :max="5" />
              <span class="course-detail-rating-text">{{ selectedCourse.rating.toFixed(1) }} ({{ selectedCourse.reviews }} 条评价)</span>
            </div>
          </div>
        </div>
        
        <div class="course-detail-body">
          <el-tabs>
            <el-tab-pane label="课程介绍">
              <div class="course-intro">
                <h4>课程简介</h4>
                <p>{{ selectedCourse.intro }}</p>
                <h4>课程目标</h4>
                <ul>
                  <li v-for="(goal, index) in selectedCourse.goals" :key="index">{{ goal }}</li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="课程大纲">
              <div class="course-outline">
                <div 
                  v-for="(chapter, index) in selectedCourse.chapters" 
                  :key="index"
                  class="course-chapter"
                >
                  <div class="chapter-header" @click="toggleChapter(chapter)">
                    <i :class="chapter.expanded ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
                    <h4>第 {{ index + 1 }} 章 {{ chapter.title }}</h4>
                    <span class="chapter-duration">{{ chapter.duration }} 分钟</span>
                  </div>
                  <div v-if="chapter.expanded" class="chapter-content">
                    <div 
                      v-for="(lesson, lessonIndex) in chapter.lessons" 
                      :key="lessonIndex"
                      class="course-lesson"
                      :class="{ 'lesson-completed': lesson.isCompleted }"
                    >
                      <i :class="lesson.isCompleted ? 'el-icon-check' : 'el-icon-video-play'"></i>
                      <span class="lesson-title">{{ lesson.title }}</span>
                      <span class="lesson-duration">{{ lesson.duration }} 分钟</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="讲师信息">
              <div class="teacher-info">
                <div class="teacher-avatar">
                  <img :src="selectedCourse.teacherAvatar" alt="讲师头像" />
                </div>
                <div class="teacher-details">
                  <h4>{{ selectedCourse.teacher }}</h4>
                  <p class="teacher-title">{{ selectedCourse.teacherTitle }}</p>
                  <p class="teacher-bio">{{ selectedCourse.teacherBio }}</p>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showCourseDetail = false">关闭</el-button>
          <el-button type="primary" @click="enterCourse(selectedCourse)">进入学习</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 课程学习弹窗 -->
    <el-dialog
      v-model="showCourseLearning"
      :title="learningCourse?.title || '课程学习'"
      width="900px"
      class="course-learning-dialog"
      fullscreen
    >
      <div v-if="learningCourse" class="course-learning-content">
        <div class="course-video-container">
          <div class="course-video-placeholder">
            <i class="el-icon-video-camera"></i>
            <h3>课程视频</h3>
            <p>正在播放：{{ currentLesson?.title || '课程介绍' }}</p>
            <div class="course-video-controls">
              <el-button type="primary" @click="playPauseVideo">
                <i :class="isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'"></i> {{ isPlaying ? '暂停' : '播放' }}
              </el-button>
              <el-slider v-model="videoProgress" :min="0" :max="100" @change="updateVideoProgress"></el-slider>
              <span class="video-time">{{ formatTime(videoCurrentTime) }} / {{ formatTime(videoDuration) }}</span>
            </div>
          </div>
        </div>
        <div class="course-chapters-sidebar">
          <h3>课程章节</h3>
          <div 
            v-for="(chapter, index) in learningCourse.chapters" 
            :key="index"
            class="course-chapter"
          >
            <div class="chapter-header" @click="toggleChapter(chapter)">
              <i :class="chapter.expanded ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
              <h4>第 {{ index + 1 }} 章 {{ chapter.title }}</h4>
            </div>
            <div v-if="chapter.expanded" class="chapter-content">
              <div 
                v-for="(lesson, lessonIndex) in chapter.lessons" 
                :key="lessonIndex"
                class="course-lesson"
                :class="{ 'lesson-active': currentLesson?.id === lesson.id, 'lesson-completed': lesson.isCompleted }"
                @click="selectLesson(lesson)"
              >
                <i :class="lesson.isCompleted ? 'el-icon-check' : 'el-icon-video-play'"></i>
                <span class="lesson-title">{{ lesson.title }}</span>
                <span class="lesson-duration">{{ lesson.duration }} 分钟</span>
              </div>
            </div>
          </div>
        </div>
        <div class="course-notes-sidebar">
          <h3>学习笔记</h3>
          <div class="course-notes">
            <el-input
              v-model="currentNote"
              type="textarea"
              placeholder="在这里记录学习笔记..."
              :rows="10"
            />
            <el-button type="primary" @click="saveNote">保存笔记</el-button>
          </div>
          <div class="course-notes-list" v-if="learningCourse.notes && learningCourse.notes.length > 0">
            <h4>历史笔记</h4>
            <div 
              v-for="(note, index) in learningCourse.notes" 
              :key="index"
              class="course-note-item"
            >
              <p class="course-note-content">{{ note.content }}</p>
              <p class="course-note-time">{{ note.time }}</p>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="exitCourse">退出学习</el-button>
          <el-button type="primary" @click="completeLesson">完成本节</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 搜索和筛选状态
const searchKeyword = ref('')
const selectedCategory = ref('all')
const isRefreshing = ref(false)

// 弹窗状态
const showCourseDetail = ref(false)
const showCourseLearning = ref(false)
const selectedCourse = ref(null)
const learningCourse = ref(null)

// 课程学习状态
const isPlaying = ref(false)
const videoProgress = ref(0)
const videoCurrentTime = ref(0)
const videoDuration = ref(3600) // 60分钟
const currentLesson = ref(null)
const currentNote = ref('')

// 模拟课程数据
const courses = ref([
  {
    id: 1,
    title: '趣味语文：童话阅读与写作',
    teacher: '李老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20children%20chinese%20language%20course%20cover%20with%20fairy%20tales%20and%20books%20for%20elementary%20students&image_size=square',
    progress: 60,
    finished: 6,
    total: 10,
    level: 'beginner',
    category: '语文',
    rating: 4.5,
    students: 1250,
    reviews: 320,
    isFavorite: false,
    intro: '本课程通过有趣的童话故事，激发孩子们的阅读兴趣，同时教授基本的写作技巧，让孩子们在快乐中学习语文。',
    goals: [
      '培养孩子的阅读兴趣',
      '提高阅读理解能力',
      '掌握基本的写作技巧',
      '丰富词汇量和语言表达能力'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20female%20chinese%20teacher%20portrait%20for%20elementary%20students&image_size=square',
    teacherTitle: '小学语文高级教师',
    teacherBio: '李老师拥有10年小学语文教学经验，擅长通过童话故事激发学生的学习兴趣，曾获得市优秀教师称号。',
    chapters: [
      {
        title: '童话世界的大门',
        duration: 90,
        expanded: true,
        lessons: [
          { id: 1, title: '什么是童话', duration: 45, isCompleted: true },
          { id: 2, title: '经典童话欣赏', duration: 45, isCompleted: true }
        ]
      },
      {
        title: '阅读的技巧',
        duration: 120,
        expanded: false,
        lessons: [
          { id: 3, title: '如何理解故事内容', duration: 60, isCompleted: true },
          { id: 4, title: '人物分析方法', duration: 60, isCompleted: false }
        ]
      },
      {
        title: '写作入门',
        duration: 150,
        expanded: false,
        lessons: [
          { id: 5, title: '如何写好开头', duration: 50, isCompleted: false },
          { id: 6, title: '故事的结构', duration: 50, isCompleted: false },
          { id: 7, title: '精彩的结尾', duration: 50, isCompleted: false }
        ]
      }
    ],
    notes: [
      { content: '童话的特点是想象力丰富，情节生动', time: '2026-01-15 14:30' },
      { content: '写作时要注意开头吸引读者', time: '2026-01-20 16:45' }
    ]
  },
  {
    id: 2,
    title: '数学王国大冒险',
    teacher: '王老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fun%20math%20adventure%20course%20cover%20with%20numbers%20and%20cartoon%20characters%20for%20kids&image_size=square',
    progress: 85,
    finished: 17,
    total: 20,
    level: 'beginner',
    category: '数学',
    rating: 4.8,
    students: 1800,
    reviews: 450,
    isFavorite: true,
    intro: '通过有趣的数学游戏和故事，让孩子们在冒险中学习数学知识，培养数学思维能力。',
    goals: [
      '激发孩子对数学的兴趣',
      '掌握基本的数学运算',
      '培养逻辑思维能力',
      '提高解决问题的能力'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20male%20math%20teacher%20portrait%20for%20elementary%20students&image_size=square',
    teacherTitle: '小学数学特级教师',
    teacherBio: '王老师从事小学数学教学15年，擅长将抽象的数学概念转化为有趣的游戏，让学生轻松掌握数学知识。',
    chapters: [
      {
        title: '数字的奥秘',
        duration: 60,
        expanded: true,
        lessons: [
          { id: 1, title: '认识数字', duration: 30, isCompleted: true },
          { id: 2, title: '数字的故事', duration: 30, isCompleted: true }
        ]
      },
      {
        title: '加减法王国',
        duration: 120,
        expanded: false,
        lessons: [
          { id: 3, title: '加法的乐趣', duration: 60, isCompleted: true },
          { id: 4, title: '减法的秘密', duration: 60, isCompleted: true }
        ]
      },
      {
        title: '乘法口诀',
        duration: 90,
        expanded: false,
        lessons: [
          { id: 5, title: '乘法的意义', duration: 45, isCompleted: true },
          { id: 6, title: '乘法口诀表', duration: 45, isCompleted: true }
        ]
      }
    ],
    notes: []
  },
  {
    id: 3,
    title: '快乐英语：日常会话',
    teacher: '张老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20english%20conversation%20course%20cover%20with%20cartoon%20animals%20talking%20for%20children&image_size=square',
    progress: 45,
    finished: 9,
    total: 20,
    level: 'beginner',
    category: '英语',
    rating: 4.3,
    students: 980,
    reviews: 210,
    isFavorite: false,
    intro: '通过生动有趣的动画和游戏，让孩子们轻松学习英语日常会话，培养英语听说能力。',
    goals: [
      '掌握基本的英语日常用语',
      '提高英语听力和口语能力',
      '培养英语学习兴趣',
      '建立英语学习的自信心'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20young%20english%20teacher%20portrait%20for%20children&image_size=square',
    teacherTitle: '少儿英语教育专家',
    teacherBio: '张老师拥有英语专业硕士学位，擅长通过游戏和歌曲教授英语，让孩子们在快乐中学习。',
    chapters: [
      {
        title: '问候与介绍',
        duration: 60,
        expanded: true,
        lessons: [
          { id: 1, title: 'Hello和Goodbye', duration: 30, isCompleted: true },
          { id: 2, title: '自我介绍', duration: 30, isCompleted: true }
        ]
      },
      {
        title: '日常用语',
        duration: 90,
        expanded: false,
        lessons: [
          { id: 3, title: '谈论天气', duration: 45, isCompleted: true },
          { id: 4, title: '询问时间', duration: 45, isCompleted: false }
        ]
      }
    ],
    notes: []
  },
  {
    id: 4,
    title: '科学小实验：探索自然',
    teacher: '刘老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20science%20experiments%20course%20cover%20with%20kids%20doing%20experiments%20for%20elementary%20students&image_size=square',
    progress: 70,
    finished: 14,
    total: 20,
    level: 'beginner',
    category: '科学',
    rating: 4.7,
    students: 1560,
    reviews: 410,
    isFavorite: false,
    intro: '通过简单有趣的科学小实验，让孩子们亲手探索自然现象，培养科学探究精神。',
    goals: [
      '培养科学探究精神',
      '了解基本的自然现象',
      '提高动手操作能力',
      '激发对科学的兴趣'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20male%20science%20teacher%20portrait%20for%20elementary%20students&image_size=square',
    teacherTitle: '小学科学高级教师',
    teacherBio: '刘老师热爱科学教育，擅长设计简单有趣的科学实验，让学生在实践中学习科学知识。',
    chapters: [
      {
        title: '水的秘密',
        duration: 90,
        expanded: true,
        lessons: [
          { id: 1, title: '水的三态变化', duration: 45, isCompleted: true },
          { id: 2, title: '水的浮力', duration: 45, isCompleted: true }
        ]
      },
      {
        title: '空气的力量',
        duration: 60,
        expanded: false,
        lessons: [
          { id: 3, title: '空气无处不在', duration: 30, isCompleted: true },
          { id: 4, title: '空气的压力', duration: 30, isCompleted: true }
        ]
      }
    ],
    notes: []
  },
  {
    id: 5,
    title: '美术天地：创意绘画',
    teacher: '陈老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20art%20painting%20course%20cover%20with%20colorful%20paintings%20and%20kids%20for%20children&image_size=square',
    progress: 30,
    finished: 6,
    total: 20,
    level: 'beginner',
    category: '艺术',
    rating: 4.6,
    students: 890,
    reviews: 190,
    isFavorite: true,
    intro: '通过各种绘画形式和材料，激发孩子们的创造力和想象力，让每个孩子都能成为小画家。',
    goals: [
      '激发创造力和想象力',
      '掌握基本的绘画技巧',
      '培养审美能力',
      '提高色彩感知能力'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20female%20art%20teacher%20portrait%20for%20children&image_size=square',
    teacherTitle: '小学美术高级教师',
    teacherBio: '陈老师毕业于美术学院，从事儿童美术教育10年，擅长引导孩子发挥想象力，创作出独特的艺术作品。',
    chapters: [
      {
        title: '色彩的世界',
        duration: 60,
        expanded: true,
        lessons: [
          { id: 1, title: '认识颜色', duration: 30, isCompleted: true },
          { id: 2, title: '色彩搭配', duration: 30, isCompleted: true }
        ]
      },
      {
        title: '线条的魅力',
        duration: 90,
        expanded: false,
        lessons: [
          { id: 3, title: '各种线条', duration: 45, isCompleted: false },
          { id: 4, title: '用线条作画', duration: 45, isCompleted: false }
        ]
      }
    ],
    notes: []
  },
  {
    id: 6,
    title: '音乐乐园：儿歌演唱',
    teacher: '赵老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=happy%20music%20course%20cover%20with%20kids%20singing%20and%20musical%20notes%20for%20children&image_size=square',
    progress: 50,
    finished: 10,
    total: 20,
    level: 'beginner',
    category: '音乐',
    rating: 4.4,
    students: 760,
    reviews: 150,
    isFavorite: false,
    intro: '通过欢快的儿歌，培养孩子们的音乐兴趣和节奏感，让孩子们在歌声中快乐成长。',
    goals: [
      '培养音乐兴趣',
      '提高节奏感',
      '学习基本的音乐知识',
      '增强自信心和表现力'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20female%20music%20teacher%20portrait%20for%20children&image_size=square',
    teacherTitle: '小学音乐高级教师',
    teacherBio: '赵老师毕业于音乐学院，擅长儿童音乐教育，通过儿歌和游戏，让孩子们轻松学习音乐知识。',
    chapters: [
      {
        title: '音乐入门',
        duration: 60,
        expanded: true,
        lessons: [
          { id: 1, title: '认识音符', duration: 30, isCompleted: true },
          { id: 2, title: '节奏感训练', duration: 30, isCompleted: true }
        ]
      },
      {
        title: '儿歌演唱',
        duration: 120,
        expanded: false,
        lessons: [
          { id: 3, title: '快乐的节日', duration: 40, isCompleted: true },
          { id: 4, title: '动物世界', duration: 40, isCompleted: true },
          { id: 5, title: '大自然的歌', duration: 40, isCompleted: false }
        ]
      }
    ],
    notes: []
  },
  {
    id: 7,
    title: '体育小健将：基础运动',
    teacher: '周老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=energetic%20sports%20course%20cover%20with%20kids%20playing%20sports%20for%20elementary%20students&image_size=square',
    progress: 90,
    finished: 18,
    total: 20,
    level: 'beginner',
    category: '体育',
    rating: 4.8,
    students: 1340,
    reviews: 350,
    isFavorite: false,
    intro: '通过各种基础运动项目，培养孩子们的运动兴趣和身体素质，让孩子们健康快乐成长。',
    goals: [
      '培养运动兴趣',
      '提高身体素质',
      '学习基本的运动技能',
      '培养团队合作精神'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=energetic%20male%20pe%20teacher%20portrait%20for%20elementary%20students&image_size=square',
    teacherTitle: '小学体育特级教师',
    teacherBio: '周老师从事小学体育教学20年，擅长设计适合儿童的运动游戏，让学生在快乐中锻炼身体。',
    chapters: [
      {
        title: '基础运动',
        duration: 90,
        expanded: true,
        lessons: [
          { id: 1, title: '跑步的技巧', duration: 45, isCompleted: true },
          { id: 2, title: '跳跃训练', duration: 45, isCompleted: true }
        ]
      },
      {
        title: '球类运动',
        duration: 120,
        expanded: false,
        lessons: [
          { id: 3, title: '篮球入门', duration: 60, isCompleted: true },
          { id: 4, title: '足球基础', duration: 60, isCompleted: true }
        ]
      }
    ],
    notes: []
  },
  {
    id: 8,
    title: '历史故事：中华五千年',
    teacher: '吴老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20chinese%20history%20course%20cover%20with%20ancient%20stories%20and%20cartoon%20figures%20for%20kids&image_size=square',
    progress: 65,
    finished: 13,
    total: 20,
    level: 'beginner',
    category: '历史',
    rating: 4.5,
    students: 920,
    reviews: 230,
    isFavorite: false,
    intro: '通过生动有趣的历史故事，让孩子们了解中华五千年的文明史，培养爱国主义精神。',
    goals: [
      '了解中国历史的基本脉络',
      '学习重要的历史人物和事件',
      '培养爱国主义精神',
      '提高历史文化素养'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=knowledgeable%20male%20history%20teacher%20portrait%20for%20elementary%20students&image_size=square',
    teacherTitle: '小学历史高级教师',
    teacherBio: '吴老师热爱历史教育，擅长将枯燥的历史知识转化为生动的故事，让学生轻松学习历史。',
    chapters: [
      {
        title: '远古时代',
        duration: 60,
        expanded: true,
        lessons: [
          { id: 1, title: '盘古开天地', duration: 30, isCompleted: true },
          { id: 2, title: '炎黄子孙', duration: 30, isCompleted: true }
        ]
      },
      {
        title: '夏商周',
        duration: 90,
        expanded: false,
        lessons: [
          { id: 3, title: '大禹治水', duration: 45, isCompleted: true },
          { id: 4, title: '武王伐纣', duration: 45, isCompleted: true }
        ]
      }
    ],
    notes: []
  },
  {
    id: 9,
    title: '小小数学家：趣味算术',
    teacher: '郑老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fun%20math%20arithmetic%20course%20cover%20with%20numbers%20and%20cartoon%20math%20heroes%20for%20children&image_size=square',
    progress: 40,
    finished: 8,
    total: 20,
    level: 'beginner',
    category: '数学',
    rating: 4.3,
    students: 850,
    reviews: 180,
    isFavorite: false,
    intro: '通过有趣的算术游戏和竞赛，让孩子们轻松掌握算术技巧，提高计算速度和准确性。',
    goals: [
      '提高计算速度和准确性',
      '掌握基本的算术技巧',
      '培养数学思维能力',
      '激发数学学习兴趣'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20female%20math%20teacher%20portrait%20for%20elementary%20students&image_size=square',
    teacherTitle: '小学数学高级教师',
    teacherBio: '郑老师从事小学数学教学12年，擅长设计有趣的算术游戏，让学生在竞赛中提高计算能力。',
    chapters: [
      {
        title: '加法技巧',
        duration: 60,
        expanded: true,
        lessons: [
          { id: 1, title: '凑十法', duration: 30, isCompleted: true },
          { id: 2, title: '加法速算', duration: 30, isCompleted: true }
        ]
      },
      {
        title: '减法技巧',
        duration: 60,
        expanded: false,
        lessons: [
          { id: 3, title: '破十法', duration: 30, isCompleted: true },
          { id: 4, title: '减法速算', duration: 30, isCompleted: false }
        ]
      }
    ],
    notes: []
  },
  {
    id: 10,
    title: '英语动画配音',
    teacher: '孙老师',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20animation%20dubbing%20course%20cover%20with%20cartoon%20characters%20and%20microphones%20for%20kids&image_size=square',
    progress: 25,
    finished: 5,
    total: 20,
    level: 'intermediate',
    category: '英语',
    rating: 4.7,
    students: 680,
    reviews: 140,
    isFavorite: false,
    intro: '通过为喜欢的动画角色配音，提高孩子们的英语听说能力，让英语学习更加有趣。',
    goals: [
      '提高英语听力和口语能力',
      '学习地道的英语表达',
      '培养英语学习兴趣',
      '增强自信心和表现力'
    ],
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20young%20english%20teacher%20portrait%20for%20children&image_size=square',
    teacherTitle: '少儿英语教育专家',
    teacherBio: '孙老师留学英国，擅长通过动画配音等趣味方式，提高学生的英语听说能力。',
    chapters: [
      {
        title: '配音入门',
        duration: 60,
        expanded: true,
        lessons: [
          { id: 1, title: '什么是配音', duration: 30, isCompleted: true },
          { id: 2, title: '语音训练', duration: 30, isCompleted: true }
        ]
      },
      {
        title: '动画配音实战',
        duration: 120,
        expanded: false,
        lessons: [
          { id: 3, title: '动物配音', duration: 40, isCompleted: true },
          { id: 4, title: '人物配音', duration: 40, isCompleted: false },
          { id: 5, title: '配音比赛', duration: 40, isCompleted: false }
        ]
      }
    ],
    notes: []
  }
])

// 计算属性
const categories = computed(() => {
  const categorySet = new Set(courses.value.map(course => course.category))
  return Array.from(categorySet)
})

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesCategory = selectedCategory.value === 'all' || course.category === selectedCategory.value
    const matchesSearch = !searchKeyword.value || 
      course.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchKeyword.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const completedCourses = computed(() => {
  return courses.value.filter(course => course.progress >= 100).length
})

const totalStudyHours = computed(() => {
  const totalHours = courses.value.reduce((sum, course) => {
    return sum + (course.finished * 45 / 60) // 假设每课时45分钟
  }, 0)
  return Math.round(totalHours)
})

const averageProgress = computed(() => {
  if (courses.value.length === 0) return 0
  const totalProgress = courses.value.reduce((sum, course) => sum + course.progress, 0)
  return Math.round(totalProgress / courses.value.length)
})

// 工具函数
const getProgressColor = (progress) => {
  if (progress < 30) return '#f56c6c'
  if (progress < 70) return '#e6a23c'
  return '#67c23a'
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 功能函数
const enterCourse = (course) => {
  learningCourse.value = JSON.parse(JSON.stringify(course))
  currentLesson.value = course.chapters[0]?.lessons[0] || null
  showCourseLearning.value = true
  ElMessage.success(`正在进入课程：${course.title}`)
}

const viewCourseDetail = (course) => {
  selectedCourse.value = JSON.parse(JSON.stringify(course))
  showCourseDetail.value = true
}

const refreshCourses = () => {
  isRefreshing.value = true
  // 模拟刷新过程
  setTimeout(() => {
    isRefreshing.value = false
    ElMessage.success('课程列表已刷新')
  }, 1500)
}

const toggleFavorite = (course) => {
  course.isFavorite = !course.isFavorite
  ElMessage.success(course.isFavorite ? '已添加到收藏' : '已取消收藏')
}

const toggleChapter = (chapter) => {
  chapter.expanded = !chapter.expanded
}

const playPauseVideo = () => {
  isPlaying.value = !isPlaying.value
  ElMessage.success(isPlaying.value ? '视频开始播放' : '视频已暂停')
}

const updateVideoProgress = (value) => {
  videoProgress.value = value
  videoCurrentTime.value = Math.floor((value / 100) * videoDuration.value)
}

const saveNote = () => {
  if (!currentNote.value.trim()) {
    ElMessage.warning('笔记内容不能为空')
    return
  }
  
  if (!learningCourse.value.notes) {
    learningCourse.value.notes = []
  }
  
  learningCourse.value.notes.push({
    content: currentNote.value,
    time: new Date().toLocaleString()
  })
  
  currentNote.value = ''
  ElMessage.success('笔记保存成功')
}

const completeLesson = () => {
  if (currentLesson.value) {
    currentLesson.value.isCompleted = true
    ElMessage.success('本节课已完成')
  }
}

const exitCourse = () => {
  showCourseLearning.value = false
  learningCourse.value = null
  currentLesson.value = null
  isPlaying.value = false
  videoProgress.value = 0
  videoCurrentTime.value = 0
  ElMessage.info('已退出课程学习')
}

const selectLesson = (lesson) => {
  currentLesson.value = lesson
  videoProgress.value = 0
  videoCurrentTime.value = 0
  ElMessage.success(`正在播放：${lesson.title}`)
}
</script>

<style scoped>
.course-page {
  padding: 0;
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%);
  position: relative;
}

.course-header {
  position: relative;
  overflow: hidden;
  padding: 40px 30px;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20education%20background%20with%20light%20blue%20gradient&image_size=landscape_16_9') center/cover;
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

.course-title {
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.course-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.course-actions {
  display: flex;
  gap: 10px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.course-actions .el-button.refreshing {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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

.stat-icon.course-icon {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.stat-icon.progress-icon {
  background: linear-gradient(135deg, #67c23a, #85ce61);
}

.stat-icon.study-icon {
  background: linear-gradient(135deg, #e6a23c, #ebb563);
}

.stat-icon.average-icon {
  background: linear-gradient(135deg, #f56c6c, #f78989);
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

.course-grid {
  padding: 30px;
  margin-top: 20px;
}

.course-card {
  transition: all 0.3s ease;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.course-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.course-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.course-card:hover .course-cover img {
  transform: scale(1.1);
}

.course-badge {
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

.course-card:hover .course-badge {
  transform: scale(1.05);
}

.course-badge.beginner {
  background-color: #67c23a;
}

.course-badge.intermediate {
  background-color: #e6a23c;
}

.course-badge.advanced {
  background-color: #f56c6c;
}

.course-category {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  font-size: 12px;
  font-weight: 500;
}

.course-favorite-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.course-favorite-btn:hover {
  background: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
}

.course-favorite-btn .el-icon-star-on {
  color: #f56c6c;
}

.course-content {
  padding: 20px;
}

.course-name {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 12px 0;
  color: #303133;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-teacher {
  font-size: 14px;
  color: #606266;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
}

.course-teacher::before {
  content: '👨‍🏫';
  margin-right: 8px;
}

.course-rating {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
}

.course-rating-text {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.course-progress {
  margin: 0 0 18px 0;
}

.course-progress-text {
  font-size: 12px;
  color: #909399;
  margin: 10px 0 0 0;
  text-align: right;
  font-weight: 500;
}

.course-footer {
  display: flex;
  gap: 10px;
}

.course-footer .el-button {
  flex: 1;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.course-footer .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.empty-courses {
  margin-top: 80px;
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 30px;
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

/* 课程详情弹窗样式 */
.course-detail-dialog {
  .el-dialog__body {
    padding: 30px;
    max-height: 70vh;
    overflow-y: auto;
  }
}

.course-detail-content {
  .course-detail-header {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
    
    .course-detail-cover {
      width: 200px;
      height: 140px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .course-detail-info {
      flex: 1;
      
      .course-detail-title {
        font-size: 20px;
        font-weight: bold;
        margin: 0 0 10px 0;
        color: #303133;
      }
      
      .course-detail-teacher {
        font-size: 14px;
        color: #606266;
        margin: 0 0 15px 0;
      }
      
      .course-detail-meta {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        
        .course-detail-students {
          color: #606266;
          font-size: 14px;
        }
      }
      
      .course-detail-rating {
        display: flex;
        align-items: center;
        gap: 10px;
        
        .course-detail-rating-text {
          font-size: 14px;
          color: #606266;
        }
      }
    }
  }
  
  .course-detail-body {
    .course-intro {
      h4 {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 15px 0;
        color: #303133;
      }
      
      p {
        margin: 0 0 20px 0;
        line-height: 1.6;
        color: #606266;
      }
      
      ul {
        margin: 0 0 20px 0;
        padding-left: 20px;
        
        li {
          margin-bottom: 8px;
          color: #606266;
        }
      }
    }
    
    .course-outline {
      .course-chapter {
        margin-bottom: 15px;
        border: 1px solid #e4e7ed;
        border-radius: 8px;
        overflow: hidden;
        
        .chapter-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px;
          background-color: #f5f7fa;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            background-color: #ecf5ff;
          }
          
          i {
            font-size: 14px;
            color: #606266;
          }
          
          h4 {
            flex: 1;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            color: #303133;
          }
          
          .chapter-duration {
            font-size: 12px;
            color: #909399;
          }
        }
        
        .chapter-content {
          padding: 15px;
          
          .course-lesson {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
            
            &:last-child {
              border-bottom: none;
            }
            
            i {
              font-size: 14px;
              color: #67c23a;
            }
            
            .lesson-title {
              flex: 1;
              font-size: 14px;
              color: #303133;
            }
            
            .lesson-duration {
              font-size: 12px;
              color: #909399;
            }
          }
        }
      }
    }
    
    .teacher-info {
      display: flex;
      gap: 20px;
      
      .teacher-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .teacher-details {
        flex: 1;
        
        h4 {
          font-size: 16px;
          font-weight: bold;
          margin: 0 0 10px 0;
          color: #303133;
        }
        
        .teacher-title {
          font-size: 14px;
          color: #606266;
          margin: 0 0 10px 0;
        }
        
        .teacher-bio {
          font-size: 14px;
          line-height: 1.6;
          color: #606266;
          margin: 0;
        }
      }
    }
  }
}

/* 课程学习弹窗样式 */
.course-learning-dialog {
  .el-dialog__body {
    padding: 0;
    height: calc(100vh - 100px);
    overflow: hidden;
  }
}

.course-learning-content {
  display: flex;
  height: 100%;
  overflow: hidden;
  
  .course-video-container {
    flex: 1;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    .course-video-placeholder {
      text-align: center;
      color: white;
      padding: 40px;
      
      i {
        font-size: 64px;
        margin-bottom: 20px;
      }
      
      h3 {
        font-size: 24px;
        margin: 0 0 10px 0;
      }
      
      p {
        margin: 0 0 30px 0;
        font-size: 16px;
        opacity: 0.8;
      }
      
      .course-video-controls {
        display: flex;
        align-items: center;
        gap: 20px;
        justify-content: center;
        
        .el-slider {
          width: 300px;
        }
        
        .video-time {
          font-size: 14px;
          min-width: 100px;
        }
      }
    }
  }
  
  .course-chapters-sidebar {
    width: 300px;
    background-color: #f5f7fa;
    border-right: 1px solid #e4e7ed;
    overflow-y: auto;
    padding: 20px;
    
    h3 {
      font-size: 18px;
      font-weight: bold;
      margin: 0 0 20px 0;
      color: #303133;
    }
    
    .course-chapter {
      margin-bottom: 15px;
      
      .chapter-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: #ecf5ff;
        }
        
        i {
          font-size: 12px;
          color: #606266;
        }
        
        h4 {
          flex: 1;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          color: #303133;
        }
      }
      
      .chapter-content {
        padding: 10px 0 0 22px;
        
        .course-lesson {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
          margin-bottom: 5px;
          
          &:hover {
            background-color: #ecf5ff;
          }
          
          &.lesson-active {
            background-color: #ecf5ff;
            border-left: 3px solid #409eff;
          }
          
          &.lesson-completed {
            opacity: 0.7;
          }
          
          i {
            font-size: 14px;
            color: #67c23a;
          }
          
          .lesson-title {
            flex: 1;
            font-size: 13px;
            color: #303133;
          }
          
          .lesson-duration {
            font-size: 12px;
            color: #909399;
          }
        }
      }
    }
  }
  
  .course-notes-sidebar {
    width: 300px;
    background-color: white;
    border-left: 1px solid #e4e7ed;
    overflow-y: auto;
    padding: 20px;
    
    h3 {
      font-size: 18px;
      font-weight: bold;
      margin: 0 0 20px 0;
      color: #303133;
    }
    
    h4 {
      font-size: 14px;
      font-weight: bold;
      margin: 20px 0 10px 0;
      color: #303133;
    }
    
    .course-notes {
      margin-bottom: 20px;
      
      .el-input {
        margin-bottom: 15px;
      }
    }
    
    .course-notes-list {
      .course-note-item {
        background-color: #f5f7fa;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 10px;
        
        .course-note-content {
          margin: 0 0 10px 0;
          font-size: 14px;
          line-height: 1.5;
          color: #303133;
        }
        
        .course-note-time {
          margin: 0;
          font-size: 12px;
          color: #909399;
          text-align: right;
        }
      }
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .course-header {
    padding: 30px 20px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .course-actions {
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
  
  .course-grid {
    padding: 20px;
  }
  
  .course-cover {
    height: 140px;
  }
  
  .course-content {
    padding: 15px;
  }
  
  .course-name {
    font-size: 16px;
  }
  
  .course-detail-dialog {
    width: 90% !important;
    
    .course-detail-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
      
      .course-detail-cover {
        width: 100%;
        max-width: 300px;
      }
    }
  }
  
  .course-learning-content {
    flex-direction: column;
    
    .course-video-container {
      height: 300px;
    }
    
    .course-chapters-sidebar,
    .course-notes-sidebar {
      width: 100%;
      height: 200px;
      border: none;
      border-top: 1px solid #e4e7ed;
    }
  }
}
</style>