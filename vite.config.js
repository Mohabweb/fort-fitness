import { defineConfig, loadEnv } from 'vite';
import { dict } from './src/i18n.js';
import { SOCIAL, branches, plans, CURRENCY } from './src/data.js';
import { RENDERERS } from './src/render.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Build-time HTML step:
//  1. %SITE_URL% / %TITLE% / %DESC% placeholders
//  2. fills the English text of every [data-i18n], [data-i18n-alt], [data-i18n-aria] element from src/i18n.js
//     (so the static HTML has real content for crawlers and no-JS, and i18n.js stays the single source)
//  3. injects JSON-LD generated from src/data.js (no prices typed twice)
function fortHtml(siteUrl) {
  const en = dict.en;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['ExerciseGym', 'HealthClub'],
    name: 'Fort Fitness',
    url: siteUrl + '/',
    image: siteUrl + '/images/og.jpg',
    sameAs: [SOCIAL.instagram],
    areaServed: { '@type': 'City', name: 'Doha' },
    makesOffer: plans.map((p) => ({
      '@type': 'Offer',
      name: `${p.name.en} membership`,
      price: String(p.after),
      priceCurrency: CURRENCY,
      itemOffered: { '@type': 'Service', name: `Fort Fitness ${p.name.en} membership` },
    })),
    department: branches.map((b) => ({
      '@type': ['ExerciseGym', 'HealthClub'],
      name: `Fort Fitness, ${b.name.en}`,
      telephone: b.phone,
      sameAs: [SOCIAL.instagram],
      address: {
        '@type': 'PostalAddress',
        streetAddress: b.streetAddress,
        addressLocality: 'Doha',
        addressCountry: 'QA',
      },
    })),
  };

  return {
    name: 'fort-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replaceAll('%SITE_URL%', siteUrl)
          .replaceAll('%TITLE%', esc(en['meta.title']))
          .replaceAll('%DESC%', esc(en['meta.desc']))
          .replace('<!--JSONLD-->', `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`)
          // <tag ... data-i18n="key" ...></tag>  ->  fill the (empty) element with the English string
          .replace(/(<([a-z0-9]+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)(<\/\2>)/g, (m, open, tag, key, close) => {
            if (!(key in en)) throw new Error(`Missing i18n key: ${key}`);
            return open + en[key].replace('{year}', new Date().getFullYear()) + close;
          })
          // <div data-render="plans"></div>  ->  English markup built from src/data.js (browser re-renders on language change)
          .replace(/(<([a-z0-9]+)\b[^>]*\sdata-render="([^"]+)"[^>]*>)(<\/\2>)/g, (m, open, tag, name, close) => {
            if (!RENDERERS[name]) throw new Error(`Unknown renderer: ${name}`);
            return open + RENDERERS[name]('en', { branch: 0, reveal: true }) + close;
          })
          .replace(/data-i18n-alt="([^"]+)"/g, (m, key) => {
            if (!(key in en)) throw new Error(`Missing i18n key: ${key}`);
            return `${m} alt="${esc(en[key])}"`;
          })
          .replace(/data-i18n-aria="([^"]+)"/g, (m, key) => {
            if (!(key in en)) throw new Error(`Missing i18n key: ${key}`);
            return `${m} aria-label="${esc(en[key])}"`;
          });
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.SITE_URL || 'https://fortfitness.example').replace(/\/$/, '');
  return {
    base: './', // relative asset URLs: deploys to a domain root or a sub-path
    plugins: [fortHtml(siteUrl)],
    build: { target: 'es2020' },
  };
});
