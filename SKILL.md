---
name: knowledge-html-design
description: HTML PPT Studio — 按「主题 / 版式 / 部件 / 动效」四维框架与标准化流水线，把完整文案制作成专业的动效 HTML 演示文稿。当用户需要演示文稿、PPT、幻灯片、keynote、deck、slideshow、「幻灯片」、「演讲稿」、「做一份 PPT」、「做一份 slides」、reveal 风格的 HTML 演示、小红书图文、口播视频配套画面，或任何需要美观且支持键盘翻页的多页路演/报告/分享文档时使用。触发词包括 "presentation"、"ppt"、"slides"、"deck"、"keynote"、"reveal"、"slideshow"、"幻灯片"、"演讲稿"、"分享稿"、"小红书图文"、"talk slides"、"pitch deck"、"tech sharing"、"technical presentation"。
---

# 任务

根据完整的口播稿 / 演讲稿 / 视频脚本，制作专业的动效 HTML 演示文稿（deck）。内容定位：知识讲解 / 技术分享 / 产品介绍 / 行业分析 / 市场研究 / 观点解析。

---

## 一、四维模型

每一页 deck = 在 **Theme** 的约束下，用 **Layout** 划分空间，放入 **Component** 表达信息，由 **Animation** 编排出现的时序。

| 维度 | 回答的问题 | 作用范围 | 何时决定 | 规范文档 |
|---|---|---|---|---|
| **Theme** 主题 | 整份 deck 看起来像什么 | 全 deck，恒定 | S1 定调 | `references/themes.md` |
| **Layout** 版式 | 这一页的空间怎么分 | 单页 | S3 分镜 | `references/layouts.md` |
| **Component** 部件 | 用什么视觉单元表达这条信息 | 页内元素 | S3 分镜 | `references/components.md` |
| **Animation** 动效 | 元素何时、以何种方式出现与变化 | 时间轴 | S3 分镜 | `references/animations.md` |

四个维度相互独立：换主题不必改版式；同一版式可以放不同部件；同一部件可以配不同动效。决策顺序固定为 **theme → layout → component → animation**。

四份规范文档结构相同：

| 章节 | 约束力 | 内容 |
|---|---|---|
| §1 定义 | — | 这个维度管什么、不管什么 |
| §2 规范 | **MUST** | token 契约、画布与安全区、部件构成、动效纪律——任何页面都必须满足 |
| §3 决策 | **SHOULD** | 「内容特征 → 推荐选项」速查表，快速做出八十分的选择；有更好的理由可以偏离，但要在分镜中写明 |
| §4 示例 | **MAY** | 指向真实实现的索引，用来建立具象的质量目标 |
| §5 自创 | — | 没有合适示例时，如何在规范内新建 |

---

## 二、资源库是参照系，不是零件箱

资源库里的主题、版式、部件、动效，作用是**让你看清「做成什么样算好」**，并帮助你快速做决策——而不是一套只能从中挑选拼装的积木。

**规范是硬的，示例是软的。** 任何页面都必须满足 §2 规范；至于长什么样，示例给方向，内容说了算。

使用示例有三种距离，在分镜表中逐页标注：

| 距离 | 何时 | 怎么做 |
|---|---|---|
| **adopt 沿用** | 示例与内容高度吻合 | 复制结构，替换全部内容；数量、文案长度可调 |
| **adapt 改编** | 部分吻合 | 保留示例的骨架与质感，改变部件的组合、数量或方向 |
| **author 自创** | 没有吻合的示例 | 按规范新建，以最接近的示例作为质量标杆；登记到分镜的「自创记录」 |

参照一个示例时：

- **可以变**：内容、数量、方向、组合、具体选用的动效；
- **不能变**：规范层的一切——token、画布与安全区、字号档位、部件构成、动效纪律。

两类反模式都要避免：

| 积木式（过度依赖示例） | 脱缰式（脱离参照） |
|---|---|
| 为了套示例削足适履：5 条内容硬塞进 3 栏 | 绕过 token 硬编码颜色、字号 |
| 残留示例的文案、数据或装饰 | 每页一套视觉语言，没有重复与统一 |
| 为了「丰富」每页换一种版式 | 堆砌没有信息量的装饰 |
| 示例有什么动效就照搬什么 | 动效方向与内容语义相反 |

---

## 三、制作流水线

七个阶段，每个阶段有固定产物和通过条件。**S3 分镜是决策冻结点**：四个维度的决策全部落在分镜表上之后，才开始写 HTML。完整说明见 `references/pipeline.md`。

| 阶段 | 做什么 | 产物 | 通过条件 |
|---|---|---|---|
| **S0 理解** | 明确主题、受众、时长、交付形态、画布、主张 | `storyboard.md` 的 Brief | 6 项齐全，主张只有一句话 |
| **S1 定调** | 选择或派生主题，确定语义色用途 | Brief 中的 Theme / 语义色 | 主题满足 token 契约 |
| **S2 拆稿** | 把文案切成 beat，标注 intent，提取数据，切页 | `script.md` | 每个 beat 有 intent 和归属页 |
| **S3 分镜** | 逐页决定 layout / components / animation / 时长 / 参照 | `storyboard.md` 分镜表 | 每页一个 claim；每行有参照或标 author |
| **S4 实现** | 按分镜逐页写 HTML | `index.html` | 能完整翻页，控制台无报错 |
| **S5 自检** | 按清单逐页检查 | 分镜表 ✓ 列 | 自检清单全部通过 |
| **S6 导出** | 导出 PNG（可选） | `index-png/` | — |

