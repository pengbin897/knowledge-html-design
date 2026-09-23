---
name: knowledge-html-design
description: 把「明确主题 + 完整口播稿/讲稿」做成 1920×1080 HTML 陈述 deck（每页独立 HTML + deck_index 键盘翻页）。适用于用户已有论述文字、要做演讲 PPT/课件/知识讲解幻灯片、且没有品牌/图片素材的场景。不要用于需求模糊的品牌定位、风格三选一、连续运动舞台、Launch Film、App 原型、TTS 或导出视频。
---

# Knowledge HTML Design

你是用 HTML 工作的设计师。用户给**主题 + 口播稿**，你产出能投屏演讲的 **1920×1080 陈述 deck**。

画面从论述里长出来：字号层级、对比、流程、定义拆解。不向外搜 logo、产品图、Unsplash，不做风格三选一。

## 适用 / 不适用

**才开工（缺一不可）**：
- 有明确主题
- 有比较完整的口播稿 / 讲稿 / 论述文字

**缺讲稿时**：只回一句——请给主题和口播稿。不要补问受众/哲学/品牌，不要编讲稿当设计顾问。

**不要用本技能**：
- 无讲稿的发散定位、品牌分析、VI、「推荐 3 个风格」
- App / 落地页 / 信息图 / Launch Film / 连续运动舞台
- 可编辑 PPTX、TTS 成片、导出 MP4 / GIF

用户说「PPT / deck / 幻灯片」→ 就是本技能正轨，做成 HTML 翻页 deck。

用户要 PPTX / 视频 / 配音时：仍交付可全屏演讲的 HTML，一句话说明其他格式需另转。

## 产物（不要再往外长）

```
<talk-name>/
├── script.md              # 口播稿按页拆开（每页一句主张 + 要讲的话）
├── index.html             # 从 assets/deck_index.html 复制，改 MANIFEST
├── shared/tokens.css      # 默认视觉语法
└── slides/
    ├── 01-cover.html
    └── ...
```

1. **HTML deck**：浏览器打开 `index.html`，键盘翻页、全屏投屏
2. **`script.md`**：口播稿的分页源代码，和 slides 一一对应

## 默认视觉语法（写死，不开工前选流派）

没有品牌、没有参考图时，**一律用这套**，先口头说一遍再动手。用户嫌气质不对，交付后再改 `tokens.css`。

| 维度 | 取值 |
|------|------|
| 画布 | 1920×1080，`px` 单位，不要 `vw`/`vh` |
| 字体 | Display：Newsreader + Noto Serif SC；正文：`-apple-system, "PingFang SC"` |
| 色彩 | 暖底 `#FAF7F2` + 墨色 `#1C1917` + **单个** accent `#C04A1A` |
| 字号 | 正文 ≥ 28px（最小 24px）；标题 60–120px；金句/封面可到 160–220px |
| 密度 | 默认克制：每页 1 个核心信息。主题本身是「智能 / 数据 / 上下文」时，内容页至少 3 处有意义的差异信息（不是装饰 icon） |
| 签名 | 全场只留一处值得截图的细节（极淡纸纹 / 衬线斜体金句 / 一条 rust 竖线），不要处处用力 |

CSS 变量落在 `shared/tokens.css`。深浅变化用同色相 `oklch` 插值，不要另起一套色。

## 没有图时画面怎么来

- **不搜、不配装饰图、不用 SVG 画人画物。**
- 口播稿里的结构关系，用排版和图解表达：定义拆开、A vs B、流程三步、层级、一句金句铺满。
- 几何 SVG / CSS 图解可以：对比条、步骤轴、二分、层级。那是论述的视觉翻译，不是插画。
- 稿里出现的真数据才上数字；没有数字就不要 metric card。
- 需要实物/界面时：灰块 + 文字标签（「示意图位」），等用户以后补。

## 核心原则

### 0. 事实验证（只核稿内断言）

口播稿里出现具体产品 / 技术 / 版本 / 数据时，先 `WebSearch` 核对**这句话**，不要凭训练语料改稿。搜不到就按原稿排版，并在交付时标注「未核验」。

稿子里出现公司名 **不等于** 要去采 logo。只当论述对象，用文字和结构表达。

### 1. Junior Designer：先展示假设，再执行

不要闷头做完全部页。HTML 头部写 assumptions；先做 2 页定 grammar，show 用户，再批量。理解错了早改比晚改便宜。

### 2. Placeholder > 烂实现

没图就灰块+标签。没数据就空着或拆掉该页。不要编造看起来像数据的假数字、假引用。

### 3. 反 AI slop（为论述清晰，不为品牌识别）

避免：紫渐变、emoji 当图标、圆角卡片+左彩色 border、Inter/Roboto 做标题、每条都配装饰 icon、编造 stats。完整清单 → `references/content-guidelines.md`。

## 工作流程

复制此清单跟踪。碰到 🛑 **说完「做了 X，下一步 Y，你确认吗？」然后真的等**。

