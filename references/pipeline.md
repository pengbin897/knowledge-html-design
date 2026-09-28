# 制作流水线

七个阶段，每个阶段有固定的**输入、动作、产物、通过条件**。前一阶段没通过，不进入下一阶段。

```
S0 理解 ─→ S1 定调 ─→ S2 拆稿 ─→ S3 分镜 ─→ S4 实现 ─→ S5 自检 ─→ S6 导出
 Brief     Theme      script.md   storyboard.md  index.html   ✓ 列       PNG/PDF
                                  ▲ 决策冻结点
```

**S3 分镜是决策冻结点**：theme / layout / component / animation 四个维度的决策，全部先落在分镜表里，再开始写 HTML。实现阶段发现分镜有问题，**先改分镜表，再改代码**——分镜表始终是 deck 的真实说明书。

`./scripts/new-deck.sh <name>` 会生成 `output/<name>/` 下的 `index.html`、`script.md`、`storyboard.md` 三件套，流水线的全部产物都放在这里。

**轻量模式**：5 页以内的短 deck，可以跳过 `script.md`，把 beat 直接写进分镜表的 beats 列。其他阶段不能省。

---

## S0 理解 → Brief

**输入**：用户给的完整文案（口播稿 / 演讲稿 / 视频脚本）与任何补充要求。

**动作**：通读全文，回答下面 6 个问题，写进 `storyboard.md` 的 Brief 表。

| 项 | 问题 | 取值示例 |
|---|---|---|
| 主题 | 一句话讲清这份 deck 在说什么 | 「国产 AI 订阅不耐用的两层原因」 |
| 受众 | 谁在看，懂多少 | 开发者 / 高管 / 大众 |
| 时长 | 口播总时长（中文按 **4~5 字/秒** 估算） | 约 8 分钟 |
| 交付形态 | 见下表，决定节奏档位 | `talk` / `video` / `post` |
| 画布 | 由交付形态决定 | 16:9 / 9:16 / 3:4 |
| 主张 | 看完后观众应该记住的**一句话** | 「开源不是大方，是没得选」 |

### 交付形态 → 节奏档位

| 形态 | 场景 | 画布 | 每页口播时长 | 屏上字数上限 | 口播全文 |
|---|---|---|---|---|---|
| `talk` | 现场演讲 / 分享，手动翻页 | 16:9 | 30~90 s | 50 字 | 写进 `.notes` |
| `video` | 录屏成视频，节奏由口播驱动 | 16:9 或 9:16 | 4~12 s | 30 字 | 写进 `.notes`；屏上只留关键词 |
| `post` | 图文轮播（小红书等），无口播 | 3:4 | — | 80 字 | 每页须能独立读懂 |

> 用户没说明时：有「口播 / 视频 / 录制」字样 → `video`；有「演讲 / 分享 / 汇报」→ `talk`；有「小红书 / 图文」→ `post`。

**通过条件**：6 项全部填写；「主张」只有一句话。

---

## S1 定调 → Theme

**动作**：按 `references/themes.md` 的决策表选 theme，或按其「派生」规则新建。同时确定语义色的用途。

**产物**：Brief 表中的 `Theme`、`语义色`、`整套参照` 三行。

- **整套参照**：若 `templates/full-decks/` 中某套与本 deck 场景高度吻合，记下它。它将成为后续每一页的首选参照。
- **语义色**：`--good` / `--warn` / `--bad` 在本 deck 中分别代表什么。例：`--good` = 收入 / 优势；`--bad` = 成本 / 风险。**全 deck 不得改用途。**

**通过条件**：theme 满足 token 契约（见 `themes.md` §2）；语义色用途已写明。

---

## S2 拆稿 → script.md

**动作**：把文案切成 **beat**。一个 beat = 一个信息点 = 屏幕上的一次视觉增量。

每个 beat 记录：

| 字段 | 说明 |
|---|---|
| 口播原文 | 原文照抄，不改写 |
| intent | 这句话在论证里的作用，见下表 |
| 上屏 | 屏幕上真正要出现的文字 / 数字（从原文提炼，**远短于原文**） |
| 数据 | 数值、单位、对比基准、来源；没有写 `—` |
| 归属页 | 切页后填（P1、P2…） |

### intent 标签

| intent | 含义 | 常见句式 |
|---|---|---|
| `hook` | 开场抛问题 / 反常识 | 「你有没有觉得……」「为什么……」 |
| `section` | 章节切换 | 「第一个原因是……」「接下来」 |
| `define` | 定义概念 | 「所谓 X，就是……」 |
| `claim` | 亮出观点 / 结论 | 「答案是……」「本质上……」 |
| `evidence` | 用数据 / 事实支撑 | 「数据显示……」「一个月 2100 万」 |
| `compare` | 两者或多者对比 | 「A 是……而 B 是……」 |
| `enumerate` | 并列列举 | 「第一……第二……」「包括……」 |
| `sequence` | 步骤 / 时间顺序 | 「先……然后……最后」 |
| `cause` | 因果 / 连锁关系 | 「因为……所以……」「导致」 |
| `derive` | 推演 / 计算 | 「算下来……」「乘以……等于」 |
| `caveat` | 转折 / 限定 / 前提 | 「但是……」「前提是……」 |
| `quote` | 引用 / 金句 | 「正如 X 所说……」 |
| `recap` | 小结 | 「所以总结一下……」 |
| `cta` | 收尾号召 | 「关注……」「下期讲……」 |

