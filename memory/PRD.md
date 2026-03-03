# VISUWORKS Website — PRD

## Original Problem Statement
Build a fully designed, premium, multi-page website for a European visual branding company called VISUWORKS. German language, dark theme, with a visual content editor for live content management.

## Core Requirements
- **Pages:** Home, Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement, Projekte, Kontakt, Impressum, Datenschutz, AGB (B2C + B2B)
- **Global:** Sticky navigation with mega menu, global footer
- **Design:** Dark theme, glass-like cards, premium typography, micro-interactions
- **Editor:** Visual Content Editor with MongoDB persistence for text/image overrides
- **Legal:** Full German legal pages with real company data

## Architecture
```
/app/backend/server.py     → FastAPI (contact, admin, editor APIs, health)
/app/frontend/src/
  ├── content/registry.js  → Central field definitions for editor
  ├── contexts/EditorContext.jsx → Editor state, getValue(), save()
  ├── components/editor/EditorSidebar.jsx → Admin sidebar UI
  └── pages/               → All page components using useEditor()
```

## What's Implemented (as of Feb 2026)
- [x] All 11+ pages with professional German copy
- [x] Visual Content Editor connected to ALL pages:
  - [x] Homepage (hero, stats, audiences, CTA, testimonials, process)
  - [x] Mobilität (hero, services, FAQs, CTA)
  - [x] Raum & Architektur (hero, services, FAQs, CTA)
  - [x] Markenkommunikation (hero, services, FAQs, CTA)
  - [x] Design & Konzeption (hero, services, FAQs, CTA)
  - [x] Projektmanagement (hero, services, CTA)
  - [x] Projekte overview (hero title/subline, project titles)
  - [x] Individual project/case study pages (title, desc, challenge, solution, result, images)
- [x] Admin login with password protection
- [x] Image upload with local storage
- [x] Legal pages (Impressum, AGB B2C, AGB B2B, Datenschutz) with real company data
- [x] 50+ real images integrated
- [x] /api/health endpoint for production monitoring
- [x] Cookie consent banner (UI only)
- [x] Responsive design (desktop + mobile)
- [x] SEO meta tags on all pages

## Key API Endpoints
- `GET /api/health` — Health check
- `GET /api/public/overrides` — Public content overrides
- `POST /api/contact` — Contact form (MOCKED - needs RESEND_API_KEY)
- `POST /api/admin/login` — Admin authentication
- `GET/POST/DELETE /api/admin/overrides` — Content override CRUD
- `POST /api/admin/upload` — Image upload

## DB Schema
- Collection: `content_overrides`
- Document: `{ key, value, type: "text"|"image", page, updatedAt }`

## Credentials
- Admin password: see ADMIN_PASSWORD in /app/backend/.env
- Contact form: needs RESEND_API_KEY in /app/backend/.env

## Prioritized Backlog

### P1 — Next Up
- Language switcher (DE/EN)
- Hero video on homepage

### P2 — Future
- Google Analytics 4 + DSGVO-compliant cookie consent (opt-in)
- Performance optimization (Lighthouse >90)
- Advanced SEO (structured data: FAQPage, BreadcrumbList)
- Content expansion: Blog/News, Careers, Partners pages

## MOCKED Integrations
- Resend email service (contact form) — needs real API key
