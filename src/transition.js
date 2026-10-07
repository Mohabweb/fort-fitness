// Pixelated-grid section transition (GSAP + ScrollTrigger), cover mode.
// This is the provided snippet with three deliberate changes (marked "CHANGED"):
//   1. ScrollTrigger `start` now reads config.coverStart (it was hardcoded, so the config did nothing)
//   2. it no longer self-initialises on DOMContentLoaded; main.js calls initSectionTransition()
//   4. optional data-st-start per section overrides the ScrollTrigger start (used by the hero only)
//   3. built layers/timelines are tracked so a width change can rebuild them without killing
//      the page's other ScrollTriggers (entrance animations)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const built = []; // CHANGED (3): { layer, timeline }

export function sectionTransition03(scopeOrConfig = document, maybeConfig = {}) {
  const DEFAULT_CONFIG = {
    resolution: 20,
    spread: 5,
    fillDuration: 0.03,
    layerHeight: '64vh',
    mode: 'cover',
    coverStart: 'bottom bottom+=20%',
    revealStart: 'top bottom',
    mobile: {
      breakpoint: 768,
    },
  };

  const isScope = (value) => value instanceof Element || value instanceof Document;
  const getConfig = (overrides = {}) => ({
    ...DEFAULT_CONFIG,
    ...overrides,
    mobile: {
      ...DEFAULT_CONFIG.mobile,
      ...(overrides.mobile || {}),
    },
  });
  const getPositiveInt = (value, fallback) => {
    const parsedValue = Number.parseInt(value ?? '', 10);
    return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
  };
  const getPositiveFloat = (value, fallback) => {
    const parsedValue = Number.parseFloat(value ?? '');
    return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
  };
  const getCssSize = (value, fallback) => {
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
      return `${value}px`;
    }

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }

    return fallback;
  };
  const isMobileViewport = (config) => window.matchMedia(`(max-width: ${config.mobile.breakpoint}px)`).matches;
  const getResolution = (section, config, isMobile) => {
    const desktopResolution = getPositiveInt(
      section.getAttribute('data-st-03'),
      getPositiveInt(config.resolution, DEFAULT_CONFIG.resolution),
    );

    if (!isMobile) return desktopResolution;

    return getPositiveInt(
      section.dataset.stMobileResolution,
      getPositiveInt(config.mobile.resolution, desktopResolution),
    );
  };
  const isTransparentColor = (value) =>
    value === 'transparent' || value === 'rgba(0, 0, 0, 0)' || value === 'rgba(0,0,0,0)';
  const resolveFillColor = (nextSection) => {
    const colorCandidates = [nextSection, nextSection.parentElement, document.body, document.documentElement];

    for (const element of colorCandidates) {
      if (!element) continue;

      const backgroundColor = getComputedStyle(element).backgroundColor;
      if (!isTransparentColor(backgroundColor)) {
        return backgroundColor;
      }
    }

    return 'rgb(255, 255, 255)';
  };
  const hash = (i) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  const createPixelLayer = (section, columnCount, fillColor, layerHeight) => {
    const computedStyles = getComputedStyle(section);

    if (computedStyles.position === 'static') {
      section.style.position = 'relative';
    }

    if (computedStyles.isolation !== 'isolate') {
      section.style.isolation = 'isolate';
    }

    if (!['hidden', 'clip'].includes(computedStyles.overflow)) {
      section.style.overflow = 'hidden';
    }

    const layer = document.createElement('div');
    layer.setAttribute('data-st-03-pixels', '');
    layer.setAttribute('aria-hidden', 'true');

    Object.assign(layer.style, {
      position: 'absolute',
      left: '0',
      right: '0',
      bottom: '0',
      top: 'auto',
      height: layerHeight,
      zIndex: '4',
      pointerEvents: 'none',
    });

    section.append(layer);

    const layerWidth = layer.offsetWidth;
    const layerHeightPx = layer.offsetHeight;
    const cellSize = layerWidth / columnCount;
    const rowCount = Math.max(Math.ceil(layerHeightPx / cellSize), 1);

    Object.assign(layer.style, {
      display: 'grid',
      gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
    });

    const totalCells = columnCount * rowCount;
    const cells = Array.from({ length: totalCells }, () => {
      const cell = document.createElement('span');
      cell.setAttribute('data-st-03-cell', '');

      Object.assign(cell.style, {
        display: 'block',
        width: '100%',
        height: '100%',
        background: fillColor,
        backfaceVisibility: 'hidden',
      });

      layer.append(cell);
      return cell;
    });

    gsap.set(cells, { opacity: 0 });

    return { layer, cells, rows: rowCount, columns: columnCount };
  };

  const scope = isScope(scopeOrConfig) ? scopeOrConfig : document;
  const config = getConfig(isScope(scopeOrConfig) ? maybeConfig : scopeOrConfig);
  const isMobile = isMobileViewport(config);
  const sections = scope.querySelectorAll('[data-st-03]');

  sections.forEach((section) => {
    const nextSection = section.nextElementSibling;
    if (!(nextSection instanceof Element)) return;

    const resolution = getResolution(section, config, isMobile);
    const spread = getPositiveInt(section.dataset.stSpread, config.spread ?? DEFAULT_CONFIG.spread);
    // An explicit data-st-fill-color wins over the sampled colour (the provided docs describe it)
    const fillColor = section.dataset.stFillColor || resolveFillColor(nextSection);
    const layerHeight = getCssSize(config.layerHeight, DEFAULT_CONFIG.layerHeight);
    const { layer, cells, rows, columns } = createPixelLayer(section, resolution, fillColor, layerHeight);
    const maxDelay = Math.max(rows - 1 + spread, 1);
    const cellDelays = cells.map((_, index) => {
      const row = Math.floor(index / columns);
      const rowFromBottom = rows - 1 - row;

      return (rowFromBottom + hash(index) * spread) / maxDelay;
    });

    const fillDuration = getPositiveFloat(
      section.dataset.stFillDuration,
      getPositiveFloat(config.fillDuration, DEFAULT_CONFIG.fillDuration),
    );

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        // CHANGED (1): was the hardcoded "bottom bottom+=20%". CHANGED (4): optional per-section data-st-start
        // (the hero is exactly one screen tall, so the default start would already be ~30% done at scroll 0)
        start: section.dataset.stStart || config.coverStart,
        end: () => `+=${Math.max(layer.offsetHeight, 1)}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(
      cells,
      {
        duration: fillDuration,
        opacity: 1,
        stagger: (index) => cellDelays[index],
      },
      0,
    );

    built.push({ layer, timeline }); // CHANGED (3)
  });
}

// CHANGED (3): tear down only our own layers + triggers
export function destroySectionTransition03() {
  built.splice(0).forEach(({ layer, timeline }) => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    layer.remove();
  });
}

// CHANGED (2): explicit init. Rebuilds when the viewport WIDTH changes (rows/columns depend on it);
// height-only changes (mobile URL bar) are handled by ScrollTrigger's own refresh.
export function initSectionTransition() {
  sectionTransition03();

  let lastWidth = window.innerWidth;
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      destroySectionTransition03();
      sectionTransition03();
      ScrollTrigger.refresh();
    }, 250);
  });
}
