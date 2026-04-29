const api = require('../../utils/api')

const QUESTIONS = [
  { id: 'sleep', text: '昨晚睡眠质量如何？', options: ['很好（7h+）', '一般（5-7h）', '很差（<5h）'], scores: [0, 1, 2] },
  { id: 'muscle', text: '肌肉酸痛程度？', options: ['无酸痛', '轻微酸痛', '明显酸痛'] , scores: [0, 1, 2] },
  { id: 'energy', text: '当前精力状态？', options: ['充沛', '一般', '疲惫'] , scores: [0, 1, 2] },
  { id: 'motivation', text: '今天想打球的欲望？', options: ['很想打', '还好', '不太想'] , scores: [0, 1, 2] },
  { id: 'heart', text: '静息心率与平时相比？', options: ['正常', '略高', '明显偏高'] , scores: [0, 1, 2] },
]

Page({
  data: {
    step: 0,
    questions: QUESTIONS,
    answers: {},
    result: null,
    loading: false,
  },

  answer(e) {
    const { qid, score } = e.currentTarget.dataset
    const answers = { ...this.data.answers, [qid]: score }
    const step = this.data.step + 1
    if (step >= QUESTIONS.length) {
      this.setData({ answers, step })
      this._assess(answers)
    } else {
      this.setData({ answers, step })
    }
  },

  async _assess(answers) {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
    this.setData({ loading: true })
    try {
      const result = await api.assessFatigue({
        sleep_quality: answers.sleep,
        muscle_soreness: answers.muscle,
        energy_level: answers.energy,
        motivation: answers.motivation,
        heart_rate: answers.heart,
        total_score: totalScore,
      })
      this.setData({ result, loading: false })
    } catch {
      // 离线降级
      const level = totalScore <= 2 ? 'low' : totalScore <= 5 ? 'medium' : 'high'
      this.setData({
        loading: false,
        result: {
          fatigue_level: level,
          score: totalScore,
          recommendation: level === 'low' ? '状态良好，可正常训练！' : level === 'medium' ? '适度疲劳，建议轻度拉伸后休息。' : '疲劳较重，今日以休息恢复为主。',
          priority_areas: ['肩', '腰', '膝'],
        },
      })
    }
  },

  reset() {
    this.setData({ step: 0, answers: {}, result: null })
  },
})
