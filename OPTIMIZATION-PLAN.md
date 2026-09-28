# 从「Deck 素材库」到「文案 → 竖版动态图文」生成器

> 目标：输入一段完整口播文案，产出与参考视频等效的 HTML deck。
> 本文基于 **两个参考视频的实测拆帧** + 对 `d:/projects/knowledge-html-design` 的全量盘点。

---

## 0. 实测视频规格（已拆帧验证，非假设）

| 项 | 视频 A《Token plan 不耐用》 | 视频 B《8 卡 MI355X 多久回本》 |
|---|---|---|
| 分辨率 | **720×1280（9:16 竖版）** | **720×1280（9:16 竖版）** |
| 帧率 / 时长 | 30fps / **96.0s** | 30fps / **113.0s** |
| 音轨 | AAC 44.1k 立体声（全程口播） | 同 |
| 视觉体系 | 近黑底 + **柠檬绿**（lime）霓虹 | 深蓝底 + **青蓝**（cyan）+ 语义红/绿 |
| 页数（实测） | ~24 页 | ~14 页 |

### 实测节奏参数（从 1s 步长密集抽帧反推，视频 A 的 t=14~26s 区间）

```
t14–16  Kimi ¥99 卡片页（卡片 glow 强度逐帧变化 → 呼吸/入场发光）
t17     切页：只有 kicker「每周额度」+ 数字 828万(滚动中) + 环 0%
t18     2,100万(滚完) + 环 60%(生长中)
t19     环 90%(到位) + 下方明细行出现
t20     明细 + 字幕行
t21     切页：近空白，仅 kicker「再看海外这一边」
t22–24  ChatGPT Plus $20 卡片；≈¥143 延后 1s 才出现
t25     切页：0.6亿(滚动中) → 终值 1.5亿
```

| 参数 | 实测值 |
|---|---|
| **页时长** | **3~5s**（远快于常规 deck） |
| **step 间隔** | **≈1s** |
| **counter 滚动时长** | **≈2s**（828万→2,100万；0.6亿→1.5亿） |
| 环形/条形生长 | ≈2s，与 counter **并行** |
| 切页方式 | **不是整页淡入**：kicker 先落位，内容随后分步进入 |

> 这套节奏是本品类的核心识别特征：**每秒一个视觉增量**。现框架完全无法表达。

### 对上一版假设的修正

| 之前假设 | 实测结论 |
|---|---|
| 16:9 横版 | ❌ **9:16 竖版**，画幅结论整体改写（见 §9） |
| 自动推进 | ✅ 确认 |
| 分步出现 | ✅ 确认，且 step ≈1s，比预想快得多 |
| 关键词高亮 | ✅ 确认，主要发生在**底部字幕行**内 |
| 数字滚动 / 条形生长 | ✅ 确认，且是内容主体而非装饰 |
| 常驻字幕 | ✅ 视频 A 全程字幕行 + 固定页脚免责声明 |
| 镜头推拉聚焦 | ❌ **未出现** → 相机层可砍，省一大块工程量 |
| 最终交付 mp4 | ✅ 确认 |

---

## 1. 视觉语法拆解：把视频还原成可复用的设计系统

这是本次拆帧最大的收获——两个视频**主题不同但语法完全一致**，说明存在一套可模板化的语法。

### 1.1 页面骨架（固定三层 chrome）

```
┌─────────────────────────┐
│  kicker（章节标签）      │  ← 主题色 / 小字 / 字间距放大
│                         │     视频A：「WORKLOAD」「ROOT CAUSE」「API PRICE」
│  ███ 内容区 ███          │     视频B：「先说价格 · 美国市场含税落地」
│  （锚定在上 1/3~1/2）    │
│                         │
│         留白             │  ← 竖版必须留：避开平台 UI + 给字幕
│  字幕行（关键词高亮）     │  ← 视频A 全程常驻
│  页脚免责声明            │  ← deck 级固定 slot
└─────────────────────────┘
```

