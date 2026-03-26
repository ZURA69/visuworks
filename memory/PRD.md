# VISUWORKS — Product Requirements Document

## Original Problem Statement
Build a fully designed, premium, multi-page website for VISUWORKS (European visual branding company). Homepage uses a pinned scroll keyword hero animation with a light, Apple-like aesthetic. Subpages maintain a dark architectural portfolio theme.

## User Personas
- **B2B Clients**: Brand managers from automotive, architecture, retail sectors
- **Design Partners**: Agencies seeking a production partner
- **VISUWORKS Admin**: Content editors using the visual editor

## Core Requirements
- **Pages**: Home (LIGHT), Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement, Projekte, Kontakt, Impressum, Datenschutz, AGB (DARK)
- **Hero Section**: Pinned scroll keyword animation — DESIGN, VEREDLUNG, PRÄSENZ, ARCHITEKTUR, MATERIAL, PRÄZISION. Active word sharp/dark, inactive blurred/faded. Fixed overlay approach (not sticky) to bypass body overflow issues.
- **Features**: Visual Content Editor (MongoDB), Contact Form (IONOS SMTP), Language Switcher (DE/EN), Cookie Consent (DSGVO)

## Architecture
- **Frontend**: React + TailwindCSS + Framer Motion
- **Backend**: FastAPI + MongoDB + IONOS SMTP
- **KeywordStory**: `position: fixed` overlay + vanilla scroll listener. Section height = `N * 100vh`, each keyword gets `(N-1) * 100vh / (N-1)` = 100vh of scroll distance. Overlay shows when section is in viewport range, hides when scrolled past.
- **Theme System**: Navbar/LanguageSwitcher detect `pathname === '/'` for light/dark mode
- **Layout**: Conditional `pt-20` on `<main>` — removed on homepage

## What's Been Implemented

### Pinned Scroll Keyword Hero (Completed 2025-12-26)
- Fixed overlay approach (`position: fixed`, z-index: 5) with scroll event listener
- 6 keywords with equal scroll distance (800px each at 800px viewport)
- Sharp/blur/fade transitions based on distance from active keyword
- Subline + dual CTA buttons at viewport bottom
- Edge gradient fades, progress bar, keyword counter
- Section releases (overlay hides) only after final keyword completes
- Overlay reappears when scrolling back up
- Fully responsive (clamp font sizes, mobile-adaptive spacing)

### Key CSS Fixes
- Removed `overflow-x: hidden` from body (broke position:sticky, switched to fixed overlay)
- Removed `scroll-behavior: smooth` from html (conflicts with Framer Motion scroll tracking)
- Removed `pt-20` from Layout on homepage for full-viewport hero
- Override global `section` padding with inline `paddingTop: 0` on hero section

### Previously Completed
- Homepage sections: Trust Bar, Services (alternating layout), Visual Showcase, Projects, Process, Testimonials, FAQ, Final CTA
- Theme-aware Navbar + LanguageSwitcher
- 5 dark-theme service pages
- Visual Content Editor with MongoDB persistence
- IONOS SMTP Contact Form
- Comprehensive SEO (meta, JSON-LD, keywords)
- Mobile responsiveness
- Cookie Consent Banner (DSGVO)

## Prioritized Backlog
- **(P2) Hero Video Integration** — optional cinematic loop video
- **(P2) Cookie Consent Logic** — gate analytics scripts based on consent
- **(P2) Content Expansion** — Blog, Careers, Partners pages

## Key Technical Details
- **Admin Panel**: `/admin`, Password: `visuworks2026`
- **DB**: MongoDB `content_overrides` — `key`, `type`, `value`
- **Homepage**: #F5F2ED bg, #1A1A1A text, #6B6B6B muted
- **Subpages**: #050507 bg, white text
- **Overlay z-index**: 5 (below navbar z-50, above content)
