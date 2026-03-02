import { Helmet } from 'react-helmet-async';

// SEO Configuration for VISUWORKS
const seoConfig = {
  siteName: 'VISUWORKS',
  siteUrl: 'https://visuworks.de',
  defaultTitle: 'VISUWORKS | Visuelle Marken- und Oberflächenlösungen',
  defaultDescription: 'Premium visuelle Marken- und Oberflächenlösungen für Mobilität, Architektur und Kommunikation.',
  locale: 'de_DE',
  
  pages: {
    home: {
      title: 'VISUWORKS | Visuelle Marken- und Oberflächenlösungen',
      description: 'Premium visuelle Marken- und Oberflächenlösungen für Mobilität, Architektur und Kommunikation.',
    },
    mobilitaet: {
      title: 'Fahrzeugfolierung & Schutz | VISUWORKS',
      description: 'Professionelle Fahrzeugfolierung, PPF Lackschutzfolie und Flottenbranding.',
    },
    architektur: {
      title: 'Raum & Architektur | VISUWORKS',
      description: 'Interior Branding, Architekturfolierung und Raumgestaltung.',
    },
    markenkommunikation: {
      title: 'Markenkommunikation | VISUWORKS',
      description: 'Großformatdruck, Messegrafik, Event-Branding und POS-Systeme.',
    },
    design: {
      title: 'Design & Konzeption | VISUWORKS',
      description: 'Designkonzepte und visuelle Leitlinien mit Produktionsfokus.',
    },
    projektmanagement: {
      title: 'Projektmanagement | VISUWORKS',
      description: 'Professionelles Projektmanagement für komplexe visuelle Projekte.',
    },
    projekte: {
      title: 'Projekte & Referenzen | VISUWORKS',
      description: 'Ausgewählte Referenzen aus Fahrzeugfolierung und Interior Branding.',
    },
    kontakt: {
      title: 'Kontakt | VISUWORKS',
      description: 'Kontaktieren Sie VISUWORKS für Ihr Projekt.',
    },
    impressum: {
      title: 'Impressum | VISUWORKS',
      description: 'Impressum der VISUWORKS GmbH.',
    },
    datenschutz: {
      title: 'Datenschutzerklärung | VISUWORKS',
      description: 'Datenschutzerklärung der VISUWORKS GmbH.',
    },
    agb: {
      title: 'AGB | VISUWORKS',
      description: 'Allgemeine Geschäftsbedingungen der VISUWORKS GmbH.',
    }
  }
};

export const SEOHead = ({ page = 'home' }) => {
  const pageConfig = seoConfig.pages[page];
  const pageTitle = pageConfig ? pageConfig.title : seoConfig.defaultTitle;
  const pageDescription = pageConfig ? pageConfig.description : seoConfig.defaultDescription;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Helmet>
  );
};

export default SEOHead;
