# 📋 Cheat Sheet - Quick Reference

## 🚀 Starting the System

```bash
# Terminal 1: Backend (Strapi)
cd backend
npm run develop

# Terminal 2: Frontend (Next.js)  
cd frontend
npm run dev
```

**URLs:**
- 👤 Strapi Admin: http://localhost:1337/admin
- 🌐 Website: http://localhost:3000
- 🔌 API: http://localhost:1337/api

## 📝 Creating Content (Order Matters!)

1. **Team** → 2. **Service** → 3. **Tag** (optional) → 4. **Post**

### Quick Post Template

```
Title (70 chars): Redesigning the [thing] to improve [outcome]
Slug: auto-generated
Description (250 chars): We found [problem]. This post explains [solution].
Content: [Markdown - see below]
Publish Date: Today
Service: Select from dropdown
Tags: Select relevant tags
Author: Your name
```

## 📖 Markdown Formatting

```markdown
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)

![Image alt text](image-url)
```

## 🔑 Common Strapi Actions

| Action | Location | Steps |
|--------|----------|-------|
| Enable API | Settings → Roles → Public | Check `find` and `findOne` for all content types |
| Create Post | Content Manager → Post | + Create new entry → Save → Publish |
| Upload Image | Media Library | Drag & drop or click upload |
| Edit Post | Content Manager → Post | Click post → Edit → Save → Publish |
| Delete Post | Content Manager → Post | Click post → Delete |

## 🛠️ Useful Commands

### Backend (Strapi)

```bash
npm run develop  # Start with admin panel
npm run start    # Start production mode
npm run build    # Build admin panel
npm run strapi   # Show all commands
```

### Frontend (Next.js)

```bash
npm run dev      # Start development
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check for errors
```

### Troubleshooting

```bash
# Kill Strapi process
lsof -ti:1337 | xargs kill -9

# Kill Next.js process
lsof -ti:3000 | xargs kill -9

# Check Node version
node --version

# Switch Node version (requires nvm)
nvm use 22

# Clear Next.js cache
cd frontend && rm -rf .next
```

## 🎯 Content Types Reference

### Post (Main Content)
- **title** - 70 chars max
- **slug** - URL (auto)
- **description** - 250 chars max
- **content** - Markdown
- **publishDate** - Date
- **service** - Relation
- **tags** - Relations
- **author** - Text
- **images** - Media

### Team
- **title** - Name
- **slug** - URL (auto)
- **description** - Text
- **enabled** - Boolean
- **portfolio** - Enum

### Service
- **title** - Name
- **slug** - URL (auto)
- **description** - Text
- **enabled** - Boolean
- **team** - Relation

### Tag
- **name** - Tag name
- **slug** - URL (auto)

## 📊 API Quick Reference

```bash
# Get all posts
GET http://localhost:1337/api/posts?populate=*

# Get specific post by slug
GET http://localhost:1337/api/posts?filters[slug][$eq]=your-slug&populate=*

# Get all teams
GET http://localhost:1337/api/teams?populate=*

# Get all services
GET http://localhost:1337/api/services?populate=*

# Get posts by service
GET http://localhost:1337/api/posts?filters[service][slug][$eq]=service-slug&populate=*
```

## ✅ Pre-Publish Checklist

Before publishing a post:

- [ ] Title is descriptive and under 70 characters
- [ ] Description explains the context (under 250 chars)
- [ ] Content is written in plain English
- [ ] All headings use sentence case
- [ ] Links are working
- [ ] Images have alt text
- [ ] Service is selected
- [ ] Publish date is set
- [ ] Author name is added
- [ ] Preview looks good
- [ ] Spell check completed

## 🎨 GOV.UK Style Guide (Quick)

### Text
- Sentence case for everything
- No ampersands (&)
- Active voice
- Plain English
- One idea per sentence

### Dates
- 24 April 2025 (not 24/04/2025)

### Numbers
- Spell out one to nine
- Use numerals for 10+

### Contractions
- Use them (we'll, it's, can't)

## 🚨 Quick Fixes

### Issue: Can't see posts on website
```
1. Check Strapi is running (Terminal 1)
2. Check API permissions enabled
3. Check post is published (not draft)
4. Refresh website
```

### Issue: Changes not showing
```
1. Hard refresh: Cmd+Shift+R (Mac) / Ctrl+F5 (Windows)
2. Check you clicked "Publish" not just "Save"
3. Wait 60 seconds (cache revalidation)
```

### Issue: Can't log in to Strapi
```
1. Check backend is running
2. Visit http://localhost:1337/admin directly
3. Try password reset
```

## 🔐 Permissions Quick Check

**Settings → Roles → Public** should have these checked:

- ✅ Post: find, findOne
- ✅ Team: find, findOne
- ✅ Service: find, findOne
- ✅ Tag: find, findOne

**DON'T check:** create, update, delete (security!)

## 📚 Quick Links

| Resource | URL |
|----------|-----|
| Strapi Docs | https://docs.strapi.io/ |
| Next.js Docs | https://nextjs.org/docs |
| GOV.UK Design | https://design-system.service.gov.uk/ |
| DfE Guidance | https://design-histories.education.gov.uk/guidance |
| Markdown Guide | https://www.markdownguide.org/ |

## 💾 Backup Reminder

Before major changes:

```bash
# Export all content from Strapi
cd backend
npm run strapi export -- --file backup-$(date +%Y%m%d).tar.gz

# Backup database (if PostgreSQL)
pg_dump dbname > backup.sql
```

## 🎓 Content Design Tips

**Good Titles:**
- ✅ "Simplifying the trader dashboard for mobile users"
- ✅ "Adding auto-save to reduce data loss"
- ✅ "Removing the postcode lookup to speed up forms"

**Bad Titles:**
- ❌ "Dashboard changes"
- ❌ "Updates"
- ❌ "New feature"

**Remember:**
- Document as you go, not at the end
- Show your thinking, not just results
- Link to research and evidence
- Write for future you and other teams

## 📞 Need Help?

1. Check this cheat sheet
2. Read the relevant guide:
   - Starting out? → QUICK_START.md
   - Need details? → SETUP_GUIDE.md
   - Going live? → DEPLOYMENT.md
3. Ask your dev team
4. Check Strapi/Next.js docs

---

**Print this out and keep it by your desk!** 📄