### 切页规则

1. **一页一个 claim**：一页只推进一个观点。说不清这页的 claim，说明切错了。
2. **时长落在档位内**：按 S0 的节奏档位，beat 累计时长超出上限就切页。
3. **章节必切**：出现 `section` 就新起一页。
4. **同 intent 连续过多就切**：同一 intent 连续 5 个 beat 以上时切页。
5. **屏上字数不超限**：一页所有「上屏」文字加起来不超过档位上限。

**通过条件**：每个 beat 都有 intent；所有数据都已提取到「数据」列；每个 beat 都有归属页。

---

## S3 分镜 → storyboard.md

**动作**：逐页做四维决策，每页一行。决策顺序固定：

```
这页的 claim 和 intent  →  layout 骨架  →  每个区域放什么 component  →  animation 编排
```

| 列 | 填什么 | 依据 |
|---|---|---|
| 页 / data-title | 序号与短标题 | — |
| claim | 这页要讲清的一句话 | S2 |
| beats | 包含哪些 beat（#3–#5） | S2 |
| layout | 骨架名 + 画布变体 | `layouts.md` §3 决策表 |
| components | 各区域放的部件，含数量与色调 | `components.md` §3 决策表 |
| animation | 按时间顺序写的编排（记法见下） | `animations.md` §3 决策表 |
| 参照 | 最接近的示例（记法见下） | 各维度文档 §4 示例索引 |
| 距离 | `adopt` / `adapt` / `author` | SKILL.md 第二节 |
| 时长 | 本页口播秒数 | S2 |

### 参照记法

```
weekly-report#2        = templates/full-decks/weekly-report/index.html 第 2 页（浏览器打开时加 #/2）
sp:timeline            = templates/single-page/timeline.html
deck#3                 = templates/deck.html 第 3 页
base:.card-accent      = assets/base.css 中的现成部件
—                      = 无参照（仅当距离为 author 时允许）
```

### 动效编排记法

按时间顺序，用 `→` 连接；`+` 表示同时发生；括号里是时长或延迟：

```
kicker fade-down → h2 rise-in(+.3s) → kpi×4 stagger → 数值 counter(1.2s)
```

### 自创登记

距离为 `author` 的部件 / 版式 / 动效，在分镜底部的「自创记录」里登记一行：名称、维度、为什么没有合适的示例、遵循了哪些规范要点。同一 deck 内再次用到时，**复用同一实现**，不再另起。

**通过条件**：
- 每页有且只有一个 claim；
- 每页的四个维度都有决策，且每行都有参照或标注 `author`；
- 同一种 intent 的页，layout 保持一致（除非注明理由）；
- 全 deck 动效预算满足 `animations.md` §2.4。

---

## S4 实现 → index.html

**动作**：按分镜表逐页写 `<section class="slide">`。

- 打开参照示例（浏览器 + 源码），把它当作**质量标杆**，而不是剪贴源：
  - `adopt`：复制示例结构，替换全部内容，删掉示例残留文案；
  - `adapt`：保留示例的骨架与质感，按分镜调整部件的数量、组合、方向；
  - `author`：按各维度规范从零写，视觉质量对齐最接近的示例。
- 每页 `<section>` 带上 `data-title` 和 `data-layout="<骨架名>"`。
- 口播原文放进本页的 `<div class="notes">`。
- 页面级样式写在 `<head>` 里的一个 `<style>` 块，只引用 token。

**通过条件**：浏览器打开，`← →` 能走完全部页面，控制台无报错。

---

## S5 自检

逐页过一遍下列清单，全部通过后在分镜表的 ✓ 列打勾。

### 结构
- [ ] 每页有 `data-title`、`data-layout`、`.notes`
- [ ] 页数与分镜表一致
- [ ] 没有残留示例文案（如 `html-ppt`、`lewis`、示例数据）

### 规范
- [ ] 页面中没有硬编码的颜色值（`#xxx` / `rgb()`），全部是 `var(--token)`
- [ ] 字号只用档位内的值（`layouts.md` §2.4）
- [ ] 语义色用途与 Brief 一致，跨页没有变化

### 版面
- [ ] 在目标画布尺寸下（16:9 用 1920×1080 窗口）没有溢出或裁切
- [ ] 每页有且只有一个视觉焦点
- [ ] 屏上字数不超过节奏档位上限
- [ ] 内容没有侵入安全区外（9:16 尤其注意底部 30%）

### 动效
- [ ] 出现顺序 = 阅读顺序 = 因果顺序
- [ ] 所有入场动效用 `data-anim` 触发（翻到该页时会重播）
- [ ] 单页入场动效不超过 2 种；FX 只出现在封面 / 章节 / 结尾

### 溢出检查脚本

在浏览器控制台运行，列出有元素越出画布的页：

```js
[...document.querySelectorAll('.slide')].map((s, i) => {
  const R = s.getBoundingClientRect();
  const bad = [...s.querySelectorAll('*')].filter(e => {
    if (e.closest('.notes')) return false;
    const r = e.getBoundingClientRect();
    return r.width && (r.right > R.right + 1 || r.bottom > R.bottom + 1 || r.left < R.left - 1);
  });
  return bad.length ? `P${i + 1} ${s.dataset.title}: ${bad.length} 个元素越界` : null;
}).filter(Boolean);
```

---

## S6 导出（可选）

见 SKILL.md「导出」一节。导出前确认 S5 已全部通过。
