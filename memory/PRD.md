# VISUWORKS Website - Product Requirements Document

## Original Problem Statement
Premium multi-page website for VISUWORKS, a European visual branding and surface solutions company. German language throughout. High-end design similar to huly.io/Apple aesthetic with dark theme (#070910), subtle purple/blue glow accents, glassmorphism effects.

## Architecture
- **Frontend**: React with React Router, Framer Motion for animations, Tailwind CSS, Shadcn/UI components
- **Backend**: FastAPI (minimal - only API status endpoints)
- **Database**: MongoDB (minimal usage)
- **Styling**: Custom design system with glass morphism, premium cards, pill buttons

## User Personas
1. **B2B Clients**: Corporations needing fleet branding, office interior design, event graphics
2. **Private Customers**: Vehicle customization, PPF protection
3. **Agencies/Partners**: Design agencies seeking production partner

## Core Requirements (Static)
- 11 fully designed pages with German content
- Global sticky navigation with centered logo
- Global footer with legal links
- Responsive design (mobile-first)
- Premium dark theme with subtle animations
- Contact form with validation (frontend-only)
- Project portfolio with category filters

## What's Been Implemented (December 2025)

### Pages (11/11 Complete)
- [x] Home (/) - Hero, Services, Projects Preview, Process, Target Audiences, CTA
- [x] Mobilität (/mobilitaet) - Vehicle wrapping & PPF services
- [x] Raum & Architektur (/architektur-raum) - Interior branding & architectural films
- [x] Markenkommunikation (/markenkommunikation) - Large format & event graphics
- [x] Design & Konzeption (/design-konzepte) - Design concepts & visual guidelines
- [x] Projektmanagement (/projektmanagement) - Project coordination & quality assurance
- [x] Projekte (/projekte) - Portfolio with filter tabs
- [x] Kontakt (/kontakt) - Contact form with validation
- [x] Impressum (/impressum) - Legal notice
- [x] Datenschutz (/datenschutz) - Privacy policy
- [x] AGB (/agb) - Terms & conditions

### Components
- [x] Navbar with desktop/mobile views
- [x] Footer with legal links
- [x] Button, Card, Input, Textarea, Tabs components
- [x] Toast notifications (Sonner)

### Features
- [x] Responsive navigation (hamburger menu on mobile)
- [x] Filter tabs on projects page
- [x] Contact form validation
- [x] Smooth scroll animations
- [x] Hover effects on cards and buttons

## Prioritized Backlog

### P0 (Critical) - DONE
- All 11 pages implemented
- Navigation working across all pages
- Mobile responsive design
- Contact form with validation

### P1 (High Priority) - Future
- Replace placeholder images with real project photos
- Backend email integration for contact form
- Project detail pages/modals
- Analytics integration (when ready)

### P2 (Medium Priority) - Future
- Hero video option (WebM/MP4)
- Blog/News section
- Team page
- Case study deep-dives
- Language switcher (EN/DE)

### P3 (Nice to Have)
- Cookie consent banner (when analytics added)
- Search functionality
- Newsletter signup
- Client testimonials carousel

## Next Tasks
1. Replace placeholder project tiles with real project images
2. Integrate email service for contact form (Formspree/Make/Zapier)
3. Add project detail modals or dedicated project pages
4. Optimize images for production
5. Add meta tags and SEO optimization
