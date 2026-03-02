# VISUWORKS Website - Product Requirements Document

## Original Problem Statement
Production-ready premium multi-page website for VISUWORKS, a European visual branding and surface solutions company. German language throughout. High-end design with dark theme (#070910), subtle purple/blue glow accents, glassmorphism effects.

## Architecture
- **Frontend**: React 18 with React Router 6, Framer Motion for animations, Tailwind CSS, Shadcn/UI components
- **Backend**: FastAPI (minimal - only API status endpoints)
- **Database**: MongoDB (minimal usage)
- **Styling**: Custom design system with glass morphism, premium cards, pill buttons
- **SEO**: Custom useEffect-based SEO solution (replaced react-helmet-async due to React 18 compatibility issues)
- **Contact Service**: Abstracted for easy integration (Resend/Formspree/Custom API)
- **Project Data**: CMS-ready JSON structure with case study support

## User Personas
1. **B2B Clients**: Corporations needing fleet branding, office interior design, event graphics
2. **Private Customers**: Vehicle customization, PPF protection
3. **Agencies/Partners**: Design agencies seeking production partner

## What's Been Implemented

### Pages (19 Total)
- [x] Home (/) - Hero, ClientLogos, Services, Projects Preview, Process, Target Audiences, Statistics, Testimonials, Newsletter, CTA
- [x] Mobilität (/mobilitaet) - Vehicle wrapping & PPF services
- [x] Raum & Architektur (/architektur-raum) - Interior branding & architectural films
- [x] Markenkommunikation (/markenkommunikation) - Large format & event graphics
- [x] Design & Konzeption (/design-konzepte) - Design concepts & visual guidelines
- [x] Projektmanagement (/projektmanagement) - Project coordination & quality assurance
- [x] Projekte (/projekte) - Portfolio with filter tabs & skeleton loading
- [x] Case Study (/projekte/:slug) - Dynamic project detail pages
- [x] Kontakt (/kontakt) - Contact form with validation
- [x] Team (/team) - Team members, values, company info
- [x] Prozess: Analyse (/prozess/analyse) - Requirements & goal definition
- [x] Prozess: Design (/prozess/design) - Design & conception phase
- [x] Prozess: Produktion (/prozess/produktion) - Production phase
- [x] Prozess: Umsetzung (/prozess/umsetzung) - Installation & assembly
- [x] Prozess: Qualitätssicherung (/prozess/qualitaetssicherung) - Quality assurance
- [x] Impressum (/impressum) - Legal notice
- [x] Datenschutz (/datenschutz) - Privacy policy
- [x] AGB (/agb) - Terms & conditions
- [x] 404 Page (*) - Custom not found page with quick links

### Production Features
- [x] SEO meta tags on ALL pages (document.title, og:title, og:description, canonical)
- [x] JSON-LD structured data (Organization, LocalBusiness) on homepage
- [x] Cookie consent banner with granular preferences
- [x] WhatsApp chat widget with phone and email options
- [x] Client logos trust section
- [x] Animated statistics counters (CountUp)
- [x] Testimonials carousel with navigation
- [x] Newsletter signup form (homepage + footer)
- [x] Skeleton loading states on Projekte page
- [x] Scroll progress indicator
- [x] Responsive navigation with hamburger menu
- [x] Hero tags link to service pages
- [x] Process steps link to subpages with professional content
- [x] Process step navigation (prev/next, step indicators)
- [x] robots.txt and sitemap.xml

## Prioritized Backlog

### P0 (Critical) - Ready to Implement
- [ ] Integrate real project images (user has provided 5 images for Mobilität/Markenkommunikation)
- [ ] E-Mail-Service for contact form (Resend/Formspree)
- [ ] Performance optimization: Lighthouse score >90, lazy loading images

### P1 (High Priority)
- [ ] Add actual business contact details (replace placeholder phone/email)
- [ ] Dynamic sitemap generation

### P2 (Medium Priority)
- [ ] Hero video option (WebM/MP4)
- [ ] Blog/News section
- [ ] Language switcher (EN/DE)
- [ ] Advanced Schema.org (FAQPage, BreadcrumbList)
- [ ] Analytics integration

### P3 (Nice to Have)
- [ ] Careers page
- [ ] Partners page
- [ ] Search functionality
- [ ] Live chat provider integration

## MOCKED Functionality
- Newsletter signup: simulated with setTimeout (UI only)
- Contact form: simulated with setTimeout (UI only)
- Chat widget: opens external links only (no live chat)
- Client logos: placeholder text (no actual logo images)

## Key Files
- `/app/frontend/src/pages/ProcessStepPage.jsx` - Dynamic process subpages
- `/app/frontend/src/components/SEOHead.jsx` - Custom SEO hook
- `/app/frontend/src/config/seo.js` - SEO configuration + JSON-LD schemas
- `/app/frontend/src/data/projects.js` - CMS-ready project data (18 entries)
- `/app/frontend/src/services/contactService.js` - Email integration service

## User-Provided Project Images
- IMG_5035.jpg → Markenkommunikation (Ritter Sport Großformat-Werbung)
- IMG_6740.JPG → Mobilität (Porsche GT3 Cup #929, black/gold/red)
- IMG_6742.JPG → Mobilität (vehicle detail)
- IMG_6877.JPG → Mobilität (Porsche GT3 Cup #909, black/pink/yellow)
- IMG_7102.jpg → Mobilität (Porsche GT3 Cup race car)