**关键约束：内容上锚定、下半留白。** 现框架 `.slide` 是居中布局，直接套竖版会被平台 UI 压住。

### 1.2 背景底座（现框架完全没有）

- 细网格：`rgba(255,255,255,.03)` 双向线，约 40px 栅距
- **径向光晕**：主题色 8%~12% 的大半径 radial-gradient，**位置随当前焦点内容移动**
- 无实色块背景，全靠光晕做层次

### 1.3 发光体系（glow）——本品类的视觉签名

| 元素 | 实现 |
|---|---|
| 大数字 | `text-shadow: 0 0 24px currentColor/40%` |
| Pill 标签 | `border-radius:999px` + 描边 + `box-shadow` 内外双发光 |
| 卡片 | 圆角 12px + 1px 主题色 30% 描边 + 内发光；**入场时 glow 由强转弱（呼吸）** |
| 章节大字 | 超大字号 + 强光晕（视频A「开源」「硬件」） |
| 结论 pill | 绿色描边 + 发光（视频B「≈ 5 个月回本！」） |

### 1.4 语义配色（不是装饰，是信息编码）

| 语义 | 视频 A | 视频 B |
|---|---|---|
| 主张 / 正面 / 产出 | lime `#a3e635` | cyan `#22d3ee` |
| 结论 / 达成 | lime | emerald `#2ee6a8` |
| 成本 / 负面 / 警示 | red `#ef4444` | rose `#f4566a` |
| 正文 | white / `#e5e7eb` | `#f1f5f9` |
| 次要 / 单位 | `#6b7280` | `#64748b` |

**规则**：同一 deck 内「涨/收入/优势」恒用一色，「成本/劣势/风险」恒用另一色，跨页不变。

### 1.5 实测出现的版式清单（现框架缺失情况）

| 实测版式 | 出处 | 现框架 |
|---|---|---|
| 大数字 + 单位 + counter 滚动 | A「1.5亿」「2,100万」 | ⚠️ 有 `stat-highlight`，但不可分步/不可 seek |
| 环形进度 + 中心百分比 | A「90% 缓存读取」 | ❌ 无 |
| 倍数对比横条（1× vs 7×） | A「能干多少活」 | ❌ 无 |
| 定价卡片（产品 + 价格 + 规格） | A Kimi/ChatGPT 卡 | ❌ 无 |
| 纵向 VS 对比（竖版适配） | A、B | ⚠️ 有 `comparison`，仅横向 |
| 参数价目表 + 倍数标注行 | A「API PRICE」、B「GLM 公开价目」 | ⚠️ 有 `table`，无分步/无语义色 |
| **逐级推演测算链** | B「每秒¥0.19 ↓ 一小时¥671 ↓ 一天¥16,100 ↓ 一月¥48万」 | ❌ 无（**本品类杀手版式**） |
| **公式分解 + 溯源脚注** | B「2,626 ÷ 5% × 95% ≈ 4.99万」 | ❌ 无 |
| 公式行（带语义色） | B「16,100 − 146 = 净 ≈ 16,000」 | ❌ 无 |
| 回本进度条 + 天数 counter | B「148天 / ≈5个月回本」 | ❌ 无 |
| 功耗横条组（依次生长） | B「11.2 / 14.0 / 16.0 kW」 | ❌ 无 |
| 加总卡片堆叠（卡 + `+` + 卡 + `↓` + 结论） | B「八卡 + GLM-5.3 → 流畅运行 ✓」 | ❌ 无 |
| 环形因果闭环（节点沿圆弧依次点亮→整圈转红「死循环」） | A | ❌ 无 |
| 天平 / 杠杆倾斜 | A「模型能力 vs 定价权」 | ❌ 无 |
| 上下挤压（成本↑ 市场价↓ 利润≈0） | A | ❌ 无 |
| 逐项划掉（数据× 算力× 电费×） | A「¥0」 | ❌ 无 |
| 删除线转折（理想~~靠模型赚钱~~ → 现实：先活下来） | A | ❌ 无 |
| 横向流程箭头（下载权重→插显卡→自己开卖） | A | ⚠️ 有 `flow-diagram`，无分步 |
| 带 badge 的清单（模型名 + 「免费」绿标） | A | ⚠️ 有 `bullets`，无 badge |
| 编号选项（① 开源 / ② 硬件 🔒下集） | A | ❌ 无 |
| 模拟 UI 窗口（usage 面板 + 红黄绿点 + 100% 条） | A | ❌ 无 |
| 告警框（⚠ 用量已达上限 + 倒计时） | A | ❌ 无 |
| 假设声明框（⚠ 以下为理论假设 + 编号前提） | B | ❌ 无 |
| 章节大字过场（超大字 + glow + kicker） | A「开源」「硬件」、B「Part 2」 | ⚠️ 有 `section-break`，无 glow |
| 产品实拍图 + 悬浮数据卡 | B 开场 AMD 机箱图 | ❌ 无图文混排版式 |
| 结尾 CTA（下期预告 + 关注引导） | A「内容制作中」 | ❌ 无 |

