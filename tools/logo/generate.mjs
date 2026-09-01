// Brand asset generator — single source of truth for logo geometry.
// Usage: bun tools/logo/generate.mjs <outDir> [--png]
// Spec: docs/superpowers/specs/2026-09-01-brand-v2-fleet-design.md

import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fonts, C, textLayout, pathData, bbox, markGlyphs, wordmark, tileG, svgDoc } from './lib.mjs'

const outDir = process.argv[2] ?? 'brand-drafts'
const wantPng = process.argv.includes('--png')

// --- building blocks ---

function roleG(theme, size, x, y, text = 'IT SPECIALISTA') {
  const t = C[theme] ?? C.dark
  const tr = size * 0.45
  const run = textLayout(fonts.jb500, text, size, tr)
  const box = bbox(run.paths.map(p => p.path))
  return {
    g: `<g fill="${t.dim}" transform="translate(${x.toFixed(2)},${(y - box.y1).toFixed(2)})">${run.paths.map(p => `<path d="${pathData(p.path)}"/>`).join('')}</g>`,
    width: run.width - tr,
    h: box.h,
  }
}

// --- variants ---

function iconSvg(theme) {
  const m = markGlyphs(theme, 200)
  return svgDoc(m.w, m.h, '', m.g)
}

function tileSvg(kind) {
  const S = 512
  return svgDoc(S, S, '', tileG(S, kind))
}

function animatedTileSvg() {
  const S = 512
  const style = `<style>
    .cursor { animation: dk-blink 1.1s steps(1) infinite; }
    @keyframes dk-blink { 50% { opacity: 0; } }
    @media (prefers-reduced-motion: reduce) { .cursor { animation: none; opacity: 1; } }
  </style>`
  return svgDoc(S, S, '', style + tileG(S, 'dark'))
}

function compactSvg(theme, bg = null) {
  const Ts = 120
  const wm = wordmark(theme, 52)
  const gap = 40
  const w = Ts + gap + wm.width
  const body = tileG(Ts)
    + `<g transform="translate(${(Ts + gap).toFixed(2)},${((Ts - wm.h) / 2).toFixed(2)})">${wm.g}</g>`
  return svgDoc(w, Ts, '', body, bg)
}

function fullSvg(theme, bg = null) {
  const Ts = 176
  const wm = wordmark(theme, 44)
  const role = roleG(theme, 21, 0, 0)
  const pad = 48
  const gapWm = 44
  const gapRole = 26
  const w = Math.max(Ts, wm.width, role.width) + 2 * pad
  const cx = w / 2
  const top = 40
  const wmTop = top + Ts + gapWm
  const roleTop = wmTop + wm.h + gapRole
  const h = roleTop + role.h + top
  const roleBlock = roleG(theme, 21, cx - role.width / 2, roleTop)
  const body
    = `<g transform="translate(${(cx - Ts / 2).toFixed(2)},${top})">${tileG(Ts)}</g>`
      + `<g transform="translate(${(cx - wm.width / 2).toFixed(2)},${wmTop.toFixed(2)})">${wm.g}</g>`
      + roleBlock.g
  return svgDoc(w, h, '', body, bg)
}

function monoSvg(color) {
  const m = markGlyphs('dark', 200, { mono: color })
  return svgDoc(m.w, m.h, '', m.g)
}

// --- output ---

