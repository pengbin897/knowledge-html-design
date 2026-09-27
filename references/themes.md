# 主题目录

每个主题都是 `assets/themes/` 下的一份短 CSS 文件，覆盖 `assets/base.css` 中定义的设计令牌。切换主题的方式：改 `<link id="theme-link">` 的 `href`，或者在演示的 `<body>` 或 `<html>` 上设置 `data-themes="a,b,c"` 后按 **T**。

所有主题定义同一组变量：`--bg`、`--bg-soft`、`--surface`、`--surface-2`、`--border`、`--text-1/2/3`、`--accent`、`--accent-2/3`、`--good`、`--warn`、`--bad`、`--grad`、`--grad-soft`、`--radius*`、`--shadow*`、`--font-sans`、`--font-display`。

## 浅色与杂志

| 名称 | 描述 | 适用场景 |
|---|---|---|
| `editorial-serif` | 杂志编辑风：Playfair 斜体大标题 + Newsreader 正文 + 纸感暖白，刊头双线、发丝线分栏、下划线式链接。 | 品牌故事、生活方式、文字密度大的长文演讲 |
| `soft-pastel` | 柔和马卡龙三色渐变。 | 产品发布、面向消费者、轻松话题 |
| `xiaohongshu-white` | 小红书白底 + 暖红 accent + 衬线标题。 | 小红书图文、生活/美学类内容 |
| `japanese-minimal` | 象牙白 + 朱红 accent + 极大留白 + Noto Serif。 | 品牌升级、匠人故事、禅意叙事 |

## 大胆与排版

| 名称 | 描述 | 适用场景 |
|---|---|---|
| `swiss-grid` | 瑞士国际主义：12 栏网格 + 顶部粗黑线，极粗大写标题带红色斜杠，信号红整块强调卡、红方块标签、直角描边按钮。 | 严肃排版、设计行业、高管/商业汇报 |
| `neo-brutalism` | 新粗野主义：3px 黑描边 + 硬投影，黄色荧光底高亮（`.gradient-text`），粉/黄/绿色块卡片，淡方格纸背景。 | 年轻、潮流、品牌合作、路演强视觉 |

## 插画与趣味

| 名称 | 描述 | 适用场景 |
|---|---|---|
| `hand-drawn` | 手绘插画风：奶油纸底 + Caveat / 站酷快乐体手写字，歪扭手绘描边卡片、马克笔高亮、波浪线分隔、角落涂鸦太阳。 | 教育科普、儿童/亲子、温暖轻松的分享 |
| `pixel` | 像素游戏风：色阶天空 + 像素云 + 底部草地，Press Start 2P 黄字描边标题，缺角像素边框卡片与 “START GAME” 式按钮。 | 游戏、复古/怀旧话题、趣味技术分享 |

## 深色与极客

| 名称 | 描述 | 适用场景 |
|---|---|---|
| `terminal-green` | 绿屏终端 + 等宽 + 发光文字。 | CLI / 开发者内部分享、极客主题 |

## 重特效

| 名称 | 描述 | 适用场景 |
|---|---|---|
| `aurora` | 极光渐变 + blur + saturate。 | 封面 / CTA / 结语页 |

## 如何应用

```html
<link rel="stylesheet" id="theme-link" href="../assets/themes/aurora.css">
```

或者在 body 上列出主题，启用按 `T` 循环切换：

```html
<body data-themes="editorial-serif,soft-pastel,aurora,terminal-green" data-theme-base="../assets/themes/">
```

## 如何扩展

复制一份现有主题，改名，只覆盖你想改的变量。每个主题控制在约 200 行以内。优先调令牌，少加新选择器。

部分主题会用 `.slide::before` / `.slide::after` 绘制页面级装饰（`swiss-grid` 顶线、`editorial-serif` 刊头线、`hand-drawn` 涂鸦、`pixel` 云和草地），自定义版式不要再占用这两个伪元素。