起步：

```bash
./scripts/new-deck.sh <talk-name>
# 生成 output/<talk-name>/index.html、script.md、storyboard.md
```

5 页以内的短 deck 可以跳过 `script.md`，把 beat 直接写进分镜表；其他阶段不能省。

---

## 四、快速决策

以下是各维度 §3 决策表的摘要，完整版见对应文档。

**交付形态**（S0，决定画布与节奏）

| 形态 | 画布 | 每页口播 | 屏上字数 |
|---|---|---|---|
| `talk` 现场演讲 | 16:9 | 30~90 s | ≤ 50 字 |
| `video` 录屏视频 | 16:9 / 9:16 | 4~12 s | ≤ 30 字 |
| `post` 图文轮播 | 3:4 | — | ≤ 80 字 |

**Theme**（S1）：按受众选——工程师 → `terminal-green`；高管 → `swiss-grid`；设计 / 产品 → `editorial-serif`；消费者 → `xiaohongshu-white`；发布会 → `aurora`；科普 → `hand-drawn`。

**Layout**（S3）：按页面 intent 选骨架——

| intent | 骨架 |
|---|---|
| `hook` `section` `claim` `quote` `cta` | `statement` |
| `evidence`（一个数 / 一张图） | `focus` |
| `evidence`（多个数）`enumerate` `recap` | `grid`（≤4）/ `stack`（>4） |
| `compare` | `split` |
| `sequence` `cause` | `flow` |
| `derive` | `stack` |
| `define` `caveat` | `hero-detail` |
| 代码、截图、产品图 | `media` |

**Component**（S3）：能用数据表达就不用图示，能用图示就不用文字。一个数 → stat；几个同级数 → kpi；占比 → ring / progress；量值比较 → bar；趋势 → chart；两方 → card×2 + vs；步骤 → node + connector；风险 / 前提 → alert；计算 → formula / ladder。

**Animation**（S3）：眉题 `fade-down` → 标题 `rise-in` → 主体 `fade-up` / `stagger-list` → 数字 `counter` → 线条 `path-draw`。单页入场动效 ≤ 2 种；canvas FX 只用于封面、章节、结尾。

---

## 五、设计原则

贯穿四个维度的四条原则：

1. **对比**：不同的元素要「非常不同」——明暗、冷暖、大小、粗细、形状要拉开差距，用强反差建立信息层级。避免只差一点的「微弱对比」。
2. **重复**：颜色、字体、部件样式、版式骨架在全 deck 中重复出现，让观众感知关联与统一。
3. **对齐**：每个元素都与其他元素建立视觉关联，用「看不见的线」串联页面，带来秩序感。
4. **亲密性**：相关元素就近成组，无关元素用留白分隔，用空间传递逻辑关系。

纯静态的文字页很难留住观众，要用动效让内容「活」起来；但动效必须与内容相匹配，不能生硬。

---

## 六、资源索引

| 资源 | 位置 | 说明 |
|---|---|---|
| 流水线 | `references/pipeline.md` | 各阶段动作、产物、通过条件、自检清单 |
| 流水线模板 | `templates/pipeline/` | `script.md`、`storyboard.md` |
| 主题 | `assets/themes/*.css` · `templates/theme-showcase.html` | 10 套基础主题 |
| 单页示例 | `templates/single-page/*.html` · `templates/layout-showcase.html` | 封面、时间线、清单 |
| 起点模板 | `templates/deck.html` | 6 页最小 deck：封面、卡片网格、大数字、双栏、CTA、致谢 |
| 通用部件 | `assets/base.css` | token、文字、卡片、胶囊、网格、页面 chrome |
| CSS 动效 | `assets/animations/animations.css` · `templates/animation-showcase.html` | 27 种 |
| canvas FX | `assets/animations/fx/*.js` · `assets/animations/fx-runtime.js` | 20 种，需在页面中引入 fx-runtime |
| 运行时 | `assets/runtime.js` | 键盘翻页、`#/N` 深链接、进入页重播动效、数字滚动、T 换主题、O 总览、S 演讲者视图 |

---

## 七、导出为 PNG（可选）

`scripts/render.sh` 调用无头 Chrome 截图，runtime 提供 `#/N` 深链接，脚本按 1..N 逐页截取。脚本内的 Chrome 路径为 macOS 路径（`/Applications/Google Chrome.app/...`），在其他系统上使用前需改为本机 Chrome 的路径。

```bash
./scripts/render.sh templates/single-page/cover.html            # 单页
./scripts/render.sh output/<talk-name>/index.html 8 out-dir     # 8 页，自定义输出目录
```
