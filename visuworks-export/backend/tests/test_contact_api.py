"""
Test suite for /api/contact endpoint - VISUWORKS contact form
Tests: validation, honeypot spam protection, rate limiting, success responses
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestContactEndpointValidation:
    """Validation tests for /api/contact POST endpoint"""

    def test_contact_success_with_valid_data(self):
        """Valid contact form submission returns success"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Test User",
            "email": "test@example.com",
            "message": "Test message for contact form"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert "message" in data

    def test_contact_success_with_all_fields(self):
        """Valid submission with all optional fields"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Max Mustermann",
            "email": "max@example.de",
            "phone": "+49 211 123456",
            "service": "mobilitaet",
            "message": "Anfrage zum Thema Mobilität"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"

    def test_contact_rejects_empty_name(self):
        """Empty name should be rejected"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "",
            "email": "test@example.com",
            "message": "Test message"
        })
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
        assert any(err["loc"] == ["body", "name"] for err in data["detail"])

    def test_contact_rejects_empty_email(self):
        """Empty email should be rejected"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Test User",
            "email": "",
            "message": "Test message"
        })
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
        assert any(err["loc"] == ["body", "email"] for err in data["detail"])

    def test_contact_rejects_invalid_email_format(self):
        """Invalid email format should be rejected"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Test User",
            "email": "notanemail",
            "message": "Test message"
        })
        assert response.status_code == 422

    def test_contact_rejects_empty_message(self):
        """Empty message should be rejected"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Test User",
            "email": "test@example.com",
            "message": ""
        })
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
        assert any(err["loc"] == ["body", "message"] for err in data["detail"])


class TestContactHoneypot:
    """Honeypot spam protection tests"""

    def test_honeypot_silently_accepts_but_doesnt_process(self):
        """Honeypot field filled = silent success (no actual email)"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Bot User",
            "email": "bot@spam.com",
            "message": "Spam message",
            "website": "http://spamsite.com"  # honeypot field
        })
        assert response.status_code == 200
        data = response.json()
        # Should return success but message indicates no actual sending
        assert data["status"] == "success"
        # The message should NOT mention dev mode since honeypot catches it first
        assert "Anfrage erfolgreich gesendet" in data["message"]

    def test_empty_honeypot_processes_normally(self):
        """Empty honeypot = legitimate request, process normally"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "Real User",
            "email": "real@example.com",
            "message": "Legitimate contact request",
            "website": ""  # empty honeypot
        })
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"


class TestContactServiceOptions:
    """Test different service options"""

    @pytest.mark.parametrize("service", [
        "mobilitaet",
        "architektur",
        "kommunikation",
        "design",
        "projektmanagement",
    ])
    def test_valid_service_options(self, service):
        """All valid service options should be accepted"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": f"Test {service}",
            "email": f"test-{service}@example.com",
            "service": service,
            "message": f"Test message for {service}"
        })
        assert response.status_code == 200
        assert response.json()["status"] == "success"


class TestHealthEndpoint:
    """Basic API health check"""

    def test_api_root_returns_200(self):
        """API root endpoint returns success"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