> **26 个实测版式中，16 个完全缺失、7 个需要改造、仅 3 个可直接用。**
> 但注意：缺的不是"画不出来"，而是缺**版式 + 分步动效 + 语义色**三者绑定的成品块。

---

## 2. 根本落差：产物定位错位

现框架产物 = **「人按空格翻页的横版静态 deck」**：

```
assets/runtime.js:934-949   keydown 是唯一推进源
assets/runtime.js:243-248   仅在"进入 slide"时整页重放入场动画
```

目标产物 = **「9:16 竖版、每秒一个视觉增量、跟口播时间轴自演的动态图文」**。

差的不是素材（10 theme / 31 版式 / 27 动画 / 20 FX / 15 套 full-deck 已足够厚），
而是六个缺失系统：**竖版画幅、分步、时间轴、字幕、glow 底座、录制**。

---

## 3. 输入层：Script IR（脚本中间表示）

现状 `SKILL.md:40` 全流程只有「复制版式块、把内容填进去」一句，无输入契约、无切页规则。

### 新增 `references/script-ir.md` + `templates/script.example.md`

按实测节奏，切分单位必须细到 **beat ≈ 1s**：

```yaml
---
title: 8 卡 MI355X 跑 GLM-5.3 多久回本
theme: ops-cyan
aspect: "9:16"            # 竖版优先
speech_rate: 4.6          # 中文口播 字/秒
page_target: 4            # 目标页时长(s)，实测 3~5
semantic_colors:
  positive: revenue       # 青 = 收入/产出
  negative: cost          # 红 = 成本/风险
---

## page: 电费账单
kicker: 电费 · 必须液冷
layout: power-bars
beats:
  - text: 八卡满载 11.2 千瓦。
    intent: evidence
    data: { label: 八卡满载, value: 11.2, unit: kW, tone: negative }
    grow: 2.0             # 条形生长时长
  - text: 整机含损耗 14 千瓦。
    data: { label: 整机(含损耗), value: 14.0, unit: kW, tone: negative }
  - text: 算上液冷，电网取电 16 千瓦。
    data: { label: 电网取电(含液冷), value: 16.0, unit: kW, tone: negative }
  - text: 一天电费 146 块，一年五万，小头。
    intent: recap
    formula: "16kW × 24h × ¥0.38 = ¥146/天"
    emphasis: [小头]
```

### 意图标签体系（映射枢纽）

`hook` 抛问 / `definition` 下定义 / `claim` 结论 / `evidence` 数据 / `contrast` 对比 /
`enumerate` 列举 / `causal` 因果 / `process` 步骤 / `derive` **逐级推演** / `formula` **公式** /
`assumption` **前提声明** / `analogy` 类比 / `caveat` 转折 / `recap` 小结 / `cta` 收尾

> `derive` / `formula` / `assumption` 三个是拆帧后新增的——它们撑起了视频 B 的整个后半段，
> 也是"测算类"科普内容的骨架。

