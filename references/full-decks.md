# 完整演示模板 · 整套参照

> 在四维框架中，full-deck 是 **theme + layout + component + animation 合一**的整套示例，是最具象的质量目标。S1 定调时先看这里：场景高度吻合的，直接作为本 deck 的「整套参照」；不吻合的，也可以按页取用它们的版式与部件作为单页参照（记法 `<名称>#N`，见 `references/pipeline.md` S3）。

自包含的多页 HTML 演示，位于 `templates/full-decks/<name>/`。每个文件夹包含：

- `index.html` — 完整多页演示（封面 / 章节 / 内容 / 代码 / 图表或示意图 / 行动号召 / 致谢，7 页以上）
- `style.css` — 用 `.tpl-<name>` 类前缀做作用域，多套模板可以共存
- `README.md` — 简短理由、灵感来源和使用说明

所有模板都从技能根目录引入共享的 `assets/fonts.css`、`assets/base.css` 和 `assets/runtime.js`。用 `← →` / `space` 翻页，`F` 全屏，`O` 总览。

当你想让整份演示有一套连贯、有主张的外观时用这些模板，而不是把各种版式混搭。每套模板的视觉都足够鲜明，一眼就能认出来。

---

## 1. xhs-white-editorial — 白底杂志风

- **灵感来源：** `20260409 升级版知识库/小红书图文/v2-白底版/slide_01_cover.html` + `20260412-AI测试与安全/html/xhs-ai-testing-safety-v2.html`
- **关键视觉：** 纯白背景，顶部 10 色彩虹条，80–110px 展示标题，紫→蓝→绿→橙→粉渐变文字，马卡龙柔和卡片组（soft-purple/pink/blue/green/orange），黑底白字 `.focus` 胶囊，主视觉引用框。
- **适用场景：** 小红书图文与横版演示两用；文字密、强调强；中文优先的观众。
- **路径：** `templates/full-decks/xhs-white-editorial/index.html`

## 2. graphify-dark-graph — 暗底知识图谱

- **灵感来源：** `20260413-graphify/ppt/graphify.html`
- **关键视觉：** `#06060c→#0e1020` 深夜渐变，漂移的模糊光球，封面上的 SVG 力导向图叠层，彩虹偏移渐变标题，JetBrains Mono 命令行发光，毛玻璃卡片（warm/blue/green/purple/danger）。强调色：琥珀 `#e8a87c`、薄荷 `#7ed3a4`、雾蓝 `#7eb8da`、丁香 `#b8a4d6`。
- **适用场景：** 开发工具 / CLI / 知识图谱 / 数据可视化发布；想要「AI 原生 + 科幻 + 温暖」气质的现场演示。
- **路径：** `templates/full-decks/graphify-dark-graph/index.html`

## 3. knowledge-arch-blueprint — 奶油蓝图架构

- **灵感来源：** `20260405-Karpathy-知识库/20260405 架构图v2.html`
- **关键视觉：** 奶油纸底 `#F0EAE0`，单一铁锈强调色 `#B5392A`，48px 蓝图网格遮罩，2px 黑色硬边框卡片，流水线步骤盒中有一个主视觉抬起，右侧铁锈色洞察提示，Playfair 衬线大数字，SVG 虚线反馈回路箭头。没有渐变，没有柔和阴影。
- **适用场景：** 系统架构图、数据流图、工程白皮书；想要严肃、可打印、像 README 一样好读的感觉。
- **路径：** `templates/full-decks/knowledge-arch-blueprint/index.html`

## 4. hermes-cyber-terminal — 暗终端 honest-review

- **灵感来源：** `20260414-hermes-agent/ppt/hermes-record.html` + `hermes-vs-openclaw.html`
- **关键视觉：** `#0a0c10` 黑底，56px 赛博网格 + CRT 暗角 + 扫描线，窗口红绿灯边框，`$ prompt` 命令行标题，薄荷绿 `#7ed3a4` 发光大字，通篇 JetBrains Mono，仅描边的柱状图，闪烁光标，琥珀/绿/红标签层级，深色代码框。
- **适用场景：** 带调用轨迹、差异和基准的 CLI / 智能体 / 开发工具评测；想要「诚实技术评审」的语气。
- **路径：** `templates/full-decks/hermes-cyber-terminal/index.html`

## 5. obsidian-claude-gradient — GitHub 暗紫渐变

- **灵感来源：** `20260406-obsidian-claude/slides.html`
- **关键视觉：** GitHub 暗色 `#0d1117`，紫+蓝径向氛围光加上 60px 遮罩网格，居中布局，紫色胶囊标签，三色渐变文字 `#a855f7→#60a5fa→#34d399`，接近 GitHub 的代码配色（`#010409` 底 + 紫/蓝/橙/绿令牌），左侧紫色边框高亮块。
- **适用场景：** 开发者工作流 / MCP / Agent / 开发工具教程；气质接近 GitHub Blog / Linear Changelog；配置和步骤较多的内容。
- **路径：** `templates/full-decks/obsidian-claude-gradient/index.html`

