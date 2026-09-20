# Animation Pitfalls：HTML 动画踩过的坑与规则

做动画时最常踩的 bug 和如何避免。每条规则都来自真实失败案例。

写动画之前读完这篇，能省一轮迭代。

## 1. 叠层布局 —— `position: relative` 是默认义务

**踩的坑**：一个 sentence-wrap 元素包了 3 个 bracket-layer（`position: absolute`）。没给 sentence-wrap 设 `position: relative`，结果 absolute 的 bracket 以 `.canvas` 为坐标系，飘到屏幕底部 200px 外。

**规则**：
- 任何包含 `position: absolute` 子元素的容器，**必须**显式 `position: relative`
- 即使视觉上不需要「偏移」，也要写 `position: relative` 作为坐标系锚点
- 如果你在写 `.parent { ... }`，其子元素里有 `.child { position: absolute }`，下意识给 parent 加 relative

**快速检查**：每出现一个 `position: absolute`，往上数 ancestor，确保最近的 positioned 祖先是你*想要的*坐标系。

## 2. 字符陷阱 —— 不依赖稀有 Unicode

**踩的坑**：想用 `␣` (U+2423 OPEN BOX) 可视化「空格 token」。Noto Serif SC / Cormorant Garamond 都没这个字形，渲染为空白/豆腐，观众完全看不到。

**规则**：
- **动画里出现的每个字符，都必须在你选定的字体里存在**
- 常见稀有字符黑名单：`␣ ␀ ␐ ␋ ␨ ↩ ⏎ ⌘ ⌥ ⌃ ⇧ ␦ ␖ ␛`
- 要表达「空格 / 回车 / 制表符」这类元字符，用 **CSS 构造的语义盒子**：
  ```html
  <span class="space-key">Space</span>
  ```
  ```css
  .space-key {
    display: inline-flex;
    padding: 4px 14px;
    border: 1.5px solid var(--accent);
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.3em;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  ```
- Emoji 也要验证：某些 emoji 在 Noto Emoji 以外字体会 fallback 成灰色方框，最好用 `emoji` font-family 或 SVG

## 3. 数据驱动的 Grid/Flex 模板

**踩的坑**：代码里 `const N = 6` 个 tokens，但 CSS 写死 `grid-template-columns: 80px repeat(5, 1fr)`。结果第 6 个 token 没有 column，整个矩阵错位。

**规则**：
- 当 count 从 JS 数组来（`TOKENS.length`），CSS 模板也应该数据驱动
- 方案 A：用 CSS 变量从 JS 注入
  ```js
  el.style.setProperty('--cols', N);
  ```
  ```css
  .grid { grid-template-columns: 80px repeat(var(--cols), 1fr); }
  ```
- 方案 B：用 `grid-auto-flow: column` 让浏览器自动扩展
- **禁用「固定数字 +  JS 常量」的组合**，N 改了 CSS 不会同步更新

## 4. 过渡断层 —— 场景切换要连续

**踩的坑**：zoom1 (13-19s) → zoom2 (19.2-23s) 之间，主句子已经 hidden，zoom1 fade out（0.6s）+ zoom2 fade in（0.6s）+ stagger delay（0.2s+）= 约 1 秒纯空白画面。观众以为动画卡住了。

**规则**：
- 连续切换场景时，fade out 和 fade in 要**交叉重叠**，不是前一个完全消失再开始下一个
  ```js
  // 差：
  if (t >= 19) hideZoom('zoom1');      // 19.0s out
  if (t >= 19.4) showZoom('zoom2');    // 19.4s in → 中间 0.4s 空白

  // 好：
  if (t >= 18.6) hideZoom('zoom1');    // 提前 0.4s 开始 fade out
  if (t >= 18.6) showZoom('zoom2');    // 同时 fade in（cross-fade）
  ```
- 或者用一个「锚点元素」（如主句子）作为场景之间的视觉连接，zoom 切换期间它短暂回显
- 配 CSS transition 的 duration 算清楚，避免 transition 还没结束就触发下一个

## 5. Pure Render 原则 —— 动画状态应可 seek

**踩的坑**：用 `setTimeout` + `fireOnce(key, fn)` 链式触发动画状态。正常播放没问题，但空格回退 / seek 到任意时间点时，之前的 setTimeout 已经执行过就无法「回到过去」。

**规则**：
- `render(t)` 函数理想上是 **pure function**：给定 t 输出唯一 DOM 状态
- 如果必须用副作用（如 class 切换），用 `fired` set 配合显式 reset：
  ```js
  const fired = new Set();
  function fireOnce(key, fn) { if (!fired.has(key)) { fired.add(key); fn(); } }
  function reset() { fired.clear(); /* 清所有 .show class */ }
  ```