### 切页规则（硬约束，可被 §10 校验）

- 一页 = 一个 claim，含 **3~5 个 beat，总时长 3~5s**
- 竖版单页文字总量 ≤ 约 60 字（含字幕）；超出即切页
- 连续同 intent 超过 4 个 beat 强制切页
- 每页必须有 kicker；kicker 变化即换章

---

## 4. 映射层：intent → 版式 → 动效 决策表

现有最接近的两处都只到"场景级"：`SKILL.md:20-29`（受众→theme）、`references/layouts.md:78-89`（内容类型→版式）。
缺 **句式/语义级** 可查表。新增 `references/mapping.md`：

| intent | 数据形态 | 版式 | 动效 | step |
|---|---|---|---|---|
| hook | 纯文字 | `hook-question` | 大字 glow 渐显 + 字幕高亮 | 1 |
| evidence | 单一数值 | `stat-glow` | counter 2s + 单位延后 0.3s 淡入 | 1 |
| evidence | 数值+占比 | `stat-ring` | counter 与环形生长**并行** 2s | 1 |
| evidence | 多条量值 | `power-bars` | 横条依次生长，数值同步滚动 | 每条 1 |
| evidence | 倍数对比 | `ratio-bars` | 基准条先出，对比条后生长 | 2 |
| contrast | 二元 | `vs-stack`（竖版上下） | 上卡推入 → VS 落位 → 下卡推入 | 3 |
| contrast | 多维参数 | `spec-table` | 逐行点亮 + 倍数行最后红字弹出 | 每行 1 |
| **derive** | 单位阶梯 | `derive-ladder` | 每级 ↓ 画出 + 数值 counter | 每级 1 |
| **formula** | 等式 | `formula-row` | 左式淡入 → `=` → 结果 counter + 语义色 | 3 |
| **formula** | 分解求和 | `sum-stack` | 各项依次 + `+` 号 → 合计大字 | 每项 1 |
| **assumption** | 前提列表 | `assumption-box` | 红框 wipe 展开 + 编号项依次 | 每项 1 |
| enumerate | 带 badge 清单 | `badge-list` | 逐条 slide-in + badge 延后弹出 | 每条 1 |
| causal | 线性链 | `flow-arrows` | 节点亮 → 箭头画线 → 下一节点 | 每环 1 |
| causal | **闭环** | `causal-loop` | 节点沿圆弧依次画出 → 合环 → 整圈转红 | 每节点 1 |
| process | 步骤 | `process-steps` | 进度沿路径推进 | 每步 1 |
| caveat | 否定前项 | `strike-pivot` | 前项删除线划过 → 新项绿框推入 | 2 |
| caveat | 归零 | `zero-out` | 逐项 `×` 划掉 → 结果 ¥0 | 每项 1 |
| contrast | 失衡 | `seesaw` | 天平倾斜（ease-in-out） | 1 |
| contrast | 挤压 | `squeeze` | 上下框相向逼近 → 中间值趋 0 | 2 |
| recap | 收束 | `verdict-pill` | 结论 pill 描边画完 + glow 脉冲 | 1 |
| cta | 收尾 | `next-episode` | 大字 glow + 下期标题 + 关注引导 | 3 |

### 反例条款（现在完全没有）

- 20 种 canvas FX 只允许用于**封面 / 章节过场 / 结尾**，正文页禁用；单 deck ≤ 2 次
- 一页内动效类型 ≤ 2 种
- 语义色一经设定，全 deck 不得改用途

---

## 5. 运行时层：从「翻页器」到「播放器」

建议拆分现有 960 行单文件（其中 `runtime.js:347-871` 约 520 行是演讲者弹窗 HTML 字符串，占 54%）：

```
assets/runtime.core.js       导航 / 主题 / 概览
assets/runtime.presenter.js  演讲者弹窗（从 runtime.js:347-871 搬出）
assets/runtime.steps.js      新增：分步状态机
assets/runtime.timeline.js   新增：确定性时钟 + 自动推进 + seek
assets/runtime.captions.js   新增：字幕轨
```

