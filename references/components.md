# Component · 部件

> 回答：**用什么视觉单元来表达这条信息。** 作用于页内元素，在 S3 分镜时按区域决定。

---

## §1 定义

Component = 表达**一种信息形态**的最小视觉单元。一个大数字、一根条形、一张卡片、一个流程节点，都是部件。

每个部件由四件事定义：

| 属性 | 含义 | 例（stat 大数字） |
|---|---|---|
| **构成** | 由哪些部分组成，哪些必需、哪些可选 | 数值（必需）+ 单位（有则必需）+ 标签（必需）+ 变化量 / 来源（可选） |
| **色调** | 承载什么语义 | 默认强调色；表示成本时用 `bad` |
| **尺寸** | 用哪个字号档位 | 数值用 display，标签用 caption |
| **可动部分** | 哪些部分可以做动效 | 数值可滚动；整体可入场 |

部件只关心「这条信息长什么样」，不关心它放在页面哪里（layout）和何时出现（animation）。

---

## §2 规范（MUST）

### 2.1 构成完整

用一个部件时，它的**必需部分一个都不能少**。一个没有标签的大数字、一根没有数值的条形，观众无法理解。各部件的构成见 2.6 谱系表。

### 2.2 色调走修饰类

部件的语义色通过修饰类表达，统一为 5 个：`accent`（默认，可省略）、`good`、`warn`、`bad`，以及用于对照项的 `muted`（取 `--text-2`）。实现方式固定为「修饰类设置 `--tone`，部件内部只读 `--tone`」。`assets/components.css` 已全局定义：

```css
:root   { --tone: var(--accent); }
.good   { --tone: var(--good); }   /* .accent / .warn / .bad / .muted 同理 */
.c-kpi .value { color: var(--tone); }
.c-bar .fill  { background: var(--tone); }
```

`--tone` 会继承：给容器加色调，里面的部件跟着变；子元素（如 `.c-formula .term`、`.c-list li`）也可以单独加修饰类。少数部件有自己的默认色调：`c-alert` 为 warn，`c-record` 与 `pill.verdict` 为 good。

色调的含义以 Brief 中「语义色」一行为准，全 deck 不变（见 `themes.md` §2.3）。

**发光**：部件的发光读取主题的可选 token `--glow-blur` / `--glow-mix`，颜色跟随 `--tone`（写法见 `themes.md` §2.1）。任意容器加 `.glow` 即可获得色调描边与发光；主题没有发光 token 时只剩描边。

### 2.3 尺寸走字号档位

部件内部的文字只用 `layouts.md` §2.4 的档位。一个部件内部最多 2 个档位（例如数值 display + 标签 caption）。

### 2.4 容器克制

- 卡片的内边距、圆角、阴影沿用 `.card`（内边距 26×28，`--radius`，`--shadow`）。
- 卡片最多嵌套一层（卡片里可以有 pill，不要再套卡片）。
- 同一页的同类部件，尺寸、间距、对齐完全一致。

### 2.5 命名

| 情况 | 命名 |
|---|---|
| `assets/base.css` 已有的通用部件 | 直接用：`.card` `.pill` `.kicker` `.h2` `.counter`… |
| `assets/components.css` 部件库 | 直接用：`.c-stat` `.c-kpi` `.c-bar` `.c-formula`…（在 deck 中引入该文件，位于主题之后、`animations.css` 之前） |
| 在 deck 内自创的部件 | `c-<名称>`，子元素用短类名并挂在其下：`.c-stat .value`；不要与部件库重名 |
| 修饰 | 色调：`accent` / `good` / `warn` / `bad` / `muted`；变体：语义化短词，如 `hero`、`on`、`lock`、`final`、`dual`、`v`（纵向）；通用：`glow` |

### 2.6 部件谱系

按**信息形态**分为 7 族，共 38 个部件。「类名」列是 `assets/base.css` / `assets/components.css` 中的实现；「示例」列 `cs#N` 指 `templates/component-showcase.html` 第 N 页，每页左栏是构成规格，右栏是可运行的参照实现。

#### A 文字

| 部件 | 表达 | 构成 | 类名 | 示例 |
|---|---|---|---|---|
| kicker 眉题 | 章节 / 分类 | 短文本（≤12 字） | `.kicker` `.eyebrow` | `cs#2` |
| headline 标题 | 本页 claim | 主句 + 可选强调片段 | `.h1` `.h2` | `cs#3` |
| lede 导语 | 补充说明 | 1~2 句 | `.lede` | `cs#4` |
| keyword 关键词 | 句中重点 | 行内片段 | `.c-key`（色调）`.gradient-text`（渐变） | `cs#5` |
| quote 引文 | 引用 / 金句 | 引文 + 出处 | `.c-quote` | `cs#6` |
| strike 否定 | 推翻旧观点 | 被否定文字（删除线）+ 替代文字 | `.c-strike`；行内 `.c-strike-old` | `cs#7` |
| caption 注释 | 来源 / 补充 | 短文本 | `.dim2` | `cs#8` |