const files = {
  'logo-icon/dk-icon-dark.svg': iconSvg('dark'),
  'logo-icon/dk-icon-light.svg': iconSvg('light'),
  'logo-icon/dk-icon-tile-dark.svg': tileSvg('dark'),
  'logo-icon/dk-icon-tile-gradient.svg': tileSvg('accent'),
  'logo-icon/dk-icon-animated.svg': animatedTileSvg(),
  'logo-compact/dk-compact-dark.svg': compactSvg('dark'),
  'logo-compact/dk-compact-light.svg': compactSvg('light'),
  'logo-full/dk-full-dark.svg': fullSvg('dark'),
  'logo-full/dk-full-light.svg': fullSvg('light'),
  'logo-full/dk-full-dark-bg.svg': fullSvg('dark', C.bg),
  'logo-full/dk-full-light-bg.svg': fullSvg('light', '#ffffff'),
  'logo-monochrome/dk-mono-black.svg': monoSvg('#0f172a'),
  'logo-monochrome/dk-mono-white.svg': monoSvg('#ffffff'),
  'logo-monochrome/dk-mono-blue.svg': monoSvg(C.dark.accent),
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

  // favicons — tile; ≤32px uses the borderless small-tile variant
  const favDir = join(outDir, 'favicon')
  mkdirSync(favDir, { recursive: true })
  const smallTile = svgDoc(512, 512, '', tileG(512, 'small'))
  for (const s of [16, 32, 180, 512]) {
    const src = s <= 32 ? smallTile : files['logo-icon/dk-icon-tile-dark.svg']
    writeFileSync(join(favDir, `favicon-${s}.png`), render(src, s))
    console.log('wrote', join(favDir, `favicon-${s}.png`))
  }

  // social cards — fleet bg: blueprint grid + top accent radial, stacked lockup
  const blueprint = (W, H) => {
    let lines = ''
    for (let x = 48; x < W; x += 48) lines += `<rect x="${x}" width="1" height="${H}" fill="${C.grid}"/>`
    for (let y = 48; y < H; y += 48) lines += `<rect y="${y}" width="${W}" height="1" fill="${C.grid}"/>`
    return lines + `<ellipse cx="${W / 2}" cy="-60" rx="${(W * 0.55).toFixed(0)}" ry="240" fill="url(#og-glow)"/>`
  }
  const glowDef = `<radialGradient id="og-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C.dark.accent}" stop-opacity=".1"/><stop offset="1" stop-color="${C.dark.accent}" stop-opacity="0"/></radialGradient>`

  const socialCard = (W, H) => {
    const Ts = 190
    const wm = wordmark('dark', 46)
    const role = roleG('dark', 22, 0, 0)
    const gapWm = 52
    const gapRole = 30
    const blockH = Ts + gapWm + wm.h + gapRole + role.h
    const top = (H - blockH) / 2
    const cx = W / 2
    const roleBlock = roleG('dark', 22, cx - role.width / 2, top + Ts + gapWm + wm.h + gapRole)
    const body = blueprint(W, H)
      + `<g transform="translate(${(cx - Ts / 2).toFixed(2)},${top.toFixed(2)})">${tileG(Ts)}</g>`
      + `<g transform="translate(${(cx - wm.width / 2).toFixed(2)},${(top + Ts + gapWm).toFixed(2)})">${wm.g}</g>`
      + roleBlock.g
    return svgDoc(W, H, glowDef, body, C.bg)
  }
  mkdirSync(join(outDir, 'social'), { recursive: true })
  writeFileSync(join(outDir, 'og-image.png'), render(socialCard(1200, 630), 1200))
  console.log('wrote', join(outDir, 'og-image.png'))
  writeFileSync(join(outDir, 'social/github-social-preview.png'), render(socialCard(1280, 640), 1280))
  console.log('wrote', join(outDir, 'social/github-social-preview.png'))

  // LinkedIn banner 1584×396 — lockup right of center, left clear for the avatar overlap
  const banner = (() => {
    const W = 1584, H = 396
    const Ts = 150
    const wm = wordmark('dark', 50)
    const role = roleG('dark', 19, 0, 0, 'IT SPECIALISTA · KLEINDANIEL.COM')
    const gap = 48
    const blockW = Ts + gap + Math.max(wm.width, role.width)
    const left = W * 0.58 - blockW / 2
    const textX = left + Ts + gap
    const textBlockH = wm.h + 24 + role.h
    const roleBlock = roleG('dark', 19, textX, (H - textBlockH) / 2 + wm.h + 24, 'IT SPECIALISTA · KLEINDANIEL.COM')
    const body = blueprint(W, H)
      + `<g transform="translate(${left.toFixed(2)},${((H - Ts) / 2).toFixed(2)})">${tileG(Ts)}</g>`
      + `<g transform="translate(${textX.toFixed(2)},${((H - textBlockH) / 2).toFixed(2)})">${wm.g}</g>`
      + roleBlock.g
    return svgDoc(W, H, glowDef, body, C.bg)
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
    const body = inner.replace(/^<svg[^>]*>\n<defs><\/defs>\n/, '').replace(/<\/svg>\s*$/, '')
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="100%" height="100%" fill="#ffffff"/>
<g transform="translate(${((W - vw * scale) / 2).toFixed(2)},${((H - vh * scale) / 2).toFixed(2)}) scale(${scale.toFixed(4)})">${body}</g>
</svg>`
  })()
  writeFileSync(join(outDir, 'png/dk-full-light-faktura-420x140.png'), render(faktura, 840))
  console.log('wrote', join(outDir, 'png/dk-full-light-faktura-420x140.png'))
}