### 5.1 分步机制 `data-step`（P0）

现在唯一的"逐条"是纯 CSS：

```
assets/animations/animations.css:57-66   nth-child(1..8) 硬编码 delay
```

问题：一次性自动播完、不受控、**第 9 项起全部同时出现**。对不上 1s 的 step 节奏。

需要：`→` 先推进本页 step、走完才翻页；`←` 回退。DOM 约定：

```html
<section class="slide" data-kicker="电费 · 必须液冷">
  <div class="bar" data-step="1" data-grow="2.0" data-value="11.2" data-tone="negative">…</div>
  <div class="bar" data-step="2" data-grow="2.0" data-value="14.0" data-tone="negative">…</div>
  <p class="formula" data-step="4" data-step-anim="wipe-right">…</p>
</section>
```

### 5.2 时间轴与自动播放（P0）

- `data-dur` 逐级聚合：beat → step → slide → deck
- API：`play() / pause() / seek(t) / totalDuration()`
- URL：`?autoplay=1&t=12.4`，与现有 `#/N`、`?preview=N`（`runtime.js:35-38`）并存
- **切页语义**：kicker 先落位（约 0.3s），内容 step 随后——这是实测的过渡方式，需内建

### 5.3 确定性时钟（P0，录制前提）

不用 wall clock。抽出可注入 `Clock`，`seek(t)` 后**一次性把所有动画推到该时刻**。
核心动效（counter / 条形生长 / 环形 / 画线）改用 **Web Animations API**
（`Animation.currentTime` 可直接赋值），CSS keyframes 保留作无脚本降级。

> 这决定「PNG 序列 → mp4」能否帧对齐。现在 `render.sh:59` 用固定
> `--virtual-time-budget=4000` 撞运气，canvas FX 与 Chart.js 取帧时机不可控。

### 5.4 字幕轨

从 `beat.text` 生成常驻字幕行，按 `emphasis` 字段自动套语义色高亮；导出 `.srt` / `.ass`。
另加 deck 级固定页脚 slot（实测两视频都有免责声明常驻）。

### 5.5 顺带修掉的缺陷

| 位置 | 问题 |
|---|---|
| `assets/runtime.js:229` | `querySelector('.slide-number')` 只更新首个页码，第 2 页起永远是硬编码值 |
| `templates/deck.html:11` | `data-themes` 只列 9 个，缺 `japanese-minimal` |
| `templates/deck.html` | 未引 `fx-runtime.js`；该文件全库仅被 `animation-showcase.html` 引用 |
| `assets/animations/fx-runtime.js:10-16` | `FX_LIST` 硬编码数组，新增特效须手改 |
| 4 个 chart 版式 | Chart.js 动画只在 init 播一次，切回不重播，不受 `go()` 管辖 |

---

## 6. 动效层：补「讲解型动效」

现有 27 个 CSS 动画**全是"元素怎么进来"**。实测视频里真正承载信息的是"内容怎么被算出来"。
新增 `assets/animations/explain.css` + `explain.js`，**全部可 seek**：

| 类别 | 实测效果 |
|---|---|
| 量值生长 | 横条/环形/进度条生长（2s，ease-out），数值 counter 同步 |
| 数值 | counter 2s；单位延后淡入；千分位/中文量词（万/亿）格式化 |
| 强调 | 字幕关键词语义色高亮、结论 pill 描边画完、glow 脉冲 |
| 否定 | 删除线划过、逐项 `×` 划掉、降饱和后置 |
| 关系 | 箭头画线、节点依次点亮、**沿圆弧合环** |
| 结构 | 卡片 wipe 展开、`+`/`↓` 连接符延后出现、表格逐行点亮 |
| 物理 | 天平倾斜、上下挤压 |

约束沿用 `SKILL.md:67-73` 动效纪律，但**位移量基准需从 1448 改为竖版 720/1080 画布**（见 §9）。

---

