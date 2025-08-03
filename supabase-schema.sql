-- Supabase Database Schema for SSH Robotics Website

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  project_type VARCHAR(100) NOT NULL,
  project_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Service inquiries table
CREATE TABLE service_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('robotics', 'automation', 'electronics')),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(200),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for contact_submissions
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view contact submissions" ON contact_submissions
  FOR SELECT USING (false); -- Will be updated with admin role check

-- Policies for service_inquiries  
CREATE POLICY "Anyone can insert service inquiries" ON service_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view service inquiries" ON service_inquiries
  FOR SELECT USING (false); -- Will be updated with admin role check

-- Indexes for performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_service_inquiries_created_at ON service_inquiries(created_at DESC);
CREATE INDEX idx_service_inquiries_service_type ON service_inquiries(service_type);