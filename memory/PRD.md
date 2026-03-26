# VISUWORKS — Product Requirements Document

## Original Problem Statement
Build a fully designed, premium, multi-page website for VISUWORKS (European visual branding company). The website must achieve maximum calmness, precision, and value. Homepage redesigned March 2025 to a light, minimal, Apple-like premium landing page inspired by findyourvana.com.

## User Personas
- **Potential B2B Clients**: Marketing/Brand managers from automotive, architecture, retail, and manufacturing sectors
- **Design Partners**: Interior architects and agencies looking for a production partner
- **VISUWORKS Admin**: Content editors who use the visual editor to update text/images

## Core Requirements
- **Pages**: Home (LIGHT theme), Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement, Projekte, Kontakt, Impressum, Datenschutz, AGB (all DARK theme)
- **Homepage Design**: Light warm background (#F5F2ED), large bold typography, smooth scroll-based Framer Motion animations, alternating text+image sections, FAQ accordion, dark CTA section
- **Service Pages Design**: Dark theme (#050507), sharp edges, gap-px grids, font-light typography
- **Content**: German (Primary) and English (Secondary)
- **Features**: Visual Content Editor (MongoDB), Functional Contact Form (IONOS SMTP), Fully responsive, SEO + DSGVO compliant

## Architecture
- **Frontend**: React + TailwindCSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB + IONOS SMTP
- **Theme System**: Navbar and LanguageSwitcher are theme-aware, detecting `location.pathname === '/'` for light/dark mode

## What's Been Implemented

### Homepage (LIGHT theme) — COMPLETED 2025-03-26
- **Hero**: Large bold headline (clamp responsive), subheadline, 2 CTA buttons (dark/outlined), hero image with soft shadow
- **Trust Bar**: 4 statistics with border separators
- **Services**: 3 alternating text+image sections with parallax, feature lists
- **Visual Showcase**: Full-width image (21:9 aspect) with gradient overlay
- **Projects Preview**: 2x2 grid with project cards
- **Process**: 5-step grid with large faded numbers
- **Testimonials**: Warm background (#EFECE6), 4 white cards
- **FAQ**: 5-item accordion with +/- toggle, smooth animation
- **Final CTA**: Dark (#1A1A1A) card with white button
- **Palette**: bg #F5F2ED, card #FFFFFF, text #1A1A1A, muted #6B6B6B, light #9A9A9A
- **Animations**: Framer Motion scroll-based reveals, parallax on images, subtle easing

### Theme-Aware Components
- **Navbar**: Detects homepage via `isLightPage = location.pathname === '/'`. Light: dark text, dark CTA. Dark: white text, white CTA. Scrolled: backdrop-blur with appropriate bg.
- **LanguageSwitcher**: Same detection, adjusts DE/EN text colors
- **Mega Menu**: Colors adapt based on theme

### Service Pages (DARK theme) — COMPLETED 2025-03-25
- All 5 service pages with premium dark aesthetic
- Consistent grid layouts (gap-px), unified section spacing (py-28/py-40)
- Full-width hero sections with background images

### Other Completed Features
- Visual Content Editor with MongoDB persistence (zoom/pan support)
- IONOS SMTP Contact Form with rate limiting
- Language Switcher (DE/EN) via Context API
- Comprehensive SEO (meta tags, JSON-LD schemas, keywords strategy)
- Mobile responsiveness
- Cookie Consent Banner (DSGVO)

## Prioritized Backlog

### P1 — Hero Video Integration
- Cinematisch, langsam, loopfähig — nicht werblich
- User confirmation required before implementation

### P1 — Adapt service pages to light theme (optional)
- User mentioned: "Alle anderen Seiten bleiben vorerst unverändert (können später angepasst werden)"

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
