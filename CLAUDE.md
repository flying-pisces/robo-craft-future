# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SSH Robotics company website built as a React SPA with TypeScript, deployed to GitHub Pages at www.sshrobotics.com. The site includes a contact form with Supabase backend for lead generation.

**Live URL**: https://www.sshrobotics.com  
**Tech Stack**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Supabase

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on localhost:8080)
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Frontend Structure
- **React Router** with 3 main routes: `/` (Index), `/team` (Team), and 404 handler
- **shadcn/ui** component library with extensive UI components in `src/components/ui/`
- **Tailwind CSS** for styling with custom configuration
- **React Query** for state management and API calls
- **React Hook Form + Zod** for form validation

### Backend Integration
- **Supabase** as backend-as-a-service for contact form submissions
- Two main database tables:
  - `contact_submissions` - Full contact form data
  - `service_inquiries` - Service interest tracking from "Get Quote" buttons
- Environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Key Files & Services
- `src/lib/supabase.ts` - Database client configuration and TypeScript interfaces
- `src/services/contactService.ts` - Service layer with static methods for all database operations
- `src/components/Contact.tsx` - Main contact form with Supabase integration
- `supabase-schema.sql` - Database schema definition

### Component Architecture
- Page components in `src/pages/`: Index, Team, NotFound
- Feature components in `src/components/`: Hero, Services, About, Contact
- Utility hooks in `src/hooks/`: use-mobile, use-toast
- All UI components follow shadcn/ui patterns with consistent prop interfaces

### Routing
- SPA routing with React Router
- Custom routes must be added ABOVE the catch-all "*" route in App.tsx
- Team page route exists but content needs development

### Deployment
- GitHub Pages deployment with custom domain
- Environment variables configured in GitHub secrets
- SSL certificate auto-configured
- Build artifacts in `dist/` directory

## Database Schema

The Supabase backend uses these tables:
- **contact_submissions**: Full contact form submissions with project details
- **service_inquiries**: Quick service interest tracking from service cards

Row Level Security is currently disabled for public form access.

## Development Notes

- Development server runs on port 8080 (configured in vite.config.ts)
- Path alias `@` points to `src/` directory
- TypeScript strict mode enabled with separate configs for app and node
- ESLint configured with React hooks and refresh plugins
- PostCSS configured for Tailwind processing

## Future Enhancement Areas

- Admin dashboard for viewing submissions
- Email notifications for new inquiries  
- Enhanced security with proper RLS policies
- Analytics integration
- Team member profiles for Team page