#### B 数值

| 部件 | 表达 | 构成 | 类名 | 示例 |
|---|---|---|---|---|
| stat 大数字 | 一个关键数 | 数值 + 单位 + 标签（+ 变化量 / 来源） | `.c-stat` | `cs#9` |
| kpi 指标卡 | 并列指标之一 | 标签 + 数值 + 变化量 / 脚注（带色调） | `.c-kpi` | `cs#10` |
| delta 变化量 | 涨跌 / 倍数 | 方向符号 + 数值 + 对比基准 | `.c-delta`（独立展示加 `.lg`） | `cs#11` |
| counter 滚动数 | 数值动效载体 | `<span class="counter" data-to="…">`，属性见 `animations.md` §2.5 | `.counter` | `cs#12` |

#### C 量比

| 部件 | 表达 | 构成 | 类名 | 示例 |
|---|---|---|---|---|
| bar 条形 | 一项量值 | 标签 + 轨道 + 填充（长度 = 值）+ 数值 | `.c-bar` | `cs#13` |
| progress 进度 | 完成度 / 占比 | 轨道 + 填充 + 百分比（`.dual` 剩余段着色） | `.c-progress` | `cs#14` |
| ring 环形 | 单一占比 | 底环 + 弧（`--p` = 值）+ 中心数值 | `.c-ring` | `cs#15` |
| chart 图表 | 趋势 / 分布 | 坐标 + 系列 + 标签（内联 SVG） | `.c-chart` | `cs#16` |

#### D 条目

| 部件 | 表达 | 构成 | 类名 | 示例 |
|---|---|---|---|---|
| list-item 清单项 | 带状态的一条 | 状态标记 + 文本（+ 标签） | `.c-list`（`.plain` 无底色） | `cs#17` |
| agenda-row 议程行 | 有序一项 | 编号 + 标题（+ 说明 / 时长）；`li.on` 当前、`li.lock` 未解锁 | `.c-agenda` | `cs#18` |
| record-row 事项行 | 完成事项 | 标记 + 事项 + 负责人 / 标签 | `.c-record` | `cs#19` |
| table 表格 | 多维精确数据 | 表头 + 行 + 对齐的数值列（+ 倍数行） | `.c-table` | `cs#20` |

#### E 容器

| 部件 | 表达 | 构成 | 类名 | 示例 |
|---|---|---|---|---|
| card 卡片 | 一个要点 | 标题 + 正文（+ 图标 / 数字） | `.card` `.card-soft` `.card-outline` `.card-accent`；修饰 `.glow` | `cs#21` |
| pill 胶囊 | 标签 / 属性 / 结论 | 短文本；结论胶囊每页 ≤1 个 | `.pill` `.pill-accent` `.pill.verdict` | `cs#22` |
| callout 提示 | 洞察 / 补充 | 标签或图标 + 一句话 | `.c-callout` | `cs#23` |
| alert 警示框 | 风险 / 前提 | 警示图标 + 标题 + 编号项（或一行说明）（带色调） | `.c-alert` | `cs#24` |
| price-card 定价卡 | 方案 / 档位 | 档名 + 价格 + 换算 + 权益 + 突出档 `.hero` | `.c-price` | `cs#25` |
| sticker 贴纸 | 俏皮强调 | 短文本 + 旋转 + 描边 | `.c-sticker` | `cs#26` |

#### F 关系

| 部件 | 表达 | 构成 | 类名 | 示例 |
|---|---|---|---|---|
| node 节点 | 流程中的一步 | 编号 + 标题（+ 说明）；`.on` 终点 / 当前 | `.c-flow` `.c-node` | `cs#27` |
| connector 连接 | 先后 / 因果 / 运算 | 线或箭头（SVG）；运算符 | `.c-connector` `.c-op` | `cs#28` |
| timeline-dot 时间点 | 时间节点 | 圆点 + 时间 + 事件 | `.c-timeline` | `cs#29`、`sp:timeline` |
| vs 对比轴 | 两方对立 | 左部件 + 中轴标记 + 右部件（`.v` 上下） | `.c-vs` | `cs#30` |
| formula 算式 | 一步计算 | 项 + 运算符 + 项 + `=` + 结果（结果带色调）（+ 溯源） | `.c-formula` | `cs#31` |
| ladder 推演阶梯 | 逐级放大 / 换算 | 级标签 + 数值，级间用 `↓` 连接（可标倍率） | `.c-ladder` | `cs#32` |
| cycle 闭环 | 首尾相接、无法跳出 | 中心标签 + N 个编号节点沿圆周分布 + 弧线（N = 3~6） | `.c-cycle` | `cs#33` |
| sum 分项求和 | 多项加总 | N 行「量 → 小计」+ 行间 `+` + 合计（带色调） | `.c-sum` | `cs#34` |

#### G 媒介

