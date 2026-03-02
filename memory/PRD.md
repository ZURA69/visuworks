# VISUWORKS Website - Product Requirements Document

## Original Problem Statement
Production-ready premium multi-page website for VISUWORKS, a European visual branding and surface solutions company. German language throughout. High-end design with dark theme (#070910), subtle purple/blue glow accents, glassmorphism effects.

## Architecture
- **Frontend**: React 18 with React Router 6, Framer Motion for animations, Tailwind CSS, Shadcn/UI components
- **Backend**: FastAPI (minimal - only API status endpoints)
- **Database**: MongoDB (minimal usage)
- **Styling**: Custom design system with glass morphism, premium cards, pill buttons
- **Contact Service**: Abstracted for easy integration (Resend/Formspree/Custom API)
- **Project Data**: CMS-ready JSON structure with case study support

## User Personas
1. **B2B Clients**: Corporations needing fleet branding, office interior design, event graphics
2. **Private Customers**: Vehicle customization, PPF protection
3. **Agencies/Partners**: Design agencies seeking production partner

## What's Been Implemented (December 2025)

### Pages (12 Total)
- [x] Home (/) - Hero, Services, Projects Preview, Process, Target Audiences, CTA
- [x] Mobilität (/mobilitaet) - Vehicle wrapping & PPF services
- [x] Raum & Architektur (/architektur-raum) - Interior branding & architectural films
- [x] Markenkommunikation (/markenkommunikation) - Large format & event graphics
- [x] Design & Konzeption (/design-konzepte) - Design concepts & visual guidelines
- [x] Projektmanagement (/projektmanagement) - Project coordination & quality assurance
- [x] Projekte (/projekte) - Portfolio with filter tabs
- [x] Case Study (/projekte/:slug) - Dynamic project detail pages
- [x] Kontakt (/kontakt) - Contact form with validation
- [x] Impressum (/impressum) - Legal notice
- [x] Datenschutz (/datenschutz) - Privacy policy
- [x] AGB (/agb) - Terms & conditions

### Production Features
- [x] Responsive navigation with active state indicators
- [x] Mobile hamburger menu with auto-close on navigation
- [x] Scroll progress indicator
- [x] Project data in CMS-ready JSON structure (/data/projects.js)
- [x] ContactService abstraction for email integration
- [x] Case study template with full project details
- [x] Dynamic routing for project case studies
- [x] SEO meta tags in index.html
- [x] robots.txt and sitemap.xml
- [x] Semantic HTML structure (header, main, section, footer)
- [x] Accessibility improvements (ARIA labels, roles)

### Technical Files
- `/app/frontend/src/data/projects.js` - 18 project entries with case study data
- `/app/frontend/src/services/contactService.js` - Email integration service
- `/app/frontend/src/pages/CaseStudyTemplate.jsx` - Reusable case study layout
- `/app/frontend/public/robots.txt` - Search engine directives
- `/app/frontend/public/sitemap.xml` - Page listing for SEO

### Environment Variables (Contact Form)
```
REACT_APP_CONTACT_API_ENDPOINT=https://api.resend.com/emails (or Formspree URL)
REACT_APP_CONTACT_API_KEY=your_api_key_here
```

## Prioritized Backlog

### P1 (High Priority) - Ready to Implement
- Replace placeholder project tiles with real project images
- Configure email service for contact form (add API key)
- Add actual business contact details

### P2 (Medium Priority) - Future
- Hero video option (WebM/MP4)
- Blog/News section
- Team page
- Language switcher (EN/DE)
- More case studies with real images

### P3 (Nice to Have)
- Cookie consent banner (when analytics added)
- Search functionality
- Newsletter signup
- Client testimonials carousel

## Integration Guide

### Contact Form Setup (Resend)
1. Get API key from resend.com
2. Add to `/app/frontend/.env`:
   - `REACT_APP_CONTACT_API_ENDPOINT=https://api.resend.com/emails`
   - `REACT_APP_CONTACT_API_KEY=re_xxxxx`
3. Restart frontend

### Contact Form Setup (Formspree)
1. Create form at formspree.io
2. Add to `/app/frontend/.env`:
   - `REACT_APP_CONTACT_API_ENDPOINT=https://formspree.io/f/xxxxx`
3. Restart frontend

## File Structure
```
/app/frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, Layout
│   │   ├── ui/              # Button, Card, Input, Tabs
│   │   └── ScrollProgress.jsx
│   ├── data/
│   │   └── projects.js      # CMS-ready project data
│   ├── services/
│   │   └── contactService.js # Email integration
│   ├── pages/               # All 12 page components
│   └── lib/utils.js
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── index.html           # SEO meta tags
└── .env                     # Environment configuration
```
