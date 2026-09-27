# 版式目录

每种版式都在 `templates/single-page/<name>.html`，是带真实感示例数据、可独立运行的完整页面。在 Chrome 里直接打开任意文件即可预览。

拼一份新演示：打开文件，把 `<section class="slide">…</section>` 块（可以多块）复制进你的演示 HTML，再替换示例数据。共享 CSS（base、主题、动画）已由 `deck.html` 接好。

## 开场与过渡

| 文件 | 用途 |
|---|---|
| `cover.html` | 演示封面。眉题 + 超大标题 + 导语 + 胶囊标签行。 |
| `toc.html` | 目录。2×3 编号卡片网格。 |
| `section-divider.html` | 大号编号章节分隔（02 · Theme）。 |

## 以文字为主

| 文件 | 用途 |
|---|---|
| `bullets.html` | 经典要点列表，每条包在卡片里。 |
| `two-column.html` | 概念与示例并排。 |
| `three-column.html` | 三根等宽支柱，带图标。 |
| `big-quote.html` | 通栏引用，editorial-serif 风格。 |

## 数字与数据

| 文件 | 用途 |
|---|---|
| `stat-highlight.html` | 一个巨大数字 + 副标题（使用 `.counter` 动画）。 |
| `kpi-grid.html` | 一行 4 个 KPI，带涨跌变化。 |
| `table.html` | 数据表，行悬停高亮，数字右对齐。 |
| `chart-bar.html` | Chart.js 柱状图，颜色跟随主题。 |
| `chart-line.html` | Chart.js 双折线图，带填充区域。 |
| `chart-pie.html` | Chart.js 环形图 + 要点卡片。 |
| `chart-radar.html` | Chart.js 雷达图，6 个轴对比 2 个产品。 |

## 代码与终端

| 文件 | 用途 |
|---|---|
| `code.html` | 用 highlight.js 做语法高亮的代码（JS 示例）。 |
| `diff.html` | 手写的 +/- 差异视图。 |
| `terminal.html` | 终端窗口模拟，带红绿灯标题栏。 |

## 示意图与流程

| 文件 | 用途 |
|---|---|
| `flow-diagram.html` | 5 节点流水线，带箭头，其中一个节点高亮。 |
| `arch-diagram.html` | 三层架构网格。 |
| `process-steps.html` | 卡片里的 4 个编号步骤。 |
| `mindmap.html` | 放射状思维导图，带 SVG 路径绘制动画。 |

## 计划与对比

| 文件 | 用途 |
|---|---|
| `timeline.html` | 5 个节点的横向时间线，带圆点。 |
| `roadmap.html` | 4 列 NOW / NEXT / LATER / VISION。 |
| `gantt.html` | 12 周甘特图，5 条并行轨道。 |
| `comparison.html` | Before vs After 双面板卡片。 |
| `pros-cons.html` | 利弊两张卡片。 |
| `todo-checklist.html` | 带已勾选/未勾选状态的清单。 |

## 视觉

| 文件 | 用途 |
|---|---|
| `image-hero.html` | 通栏主视觉，Ken Burns 渐变背景。 |
| `image-grid.html` | 7 格便当网格，渐变占位。 |

## 收尾

| 文件 | 用途 |
|---|---|
| `cta.html` | 行动号召，大号渐变标题 + 按钮。 |
| `thanks.html` | 最后的「Thanks」页，带彩纸爆发。 |

## 如何选版式

- **开场**：`cover.html`，后面常接 `toc.html`。
- **章节分隔**：每个大章节前用 `section-divider.html`。
- **核心内容**：`bullets.html`、`two-column.html`、`three-column.html`。
- **展示数字**：`stat-highlight.html`（单个）或 `kpi-grid.html`（4 个）。
- **展示图表**：`chart-bar.html` / `chart-line.html` / `chart-pie.html` / `chart-radar.html`。
- **展示差异或变化**：`comparison.html`、`diff.html`、`pros-cons.html`。
- **展示计划**：`timeline.html`、`roadmap.html`、`gantt.html`、`process-steps.html`。
- **展示架构**：`arch-diagram.html`、`flow-diagram.html`、`mindmap.html`。
- **代码 / 演示**：`code.html`、`terminal.html`。
- **收尾**：`cta.html` → `thanks.html`。

## 命名与结构约定

- 每一页是 `<section class="slide" data-title="...">`。
- 头部胶囊：`<p class="kicker">…</p>`；眉题：`<p class="eyebrow">…</p>`。
- 标题：`<h1 class="h1">…</h1>` / `<h2 class="h2">…</h2>`。
- 导语：`<p class="lede">…</p>`。
- 卡片：`<div class="card">…</div>`（变体：`card-soft`、`card-outline`、`card-accent`）。
- 网格：`.grid.g2`、`.grid.g3`、`.grid.g4`。
- 备注：每页一个 `<div class="notes">…</div>`。
