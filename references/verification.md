# Verification：用户明确要求时才跑

默认直接交付 `index.html`。只有用户说「验证 / 截图 / 检查一下」时才用 Playwright 或浏览器走一遍。

## 陈述 deck 清单

1. 打开 `index.html`：首页不是白屏，字体已加载
2. → 键翻完全部页：无空白、无溢出、页脚页码对
3. 全屏（F11 / Cmd+Ctrl+F）确认 scale + letterbox
4. 随机打开 `slides/*.html` 确认单页也能看
5. 搜 `TODO` / 「示意图位」——该留的留着并在交付时说明

```bash
python scripts/verify.py path/to/index.html --slides N
```

脚本会截图并抓控制台错误。首次需要：

```bash
pip install playwright
playwright install chromium
```

## 常见白屏

- `MANIFEST` 的 `file` 路径不是相对 `index.html`
- 某页用了 React 但 `const styles` 重名，或 Babel 外链在 `file://` 下 CORS（见 `react-setup.md`）
- Google Fonts 没加载完就截图：`verify.py` 的 wait 不够时把字体 self-host，或加长等待

## 截图注意

Chromium 默认不带彩色 emoji。本技能本来就不用 emoji；若用户硬要，截图会变成方框。
