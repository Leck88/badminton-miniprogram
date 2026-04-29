# 🏸 羽后伸 - 羽毛球智能助手微信小程序

> 羽毛球运动智能助手小程序，提供拉伸指导、AI问答、疲劳自测和周运动计划功能。

## 功能介绍

| 页面 | 说明 |
|------|------|
| 🏠 首页 | 小程序主入口，展示核心功能导航 |
| 🧘 拉伸 | 运动前后的拉伸动作指导，帮助预防伤病 |
| 💬 AI问答 | 羽毛球技术、战术、体能等问题，AI即时回答 |
| 📊 疲劳自测 | 科学评估当前身体疲劳状态，指导是否适合训练 |
| 📅 周计划 | 制定每周训练计划，追踪运动目标达成 |

## 技术栈

- 微信小程序原生框架（WXML + WXSS + JavaScript）
- AI 接口对接（支持 OpenAI / DeepSeek / MiniMax 等）
- 本地存储数据持久化

## 快速开始

### 1. 环境准备

下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

### 2. 导入项目

1. 打开微信开发者工具，点击「导入项目」
2. 选择本目录 `D:\羽神微信小程序\badminton-miniprogram\miniprogram`
3. 填入 AppID：`wx9483b7d53ee19f01`（或使用测试号）
4. 点击「导入」即可预览

### 3. AI 功能配置（如需使用问答功能）

编辑 `miniprogram/utils/api.js`，将 API 地址和 Key 替换为你的配置：

```javascript
const API_BASE_URL = 'https://你的AI接口地址/v1'
const API_KEY = 'your-api-key'
```

## 项目结构

```
miniprogram/
├── app.js                    # 小程序入口
├── app.json                  # 全局配置（页面路由、tabBar）
├── app.wxss                  # 全局样式
├── sitemap.json              # 站点地图配置
├── project.config.json       # 项目配置
├── assets/icons/             # tabBar 图标资源
└── pages/
    ├── home/                 # 首页
    ├── stretch/              # 拉伸指导
    ├── chat/                 # AI 问答
    ├── fatigue/              # 疲劳自测
    └── weekly/               # 周计划
```

## 注意事项

- AI 问答功能需要自行对接后端 API 服务
- 小程序已内置离线降级方案，无网络时也可浏览拉伸和计划内容
- 推荐使用暗色主题 UI，护眼且适配夜间使用场景

## License

MIT
