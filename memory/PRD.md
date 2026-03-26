# VISUWORKS — Product Requirements Document

## Original Problem Statement
Build a premium, multi-page website for VISUWORKS (European visual branding company). Homepage uses a pinned scroll keyword hero with a light Apple-like aesthetic. Subpages maintain dark architectural theme. Full CMS integration for all content.

## Architecture
- **Frontend**: React + TailwindCSS + Framer Motion
- **Backend**: FastAPI + MongoDB + IONOS SMTP
- **CMS**: MongoDB `content_overrides` collection — key/value store supporting text, images, and arrays
- **Admin Panel**: `/admin`, Password: `visuworks2026`
- **Theme System**: Navbar/LanguageSwitcher detect `pathname === '/'` for light/dark

## What's Been Implemented

### CMS Integration Fix (Completed 2025-12-26)
- **Trust Bar editable**: Stored as `trustbar.items` array in MongoDB (list of {value, label} objects). Admin sidebar has ListField component with add/edit/delete. Falls back to individual `stats.{i}.*` keys, then to `statistics` from site.js
- **Content sync fixed**: EditorContext.save() now re-fetches all overrides from server after save (was only doing local state merge)
- **All homepage content wired to CMS**: Trust Bar, Hero subline, CTA labels, Process Steps, Testimonials — all read via `getValue()` from EditorContext. No hardcoded fallbacks overriding CMS data.
- **ListField component** in EditorSidebar: supports add, edit, delete for list-type fields (used for trust bar stats)

### Pinned Scroll Keyword Hero (Completed 2025-12-26)
- `position: fixed` overlay with scroll listener (not sticky — broken by body overflow)
- 6 keywords: DESIGN → VEREDLUNG → PRÄSENZ → ARCHITEKTUR → MATERIAL → PRÄZISION
- Each keyword: 100vh scroll distance, sharp/blur transitions
- Section height: 600vh, releases after last keyword

### Previously Completed
- Homepage sections: Trust Bar, Services, Visual Showcase, Projects, Process, Testimonials, FAQ, CTA
- Theme-aware Navbar + LanguageSwitcher
- 5 dark-theme service pages
- Visual Content Editor with MongoDB persistence (zoom/pan)
- IONOS SMTP Contact Form
- SEO (meta, JSON-LD, keywords)
- Mobile responsiveness
- Cookie Consent Banner (DSGVO)

## Key CMS Details
- **Public API**: `GET /api/content/overrides` → `{overrides: {key: value}}`
- **Admin API**: `POST /api/admin/overrides` (Bearer token), `GET/DELETE /api/admin/overrides`
- **DB Schema**: `content_overrides` — key (string), type (text|image|list), value (any), page (string)
- **Frontend**: `useEditor().getValue(key, fallback)` reads CMS first, falls back to hardcoded
- **Trust Bar key**: `trustbar.items` (array of {value, label})

## Prioritized Backlog
- **(P2) Hero Video Integration** — cinematic loop video
- **(P2) Cookie Consent Logic** — gate analytics on consent
- **(P2) Content Expansion** — Blog, Careers, Partners
