# Theme · 主题

> 回答：**整份 deck 看起来像什么。** 作用于全 deck，在 S1 一次定下，全程不变。

---

## §1 定义

Theme = 一组 **token 取值** + 可选的**页面级装饰**。它从四个面向决定 deck 的气质：

| 面向 | 由哪些 token 决定 | 例 |
|---|---|---|
| 色彩 | `--bg*` `--surface*` `--text-*` `--accent*` `--good/warn/bad` `--grad*` | 暗底荧光绿 vs 纸感暖白 |
| 字体 | `--font-sans/serif/mono/display` `--letter-*` | 等宽 vs 衬线大标题 |
| 形状 | `--radius*` `--border*` | 直角硬边 vs 大圆角 |
| 质感 | `--shadow*`，以及主题文件里的少量选择器 | 硬投影 / 发光 / 纸纹 / 网格 |

Theme **不决定**任何页面的结构、部件的构成或动效——那是另外三个维度的事。

---

## §2 规范（MUST）

### 2.1 Token 契约

每个主题都必须给出下列 token 的值（`assets/base.css` 的 `:root` 是默认值与完整清单）：

| 组 | token | 角色 |
|---|---|---|
| 背景 | `--bg` `--bg-soft` | 页面底色；次级底色 |
| 表面 | `--surface` `--surface-2` | 卡片等容器的底色；次级容器 |
| 边线 | `--border` `--border-strong` | 常规分隔；强调描边 |
| 文字 | `--text-1` `--text-2` `--text-3` | 主文字；次要文字；注释 / 来源 |
| 强调 | `--accent` `--accent-2` `--accent-3` | 主强调色；两个辅助强调 |
| 语义 | `--good` `--warn` `--bad` | 正向；提醒；负向（见 2.3） |
| 渐变 | `--grad` `--grad-soft` | 渐变文字 / 主视觉；柔和底 |
| 圆角 | `--radius` `--radius-sm` `--radius-lg` | 卡片；小部件；大容器 |
| 阴影 | `--shadow` `--shadow-lg` | 常规层级；浮起层级 |
| 字体 | `--font-sans` `--font-serif` `--font-mono` `--font-display` | 正文；衬线；代码；标题 |
| 字距 | `--letter-tight` `--letter-normal` | 标题；正文 |
| 缓动 | `--ease` | 全局默认缓动 |

### 2.2 只引用 token

- 页面与部件中的颜色、圆角、阴影、字体**一律写 `var(--token)`**，不写 `#xxxxxx` / `rgb()`。
- 需要半透明时用 `color-mix(in srgb, var(--accent) 20%, transparent)`，不另写色值。
- **例外**：主题文件本身。

### 2.3 语义色是信息编码

`--good` / `--warn` / `--bad` 不是装饰色。每个 deck 在 Brief 中写明它们各代表什么（例：`--good` = 收入 / 优势，`--bad` = 成本 / 风险），之后：

- 同一语义全 deck 用同一个色；
- 不用语义色做纯装饰；
- 主强调色 `--accent` 用于「本页焦点」，不与语义色混用。

### 2.4 一个 deck 一个 theme

主题通过 `<link id="theme-link">` 全局生效。不在页面之间切换主题；需要封面更有冲击力时，用同一主题下更强的部件或动效，而不是换主题。

### 2.5 可读性

- `--text-1` 在 `--bg` 与 `--surface` 上都要清晰可读（正文对比度 ≥ 4.5:1）。
- `--text-3` 只用于注释、来源、页码这类辅助信息，不承载正文。

### 2.6 装饰占位

`swiss-grid`、`editorial-serif`、`hand-drawn`、`pixel` 会占用 `.slide::before` / `.slide::after` 画页面装饰。版式和部件**不要再使用这两个伪元素**。

---

## §3 决策（SHOULD）

按顺序问两个问题，得到候选主题。

### 3.1 受众与调性