## 7. 版式层：按 §1.5 清单补齐

优先级按实测出现频次与不可替代性：

**第一批（撑起测算类内容）**：`derive-ladder`、`formula-row`、`sum-stack`、`power-bars`、
`ratio-bars`、`stat-ring`、`spec-table`、`assumption-box`、`verdict-pill`

**第二批（撑起观点类内容）**：`causal-loop`、`strike-pivot`、`zero-out`、`seesaw`、`squeeze`、
`badge-list`、`numbered-options`、`hook-question`、`next-episode`

**第三批（氛围与可信度）**：`stat-glow`（改造）、`vs-stack`、`price-card`、`mock-ui-window`、
`alert-box`、`photo-overlay`（实拍图 + 悬浮数据卡）

每个版式必须**三件套齐全**：HTML 块 + 分步标注（`data-step`/`data-grow`）+ 语义色约定。

---

## 8. 主题层：补两套 + 抽出 glow/grid 底座

- 视频 A 风格 ≈ 现有 `terminal-green`，但**缺 glow 与网格底座** → 需升级
- 视频 B 风格（深蓝 + 青 + 语义红绿）**项目里完全没有** → 新增 `ops-cyan`
- 抽出公共底座 `assets/glow.css`：网格背景、径向光晕（位置可由 `--glow-x/--glow-y` 驱动，
  跟随焦点移动）、发光令牌（`--glow-sm/md/lg`）、语义色令牌（`--tone-positive/--tone-negative`）

这样任意主题都能获得本品类的视觉签名，而不是只改配色。

---

## 9. 画幅与中文排版：竖版优先

### 9.1 画幅口径现在有三套，必须统一

| 来源 | 画幅 |
|---|---|
| `SKILL.md:70` 动效纪律 | 1448 宽 |
| `assets/base.css` | `100vw/100vh` 自适应 + **固定 px 字号**（h1=72px @ `:66`，padding 72/96px @ `:50`） |
| `scripts/render.sh:58` | 1920×1080 |
| **实测目标** | **1080×1920（9:16）**，输出 720×1280 |

**建议**：设计画布双档 `1920×1080` / `1080×1920`，内容层用
`transform: scale(min(vw/W, vh/H))` 整体缩放。好处：字号留白比例恒定、录制所见即所得、
横竖切换只换画布常量。

现状风险：固定 px 字号 + `100vw/100vh` 容器，非 1080p 视口下比例失控；
全库无 `clamp()`、无设计画布 scale。竖版支持目前仅 `templates/full-decks/xhs-post/style.css:14-16`
一处硬覆盖成 810×1080。

### 9.2 竖版安全区（实测强约束）

- 内容锚定上 1/3~1/2，**下 30% 留白**（避开平台 UI）
- 字幕行固定在下 20%~25% 位置
- 页脚免责声明贴底
- 现框架 `.slide` 是居中布局 → 直接套竖版必被遮挡，需新增 `.slide--vertical` 布局模式

### 9.3 中文排版

| 问题 | 位置 | 修法 |
|---|---|---|
| 全局负字距套在汉字上 | `base.css:30-31`（`-.01em`）、`:66-67`（标题 `-.03em`） | 负字距只对拉丁生效，中文归零 |
| 无标点挤压 / 中英混排间距 | 全库 0 命中 | `text-spacing-trim`、`text-autospace` |
| 无断行控制 | 全库 0 命中 | `line-break: strict`；标题 `text-wrap: balance` |
| 字体 100% 远程 webfont | `assets/fonts.css` 全 12 条 `@import` Google Fonts | **自托管 + 按 deck 用字子集化** |
| 缺中文量词排版 | — | 实测「1.5**亿**」「2,100**万**」「148**天**」量词小一号跟随，需组件化 |

> 字体不自托管 → 录制时首帧掉字 / 合成粗体，竖版大字尤其明显。

---

## 10. 校验层：自动生成能否可信的闭环（P0）

