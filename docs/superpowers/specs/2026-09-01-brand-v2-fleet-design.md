# Brand v2 — dk_ / fleet dashboard identity

Schváleno 2026-09-01 po vizuální iteraci (widgety: směr → znak → akcent → mockup).
Nahrazuje v1 (2026-06-11, Clash Display DK gradient monogram). Stylová SoT: develit-infra
`apps/fleet/app/app.vue`; precedent pro Nuxt UI mapping: develit-infra#187 (docs restyle).

## Značka

- **Znak `dk_`** — lowercase „dk" (JetBrains Mono Bold, křivky) + kurzor jako obdélník
  v akcentu. Kurzor je součást znaku. Kanonická podoba: na dlaždici `#10161e`,
  border `#1f2937` (1px @ 56px), rx 22,5 %. **Dlaždice zůstává tmavá i na světlém
  podkladu** — znak je samonosný.
- **Wordmark** `DANIEL//KLEIN` — JetBrains Mono Medium, tracking ~0.32em, `//` v akcentu.
  Role řádek `IT SPECIALISTA` — dim, menší, tracking širší.
- **Animovaná varianta**: blikání kurzoru (`steps`, ~1.1 s); `prefers-reduced-motion`
  → kurzor svítí staticky. Žádný stroke-draw, žádný glow.
- Mono varianty: black `#0f172a` / white / accent (glyfy i kurzor jednou barvou).
- Zákazy: gradienty, glow, stíny, deformace, změna poměru kurzoru.

## Paleta

| token | dark | light |
|---|---|---|
| bg | `#0a0e13` | `#f4f7fa` |
| panel | `#10161e` | `#ffffff` |
| panel-hover | `#131b25` | `#eef2f7` |
| line | `#1f2937` | `#d5dde6` |
| ink | `#d7e0ea` | `#1a232e` |
| dim | `#5f6f81` | `#5f6f81` |
| **accent** | `#48b7e0` | `#0e7ea8` (text; plochy mohou #48b7e0) |
| ok / warn / bad / plan | `#3ddc84` / `#f5b944` / `#ff5d5d` / `#6f9bd1` | `#14a257` / `#a87413` / `#d43d3d` / `#4a6fa5` |

Akcent `#48b7e0` má na bílé ~2.4:1 — na světlém podkladu se pro text vždy používá
tmavší stupeň. Tailwind ramp `dk`: 400 = `#48b7e0` (dark primary), 600 ≈ light text accent.

## Typografie

- Web: plný mono — `ui-monospace, 'SF Mono', 'Cascadia Code', 'JetBrains Mono', Menlo, monospace`
  (`--font-sans` i `--font-mono`). Žádné webfonty (Fontshare/@nuxt/fonts odstraněno).
- Assety: křivky z JetBrains Mono (statické TTF v `tools/logo/fonts/`, OFL).
- Ladder: uppercase + letter-spacing (0.35em wordmark → 0.14em sekce → 0.1em labely),
  menší text = širší tracking.

## Web

- Blueprint grid na body (47/48px hairlines + top radial akcent ~7 %), deck layout.
- Panely: 1px `line` border, 3px status levý border, radius 6px; dashed vnitřní dividery.
- Chips `color-mix(currentcolor 10%)`, dot statusy, reveal stagger animace.
- Dark default, light toggle; light tokeny v `:root`, dark v `.dark`.
- ScrollGlowLine → blueprint trace: 1px akcent, bez blur/halo/ping.
- Obsah: Pampeliška z referencí odstraněna, zůstává ModuLabs.

## Pipeline

Jediný zdroj geometrie: `tools/logo/lib.mjs` + `generate.mjs`. Výstupní kontrakt názvů
v1 zachován; reinterpretace: `dk-icon-tile-gradient.svg` = akcentová dlaždice,
`dk-mono-blue.svg` = akcent `#48b7e0`. SVG jen outlined paths/rects (žádné `<text>` —
resvg bez font DB). Manuál: `tools/logo/manual.mjs`.
