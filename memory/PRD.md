# VISUWORKS — Product Requirements Document

## Original Problem Statement
Fully designed, premium, multi-page website for a European visual branding company called VISUWORKS. High-end with unified light/warm-minimal design system and a powerful CMS for content and layout management.

## User Personas
- **VISUWORKS Team**: Uses the CMS to update content, images, layout order, spacing, style, visibility, and animations. Can save/load layout templates.
- **Prospective Clients**: Browse services, portfolio, and contact form. Premium Apple-like aesthetic.
- **Legal Visitors**: Access Impressum, Datenschutz, AGB for compliance.

## Architecture
```
/app/
├── backend/
│   ├── server.py          # FastAPI (SMTP + CMS Content + Layout + Template APIs)
│   └── uploads/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── editor/
│   │   │       ├── EditorSidebar.jsx   # Content + Layout tabs (all controls)
│   │   │       └── LayoutSection.jsx   # Section/Container wrappers with presets/animations
│   │   ├── content/       # Fallback content
│   │   ├── contexts/      # EditorContext (content + layout + templates), LanguageContext
│   │   └── pages/         # All page templates
```

## CMS Layout System — Complete

### Phase 1 (Done):
- Section visibility (on/off toggle)
- Section order (up/down arrows)
- Padding controls (top/bottom: none/small/medium/large/xl)
- Content width (narrow 900px / normal 1400px / wide 1600px)
- Image defaults (fit: cover/contain, aspect: auto/16:9/4:3/1:1)

### Phase 2 (Done — Dec 2025):
- **Style Presets**: default, card (white+border), accent (dark bg), muted (warm bg), highlight (border)
- **Alignment**: left / center per section
- **Device Visibility**: all / desktop-only / mobile-only (responsive CSS classes)
- **CTA Controls**: Toggle per section with configurable label + href
- **Animation Types**: none, fade-up, fade-in, slide-left, slide-right (Framer Motion)
- **Duplicate Section**: Copy all settings from one section to another
- **Reusable Templates**: Save, load, delete layout configurations (MongoDB persisted)

### API Endpoints:
- `GET /api/editor/layout?page=home` — Public layout settings
- `POST /api/admin/layout` — Save layout (admin)
- `GET /api/editor/templates` — List all saved templates
- `DELETE /api/admin/template/{name}` — Delete template (admin)

### DB Schema:
- **Collection**: `layout_settings`
  - `page` (string, unique), `sections` (dict), `imageDefaults` (dict), `updatedAt` (datetime)
  - Templates stored with page = `template:{name}`

### Section Settings Schema:
```json
{
  "visible": true,
  "order": 0,
  "paddingTop": "medium",
  "paddingBottom": "medium",
  "contentWidth": "normal",
  "preset": "default",
  "alignment": "left",
  "deviceVisibility": "all",
  "cta": { "enabled": false, "label": "", "href": "" },
  "animation": "fade-up"
}
```

## What's Implemented
- [x] Full multi-page React site with FastAPI backend
- [x] Visual Content Editor (MongoDB, EditorSidebar, EditableImage zoom/pan)
- [x] CMS Layout System Phase 1 (visibility, order, padding, width, image defaults)
- [x] CMS Layout System Phase 2 (presets, alignment, device visibility, CTA, animation, duplicate, templates)
- [x] Contact Form with IONOS SMTP
- [x] Language Switcher (DE/EN)
- [x] Scroll-pinned Keyword Hero (Framer Motion)
- [x] SEO optimization (meta, JSON-LD, keywords)
- [x] Mobile responsiveness
- [x] Cookie consent banner (DSGVO)
- [x] Unified light theme across ALL public pages

## Prioritized Backlog

### P1
- CMS Preview Mode: Toggle to view unsaved drafts before publishing

### P2 (Future)
- Hero Video Integration
- Content Expansion: Blog/News, Careers, Partners pages
- Layout controls extended to service pages

## Credentials
- Admin: `/admin`, password: `visuworks2026`
- SMTP: IONOS config in `backend/.env`
