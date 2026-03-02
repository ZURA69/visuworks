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

### Pages (14 Total)
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
- [x] Impressum (/impressum) - Legal notice
- [x] Datenschutz (/datenschutz) - Privacy policy
- [x] AGB (/agb) - Terms & conditions
- [x] 404 Page (*) - Custom not found page with quick links

### Production Features
- [x] SEO meta tags (document.title, og:title, og:description, canonical) on ALL pages
- [x] JSON-LD structured data (Organization, LocalBusiness) on homepage
- [x] Cookie consent banner with granular preferences (necessary/analytics/marketing)
- [x] WhatsApp chat widget with phone and email options
- [x] Client logos trust section
- [x] Animated statistics counters (CountUp)
- [x] Testimonials carousel with navigation
- [x] Newsletter signup form (homepage + footer minimal variant)
- [x] Skeleton loading states on Projekte page
- [x] Scroll progress indicator
- [x] Responsive navigation with hamburger menu
- [x] robots.txt and sitemap.xml
- [x] Semantic HTML structure
- [x] Accessibility improvements (ARIA labels, roles)

### Technical Files
- `/app/frontend/src/components/SEOHead.jsx` - Custom SEO hook using useEffect
- `/app/frontend/src/config/seo.js` - SEO configuration + JSON-LD schemas
- `/app/frontend/src/data/projects.js` - 18 project entries with case study data
- `/app/frontend/src/services/contactService.js` - Email integration service
- `/app/frontend/src/components/Skeleton.jsx` - Loading skeleton components
- `/app/frontend/src/components/CookieBanner.jsx` - GDPR cookie consent
- `/app/frontend/src/components/ChatWidget.jsx` - WhatsApp/contact widget
- `/app/frontend/src/components/Statistics.jsx` - Animated counters
- `/app/frontend/src/components/Testimonials.jsx` - Carousel with ratings
- `/app/frontend/src/components/NewsletterSignup.jsx` - Email subscription form

## Prioritized Backlog

### P0 (Critical) - Ready to Implement
- [ ] Performance optimization: Lighthouse score >90, lazy loading images
- [ ] Replace placeholder project tiles with real project images

### P1 (High Priority)
- [ ] Configure email service for contact form (add API key to Resend/Formspree)
- [ ] Add actual business contact details (replace placeholder phone/email)
- [ ] Dynamic sitemap generation

### P2 (Medium Priority)
- [ ] Hero video option (WebM/MP4)
- [ ] Blog/News section
- [ ] Language switcher (EN/DE)
- [ ] Careers page
- [ ] Partners page
- [ ] More case studies with real images
- [ ] Advanced Schema.org (FAQPage, BreadcrumbList)

### P3 (Nice to Have)
- [ ] Google Analytics / Plausible integration
- [ ] Search functionality
- [ ] Live chat provider integration

## MOCKED Functionality
- Newsletter signup: simulated with setTimeout (UI only)
- Contact form: simulated with setTimeout (UI only)
- Chat widget: opens external links only (no live chat)
- Client logos: placeholder text (no actual logo images)

## File Structure
```
/app/frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Layout
│   │   ├── ui/              # Button, Card, Input, Tabs, etc.
│   │   ├── ChatWidget.jsx
│   │   ├── ClientLogos.jsx
│   │   ├── CookieBanner.jsx
│   │   ├── NewsletterSignup.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── SEOHead.jsx
│   │   ├── Skeleton.jsx
│   │   ├── Statistics.jsx
│   │   └── Testimonials.jsx
│   ├── config/
│   │   └── seo.js           # SEO config + JSON-LD schemas
│   ├── data/
│   │   └── projects.js      # CMS-ready project data (18 entries)
│   ├── services/
│   │   └── contactService.js
│   ├── pages/               # All 14 page components
│   └── lib/utils.js
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── index.html
└── .env
```
