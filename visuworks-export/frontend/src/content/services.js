// ─────────────────────────────────────────────
// VISUWORKS — Services & Sub-Services Content
// Edit this file to change service-page content,
// sub-service pages, and navigation structure.
// ─────────────────────────────────────────────

// Re-export subservices data (used by SubServicePage)
export { default as subservices } from '../data/subservices';

// Re-export navigation structure (used by Navbar)
export { navStructure, allLeistungenPaths } from '../data/navigation';

// ── Service Page Content (used on pillar-level pages like MobilitaetPage) ──

export const servicePages = {
  mobilitaet: {
    title: 'Mobilität',
    subtitle: 'Fahrzeugveredelung & Schutz',
    description: 'Von der Einzelfolierung bis zum europaweiten Flottenrollout: Wir sind Ihr Partner für visuelle Exzellenz auf der Straße.',
    services: [
      { title: 'PPF & Schutzfolien', desc: 'Lackschutzfolie für langfristigen Werterhalt' },
      { title: 'Flottenbranding', desc: 'Einheitliches Erscheinungsbild für Ihre Fahrzeugflotte' },
      { title: 'Teil-/Vollfolierung', desc: 'Individuelle Fahrzeuggestaltung nach Ihren Wünschen' },
      { title: 'Designentwicklung', desc: 'Konzeption und Visualisierung Ihrer Fahrzeugprojekte' },
    ],
    projects: [
      { id: 1, category: 'Flotte', title: 'Flottenbranding Logistik-Konzern', tags: ['50+ Fahrzeuge', 'Corporate Design'] },
      { id: 2, category: 'Premium', title: 'PPF Porsche 911 GT3', tags: ['Vollschutz', 'Steinschlag'] },
      { id: 3, category: 'Design', title: 'Designfolierung Mercedes-AMG', tags: ['Individuell', 'Matt-Finish'] },
    ],
    faqs: [
      { q: 'Wie lange hält eine Fahrzeugfolierung?', a: 'Bei professioneller Pflege halten hochwertige Folien 5-7 Jahre. Wir verwenden ausschließlich Premium-Materialien führender Hersteller.' },
      { q: 'Ist PPF auch für Neuwagen sinnvoll?', a: 'Besonders für Neuwagen empfehlenswert – Lackschutzfolie bewahrt den Originalzustand und steigert den Wiederverkaufswert.' },
      { q: 'Welche Vorlaufzeit benötigen Sie?', a: 'Je nach Projektumfang 1-4 Wochen. Bei Flottenprojekten empfehlen wir frühzeitige Planung.' },
      { q: 'Bieten Sie bundesweite Montage an?', a: 'Ja, wir realisieren Projekte europaweit. Bei größeren Aufträgen kommen unsere Teams vor Ort.' },
    ],
  },

  architektur: {
    title: 'Raum & Architektur',
    subtitle: 'Innenraum- & Fassadengestaltung',
    description: 'Wir gestalten Räume die Ihre Marke zum Leben erwecken – von der Glasfolie bis zum ganzheitlichen Interior-Konzept.',
    services: [
      { title: 'Architekturfolierung', desc: 'Fassaden und Oberflächen optisch transformieren' },
      { title: 'Glas- & Sichtschutzfolien', desc: 'Privatsphäre, Sonnenschutz und Gestaltung in einem' },
      { title: 'Interior Branding', desc: 'Ihre Marke im Raum sichtbar und erlebbar machen' },
      { title: 'Oberflächenveredelung', desc: 'Materialoptik und Haptik von Oberflächen perfektionieren' },
      { title: 'Raumkonzepte', desc: 'Ganzheitliche Planung von der Idee bis zur Umsetzung' },
    ],
    projects: [
      { id: 5, category: 'Office', title: 'Headquarters Tech-Konzern', tags: ['Glasfolierung', 'Leitsystem'] },
      { id: 6, category: 'Retail', title: 'Flagship Store Modemarke', tags: ['Interior Branding'] },
      { id: 8, category: 'Showroom', title: 'Showroom Premium-Autohaus', tags: ['Premium', 'Markenraum'] },
    ],
    faqs: [
      { q: 'Welche Oberflächen können foliert werden?', a: 'Nahezu alle glatten Oberflächen: Glas, Metall, Kunststoff, furniertes Holz, Beton und mehr.' },
      { q: 'Wie lange dauert die Umsetzung?', a: 'Abhängig vom Projektumfang – einzelne Räume in 1-3 Tagen, komplette Etagen in 2-4 Wochen.' },
      { q: 'Können Folien rückstandsfrei entfernt werden?', a: 'Ja, professionell applizierte Architekturfolien können komplett entfernt werden.' },
    ],
  },

  markenkommunikation: {
    title: 'Markenkommunikation',
    subtitle: 'Werbung & Eventgrafik',
    description: 'Visuelle Kommunikation, die Aufmerksamkeit erzeugt – von der Plakatwand bis zum interaktiven Messestand.',
    services: [
      { title: 'Großformatmedien', desc: 'Banner, Planen und großflächige Werbemittel' },
      { title: 'Werbesysteme', desc: 'Pylone, Leuchtkästen und Schilderanlagen' },
      { title: 'Printmedien', desc: 'Hochwertige Broschüren, Kataloge und Geschäftsdrucksachen' },
      { title: 'Event- & Messegrafik', desc: 'Komplette grafische Ausstattung für Messen und Events' },
      { title: 'POS-Systeme', desc: 'Displays und Systeme zur Verkaufsförderung' },
    ],
    projects: [
      { id: 9, category: 'Messe', title: 'Messestand IAA Frankfurt', tags: ['800m²', 'Full-Service'] },
      { id: 10, category: 'Event', title: 'Produktlaunch Automobil', tags: ['500 Gäste', 'Inszenierung'] },
      { id: 11, category: 'Outdoor', title: 'Fassadenwerbung Innenstadt', tags: ['300m²', 'XXL'] },
    ],
    faqs: [
      { q: 'Welche Druckverfahren nutzen Sie?', a: 'UV-Druck, Latex-Druck und Solvent-Druck – je nach Anwendung und Anforderung.' },
      { q: 'Bieten Sie Genehmigungssupport an?', a: 'Ja, wir unterstützen bei Baugenehmigungen und Sondernutzungsanträgen für Außenwerbung.' },
      { q: 'Wie schnell können Sie liefern?', a: 'Standardproduktion 5-10 Werktage. Express-Service bei dringendem Bedarf möglich.' },
    ],
  },

  design: {
    title: 'Design & Konzeption',
    subtitle: 'Gestaltung & visuelle Strategie',
    description: 'Wir denken Design immer von der Anwendung her – jede Gestaltung ist auf ihre spätere Produktion und Wirkung optimiert.',
    services: [
      { title: 'Designkonzepte', desc: 'Entwurf und Ausarbeitung visueller Konzepte' },
      { title: 'Visuelle Leitlinien', desc: 'Styleguides und CI-Manuals für konsistente Markenkommunikation' },
      { title: 'Produktionsvorbereitung', desc: 'Druckfertige Daten und technische Spezifikationen' },
      { title: 'Markenbegleitung', desc: 'Langfristige gestalterische Betreuung Ihrer Marke' },
    ],
    projects: [
      { id: 13, category: 'CI', title: 'CI-Entwicklung Startup', tags: ['Logo', 'Branding'] },
      { id: 14, category: '3D', title: '3D-Rendering Messestand', tags: ['Visualisierung'] },
      { id: 15, category: 'Flotte', title: 'Flottendesign-Richtlinie', tags: ['200+ Fahrzeuge', 'Manual'] },
    ],
    faqs: [
      { q: 'Erstellen Sie auch Druckdaten?', a: 'Ja, alle unsere Designs sind produktionsfertig mit korrekten Farbprofilen und Schnittmarken.' },
      { q: 'Können Sie bestehende CIs weiterentwickeln?', a: 'Selbstverständlich. Wir arbeiten respektvoll mit bestehenden Markenidentitäten.' },
    ],
  },
};
