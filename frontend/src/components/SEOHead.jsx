import { Helmet } from 'react-helmet-async';
import { seoConfig, organizationSchema, localBusinessSchema, servicesSchema } from '../config/seo';

export const SEOHead = ({ 
  page = 'home',
  title,
  description,
  canonical,
  noindex = false,
  structuredData = null,
  image
}) => {
  const pageConfig = seoConfig.pages[page] || seoConfig.pages.home;
  
  const finalTitle = title || pageConfig?.title || seoConfig.defaultTitle;
  const finalDescription = description || pageConfig?.description || seoConfig.defaultDescription;
  const finalCanonical = `${seoConfig.siteUrl}${canonical || pageConfig?.canonical || '/'}`;
  const finalImage = image || `${seoConfig.siteUrl}${seoConfig.defaultImage}`;

  return (
    <Helmet>
      <title>{String(finalTitle)}</title>
      <meta name="title" content={String(finalTitle)} />
      <meta name="description" content={String(finalDescription)} />
      <link rel="canonical" href={finalCanonical} />
      
      <html lang="de" />
      <meta property="og:locale" content={seoConfig.locale} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={String(finalTitle)} />
      <meta property="og:description" content={String(finalDescription)} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={seoConfig.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalCanonical} />
      <meta name="twitter:title" content={String(finalTitle)} />
      <meta name="twitter:description" content={String(finalDescription)} />
      <meta name="twitter:image" content={finalImage} />
      
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {(page === 'home' || page === 'mobilitaet' || page === 'architektur' || page === 'markenkommunikation') && (
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      )}

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
