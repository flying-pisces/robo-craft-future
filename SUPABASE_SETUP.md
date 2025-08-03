# Supabase Backend Setup for SSH Robotics Website

## Overview

This project now includes a Supabase backend to handle:
- Contact form submissions
- Service inquiries 
- Customer lead tracking

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose organization and enter project details:
   - **Name**: SSH Robotics Website
   - **Database Password**: Generate a secure password
   - **Region**: Choose closest to your users
4. Wait for project creation (2-3 minutes)

### 2. Get Project Credentials

1. In your Supabase dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** (under "Project URL")
   - **Anon Public Key** (under "Project API keys")

### 3. Set Environment Variables

1. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql` 
3. Paste and run the SQL to create tables and policies

### 5. Configure Row Level Security (RLS)

The schema includes RLS policies that:
- Allow anyone to insert contact submissions and service inquiries
- Restrict reading data to admin users only
- Include proper indexes for performance

### 6. Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Visit the contact form and submit a test message
3. Check your Supabase dashboard → Table Editor → contact_submissions to see the data

## Database Schema

### contact_submissions
- Stores detailed project inquiries from the contact form
- Fields: name, email, company, project_type, description, timestamp

### service_inquiries  
- Tracks interest in specific services (robotics, automation, electronics)
- Fields: service_type, email, name, message, timestamp

## Features Implemented

### ✅ Contact Form
- Full validation with React Hook Form
- Real-time error handling
- Toast notifications for success/error
- Automatic form reset after submission

### ✅ Service Interest Tracking
- "Get Quote" buttons on service cards
- Anonymous interest tracking
- Toast feedback for user engagement

### ✅ Admin Features (Future)
- Dashboard to view all submissions
- Email notifications for new inquiries
- Lead management system

## Production Deployment

### Environment Variables for GitHub Pages

Since this is deployed on GitHub Pages, you'll need to add environment variables:

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Update GitHub Actions Workflow

The workflow needs to include environment variables. Update `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

## Security Notes

- **Anon Key**: Safe to expose in frontend (public read/write with RLS)
- **Service Key**: Never expose in frontend code
- **RLS Policies**: Ensure proper data access control
- **Admin Access**: Will need separate authentication system

## Next Steps

1. Set up email notifications for new submissions
2. Create admin dashboard for viewing leads
3. Add authentication for admin users
4. Implement lead status tracking
5. Add analytics and reporting features