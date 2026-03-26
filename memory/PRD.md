# VISUWORKS — Product Requirements Document

## Original Problem Statement
Build a fully designed, premium, multi-page website for VISUWORKS (European visual branding company). The website must achieve maximum calmness, precision, and value. Homepage redesigned to a light, minimal, Apple-like premium landing page with a scroll-based keyword hero animation.

## User Personas
- **Potential B2B Clients**: Marketing/Brand managers from automotive, architecture, retail, and manufacturing sectors
- **Design Partners**: Interior architects and agencies looking for a production partner
- **VISUWORKS Admin**: Content editors who use the visual editor to update text/images

## Core Requirements
- **Pages**: Home (LIGHT theme), Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement, Projekte, Kontakt, Impressum, Datenschutz, AGB (all DARK theme)
- **Homepage Design**: Light warm background (#F5F2ED), scroll-driven keyword hero animation (Framer Motion), alternating text+image service sections, FAQ accordion, dark CTA section
- **Hero Section**: Full-viewport scroll-based keyword animation (DESIGN, VEREDLUNG, PRÄSENZ, ARCHITEKTUR, MATERIAL, PRÄZISION). Center word sharp, others blurred/faded. Subline + dual CTA buttons at bottom.
- **Service Pages Design**: Dark theme (#050507), sharp edges, gap-px grids, font-light typography
- **Content**: German (Primary) and English (Secondary)
- **Features**: Visual Content Editor (MongoDB), Functional Contact Form (IONOS SMTP), Fully responsive, SEO + DSGVO compliant

## Architecture
- **Frontend**: React + TailwindCSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB + IONOS SMTP
- **Theme System**: Navbar and LanguageSwitcher are theme-aware, detecting `location.pathname === '/'` for light/dark mode
- **Layout**: Conditional `pt-20` on `<main>` — removed on homepage to allow full-viewport hero

## What's Been Implemented

### Homepage Hero — Keyword Story (Completed 2025-12-26)
- Full-viewport scroll-based keyword animation using Framer Motion `useScroll` + `useTransform`
- 6 keywords: DESIGN, VEREDLUNG, PRÄSENZ, ARCHITEKTUR, MATERIAL, PRÄZISION
- Sharp focus on center word, blur/fade on adjacent words, progress bar on right side
- Subline text + dual CTA buttons (primary dark, secondary outlined) at viewport bottom
- Edge gradient fades (top/bottom) for polish
- Section height: `6 * 45vh` for compact scroll distance
- Global CSS `section` padding overridden with inline `paddingTop: 0`

### Homepage Sections (Completed)
- **Trust Bar**: 4 statistics with border separators (500+, 15, 98%, 12)
- **Services**: 3 alternating text+image sections with parallax, feature lists
- **Visual Showcase**: Full-width image (21:9 aspect) with gradient overlay
- **Projects Preview**: 2x2 grid with project cards
- **Process**: 5-step grid with large faded numbers
- **Testimonials**: Warm background (#EFECE6), 4 white cards
- **FAQ**: 5-item accordion with +/- toggle, smooth animation
- **Final CTA**: Dark (#1A1A1A) card with white button

### Theme-Aware Components
- **Navbar**: Detects homepage via `isLightPage = location.pathname === '/'`. Light: dark text, dark CTA. Dark: white text, white CTA.
- **LanguageSwitcher**: Same detection, adjusts DE/EN text colors
- **Mega Menu**: Colors adapt based on theme
- **Layout**: Conditionally removes `pt-20` on homepage for full-viewport hero

### Service Pages (DARK theme — Completed)
- All 5 service pages with premium dark aesthetic
- Consistent grid layouts, unified section spacing
- Full-width hero sections with background images

### Other Completed Features
- Visual Content Editor with MongoDB persistence (zoom/pan support)
- IONOS SMTP Contact Form with rate limiting
- Language Switcher (DE/EN) via Context API
- Comprehensive SEO (meta tags, JSON-LD schemas, keywords strategy)
- Mobile responsiveness
- Cookie Consent Banner (DSGVO)
- Pre-Deployment Audit (Production Ready)

## Prioritized Backlog

### P1 — Hero Video Integration (optional)
- Cinematisch, langsam, loopfähig — nicht werblich
- User confirmation required before implementation

### P2 — Cookie Consent Logic Enhancement
- Gate analytics/tracking scripts based on consent

### P2 — Content Expansion
- Blog/News, Careers, Partners pages

## Key Technical Details
- **Content Editor**: MongoDB `content_overrides` overrides `site.js` / `images.js`
- **Admin Panel**: `/admin`, Password: `visuworks2026`
- **DB Schema**: `content_overrides` — `key` (string), `type` ("text"|"image"), `value` (string|object)
- **Homepage Palette**: #F5F2ED (bg), #1A1A1A (text), #6B6B6B (muted), #EFECE6 (testimonials bg)
- **Service Pages Palette**: #050507 (bg), white text, border-white/[0.06]
- **Global CSS**: `index.css` applies `section { padding: var(--space-section) }` globally — override with inline style when not desired
