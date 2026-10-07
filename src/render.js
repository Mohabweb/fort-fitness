// HTML-string renderers for everything that comes from src/data.js (plans, branches, phones, social).
// Pure functions with no DOM access, so they run in the browser (language / branch changes)
// and inside vite.config.js (the English version is baked into index.html for SEO and no-JS).
import { dict } from './i18n.js';
import {
  SOCIAL, branches, plans, bestPlan, mapsUrl, saving, fmtPerMonth, fmtNum,
} from './data.js';

const tr = (L, k) => dict[L][k];
const icon = (n, cls = 'ic') => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${n}"/></svg>`;
const ltr = (s) => `<bdi dir="ltr">${s}</bdi>`;

function plansHtml(L, { branch = 0, reveal = false } = {}) {
  const b = branches[branch];
  return plans
    .map((p) => {
      const best = p.id === bestPlan.id;
      return `<article class="plan glass${best ? ' plan--best' : ''}"${reveal ? ' data-reveal' : ''}>
  <div class="plan-top"><span class="pill">${p.name[L]}</span>${best ? `<span class="badge">${tr(L, 'plans.best')}</span>` : ''}</div>
  <p class="plan-was"><span class="sr-only">${tr(L, 'plans.was')}: </span><s>${fmtNum(p.before)} ${tr(L, 'plans.qar')}</s></p>
  <p class="plan-now"><strong>${fmtNum(p.after)}</strong><span class="cur">${tr(L, 'plans.qar')}</span></p>
  <p class="plan-save">${tr(L, 'plans.save').replace('{n}', fmtNum(saving(p)))}</p>
  <dl class="spec">
    <div><dt>${tr(L, 'plans.perMonth')}</dt><dd>${ltr(fmtPerMonth(p))} ${tr(L, 'plans.qarMonth')}</dd></div>
    <div><dt>${tr(L, 'plans.duration')}</dt><dd>${p.duration[L]}</dd></div>
  </dl>
  <a class="btn btn--primary btn--block" href="tel:${b.tel}" data-call>${icon('phone')}<span>${tr(L, 'plans.cta')}</span></a>
  <p class="plan-phone" data-call-num>${ltr(b.phone)}</p>
</article>`;
    })
    .join('');
}

function pickHtml(L, { branch = 0 } = {}) {
  return branches
    .map((b, i) => `<button type="button" class="seg-btn" data-branch="${i}" aria-pressed="${i === branch}">${b.short[L]}</button>`)
    .join('');
}

const mapArt = (i) => `<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" focusable="false">
  <defs><radialGradient id="pin-glow-${i}"><stop offset="0" class="s1"/><stop offset="1" class="s2"/></radialGradient></defs>
  <g class="roads">${
    i === 0
      ? '<path d="M-10 112C100 90 200 140 410 70"/><path d="M60-10 110 160"/><path d="M250-10 230 160"/><path d="M-10 40 410 30"/>'
      : '<path d="M-10 40C120 70 260 10 410 90"/><path d="M90-10 60 160"/><path d="M300-10 340 160"/><path d="M-10 120 410 125"/>'
  }</g>
  <circle cx="200" cy="72" r="48" fill="url(#pin-glow-${i})"/>
  <path class="pin" d="M200 102s-15-14-15-27a15 15 0 1 1 30 0c0 13-15 27-15 27z"/><circle class="pin-dot" cx="200" cy="75" r="5"/>
</svg>`;

function branchesHtml(L, { reveal = false } = {}) {
  return branches
    .map(
      (b, i) => `<article class="branch glass"${reveal ? ' data-reveal' : ''}>
  <div class="map-art" aria-hidden="true">${mapArt(i)}</div>
  <div class="branch-body">
    <h3>${b.name[L]}</h3>
    <p class="addr">${icon('pin')}<span>${b.address[L]}</span></p>
    <a class="phone-link" href="tel:${b.tel}">${icon('phone')}${ltr(b.phone)}</a>
    <div class="btn-row">
      <a class="btn btn--primary" href="${mapsUrl(b)}" target="_blank" rel="noopener noreferrer">${icon('pin')}<span>${tr(L, 'loc.maps')}</span></a>
      <a class="btn btn--glass" href="tel:${b.tel}">${icon('phone')}<span>${tr(L, 'loc.call')}</span></a>
    </div>
  </div>
</article>`,
    )
    .join('');
}

const callLinks = (L, cls) =>
  branches
    .map((b) => `<a class="btn ${cls}" href="tel:${b.tel}">${icon('phone')}<span>${b.short[L]}</span></a>`)
    .join('');

function ctaHtml(L) {
  const calls = branches
    .map(
      (b, i) => `<a class="btn ${i === 0 ? 'btn--primary' : 'btn--glass'} btn--lg" href="tel:${b.tel}">${icon('phone')}<span>${tr(L, 'cta.call').replace('{branch}', b.name[L])}</span></a>`,
    )
    .join('');
  return `${calls}<a class="btn btn--glass btn--lg" href="${SOCIAL.instagram}" target="_blank" rel="noopener noreferrer">${icon('instagram')}<span>${tr(L, 'cta.insta')}</span></a>`;
}

function footContactHtml(L) {
  const phones = branches
    .map((b) => `<li><span class="muted">${b.short[L]}</span> <a href="tel:${b.tel}">${ltr(b.phone)}</a></li>`)
    .join('');
  return `${phones}<li><a href="${SOCIAL.instagram}" target="_blank" rel="noopener noreferrer">${icon('instagram')} ${ltr(SOCIAL.handle)}</a></li>`;
}

export const RENDERERS = {
  plans: plansHtml,
  pick: pickHtml,
  branches: branchesHtml,
  cta: ctaHtml,
  footcontact: footContactHtml,
  callbar: (L) => `<span class="callbar-label">${icon('phone')}<span>${tr(L, 'call.now')}</span></span>${callLinks(L, 'btn--primary btn--sm')}`,
  menucalls: (L) => callLinks(L, 'btn--glass'),
  // "Plans from ~133 QAR / month": the lowest monthly cost, derived from the plans
  chipfrom: (L) => tr(L, 'hero.chip2v').replace('{n}', ltr(fmtPerMonth(bestPlan))),
};
