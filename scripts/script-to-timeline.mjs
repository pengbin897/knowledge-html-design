#!/usr/bin/env node
/**
 * 把 script.md 编成 timeline.json。
 *
 *   node scripts/script-to-timeline.mjs --script script.md --out timeline.json --pace speaker
 *
 * --pace speaker  现场默认：每个 cue 间隔 1.6s，段间 0.4s（动画拍点，不是讲话时长）
 * --pace speech   按中文字符估算时长，给 HTML 自动播放
 */

import fs from 'fs';
import path from 'path';

function parseArgs(argv) {
  const out = { pace: 'speaker', gap: null, cueGap: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === '--script') { out.script = next; i++; }
    else if (a === '--out') { out.out = next; i++; }
    else if (a === '--pace') { out.pace = next; i++; }
    else if (a === '--gap') { out.gap = parseFloat(next); i++; }
    else if (a === '--cue-gap') { out.cueGap = parseFloat(next); i++; }
  }
  if (!out.script) {
    console.error('Usage: node scripts/script-to-timeline.mjs --script script.md [--out timeline.json] [--pace speaker|speech]');
    process.exit(1);
  }
  return out;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { meta: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end < 0) return { meta: {}, body: raw };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*\n/, '');
  const meta = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return { meta, body };
}

function splitScenes(body) {
  const scenes = [];
  const re = /^##\s+([A-Za-z0-9_-]+)\s*$/gm;
  const matches = [...body.matchAll(re)];
  if (!matches.length) {
    throw new Error('script.md 里没有 ## scene-id 分段');
  }
  for (let i = 0; i < matches.length; i++) {
    const id = matches[i][1];
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : body.length;
    scenes.push({ id, raw: body.slice(start, end).trim() });
  }
  return scenes;
}

/** 按 [[cue:id]] 切开，得到 preamble + [{id, text}] */
function splitCues(raw) {
  const cueRe = /\[\[cue:([A-Za-z0-9_-]+)\]\]/g;
  const cues = [];
  let last = 0;
  let m;
  let preamble = '';
  let first = true;
  while ((m = cueRe.exec(raw))) {
    const before = raw.slice(last, m.index);
    if (first) {
      preamble = before.trim();
      first = false;
    } else if (cues.length) {
      cues[cues.length - 1].text = (cues[cues.length - 1].text + before).trim();
    }
    cues.push({ id: m[1], text: '' });
    last = m.index + m[0].length;
  }
  const tail = raw.slice(last);
  if (first) preamble = tail.trim();
  else if (cues.length) cues[cues.length - 1].text = (cues[cues.length - 1].text + tail).trim();
  return { preamble, cues };
}

function stripCues(raw) {
  return raw.replace(/\[\[cue:[A-Za-z0-9_-]+\]\]/g, '').replace(/[ \t]+\n/g, '\n').trim();
}

/** 中文讲解语速估算：约 3.8 字/秒，句号多停，逗号少停 */
function estimateSpeech(text) {
  const chars = text.replace(/\s/g, '').length;
  const stops = (text.match(/[。！？]/g) || []).length * 0.35;
  const pauses = (text.match(/[，、；：]/g) || []).length * 0.12;
  return Math.max(0.6, chars / 3.8 + stops + pauses);
}

function buildTimeline(scenes, opts) {
  const pace = opts.pace === 'speech' ? 'speech' : 'speaker';
  const cueGap = opts.cueGap != null ? opts.cueGap : pace === 'speaker' ? 1.6 : null;
  const sceneGap = opts.gap != null ? opts.gap : 0.4;
  let t = 0;
  const outScenes = [];

  for (const sc of scenes) {
    const { preamble, cues } = splitCues(sc.raw);
    const text = stripCues(sc.raw);
    const pieces = [];
    if (preamble) pieces.push({ id: null, text: preamble });
    for (const c of cues) pieces.push({ id: c.id, text: c.text || '' });
    if (!pieces.length) pieces.push({ id: null, text: '' });

    const start = t;
    const chunks = [];
    const cueList = [];

    for (const p of pieces) {
      const dur = pace === 'speaker'
        ? cueGap
        : estimateSpeech(p.text || '…');
      const chunk = {
        text: p.text || '',
        start: t - start,
        end: t - start + dur,
        absoluteStart: t,
        absoluteEnd: t + dur,
      };
      chunks.push(chunk);
      if (p.id) {
        cueList.push({
          id: p.id,
          offset: t - start,
          absoluteTime: t,
          prompt: p.text || preamble || text,
        });
      } else if (!cueList.length && pieces.length === 1) {
        // 整段没有 cue：仍要有一拍，方便空格推进
        cueList.push({
          id: `${sc.id}-beat`,
          offset: 0,
          absoluteTime: t,
          prompt: p.text || text,
        });
      }
      t += dur;
    }

    const end = t;
    outScenes.push({
      id: sc.id,
      start,
      end,
      duration: end - start,
      text,
      chunks,
      cues: cueList,
    });
    t += sceneGap;
  }

  const last = outScenes[outScenes.length - 1];
  return {
    title: opts.title || '',
    pace,
    totalDuration: last ? last.end : 0,
    scenes: outScenes,
  };
}

function main() {
  const args = parseArgs(process.argv);
  const abs = path.resolve(args.script);
  const raw = fs.readFileSync(abs, 'utf8');
  const { meta, body } = parseFrontmatter(raw);
  const scenes = splitScenes(body);
  const timeline = buildTimeline(scenes, {
    pace: args.pace,
    gap: args.gap,
    cueGap: args.cueGap,
    title: meta.title || path.basename(abs, '.md'),
  });
  const json = JSON.stringify(timeline, null, 2);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), json);
    console.log(`wrote ${args.out}  scenes=${timeline.scenes.length}  duration=${timeline.totalDuration.toFixed(2)}s  pace=${timeline.pace}`);
  } else {
    process.stdout.write(json + '\n');
  }
}

main();
