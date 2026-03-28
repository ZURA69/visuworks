# VISUWORKS - Deployment Guide

## Projektübersicht

VISUWORKS ist eine Full-Stack-Webanwendung mit:
- **Frontend**: React 19 + TailwindCSS + Framer Motion
- **Backend**: FastAPI (Python 3.11+)
- **Datenbank**: MongoDB
- **Features**: CMS Content Editor, Layout System, SMTP Kontaktformular

---

## Option 1: Lokale Entwicklung

### Voraussetzungen
- Node.js 18+ & Yarn
- Python 3.11+
- MongoDB 6+

### Installation

```bash
# Repository klonen
git clone <your-repo-url>
cd visuworks

# Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# .env Datei mit eigenen Werten ausfüllen

# Frontend Setup
cd ../frontend
yarn install
cp .env.example .env
# .env Datei anpassen

# MongoDB starten (lokal)
mongod --dbpath /path/to/data

# Backend starten
cd ../backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend starten (neues Terminal)
cd ../frontend
yarn start
```

---

## Option 2: Docker Deployment (Empfohlen)

### Mit Docker Compose

```bash
# Alles starten
docker-compose up -d

# Logs anzeigen
docker-compose logs -f

# Stoppen
docker-compose down
```

Die App ist dann erreichbar unter:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- MongoDB: localhost:27017

---

## Option 3: Getrennte Deployments

### Frontend auf Vercel

1. Repository auf GitHub pushen
2. Vercel mit GitHub verbinden
3. Build-Einstellungen:
   - Framework: Create React App
   - Build Command: `yarn build`
   - Output Directory: `build`
4. Environment Variables setzen:
   ```
   REACT_APP_BACKEND_URL=https://api.visuworks.de
   ```

### Backend auf Railway / Render / VPS

1. Repository verbinden oder Docker Image deployen
2. Environment Variables setzen (siehe unten)
3. Port 8001 freigeben

---

## Option 4: VPS Deployment (Ubuntu/Debian)

### Server Setup

```bash
# System aktualisieren
sudo apt update && sudo apt upgrade -y

# Dependencies installieren
sudo apt install -y nginx python3 python3-pip python3-venv nodejs npm mongodb-org certbot python3-certbot-nginx

# Yarn installieren
npm install -g yarn

# MongoDB starten
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Projekt deployen

```bash
# Projekt klonen
cd /var/www
git clone <repo-url> visuworks
cd visuworks

# Backend Setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
nano .env  # Werte eintragen

# Frontend Setup & Build
cd ../frontend
yarn install
cp .env.example .env
nano .env  # Backend URL eintragen
yarn build
```

### Systemd Services

Backend Service (`/etc/systemd/system/visuworks-backend.service`):
```ini
[Unit]
Description=VISUWORKS Backend API
After=network.target mongodb.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/visuworks/backend
Environment="PATH=/var/www/visuworks/backend/venv/bin"
ExecStart=/var/www/visuworks/backend/venv/bin/uvicorn server:app --host 127.0.0.1 --port 8001 --workers 2
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

### Nginx Konfiguration

```nginx
# /etc/nginx/sites-available/visuworks
server {
    listen 80;
    server_name visuworks.de www.visuworks.de;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name visuworks.de www.visuworks.de;

    ssl_certificate /etc/letsencrypt/live/visuworks.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/visuworks.de/privkey.pem;

    # Frontend (Static Build)
    root /var/www/visuworks/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads/ {
        alias /var/www/visuworks/frontend/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

### SSL Zertifikat (Let's Encrypt)

```bash
sudo certbot --nginx -d visuworks.de -d www.visuworks.de
```

### Services starten

```bash
sudo systemctl daemon-reload
sudo systemctl enable visuworks-backend
sudo systemctl start visuworks-backend
sudo systemctl restart nginx
```

---

## Umgebungsvariablen

### Backend (.env)

```env
# Datenbank
MONGO_URL=mongodb://localhost:27017
DB_NAME=visuworks

# Admin
ADMIN_PASSWORD=IhrSicheresPasswort123!

# SMTP (Kontaktformular)
IONOS_SMTP_HOST=smtp.ionos.de
IONOS_SMTP_PORT=587
IONOS_SMTP_USER=info@visuworks.de
IONOS_SMTP_PASS="IhrSMTPPasswort"
CONTACT_TO_EMAIL=info@visuworks.de
CONTACT_FROM_EMAIL=info@visuworks.de

# CORS
CORS_ORIGINS=https://visuworks.de,https://www.visuworks.de
```

### Frontend (.env)

```env
REACT_APP_BACKEND_URL=https://visuworks.de
```

---

## Datenbank-Backup

### Export

```bash
mongodump --db visuworks --out /backup/$(date +%Y%m%d)
```

### Import

```bash
mongorestore --db visuworks /backup/20260328/visuworks
```

---

## Wartung

### Logs prüfen

```bash
# Backend Logs
sudo journalctl -u visuworks-backend -f

# Nginx Logs
sudo tail -f /var/log/nginx/error.log
```

### Updates deployen

```bash
cd /var/www/visuworks
git pull

# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart visuworks-backend

# Frontend
cd ../frontend
yarn install
yarn build
```

---

## Support

Bei Fragen zur Anwendung: info@visuworks.de
