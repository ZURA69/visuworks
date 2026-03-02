from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import time
from collections import defaultdict
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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

# Include the router in the main app (must be after all routes are defined)
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
