# Design Context：从已有上下文出发

**这是这个skill最重要的one thing。**

好的hi-fi设计一定是从已有design context长出来的。**凭空做hi-fi是last resort，一定会产出generic的作品**。所以每次任务开始，先问：有没有可以参考的东西？

## 什么是Design Context

按优先级从高到低：

### 1. 用户的品牌规范 / 设计系统

用户已有的品牌指南、色板、字型规范、logo 用法、组件库。**最完美的情况**。涉及具体品牌时走 SKILL.md §1.a「核心资产协议」五步，把 Logo / 产品图 / UI 截图 / 色值固化成 `brand-spec.md`。

### 2. 用户现有的 deck / 视频模板

用户过去做过、且认可的幻灯片或视频。这是最直接的视觉 vocabulary 来源——masthead 结构、字号层级、页脚节奏、转场习惯都在里面。

- 能拿到源文件就读源文件（HTML / 导出的工程文件）
- 只有成品就逐页截图，把每一页的版式归类

**读源文件要抄 exact values**：hex codes、font stack、字号、间距、圆角。不要凭记忆重画。

### 3. 用户已有的作品 / 上线内容

用户有公开展示的作品但没有源文件时，用 Playwright 截图，或让用户提供截图。

```bash
npx playwright screenshot https://example.com screenshot.png --viewport-size=1920,1080
```

让你看到真实的视觉 vocabulary。

### 4. 品牌指南 / Logo / 已有素材

Logo 文件、品牌色规范、营销物料、产品图、UI 截图、音效与配乐——都是 context。

### 5. 竞品参考 / 参考片

用户说「像XX那样」——让他提供链接或截图。**不要**凭你训练数据里的模糊印象做。动画场景下「参考片」比静态截图更有价值：节奏、运镜、转场都是 context。

### 6. 已知的视觉体系（fallback）

如果以上都没有，用公认的体系作为 base：

- 字体：Google Fonts 上有特点的 display + body 配对（避开 Inter / Roboto / Arial）
- 色彩：Radix Colors，或 oklch 手工调和的和谐色
- 版式节奏：8pt 基线网格

明确告诉用户你用的什么，让他知道这是起点不是定稿。

## 获取Context的流程

### Step 1：问用户

任务开始时的必问清单（来自`workflow.md`）：

```markdown
1. 你有现成的品牌规范 / 设计系统吗？在哪？
2. 有品牌指南、色彩/字体规范吗？
3. 有过去做过的 deck / 视频，或可以参考的作品吗？能给我文件或截图吗？
4. 有素材目录我可以读吗？（logo、产品图、音效、配乐）
```

### Step 2：用户说"没有"时，帮他找

别直接放弃。尝试：

```markdown
让我看看有没有线索：
- 你之前的项目有相关设计吗？
- 公司的marketing网站用什么色彩/字型？
- 你产品的Logo什么风格？能给我一张吗？
- 有什么你欣赏的作品或片子作为参考？
```

### Step 3：Read所有能找到的context

如果用户给了文件路径，你读：

1. **先list文件结构**：找 style / token / 模板相关的文件
2. **读 style/token 文件**：lift具体的hex/px values
3. **读2-3页代表性页面**：看视觉vocabulary（标题层级、留白比例、页脚结构）
4. **读global stylesheet**：基础重置、font loading

**重要**：**不要**看了一眼就凭印象做。读下来有30+个具体values才真的lift到了。

### Step 4：Vocalize你要用的系统

看完context后，告诉用户你要用的系统：

```markdown
根据你给的规范和历史产出，我提炼的设计系统：

**色彩**
- Primary: #C27558
- Background: #FDF9F0
- Text: #1A1A1A
- Muted: #6B6B6B

**字型**
- Display: Instrument Serif
- Body: Geist Sans
- Mono: JetBrains Mono

**版式**
- 8pt 基线网格：4, 8, 12, 16, 24, 32, 48, 64
- 幻灯片正文最小 24px，标题 60-120px

**节奏**
- 每页一个核心信息，留白 ≥ 40%

我按这套系统开始做。确认没问题？
```

用户确认后再动手。

## 凭空做设计（没Context时的 fallback）

**强烈警告**：这种情况下的产出质量会显著下降。明确告诉用户。

```markdown
你没有design context，我就只能基于通用直觉做。
产出会是"看起来OK但缺乏独特性"的东西。
你愿意继续，还是先补一些参考材料？
```

用户执意要你做，按这个顺序做决策：

### 1. 选一个aesthetic direction

不要给generic结果。挑一个明确方向：

- brutally minimal
- editorial/magazine
- brutalist/raw
- organic/natural
- luxury/refined
- playful/toy
- retro-futuristic
- soft/pastel

告诉用户你选了哪个。

### 2. 选有特点的字体配对

不要用Inter/Roboto。建议组合（从Google Fonts白嫖）：

- Instrument Serif + Geist Sans
- Cormorant Garamond + Inter Tight
- Bricolage Grotesque + Söhne（付费）
- JetBrains Mono + Geist Sans（technical feel）

### 3. 每个关键决策都有reasoning

不要默默选。在HTML的comment里写：

```html
<!--
Design decisions:
- Primary color: warm terracotta (oklch 0.65 0.18 25) — fits the "editorial" direction
- Display: Instrument Serif for humanist, literary feel
- Body: Geist Sans for cleanness contrast
- No gradients — committed to minimal, no AI slop
- Spacing: 8px base, golden ratio friendly (8/13/21/34)
-->
```

## 和Figma/设计稿的配合

如果用户给了Figma链接：

- **不要**期望你能直接"转Figma为HTML"——那需要额外工具
- Figma链接通常不公开可访问
- 让用户：导出为**截图**发给你 + 告诉你具体的color/spacing values

如果只给了Figma截图，告诉用户：

- 我能看到视觉，但取不到精确values
- 关键数字（hex、px）请告诉我，或者export as code（Figma支持）

## 最后的提醒

**一个项目的设计质量上限，由你拿到的context质量决定**。

花10分钟收集context，比花1小时凭空画hi-fi更有价值。

**遇到没context的情况，优先问用户要，而不是硬上**。
