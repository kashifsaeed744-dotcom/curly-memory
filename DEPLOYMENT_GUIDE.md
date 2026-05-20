# COMPREHENSIVE DEPLOYMENT & CUSTOMIZATION GUIDE

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Gemini API Key (get one at https://ai.google.dev)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the app:**
   - Open http://localhost:3000

---

## 🎯 AI Mode Configuration

Lumina includes 4 pre-configured AI personalities:

### Default Mode
- Friendly and helpful personal assistant
- Best for: General-purpose tasks, file management, notes

### Developer Mode
- Technical focus on coding and architecture
- Best for: Code review, debugging, DevOps tasks

### Creative Mode
- Imaginative and inspiring
- Best for: Brainstorming, writing, content creation

### Research Mode
- Analytical and precise
- Best for: Data analysis, academic research, documentation

**Switch modes via:**
- API: `POST /api/ai/mode` with `{ "mode": "developer" }`
- UI: Click mode selector in settings
- Env: Set `AI_MODE=developer` in `.env`

---

## 🔐 Security Configuration

### Allowed Commands
Restrict shell command execution by editing `.env`:
```env
ALLOWED_COMMANDS="ls,cd,pwd,find,grep,cat,mkdir,npm,node,python"
```

### Rate Limiting
Prevent abuse with rate limiting:
```env
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=60000
```

### API Key Best Practices
1. **Never commit** `.env` files to git
2. **Use environment variables** in production
3. **Rotate keys** regularly
4. **Monitor API usage** via Google Cloud Console

---

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build image
docker build -t lumina-ai .

# Run container
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key_here \
  -e AI_MODE=default \
  lumina-ai
```

### Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f lumina-app

# Stop services
docker-compose down
```

---

## ☁️ Cloud Deployment

### Vercel (Recommended for Vite + Express)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables:**
   - Dashboard → Project Settings → Environment Variables
   - Add `GEMINI_API_KEY` and `AI_MODE`

4. **Access your app:**
   - https://your-project.vercel.app

### Netlify

1. **Connect your GitHub repo**
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment variables:**
   - Add `GEMINI_API_KEY` in Netlify dashboard
4. **Deploy:**
   - Netlify auto-deploys on git push

### Railway

1. **Connect GitHub repo**
2. **Create new service**
3. **Add environment variables**
4. **Deploy automatically**

### Heroku (Legacy)

```bash
heroku create lumina-ai
heroku config:set GEMINI_API_KEY=your_key
git push heroku main
```

---

## 🛠️ API Endpoints Reference

### Health & Status
```
GET /api/health                          # Check if service is running
GET /api/system/status                   # Get system status
```

### AI Modes
```
GET /api/ai/modes                        # List available modes
POST /api/ai/mode                        # Switch AI mode
```

### Chat
```
POST /api/agent/chat                     # Send message to Lumina
Body: {
  "message": "Hello Lumina",
  "history": [],
  "conversationId": "optional_id"
}
```

### File Management
```
GET /api/system/files                    # List files
GET /api/system/file/content             # Read file content
```

### Commands
```
POST /api/system/exec                    # Execute shell command
Body: { "command": "ls -la" }
```

### Preferences
```
GET /api/system/prefs                    # Get user preferences
POST /api/system/prefs                   # Update preferences
```

### Notes
```
GET /api/system/notes                    # Get all notes
POST /api/system/notes                   # Create/update note
DELETE /api/system/notes/:id             # Delete note
```

---

## 📊 Advanced Configuration

### Custom System Prompts

Edit `config/systemPrompts.ts` to add custom AI personalities:

```typescript
export const SYSTEM_PROMPTS: Record<string, SystemPromptConfig> = {
  myCustomMode: {
    name: 'My Custom Mode',
    description: 'Specialized for my needs',
    prompt: 'You are a specialized AI for...',
    temperature: 0.5,
    maxTokens: 2000,
  },
};
```

### Model Selection

```env
# Options: gemini-3.5-flash, gemini-pro, gemini-pro-vision
AI_MODEL="gemini-3.5-flash"
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=2000
```

### Feature Flags

```env
ENABLE_FILE_UPLOAD=true
ENABLE_CODE_EXECUTION=true
ENABLE_VOICE_INPUT=true
ENABLE_VOICE_OUTPUT=false
ENABLE_DATABASE_SYNC=false
ENABLE_WEBHOOK_TRIGGERS=false
```

---

## 🔌 Integrations

### GitHub Integration
```env
GITHUB_TOKEN=your_github_token
```
Enables: Repository operations, issue tracking, code analysis

### Weather Widget (Coming Soon)
```env
OPENWEATHER_API_KEY=your_api_key
```

### Database Integration (Coming Soon)
```env
DATABASE_URL=postgres://user:pass@localhost/db
DATABASE_NAME=lumina_db
```

---

## 📈 Monitoring & Logging

### Logging Configuration
```env
LOG_LEVEL=info                           # debug, info, warn, error
DEBUG_MODE=false
```

### Performance Monitoring

Monitor at:
- Local: Check browser DevTools Console
- Production: Integrate with Sentry, DataDog, or similar

---

## 🧪 Testing & Development

### Run Tests
```bash
npm run test                             # (add when configured)
```

### Type Checking
```bash
npm run lint
```

### Build Production
```bash
npm run build
npm start                                # Run production build
```

---

## 🐛 Troubleshooting

### API Key Not Working
- Verify key is correctly set in `.env`
- Check key has Gemini API enabled in Google Cloud
- Ensure key has sufficient quota

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
npm cache clean --force
npm install
npm run build
```

---

## 📚 Advanced Topics

### Custom Hooks (React)
Create custom React hooks in `src/hooks/` for reusable logic

### Middleware (Express)
Add custom middleware in `server.ts` for additional processing

### Database Integration
- Connect PostgreSQL via `DATABASE_URL`
- Implement user authentication
- Store conversation history

### Webhooks
Enable webhooks for external service integration

---

## 📞 Support & Resources

- **Google Gemini Docs:** https://ai.google.dev/docs
- **Vite Documentation:** https://vitejs.dev
- **Express.js Guide:** https://expressjs.com
- **React Documentation:** https://react.dev

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎓 Next Steps

1. ✅ Install dependencies
2. ✅ Set up Gemini API key
3. ✅ Run locally with `npm run dev`
4. ✅ Explore AI modes in settings
5. ✅ Customize system prompts
6. ✅ Deploy to your preferred platform

Happy coding! 🚀
