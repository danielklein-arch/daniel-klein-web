// Brand asset generator — single source of truth for logo geometry.
// Usage: bun tools/logo/generate.mjs <outDir> [--png]
// Spec: docs/superpowers/specs/2026-06-11-brand-identity-design.md

import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = process.argv[2] ?? 'brand-drafts'
const wantPng = process.argv.includes('--png')

const loadFont = rel => opentype.parse(readFileSync(join(here, rel)).buffer)
const fonts = {
  clash700: loadFont('fonts/ClashDisplay-700.ttf'),
  clash600: loadFont('fonts/ClashDisplay-600.ttf'),
  general600: loadFont('fonts/GeneralSans-600.ttf'),
}

const C = {
  bgDark: '#070b14',
  tileDark: '#0d1320',
  dark: { d: ['#3b82f6', '#22d3ee'], k: ['#22d3ee', '#67e8f9'], shadow: '#0f2547', text: '#f1f5f9', muted: '#64748b' },
  light: { d: ['#2563eb', '#0891b2'], k: ['#0891b2', '#06b6d4'], shadow: '#dbeafe', text: '#0f172a', muted: '#64748b' },
  glow: 'rgba(34,211,238,.4)',
}

// --- text layout helpers (manual per-glyph positioning, tracking in px) ---

function glyphPath(font, char, size, x, y) {
  return font.getPath(char, x, y, size, { kerning: false })
}

function textLayout(font, text, size, tracking = 0) {
  // returns { paths: [{char, path}], width } with chars laid out left to right
  let x = 0
  const paths = []
  let prev = null
  for (const char of text) {
    const glyph = font.charToGlyph(char)
    if (prev) x += (font.getKerningValue(prev, glyph) / font.unitsPerEm) * size
    paths.push({ char, path: glyphPath(font, char, size, x, 0) })
    x += (glyph.advanceWidth / font.unitsPerEm) * size + tracking
    prev = glyph
  }
  return { paths, width: x - tracking }
}

function pathData(path) {
  return path.toPathData(2)
}

function bbox(paths) {
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity
  for (const p of paths) {
    const b = p.getBoundingBox()
    x1 = Math.min(x1, b.x1); y1 = Math.min(y1, b.y1)
    x2 = Math.max(x2, b.x2); y2 = Math.max(y2, b.y2)
  }
  return { x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 }
}

// --- monogram ---
// size = font size of DK; returns group markup + metrics, origin at bbox top-left

// glow: only for raster outputs (OG) — browsers rasterize SVG filters at low res,
// on the web the glow is applied via CSS drop-shadow instead
function monogram(theme, size, { shadow = true, glow = false, mono = null, idPrefix = 'm' } = {}) {
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

function svgDoc(w, h, defs, body, bg = null) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(0)} ${h.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}">
<defs>${defs}</defs>
${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}${body}
</svg>`
}

// --- variants ---

function iconSvg(theme, opts = {}) {
  const m = monogram(theme, 200, { idPrefix: 'i', ...opts })
  return svgDoc(m.w, m.h, m.defs, m.g, opts.bg)
}

function tileSvg(kind) {
  // kind: 'dark' (dark tile, gradient letters) | 'gradient' (gradient tile, navy letters)
  const S = 512
  const r = S * 0.225
  let defs = '', tileFill, m
  if (kind === 'dark') {
    m = monogram('dark', 220, { shadow: true, glow: true, idPrefix: 't' })
    tileFill = C.tileDark
  }
  else {
    m = monogram('dark', 220, { shadow: false, glow: false, mono: C.bgDark, idPrefix: 't' })
    defs += `<linearGradient id="t-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.dark.d[0]}"/><stop offset="1" stop-color="${C.dark.k[1]}"/></linearGradient>`
    tileFill = 'url(#t-bg)'
  }
  const ox = (S - m.w) / 2
  const oy = (S - m.h) / 2
  const body = `<rect width="${S}" height="${S}" rx="${r}" fill="${tileFill}"/><g transform="translate(${ox.toFixed(2)},${oy.toFixed(2)})">${m.g}</g>`
  return svgDoc(S, S, defs + m.defs, body)
}

function compactSvg(theme, bg = null) {
  const t = C[theme]
  const m = monogram(theme, 120, { idPrefix: 'c' })
  const name = textLayout(fonts.clash600, 'Daniel Klein', 64)
  const nameBox = bbox(name.paths.map(p => p.path))
  const gap = 36
  const w = m.w + gap + name.width + 24
  const h = m.h
  const nameG = `<g fill="${t.text}" transform="translate(${(m.w + gap).toFixed(2)},${(m.pad + (m.h - 2 * m.pad) / 2 - nameBox.y1 - nameBox.h / 2).toFixed(2)})">${name.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
  return svgDoc(w, h, m.defs, m.g + nameG, bg)
}

