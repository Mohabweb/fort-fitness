# Fort Fitness: marketing site

Single-page site for Fort Fitness (Doha, Qatar). Vite + vanilla HTML/CSS/JS, GSAP + ScrollTrigger only.
English (default) and Arabic (RTL).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

`dist/` uses relative asset paths (`base: './'`), so it can be dropped on any static host or sub-folder.

## Before launch

Set the real domain in `.env`:

```
SITE_URL=https://your-domain.example
```

It feeds canonical, hreflang, Open Graph/Twitter URLs and the JSON-LD. Rebuild afterwards.

## Where things live

| What | Where |
| --- | --- |
| Plans (QAR), branches, phones, Instagram | `src/data.js`. The single source: plan cards, hero "plans from" chip, call links, Maps links and the JSON-LD are all generated from it |
| All copy, English + Arabic | `src/i18n.js` |
| Markup | `index.html` |
| Colours, fonts, spacing tokens | `src/styles/tokens.css` |
| Pixel section transition | `src/transition.js`, enabled per section with `data-st-03="<columns>"` |
| Animation, menu, language, branch selector | `src/main.js` |

Change a price or phone number in `src/data.js` only.

## Swap photos / logo

- Photos are in `public/images/` as responsive WebP sets (`name-480.webp`, `name-800.webp`, ...).
  Replace a set with same-named files, or edit the `src` / `srcset` / `width` / `height` on the `<img>` in `index.html`.
  The hero photo is `hero-reception-*`. Keep its 4:5 crop (1600x2000 source).
- `public/images/og.jpg` is the 1200x630 social share image.
- Logo: the header/footer wordmark is text (`.wordmark` in `index.html`). The favicon and touch icon are
  `public/favicon.png` (64px) and `public/apple-touch-icon.png` (180px). Replace them with the final logo files.
- Fonts are self-hosted in `public/fonts/`.

## Notes

- Opening hours, trainers, amenities and testimonials are intentionally absent; none were provided.
- With `prefers-reduced-motion`, the pixel transition and entrance animations are skipped.
