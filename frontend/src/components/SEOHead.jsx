import { Helmet } from 'react-helmet-async';
import { seoConfig, organizationSchema, localBusinessSchema } from '../config/seo';

export const SEOHead = ({ page = 'home', customTitle, customDescription }) => {
  const pageConfig = seoConfig.pages[page] || {};
  const title = customTitle || pageConfig.title || seoConfig.defaultTitle;
  const description = customDescription || pageConfig.description || seoConfig.defaultDescription;
  const canonical = pageConfig.canonical || '/';

  return (
    <Helmet>
      <title>{String(title)}</title>
      <meta name="description" content={String(description)} />
      <link rel="canonical" href={`${seoConfig.siteUrl}${canonical}`} />
      <meta property="og:title" content={String(title)} />
      <meta property="og:description" content={String(description)} />
      <meta property="og:url" content={`${seoConfig.siteUrl}${canonical}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={seoConfig.locale} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={String(title)} />
      <meta name="twitter:description" content={String(description)} />
      {page === 'home' && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
      {page === 'home' && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