## 6. testing-safety-alert — 红琥珀警示

- **灵感来源：** `20260412-AI测试与安全/html/xhs-ai-testing-safety-v2.html`
- **关键视觉：** 顶部和底部 45° 红黑警示条纹，红色删除线否定标题，L1/L2/L3 绿/琥珀/红分级卡片，带圆形状态点的警示框，左侧红边框的 policy-yaml 代码块并高亮 `bad` 关键字，红/绿清单，Q1 事故堆叠柱状图。
- **适用场景：** 安全 / 风险 / 事故复盘 / 红队 / 上线前 AI 评审 / 策略即代码；需要让观众感到「这事很严肃，不要扫一眼就过」。
- **路径：** `templates/full-decks/testing-safety-alert/index.html`

## 7. xhs-pastel-card — 柔和马卡龙慢生活

- **灵感来源：** `20260412-obsidian-skills/html/xhs-obsidian-skills.html` + 与 `20260409` v2-白底版共用的马卡龙图案
- **关键视觉：** 奶油底 `#fef8f1`，三团柔和模糊色块，Playfair 斜体衬线展示标题混无衬线正文，全色 28px 圆角马卡龙卡片（peach / mint / sky / lilac / lemon / rose），斜体 Playfair `01-04` 编号，SVG 环形图，芯片+页码顶栏。
- **适用场景：** 生活方式 / 个人成长 / 慢生活 / 情绪内容；想要「杂志、手工、不太技术」的感觉；休息、停顿、柔软这类主题。
- **路径：** `templates/full-decks/xhs-pastel-card/index.html`

## 8. dir-key-nav-minimal — 方向键 8 色极简

- **灵感来源：** `20260405-Karpathy-知识库/20260405 演示幻灯片【方向键版】.html`
- **关键视觉：** 8 页各自一种纯色背景（indigo / cream / crimson / emerald / slate / violet / white / charcoal），每页自己的强调色，160px 展示标题 + 4px 短粗强调色分隔线，箭头 `→` 前缀的等宽列表，左下角 `← →` 键位提示加右下角页码，巨大的呼吸留白。
- **适用场景：** 主题演讲式极简分享：有话要说、没什么可展示；一页一个想法；演讲 / 发布会 / 公开演示。
- **路径：** `templates/full-decks/dir-key-nav-minimal/index.html`

---

## 场景演示（通用、可复用）

这些不是从单一来源抽取的 — 它们是最常见演示任务的通用脚手架。每套开箱即有鲜明视觉和充实内容。

| # | 名称 | 页数 | 气质 | 适用场景 |
|---|---|---|---|---|
| 9  | `pitch-deck`       | 10 | 白底 + 蓝→紫渐变，YC/VC 气质，大数字，增长曲线 | 融资、创业路演、投资人会议 |
| 10 | `product-launch`   | 8  | 深色主视觉 + 浅色内容，暖橙→桃，功能卡片，定价档位，行动号召 | 产品发布、发布会主题演讲 |
| 11 | `tech-sharing`     | 8  | GitHub 暗色，JetBrains Mono，终端代码块，议程 + 问答 | 技术分享、内部技术演讲、会议演讲 |
| 12 | `weekly-report`    | 7  | 企业清晰风，8 格 KPI，已交付清单，8 周柱状图，下周表格 | 周报、团队状态更新、业务复盘 |
| 13 | `xhs-post`         | 9  | **3:4 @ 810×1080**，暖马卡龙，虚线贴纸卡片，页码圆点 | 小红书图文、Instagram 轮播 |
| 14 | `course-module`    | 7  | 暖纸底 + Playfair 衬线，左侧学习目标常驻边栏，选择题自测 | 教学模块、在线课程、工作坊模块 |
| 15 | `presenter-mode-reveal` 🎤 | 6  | **演讲者模式专用** · terminal-green 默认 · 5 主题 T 键切换 · 每页带 150–300 字逐字稿示例 | **技术分享/演讲/课程**—需要按 S 键看逐字稿的场景 ✨ |

每个文件夹：`index.html`、带作用域的 `style.css`（前缀 `.tpl-<name>`）、`README.md`。`xhs-post` 模板把默认 `.slide` 盒子改成固定 `810×1080`，用于 3:4 竖版。

> 🎤 **任何演讲场景（技术分享 / 课程 / 路演）都推荐用 `presenter-mode-reveal`**，或者参考 `templates/full-decks/presenter-mode-reveal/README.md` 给其他模板加 `<aside class="notes">` 逐字稿。

---

## 编写说明

- 每套模板的 CSS 都收在 `.tpl-<name>` 下，因此两套或更多模板可以加载在同一页而不会冲突。
- 替换示例内容，但保留结构类 — 它们决定了每套模板的身份。
- 共享运行时（`assets/runtime.js`）提供键盘翻页、全屏、总览网格、主题循环 — 不需要再加任何 JS。
- 图表是手写 SVG（不依赖 CDN）。如果需要交互数据，可以换成 chart.js / echarts。
