"""
Test suite for CMS Layout API Phase 2 features
Tests: Style presets, alignment, device visibility, CTA controls, animation, templates
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_TOKEN = "visuworks2026"

class TestLayoutPhase2NewFields:
    """Test new section settings fields: preset, alignment, deviceVisibility, cta, animation"""
    
    def test_get_layout_returns_new_fields(self):
        """GET /api/editor/layout should return layout with new fields if saved"""
        response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        assert response.status_code == 200
        data = response.json()
        assert "sections" in data
        print(f"✓ GET /api/editor/layout returns sections: {list(data['sections'].keys())}")
    
    def test_save_style_preset(self):
        """Test saving style preset (default/card/accent/muted/highlight)"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "preset": "default"},
                "trustbar": {"visible": True, "order": 1, "preset": "accent"},
                "services": {"visible": True, "order": 2, "preset": "muted"},
                "showcase": {"visible": True, "order": 3, "preset": "card"},
                "projects": {"visible": True, "order": 4, "preset": "highlight"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify persistence
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["hero"]["preset"] == "default"
        assert saved_data["sections"]["trustbar"]["preset"] == "accent"
        assert saved_data["sections"]["services"]["preset"] == "muted"
        assert saved_data["sections"]["showcase"]["preset"] == "card"
        assert saved_data["sections"]["projects"]["preset"] == "highlight"
        print(f"✓ Style presets persisted correctly")
    
    def test_save_alignment(self):
        """Test saving alignment (left/center)"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "alignment": "left"},
                "trustbar": {"visible": True, "order": 1, "alignment": "center"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["hero"]["alignment"] == "left"
        assert saved_data["sections"]["trustbar"]["alignment"] == "center"
        print(f"✓ Alignment settings persisted correctly")
    
    def test_save_device_visibility(self):
        """Test saving device visibility (all/desktop/mobile)"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "deviceVisibility": "all"},
                "trustbar": {"visible": True, "order": 1, "deviceVisibility": "desktop"},
                "services": {"visible": True, "order": 2, "deviceVisibility": "mobile"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["hero"]["deviceVisibility"] == "all"
        assert saved_data["sections"]["trustbar"]["deviceVisibility"] == "desktop"
        assert saved_data["sections"]["services"]["deviceVisibility"] == "mobile"
        print(f"✓ Device visibility settings persisted correctly")
    
    def test_save_cta_controls(self):
        """Test saving CTA controls (enabled, label, href)"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {
                    "visible": True, 
                    "order": 0, 
                    "cta": {"enabled": False, "label": "", "href": ""}
                },
                "services": {
                    "visible": True, 
                    "order": 2, 
                    "cta": {"enabled": True, "label": "Mehr erfahren", "href": "/kontakt"}
                }
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["hero"]["cta"]["enabled"] == False
        assert saved_data["sections"]["services"]["cta"]["enabled"] == True
        assert saved_data["sections"]["services"]["cta"]["label"] == "Mehr erfahren"
        assert saved_data["sections"]["services"]["cta"]["href"] == "/kontakt"
        print(f"✓ CTA controls persisted correctly")
    
    def test_save_animation(self):
        """Test saving animation type (none/fade-up/fade-in/slide-left/slide-right)"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "animation": "none"},
                "trustbar": {"visible": True, "order": 1, "animation": "fade-up"},
                "services": {"visible": True, "order": 2, "animation": "fade-in"},
                "showcase": {"visible": True, "order": 3, "animation": "slide-left"},
                "projects": {"visible": True, "order": 4, "animation": "slide-right"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        assert saved_data["sections"]["hero"]["animation"] == "none"
        assert saved_data["sections"]["trustbar"]["animation"] == "fade-up"
        assert saved_data["sections"]["services"]["animation"] == "fade-in"
        assert saved_data["sections"]["showcase"]["animation"] == "slide-left"
        assert saved_data["sections"]["projects"]["animation"] == "slide-right"
        print(f"✓ Animation settings persisted correctly")
    
    def test_save_all_new_fields_combined(self):
        """Test saving all new fields together"""
        layout_data = {
            "page": "home",
            "sections": {
                "services": {
                    "visible": True,
                    "order": 2,
                    "paddingTop": "large",
                    "paddingBottom": "medium",
                    "contentWidth": "wide",
                    "preset": "accent",
                    "alignment": "center",
                    "deviceVisibility": "desktop",
                    "cta": {"enabled": True, "label": "Jetzt anfragen", "href": "/kontakt"},
                    "animation": "fade-up"
                }
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=layout_data
        )
        assert response.status_code == 200
        
        # Verify all fields
        get_response = requests.get(f"{BASE_URL}/api/editor/layout?page=home")
        saved_data = get_response.json()
        section = saved_data["sections"]["services"]
        assert section["preset"] == "accent"
        assert section["alignment"] == "center"
        assert section["deviceVisibility"] == "desktop"
        assert section["cta"]["enabled"] == True
        assert section["cta"]["label"] == "Jetzt anfragen"
        assert section["animation"] == "fade-up"
        print(f"✓ All new fields combined persisted correctly")


class TestTemplateAPI:
    """Test template endpoints: GET /api/editor/templates, POST template, DELETE template"""
    
    def test_list_templates_public(self):
        """GET /api/editor/templates should work without auth (public endpoint)"""
        response = requests.get(f"{BASE_URL}/api/editor/templates")
        assert response.status_code == 200
        data = response.json()
        assert "templates" in data
        assert isinstance(data["templates"], list)
        print(f"✓ GET /api/editor/templates returns: {data}")
    
    def test_save_template(self):
        """POST /api/admin/layout with page='template:TestTemplate' saves a template"""
        template_data = {
            "page": "template:TestTemplate",
            "sections": {
                "hero": {"visible": True, "order": 0, "preset": "accent", "animation": "fade-up"},
                "services": {"visible": True, "order": 1, "preset": "muted", "alignment": "center"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "16:9"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=template_data
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        print(f"✓ Template 'TestTemplate' saved successfully")
        
        # Verify template appears in list
        list_response = requests.get(f"{BASE_URL}/api/editor/templates")
        templates = list_response.json()["templates"]
        template_names = [t["name"] for t in templates]
        assert "TestTemplate" in template_names
        print(f"✓ Template appears in list: {template_names}")
    
    def test_load_template(self):
        """GET /api/editor/layout?page=template:TestTemplate loads a template"""
        response = requests.get(f"{BASE_URL}/api/editor/layout?page=template:TestTemplate")
        assert response.status_code == 200
        data = response.json()
        assert data["page"] == "template:TestTemplate"
        assert "sections" in data
        assert "hero" in data["sections"]
        assert data["sections"]["hero"]["preset"] == "accent"
        print(f"✓ Template 'TestTemplate' loaded successfully")
    
    def test_delete_template_requires_auth(self):
        """DELETE /api/admin/template/{name} without auth should fail"""
        response = requests.delete(f"{BASE_URL}/api/admin/template/TestTemplate")
        assert response.status_code == 401
        print(f"✓ DELETE template correctly requires auth")
    
    def test_delete_template_with_auth(self):
        """DELETE /api/admin/template/{name} with auth should succeed"""
        # First ensure template exists
        template_data = {
            "page": "template:ToDelete",
            "sections": {"hero": {"visible": True, "order": 0}},
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=template_data
        )
        
        # Delete it
        response = requests.delete(
            f"{BASE_URL}/api/admin/template/ToDelete",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        print(f"✓ Template 'ToDelete' deleted successfully")
        
        # Verify it's gone from list
        list_response = requests.get(f"{BASE_URL}/api/editor/templates")
        templates = list_response.json()["templates"]
        template_names = [t["name"] for t in templates]
        assert "ToDelete" not in template_names
        print(f"✓ Template no longer in list")
    
    def test_delete_nonexistent_template(self):
        """DELETE /api/admin/template/{name} for non-existent template returns 404"""
        response = requests.delete(
            f"{BASE_URL}/api/admin/template/NonExistentTemplate12345",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"}
        )
        assert response.status_code == 404
        print(f"✓ DELETE non-existent template returns 404")
    
    def test_cleanup_test_template(self):
        """Cleanup: Delete TestTemplate if it exists"""
        response = requests.delete(
            f"{BASE_URL}/api/admin/template/TestTemplate",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"}
        )
        # May be 200 or 404 depending on whether it exists
        assert response.status_code in [200, 404]
        print(f"✓ Cleanup: TestTemplate deleted or didn't exist")


class TestRestoreDefaultLayout:
    """Restore default layout after tests"""
    
    def test_restore_default_layout(self):
        """Restore default layout with all new fields set to defaults"""
        layout_data = {
            "page": "home",
            "sections": {
                "hero": {"visible": True, "order": 0, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"},
                "trustbar": {"visible": True, "order": 1, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"},
                "services": {"visible": True, "order": 2, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"},
                "showcase": {"visible": True, "order": 3, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"},
                "projects": {"visible": True, "order": 4, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"},
                "process": {"visible": True, "order": 5, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"},
                "testimonials": {"visible": True, "order": 6, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"},
                "faq": {"visible": True, "order": 7, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"},
                "cta": {"visible": True, "order": 8, "paddingTop": "medium", "paddingBottom": "medium", "contentWidth": "normal", "preset": "default", "alignment": "left", "deviceVisibility": "all", "cta": {"enabled": False, "label": "", "href": ""}, "animation": "fade-up"}
            },
            "imageDefaults": {"fit": "cover", "aspect": "auto"}
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/layout",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json=layout_data
        )
        assert response.status_code == 200
        print(f"✓ Default layout restored with all Phase 2 fields")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
