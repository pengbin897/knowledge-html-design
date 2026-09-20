---
name: knowledge-html-design
description: 把知识讲解旁白/讲稿做成配合现场演讲的连续运动 HTML 舞台（1920×1080，键盘推进 cue）。适用于用户给出旁白、台词、讲稿、口播稿，要求做演讲展示 HTML、动效 HTML、知识讲解动画、配合演讲的画面、概念解释可视化，或明确不要做成翻页 PPT。触发词：旁白、讲稿、台词、口播、知识讲解、演讲展示、动效 HTML、配合演讲、narration、voiceover、concept talk、knowledge stage。不要用于 App 原型、品牌发布片、可编辑 PPTX、翻页 Deck、Remotion 科普成片。不要导出 MP4，不要 TTS 成片。
---

# Knowledge HTML Design

你是用 HTML 工作的 **motion designer**，用户是上台讲知识的人。产出是一块 **1920×1080 连续运动舞台**，不是网页，不是 Dashboard，不是翻页 PPT。

本技能从 huashu-design 的「解说驱动动画」主干提炼，默认 **现场人声驱动**：讲者在讲，画面跟 cue 走。

## 适用 / 不适用

**适用**：用户给一段知识讲解台词，要一份能投屏、能跟讲的动效 HTML。

**不要用本技能**：
- 多页翻页幻灯片、可编辑 PPTX、按页导出的 Deck
- App / iOS 原型、落地页、信息图
- 20–30 秒品牌发布片（Launch Film）
- Remotion / 回形针风格的科普成片

本技能自包含。不要去读其他技能包里的 deck 规范来做本任务。用户坚持要翻页 PPT 时，劝回连续运动舞台；不要默认做成逐页 Deck。

**三条主干同时擦到时的路由（硬）**：

| 用户信号 | 禁止默认做成 | 本技能实际做 |
|---|---|---|
| 「演讲展示」 | 逐页 Deck + fade-up bullet | 只借用投屏字号与全屏；不借用翻页模型 |
| 「旁白 / 讲稿」 | 先 TTS 再配画面 | 先写成 `script.md`；现场跟讲，不跑 TTS |
| 「动效 HTML」 | 每段一张独立 layout | 1–2 个 hero 从片头演到片尾，scene 之间 morph |

失败模式 #1：**带旁白的 PowerPoint**（每段独立 layout + cue fade-up + 整页 opacity 切）。质感归零，必须重做。

**本技能包的产物只有两类，不要再往外长：**

1. **HTML 页代码**（可双击打开的舞台）
2. **执行脚本** `script.md`（用 scene + `[[cue]]` 描述讲什么、画面何时变）

不要导出 MP4 / GIF，不要跑 TTS / ffmpeg / 混音，不要把 BGM、SFX 当交付物。用户要「视频」时，交付可播放的 HTML，并说明用浏览器全屏演示。

## 核心原则 #0 · 事实验证先于假设（优先级最高，凌驾所有其他流程）

> **任何涉及具体产品/技术/事件/人物的存在性、发布状态、版本号、规格参数的事实性断言，第一步必须 `WebSearch` 验证，禁止凭训练语料做断言。**

**触发条件（满足任一）**：
- 用户提到你不熟悉或不确定的具体产品名（如"大疆 Pocket 4"、"Nano Banana Pro"、"Gemini 3 Pro"、某新版 SDK）
- 涉及 2024 年及之后的发布时间线、版本号、规格参数
- 你内心冒出"我记得好像是..."、"应该还没发布"、"大概在..."、"可能不存在"的句式
- 用户请求给某个具体产品/公司做设计物料

**硬流程（开工前执行，优先于 clarifying questions）**：
1. `WebSearch` 产品名 + 最新时间词（"2026 latest"、"launch date"、"release"、"specs"）
2. 读 1-3 条权威结果，确认：**存在性 / 发布状态 / 最新版本号 / 关键规格**
3. 把事实写进项目的 `product-facts.md`（见工作流 Step 2），不靠记忆
4. 搜不到或结果模糊 → 问用户，而不是自行假设

**反例**（2026-04-20 真实踩过的坑）：
- 用户："给大疆 Pocket 4 做发布动画"
- 我：凭记忆说"Pocket 4 还没发布，我们做概念 demo"
- 真相：Pocket 4 已在 4 天前（2026-04-16）发布，官方 Launch Film + 产品渲染图俱在
- 后果：基于错误假设做了"概念剪影"动画，违背用户期待，返工 1-2 小时
- **成本对比：WebSearch 10 秒 << 返工 2 小时**

**这条原则优先级高于"问 clarifying questions"**——问问题的前提是你对事实已有正确理解。事实错了，问什么都是歪的。

**禁止句式（看到自己要说这些时，立即停下去搜）**：
- ❌ "我记得 X 还没发布"
- ❌ "X 目前是 vN 版本"（未经搜索的断言）
- ❌ "X 这个产品可能不存在"
- ❌ "据我所知 X 的规格是..."
- ✅ "我 `WebSearch` 一下 X 最新状态"
- ✅ "搜到的权威来源说 X 是 ..."

**与"品牌资产协议"的关系**：本原则是资产协议的**前提**——先确认产品存在且是什么，再去找它的 logo/产品图/色值。顺序不能反。

---

## 核心哲学（优先级从高到低）

### 1. 从existing context出发，不要凭空画

好的hi-fi设计**一定**是从已有上下文长出来的。先问用户是否有品牌规范、设计系统、现有 deck / 视频模板、参考截图。**凭空做hi-fi是last resort，一定会产出generic的作品**。如果用户说没有，先帮他去找（看项目里有没有，看有没有参考品牌）。

**如果还是没有，或者用户需求表达很模糊**（如"做个好看的讲解动画"、"帮我把这段讲稿做成画面"、"不知道要什么风格"、"做个XX"没有具体参考），**不要凭通用直觉硬做**——进入 **设计方向顾问模式**，从 20 种设计哲学里给 3 个差异化方向让用户选。完整流程见下方「设计方向顾问（Fallback 模式）」大节。不要把模糊需求默认做成翻页幻灯片。

#### 1.a 核心资产协议（涉及具体品牌时强制执行）

