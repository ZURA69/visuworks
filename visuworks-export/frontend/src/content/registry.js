import { hero, company, ctaSection, statistics, targetAudiences, testimonials, processSteps } from './site';
import { projects } from './projects';
import { servicePages } from './services';
import images from './images';

const f = (key, label, type, group, page, defaultValue) => ({
  key, label, type, group, page, default: defaultValue,
});

const servicePageDefs = {
  '/mobilitaet': {
    slug: 'mobilitaet',
    label: 'Mobilität',
    heroTitle: 'Fahrzeugveredelung & Schutz',
    heroDesc: 'Von der Lackschutzfolie bis zum kompletten Flottenbranding – wir realisieren Ihre Fahrzeugprojekte mit Präzision und Premium-Qualität.',
    ctaTitle: 'Ihr Fahrzeugprojekt',
    ctaDesc: 'Ob Einzelfahrzeug oder Flotte – wir beraten Sie gerne zu den Möglichkeiten.',
    heroImage: images.servicePages['mobilitaet'],
    services: servicePages.mobilitaet?.services || [],
    faqs: servicePages.mobilitaet?.faqs || [],
  },
  '/architektur-raum': {
    slug: 'architektur',
    label: 'Raum & Architektur',
    heroTitle: 'Markenräume und Oberflächen',
    heroDesc: 'Wir transformieren Räume in Markenerlebnisse – durch Architekturfolierung, Glasgestaltung und Interior Branding.',
    ctaTitle: 'Ihr Raumprojekt',
    ctaDesc: 'Lassen Sie uns über Ihre Raumgestaltung sprechen – von der ersten Idee bis zur Umsetzung.',
    heroImage: images.servicePages['architektur-raum'],
    services: [
      { title: 'Raumgestaltung', desc: 'Ganzheitliche Konzepte für Ihre Markenräume' },
      { title: 'Architekturfolierung', desc: 'Oberflächenveredelung für Fassaden und Innenräume' },
      { title: 'Glas- & Sichtschutzfolien', desc: 'Funktionale und ästhetische Glaslösungen' },
      { title: 'Interior Branding', desc: 'Markenidentität in Ihren Räumen verankern' },
      { title: 'Oberflächenveredelung', desc: 'Premium-Finish für Möbel und Einbauten' },
      { title: 'Raumkonzepte', desc: 'Von der Idee zur fertigen Raumgestaltung' },
    ],
    faqs: [
      { q: 'Welche Oberflächen können foliert werden?', a: 'Nahezu alle glatten Oberflächen: Glas, Metall, Holz, Kunststoff. Wir beraten Sie zu den Möglichkeiten Ihrer spezifischen Anwendung.' },
      { q: 'Wie lange dauert ein Raumprojekt?', a: 'Je nach Umfang 2-8 Wochen von der Konzeption bis zur Fertigstellung. Für zeitkritische Projekte bieten wir Express-Optionen.' },
      { q: 'Arbeiten Sie mit Innenarchitekten zusammen?', a: 'Ja, wir sind etablierter Produktionspartner für Architektur- und Designbüros und setzen deren Entwürfe präzise um.' },
      { q: 'Gibt es Mustermaterialien?', a: 'Selbstverständlich. Wir senden Ihnen gerne ein Musterpaket mit den für Ihr Projekt relevanten Materialien zu.' },
    ],
  },
  '/markenkommunikation': {
    slug: 'markenkommunikation',
    label: 'Markenkommunikation',
    heroTitle: 'Großformat, Systeme, Event',
    heroDesc: 'Von der Messewand bis zur Fassadenwerbung – wir produzieren und installieren Ihre Markenkommunikation in jeder Größe.',
    ctaTitle: 'Ihr Kommunikationsprojekt',
    ctaDesc: 'Messe, Event oder Retail – wir realisieren Ihre visuelle Kommunikation in jeder Größenordnung.',
    heroImage: images.servicePages['markenkommunikation'],
    services: [
      { title: 'Großformatmedien', desc: 'Banner, Planen, Fassadenwerbung im XXL-Format' },
      { title: 'Werbesysteme', desc: 'Displays, Roll-ups, Messewände und Aufsteller' },
      { title: 'Printmedien', desc: 'Flyer, Broschüren, Kataloge und Geschäftsausstattung' },
      { title: 'Event- & Messegrafik', desc: 'Komplette visuelle Ausstattung für Ihre Events' },
      { title: 'POS-Systeme', desc: 'Point-of-Sale Materialien und Ladenkommunikation' },
    ],
    faqs: [
      { q: 'Welche Druckgrößen sind möglich?', a: 'Nahezu unbegrenzt – von Visitenkarten bis zu Fassadenwerbung über mehrere hundert Quadratmeter. Wir beraten zur optimalen Lösung.' },
      { q: 'Können Sie komplette Messestände liefern?', a: 'Ja, wir bieten Full-Service: Konzept, Grafik, Produktion und Aufbau – alles aus einer Hand.' },
      { q: 'Wie kurzfristig können Sie produzieren?', a: 'Express-Produktion ist möglich. Je nach Umfang können wir auch sehr kurzfristige Termine realisieren.' },
      { q: 'Bieten Sie auch Montageservice an?', a: 'Selbstverständlich. Unsere Montageteams arbeiten deutschlandweit und auch international.' },
    ],
  },
  '/design-konzepte': {
    slug: 'design',
    label: 'Design & Konzeption',
    heroTitle: 'Leitlinien, die sich umsetzen lassen',
    heroDesc: 'Design mit Produktionsfokus – wir entwickeln Konzepte, die nicht nur gut aussehen, sondern sich auch realisieren lassen.',
    ctaTitle: 'Ihr Designprojekt',
    ctaDesc: 'Konzept, Visualisierung oder komplette Umsetzung – lassen Sie uns über Ihre Anforderungen sprechen.',
    heroImage: images.servicePages['design-konzepte'],
    services: [
      { title: 'Designkonzepte', desc: 'Visuelle Ideen und Konzepte für Ihre Projekte' },
      { title: 'Visuelle Leitlinien', desc: 'Styleguides und Designrichtlinien für Konsistenz' },
      { title: 'Produktionsvorbereitung', desc: 'Druckdaten, Plotdaten und technische Dokumentation' },
      { title: 'Ganzheitliche Markenbegleitung', desc: 'Langfristige Designpartnerschaft für Ihre Marke' },
    ],
    faqs: [
      { q: 'Übernehmen Sie auch die Umsetzung?', a: 'Ja, das ist unsere Stärke: Wir denken von Anfang an produktionsorientiert und können nahtlos in die Umsetzung übergehen.' },
      { q: 'Arbeiten Sie auch für Agenturen?', a: 'Selbstverständlich. Wir sind verlässlicher White-Label-Partner für Agenturen, die Produktionskompetenz benötigen.' },
      { q: 'Welche Formate liefern Sie?', a: 'Alle gängigen Formate: Print-PDFs, Plotdaten, Vektorgrafiken, 3D-Renderings – immer abgestimmt auf den Verwendungszweck.' },
      { q: 'Wie läuft die Abstimmung ab?', a: 'Transparent und effizient: Klare Meilensteine, regelmäßige Präsentationen und strukturiertes Feedback.' },
    ],
  },
  '/projektmanagement': {
    slug: 'projektmanagement',
    label: 'Projektmanagement',
    heroTitle: 'Struktur für große Umsetzungen',
    heroDesc: 'Planung, Koordination und Qualitätssicherung für Flotten, Räume und Events – strukturiert und zuverlässig.',
    ctaTitle: 'Großprojekt geplant?',
    ctaDesc: 'Flotten-Rollout, Messeauftritt oder komplexe Raumgestaltung – wir übernehmen die Koordination.',
    heroImage: images.servicePages['projektmanagement'],
    services: [
      { title: 'Planung', desc: 'Strukturierte Projektplanung und Zeitmanagement' },
      { title: 'Koordination', desc: 'Steuerung aller Beteiligten und Gewerke' },
      { title: 'Materialberatung', desc: 'Auswahl optimaler Materialien für Ihr Projekt' },
      { title: 'Produktion', desc: 'Steuerung und Überwachung der Fertigung' },
      { title: 'Montage', desc: 'Professionelle Installation vor Ort' },
      { title: 'Qualitätssicherung', desc: 'Kontrolle und Abnahme aller Leistungen' },
    ],
    faqs: [],
  },
};

