# 执行脚本 → HTML 舞台

> 旁白 / 讲稿是源代码。先写成 `script.md`（scene + cue），再做连续运动 HTML。
> **产物只有 HTML + 执行脚本**，不导出 MP4，不跑 TTS。
>
> 配套 `references/animation-best-practices.md`：本文件管 **词和画面怎么对齐**，
> 那份管 **每一帧怎么动**。

---

## 🛑 铁律 · 在写一行代码之前必读

> **强调多少遍都不够：解说动画的失败模式 #1 是做成了带旁白的 PowerPoint。**

### 第一条 · 整片是一个连续的运动叙事，不是一组独立场景

PowerPoint 是 7 张幻灯片。我们做的是 **1 段持续 X 分钟的电影**。

**身份切换**：
- ❌ 你不是「在做 7 个 scene 的内容」
- ✅ 你是「在屏幕上让一个或几个 hero element 演 X 分钟的戏」

**视觉骨架 = 一个或几个贯穿全片的 hero element**：
- 它从 t=0 出现，到结束才离场
- 每个 cue 是它的**状态变化**（位置 / 大小 / 颜色 / 透视 / 形态），不是「换一个新元素」
- scene 边界在剧本里有，**在画面里不应该有**——观众看不出"这是第 3 个 scene"，只看到一段连续的运动

**反例（本 skill v1 实战踩坑 · 2026-05-10）**：
- 7 个 `<Scene>` 各自独立 layout，scene 切换 = 整页 opacity 1→0 切到下一页
- 每个 cue = `opacity: p, transform: translateY((1-p)*30px)`（fade-up 单调使用）
- 结果：观众看完第一反应「像一页页 keynote」，整片质感归零

**正确模式**：
- 选定 1-2 个 hero element（如本文章 demo 应选「md」「html」两个字符作为骨架）
- 这两个字符**从片头到片尾**一直在屏幕上
- 每段「scene」实际是 hero element 的一次状态变化
  - opening：两字符在屏幕中央对峙
  - md-side：md 变大变粗占据画面，html 退到角落小字；数据围绕 md 涌入
  - html-side：html 反转为主角；md 退到角落
  - the-real-question：两字符回到中央，但中间出现「≠」分隔
  - the-split：两字符向两侧推开，中间空白展开
  - activity-proof：两字符在 timeline 上交替闪烁
  - closing：两字符落地为最终答案位置
- 这样整片是「md 和 html 在屏幕上演了 X 分钟」，不是 7 张独立 PPT

**最小实现骨架**（直接抄改）：

```jsx
// ── Step 1: 定义 hero 在每个 scene 的目标状态（位置/大小/不透明度）──
const HERO_KEYS = {
  opening:    { md: { x: 50, y: 35, scale: 1.0, opacity: 1 }, html: { x: 50, y: 65, scale: 1.0, opacity: 1 } },
  'md-side':  { md: { x: 78, y: 50, scale: 1.6, opacity: 1 }, html: { x: 92, y: 8,  scale: 0.25, opacity: 0.4 } },
  'html-side':{ md: { x: 8,  y: 8,  scale: 0.25, opacity: 0.4 }, html: { x: 22, y: 50, scale: 1.6, opacity: 1 } },
  // ... 每段一个 entry，连贯的运动从前一段的 final → 本段的 from
};

// ── Step 2: easing + lerp 工具 ──
const expoOut = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
const lerp = (a, b, t) => a + (b - a) * t;
const lerpPos = (from, to, t) => ({
  x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t),
  scale: lerp(from.scale, to.scale, t),
  opacity: lerp(from.opacity ?? 1, to.opacity ?? 1, t),
});

// ── Step 3: HeroAnchor 组件 —— 直接挂在 <NarrationStage> 子级，不放进 <Scene> ──
const HeroAnchor = () => {
  const { time, scene, timeline } = useNarration();
  if (!scene) return null;
  const idx = timeline.scenes.findIndex(s => s.id === scene.id);
  const prevId = idx > 0 ? timeline.scenes[idx - 1].id : scene.id;
  const from = HERO_KEYS[prevId];
  const to   = HERO_KEYS[scene.id];

  // 段内前 ~45% 时间用于从 prev 状态 morph 到本段状态，剩余 hold
  const transitionDur = Math.min(2.0, scene.duration * 0.45);
  const t = expoOut(Math.min(1, (time - scene.start) / transitionDur));
  const md   = lerpPos(from.md,   to.md,   t);
  const html = lerpPos(from.html, to.html, t);

  // 加 subtle breathing 让任意一帧都有运动（对应铁律第三条）
  const breath = 1 + Math.sin(time * 0.6) * 0.012;

  const renderHero = (label, pos, color) => (
    <div style={{
      position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`,
      transform: `translate(-50%, -50%) scale(${pos.scale * breath})`,
      opacity: pos.opacity, color, fontSize: 360, fontWeight: 800,
      lineHeight: 1, willChange: 'transform, opacity', pointerEvents: 'none',
    }}>{label}</div>
  );
  return <>
    {renderHero('md',   md,   '#1B4965')}
    {renderHero('html', html, '#C04A1A')}
  </>;
};