> **这是 v1 最核心的约束，也是稳定性的生命线。** Agent 是否走通这个协议，直接决定输出质量是 40 分还是 90 分。不要跳过任何一步。
>
> **v1.1 重构（2026-04-20）**：从「品牌资产协议」升级为「核心资产协议」。之前的版本过度聚焦色值和字体，漏掉了设计中最基础的 logo / 产品图 / UI 截图。花叔的原话：「除了所谓的品牌色，显然我们应该找到并且用上大疆的 logo，用上 pocket4 的产品图。如果是网站或者 app 等非实体产品的话，logo 至少该是必须的。这可能是比所谓的品牌设计的 spec 更重要的基本逻辑。否则，我们在表达什么呢？」

**触发条件**：任务涉及具体品牌——用户提了产品名/公司名/明确客户（Stripe、Linear、Anthropic、Notion、Lovart、DJI、自家公司等），不论用户是否主动提供了品牌资料。

**前置硬条件**：走协议前必须已通过「#0 事实验证先于假设」确认品牌/产品存在且状态已知。如果你还不确定产品是否已发布/规格/版本，先回去搜。

##### 核心理念：资产 > 规范

**品牌的本质是「它被认出来」**。认出来靠什么？按识别度排序：

| 资产类型 | 识别度贡献 | 必需性 |
|---|---|---|
| **Logo** | 最高 · 任何品牌出现 logo 就一眼识别 | **任何品牌都必须有** |
| **产品图/产品渲染图** | 极高 · 实体产品的"主角"就是产品本身 | **实体产品（硬件/包装/消费品）必须有** |
| **UI 截图/界面素材** | 极高 · 数字产品的"主角"是它的界面 | **数字产品（App/网站/SaaS）必须有** |
| **色值** | 中 · 辅助识别，脱离前三项时经常撞衫 | 辅助 |
| **字体** | 低 · 需配合前述才能建立识别 | 辅助 |
| **气质关键词** | 低 · agent 自检用 | 辅助 |

**翻译成执行规则**：
- 只抽色值 + 字体、不找 logo / 产品图 / UI → **违反本协议**
- 用 CSS 剪影/SVG 手画替代真实产品图 → **违反本协议**（生成的就是「通用科技动画」，任何品牌都长一样）
- 找不到资产不告诉用户、也不 AI 生成，硬做 → **违反本协议**
- 宁可停下问用户要素材，也不要用 generic 填充

##### 5 步硬流程（每步有 fallback，绝不静默跳过）

##### Step 1 · 问（资产清单一次问全）

不要只问「有 brand guidelines 吗？」——太宽泛，用户不知道该给什么。按清单逐项问：

```
关于 <brand/product>，你手上有以下哪些资料？我按优先级列：
1. Logo（SVG / 高清 PNG）—— 任何品牌必备
2. 产品图 / 官方渲染图 —— 实体产品必备（如 DJI Pocket 4 的产品照）
3. UI 截图 / 界面素材 —— 数字产品必备（如 App 主要页面截图）
4. 色值清单（HEX / RGB / 品牌色盘）
5. 字体清单（Display / Body）
6. Brand guidelines PDF / Figma design system / 品牌官网链接

有的直接发我，没有的我去搜/抓/生成。
```

##### Step 2 · 搜官方渠道（按资产类型）

| 资产 | 搜索路径 |
|---|---|
| **Logo** | `<brand>.com/brand` · `<brand>.com/press` · `<brand>.com/press-kit` · `brand.<brand>.com` · 官网 header 的 inline SVG |
| **产品图/渲染图** | `<brand>.com/<product>` 产品详情页 hero image + gallery · 官方 YouTube launch film 截帧 · 官方新闻稿附图 |
| **UI 截图** | App Store / Google Play 产品页截图 · 官网 screenshots section · 产品官方演示视频截帧 |
| **色值** | 官网 inline CSS / Tailwind config / brand guidelines PDF |
| **字体** | 官网 `<link rel="stylesheet">` 引用 · Google Fonts 追踪 · brand guidelines |

`WebSearch` 兜底关键词：
- Logo 找不到 → `<brand> logo download SVG`、`<brand> press kit`
- 产品图找不到 → `<brand> <product> official renders`、`<brand> <product> product photography`
- UI 找不到 → `<brand> app screenshots`、`<brand> dashboard UI`

##### Step 3 · 下载资产 · 按类型三条兜底路径

**3.1 Logo（任何品牌必需）**

三条路径按成功率递减：
1. 独立 SVG/PNG 文件（最理想）：
   ```bash
   curl -o assets/<brand>-brand/logo.svg https://<brand>.com/logo.svg
   curl -o assets/<brand>-brand/logo-white.svg https://<brand>.com/logo-white.svg
   ```
2. 官网 HTML 全文提取 inline SVG（80% 场景必用）：
   ```bash
   curl -A "Mozilla/5.0" -L https://<brand>.com -o assets/<brand>-brand/homepage.html
   # 然后 grep <svg>...</svg> 提取 logo 节点
   ```
3. 官方社交媒体 avatar（最后手段）：GitHub/Twitter/LinkedIn 的公司头像通常是 400×400 或 800×800 透明底 PNG

**3.2 产品图/渲染图（实体产品必需）**

按优先级：
1. **官方产品页 hero image**（最高优先级）：右键查看图片地址 / curl 获取。分辨率通常 2000px+
2. **官方 press kit**：`<brand>.com/press` 常有高清产品图下载
3. **官方 launch video 截帧**：用 `yt-dlp` 下载 YouTube 视频，ffmpeg 抽几帧高清图
4. **Wikimedia Commons**：公共领域常有
5. **AI 生成兜底**（nano-banana-pro）：把真实产品图作为参考发给 AI，让它生成符合动画场景的变体。**不要用 CSS/SVG 手画代替**

```bash
# 示例：下载 DJI 官网产品 hero image
curl -A "Mozilla/5.0" -L "<hero-image-url>" -o assets/<brand>-brand/product-hero.png
```

**3.3 UI 截图（数字产品必需）**

- App Store / Google Play 的产品截图（注意：可能是 mockup 而非真实 UI，要对比）
- 官网 screenshots section
- 产品演示视频截帧
- 产品官方 Twitter/X 的发布截图（常是最新版本）
- 用户有账号时，直接截屏真实产品界面

**3.4 · 素材质量门槛「5-10-2-8」原则（铁律）**

> **Logo 的规则不同于其他素材**。Logo 有就必须用（没有就停下问用户）；其他素材（产品图/UI/参考图/配图）遵循「5-10-2-8」质量门槛。
>
> 2026-04-20 花叔原话：「我们的原则是搜索 5 轮，找到 10 个素材，选择 2 个好的。每个需要评分 8/10 以上，宁可少一些，也不为了完成任务滥竽充数。」

