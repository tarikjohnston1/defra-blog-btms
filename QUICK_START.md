# Quick Start - 5 Minute Setup

The fastest way to get started with the DEFRA Design History system.

## ⚡ Prerequisites

- Node.js v18-v22 (not v24)
- 5 minutes

## 🚀 Steps

### 1. Start Backend (Terminal 1)

```bash
cd backend
npm install    # First time only
npm run develop
```

Wait for: `Admin URL http://localhost:1337/admin`

### 2. Create Admin User

Visit http://localhost:1337/admin and create your account.

### 3. Enable API Permissions

**Settings → Roles → Public**

Enable `find` and `findOne` for: Post, Team, Service, Tag

Click **Save**

### 4. Add Content

**Content Manager:**

1. Create a **Team**
2. Create a **Service** (link to team)
3. Create a **Post** (link to service)
4. Click **Publish** on each

### 5. Start Frontend (Terminal 2)

```bash
cd frontend
npm install    # First time only
npm run dev
```

### 6. View Your Design History

Open http://localhost:3000

## ✅ Done!

You should see your post on the homepage.

## 📖 Next

- Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed walkthrough
- Read [README.md](./README.md) for full documentation

## 🆘 Issues?

### Can't see posts on frontend?

1. Check Strapi is running
2. Check API permissions are enabled
3. Check post is published

### Port already in use?

```bash
lsof -ti:1337 | xargs kill -9  # Kill Strapi
lsof -ti:3000 | xargs kill -9  # Kill Next.js
```

### Node version error?

```bash
nvm use 22
```

