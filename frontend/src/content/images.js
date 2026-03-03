// ─────────────────────────────────────────────
// VISUWORKS — Centralized Image Map
// Replace URLs/paths here to update all images site-wide.
// All images live in /public/images/
// ─────────────────────────────────────────────

const images = {
  // ── Hero ──
  hero: {
    src: '/images/Header_Porsche_HD.JPG',
    alt: 'VISUWORKS Projektarbeit – Porsche Fahrzeugveredelung',
    aspectRatio: '4/3',
  },

  // ── Project Gallery (keyed by project slug from projects.js) ──
  projects: {
    // 1 — Flottenbranding (Mobilität) — Nissan Icon League vehicle wrapping
    'Flottenbranding': {
      thumbnail: '/images/IMG_4931.jpg',
      alt: 'Nissan Icon League Flottenbranding',
      gallery: ['/images/IMG_4932.jpg'],
    },

    // 2 — Lackschutz PPF Porsche 911 (Mobilität)
    'Lackschutz': {
      thumbnail: '/images/IMG_6836.jpeg',
      alt: 'PPF Lackschutzfolie Verarbeitung',
      gallery: [
        '/images/IMG_6900.jpeg',
        '/images/IMG_6928.jpeg',
        '/images/IMG_6930.jpeg',
      ],
    },

    // 3 — Designfolierung (Mobilität) — Porsche Sprint Challenge
    'designfolierung': {
      thumbnail: '/images/IMG_6556 2.jpg',
      alt: 'Porsche Sprint Challenge Designfolierung',
      gallery: [
        '/images/IMG_6588 2.jpeg',
        '/images/porsche-gt3-cup-909.jpg',
        '/images/porsche-gt3-cup-detail.jpg',
      ],
    },

    // 4 — Flottenbranding Logistik (Mobilität) — Another Cotton & diverse
    'flottenbranding': {
      thumbnail: '/images/IMG_7329.jpeg',
      alt: 'Fahrzeugbeschriftung Another Cotton',
      gallery: [
        '/images/IMG_7330.jpeg',
        '/images/IMG_6250 2.jpeg',
        '/images/IMG_6253 2.jpeg',
      ],
    },

    // 5 — Headquarters Tech-Konzern (Architektur) — Santander Interior
    'headquarters-tech-konzern': {
      thumbnail: '/images/IMG_5646.jpeg',
      alt: 'Santander Interior Branding Büro',
      gallery: [],
    },

    // 6 — Flagship Store Modemarke (Architektur) — Gazelle Storefront
    'flagship-store-modemarke': {
      thumbnail: '/images/IMG_7228.jpeg',
      alt: 'Gazelle Flagship Store Schaufenstergestaltung',
      gallery: [
        '/images/IMG_7235.jpeg',
        '/images/IMG_7236.jpeg',
      ],
    },

    // 7 — Dental-Zentrum München (Architektur)
    'dental-zentrum-muenchen': {
      thumbnail: '/images/IMG_5675.jpeg',
      alt: 'Sichtschutzfolien und Storefront-Branding',
      gallery: ['/images/IMG_5732.jpeg'],
    },

    // 8 — Showroom Premium-Autohaus (Architektur) — Racing Team Booth
    'showroom-premium-autohaus': {
      thumbnail: '/images/IMG_6845.jpeg',
      alt: 'Haupt Racing Team Showroom-Gestaltung',
      gallery: [
        '/images/IMG_6846.jpeg',
        '/images/IMG_6848.jpeg',
      ],
    },

    // 9 — Messestand 800m² (Kommunikation) — Pfizer Medical Booth
    'messestand': {
      thumbnail: '/images/IMG_7190.jpeg',
      alt: 'Pfizer Medical Messestand',
      gallery: [
        '/images/IMG_7193.jpeg',
        '/images/IMG_5386.jpeg',
      ],
    },

    // 10 — Produktlaunch Automobil (Kommunikation) — Racing Event
    'produktlaunch-automobil': {
      thumbnail: '/images/IMG_6851.jpeg',
      alt: 'Produktlaunch Event-Grafik',
      gallery: [
        '/images/IMG_6854.jpeg',
        '/images/IMG_6858.jpeg',
        '/images/porsche-gt3-cup-race.jpg',
      ],
    },

    // 11 — Fassadenwerbung Innenstadt (Kommunikation) — Paper & Tea
    'fassadenwerbung-innenstadt': {
      thumbnail: '/images/IMG_2918.jpeg',
      alt: 'Paper & Tea Schaufensterbeklebung',
      gallery: [
        '/images/IMG_2919.jpeg',
        '/images/IMG_2921.jpeg',
        '/images/IMG_2923.jpeg',
      ],
    },

    // 12 — POS-Systeme Retail-Kette (Kommunikation) — Ritter Sport
    'pos-systeme-retail-kette': {
      thumbnail: '/images/IMG_5035.jpg',
      alt: 'Ritter Sport Großformat POS-Werbung',
      gallery: ['/images/ritter-sport-grossformat.jpg'],
    },

    // 13 — CI-Entwicklung Startup (Design)
    'ci-entwicklung-startup': {
      thumbnail: null,
      alt: '',
      gallery: [],
    },

    // 14 — 3D-Rendering Messestand (Design) — Holz-Her Booth
    '3d-rendering-messestand': {
      thumbnail: '/images/IMG_7057.jpeg',
      alt: 'Holz-Her Messestand Gestaltung',
      gallery: [
        '/images/IMG_7059.jpeg',
        '/images/IMG_7060.jpeg',
        '/images/IMG_7071.jpeg',
      ],
    },

    // 15 — Flottendesign-Richtlinie (Design)
    'flottendesign-richtlinie': {
      thumbnail: '/images/porsche-gt3-cup-929.jpg',
      alt: 'Porsche GT3 Cup Flottendesign',
      gallery: ['/images/IMG_6952.jpeg'],
    },

    // 16 — Konferenz 2000 Teilnehmer (Event) — Trendence Awards
    'konferenz-2000-teilnehmer': {
      thumbnail: '/images/IMG_7274.jpeg',
      alt: 'Trendence Awards Konferenz Event-Grafik',
      gallery: [
        '/images/IMG_7275.jpeg',
        '/images/IMG_7282.jpeg',
        '/images/IMG_7285.jpeg',
      ],
    },

    // 17 — Produktpräsentation Luxusmarke (Event) — Trendence Fotoautomat
    'produktpraesentation-luxusmarke': {
      thumbnail: '/images/IMG_5421.jpg',
      alt: 'Trendence VIP-Event Fotoautomat',
      gallery: ['/images/IMG_5423.jpeg'],
    },

    // 18 — Firmenjubiläum Mittelstand (Event) — DUKANE Messestand
    'firmenjubilaeum-mittelstand': {
      thumbnail: '/images/IMG_2901.jpeg',
      alt: 'DUKANE Messe- und Eventgrafik',
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
    mobilitaet: '/images/porsche-gt3-cup-race.jpg',
    'architektur-raum': '/images/IMG_5646.jpeg',
    markenkommunikation: '/images/IMG_7190.jpeg',
    'design-konzepte': '/images/IMG_7057.jpeg',
    projektmanagement: '/images/IMG_5386.jpeg',
  },

  // ── Additional / Unused images for future assignment ──
  // /images/IMG_6953.jpeg — Race car detail
  // /images/IMG_7102.jpg — Trade show
  // /images/IMG_7106.jpeg — Trade show
  // /images/IMG_7259.jpg — Storefront/Trade show
  // /images/IMG_7261.jpg — Storefront/Trade show
  // /images/exhibition_media_4k.jpg — Exhibition media
  // /images/large_format_printing_4k.jpg — Large format printing
};

// ── Helper Functions ──

export const getProjectImage = (slug) => {
  const entry = images.projects[slug];
  if (!entry || !entry.thumbnail) return null;
  return { src: entry.thumbnail, alt: entry.alt || '' };
};

export const getProjectGallery = (slug) => {
  const entry = images.projects[slug];
  if (!entry) return [];
  const gallery = [];
  if (entry.thumbnail) gallery.push({ src: entry.thumbnail, alt: entry.alt || '' });
  if (entry.gallery) {
    entry.gallery.forEach((src) => gallery.push({ src, alt: entry.alt || '' }));
  }
  return gallery;
};

export const getTeamImage = (slug) => images.team[slug] || null;
export const getClientLogo = (key) => images.clientLogos[key] || null;
export const getServiceImage = (slug) => images.servicePages[slug] || null;

export default images;
