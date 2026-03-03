"""
Test suite for Image Optimization & Upload features
Tests: Backend image upload with Pillow optimization, WebP conversion, lazy loading
"""
import pytest
import requests
import os
import io
import tempfile
from PIL import Image as PILImage

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = 'visuworks2026'


@pytest.fixture
def auth_headers():
    """Get authentication headers"""
    return {'Authorization': f'Bearer {ADMIN_PASSWORD}'}


@pytest.fixture
def create_test_image_jpeg():
    """Create a test JPEG image in memory"""
    img = PILImage.new('RGB', (800, 600), color='blue')
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=85)
    buf.seek(0)
    return buf


@pytest.fixture
def create_large_test_image():
    """Create a larger test image (>2400px) to test resizing"""
    img = PILImage.new('RGB', (3000, 2000), color='green')
    buf = io.BytesIO()
    img.save(buf, format='JPEG', quality=85)
    buf.seek(0)
    return buf


@pytest.fixture
def create_png_with_alpha():
    """Create a PNG with transparency"""
    img = PILImage.new('RGBA', (640, 480), color=(255, 0, 0, 128))
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return buf


class TestHealthEndpoint:
    """Test backend health endpoint"""
    
    def test_health_returns_ok(self):
        """GET /api/health returns {status: ok}"""
        response = requests.get(f'{BASE_URL}/api/health')
        assert response.status_code == 200
        data = response.json()
        assert data.get('status') == 'ok'
        print("PASS: GET /api/health returns {status: ok}")


