# VISUWORKS — Product Requirements Document

## Original Problem Statement
Build a fully designed, premium, multi-page website for VISUWORKS (European visual branding company). The website must achieve a "High-End Automotive Design Studio / Architectural Portfolio" aesthetic with maximum calmness, precision, and value.

## User Personas
- **Potential B2B Clients**: Marketing/Brand managers from automotive, architecture, retail, and manufacturing sectors looking for visual branding services.
- **Design Partners**: Interior architects and agencies looking for a production partner.
- **VISUWORKS Admin**: Content editors who use the visual editor to update text/images.

## Core Requirements
- **Pages**: Home, Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement, Projekte, Kontakt, Impressum, Datenschutz, AGB
- **Vibe/Design**: Maximum calmness, precision, value. Large typography (font-light), excessive whitespace (py-28/py-40), removal of unnecessary boxes/borders/lines, subtle micro-animations (fade-ins), large high-quality images
- **Content**: German (Primary) and English (Secondary)
- **Features**: Visual Content Editor (MongoDB persistence), Functional Contact Form (IONOS SMTP), Fully responsive, SEO + DSGVO compliant

## Architecture
- **Frontend**: React + TailwindCSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB + IONOS SMTP
- **Design System**: Sharp edges (no rounded corners), neutral white/dark palette (#050507 base), font-light typography, minimal borders (white/[0.06]), gap-px grid patterns

## What's Been Implemented

### Completed Features
- Full multi-page website with all 11 pages
- Visual Content Editor with MongoDB persistence (zoom/pan support)
- IONOS SMTP Contact Form with rate limiting
- Language Switcher (DE/EN) via Context API
- Comprehensive SEO (meta tags, JSON-LD schemas, keywords strategy)
- Mobile responsiveness
- Cookie Consent Banner (DSGVO)
- Pre-Deployment Audit (Production Ready)

### Premium Design Refinement (P0) — COMPLETED 2025-03-25
- **HomePage**: Hero with full-width BG image, font-light h1 (text-7xl), left-aligned layout, gap-px grid sections, neutral white accents
- **All Service Pages** (Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement): Full-width hero with BG images, consistent grid layouts (gap-px), unified section spacing (py-28/py-40)
- **ProjektePage**: Sharp-edge project cards, premium filter tabs
- **KontaktPage**: Clean form layout with thin borders, premium sidebar
- **Shared Components**: Statistics (grid), Testimonials (line-style nav dots), ClientLogos (clean badges), Newsletter (split layout), Footer (consistent spacing)
- **UI Components**: Button (sharp edges, tracking, uppercase), Card (no rounded, subtle borders), Input/Textarea (clean borders), Tabs (sharp-edge triggers)
- **Navbar**: Sharp CTA button, neutral mega-menu link colors, no indigo accents
- **Database**: Test data pollution cleaned

## Prioritized Backlog

### P1 — Hero Video Integration
- Cinematisch, langsam, loopfähig — nicht werblich
- Only if it supports the calm, premium aesthetic
- User confirmation required before implementation

### P2 — Cookie Consent Logic Enhancement
- DSGVO-compliant banner (already exists visually)
- Gate analytics/tracking scripts based on consent

### P2 — Content Expansion
- Blog/News page
- Careers page
- Partners page

## Key Technical Details
- **Content Editor**: Overrides from MongoDB `content_overrides` collection take precedence over `site.js` / `images.js`
- **Admin Panel**: Path `/admin`, Password: `visuworks2026`
- **DB Schema**: `content_overrides` — `key` (string), `type` ("text"|"image"), `value` (string|object)
- **Background Color**: `#050507` (not `#070910`)
- **Border Style**: `border-white/[0.06]` (6% opacity white)
- **Typography**: `font-light tracking-[-0.04em]` for headlines, `text-white/45` for body
- **Section Spacing**: `py-28 md:py-40` standard
- **Label Style**: `text-[11px] font-medium text-white/30 uppercase tracking-[0.15em]`
