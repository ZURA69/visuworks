# VISUWORKS Content Editor

## Übersicht

Der Visual Content Editor erlaubt es, Texte und Bilder der Website direkt im Browser zu bearbeiten — ohne Code-Änderungen.

Änderungen werden in MongoDB gespeichert und sind sofort für alle Besucher sichtbar.

## Zugang

1. Öffne `/admin` im Browser
2. Passwort eingeben (Standard: `visuworks2026`)
3. Klicke **"Editor aktivieren"**
4. Navigiere frei durch die Website — die Editor-Sidebar erscheint rechts

## Editor-Funktionen

| Funktion | Beschreibung |
|---|---|
| **Live-Editing** | Textänderungen werden sofort in der Vorschau angezeigt |
| **Bild-Upload** | Drag & Drop oder Klick zum Hochladen (JPG, PNG, WebP, max. 12MB) |
| **Suche** | Feld schnell finden über die Suchleiste |
| **Speichern** | Klick auf "Speichern" → Änderungen in MongoDB persistiert |
| **Zurücksetzen** | Pro Seite oder global alle Overrides löschen |

## Architektur

```
/src/content/*.js     ← Standard-Inhalte (Fallback)
MongoDB collection    ← Overrides (überschreiben Fallback)
```

**Logik:** Override vorhanden → Override verwenden. Kein Override → Fallback aus Dateien.

## Editierbare Inhalte

- **Homepage:** Hero-Überschrift, Untertitel, CTAs, Hero-Bild, Statistiken, Zielgruppen, Prozessschritte, Testimonials, CTA-Section
- **Projekte:** Titel, Untertitel, Kategorie, Beschreibungstexte, Thumbnails
- **Global:** Firmenname, Tagline, Beschreibung, Telefon, E-Mail

## ENV-Variablen

| Variable | Datei | Beschreibung |
|---|---|---|
| `ADMIN_PASSWORD` | `/app/backend/.env` | Passwort für den Editor-Zugang |
| `MONGO_URL` | `/app/backend/.env` | MongoDB-Verbindungsstring |

## API-Endpunkte

| Methode | Route | Auth | Beschreibung |
|---|---|---|---|
| GET | `/api/content/overrides` | Nein | Alle Overrides (öffentlich) |
| POST | `/api/admin/login` | Nein | Login mit Passwort |
| GET | `/api/admin/overrides` | Ja | Overrides abrufen (Admin) |
| POST | `/api/admin/overrides` | Ja | Overrides speichern (Bulk Upsert) |
| DELETE | `/api/admin/overrides?page=/` | Ja | Overrides einer Seite löschen |
| DELETE | `/api/admin/overrides/all` | Ja | Alle Overrides löschen |
| POST | `/api/admin/upload` | Ja | Bild hochladen |

## Zurücksetzen / Revert

- **Pro Seite:** Klicke den Reset-Button (Pfeil-Icon) in der Sidebar
- **Global:** Gehe zu `/admin` → "Alle Overrides zurücksetzen"
- Die Website fällt automatisch auf die Standard-Inhalte aus `/src/content/*.js` zurück

## Technische Details

- **DB Collection:** `content_overrides` (Index: `key` unique, `page`)
- **Upload-Verzeichnis:** `/frontend/public/uploads/`
- **Frontend-Hook:** `useEditable(key, fallback)` — gibt Override oder Fallback zurück
- **Kein Overhead:** Ohne Editor-Modus wird nur ein leichtgewichtiger API-Call zum Laden der Overrides gemacht
