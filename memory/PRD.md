# VISUWORKS Website - Product Requirements Document

## Original Problem Statement
Production-ready premium multi-page website for VISUWORKS, a European visual branding and surface solutions company. German language. Dark theme (#070910), glassmorphism, premium typography.

## Architecture
- **Frontend**: React 18 (CRA), React Router 6, Framer Motion, Tailwind CSS, Shadcn/UI
- **Backend**: FastAPI with Resend email integration
- **Database**: MongoDB (minimal)
- **SEO**: Custom useEffect-based meta tag management
- **Contact**: Backend /api/contact with Resend, honeypot, rate limiting
- **Navigation**: Mega menu with centralized nav data structure

## Pages (34 Total)
### Main Pages (20)
- Home, Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption
- Projektmanagement, Projekte, Case Study (:slug), Kontakt, Danke, Team
- 5x Prozess-Subpages, Impressum, Datenschutz, AGB, 404

### Sub-Service Pages (14)
- Mobilität: PPF & Schutzfolien, Flottenbranding, Teil-/Vollfolierung, Designentwicklung
- Raum & Architektur: Architekturfolierung, Sichtschutzfolien, Interior Branding, Oberflächenveredelung, Raumkonzepte
- Markenkommunikation: Großformatmedien, Werbesysteme, Printmedien, Event- & Messegrafik, POS-Systeme

## Key Features
- [x] Mega menu for Leistungen (4-column glass panel, hover/active states)
- [x] Mobile accordion navigation with nested sub-items
- [x] Active state highlighting (parent active on child routes)
- [x] ScrollToTop on every route change
- [x] SEO meta tags on ALL 34 pages
- [x] Contact form with /api/contact backend (Resend, honeypot, rate limit)
- [x] Cookie consent, chat widget, statistics, testimonials, newsletter
- [x] Process step subpages, skeleton loading, scroll progress

## Key Files
- `/app/frontend/src/components/layout/Navbar.jsx` - Mega menu + mobile accordion
- `/app/frontend/src/data/navigation.js` - Centralized nav structure
- `/app/frontend/src/data/subservices.js` - 14 sub-service page content
- `/app/frontend/src/pages/SubServicePage.jsx` - Dynamic sub-service renderer
- `/app/frontend/src/pages/ProcessStepPage.jsx` - Dynamic process step renderer

## Environment Variables (Backend)
- RESEND_API_KEY= (needs user's key for live email)
- CONTACT_TO_EMAIL=info@visuworks.de
- CONTACT_FROM_EMAIL=no-reply@visuworks.de

## Prioritized Backlog
### P0
- [ ] Integrate real project images (5 uploaded: Porsche GT3 Cup, Ritter Sport)
- [ ] Performance: lazy loading, code splitting, Lighthouse >90
- [ ] Activate Resend API key for live email

### P1
- [ ] Replace placeholder contact details
- [ ] Dynamic sitemap generation

### P2
- [ ] Hero video, Blog/News, Language switcher (DE/EN), Analytics
- [ ] Advanced Schema.org (FAQPage, BreadcrumbList)

## MOCKED
- Newsletter signup: UI only
- Chat widget: external links only
- Client logos: placeholder text
- Contact form: WORKS in DEV MODE (no API key = no actual emails)