现状：**零校验**。无 lint、无 `package.json`、无 CI、无溢出检测；
唯一"自检"是 `scripts/verify-output/` 下 56 张人工截图。

而 `.slide` 是 `overflow: hidden`（`base.css:55`）+ 固定 px 字号
→ **文案一长就静默裁切，不报错、看不见**。竖版宽度只有 720，风险比横版更高。

### 新增 `scripts/check.mjs`（Node + Puppeteer/CDP）

| 检查项 | 判据 |
|---|---|
| 溢出 | 每页 `scrollHeight > clientHeight`；元素 bbox 越出画布 |
| **竖版安全区** | 内容是否侵入下 30% 留白 / 是否压到字幕行 |
| 文本裁切 | 逐元素 `scrollWidth/Height` + range 测量 |
| 密度超限 | 单页 ≤ 60 字；行宽 / 行数上限 |
| 对比度 | 文字 vs 实际背景（含光晕）WCAG AA |
| **节奏** | 页时长 3~5s；step 间隔 0.6~1.5s；`Σ step.dur` vs 口播稿估时偏差 ≤15% |
| 语义色一致性 | 同一 tone 跨页是否换色 |
| 结构 | step 序号连续、`data-fx` 名在注册表内、页码 total 正确 |
| 资源 | 字体 / CDN / 图片 404 |

输出 `report.json` + 标注问题位置的截图。**这步做完，"文案自动出 deck" 才从碰运气变成可交付。**

---

## 11. 导出层：跨平台 + 竖版视频

`scripts/render.sh` 三个硬伤：

1. **macOS 硬编码** `render.sh:14-18` 直接 `exit 1` → 当前 win32 环境完全不可用，无 fallback
2. **`all` 计数 bug** `render.sh:37` 的 `grep -c 'class="slide"'` 要求 `slide` 后紧跟引号，
   而 `examples/demo-deck/index.html` 有 4 页写成 `class="slide center tc"` → 8 页只数到 4
3. 固定 `--virtual-time-budget=4000`，动画取帧时机不可控；**无视频导出**

### 重写为 `scripts/render.mjs`（Puppeteer）

- 自动探测 Chrome：`PUPPETEER_EXECUTABLE_PATH` → win/mac/linux 常见路径 → chromium
- 页数用 DOM 查询，不用 grep
- 画幅参数化：`--aspect 9:16`，视口 1080×1920
- **视频链路**：`seek(t)` → 截图 → PNG 序列 **30fps** → ffmpeg 合成
  `-c:v libx264 -pix_fmt yuv420p -r 30 -s 720x1280`，可混入 TTS 音轨 + §5.4 导出字幕
- 交付：mp4 / PNG 序列 / PDF / 单文件 HTML（inline 字体+CSS+JS）

> ffmpeg 已在本机：`C:\Users\Administrator\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin`
> （当前未进 PATH，脚本里建议做路径探测 + `FFMPEG_PATH` 环境变量覆盖）

---

## 12. 工程化与 few-shot

### 12.1 先修掉的不一致

| 问题 | 证据 |
|---|---|
| 新建 deck 输出目录三处不一致 | `new-deck.sh:18` → `examples/`；`SKILL.md:36` → `output/`；`.gitignore:4` 忽略 `output/` |
| 15 套 full-deck 对 Agent 不可见 | `SKILL.md:76-81` 资源库清单**完全没提** `templates/full-decks/` 与 `references/full-decks.md` |
| 死链 | `references/full-decks.md:89` 指向不存在的 `references/presenter-mode.md` |
| 空壳冒充范例 | `examples/ai-empowerment/index.html` 与 `templates/deck.html` 逐字相同 |

### 12.2 补「原始稿 → 成品」配对样本（P0，对 Agent 提升最大）

现状 `examples/` 实际只有 1 个 8 页横版 demo，`<div class="notes">` 只有 1~2 句提示，
**全库无任何「完整口播稿 → 成品 deck」配对样本** → Agent 学不到切页与选型理由。

建议直接复刻这两个参考视频作为标杆样本：

