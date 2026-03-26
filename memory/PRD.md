# VISUWORKS Website — PRD

## Original Problem Statement
Premium multi-page website for European visual branding company VISUWORKS. Unified light/minimal design aesthetic (Apple-like SaaS). German (primary) + English (secondary). Visual CMS with MongoDB persistence, IONOS SMTP contact form, responsive layout, SEO, DSGVO compliance.

**User's Core Requirement**: "If it is visible on the website, it must exist in the editor." Every visible element must be editable via the /admin panel.

## Core Architecture
- **Frontend**: React + TailwindCSS + Framer Motion
- **Backend**: FastAPI + MongoDB
- **CMS**: Two-tier system (Content overrides + Layout settings)
- **Email**: IONOS SMTP integration

## Pages
Home, Mobilität, Raum & Architektur, Markenkommunikation, Design & Konzeption, Projektmanagement, Projekte, Kontakt, Danke, Impressum, Datenschutz, AGB (B2C), AGB (B2B)

## Implemented Features

### Design System (DONE)
- Unified light/minimal theme across all pages
- Premium typography, spacing, micro-animations
- Responsive layout (mobile + desktop)

### CMS Content Editor (DONE)
- Visual in-page editor with MongoDB persistence
- Image upload with WebP optimization, zoom/pan controls
- Text/textarea/image/list field types
- Admin panel at /admin (password: visuworks2026)

### CMS Layout System (DONE)
- Section visibility, reordering (drag up/down)
- Spacing controls (top/bottom padding, content width)
- Style presets, text alignment, device visibility
- Animations (fade-up, fade-in, slide-left/right)
- Section duplication, reusable layout templates

### "Was wir tun" CMS Integration (DONE — Dec 2025)
- Section heading (Obertitel + Überschrift) editable via CMS
- 3 service items fully CMS-managed: Bild, Kategorie, Überschrift, Beschreibung, Merkmale (comma-separated), Link
- Image fields with upload/zoom/alt-text in admin
- Increased vertical spacing (space-y-32 md:space-y-44)
- Registry keys: services.sectionLabel, services.sectionTitle, services.{0-2}.{image,label,title,desc,features,href}

### Full Site CMS Migration (DONE — March 2026)
- **KontaktPage**: Hero section (label, title, description), Form labels (6 fields), Sidebar (7 fields)
- **DankePage**: Title, subtitle, message, homeBtn, projekteBtn
- **ImpressumPage**: Label, title, subtitle, tocLabel, stand, weitereTexte
- **DatenschutzPage**: Label, title, tocLabel, stand, weitereTexte
- **AGBPage**: Label, title, subtitle, tocLabel, stand, weitereTexte
- **AGBB2BPage**: Label, title, subtitle, tocLabel, stand, weitereTexte
- **ProjektePage**: heroTitle, heroSubline (already implemented)
- All pages use `useEditable()` hook from EditorContext
- Registry.js updated with field definitions for all pages

### Contact Form (DONE)
- IONOS SMTP integration with error handling and rate limiting

### SEO (DONE)
- JSON-LD schemas, meta tags, alt attributes, keyword strategy

### Language Switcher (DONE)
- DE/EN toggle via Context API

### Mobile Responsiveness (DONE)
- Full mobile overhaul completed

## Backlog

### P2 — Cookie Consent Logic
- DSGVO-compliant gating of analytics/tracking scripts behind cookie banner acceptance

### P2 — Content Expansion
- Blog/News, Careers, Partners pages

## DB Collections
- `content_overrides`: {key, type, value}
- `layout_settings`: {page, sections, imageDefaults, updatedAt}
- `layout_templates`: {name, layout, updatedAt}

## Key API Endpoints
- POST /api/contact — form submission
- POST /api/editor/content — save content
- POST /api/editor/layout/{page} — save layout
- GET /api/content/overrides — public content
- GET /api/editor/layout — public layout

## Credentials
- Admin: /admin, password visuworks2026
- IONOS SMTP: configured in backend/.env
