import { useEffect } from 'react';
import { seoConfig, organizationSchema, localBusinessSchema } from '../config/seo';

export const SEOHead = ({ page = 'home', customTitle, customDescription }) => {
  const pageConfig = seoConfig.pages[page] || {};
  const title = customTitle || pageConfig.title || seoConfig.defaultTitle;
  const description = customDescription || pageConfig.description || seoConfig.defaultDescription;
  const canonical = pageConfig.canonical || '/';

  useEffect(() => {
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

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', `${seoConfig.siteUrl}${canonical}`);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', seoConfig.locale);
    setMeta('property', 'og:site_name', seoConfig.siteName);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // Set canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `${seoConfig.siteUrl}${canonical}`);

    // Add JSON-LD structured data for homepage
    if (page === 'home') {
      const existingScripts = document.querySelectorAll('script[data-seo-jsonld]');
      existingScripts.forEach(s => s.remove());

      const orgScript = document.createElement('script');
      orgScript.type = 'application/ld+json';
      orgScript.setAttribute('data-seo-jsonld', 'organization');
      orgScript.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(orgScript);

      const bizScript = document.createElement('script');
      bizScript.type = 'application/ld+json';
      bizScript.setAttribute('data-seo-jsonld', 'localbusiness');
      bizScript.textContent = JSON.stringify(localBusinessSchema);
      document.head.appendChild(bizScript);
    }

    return () => {
      // Cleanup JSON-LD on unmount
      const scripts = document.querySelectorAll('script[data-seo-jsonld]');
      scripts.forEach(s => s.remove());
    };
  }, [title, description, canonical, page]);

  return null;
};

export default SEOHead;
