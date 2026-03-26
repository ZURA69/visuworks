# VISUWORKS — Product Requirements Document

## Original Problem Statement
Fully designed, premium, multi-page website for a European visual branding company called VISUWORKS. The website must be visually high-end with a unified light/warm-minimal design system.

## User Personas
- **VISUWORKS Team**: Uses the CMS to update content, images, and text. Needs preview mode before publishing.
- **Prospective Clients**: Browse services, portfolio, and contact form. Expect premium, Apple-like aesthetic.
- **Legal Visitors**: Access Impressum, Datenschutz, AGB for compliance.

## Core Requirements
- **Pages**: Home, Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement, Projekte, Kontakt, Impressum, Datenschutz, AGB, AGB B2B, Team, Process Steps, Sub-Service detail pages, Case Studies
- **Design**: Unified light/warm-minimal aesthetic (#F5F2ED bg, #1A1A1A text). Large typography, generous whitespace, micro-animations (Framer Motion). Premium Apple/SaaS-like feel.
- **Content**: German (Primary), English (Secondary) via Language Switcher
- **Features**: Visual Content Editor (MongoDB CMS), Contact Form (IONOS SMTP), Language Switcher (DE/EN), Scroll-pinned Keyword Hero

## Design System (Global)
| Token | Value | Usage |
|-------|-------|-------|
| bg | #F5F2ED | Page background |
| card | #FFFFFF | Card surfaces |
| footer-bg | #EFECE6 | Footer, alternating sections |
| text | #1A1A1A | Primary text |
| muted | #6B6B6B | Secondary text |
| light | #9A9A9A | Captions, labels |
| border | rgba(0,0,0,0.07) | Borders, dividers |
| accent | #1A1A1A | CTA buttons, highlights |

## Architecture
```
/app/
├── backend/
│   ├── server.py          # FastAPI (SMTP + MongoDB CMS API)
│   └── uploads/
├── frontend/
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── content/       # Fallback content (site.js, images.js, projects.js)
│   │   ├── contexts/      # EditorContext, LanguageContext
│   │   └── pages/         # All page templates
```

## What's Implemented
- [x] Full multi-page React site with FastAPI backend
- [x] Visual Content Editor (MongoDB persistence, EditorSidebar, EditableImage with zoom/pan)
- [x] Contact Form with IONOS SMTP integration
- [x] Language Switcher (DE/EN)
- [x] Scroll-pinned Keyword Hero (Framer Motion)
- [x] SEO optimization (meta tags, JSON-LD schemas, keywords)
- [x] Mobile responsiveness
- [x] Cookie consent banner (DSGVO)
- [x] **Unified light theme across ALL public pages** (Dec 2025)
- [x] **Keyword scroll spacing increased** (Dec 2025)
- [x] **Navbar readability improved (dark text)** (Dec 2025)
- [x] **All components (Footer, Testimonials, Statistics, ClientLogos, ChatWidget, CookieBanner) converted to light theme** (Dec 2025)

## Prioritized Backlog

### P0 (In Progress)
- CMS Preview Mode: Toggle in EditorSidebar to view unsaved drafts before publishing (EditorContext already has `previewMode` state logic)

### P2 (Future)
- Hero Video Integration (looping background video option)
- Content Expansion: Blog/News, Careers, Partners pages

## Key API Endpoints
- `POST /api/contact` — Form submission via IONOS SMTP
- `GET /api/editor/content` — Fetch live overrides
- `POST /api/editor/content` — Save overrides
- `GET /api/health` — Healthcheck

## DB Schema
- **Collection**: `content_overrides`
  - `key` (string), `type` ("text" | "image"), `value` (string | object)

## Credentials
- Admin: `/admin`, password: `visuworks2026`
- SMTP: IONOS config in `backend/.env`
