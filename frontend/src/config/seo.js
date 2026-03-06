// ═══════════════════════════════════════════════════════════════════════════════
// VISUWORKS — SEO Configuration with Keyword-Optimized Metadata
// ═══════════════════════════════════════════════════════════════════════════════

export const seoConfig = {
  siteName: 'VISUWORKS',
  siteUrl: 'https://visuworks.de',
  defaultTitle: 'VISUWORKS | Fahrzeugfolierung, Interior Branding & Großformatdruck NRW',
  defaultDescription: 'Spezialist für Fahrzeugfolierung, Carwrapping, Interior Branding und Großformatdruck. Premium-Qualität für Flotten, Räume und Events – termingerecht und europaweit. Standort Hilden/Düsseldorf.',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@visuworks',
  locale: 'de_DE',
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // PAGE-SPECIFIC SEO — Keyword-Optimized Titles & Descriptions
  // ═══════════════════════════════════════════════════════════════════════════════
  pages: {
    home: {
      title: 'VISUWORKS | Fahrzeugfolierung, Interior Branding & Messegrafik NRW',
      description: 'Spezialist für Fahrzeugfolierung, Carwrapping, Flottenbranding, Interior Branding und Großformatdruck. Premium-Qualität für B2B-Projekte – termingerecht und europaweit. ✓ Standort Hilden bei Düsseldorf',
      canonical: '/',
      keywords: ['Fahrzeugfolierung', 'Carwrapping', 'Interior Branding', 'Flottenbranding', 'Großformatdruck', 'NRW', 'Düsseldorf']
    },
    mobilitaet: {
      title: 'Fahrzeugfolierung & Carwrapping NRW | PPF Lackschutz | VISUWORKS',
      description: 'Professionelle Fahrzeugfolierung, Carwrapping und PPF Lackschutzfolie in NRW. ✓ Flottenbranding ✓ Designfolierung ✓ Motorsport ✓ Premium-Qualität. Jetzt Angebot anfragen!',
      canonical: '/mobilitaet',
      keywords: ['Fahrzeugfolierung', 'Carwrapping', 'PPF', 'Lackschutzfolie', 'Flottenbranding', 'NRW', 'Düsseldorf', 'Köln']
    },
    architektur: {
      title: 'Interior Branding & Raumgestaltung NRW | Glasfolierung | VISUWORKS',
      description: 'Interior Branding, Glasfolierung und Raumgestaltung für Unternehmen in NRW. ✓ Bürobranding ✓ Retail Design ✓ Architekturfolierung ✓ Sichtschutzfolie. Beratung anfragen!',
      canonical: '/architektur-raum',
      keywords: ['Interior Branding', 'Glasfolierung', 'Raumgestaltung', 'Bürobranding', 'Sichtschutzfolie', 'NRW', 'Düsseldorf']
    },
    markenkommunikation: {
      title: 'Großformatdruck & Messegrafik NRW | Event Branding | VISUWORKS',
      description: 'Großformatdruck, Messegrafik und Event Branding in NRW. ✓ Banner ✓ Messestand ✓ POS-Systeme ✓ Außenwerbung. Von der Fassade bis zum Messeauftritt – alles aus einer Hand.',
      canonical: '/markenkommunikation',
      keywords: ['Großformatdruck', 'Messegrafik', 'Event Branding', 'Banner', 'Messestand', 'POS', 'NRW']
    },
    design: {
      title: 'Designkonzept & Corporate Design | Visuelle Leitlinien | VISUWORKS',
      description: 'Designkonzepte und Corporate Design mit Produktionsfokus. ✓ CI-Entwicklung ✓ Visuelle Leitlinien ✓ 3D-Visualisierung ✓ Design Manual. Für Marken, die umgesetzt werden wollen.',
      canonical: '/design-konzepte',
      keywords: ['Designkonzept', 'Corporate Design', 'CI-Entwicklung', 'Visuelle Leitlinien', '3D-Visualisierung']
    },
    projektmanagement: {
      title: 'Projektmanagement für Flottenbranding & Events | VISUWORKS',
      description: 'Professionelles Projektmanagement für komplexe Flottenbranding-, Raumbranding- und Event-Projekte. ✓ Planung ✓ Koordination ✓ Qualitätssicherung ✓ Europaweit.',
      canonical: '/projektmanagement',
      keywords: ['Projektmanagement', 'Flottenbranding', 'Raumbranding', 'Event-Projekte', 'Koordination']
    },
    projekte: {
      title: 'Referenzen Fahrzeugfolierung & Interior Branding | VISUWORKS Portfolio',
      description: 'Ausgewählte Referenzen: Fahrzeugfolierung, Flottenbranding, Interior Branding und Messegrafik. ✓ Porsche ✓ Motorsport ✓ Corporate ✓ Retail. Einblicke in erfolgreich umgesetzte B2B-Projekte.',
      canonical: '/projekte',
      keywords: ['Referenzen', 'Fahrzeugfolierung', 'Flottenbranding', 'Interior Branding', 'Portfolio']
    },
    kontakt: {
      title: 'Kontakt | Fahrzeugfolierung & Interior Branding anfragen | VISUWORKS',
      description: 'Projekt anfragen bei VISUWORKS. ✓ Fahrzeugfolierung ✓ Interior Branding ✓ Großformatdruck. Unverbindliche Beratung für Ihr B2B-Projekt. Standort: Hilden bei Düsseldorf.',
      canonical: '/kontakt',
      keywords: ['Kontakt', 'Projekt anfragen', 'Beratung', 'Hilden', 'Düsseldorf']
    },
    impressum: {
      title: 'Impressum | VISUWORKS GmbH Hilden',
      description: 'Impressum der Visuworks visual work labs GmbH, Hilden. Angaben gemäß § 5 TMG. Fahrzeugfolierung, Interior Branding und Markenkommunikation.',
      canonical: '/impressum'
    },
    datenschutz: {
      title: 'Datenschutzerklärung | VISUWORKS GmbH',
      description: 'Datenschutzerklärung der VISUWORKS GmbH. Informationen zur Datenverarbeitung gemäß DSGVO für unsere Webseite und Dienstleistungen.',
      canonical: '/datenschutz'
    },
    agb: {
      title: 'AGB | VISUWORKS GmbH – Allgemeine Geschäftsbedingungen',
      description: 'Allgemeine Geschäftsbedingungen der VISUWORKS GmbH für Dienstleistungen: Fahrzeugfolierung, Interior Branding, Großformatdruck und Projektmanagement.',
      canonical: '/agb'
    },
    team: {
      title: 'Team | Experten für Fahrzeugfolierung & Branding | VISUWORKS',
      description: 'Das VISUWORKS Team – Experten für Fahrzeugfolierung, Interior Branding und Großformatdruck. Design, Produktion und Projektmanagement aus einer Hand.',
      canonical: '/team'
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// STRUCTURED DATA — Organization Schema (Keyword-Enhanced)
// ═══════════════════════════════════════════════════════════════════════════════

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Visuworks visual work labs GmbH",
  "alternateName": ["VISUWORKS", "Visuworks"],
  "url": "https://visuworks.de",
  "logo": {
    "@type": "ImageObject",
    "url": "https://visuworks.de/logo.png",
    "width": "300",
    "height": "60"
  },
  "description": "Spezialist für Fahrzeugfolierung, Carwrapping, Interior Branding und Großformatdruck. Premium-Qualität für B2B-Projekte in Deutschland und Europa.",
  "slogan": "Visuelle Oberflächen. Präzise umgesetzt.",
  "foundingDate": "2010",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Verbindungsstraße 19c",
    "addressLocality": "Hilden",
    "addressRegion": "Nordrhein-Westfalen",
    "postalCode": "40723",
    "addressCountry": "DE"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+49-151-72615378",
      "contactType": "customer service",
      "email": "info@visuworks.de",
      "availableLanguage": ["German", "English"],
      "areaServed": ["DE", "AT", "CH", "NL", "BE", "LU"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+49-151-72615378",
      "contactType": "sales",
      "email": "info@visuworks.de",
      "availableLanguage": ["German", "English"]
    }
  ],
  "sameAs": [
    "https://www.instagram.com/visualworklabs/",
    "https://www.tiktok.com/@visuworks"
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 51.1697,
      "longitude": 6.9344
    },
    "geoRadius": "2000 km"
  },
  "knowsAbout": [
    "Fahrzeugfolierung",
    "Carwrapping",
    "Car Wrapping",
    "Flottenbranding",
    "Fleet Branding",
    "Interior Branding",
    "Raumgestaltung",
    "Glasfolierung",
    "Architekturfolierung",
    "Großformatdruck",
    "Large Format Printing",
    "Messegrafik",
    "Trade Show Graphics",
    "Event Branding",
    "POS Systeme",
    "PPF Lackschutzfolie",
    "Paint Protection Film",
    "Visual Branding",
    "Markenkommunikation"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "VISUWORKS Leistungen",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Mobilität",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fahrzeugfolierung" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Carwrapping" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flottenbranding" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PPF Lackschutzfolie" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Motorsport Folierung" }}
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Raum & Architektur",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Branding" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Glasfolierung" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Raumgestaltung" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Architekturfolierung" }}
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Markenkommunikation",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Großformatdruck" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Messegrafik" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Event Branding" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "POS Systeme" }}
        ]
      }
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// STRUCTURED DATA — LocalBusiness Schema (Geo-Enhanced)
// ═══════════════════════════════════════════════════════════════════════════════

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://visuworks.de/#business",
  "name": "VISUWORKS – Fahrzeugfolierung & Interior Branding",
  "alternateName": "Visuworks visual work labs GmbH",
  "image": [
    "https://visuworks.de/og-image.jpg",
    "https://visuworks.de/images/Header_Porsche_HD.webp"
  ],
  "url": "https://visuworks.de",
  "telephone": "+49-151-72615378",
  "email": "info@visuworks.de",
  "description": "Premium Fahrzeugfolierung, Carwrapping, Interior Branding und Großformatdruck in NRW. Spezialist für B2B-Projekte mit hohem Qualitätsanspruch.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Verbindungsstraße 19c",
    "addressLocality": "Hilden",
    "addressRegion": "Nordrhein-Westfalen",
    "postalCode": "40723",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.1697,
    "longitude": 6.9344
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Düsseldorf"
    },
    {
      "@type": "City",
      "name": "Köln"
    },
    {
      "@type": "City",
      "name": "Hilden"
    },
    {
      "@type": "State",
      "name": "Nordrhein-Westfalen"
    },
    {
      "@type": "Country",
      "name": "Deutschland"
    },
    {
      "@type": "Country",
      "name": "Europa"
    }
  ],
  "priceRange": "€€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Invoice"],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "hasMap": "https://maps.google.com/?q=Verbindungsstraße+19c,+40723+Hilden",
  "sameAs": [
    "https://www.instagram.com/visualworklabs/",
    "https://www.tiktok.com/@visuworks"
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// STRUCTURED DATA — Service Schemas (Keyword-Rich)
// ═══════════════════════════════════════════════════════════════════════════════

export const servicesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://visuworks.de/mobilitaet#service",
    "name": "Fahrzeugfolierung & Carwrapping",
    "alternateName": ["Car Wrapping", "Autofolierung", "Vehicle Wrapping"],
    "serviceType": "Fahrzeugfolierung",
    "provider": {
      "@type": "Organization",
      "name": "VISUWORKS",
      "url": "https://visuworks.de"
    },
    "areaServed": ["Deutschland", "Europa", "NRW", "Düsseldorf", "Köln"],
    "description": "Professionelle Fahrzeugfolierung, Carwrapping, PPF Lackschutzfolie und Flottenbranding. Premium-Qualität für Einzelfahrzeuge, Flotten und Motorsport.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fahrzeugfolierung Leistungen",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vollfolierung" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Teilfolierung" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PPF Lackschutzfolie" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flottenbranding" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fahrzeugbeschriftung" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Motorsport Folierung" }}
      ]
    },
    "url": "https://visuworks.de/mobilitaet"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://visuworks.de/architektur-raum#service",
    "name": "Interior Branding & Raumgestaltung",
    "alternateName": ["Raumbranding", "Office Branding", "Retail Design"],
    "serviceType": "Interior Branding",
    "provider": {
      "@type": "Organization",
      "name": "VISUWORKS",
      "url": "https://visuworks.de"
    },
    "areaServed": ["Deutschland", "Europa", "NRW", "Düsseldorf", "Köln"],
    "description": "Interior Branding, Glasfolierung und Raumgestaltung für Unternehmen, Büros, Retail und Praxen. Sichtschutzfolie, Architekturfolierung und Wandgestaltung.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Branding Leistungen",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Glasfolierung" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sichtschutzfolie" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wandgestaltung" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Architekturfolierung" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bürobranding" }}
      ]
    },
    "url": "https://visuworks.de/architektur-raum"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://visuworks.de/markenkommunikation#service",
    "name": "Großformatdruck & Messegrafik",
    "alternateName": ["Large Format Printing", "Trade Show Graphics", "Event Branding"],
    "serviceType": "Markenkommunikation",
    "provider": {
      "@type": "Organization",
      "name": "VISUWORKS",
      "url": "https://visuworks.de"
    },
    "areaServed": ["Deutschland", "Europa", "NRW", "Düsseldorf", "Köln"],
    "description": "Großformatdruck, Messegrafik, Event Branding und POS-Systeme. Von der Fassadenwerbung bis zum kompletten Messestand – alles aus einer Hand.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Markenkommunikation Leistungen",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Großformatdruck" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Messegrafik" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Event Branding" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Banner" }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "POS Systeme" }}
      ]
    },
    "url": "https://visuworks.de/markenkommunikation"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://visuworks.de/design-konzepte#service",
    "name": "Designkonzept & Corporate Design",
    "alternateName": ["Visual Design", "Brand Design", "CI-Entwicklung"],
    "serviceType": "Design & Konzeption",
    "provider": {
      "@type": "Organization",
      "name": "VISUWORKS",
      "url": "https://visuworks.de"
    },
    "areaServed": ["Deutschland", "Europa"],
    "description": "Designkonzepte und Corporate Design mit Produktionsfokus. CI-Entwicklung, visuelle Leitlinien und 3D-Visualisierung für Marken, die umgesetzt werden wollen.",
    "url": "https://visuworks.de/design-konzepte"
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// STRUCTURED DATA — FAQ Schema (For Future Implementation)
// ═══════════════════════════════════════════════════════════════════════════════

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie lange hält eine Fahrzeugfolierung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine professionelle Fahrzeugfolierung hält bei Premium-Folien und korrekter Pflege 5-7 Jahre. Bei Garagen-Fahrzeugen und schonender Nutzung auch länger. Wir verwenden ausschließlich Hochleistungsfolien von 3M und Oracal."
      }
    },
    {
      "@type": "Question",
      "name": "Was kostet Flottenbranding pro Fahrzeug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten für Flottenbranding variieren je nach Fahrzeugtyp, Folierungsumfang und Design. Für eine Teilfolierung mit Logo und Beschriftung beginnen die Preise bei ca. 500€ pro Fahrzeug. Vollfolierungen starten bei ca. 2.500€. Bei größeren Flotten bieten wir Staffelpreise an."
      }
    },
    {
      "@type": "Question",
      "name": "Bietet VISUWORKS auch Interior Branding außerhalb von NRW an?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, wir realisieren Interior Branding Projekte deutschlandweit und europaweit. Unser mobiles Team übernimmt die Montage vor Ort. Ob Düsseldorf, München, Berlin oder europäische Standorte – wir sind flexibel einsetzbar."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert die Produktion eines Messestands?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Produktionszeit für Messegrafik hängt vom Umfang ab. Einfache Banner und Roll-Ups sind innerhalb von 3-5 Werktagen fertig. Komplette Messestandgrafiken benötigen 2-3 Wochen. Bei Eilaufträgen bieten wir Express-Optionen an."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen Carwrapping und Lackschutzfolie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Carwrapping (Fahrzeugfolierung) verändert die Farbe oder das Design des Fahrzeugs mit farbiger oder bedruckter Folie. Lackschutzfolie (PPF) ist eine transparente, selbstheilende Folie zum Schutz des Originallacks vor Steinschlägen und Kratzern. Beide können kombiniert werden."
      }
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// STRUCTURED DATA — BreadcrumbList Schema Generator
// ═══════════════════════════════════════════════════════════════════════════════

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://visuworks.de${item.url}`
  }))
});

// Predefined breadcrumbs for main pages
export const breadcrumbs = {
  mobilitaet: [
    { name: "Home", url: "/" },
    { name: "Leistungen", url: "/#leistungen" },
    { name: "Fahrzeugfolierung & Mobilität", url: "/mobilitaet" }
  ],
  architektur: [
    { name: "Home", url: "/" },
    { name: "Leistungen", url: "/#leistungen" },
    { name: "Interior Branding & Raumgestaltung", url: "/architektur-raum" }
  ],
  markenkommunikation: [
    { name: "Home", url: "/" },
    { name: "Leistungen", url: "/#leistungen" },
    { name: "Großformatdruck & Messegrafik", url: "/markenkommunikation" }
  ],
  design: [
    { name: "Home", url: "/" },
    { name: "Leistungen", url: "/#leistungen" },
    { name: "Design & Konzeption", url: "/design-konzepte" }
  ],
  projekte: [
    { name: "Home", url: "/" },
    { name: "Referenzen & Projekte", url: "/projekte" }
  ],
  kontakt: [
    { name: "Home", url: "/" },
    { name: "Kontakt", url: "/kontakt" }
  ]
};

export default seoConfig;
