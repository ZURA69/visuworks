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
/app/backend/server.py     -> FastAPI (contact, admin, editor APIs, health, image upload+optimization)
/app/frontend/src/
  ├── content/registry.js  -> Central field definitions for editor
  ├── content/images.js    -> All image paths (now .webp)
  ├── contexts/EditorContext.jsx -> Editor state, getValue(), save(), uploadImage(), compressImage()
  ├── components/editor/EditorSidebar.jsx -> Admin sidebar UI with progress
  └── pages/               -> All page components using useEditor()
```

## What's Implemented

### Visual Content Editor - ALL pages connected
- [x] Homepage (hero, stats, audiences, CTA, testimonials, process)
- [x] Mobilität (hero, services, FAQs, CTA)
- [x] Raum & Architektur (hero, services, FAQs, CTA)
- [x] Markenkommunikation (hero, services, FAQs, CTA)
- [x] Design & Konzeption (hero, services, FAQs, CTA)
- [x] Projektmanagement (hero, services, CTA)
- [x] Projekte overview (hero title/subline, project titles)
- [x] Individual project/case study pages (all fields editable)

### Image Optimization Pipeline
- [x] Client-side: Canvas API compression for files >500KB (resize to 1920px max, WebP quality 82)
- [x] Server-side: Pillow optimization on upload (resize to 2400px max, convert to WebP quality 82)
- [x] All 57 static images converted: 160MB -> 17MB (89% reduction)
- [x] All image references updated to .webp in images.js
- [x] Lazy loading (loading="lazy") on all non-hero images
- [x] fetchPriority="high" on hero images for fast first paint

### Other Features
- [x] /api/health endpoint for production monitoring
- [x] Admin login with password protection
- [x] Legal pages (Impressum, AGB B2C, AGB B2B, Datenschutz)
- [x] Contact form (MOCKED - needs RESEND_API_KEY)
- [x] Cookie consent banner
- [x] Responsive design
- [x] SEO meta tags

## Key API Endpoints
- `GET /api/health`
- `GET /api/public/overrides`
- `POST /api/contact` (MOCKED)
- `POST /api/admin/login`
- `GET/POST/DELETE /api/admin/overrides`
- `POST /api/admin/upload` (now with Pillow optimization + WebP conversion)

## DB Schema
- Collection: `content_overrides`
- Document: `{ key, value, type: "text"|"image", page, updatedAt }`

## Credentials
- Admin: ADMIN_PASSWORD in /app/backend/.env
- Contact: needs RESEND_API_KEY in /app/backend/.env

## Prioritized Backlog

### P1 — Next Up
- Language switcher (DE/EN)
- Hero video on homepage

### P2 — Future
- Google Analytics 4 + DSGVO cookie consent (opt-in with script loading)
- Performance optimization (Lighthouse >90)
- Advanced SEO (structured data: FAQPage, BreadcrumbList)
- Content expansion: Blog/News, Careers, Partners pages