// ── Step 4: 主组件 —— hero 在 NarrationStage 子级，scene 内辅助元素另外管 ──
const App = () => (
  <NarrationStage timeline={TIMELINE} mode="speaker" width={1920} height={1080} background={C.paper}>
    <HeroAnchor />  {/* ← 跨 scene 持续存在，整片视觉骨架 */}
    {/* scene 内辅助元素用 useSceneFade 控制软淡入淡出，不要硬切 */}
    <MdSideAux />
    <HtmlSideAux />
    {/* ... */}
  </NarrationStage>
);
```

**完整可运行参考**：`demos/md-html-narration/md-html-demo.html`（3 分 21 秒，7 段，21 cue，已实战验证）

### 第二条 · 场景之间不能「硬切」

| 错误模式（PowerPoint slop） | 正确模式（电影感） |
|---|---|
| scene A 整体 `opacity 1→0` 同时 scene B `opacity 0→1` | scene A 的核心元素 **morph 进** B（位置/大小/颜色平滑变换） |
| 每个 scene 独立 layout，元素出现/消失 | 元素在屏幕上**持续存在**，只是位置和形态在变 |
| `keepMounted=false`，scene 切换瞬间组件被卸载 | hero 用 `keepMounted=true`，跨 scene 共享 DOM 节点 |
| 字幕条/数据卡片各自 fade in fade out | 字幕条作为画面唯一的"非 hero" 入场，hold 后**配合 hero 的运动一起退出** |

实现层面：
- **共享元素跨 scene** → 把 hero 提到 `<NarrationStage>` 直接子级，**不放在任何 `<Scene>` 里**
- 用 `useNarration()` hook 在 hero 里读 `time`、`scene`、`isCueTriggered`，自己根据当前时间决定形态
- `<Scene>` 只用来管那些只在该段出现的辅助元素（数据卡、引用块等），并且**这些辅助元素也不要硬切**——出场用 expoOut + stagger，退场用 fade overlap 跟下一段叠

### 第三条 · 每一帧画面都必须有运动

**自检方法**：在浏览器里**任意暂停一帧**（不是 cue 触发那一秒）。
- 如果画面看起来「**完全静止**」→ 错。回去加底层运动（background drift / hero subtle scale / camera pan / parallax）
- 永远有一个**底层运动**在跑（即使不是焦点）：
  - hero element 的 `scale: 1 ↔ 1.02` 5 秒呼吸循环
  - 背景 `translateX: 0 ↔ -20px` 缓慢漂移
  - 数据卡片入场后保留 `translateY` 微抖（Perlin noise）
- 一个完全静止的画面 = PowerPoint slop

### 第四条 · Easing / Stagger / Hold 是底线

| 项 | 必须 | 禁止 |
|---|---|---|
| Easing | `expoOut` 主轴（`cubic-bezier(0.16, 1, 0.3, 1)`），`overshoot` 强调，`spring` 落位 | `linear`、`ease`、CSS 默认 |
| 多元素入场 | 30ms stagger（每个晚 30ms 进） | 一刀切全部出现 |
| 关键 cue 前 | hold 0.3-0.5s 让观众"看见"（前一段元素先静止 0.3s，再触发 cue） | 一段说完无缝切下一段 |
| 收尾 | 戛然而止，最后一帧 hold 1s | fade to black |

详细规则参考 `animation-best-practices.md` 的 §1-§4。

### 自检 · 第一观众反应

做完拿给一个没看过的人看（或自己 24 小时后再看），**他们的第一反应**是什么？

| 反应 | 评级 | 行动 |
|---|---|---|
| 「这是带配音的 PPT」 | 失败 | 回去重做 |
| 「画面跟着声音在切换」 | 不及格 | 缺连续叙事，hero element 不存在或没贯穿 |
| 「这个东西在动」 | 合格 | 但没记忆点 |
| 「我想看完」 | 良 | 节奏对了 |
| 「这一段我想截图」 | great | 你做到了 |

---

## 工作流（高层）

```
  讲稿 / 旁白
       │
       ▼
  script.md          ← 执行脚本（## scene-id + [[cue:xx]]）
       │
       ▼
  script-to-timeline.mjs --pace speaker
       │
       ▼
  timeline.json      ← 拍点时间轴（可内联进 HTML）
       │
       ▼
  舞台 HTML          ← NarrationStage mode="speaker"
                       空格推进，浏览器全屏即终态
```

**交付**：`script.md` + 可双击打开的 HTML。不要 TTS，不要录 MP4。

## 执行脚本格式（script.md）

放在项目目录，文件名建议 `script.md`：

```markdown
---
title: 什么是 LLM
gap: 0.4
---

## intro
大家好，今天我们把 LLM 讲清楚。

## what-is
LLM 全称 Large Language Model，[[cue:bigmodel]]它是一个有几千亿参数的神经网络。
本质是一个文字接龙的预测器。

