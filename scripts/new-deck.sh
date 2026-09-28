#!/usr/bin/env bash
# html-ppt :: new-deck.sh — scaffold a new deck workspace
#
# Usage:
#   new-deck.sh <name> [output-parent-dir]
#
# Creates <parent>/<name>/ with the three pipeline artifacts:
#   index.html      from templates/deck.html, asset paths rewritten
#   script.md       from templates/pipeline/script.md      (S2 拆稿)
#   storyboard.md   from templates/pipeline/storyboard.md  (S0/S1/S3/S5)
# Defaults to ./output/. See references/pipeline.md.

set -euo pipefail

NAME="${1:-}"
if [[ -z "$NAME" ]]; then
  echo "usage: new-deck.sh <name> [parent-dir]" >&2
  exit 1
fi

PARENT="${2:-output}"
HERE="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$HERE/templates/deck.html"
PIPELINE="$HERE/templates/pipeline"

for f in "$TEMPLATE" "$PIPELINE/script.md" "$PIPELINE/storyboard.md"; do
  if [[ ! -f "$f" ]]; then
    echo "error: template not found at $f" >&2
    exit 1
  fi
done

OUT_DIR="$HERE/$PARENT/$NAME"
if [[ -e "$OUT_DIR" ]]; then
  echo "error: $OUT_DIR already exists" >&2
  exit 1
fi
mkdir -p "$OUT_DIR"

# templates/deck.html references ../assets/...; for <parent>/<name>/index.html
# that same relative path (../../assets/...) needs one more ../.
sed 's|href="../assets/|href="../../assets/|g; s|src="../assets/|src="../../assets/|g; s|data-theme-base="../assets/|data-theme-base="../../assets/|g' \
  "$TEMPLATE" > "$OUT_DIR/index.html"

sed "s|{{NAME}}|$NAME|g" "$PIPELINE/script.md"     > "$OUT_DIR/script.md"
sed "s|{{NAME}}|$NAME|g" "$PIPELINE/storyboard.md" > "$OUT_DIR/storyboard.md"

echo "✔ created $OUT_DIR/"
echo "    index.html      S4 实现"
echo "    script.md       S2 拆稿"
echo "    storyboard.md   S0 理解 · S1 定调 · S3 分镜 · S5 自检"
echo ""
echo "next steps (references/pipeline.md):"
echo "  1. 填 storyboard.md 的 Brief（S0/S1）"
echo "  2. 在 script.md 中拆稿（S2）"
echo "  3. 填 storyboard.md 的分镜表（S3），再动手写 index.html（S4）"
echo ""
echo "  # preview: open $OUT_DIR/index.html   (← → 翻页 · T 换主题 · O 总览)"
echo "  # render:  $HERE/scripts/render.sh $OUT_DIR/index.html all"
