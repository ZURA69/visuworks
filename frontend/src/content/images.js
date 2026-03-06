// ─────────────────────────────────────────────
// VISUWORKS — Centralized Image Map
// Replace URLs/paths here to update all images site-wide.
// All images live in /public/images/
// SEO: Alt texts are keyword-optimized for German search market
// ─────────────────────────────────────────────

const images = {
  // ── Hero ──
  hero: {
    src: '/images/hero_motorsport.webp',
    alt: 'VISUWORKS Motorsport Boxengasse – Porsche GT3 Cup Fahrzeugfolierung NRW',
    aspectRatio: '16/9',
  },

  // ── Project Gallery (keyed by project slug from projects.js) ──
  // SEO: Alt texts include primary keywords + location/brand context
  projects: {
    // 1 — Flottenbranding (Mobilität) — Nissan Icon League vehicle wrapping
    'Flottenbranding': {
      thumbnail: '/images/IMG_4931.webp',
      alt: 'Flottenbranding Nissan Icon League – Fahrzeugbeschriftung und Vollfolierung NRW',
      gallery: ['/images/IMG_4932.webp'],
    },

    // 2 — Lackschutz PPF Porsche 911 (Mobilität)
    'Lackschutz': {
      thumbnail: '/images/IMG_6836.webp',
      alt: 'PPF Lackschutzfolie Porsche 911 – Steinschlagschutz und Paint Protection Film',
      gallery: [
        '/images/IMG_6900.webp',
        '/images/IMG_6928.webp',
        '/images/IMG_6930.webp',
      ],
    },

    // 3 — Designfolierung (Mobilität) — Porsche Sprint Challenge
    'designfolierung': {
      thumbnail: '/images/IMG_6556 2.webp',
      alt: 'Porsche GT3 Cup Motorsport Folierung – Designfolierung für Rennfahrzeuge',
      gallery: [
        '/images/IMG_6588 2.webp',
        '/images/porsche-gt3-cup-909.webp',
        '/images/porsche-gt3-cup-detail.webp',
      ],
    },

    // 4 — Flottenbranding Logistik (Mobilität) — Another Cotton & diverse
    'flottenbranding': {
      thumbnail: '/images/IMG_7329.webp',
      alt: 'Flottenbranding und Fahrzeugbeschriftung für Unternehmen – Transporter Folierung',
      gallery: [
        '/images/IMG_7330.webp',
        '/images/IMG_6250 2.webp',
        '/images/IMG_6253 2.webp',
      ],
    },

    // 5 — Headquarters Tech-Konzern (Architektur) — Santander Interior
    'headquarters-tech-konzern': {
      thumbnail: '/images/IMG_5646.webp',
      alt: 'Interior Branding Büro – Glasfolierung und Raumgestaltung für Unternehmen',
      gallery: [],
    },

    // 6 — Flagship Store Modemarke (Architektur) — Gazelle Storefront
    'flagship-store-modemarke': {
      thumbnail: '/images/IMG_7228.webp',
      alt: 'Retail Design und Store Branding – Schaufenstergestaltung Flagship Store',
      gallery: [
        '/images/IMG_7235.webp',
        '/images/IMG_7236.webp',
      ],
    },

    // 7 — Dental-Zentrum München (Architektur)
    'dental-zentrum-muenchen': {
      thumbnail: '/images/IMG_5675.webp',
      alt: 'Sichtschutzfolie Arztpraxis – Glasfolierung und Interior Branding Praxisgestaltung',
      gallery: ['/images/IMG_5732.webp'],
    },

    // 8 — Showroom Premium-Autohaus (Architektur) — Racing Team Booth
    'showroom-premium-autohaus': {
      thumbnail: '/images/IMG_6845.webp',
      alt: 'Showroom Design Autohaus – Interior Branding und Raumgestaltung Motorsport',
      gallery: [
        '/images/IMG_6846.webp',
        '/images/IMG_6848.webp',
      ],
    },

    // 9 — Messestand 800m² (Kommunikation) — Pfizer Medical Booth
    'messestand': {
      thumbnail: '/images/IMG_7190.webp',
      alt: 'Messestand Grafik Pharma – Großformat Messegrafik und Event Branding',
      gallery: [
        '/images/IMG_7193.webp',
        '/images/IMG_5386.webp',
      ],
    },

    // 10 — Produktlaunch Automobil (Kommunikation) — Racing Event
    'produktlaunch-automobil': {
      thumbnail: '/images/IMG_6851.webp',
      alt: 'Produktlaunch Event Branding – Hospitality und Motorsport Eventgrafik',
      gallery: [
        '/images/IMG_6854.webp',
        '/images/IMG_6858.webp',
        '/images/porsche-gt3-cup-race.webp',
      ],
    },

    // 11 — Fassadenwerbung Innenstadt (Kommunikation) — Paper & Tea
    'fassadenwerbung-innenstadt': {
      thumbnail: '/images/IMG_2918.webp',
      alt: 'Fassadenwerbung und Schaufensterbeklebung – Außenwerbung Retail Store',
      gallery: [
        '/images/IMG_2919.webp',
        '/images/IMG_2921.webp',
        '/images/IMG_2923.webp',
      ],
    },

    // 12 — POS-Systeme Retail-Kette (Kommunikation) — Ritter Sport
    'pos-systeme-retail-kette': {
      thumbnail: '/images/IMG_5035.webp',
      alt: 'POS Werbung Großformat – Point of Sale System und Retail Display',
      gallery: ['/images/ritter-sport-grossformat.webp'],
    },

    // 13 — CI-Entwicklung Startup (Design)
    'ci-entwicklung-startup': {
      thumbnail: null,
      alt: 'Corporate Design Entwicklung – CI und Brand Guidelines',
      gallery: [],
    },

    // 14 — 3D-Rendering Messestand (Design) — Holz-Her Booth
    '3d-rendering-messestand': {
      thumbnail: '/images/IMG_7057.webp',
      alt: 'Messestand 3D Visualisierung – Designkonzept und Messebau Planung',
      gallery: [
        '/images/IMG_7059.webp',
        '/images/IMG_7060.webp',
        '/images/IMG_7071.webp',
      ],
    },

    // 15 — Flottendesign-Richtlinie (Design)
    'flottendesign-richtlinie': {
      thumbnail: '/images/porsche-gt3-cup-929.webp',
      alt: 'Porsche GT3 Cup Flottendesign',
      gallery: ['/images/IMG_6952.webp'],
    },

    // 16 — Konferenz 2000 Teilnehmer (Event) — Trendence Awards
    'konferenz-2000-teilnehmer': {
      thumbnail: '/images/IMG_7274.webp',
      alt: 'Trendence Awards Konferenz Event-Grafik',
      gallery: [
        '/images/IMG_7275.webp',
        '/images/IMG_7282.webp',
        '/images/IMG_7285.webp',
      ],
    },

    // 17 — Produktpräsentation Luxusmarke (Event) — Trendence Fotoautomat
    'produktpraesentation-luxusmarke': {
      thumbnail: '/images/IMG_5421.webp',
      alt: 'Trendence VIP-Event Fotoautomat',
      gallery: ['/images/IMG_5423.webp'],
    },

    // 18 — Firmenjubiläum Mittelstand (Event) — DUKANE Messestand
    'firmenjubilaeum-mittelstand': {
      thumbnail: '/images/IMG_2901.webp',
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
  // SEO: Alt texts with primary service keywords + location
  servicePages: {
    mobilitaet: {
      src: '/images/porsche-gt3-cup-race.webp',
      alt: 'Fahrzeugfolierung und Carwrapping Porsche Motorsport – Premium Folierung NRW'
    },
    'architektur-raum': {
      src: '/images/IMG_5646.webp',
      alt: 'Interior Branding Büro – Glasfolierung und Raumgestaltung für Unternehmen'
    },
    markenkommunikation: {
      src: '/images/IMG_7190.webp',
      alt: 'Messegrafik und Großformatdruck – Event Branding Messestand'
    },
    'design-konzepte': {
      src: '/images/IMG_7057.webp',
      alt: 'Designkonzept und 3D Visualisierung – Corporate Design Messestand'
    },
    projektmanagement: {
      src: '/images/IMG_5386.webp',
      alt: 'Projektmanagement Flotten und Events – Koordination europaweit'
    },
  },

  // ── Service Card Background images (Homepage) ──
  // SEO: Alt texts for service overview cards
  serviceCards: {
    mobilitaet: {
      src: '/images/porsche-gt3-cup-race.webp',
      alt: 'Fahrzeugfolierung Service – Carwrapping und Flottenbranding NRW'
    },
    architektur: {
      src: '/images/IMG_5646.webp',
      alt: 'Interior Branding Service – Raumgestaltung und Glasfolierung'
    },
    kommunikation: {
      src: '/images/IMG_7190.webp',
      alt: 'Markenkommunikation Service – Großformatdruck und Messegrafik'
    },
    design: {
      src: '/images/IMG_7057.webp',
      alt: 'Design Service – Designkonzept und visuelle Leitlinien'
    },
  },

  // ── Additional / Unused images for future assignment ──
  // /images/IMG_6953.webp — Race car detail
  // /images/IMG_7102.jpg — Trade show
  // /images/IMG_7106.webp — Trade show
  // /images/IMG_7259.webp — Storefront/Trade show
  // /images/IMG_7261.webp — Storefront/Trade show
  // /images/exhibition_media_4k.webp — Exhibition media
  // /images/large_format_printing_4k.webp — Large format printing
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