## demo
比如你输入「今天天气」，[[cue:input]]模型会预测下一个字最可能是什么。
[[cue:predict]]也许是「真好」，也许是「不错」。
```

**规则**：
- 段标题 `## scene-id` 只用英文/数字 + 连字符
- `[[cue:xx]]` 标在**关键句前面或中间**——这是画面触发点，不是装饰
- cue id 在 HTML 里用 `<Cue id="xx">` 监听
- 一段 2–5 个 cue；一句一 cue 会碎，一段零 cue 会呆
- 写短句。现场再口语化，剧本也要能出拍点

现场路径时间轴 **≠** 讲话时长：每个 cue 只占约 1.6s 动画拍点，讲者按空格到达后画面 **hold**。不要按字数把一段拉成 40 秒。

## timeline.json schema

由 `scripts/script-to-timeline.mjs` 生成：

```ts
{
  title: string,
  pace: 'speaker' | 'speech',
  totalDuration: number,        // 拍点总时长（speaker 模式下是动画窗，不是口播秒数）
  scenes: [
    {
      id: string,
      start: number,
      end: number,
      duration: number,
      text: string,             // 已剥离 [[cue:xx]] 的整段
      chunks: [{
        text: string,
        start: number,
        end: number,
        absoluteStart: number,
        absoluteEnd: number,
      }],
      cues: [{
        id: string,
        offset: number,
        absoluteTime: number,
        prompt: string,         // 这一拍要讲的那一句
      }]
    }
  ]
}
```

```bash
node scripts/script-to-timeline.mjs --script script.md --out timeline.json --pace speaker
```

`--pace speaker`（默认）：每个 cue 间隔约 1.6s，段间 0.4s。  
`--pace speech`：按中文字符估算（约 3.8 字/秒），只在用户要「按播放键自己跑」时用。视觉铁律不变。

## 字幕

现场默认 **不要** 叠整句字幕，会和讲者抢词。画面上最多放关键词。

若用户坚持 HTML 自动播放、自己不讲，才用 `<Subtitles />`（从 `timeline.scenes[].chunks` 取词）。

## NarrationStage API

把 `assets/narration_stage.jsx` **全文内联**进 HTML，禁止 `src="….jsx"`（`file://` 会 CORS 黑屏）。

```jsx
const { NarrationStage, Scene, Cue, useNarration, useSceneFade } = NarrationStageLib;

<NarrationStage
  timeline={TIMELINE}
  mode="speaker"
  width={1920} height={1080}
  background="#f5f1e8"
>
  <HeroAnchor />
  <Scene id="intro">
    <Cue id="bigmodel">{(triggered, progress) => (
      <SomeElement style={{ opacity: progress }} />
    )}</Cue>
  </Scene>
</NarrationStage>
```

键盘（speaker）：空格 / → 下一拍，← 回退，N 提词，F 全屏。

**Hooks**：`useNarration()` 返回 `{ time, scene, sceneTime, sceneMorph, isCueTriggered, cueProgress }`。

**Scene**：默认只在对应 id 激活时挂载；`keepMounted` 给需要跨段留在 DOM 的辅助层。hero 不要放进 Scene。

**Cue**：children 必须是 `(triggered, progress) => ReactNode`。

## 标准工作流

1. **写执行脚本**：把口播写完整，标 `## scene-id` 和 `[[cue:xx]]`
2. **编时间轴**：`node scripts/script-to-timeline.mjs --script script.md --out timeline.json --pace speaker`
3. **🛑 设计前先回答铁律**：hero 是什么？每段什么状态？怎么 morph？答不上不要写代码
4. **Junior pass**：灰块 + 段名 + hero 占位，show 用户
5. **写舞台 HTML**：NarrationStage + 1–2 个 hero 跨 scene 演戏
6. **浏览器跟讲**：双击 HTML，空格走一遍；随机暂停一帧不能完全死
7. **交付**：`script.md` + HTML（timeline 内联或旁路 `timeline.json`）

## 异常处理

| 问题 | 解决 |
|---|---|
| 空格一按画面瞬间跳到终态 | 时间轴用了 speech 时长；改回 `--pace speaker` |
| 第一拍被跳过 | 起幅 beatIndex 从 -1 开始，不要默认落在第一拍 hold |
| 整页切黑再出下一页 | hero 进了 `<Scene>` → 提到 NarrationStage 子级 |
| 任意一帧完全静止 | 加呼吸 / 背景漂移 |
| 双击黑屏 | 引擎没内联，`file://` CORS |

## 何时不用这套

- **翻页幻灯片**：走 `slide-decks.md` + `deck_index.html`。仍交 HTML；讲稿可写成 `script.md` 当 speaker notes。
- **无旁白的短 motion**：用 `animations.jsx` 的 Stage + Sprite。仍交 HTML；可用简短 `script.md` 写镜头意图。

---

**最后一次提醒**：写代码前回到铁律。**别做带旁白的 PowerPoint**。