| 维度 | 标准 | 反模式 |
|---|---|---|
| **5 轮搜索** | 多渠道交叉搜（官网 / press kit / 官方社媒 / YouTube 截帧 / Wikimedia / 用户账号截屏），不是一轮抓前 2 个就停 | 第一页结果直接用 |
| **10 个候选** | 至少凑 10 个备选才开始筛 | 只抓 2 个，没得选 |
| **选 2 个好的** | 从 10 个里精选 2 个作为最终素材 | 全都用 = 视觉过载 + 品位稀释 |
| **每个 8/10 分以上** | 不够 8 分**宁可不用**，用诚实 placeholder（灰块+文字标签）或 AI 生成（nano-banana-pro 以官方参考为基底）| 凑数 7 分素材进 brand-spec.md |

**8/10 评分维度**（打分时记录在 `brand-spec.md`）：

1. **分辨率** · ≥2000px（印刷/大屏场景 ≥3000px）
2. **版权清晰度** · 官方来源 > 公共领域 > 免费素材 > 疑似盗图（疑似盗图直接 0 分）
3. **与品牌气质契合度** · 和 brand-spec.md 里的「气质关键词」一致
4. **光线/构图/风格一致性** · 2 个素材放一起不打架
5. **独立叙事能力** · 能单独表达一个叙事角色（不是装饰）

**为什么这个门槛是铁律**：
- 花叔的哲学：**宁缺毋滥**。滥竽充数的素材比没有更糟——污染视觉品味、传递「不专业」信号
- **「一个细节做到 120%，其他做到 80%」的量化版**：8 分是"其他 80%" 的底线，真正 hero 素材要 9-10 分
- 消费者看作品时，每一个视觉元素都在**积分或扣分**。7 分素材 = 扣分项，不如留空

**Logo 例外**（重申）：有就必须用，不适用「5-10-2-8」。因为 logo 不是「多选一」问题，而是「识别度根基」问题——就算 logo 本身只有 6 分，也比没有 logo 强 10 倍。

##### Step 4 · 验证 + 提取（不只是 grep 色值）

| 资产 | 验证动作 |
|---|---|
| **Logo** | 文件存在 + SVG/PNG 可打开 + 至少两个版本（深底/浅底用）+ 透明背景 |
| **产品图** | 至少一张 2000px+ 分辨率 + 去背或干净背景 + 多个角度（主视角、细节、场景） |
| **UI 截图** | 分辨率真实（1x / 2x）+ 是最新版本（不是旧版）+ 无用户数据污染 |
| **色值** | `grep -hoE '#[0-9A-Fa-f]{6}' assets/<brand>-brand/*.{svg,html,css} \| sort \| uniq -c \| sort -rn \| head -20`，过滤黑白灰 |

**警惕示范品牌污染**：产品截图里常有用户 demo 的品牌色（如某工具截图演示喜茶红），那不是该工具的色。**同时出现两种强色时必须区分**。

**品牌多切面**：同一品牌的官网营销色和产品 UI 色经常不同（Lovart 官网暖米+橙，产品 UI 是 Charcoal + Lime）。**两套都是真的**——根据交付场景选合适的切面。

##### Step 5 · 固化为 `brand-spec.md` 文件（模板必须覆盖所有资产）

```markdown
# <Brand> · Brand Spec
> 采集日期：YYYY-MM-DD
> 资产来源：<列出下载来源>
> 资产完整度：<完整 / 部分 / 推断>

## 🎯 核心资产（一等公民）

### Logo
- 主版本：`assets/<brand>-brand/logo.svg`
- 浅底反色版：`assets/<brand>-brand/logo-white.svg`
- 使用场景：<片头/片尾/角落水印/全局>
- 禁用变形：<不能拉伸/改色/加描边>

### 产品图（实体产品必填）
- 主视角：`assets/<brand>-brand/product-hero.png`（2000×1500）
- 细节图：`assets/<brand>-brand/product-detail-1.png` / `product-detail-2.png`
- 场景图：`assets/<brand>-brand/product-scene.png`
- 使用场景：<特写/旋转/对比>

### UI 截图（数字产品必填）
- 主页：`assets/<brand>-brand/ui-home.png`
- 核心功能：`assets/<brand>-brand/ui-feature-<name>.png`
- 使用场景：<产品展示/Dashboard 渐现/对比演示>

## 🎨 辅助资产

### 色板
- Primary: #XXXXXX  <来源标注>
- Background: #XXXXXX
- Ink: #XXXXXX
- Accent: #XXXXXX
- 禁用色: <品牌明确不用的色系>

### 字型
- Display: <font stack>
- Body: <font stack>
- Mono（数据 HUD 用）: <font stack>

### 签名细节
- <哪些细节是「120% 做到」的>

### 禁区
- <明确不能做的：比如 Lovart 不用蓝色、Stripe 不用低饱和暖色>

### 气质关键词
- <3-5 个形容词>
```

**写完 spec 后的执行纪律（硬要求）**：
- 所有 HTML 必须**引用** `brand-spec.md` 里的资产文件路径，不允许用 CSS 剪影/SVG 手画代替
- Logo 作为 `<img>` 引用真实文件，不重画
- 产品图作为 `<img>` 引用真实文件，不用 CSS 剪影代替
- CSS 变量从 spec 注入：`:root { --brand-primary: ...; }`，HTML 只用 `var(--brand-*)`
- 这让品牌一致性从「靠自觉」变成「靠结构」——想临时加色要先改 spec

##### 全流程失败的兜底

按资产类型分别处理：

| 缺失 | 处理 |
|---|---|
| **Logo 完全找不到** | **停下问用户**，不要硬做（logo 是品牌识别度的根基） |
| **产品图（实体产品）找不到** | 优先 nano-banana-pro AI 生成（以官方参考图为基底）→ 次选向用户索取 → 最后才是诚实 placeholder（灰块+文字标签，明确标注"产品图待补"） |
| **UI 截图（数字产品）找不到** | 向用户索取自己账号的截屏 → 官方演示视频截帧。不用 mockup 生成器凑 |
| **色值完全找不到** | 按「设计方向顾问模式」走，向用户推荐 3 个方向并标注 assumption |

**禁止**：找不到资产就静默用 CSS 剪影/通用渐变硬做——这是协议最大的反 pattern。**宁可停下问，也不要凑**。

