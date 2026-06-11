// Shared brand geometry — fonts, palette, monogram construction.
// Spec: docs/superpowers/specs/2026-06-11-brand-identity-design.md

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'

const here = dirname(fileURLToPath(import.meta.url))

const loadFont = rel => opentype.parse(readFileSync(join(here, rel)).buffer)
export const fonts = {
  clash700: loadFont('fonts/ClashDisplay-700.ttf'),
  clash600: loadFont('fonts/ClashDisplay-600.ttf'),
  general500: loadFont('fonts/GeneralSans-500.ttf'),
  general600: loadFont('fonts/GeneralSans-600.ttf'),
}

export const C = {
  bgDark: '#070b14',
  tileDark: '#0d1320',
  dark: { d: ['#3b82f6', '#22d3ee'], k: ['#22d3ee', '#67e8f9'], shadow: '#0f2547', text: '#f1f5f9', muted: '#64748b' },
  light: { d: ['#2563eb', '#0891b2'], k: ['#0891b2', '#06b6d4'], shadow: '#dbeafe', text: '#0f172a', muted: '#64748b' },
  glow: 'rgba(34,211,238,.4)',
}

// --- text layout helpers (manual per-glyph positioning, tracking in px) ---

export function glyphPath(font, char, size, x, y) {
  return font.getPath(char, x, y, size, { kerning: false })
}

export function textLayout(font, text, size, tracking = 0) {
  // whole-string layout via opentype (per-glyph assembly corrupts some lowercase glyphs)
  const opts = { kerning: true, letterSpacing: tracking / size }
  const path = font.getPath(text, 0, 0, size, opts)
  return { paths: [{ char: text, path }], width: font.getAdvanceWidth(text, size, opts) }
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

// --- monogram ---
// size = font size of DK; returns group markup + metrics, origin at bbox top-left

// glow: only for raster outputs (OG) — browsers rasterize SVG filters at low res,
// on the web the glow is applied via CSS drop-shadow instead
export function monogram(theme, size, { shadow = true, glow = false, mono = null, idPrefix = 'm' } = {}) {
  const t = C[theme] ?? C.dark
  const gap = size * 0.10
  const dxs = size * 0.06
  const dys = size * 0.09

  const dPath = glyphPath(fonts.clash700, 'D', size, 0, 0)
  const dAdv = (fonts.clash700.charToGlyph('D').advanceWidth / fonts.clash700.unitsPerEm) * size
  const kPath = glyphPath(fonts.clash700, 'K', size, dAdv + gap, 0)
  const box = bbox([dPath, kPath])

  const dD = pathData(dPath)
  const dK = pathData(kPath)
  const pad = glow ? size * 0.25 : 0
  const w = box.w + (shadow ? dxs : 0) + pad * 2
  const h = box.h + (shadow ? dys : 0) + pad * 2
  // translate so bbox top-left lands at (pad, pad)
  const tx = -box.x1 + pad
  const ty = -box.y1 + pad

  let defs = ''
  let dFill, kFill
  if (mono) {
    dFill = kFill = mono
  }
  else {
    defs += `<linearGradient id="${idPrefix}-d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.d[0]}"/><stop offset="1" stop-color="${t.d[1]}"/></linearGradient>`
    defs += `<linearGradient id="${idPrefix}-k" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.k[0]}"/><stop offset="1" stop-color="${t.k[1]}"/></linearGradient>`
    dFill = `url(#${idPrefix}-d)`
    kFill = `url(#${idPrefix}-k)`
  }
  if (glow && !mono) {
    defs += `<filter id="${idPrefix}-glow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="${(size * 0.07).toFixed(1)}" flood-color="${C.glow}"/></filter>`
  }

  let g = `<g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)})">`
  if (shadow && !mono) {
    g += `<g fill="${t.shadow}" transform="translate(${dxs.toFixed(2)},${dys.toFixed(2)})"><path d="${dD}"/><path d="${dK}"/></g>`
  }
  g += `<g${glow && !mono ? ` filter="url(#${idPrefix}-glow)"` : ''}><path fill="${dFill}" d="${dD}"/><path fill="${kFill}" d="${dK}"/></g>`
  g += '</g>'

  return { defs, g, w, h, pad }
}

export function svgDoc(w, h, defs, body, bg = null) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(0)} ${h.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}">
<defs>${defs}</defs>
${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}${body}
</svg>`
}
