"""
Test suite for CMS Layout API endpoints
Tests: GET /api/editor/layout, POST /api/admin/layout
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestLayoutAPI:
    """Layout API endpoint tests"""
    
    def test_get_layout_public_no_auth(self):
        """GET /api/editor/layout should work without auth (public endpoint)"""
        response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        assert response.status_code == 200
        data = response.json()
        assert "page" in data
        assert data["page"] == "home"
        assert "sections" in data
        assert "imageDefaults" in data
        print(f"✓ GET /api/editor/layout returns: {data}")
    
    def test_get_layout_default_values(self):
        """GET /api/editor/layout should return default imageDefaults"""
        response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        assert response.status_code == 200
        data = response.json()
        # Check imageDefaults structure
        assert "imageDefaults" in data
        img_defaults = data["imageDefaults"]
        assert "fit" in img_defaults
        assert "aspect" in img_defaults
        assert img_defaults["fit"] in ["cover", "contain"]
        assert img_defaults["aspect"] in ["auto", "16:9", "4:3", "1:1"]
        print(f"✓ imageDefaults: {img_defaults}")
    
    def test_admin_login_success(self):
        """POST /api/admin/login with correct password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "visuworks2026"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert "token" in data
        print(f"✓ Admin login successful, token received")
    
    def test_admin_login_failure(self):
        """POST /api/admin/login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"password": "wrongpassword"}
        )
        assert response.status_code == 401
        print(f"✓ Admin login correctly rejected wrong password")
    
    def test_save_layout_requires_auth(self):
        """POST /api/admin/layout without auth should fail"""
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            json={"page": "home", "sections": {}}
        )
        assert response.status_code == 401
        print(f"✓ POST /api/admin/layout correctly requires auth")
    
    def test_save_layout_with_auth(self):
        """POST /api/admin/layout with valid auth should succeed"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "paddingTop": "medium", "paddingBottom": "medium"},
                "trustbar": {"visible": True, "order": 1, "paddingTop": "medium", "paddingBottom": "medium"},
                "services": {"visible": True, "order": 2},
                "showcase": {"visible": True, "order": 3},
                "projects": {"visible": True, "order": 4},
                "process": {"visible": True, "order": 5},
                "testimonials": {"visible": True, "order": 6},
                "faq": {"visible": True, "order": 7},
                "cta": {"visible": True, "order": 8}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": "Bearer visuworks2026"},
            json=layout_data
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        print(f"✓ POST /api/admin/layout saved successfully")
        
        # Verify persistence with GET
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        assert get_response.status_code == 200
        saved_data = get_response.json()
        assert saved_data["page"] == "home"
        assert "hero" in saved_data["sections"]
        print(f"✓ Layout persisted and retrieved correctly")
    
    def test_save_layout_section_visibility(self):
        """Test saving section visibility toggle"""
        # Save with a hidden section
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0},
                "trustbar": {"visible": False, "order": 1},  # Hidden
                "services": {"visible": True, "order": 2}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": "Bearer visuworks2026"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["trustbar"]["visible"] == False
        print(f"✓ Section visibility toggle persisted correctly")
    
    def test_save_layout_section_order(self):
        """Test saving section reorder"""
        # Reorder: put services before trustbar
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0},
                "services": {"visible": True, "order": 1},  # Moved up
                "trustbar": {"visible": True, "order": 2},  # Moved down
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": "Bearer visuworks2026"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["services"]["order"] == 1
        assert saved_data["sections"]["trustbar"]["order"] == 2
        print(f"✓ Section reorder persisted correctly")
    
    def test_save_layout_padding_settings(self):
        """Test saving padding settings"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "paddingTop": "large", "paddingBottom": "small"},
                "trustbar": {"visible": True, "order": 1, "paddingTop": "none", "paddingBottom": "xl"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": "Bearer visuworks2026"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["hero"]["paddingTop"] == "large"
        assert saved_data["sections"]["hero"]["paddingBottom"] == "small"
        assert saved_data["sections"]["trustbar"]["paddingTop"] == "none"
        assert saved_data["sections"]["trustbar"]["paddingBottom"] == "xl"
        print(f"✓ Padding settings persisted correctly")
    
    def test_save_layout_content_width(self):
        """Test saving content width settings"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "contentWidth": "wide"},
                "trustbar": {"visible": True, "order": 1, "contentWidth": "narrow"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": "Bearer visuworks2026"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["hero"]["contentWidth"] == "wide"
        assert saved_data["sections"]["trustbar"]["contentWidth"] == "narrow"
        print(f"✓ Content width settings persisted correctly")
    
    def test_save_layout_image_defaults(self):
        """Test saving image defaults"""
        layout_data = {
            "page": "home",
            "sections": {},
            "imageDefaults": {"fit": "contain", "aspect": "16:9"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": "Bearer visuworks2026"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["imageDefaults"]["fit"] == "contain"
        assert saved_data["imageDefaults"]["aspect"] == "16:9"
        print(f"✓ Image defaults persisted correctly")
    
    def test_restore_default_layout(self):
        """Restore default layout for clean state"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"},
                "trustbar": {"visible": True, "order": 1, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"},
                "services": {"visible": True, "order": 2, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"},
                "showcase": {"visible": True, "order": 3, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"},
                "projects": {"visible": True, "order": 4, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"},
                "process": {"visible": True, "order": 5, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"},
                "testimonials": {"visible": True, "order": 6, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"},
                "faq": {"visible": True, "order": 7, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"},
                "cta": {"visible": True, "order": 8, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": "Bearer visuworks2026"},
            json=layout_data
        )
        assert response.status_code == 200
        print(f"✓ Default layout restored")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
