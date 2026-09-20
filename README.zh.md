<div align="center">

# Huashu Design

> *「打字。回车。一份能交付的设计。」*
> *"Type. Hit enter. A finished design lands in your lap."*

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)

<br>

**在你的 agent 里打一句话，拿回一份能交付的设计。**

<br>

3 到 30 分钟，你能 ship 一段**能在浏览器里播的产品动画**，或者一套能直接演讲的 HTML 幻灯片。伴随一份描述内容的**执行脚本**（`script.md`）。

不是「AI 做的还行」那种水平——是看起来像大厂设计团队做的。给 skill 你的品牌资产（logo、色板、UI 截图），它会读懂你的品牌气质；什么都不给，内置的 20 种设计语汇也能兜底到不出 AI slop。

**你看到这篇 README 里的每一个动画，都是 huashu-design 自己做的。** 不是 Figma，不是 AE，就是一句话 prompt + skill 跑通。产物是 HTML，不是成片。

```
npx skills add alchaincyf/huashu-design
```

跨 agent 通用——Claude Code、Cursor、Codex、OpenClaw、Hermes 都能装。

> 📣 **已改为 MIT 协议。** 自 2026-05-14 起本 skill 完全开源（[MIT License](LICENSE)），个人和**商用都免费**，无需事先授权。原「个人使用免费、企业商用需授权」的条款已作废。([查看变更](#license))

[看效果](#demo-画廊) · [安装](#装上就能用) · [能做什么](#能做什么) · [核心机制](#核心机制) · [和 Claude Design 的关系](#和-claude-design-的关系)

</div>

---

<p align="center">
  <img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/hero-animation-v10-en.gif" alt="huashu-design Hero · 打字 → 选方向 → 画廊展开 → 聚焦 → 品牌显形" width="100%">
</p>

<p align="center"><sub>
  ▲ 25 秒 · Terminal → 4 方向 → Gallery ripple → 4 次 Focus → Brand reveal<br>
  👉 <a href="https://www.huasheng.ai/huashu-design-hero/">访问 HTML 互动版</a>
</sub></p>

---

## 装上就能用

```bash
npx skills add alchaincyf/huashu-design
```

然后在 Claude Code 里直接说话：

```
「做一份 AI 心理学的演讲 PPT，推荐 3 个风格方向让我选」
「把这 13 页内容做成能在浏览器里直接讲的 deck」
「把这段讲稿做成配合演讲的动效 HTML，先出执行脚本」
「帮我对这个 deck 做一个 5 维度评审」
```

没有按钮、没有面板、没有 Figma 插件。

---

## Star 趋势

<p align="center">
  <a href="https://star-history.com/#alchaincyf/huashu-design&Date">
    <img src="https://api.star-history.com/svg?repos=alchaincyf/huashu-design&type=Date" alt="huashu-design Star History" width="80%">
  </a>
</p>

---

## 能做什么

| 能力 | 交付物 | 典型耗时 |
|------|--------|----------|
| 演讲幻灯片 | HTML deck（浏览器全屏演讲 · 键盘翻页）+ 可选 `script.md` | 15–25 min |
| 时间轴 / 讲解舞台 | HTML 舞台（空格跟讲或自动播放）+ 执行脚本 `script.md` | 8–25 min |
| 设计方向顾问 | 5 流派 × 20 种设计哲学 · 推荐 3 方向 · 并行生成 Demo | 5 min |
| 5 维度专家评审 | 雷达图 + Keep/Fix/Quick Wins · 可操作修复清单 | 3 min |

---

## Demo 画廊

### Motion Design 引擎

Stage + Sprite 时间片段模型 · `useTime` / `useSprite` / `interpolate` / `Easing` 四 API 覆盖动画需求。交付物是 **HTML**，浏览器里播即终态。

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c3-motion-design.gif" width="100%"></p>

### HTML Slides · 浏览器即舞台

HTML deck 在浏览器里全屏演讲 · 键盘翻页 · 右下计数器 · `localStorage` 记忆位置 · 每页独立 HTML，作用域天然隔离。**交付物就是 HTML 本身**——浏览器里的演示即终态，视觉表达不迁就任何格式。

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/c2-slides-pptx.gif" width="100%"></p>

### Junior Designer 工作流

不闷头做大招：先写 assumptions + placeholders + reasoning，尽早 show 给你，再迭代。理解错了早改比晚改便宜 100 倍。

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w2-junior-designer.gif" width="100%"></p>

### 品牌资产协议 5 步硬流程

涉及具体品牌时强制执行：问 → 搜 → 下载（三条兜底）→ grep 色值 → 写 `brand-spec.md`。

<p align="center"><img src="https://github.com/alchaincyf/huashu-design/releases/download/v2.0/w1-brand-protocol.gif" width="100%"></p>

---

## Showcase · 真实案例

### 「聊聊 skill」 · PM after-party 演讲 deck

> **Live demo · [https://skill-huasheng.vercel.app](https://skill-huasheng.vercel.app)**

13 页 HTML deck，**全部用 huashu-design 完成**：

- 黑底极简衬线视觉系统（cover / about / hook / what / why / closing）
- 2 个 22 秒 cinematic demo（Nuwa skill workflow + Darwin skill workflow），各采用**完全独立的视觉语言**：
  - **Nuwa**：3D 知识 orbit + Pentagon 提炼 + SKILL.md typewriter + 「21 分钟」hero reveal
  - **Darwin**：autoresearch loop spin + v1/v5 并列 diff + Hill-Climb 全屏曲线 + Ratchet gear lock
- 每个 cinematic 默认显示**完整静态 workflow dashboard**（观众随时能看清 skill 怎么跑），点 ▶ 才触发动画，跑完自动 fade 回 dashboard
- 嵌入 huasheng.ai 的 25 秒 hero 动画（iframe 本地化兜底）
- 真实数据：14,495 stargazers 真实曲线（gh API 拉取）+ DeepSeek V4 真实 specs（WebSearch 验证）
- 真实 AI 素材：用 `huashu-gpt-image` 跑 4×2 grid 大图，`extract_grid.py` 抠出 8 张独立透明 PNG，做 3D orbit 漂浮

**适合参考的页面**：
- `/slides/slide-04b-nuwa-flow.html` · 静态 dashboard + cinematic overlay 双层架构
- `/slides/slide-06b-darwin-flow.html` · 完全独立视觉语言的对照案例
- `/slides/slide-03b-deepseek-cover.html` · AI slop vs 真实设计师视角的对比页

详细 cinematic patterns 见 `references/cinematic-patterns.md`。

---

## 核心机制

### 品牌资产协议

skill 里最硬的一段规则。涉及具体品牌（Stripe、Linear、Anthropic、自家公司等）时强制执行 5 步：

| 步骤 | 动作 | 目的 |
|------|------|------|
| 1 · 问 | 用户有 brand guidelines 吗？ | 尊重已有资源 |
| 2 · 搜官方品牌页 | `<brand>.com/brand` · `brand.<brand>.com` · `<brand>.com/press` | 抓权威色值 |
| 3 · 下载资产 | SVG 文件 → 官网 HTML 全文 → 产品截图取色 | 三条兜底，前一条失败立刻走下一条 |
| 4 · grep 提取色值 | 从资产里抓所有 `#xxxxxx`，按频率排序，过滤黑白灰 | **绝不从记忆猜品牌色** |
| 5 · 固化 spec | 写 `brand-spec.md` + CSS 变量，所有 HTML 引用 `var(--brand-*)` | 不固化就会忘 |

A/B 测试（v1 vs v2，各跑 6 agent）：**v2 的稳定性方差比 v1 低 5 倍**。稳定性的稳定性，这是 skill 真正的护城河。

### 设计方向顾问（Fallback）

当用户需求模糊到无法着手时触发：

- 不凭通用直觉硬做，进入 Fallback 模式
- 从 5 流派 × 20 种设计哲学里推荐 3 个**必须来自不同流派**的差异化方向
- 每个方向配代表作、气质关键词、代表设计师
- 并行生成 3 个视觉 Demo 让用户选
- 选定后进入主干 Junior Designer 流程

### Junior Designer 工作流

默认工作模式，贯穿所有任务：

- 开工前 show 问题清单一次性发给用户，等批量答完再动手
- HTML 里先写 assumptions + placeholders + reasoning comments
- 尽早 show 给用户（哪怕只是灰色方块）
- 填充实际内容 → 打磨细节 这两步分别再 show 一次
- 只有用户明确要求时，交付前才用 Playwright 或浏览器肉眼验证；默认直接交付产物

### 反 AI slop 规则

避免一眼 AI 的视觉最大公约数（紫渐变 / emoji 图标 / 圆角+左 border accent / SVG 画人脸 / Inter 做 display）。用 `text-wrap: pretty` + CSS Grid + 精心选择的 serif display 和 oklch 色彩。

---

## 和 Claude Design 的关系

我大方承认：品牌资产协议的哲学是从 Claude Design 流传出来的提示词里偷师的。那份提示词反复强调**好的高保真设计不是从白纸开始，而是从已有的设计上下文长出来**。这个原则是 65 分作品和 90 分作品的分水岭。

定位差异：

| | Claude Design | huashu-design |
|---|---|---|
| 形态 | 网页产品（浏览器里用） | skill（Claude Code 里用） |
| 配额 | 订阅 quota | API 消耗 · 并行跑 agent 不受 quota 限 |
| 交付物 | 画布内 + 可导 Figma | HTML + 执行脚本 |
| 操作方式 | GUI（点、拖、改） | 对话（说话、等 agent 做完） |
| 复杂动画 | 有限 | Stage + Sprite 时间轴 · 浏览器播放 |
| 跨 agent | 专属 Claude.ai | 任意 skill 兼容 agent |

Claude Design 是**更好的图形工具**，huashu-design 是**让图形工具这层消失**。两条路，不同受众。

---

## Limitations

- **Framer Motion 级别的复杂动画不行**。3D、物理模拟、粒子系统超出 skill 边界。
- **完全空白的品牌从零设计质量会掉到 60–65 分**。凭空画 hi-fi 本来就是 last resort。

这是一个 80 分的 skill，不是 100 分的产品。对不愿意打开图形界面的人，80 分的 skill 比 100 分的产品好用。

---

## 仓库结构

```
huashu-design/
├── SKILL.md                 # 主文档（给 agent 读）
├── README.zh.md             # 本文件（中文 README）
├── assets/                  # Starter Components
│   ├── animations.jsx       # Stage + Sprite + Easing + interpolate
│   ├── narration_stage.jsx  # 执行脚本驱动的舞台（默认空格推进）
│   ├── deck_index.html      # 多文件 deck 拼接器
│   └── showcases/           # 幻灯片预制样例（数据页 × 3 风格）
├── references/              # 按任务深入读的子文档
│   ├── animation-pitfalls.md
│   ├── design-styles.md     # 20 种设计哲学详细库
│   ├── slide-decks.md
│   ├── voiceover-pipeline.md # 执行脚本 → HTML
│   ├── critique-guide.md
│   └── ...
├── scripts/
│   ├── script-to-timeline.mjs  # script.md → timeline.json
│   └── verify.py
└── demos/                   # 能力演示 HTML
```

---

## 起源

Anthropic 发布 Claude Design 那天我玩到凌晨四点。几天之后发现自己再也没点开过它，不是它不好——它是这个赛道目前最成熟的产品——是我宁愿让 agent 在终端里帮我干活，也不愿意打开任何图形界面。

于是让 agent 拆解 Claude Design 本身（包括社区流传的系统提示词、品牌资产协议、组件机制），蒸馏成结构化 spec，再写成 skill 装进自己的 Claude Code。

感谢 Anthropic 把 Claude Design 的提示词写得清晰。这种基于其他产品灵感的二次创作，是开源文化在 AI 时代的新形态。

---

## License

**2026-05-14 起改为 MIT 协议。** 此前版本采用「个人使用免费、企业商用需授权」的 Personal Use License，对商用做了限制——现在这层限制完全解除。

按 [MIT License](LICENSE)，你可以**自由使用、修改、分发**本 skill，**包括商业用途**——公司内部用、客户商单交付、做成付费产品对外卖，都没问题。无需事先授权、无需付费、无需打招呼。注明出处不强制，但欢迎。

---

## Connect · 花生（花叔）

花生是 AI Native Coder、独立开发者、AI 自媒体博主。代表作：小猫补光灯（AppStore 付费榜 Top 1）、《一本书玩转 DeepSeek》、女娲 .skill（GitHub 12000+ star）。自媒体全平台 30 万+ 粉丝。

| 平台 | 账号 | 链接 |
|---|---|---|
| X / Twitter | @AlchainHust | https://x.com/AlchainHust |
| 公众号 | 花叔 | 微信搜索「花叔」 |
| B 站 | 花叔 | https://space.bilibili.com/14097567 |
| YouTube | 花叔 | https://www.youtube.com/@Alchain |
| 小红书 | 花叔 | https://www.xiaohongshu.com/user/profile/5abc6f17e8ac2b109179dfdf |
| 官网 | huasheng.ai | https://www.huasheng.ai/ |
| 开发者主页 | bookai.top | https://bookai.top |

合作咨询、自媒体约稿 → 以上任一平台私信花生即可。
