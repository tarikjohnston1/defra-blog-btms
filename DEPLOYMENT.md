# Deployment Guide

This guide covers deploying your DEFRA Design History system to production.

## 🏗️ Architecture Overview

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Content   │ ───────>│    Strapi    │<────────│   Next.js   │
│  Designers  │         │     CMS      │         │   Frontend  │
│             │         │  (Backend)   │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
                               │                        │
                               ▼                        ▼
                        ┌──────────────┐         ┌─────────────┐
                        │  PostgreSQL  │         │   Vercel    │
                        │   Database   │         │   Hosting   │
                        └──────────────┘         └─────────────┘
```

## 🎯 Recommended Setup

### Backend: Strapi Cloud (Easiest)

**Why?**
- Managed Strapi hosting
- Includes database
- Automatic SSL
- Easy to set up
- Free tier available

**Steps:**

1. Sign up at https://cloud.strapi.io/
2. Create new project
3. Connect your GitHub repository (backend folder)
4. Set environment variables
5. Deploy

**Pricing:** Free tier → $99/month for production

**Alternative:** Railway, Render, or DigitalOcean App Platform

### Frontend: Vercel (Easiest)

**Why?**
- Built for Next.js
- Automatic deployments
- Global CDN
- Free tier available
- SSL included

**Steps:**

1. Sign up at https://vercel.com
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_STRAPI_URL` (your Strapi URL)
5. Deploy

**Pricing:** Free for hobby projects → $20/month for team

**Alternative:** Netlify, AWS Amplify, or Cloudflare Pages

## 📋 Pre-Deployment Checklist

### Backend (Strapi)

- [ ] Change database from SQLite to PostgreSQL
- [ ] Set production environment variables
- [ ] Review and set API permissions
- [ ] Configure CORS for your frontend domain
- [ ] Set up regular database backups
- [ ] Change admin panel password
- [ ] Enable rate limiting
- [ ] Configure email provider (for notifications)

### Frontend (Next.js)

- [ ] Set `NEXT_PUBLIC_STRAPI_URL` to production Strapi URL
- [ ] Test build locally (`npm run build`)
- [ ] Enable analytics if needed
- [ ] Test all routes
- [ ] Check image optimization settings

## 🔐 Environment Variables

### Backend (Strapi)

Create a `.env` file in `backend/`:

```bash
# Server
HOST=0.0.0.0
PORT=1337
APP_KEYS=generate-random-key-1,generate-random-key-2,generate-random-key-3,generate-random-key-4
API_TOKEN_SALT=generate-random-salt
ADMIN_JWT_SECRET=generate-random-secret
TRANSFER_TOKEN_SALT=generate-random-salt
JWT_SECRET=generate-random-secret

# Database (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-user
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=true

# URL
URL=https://your-strapi-domain.com

# CORS
# Add your frontend URL
```

**Generate secrets:**
```bash
# Generate random strings for secrets
openssl rand -base64 32
```

### Frontend (Next.js)

Create `.env.production`:

```bash
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
```

## 🗄️ Database Migration

### From SQLite to PostgreSQL

1. **Set up PostgreSQL database:**
   - Use managed service (Heroku Postgres, AWS RDS, DigitalOcean Managed DB)
   - Or install PostgreSQL on your server

2. **Update Strapi config:**

Install PostgreSQL client:
```bash
cd backend
npm install pg
```

3. **Update `.env` with PostgreSQL credentials** (see above)

4. **Run migration:**
```bash
cd backend
npm run build
npm run start
```

5. **Verify:** Log in to admin panel and check everything works

## 🚀 Deployment Options

### Option 1: Strapi Cloud + Vercel (Recommended)

**Total cost:** Free tier (testing) or ~$119/month (production)

**Steps:**

1. **Deploy Strapi to Strapi Cloud:**
   - Go to https://cloud.strapi.io/
   - Create new project
   - Connect GitHub repo
   - Deploy

2. **Deploy Frontend to Vercel:**
   - Go to https://vercel.com
   - Import GitHub repo
   - Set root directory: `frontend`
   - Add env var: `NEXT_PUBLIC_STRAPI_URL`
   - Deploy

3. **Configure Strapi CORS:**
   - In Strapi admin, go to Settings → CORS
   - Add your Vercel domain

### Option 2: Railway (All-in-One)

**Total cost:** ~$20-40/month

**Steps:**

1. Sign up at https://railway.app
2. Create PostgreSQL database
3. Deploy Strapi backend
4. Deploy Next.js frontend
5. Configure environment variables

### Option 3: Self-Hosted (Advanced)

**Requirements:**
- Linux server (Ubuntu 22.04+)
- Node.js v18-v22
- PostgreSQL
- Nginx
- SSL certificate (Let's Encrypt)

**Cost:** ~$10-50/month depending on provider

## 🔒 Security Configuration

### Strapi Security Headers

Add to `backend/config/middlewares.js`:

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://your-frontend-domain.com'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
```

### Strapi CORS Configuration

Add to `backend/config/middlewares.js`:

```javascript
{
  name: 'strapi::cors',
  config: {
    origin: ['https://your-frontend-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    keepHeaderOnError: true,
  },
}
```

## 📊 Monitoring & Analytics

### Backend Monitoring

- **Strapi Cloud:** Built-in monitoring
- **Self-hosted:** Use PM2 or Docker health checks

### Frontend Analytics

Add to `frontend/app/layout.tsx`:

```typescript
// Google Analytics (if required)
import Script from 'next/script';

// In <head>:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## 🔄 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Strapi Cloud
        run: |
          # Your Strapi Cloud deploy command
          
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 🔙 Backup Strategy

### Database Backups

**Strapi Cloud:** Automatic backups included

**Self-hosted:**
```bash
# Daily PostgreSQL backup
pg_dump -U username dbname > backup_$(date +%Y%m%d).sql

# Upload to S3
aws s3 cp backup_$(date +%Y%m%d).sql s3://your-backup-bucket/
```

### Media Files

If using local file uploads in Strapi:

```bash
# Backup public/uploads
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz backend/public/uploads

# Upload to S3
aws s3 cp uploads_backup_$(date +%Y%m%d).tar.gz s3://your-backup-bucket/
```

**Better:** Use Strapi AWS S3 plugin for media storage.

## 🧪 Testing Before Production

### Local Production Build Test

**Backend:**
```bash
cd backend
NODE_ENV=production npm run build
NODE_ENV=production npm run start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run start
```

Test everything works at production URLs.

## 📞 Support

### Strapi Resources
- Docs: https://docs.strapi.io/
- Forum: https://forum.strapi.io/
- Discord: https://discord.strapi.io/

### Next.js Resources
- Docs: https://nextjs.org/docs
- Deployment: https://nextjs.org/docs/deployment

### Vercel Support
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

## 🎉 Post-Deployment

After deployment:

1. [ ] Test all pages load correctly
2. [ ] Test creating a new post in Strapi
3. [ ] Verify new post appears on frontend
4. [ ] Test all links work
5. [ ] Check SSL certificate is valid
6. [ ] Test on mobile devices
7. [ ] Run accessibility checks
8. [ ] Set up monitoring/alerts
9. [ ] Document production URLs for team
10. [ ] Train content designers on how to use Strapi

---

**Need help?** Contact your development team or check the resources above.


