# SPA SEO Audit Report

**Date:** 2026-06-11
**Target:** http://localhost:3000 (prod: https://kleindaniel.com)
**Stack:** Nuxt 4 + @nuxt/ui + @nuxt/fonts + @nuxt/icon, nitro `cloudflare_module`

## Executive Summary
- Overall score: **72/100**
- Critical issues: 1 (robots.txt chybí)
- Quick wins: 4 (sitemap, canonical, JSON-LD, security headers)

## Score
| Category | Score | Weight | Notes |
|---|:---:|:---:|---|
| Crawlability (robots, sitemap, canonical) | 42 | ×2 | robots 404 (critical), sitemap 404 (high), canonical chybí (high) |
| Meta & OpenGraph | 92 | ×1 | title/desc/og/twitter ✓, absolutní og:image ✓; twitter:image chybí (low) |
| Structured Data | 75 | ×1 | žádný JSON-LD (Person/WebSite doporučeno, medium) |
| Core Web Vitals | 95 | ×1 | TTFB 9 ms, HTML 66 KB, SSR ✓; img bez width/height (low) |
| Technical | 90 | ×1 | 1×h1 ✓, 404 ✓, hierarchie ✓; security headers ověřit v prod (medium-) |
| **OVERALL** | **72** | | (42×2 + 92 + 75 + 95 + 90) / 6 |

## Issues
| # | Severity | Category | Issue | File | Fix |
|---|---|---|---|---|---|
| 1 | critical | Crawl | `robots.txt` → 404 | `public/` | statický `public/robots.txt` se Sitemap odkazem |
| 2 | high | Crawl | `sitemap.xml` → 404 | `public/` | statický single-entry sitemap |
| 3 | high | Crawl | chybí canonical | `nuxt.config.ts` | `link: [{ rel: 'canonical', href: 'https://kleindaniel.com' }]` |
| 4 | medium | Schema | žádný JSON-LD | `nuxt.config.ts` | Person + WebSite skript |
| 5 | medium | Tech | security headers (HSTS, nosniff…) | `public/_headers` | CF `_headers` soubor |
| 6 | low | CWV | `<img>` screenshoty bez width/height | `SectionProjects.vue` | doplnit `width="1200" height="750"` |
| 7 | low | Meta | `twitter:image` chybí | `nuxt.config.ts` | doplnit meta |

## Lighthouse
Neběžel (headless prostředí omezené); fallback metriky: TTFB 0.009 s, HTML 66 KB, 0 render-blocking stylesheets nad limit.

## Not Tested
- Production HTTPS/HSTS (lokální audit)
- schema.org validita (https://validator.schema.org/)
- Real-device CWV

## Priority Action Items
1. robots.txt + sitemap.xml (crawl základ)
2. canonical + twitter:image
3. JSON-LD Person/WebSite
4. public/_headers security headers
5. width/height na project screenshoty
