# 场景模板库：演示幻灯片与动画配图

> 与 design-styles.md 的「提示词DNA」组合使用。
> 公式：`[风格提示词DNA] + [场景模板] + [具体内容描述]`

---

## 1. 演示幻灯片（数据页 / 内容页）

**规格**：
- 标准：16:9（1920×1080px）
- 宽屏：16:10（1920×1200px）

**关键设计要素**：
- 每页一个核心信息（不堆砌）
- 字号层级明确（标题40pt+ / 正文24pt+ / 注释16pt+）
- 大量留白，投影时更清晰
- 图文比例至少 60:40
- 一致的视觉系统（颜色、字体、间距）

**推荐风格**：01 Pentagram / 10 Müller-Brockmann / 11 Build / 18 Kenya Hara / 04 Fathom

**场景提示词模板**：
```
[风格DNA插入此处]
- Presentation slide design, 16:9
- One core message per slide
- Clear type hierarchy (title 40pt+, body 24pt+)
- Generous whitespace for projection clarity
- Consistent visual system throughout
- [Light/Dark] theme
```

---

## 2. 动画配图 / 概念插画

**规格**：
- 16:9（1920×1080px）为动画帧的标准尺寸
- 1:1（800×800px）适合强调某个概念
- 4:3（1200×900px）适合信息密集的镜头

**关键设计要素**：
- 服务于叙事，不是装饰
- 与前后镜头形成视觉节奏
- 简洁表达一个核心概念
- AI生成优先，HTML截图仅在精确数据表格时用

**推荐风格**：根据叙事调性选择，常用 01/04/10/17/18

**场景提示词模板**：
```
[风格DNA插入此处]
- Animation asset, concept visualization
- [16:9 / 1:1 / 4:3] aspect ratio
- Single clear concept: [描述核心概念]
- Serve the narrative, not decoration
- [Light/Dark] background to match the piece
```

---

## 组合示例

**场景**：幻灯片数据页，介绍 GLM-4.7 开源模型的 Coding 能力，想要理性克制

**Step 1**：选风格 → 10 Müller-Brockmann（瑞士网格，数据精确）

**Step 2**：取 Müller-Brockmann 提示词DNA + 幻灯片数据页模板

```
Josef Müller-Brockmann Swiss modernism:
- Mathematical grid system (8pt baseline)
- Strict alignment (flush left or centered)
- Two-color maximum (black + one accent)
- Akzidenz-Grotesk or similar rationalist typeface
- No decorative elements
- Timeless, objective aesthetic

Presentation slide design, 16:9
- One core message per slide
- Clear type hierarchy (title 40pt+, body 24pt+)
- Generous whitespace for projection clarity
- Consistent visual system throughout
- Light theme

Content: A model benchmark page — the key number "95.7" dominates the
composition like a headline, with a Swiss grid of three supporting metrics
(AIME 95.7 / SWE-bench 73.8% / τ²-Bench 87.4) and a restrained two-color
comparison bar chart
```

---

**版本**：v2.0
**更新日期**：2026-09-16
