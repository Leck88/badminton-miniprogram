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
    } catch {
      // 离线降级计划
      this.setData({
        loading: false,
        plan: {
          title: `每周 ${this.data.selectedFreq} 次训练恢复计划`,
          days: [
            { day: '周一', type: 'train', content: '正式训练 60-90 分钟，重点练习步法', icon: '🏸' },
            { day: '周二', type: 'recover', content: '主动恢复：15 分钟全身拉伸 + 泡沫轴滚压', icon: '🧘' },
            { day: '周三', type: 'rest', content: '完全休息，保证 8 小时睡眠', icon: '😴' },
            { day: '周四', type: 'train', content: '技术专项训练，控制强度 70%', icon: '🏸' },
            { day: '周五', type: 'recover', content: '瑜伽或轻度有氧 30 分钟', icon: '🧘' },
            { day: '周六', type: 'train', content: '高强度比赛模拟，全力发挥', icon: '🏸' },
            { day: '周日', type: 'rest', content: '休息恢复，冷热水交替浴', icon: '🛁' },
          ],
          tips: '科学训练：每次打球后 30 分钟内完成拉伸恢复，效果最佳。',
        },
      })
    }
  },

  reset() {
    this.setData({ plan: null })
  },
})