function fullSvg(theme, bg = null) {
  const t = C[theme]
  const m = monogram(theme, 160, { idPrefix: 'f' })
  const name = textLayout(fonts.clash600, 'Daniel Klein', 60)
  const nameBox = bbox(name.paths.map(p => p.path))
  const tag = textLayout(fonts.general600, 'IT SPECIALISTA', 27, 10)
  const tagBox = bbox(tag.paths.map(p => p.path))

  const gapName = 34
  const gapTag = 26
  const w = Math.max(m.w, name.width, tag.width) + 48
  const cx = w / 2
  const topPad = 24
  const nameTop = topPad + m.h - m.pad + gapName
  const tagTop = nameTop + nameBox.h + gapTag
  const h = tagTop + tagBox.h + topPad + m.pad

  const body
    = `<g transform="translate(${(cx - m.w / 2).toFixed(2)},${topPad - m.pad})">${m.g}</g>`
      + `<g fill="${t.text}" transform="translate(${(cx - name.width / 2).toFixed(2)},${(nameTop - nameBox.y1).toFixed(2)})">${name.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
      + `<g fill="${t.muted}" transform="translate(${(cx - tag.width / 2).toFixed(2)},${(tagTop - tagBox.y1).toFixed(2)})">${tag.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
  return svgDoc(w, h, m.defs, body, bg)
}

function monoSvg(color) {
  const m = monogram('dark', 200, { shadow: false, glow: false, mono: color, idPrefix: 'mn' })
  return svgDoc(m.w, m.h, m.defs, m.g)
}

// --- output ---

const files = {
  'logo-icon/dk-icon-dark.svg': iconSvg('dark'),
  'logo-icon/dk-icon-light.svg': iconSvg('light'),
  'logo-icon/dk-icon-tile-dark.svg': tileSvg('dark'),
  'logo-icon/dk-icon-tile-gradient.svg': tileSvg('gradient'),
  'logo-compact/dk-compact-dark.svg': compactSvg('dark'),
  'logo-compact/dk-compact-light.svg': compactSvg('light'),
  'logo-full/dk-full-dark.svg': fullSvg('dark'),
  'logo-full/dk-full-light.svg': fullSvg('light'),
  'logo-full/dk-full-dark-bg.svg': fullSvg('dark', C.bgDark),
  'logo-full/dk-full-light-bg.svg': fullSvg('light', '#ffffff'),
  'logo-monochrome/dk-mono-black.svg': monoSvg('#0f172a'),
  'logo-monochrome/dk-mono-white.svg': monoSvg('#ffffff'),
  'logo-monochrome/dk-mono-blue.svg': monoSvg('#2563eb'),
}

for (const [rel, svg] of Object.entries(files)) {
  const path = join(outDir, rel)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, svg)
  console.log('wrote', path)
}

