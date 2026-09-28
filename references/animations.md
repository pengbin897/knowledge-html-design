# Animation · 动效

> 回答：**元素何时出现、以何种方式出现、出现后是否变化。** 作用于时间轴，在 S3 分镜时逐页编排。

---

## §1 定义

Animation = 页面的**时间维度**。一页的动效不是若干孤立效果，而是一段**编排**：谁先出现、谁后出现、谁在变化。

按叙事功能，动效分为 5 种角色：

| 角色 | 作用 | 典型 | 何时用 |
|---|---|---|---|
| **enter 入场** | 让元素出现 | 淡入、上浮、缩放弹出、错峰列表 | 几乎每页 |
| **emphasize 强调** | 让已出现的元素被注意 | 发光脉冲、光泽扫过 | 结论、关键词，少用 |
| **change 变化** | 表达数值或形状的变化 | 数字滚动、画线、条形生长 | 数据页、流程页 |
| **transition 转场** | 页与页之间的衔接 | 翻页、章节揭晓 | 章节切换 |
| **ambient 氛围** | 持续运行的背景 | canvas 特效、缓慢缩放 | 封面、章节、结尾 |

动效服务于理解：**它回答「先看什么、再看什么」**，而不是为了热闹。

---

## §2 规范（MUST）

### 2.1 动效纪律

1. **顺序**：发生顺序 = 阅读顺序 = 因果顺序。先因后果，先定义后引用。
2. **单主线**：同一时刻，主线上只有一个元素在运动（氛围层除外）。
3. **方向即语义**：上涨向上、推进向右、汇聚向内、扩张向外；否定用淡出或划掉。
4. **属性恒定**：动效只改变位置、尺寸、透明度、描边进度、数值。颜色、线宽、圆角、底色在整段动效中不变。
5. **用 `data-anim` 触发**：写 `data-anim="fade-up"`，不要直接写 `class="anim-fade-up"`。前者每次翻到该页都会重播；后者只在页面加载时播放一次，翻到时早已结束。
6. **尊重减少动效偏好**：`prefers-reduced-motion` 时所有 `anim-*` 自动关闭，不要覆盖。

以下为默认值（SHOULD），有理由可偏离：

7. **幅度**：讲解型位移（指示、推进、微移）≤ 画布宽的 0.8%（1920 宽约 15px）。入场位移沿用库中预设：`fade-*`（32~40px）用于卡片级元素；`rise-in` / `drop-in`（60px）只用于标题级元素。
8. **缓动**：画线与量值生长用 ease-out（快起慢收）；位移用 ease-in-out；匀速循环用 linear。
9. **错峰**：相邻元素的间隔 = 前一个元素时长的 40%~60%。

### 2.2 时长档位

只用下列 5 档：

| 档位 | 时长 | 用于 |
|---|---|---|
| micro | 0.2 s | 胶囊、标签的闪现 |
| quick | 0.4 s | 眉题、小元素入场，强调 |
| base | 0.7 s | 默认入场（= `--anim-dur`） |
| slow | 1.2 s | 数字滚动（counter 默认值）、大标题 |
| grow | 2.0 s | 画线（`path-draw`）、量值生长 |

### 2.3 编排写法

页面切换本身有 0.5 s 的淡入（`.slide` 的 transition），所以**第一个元素延迟 0.1~0.3 s** 再开始。后续元素用 `animation-delay` 串起来：

```html
<section class="slide" data-layout="grid">
  <p  class="kicker" data-anim="fade-down" style="animation-delay:.1s">本周指标</p>
  <h2 class="h2"     data-anim="rise-in"   style="animation-delay:.3s">转化率连续 8 周上涨</h2>
  <div class="grid g4">
    <div class="card" data-anim="fade-up" style="animation-delay:.9s">…</div>
    <div class="card" data-anim="fade-up" style="animation-delay:1.2s">…</div>
    <div class="card" data-anim="fade-up" style="animation-delay:1.5s">…</div>
    <div class="card" data-anim="fade-up" style="animation-delay:1.8s">…</div>
  </div>
</section>
```

列表要紧跟页面立即出现时，可以用简写 `data-anim="stagger-list"`（加在父元素上，子元素自动错峰 0.1 s）。需要列表**等标题出现后**再开始，就用上面逐项写延迟的方式。

分镜表中的编排记法：

```
kicker fade-down(.1s) → h2 rise-in(.3s) → card×4 fade-up(.9s 起, 间隔 .3s)
```

### 2.4 预算

