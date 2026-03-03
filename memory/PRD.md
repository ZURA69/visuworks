# VISUWORKS Website - Product Requirements Document

## Original Problem Statement
Production-ready premium multi-page website for VISUWORKS, a European visual branding company. German language. Dark theme.

## Architecture
- **Frontend**: React 18, React Router 6, Framer Motion, Tailwind CSS, Shadcn/UI
- **Backend**: FastAPI with Resend email integration
- **Content Layer**: Centralized in `/src/content/` — CMS-ready architecture
- **SEO**: Custom useEffect-based meta tag management
- **Contact**: Backend /api/contact with Resend, honeypot, rate limiting

## Content Layer (CMS-Ready)
All editable content lives in `/src/content/`:
- **`site.js`** — hero, company info, stats, testimonials, clients, team, values, process steps, audiences, CTA, footer nav
- **`projects.js`** — 18 project entries with case study data + helpers
- **`services.js`** — service page content, re-exports nav structure + subservices
- **`images.js`** — centralized image map (null placeholders, ready for URLs)

Supporting data files:
- **`data/navigation.js`** — mega menu structure
- **`data/subservices.js`** — 14 sub-service page content

Documentation: `/frontend/README-CONTENT.md` — full guide for content updates

## Pages (34 Total)
20 main pages + 14 sub-service pages. All routing in App.js.

## Key Features
- [x] Content layer refactoring (all text/data in /content/)
- [x] Mega menu navigation with hover/active states
- [x] Mobile accordion navigation
- [x] Contact form with /api/contact backend (Resend)
- [x] SEO meta tags on all pages
- [x] Cookie consent, chat widget, statistics, testimonials
- [x] ScrollToTop, skeleton loading, scroll progress

## Prioritized Backlog
### P0
- [x] Integrate real project images (50+ uploaded, all mapped via content layer)
- [x] Hero image integrated (Header_Porsche_HD.JPG)
- [x] All 18 projects have image thumbnails (17 with images, 1 design-only)
- [x] Project detail galleries with real images
- [x] Service page hero images configured
- [x] AGB B2C (/agb) — 14 Paragraphen, DSGVO/BGB/ROM-I-konform
- [x] AGB B2B (/agb-b2b) — 15 Paragraphen, §377 HGB, CISG-Ausschluss
- [x] Datenschutzerklärung (/datenschutz) — 13 Abschnitte, DSGVO/TTDSG-konform
- [x] Impressum (/impressum) — echte Firmendaten, §5 TMG, §18 MStV, Social Media, Bildnachweise
- [x] Firmendaten in site.js aktualisiert (Hilden, Daniel Zura, HRB 96931, echte Kontaktdaten)
- [ ] Performance: lazy loading, code splitting, Lighthouse >90
- [ ] Activate Resend API key

### P1
- [ ] Replace placeholder contact details with real ones
- [ ] Add real client logos (SVG)

### P2
- [ ] Hero video, Blog/News, Language switcher (DE/EN), Analytics
- [ ] Connect to headless CMS (Sanity/Contentful)

## MOCKED
- Newsletter signup: UI only
- Chat widget: external links only
- Client logos: placeholder text (no images)
- Contact form: works in DEV MODE (no Resend API key)
- Most images in images.js: now active — 50+ real images mapped to projects, services, and hero