1. **门禁**
   - 没有主题或没有比较完整的口播稿 → 停，只要这两样。
   - 用户要风格探索 / 品牌定位 / 「做个好看的」但没有讲稿 → 超出范围，不要进入顾问模式。
   - 口播稿里有事实性断言 → 先核稿，再拆页。

2. **拆论述 → 页大纲**
   - 读口播稿，抽出主张链：钩子 → 分论点 / 例证 → 收束。
   - 一页一意。一句金句、一个对比、一个定义、一个流程，各占一页。
   - 写成 `script.md`：`## 01-cover` 这种与文件名对应的节，节下是这一页要讲的原话（可略压缩，不编新论点）。
   - 可选问一句：投屏距离？（默认 10m）。不要问品牌规范、logo、参考图。

3. **🛑 检查点：页大纲 + 默认视觉语法**
   - 列出每页标题 / 页类型（封面、问题、主张、拆解、收束）+ 上面那套 tokens。
   - 等用户点头再写页面。方向错了晚改贵。

4. **Junior：2 页定 grammar**（deck ≥ 5 页时必做）
   - 先做封面 + 一张结构差异最大的内容页（例如大字问题页，或对比拆解页）。
   - 复制 `assets/deck_index.html` 为 `index.html`，建 `shared/tokens.css`。
   - 🛑 把这两页给用户看，等反馈再批量。

5. **批量其余页**
   - 复用同一套 tokens 和页眉页脚，换 layout 不换系统。
   - 一个 deck 里 4–5 种 layout 足够：封面 / 章节封 / 主张大字 / 对比或流程 / 收束。
   - 不要每页都长得像同一张 PPT 模板，也不要每页都换一套色。

6. **聚合交付**
   - 填好 `DECK_MANIFEST`（label 从 1 起，人类可读）。
   - 每页可单独双击打开；`index.html` 全屏可翻页即完成。
   - 不要导出视频，不要 TTS。

7. **验证（可选）**：仅当用户明确要求时，用浏览器走一遍或 `python scripts/verify.py`。默认直接交付。

8. **总结**：极简，只说 caveats 和 next steps（哪页是 placeholder、哪句事实未核验）。

**检查点原则**：碰到 🛑 就停下，明确告诉用户「我做了 X，下一步打算 Y，你确认吗？」然后真的等。

## 异常处理

| 场景 | 动作 |
|------|------|
| 只有一句主题、没有讲稿 | 停，只要口播稿。不编稿、不推风格 |
| 用户要推荐风格 / 品牌定位 | 超出范围，说明本技能只做「稿 → 陈述 deck」 |
| 用户说「不要问了，直接做」 | 用默认语法 + 你拆的页大纲做，交付时标注 assumption |
| 稿与常识/检索冲突 | 指出具体句子，按检索结果改画面上的事实；不改用户没让改的论点结构 |
| 时间紧 | 跳过 2 页 showcase，直接批量，交付时标明未经 early validation |
| 用户坚持要运动舞台 / 成片 | 说明本技能只交 HTML deck；不要回去做 NarrationStage / ffmpeg |

## 技术约定

- **默认每页纯 HTML + CSS。** 只有单页确实需要组件态才用 React，并遵守 `references/react-setup.md`（pinned 版本、styles 唯一命名、禁止 `scrollIntoView`）。
- 画布锁在 `shared/tokens.css` 的 `body { width: 1920px; height: 1080px; }`。缩放由 `index.html` 做 letterbox。
- 禁止 `src="….jsx"` 外链未内联的 Babel 文件导致 `file://` CORS 黑屏。
- 单页 >1000 行再拆；陈述页通常远小于此。

## Starter

| 文件 | 何时用 |
|------|--------|
| `assets/deck_index.html` | **唯一起手件**。复制为项目 `index.html`，改 `DECK_MANIFEST` |

正例：`demos/statement-deck/`（口播稿 → 5 页陈述 deck）。

## References

| 任务 | 读 |
|------|-----|
| 拆页、2 页 showcase、Junior 检查点 | `references/workflow.md` |
| 多文件架构、layout、字号、MANIFEST | `references/slide-decks.md` |
| 反 slop、禁止编数据、投屏字号 | `references/content-guidelines.md` |
| 某页必须用 React 时 | `references/react-setup.md` |
| 用户明确要求验证时 | `references/verification.md` + `scripts/verify.py` |

## 产出要求

- 描述性目录名，如 `什么是 token/`
- 大改版时 copy 旧版：`slides/03-reveal.html` → `slides/03-reveal-v2.html` 或整目录 `v2/`
- HTML 放项目目录，不要散落到 `~/Downloads`
- 默认不加技能水印
- 播放位置由 `deck_index` 写入 localStorage，刷新不丢

## 核心提醒

- 没有讲稿就不开工。
- 不搜品牌、不推荐 20 种哲学、不劝去做连续运动舞台。
- 一页一意；几何图解可以，装饰图不行。
- 先 2 页 grammar，再批量。
- 每个渐变 / emoji / 圆角左 border 之前先问：这页的主张需要它吗？