| 受众 / 调性 | 首选 | 备选 |
|---|---|---|
| 工程师 / 开发者 | `terminal-green` | `swiss-grid` |
| 设计师 / 产品 | `editorial-serif` | `aurora` / `soft-pastel` / `neo-brutalism` |
| 高管 / 商业汇报 | `swiss-grid` | `editorial-serif` |
| 消费者 / 生活方式 | `xiaohongshu-white` | `soft-pastel` / `japanese-minimal` |
| 赛博 / CLI / 极客 | `terminal-green` | `pixel` |
| 路演 / 强视觉 | `swiss-grid` | `neo-brutalism` |
| 发布会 / 产品揭晓 | `aurora` | `swiss-grid` |
| 教育科普 / 轻松趣味 | `hand-drawn` | `pixel` |

### 3.2 内容与交付形态修正

| 情况 | 倾向 |
|---|---|
| 数据、数字密集 | 高对比：深色主题或 `swiss-grid`；避免 `hand-drawn` / `pixel` |
| 长文字、叙事为主 | `editorial-serif` / `japanese-minimal` |
| `video` 形态（录屏成视频） | 深色主题更抗压缩、焦点更突出 |
| `post` 形态（3:4 图文） | `xiaohongshu-white` |
| 用户给了品牌色 / 参考图 | 走 §5 派生 |

---

## §4 示例（MAY · 参照）

浏览全部主题：`templates/theme-showcase.html`；任意 deck 中按 **T** 循环切换。主题文件在 `assets/themes/*.css`。

| 名称 | 气质 | 适用 |
|---|---|---|
| `editorial-serif` | 杂志编辑风：Playfair 斜体大标题、Newsreader 正文、纸感暖白、刊头双线、发丝线分栏 | 品牌故事、生活方式、文字密度大的演讲 |
| `soft-pastel` | 柔和马卡龙三色渐变 | 产品发布、面向消费者、轻松话题 |
| `xiaohongshu-white` | 小红书白底、暖红强调、衬线标题 | 小红书图文、生活 / 美学 |
| `japanese-minimal` | 象牙白、朱红强调、极大留白、Noto Serif | 品牌升级、匠人故事、禅意叙事 |
| `swiss-grid` | 瑞士国际主义：12 栏网格、顶部粗黑线、信号红强调块、直角描边 | 严肃排版、高管 / 商业汇报 |
| `neo-brutalism` | 3px 黑描边 + 硬投影、荧光黄高亮、粉黄绿色块卡片、方格纸底 | 年轻潮流、品牌合作、强视觉路演 |
| `hand-drawn` | 奶油纸底、手写字、歪扭描边卡片、马克笔高亮、角落涂鸦 | 教育科普、亲子、温暖分享 |
| `pixel` | 像素游戏风：色阶天空、像素云、Press Start 2P 标题、缺角像素边框 | 游戏、复古话题、趣味技术分享 |
| `terminal-green` | 绿屏终端、等宽字、发光文字、4px 小圆角 | CLI / 开发者分享、极客主题 |
| `aurora` | 极光渐变 + blur + saturate | 发布会、揭晓、强氛围 |

---

## §5 自创（author · 派生新主题）

没有合适主题，或用户给了品牌色 / 参考图时，派生一套新主题：

1. **选起点**：复制气质最接近的基础主题为 `assets/themes/<name>.css`。
2. **定五色**：底色、表面色、主文字色、主强调色、语义三色。从参考图取色时，只取这五类，不多取。
3. **定字体**：标题字体与正文字体各一种；中文走 `Noto Sans SC` / `Noto Serif SC`（已在 `assets/fonts.css` 中引入）。
4. **定形状与质感**：圆角档位、阴影风格（柔和 / 硬投影 / 发光）。
5. **填满契约**：§2.1 的每个 token 都要有值，没改的也要确认继承值合适。
6. **查可读性**：按 §2.5 检查。
7. **登记**：写进分镜的「自创记录」；需要 T 键切换时加入 `<body data-themes="...">`。

约束：

- 主题文件以 token 覆盖为主，**少写选择器**，控制在约 200 行内；
- 需要额外质感 token（如暗色主题的发光）时可以新增，例如 `--glow`，但部件引用时必须带回退：`var(--glow, var(--shadow))`，保证换回其他主题时不失效。
