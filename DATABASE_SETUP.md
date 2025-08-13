# Dual Database Setup Guide

Your SSH Robotics website now supports both **Supabase** and **SQLite** databases! You can switch between them using environment variables.

## Quick Setup

### 1. Choose Your Database

Edit your `.env` file and set:

```bash
# For Supabase (current working setup)
VITE_DATABASE_TYPE=supabase

# For SQLite (new local database)  
VITE_DATABASE_TYPE=sqlite
```

### 2. Using Supabase (Default)

✅ **Already working!** Your current Supabase setup will continue to work as before.

```bash
VITE_DATABASE_TYPE=supabase
```

### 3. Using SQLite (New Option)

For SQLite, you need to run a backend server alongside your frontend:

#### Install Backend Dependencies
```bash
cd backend
npm install
```

#### Start SQLite Backend Server
```bash
cd backend
npm run dev
```
The backend runs on `http://localhost:3001`

#### Start Frontend (in separate terminal)
```bash
npm run dev
```
The frontend runs on `http://localhost:8080`

## Environment Variables Reference

```bash
# Database Selection
VITE_DATABASE_TYPE=supabase  # or 'sqlite'

# Supabase Configuration (keep your existing values)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# SQLite Configuration
VITE_SQLITE_API_URL=http://localhost:3001/api
```

## How It Works

### Architecture
- **Database Interface**: Common contract for all databases
- **Provider Pattern**: Separate implementations for Supabase and SQLite
- **Factory Pattern**: Automatically creates the right database based on config
- **Service Layer**: Your existing ContactService works with both databases

### Database Features
Both databases support:
- ✅ Contact form submissions
- ✅ Service inquiries ("Get Quote" buttons)
- ✅ Admin data retrieval
- ✅ Same data structure
- ✅ Same API interface

### SQLite Details
- **Local Database**: `ssh-robotics.db` created in project root
- **Backend API**: Express.js server with REST endpoints
- **Schema**: Matches Supabase structure exactly
- **Performance**: Fast local queries, no network dependency

## Testing Your Setup

### Test Supabase (Current)
```bash
# Set in .env
VITE_DATABASE_TYPE=supabase

# Start frontend
npm run dev

# Submit test form at http://localhost:8080
# Check submissions in Supabase dashboard
```

### Test SQLite (New)
```bash
# Set in .env  
VITE_DATABASE_TYPE=sqlite

# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend  
npm run dev

# Submit test form at http://localhost:8080
# Check backend logs for database activity
```

### Health Check
Visit `http://localhost:3001/api/health` to verify SQLite backend is running.

## Production Deployment

### Supabase Production
✅ Already configured with GitHub Pages deployment

### SQLite Production
For SQLite in production, you'll need to:
1. Deploy the backend server (e.g., Railway, Heroku, VPS)
2. Update `VITE_SQLITE_API_URL` to your backend URL
3. Ensure database file persistence on your server

## Database Switching

You can switch databases anytime by changing `VITE_DATABASE_TYPE` in your `.env` file. **Data is not automatically synced between databases** - each maintains its own data.

## Troubleshooting

### "SQLite API not available" 
- Backend server not running: `cd backend && npm run dev`
- Wrong API URL in `.env`
- Port 3001 already in use

### "Database not initialized"
- Check `.env` file has correct `VITE_DATABASE_TYPE`
- Restart development server after env changes

### Both databases working?
Check `ContactService.getCurrentDatabaseType()` in browser console to see which database is active.