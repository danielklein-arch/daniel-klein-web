// Brand asset generator — single source of truth for logo geometry.
// Usage: bun tools/logo/generate.mjs <outDir> [--png]
// Spec: docs/superpowers/specs/2026-06-11-brand-identity-design.md

import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fonts, C, glyphPath, textLayout, pathData, bbox, monogram, svgDoc } from './lib.mjs'

const outDir = process.argv[2] ?? 'brand-drafts'
const wantPng = process.argv.includes('--png')

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

function animatedIconSvg() {
  // draw sequence: outline stroke → gradient fill → shadow slides out → glow pulse
  const size = 200
  const gap = size * 0.10
  const dxs = size * 0.06
  const dys = size * 0.09
  const dPath = glyphPath(fonts.clash700, 'D', size, 0, 0)
  const dAdv = (fonts.clash700.charToGlyph('D').advanceWidth / fonts.clash700.unitsPerEm) * size
  const kPath = glyphPath(fonts.clash700, 'K', size, dAdv + gap, 0)
  const box = bbox([dPath, kPath])
  const pad = size * 0.25
  const w = box.w + dxs + 2 * pad
  const h = box.h + dys + 2 * pad
  const dD = pathData(dPath)
  const dK = pathData(kPath)
  const t = C.dark

  const defs
    = `<linearGradient id="ag-d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.d[0]}"/><stop offset="1" stop-color="${t.d[1]}"/></linearGradient>`
      + `<linearGradient id="ag-k" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.k[0]}"/><stop offset="1" stop-color="${t.k[1]}"/></linearGradient>`

  const style = `<style>
    .stroke path { fill: none; stroke-width: 2.5; stroke-dasharray: 1; stroke-dashoffset: 1; animation: dk-draw 1.2s ease-in-out forwards; }
    .stroke path:nth-child(2) { animation-delay: .2s; }
    .fill { opacity: 0; animation: dk-fill .7s ease 1.1s forwards; }
    .shadow { opacity: 0; transform: translate(0, 0); animation: dk-shadow .6s cubic-bezier(.22,1,.36,1) 1.5s forwards; }
    .glow { opacity: 0; animation: dk-glowin .8s ease 1.8s forwards, dk-pulse 3.2s ease-in-out 2.6s infinite; }
    @keyframes dk-draw { to { stroke-dashoffset: 0; } }
    @keyframes dk-fill { to { opacity: 1; } }
    @keyframes dk-shadow { to { opacity: 1; transform: translate(${dxs}px, ${dys}px); } }
    @keyframes dk-glowin { to { opacity: .55; } }
    @keyframes dk-pulse { 0%, 100% { opacity: .55; } 50% { opacity: .25; } }
    @media (prefers-reduced-motion: reduce) {
      .stroke path { animation: none; stroke-dashoffset: 0; }
      .fill { animation: none; opacity: 1; }
      .shadow { animation: none; opacity: 1; transform: translate(${dxs}px, ${dys}px); }
      .glow { animation: none; opacity: .45; }
    }
  </style>`

  const tx = -box.x1 + pad
  const ty = -box.y1 + pad
  const letters = `<path d="${dD}"/><path d="${dK}"/>`
  const lettersFilled = `<path fill="url(#ag-d)" d="${dD}"/><path fill="url(#ag-k)" d="${dK}"/>`
  const body
    = `${style}<g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)})">`
      + `<g class="shadow" fill="${t.shadow}">${letters}</g>`
      + `<g class="glow" style="filter: blur(${(size * 0.07).toFixed(0)}px)">${lettersFilled}</g>`
      + `<g class="fill">${lettersFilled}</g>`
      + `<g class="stroke"><path pathLength="1" stroke="url(#ag-d)" d="${dD}"/><path pathLength="1" stroke="url(#ag-k)" d="${dK}"/></g>`
      + '</g>'
  return svgDoc(w, h, defs, body)
}

// --- output ---

