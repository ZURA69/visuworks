# VISUWORKS Website

Premium-Website für visuelle Markenkommunikation mit integriertem CMS.

## Features

- **Content Management System**: Visueller Editor für alle Texte und Bilder
- **Layout System**: Sektionen umordnen, ein-/ausblenden, Abstände anpassen
- **Kontaktformular**: SMTP-basierter E-Mail-Versand
- **Responsive Design**: Optimiert für alle Geräte
- **SEO**: Strukturierte Daten, Meta-Tags, Sitemap

## Technologie

- **Frontend**: React 19, TailwindCSS, Framer Motion
- **Backend**: FastAPI (Python)
- **Datenbank**: MongoDB
- **Deployment**: Docker / VPS / Vercel

## Schnellstart

### Mit Docker (empfohlen)

```bash
# .env Dateien erstellen
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Container starten
docker-compose up -d

# Öffne http://localhost:3000
```

### Manuelle Installation

Siehe [DEPLOYMENT.md](./DEPLOYMENT.md) für detaillierte Anweisungen.

## Projektstruktur

```
visuworks/
├── frontend/           # React Frontend
│   ├── src/
│   │   ├── components/ # UI Komponenten
│   │   ├── pages/      # Seiten
│   │   ├── contexts/   # React Contexts (CMS, Language)
│   │   ├── content/    # CMS Registry & Standardinhalte
│   │   └── i18n/       # Übersetzungen (DE/EN)
│   ├── public/
│   │   └── uploads/    # Hochgeladene Bilder
│   └── Dockerfile
│
├── backend/            # FastAPI Backend
│   ├── server.py       # Hauptanwendung
│   ├── requirements.txt
│   └── Dockerfile
│
├── database/           # Datenbank Scripts
│   └── init-db.js      # MongoDB Initialisierung
│
├── docker-compose.yml  # Docker Orchestrierung
├── DEPLOYMENT.md       # Deployment Anleitung
└── README.md
```

## Umgebungsvariablen

### Backend

| Variable | Beschreibung | Beispiel |
|----------|--------------|----------|
| MONGO_URL | MongoDB Connection String | mongodb://localhost:27017 |
| DB_NAME | Datenbankname | visuworks |
| ADMIN_PASSWORD | Admin Panel Passwort | sicheres-passwort |
| IONOS_SMTP_HOST | SMTP Server | smtp.ionos.de |
| IONOS_SMTP_PORT | SMTP Port | 587 |
| IONOS_SMTP_USER | SMTP Benutzer | info@visuworks.de |
| IONOS_SMTP_PASS | SMTP Passwort | passwort |
| CONTACT_TO_EMAIL | Empfänger | info@visuworks.de |
| CORS_ORIGINS | Erlaubte Origins | https://visuworks.de |

### Frontend

| Variable | Beschreibung | Beispiel |
|----------|--------------|----------|
| REACT_APP_BACKEND_URL | Backend API URL | https://visuworks.de |

## Admin Panel

Zugang: `/admin`  
Passwort: In `ADMIN_PASSWORD` konfiguriert

### Funktionen

- **Content Editor**: Texte und Bilder direkt auf der Seite bearbeiten
- **Layout Tab**: Sektionen neu ordnen, Abstände anpassen
- **Bild-Upload**: Drag & Drop mit automatischer WebP-Konvertierung
- **Vorschau**: Änderungen live sehen vor dem Speichern

## API Endpunkte

| Methode | Pfad | Beschreibung |
|---------|------|--------------|
| GET | /api/health | Health Check |
| POST | /api/contact | Kontaktformular absenden |
| POST | /api/admin/login | Admin Login |
| GET | /api/content/overrides | Alle Content Overrides |
| POST | /api/admin/overrides | Content speichern |
| GET | /api/admin/layout | Layout laden |
| POST | /api/admin/layout | Layout speichern |
| POST | /api/admin/upload | Bild hochladen |

## Lizenz

Proprietär - VISUWORKS GmbH