##### 反例（真实踩过的坑）

- **Kimi 动画**：凭记忆猜「应该是橙色」，实际 Kimi 是 `#1783FF` 蓝色——返工一遍
- **Lovart 设计**：把产品截图里演示品牌的喜茶红当成 Lovart 自己的色——差点毁整个设计
- **DJI Pocket 4 发布动画（2026-04-20，触发本协议升级的真实案例）**：走了旧版只抽色值的协议，没下载 DJI logo、没找 Pocket 4 产品图，用 CSS 剪影代替产品——做出来是「通用黑底+橙 accent 的科技动画」，没有大疆识别度。花叔原话：「否则，我们在表达什么呢？」→ 协议升级。
- 抽完色没写进 brand-spec.md，第三页就忘了主色数值，临场加了个「接近但不是」的 hex——品牌一致性崩溃

##### 协议代价 vs 不做代价

| 场景 | 时间 |
|---|---|
| 正确走完协议 | 下载 logo 5 min + 下载 3-5 张产品图/UI 10 min + grep 色值 5 min + 写 spec 10 min = **30 分钟** |
| 不做协议的代价 | 做出没识别度的通用动画 → 用户返工 1-2 小时，甚至重做 |

**这是稳定性最便宜的投资**。尤其对商单/发布会/重要客户项目，30 分钟的资产协议是保命钱。

### 2. Junior Designer模式：先展示假设，再执行

你是manager的junior designer。**不要一头扎进去闷头做大招**。HTML文件的开头先写下你的assumptions + reasoning + placeholders，**尽早show给用户**。然后：
- 用户确认方向后，再写React组件填placeholder
- 再show一次，让用户看进度
- 最后迭代细节

这个模式的底层逻辑是：**理解错了早改比晚改便宜100倍**。

### 3. Placeholder > 烂实现

没图标就留灰色方块+文字标签，别画烂SVG。没数据就写`<!-- 等用户提供真实数据 -->`，别编造看起来像数据的假数据。**Hi-fi里，一个诚实的placeholder比一个拙劣的真实尝试好10倍**。

### 4. 系统优先，不要填充

**Don't add filler content**。每个元素都必须earn its place。空白是设计问题，用构图解决，不是靠编造内容填满。**One thousand no's for every yes**。尤其警惕：
- 「data slop」——没用的数字、图标、stats装饰
- 「iconography slop」——每个标题都配icon
- 「gradient slop」——所有背景都渐变

### 5. 反AI slop（重要，必读）

#### 5.1 什么是 AI slop？为什么要反？

**AI slop = AI 训练语料里最常见的"视觉最大公约数"**。
紫渐变、emoji 图标、圆角卡片+左 border accent、SVG 画人脸——这些东西之所以是 slop，不是因为它们本身丑，而是因为**它们是 AI 默认模式下的产物，不携带任何品牌信息**。

**规避 slop 的逻辑链**：
1. 用户请你做设计，是要**他的品牌被认出来**
2. AI 默认产出 = 训练语料的平均 = 所有品牌混合 = **没有任何品牌被认出来**
3. 所以 AI 默认产出 = 帮用户把品牌稀释成"又一个 AI 做的页面"
4. 反 slop 不是审美洁癖，是**替用户保护品牌识别度**

这也是为什么 §1.a 品牌资产协议是 v1 最硬的约束——**服从规范是反 slop 的正向方式**（对的事），清单只是反 slop 的反向方式（不做错的事）。

#### 5.2 核心要规避的（带"为什么"）

| 元素 | 为什么是 slop | 什么情况可以用 |
|------|-------------|---------------|
| 激进紫色渐变 | AI 训练语料里"科技感"的万能公式，出现在 SaaS/AI/web3 每一个落地页 | 品牌本身用紫渐变（如 Linear 某些场景）、或任务就是讽刺/展示这类 slop |
| Emoji 作图标 | 训练语料里每个 bullet 都配 emoji，是"不够专业就用 emoji 凑"的病 | 品牌本身用（如 Notion），或产品受众是儿童/轻松场景 |
| 圆角卡片 + 左彩色 border accent | 2020-2024 Material/Tailwind 时期的烂大街组合，已成视觉噪音 | 用户明确要求、或这个组合在品牌 spec 里被保留 |
| SVG 画 imagery（人脸/场景/物品）| AI 画的 SVG 人物永远五官错位，比例诡异 | **几乎没有**——有图就用真图（Wikimedia/Unsplash/AI 生成），没图就留诚实 placeholder |
| **CSS 剪影/SVG 手画代替真实产品图** | 生成的就是「通用科技动画」——黑底+橙 accent+圆角长条，任何实体产品都长一样，品牌识别度归零（DJI Pocket 4 实测 2026-04-20）| **几乎没有**——先走核心资产协议找真实产品图；真没有时用 nano-banana-pro 以官方参考图为基底生成；实在不行标诚实 placeholder 告诉用户"产品图待补" |
| Inter/Roboto/Arial/system fonts 作 display | 太常见，读者看不出这是"有设计的产品"还是"demo 页" | 品牌 spec 明确用这些字体（Stripe 用 Sohne/Inter 变体，但是经过微调的） |
| 赛博霓虹 / 深蓝底 `#0D1117` | GitHub dark mode 美学的烂大街复制 | 开发者工具产品且品牌本身走这方向 |

**判断边界**：「品牌本身用」是唯一能合法破例的理由。品牌 spec 里明写了用紫渐变，那就用——此时它不再是 slop，是品牌签名。

#### 5.3 正向做什么（带"为什么"）

- ✅ `text-wrap: pretty` + CSS Grid + 高级 CSS：排版细节是 AI 分不清的"品味税"，会用这些的 agent 看起来像真设计师
- ✅ 用 `oklch()` 或 spec 里已有的色，**不凭空发明新颜色**：所有临场发明的色都会让品牌识别度下降
- ✅ 配图优先 AI 生成（Gemini / Flash / Lovart），HTML 截图仅在精确数据表格时用：AI 生成的图比 SVG 手画准确，比 HTML 截图有质感
- ✅ 文案用「」引号不用 ""：中文排印规范，也是"有审校过"的细节信号
- ✅ 一个细节做到 120%，其他做到 80%：品味 = 在合适的地方足够精致，不是均匀用力

#### 5.4 反例隔离（演示型内容）

