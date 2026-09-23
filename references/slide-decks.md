# Slide Decks：陈述 deck 制作规范

**完成标准**：`index.html` 在浏览器里能全屏演讲、键盘翻页。每页是独立的 1920×1080 HTML。

口播稿是内容的源代码。页面是论述的视觉翻译。不要做成带 fade 的网页，也不要做成连续运动舞台。

## 多文件架构（统一）

```
<talk-name>/
├── script.md
├── index.html              # 从 assets/deck_index.html 复制，改 MANIFEST
├── shared/tokens.css
└── slides/
    ├── 01-cover.html
    ├── 02-question.html
    └── ...
```

每页独立 CSS/JS 作用域，可单独双击打开验证。`index.html` 负责键盘、缩放、页码、localStorage 记忆。

### 每页骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>P03 · 只认识 token</title>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;1,6..72,400&family=Noto+Serif+SC:wght@400;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../shared/tokens.css">
<style>
  /* 仅本页布局。不要把单页 class 塞进 tokens.css */
</style>
</head>
<body>
  <div class="page-header">...</div>
  <!-- 1920×1080 画布上的主张 -->
  <div class="page-footer"><span>什么是 token</span><span>03 / 05</span></div>
</body>
</html>
```

**约束**：
- `<body>` 就是画布，不要再包一层全屏 wrapper。
- `width/height: 1920×1080` 由 `tokens.css` 锁定。
- 字体 `<link>` 每页自己写，保证单页可打开。
- 用 `px`，不用 `vw`/`vh`。缩放交给拼接器。

### `shared/tokens.css` 只放跨页共用

- CSS 变量（色板、字号阶、间距）
- `body` 画布锁定
- `.page-header` / `.page-footer` 这种每页一样的 chrome

不要把某页的英雄排版 class 放进来。

### 拼接器

复制 `assets/deck_index.html`。只改 `DECK_MANIFEST`：

```js
window.DECK_MANIFEST = [
  { file: "slides/01-cover.html",    label: "封面" },
  { file: "slides/02-question.html", label: "问题" },
  { file: "slides/03-reveal.html",   label: "只认识 token" },
];
```

键盘：← / → / Space / PgUp / PgDown / Home / End / 1-9。`index.html#5` 跳到第 5 张。编号从 1 开始。

iframe 白屏 → 检查 `file` 是否相对 `index.html`。样式「冲突」→ iframe 隔离了，多半是缓存，强刷。

## 先做 2 页 showcase

≥ 5 页时：封面 + 结构差最大的内容页 → 用户点头 → 再批量。详见 `references/workflow.md`。

知识陈述 deck 推荐组合：

| 稿的形态 | showcase 两页 |
|----------|----------------|
| 概念解释 | 封面 + 定义/对比拆解 |
| 论证/观点 | 封面 + 一句主张大字 |
| 步骤/方法 | 封面 + 流程轴 |

## 默认 tokens（与 SKILL.md 一致）

```css
:root {
  --bg: #FAF7F2;
  --ink: #1C1917;
  --muted: #78716C;
  --accent: #C04A1A;
  --rule: rgba(28, 25, 23, 0.12);
  --display: "Newsreader", "Noto Serif SC", serif;
  --body: -apple-system, "PingFang SC", sans-serif;
}
body {
  margin: 0;
  width: 1920px;
  height: 1080px;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--body);
  overflow: hidden;
}
```

开工前口头说这套系统，不要另推 3 个流派。

## Layout（一个 deck 用 4–5 种）

没有照片、没有品牌 logo。用这些页型轮换节奏：

- **封面**：衬线大标题 + 一行来自稿的副题
- **章节封**：色块或满底 + 章节名（长稿才需要）
- **问题 / 金句**：近乎一句话铺满，留白要多到略不安
- **主张**：一句话 + 最多 3 个支撑点（来自稿）
- **拆解**：A vs B、流程 3 步、定义二分——几何，不画实物
- **数据**：仅当稿里有真数字；数字当主角，caption ≤ 3 行
- **收束**：把含义落成听众能带走的一句

**不要**：full-bleed 照片页、产品 UI 截图框、头像见证、logo masthead。

视觉主角要轮换（大字 / 二分 / 流程轴 / 数字），但色板和页脚不变。

## 字号（10m 投屏）

- 正文最小 24px，理想 28–36px
- 标题 60–120px
- 封面 / 金句 160–220px
- 页脚 16–18px 可以，那不是要读的正文

## 空间

每页：1 个核心信息 + 至多 3–4 个辅助点 + 1 个视觉主角。超过就拆页。

列表不要同样大小铺满。今天要讲的放大，其余缩小当背景 hint。

## Speaker notes

**默认不加。** 要讲的话在 `script.md`。仅当用户明确要求屏幕外讲稿时，才在 `index.html` 放 `#speaker-notes` JSON，数组第 N 项对应第 N 张。

## 验证（用户明确要求时）

1. 打开 `index.html`，字体已加载、首页不是白屏
2. → 键翻完全部页，无空白、无溢出
3. 全屏确认 letterbox
4. 单页 `open slides/0N-xxx.html` 也能看
5. 搜 `TODO` / 「示意图位」——该留的留，不该留的清