class TestImageUpload:
    """Test image upload endpoint with optimization"""
    
    def test_upload_without_auth_fails(self, create_test_image_jpeg):
        """Upload without auth should fail"""
        files = {'file': ('test.jpg', create_test_image_jpeg, 'image/jpeg')}
        response = requests.post(f'{BASE_URL}/api/admin/upload', files=files)
        # Should return 401 or 422 (depending on validation order)
        assert response.status_code in [401, 422]
        print(f"PASS: Upload without auth returns {response.status_code}")
    
    def test_upload_jpeg_returns_webp_url(self, auth_headers, create_test_image_jpeg):
        """Upload JPEG returns .webp URL after optimization"""
        files = {'file': ('test_image.jpg', create_test_image_jpeg, 'image/jpeg')}
        response = requests.post(
            f'{BASE_URL}/api/admin/upload',
            headers=auth_headers,
            files=files
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert data.get('status') == 'ok'
        assert 'url' in data
        assert 'filename' in data
        
        # Verify the URL ends with .webp
        url = data['url']
        assert url.endswith('.webp'), f"Expected .webp URL, got {url}"
        
        # Verify file is accessible
        file_response = requests.get(f'{BASE_URL}{url}')
        assert file_response.status_code == 200, f"Uploaded file not accessible at {url}"
        
        print(f"PASS: Upload JPEG returns WebP URL: {url}")
        return url
    
    def test_upload_png_returns_webp_url(self, auth_headers, create_png_with_alpha):
        """Upload PNG (even with alpha) returns .webp URL"""
        files = {'file': ('test_image.png', create_png_with_alpha, 'image/png')}
        response = requests.post(
            f'{BASE_URL}/api/admin/upload',
            headers=auth_headers,
            files=files
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data.get('status') == 'ok'
        url = data['url']
        assert url.endswith('.webp'), f"Expected .webp URL, got {url}"
        
        print(f"PASS: Upload PNG returns WebP URL: {url}")
    
    def test_large_image_is_resized(self, auth_headers, create_large_test_image):
        """Upload large image (>2400px) should be resized to max 2400px"""
        files = {'file': ('large_test.jpg', create_large_test_image, 'image/jpeg')}
        response = requests.post(
            f'{BASE_URL}/api/admin/upload',
            headers=auth_headers,
            files=files
        )
        assert response.status_code == 200
        data = response.json()
        
        url = data['url']
        assert url.endswith('.webp')
        
        # Download and check dimensions
        file_response = requests.get(f'{BASE_URL}{url}')
        assert file_response.status_code == 200
        
        # Load and verify dimensions are within max 2400
        img = PILImage.open(io.BytesIO(file_response.content))
        max_dim = max(img.size)
        assert max_dim <= 2400, f"Image should be max 2400px, but got {max_dim}"
        
        print(f"PASS: Large image resized to {img.size}, max dim = {max_dim}px")
    
    def test_upload_invalid_extension_rejected(self, auth_headers):
        """Upload with invalid extension should be rejected"""
        # Create a fake file with disallowed extension
        buf = io.BytesIO(b'not a real image')
        files = {'file': ('test.bmp', buf, 'image/bmp')}
        response = requests.post(
            f'{BASE_URL}/api/admin/upload',
            headers=auth_headers,
            files=files
        )
        assert response.status_code == 400
        print("PASS: Invalid file extension (.bmp) rejected with 400")
    
    def test_upload_webp_stays_webp(self, auth_headers):
        """Upload WebP should stay as WebP"""
        # Create a WebP image
        img = PILImage.new('RGB', (400, 300), color='red')
        buf = io.BytesIO()
        img.save(buf, format='WEBP', quality=85)
        buf.seek(0)
        
        files = {'file': ('test.webp', buf, 'image/webp')}
        response = requests.post(
            f'{BASE_URL}/api/admin/upload',
            headers=auth_headers,
            files=files
        )
        assert response.status_code == 200
        data = response.json()
        
        url = data['url']
        assert url.endswith('.webp')
        print(f"PASS: WebP upload preserved as WebP: {url}")


class TestStaticImages:
    """Test static images are correctly in WebP format"""
    
    def test_hero_image_is_webp(self):
        """Hero image should be accessible and in WebP format"""
        # Check the main hero image from images.js
        response = requests.get(f'{BASE_URL}/images/Header_Porsche_HD.webp')
        assert response.status_code == 200, "Hero image not accessible"
        assert 'image' in response.headers.get('Content-Type', '').lower()
        print("PASS: Hero image /images/Header_Porsche_HD.webp accessible")
    
    def test_project_thumbnails_are_webp(self):
        """Several project thumbnails should be accessible as WebP"""
        # Test a few key project images from images.js
        test_images = [
            '/images/IMG_4931.webp',  # Flottenbranding
            '/images/IMG_6836.webp',  # Lackschutz
            '/images/IMG_6556 2.webp',  # Designfolierung
            '/images/IMG_5646.webp',  # Headquarters
            '/images/IMG_7190.webp',  # Messestand
        ]
        
        for img_path in test_images:
            response = requests.get(f'{BASE_URL}{img_path}')
            assert response.status_code == 200, f"Image not accessible: {img_path}"
            print(f"PASS: Project image accessible: {img_path}")
    
    def test_service_page_images_are_webp(self):
        """Service page hero images should be accessible"""
        # From images.js servicePages
        service_images = [
            '/images/porsche-gt3-cup-race.webp',  # mobilitaet
            '/images/IMG_5646.webp',  # architektur-raum
            '/images/IMG_7190.webp',  # markenkommunikation
            '/images/IMG_7057.webp',  # design-konzepte
            '/images/IMG_5386.webp',  # projektmanagement
        ]
        
        for img_path in service_images:
            response = requests.get(f'{BASE_URL}{img_path}')
            assert response.status_code == 200, f"Service image not accessible: {img_path}"
            print(f"PASS: Service page image accessible: {img_path}")


class TestAdminLogin:
    """Test admin login for editor"""
    
    def test_admin_login_success(self):
        """Admin login with correct password"""
        response = requests.post(
            f'{BASE_URL}/api/admin/login',
            json={'password': ADMIN_PASSWORD}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get('status') == 'ok'
        assert 'token' in data
        print("PASS: Admin login successful with visuworks2026")
    
    def test_admin_login_wrong_password(self):
        """Admin login with wrong password fails"""
        response = requests.post(
            f'{BASE_URL}/api/admin/login',
            json={'password': 'wrongpassword'}
        )
        assert response.status_code == 401
        print("PASS: Admin login with wrong password returns 401")


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