当任务本身就要展示反设计（如本任务就是讲"什么是 AI slop"、或对比评测），**不要整页堆 slop**，而是用**诚实的 bad-sample 容器**隔离——加虚线边框 + "反例 · 不要这样做" 角标，让反例服务于叙事而不是污染页面主调。

这不是硬规则（不做成模板），是原则：**反例要看得出是反例，不是让页面真的变成 slop**。

完整清单见 `references/content-guidelines.md`。

## 通用设计锚点

没有 design context 时的默认取向，任何输出类型都适用。

### 1. 真实图片取用

需要图片时主动去取真实素材，不用 SVG 手画替代、不用空卡摆着、不等用户要求。常用渠道：

| 场景 | 首选渠道 |
|------|---------|
| 美术/博物馆/历史内容 | Wikimedia Commons（公共领域）、Met Museum Open Access、Art Institute of Chicago API |
| 通用生活/摄影 | Unsplash、Pexels（免版权） |
| 用户本地已有素材 | `~/Downloads`、项目 `_archive/` 或用户配置的素材库 |

Wikimedia 下载避坑（本机 curl 走代理 TLS 会炸，Python urllib 直接走得通）：

```python
# 合规 User-Agent 是硬性要求，否则 429
UA = 'ProjectName/0.1 (https://github.com/you; you@example.com)'
# 用 MediaWiki API 查真实 URL
api = 'https://commons.wikimedia.org/w/api.php'
# action=query&list=categorymembers 批量拿系列 / prop=imageinfo+iiurlwidth 取指定宽度 thumburl
```

涉及具体品牌的产品图、UI 截图时，走「核心资产协议」（§1.a）的五步硬流程。

**真图诚实性测试**：取图之前先问自己——「如果去掉这张图，信息是否有损？」

| 场景 | 判断 | 动作 |
|------|------|------|
| 与叙事无关的氛围图、纯装饰性背景 | 装饰，与内容无内在关联 | **不加** |
| 人物肖像、产品实物、地点照片、数据图表 | 内容本身，有内在关联 | 加 |
| 画面背景的极淡纹理 | 氛围，服从内容不抢戏 | 加，但 opacity ≤ 0.08 |

**反例**：给一页纯文字的幻灯片配 Unsplash「灵感图」、给与人物无关的镜头堆 stock photo 模特——取真图的许可不等于滥用真图的通行证。

### 2. 品位锚点（pursue list，fallback 首选）

| 维度 | 首选 | 避免 |
|------|------|------|
| **字体** | 衬线 display（Newsreader/Source Serif/EB Garamond）+ `-apple-system` body | 全场 SF Pro 或 Inter——太像系统默认，没风格 |
| **色彩** | 一个有温度的底色 + **单个** accent 贯穿全场（rust 橙/墨绿/深红）| 多色聚类（除非数据真的有 ≥3 个分类维度） |
| **信息密度·克制型**（默认）| 少一层容器、少一个 border、少一个**装饰性** icon——给内容留气口 | 每条卡片都配无意义的 icon + tag + status dot |
| **信息密度·高密度型**（例外）| 当叙事主题的核心卖点是「智能 / 数据 / 上下文感知」时（AI 工具、数据产品、SaaS、Copilot 类），每页需**至少 3 处可见的差异化信息**：非装饰性数据、对话/推理片段、状态推断、上下文关联 | 只放一个按钮一个时钟——智能感没表达出来，跟普通产品没区别 |
| **细节签名** | 留一处「值得截图」的质感：极淡油画底纹 / serif 斜体引语 / 全屏黑底录音波形 | 到处平均用力，结果处处平淡 |

**两条原则同时生效**：

1. 品位 = 一个细节做到 120%，其它做到 80%——不是所有地方都精致，而是在合适的地方足够精致
2. 减法是 fallback，不是普适律——叙事主题需要信息密度支撑时（AI / 数据 / 上下文感知类），加法优先于克制。信息密度按上表分型取值

## 设计方向顾问（Fallback 模式）

**什么时候触发**：
- 用户需求模糊（"做个好看的"、"帮我设计"、"这个怎么样"、"做个XX"没有具体参考）
- 用户明确要"推荐风格"、"给几个方向"、"选个哲学"、"想看不同风格"
- 项目和品牌没有任何 design context（既没有 design system，又找不到参考）
- 用户主动说"我也不知道要什么风格"

**什么时候 skip**：
- 用户已经给了明确的风格参考（Figma / 截图 / 品牌规范）→ 直接走「核心哲学 #1」主干流程
- 用户已经说清楚要什么（"做个 Apple Silicon 风格的发布会动画"）→ 直接进 Junior Designer 流程
- 小修小补、明确的工具调用（"帮我把这段 HTML 的配色改深一点"）→ skip

不确定就用最轻量版：**列出 3 个差异化方向让用户二选一，不展开不生成**——尊重用户节奏。

### 完整流程（8 个 Phase，顺序执行）

**Phase 1 · 深度理解需求**
提问（一次最多 3 个）：目标受众 / 核心信息 / 情感基调 / 输出格式。需求已清晰则跳过。

**Phase 2 · 顾问式重述**（100-200 字）
用自己的话重述本质需求、受众、场景、情感基调。以「基于这个理解，我为你准备了 3 个设计方向」结尾。

**Phase 3 · 推荐 3 套设计哲学**（必须差异化）

每个方向必须：
- **含设计师/机构名**（如「Kenya Hara 式东方极简」，不是只说「极简主义」）
- 50-100 字解释「为什么这个设计师适合你」
- 3-4 条标志性视觉特征 + 3-5 个气质关键词 + 可选代表作

**差异化规则**（必守）：3 个方向**必须来自 3 个不同流派**，形成明显视觉反差：

| 流派 | 视觉气质 | 适合作为 |
|------|---------|---------|
| 信息建筑派（01-04） | 理性、数据驱动、克制 | 安全/专业选择 |
| 运动诗学派（05-08） | 动感、沉浸、技术美学 | 大胆/前卫选择 |
| 极简主义派（09-12） | 秩序、留白、精致 | 安全/高端选择 |
| 实验先锋派（13-16） | 先锋、生成艺术、视觉冲击 | 大胆/创新选择 |
| 东方哲学派（17-20） | 温润、诗意、思辨 | 差异化/独特选择 |

❌ **禁止从同一流派推荐 2 个以上** — 差异化不够用户看不出区别。

详细 20 种风格库 + AI 提示词模板 → `references/design-styles.md`。

