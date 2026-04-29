const api = require('../../utils/api')

const FREQ_OPTIONS = [
  { value: 1, label: '每周1次', emoji: '🐢' },
  { value: 2, label: '每周2次', emoji: '🚶' },
  { value: 3, label: '每周3次', emoji: '🏃' },
  { value: 4, label: '每周4次', emoji: '⚡' },
  { value: 5, label: '每周5次+', emoji: '🔥' },
]

Page({
  data: {
    freqOptions: FREQ_OPTIONS,
    selectedFreq: 2,
    loading: false,
    plan: null,
  },

  selectFreq(e) {
    this.setData({ selectedFreq: e.currentTarget.dataset.val })
  },

  async generate() {
    this.setData({ loading: true })
    try {
      const plan = await api.generateWeeklyPlan(this.data.selectedFreq)
      this.setData({ plan, loading: false })
    } catch (e) {
      // 离线降级计划：按用户选择的频率智能生成
      const freq = this.data.selectedFreq
      const trainDays = this._getTrainDays(freq)
      const days = [
        { day: '周一', type: 'train', content: '正式训练 60-90 分钟，重点练习步法', icon: '🏸' },
        { day: '周二', type: 'recover', content: '主动恢复：15 分钟全身拉伸 + 泡沫轴滚压', icon: '🧘' },
        { day: '周三', type: 'rest', content: '完全休息，保证 8 小时睡眠', icon: '😴' },
        { day: '周四', type: 'train', content: '技术专项训练，控制强度 70%', icon: '🏸' },
        { day: '周五', type: 'recover', content: '瑜伽或轻度有氧 30 分钟', icon: '🧘' },
        { day: '周六', type: 'train', content: '高强度比赛模拟，全力发挥', icon: '🏸' },
        { day: '周日', type: 'rest', content: '休息恢复，冷热水交替浴', icon: '🛁' },
      ]
      // 根据频率标记训练日
      const freqLabel = freq === 1 ? '每周1次' : freq === 2 ? '每周2次' : freq === 3 ? '每周3次' : freq >= 4 ? '每周多次' : '自定义'
      days.forEach((d, i) => {
        if (!trainDays.includes(i)) {
          d.type = i % 2 === 0 ? 'recover' : 'rest'
          d.content = i % 2 === 0 ? '主动恢复：拉伸+按摩' : '完全休息'
          d.icon = i % 2 === 0 ? '🧘' : '😴'
        }
      })
      this.setData({
        loading: false,
        plan: {
          title: `${freqLabel} 训练恢复计划（离线模式）`,
          days,
          tips: '科学训练：每次打球后 30 分钟内完成拉伸恢复，效果最佳。',
        },
      })
      wx.showToast({ title: '离线模式，使用默认计划', icon: 'none', duration: 2000 })
    }
  },

  _getTrainDays(freq) {
    // 根据频率返回训练日索引（周一=0）
    const maps = { 1: [5], 2: [0, 5], 3: [0, 3, 5], 4: [0, 2, 4, 5], 5: [0, 1, 3, 4, 5] }
    return maps[freq] || [0, 5]
  },

  reset() {
    this.setData({ plan: null })
  },
})
