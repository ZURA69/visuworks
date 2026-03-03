from fastapi import FastAPI, APIRouter, HTTPException, Request, Header, UploadFile, File
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import time
from typing import Any
from collections import defaultdict
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import shutil


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Admin config
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', '')
UPLOAD_DIR = Path(__file__).parent.parent / 'frontend' / 'public' / 'uploads'
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
MAX_UPLOAD_SIZE = 12 * 1024 * 1024  # 12MB

async def verify_admin(authorization: str = Header(None)):
    if not ADMIN_PASSWORD:
        raise HTTPException(status_code=503, detail="Admin not configured")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.replace("Bearer ", "")
    if token != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return True

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Resend configuration
resend_api_key = os.environ.get('RESEND_API_KEY', '')
contact_to_email = os.environ.get('CONTACT_TO_EMAIL', 'info@visuworks.de')
contact_from_email = os.environ.get('CONTACT_FROM_EMAIL', 'no-reply@visuworks.de')

if resend_api_key:
    resend.api_key = resend_api_key

# Basic rate limiter (IP-based, in-memory)
rate_limit_store = defaultdict(list)
RATE_LIMIT_MAX = 5  # max requests
RATE_LIMIT_WINDOW = 300  # per 5 minutes

def check_rate_limit(ip: str) -> bool:
    now = time.time()
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if now - t < RATE_LIMIT_WINDOW]
    if len(rate_limit_store[ip]) >= RATE_LIMIT_MAX:
        return False
    rate_limit_store[ip].append(now)
    return True


# Contact form models
class ContactFormRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    phone: Optional[str] = Field(default='', max_length=50)
    service: Optional[str] = Field(default='', max_length=100)
    message: str = Field(..., min_length=1, max_length=5000)
    honeypot: Optional[str] = Field(default='', alias='website')


SERVICE_LABELS = {
    'mobilitaet': 'Mobilität',
    'architektur': 'Raum & Architektur',
    'kommunikation': 'Markenkommunikation',
    'design': 'Design & Konzeption',
    'projektmanagement': 'Projektmanagement',
}

def format_contact_email(data: ContactFormRequest) -> str:
    service_label = SERVICE_LABELS.get(data.service, data.service or 'Nicht angegeben')
    phone_row = f"""
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Telefon</td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px;">{data.phone}</td>
        </tr>""" if data.phone else ''

    return f"""
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #070910; padding: 32px; border-radius: 16px 16px 0 0;">
        <h1 style="color: #ffffff; font-size: 20px; margin: 0;">Neue Projektanfrage</h1>
        <p style="color: #9ca3af; font-size: 14px; margin: 8px 0 0;">via visuworks.de Kontaktformular</p>
      </div>
      <div style="background: #ffffff; padding: 0; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; width: 120px;">Name</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 600;">{data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">E-Mail</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px;"><a href="mailto:{data.email}" style="color: #4f46e5;">{data.email}</a></td>
          </tr>{phone_row}
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Leistung</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px;">{service_label}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; color: #6b7280; font-size: 14px; vertical-align: top;">Nachricht</td>
            <td style="padding: 12px 16px; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">{data.message}</td>
          </tr>
        </table>
      </div>
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">
        Gesendet am {datetime.utcnow().strftime('%d.%m.%Y um %H:%M Uhr')} (UTC)
      </p>
    </div>"""


@api_router.post("/contact")
async def submit_contact_form(data: ContactFormRequest, request: Request):
    # Honeypot check
    if data.honeypot:
        logger.warning(f"Honeypot triggered from {request.client.host}")
        return {"status": "success", "message": "Anfrage erfolgreich gesendet"}

    # Rate limit check
    client_ip = request.client.host
    if not check_rate_limit(client_ip):
        raise HTTPException(status_code=429, detail="Zu viele Anfragen. Bitte versuchen Sie es später erneut.")

    # If no Resend API key configured, log and return success (dev mode)
    if not resend_api_key:
        logger.info(f"[DEV MODE] Contact form from {data.name} ({data.email}): {data.service}")
        return {
            "status": "success",
            "message": "Anfrage erfolgreich gesendet (Entwicklungsmodus – E-Mail wird gesendet, sobald der API-Key konfiguriert ist)"
        }

    # Send email via Resend
    service_label = SERVICE_LABELS.get(data.service, data.service or 'Allgemein')
    subject = f"Neue Anfrage: {service_label} – {data.name}"

    params = {
        "from": contact_from_email,
        "to": [contact_to_email],
        "reply_to": data.email,
        "subject": subject,
        "html": format_contact_email(data),
    }

    try:
        email_result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent successfully: {email_result.get('id', 'unknown')}")
        return {
            "status": "success",
            "message": "Anfrage erfolgreich gesendet"
        }
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        raise HTTPException(status_code=500, detail="Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.")

