# 分镜 · {{NAME}}

> 流水线 S0 / S1 / S3 / S5 的产物。规则见 `references/pipeline.md`。
> **先填完本表，再写 HTML。** 实现中改了决策，先回来改表。

## Brief（S0 理解 · S1 定调）

| 项 | 值 |
|---|---|
| 主题 | |
| 受众 | |
| 时长 | |
| 交付形态 | `talk` / `video` / `post` |
| 画布 | 16:9 / 9:16 / 3:4 |
| 主张 | （观众看完应记住的一句话） |
| Theme | （名称；来源：沿用 / 派生自 xxx） |
| 语义色 | `--good` = … ；`--warn` = … ；`--bad` = … |

## 分镜表（S3 分镜 · S5 自检）

| 页 | data-title | claim | beats | layout | components | animation | 参照 | 距离 | 时长 | ✓ |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | | | |
| 2 | | | | | | | | | | |

<!--
填写示例（完成后删除本注释）：

| 1 | Cover | 国产 AI 订阅不耐用不是错觉 | #1 | statement | kicker + h1(关键词 gradient-text) + pill×4 | kicker fade-down(.1s) → h1 blur-in(.3s) → pill stagger-list(1.0s) | sp:cover | adopt | 6s | |
| 2 | Workload | 同样一周，GPT Plus 干的活是 7 倍 | #2 | stack | c-bar×2（国产=accent，GPT=muted）+ c-delta「7×」 | h2 rise-in → bar#1 grow-x → bar#2 grow-x(+.4s) → delta zoom-pop | cs#13 | adopt | 5s | |
| 5 | Loop | 没名气→没用户→没数据→没模型，死循环 | #9–#13 | flow（闭环变体） | c-cycle(bad, n=5) + 中心「死循环」 | 环 path-draw(2s) + 节点 zoom-pop(间隔 .4s) → 中心 zoom-pop | cs#33 | adopt | 10s | |

layout：statement focus hero-detail grid split stack flow media，或自创名
距离：adopt（沿用）/ adapt（改编）/ author（自创）
参照记法：sp:<文件名>  deck#N  cs#N  base:<类名>  comp:<类名>
-->

## 自创记录

| 名称 | 维度 | 为什么没有合适的示例 | 遵循的规范要点 |
|---|---|---|---|
| | | | |

<!--
填写示例：
| c-funnel | component | 部件库没有「逐层收窄」的漏斗 | 构成 = N 层条带 + 层标签 + 转化率；只用 token；色调走 --tone |
| grow-y | animation | 库中只有横向生长 grow-x | 只动 transform；1.2s；ease-out；伪元素写 animation-delay:inherit |
-->
