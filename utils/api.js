// utils/api.js - API 配置
// ⚠️ 生产环境中请将 API 地址和 Key 放在服务端配置，此文件不应包含敏感信息
// 推荐方案：使用微信云开发环境变量，或自己的后端代理

const API_BASE = 'https://YOUR_API_DOMAIN.com/api/v1'

function request(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE}${url}`,
      method,
      data,
      header: { 'Content-Type': 'application/json' },
      success: (res) => resolve(res.data),
      fail: (err) => reject(err),
    })
  })
}

module.exports = {
  generateStretch: (data) => request('/stretch/generate', 'POST', data),
  assessFatigue: (data) => request('/fatigue/assess', 'POST', data),
  sendChat: (message, sessionId) => request('/chat/', 'POST', { message, session_id: sessionId }),
  generateWeeklyPlan: (freq) => request(`/weekly/generate?weekly_frequency=${freq}`, 'POST'),
}
