// ─────────────────────────────────────────────
// VISUWORKS — Global Site Content
// Edit this file to change text, labels, and data across the site.
// Layout components will not need changes.
// ─────────────────────────────────────────────

// ── Company Info ──
export const company = {
  name: 'VISUWORKS',
  tagline: 'Visuelle Marken- und Oberflächenlösungen',
  description:
    'Premium visuelle Marken- und Oberflächenlösungen für Mobilität, Architektur und Kommunikation – europaweit umgesetzt.',
  address: {
    street: 'Musterstraße 1',
    zip: '40210',
    city: 'Düsseldorf',
    country: 'Deutschland',
  },
  phone: '+49 211 000 000',
  email: 'info@visuworks.de',
  socialLinks: [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/visuworks' },
    { name: 'Instagram', href: 'https://instagram.com/visuworks' },
    { name: 'Facebook', href: 'https://facebook.com/visuworks' },
    { name: 'YouTube', href: 'https://youtube.com/@visuworks' },
  ],
};

// ── Hero Section (Homepage) ──
export const hero = {
  headline: 'Präsenz in ihrer stärksten Form.',
  subline:
    'Visuelle Marken- und Oberflächenlösungen für Mobilität, Architektur und Kommunikation – europaweit umgesetzt.',
  ctaPrimary: { label: 'Projekt starten', href: '/kontakt' },
  ctaSecondary: { label: 'Referenzen ansehen', href: '/projekte' },
  tags: [
    { label: 'B2B', href: '/projektmanagement' },
    { label: 'Flotten', href: '/mobilitaet' },
    { label: 'Messe/Event', href: '/markenkommunikation' },
    { label: 'Architektur', href: '/architektur-raum' },
    { label: 'Design', href: '/design-konzepte' },
  ],
};

// ── CTA Section (Homepage bottom) ──
export const ctaSection = {
  headline: 'Projekt besprechen?',
  subline: 'Lassen Sie uns über Ihr Projekt sprechen – unverbindlich und persönlich.',
  buttons: [
    { label: 'Projekt besprechen', href: '/kontakt', variant: 'default' },
    { label: 'Angebot anfordern', href: '/kontakt', variant: 'secondary' },
    { label: 'Beratung vereinbaren', href: '/kontakt', variant: 'secondary' },
  ],
};

// ── Process Steps (Homepage + Process Subpages) ──
export const processSteps = [
  { num: '01', title: 'Analyse & Zieldefinition', desc: 'Anforderungen verstehen', slug: 'analyse' },
  { num: '02', title: 'Design & Konzeption', desc: 'Visuelle Lösungen entwickeln', slug: 'design' },
  { num: '03', title: 'Produktion', desc: 'Präzise Fertigung', slug: 'produktion' },
  { num: '04', title: 'Umsetzung & Montage', desc: 'Professionelle Installation', slug: 'umsetzung' },
  { num: '05', title: 'Qualitätssicherung', desc: 'Kontrolle & Abnahme', slug: 'qualitaetssicherung' },
];

// ── Target Audiences (Homepage) ──
export const targetAudiences = [
  { title: 'Privatkunden', focus: 'Mobilität', items: ['Fahrzeugfolierung', 'Lackschutz', 'Individual-Design'] },
  { title: 'Unternehmen', focus: 'Raum · Flotte · Event', items: ['Flottenbranding', 'Raumgestaltung', 'Messepräsenz'] },
  { title: 'Agenturen & Partner', focus: 'Design + Umsetzung', items: ['Produktionspartner', 'Designentwicklung', 'Projektabwicklung'] },
];

// ── Statistics ──
export const statistics = [
  { value: 500, suffix: '+', label: 'Projekte', description: 'erfolgreich umgesetzt' },
  { value: 15, suffix: '', label: 'Jahre Erfahrung', description: 'im Premium-Segment' },
  { value: 98, suffix: '%', label: 'Kundenzufriedenheit', description: 'basierend auf Feedback' },
  { value: 12, suffix: '', label: 'Länder', description: 'europaweit aktiv' },
];

