import { useEffect } from 'react';
import { 
  seoConfig, 
  organizationSchema, 
  localBusinessSchema, 
  servicesSchema,
  faqSchema,
  generateBreadcrumbSchema,
  breadcrumbs 
} from '../config/seo';

export const SEOHead = ({ page = 'home', customTitle, customDescription, showFaq = false }) => {
  const pageConfig = seoConfig.pages[page] || {};
  const title = customTitle || pageConfig.title || seoConfig.defaultTitle;
  const description = customDescription || pageConfig.description || seoConfig.defaultDescription;
  const canonical = pageConfig.canonical || '/';

  useEffect(() => {
    // Get keywords inside effect to avoid dependency issues
    const keywords = pageConfig.keywords || [];
    
    // Set document title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Basic Meta Tags
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow');
    setMeta('name', 'author', 'VISUWORKS GmbH');
    
    // Keywords Meta (still used by some search engines)
    if (keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join(', '));
    }

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', `${seoConfig.siteUrl}${canonical}`);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', seoConfig.locale);
    setMeta('property', 'og:site_name', seoConfig.siteName);
    setMeta('property', 'og:image', `${seoConfig.siteUrl}${seoConfig.defaultImage}`);
    setMeta('property', 'og:image:alt', title);

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', `${seoConfig.siteUrl}${seoConfig.defaultImage}`);

    // Geo Tags for Local SEO
    setMeta('name', 'geo.region', 'DE-NW');
    setMeta('name', 'geo.placename', 'Hilden');
    setMeta('name', 'geo.position', '51.1697;6.9344');
    setMeta('name', 'ICBM', '51.1697, 6.9344');

    // Set canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `${seoConfig.siteUrl}${canonical}`);

    // Clear existing JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
    existingScripts.forEach(s => s.remove());

    // Add JSON-LD structured data
    const addJsonLd = (id, data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', id);
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    // Organization Schema (all pages)
    addJsonLd('organization', organizationSchema);

    // LocalBusiness Schema (homepage only)
    if (page === 'home') {
      addJsonLd('localbusiness', localBusinessSchema);
      
      // Services Schema
      servicesSchema.forEach((service, index) => {
        addJsonLd(`service-${index}`, service);
      });
    }

    // Breadcrumbs Schema (for service pages)
    const breadcrumbMapping = {
      'mobilitaet': breadcrumbs.mobilitaet,
      'architektur': breadcrumbs.architektur,
      'markenkommunikation': breadcrumbs.markenkommunikation,
      'design': breadcrumbs.design,
      'projekte': breadcrumbs.projekte,
      'kontakt': breadcrumbs.kontakt,
    };

    if (breadcrumbMapping[page]) {
      addJsonLd('breadcrumb', generateBreadcrumbSchema(breadcrumbMapping[page]));
    }

    // FAQ Schema (when enabled)
    if (showFaq && faqSchema) {
      addJsonLd('faq', faqSchema);
    }

    return () => {
      // Cleanup JSON-LD on unmount
      const scripts = document.querySelectorAll('script[data-seo-jsonld]');
      scripts.forEach(s => s.remove());
    };
  }, [title, description, canonical, page, pageConfig, showFaq]);

  return null;
};

export default SEOHead;