- 暴露 `window.__seek(t)` 方便调试回退：
  ```js
  window.__seek = (t) => { reset(); render(t); };
  ```
- 动画相关的 setTimeout 不要跨越 >1 秒，否则 seek 回跳时会乱套

## 6. 字体加载前测量 = 测错

**踩的坑**：页面一 DOMContentLoaded 就调用 `charRect(idx)` 测量 bracket 位置，字体还没加载，每个字符宽度是 fallback 字体的宽度，位置全错。等字体一加载（约 500ms 后），bracket 的 `left: Xpx` 还是老值，永久偏移。

**规则**：
- 任何依赖 DOM 测量（`getBoundingClientRect`、`offsetWidth`）的布局代码，**必须**包在 `document.fonts.ready.then()` 里
  ```js
  document.fonts.ready.then(() => {
    requestAnimationFrame(() => {
      buildBrackets(...);  // 此时字体已就绪，测量准确
      tick();              // 动画开始
    });
  });
  ```
- 额外的 `requestAnimationFrame` 给浏览器一帧时间提交 layout
- 如果用 Google Fonts CDN，`<link rel="preconnect">` 加速首次加载

## 7. 画面内别画「伪 chrome」—— 装饰版 player UI 与真 chrome 撞车

**踩的坑**：Stage 已经自带 scrubber + 时间码 + 暂停按钮。又在画面底部画一条「`00:60 ──── PROJECT / ANATOMY`」装饰进度条。用户看到两条进度条，认定为 bug。

**规则**：

- Stage 已经提供控制条。**画面内不要再画**进度指示、当前时间码、版权署名条、章节计数器——要么和 chrome 撞车，要么是 filler slop。
- 「页码感」「杂志感」「底部署名条」是 AI 高频 filler。每一个出现都要问：它真的传达了不可替代的信息吗？
- 若动画主题就是讲 player UI，那它必须叙事必要，且视觉上和 Stage scrubber 显著区分。

**元素归属测试**：

| 它属于什么 | 处理 |
|------------|------|
| 某一幕的叙事内容 | OK，留着 |
| 全局 chrome（控制/调试用） | 放在画布外的 Stage 控制条，不要画进 1920×1080 |
| **既不属于任何幕，又不是 chrome** | **删** |

**反例**：底部画 `00:42 ──── PROJECT NAME`、右下角 "CH 03 / 06"、边缘版本号 "v0.3.1"。

## 8. `file://` + 外部 `.jsx` 的 CORS 陷阱 —— 单文件交付必须内联引擎

**踩的坑**：动画 HTML 里用 `<script type="text/babel" src="animations.jsx"></script>` 外部加载引擎。本机双击打开（`file://`）→ Babel Standalone 走 XHR → CORS 黑屏。

**规则**：

- **单文件交付（双击打开即用的 HTML）** → 引擎必须**内联**到 `<script type="text/babel">` 内
- **多文件项目（起 HTTP server 演示）** → 可以外部加载，但交付时写清启动命令
- Stage / `narration_stage.jsx` 经常 200+ 行——贴进 HTML 完全可接受

**最小验证**：双击生成的 HTML，**不要**通过任何 server 打开。舞台首帧正常才算通过。

## 9. 跨 scene 反色上下文 —— 画面内元素不要硬编码颜色

**踩的坑**：跨 scene 复用的标签写死 `color: '#1A1A1A'`。浅底 OK，黑底 scene 里文字直接消失。

**规则**：

- 跨多 scene 复用的画面内元素**禁止硬编码颜色值**
- 用 `currentColor` 继承，或接受 invert prop，或按 `--scene-bg` 计算对比色
- 交付前每个 scene 暂停一帧，人眼确认跨 scene 元素都可见

## 快速自查清单（开工前 5 秒）

- [ ] 每个 `position: absolute` 的父元素都有 `position: relative`？
- [ ] 动画里的特殊字符都在字体里存在？
- [ ] Grid/Flex 模板的 count 和 JS 数据的 length 一致？
- [ ] 场景切换之间有 cross-fade，没有 >0.3s 的纯空白？
- [ ] DOM 测量代码包在 `document.fonts.ready.then()` 里？
- [ ] `render(t)` 是 pure 的，或有明确的 reset / `__seek`？
- [ ] 第 0 帧是完整初始状态，不是空白？
- [ ] 画面内没有伪 chrome（进度条/时间码/底部署名条）？
- [ ] 涉及具体品牌：走完了核心资产协议，写了 `brand-spec.md`？
- [ ] 单文件 HTML：引擎是内联的，不是 `src="..."`？
- [ ] 跨 scene 元素没有硬编码颜色？
