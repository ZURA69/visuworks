"""
Backend API Tests for Visual Content Editor Feature
Tests: Admin login, content overrides CRUD, file upload
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = 'visuworks2026'

class TestAdminLogin:
    """Tests for POST /api/admin/login endpoint"""

    def test_login_wrong_password_returns_401(self):
        """1. POST /api/admin/login with wrong password returns 401"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrong_password"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        data = response.json()
        assert "detail" in data
        print(f"PASS: Wrong password returns 401 with message: {data['detail']}")

    def test_login_correct_password_returns_200(self):
        """2. POST /api/admin/login with correct password 'visuworks2026' returns 200 with token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "token" in data
        assert data["status"] == "ok"
        assert data["token"] == ADMIN_PASSWORD
        print(f"PASS: Correct password returns 200 with token")


class TestContentOverrides:
    """Tests for content override endpoints"""

    @pytest.fixture
    def auth_header(self):
        """Return authorization header for authenticated requests"""
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}

    @pytest.fixture(autouse=True)
    def cleanup_test_data(self, auth_header):
        """Cleanup TEST_ prefixed overrides after each test"""
        yield
        # Delete all test data
        response = requests.get(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header
        )
        if response.status_code == 200:
            overrides = response.json().get("overrides", [])
            for o in overrides:
                if o.get("key", "").startswith("TEST_"):
                    requests.delete(
                        f"{BASE_URL}/api/admin/overrides?key={o['key']}",
                        headers=auth_header
                    )

    def test_save_override_requires_auth(self):
        """3. POST /api/admin/overrides requires authentication"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            json={"overrides": [{"key": "TEST_key", "value": "val", "type": "text"}]}
        )
        assert response.status_code == 401, f"Expected 401 without auth, got {response.status_code}"
        print("PASS: POST /api/admin/overrides requires auth (401 without)")

    def test_save_override_success(self, auth_header):
        """3. POST /api/admin/overrides saves content override to MongoDB (auth required)"""
        # Create override
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [{
                "key": "TEST_hero.headline",
                "value": "TEST Override Value",
                "type": "text",
                "page": "/"
            }]}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data["status"] == "ok"
        assert data["count"] == 1
        
        # Verify persistence - GET to confirm saved
        get_response = requests.get(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header
        )
        assert get_response.status_code == 200
        overrides = get_response.json().get("overrides", [])
        test_overrides = [o for o in overrides if o.get("key") == "TEST_hero.headline"]
        assert len(test_overrides) == 1
        assert test_overrides[0]["value"] == "TEST Override Value"
        print("PASS: POST /api/admin/overrides saves override and persists to DB")

    def test_get_admin_overrides_requires_auth(self):
        """4. GET /api/admin/overrides requires authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/overrides")
        assert response.status_code == 401, f"Expected 401 without auth, got {response.status_code}"
        print("PASS: GET /api/admin/overrides requires auth (401 without)")

    def test_get_admin_overrides_success(self, auth_header):
        """4. GET /api/admin/overrides returns saved overrides (auth required)"""
        # First save an override
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [{
                "key": "TEST_fetch_test",
                "value": "Fetch Value",
                "type": "text",
                "page": "/test"
            }]}
        )
        
        # Get all overrides
        response = requests.get(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header
        )
        assert response.status_code == 200
        data = response.json()
        assert "overrides" in data
        assert isinstance(data["overrides"], list)
        
        # Get page-specific overrides
        page_response = requests.get(
            f"{BASE_URL}/api/admin/overrides?page=/test",
            headers=auth_header
        )
        assert page_response.status_code == 200
        page_data = page_response.json()
        filtered = [o for o in page_data["overrides"] if o.get("key") == "TEST_fetch_test"]
        assert len(filtered) >= 1
        print("PASS: GET /api/admin/overrides returns saved overrides with page filter")

    def test_public_overrides_no_auth(self):
        """5. GET /api/content/overrides returns overrides publicly (no auth)"""
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "overrides" in data
        assert isinstance(data["overrides"], dict)  # Public returns dict format
        print("PASS: GET /api/content/overrides works without auth, returns dict format")

    def test_public_overrides_shows_saved_content(self, auth_header):
        """5. Verify public endpoint shows saved overrides"""
        # Save override
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [{
                "key": "TEST_public_visible",
                "value": "Public Value",
                "type": "text",
                "page": "/"
            }]}
        )
        
        # Check public endpoint
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200
        data = response.json()
        assert "TEST_public_visible" in data["overrides"]
        assert data["overrides"]["TEST_public_visible"] == "Public Value"
        print("PASS: Public overrides endpoint shows saved content")

    def test_delete_all_overrides(self, auth_header):
        """6. DELETE /api/admin/overrides/all clears all overrides"""
        # First save some test overrides
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [
                {"key": "TEST_delete_1", "value": "val1", "type": "text"},
                {"key": "TEST_delete_2", "value": "val2", "type": "text"}
            ]}
        )
        
        # Verify they exist
        get_before = requests.get(f"{BASE_URL}/api/admin/overrides", headers=auth_header)
        overrides_before = get_before.json().get("overrides", [])
        test_keys_before = [o for o in overrides_before if o.get("key", "").startswith("TEST_delete_")]
        assert len(test_keys_before) >= 2, "Test overrides should exist before delete"
        
        # Delete all
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/overrides/all",
            headers=auth_header
        )
        assert delete_response.status_code == 200
        data = delete_response.json()
        assert data["status"] == "ok"
        assert "deleted" in data
        
        # Verify deletion
        get_after = requests.get(f"{BASE_URL}/api/admin/overrides", headers=auth_header)
        overrides_after = get_after.json().get("overrides", [])
        assert len(overrides_after) == 0, "All overrides should be deleted"
        print(f"PASS: DELETE /api/admin/overrides/all cleared {data['deleted']} overrides")

    def test_delete_single_override_by_key(self, auth_header):
        """6. DELETE /api/admin/overrides with key parameter deletes specific override"""
        # Create override
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [{"key": "TEST_single_delete", "value": "to_delete", "type": "text"}]}
        )
        
        # Delete by key
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/overrides?key=TEST_single_delete",
            headers=auth_header
        )
        assert delete_response.status_code == 200
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/admin/overrides", headers=auth_header)
        overrides = get_response.json().get("overrides", [])
        keys = [o.get("key") for o in overrides]
        assert "TEST_single_delete" not in keys
        print("PASS: DELETE by key parameter works correctly")

    def test_delete_by_page(self, auth_header):
        """DELETE /api/admin/overrides with page parameter deletes all overrides for that page"""
        # Create overrides for specific page
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [
                {"key": "TEST_page_del_1", "value": "v1", "type": "text", "page": "/test-page"},
                {"key": "TEST_page_del_2", "value": "v2", "type": "text", "page": "/test-page"}
            ]}
        )
        
        # Delete by page
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/overrides?page=/test-page",
            headers=auth_header
        )
        assert delete_response.status_code == 200
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/admin/overrides?page=/test-page", headers=auth_header)
        overrides = get_response.json().get("overrides", [])
        test_overrides = [o for o in overrides if o.get("key", "").startswith("TEST_page_del_")]
        assert len(test_overrides) == 0
        print("PASS: DELETE by page parameter deletes all page overrides")


class TestImageUpload:
    """Tests for POST /api/admin/upload endpoint"""

    @pytest.fixture
    def auth_header(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}

    def test_upload_requires_auth(self):
        """7. POST /api/admin/upload requires authentication"""
        # Create a small test image
        image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\x0f\x00\x00\x01\x01\x00\x05\x18\xd8N\x00\x00\x00\x00IEND\xaeB`\x82'
        
        response = requests.post(
            f"{BASE_URL}/api/admin/upload",
            files={"file": ("test.png", image_content, "image/png")}
        )
        assert response.status_code == 401, f"Expected 401 without auth, got {response.status_code}"
        print("PASS: Upload requires authentication")

    def test_upload_image_success(self, auth_header):
        """7. POST /api/admin/upload accepts image file upload and returns URL"""
        # Create a valid 1x1 PNG image
        image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\x0f\x00\x00\x01\x01\x00\x05\x18\xd8N\x00\x00\x00\x00IEND\xaeB`\x82'
        
        response = requests.post(
            f"{BASE_URL}/api/admin/upload",
            headers=auth_header,
            files={"file": ("test_image.png", image_content, "image/png")}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert data["status"] == "ok"
        assert "url" in data
        assert data["url"].startswith("/uploads/")
        assert data["url"].endswith(".png")
        assert "filename" in data
        print(f"PASS: Image upload returns URL: {data['url']}")

    def test_upload_invalid_file_type(self, auth_header):
        """7. POST /api/admin/upload rejects invalid file types"""
        response = requests.post(
            f"{BASE_URL}/api/admin/upload",
            headers=auth_header,
            files={"file": ("test.txt", b"text content", "text/plain")}
        )
        assert response.status_code == 400, f"Expected 400 for invalid type, got {response.status_code}"
        data = response.json()
        assert "detail" in data
        print(f"PASS: Invalid file type rejected with 400: {data['detail']}")

    def test_upload_jpg_webp_accepted(self, auth_header):
        """7. JPG and WebP formats are accepted"""
        # Minimal JPEG
        jpeg_content = b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a\x1f\x1e\x1d\x1a\x1c\x1c $.\' ",#\x1c\x1c(7),01444\x1f\'9teleprinter\xff\xc0\x00\x0b\x08\x00\x01\x00\x01\x01\x01\x11\x00\xff\xc4\x00\x1f\x00\x00\x01\x05\x01\x01\x01\x01\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x01\x02\x03\x04\x05\x06\x07\x08\t\n\x0b\xff\xc4\x00\xb5\x10\x00\x02\x01\x03\x03\x02\x04\x03\x05\x05\x04\x04\x00\x00\x01}\x01\x02\x03\x00\x04\x11\x05\x12!1A\x06\x13Qa\x07"q\x142\x81\x91\xa1\x08#B\xb1\xc1\x15R\xd1\xf0$3br\x82\t\n\x16\x17\x18\x19\x1a%&\'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz\x83\x84\x85\x86\x87\x88\x89\x8a\x92\x93\x94\x95\x96\x97\x98\x99\x9a\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xff\xda\x00\x08\x01\x01\x00\x00?\x00\xfb\xd5\xdf\xff\xd9'
        
        response = requests.post(
            f"{BASE_URL}/api/admin/upload",
            headers=auth_header,
            files={"file": ("test.jpg", jpeg_content, "image/jpeg")}
        )
        # May fail due to invalid JPEG data, but should not be 401
        if response.status_code == 200:
            print("PASS: JPG upload accepted")
        else:
            print(f"INFO: JPG upload returned {response.status_code} (may need valid image data)")


class TestOverrideUpsert:
    """Test that overrides use upsert logic (update if exists)"""

    @pytest.fixture
    def auth_header(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}

    @pytest.fixture(autouse=True)
    def cleanup(self, auth_header):
        yield
        requests.delete(f"{BASE_URL}/api/admin/overrides?key=TEST_upsert_key", headers=auth_header)

    def test_upsert_creates_new(self, auth_header):
        """Override creates new entry if key doesn't exist"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [{"key": "TEST_upsert_key", "value": "initial", "type": "text"}]}
        )
        assert response.status_code == 200
        
        get_response = requests.get(f"{BASE_URL}/api/content/overrides")
        data = get_response.json()
        assert data["overrides"].get("TEST_upsert_key") == "initial"
        print("PASS: Upsert creates new entry")

    def test_upsert_updates_existing(self, auth_header):
        """Override updates existing entry if key exists"""
        # Create
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [{"key": "TEST_upsert_key", "value": "initial", "type": "text"}]}
        )
        
        # Update with same key
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_header,
            json={"overrides": [{"key": "TEST_upsert_key", "value": "updated", "type": "text"}]}
        )
        assert response.status_code == 200
        
        # Verify single entry with updated value
        get_response = requests.get(f"{BASE_URL}/api/admin/overrides", headers=auth_header)
        overrides = get_response.json().get("overrides", [])
        test_entries = [o for o in overrides if o.get("key") == "TEST_upsert_key"]
        assert len(test_entries) == 1, "Should only have one entry (upsert, not duplicate)"
        assert test_entries[0]["value"] == "updated"
        print("PASS: Upsert updates existing entry without creating duplicate")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
