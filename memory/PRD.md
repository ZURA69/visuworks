# VISUWORKS — Product Requirements Document

## Original Problem Statement
Fully designed, premium, multi-page website for a European visual branding company called VISUWORKS. The website must be visually high-end with a unified light/warm-minimal design system and a powerful CMS for content and layout management.

## User Personas
- **VISUWORKS Team**: Uses the CMS to update content, images, layout order, spacing, and visibility. Needs preview before publishing.
- **Prospective Clients**: Browse services, portfolio, and contact form. Expect premium, Apple-like aesthetic.
- **Legal Visitors**: Access Impressum, Datenschutz, AGB for compliance.

## Core Requirements
- **Pages**: Home, Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement, Projekte, Kontakt, Impressum, Datenschutz, AGB, AGB B2B, Team, Process Steps, Sub-Service detail pages, Case Studies
- **Design**: Unified light/warm-minimal aesthetic (#F5F2ED bg, #1A1A1A text). Large typography, generous whitespace, micro-animations (Framer Motion).
- **Content**: German (Primary), English (Secondary) via Language Switcher
- **Features**: Visual Content Editor (MongoDB CMS), CMS Layout System, Contact Form (IONOS SMTP), Language Switcher (DE/EN), Scroll-pinned Keyword Hero

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
│   ├── server.py          # FastAPI (SMTP + MongoDB CMS + Layout API)
│   └── uploads/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── editor/
│   │   │       ├── EditorSidebar.jsx   # Content + Layout tabs
│   │   │       └── LayoutSection.jsx   # Section/Container wrappers
│   │   ├── content/       # Fallback content (site.js, images.js, projects.js)
│   │   ├── contexts/      # EditorContext (content + layout state), LanguageContext
│   │   └── pages/         # All page templates
```

## CMS Layout System (Phase 1 — Complete)
### Capabilities:
- **Section Visibility**: Toggle sections on/off (hidden for public, dimmed for editors)
- **Section Order**: Reorder via up/down arrows (swaps order values in DB)
- **Padding Controls**: Top/bottom padding per section (none/small/medium/large/xl)
- **Content Width**: Per-section width control (narrow 900px / normal 1400px / wide 1600px)
- **Image Defaults**: Global fit mode (cover/contain) and aspect ratio (auto/16:9/4:3/1:1)

### API:
- `GET /api/editor/layout?page=home` — Public, no auth
- `POST /api/admin/layout` — Admin auth required

### DB Schema:
- **Collection**: `layout_settings`
  - `page` (string, unique index), `sections` (dict of id → settings), `imageDefaults` (dict), `updatedAt` (datetime)

### Homepage Sections (in order):
1. hero (Keyword Hero), 2. trustbar, 3. services, 4. showcase, 5. projects, 6. process, 7. testimonials, 8. faq, 9. cta

## What's Implemented
- [x] Full multi-page React site with FastAPI backend
- [x] Visual Content Editor (MongoDB persistence, EditorSidebar, EditableImage with zoom/pan)
- [x] **CMS Layout System Phase 1**: Section visibility, order, padding, width, image defaults (Dec 2025)
- [x] Contact Form with IONOS SMTP integration
- [x] Language Switcher (DE/EN)
- [x] Scroll-pinned Keyword Hero (Framer Motion)
- [x] SEO optimization (meta tags, JSON-LD schemas, keywords)
- [x] Mobile responsiveness
- [x] Cookie consent banner (DSGVO)
- [x] Unified light theme across ALL public pages (Dec 2025)
- [x] Keyword scroll spacing increased (Dec 2025)
- [x] Navbar readability improved (dark text) (Dec 2025)

## Prioritized Backlog

### P1 (Phase 2 — Layout Enhancements)
- Section size presets (auto/small/medium/large/fullscreen)
- Drag & drop section reordering (if stable, otherwise keep arrows)

### P1 (CMS)
- Preview Mode: Toggle to view unsaved drafts before publishing

### P2 (Future)
- Hero Video Integration (looping background video option)
- Content Expansion: Blog/News, Careers, Partners pages

## Key API Endpoints
- `POST /api/contact` — Form submission via IONOS SMTP
- `GET /api/editor/layout?page=home` — Public layout settings
- `POST /api/admin/layout` — Save layout settings (admin)
- `GET /api/editor/content` — Fetch live content overrides
- `POST /api/editor/content` — Save content overrides
- `GET /api/health` — Healthcheck

## Credentials
- Admin: `/admin`, password: `visuworks2026`
- SMTP: IONOS config in `backend/.env`
