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
  ├── contexts/EditorContext.jsx   -> Editor state, getValue, setValue, save (supports objects)
  ├── services/contactService.js   -> Contact form API integration with pagePath tracking
  └── pages/                      -> All pages using useEditor() + EditableImage
```

## What's Implemented

### Contact Form with IONOS SMTP (December 2025)
- Production-ready email sending via IONOS SMTP server
- STARTTLS (port 587) with SSL fallback (port 465)
- Professional HTML email template with VISUWORKS branding
- Rate limiting: max 5 requests per IP in 10 minutes
- Honeypot field for bot protection
- Email includes: Name, Email, Phone, Service, Message, Page Path, Timestamp, IP Address
- Reply-To header set to customer's email for easy response
- Proper error handling with German error messages

### Visual Content Editor - ALL content editable
**Text fields:** Hero titles, descriptions, service items, FAQs, CTAs, project details
**Image fields:**
- Homepage hero image (zoom, offset, alt)
- 5 service page hero images (replaced icon placeholders with real photos)
- 18+ project thumbnails (grid + detail pages)
- Project gallery images (per project)
- All with zoom slider (1.0-2.0x), drag-to-reposition, alt text, reset

### Image Optimization Pipeline
- Client-side: Canvas API compression >500KB, resize to 1920px max, WebP
- Server-side: Pillow optimization, resize to 2400px max, WebP Q82
- All 57 static images: 160MB -> 17MB (89% reduction)
- Lazy loading on all non-hero images, fetchPriority="high" on heroes

### Image Override Data Model
```json
{
  "key": "images.service.mobilitaet.hero",
  "type": "image",
  "value": { "url": "/uploads/x.webp", "zoom": 1.3, "offsetX": 5, "offsetY": -3, "alt": "..." },
  "page": "/mobilitaet",
  "updatedAt": "2026-03-03T..."
}
```

### Other Features
- /api/health endpoint
- Admin login with password protection
- Legal pages (Impressum, AGB B2C, AGB B2B, Datenschutz)
- Responsive design, SEO meta tags

## Key API Endpoints
- `GET /api/health`
- `POST /api/contact` (IONOS SMTP email sending)
- `GET /api/content/overrides` (returns text strings + image objects)
- `POST /api/admin/overrides` (accepts text strings + image objects)
- `POST /api/admin/upload` (Pillow optimization + WebP conversion)
- `POST /api/admin/login`

## Environment Variables
```
# backend/.env
IONOS_SMTP_HOST=smtp.ionos.de
IONOS_SMTP_PORT=587
IONOS_SMTP_USER=info@visuworks.de
IONOS_SMTP_PASS=<password>
CONTACT_TO_EMAIL=info@visuworks.de
CONTACT_FROM_EMAIL=info@visuworks.de
ADMIN_PASSWORD=<password>
```

## Credentials
- Admin: ADMIN_PASSWORD in /app/backend/.env
- Contact Form: IONOS SMTP credentials in /app/backend/.env

## Prioritized Backlog

### P1 — Next Up
- Language switcher (DE/EN)
- Hero video on homepage

### P2 — Future
- Google Analytics 4 + DSGVO cookie consent
- Lighthouse >90, Structured Data SEO
- Blog, Careers, Partners pages
