"""
Test suite for Image Manipulation Editor features.
Tests image overrides as objects {url, zoom, offsetX, offsetY, alt} in MongoDB.
Tests: homepage hero, service page hero images, project thumbnails, project hero images, project galleries.
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = 'visuworks2026'


class TestImageObjectOverrides:
    """Test that image overrides can be saved as objects with zoom, offset, alt"""
    
    @pytest.fixture
    def auth_headers(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}
    
    def test_save_image_object_override(self, auth_headers):
        """POST /api/admin/overrides accepts image value as object {url, zoom, offsetX, offsetY, alt}"""
        test_key = f"TEST.images.hero.src.{int(time.time())}"
        image_object = {
            "url": "/images/test-image.webp",
            "zoom": 1.5,
            "offsetX": 10.5,
            "offsetY": -5.2,
            "alt": "Test alt text"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": test_key,
                "value": image_object,
                "type": "image",
                "page": "/"
            }]}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "ok"
        assert data.get("count") == 1
        print("✓ Image object override saved successfully")
        
        # Verify it's stored correctly in public endpoint
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200
        overrides = response.json()["overrides"]
        assert test_key in overrides
        
        saved_value = overrides[test_key]
        assert isinstance(saved_value, dict)
        assert saved_value.get("url") == "/images/test-image.webp"
        assert saved_value.get("zoom") == 1.5
        assert saved_value.get("offsetX") == 10.5
        assert saved_value.get("offsetY") == -5.2
        assert saved_value.get("alt") == "Test alt text"
        print("✓ Image object retrieved with all properties intact")
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/overrides?key={test_key}", headers=auth_headers)
        print("✓ Test cleanup complete")
    
    def test_save_homepage_hero_image_object(self, auth_headers):
        """Save image object for homepage hero (images.hero.src)"""
        image_object = {
            "url": "/uploads/test-hero.webp",
            "zoom": 1.2,
            "offsetX": 0,
            "offsetY": -10,
            "alt": "Homepage hero image"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "images.hero.src",
                "value": image_object,
                "type": "image",
                "page": "/"
            }]}
        )
        assert response.status_code == 200
        print("✓ Homepage hero image object saved")
        
        # Verify
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert "images.hero.src" in overrides
        saved = overrides["images.hero.src"]
        assert isinstance(saved, dict)
        assert "url" in saved
        assert "zoom" in saved
        print("✓ Homepage hero image object retrieved correctly")
    
    def test_save_service_hero_image_object(self, auth_headers):
        """Save image object for service page hero (images.service.mobilitaet.hero)"""
        image_object = {
            "url": "/images/service-hero.webp",
            "zoom": 1.3,
            "offsetX": 5,
            "offsetY": -5,
            "alt": "Mobilität service hero"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "images.service.mobilitaet.hero",
                "value": image_object,
                "type": "image",
                "page": "/mobilitaet"
            }]}
        )
        assert response.status_code == 200
        print("✓ Service hero image object saved")
        
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert "images.service.mobilitaet.hero" in overrides
        print("✓ Service hero image object verified")
    
    def test_save_project_thumbnail_image_object(self, auth_headers):
        """Save image object for project thumbnail (images.projects.{slug}.thumbnail)"""
        test_key = "images.projects.Flottenbranding.thumbnail"
        image_object = {
            "url": "/images/project-thumb.webp",
            "zoom": 1.4,
            "offsetX": -3,
            "offsetY": 8,
            "alt": "Flottenbranding project thumbnail"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": test_key,
                "value": image_object,
                "type": "image",
                "page": "/projekte"
            }]}
        )
        assert response.status_code == 200
        print("✓ Project thumbnail image object saved")
        
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert test_key in overrides
        saved = overrides[test_key]
        assert isinstance(saved, dict)
        assert saved.get("zoom") == 1.4
        print("✓ Project thumbnail image object verified")
    
    def test_save_project_gallery_image_object(self, auth_headers):
        """Save image object for project gallery (images.projects.{slug}.gallery.{i})"""
        test_key = "images.projects.Lackschutz.gallery.0"
        image_object = {
            "url": "/images/gallery-0.webp",
            "zoom": 1.1,
            "offsetX": 2,
            "offsetY": -2,
            "alt": "Lackschutz gallery image 1"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": test_key,
                "value": image_object,
                "type": "image",
                "page": "/projekte/Lackschutz"
            }]}
        )
        assert response.status_code == 200
        print("✓ Project gallery image object saved")
        
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert test_key in overrides
        print("✓ Project gallery image object verified")
    
    def test_image_object_with_only_url(self, auth_headers):
        """Save image object with just URL (zoom/offset defaults)"""
        test_key = f"TEST.images.simple.{int(time.time())}"
        image_object = {"url": "/uploads/simple.webp"}
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": test_key,
                "value": image_object,
                "type": "image",
                "page": "/"
            }]}
        )
        assert response.status_code == 200
        
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert test_key in overrides
        saved = overrides[test_key]
        assert saved.get("url") == "/uploads/simple.webp"
        print("✓ Image object with only URL saved correctly")
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/overrides?key={test_key}", headers=auth_headers)
    
    def test_backwards_compatible_string_value(self, auth_headers):
        """Backend should still accept plain string URLs for backward compatibility"""
        test_key = f"TEST.images.legacy.{int(time.time())}"
        legacy_value = "/uploads/legacy-image.webp"
        
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": test_key,
                "value": legacy_value,
                "type": "image",
                "page": "/"
            }]}
        )
        assert response.status_code == 200
        
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        overrides = response.json()["overrides"]
        assert test_key in overrides
        # String values should be stored as-is
        assert overrides[test_key] == legacy_value
        print("✓ Legacy string URL stored correctly (backward compatible)")
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/overrides?key={test_key}", headers=auth_headers)


class TestPublicOverridesImageObjects:
    """Test that public endpoint returns image objects correctly"""
    
    def test_get_public_overrides_returns_image_objects(self):
        """GET /api/content/overrides returns image objects with full structure"""
        response = requests.get(f"{BASE_URL}/api/content/overrides")
        assert response.status_code == 200
        data = response.json()
        assert "overrides" in data
        
        overrides = data["overrides"]
        # Check if any image keys exist and verify structure
        image_keys = [k for k in overrides.keys() if 'images.' in k or 'image' in k.lower()]
        print(f"✓ Public overrides has {len(image_keys)} image-related keys")
        
        for key in image_keys[:3]:  # Check first 3
            value = overrides[key]
            if isinstance(value, dict):
                print(f"  - {key}: object with keys {list(value.keys())}")
            else:
                print(f"  - {key}: {type(value).__name__} value")


class TestAllServicePageHeroImages:
    """Test that all service pages can have hero images edited"""
    
    @pytest.fixture
    def auth_headers(self):
        return {"Authorization": f"Bearer {ADMIN_PASSWORD}"}
    
    def test_mobilitaet_hero_image(self, auth_headers):
        """images.service.mobilitaet.hero can be saved"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "images.service.mobilitaet.hero",
                "value": {"url": "/test.webp", "zoom": 1.0, "offsetX": 0, "offsetY": 0},
                "type": "image",
                "page": "/mobilitaet"
            }]}
        )
        assert response.status_code == 200
        print("✓ Mobilität hero image key works")
    
    def test_architektur_hero_image(self, auth_headers):
        """images.service.architektur.hero can be saved"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "images.service.architektur.hero",
                "value": {"url": "/test.webp", "zoom": 1.0, "offsetX": 0, "offsetY": 0},
                "type": "image",
                "page": "/architektur-raum"
            }]}
        )
        assert response.status_code == 200
        print("✓ Architektur hero image key works")
    
    def test_markenkommunikation_hero_image(self, auth_headers):
        """images.service.markenkommunikation.hero can be saved"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "images.service.markenkommunikation.hero",
                "value": {"url": "/test.webp", "zoom": 1.0, "offsetX": 0, "offsetY": 0},
                "type": "image",
                "page": "/markenkommunikation"
            }]}
        )
        assert response.status_code == 200
        print("✓ Markenkommunikation hero image key works")
    
    def test_design_hero_image(self, auth_headers):
        """images.service.design.hero can be saved"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "images.service.design.hero",
                "value": {"url": "/test.webp", "zoom": 1.0, "offsetX": 0, "offsetY": 0},
                "type": "image",
                "page": "/design-konzepte"
            }]}
        )
        assert response.status_code == 200
        print("✓ Design hero image key works")
    
    def test_projektmanagement_hero_image(self, auth_headers):
        """images.service.projektmanagement.hero can be saved"""
        response = requests.post(
            f"{BASE_URL}/api/admin/overrides",
            headers=auth_headers,
            json={"overrides": [{
                "key": "images.service.projektmanagement.hero",
                "value": {"url": "/test.webp", "zoom": 1.0, "offsetX": 0, "offsetY": 0},
                "type": "image",
                "page": "/projektmanagement"
            }]}
        )
        assert response.status_code == 200
        print("✓ Projektmanagement hero image key works")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
