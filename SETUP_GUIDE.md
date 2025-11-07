# Setup Guide - Step by Step

This guide will walk you through setting up the DEFRA Design History system from scratch.

## ✅ Prerequisites

Before you start, make sure you have:

- [ ] Node.js v18, v20, or v22 installed
- [ ] npm v6 or higher installed
- [ ] A terminal/command prompt open
- [ ] 15-20 minutes

## 🏁 Step 1: Check Your Node Version

Open your terminal and run:

```bash
node --version
```

You should see something like `v22.21.1`. If you see `v24.x.x`, you need to switch versions:

```bash
# If using nvm (recommended)
nvm install 22
nvm use 22

# Verify it worked
node --version
```

## 🔧 Step 2: Start the Strapi Backend

### 2.1 Navigate and Install

```bash
cd /Users/Personal/Documents/GitHub/defra-blog-btms/backend
npm install
```

This will take a few minutes to install all dependencies.

### 2.2 Start Strapi

```bash
npm run develop
```

You should see output like:

```
Project information

┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   Time               Mon Jan 01 2024 12:00:00 GMT+0000        │
│   Launched in        2000 ms                                  │
│                                                                │
│   Environment        development                              │
│   Process PID        12345                                    │
│                                                                │
│   Version            5.30.1 (node v22.21.1)                  │
│   Edition            Community                                │
│                                                                │
│   Admin URL          http://localhost:1337/admin             │
│   Server URL         http://localhost:1337                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 2.3 Create Your Admin Account

1. Your browser should automatically open to http://localhost:1337/admin/auth/register-admin
2. If not, visit that URL manually
3. Fill in the form:
   - **First name**: Your first name
   - **Last name**: Your last name
   - **Email**: Your work email
   - **Password**: Choose a strong password
   - **Confirm Password**: Same password
4. Click **"Let's start"**

**🎉 You now have Strapi running!**

## 🔓 Step 3: Configure API Permissions

By default, the API is locked down. We need to enable public read access:

### 3.1 Navigate to Roles Settings

1. In the Strapi admin panel, click **Settings** in the left sidebar
2. Under "Users & Permissions Plugin", click **Roles**
3. Click **Public** (not Authenticated)

### 3.2 Enable Permissions

Scroll down and enable the following permissions by checking the boxes:

#### Post
- [x] find
- [x] findOne

#### Service
- [x] find
- [x] findOne

#### Tag
- [x] find
- [x] findOne

#### Team
- [x] find
- [x] findOne

### 3.3 Save

Click the green **Save** button in the top right corner.

**🎉 Your API is now accessible!**

## 📝 Step 4: Add Your First Content

### 4.1 Create a Team

1. Click **Content Manager** in the left sidebar
2. Click **Team** under "Collection Types"
3. Click **"+ Create new entry"** button (top right)
4. Fill in:
   - **Title**: `Trade Services`
   - **Slug**: `trade-services` (auto-generated)
   - **Description**: `Digital services for international trade`
   - **Enabled**: Toggle to ON (blue)
   - **Portfolio**: Select `Trade` from dropdown
5. Click **Save** (top right)
6. Click **Publish** (appears after saving)

### 4.2 Create a Service

1. Still in Content Manager, click **Service**
2. Click **"+ Create new entry"**
3. Fill in:
   - **Title**: `Border Trade Management System`
   - **Slug**: `btms` (auto-generated)
   - **Description**: `System for managing border trade operations`
   - **Enabled**: Toggle to ON (blue)
   - **Team**: Select the team you just created
4. Click **Save**
5. Click **Publish**

### 4.3 Create a Tag (Optional)

1. Click **Tag** in Content Manager
2. Click **"+ Create new entry"**
3. Fill in:
   - **Name**: `User Research`
   - **Slug**: `user-research` (auto-generated)
4. Click **Save**
5. Click **Publish**

### 4.4 Create Your First Post

1. Click **Post** in Content Manager
2. Click **"+ Create new entry"**
3. Fill in the form:

**Title** (max 70 characters):
```
Redesigning the trader dashboard for clarity
```

**Slug** (auto-generated):
```
redesigning-trader-dashboard
```

**Description** (max 250 characters):
```
We found users were confused by the dashboard layout. This post explains how we simplified the information architecture based on user research findings.
```

**Content** (use Markdown):
```markdown
## The problem