function getServiceFields(pathname) {
  const def = servicePageDefs[pathname];
  if (!def) return [];
  const fields = [];
  const slug = def.slug;

  // Hero image
  if (def.heroImage) {
    fields.push(
      f(`images.service.${slug}.hero`, 'Hero Bild', 'image', 'Hero-Bild', pathname, def.heroImage),
    );
  }

  fields.push(
    f(`service.${slug}.heroTitle`, 'Hero Überschrift', 'text', 'Hero', pathname, def.heroTitle),
    f(`service.${slug}.heroDesc`, 'Hero Beschreibung', 'textarea', 'Hero', pathname, def.heroDesc),
  );

  def.services.forEach((s, i) => {
    fields.push(
      f(`service.${slug}.services.${i}.title`, `Leistung ${i + 1} – Titel`, 'text', 'Leistungen', pathname, s.title),
      f(`service.${slug}.services.${i}.desc`, `Leistung ${i + 1} – Beschreibung`, 'text', 'Leistungen', pathname, s.desc),
    );
  });

  def.faqs.forEach((faq, i) => {
    fields.push(
      f(`service.${slug}.faqs.${i}.q`, `FAQ ${i + 1} – Frage`, 'text', 'FAQ', pathname, faq.q),
      f(`service.${slug}.faqs.${i}.a`, `FAQ ${i + 1} – Antwort`, 'textarea', 'FAQ', pathname, faq.a),
    );
  });

  if (def.ctaTitle) {
    fields.push(
      f(`service.${slug}.ctaTitle`, 'CTA Überschrift', 'text', 'CTA', pathname, def.ctaTitle),
      f(`service.${slug}.ctaDesc`, 'CTA Beschreibung', 'textarea', 'CTA', pathname, def.ctaDesc),
    );
  }

  return fields;
}

