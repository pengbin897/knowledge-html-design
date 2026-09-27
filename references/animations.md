# 动画目录

所有动画都在 `assets/animations/animations.css`。给任意元素加上 `class="anim-<name>"` 或 `data-anim="<name>"` 即可使用（`runtime.js` 会在幻灯片变为当前页时重新触发 `data-anim` 元素，因此每次翻到该页都会播放入场效果）。

打开 `templates/animation-showcase.html` 可以浏览全部动画 — 每种动画一页，进入该页时自动播放。在任意页按 **A**，会在当前页上循环一个随机动画。

## 方向淡入

| 名称 | 效果 | 适用 |
|---|---|---|
| `fade-up` | 从 +32 px 上移并淡入。 | 段落和卡片入场的默认选择。 |
| `fade-down` | 从 -32 px 下移并淡入。 | 标题 / 横幅 / 提示条。 |
| `fade-left` | 从 -40 px 移入。 | 双栏布局的左栏。 |
| `fade-right` | 从 +40 px 移入。 | 双栏布局的右栏。 |

## 戏剧性入场

| 名称 | 效果 | 适用 |
|---|---|---|
| `rise-in` | 上移 60 px，同时模糊消散。 | 幻灯片标题、主视觉大标题。 |
| `drop-in` | 下移 60 px，略微缩放。 | 横幅、警示条。 |
| `zoom-pop` | 缩放 0.6 → 1.04 → 1。 | 按钮、数据数字、行动号召。 |
| `blur-in` | 18 px 模糊逐渐清晰。 | 封面揭晓。 |
| `glitch-in` | 裁剪路径分步 + 抖动。 | 技术 / 赛博 / 错误状态。 |

## 文字效果

| 名称 | 效果 | 适用 |
|---|---|---|
| `typewriter` | 等宽风格的打字显现。 | 一句话、口号。 |
| `neon-glow` | 文字阴影循环脉冲。 | terminal-green 主题。 |
| `shimmer-sweep` | 白色光泽扫过。 | 金属感按钮、高级卡片。 |
| `gradient-flow` | 水平渐变无限滑动。 | 品牌字标。 |

## 列表与数字

| 名称 | 效果 | 适用 |
|---|---|---|
| `stagger-list` | 子元素逐个上浮入场。 | 任意 `<ul>` 或 `.grid`。 |
| `counter-up` | 数字从 0 跳到目标值。 | KPI、数据高亮页。 |

计数器标记：
```html
<span class="counter" data-to="1248">0</span>
```

## SVG / 几何

| 名称 | 效果 | 适用 |
|---|---|---|
| `path-draw` | 描边自行画出。 | 线条、箭头、示意图。 |
| `morph-shape` | 路径 `d` 变形。 | 背景形状。 |

在 `<svg>` 上加 `class="anim-path-draw"`；内部每条 path/line/circle 都会被画出。

## 3D 与透视

| 名称 | 效果 | 适用 |
|---|---|---|
| `parallax-tilt` | 悬停时 3D 倾斜。 | 主视觉卡片、产品图。 |
| `card-flip-3d` | 绕 Y 轴翻转 90°。 | 前后对比揭晓。 |
| `cube-rotate-3d` | 从立方体侧面旋入。 | 章节分隔页。 |
| `page-turn-3d` | 以左缘为轴翻页。 | 杂志风 / 叙事流。 |
| `perspective-zoom` | 从 Z 轴 -400 拉近。 | 封面开场。 |

## 氛围 / 持续

| 名称 | 效果 | 适用 |
|---|---|---|
| `marquee-scroll` | 水平无限循环。 | 客户 logo 条。 |
| `kenburns` | 图片 14 秒缓慢缩放。 | 主视觉背景。 |
| `confetti-burst` | 伪元素闪光爆发。 | 致谢 / 庆祝页。 |
| `spotlight` | 圆形裁剪路径揭晓。 | 重大揭晓时刻。 |
| `ripple-reveal` | 从角落起源的涟漪揭晓。 | 章节过渡。 |

## 尊重动效偏好

当系统设置为 `prefers-reduced-motion: reduce` 时，所有动画会自动关闭。不要覆盖这一行为。

## 提示

- 优先用 `data-anim="..."`，少用 `class="anim-..."`，这样运行时会在幻灯片变为当前页时重新触发动画。
- 单页最多用 1–2 种不同动画。混 5 种会显得杂乱。
- 列表错开入场 + 一个主视觉入场 = 干净的节奏。
- `counter-up` 用在需要强调单个数字的页面上。

## 特效（canvas）

