# Brand identita Daniel Klein — design spec

Schváleno 2026-06-11 (brainstorm přes visual companion, mockupy v `.superpowers/brainstorm/44284-1781156863/content/`, referenční: `b4-refine.html` V4 + `lockups.html` č. 2).

## Typografie
- **Clash Display** 600/700 (Fontshare) — logo, headingy
- **General Sans** (Fontshare) — text, UI

## Barvy
| Token | Hodnota |
|---|---|
| Pozadí dark | `#070b14` |
| Plochy dark | `#0d1320` |
| Gradient dark | `#3b82f6` → `#22d3ee` (135°), K znak doběh do `#67e8f9` |
| Gradient light | `#2563eb` → `#0891b2`, K doběh `#06b6d4` |
| Stín monogramu dark | `#0f2547` |
| Stín monogramu light | `#dbeafe` |
| Glow | cyan `rgba(34,211,238,.35–.45)` — jen digitál/dark; NE v SVG souborech (pixelace při rasterizaci filtrů) — na webu CSS `drop-shadow`, v rasterech (OG) feDropShadow přes resvg |
| Text | slate škála |

## Monogram
„DK" Clash Display 700, mezera mezi znaky ~10 % velikosti (žádný overlap), plný stín posunutý vpravo dolů (dx ~6 %, dy ~9 %), gradientní výplň (D modřejší, K cyanovější), cyan glow. Velikosti ≤32 px: bez stínu i glow.

## Lockupy
- **full** — stacked: monogram, pod ním „Daniel Klein" (Clash 600), pod tím „IT SPECIALISTA" (General Sans, letter-spacing, slate)
- **compact** — horizontální: monogram + „Daniel Klein", bez role
- **icon** — samotné DK; tile verze (zaoblená dlaždice — dark bg s gradientními znaky / gradientní bg s navy znaky)
- **mono** — black / white / blue `#2563eb`, bez gradientu, stínu i glow

Vše dark + light, SVG-first (text na křivkách), PNG @2x, favicon 16/32/180/512, OG 1200×630, faktura 420×140.

## Generování
`tools/logo/generate.mjs` (Bun + opentype.js + resvg-js) — jediný zdroj pravdy pro geometrii. Fonty v `tools/logo/fonts/`.
