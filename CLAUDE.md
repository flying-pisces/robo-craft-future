# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TactoSkin company website built as a React SPA with TypeScript. TactoSkin provides modular tactile sensing skin for robots - the "missing modality" that gives robots the sense of touch. The site showcases our hex module product lines and includes a contact form for partnership inquiries.

**Tech Stack**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + PocketBase

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
- **PocketBase** as backend-as-a-service for contact form submissions
- Two main database collections:
  - `contact_submissions` - Full contact form data (partnership inquiries)
  - `service_inquiries` - Product interest tracking from "Request Specs" buttons
- Environment variables: `VITE_POCKETBASE_URL` and `VITE_DATABASE_TYPE`

### Key Files & Services
- `src/database/pocketbase/pocketbase-provider.ts` - PocketBase client configuration and implementation
- `src/database/database-factory.ts` - Database provider factory for switching between PocketBase and SQLite
- `src/services/contactService.ts` - Service layer with static methods for all database operations
- `src/components/Contact.tsx` - Main contact form with database integration

### Component Architecture
- Page components in `src/pages/`: Index, Team, NotFound
- Feature components in `src/components/`: Hero, Services (Products), About, Contact
- Utility hooks in `src/hooks/`: use-mobile, use-toast
- All UI components follow shadcn/ui patterns with consistent prop interfaces

### Product Lines (Services.tsx)
- **H-Series** (Hand): 361 sensels/cm², 0.1g sensitivity, 500-1000Hz, ~$800/pair
- **B-Series** (Body): 4-50 sensels/cm², matte silicone finish, ~$1,800 full coverage
- **F-Series** (Foot): Reinforced TPU, 200K+ cycles, ~$400/pair

### Routing
- SPA routing with React Router
- Custom routes must be added ABOVE the catch-all "*" route in App.tsx
- Team page shows founding team members

### Deployment
- GitHub Pages deployment
- Environment variables configured in GitHub secrets
- SSL certificate auto-configured
- Build artifacts in `dist/` directory

## Database Schema

The PocketBase backend uses these collections:
- **contact_submissions**: Partnership and pilot program inquiries
- **service_inquiries**: Quick product interest tracking from product cards

Both collections support the same data structure as defined in `src/types/database.ts`. The application also supports SQLite as an alternative backend via the database factory pattern.

## Development Notes

- Development server runs on port 8080 (configured in vite.config.ts)
- Path alias `@` points to `src/` directory
- TypeScript strict mode enabled with separate configs for app and node
- ESLint configured with React hooks and refresh plugins
- PostCSS configured for Tailwind processing

## Future Enhancement Areas

- Product datasheet downloads
- OEM partner portal
- Technical documentation
- Demo request scheduling
- Analytics integration
