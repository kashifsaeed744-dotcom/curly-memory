# 🚀 LUMINA AI OS - QUICK START & DEPLOYMENT GUIDE

Welcome! This comprehensive guide covers everything you need to get Lumina running locally, customize it, and deploy it to production.

## 📋 Table of Contents

1. [Quick Start (5 minutes)](#quick-start)
2. [Customization](#customization)
3. [Deployment Options](#deployment-options)
4. [API Reference](#api-reference)
5. [Advanced Configuration](#advanced-configuration)
6. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

### Step 1: Prerequisites
Ensure you have:
- **Node.js 18+**: Download from https://nodejs.org
- **npm or yarn**: Comes with Node.js
- **Gemini API Key**: Get one free at https://ai.google.dev

### Step 2: Clone & Install
```bash
# Clone the repository (if not already)
git clone <repo-url>
cd lumina-ai-os

# Install dependencies
npm install
```

### Step 3: Configure Environment
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Gemini API Key
# On macOS/Linux:
nano .env

# On Windows (or any OS):
# Use your preferred text editor to open .env
```

Your `.env` should look like:
```env
GEMINI_API_KEY="your-actual-gemini-key-here"
APP_URL="http://localhost:3000"
AI_MODE="default"
```

### Step 4: Run Locally
```bash
npm run dev
```

Open http://localhost:3000 in your browser 🎉

---

## 🎨 Customization

### Change AI Personality

Edit `config/systemPrompts.ts` to create custom AI modes:

```typescript
export const SYSTEM_PROMPTS = {
  myAssistant: {
    name: 'My Custom Assistant',
    description: 'Tailored for my needs',
    prompt: 'You are a specialized AI that...',
    temperature: 0.6,
    maxTokens: 2500,
  },
};
```

Then use it:
```bash
# Via env variable
AI_MODE="myAssistant"

# Via API
POST /api/ai/mode
{ "mode": "myAssistant" }
```

### Customize UI

1. **Theme**: Edit `src/styles/theme.css`
2. **Components**: Modify files in `src/components/`
3. **Colors**: Update Tailwind config in `tailwind.config.ts`

### Modify System Capabilities

Edit `.env` to enable/disable features:
```env
ENABLE_FILE_UPLOAD=true
ENABLE_CODE_EXECUTION=true
ENABLE_VOICE_INPUT=true
ENABLE_VOICE_OUTPUT=false
```

---

## ☁️ Deployment Options

### Option 1: Vercel (Recommended - 2 minutes)

Vercel is perfect for React + Node apps and offers free tier.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts and add environment variables
vercel env add GEMINI_API_KEY
```

Your app will be live at: `https://your-project.vercel.app`

**Pros:**
- ✅ Free tier available
- ✅ Auto-deploys on git push
- ✅ Built-in analytics
- ✅ Custom domain support

**Cons:**
- ❌ Limited free tier (500MB storage)
- ❌ Best for small projects

---

### Option 2: Netlify (Easy - 3 minutes)

Great for static sites with serverless functions.

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Add environment variables**
   - Site settings → Build & deploy → Environment
   - Add `GEMINI_API_KEY`

4. **Deploy**
   - Click "Deploy site"

**Pros:**
- ✅ Easy GitHub integration
- ✅ Generous free tier
- ✅ Forms & CMS support
- ✅ Instant rollbacks

**Cons:**
- ❌ Serverless functions have limitations
- ❌ Cold start delays on Node.js functions

---

### Option 3: Docker (Local or VPS)

Perfect for full control and self-hosting.

```bash
# Build Docker image
docker build -t lumina-ai .

# Run container
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  lumina-ai
```

Or use Docker Compose:
```bash
# Copy environment file
cp .env.example .env

# Start all services (app + nginx proxy)
docker-compose up -d

# View logs
docker-compose logs -f lumina-app

# Stop services
docker-compose down
```

**Pros:**
- ✅ Full control
- ✅ Can self-host on any VPS
- ✅ Better for complex setups
- ✅ Reproducible environments

**Cons:**
- ❌ Requires VPS (costs $5-20/month)
- ❌ Manual scaling
- ❌ More infrastructure knowledge needed

**Popular VPS Providers:**
- AWS EC2 (free tier available)
- DigitalOcean ($6/month)
- Linode ($6/month)
- Heroku ($7/month with web dyno)

---

### Option 4: Railway (Modern - 2 minutes)

Sleek modern deployment platform with generous free tier.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

Or connect GitHub:
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables
5. Deploy

**Pros:**
- ✅ Modern interface
- ✅ Generous free tier ($5/month credit)
- ✅ Easy deployments
- ✅ Good documentation

**Cons:**
- ❌ Newer platform (less mature)
- ❌ Smaller community than Vercel/Netlify

---

### Option 5: Heroku (Legacy - 3 minutes)

Classic platform, now requires credit card for free tier.

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create lumina-ai

# Set environment variables
heroku config:set GEMINI_API_KEY=your_key

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Note:** Heroku removed free tier but still offers affordable options.

---

## 📡 API Reference

### Health Check
```bash
GET /api/health
# Returns: { status: "healthy", uptime: 123.45 }
```

### AI Modes
```bash
# Get available modes
GET /api/ai/modes
# Returns: { modes: [...], current: "default" }

# Switch mode
POST /api/ai/mode
# Body: { "mode": "developer" }
```

### Chat with AI
```bash
POST /api/agent/chat
# Body: {
#   "message": "Hello Lumina",
#   "history": [],
#   "conversationId": "optional"
# }
# Returns: { text: "...", mode: "default" }
```

### File Management
```bash
# List files
GET /api/system/files

# Read file content
GET /api/system/file/content?path=./package.json

# Execute command (if enabled)
POST /api/system/exec
# Body: { "command": "ls -la" }
```

### Preferences
```bash
# Get preferences
GET /api/system/prefs

# Update preferences
POST /api/system/prefs
# Body: { theme: "dark", aiMode: "developer" }
```

### Notes
```bash
# Get all notes
GET /api/system/notes

# Create/update note
POST /api/system/notes
# Body: { id: "1", title: "...", content: "..." }

# Delete note
DELETE /api/system/notes/1
```

---

## 🔒 Advanced Configuration

### Security Settings

Edit `.env`:
```env
# Allow only specific commands
ALLOWED_COMMANDS="ls,cd,pwd,find,grep,cat,npm,node"

# Rate limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000

# File restrictions
MAX_FILE_SIZE_MB=50
ALLOWED_FILE_EXTENSIONS=".txt,.md,.json,.js,.ts"
```

### Performance Tuning

```env
# Caching
CACHE_ENABLED=true
CACHE_TTL_SECONDS=3600

# Request timeouts
REQUEST_TIMEOUT_MS=30000

# Connection pooling
CONNECTION_POOL_SIZE=10
```

### Logging & Monitoring

```env
# Logging
LOG_LEVEL=info
LOG_REQUESTS=true
DEBUG_MODE=false

# Analytics (when integrated)
ANALYTICS_ENABLED=false
```

---

## 🐛 Troubleshooting

### Problem: "GEMINI_API_KEY is not configured"

**Solution:**
1. Create `.env` file in project root
2. Add your actual API key:
   ```env
   GEMINI_API_KEY="paste-your-key-here"
   ```
3. Restart the server

### Problem: Port 3000 already in use

**Solution:**
```bash
# Find process on port 3000
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Problem: Dependencies won't install

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: Build fails in production

**Solution:**
```bash
# Check for TS errors
npm run lint

# Try building locally
npm run build

# Check logs on hosting platform
# Vercel: https://vercel.com/dashboard
# Netlify: https://app.netlify.com
```

### Problem: Slow responses from AI

**Solution:**
1. Check API quota in Google Cloud Console
2. Try faster model: `gemini-3.5-flash`
3. Reduce `AI_MAX_TOKENS` in `.env`
4. Check internet connection

---

## 📚 Useful Resources

- **Google Gemini API**: https://ai.google.dev
- **Vite Documentation**: https://vitejs.dev
- **Express.js Guide**: https://expressjs.com
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

---

## 🎯 Next Steps

1. ✅ Set up locally
2. ✅ Customize AI personality
3. ✅ Deploy to cloud
4. ✅ Share with others
5. ✅ Add more features!

---

## 💬 Support

For issues:
1. Check [Troubleshooting](#troubleshooting) section
2. Review environment configuration
3. Check console for error messages
4. Review logs on hosting platform

---

Happy building! 🚀✨
