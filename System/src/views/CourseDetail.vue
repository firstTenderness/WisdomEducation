<template>
  <div class="course-detail-container">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <img src="/src/assets/logo.svg" alt="Logo">
          <h1>慧学澄明教育学习平台</h1>
        </div>
        <ul class="nav-menu">
          <li><router-link to="/portal">首页</router-link></li>
          <li><router-link to="/portal#features">特色功能</router-link></li>
          <li><router-link to="/portal#courses">课程中心</router-link></li>
          <li><router-link to="/portal#policy">乡村教育政策</router-link></li>
          <li><router-link to="/portal#breakthrough">破茧视界</router-link></li>
          <li><router-link to="/portal#about">关于我们</router-link></li>
          <li><router-link to="/portal#contact">联系我们</router-link></li>
        </ul>
        <div class="nav-buttons">
          <router-link to="/login" class="btn btn-secondary login-btn">登录</router-link>
          <router-link to="/login" class="btn btn-primary">注册</router-link>
        </div>
      </div>
    </nav>

    <!-- 课程详情区 -->
    <section class="course-detail-section">
      <div class="course-detail-container-inner">
        <!-- 课程基本信息 -->
        <div class="course-header">
          <div class="course-cover">
            <img :src="course.cover" :alt="course.title">
          </div>
          <div class="course-info">
            <h2 class="course-title">{{ course.title }}</h2>
            <p class="course-teacher">教师：{{ course.teacher }}</p>
            <div class="course-meta">
              <span class="course-category">{{ course.category }}</span>
              <span class="course-level">{{ course.level }}</span>
              <span class="course-duration">{{ course.duration }}</span>
            </div>
            <div class="course-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
              </div>
              <span class="progress-text">学习进度：{{ course.progress }}%</span>
            </div>
            <div class="course-actions">
              <button class="btn btn-primary start-learning-btn">开始学习</button>
              <button class="btn btn-secondary add-to-favorite-btn">收藏课程</button>
            </div>
          </div>
        </div>

        <!-- 课程大纲 -->
        <div class="course-outline">
          <h3 class="section-title">课程大纲</h3>
          <div class="outline-content">
            <div class="chapter" v-for="(chapter, index) in course.outline" :key="index">
              <div class="chapter-header">
                <h4 class="chapter-title">{{ chapter.title }}</h4>
                <span class="chapter-duration">{{ chapter.duration }}</span>
              </div>
              <div class="chapter-lessons">
                <div class="lesson" v-for="(lesson, lessonIndex) in chapter.lessons" :key="lessonIndex">
                  <div class="lesson-content">
                    <div class="lesson-icon">
                      <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="lesson-info">
                      <h5 class="lesson-title">{{ lesson.title }}</h5>
                      <p class="lesson-description">{{ lesson.description }}</p>
                    </div>
                  </div>
                  <div class="lesson-meta">
                    <span class="lesson-duration">{{ lesson.duration }}</span>
                    <span class="lesson-status" :class="lesson.status">{{ lesson.statusText }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 课程介绍 -->
        <div class="course-intro">
          <h3 class="section-title">课程介绍</h3>
          <div class="intro-content">
            <p>{{ course.description }}</p>
            <div class="course-highlights">
              <h4>课程亮点</h4>
              <ul>
                <li v-for="(highlight, index) in course.highlights" :key="index">{{ highlight }}</li>
              </ul>
            </div>
            <div class="course-target">
              <h4>适合人群</h4>
              <p>{{ course.targetAudience }}</p>
            </div>
          </div>
        </div>

        <!-- 教师介绍 -->
        <div class="teacher-info">
          <h3 class="section-title">教师介绍</h3>
          <div class="teacher-content">
            <div class="teacher-avatar">
              <img :src="course.teacherAvatar" alt="{{ course.teacher }}">
            </div>
            <div class="teacher-details">
              <h4 class="teacher-name">{{ course.teacher }}</h4>
              <p class="teacher-title">{{ course.teacherTitle }}</p>
              <p class="teacher-description">{{ course.teacherDescription }}</p>
            </div>
          </div>
        </div>

        <!-- 学员评价 -->
        <div class="course-reviews">
          <h3 class="section-title">学员评价</h3>
          <div class="reviews-content">
            <div class="review" v-for="(review, index) in course.reviews" :key="index">
              <div class="review-header">
                <div class="reviewer-info">
                  <div class="reviewer-avatar">
                    <img :src="review.avatar" :alt="review.name">
                  </div>
                  <div class="reviewer-details">
                    <h5 class="reviewer-name">{{ review.name }}</h5>
                    <div class="review-rating">
                      <i class="fas fa-star" v-for="i in review.rating" :key="i"></i>
                      <i class="far fa-star" v-for="i in (5 - review.rating)" :key="i"></i>
                    </div>
                  </div>
                </div>
                <span class="review-date">{{ review.date }}</span>
              </div>
              <div class="review-content">
                <p>{{ review.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-column">
            <h3>慧学澄明教育学习平台</h3>
            <p>智能教育，引领未来学习新方式</p>
          </div>
          <div class="footer-column">
            <h3>快速链接</h3>
            <ul class="footer-links">
              <li><router-link to="/portal">首页</router-link></li>
              <li><router-link to="/portal#features">特色功能</router-link></li>
              <li><router-link to="/portal#courses">课程中心</router-link></li>
              <li><router-link to="/portal#policy">乡村教育政策</router-link></li>
              <li><router-link to="/portal#breakthrough">破茧视界</router-link></li>
              <li><router-link to="/portal#about">关于我们</router-link></li>
              <li><router-link to="/portal#contact">联系我们</router-link></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>课程分类</h3>
            <ul class="footer-links">
              <li><a href="#">语文</a></li>
              <li><a href="#">数学</a></li>
              <li><a href="#">英语</a></li>
              <li><a href="#">科学</a></li>
              <li><a href="#">艺术</a></li>
              <li><a href="#">编程</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>联系我们</h3>
            <ul class="footer-links">
              <li><a href="#">电话：19075706783</a></li>
              <li><a href="#">邮箱：13138399389@163.com</a></li>
              <li><a href="#">地址：广东省清远市广东建设职业技术学院</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 慧学澄明教育学习平台 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = route.params.id

// 课程数据
const courses = ref([
  {
    id: '1',
    title: '趣味语文：童话阅读与写作',
    teacher: '李老师',
    teacherTitle: '高级语文教师',
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20female%20teacher%20portrait%20professional%20smile&image_size=square',
    teacherDescription: '李老师拥有10年语文教学经验，专注于儿童文学教育，擅长通过童话故事激发学生的阅读兴趣和写作能力。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20children%20chinese%20language%20course%20cover%20with%20fairy%20tales%20and%20books%20for%20elementary%20students&image_size=square',
    description: '本课程通过阅读经典童话故事，激发学生想象力和创造力，学习写作技巧。课程内容包括童话阅读指导、写作方法讲解、创意写作练习等，帮助学生提高语文素养和表达能力。',
    category: '语文',
    level: '小学',
    duration: '8周',
    progress: 60,
    highlights: [
      '精选经典童话故事，培养阅读兴趣',
      '循序渐进的写作指导，提高写作能力',
      '创意写作练习，激发想象力',
      '教师一对一点评，针对性提高'
    ],
    targetAudience: '小学1-3年级学生，对童话故事感兴趣，希望提高阅读和写作能力的学生。',
    outline: [
      {
        title: '第一单元：童话世界初探',
        duration: '2周',
        lessons: [
          {
            title: '什么是童话故事',
            description: '了解童话故事的特点和魅力',
            duration: '45分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '经典童话阅读：小红帽',
            description: '阅读并分析小红帽的故事结构',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '创意写作：续编小红帽',
            description: '发挥想象力，为小红帽故事编写新结局',
            duration: '90分钟',
            status: 'completed',
            statusText: '已完成'
          }
        ]
      },
      {
        title: '第二单元：童话中的角色',
        duration: '2周',
        lessons: [
          {
            title: '童话角色分析：白雪公主',
            description: '分析白雪公主中的主要角色',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '创意写作：设计童话角色',
            description: '设计自己的童话角色，包括外貌、性格等',
            duration: '90分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '童话角色对话练习',
            description: '学习如何写好童话角色之间的对话',
            duration: '60分钟',
            status: 'in-progress',
            statusText: '进行中'
          }
        ]
      },
      {
        title: '第三单元：童话的情节',
        duration: '2周',
        lessons: [
          {
            title: '童话情节结构分析',
            description: '学习童话的基本情节结构',
            duration: '60分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '创意写作：编写童话情节',
            description: '根据给定的开头，编写童话情节',
            duration: '90分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '童话情节修改与完善',
            description: '学习如何修改和完善童话情节',
            duration: '60分钟',
            status: 'not-started',
            statusText: '未开始'
          }
        ]
      },
      {
        title: '第四单元：完整童话创作',
        duration: '2周',
        lessons: [
          {
            title: '童话创作准备',
            description: '确定童话的主题、角色和情节',
            duration: '60分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '完整童话创作',
            description: '编写完整的童话故事',
            duration: '120分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '童话展示与分享',
            description: '展示自己的童话作品并分享创作心得',
            duration: '90分钟',
            status: 'not-started',
            statusText: '未开始'
          }
        ]
      }
    ],
    reviews: [
      {
        name: '小明',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20boy%20portrait%20smile&image_size=square',
        rating: 5,
        date: '2024-04-15',
        content: '李老师的课非常有趣，通过童话故事学习写作，我现在特别喜欢写作文了！'
      },
      {
        name: '小红',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20girl%20portrait%20smile&image_size=square',
        rating: 4,
        date: '2024-04-10',
        content: '课程内容很丰富，我学到了很多写作技巧，希望以后还有更多这样的课程。'
      },
      {
        name: '小华',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20boy%20portrait%20smile%20glasses&image_size=square',
        rating: 5,
        date: '2024-04-05',
        content: '李老师很温柔，讲解很详细，我的作文水平提高了很多，谢谢老师！'
      }
    ]
  },
  {
    id: '2',
    title: '数学王国大冒险',
    teacher: '王老师',
    teacherTitle: '高级数学教师',
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20male%20teacher%20portrait%20professional%20smile&image_size=square',
    teacherDescription: '王老师拥有8年数学教学经验，专注于小学数学教育，擅长通过游戏和互动的方式让学生感受数学的趣味性。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fun%20math%20adventure%20course%20cover%20with%20numbers%20and%20games%20for%20children&image_size=square',
    description: '本课程通过游戏和互动的方式，让学生感受数学的趣味性和实用性。课程内容包括数的认识、加减法运算、几何图形、数学思维训练等，帮助学生建立数学思维，提高数学能力。',
    category: '数学',
    level: '小学',
    duration: '6周',
    progress: 45,
    highlights: [
      '游戏化学习，让数学变得有趣',
      '互动式教学，提高参与度',
      '生活化数学，体会数学的实用性',
      '思维训练，培养逻辑思维能力'
    ],
    targetAudience: '小学1-2年级学生，对数学感兴趣，希望提高数学能力的学生。',
    outline: [
      {
        title: '第一单元：数字世界',
        duration: '1.5周',
        lessons: [
          {
            title: '数字的认识',
            description: '认识1-100的数字',
            duration: '45分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '数字游戏：数字接龙',
            description: '通过游戏巩固数字的认识',
            duration: '45分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '数字的大小比较',
            description: '学习比较数字的大小',
            duration: '45分钟',
            status: 'completed',
            statusText: '已完成'
          }
        ]
      },
      {
        title: '第二单元：加减法王国',
        duration: '1.5周',
        lessons: [
          {
            title: '加法的认识',
            description: '学习加法的基本概念',
            duration: '45分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '加法游戏：凑十法',
            description: '通过游戏学习凑十法',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '减法的认识',
            description: '学习减法的基本概念',
            duration: '45分钟',
            status: 'in-progress',
            statusText: '进行中'
          }
        ]
      },
      {
        title: '第三单元：几何图形',
        duration: '1.5周',
        lessons: [
          {
            title: '基本几何图形',
            description: '认识圆形、正方形、三角形等基本图形',
            duration: '45分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '图形游戏：拼图',
            description: '通过拼图游戏巩固图形的认识',
            duration: '60分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '图形的组合与分解',
            description: '学习图形的组合与分解',
            duration: '45分钟',
            status: 'not-started',
            statusText: '未开始'
          }
        ]
      },
      {
        title: '第四单元：数学思维训练',
        duration: '1.5周',
        lessons: [
          {
            title: '找规律',
            description: '学习找数字和图形的规律',
            duration: '45分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '数学游戏：数独入门',
            description: '学习数独的基本规则和玩法',
            duration: '60分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '数学应用：生活中的数学',
            description: '学习数学在生活中的应用',
            duration: '45分钟',
            status: 'not-started',
            statusText: '未开始'
          }
        ]
      }
    ],
    reviews: [
      {
        name: '小明',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20boy%20portrait%20smile&image_size=square',
        rating: 5,
        date: '2024-04-12',
        content: '王老师的数学课太有趣了，通过游戏学习数学，我现在特别喜欢数学！'
      },
      {
        name: '小红',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20girl%20portrait%20smile&image_size=square',
        rating: 4,
        date: '2024-04-08',
        content: '课程内容很有趣，我学到了很多数学知识，希望以后还有更多这样的课程。'
      },
      {
        name: '小华',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20boy%20portrait%20smile%20glasses&image_size=square',
        rating: 5,
        date: '2024-04-03',
        content: '王老师很幽默，讲解很详细，我的数学成绩提高了很多，谢谢老师！'
      }
    ]
  },
  {
    id: '3',
    title: '科学实验室：自然奥秘',
    teacher: '张老师',
    teacherTitle: '科学教育专家',
    teacherAvatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=friendly%20male%20science%20teacher%20portrait%20professional%20smile&image_size=square',
    teacherDescription: '张老师拥有15年科学教育经验，专注于儿童科学启蒙教育，擅长通过实验和观察激发学生的科学兴趣和探索精神。',
    cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=science%20laboratory%20course%20cover%20with%20nature%20elements%20and%20experiments%20for%20kids&image_size=square',
    description: '本课程通过有趣的科学实验，激发学生好奇心和探索精神，了解自然奥秘。课程内容包括植物生长、动物世界、天气变化、简单物理化学实验等，帮助学生建立科学思维，培养科学素养。',
    category: '科学',
    level: '小学',
    duration: '10周',
    progress: 75,
    highlights: [
      '动手实验，亲身体验科学的乐趣',
      '观察探索，培养科学思维',
      '自然现象解析，了解科学原理',
      '科学小制作，提高动手能力'
    ],
    targetAudience: '小学2-4年级学生，对自然科学感兴趣，喜欢动手实验和探索的学生。',
    outline: [
      {
        title: '第一单元：植物王国',
        duration: '2周',
        lessons: [
          {
            title: '植物的结构',
            description: '认识植物的根、茎、叶、花、果实',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '实验：种子的发芽',
            description: '观察种子的发芽过程',
            duration: '90分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '植物的生长条件',
            description: '了解植物生长需要的条件',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          }
        ]
      },
      {
        title: '第二单元：动物世界',
        duration: '2周',
        lessons: [
          {
            title: '动物的分类',
            description: '了解动物的基本分类',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '实验：昆虫观察',
            description: '观察昆虫的形态和行为',
            duration: '90分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '动物的适应能力',
            description: '了解动物如何适应环境',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          }
        ]
      },
      {
        title: '第三单元：天气与季节',
        duration: '2周',
        lessons: [
          {
            title: '天气现象',
            description: '认识各种天气现象',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '实验：制作简易温度计',
            description: '学习温度的测量',
            duration: '90分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '季节的变化',
            description: '了解四季的特点和变化',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          }
        ]
      },
      {
        title: '第四单元：物理小实验',
        duration: '2周',
        lessons: [
          {
            title: '声音的产生',
            description: '了解声音是如何产生的',
            duration: '60分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '实验：光的反射',
            description: '学习光的反射原理',
            duration: '90分钟',
            status: 'completed',
            statusText: '已完成'
          },
          {
            title: '简单机械',
            description: '认识杠杆、滑轮等简单机械',
            duration: '60分钟',
            status: 'in-progress',
            statusText: '进行中'
          }
        ]
      },
      {
        title: '第五单元：化学小实验',
        duration: '2周',
        lessons: [
          {
            title: '物质的状态',
            description: '了解固体、液体、气体',
            duration: '60分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '实验：水的三态变化',
            description: '观察水的蒸发和凝结',
            duration: '90分钟',
            status: 'not-started',
            statusText: '未开始'
          },
          {
            title: '科学小制作：火山爆发',
            description: '制作简易火山模型，模拟火山爆发',
            duration: '120分钟',
            status: 'not-started',
            statusText: '未开始'
          }
        ]
      }
    ],
    reviews: [
      {
        name: '小明',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20boy%20portrait%20smile&image_size=square',
        rating: 5,
        date: '2024-04-18',
        content: '张老师的科学课太有趣了，我们做了很多实验，我现在对科学特别感兴趣！'
      },
      {
        name: '小红',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20girl%20portrait%20smile&image_size=square',
        rating: 5,
        date: '2024-04-12',
        content: '课程内容很丰富，我学到了很多科学知识，希望以后还有更多这样的课程。'
      },
      {
        name: '小华',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20asian%20boy%20portrait%20smile%20glasses&image_size=square',
        rating: 4,
        date: '2024-04-06',
        content: '张老师讲解很详细，实验很有趣，我的动手能力提高了很多，谢谢老师！'
      }
    ]
  }
])

// 根据ID获取课程信息
const course = computed(() => {
  return courses.value.find(c => c.id === courseId) || courses.value[0]
})

// 导航栏滚动效果
onMounted(() => {
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar')
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'
      navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)'
    } else {
      navbar.style.backgroundColor = '#fff'
      navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)'
    }
  })
})
</script>

