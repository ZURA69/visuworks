// SEO Configuration for VISUWORKS
export const seoConfig = {
  siteName: 'VISUWORKS',
  siteUrl: 'https://visuworks.de',
  defaultTitle: 'VISUWORKS | Visuelle Marken- und Oberflächenlösungen',
  defaultDescription: 'Premium visuelle Marken- und Oberflächenlösungen für Mobilität, Architektur und Kommunikation. Fahrzeugfolierung, Raumgestaltung, Großformat – europaweit umgesetzt.',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@visuworks',
  locale: 'de_DE',
  
  pages: {
    home: {
      title: 'VISUWORKS | Visuelle Marken- und Oberflächenlösungen',
      description: 'Premium visuelle Marken- und Oberflächenlösungen für Mobilität, Architektur und Kommunikation. Fahrzeugfolierung, Interior Branding, Großformat – europaweit umgesetzt.',
      canonical: '/'
    },
    mobilitaet: {
      title: 'Fahrzeugfolierung & Schutz | VISUWORKS',
      description: 'Professionelle Fahrzeugfolierung, PPF Lackschutzfolie und Flottenbranding. Premium-Qualität für Einzelfahrzeuge und Flotten – deutschlandweit.',
      canonical: '/mobilitaet'
    },
    architektur: {
      title: 'Raum & Architektur | Interior Branding | VISUWORKS',
      description: 'Interior Branding, Architekturfolierung und Raumgestaltung für Unternehmen, Praxen und Retail. Glasfolien, Oberflächenveredelung, Leitsysteme.',
      canonical: '/architektur-raum'
    },
    markenkommunikation: {
      title: 'Markenkommunikation | Großformat & Event | VISUWORKS',
      description: 'Großformatdruck, Messegrafik, Event-Branding und POS-Systeme. Von der Fassadenwerbung bis zum kompletten Messestand – alles aus einer Hand.',
      canonical: '/markenkommunikation'
    },
    design: {
      title: 'Design & Konzeption | VISUWORKS',
      description: 'Designkonzepte und visuelle Leitlinien mit Produktionsfokus. CI-Entwicklung, 3D-Visualisierung und Designmanuals für Ihre Projekte.',
      canonical: '/design-konzepte'
    },
    projektmanagement: {
      title: 'Projektmanagement | VISUWORKS',
      description: 'Professionelles Projektmanagement für komplexe visuelle Projekte. Planung, Koordination und Qualitätssicherung für Flotten, Räume und Events.',
      canonical: '/projektmanagement'
    },
    projekte: {
      title: 'Projekte & Referenzen | VISUWORKS',
      description: 'Ausgewählte Referenzen aus Fahrzeugfolierung, Interior Branding und Markenkommunikation. Einblicke in erfolgreich umgesetzte Projekte.',
      canonical: '/projekte'
    },
    kontakt: {
      title: 'Kontakt | Projekt anfragen | VISUWORKS',
      description: 'Kontaktieren Sie VISUWORKS für Ihr Projekt. Unverbindliche Beratung zu Fahrzeugfolierung, Raumgestaltung oder Markenkommunikation.',
      canonical: '/kontakt'
    },
    impressum: {
      title: 'Impressum | VISUWORKS',
      description: 'Impressum der VISUWORKS GmbH, Düsseldorf. Angaben gemäß § 5 TMG.',
      canonical: '/impressum'
    },
    datenschutz: {
      title: 'Datenschutzerklärung | VISUWORKS',
      description: 'Datenschutzerklärung der VISUWORKS GmbH. Informationen zur Datenverarbeitung gemäß DSGVO.',
      canonical: '/datenschutz'
    },
    agb: {
      title: 'AGB | VISUWORKS',
      description: 'Allgemeine Geschäftsbedingungen der VISUWORKS GmbH für Dienstleistungen im Bereich visuelle Marken- und Oberflächenlösungen.',
      canonical: '/agb'
    }
  }
};

// Structured Data - Organization
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VISUWORKS GmbH",
  "alternateName": "VISUWORKS",
  "url": "https://visuworks.de",
  "logo": "https://visuworks.de/logo.png",
  "description": "Premium visuelle Marken- und Oberflächenlösungen für Mobilität, Architektur und Kommunikation",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Musterstraße 123",
    "addressLocality": "Düsseldorf",
    "postalCode": "40210",
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-211-123-456-78",
    "contactType": "customer service",
    "email": "info@visuworks.de",
    "availableLanguage": ["German", "English"]
  },
  "sameAs": [],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 51.2277,
      "longitude": 6.7735
    },
    "geoRadius": "2000 km"
  }
};

// Structured Data - LocalBusiness
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "VISUWORKS GmbH",
  "image": "https://visuworks.de/og-image.jpg",
  "url": "https://visuworks.de",
  "telephone": "+49-211-123-456-78",
  "email": "info@visuworks.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Musterstraße 123",
    "addressLocality": "Düsseldorf",
    "postalCode": "40210",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.2277,
    "longitude": 6.7735
  },
  "priceRange": "€€€",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
};

// Structured Data - Services
export const servicesSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Fahrzeugfolierung",
    "provider": {
      "@type": "Organization",
      "name": "VISUWORKS GmbH"
    },
    "areaServed": "Europa",
    "description": "Professionelle Fahrzeugfolierung, PPF Lackschutzfolie und Flottenbranding"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Interior Branding",
    "provider": {
      "@type": "Organization",
      "name": "VISUWORKS GmbH"
    },
    "areaServed": "Europa",
    "description": "Raumgestaltung, Architekturfolierung und Interior Branding für Unternehmen"
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Markenkommunikation",
    "provider": {
      "@type": "Organization",
      "name": "VISUWORKS GmbH"
    },
    "areaServed": "Europa",
    "description": "Großformatdruck, Messegrafik und Event-Branding"
  }
];

export default seoConfig;