export function getFieldsForPage(pathname) {
  const fields = [];

  const global = [
    f('company.name', 'Firmenname', 'text', 'Global', '*', company.name),
    f('company.tagline', 'Tagline', 'text', 'Global', '*', company.tagline),
    f('company.description', 'Beschreibung', 'textarea', 'Global', '*', company.description),
    f('company.phone', 'Telefon', 'text', 'Global', '*', company.phone),
    f('company.email', 'E-Mail', 'text', 'Global', '*', company.email),
  ];

  // ── Homepage ──
  if (pathname === '/') {
    fields.push(
      f('images.hero.src', 'Hero Bild', 'image', 'Hero-Bild', '/', images.hero.src),
      f('hero.headline', 'Hero Überschrift', 'textarea', 'Hero', '/', hero.headline),
      f('hero.subline', 'Hero Untertitel', 'textarea', 'Hero', '/', hero.subline),
      f('hero.ctaPrimary.label', 'Primärer Button', 'text', 'Hero', '/', hero.ctaPrimary.label),
      f('hero.ctaSecondary.label', 'Sekundärer Button', 'text', 'Hero', '/', hero.ctaSecondary.label),
    );
    statistics.forEach((s, i) => {
      fields.push(
        f(`stats.${i}.value`, `Statistik ${i + 1} – Wert`, 'text', 'Statistiken', '/', String(s.value) + (s.suffix || '')),
        f(`stats.${i}.label`, `Statistik ${i + 1} – Label`, 'text', 'Statistiken', '/', s.label),
      );
    });
    /* Trust bar list: allows add/edit/delete */
    fields.push({
      key: 'trustbar.items',
      label: 'Trust-Bar (Liste)',
      type: 'list',
      group: 'Statistiken',
      page: '/',
      default: statistics.map(s => ({ value: `${s.value}${s.suffix || ''}`, label: s.label })),
      schema: [
        { key: 'value', label: 'Wert', placeholder: 'z.B. 500+' },
        { key: 'label', label: 'Label', placeholder: 'z.B. Projekte' },
      ],
    });
    targetAudiences.forEach((a, i) => {
      fields.push(
        f(`audiences.${i}.title`, `Zielgruppe ${i + 1} – Titel`, 'text', 'Zielgruppen', '/', a.title),
        f(`audiences.${i}.focus`, `Zielgruppe ${i + 1} – Fokus`, 'text', 'Zielgruppen', '/', a.focus),
      );
    });
    /* ── Was wir tun (Services) ── */
    fields.push(
      f('services.sectionLabel', 'Obertitel', 'text', 'Was wir tun', '/', 'Leistungen'),
      f('services.sectionTitle', 'Überschrift', 'text', 'Was wir tun', '/', 'Was wir tun.'),
    );
    const defaultServices = [
      { label: 'Mobilität', title: 'Fahrzeuge, die auffallen.', desc: 'Von der Lackschutzfolie bis zum kompletten Flottenbranding — wir realisieren Ihre Fahrzeugprojekte mit Präzision und Premium-Qualität.', features: 'PPF & Lackschutz, Flottenbranding, Teil- & Vollfolierung, Designkonzepte', href: '/mobilitaet', image: '/images/porsche-gt3-cup-race.webp' },
      { label: 'Raum & Architektur', title: 'Räume, die wirken.', desc: 'Wir transformieren Räume in Markenerlebnisse — durch Architekturfolierung, Glasgestaltung und Interior Branding.', features: 'Raumgestaltung, Architekturfolierung, Glas- & Sichtschutzfolien, Interior Branding', href: '/architektur-raum', image: '/images/IMG_5646.webp' },
      { label: 'Markenkommunikation', title: 'Botschaften, die ankommen.', desc: 'Von der Messewand bis zur Fassadenwerbung — wir produzieren und installieren Ihre Markenkommunikation in jeder Größe.', features: 'Großformatmedien, Werbesysteme, Event- & Messegrafik, POS-Systeme', href: '/markenkommunikation', image: '/images/IMG_7190.webp' },
    ];
    defaultServices.forEach((svc, i) => {
      fields.push(
        f(`services.${i}.image`, `Leistung ${i + 1} – Bild`, 'image', 'Was wir tun', '/', svc.image),
        f(`services.${i}.label`, `Leistung ${i + 1} – Kategorie`, 'text', 'Was wir tun', '/', svc.label),
        f(`services.${i}.title`, `Leistung ${i + 1} – Überschrift`, 'text', 'Was wir tun', '/', svc.title),
        f(`services.${i}.desc`, `Leistung ${i + 1} – Beschreibung`, 'textarea', 'Was wir tun', '/', svc.desc),
        f(`services.${i}.features`, `Leistung ${i + 1} – Merkmale (kommagetrennt)`, 'text', 'Was wir tun', '/', svc.features),
        f(`services.${i}.href`, `Leistung ${i + 1} – Link`, 'text', 'Was wir tun', '/', svc.href),
      );
    });

    /* ── Showcase ── */
    fields.push(
      f('homepage.showcase.label', 'Showcase – Obertitel', 'text', 'Showcase', '/', 'Premium Qualität'),
      f('homepage.showcase.title', 'Showcase – Überschrift', 'text', 'Showcase', '/', 'Kompromisslos in jedem Detail.'),
    );

    /* ── Projects ── */
    fields.push(
      f('homepage.projects.label', 'Projekte – Obertitel', 'text', 'Projekte', '/', 'Portfolio'),
      f('homepage.projects.title', 'Projekte – Überschrift', 'text', 'Projekte', '/', 'Ausgewählte Projekte'),
      f('homepage.projects.linkText', 'Projekte – Link-Text', 'text', 'Projekte', '/', 'Alle Projekte'),
    );

    /* ── Process ── */
    fields.push(
      f('homepage.process.label', 'Prozess – Obertitel', 'text', 'Prozess', '/', 'Ablauf'),
      f('homepage.process.title', 'Prozess – Überschrift', 'text', 'Prozess', '/', 'Unser Prozess'),
    );
    processSteps.forEach((p, i) => {
      fields.push(
        f(`process.${i}.title`, `Schritt ${p.num} – Titel`, 'text', 'Prozess', '/', p.title),
        f(`process.${i}.desc`, `Schritt ${p.num} – Beschreibung`, 'text', 'Prozess', '/', p.desc),
      );
    });

    /* ── Testimonials ── */
    fields.push(
      f('homepage.testimonials.label', 'Bewertungen – Obertitel', 'text', 'Bewertungen', '/', 'Kundenstimmen'),
      f('homepage.testimonials.title', 'Bewertungen – Überschrift', 'text', 'Bewertungen', '/', 'Was unsere Kunden sagen'),
    );
    testimonials.forEach((t, i) => {
      fields.push(
        f(`testimonials.${i}.quote`, `Bewertung ${i + 1} – Zitat`, 'textarea', 'Bewertungen', '/', t.quote),
        f(`testimonials.${i}.author`, `Bewertung ${i + 1} – Autor`, 'text', 'Bewertungen', '/', t.author),
        f(`testimonials.${i}.position`, `Bewertung ${i + 1} – Position`, 'text', 'Bewertungen', '/', t.position),
        f(`testimonials.${i}.company`, `Bewertung ${i + 1} – Firma`, 'text', 'Bewertungen', '/', t.company),
      );
    });

    /* ── FAQ ── */
    const defaultFaqs = [
      { q: 'Was kostet eine Fahrzeugfolierung?', a: 'Die Kosten variieren je nach Fahrzeugtyp und Umfang. Eine Teilfolierung beginnt bei ca. 800 €, eine Vollfolierung ab ca. 2.500 €. Wir erstellen Ihnen gerne ein individuelles Angebot.' },
      { q: 'Wie lange dauert ein typisches Projekt?', a: 'Fahrzeugprojekte dauern in der Regel 3–7 Werktage. Raum- und Architekturprojekte planen wir mit 2–8 Wochen. Express-Optionen sind bei Bedarf verfügbar.' },
      { q: 'Arbeiten Sie auch außerhalb von NRW?', a: 'Ja, unsere mobilen Teams sind europaweit im Einsatz. Wir realisieren Projekte in ganz Deutschland und im angrenzenden Ausland.' },
      { q: 'Bieten Sie auch Designleistungen an?', a: 'Absolut. Von der Konzeptentwicklung über Visualisierungen bis zur produktionsreifen Reinzeichnung — alles aus einer Hand.' },
      { q: 'Wie läuft die Zusammenarbeit ab?', a: 'Nach einem kurzen Briefing erstellen wir ein Konzept und Angebot. Nach Freigabe starten wir mit Produktion und termingerechter Montage. Qualitätskontrolle inklusive.' },
    ];
    fields.push(
      f('homepage.faq.label', 'FAQ – Obertitel', 'text', 'FAQ', '/', 'FAQ'),
      f('homepage.faq.title', 'FAQ – Überschrift', 'text', 'FAQ', '/', 'Häufige Fragen'),
    );
    defaultFaqs.forEach((faq, i) => {
      fields.push(
        f(`homepage.faq.${i}.q`, `FAQ ${i + 1} – Frage`, 'text', 'FAQ', '/', faq.q),
        f(`homepage.faq.${i}.a`, `FAQ ${i + 1} – Antwort`, 'textarea', 'FAQ', '/', faq.a),
      );
    });

    /* ── CTA ── */
    fields.push(
      f('cta.headline', 'CTA Überschrift', 'text', 'CTA', '/', ctaSection.headline),
      f('cta.subline', 'CTA Untertitel', 'textarea', 'CTA', '/', ctaSection.subline),
      f('cta.btnLabel', 'CTA Button-Text', 'text', 'CTA', '/', 'Kontakt aufnehmen'),
    );
  }

  // ── Kontakt-Seite ──
  if (pathname === '/kontakt') {
    fields.push(
      f('kontakt.hero.label', 'Hero – Obertitel', 'text', 'Kontakt Hero', '/kontakt', 'Kontakt'),
      f('kontakt.hero.title', 'Hero – Überschrift', 'text', 'Kontakt Hero', '/kontakt', 'Projekt anfragen'),
      f('kontakt.hero.desc', 'Hero – Beschreibung', 'textarea', 'Kontakt Hero', '/kontakt', 'Kurze Infos reichen – wir melden uns mit Rückfragen oder einem konkreten Vorschlag.'),
      f('kontakt.form.nameLabel', 'Formular – Name Label', 'text', 'Kontakt Formular', '/kontakt', 'Name *'),
      f('kontakt.form.emailLabel', 'Formular – E-Mail Label', 'text', 'Kontakt Formular', '/kontakt', 'E-Mail *'),
      f('kontakt.form.phoneLabel', 'Formular – Telefon Label', 'text', 'Kontakt Formular', '/kontakt', 'Telefon'),
      f('kontakt.form.serviceLabel', 'Formular – Leistung Label', 'text', 'Kontakt Formular', '/kontakt', 'Welche Leistung?'),
      f('kontakt.form.messageLabel', 'Formular – Nachricht Label', 'text', 'Kontakt Formular', '/kontakt', 'Ihre Nachricht *'),
      f('kontakt.form.submitLabel', 'Formular – Submit Button', 'text', 'Kontakt Formular', '/kontakt', 'Anfrage senden'),
      f('kontakt.sidebar.title', 'Sidebar – Überschrift', 'text', 'Kontakt Sidebar', '/kontakt', 'Direkt erreichen'),
      f('kontakt.sidebar.email', 'Sidebar – E-Mail', 'text', 'Kontakt Sidebar', '/kontakt', 'info@visuworks.de'),
      f('kontakt.sidebar.phone', 'Sidebar – Telefon', 'text', 'Kontakt Sidebar', '/kontakt', '+49 211 123 456 78'),
      f('kontakt.sidebar.location', 'Sidebar – Standort', 'text', 'Kontakt Sidebar', '/kontakt', 'Düsseldorf'),
      f('kontakt.sidebar.footer', 'Sidebar – Footer-Text', 'text', 'Kontakt Sidebar', '/kontakt', 'Projekte europaweit · Standort Düsseldorf'),
      f('kontakt.sidebar.cta', 'Sidebar – CTA Button Text', 'text', 'Kontakt Sidebar', '/kontakt', 'Projekt anfragen'),
      f('kontakt.sidebar.ctaUrl', 'Sidebar – CTA Button URL', 'text', 'Kontakt Sidebar', '/kontakt', '/kontakt#form'),
    );
  }

  // ── Danke-Seite ──
  if (pathname === '/danke') {
    fields.push(
      f('danke.title', 'Überschrift', 'text', 'Danke', '/danke', 'Vielen Dank!'),
      f('danke.subtitle', 'Untertitel', 'text', 'Danke', '/danke', 'Ihre Projektanfrage ist bei uns eingegangen.'),
      f('danke.message', 'Nachricht', 'textarea', 'Danke', '/danke', 'Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen mit Rückfragen oder einem konkreten Vorschlag.'),
      f('danke.homeBtn', 'Startseite-Button', 'text', 'Danke', '/danke', 'Zur Startseite'),
      f('danke.projekteBtn', 'Projekte-Button', 'text', 'Danke', '/danke', 'Projekte ansehen'),
    );
  }

  // ── Impressum-Seite ──
  if (pathname === '/impressum') {
    fields.push(
      f('impressum.label', 'Obertitel', 'text', 'Impressum', '/impressum', 'Rechtliches'),
      f('impressum.title', 'Überschrift', 'text', 'Impressum', '/impressum', 'Impressum'),
      f('impressum.subtitle', 'Untertitel', 'text', 'Impressum', '/impressum', 'gemäß § 5 TMG und § 18 Abs. 2 MStV'),
      f('impressum.tocLabel', 'Inhaltsverzeichnis Label', 'text', 'Impressum', '/impressum', 'Inhaltsverzeichnis'),
      f('impressum.stand', 'Stand Datum', 'text', 'Impressum', '/impressum', 'Stand: März 2026'),
      f('impressum.weitereTexte', 'Weitere Rechtstexte Label', 'text', 'Impressum', '/impressum', 'Weitere Rechtstexte:'),
    );
  }

  // ── Datenschutz-Seite ──
  if (pathname === '/datenschutz') {
    fields.push(
      f('datenschutz.label', 'Obertitel', 'text', 'Datenschutz', '/datenschutz', 'Rechtliches'),
      f('datenschutz.title', 'Überschrift', 'text', 'Datenschutz', '/datenschutz', 'Datenschutzerklärung'),
      f('datenschutz.tocLabel', 'Inhaltsverzeichnis Label', 'text', 'Datenschutz', '/datenschutz', 'Inhaltsverzeichnis'),
      f('datenschutz.stand', 'Stand Datum', 'text', 'Datenschutz', '/datenschutz', 'Stand: März 2026'),
      f('datenschutz.weitereTexte', 'Weitere Rechtstexte Label', 'text', 'Datenschutz', '/datenschutz', 'Weitere Rechtstexte:'),
    );
  }

  // ── AGB (B2C) Seite ──
  if (pathname === '/agb') {
    fields.push(
      f('agb.label', 'Obertitel', 'text', 'AGB', '/agb', 'Rechtliches'),
      f('agb.title', 'Überschrift', 'text', 'AGB', '/agb', 'Allgemeine Geschäftsbedingungen (B2C)'),
      f('agb.subtitle', 'Untertitel', 'text', 'AGB', '/agb', 'Gültig für Verbraucher im Sinne des §13 BGB.'),
      f('agb.tocLabel', 'Inhaltsverzeichnis Label', 'text', 'AGB', '/agb', 'Inhaltsverzeichnis'),
      f('agb.stand', 'Stand Datum', 'text', 'AGB', '/agb', 'Stand: März 2026'),
      f('agb.weitereTexte', 'Weitere Rechtstexte Label', 'text', 'AGB', '/agb', 'Weitere Rechtstexte:'),
    );
  }

  // ── AGB B2B Seite ──
  if (pathname === '/agb-b2b') {
    fields.push(
      f('agbb2b.label', 'Obertitel', 'text', 'AGB B2B', '/agb-b2b', 'Rechtliches'),
      f('agbb2b.title', 'Überschrift', 'text', 'AGB B2B', '/agb-b2b', 'Allgemeine Geschäftsbedingungen für Unternehmer (B2B)'),
      f('agbb2b.subtitle', 'Untertitel', 'text', 'AGB B2B', '/agb-b2b', 'Diese AGB gelten ausschließlich gegenüber Unternehmern im Sinne des §14 BGB.'),
      f('agbb2b.tocLabel', 'Inhaltsverzeichnis Label', 'text', 'AGB B2B', '/agb-b2b', 'Inhaltsverzeichnis'),
      f('agbb2b.stand', 'Stand Datum', 'text', 'AGB B2B', '/agb-b2b', 'Stand: März 2026'),
      f('agbb2b.weitereTexte', 'Weitere Rechtstexte Label', 'text', 'AGB B2B', '/agb-b2b', 'Weitere Rechtstexte:'),
    );
  }

  // ── Service Pages ──
  const serviceFields = getServiceFields(pathname);
  if (serviceFields.length > 0) {
    fields.push(...serviceFields);
  }

  // ── Projekte-Übersicht ──
  if (pathname === '/projekte') {
    fields.push(
      f('projekte.heroTitle', 'Hero Überschrift', 'text', 'Hero', '/projekte', 'Projekte & Referenzen'),
      f('projekte.heroSubline', 'Hero Untertitel', 'text', 'Hero', '/projekte', 'Kuratiert. Präzise. Umgesetzt.'),
    );
    projects.forEach((p) => {
      const img = images.projects[p.slug];
      fields.push(
        f(`projects.${p.slug}.title`, `${p.title.substring(0, 22)} – Titel`, 'text', 'Projekte', '/projekte', p.title),
        f(`projects.${p.slug}.subtitle`, `${p.title.substring(0, 22)} – Untertitel`, 'text', 'Projekte', '/projekte', p.subtitle),
      );
      if (img?.thumbnail) {
        fields.push(
          f(`images.projects.${p.slug}.thumbnail`, `${p.title.substring(0, 22)} – Bild`, 'image', 'Projektbilder', '/projekte', img.thumbnail),
        );
      }
    });
  }

  // ── Einzelnes Projekt ──
  const projectMatch = pathname.match(/^\/projekte\/(.+)$/);
  if (projectMatch) {
    const slug = decodeURIComponent(projectMatch[1]);
    const p = projects.find((x) => x.slug === slug);
    if (p) {
      const img = images.projects[slug];
      // Project image
      if (img?.thumbnail) {
        fields.push(
          f(`images.projects.${slug}.thumbnail`, 'Hauptbild', 'image', 'Projekt-Bilder', pathname, img.thumbnail),
        );
      }
      // Gallery images
      if (img?.gallery?.length > 0) {
        img.gallery.forEach((src, i) => {
          fields.push(
            f(`images.projects.${slug}.gallery.${i}`, `Galerie-Bild ${i + 1}`, 'image', 'Projekt-Galerie', pathname, src),
          );
        });
      }
      // Text fields
      fields.push(
        f(`projects.${slug}.title`, 'Projekttitel', 'text', 'Projekt', pathname, p.title),
        f(`projects.${slug}.subtitle`, 'Untertitel', 'text', 'Projekt', pathname, p.subtitle),
        f(`projects.${slug}.category`, 'Kategorie', 'text', 'Projekt', pathname, p.category),
        f(`projects.${slug}.client`, 'Auftraggeber', 'text', 'Projekt-Details', pathname, p.client),
        f(`projects.${slug}.scope`, 'Umfang', 'text', 'Projekt-Details', pathname, p.scope),
        f(`projects.${slug}.location`, 'Standort', 'text', 'Projekt-Details', pathname, p.location),
        f(`projects.${slug}.year`, 'Jahr', 'text', 'Projekt-Details', pathname, p.year),
        f(`projects.${slug}.shortDesc`, 'Kurzbeschreibung', 'textarea', 'Projekt-Texte', pathname, p.shortDesc),
        f(`projects.${slug}.challenge`, 'Herausforderung', 'textarea', 'Projekt-Texte', pathname, p.challenge),
        f(`projects.${slug}.solution`, 'Lösung', 'textarea', 'Projekt-Texte', pathname, p.solution),
        f(`projects.${slug}.result`, 'Ergebnis', 'textarea', 'Projekt-Texte', pathname, p.result),
      );
    }
  }

  return [...global, ...fields];
}
