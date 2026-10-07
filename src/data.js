// Single source of truth for business facts. Edit prices, phones and addresses here only.
// (vite.config.js also reads this file to generate the JSON-LD, so nothing is duplicated.)

export const SOCIAL = {
  instagram: 'https://www.instagram.com/fortfitness_qa/',
  handle: '@fortfitness_qa',
};

// Address-to-branch pairing is inferred from the street names (see README).
export const branches = [
  {
    id: 'dring',
    name: { en: 'D Ring Road', ar: 'طريق D الدائري' },
    short: { en: 'D Ring Road', ar: 'الدائري D' },
    phone: '+974 7784 1060',
    tel: '+97477841060',
    // `address.en` is also what the Google Maps link is built from.
    address: {
      en: 'Building 53, Zone 45, D Ring Road, Street 250, Doha, Qatar',
      ar: 'مبنى 53، المنطقة 45، طريق D الدائري، شارع 250، الدوحة، قطر',
    },
    streetAddress: 'Building 53, Zone 45, D Ring Road, Street 250',
  },
  {
    id: 'sadd',
    name: { en: 'C Ring Road, Al Sadd', ar: 'طريق C الدائري، السد' },
    short: { en: 'Al Sadd', ar: 'السد' },
    phone: '+974 7161 1060',
    tel: '+97471611060',
    address: {
      en: 'Opp. TGI Fridays, C Ring Rd, Doha, Qatar',
      ar: 'مقابل TGI Fridays، طريق C الدائري، الدوحة، قطر',
    },
    streetAddress: 'Opp. TGI Fridays, C Ring Rd',
  },
];

// Prices in QAR. `save` and the per-month figure are derived, never typed twice.
export const plans = [
  { id: 'm2', months: 2, before: 550, after: 500, name: { en: '2 Months', ar: 'شهران' }, duration: { en: '2 months', ar: 'شهران' } },
  { id: 'm3', months: 3, before: 800, after: 600, name: { en: '3 Months', ar: '3 أشهر' }, duration: { en: '3 months', ar: '3 أشهر' } },
  { id: 'm6', months: 6, before: 1200, after: 1000, name: { en: '6 Months', ar: '6 أشهر' }, duration: { en: '6 months', ar: '6 أشهر' } },
  { id: 'y1', months: 12, before: 2000, after: 1600, name: { en: '1 Year', ar: 'سنة' }, duration: { en: '12 months', ar: '12 شهرًا' } },
];

export const CURRENCY = 'QAR';

export const mapsUrl = (b) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address.en)}`;

export const saving = (p) => p.before - p.after;
export const perMonth = (p) => p.after / p.months;
/** "250" when exact, "~167" when rounded. */
export const fmtPerMonth = (p) => (Number.isInteger(perMonth(p)) ? '' : '~') + Math.round(perMonth(p));
export const fmtNum = (n) => n.toLocaleString('en-US');

// Derived from the numbers: lowest monthly cost (this is also the largest saving).
export const bestPlan = plans.reduce((a, b) => (perMonth(b) < perMonth(a) ? b : a));
