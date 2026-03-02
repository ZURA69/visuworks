# VISUWORKS — Content Update Guide

All editable content lives in `/src/content/`. Layout components do not need changes.

---

## Quick Reference

| What to change | File | Section |
|---|---|---|
| Hero headline / buttons | `content/site.js` | `hero` |
| Company name / address / phone | `content/site.js` | `company` |
| CTA section text | `content/site.js` | `ctaSection` |
| Statistics numbers | `content/site.js` | `statistics` |
| Testimonials / reviews | `content/site.js` | `testimonials` |
| Client logos / names | `content/site.js` | `clients` |
| Team members | `content/site.js` | `team` |
| Company values | `content/site.js` | `values` |
| Process steps (01–05) | `content/site.js` | `processSteps` |
| Target audiences | `content/site.js` | `targetAudiences` |
| Footer links | `content/site.js` | `footerNav` |
| Social media URLs | `content/site.js` | `company.socialLinks` |
| Projects / case studies | `content/projects.js` | `projects` array |
| Project categories | `content/projects.js` | `categories` array |
| Service page content | `content/services.js` | `servicePages` |
| Sub-service pages | `data/subservices.js` | object by slug |
| Navigation structure | `data/navigation.js` | `navStructure` |
| All images (site-wide) | `content/images.js` | `images` object |
| SEO titles / descriptions | `config/seo.js` | `seoConfig.pages` |

---

## How to Update Hero Image / Text

1. Open `src/content/site.js`
2. Edit the `hero` object:
   ```js
   export const hero = {
     headline: 'Ihre neue Überschrift.',
     subline: 'Ihr neuer Untertitel.',
     ctaPrimary: { label: 'Button Text', href: '/kontakt' },
     ...
   };
   ```
3. For the hero image, open `src/content/images.js` and set:
   ```js
   hero: {
     src: '/images/hero.webp',  // or a full URL
     alt: 'Description',
   },
   ```

---

## How to Update Projects

1. Open `src/content/projects.js`
2. Add or edit an entry in the `projects` array:
   ```js
   {
     id: 19,
     slug: 'my-new-project',        // URL: /projekte/my-new-project
     category: 'mobilität',          // must match a value in `categories`
     title: 'Projekt Titel',
     shortDesc: 'Kurzbeschreibung',
     tags: ['Tag1', 'Tag2'],
     client: 'Kundenname',
     year: '2025',
     featured: true,                 // show on homepage
     challenge: '...',
     solution: '...',
     implementation: '...',
     result: '...',
   }
   ```
3. For the project image, open `src/content/images.js` and add:
   ```js
   'my-new-project': {
     thumbnail: '/images/projects/my-new-project.webp',
     gallery: ['/images/projects/my-new-project-1.webp'],
   },
   ```

---

## How to Update Service Sub-Pages

Sub-services (e.g. `/mobilitaet/ppf-schutzfolien`) are defined in `src/data/subservices.js`.

1. Open `src/data/subservices.js`
2. Add or edit an entry:
   ```js
   'my-new-service': {
     parent: 'Mobilität',
     parentHref: '/mobilitaet',
     title: 'Service Titel',
     subtitle: 'Untertitel',
     description: 'Beschreibung...',
     features: [
       { title: 'Feature 1', desc: 'Beschreibung...' },
     ],
     applications: ['Anwendung 1', 'Anwendung 2'],
   },
   ```
3. Add the navigation link in `src/data/navigation.js` under the matching pillar.
4. The route is automatically handled by `SubServicePage.jsx`.

---

## How to Update Navigation

The mega menu structure is in `src/data/navigation.js`.

```js
navStructure.leistungen.pillars[0].subItems.push({
  label: 'Neuer Service',
  href: '/mobilitaet/neuer-service',
  desc: 'Kurzbeschreibung',
});
```

---

## How to Add Images

All image references are centralized in `src/content/images.js`.

Replace `null` with a URL or relative path:
```js
projects: {
  'ppf-porsche-911-gt3': {
    thumbnail: 'https://example.com/image.webp',
    gallery: ['https://example.com/img1.webp', '...'],
  },
},
```

Keep consistent aspect ratios:
- Project thumbnails: **4:3**
- Team photos: **1:1**
- Hero images: **16:9** or **4:3**
- Client logos: SVG preferred, max height 40px

---

## CMS Migration (Sanity / Contentful)

The content layer is designed for easy CMS migration:

1. Replace static imports in `/src/content/*.js` with API fetch calls
2. Use the same data shapes — components expect identical object structures
3. Keep `images.js` as a fallback / default, override with CMS media URLs
4. No layout component changes needed

Example with a CMS:
```js
// Before (static)
export const projects = [{ id: 1, title: '...', ... }];

// After (CMS)
export const projects = await sanityClient.fetch('*[_type == "project"]');
```

The data shapes stay identical, so layouts remain untouched.