| 部件 | 表达 | 构成 | 类名 | 示例 |
|---|---|---|---|---|
| window 模拟窗口 | 界面 / 产品截面 | 标题栏（红绿灯）+ 内容（用部件重建界面） | `.c-window` | `cs#35` |
| code 代码块 | 代码 / 命令 | 标题栏 + 等宽代码 + 语法色 | `.c-code` | `cs#36` |
| image 图片框 | 实物 / 截图 | 图 + 圆角（+ 图注 / 标注点 / 悬浮数据卡） | `.c-image` | `cs#37` |
| icon 图标 | 概念符号 | emoji 或 SVG，放在色调方底里 | `.c-icon` | `cs#38` |

---

## §3 决策（SHOULD）

**优先级：能用数据表达，就不用图示；能用图示表达，就不用文字。** 纯文字页，让关键词醒目。

| 我要表达… | 用 | 不要用 |
|---|---|---|
| 一个关键数字 | stat（+ counter） | 一句含数字的话 |
| 一个数字和它的变化 | stat + delta，或 kpi | 两个没有标签的数字 |
| 2~4 个同级指标 | kpi × N | 表格 |
| 一个占比 / 完成度 | ring 或 progress | 只有一个值的饼图 |
| 几项量值的大小比较 | bar × N（按值排序） | 多个 stat |
| 随时间的趋势 | chart（柱 / 线） | 一排 kpi |
| 多维度精确数据 | table | 很多根 bar |
| 两方对比 | card × 2（+ vs） | 一段文字 |
| 并列要点 | card × N，或 list-item | 长段落 |
| 有先后的步骤 | node × N + connector | 无序列表 |
| 带完成状态的事项 | list-item（带色调） | 普通列表 |
| 本页结论 | card-accent、keyword 或 stat | 与正文同样式的文字 |
| 推翻一个旧观点 | strike | 只换个颜色 |
| 风险、前提、限定条件 | alert | 普通卡片 |
| 一步计算 | formula | 一句含算式的话 |
| 三项以上加总 / 每项自带换算 | sum | 很长的一行 formula |
| 多步换算 / 逐级放大 | ladder | 一个表格 |
| 首尾相接的恶性 / 良性循环 | cycle | 首尾重复的 flow |
| 方案 / 套餐 / 定价 | price-card（突出档 `.hero`） | 普通卡片 |
| 本页的一句结论 | pill.verdict | 与正文同样式的文字 |
| 引用 | quote | 普通正文 |
| 代码 / 命令 | code | 截图 |
| 产品 / 界面 | image 或 window | 文字描述 |

**数量**：同一页同类部件最多 4 个并排；超过 4 个改用条目族（D）或拆页。

---

## §4 示例（MAY · 参照）

**部件陈列页 `templates/component-showcase.html`** 是本维度的主参照：§2.6 的 38 个部件一页一个，左栏写构成、色调、尺寸、可动部分和类名，右栏是带编排动效的可运行实现。按 **T** 循环切换主题，可以确认部件只依赖 token；按 **O** 打开总览。

找示例的方式：按 §2.6「示例」列的 `cs#N` 打开对应页（URL `component-showcase.html#/N`），在浏览器中看效果，在源码中复制结构。

| 位置 | 能看到的部件 |
|---|---|
| `assets/components.css` | 部件库实现：色调修饰类、`c-*` 部件、`.glow` 修饰 |
| `templates/component-showcase.html` | 全部 38 个部件的参照实现与编排动效 |
| `assets/base.css` | 文字族、`.card` 四种变体、`.pill`、`.divider`、`.counter`、页面 chrome |
| `templates/deck.html` | 封面标题、卡片网格、超大数字、双栏卡片 |
| `templates/single-page/` | 封面组合（cover）、时间点（timeline）、带状态清单（todo-checklist） |

在 deck 中使用部件库：

```html
<link rel="stylesheet" href="../assets/base.css">
<link rel="stylesheet" id="theme-link" href="../assets/themes/ops-cyan.css">
<link rel="stylesheet" href="../assets/components.css">
<link rel="stylesheet" href="../assets/animations/animations.css">
```

---

## §5 自创（author）

谱系里没有、或部件库的实现不合用时，自创部件（优先考虑在部件库实现上加修饰类或改组合，而不是从零写）：

1. **先写构成**：用一句话列出必需与可选部分（例：「formula = 左项 + 运算符 + 右项 + `=` + 结果，结果必须带色调」）。
2. **只用 token**：颜色、圆角、阴影、字体全部是 `var(--token)`；色调按 §2.2 的 `--tone` 模式。
3. **尺寸取档位**：内部文字按 `layouts.md` §2.4。
4. **标出可动部分**：写明哪一部分会做什么动效（例：「结果数值用 counter；左右两项淡入」）。
5. **命名为 `c-<名称>`**，样式写在 deck 的 `<style>` 中。
6. **登记并复用**：写进分镜的「自创记录」；同一 deck 再遇到同类信息，复用同一实现。
7. **质量对齐**：找谱系中最接近的现成部件，边框、圆角、间距、字重向它看齐。

一个合格的自创部件，放到这个 deck 的任何一页都不会显得是「外来的」。