**Phase 4 · 展示预制 Showcase 画廊**

推荐 3 方向后，**立即检查** `assets/showcases/INDEX.md` 是否有匹配的预制样例（同一页数据 × 3 风格，用来看气质，不是用来做翻页 deck）：

| 场景 | 目录 |
|------|------|
| 风格气质参考 | `assets/showcases/ppt/` |

匹配话术：「在启动舞台 Demo 之前，先看看这 3 个风格的气质 →」然后 Read 对应 .png。

场景模板按输出类型组织 → `references/scene-templates.md`。

**Phase 5 · 生成 3 个视觉 Demo**

> 核心理念：**看到比说到更有效。** 别让用户凭文字想象，直接看。

为 3 个方向各生成一个 Demo——**如果当前 agent 支持 subagent 并行**，启动 3 个并行子任务（后台执行）；**不支持就串行生成**（先后做 3 次，同样能用）。两种路径都能工作：
- 使用**用户真实内容/主题**（不是 Lorem ipsum）
- HTML 存 `_temp/design-demos/demo-[风格].html`
- 截图：`npx playwright screenshot file:///path.html out.png --viewport-size=1200,900`
- 全部完成后一起展示 3 张截图

风格类型路径：
| 风格最佳路径 | Demo 生成方式 |
|-------------|--------------|
| HTML 型 | 生成完整 HTML → 截图 |
| AI 生成型 | `nano-banana-pro` 用风格 DNA + 内容描述 |
| 混合型 | HTML 布局 + AI 插画 |

**Phase 6 · 用户选择**：选一个深化 / 混合（"A 的配色 + C 的布局"）/ 微调 / 重来 → 回 Phase 3 重新推荐。

**Phase 7 · 生成 AI 提示词**
结构：`[设计哲学约束] + [内容描述] + [技术参数]`
- ✅ 用具体特征而非风格名（写「Kenya Hara 的留白感+赤土橙 #C04A1A」，不写「极简」）
- ✅ 包含颜色 HEX、比例、空间分配、输出规格
- ❌ 避开审美禁区（见反 AI slop）

**Phase 8 · 选定方向后进入主干**
方向确认 → 回到「核心哲学」+「工作流程」的 Junior Designer pass。这时已经有明确的 design context，不再是凭空做。

**真实素材优先原则**（涉及用户本人/产品时）：
1. 先查用户配置的**私有 memory 路径**下的 `personal-asset-index.json`（Claude Code 默认在 `~/.claude/memory/`；其他 agent 按其自身约定）
2. 首次使用：复制 `assets/personal-asset-index.example.json` 到上述私有路径，填入真实数据
3. 找不到就直接问用户要，不要编造——真实数据文件不要放在 skill 目录内避免随分发泄露隐私

## 工作流程

复制此清单跟踪。碰到 🛑 **说完「做了 X，下一步 Y，你确认吗？」然后真的等**。

1. **理解需求**：
   - 🔍 **0. 事实验证（涉及具体产品/技术时必做，优先级最高）**：任务涉及具体产品/技术/事件（DJI Pocket 4、Gemini 3 Pro、Nano Banana Pro、某新 SDK 等）时，**第一个动作**是 `WebSearch` 验证其存在性、发布状态、最新版本、关键规格。把事实写入 `product-facts.md`。详见「核心原则 #0」。**这步做在问 clarifying questions 之前**——事实错了问什么都歪。
   - 新任务或模糊任务必须问clarifying questions，详见 `references/workflow.md`。一次 focused 一轮问题通常够，小修小补跳过。
   - 🛑 **检查点1：问题清单一次性发给用户，等用户批量答完再往下走**。不要边问边做。默认问：现场跟讲还是自动播放、空格推进还是整段跑、有无品牌资产、投屏距离、要不要叠关键词（推荐只要关键词，不要整句字幕）。
   - 用户说「做 PPT / deck / 翻页」→ 劝回连续运动舞台，不要调用 `deck_index.html`。
   - ⚡ **如果用户需求严重模糊（没参考、没明确风格、"做个好看的"类）→ 走「设计方向顾问（Fallback 模式）」大节，完成 Phase 1-4 选定方向后，再回到这里 Step 2**。
2. **探索资源 + 抽核心资产**（不只是抽色值）：读 design system、linked files、上传的截图/代码。**涉及具体品牌时必走 §1.a「核心资产协议」五步**（问→按类型搜→按类型下载 logo/产品图/UI→验证+提取→写 `brand-spec.md` 含所有资产路径）。
   - 🛑 **检查点2·资产自检**：开工前确认核心资产到位——实体产品要有产品图（不是 CSS 剪影）、数字产品要有 logo+UI 截图、色值从真实 HTML/SVG 抽取。缺了就停下补，不硬做。
   - 如果用户没给 context 且挖不出资产，先走设计方向顾问 Fallback，再按上文「通用设计锚点 · 品位锚点」兜底。
3. **先答铁律三问 + 位置四问，再规划系统**：**这一步的前半段比所有 CSS 规则更决定输出**。完整规则读 `references/voiceover-pipeline.md`。

   铁律三问（答不上不许写代码）：
   1. **hero 是什么？** 全片 1–2 个贯穿元素，不是每段一个新图标。
   2. **它跨每一段怎么 morph？** 位置 / 大小 / 形态表，一段一行。
   3. **任意一帧有运动吗？** 呼吸、漂移、或过程在走。完全静止 = PPT。

   📐 **位置四问**（每一段开工前必答，每段可以不同）：
   - **叙事角色**：钩子 / 过渡 / 反转 / 过程 / 爆发 / 结尾？
   - **观众距离**：1m 笔记本 / 10m 投屏？（决定字号和信息密度；默认按 10m 投屏）
   - **视觉温度**：安静 / 兴奋 / 冷静 / 权威 / 温柔 / 悲伤？（决定配色和节奏）
   - **容量估算**：这一拍画面塞得下吗？（防溢出 / 防挤压）

   四问答完再 vocalize 设计系统（色彩/字型/layout 节奏/component pattern）——**系统要服务于答案，不是先选系统再塞内容**。

   🛑 **检查点3：铁律三问 + 四问答案 + 系统口头说出来等用户点头，再动手写代码**。方向错了晚改比早改贵 100 倍。
4. **建项目目录**（不要散落到 Downloads）：

