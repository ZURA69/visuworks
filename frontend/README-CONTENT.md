# VISUWORKS Content Editor – Bild-Verwaltung

## Übersicht

Der Visual Content Editor ermöglicht die Verwaltung aller Bilder und Texte auf der Website.
Jedes Bild hat einen eindeutigen Content-Key und kann über die Editor-Sidebar bearbeitet werden.

## Zugang

1. Navigiere zu `/admin`
2. Passwort eingeben
3. „Editor aktivieren" klicken
4. Auf jede Seite navigieren – die Sidebar zeigt die verfügbaren Felder

## Bild bearbeiten

### Bild ersetzen
- In der Sidebar den Bereich „Hero-Bild" / „Projektbilder" / „Projekt-Galerie" öffnen
- „Bild ersetzen" klicken oder Datei per Drag & Drop ablegen
- Erlaubte Formate: JPG, PNG, WebP (max. 12 MB)
- Bilder werden automatisch komprimiert und zu WebP konvertiert

### Zoom
- Zoom-Slider in der Sidebar verwenden (1.0x – 2.0x)
- Bei Zoom > 1.0 kann das Bild verschoben werden

### Positionierung (Drag-to-Reposition)
- Bei Zoom > 1.0: Bild auf der Seite anklicken und ziehen
- Das Bild bewegt sich innerhalb des Rahmens
- Position wird beim Speichern übernommen

### Alt-Text
- Optional: Alt-Text im Textfeld unter dem Bild eingeben
- Wichtig für Barrierefreiheit und SEO

### Zurücksetzen
- Hover über das Vorschaubild → Reset-Button klickt
- Setzt Bild, Zoom und Position auf die Standardwerte zurück

## Bildschlüssel (Image Keys)

### Homepage (`/`)
| Key | Beschreibung | Empfohlene Größe |
|-----|-------------|-----------------|
| `images.hero.src` | Hero-Hintergrundbild | 1920x1080, 16:9 |

### Service-Seiten
| Key | Seite | Empfohlene Größe |
|-----|-------|-----------------|
| `images.service.mobilitaet.hero` | /mobilitaet | 1200x900, 4:3 |
| `images.service.architektur.hero` | /architektur-raum | 1200x900, 4:3 |
| `images.service.markenkommunikation.hero` | /markenkommunikation | 1200x900, 4:3 |
| `images.service.design.hero` | /design-konzepte | 1200x900, 4:3 |
| `images.service.projektmanagement.hero` | /projektmanagement | 1200x900, 4:3 |

### Projekte-Übersicht (`/projekte`)
| Key | Beschreibung | Empfohlene Größe |
|-----|-------------|-----------------|
| `images.projects.{slug}.thumbnail` | Projektbild im Grid | 800x600, 4:3 |

### Projekt-Detail (`/projekte/{slug}`)
| Key | Beschreibung | Empfohlene Größe |
|-----|-------------|-----------------|
| `images.projects.{slug}.thumbnail` | Hero-/Hauptbild | 1920x1080, 16:9 |
| `images.projects.{slug}.gallery.0` | Galerie-Bild 1 | 800x600, 4:3 |
| `images.projects.{slug}.gallery.1` | Galerie-Bild 2 | 800x600, 4:3 |
| `images.projects.{slug}.gallery.N` | Galerie-Bild N+1 | 800x600, 4:3 |

## Datenmodell

Bildübersteuerungen werden in MongoDB (`content_overrides`) gespeichert:

```json
{
  "key": "images.service.mobilitaet.hero",
  "type": "image",
  "value": {
    "url": "/uploads/abc123.webp",
    "zoom": 1.3,
    "offsetX": 5.2,
    "offsetY": -3.1,
    "alt": "Porsche GT3 Cup Folierung"
  },
  "page": "/mobilitaet",
  "updatedAt": "2026-02-15T10:30:00Z"
}
```

## Tipps

- **Bildqualität**: Bilder werden serverseitig auf max. 2400px und WebP-Format optimiert
- **Ladezeit**: Alle Bilder nutzen Lazy Loading. Hero-Bilder haben Lade-Priorität
- **Fallback**: Ohne Überschreibung wird immer das Standardbild aus `/src/content` angezeigt
- **Sicherheit**: Nur authentifizierte Admins können Bilder hochladen und bearbeiten