// ── Testimonials ──
export const testimonials = [
  {
    id: 1,
    quote: 'Die Zusammenarbeit mit VISUWORKS war von Anfang bis Ende professionell. Unser Flottenbranding wurde termingerecht und in höchster Qualität umgesetzt. Absolut empfehlenswert.',
    author: 'Thomas M.',
    position: 'Flottenmanager',
    company: 'Logistik-Konzern',
    rating: 5,
    project: 'Flottenbranding 50+ Fahrzeuge',
  },
  {
    id: 2,
    quote: 'VISUWORKS hat unseren Showroom komplett transformiert. Die Glasfolierungen und das Leitsystem sind perfekt auf unsere Marke abgestimmt. Unsere Kunden sind begeistert.',
    author: 'Sandra K.',
    position: 'Marketing-Leiterin',
    company: 'Premium-Autohaus',
    rating: 5,
    project: 'Showroom-Gestaltung',
  },
  {
    id: 3,
    quote: 'Der Messestand auf der IAA war ein voller Erfolg. Die Qualität der Grafiken und die Koordination des gesamten Projekts waren erstklassig. Wir planen bereits den nächsten Auftritt.',
    author: 'Michael B.',
    position: 'Event-Manager',
    company: 'Automobilzulieferer',
    rating: 5,
    project: 'Messestand IAA 800m²',
  },
  {
    id: 4,
    quote: 'Mein Porsche ist nun perfekt geschützt. Die PPF-Folierung ist unsichtbar und die Verarbeitung makellos. Das Team hat sich wirklich Zeit genommen für jedes Detail.',
    author: 'Andreas W.',
    position: 'Privatkunde',
    company: 'Düsseldorf',
    rating: 5,
    project: 'PPF Vollschutz',
  },
];

// ── Client Logos ──
export const clients = [
  { name: 'Mercedes-Benz', key: 'mercedes-benz', industry: 'Automotive' },
  { name: 'Deutsche Bahn', key: 'deutsche-bahn', industry: 'Transport' },
  { name: 'Siemens', key: 'siemens', industry: 'Technology' },
  { name: 'Lufthansa', key: 'lufthansa', industry: 'Aviation' },
  { name: 'Bosch', key: 'bosch', industry: 'Engineering' },
  { name: 'Porsche', key: 'porsche', industry: 'Automotive' },
];

// ── Team Members ──
export const team = [
  {
    name: 'Max Mustermann',
    imageKey: 'max-mustermann',
    role: 'Geschäftsführer',
    bio: '15+ Jahre Erfahrung in der visuellen Markenführung. Verantwortlich für Strategie und Kundenbeziehungen.',
    linkedin: 'https://linkedin.com/',
    email: 'max@visuworks.de',
  },
  {
    name: 'Anna Schmidt',
    imageKey: 'anna-schmidt',
    role: 'Leiterin Design',
    bio: 'Kreativdirektorin mit Fokus auf Markenentwicklung und konzeptionelle Gestaltung.',
    linkedin: 'https://linkedin.com/',
    email: 'anna@visuworks.de',
  },
  {
    name: 'Thomas Weber',
    imageKey: 'thomas-weber',
    role: 'Leiter Produktion',
    bio: 'Experte für Großformatdruck und Folierungstechnik. Qualitätssicherung und Prozessoptimierung.',
    linkedin: 'https://linkedin.com/',
    email: 'thomas@visuworks.de',
  },
  {
    name: 'Sarah Müller',
    imageKey: 'sarah-mueller',
    role: 'Projektmanagement',
    bio: 'Koordination komplexer Projekte mit Fokus auf termingerechte Umsetzung und Kundenzufriedenheit.',
    linkedin: 'https://linkedin.com/',
    email: 'sarah@visuworks.de',
  },
];

// ── Team Values ──
export const values = [
  { title: 'Präzision', description: 'Jedes Detail zählt. Wir arbeiten mit höchster Sorgfalt und Genauigkeit.' },
  { title: 'Partnerschaft', description: 'Langfristige Beziehungen statt einmaliger Aufträge. Wir wachsen mit unseren Kunden.' },
  { title: 'Innovation', description: 'Neue Materialien, Techniken und Ideen. Wir bleiben am Puls der Zeit.' },
  { title: 'Verlässlichkeit', description: 'Was wir zusagen, halten wir. Termintreue und Qualität sind für uns selbstverständlich.' },
];

// ── Footer Navigation ──
export const footerNav = {
  services: [
    { name: 'Mobilität', href: '/mobilitaet' },
    { name: 'Raum & Architektur', href: '/architektur-raum' },
    { name: 'Markenkommunikation', href: '/markenkommunikation' },
    { name: 'Design & Konzeption', href: '/design-konzepte' },
    { name: 'Projektmanagement', href: '/projektmanagement' },
  ],
  company: [
    { name: 'Projekte', href: '/projekte' },
    { name: 'Team', href: '/team' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB (B2C)', href: '/agb' },
    { name: 'AGB Unternehmer', href: '/agb-b2b' },
  ],
};
