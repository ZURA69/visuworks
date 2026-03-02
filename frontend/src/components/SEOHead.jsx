import React from 'react';
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
  
  const finalTitle = title || pageConfig.title;
  const finalDescription = description || pageConfig.description;
  const finalCanonical = `${seoConfig.siteUrl}${canonical || pageConfig.canonical}`;
  const finalImage = image || `${seoConfig.siteUrl}${seoConfig.defaultImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Language */}
      <html lang="de" />
      <meta property="og:locale" content={seoConfig.locale} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={seoConfig.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalCanonical} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Structured Data - LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* Structured Data - Services (only on relevant pages) */}
      {(page === 'home' || page === 'mobilitaet' || page === 'architektur' || page === 'markenkommunikation') && (
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      )}

      {/* Additional Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
