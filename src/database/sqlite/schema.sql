-- SQLite Database Schema for SSH Robotics Contact System
-- This matches the Supabase schema structure

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    project_type TEXT NOT NULL,
    project_description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Service inquiry table (for "Get Quote" buttons)
CREATE TABLE IF NOT EXISTS service_inquiries (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    service_type TEXT NOT NULL CHECK (service_type IN ('robotics', 'automation', 'electronics')),
    email TEXT NOT NULL,
    name TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_service_inquiries_created_at ON service_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_inquiries_service_type ON service_inquiries(service_type);