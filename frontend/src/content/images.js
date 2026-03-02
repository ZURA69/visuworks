// ─────────────────────────────────────────────
// VISUWORKS — Centralized Image Map
// Replace URLs/paths here to update all images site-wide.
// Keep aspect ratios noted to avoid layout shifts.
// ─────────────────────────────────────────────

const images = {
  // ── Hero ──
  hero: {
    src: null,                         // Replace with URL or import path, e.g. '/images/hero.webp'
    alt: 'VISUWORKS Projektarbeit',
    aspectRatio: '4/3',
  },

  // ── Project Gallery (keyed by project slug) ──
  projects: {
    'flottenbranding-dax-konzern': {
      thumbnail: null,
      gallery: [],
    },
    'ppf-porsche-911-gt3': {
      thumbnail: null,
      gallery: [],
    },
    'designfolierung-mercedes-amg': {
      thumbnail: null,
      gallery: [],
    },
    'flottenbranding-logistik-europa': {
      thumbnail: null,
      gallery: [],
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
      thumbnail: null,
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

// Helper: get project image or null
export const getProjectImage = (slug, type = 'thumbnail') => {
  const entry = images.projects[slug];
  if (!entry) return null;
  return type === 'thumbnail' ? entry.thumbnail : entry.gallery;
};

export const getTeamImage = (slug) => images.team[slug] || null;
export const getClientLogo = (key) => images.clientLogos[key] || null;
export const getServiceImage = (slug) => images.servicePages[slug] || null;

export default images;
