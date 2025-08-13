# SQLite Production Deployment

Your SSH Robotics website now uses **SQLite as the primary database**! Here's how to deploy the backend for production.

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended - Free)

1. **Create Railway Account**: Go to [railway.app](https://railway.app)
2. **Deploy from GitHub**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `robo-craft-future` repository
   - Choose "backend" folder as the deployment directory
3. **Set Environment Variables**:
   ```
   PORT=3001
   DB_PATH=/app/data/ssh-robotics.db
   CORS_ORIGIN=https://sshrobotics.com,https://www.sshrobotics.com
   ```
4. **Get your backend URL** (e.g., `https://yourapp-production.railway.app`)

### Option 2: Render (Free)

1. **Create Render Account**: Go to [render.com](https://render.com)
2. **New Web Service** → Connect GitHub → Select repo
3. **Settings**:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`
4. **Environment Variables**: Same as Railway above

### Option 3: Fly.io (Free with Credit Card)

1. **Install Fly CLI**: `brew install flyctl`
2. **Deploy**:
   ```bash
   cd backend
   fly launch
   fly deploy
   ```

## 🔧 Update Frontend Configuration

Once your backend is deployed, update the frontend:

### For GitHub Pages Production

1. **Go to GitHub Repository Settings**
2. **Pages** → **Environment Variables**
3. **Add**:
   ```
   VITE_DATABASE_TYPE=sqlite
   VITE_SQLITE_API_URL=https://your-backend-url.com/api
   ```

### For Local Development

Update `.env`:
```bash
VITE_DATABASE_TYPE=sqlite
VITE_SQLITE_API_URL=https://your-backend-url.com/api
```

## ✅ Verification Steps

1. **Backend Health Check**: Visit `https://your-backend-url.com/api/health`
   - Should return: `{"status":"healthy","database":"sqlite"}`

2. **Test Contact Form**: 
   - Submit a test form on sshrobotics.com
   - Check backend logs for successful submission

3. **View Database**: Use DB Browser for SQLite to see submissions

## 🆘 Quick Local Testing

While setting up production, you can test locally:

```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend with local backend
npm run dev
```

## 🔄 Rollback Option

If needed, you can quickly switch back to Supabase:

1. **Update Environment Variable**:
   ```
   VITE_DATABASE_TYPE=supabase
   ```

2. **Redeploy**: Changes take effect immediately

## 📊 Production Monitoring

- **Backend Logs**: Check Railway/Render dashboard for errors
- **Database Size**: SQLite file grows with submissions
- **Health Endpoint**: Monitor `/api/health` for uptime

Your SQLite backend is now production-ready! 🎉