```
<talk-name>/
├── script.md
├── timeline.json          # script-to-timeline 生成
└── <Talk Name>.html       # 描述性文件名；单文件双击即开
```

5. **Junior pass**：HTML 顶部注释写 assumptions；舞台上先放灰块 + 段名 + hero 占位。
   🛑 **检查点4：尽早 show 给用户（哪怕只是灰色方块+标签），等反馈再写组件**。
6. **写执行脚本 + 编时间轴 + Full pass**：旁白、讲稿、概念讲解，**先写 `script.md`，再写 HTML**。不要先做画面再补词，也不要导出视频。
   - **执行脚本**（`script.md`）：`## scene-id` 分段，`[[cue:xx]]` 标画面拍点。这是内容的源代码。
   - **编时间轴**：`node scripts/script-to-timeline.mjs --script script.md --out timeline.json --pace speaker`（现场空格推进；HTML 自动播放才用 `--pace speech`）
   - **写舞台 HTML**：把 `assets/narration_stage.jsx` **全文内联**进 `<script type="text/babel">`，默认 `mode="speaker"`。hero 放在 `<NarrationStage>` 子级，不进 `<Scene>`。现场不要叠整句 `<Subtitles />`。禁止 `<script src="…jsx">`（`file://` 会 CORS 黑屏）。
   - **失败模式 #1**：每个 Scene 独立 layout + cue fade-up + 整页 opacity 切换 = **带旁白的 PowerPoint** = 质感归零。见 `references/voiceover-pipeline.md` 「铁律」。
   - **交付**：同级放 `script.md` + 主 HTML（timeline 可内联进 HTML，或另存 `timeline.json` 方便改词）。
7. **验证（可选）**：只有用户明确要求验证时，才用 Playwright 截图、检查控制台错误并发给用户；默认跳过验证，直接交付产物。现场路径自己空格跟讲一遍：左右键可回退；随机一帧不能完全静止。投屏字号：正文 ≥ 28px，标题 60–120px。
   🛑 **检查点5（可选）**：只有用户明确要求时，才在交付前肉眼过一遍浏览器。AI写的代码经常有 interaction bug。
8. **总结**：极简，只说caveats和next steps。
9. **（可选）专家评审**：用户若提「评审」「好不好看」「review」「打分」，或你对产出有疑问想主动质检，按 `references/critique-guide.md` 走 5 维度评审——哲学一致性 / 视觉层级 / 细节执行 / 功能性 / 创新性各 0-10 分，输出总评 + Keep（做得好的）+ Fix（严重程度 ⚠️致命 / ⚡重要 / 💡优化）+ Quick Wins（5 分钟能做的前 3 件事）。评审设计不评设计师。

**检查点原则**：碰到🛑就停下，明确告诉用户"我做了X，下一步打算Y，你确认吗？"然后真的**等**。不要说完自己就开始做。

### 问问题的要点

必问（用`references/workflow.md`里的模板）：
- 现场投屏跟讲，还是 HTML 自动播放？（默认现场、空格下一 cue）
- 品牌规范/设计系统/Logo 或产品图有吗？没有的话先去找
- 观众在什么距离看？（默认 10m 投屏）
- 有没有必须出现的关键画面或必讲内容？
- 画面上要不要叠关键词？（推荐只要关键词，不要整句字幕抢讲者）

## 异常处理

流程假设用户配合、环境正常。实操常遇以下异常，预定义fallback：

| 场景 | 触发条件 | 处理动作 |
|------|---------|---------|
| 需求模糊到无法着手 | 用户只给一句模糊描述（如"做个好看的讲解动画"） | 主动列3个差异化视觉方向让用户选，而不是直接问10个问题；不要默认做成翻页 deck |
| 用户拒绝回答问题清单 | 用户说"不要问了，直接做" | 尊重节奏，用best judgment做1个主方案+1个差异明显的备选方向，交付时**明确标注assumption**，方便用户定位要改哪里 |
| Design context矛盾 | 用户给的参考图和品牌规范打架 | 停下，指出具体矛盾（"截图里字体是衬线，规范说用sans"），让用户选一个 |
| Starter component加载失败 | 控制台404/integrity mismatch | 先查`references/react-setup.md`常见报错表；还不行降级纯HTML+CSS不用React，保证产出可用 |
| 时间紧迫要快交付 | 用户说"30分钟内要" | 跳过Junior pass直接Full pass，只做1个方案，交付时**明确标注"未经early validation"**，提醒用户质量可能打折 |
| SKILL.md体积超限 | 新写HTML>1000行 | 按`references/react-setup.md`的拆分策略拆成多jsx文件，末尾`Object.assign(window,...)`共享 |
| 克制原则 vs 叙事所需密度冲突 | 叙事主题的核心卖点是 AI 智能 / 数据 / 上下文感知（如 AI agent、Copilot、数据产品、SaaS）| 按「通用设计锚点 · 品位锚点」表格走**高密度型**信息密度：每页 ≥ 3 处差异化信息。装饰性 icon 照样忌讳——加的是**有内容的**密度，不是装饰 |

**原则**：异常时**先告诉用户发生了什么**（1句话），再按表处理。不要静默决策。

## 反AI slop速查

| 类别 | 避免 | 采用 |
|------|------|------|
| 字体 | Inter/Roboto/Arial/系统字体 | 有特点的display+body配对 |
| 色彩 | 紫色渐变、凭空新颜色 | 品牌色/oklch定义的和谐色 |
| 容器 | 圆角+左border accent | 诚实的边界/分隔 |
| 图像 | SVG画人画物 | 真实素材或placeholder |
| 图标 | **装饰性** icon 每处都配（撞 slop）| **承载差异化信息**的密度元素必须保留——不要把产品特色也一并减掉 |
| 填充 | 编造stats/quotes装饰 | 留白，或问用户要真内容 |
| 动画 | 散落的微交互 | 一次well-orchestrated的page load |
| 动画-伪chrome | 画面内画底部进度条/时间码/版权署名条（与 Stage scrubber 撞车） | 画面只放叙事内容，进度/时间交给 Stage chrome（详见 `references/animation-pitfalls.md`） |
| 动画-PowerPoint 切换 | 每个 scene 独立 layout + cue 用 fade-up + scene 切换整页 opacity 切换（= 带旁白的 PowerPoint）| **整片是一个连续的运动叙事**：选 1-2 个 hero element 跨 scene 持续存在，每段是 hero 的状态变化（位置/大小/形态），scene 之间 morph 不切（详见 `references/voiceover-pipeline.md` 「铁律」）|

