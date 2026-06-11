// Mini brand manual — 3 pages A4, vector SVG pages rendered via resvg, assembled with pdf-lib.
// Usage: bun tools/logo/manual.mjs <outPdf>

import { writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'
import { PDFDocument } from 'pdf-lib'
import { fonts, C, textLayout, monogram, svgDoc, textG } from './lib.mjs'

const outPdf = process.argv[2] ?? 'brand/DanielKlein_BrandManual.pdf'
const W = 1240
const H = 1754
const M = 110 // page margin

const heading = (text, y) =>
  textG(fonts.clash600, text, 44, C.light.text, M, y).g
  + `<rect x="${M}" y="${y + 62}" width="64" height="5" rx="2.5" fill="${C.dark.d[0]}"/>`

const label = (text, x, y, fill = C.light.muted) => textG(fonts.general600, text, 17, fill, x, y, 2.5).g
const body = (lines, x, y, size = 20, fill = '#334155', lh = 34) =>
  lines.map((ln, i) => textG(fonts.general500, ln, size, fill, x, y + i * lh).g).join('')

// ---------- page 1 — cover ----------
const cover = (() => {
  const m = monogram('dark', 300, { glow: true, idPrefix: 'cv' })
  const name = textLayout(fonts.clash600, 'Daniel Klein', 96)
  const cx = W / 2
  let g = `<g transform="translate(${(cx - m.w / 2).toFixed(2)},${(H * 0.30 - m.pad).toFixed(2)})">${m.g}</g>`
  g += textG(fonts.clash600, 'Daniel Klein', 96, C.dark.text, cx - name.width / 2, H * 0.30 + m.h - 2 * m.pad + 90).g
  const tag = textLayout(fonts.general600, 'BRAND MANUAL', 30, 12)
  g += textG(fonts.general600, 'BRAND MANUAL', 30, '#22d3ee', cx - tag.width / 2, H * 0.30 + m.h - 2 * m.pad + 240, 12).g
  const ver = textLayout(fonts.general500, 'v1.0 — červen 2026 · kleindaniel.com', 22)
  g += textG(fonts.general500, 'v1.0 — červen 2026 · kleindaniel.com', 22, C.dark.muted, cx - ver.width / 2, H - 140).g
  return svgDoc(W, H, m.defs, g, C.bgDark)
})()

// ---------- page 2 — logo ----------
const pageLogo = (() => {
  let defs = ''
  let g = heading('Logo', M - 10 + 0)

  // panels: full dark / full light
  const panelY = 230
  const panelH = 430
  const panelW = (W - 2 * M - 40) / 2
  g += `<rect x="${M}" y="${panelY}" width="${panelW}" height="${panelH}" rx="18" fill="${C.bgDark}"/>`
  g += `<rect x="${M + panelW + 40}" y="${panelY}" width="${panelW}" height="${panelH}" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>`

  const fullM = (theme, px, prefix) => {
    const m = monogram(theme, 130, { idPrefix: prefix })
    const t = C[theme]
    const cx = px + panelW / 2
    let s = `<g transform="translate(${(cx - m.w / 2).toFixed(2)},${panelY + 70})">${m.g}</g>`
    const name = textLayout(fonts.clash600, 'Daniel Klein', 48)
    s += textG(fonts.clash600, 'Daniel Klein', 48, t.text, cx - name.width / 2, panelY + 250).g
    const tag = textLayout(fonts.general600, 'IT SPECIALISTA', 21, 8)
    s += textG(fonts.general600, 'IT SPECIALISTA', 21, t.muted, cx - tag.width / 2, panelY + 320, 8).g
    defs += m.defs
    return s
  }
  g += fullM('dark', M, 'pd')
  g += fullM('light', M + panelW + 40, 'pl')
  g += label('FULL — DARK', M, panelY + panelH + 24)
  g += label('FULL — LIGHT', M + panelW + 40, panelY + panelH + 24)

  // row: compact + icon + tile + mono
  const rowY = panelY + panelH + 110
  const rowH = 240
  const cells = 4
  const cellW = (W - 2 * M - 3 * 28) / cells
  const bgs = [C.bgDark, C.bgDark, null, '#ffffff']
  const labels = ['COMPACT', 'ICON', 'TILE', 'MONO']
  for (let i = 0; i < cells; i++) {
    const x = M + i * (cellW + 28)
    if (bgs[i]) g += `<rect x="${x}" y="${rowY}" width="${cellW}" height="${rowH}" rx="14" fill="${bgs[i]}"${bgs[i] === '#ffffff' ? ' stroke="#e2e8f0" stroke-width="2"' : ''}/>`
    g += label(labels[i], x, rowY + rowH + 20)
  }
  // compact
  {
    const m = monogram('dark', 42, { idPrefix: 'rc' })
    defs += m.defs
    const name = textLayout(fonts.clash600, 'Daniel Klein', 23)
    const total = m.w + 14 + name.width
    const x0 = M + (cellW - total) / 2
    g += `<g transform="translate(${x0.toFixed(2)},${rowY + rowH / 2 - (m.h / 2)})">${m.g}</g>`
    g += textG(fonts.clash600, 'Daniel Klein', 23, C.dark.text, x0 + m.w + 14, rowY + rowH / 2 - 9).g
  }
  // icon
  {
    const m = monogram('dark', 110, { idPrefix: 'ri' })
    defs += m.defs
    g += `<g transform="translate(${(M + cellW + 28 + (cellW - m.w) / 2).toFixed(2)},${rowY + (rowH - m.h) / 2})">${m.g}</g>`
  }
  // tile
  {
    const S = 170
    const x = M + 2 * (cellW + 28) + (cellW - S) / 2
    const y = rowY + (rowH - S) / 2
    const m = monogram('dark', 72, { idPrefix: 'rt' })
    defs += m.defs
    g += `<rect x="${x}" y="${y}" width="${S}" height="${S}" rx="${S * 0.225}" fill="${C.tileDark}"/>`
    g += `<g transform="translate(${(x + (S - m.w) / 2).toFixed(2)},${(y + (S - m.h) / 2).toFixed(2)})">${m.g}</g>`
  }
  // mono
  {
    const m = monogram('dark', 100, { shadow: false, mono: '#0f172a', idPrefix: 'rm' })
    g += `<g transform="translate(${(M + 3 * (cellW + 28) + (cellW - m.w) / 2).toFixed(2)},${rowY + (rowH - m.h) / 2})">${m.g}</g>`
  }

  // rules
  const rulesY = rowY + rowH + 90
  g += textG(fonts.clash600, 'Pravidla', 32, C.light.text, M, rulesY).g
  g += body([
    'Ochranná zóna — kolem loga drž volný prostor minimálně o výšce poloviny monogramu.',
    'Minimální velikost — icon 24 px; pod 32 px používej verzi bez stínu (favicon set).',
    'Stín je vždy plný, posunutý vpravo dolů (6 % / 9 % velikosti). Nikdy rozmazaný.',
    'Glow patří jen do digitálu na tmavé pozadí — v tisku a na světlé nikdy.',
    'Nedeformuj, nerotuj, neměň gradient ani mezeru mezi D a K.',
    'Na fotografiích a rušném pozadí používej mono verzi (bílá / černá).',
  ], M, rulesY + 60, 20, '#334155', 40)

  return svgDoc(W, H, defs, g, '#ffffff')
})()

// ---------- page 3 — colors & typography ----------
const pageColor = (() => {
  let defs = ''
  let g = heading('Barvy', 70)

  const swatches = [
    ['#070b14', 'Pozadí dark', '#070b14'],
    ['#0d1320', 'Plochy dark', '#0d1320'],
    ['#3b82f6', 'Blue 500', '#3b82f6'],
    ['#22d3ee', 'Cyan 400', '#22d3ee'],
    ['#0f2547', 'Stín monogramu', '#0f2547'],
    ['#2563eb', 'Blue 600 (light)', '#2563eb'],
    ['#0891b2', 'Cyan 600 (light)', '#0891b2'],
    ['#f1f5f9', 'Text na dark', '#f1f5f9'],
  ]
  const swY = 220
  const cols = 4
  const swW = (W - 2 * M - (cols - 1) * 28) / cols
  swatches.forEach(([hex, name], i) => {
    const x = M + (i % cols) * (swW + 28)
    const y = swY + Math.floor(i / cols) * 220
    g += `<rect x="${x}" y="${y}" width="${swW}" height="120" rx="14" fill="${hex}"${hex === '#f1f5f9' ? ' stroke="#e2e8f0" stroke-width="2"' : ''}/>`
    g += textG(fonts.general600, name, 19, C.light.text, x, y + 140).g
    g += textG(fonts.general500, hex.toUpperCase(), 18, C.light.muted, x, y + 170).g
  })

  // gradient bar
  const gradY = swY + 2 * 220 + 10
  defs += '<linearGradient id="gb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>'
  g += `<rect x="${M}" y="${gradY}" width="${W - 2 * M}" height="56" rx="12" fill="url(#gb)"/>`
  g += textG(fonts.general500, 'Primární gradient 135° — #3B82F6 do #22D3EE (na světlém podkladu #2563EB do #0891B2)', 18, C.light.muted, M, gradY + 76).g

  // typography
  const tyY = gradY + 170
  g += heading('Typografie', tyY - 60)
  g += textG(fonts.clash700, 'Clash Display', 56, C.light.text, M, tyY + 90).g
  g += textG(fonts.clash600, 'AaBbCc 0123456789 — headingy, logo (600/700)', 26, '#334155', M, tyY + 170).g
  g += textG(fonts.general600, 'General Sans', 44, C.light.text, M, tyY + 260).g
  g += textG(fonts.general500, 'AaBbCc 0123456789 — běžný text, UI (400–600)', 26, '#334155', M, tyY + 330).g
  g += textG(fonts.general500, 'Oba fonty: Fontshare (ITF), zdarma i pro komerční použití.', 20, C.light.muted, M, tyY + 400).g

  // footer
  g += textG(fonts.general500, 'Zdroj pravdy: tools/logo/ v repu daniel-klein-web · spec docs/superpowers/specs/2026-06-11-brand-identity-design.md', 16, '#94a3b8', M, H - 110).g
  return svgDoc(W, H, defs, g, '#ffffff')
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
