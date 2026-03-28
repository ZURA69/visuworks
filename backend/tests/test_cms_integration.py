"""
CMS/Admin Integration Tests for VISUWORKS Website
Tests: Content override API, Admin login, Trust bar list editing, Content sync
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001').rstrip('/')
ADMIN_PASSWORD = "visuworks2026"

class TestHealthAndBasicAPIs:
    """Basic API health checks"""
    
    def test_health_endpoint(self):
        """Test /api/health returns ok"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        print("✓ Health endpoint working")

    def test_public_content_overrides_endpoint(self):
        """Test /api/content/overrides returns data without auth"""
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200
        data = response.json()
        assert "overrides" in data
        assert isinstance(data["overrides"], dict)
        print(f"✓ Public overrides endpoint working, {len(data['overrides'])} keys found")


class TestAdminAuthentication:
    """Admin login and authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert "token" in data
        assert data["token"] == ADMIN_PASSWORD
        print("✓ Admin login successful")
    
    def test_admin_login_failure(self):
        """Test admin login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword"}
        )
        assert response.status_code == 401
        print("✓ Admin login correctly rejects wrong password")
    
    def test_admin_overrides_requires_auth(self):
        """Test /api/admin/overrides requires authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/overrides")
        assert response.status_code == 401
        print("✓ Admin overrides endpoint requires auth")
    
    def test_admin_overrides_with_auth(self):
        """Test /api/admin/overrides works with valid token"""
        response = requests.get(
            f"{BASE_URL}/api/admin/overrides",
            headers={"Authorization": f"Bearer {ADMIN_PASSWORD}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "overrides" in data
        print(f"✓ Admin overrides endpoint working with auth, {len(data['overrides'])} entries")


class TestContentOverrideSaveAndSync:
    """Test saving overrides and verifying sync"""
    
    def test_save_text_override(self):
        """Test saving a text override via admin API"""
        test_value = f"TEST_SYNC_{int(time.time())}"
        
        # Save override
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers={
                "Authorization": f"Bearer {ADMIN_PASSWORD}",
                "Content-Type": "application/json"
            },
            json={
                "overrides": [{
                    "key": "test.sync.value",
                    "value": test_value,
                    "type": "text",
                    "page": "/"
                }]
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert data["count"] == 1
        print(f"✓ Saved test override: {test_value}")
        
        # Verify via public API
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200
        data = response.json()
        assert data["overrides"].get("test.sync.value") == test_value
        print("✓ Override synced to public API")
    
    def test_save_hero_subline_override(self):
        """Test saving hero.subline override (key feature)"""
        test_subline = f"Test Hero Subline {int(time.time())}"
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers={
                "Authorization": f"Bearer {ADMIN_PASSWORD}",
                "Content-Type": "application/json"
            },
            json={
                "overrides": [{
                    "key": "hero.subline",
                    "value": test_subline,
                    "type": "text",
                    "page": "/"
                }]
            }
        )
        assert response.status_code == 200
        print(f"✓ Saved hero.subline override")
        
        # Verify
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        data = response.json()
        assert "hero.subline" in data["overrides"]
        print(f"✓ hero.subline found in public overrides: {data['overrides']['hero.subline'][:50]}...")
    
    def test_save_cta_headline_override(self):
        """Test saving cta.headline override"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers={
                "Authorization": f"Bearer {ADMIN_PASSWORD}",
                "Content-Type": "application/json"
            },
            json={
                "overrides": [{
                    "key": "cta.headline",
                    "value": "Test CTA Headline",
                    "type": "text",
                    "page": "/"
                }]
            }
        )
        assert response.status_code == 200
        print("✓ Saved cta.headline override")


class TestTrustBarListEditing:
    """Test trust bar list (add/edit/delete) functionality"""
    
    def test_trustbar_items_exists_in_overrides(self):
        """Test that trustbar.items exists in public overrides"""
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200
        data = response.json()
        
        trustbar_items = data["overrides"].get("trustbar.items")
        assert trustbar_items is not None, "trustbar.items should exist in overrides"
        assert isinstance(trustbar_items, list), "trustbar.items should be a list"
        print(f"✓ trustbar.items found with {len(trustbar_items)} items")
        
        # Verify structure
        for i, item in enumerate(trustbar_items):
            assert "value" in item, f"Item {i} missing 'value'"
            assert "label" in item, f"Item {i} missing 'label'"
            print(f"  - {item['value']} / {item['label']}")
    
    def test_save_trustbar_items_list(self):
        """Test saving trustbar.items as a list"""
        test_items = [
            {"value": "800+", "label": "Projekte"},
            {"value": "20", "label": "Jahre Erfahrung"},
            {"value": "100%", "label": "Kundenzufriedenheit"},
            {"value": "15", "label": "Länder"}
        ]
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers={
                "Authorization": f"Bearer {ADMIN_PASSWORD}",
                "Content-Type": "application/json"
            },
            json={
                "overrides": [{
                    "key": "trustbar.items",
                    "value": test_items,
                    "type": "list",
                    "page": "/"
                }]
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        print("✓ Saved trustbar.items list")
        
        # Verify
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        data = response.json()
        saved_items = data["overrides"].get("trustbar.items")
        assert saved_items is not None
        assert len(saved_items) == 4
        assert saved_items[0]["value"] == "800+"
        print("✓ trustbar.items list saved and verified")
    
    def test_add_item_to_trustbar(self):
        """Test adding a new item to trustbar.items"""
        # Get current items
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        current_items = response.json()["overrides"].get("trustbar.items", [])
        
        # Add new item
        new_items = current_items + [{"value": "NEW", "label": "Test Item"}]
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers={
                "Authorization": f"Bearer {ADMIN_PASSWORD}",
                "Content-Type": "application/json"
            },
            json={
                "overrides": [{
                    "key": "trustbar.items",
                    "value": new_items,
                    "type": "list",
                    "page": "/"
                }]
            }
        )
        assert response.status_code == 200
        print(f"✓ Added item to trustbar, now {len(new_items)} items")
    
    def test_restore_original_trustbar(self):
        """Restore original trustbar.items for frontend testing"""
        original_items = [
            {"value": "750+", "label": "Projekte"},
            {"value": "18", "label": "Jahre Erfahrung"},
            {"value": "99%", "label": "Kundenzufriedenheit"},
            {"value": "14", "label": "Länder"}
        ]
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers={
                "Authorization": f"Bearer {ADMIN_PASSWORD}",
                "Content-Type": "application/json"
            },
            json={
                "overrides": [{
                    "key": "trustbar.items",
                    "value": original_items,
                    "type": "list",
                    "page": "/"
                }]
            }
        )
        assert response.status_code == 200
        print("✓ Restored original trustbar.items")


class TestDeleteOverrides:
    """Test delete override functionality"""
    
    def test_delete_single_override(self):
        """Test deleting a single override by key"""
        # First create a test override
        requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers={
                "Authorization": f"Bearer {ADMIN_PASSWORD}",
                "Content-Type": "application/json"
            },
            json={
                "overrides": [{
                    "key": "test.delete.me",
                    "value": "to be deleted",
                    "type": "text",
                    "page": "/"
                }]
            }
        )
        
        # Delete it
        response = requests.delete(
            f"{BASE_URL}/api/admin/overrides?key=test.delete.me",
            headers={"Authorization": f"Bearer {ADMIN_PASSWORD}"}
        )
        assert response.status_code == 200
        print("✓ Delete override endpoint working")
        
        # Verify deletion
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        data = response.json()
        assert "test.delete.me" not in data["overrides"]
        print("✓ Override successfully deleted")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
