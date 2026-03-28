export const navStructure = {
  leistungen: {
    label: 'Leistungen',
    pillars: [
      {
        label: 'Mobilität',
        href: '/mobilitaet',
        desc: 'Fahrzeugfolierung & Lackschutz',
        subItems: [
          { label: 'PPF & Schutzfolien', href: '/mobilitaet/ppf-schutzfolien', desc: 'Professioneller Lackschutz' },
          { label: 'Flottenbranding', href: '/mobilitaet/flottenbranding', desc: 'Einheitliches Markendesign' },
          { label: 'Teil-/Vollfolierung', href: '/mobilitaet/teil-vollfolierung', desc: 'Individuelle Fahrzeuggestaltung' },
          { label: 'Designentwicklung', href: '/mobilitaet/designentwicklung', desc: 'Vom Konzept zur Umsetzung' },
        ],
      },
      {
        label: 'Raum & Architektur',
        href: '/architektur-raum',
        desc: 'Innenraum- & Fassadengestaltung',
        subItems: [
          { label: 'Architekturfolierung', href: '/architektur-raum/architekturfolierung', desc: 'Fassaden & Oberflächen' },
          { label: 'Glas- & Sichtschutzfolien', href: '/architektur-raum/sichtschutzfolien', desc: 'Privatsphäre & Sonnenschutz' },
          { label: 'Interior Branding', href: '/architektur-raum/interior-branding', desc: 'Marke im Raum erlebbar' },
          { label: 'Oberflächenveredelung', href: '/architektur-raum/oberflaechen', desc: 'Materialoptik & Haptik' },
          { label: 'Raumkonzepte', href: '/architektur-raum/raumkonzepte', desc: 'Ganzheitliche Raumplanung' },
        ],
      },
      {
        label: 'Markenkommunikation',
        href: '/markenkommunikation',
        desc: 'Werbung & Eventgrafik',
        subItems: [
          { label: 'Großformatmedien', href: '/markenkommunikation/grossformat', desc: 'Banner, Planen & Displays' },
          { label: 'Werbesysteme', href: '/markenkommunikation/werbesysteme', desc: 'Pylone, Leuchtkästen & mehr' },
          { label: 'Printmedien', href: '/markenkommunikation/print', desc: 'Broschüren & Kataloge' },
          { label: 'Event- & Messegrafik', href: '/markenkommunikation/messe-event', desc: 'Messestand-Branding' },
          { label: 'POS-Systeme', href: '/markenkommunikation/pos', desc: 'Verkaufsförderung am POS' },
        ],
      },
      {
        label: 'Design & Konzeption',
        href: '/design-konzepte',
        desc: 'Gestaltung & visuelle Strategie',
        subItems: [],
      },
    ],
  },
  projekte: {
    label: 'Projekte',
    href: '/projekte',
    subItems: [
      { label: 'Projektmanagement', href: '/projektmanagement', desc: 'Effiziente Projektsteuerung' },
    ],
  },
  simpleLinks: [
    { label: 'Kontakt', href: '/kontakt' },
  ],
};

// Flatten all sub-service hrefs for active state detection
export const allLeistungenPaths = navStructure.leistungen.pillars.flatMap((p) => [
  p.href,
  ...p.subItems.map((s) => s.href),
]);