if (wantPng) {
  const { Resvg } = await import('@resvg/resvg-js')
  const render = (svg, width) => new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng()

  const pngDir = join(outDir, 'png')
  mkdirSync(pngDir, { recursive: true })
  const pngs = {
    'dk-icon-dark@2x.png': [files['logo-icon/dk-icon-dark.svg'], 1024],
    'dk-icon-tile-dark@2x.png': [files['logo-icon/dk-icon-tile-dark.svg'], 1024],
    'dk-icon-tile-gradient@2x.png': [files['logo-icon/dk-icon-tile-gradient.svg'], 1024],
    'dk-compact-dark@2x.png': [files['logo-compact/dk-compact-dark.svg'], 1600],
    'dk-compact-light@2x.png': [files['logo-compact/dk-compact-light.svg'], 1600],
    'dk-full-dark@2x.png': [files['logo-full/dk-full-dark-bg.svg'], 1200],
    'dk-full-light@2x.png': [files['logo-full/dk-full-light-bg.svg'], 1200],
    'dk-mono-black@2x.png': [files['logo-monochrome/dk-mono-black.svg'], 800],
    'dk-mono-white@2x.png': [files['logo-monochrome/dk-mono-white.svg'], 800],
    'dk-mono-blue@2x.png': [files['logo-monochrome/dk-mono-blue.svg'], 800],
  }
  for (const [name, [svg, width]] of Object.entries(pngs)) {
    writeFileSync(join(pngDir, name), render(svg, width))
    console.log('wrote', join(pngDir, name))
  }

  // favicons from tile (dark tile reads better small); 16/32 use no-effects icon on tile
  const favDir = join(outDir, 'favicon')
  mkdirSync(favDir, { recursive: true })
  const smallTile = (() => {
    const S = 512, r = S * 0.225
    const m = monogram('dark', 240, { shadow: false, glow: false, idPrefix: 'fv' })
    const ox = (S - m.w) / 2, oy = (S - m.h) / 2
    return svgDoc(S, S, m.defs, `<rect width="${S}" height="${S}" rx="${r}" fill="${C.tileDark}"/><g transform="translate(${ox.toFixed(2)},${oy.toFixed(2)})">${m.g}</g>`)
  })()
  for (const s of [16, 32, 180, 512]) {
    const src = s <= 32 ? smallTile : files['logo-icon/dk-icon-tile-dark.svg']
    writeFileSync(join(favDir, `favicon-${s}.png`), render(src, s))
    console.log('wrote', join(favDir, `favicon-${s}.png`))
  }

  // OG image 1200x630 — dark bg, full lockup centered
  const og = (() => {
    const m = monogram('dark', 200, { glow: true, idPrefix: 'og' })
    const name = textLayout(fonts.clash600, 'Daniel Klein', 86)
    const nameBox = bbox(name.paths.map(p => p.path))
    const tag = textLayout(fonts.general600, 'IT SPECIALISTA', 34, 14)
    const tagBox = bbox(tag.paths.map(p => p.path))
    const W = 1200, H = 630, cx = W / 2
    const blockH = (m.h - 2 * m.pad) + 48 + nameBox.h + 30 + tagBox.h
    const top = (H - blockH) / 2
    const body
      = `<g transform="translate(${(cx - m.w / 2).toFixed(2)},${(top - m.pad).toFixed(2)})">${m.g}</g>`
        + `<g fill="${C.dark.text}" transform="translate(${(cx - name.width / 2).toFixed(2)},${(top + (m.h - 2 * m.pad) + 48 - nameBox.y1).toFixed(2)})">${name.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
        + `<g fill="${C.dark.muted}" transform="translate(${(cx - tag.width / 2).toFixed(2)},${(top + (m.h - 2 * m.pad) + 48 + nameBox.h + 30 - tagBox.y1).toFixed(2)})">${tag.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
    return svgDoc(W, H, m.defs, body, C.bgDark)
  })()
  writeFileSync(join(outDir, 'og-image.png'), render(og, 1200))
  console.log('wrote', join(outDir, 'og-image.png'))

  // faktura 420x140 — exact canvas, light bg, compact lockup centered
  const faktura = (() => {
    const W = 420, H = 140
    const inner = compactSvg('light')
    const [, vw, vh] = inner.match(/viewBox="0 0 (\d+) (\d+)"/).map(Number)
    const scale = Math.min((W - 40) / vw, (H - 36) / vh)
    const body = inner.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="100%" height="100%" fill="#ffffff"/>
<g transform="translate(${((W - vw * scale) / 2).toFixed(2)},${((H - vh * scale) / 2).toFixed(2)}) scale(${scale.toFixed(4)})">${body}</g>
</svg>`
  })()
  writeFileSync(join(outDir, 'png/dk-full-light-faktura-420x140.png'), render(faktura, 840))
  console.log('wrote', join(outDir, 'png/dk-full-light-faktura-420x140.png'))
}
