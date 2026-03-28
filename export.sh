#!/bin/bash
# VISUWORKS Export Script
# Creates a clean export of the project for external hosting

set -e

EXPORT_DIR="visuworks-export"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE_NAME="visuworks-${TIMESTAMP}.tar.gz"

echo "🚀 VISUWORKS Export Script"
echo "========================="

# Create export directory
rm -rf "$EXPORT_DIR"
mkdir -p "$EXPORT_DIR"

echo "📁 Copying project files..."

# Copy frontend
cp -r frontend "$EXPORT_DIR/"
rm -rf "$EXPORT_DIR/frontend/node_modules"
rm -f "$EXPORT_DIR/frontend/.env"
cp frontend/.env.example "$EXPORT_DIR/frontend/.env.example"

# Copy backend
cp -r backend "$EXPORT_DIR/"
rm -rf "$EXPORT_DIR/backend/venv"
rm -rf "$EXPORT_DIR/backend/__pycache__"
rm -f "$EXPORT_DIR/backend/.env"
cp backend/.env.example "$EXPORT_DIR/backend/.env.example"

# Copy database scripts
cp -r database "$EXPORT_DIR/"

# Copy root files
cp docker-compose.yml "$EXPORT_DIR/"
cp .env.example "$EXPORT_DIR/"
cp .gitignore "$EXPORT_DIR/"
cp README.md "$EXPORT_DIR/"
cp DEPLOYMENT.md "$EXPORT_DIR/"

# Remove platform-specific files
rm -rf "$EXPORT_DIR/.emergent" 2>/dev/null || true
rm -rf "$EXPORT_DIR/.git" 2>/dev/null || true
rm -rf "$EXPORT_DIR/memory" 2>/dev/null || true
rm -rf "$EXPORT_DIR/test_reports" 2>/dev/null || true

echo "📦 Creating archive..."
tar -czf "$ARCHIVE_NAME" "$EXPORT_DIR"

echo ""
echo "✅ Export complete!"
echo "   Archive: $ARCHIVE_NAME"
echo "   Size: $(du -h "$ARCHIVE_NAME" | cut -f1)"
echo ""
echo "📋 Next steps:"
echo "   1. Download the archive"
echo "   2. Extract on your server: tar -xzf $ARCHIVE_NAME"
echo "   3. Follow DEPLOYMENT.md for setup instructions"
