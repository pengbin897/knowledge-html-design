# 版式目录

每种版式都在 `templates/single-page/<name>.html`，是带真实感示例数据、可独立运行的完整页面。在 Chrome 里直接打开任意文件即可预览。汇总浏览见 `templates/layout-showcase.html`。

拼一份新演示：打开文件，把 `<section class="slide">…</section>` 块（可以多块）复制进你的演示 HTML，再替换示例数据。共享 CSS（base、主题、动画）已由 `deck.html` 接好。没有合适版式时，按下面的结构约定另写一页。

| 文件 | 用途 |
|---|---|
| `cover.html` | 演示封面。眉题 + 超大标题 + 导语 + 胶囊标签行。 |
| `timeline.html` | 横向时间线，多个节点带圆点。 |
| `todo-checklist.html` | 带已勾选 / 未勾选状态的清单。 |

## 如何选版式

- **开场**：`cover.html`。
- **展示计划或演进**：`timeline.html`。
- **展示待办或检查项**：`todo-checklist.html`。

## 命名与结构约定

- 每一页是 `<section class="slide" data-title="...">`。
- 头部胶囊：`<p class="kicker">…</p>`；眉题：`<p class="eyebrow">…</p>`。
- 标题：`<h1 class="h1">…</h1>` / `<h2 class="h2">…</h2>`。
- 导语：`<p class="lede">…</p>`。
- 卡片：`<div class="card">…</div>`（变体：`card-soft`、`card-outline`、`card-accent`）。
- 网格：`.grid.g2`、`.grid.g3`、`.grid.g4`。
- 备注：每页一个 `<div class="notes">…</div>`。