const files = {
  'logo-icon/dk-icon-dark.svg': iconSvg('dark'),
  'logo-icon/dk-icon-light.svg': iconSvg('light'),
  'logo-icon/dk-icon-tile-dark.svg': tileSvg('dark'),
  'logo-icon/dk-icon-tile-gradient.svg': tileSvg('gradient'),
  'logo-icon/dk-icon-animated.svg': animatedIconSvg(),
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

  // social cards — dark bg, full lockup centered (OG, GitHub social preview)
  const socialCard = (W, H, mSize = 200) => {
    const m = monogram('dark', mSize, { glow: true, idPrefix: 'og' })
    const name = textLayout(fonts.clash600, 'Daniel Klein', mSize * 0.43)
    const nameBox = bbox(name.paths.map(p => p.path))
    const tag = textLayout(fonts.general600, 'IT SPECIALISTA', mSize * 0.17, mSize * 0.07)
    const tagBox = bbox(tag.paths.map(p => p.path))
    const cx = W / 2
    const blockH = (m.h - 2 * m.pad) + 48 + nameBox.h + 30 + tagBox.h
    const top = (H - blockH) / 2
    const body
      = `<g transform="translate(${(cx - m.w / 2).toFixed(2)},${(top - m.pad).toFixed(2)})">${m.g}</g>`
        + `<g fill="${C.dark.text}" transform="translate(${(cx - name.width / 2).toFixed(2)},${(top + (m.h - 2 * m.pad) + 48 - nameBox.y1).toFixed(2)})">${name.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
        + `<g fill="${C.dark.muted}" transform="translate(${(cx - tag.width / 2).toFixed(2)},${(top + (m.h - 2 * m.pad) + 48 + nameBox.h + 30 - tagBox.y1).toFixed(2)})">${tag.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
    return svgDoc(W, H, m.defs, body, C.bgDark)
  }
  mkdirSync(join(outDir, 'social'), { recursive: true })
  writeFileSync(join(outDir, 'og-image.png'), render(socialCard(1200, 630), 1200))
  console.log('wrote', join(outDir, 'og-image.png'))
  writeFileSync(join(outDir, 'social/github-social-preview.png'), render(socialCard(1280, 640), 1280))
  console.log('wrote', join(outDir, 'social/github-social-preview.png'))

  // LinkedIn banner 1584×396 — lockup right of center, left clear for the avatar overlap
  const banner = (() => {
    const W = 1584, H = 396
    const m = monogram('dark', 150, { glow: true, idPrefix: 'bn' })
    const name = textLayout(fonts.clash600, 'Daniel Klein', 64)
    const nameBox = bbox(name.paths.map(p => p.path))
    const tag = textLayout(fonts.general600, 'IT SPECIALISTA · KLEINDANIEL.COM', 20, 7)
    const tagBox = bbox(tag.paths.map(p => p.path))
    const gap = 44
    const blockW = (m.w - 2 * m.pad) + gap + Math.max(name.width, tag.width)
    const left = W * 0.58 - blockW / 2
    const my = (H - (m.h - 2 * m.pad)) / 2
    const textX = left + (m.w - 2 * m.pad) + gap
    const textBlockH = nameBox.h + 18 + tagBox.h
    const nameY = (H - textBlockH) / 2 - nameBox.y1
    const tagY = (H - textBlockH) / 2 + nameBox.h + 18 - tagBox.y1
    const body
      = `<g transform="translate(${(left - m.pad).toFixed(2)},${(my - m.pad).toFixed(2)})">${m.g}</g>`
        + `<g fill="${C.dark.text}" transform="translate(${textX.toFixed(2)},${nameY.toFixed(2)})">${name.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
        + `<g fill="${C.dark.muted}" transform="translate(${textX.toFixed(2)},${tagY.toFixed(2)})">${tag.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`
    return svgDoc(W, H, m.defs, body, C.bgDark)
  })()
  writeFileSync(join(outDir, 'social/linkedin-banner@2x.png'), render(banner, 3168))
  console.log('wrote', join(outDir, 'social/linkedin-banner@2x.png'))

  // email signature logo — compact light, small
  writeFileSync(join(outDir, 'png/sig-logo.png'), render(compactSvg('light'), 480))
  console.log('wrote', join(outDir, 'png/sig-logo.png'))

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