During user testing in November 2024, we found that 8 out of 10 traders couldn't locate their pending declarations on the dashboard.

## What we changed

We restructured the dashboard to show:

1. Most urgent actions at the top
2. Pending declarations in a clear list
3. Completed items in a separate section

## Why this works

This pattern follows the GOV.UK Design System guidance on [task lists](https://design-system.service.gov.uk/patterns/task-list-pages/).

Users can now:
- See what needs their attention immediately
- Track their progress
- Find historical information when needed

## Next steps

We'll test this with 12 more users in January 2025.
```

**Publish Date**:
```
Select today's date
```

**Service**:
```
Select "Border Trade Management System"
```

**Tags**:
```
Select "User Research" if you created it
```

**Author**:
```
Your name
```

4. Click **Save**
5. Click **Publish**

**🎉 You've created your first design history post!**

## 🌐 Step 5: Start the Frontend

Now let's view the post on the website.

### 5.1 Open a New Terminal

Keep Strapi running, and open a **new terminal window**.

### 5.2 Navigate and Install

```bash
cd /Users/Personal/Documents/GitHub/defra-blog-btms/frontend
npm install
```

### 5.3 Configure Environment

```bash
cp .env.example .env.local
```

The default settings should work. If you need to change them, edit `.env.local`.

### 5.4 Start the Frontend

```bash
npm run dev
```

You should see:

```
  ▲ Next.js 15.1.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.1.x:3000

 ✓ Starting...
 ✓ Ready in 2.5s
```

### 5.5 View Your Design History

1. Open your browser to http://localhost:3000
2. You should see your post listed on the homepage
3. Click on the post title to view the full post

**🎉 Your design history website is live!**

## ✅ Success Checklist

You should now have:

- [x] Strapi CMS running on http://localhost:1337/admin
- [x] A team created
- [x] A service created
- [x] At least one published post
- [x] Frontend website running on http://localhost:3000
- [x] Your post visible on the website

## 🎯 Next Steps

### For Content Designers

1. **Create more posts** - Add posts regularly as you make design decisions
2. **Add more teams and services** - Organize content by your team structure
3. **Create useful tags** - Categories like "Accessibility", "User Research", "Iteration"
4. **Follow the guidance** - Use the README for best practices

### For Developers

1. **Switch database** - Change from SQLite to PostgreSQL for production
2. **Deploy Strapi** - Consider Strapi Cloud, Heroku, or AWS
3. **Deploy frontend** - Vercel or Netlify work great for Next.js
4. **Set up CI/CD** - Automate deployments
5. **Configure backups** - Regular database backups

## 🆘 Troubleshooting

### Problem: "Unable to load posts" on frontend

**Solution**: Check API permissions are enabled (Step 3) and you've published at least one post.

### Problem: Port 1337 or 3000 already in use

**Solution**: Kill the process:
```bash
# For Strapi (port 1337)
lsof -ti:1337 | xargs kill -9

# For Next.js (port 3000)
lsof -ti:3000 | xargs kill -9
```

### Problem: Node version error

**Solution**: Switch to Node v22:
```bash
nvm use 22
# or
nvm install 22 && nvm use 22
```

### Problem: Can't access Strapi admin

**Solution**: Make sure Strapi is running and visit http://localhost:1337/admin directly.

## 📚 Learn More

- Read the full [README.md](./README.md)
- Check [DfE Design Histories Guidance](https://design-histories.education.gov.uk/guidance)
- Explore the [GOV.UK Design System](https://design-system.service.gov.uk/)

---

**Need help?** Check the Troubleshooting section in the main README or ask your team's developer.


