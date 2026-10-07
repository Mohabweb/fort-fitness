// All user-facing strings (EN + AR). No DOM access at import time: vite.config.js imports `dict`
// to pre-fill the English text into index.html at build time (SEO + no-JS), so keep it that way.
// Plan names, branch names and addresses live in src/data.js next to the prices and phones.

const accent = (w) => `<em class="accent">${w}</em>`;
const line = (html) => `<span class="line">${html}</span>`;

export const dict = {
  en: {
    'meta.title': 'Fort Fitness | Gym in Doha, Qatar: D Ring Road & Al Sadd',
    'meta.desc':
      'Fort Fitness is a gym in Doha, Qatar with two branches: D Ring Road and C Ring Road (Al Sadd). Memberships from 2 months to a year, priced in QAR.',
    skip: 'Skip to content',

    'nav.primary': 'Primary',
    'nav.about': 'About',
    'nav.plans': 'Memberships',
    'nav.locations': 'Locations',
    'nav.join': 'Join now',
    'nav.lang': 'العربية',
    'nav.langAria': 'Switch language to Arabic',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.menu': 'Menu',
    'call.now': 'Call now',
    'call.bar': 'Call a branch',

    'hero.label': 'Doha, Qatar',
    'hero.label2': 'Two branches',
    'hero.h1': line('Build your') + ' ' + line(accent('strongest') + ' self.'),
    'hero.lead': 'Two branches in Doha. Flexible memberships. Just show up and train.',
    'hero.cta1': 'View memberships',
    'hero.cta2': 'Find a branch',
    'hero.chip1': '2 branches in Doha',
    'hero.chip2': 'Plans from',
    'hero.chip2v': '{n} QAR / month',

    'alt.hero': 'Two people standing at the Fort Fitness reception desk under the illuminated logo',
    'alt.floor': 'Wide training floor with strength machines on wood-style flooring and cardio machines by the windows',
    'alt.dumbbells': 'Racks of dumbbells and barbells in front of a wall of mirrors',
    'alt.cable': 'A person doing a cable exercise at a cable station',
    'alt.blueWide': 'Training floor with mirrors, strength equipment and blue accent lighting',
    'alt.blueFloor': 'Strength machines on a wood-style floor under blue accent lighting',

    'about.label': 'The space',
    'about.h2': 'Train in a space built for ' + accent('focus') + '.',
    'about.p': 'A dark, open floor with room to move and equipment for every routine.',
    'about.tag.machines': 'Strength machines',
    'about.tag.weights': 'Free weights',
    'about.tag.cable': 'Cable station',
    'about.tag.mirrors': 'Mirrors & lighting',
    'about.tag.blue': 'Blue accent lighting',

    'feat.label': "What's inside",
    'feat.h2': 'Equipment for every ' + accent('routine') + '.',
    'feat.p': "A quick look at what you'll see on the floor.",
    'feat.1.t': 'Free weights',
    'feat.1.p': 'Dumbbell racks, barbells and benches.',
    'feat.2.t': 'Strength machines',
    'feat.2.p': 'Plate-loaded and weight-stack machines across the floor.',
    'feat.3.t': 'Cable stations',
    'feat.3.p': 'Cable machines with rope attachments.',
    'feat.4.t': 'Cardio',
    'feat.4.p': 'Treadmills and cardio machines along the windows.',
    'feat.5.t': 'Mirrored walls',
    'feat.5.p': 'Large mirrors to keep an eye on your form.',
    'feat.6.t': 'Accent lighting',
    'feat.6.p': 'Bright white light lines with blue accents.',

    'plans.label': 'Memberships',
    'plans.h2': 'Pick the plan that fits your ' + accent('pace') + '.',
    'plans.p': 'Prices in Qatari Riyal. Call a branch to join.',
    'plans.pick': 'Call which branch?',
    'plans.best': 'Best value',
    'plans.was': 'Before discount',
    'plans.save': 'Save {n} QAR',
    'plans.perMonth': 'Per month',
    'plans.duration': 'Duration',
    'plans.cta': 'Call to join',
    'plans.qar': 'QAR',
    'plans.qarMonth': 'QAR',

    'loc.label': 'Locations',
    'loc.h2': 'Two branches, one ' + accent('Fort') + '.',
    'loc.p': 'Call a branch or open directions in Google Maps.',
    'loc.maps': 'Open in Google Maps',
    'loc.call': 'Call',

    'cta.label': 'Join us',
    'cta.h2': 'Your next workout starts ' + accent('here') + '.',
    'cta.call': 'Call {branch}',
    'cta.insta': 'Instagram',

    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.copy': '© {year} Fort Fitness. All rights reserved.',
  },

  ar: {
    'meta.title': 'فورت فيتنس | نادٍ رياضي في الدوحة، قطر: طريق D الدائري والسد',
    'meta.desc':
      'فورت فيتنس نادٍ رياضي في الدوحة، قطر، بفرعين: طريق D الدائري وطريق C الدائري (السد). اشتراكات من شهرين إلى سنة بالريال القطري.',
    skip: 'انتقل إلى المحتوى',

    'nav.primary': 'التنقل الرئيسي',
    'nav.about': 'عن النادي',
    'nav.plans': 'الاشتراكات',
    'nav.locations': 'الفروع',
    'nav.join': 'اشترك الآن',
    'nav.lang': 'EN',
    'nav.langAria': 'تغيير اللغة إلى الإنجليزية',
    'nav.openMenu': 'افتح القائمة',
    'nav.closeMenu': 'أغلق القائمة',
    'nav.menu': 'القائمة',
    'call.now': 'اتصل الآن',
    'call.bar': 'اتصل بأحد الفروع',

    'hero.label': 'الدوحة، قطر',
    'hero.label2': 'فرعان',
    'hero.h1': line('ابنِ ' + accent('أقوى')) + ' ' + line('نسخة من نفسك.'),
    'hero.lead': 'فرعان في الدوحة، واشتراكات مرنة. كل ما عليك هو الحضور والتمرين.',
    'hero.cta1': 'تصفّح الاشتراكات',
    'hero.cta2': 'ابحث عن فرع',
    'hero.chip1': 'فرعان في الدوحة',
    'hero.chip2': 'تبدأ من',
    'hero.chip2v': '{n} ريال قطري / شهريًا',

    'alt.hero': 'شخصان يقفان عند مكتب الاستقبال في فورت فيتنس أسفل الشعار المضيء',
    'alt.floor': 'صالة تدريب واسعة فيها أجهزة قوة على أرضية خشبية وأجهزة كارديو بجانب النوافذ',
    'alt.dumbbells': 'رفوف دمبل وبارات أمام جدار من المرايا',
    'alt.cable': 'شخص يؤدي تمرينًا على جهاز الكابل',
    'alt.blueWide': 'صالة تدريب فيها مرايا ومعدات قوة وإضاءة زرقاء',
    'alt.blueFloor': 'أجهزة قوة على أرضية خشبية تحت إضاءة زرقاء',

    'about.label': 'المكان',
    'about.h2': 'تمرّن في مكان صُمّم ' + accent('للتركيز') + '.',
    'about.p': 'صالة مفتوحة بأجواء داكنة، فيها مساحة للحركة ومعدات تناسب كل روتين تدريبي.',
    'about.tag.machines': 'أجهزة القوة',
    'about.tag.weights': 'أوزان حرة',
    'about.tag.cable': 'جهاز الكابل',
    'about.tag.mirrors': 'مرايا وإضاءة',
    'about.tag.blue': 'إضاءة زرقاء',

    'feat.label': 'ما ستجده',
    'feat.h2': 'معدات تناسب كل ' + accent('روتين') + '.',
    'feat.p': 'نظرة سريعة على ما ستراه في الصالة.',
    'feat.1.t': 'أوزان حرة',
    'feat.1.p': 'رفوف دمبل وبارات وبنشات.',
    'feat.2.t': 'أجهزة القوة',
    'feat.2.p': 'أجهزة بالأقراص الحديدية وبالأوزان المكدّسة في أنحاء الصالة.',
    'feat.3.t': 'أجهزة الكابل',
    'feat.3.p': 'أجهزة كابل مع ملحقات الحبل.',
    'feat.4.t': 'الكارديو',
    'feat.4.p': 'أجهزة جري وكارديو بمحاذاة النوافذ.',
    'feat.5.t': 'جدران المرايا',
    'feat.5.p': 'مرايا كبيرة لمتابعة وضعية جسمك أثناء التمرين.',
    'feat.6.t': 'إضاءة مميزة',
    'feat.6.p': 'خطوط إضاءة بيضاء ساطعة مع لمسات زرقاء.',

    'plans.label': 'الاشتراكات',
    'plans.h2': 'اختر الاشتراك الذي يناسب ' + accent('إيقاعك') + '.',
    'plans.p': 'الأسعار بالريال القطري. اتصل بأحد الفروع للاشتراك.',
    'plans.pick': 'بأي فرع تتصل؟',
    'plans.best': 'الأفضل قيمة',
    'plans.was': 'السعر قبل الخصم',
    'plans.save': 'وفّر {n} ريال قطري',
    'plans.perMonth': 'شهريًا',
    'plans.duration': 'المدة',
    'plans.cta': 'اتصل للاشتراك',
    'plans.qar': 'ريال قطري',
    'plans.qarMonth': 'ريال قطري',

    'loc.label': 'الفروع',
    'loc.h2': 'فرعان، ' + accent('حصن') + ' واحد.',
    'loc.p': 'اتصل بالفرع أو افتح الاتجاهات في خرائط جوجل.',
    'loc.maps': 'افتح في خرائط جوجل',
    'loc.call': 'اتصل',

    'cta.label': 'انضم إلينا',
    'cta.h2': 'تمرينك القادم يبدأ ' + accent('هنا') + '.',
    'cta.call': 'اتصل بفرع {branch}',
    'cta.insta': 'إنستغرام',

    'footer.explore': 'استكشف',
    'footer.contact': 'تواصل معنا',
    'footer.copy': '© {year} Fort Fitness. جميع الحقوق محفوظة.',
  },
};

const STORE_KEY = 'ff-lang';
let lang = 'en';
const listeners = new Set();

export const getLang = () => lang;
export const t = (key) => dict[lang][key] ?? dict.en[key] ?? key;
/** Pick the current language from a `{ en, ar }` object (see data.js). */
export const pick = (obj) => obj[lang] ?? obj.en;
export const onLangChange = (fn) => listeners.add(fn);

export function detectLang() {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'ar' || q === 'en') return q;
    const saved = localStorage.getItem(STORE_KEY);
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    /* storage can be blocked: fall through to English */
  }
  return 'en';
}

export function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18n).replace('{year}', new Date().getFullYear());
  });
  root.querySelectorAll('[data-i18n-alt]').forEach((el) => (el.alt = t(el.dataset.i18nAlt)));
  root.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
}

export function setLang(next, { persist = true } = {}) {
  lang = next === 'ar' ? 'ar' : 'en';
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.desc'));
  applyI18n();
  if (persist) {
    try {
      localStorage.setItem(STORE_KEY, lang);
      const url = new URL(location.href);
      if (lang === 'ar') url.searchParams.set('lang', 'ar');
      else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    } catch {
      /* ignore: language still switches for this visit */
    }
  }
  listeners.forEach((fn) => fn(lang));
}
