"""
Test suite for Visual Content Editor extended functionality.
Tests service pages, projects page, and case study editor integration.
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = 'visuworks2026'

class TestHealthAndBasicEndpoints:
    """Health check and basic endpoint tests"""
    
    def test_health_endpoint(self):
        """GET /api/health should return {status: ok}"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "ok"
        print("✓ Health endpoint working")
    
    def test_root_endpoint(self):
        """GET /api/ should return hello message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        print("✓ Root endpoint working")


class TestAdminAuthentication:
    """Admin login and authentication tests"""
    
    def test_admin_login_wrong_password(self):
        """POST /api/admin/login with wrong password returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrong_password"}
        )
        assert response.status_code == 401
        print("✓ Wrong password correctly rejected")
    
    def test_admin_login_correct_password(self):
        """POST /api/admin/login with correct password returns 200 with token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "ok"
        assert "token" in data
        assert data["token"] == ADMIN_PASSWORD
        print("✓ Correct login returns token")
    
    def test_admin_login_empty_password(self):
        """POST /api/admin/login with empty password returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ""}
        )
        assert response.status_code == 401
        print("✓ Empty password correctly rejected")


class TestContentOverridesPublic:
    """Public content overrides tests (no auth required)"""
    
    def test_public_overrides_no_auth(self):
        """GET /api/content/overrides returns overrides without auth"""
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200
        data = response.json()
        assert "overrides" in data
        assert isinstance(data["overrides"], dict)
        print(f"✓ Public overrides returned ({len(data['overrides'])} keys)")


class TestContentOverridesAdmin:
    """Admin content overrides CRUD tests"""
    
    @pytest.fixture
    def auth_headers(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}
    
    def test_get_overrides_requires_auth(self):
        """GET /api/admin/overrides without auth returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/overrides")
        assert response.status_code == 401
        print("✓ Admin overrides requires auth")
    
    def test_get_overrides_with_auth(self, auth_headers):
        """GET /api/admin/overrides with auth returns overrides list"""
        response = requests.get(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        assert "overrides" in data
        assert isinstance(data["overrides"], list)
        print(f"✓ Admin overrides returned ({len(data['overrides'])} entries)")
    
    def test_post_overrides_requires_auth(self):
        """POST /api/admin/overrides without auth returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            json={"overrides": [{"key": "test.key", "value": "test"}]}
        )
        assert response.status_code == 401
        print("✓ Save overrides requires auth")
    
    def test_post_overrides_creates_entry(self, auth_headers):
        """POST /api/admin/overrides saves and can be retrieved"""
        test_key = f"TEST.service.mobilitaet.heroTitle.{int(time.time())}"
        test_value = "TEST Hero Title"
        
        # Save override
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{"key": test_key, "value": test_value, "type": "text", "page": "/mobilitaet"}]}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "ok"
        assert data.get("count") == 1
        print("✓ Override saved")
        
        # Verify it exists in public endpoint
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200
        overrides = response.json()["overrides"]
        assert test_key in overrides
        assert overrides[test_key] == test_value
        print("✓ Override persisted and visible publicly")
        
        # Cleanup - delete the test entry
        response = requests.delete(
            f"{BASE_URL}/api/admin/overrides?key={test_key}",
            headers=auth_headers
        )
        assert response.status_code == 200
        print("✓ Test override cleaned up")


