// 纯前端模式：使用静态数据替代 API 请求

// 1. 登录（纯前端模拟）
export const login = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-token-' + Date.now(),
        account: data.account,
        role_type: data.account.includes('teacher') ? 2 : data.account.includes('admin') ? 1 : 3
      })
    }, 500)
  })
}

// 2. 获取用户信息（纯前端模拟）
export const getUserInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        account: 'student123',
        name: '测试学生',
        role_type: 3,
        avatar: ''
      })
    }, 300)
  })
}

// 3. 课程/收件箱等模块（静态数据）
export const getCourseList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '数学基础课程',
          description: '适合初学者的数学基础课程',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=math%20education%20classroom%20scene&image_size=square',
          teacher: '张老师',
          students: 120,
          rating: 4.8
        },
        {
          id: 2,
          name: '英语听力训练',
          description: '提升英语听力水平的专业课程',
          cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=english%20language%20learning%20class&image_size=square',
          teacher: '李老师',
          students: 95,
          rating: 4.6
        }
      ])
    }, 300)
  })
}

export const getMessageList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: '系统通知',
          content: '欢迎使用慧学澄明平台',
          time: new Date().toLocaleString()
        }
      ])
    }, 300)
  })
}

export const getTopicList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '学习交流',
          count: 25
        },
        {
          id: 2,
          name: '问题讨论',
          count: 18
        }
      ])
    }, 300)
  })
}

export const getNoteList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: '数学笔记',
          content: '三角函数公式汇总',
          time: new Date().toLocaleString()
        }
      ])
    }, 300)
  })
}

export const getFileList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: '课程资料.pdf',
          size: '2.5MB',
          time: new Date().toLocaleString()
        }
      ])
    }, 300)
  })
}

export const getAISummary = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: '您最近学习了数学和英语课程，建议加强听力练习。'
      })
    }, 300)
  })
}

export const getPracticeList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          question: '1+1=?',
          options: ['1', '2', '3', '4'],
          answer: '2'
        }
      ])
    }, 300)
  })
}