<style scoped>
.course-detail-container {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f7fa;
}

/* 导航栏样式 */
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.logo h1 {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
  margin: 0;
}

.nav-menu {
  display: flex;
  list-style: none;
}

.nav-menu li {
  margin-left: 30px;
}

.nav-menu a {
  text-decoration: none;
  color: #606266;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #409eff;
}

.nav-buttons {
  display: flex;
  align-items: center;
}

.login-btn {
  margin-right: 10px;
}

/* 课程详情区 */
.course-detail-section {
  padding: 60px 0;
  background-color: #f5f7fa;
}

.course-detail-container-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

/* 课程基本信息 */
.course-header {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.course-cover {
  flex: 0 0 300px;
}

.course-cover img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.course-info {
  flex: 1;
  min-width: 300px;
}

.course-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
}

.course-teacher {
  font-size: 16px;
  color: #606266;
  margin-bottom: 20px;
}

.course-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.course-meta span {
  padding: 6px 12px;
  background-color: #ecf5ff;
  color: #409eff;
  border-radius: 4px;
  font-size: 14px;
}

.course-progress {
  margin-bottom: 30px;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ebeef5;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background-color: #409eff;
  border-radius: 5px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 14px;
  color: #606266;
}

.course-actions {
  display: flex;
  gap: 20px;
}

