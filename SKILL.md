---
name: knowledge-html-design
description: HTML PPT Studio — 用模板驱动，编写多种风格、版式与动画的专业静态 HTML 演示文稿。当用户需要演示文稿、PPT、幻灯片、keynote、deck、slideshow、「幻灯片」、「演讲稿」、「做一份 PPT」、「做一份 slides」、reveal 风格的 HTML 演示、小红书图文，或任何需要美观且支持键盘翻页的多页路演/报告/分享文档时使用。触发词包括 "presentation"、"ppt"、"slides"、"deck"、"keynote"、"reveal"、"slideshow"、"幻灯片"、"演讲稿"、"分享稿"、"小红书图文"、"talk slides"、"pitch deck"、"tech sharing"、"technical presentation"。
---

# 任务

根据完整的口播稿 / 演讲稿 / 视频制作脚本，编写专业 HTML 形式的演示文稿。内容定位偏向于：知识讲解 / 技术分享 / 产品介绍 / 行业分析 / 市场研究 / 观点解析

## 制作流程

1. 理解这份演示

- **主题是什么**
- **大概多少时长**
- **给谁演示的**

2. 选择一个合适的 theme

参考 `references/themes.md`。拿不准时：

- **工程师** → `terminal-green`。
- **设计师 / 产品** → `editorial-serif` / `aurora` / `soft-pastel` / `neo-brutalism`。
- **高管 / 商业汇报** → `swiss-grid` / `editorial-serif`。
- **消费者 / 生活方式** → `xiaohongshu-white` / `soft-pastel` / `japanese-minimal` / `editorial-serif`。
- **赛博 / CLI / 极客** → `terminal-green` / `pixel`。
- **路演 / 强视觉** → `swiss-grid` / `neo-brutalism`。
- **发布会 / 产品揭晓** → `aurora` / `swiss-grid`。
- **教育科普 / 轻松趣味** → `hand-drawn` / `pixel`。

3. 新建一个空白演示文稿
```bash
./scripts/new-deck.sh <talk-name>
```

这会把 `templates/deck.html` 复制到 `output/<talk-name>/index.html`，并改写路径。按大纲增删 `<section class="slide">` 块。

4. 参照**演示大纲 / 脚本**逐页撰写

针对每一页的内容，先从资源库中挑选（从样例库文件中复制 `<section class="slide">...</section>` 块到演示页中）一个与当前页内容最契合的版式；若没有合适的版式，也可以另外创建一个。再将内容按照版式的格式填充进当前页中。


## 高阶制作技巧

### 设计原则

演示稿整体设计需遵循以下原则：
1. 对比（Contrast）
若元素不同则使其 “非常不同”，通过明暗 / 冷暖色彩、大小、粗细、形状等强烈反差制造视觉张力（如冷暗背景与暖色帆船对比），既吸引注意力又建立信息层级，避免 “微弱对比”（如字体 / 颜色仅细微差异），需大胆区分以突出主体。

2. 重复（Repetition）
重复颜色、字体、图形等视觉元素，强化页面统一性（如统一风格图标），让观众感知内容关联性，避免杂乱；

3. 对齐（Alignment）
元素不能随意摆放，需与其他元素建立视觉关联（如左对齐、右对齐、居中或基线对齐），用 “看不见的线” 串联页面，避免杂乱。
作用：带来秩序感和专业度（如统一左对齐文本 / 图片，比零散摆放更整洁）；

4. 亲密性（Proximity）
相关元素就近分组，无关元素留白分隔，用空间传递逻辑关系。
作用：降低理解成本（如 PPT 中标题 + 正文、图片 + 说明文字成组，观众一眼懂关联）；

### 视觉元素

- 能用数据展示的，就不要用图示；能用图示的，就不要用文字；一页只有文字的，让核心关键词醒目呈现
- 充分利用动效让内容呈现形式更生动，纯静态文字的展示很容易让观众失去兴致，但又不能太生硬，动效要与表达内容相匹配

### 动效纪律

- 发生顺序 ＝ 阅读顺序 ＝ 内容因果顺序：先因后果，先定义后引用。同一时刻主线上只有一个元素在运动。
- 位移量 ≤ 画幅宽的 0.8%（1448 宽画布上约 12 px），方向与该元素的语义方向一致：上涨向上、推进向右、汇聚向内、扩张向外。
- 动效只改变四项：位置、尺寸、描边进度、数值。颜色、线宽、圆角、底色在整段动效中恒定。
- 缓动：画线与量值生长用 ease-out（快起慢收，模拟收笔）；位移用 ease-in-out；匀速循环用 linear。
- 错峰间隔 ＝ 前序元素时长的 40%–60%。


## 相关资源库

- **10 套精选 themes** 说明见 `references/themes.md`，样例见 `templates/theme-showcase.html`
- **31 种版式** 说明见 `references/layouts.md`，样例见 `templates/single-page/*.html`
- **27 种 CSS 动画** 说明见 `references/animations.md`，样例见 `assets/animations/animations.css`
- **特效运行时**（`assets/animations/fx-runtime.js`）— 进入幻灯片时自动初始化 `[data-fx]`，离开时清理


## 导出为 PNG（可选）

`scripts/render.sh` 封装了位于 `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` 的无头 Chrome。多页截图时，runtime.js 提供 `#/N` 深链接，render.sh 按 1..N 逐页遍历。

```bash
./scripts/render.sh templates/single-page/kpi-grid.html        # 单页
./scripts/render.sh examples/demo-deck/index.html 8 out-dir    # 8 页，自定义输出目录
```
