# BTMS News & Guidance - Deployment Guide

This guide will help you deploy your BTMS blog for FREE using Vercel (Frontend) and Railway (Backend).

## Overview

- **Frontend (Next.js)**: Deploy to Vercel - FREE forever
- **Backend (Strapi CMS)**: Deploy to Railway - FREE $5/month credit
- **Database**: PostgreSQL on Railway - FREE (included)
- **Total Cost**: $0-5/month

---

## Prerequisites

Before you begin, make sure you have:

- [ ] GitHub account
- [ ] Vercel account (free - sign up at vercel.com)
- [ ] Railway account (free - sign up at railway.app)
- [ ] Your code pushed to GitHub

---

## Part 1: Push Your Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
# 1. Navigate to your project
cd /Users/Personal/Documents/GitHub/defra-blog-btms

# 2. Create a new repository on GitHub
# Go to github.com → New Repository → Name it "btms-news-blog"

# 3. Initialize and push
git init
git add .
git commit -m "Initial commit: BTMS news and guidance blog"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/btms-news-blog.git
git push -u origin main
```

---

## Part 2: Deploy Backend to Railway (Strapi CMS)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Login with GitHub"
3. Authorize Railway to access your repositories

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `btms-news-blog` repository
4. Railway will detect it contains a Node.js project

### Step 3: Configure Backend
1. Click on your deployed service
2. Go to "Settings" tab
3. Set the following:

**Root Directory**: 
```
backend
```

**Build Command**:
```
npm install && npm run build
```

**Start Command**:
```
npm run start
```

**Install Command**:
```
npm install
```

### Step 4: Add PostgreSQL Database
1. In your Railway project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create the database

### Step 5: Configure Environment Variables
1. Click on your Strapi service (not the database)
2. Go to "Variables" tab
3. Add the following variables:

```bash
NODE_ENV=production
DATABASE_CLIENT=postgres

# Railway will automatically provide these database variables:
# PGHOST
# PGPORT
# PGUSER
# PGPASSWORD
# PGDATABASE

# Add these additional variables:
HOST=0.0.0.0
PORT=8080

# Generate a random secret key (keep it secure!)
APP_KEYS=<generate-random-string>
API_TOKEN_SALT=<generate-random-string>
ADMIN_JWT_SECRET=<generate-random-string>
TRANSFER_TOKEN_SALT=<generate-random-string>
JWT_SECRET=<generate-random-string>
```

**To generate random strings**, run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

Run this command 5 times to get 5 different secrets for each variable.

### Step 6: Update Database Configuration

In your local project, update `backend/config/database.js`:

```javascript
// backend/config/database.js
module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'production') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          host: env('PGHOST'),
          port: env.int('PGPORT'),
          database: env('PGDATABASE'),
          user: env('PGUSER'),
          password: env('PGPASSWORD'),
          ssl: {
            rejectUnauthorized: false
          },
        },
        debug: false,
      },
    };
  } else {
    // Local development (SQLite)
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', '..', '.tmp/data.db'),
        },
        useNullAsDefault: true,
      },
    };
  }
};
```

### Step 7: Deploy
1. Commit and push the database config change:
```bash
git add backend/config/database.js
git commit -m "Add production database configuration"
git push origin main
```

2. Railway will automatically redeploy
3. Wait for deployment to complete (3-5 minutes)
4. Click on your service → "Settings" → You'll see your backend URL (e.g., `https://btms-backend-production.up.railway.app`)

### Step 8: Create First Admin User
1. Go to your Railway backend URL + `/admin` (e.g., `https://your-app.up.railway.app/admin`)
2. Create your first admin account
3. Log in to the Strapi admin panel

### Step 9: Configure API Permissions
1. In Strapi admin, go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public**
3. Under **Post**, check:
   - ✓ `find`
   - ✓ `findOne`
4. Click **Save**

---

## Part 3: Deploy Frontend to Vercel (Next.js)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Select your `btms-news-blog` repository
3. Click "Import"