CSS 动画是一次性入场效果。**FX** 是持续运行的 canvas/DOM 特效：所在幻灯片变为当前页时启动，离开时停止。由 `assets/animations/fx-runtime.js` 加载，它会动态拉取 `assets/animations/fx/*.js` 下的每个模块，并监听 `.slide.is-active` 来跑生命周期。

在任意页面加入：
```html
<script src="../assets/animations/fx-runtime.js"></script>
```

然后在任意幻灯片里放一个：
```html
<div data-fx="particle-burst" style="width:100%;height:360px;"></div>
```

容器只要有尺寸即可 — 特效会用 `ResizeObserver` + 设备像素比校正，自动把 canvas 撑满容器。颜色读取当前主题（`--accent`、`--accent-2`、`--ok`、`--warn`、`--danger`）。

| 名称 | 效果 | 适用场景 | 触发方式 |
|---|---|---|---|
| `particle-burst` | 粒子从中心炸开，受重力并淡出，每 2.5 秒再爆发一次。 | 揭晓时刻、数据页。 | `<div data-fx="particle-burst">` |
| `confetti-cannon` | 彩色旋转矩形从底部两角弧线射出。 | 致谢 / 成功页。 | `<div data-fx="confetti-cannon">` |
| `firework` | 火箭从底部升起后炸成彩色火花，持续播放。 | 庆祝、发布页。 | `<div data-fx="firework">` |
| `starfield` | 3D 透视星空向外飞驰。 | 科幻 / 深空背景。 | `<div data-fx="starfield">` |
| `matrix-rain` | 绿色片假名与十六进制字符列下落。 | 赛博 / 安全 / 数据主题。 | `<div data-fx="matrix-rain">` |
| `knowledge-graph` | 力导向图，28 个带标签节点、约 50 条边，实时物理。 | 知识 / RAG / 图谱页。 | `<div data-fx="knowledge-graph">` |
| `neural-net` | 4-6-6-3 前馈网络，脉冲沿边传播。 | 机器学习 / 模型架构页。 | `<div data-fx="neural-net">` |
| `constellation` | 漂移的点，距离 150 px 内连线，透明度随距离变化。 | 氛围主视觉背景。 | `<div data-fx="constellation">` |
| `orbit-ring` | 5 圈同心环，环上圆点速度不同，带径向光晕。 | 系统 / 行星 / 分层概念。 | `<div data-fx="orbit-ring">` |
| `galaxy-swirl` | 约 800 个粒子的对数螺线，缓慢旋转。 | 封面、开场。 | `<div data-fx="galaxy-swirl">` |
| `word-cascade` | 词语从顶部落下，在底部堆积。 | 词汇 / 概念云页面。 | `<div data-fx="word-cascade">` |
| `letter-explode` | 标题字母从随机方向飞入，约每 4.5 秒循环。 | 大标题、主视觉文字。 | `<div data-fx="letter-explode" data-fx-text-value="EXPLODE">` |
| `chain-react` | 8 个圆，多米诺脉冲波横穿而过。 | 流水线 / 顺序流程。 | `<div data-fx="chain-react">` |
| `magnetic-field` | 粒子沿贝塞尔/正弦曲线运动并留下拖尾。 | 能量 / 流动 / 抽象。 | `<div data-fx="magnetic-field">` |
| `data-stream` | 一行行滚动的十六进制/二进制文字，赛博朋克风。 | 数据、API、安全。 | `<div data-fx="data-stream">` |
| `gradient-blob` | 4 团漂移的模糊径向渐变（叠加混合）。 | 柔和主视觉背景。 | `<div data-fx="gradient-blob">` |
| `sparkle-trail` | 跟随指针的闪光发射器（静止时自动轻微摆动）。 | 交互揭晓、悬停画布。 | `<div data-fx="sparkle-trail">` |
| `shockwave` | 从中心循环扩散的环。 | 冲击、发布、警示。 | `<div data-fx="shockwave">` |
| `typewriter-multi` | 3 行同时打字，带闪烁方块光标（DOM）。 | 终端、智能体启动日志。 | `<div data-fx="typewriter-multi" data-fx-line1="> boot...">` |
| `counter-explosion` | 数字从 0 计到目标值，爆发粒子，4 秒后重置。 | KPI 揭晓、纪录新高。 | `<div data-fx="counter-explosion" data-fx-to="2400">` |

特效提示：
- 一页一个特效几乎总是够用。再叠普通 CSS `data-anim` 效果，层次会更干净。
- 容器需要明确尺寸（高度）— canvas 会铺满 100%。
- 每个模块都遵循主题自定义属性。在幻灯片或元素上设置 `--accent` / `--accent-2` 即可即时改色。
- 生命周期自动管理：进入幻灯片启动特效，离开时停止并释放 canvas。也可以手动调用 `window.__hpxReinit(el)`。
