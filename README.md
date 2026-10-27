# TKD Scoring product website

A separate bilingual product, guide and subscription website for **TKD Scoring by Adam Aghzaf · TKDTech Sports Management**.

## Pages

- `/tkd-scoring/` — animated product presentation with real application screenshots.
- `/tkd-scoring/guide/` — searchable installation, tournament, pairing, scoring, backup and LAN troubleshooting guide.
- `/tkd-scoring/subscription/` — monthly/annual MAD pricing and validated club requests delivered by visitor-initiated WhatsApp or email.

The site does not take online payments and does not transmit form details automatically. WhatsApp and email links are explicit user actions.

## Technology

Next.js App Router, strict TypeScript, React, Tailwind CSS, Lucide icons, React Hook Form/Zod, static export, local WebP assets, bilingual client content, reduced-motion support and a service worker for offline guide access. No external fonts, trackers, CDN scripts or runtime backend are required.

## Verify locally

```bash
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
```

`npm run check` performs strict type checking, zero-warning lint, unit tests and the optimized static build. The exported site is written to `out/`.

Preview the exact GitHub Pages base path:

```bash
npm run preview
# http://localhost:4173/tkd-scoring/
```

## Deployment

GitHub Actions builds and tests the static export, then publishes it with GitHub Pages. The public origin is:

- https://adamaghzad.github.io/tkd-scoring/

The production `basePath` is `/tkd-scoring`; development and local preview navigation account for it explicitly.

## Product boundary

This is independent software. It does not claim WT, KPNP or Daedo affiliation or certification, sensor-based PSS equivalence, or official-tournament readiness without physical Windows and venue validation.