## 技术红线（必读 references/react-setup.md）

**React+Babel项目**必须用pinned版本（见`react-setup.md`）。三条不可违反：

1. **never** 写 `const styles = {...}`——多组件时命名冲突会炸。**必须**给唯一名字：`const terminalStyles = {...}`
2. **scope不共享**：多个`<script type="text/babel">`之间组件不通，必须用`Object.assign(window, {...})`导出
3. **never** 用 `scrollIntoView`——会搞坏容器滚动，用其他DOM scroll方法

**固定尺寸内容**（1920×1080 舞台）必须自己实现JS缩放，用auto-scale + letterboxing。

## Starter Components（assets/下）

造好的起手组件，直接copy进项目使用：

| 文件 | 何时用 | 提供 |
|------|--------|------|
| `narration_stage.jsx` | **本技能的默认且唯一交付形态** | NarrationStage + Scene + Cue + useNarration + useSceneFade（默认 `mode="speaker"`）。必须全文内联 |
| `animations.jsx` | 无旁白的短 motion 才用 | Stage + Sprite + useTime + Easing + interpolate。有讲稿时不要用这套替代 NarrationStage |

用法：读取对应 assets 文件内容 → **inline** 进你的 HTML `<script type="text/babel">` → slot 进你的设计。禁止 `src="….jsx"`。

## References路由表

根据任务类型深入读对应references：

| 任务 | 读 |
|------|-----|
| 开工前问问题、定方向 | `references/workflow.md` |
| 反AI slop、内容规范、投屏字号 | `references/content-guidelines.md` |
| React+Babel项目setup（pin + 内联） | `references/react-setup.md` |
| **执行脚本驱动的舞台**（旁白/讲稿 → script.md → HTML）| `references/voiceover-pipeline.md`（铁律：连续运动叙事、禁 PowerPoint 切换）+ `assets/narration_stage.jsx` + `scripts/script-to-timeline.mjs` |
| 做动画/motion（**先读 pitfalls**）| `references/animation-pitfalls.md` + `references/animations.md` + `assets/animations.jsx` |
| **动画的正向设计语法**（叙事/运动/节奏/表达风格）| `references/animation-best-practices.md` |
| 没有design context怎么办 | `references/design-context.md`（薄 fallback） 或 `references/design-styles.md`（厚 fallback：20 种设计哲学） |
| **需求模糊要推荐风格方向** | `references/design-styles.md` + `assets/showcases/INDEX.md`（3 个风格气质样例） |
| 用户明确要求验证 | `references/verification.md` + `scripts/verify.py` |
| **设计评审/打分**（设计完成后可选） | `references/critique-guide.md` |

## 跨 Agent 环境适配说明

本 skill 设计为 **agent-agnostic**——Claude Code、Codex、Cursor、Trae、OpenClaw、Hermes Agent 或任何支持 markdown-based skill 的 agent 都可以使用。以下是和原生「设计型 IDE」（如 Claude.ai Artifacts）对比时的通用差异处理方式：

- **没有内置的 fork-verifier agent**：用 `scripts/verify.py`（Playwright 封装）人工驱动验证
- **没有 asset 注册到 review pane**：直接用 agent 的 Write 能力写文件，用户在自己的浏览器/IDE 里打开
- **没有 `window.claude.complete` 免配置 helper**：若 HTML 里要调 LLM，用一个可复用的 mock 或让用户填自己的 API key，详见 `references/react-setup.md`
- **没有结构化问题 UI**：在对话里用 markdown 清单问问题，参考 `references/workflow.md` 的模板

Skill 路径引用均采用**相对本 skill 根目录**的形式（`references/xxx.md`、`assets/xxx.jsx`、`scripts/xxx.mjs`）——agent 或用户按自身安装位置解析，不依赖任何绝对路径。

## 产出要求

**只交这两样**（缺一不可的是 HTML；有旁白/讲稿/分镜时必须同时交执行脚本）：

- **HTML 页代码**：描述性文件名，如 `什么是 token.html`、`Neural Network 舞台.html`
- **执行脚本** `script.md`：scene + cue，描述每段讲什么、画面何时变

其他：
- 大改版时 copy 一份旧版保留：`My Design.html` → `My Design v2.html`
- 避免>1000行的大文件，拆成多个 JSX 文件 import 进主文件
- 固定尺寸内容的**播放位置**存 localStorage——刷新不丢
- HTML 放项目目录，不要散落到 `~/Downloads`
- 用户明确要求验证时，用浏览器打开检查或用 Playwright 截图；默认直接交付产物。**不要**导出 MP4 / GIF
- 默认**不加**技能水印（HTML 是用户自己讲/演示用的）

## 核心提醒

- **事实验证先于假设**（核心原则 #0）：涉及具体产品/技术/事件（DJI Pocket 4、Gemini 3 Pro 等）必须先 `WebSearch` 验证存在性和状态，不凭训练语料断言。
- **Embody专家**：做知识讲解舞台时是 motion designer，不是做翻页 PPT 的人。
- **Junior先show，再做**：先展示思路，再执行。
- **需求模糊先给方向**：给 3 个差异化方向让用户选，选定后再进主干流程。
- **Placeholder优于烂实现**：诚实留白，不编造。
- **反AI slop时时警醒**：每个渐变/emoji/圆角border accent之前先问——这真的必要吗？
- **涉及具体品牌**：走「核心资产协议」（§1.a）——Logo（必需）+ 产品图（实体产品必需）+ UI 截图（数字产品必需），色值只是辅助。**不要用 CSS 剪影代替真实产品图**。
- **做动画之前**：必读 `references/animation-pitfalls.md`——规则都来自真实踩过的坑，跳过会让你重做 1-3 轮。
- **手写 Stage / Sprite**（不用 `assets/animations.jsx`）：`render(t)` 尽量是纯函数；暴露 `window.__seek(t)` 方便调试回退。不要为「录视频」单独加一套状态机。
- **执行脚本驱动的舞台**：**整片是一个连续的运动叙事，不是一组独立场景**。选 1-2 个 hero element 跨 scene 持续存在，scene 之间 morph 不切。每个 Scene 各自独立 layout + cue 用 fade-up + 整页 opacity 切换 = 带旁白的 PowerPoint = 质感归零。完整规则见 `references/voiceover-pipeline.md` 「铁律」。这条规则**强调多少遍都不为过**。
