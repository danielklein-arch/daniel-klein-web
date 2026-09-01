# Brand v2 — touchpoint inventura (2026-09-01)

Prioritizovaný seznam, kde všude brand žije a co po deployi v2 updatovat.
Assety: `brand/` (generuje `bun tools/logo/generate.mjs brand --png` + `bun tools/logo/manual.mjs`).

## P0 — jede samo s deployem

| Touchpoint | Asset | Stav |
|---|---|---|
| Web favicony + apple-touch-icon | `public/favicon-{16,32}.png`, `apple-touch-icon.png` | ✅ synced v repu |
| OG / Twitter card | `public/og-image.png` (`?v=2` cache-bust v head) | ✅ synced |
| Logo na webu (navbar/footer/hero) | inline SVG v `AppLogo.vue` | ✅ přepsáno |
| Sig logo hotlink | `public/sig-logo.png` (e-mail podpis ho hotlinkuje z kleindaniel.com) | ✅ synced — propíše se deployem |

## P1 — ruční kroky po deployi

| Touchpoint | Asset | Krok |
|---|---|---|
| E-mail podpis | `brand/email-signature.html` | zkopírovat do Gmail/klienta (barvy v2 už v souboru) |
| Faktura logo | `brand/png/dk-full-light-faktura-420x140.png` | nahrát do fakturačního nástroje (externí, žádné repo) |
| GitHub avatar | `brand/png/dk-icon-tile-dark@2x.png` | nahrát v GitHub settings |
| GitHub social preview repa | `brand/social/github-social-preview.png` | repo Settings → Social preview |
| LinkedIn avatar + banner | tile @2x + `brand/social/linkedin-banner@2x.png` | nahrát v profilu |
| Google Workspace avatar | tile @2x | nahrát v účtu |
| OG re-scrape | — | Facebook Sharing Debugger / LinkedIn Post Inspector po deployi |

## P2 — úklid mimo repo (po odsouhlasení)

| Co | Kde | Akce |
|---|---|---|
| Mirror nového balíku | `~/Agent OS/raw/assets/daniel-klein/Logos/` | přepsat obsahem `brand/` v2 |
| Stale kopie v1/v0 | `~/Agent OS/raw/assets/daniel-klein/Logos-old-2026-02/`, `~/Documents/Daniel Klein/Logos/` | smazat (duplikáty, zimní balík superseded) |

## Cloudflare audit (účet fcaeae5…, read-only 2026-09-01)

Zjištění: **v1 web je živý** — worker `daniel-klein-web` (modified 06-11) servíruje kleindaniel.com;
deploy jede automaticky z pushe do main (`.github/workflows/deploy.yml`). **Merge v2 do main = deploy.**

Kandidáti na zrušení (nic nemazáno, jen report):

- **Pampeliška (web končí)**: workery `pampeliska`, `pampeliska-dev`, `pampeliska-cms`, `pampeliska-cms-production`; D1 `cms-pampeliska` (~1 MB). Před smazáním zálohovat D1 (CMS obsah).
- **Fiat/backend fleet na osobním účtu** (06-09/06-10): ~28 workerů `dev-*` + `production-*` (gateway, auth, order, ledger, bank, rbac, pdf, queue-bus, notification, activity, organization, currencyfeed, secrets-store, frontend) + `mdm-gateway-{dev,preview,prod}` + D1 `dev-*`/`production-*` + KV `dev-*`/`production-*` + R2 `{preview,prod,production}-documents`, `production-receipts`. Vypadá jako dbu/fiat infra na ŠPATNÉM účtu (patří pod Devizova Burza) nebo opuštěný experiment — ověřit, zda něco z toho žije.
- **Monitoring fleet** (04-24 – 05-18): 13 workerů `monitoring-*` (dev/staging/production) + D1 `monitoring-{dev,staging,prod}` — pokud je nahrazeno cf-prod-watch, smazat.
- **Receipt scanner dev** (04-28): 4 workery `receipt-scanner-*-dev` + D1 + R2 bucket.
- **Jednorázovky**: `pr-999-ostom` (PR preview), `dev-drizzle-demo`, `turbo-cache` (worker + R2 — ověřit, jestli fleet buildy ještě používají).
- **Pages demos** (4 měsíce): `ht-demo` (ht-demo.kleindaniel.com), `healthy-twenty-offer` (offer.kleindaniel.com).
- **Prehistorické D1/KV** (2025): `organization_d1`, `transaction_d1`, KV `backend-fiat-*`, `cities`, `RATE_LIMIT_KV`.
- **Ponechat**: `daniel-klein-web`, `modulabs*` (klient), `lesenimost` (klient).

Billing pozn.: Workers Paid je účtováno per účet; úklid workerů sám o sobě moc neušetří,
ale pokud fiat/monitoring fleet nikdo nepoužívá, stojí za zvážení celý plán/limity.
