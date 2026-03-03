import { hero, company, ctaSection, statistics, targetAudiences, testimonials, processSteps } from './site';
import { projects } from './projects';
import images from './images';

const f = (key, label, type, group, page, defaultValue) => ({
  key, label, type, group, page, default: defaultValue,
});

export function getFieldsForPage(pathname) {
  const fields = [];

  // ── Global (visible on all pages) ──
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
      f('hero.headline', 'Hero Überschrift', 'textarea', 'Hero', '/', hero.headline),
      f('hero.subline', 'Hero Untertitel', 'textarea', 'Hero', '/', hero.subline),
      f('hero.ctaPrimary.label', 'Primärer Button', 'text', 'Hero', '/', hero.ctaPrimary.label),
      f('hero.ctaSecondary.label', 'Sekundärer Button', 'text', 'Hero', '/', hero.ctaSecondary.label),
      f('images.hero.src', 'Hero Bild', 'image', 'Hero', '/', images.hero.src),
    );
    // Stats
    statistics.forEach((s, i) => {
      fields.push(
        f(`stats.${i}.value`, `Statistik ${i + 1} – Wert`, 'text', 'Statistiken', '/', String(s.value) + (s.suffix || '')),
        f(`stats.${i}.label`, `Statistik ${i + 1} – Label`, 'text', 'Statistiken', '/', s.label),
        f(`stats.${i}.description`, `Statistik ${i + 1} – Beschreibung`, 'text', 'Statistiken', '/', s.description),
      );
    });
    // Audiences
    targetAudiences.forEach((a, i) => {
      fields.push(
        f(`audiences.${i}.title`, `Zielgruppe ${i + 1} – Titel`, 'text', 'Zielgruppen', '/', a.title),
        f(`audiences.${i}.focus`, `Zielgruppe ${i + 1} – Fokus`, 'text', 'Zielgruppen', '/', a.focus),
      );
    });
    // CTA Section
    fields.push(
      f('cta.headline', 'CTA Überschrift', 'text', 'CTA', '/', ctaSection.headline),
      f('cta.subline', 'CTA Untertitel', 'textarea', 'CTA', '/', ctaSection.subline),
    );
    // Process Steps
    processSteps.forEach((p, i) => {
      fields.push(
        f(`process.${i}.title`, `Schritt ${p.num} – Titel`, 'text', 'Prozess', '/', p.title),
        f(`process.${i}.desc`, `Schritt ${p.num} – Beschreibung`, 'text', 'Prozess', '/', p.desc),
      );
    });
    // Testimonials
    testimonials.forEach((t, i) => {
      fields.push(
        f(`testimonials.${i}.quote`, `Bewertung ${i + 1} – Zitat`, 'textarea', 'Bewertungen', '/', t.quote),
        f(`testimonials.${i}.author`, `Bewertung ${i + 1} – Autor`, 'text', 'Bewertungen', '/', t.author),
        f(`testimonials.${i}.position`, `Bewertung ${i + 1} – Position`, 'text', 'Bewertungen', '/', t.position),
        f(`testimonials.${i}.company`, `Bewertung ${i + 1} – Firma`, 'text', 'Bewertungen', '/', t.company),
      );
    });
  }

  // ── Projekte-Übersicht ──
  if (pathname === '/projekte' || pathname === '/') {
    projects.forEach((p) => {
      fields.push(
        f(`projects.${p.slug}.title`, `${p.title.substring(0, 30)}… – Titel`, 'text', 'Projekte', '/projekte', p.title),
        f(`projects.${p.slug}.subtitle`, `${p.title.substring(0, 30)}… – Untertitel`, 'text', 'Projekte', '/projekte', p.subtitle),
        f(`projects.${p.slug}.category`, `${p.title.substring(0, 30)}… – Kategorie`, 'text', 'Projekte', '/projekte', p.category),
      );
      const img = images.projects[p.slug];
      if (img) {
        fields.push(
          f(`images.projects.${p.slug}.thumbnail`, `${p.title.substring(0, 30)}… – Bild`, 'image', 'Projektbilder', '/projekte', img.thumbnail),
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
      fields.push(
        f(`projects.${slug}.title`, 'Projekttitel', 'text', 'Projekt', pathname, p.title),
        f(`projects.${slug}.subtitle`, 'Projekt-Untertitel', 'text', 'Projekt', pathname, p.subtitle),
        f(`projects.${slug}.category`, 'Kategorie', 'text', 'Projekt', pathname, p.category),
        f(`projects.${slug}.challenge`, 'Herausforderung', 'textarea', 'Projekt', pathname, p.challenge),
        f(`projects.${slug}.solution`, 'Lösung', 'textarea', 'Projekt', pathname, p.solution),
        f(`projects.${slug}.result`, 'Ergebnis', 'textarea', 'Projekt', pathname, p.result),
        f(`projects.${slug}.client`, 'Auftraggeber', 'text', 'Projekt', pathname, p.client),
      );
      const img = images.projects[slug];
      if (img) {
        fields.push(
          f(`images.projects.${slug}.thumbnail`, 'Projektbild', 'image', 'Projekt', pathname, img.thumbnail),
        );
      }
    }
  }

  return [...global, ...fields];
}

export function getAllContentKeys() {
  const keys = {};
  keys['hero.headline'] = hero.headline;
  keys['hero.subline'] = hero.subline;
  keys['hero.ctaPrimary.label'] = hero.ctaPrimary.label;
  keys['hero.ctaSecondary.label'] = hero.ctaSecondary.label;
  keys['images.hero.src'] = images.hero.src;
  keys['company.name'] = company.name;
  keys['company.tagline'] = company.tagline;
  keys['company.description'] = company.description;
  keys['company.phone'] = company.phone;
  keys['company.email'] = company.email;
  keys['cta.headline'] = ctaSection.headline;
  keys['cta.subline'] = ctaSection.subline;
  statistics.forEach((s, i) => {
    keys[`stats.${i}.value`] = String(s.value) + (s.suffix || '');
    keys[`stats.${i}.label`] = s.label;
    keys[`stats.${i}.description`] = s.description;
  });
  targetAudiences.forEach((a, i) => {
    keys[`audiences.${i}.title`] = a.title;
    keys[`audiences.${i}.focus`] = a.focus;
  });
  processSteps.forEach((p, i) => {
    keys[`process.${i}.title`] = p.title;
    keys[`process.${i}.desc`] = p.desc;
  });
  testimonials.forEach((t, i) => {
    keys[`testimonials.${i}.quote`] = t.quote;
    keys[`testimonials.${i}.author`] = t.author;
    keys[`testimonials.${i}.position`] = t.position;
    keys[`testimonials.${i}.company`] = t.company;
  });
  projects.forEach((p) => {
    keys[`projects.${p.slug}.title`] = p.title;
    keys[`projects.${p.slug}.subtitle`] = p.subtitle;
    keys[`projects.${p.slug}.category`] = p.category;
    keys[`projects.${p.slug}.challenge`] = p.challenge;
    keys[`projects.${p.slug}.solution`] = p.solution;
    keys[`projects.${p.slug}.result`] = p.result;
    const img = images.projects[p.slug];
    if (img?.thumbnail) keys[`images.projects.${p.slug}.thumbnail`] = img.thumbnail;
  });
  return keys;
}
