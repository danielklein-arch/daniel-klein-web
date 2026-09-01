// Shared brand geometry — fonts, palette, dk_ mark construction.
// Spec: docs/superpowers/specs/2026-09-01-brand-v2-fleet-design.md

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'

const here = dirname(fileURLToPath(import.meta.url))

const loadFont = rel => opentype.parse(readFileSync(join(here, rel)).buffer)
export const fonts = {
  jb700: loadFont('fonts/JetBrainsMono-Bold.ttf'),
  jb500: loadFont('fonts/JetBrainsMono-Medium.ttf'),
  jb400: loadFont('fonts/JetBrainsMono-Regular.ttf'),
}

export const C = {
  bg: '#0a0e13',
  tile: '#10161e',
  line: '#1f2937',
  grid: 'rgba(255,255,255,.025)',
  dark: { ink: '#d7e0ea', dim: '#5f6f81', accent: '#48b7e0' },
  light: { ink: '#1a232e', dim: '#5f6f81', accent: '#0e7ea8' },
}

// --- text layout helpers ---

export function advOf(font, ch, size) {
  return font.charToGlyph(ch).advanceWidth * (size / font.unitsPerEm)
}

export function textLayout(font, text, size, tracking = 0) {
  // per-glyph assembly: opentype.js 2.0 string shaping crashes on JB Mono GSUB
  // (ccmp lookup 6.2 unsupported); mono font = no kerning, fixed advance, and
  // '//' must not ligate anyway. Width includes trailing tracking (v1 semantics).
  const scale = size / font.unitsPerEm
  const path = new opentype.Path()
  let x = 0
  for (const ch of text) {
    const glyph = font.charToGlyph(ch)
    path.extend(glyph.getPath(x, 0, size))
    x += glyph.advanceWidth * scale + tracking
  }
  return { paths: [{ char: text, path }], width: x }
}

export function pathData(path) {
  // opentype.js 2.0 toPathData() emits NaN tokens (serializer bug) — build the data ourselves
  const r = n => Math.round(n * 1000) / 1000
  return path.commands.map(c => {
    switch (c.type) {
      case 'M': return `M${r(c.x)} ${r(c.y)}`
      case 'L': return `L${r(c.x)} ${r(c.y)}`
      case 'C': return `C${r(c.x1)} ${r(c.y1)} ${r(c.x2)} ${r(c.y2)} ${r(c.x)} ${r(c.y)}`
      case 'Q': return `Q${r(c.x1)} ${r(c.y1)} ${r(c.x)} ${r(c.y)}`
      case 'Z': return 'Z'
      default: return ''
    }
  }).join('')
}

export function bbox(paths) {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity
  for (const p of paths) {
    const b = p.getBoundingBox()
    x1 = Math.min(x1, b.x1); y1 = Math.min(y1, b.y1)
    x2 = Math.max(x2, b.x2); y2 = Math.max(y2, b.y2)
  }
  return { x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 }
}

// text block as filled paths: returns { g, width, height, box }
export function textG(font, text, size, fill, x, y, tracking = 0) {
  const t = textLayout(font, text, size, tracking)
  const box = bbox(t.paths.map(p => p.path))
  const g = `<g fill="${fill}" transform="translate(${x.toFixed(2)},${(y - box.y1).toFixed(2)})">${t.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
  return { g, width: t.width, height: box.h, box }
}

// --- dk_ mark ---
// Glyphs "dk" (JB Mono Bold) + cursor rect in the third monospace cell.
// size = font size; origin at content top-left; returns { g, w, h, baseline }

export function markGlyphs(theme, size, { mono = null } = {}) {
  const t = C[theme] ?? C.dark
  const font = fonts.jb700
  const adv = advOf(font, 'd', size)
  const glyphs = textLayout(font, 'dk', size)
  const box = bbox(glyphs.paths.map(p => p.path))

  // cursor: underscore-style bar, centered in the third cell, just under the baseline
  const cw = adv * 0.62
  const ch = size * 0.09
  const cx = adv * 2 + (adv - cw) / 2
  const cy = size * 0.035

  const top = box.y1
  const h = Math.max(box.y2, cy + ch) - top
  // visual extent: glyph left bearing → cursor right edge, so centering is optical
  const w = cx + cw - box.x1
  const ink = mono ?? t.ink
  const cursor = mono ?? t.accent

  const g = `<g transform="translate(${(-box.x1).toFixed(2)},${(-top).toFixed(2)})">`
    + `<g fill="${ink}">${glyphs.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
    + `<rect class="cursor" x="${cx.toFixed(2)}" y="${cy.toFixed(2)}" width="${cw.toFixed(2)}" height="${ch.toFixed(2)}" fill="${cursor}"/>`
    + '</g>'
  return { g, w, h, baseline: -top }
}

// tile with the dk_ mark; kind: 'dark' (canonical) | 'accent' | 'small' (no stroke, for ≤32px favicons)
export function tileG(S, kind = 'dark') {
  const r = S * 0.225
  const glyphSize = S * (kind === 'small' ? 0.5 : 0.36)
  const strokeW = kind === 'small' ? 0 : S * 0.018
  const m = markGlyphs('dark', glyphSize, { mono: kind === 'accent' ? C.bg : null })
  let body = `<rect width="${S}" height="${S}" rx="${r.toFixed(1)}" fill="${kind === 'accent' ? C.dark.accent : C.tile}"/>`
  if (strokeW) {
    body += `<rect x="${(strokeW / 2).toFixed(2)}" y="${(strokeW / 2).toFixed(2)}" width="${(S - strokeW).toFixed(2)}" height="${(S - strokeW).toFixed(2)}" rx="${(r - strokeW / 2).toFixed(1)}" fill="none" stroke="${C.line}" stroke-width="${strokeW.toFixed(2)}"/>`
  }
  body += `<g transform="translate(${((S - m.w) / 2).toFixed(2)},${((S - m.h) / 2).toFixed(2)})">${m.g}</g>`
  return body
}

// --- wordmark ---
// DANIEL//KLEIN as three runs so the slashes take the accent fill.
// Trailing letter-spacing of each run doubles as the gap to the next run.

export function wordmark(theme, size, { tracking = size * 0.32, mono = null, font = fonts.jb500 } = {}) {
  const t = C[theme] ?? C.dark
  const runs = [
    ['DANIEL', mono ?? t.ink],
    ['//', mono ?? t.accent],
    ['KLEIN', mono ?? t.ink],
  ]
  let x = 0
  const parts = []
  for (const [text, fill] of runs) {
    const run = textLayout(font, text, size, tracking)
    parts.push({ x, fill, path: run.paths[0].path })
    x += run.width
  }
  const box = bbox(parts.map(p => p.path))
  const width = x - tracking
  const g = `<g transform="translate(0,${(-box.y1).toFixed(2)})">${parts.map(p => `<g fill="${p.fill}" transform="translate(${p.x.toFixed(2)},0)"><path d="${pathData(p.path)}"/></g>`).join('')}</g>`
  return { g, width, h: box.h, box }
}

export function svgDoc(w, h, defs, body, bg = null) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(0)} ${h.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}">
<defs>${defs}</defs>
${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}${body}
</svg>`
}
