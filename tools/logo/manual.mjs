// Mini brand manual — 3 pages A4, vector SVG pages rendered via resvg, assembled with pdf-lib.
// Usage: bun tools/logo/manual.mjs <outPdf>
// Spec: docs/superpowers/specs/2026-09-01-brand-v2-fleet-design.md

import { writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'
import { PDFDocument } from 'pdf-lib'
import { fonts, C, markGlyphs, wordmark, tileG, svgDoc, textG } from './lib.mjs'

const outPdf = process.argv[2] ?? 'brand/DanielKlein_BrandManual.pdf'
const W = 1240
const H = 1754
const M = 110 // page margin

const ink = C.light.ink
const dim = C.light.dim
const bodyFill = '#33404d'

const heading = (text, y) =>
  textG(fonts.jb700, text, 40, ink, M, y).g
  + `<rect x="${M}" y="${y + 58}" width="64" height="5" rx="2.5" fill="${C.light.accent}"/>`

const label = (text, x, y, fill = dim) => textG(fonts.jb500, text, 16, fill, x, y, 2.5).g
const body = (lines, x, y, size = 19, fill = bodyFill, lh = 40) =>
  lines.map((ln, i) => textG(fonts.jb400, ln, size, fill, x, y + i * lh).g).join('')

const blueprint = (w, h) => {
  let lines = ''
  for (let x = 48; x < w; x += 48) lines += `<rect x="${x}" width="1" height="${h}" fill="${C.grid}"/>`
  for (let y = 48; y < h; y += 48) lines += `<rect y="${y}" width="${w}" height="1" fill="${C.grid}"/>`
  return lines
}

// ---------- page 1 — cover ----------
const cover = (() => {
  const Ts = 300
  const wm = wordmark('dark', 62)
  const cx = W / 2
  const top = H * 0.26
  let g = blueprint(W, H)
  g += `<g transform="translate(${(cx - Ts / 2).toFixed(2)},${top.toFixed(2)})">${tileG(Ts)}</g>`
  g += `<g transform="translate(${(cx - wm.width / 2).toFixed(2)},${(top + Ts + 90).toFixed(2)})">${wm.g}</g>`
  const tagW = textG(fonts.jb500, 'BRAND MANUAL', 26, C.dark.accent, 0, 0, 12).width - 12
  g += textG(fonts.jb500, 'BRAND MANUAL', 26, C.dark.accent, cx - tagW / 2, top + Ts + 230, 12).g
  const verText = 'v2.0 — září 2026 · kleindaniel.com'
  const verW = textG(fonts.jb400, verText, 20, C.dark.dim, 0, 0).width
  g += textG(fonts.jb400, verText, 20, C.dark.dim, cx - verW / 2, H - 140).g
  return svgDoc(W, H, '', g, C.bg)
})()

// ---------- page 2 — logo ----------
const pageLogo = (() => {
  let g = heading('Logo', 70)

  // panels: full dark / full light (tile stays dark on both)
  const panelY = 230
  const panelH = 430
  const panelW = (W - 2 * M - 40) / 2
  g += `<rect x="${M}" y="${panelY}" width="${panelW}" height="${panelH}" rx="18" fill="${C.bg}"/>`
  g += `<rect x="${M + panelW + 40}" y="${panelY}" width="${panelW}" height="${panelH}" rx="18" fill="#ffffff" stroke="${C.light.line ?? '#d5dde6'}" stroke-width="2"/>`

  const fullM = (theme, px) => {
    const Ts = 150
    const wm = wordmark(theme, 27)
    const cx = px + panelW / 2
    let s = `<g transform="translate(${(cx - Ts / 2).toFixed(2)},${panelY + 60})">${tileG(Ts)}</g>`
    s += `<g transform="translate(${(cx - wm.width / 2).toFixed(2)},${panelY + 60 + Ts + 50})">${wm.g}</g>`
    const role = textG(fonts.jb500, 'IT SPECIALISTA', 17, C[theme].dim, 0, 0, 8)
    s += textG(fonts.jb500, 'IT SPECIALISTA', 17, C[theme].dim, cx - (role.width - 8) / 2, panelY + 60 + Ts + 110, 8).g
    return s
  }
  g += fullM('dark', M)
  g += fullM('light', M + panelW + 40)
  g += label('FULL — DARK', M, panelY + panelH + 24)
  g += label('FULL — LIGHT (dlaždice zůstává tmavá)', M + panelW + 40, panelY + panelH + 24)

  // row: compact + icon + tile + accent tile
  const rowY = panelY + panelH + 110
  const rowH = 240
  const cells = 4
  const cellW = (W - 2 * M - 3 * 28) / cells
  const bgs = [C.bg, C.bg, null, '#ffffff']
  const labels = ['COMPACT', 'ICON', 'TILE', 'MONO']
  for (let i = 0; i < cells; i++) {
    const x = M + i * (cellW + 28)
    if (bgs[i]) g += `<rect x="${x}" y="${rowY}" width="${cellW}" height="${rowH}" rx="14" fill="${bgs[i]}"${bgs[i] === '#ffffff' ? ` stroke="#d5dde6" stroke-width="2"` : ''}/>`
    g += label(labels[i], x, rowY + rowH + 20)
  }
  // compact — scaled to fit the cell
  {
    const Ts = 52
    const wm = wordmark('dark', 20)
    const total = Ts + 18 + wm.width
    const s = Math.min(1, (cellW - 30) / total)
    const x0 = M + (cellW - total * s) / 2
    const y0 = rowY + rowH / 2
    g += `<g transform="translate(${x0.toFixed(2)},${y0.toFixed(2)}) scale(${s.toFixed(3)})">`
      + `<g transform="translate(0,${(-Ts / 2).toFixed(2)})">${tileG(Ts)}</g>`
      + `<g transform="translate(${Ts + 18},${(-wm.h / 2).toFixed(2)})">${wm.g}</g>`
      + `</g>`
  }
  // icon (bare mark)
  {
    const m = markGlyphs('dark', 100)
    g += `<g transform="translate(${(M + cellW + 28 + (cellW - m.w) / 2).toFixed(2)},${rowY + (rowH - m.h) / 2})">${m.g}</g>`
  }
  // tile
  {
    const S = 170
    const x = M + 2 * (cellW + 28) + (cellW - S) / 2
    g += `<g transform="translate(${x.toFixed(2)},${rowY + (rowH - S) / 2})">${tileG(S)}</g>`
  }
  // mono (black on white)
  {
    const m = markGlyphs('dark', 100, { mono: '#0f172a' })
    g += `<g transform="translate(${(M + 3 * (cellW + 28) + (cellW - m.w) / 2).toFixed(2)},${rowY + (rowH - m.h) / 2})">${m.g}</g>`
  }

  // rules
  const rulesY = rowY + rowH + 90
  g += textG(fonts.jb700, 'Pravidla', 30, ink, M, rulesY).g
  g += body([
    'Kurzor je součást znaku — nikdy ho neodstraňuj, neměň jeho barvu ani proporce.',
    'Dlaždice zůstává tmavá (#10161E) i na světlém podkladu — znak je samonosný.',
    'Ochranná zóna — kolem loga drž volný prostor minimálně o výšce poloviny znaku.',
    'Minimální velikost — dlaždice 24 px; pod 32 px používej verzi bez borderu (favicon set).',
    'Žádné gradienty, glow ani stíny. Barvy jen z palety.',
    'Na fotografiích a rušném pozadí používej mono verzi (bílá / černá).',
  ], M, rulesY + 60, 19, bodyFill, 40)

  return svgDoc(W, H, '', g, '#ffffff')
})()

// ---------- page 3 — colors & typography ----------
const pageColor = (() => {
  let g = heading('Barvy', 70)

  const swatches = [
    [C.bg, 'Pozadí (bg)'],
    [C.tile, 'Panel / dlaždice'],
    ['#1f2937', 'Linka (line)'],
    ['#d7e0ea', 'Text (ink)'],
    ['#5f6f81', 'Tlumený (dim)'],
    ['#48b7e0', 'Akcent'],
    ['#0e7ea8', 'Akcent — light text'],
    ['#3ddc84', 'Status OK'],
    ['#f5b944', 'Status WARN'],
    ['#ff5d5d', 'Status BAD'],
    ['#6f9bd1', 'Status PLAN'],
    ['#f4f7fa', 'Pozadí light'],
  ]
  const swY = 210
  const cols = 4
  const rowStep = 190
  const swW = (W - 2 * M - (cols - 1) * 28) / cols
  swatches.forEach(([hex, name], i) => {
    const x = M + (i % cols) * (swW + 28)
    const y = swY + Math.floor(i / cols) * rowStep
    const needsStroke = ['#f4f7fa', '#d7e0ea'].includes(hex)
    g += `<rect x="${x}" y="${y}" width="${swW}" height="100" rx="14" fill="${hex}"${needsStroke ? ' stroke="#d5dde6" stroke-width="2"' : ''}/>`
    g += textG(fonts.jb500, name, 17, ink, x, y + 120).g
    g += textG(fonts.jb400, hex.toUpperCase(), 16, dim, x, y + 148).g
  })

  const noteY = swY + 3 * rowStep + 20
  g += body([
    'Dark režim je výchozí. Light mapování: bg #F4F7FA, panel #FFFFFF, linka #D5DDE6,',
    'text #1A232E; akcent pro text na světlé vždy #0E7EA8 (světlý #48B7E0 nemá kontrast).',
  ], M, noteY, 18, dim, 34)

  // typography
  const tyY = noteY + 140
  g += heading('Typografie', tyY - 60)
  g += textG(fonts.jb700, 'JetBrains Mono', 52, ink, M, tyY + 90).g
  g += textG(fonts.jb400, 'AaBbCc 0123456789 — logo a assety (křivky z TTF, OFL)', 24, bodyFill, M, tyY + 170).g
  g += textG(fonts.jb500, 'SYSTÉMOVÝ MONO STACK', 26, ink, M, tyY + 250, 4).g
  g += body([
    'Web: ui-monospace, SF Mono, Cascadia Code, JetBrains Mono, Menlo, monospace.',
    'Ladder: menší text = širší tracking (0.35em wordmark, 0.14em sekce, 0.1em labely).',
  ], M, tyY + 310, 19, bodyFill, 36)

  // footer
  g += textG(fonts.jb400, 'Zdroj pravdy: tools/logo/ v repu daniel-klein-web · spec docs/superpowers/specs/2026-09-01-brand-v2-fleet-design.md', 14, '#8494a5', M, H - 110).g
  return svgDoc(W, H, '', g, '#ffffff')
})()

// ---------- assemble ----------
const pages = [cover, pageLogo, pageColor]
const pdf = await PDFDocument.create()
pdf.setTitle('Daniel Klein — Brand Manual')
pdf.setAuthor('Daniel Klein')
for (const [i, svg] of pages.entries()) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: W * 2 } }).render().asPng()
  if (process.env.DEBUG_PAGES) writeFileSync(`/tmp/dk-check/manual-p${i + 1}.png`, png)
  const img = await pdf.embedPng(png)
  const page = pdf.addPage([595.28, 841.89])
  page.drawImage(img, { x: 0, y: 0, width: 595.28, height: 841.89 })
}
writeFileSync(outPdf, await pdf.save())
console.log('wrote', outPdf)