### Step 3: Configure Build Settings
Vercel should auto-detect Next.js, but verify:

**Framework Preset**: Next.js
**Root Directory**: `frontend`
**Build Command**: `npm run build`
**Output Directory**: `.next`
**Install Command**: `npm install`

### Step 4: Add Environment Variable
1. In the "Configure Project" section, expand "Environment Variables"
2. Add:

**Key**: `NEXT_PUBLIC_STRAPI_URL`
**Value**: Your Railway backend URL (e.g., `https://your-app.up.railway.app`)

Click "Add"

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Vercel will give you a URL (e.g., `https://btms-news-blog.vercel.app`)

### Step 6: Configure CORS in Strapi
1. Go back to your Railway project
2. Click on your Strapi service → "Variables"
3. Add a new variable:

**Key**: `CLIENT_URL`
**Value**: Your Vercel URL (e.g., `https://btms-news-blog.vercel.app`)

4. In your local project, update `backend/config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', process.env.CLIENT_URL],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

5. Commit and push:
```bash
git add backend/config/middlewares.js
git commit -m "Configure CORS for production"
git push origin main
```

Railway will auto-redeploy with new settings.

---

## Part 4: Add Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Vercel project → "Settings" → "Domains"
2. Add your domain (e.g., `btms-news.defra.gov.uk`)
3. Follow DNS instructions from Vercel

### For Railway (Backend):
1. Go to Railway project → Your service → "Settings" → "Domains"
2. Click "Generate Domain" or add custom domain
3. Update the `NEXT_PUBLIC_STRAPI_URL` in Vercel with new domain

---

## Part 5: Access Your Deployed Site

### Frontend (Public Site):
- **Vercel URL**: https://your-project.vercel.app
- Users can view blog posts

### Backend (Admin Panel):
- **Railway URL**: https://your-app.up.railway.app/admin
- Content editors log in here to add/edit posts

---

## Ongoing Management

### For Content Editors (Non-Technical):
1. Go to your Strapi admin URL
2. Log in with credentials
3. Add/edit posts through the GUI
4. Changes appear on the frontend automatically

### For Developers:
1. Make code changes locally
2. Push to GitHub
3. Both Vercel and Railway auto-deploy on push to `main`

---

## Cost Breakdown

| Service | Free Tier | Cost After Free |
|---------|-----------|-----------------|
| Vercel (Frontend) | 100GB bandwidth | $20/month |
| Railway (Backend) | $5 credit/month | Pay per use (~$5-10/month) |
| PostgreSQL | Included free | Included |
| **Total** | **$0-5/month** | **~$5-10/month** |

---

## Troubleshooting

### Frontend can't connect to backend:
- Check `NEXT_PUBLIC_STRAPI_URL` is set correctly in Vercel
- Verify CORS is configured in Strapi
- Ensure Strapi API permissions are set to Public

### Strapi admin not loading:
- Check all environment variables are set in Railway
- Verify PostgreSQL database is connected
- Check Railway logs for errors

### Build fails:
- Check build logs in Vercel/Railway
- Verify all dependencies are in `package.json`
- Ensure Node version compatibility

---

## Security Best Practices

1. **Never commit secrets** to GitHub
2. **Use strong passwords** for admin accounts
3. **Enable 2FA** on GitHub, Vercel, and Railway
4. **Regularly update dependencies**: `npm audit fix`
5. **Backup database** regularly (Railway offers automated backups)

---

## Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Strapi Docs: https://docs.strapi.io
- Next.js Docs: https://nextjs.org/docs

---

## Next Steps

1. ✅ Deploy to Railway and Vercel
2. ✅ Create admin account
3. ✅ Add first blog post
4. ✅ Share admin URL with content editors
5. ✅ Set up custom domain (optional)
6. ✅ Configure automated backups

---

**Congratulations!** Your BTMS blog is now live and accessible to everyone! 🎉
