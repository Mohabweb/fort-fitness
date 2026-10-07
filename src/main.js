import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RENDERERS } from './render.js';
import { branches } from './data.js';
import { detectLang, setLang, getLang, onLangChange, t } from './i18n.js';
import { initSectionTransition } from './transition.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const onReady = (fn) =>
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
const refreshTriggers = () => requestAnimationFrame(() => ScrollTrigger.refresh());

let branch = 0; // which branch the plan CTAs call

/* ---------- Render everything that comes from data.js ---------- */
function render(reveal) {
  const L = getLang();
  $$('[data-render]').forEach((el) => {
    el.innerHTML = RENDERERS[el.dataset.render](L, { branch, reveal });
  });
}

function selectBranch(i) {
  branch = i;
  const b = branches[i];
  $$('.seg-btn').forEach((btn) => btn.setAttribute('aria-pressed', String(Number(btn.dataset.branch) === i)));
  $$('[data-call]').forEach((a) => (a.href = `tel:${b.tel}`));
  $$('[data-call-num]').forEach((p) => (p.innerHTML = `<bdi dir="ltr">${b.phone}</bdi>`));
}

document.addEventListener('click', (e) => {
  const seg = e.target.closest('.seg-btn');
  if (seg) selectBranch(Number(seg.dataset.branch));
});

/* ---------- Language ---------- */
setLang(detectLang(), { persist: false });
render(true);

$$('[data-lang-toggle]').forEach((btn) =>
  btn.addEventListener('click', () => setLang(getLang() === 'en' ? 'ar' : 'en')),
);
onLangChange(() => {
  render(false); // re-rendered cards are already in their final state
  gsap.set('.h1 .line', { opacity: 1, y: 0 }); // new headline lines replace the animated ones
  setMenu(false);
  refreshTriggers(); // text heights changed
  document.fonts?.ready.then(refreshTriggers); // Arabic font may arrive late
});

/* ---------- Header: shrink on scroll, mobile menu ---------- */
const nav = $('#nav');
const menu = $('#menu');
const menuBtn = $('#menu-btn');

const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menu.toggleAttribute('inert', !open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', t(open ? 'nav.closeMenu' : 'nav.openMenu'));
  $('use', menuBtn).setAttribute('href', open ? '#i-close' : '#i-menu');
  document.body.style.overflow = open ? 'hidden' : '';
}
menuBtn.addEventListener('click', () => {
  const open = !menu.classList.contains('is-open');
  setMenu(open);
  if (open) $('a', menu).focus();
});
menu.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('is-open')) {
    setMenu(false);
    menuBtn.focus();
  }
});
matchMedia('(min-width: 861px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* ---------- Motion ---------- */
if (!reduceMotion) {
  // hero intro on load
  gsap
    .timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
    .fromTo('.hero .pill-row', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, clearProps: 'transform' })
    .fromTo('.hero .h1 .line', { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.14, clearProps: 'transform' }, '-=0.5')
    .fromTo('.hero .lead, .hero .cta-row', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, clearProps: 'transform' }, '-=0.6')
    .fromTo('.hero-scene', { y: 70, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.3, clearProps: 'transform' }, '-=1.2');

  // floating glass chips drift slowly
  $$('[data-float]').forEach((el, i) =>
    gsap.to(el, { y: i % 2 ? '-=12' : '+=12', x: i % 2 ? '+=6' : '-=6', duration: 3.2 + i * 0.9, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
  );

  // section entrances: labels, headlines, paragraphs and cards fade/translate in, cards stagger
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.fromTo(els, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.09, clearProps: 'transform' }),
  });
}

/* ---------- Pixel section transition (skipped for reduced motion) ---------- */
onReady(() => {
  if (!reduceMotion) initSectionTransition();
  ScrollTrigger.refresh();
});
window.addEventListener('load', () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());

window.__ffReady = true; // tells the inline safety timer in index.html that JS booted