# ── Public Content Override (no auth needed) ──

@api_router.get("/content/overrides")
async def get_public_overrides():
    cursor = db.content_overrides.find({}, {"_id": 0, "key": 1, "value": 1})
    overrides = await cursor.to_list(2000)
    result = {}
    for o in overrides:
        result[o["key"]] = o["value"]
    return {"overrides": result}

# ── Admin Routes ──

class AdminLoginRequest(BaseModel):
    password: str

class OverrideEntry(BaseModel):
    key: str
    value: Any
    type: str = 'text'
    page: Optional[str] = ''

class BulkOverrideRequest(BaseModel):
    overrides: List[OverrideEntry]

@api_router.post("/admin/login")
async def admin_login(body: AdminLoginRequest):
    if not ADMIN_PASSWORD or body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Ungültiges Passwort")
    return {"status": "ok", "token": ADMIN_PASSWORD}

@api_router.get("/admin/overrides")
async def get_overrides(page: Optional[str] = None, authorization: str = Header(None)):
    await verify_admin(authorization)
    query = {}
    if page:
        query["page"] = page
    cursor = db.content_overrides.find(query, {"_id": 0})
    overrides = await cursor.to_list(2000)
    return {"overrides": overrides}

@api_router.post("/admin/overrides")
async def save_overrides(body: BulkOverrideRequest, authorization: str = Header(None)):
    await verify_admin(authorization)
    from pymongo import UpdateOne
    operations = []
    now = datetime.now(timezone.utc)
    for entry in body.overrides:
        operations.append(UpdateOne(
            {"key": entry.key},
            {"$set": {
                "key": entry.key,
                "value": entry.value,
                "type": entry.type,
                "page": entry.page or '',
                "updatedAt": now,
            }},
            upsert=True
        ))
    if operations:
        await db.content_overrides.bulk_write(operations)
    return {"status": "ok", "count": len(operations)}

@api_router.delete("/admin/overrides")
async def delete_overrides(page: Optional[str] = None, key: Optional[str] = None, authorization: str = Header(None)):
    await verify_admin(authorization)
    if key:
        await db.content_overrides.delete_one({"key": key})
    elif page:
        await db.content_overrides.delete_many({"page": page})
    return {"status": "ok"}

@api_router.delete("/admin/overrides/all")
async def delete_all_overrides(authorization: str = Header(None)):
    await verify_admin(authorization)
    result = await db.content_overrides.delete_many({})
    return {"status": "ok", "deleted": result.deleted_count}

@api_router.post("/admin/upload")
async def upload_image(file: UploadFile = File(...), authorization: str = Header(None)):
    await verify_admin(authorization)
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Ungültiger Dateityp. Erlaubt: {', '.join(ALLOWED_EXTENSIONS)}")
    contents = await file.read()
    if len(contents) > MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=400, detail=f"Datei zu groß. Maximum: {MAX_UPLOAD_SIZE // (1024*1024)}MB")
    try:
        from PIL import Image as PILImage
        import io
        img = PILImage.open(io.BytesIO(contents))
        max_dim = 2400
        if max(img.size) > max_dim:
            img.thumbnail((max_dim, max_dim), PILImage.LANCZOS)
        if img.mode in ('RGBA', 'LA', 'PA'):
            img = img.convert('RGBA')
        else:
            img = img.convert('RGB')
        output = io.BytesIO()
        img.save(output, format='WEBP', quality=82, method=4)
        optimized = output.getvalue()
        filename = f"{uuid.uuid4().hex}.webp"
        filepath = UPLOAD_DIR / filename
        with open(filepath, "wb") as f:
            f.write(optimized)
        return {"status": "ok", "url": f"/uploads/{filename}", "filename": filename}
    except Exception as e:
        logging.warning(f"Image optimization failed, saving raw: {e}")
        filename = f"{uuid.uuid4().hex}{ext}"
        filepath = UPLOAD_DIR / filename
        with open(filepath, "wb") as f:
            f.write(contents)
        return {"status": "ok", "url": f"/uploads/{filename}", "filename": filename}

@api_router.get("/health")
async def health_check():
    return {"status": "ok"}

# Include the router in the main app (must be after all routes are defined)
app.include_router(api_router)

@app.on_event("startup")
async def startup_db_index():
    await db.content_overrides.create_index("key", unique=True)
    await db.content_overrides.create_index("page")
    logger.info("MongoDB indexes ensured for content_overrides")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