/* 课程大纲 */
.course-outline {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #303133;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.chapter {
  margin-bottom: 30px;
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.chapter-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.chapter-duration {
  font-size: 14px;
  color: #909399;
}

.lesson {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.lesson:hover {
  background-color: #ecf5ff;
}

.lesson-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.lesson-icon {
  margin-right: 15px;
  font-size: 20px;
  color: #409eff;
}

.lesson-info {
  flex: 1;
}

.lesson-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #303133;
}

.lesson-description {
  font-size: 14px;
  color: #606266;
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.lesson-duration {
  font-size: 14px;
  color: #909399;
}

.lesson-status {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.lesson-status.completed {
  background-color: #f0f9eb;
  color: #67c23a;
}

.lesson-status.in-progress {
  background-color: #ecf5ff;
  color: #409eff;
}

.lesson-status.not-started {
  background-color: #fafafa;
  color: #909399;
}

/* 课程介绍 */
.course-intro {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.intro-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #606266;
  margin-bottom: 30px;
}

.course-highlights {
  margin-bottom: 30px;
}

.course-highlights h4 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
}

.course-highlights ul {
  list-style: none;
  padding-left: 0;
}

.course-highlights li {
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;
  font-size: 16px;
  color: #606266;
}

.course-highlights li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #409eff;
  font-size: 20px;
  line-height: 1;
}

.course-target {
  margin-bottom: 30px;
}

.course-target h4 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
}