```
examples/token-plan-vertical/      （视频A 复刻：观点类，lime-noir，24 页）
examples/mi355x-payback/           （视频B 复刻：测算类，ops-cyan，14 页）
  script.md      完整口播稿 + IR 标注（intent / emphasis / data / dur）
  index.html     成品 deck（9:16，带 data-step / data-grow / data-dur）
  DECISIONS.md   逐页说明"为什么这样切页、选版式、配动效"  ← 最有价值
  report.json    check.mjs 通过报告
```

这两个样本恰好覆盖本品类两大子类型：**观点论证型**（A）与 **数据测算型**（B）。

### 12.3 加 `package.json`

```
npm run new      脚手架（统一输出 output/，支持 --aspect 9:16）
npm run serve    本地预览
npm run check    §10 校验
npm run render   PNG / PDF / 单文件
npm run video    mp4 导出（竖版 720×1280 @30fps）
```

### 12.4 重写 SKILL.md 流程

从现在 4 步（理解 → 选 theme → 建空 deck → 逐页填）改为 8 步闭环：

```
读稿 → 切 beat 打 intent → 产出 script.md(IR) → 选 theme / 画幅 / 语义色
     → 按映射表逐页选版式+动效 → 填充并标 data-step/data-grow/data-dur
     → npm run check 修问题 → 导出（HTML / PNG / mp4）
```

---

## 13. 优先级与落地顺序

### P0 — 不做则目标无法成立

1. **竖版画幅体系**：设计画布 `1080×1920` + `transform: scale()` + 竖版安全区布局（§9.1/9.2）
2. **`data-step` 分步状态机**（§5.1）
3. **Script IR** 定义（§3）+ **intent→版式→动效映射表**（§4）
4. **glow/grid 底座** `assets/glow.css` + 语义色令牌（§8）
5. **第一批 9 个测算类版式**（§7 第一批）
6. **`check.mjs`** 溢出 / 安全区 / 密度 / 节奏校验（§10）
7. **`render.mjs`** 跨平台 + 修页数 bug + 竖版视口（§11）
8. **2 个标杆配对样本**（§12.2）
9. SKILL.md 流程重写 + 暴露 full-decks（§12.4 / §12.1）

### P1 — 决定成品像不像参考视频

10. 时间轴 / autoplay / 确定性时钟（§5.2/5.3）
11. `explain.css/js` 讲解型动效，全部可 seek（§6）
12. 字幕轨 + 关键词语义高亮 + srt 导出（§5.4）
13. 新增 `ops-cyan` 主题 + 升级 `terminal-green`（§8）
14. **第二批 9 个观点类版式**（§7）
15. 中文排版修正 + 字体自托管子集化（§9.3）
16. mp4 竖版导出链路（§11）

### P2 — 工程健康度

17. 第三批版式（§7）
18. runtime.js 拆分 + 修 §5.5 各缺陷
19. 图表数据驱动插槽（`data-values`）+ 进入页重播
20. 单文件 HTML 打包
21. `package.json` / CI / lint（§12.3）

---

## 一句话结论

**素材层够用，不要再加 theme 和动画。** 拆帧证实真正的瓶颈是：
① **画幅错了**（横版 → 必须竖版 9:16 + 安全区）；
② **节奏表达不了**（实测每秒一个视觉增量，现框架只有整页重放）；
③ **版式缺 16 个**（尤其 `derive-ladder`/`formula-row`/`sum-stack` 这套测算链，是本品类骨架）；
④ **没有 glow/grid 视觉底座**（这是该品类的视觉签名，不是配色问题）；
⑤ **没有校验**（竖版 720 宽 + `overflow:hidden`，自动填文必然静默裁切）。

投入产出比最高的四件：**竖版画布 + `data-step` + 测算类版式第一批 + 两个标杆配对样本**。
这四件做完，Agent 拿一段文案就能产出结构与节奏正确的竖版 deck；
时间轴与 mp4 导出是把 deck 变成视频的最后一段路。
