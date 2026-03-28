// MongoDB Initialization Script
// Run with: mongosh < init-db.js

// Switch to visuworks database
use visuworks;

// Create indexes for better performance
db.content_overrides.createIndex({ key: 1 }, { unique: true });
db.content_overrides.createIndex({ page: 1 });
db.layout_settings.createIndex({ page: 1 }, { unique: true });
db.layout_templates.createIndex({ name: 1 }, { unique: true });
db.contacts.createIndex({ created_at: -1 });
db.contacts.createIndex({ email: 1 });

// Create default layout settings for homepage
db.layout_settings.insertOne({
  page: "/",
  sections: {
    hero: { order: 0, isVisible: true, paddingTop: "default", paddingBottom: "default" },
    services: { order: 1, isVisible: true, paddingTop: "default", paddingBottom: "default" },
    projects: { order: 2, isVisible: true, paddingTop: "default", paddingBottom: "default" },
    testimonials: { order: 3, isVisible: true, paddingTop: "default", paddingBottom: "default" },
    cta: { order: 4, isVisible: true, paddingTop: "default", paddingBottom: "default" }
  },
  updatedAt: new Date()
});

print("Database initialized successfully!");
print("Collections created: content_overrides, layout_settings, layout_templates, contacts");
