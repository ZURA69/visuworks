# VISUWORKS Website — PRD

## Original Problem Statement
Build a fully designed, premium, multi-page website for a European visual branding company called VISUWORKS. German language, dark theme, with a visual content editor for live content management.

## Architecture
```
/app/backend/server.py     -> FastAPI (contact form with IONOS SMTP, admin, editor APIs, health, image upload+Pillow optimization)
/app/frontend/src/
  ├── components/
  │   ├── EditableImage.jsx       -> Image component with zoom/offset, drag-to-reposition
  │   └── editor/EditorSidebar.jsx -> Admin sidebar with zoom slider, alt text, reset
  ├── content/
  │   ├── registry.js             -> ALL editable fields (text + images) per page
  │   └── images.js               -> Static image map (all .webp)
  ├── contexts/
  │   ├── EditorContext.jsx       -> Editor state, getValue, setValue, save (supports objects)
  │   └── LanguageContext.jsx     -> DE/EN language switching
  ├── config/
  │   ├── seo.js                  -> SEO config, structured data schemas
  │   └── keywords.js             -> Keyword strategy for German market
  ├── i18n/translations.js        -> All UI text translations DE/EN
  ├── services/contactService.js  -> Contact form API integration
  └── pages/                      -> All pages using useEditor() + EditableImage
```

## What's Implemented

### Pre-Deployment Audit Completed (March 2026)
- ✅ 100% Backend tests passed (14/14)
- ✅ 100% Frontend functionality verified
- ✅ All navigation and routing working
- ✅ Mobile responsive (375px, 768px, 1920px)
- ✅ Legal compliance (Impressum, Datenschutz, AGB)
- ✅ SEO configured with structured data

### Contact Form with IONOS SMTP
- Production-ready email sending via IONOS SMTP server
- STARTTLS (port 587) with SSL fallback (port 465)
- Professional HTML email template with VISUWORKS branding
- Rate limiting: max 5 requests per IP in 10 minutes
- Honeypot field for bot protection

### Visual Content Editor
- ALL text and images editable via admin UI
- Image zoom/pan controls with MongoDB persistence
- Password-protected admin access

### Language Switcher (DE/EN)
- Toggle button in header
- All navigation and UI text translated
- Language saved in localStorage

### SEO Implementation
- Keyword-optimized meta titles and descriptions
- 6 JSON-LD structured data schemas
- Sitemap.xml and robots.txt
- Geo tags for local SEO (Hilden, NRW)

### Image Optimization
- 57 WebP images (18MB total)
- Lazy loading implemented
- Server-side Pillow optimization

## Key API Endpoints
- `GET /api/health`
- `POST /api/contact` (IONOS SMTP)
- `GET /api/content/overrides`
- `POST /api/admin/overrides`
- `POST /api/admin/upload`
- `POST /api/admin/login`

## Company Information
```
Name: visuworks visual work labs GmbH
Location: Hilden, NRW, Germany
Email: info@visuworks.de
Phone: +49 151 72615378
```

## Environment Variables
```
# backend/.env
MONGO_URL, DB_NAME, CORS_ORIGINS, ADMIN_PASSWORD
IONOS_SMTP_HOST, IONOS_SMTP_PORT, IONOS_SMTP_USER, IONOS_SMTP_PASS
CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

# frontend/.env
REACT_APP_BACKEND_URL
```

## Deployment Status
**PRODUCTION READY** ✅

See `/app/DEPLOYMENT_AUDIT_REPORT.md` for full audit details.

## Prioritized Backlog

### Completed ✅
- [x] IONOS SMTP Integration
- [x] Language Switcher (DE/EN)
- [x] SEO Keyword Implementation
- [x] Mobile Responsiveness Optimization
- [x] Pre-Deployment Audit

### P1 — Next Up
- Hero video integration (user to provide video file)
- Google Analytics 4 + DSGVO cookie consent optimization

### P2 — Future
- Blog/News section
- Advanced analytics tracking
- Careers page
- Partners page
