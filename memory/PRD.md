# VISUWORKS Website - Product Requirements Document

## Original Problem Statement
Production-ready premium multi-page website for VISUWORKS, a European visual branding and surface solutions company. German language throughout. High-end design with dark theme (#070910), subtle purple/blue glow accents, glassmorphism effects.

## Architecture
- **Frontend**: React 18 (CRA) with React Router 6, Framer Motion, Tailwind CSS, Shadcn/UI
- **Backend**: FastAPI with Resend email integration
- **Database**: MongoDB (minimal usage)
- **SEO**: Custom useEffect-based meta tag management
- **Contact**: Backend /api/contact with Resend, honeypot, rate limiting
- **Email**: Resend API (configured via RESEND_API_KEY env var)

## What's Been Implemented

### Pages (20 Total)
- [x] Home (/) - Hero, ClientLogos, Services, Projects Preview, Process, Target Audiences, Statistics, Testimonials, Newsletter, CTA
- [x] Mobilität (/mobilitaet)
- [x] Raum & Architektur (/architektur-raum)
- [x] Markenkommunikation (/markenkommunikation)
- [x] Design & Konzeption (/design-konzepte)
- [x] Projektmanagement (/projektmanagement)
- [x] Projekte (/projekte) - with skeleton loading
- [x] Case Study (/projekte/:slug)
- [x] Kontakt (/kontakt) - real backend form with validation, honeypot, redirect to /danke
- [x] Danke (/danke) - Thank-you page after form submission
- [x] Team (/team)
- [x] Prozess: Analyse (/prozess/analyse)
- [x] Prozess: Design (/prozess/design)
- [x] Prozess: Produktion (/prozess/produktion)
- [x] Prozess: Umsetzung (/prozess/umsetzung)
- [x] Prozess: Qualitätssicherung (/prozess/qualitaetssicherung)
- [x] Impressum (/impressum)
- [x] Datenschutz (/datenschutz)
- [x] AGB (/agb)
- [x] 404 Page (*)

### Production Features
- [x] SEO meta tags on ALL pages
- [x] JSON-LD structured data on homepage
- [x] ScrollToTop - scroll reset on every route change
- [x] Cookie consent banner with preferences
- [x] WhatsApp chat widget
- [x] Contact form with backend /api/contact endpoint (Resend)
- [x] Honeypot spam protection
- [x] Rate limiting (5 req/5min per IP)
- [x] Client logos, Statistics, Testimonials
- [x] Newsletter signup (MOCKED)
- [x] Skeleton loading states
- [x] Process step subpages with professional content
- [x] Hero tags link to service pages
- [x] robots.txt, sitemap.xml

### API Endpoints
- POST /api/contact - Contact form submission (Resend email)
- GET /api/ - Health check
- POST /api/status - Status check
- GET /api/status - Get status checks

### Environment Variables (Backend)
- RESEND_API_KEY= (needs user's Resend API key)
- CONTACT_TO_EMAIL=info@visuworks.de
- CONTACT_FROM_EMAIL=no-reply@visuworks.de

## Prioritized Backlog

### P0 (Critical)
- [ ] Integrate real project images (5 images uploaded: Porsche GT3 Cup cars, Ritter Sport ad)
- [ ] Performance optimization: lazy loading, code splitting, Lighthouse >90
- [ ] Add RESEND_API_KEY to activate live email sending

### P1 (High Priority)
- [ ] Replace placeholder contact details with real ones
- [ ] Dynamic sitemap generation

### P2 (Medium Priority)
- [ ] Hero video (WebM/MP4)
- [ ] Blog/News section
- [ ] Language switcher (DE/EN)
- [ ] Advanced Schema.org (FAQPage, BreadcrumbList)
- [ ] Analytics integration
- [ ] Careers/Partners pages

## MOCKED Functionality
- Newsletter signup: UI only (simulated)
- Chat widget: external links only
- Client logos: placeholder text
- Contact form: **WORKS** but in DEV MODE (no Resend API key = no actual emails)

## User-Provided Project Images (Pending Integration)
- IMG_5035.jpg → Markenkommunikation (Ritter Sport)
- IMG_6740.JPG → Mobilität (Porsche GT3 Cup #929)
- IMG_6742.JPG → Mobilität (vehicle detail)
- IMG_6877.JPG → Mobilität (Porsche GT3 Cup #909)
- IMG_7102.jpg → Mobilität (Porsche GT3 Cup)
