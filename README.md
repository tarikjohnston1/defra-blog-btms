# DEFRA Design History - Strapi CMS System

A design blog system based on Strapi CMS, inspired by the [DfE Design Histories](https://design-histories.education.gov.uk/guidance). This allows content designers to create and manage design history posts without needing developer involvement.

## 🏗️ Project Structure

This project consists of two parts:

- **`backend/`** - Strapi CMS (Content Management System) running on port 1337
- **`frontend/`** - Next.js website displaying the design histories running on port 3000

## 🚀 Quick Start

### Prerequisites

- Node.js v18, v20, or v22 (Strapi doesn't support v24 yet)
- npm v6 or higher

### Step 1: Set up Node version

If you're using nvm:

```bash
nvm install 22
nvm use 22
```

### Step 2: Start the Backend (Strapi CMS)

```bash
cd backend
npm install  # First time only
npm run develop
```

This will:
- Start Strapi on http://localhost:1337
- Open the admin panel at http://localhost:1337/admin
- On first run, you'll create your admin account

### Step 3: Configure Strapi

1. **Create your admin account** when prompted at http://localhost:1337/admin

2. **Enable public access to the API**:
   - Go to **Settings** → **Users & Permissions** → **Roles** → **Public**
   - Enable `find` and `findOne` for:
     - Post
     - Team
     - Service
     - Tag
   - Click **Save**

3. **Add your first content**:
   - Go to **Content Manager**
   - Create a Team (e.g., "Trade Services")
   - Create a Service under that team
   - Create a Post linked to that service

### Step 4: Start the Frontend

In a new terminal:

```bash
cd frontend
cp .env.example .env.local  # First time only
npm install  # First time only
npm run dev
```

The frontend will be available at http://localhost:3000

## 📝 Content Types

The system includes four content types based on DfE's design history model:

### 1. **Posts** (Main content)
- **Title** (max 70 characters) - Describes the problem explored or solved
- **Slug** - URL-friendly version of the title
- **Description** (max 250 characters) - Further context
- **Content** - Rich text editor for the full post
- **Publish Date** - When the post should be published
- **Service** - Which service this relates to
- **Tags** - Categories for the post
- **Author** - Who wrote the post
- **Images** - Screenshots or diagrams

### 2. **Teams**
- Groups services together
- Can represent different portfolios (Trade, Agriculture, Environment, etc.)

### 3. **Services**
- Individual services that teams work on
- Linked to posts

### 4. **Tags**
- Categorize posts (e.g., "User Research", "Accessibility", "Iteration")

## 📖 Creating Posts in Strapi

### Best Practices (from DfE guidance)

1. **Post Titles** (70 characters max)
   - Describe the problem you explored or solved
   - Start with a verb when possible (e.g., "Improving the address lookup flow")

2. **Post Description** (250 characters max)
   - Help readers assess if the post is relevant to them
   - Include the design problem or insight you were acting on

3. **Content Guidelines**
   - Use Markdown for formatting
   - Write in plain English
   - Use sentence case for headings
   - Address users directly using first person

4. **Images and Screenshots**
   - Avoid screenshots where possible - link to prototypes instead
   - If using screenshots, describe the text in the body content
   - Use alt text: "Screenshot described under image"
   - Write full descriptions in the body text

5. **Content Snippets**
   - Use the inset text style for example content
   - Don't use quotation marks inside inset text

### Linking to Prototypes

You can link to prototypes if:
- The prototype clearly says "prototype" in the banner
- You include password information in the post
- There's no chance someone might think it's a live service

### Linking to Design Systems

Include links to components you've used:
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- Link to specific components you reference

## 🛠️ Development

### Backend Development

```bash
cd backend
npm run develop  # Development mode with auto-reload
npm run build    # Build admin panel
npm run start    # Production mode
```

### Frontend Development

```bash
cd frontend
npm run dev      # Development mode
npm run build    # Build for production
npm run start    # Production mode
```

## 🎨 Styling

The frontend uses the GOV.UK Design System for consistent government styling:
- GOV.UK Frontend SCSS
- GOV.UK components (buttons, forms, layouts)
- Accessible by default
- Responsive design

## 📁 Key Files

### Backend
- `backend/src/api/*/content-types/*/schema.json` - Content type definitions
- `backend/src/api/*/controllers/*.js` - API controllers
- `backend/src/api/*/routes/*.js` - API routes

### Frontend
- `frontend/app/layout.tsx` - Main layout with GOV.UK header/footer
- `frontend/app/page.tsx` - Homepage listing all posts
- `frontend/app/posts/[slug]/page.tsx` - Individual post page
- `frontend/lib/strapi.ts` - Strapi API helper functions
- `frontend/app/globals.scss` - Global styles

## 🚢 Deployment

### Backend (Strapi)

Options for deploying Strapi:
1. **Strapi Cloud** (easiest) - https://strapi.io/cloud
2. **Heroku** with PostgreSQL add-on
3. **AWS/Azure** with managed database
4. **DigitalOcean App Platform**

Environment variables needed:
- `DATABASE_URL` (for production database)
- `JWT_SECRET`
- `ADMIN_JWT_SECRET`
- `API_TOKEN_SALT`

### Frontend (Next.js)

Options for deploying Next.js:
1. **Vercel** (easiest) - https://vercel.com
2. **Netlify**
3. **AWS Amplify**
4. **DigitalOcean App Platform**

Environment variable needed:
- `NEXT_PUBLIC_STRAPI_URL` - Your Strapi backend URL

## 🔒 Security

### Production Checklist

- [ ] Change default database from SQLite to PostgreSQL/MySQL
- [ ] Set strong JWT secrets
- [ ] Configure CORS properly
- [ ] Set up SSL/HTTPS
- [ ] Configure API rate limiting
- [ ] Set up regular backups
- [ ] Review and restrict API permissions
- [ ] Enable Strapi's built-in security headers

## 📚 Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GOV.UK Design System](https://design-system.service.gov.uk/)
- [DfE Design Histories Guidance](https://design-histories.education.gov.uk/guidance)
- [GOV.UK Content Style Guide](https://www.gov.uk/guidance/style-guide)

## 🐛 Troubleshooting

### "Unable to load posts" error

1. Check Strapi is running: http://localhost:1337/admin
2. Check API permissions are set (see Step 3 above)
3. Check you've created at least one post in Strapi

### Port already in use

```bash
# Kill process on port 1337 (Strapi)
lsof -ti:1337 | xargs kill -9

# Kill process on port 3000 (Next.js)
lsof -ti:3000 | xargs kill -9
```

### Node version issues

```bash
# Check your Node version
node --version

# Should be v18, v20, or v22
# Switch with nvm if needed
nvm use 22
```

## 💡 Tips for Content Designers

1. **Write posts as you design** - Document decisions as you make them
2. **Be specific** - Instead of "Improved form", write "Simplified address entry by removing postcode lookup"
3. **Show your thinking** - Explain why you made decisions, not just what changed
4. **Link to evidence** - Reference user research, analytics, or accessibility audits
5. **Use images sparingly** - Link to prototypes instead when possible
6. **Keep it updated** - Add new posts regularly to show your journey

## 🤝 Contributing

This is a team tool! All designers should:
- Create posts for significant design changes
- Review and learn from other team's posts
- Suggest improvements to the platform
- Share insights and patterns

## 📄 License

Open Government Licence v3.0

---

**Generated by Cursor** - AI-assisted code generation tool


