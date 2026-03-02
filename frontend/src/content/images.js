// ─────────────────────────────────────────────
// VISUWORKS — Centralized Image Map
// Replace URLs/paths here to update all images site-wide.
// Keep aspect ratios noted to avoid layout shifts.
// ─────────────────────────────────────────────

const images = {
  // ── Hero ──
  hero: {
    src: '/images/Header_Porsche_HD.JPG',
    alt: 'VISUWORKS Projektarbeit – Porsche Fahrzeugveredelung',
    aspectRatio: '4/3',
  },

  // ── Project Gallery (keyed by project slug) ──
  // Images must be inside: /public/images/projects/
  projects: {
    'flottenbranding-dax-konzern': {
      thumbnail: '/images/projects/porsche-gt3-cup-929.jpg',
      alt: 'Porsche GT3 Cup Flottenbranding',
      gallery: ['/images/projects/porsche-gt3-cup-909.jpg'],
    },

    'ppf-porsche-911-gt3': {
      thumbnail: '/images/projects/porsche-gt3-cup-race.jpg',
      alt: 'Porsche 911 GT3 mit PPF Lackschutzfolie',
      gallery: ['/images/projects/porsche-gt3-cup-929.jpg'],
    },

    'designfolierung': {
      thumbnail: '/images/projects/porsche-gt3-cup-909.jpg',
      alt: 'Porsche GT3 Cup Designfolierung',
      gallery: ['/images/projects/porsche-gt3-cup-detail.jpg'],
    },

    'flottenbranding-logistik-europa': {
      thumbnail: '/images/projects/porsche-gt3-cup-detail.jpg',
      alt: 'Detailansicht Fahrzeugfolierung',
      gallery: ['/images/projects/IMG_6953.jpeg'],
    },

    'headquarters-tech-konzern': {
      thumbnail: null,
      gallery: [],
    },

    'flagship-store-modemarke': {
      thumbnail: null,
      gallery: [],
    },

    'dental-zentrum-muenchen': {
      thumbnail: null,
      gallery: [],
    },

    'showroom-premium-autohaus': {
      thumbnail: null,
      gallery: [],
    },

    'messestand-iaa-frankfurt': {
      thumbnail: '/images/projects/ritter-sport-grossformat.jpg',
      alt: 'Ritter Sport Großformat-Werbung Messestand',
      gallery: [],
    },

    'produktlaunch-automobil': {
      thumbnail: null,
      gallery: [],
    },

    'fassadenwerbung-innenstadt': {
      thumbnail: null,
      gallery: [],
    },

    'pos-systeme-retail-kette': {
      thumbnail: null,
      gallery: [],
    },

    'ci-entwicklung-startup': {
      thumbnail: null,
      gallery: [],
    },

    '3d-rendering-messestand': {
      thumbnail: null,
      gallery: [],
    },

    'flottendesign-richtlinie': {
      thumbnail: null,
      gallery: [],
    },

    'konferenz-2000-teilnehmer': {
      thumbnail: null,
      gallery: [],
    },

    'produktpraesentation-luxusmarke': {
      thumbnail: null,
      gallery: [],
    },

    'firmenjubilaeum-mittelstand': {
      thumbnail: null,
      gallery: [],
    },
  },

  // ── Team (keyed by slug-style identifier) ──
  team: {
    'max-mustermann': null,
    'anna-schmidt': null,
    'thomas-weber': null,
    'sarah-mueller': null,
  },

  // ── Client Logos (keyed by company name in lowercase-kebab) ──
  clientLogos: {
    'mercedes-benz': null,
    'deutsche-bahn': null,
    'siemens': null,
    'lufthansa': null,
    'bosch': null,
    'porsche': null,
  },

  // ── Service Page Hero images (keyed by page slug) ──
  servicePages: {
    mobilitaet: null,
    'architektur-raum': null,
    markenkommunikation: null,
    'design-konzepte': null,
    projektmanagement: null,
  },
};

// ── Helper Functions ──

export const getProjectImage = (slug) => {
  const entry = images.projects[slug];
  if (!entry || !entry.thumbnail) return null;
  return { src: entry.thumbnail, alt: entry.alt || '' };
};

export const getTeamImage = (slug) => images.team[slug] || null;
export const getClientLogo = (key) => images.clientLogos[key] || null;
export const getServiceImage = (slug) => images.servicePages[slug] || null;

export default images;