| 项 | 上限 |
|---|---|
| 单页入场动效的种类 | 2 种 |
| 单页持续循环的动效（`neon-glow`、`shimmer-sweep`、`gradient-flow`、`marquee-scroll`、`kenburns`） | 1 个，且不用于正文 |
| canvas FX | 每页 1 个；全 deck 2 个；只放在封面、章节页、结尾 |
| 页内编排总时长 | `talk`：3 s 内全部到位；`video`：跟随口播，每个 beat 一次增量 |

### 2.5 运行时能力边界

写 HTML 前必须知道当前 `assets/runtime.js` 能做什么、不能做什么：

| 能力 | 现状 |
|---|---|
| 进入页面时自动播放 | ✅ `[data-anim]` 每次进入该页都重播 |
| 延迟编排 | ✅ 用 `style="animation-delay:…"` |
| 列表错峰 | ✅ `data-anim="stagger-list"`，最多 8 级，第 9 项起同时出现 |
| 数字滚动 | ✅ `<span class="counter" data-to="2100" data-dur="1200">0</span>`；**进入页面立即开始，不支持延迟；不带千分位；小数只保留 1 位** |
| canvas FX | ✅ 需在页面引入 `assets/animations/fx-runtime.js`；进入页启动，离开页停止 |
| 按键分步（每按一次出现一条） | ❌ 不支持。需要逐条出现时，用延迟编排 |
| 自动翻页 | ❌ 不支持 |
| 悬停动效（`parallax-tilt`） | ⚠️ 只在鼠标交互时有效；录屏与导出图片中不可见 |

---

## §3 决策（SHOULD）

### 3.1 叙事时刻 → 动效

| 时刻 | 角色 | 首选 | 备选 |
|---|---|---|---|
| 封面揭晓 | enter | `blur-in` / `perspective-zoom` | `rise-in`；FX `galaxy-swirl` / `starfield` |
| 眉题 | enter | `fade-down`（quick） | — |
| 页标题 | enter | `rise-in` | `fade-up` |
| 卡片、段落 | enter | `fade-up` | `zoom-pop`（小卡片） |
| 并列列表 | enter | `stagger-list` | 逐项 `fade-up` + 延迟 |
| 左右对比 | enter | 左 `fade-left` → 右 `fade-right` | `card-flip-3d`（揭晓式对比） |
| 关键数字 | change | `counter` + 容器 `zoom-pop` | FX `counter-explosion`（仅封面 / 结尾） |
| 线条、流程、箭头 | change | `path-draw` | — |
| 条形、环形生长 | change | 自创 `grow-x` / `ring`（见 §5） | — |
| 警示、转折 | enter | `drop-in` | `glitch-in`（技术 / 故障语境） |
| 结论揭晓 | emphasize | `zoom-pop` / `spotlight` | `neon-glow`（深色主题） |
| 章节过渡 | transition | `ripple-reveal` / `cube-rotate-3d` | `page-turn-3d`（叙事 / 杂志风） |
| 命令、代码 | enter | `typewriter` | FX `typewriter-multi` |
| 庆祝、致谢 | ambient | `confetti-burst` | FX `confetti-cannon` / `firework` |
| 氛围背景 | ambient | `kenburns`（图片） | FX `constellation` / `gradient-blob` |
| 品牌字标 | emphasize | `gradient-flow` / `shimmer-sweep` | — |

### 3.2 与主题的气质匹配

| 主题 | 倾向 | 避免 |
|---|---|---|
| `terminal-green` | `typewriter`、`glitch-in`、`neon-glow` | 柔和慢速的 `blur-in` |
| `editorial-serif` / `japanese-minimal` | `blur-in`、`fade-up`，偏慢 | `zoom-pop`、`glitch-in` |
| `neo-brutalism` / `pixel` | `zoom-pop`、`drop-in`，干脆 | 慢速淡入 |
| `hand-drawn` | `path-draw`、`fade-up` | 3D 类 |
| `aurora` | `blur-in`、`gradient-flow` | `glitch-in` |
| `swiss-grid` | `fade-left/right`、`stagger-list`，克制 | 氛围类、3D 类 |

### 3.3 与交付形态匹配

| 形态 | 原则 |
|---|---|
| `talk` | 少而准。页内 3 s 内全部到位，之后画面静止，让观众听讲 |
| `video` | 每个 beat 对应一次视觉增量，延迟对齐口播节奏；多用 change 类 |
| `post` | 导出为静态图，动效不可见；只需保证所有元素**最终状态**正确 |

---

## §4 示例（MAY · 参照）