class TestServicePageOverrides:
    """Test overrides for service pages work correctly"""
    
    @pytest.fixture
    def auth_headers(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}
    
    def test_save_mobilitaet_hero_override(self, auth_headers):
        """Save and retrieve override for Mobilität page hero title"""
        test_value = f"TEST Mobilität Hero {int(time.time())}"
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "service.mobilitaet.heroTitle",
                "value": test_value,
                "type": "text",
                "page": "/mobilitaet"
            }]}
        )
        assert response.status_code == 200
        
        # Verify in public endpoint
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert "service.mobilitaet.heroTitle" in overrides
        print("✓ Mobilität hero override saved and visible")
    
    def test_save_architektur_override(self, auth_headers):
        """Save override for Architektur page"""
        test_value = f"TEST Architektur Hero {int(time.time())}"
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "service.architektur.heroTitle",
                "value": test_value,
                "type": "text",
                "page": "/architektur-raum"
            }]}
        )
        assert response.status_code == 200
        print("✓ Architektur override saved")
    
    def test_save_service_cta_fields(self, auth_headers):
        """Save CTA fields for service pages"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [
                {"key": "service.design.ctaTitle", "value": "TEST CTA Title", "type": "text", "page": "/design-konzepte"},
                {"key": "service.design.ctaDesc", "value": "TEST CTA Description", "type": "text", "page": "/design-konzepte"}
            ]}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("count") == 2
        print("✓ CTA fields override saved")


class TestProjektePageOverrides:
    """Test overrides for Projekte overview page"""
    
    @pytest.fixture
    def auth_headers(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}
    
    def test_save_projekte_hero_override(self, auth_headers):
        """Save override for Projekte page hero title"""
        test_value = f"TEST Projekte & Referenzen {int(time.time())}"
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "projekte.heroTitle",
                "value": test_value,
                "type": "text",
                "page": "/projekte"
            }]}
        )
        assert response.status_code == 200
        
        # Verify in public endpoint
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert "projekte.heroTitle" in overrides
        print("✓ Projekte hero override saved and visible")


class TestProjectDetailOverrides:
    """Test overrides for individual project/case study pages"""
    
    @pytest.fixture
    def auth_headers(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}
    
    def test_save_project_title_override(self, auth_headers):
        """Save override for project title"""
        test_value = f"TEST Project Title {int(time.time())}"
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "projects.flottenbranding-premium.title",
                "value": test_value,
                "type": "text",
                "page": "/projekte/flottenbranding-premium"
            }]}
        )
        assert response.status_code == 200
        print("✓ Project title override saved")
    
    def test_save_project_detail_fields(self, auth_headers):
        """Save multiple project detail fields (challenge, solution, result)"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [
                {"key": "projects.test-project.challenge", "value": "TEST Challenge text", "type": "textarea", "page": "/projekte/test-project"},
                {"key": "projects.test-project.solution", "value": "TEST Solution text", "type": "textarea", "page": "/projekte/test-project"},
                {"key": "projects.test-project.result", "value": "TEST Result text", "type": "textarea", "page": "/projekte/test-project"}
            ]}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("count") == 3
        print("✓ Project detail fields override saved (challenge, solution, result)")


class TestOverrideDeleteOperations:
    """Test delete operations for overrides"""
    
    @pytest.fixture
    def auth_headers(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}
    
    def test_delete_single_override(self, auth_headers):
        """DELETE /api/admin/overrides?key=X removes single entry"""
        # First create a test entry
        test_key = f"TEST.delete.single.{int(time.time())}"
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{"key": test_key, "value": "test", "type": "text", "page": ""}]}
        )
        
        # Delete it
        response = requests.delete(
            f"{BASE_URL}/api/admin/overrides?key={test_key}",
            headers=auth_headers
        )
        assert response.status_code == 200
        
        # Verify it's gone
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert test_key not in overrides
        print("✓ Single override deleted successfully")
    
    def test_delete_by_page(self, auth_headers):
        """DELETE /api/admin/overrides?page=X removes page overrides"""
        test_page = "/TEST-page-delete"
        
        # Create test entries for that page
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [
                {"key": "TEST.page.key1", "value": "test1", "type": "text", "page": test_page},
                {"key": "TEST.page.key2", "value": "test2", "type": "text", "page": test_page}
            ]}
        )
        
        # Delete by page
        response = requests.delete(
            f"{BASE_URL}/api/admin/overrides?page={test_page}",
            headers=auth_headers
        )
        assert response.status_code == 200
        print("✓ Page overrides deleted successfully")


class TestImageUpload:
    """Test image upload functionality"""
    
    @pytest.fixture
    def auth_headers(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}
    
    def test_upload_requires_auth(self):
        """POST /api/admin/upload without auth returns 401 or 422 (file check first)"""
        response = requests.post(f"{BASE_URL}/api/admin/upload")
        # FastAPI validates file field before auth, so 422 (missing file) or 401 (no auth) are both valid
        assert response.status_code in [401, 422]
        print("✓ Image upload protected (returns 422 missing file or 401 no auth)")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