.course-target p {
  font-size: 16px;
  color: #606266;
}

/* 教师介绍 */
.teacher-info {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.teacher-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.teacher-avatar {
  flex: 0 0 150px;
}

.teacher-avatar img {
  width: 100%;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.teacher-details {
  flex: 1;
  min-width: 300px;
}

.teacher-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #303133;
}

.teacher-title {
  font-size: 16px;
  color: #409eff;
  margin-bottom: 15px;
}

.teacher-description {
  font-size: 16px;
  line-height: 1.8;
  color: #606266;
}

/* 学员评价 */
.course-reviews {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.review {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.reviewer-info {
  display: flex;
  align-items: center;
}

.reviewer-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.reviewer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reviewer-details {
  flex: 1;
}

.reviewer-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #303133;
}

.review-rating {
  font-size: 14px;
  color: #e6a23c;
}

.review-date {
  font-size: 14px;
  color: #909399;
}

.review-content p {
  font-size: 16px;
  line-height: 1.6;
  color: #606266;
}

/* 页脚 */
.footer {
  background-color: #303133;
  color: #fff;
  padding: 60px 0 30px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  text-decoration: none;
  color: #909399;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #409eff;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid #404244;
  font-size: 14px;
  color: #909399;
}

/* 自定义按钮样式 */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #409eff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #fff;
  color: #409eff;
  border: 2px solid #409eff;
}

.btn-secondary:hover {
  background-color: #f0f9ff;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .course-header {
    flex-direction: column;
  }

  .course-cover {
    flex: 1;
  }

  .course-actions {
    flex-direction: column;
  }

  .teacher-content {
    flex-direction: column;
  }

  .teacher-avatar {
    flex: 1;
    max-width: 150px;
  }
}
</style>