实现都在 `assets/animations/animations.css`。浏览全部：`templates/animation-showcase.html`（每种一页，进入即播放）；任意 deck 中按 **A** 在当前页试播随机动效。

### 4.1 CSS 动效（27 种，按角色）

| 角色 | 名称 | 效果 |
|---|---|---|
| enter · 方向 | `fade-up` `fade-down` `fade-left` `fade-right` | 32~40px 位移 + 淡入 |
| enter · 戏剧 | `rise-in` | 上移 60px + 模糊消散 |
| | `drop-in` | 下落 60px + 轻微缩放 |
| | `zoom-pop` | 0.6 → 1.04 → 1 弹出 |
| | `blur-in` | 18px 模糊渐清晰 |
| | `glitch-in` | 裁剪分步 + 抖动 |
| enter · 揭晓 | `spotlight` | 圆形从中心展开 |
| | `ripple-reveal` | 从左下角涟漪展开 |
| enter · 3D | `card-flip-3d` `cube-rotate-3d` `page-turn-3d` `perspective-zoom` | 翻转 / 立方体 / 翻页 / Z 轴拉近 |
| enter · 文字 | `typewriter` | 逐字打出 + 光标 |
| enter · 列表 | `stagger-list` | 子元素逐个上浮 |
| emphasize | `neon-glow` | 文字发光脉冲（循环） |
| | `shimmer-sweep` | 光泽扫过（循环） |
| | `gradient-flow` | 渐变文字流动（循环） |
| | `confetti-burst` | 伪元素闪光爆发 |
| change | `counter-up` | 数字滚动（`.counter`，由 runtime 驱动） |
| | `path-draw` | SVG 描边画出（加在 `<svg>` 上） |
| | `morph-shape` | SVG 路径变形（循环） |
| ambient | `marquee-scroll` | 水平无限滚动 |
| | `kenburns` | 图片 14 s 缓慢推拉 |
| | `parallax-tilt` | 悬停 3D 倾斜（仅交互） |

### 4.2 canvas FX（20 种）

在页面中引入 `<script src="…/assets/animations/fx-runtime.js"></script>`，再放一个有明确高度的容器 `<div data-fx="<名称>" style="height:360px"></div>`。颜色自动读取当前主题的 `--accent` 等 token。

| 类别 | 名称 |
|---|---|
| 庆祝 / 冲击 | `particle-burst` `confetti-cannon` `firework` `shockwave` `counter-explosion`（`data-fx-to="2400"`） |
| 科技氛围 | `starfield` `matrix-rain` `data-stream` `galaxy-swirl` `constellation` `gradient-blob` `magnetic-field` `orbit-ring` |
| 概念图示 | `knowledge-graph` `neural-net` `chain-react` |
| 文字 | `word-cascade` `letter-explode`（`data-fx-text-value="…"`） `typewriter-multi`（`data-fx-line1="…"`） |
| 交互 | `sparkle-trail` |

---

## §5 自创（author）

库里没有合适的动效时（最常见的是条形生长、环形生长），自创：

1. **命名**：关键帧 `kf-<名称>`，类 `.anim-<名称>`。这样 `data-anim="<名称>"` 能直接触发，减少动效偏好也会自动生效。
2. **只动允许的属性**：`transform`、`opacity`、`stroke-dashoffset`、数值（见 2.1 第 4 条）。
3. **时长取档位**，缓动按 2.1 第 8 条。
4. **写在 deck 的 `<style>` 中**，登记到分镜的「自创记录」，全 deck 复用。

示例一 · 条形从左向右生长：

```css
@keyframes kf-grow-x { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.anim-grow-x { transform-origin: left center; animation: kf-grow-x 1.2s cubic-bezier(.2,.8,.2,1) both; }
```

```html
<div class="bar-track"><div class="bar-fill" data-anim="grow-x" style="width:72%;animation-delay:.6s"></div></div>
```

示例二 · 环形弧线生长（周长 C = 2πr，占比 p）：

```css
@keyframes kf-ring { from { stroke-dashoffset: var(--c); } }
.anim-ring { animation: kf-ring 1.2s cubic-bezier(.2,.8,.2,1) both; }
```

```html
<!-- r=100 → C≈628；p=90% → offset = 628 × (1 − 0.9) ≈ 63 -->
<circle r="100" cx="130" cy="130" fill="none" stroke="var(--accent)" stroke-width="24"
        stroke-dasharray="628" stroke-dashoffset="63" style="--c:628"
        transform="rotate(-90 130 130)" data-anim="ring"/>
```
