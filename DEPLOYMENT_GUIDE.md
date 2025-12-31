# Deployment Guide - Restaurant Web App

## 🚀 How to Deploy Your Project

### Architecture
- **Frontend (React)**: Deployed to GitHub Pages
- **Backend (Node.js)**: Deployed to Railway/Render (or run locally)
- **Database (MySQL)**: Hosted with backend

---

## Part 1: Deploy Frontend to GitHub Pages

### Step 1: Build the React App
```bash
cd restaurant
npm run build
```

This creates an optimized production build in `restaurant/build/` folder.

### Step 2: Deploy to GitHub Pages
```bash
npm run deploy
```

This will:
- Build your React app
- Create a `gh-pages` branch
- Push the built files to GitHub Pages

### Step 3: Configure GitHub Repository
1. Go to: https://github.com/roybilain1/Restaurant/settings/pages
2. Under **Source**, select: `gh-pages` branch
3. Folder: `/ (root)`
4. Click **Save**

### Step 4: Access Your Live Site
Your site will be available at: **https://roybilain1.github.io/Restaurant**

---

## Part 2: Deploy Backend (Choose One Option)

### Option A: Railway (Recommended for Project) 🚂

1. **Sign up**: https://railway.app (use GitHub account)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Restaurant` repository

3. **Configure Backend Service**:
   - Root Directory: `backend`
   - Start Command: `node server.js`
   - Add Environment Variables:
     ```
     DB_HOST=your-mysql-host
     DB_USER=root
     DB_PASSWORD=your-password
     DB_NAME=restaurant
     PORT=3001
     JWT_SECRET=your-secret-key
     ```

4. **Deploy MySQL Database**:
   - Click "New" → "Database" → "MySQL"
   - Railway will give you connection details
   - Update your `server.js` with these credentials

5. **Get Your Backend URL**:
   - Railway will give you a URL like: `https://your-app.up.railway.app`

### Option B: Render 🎨

1. **Sign up**: https://render.com

2. **Create Web Service**:
   - Connect your GitHub repository
   - Name: `restaurant-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`

3. **Add Environment Variables** (in Render dashboard)

4. **Deploy MySQL** (use Render's PostgreSQL or external MySQL)

### Option C: Keep Backend Local (For Testing) 💻

If you're just demonstrating:
1. Run backend locally: `cd backend && npm start`
2. Your frontend on GitHub Pages will connect to `http://localhost:3001`
3. **Note**: Others won't be able to use the app features (only view UI)

---

## Part 3: Connect Frontend to Backend

### Update API URLs in Frontend

If backend is on Railway/Render, update the API URL:

**In `restaurant/src/context/CartContext.js`**:
```javascript
const API_URL = "https://your-backend-url.up.railway.app/api";
```

**In `restaurant/src/context/UserContext.js`**:
```javascript
const API_URL = "https://your-backend-url.up.railway.app/api";
```

**In `restaurant/src/pages/Menu.js`**, `About.js`, etc.:
```javascript
// Replace http://localhost:3001 with your backend URL
const response = await fetch('https://your-backend-url.up.railway.app/api/sections');
```

### Rebuild and Redeploy Frontend
```bash
cd restaurant
npm run build
npm run deploy
```

---

## 📋 What to Submit to Your Doctor

### 1. GitHub Repository
✅ **Link**: https://github.com/roybilain1/Restaurant

Make sure it includes:
- ✅ All source code
- ✅ README.md with setup instructions
- ✅ Commit history (use `git log` to verify)
- ✅ No `node_modules` in repository

### 2. Live Links
- **Frontend (GitHub Pages)**: https://roybilain1.github.io/Restaurant
- **Backend API** (if deployed): https://your-backend.up.railway.app

### 3. README.md Content
Update your main README.md with:
```markdown
# Chez Roy Restaurant Web Application

## 🌐 Live Demo
- **Frontend**: https://roybilain1.github.io/Restaurant
- **Backend API**: https://your-backend.up.railway.app

## 📖 Description
A professional restaurant web application featuring menu browsing, user authentication, shopping cart, and customer reviews.

## 🛠 Technologies Used
- **Frontend**: React, Bootstrap, React Router
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, bcrypt
- **Hosting**: GitHub Pages (Frontend), Railway (Backend)

## ✨ Features
- User Authentication (Sign up, Login, Logout)
- Interactive Menu with Categories
- Shopping Cart (requires login)
- Customer Reviews & Comments
- Responsive Design
- Database-backed Cart System

## 📦 Setup Instructions
[See DEPLOYMENT_GUIDE.md]

## 📸 Screenshots
[Add screenshots here]
```

---

## 🔧 Quick Deployment Commands

```bash
# Deploy frontend to GitHub Pages
cd restaurant
npm run build
npm run deploy

# Check deployment status
# Go to: https://github.com/roybilain1/Restaurant/deployments
```

---

## ⚠️ Important Notes

1. **GitHub Pages only hosts static files** (HTML, CSS, JS)
   - Cannot run Node.js backend
   - Need separate backend hosting

2. **CORS**: Make sure backend allows requests from GitHub Pages:
   ```javascript
   app.use(cors({
     origin: 'https://roybilain1.github.io'
   }));
   ```

3. **Database**: Must be hosted with backend (Railway provides this)

4. **For Full Functionality**: Deploy backend to Railway/Render

---

## 🎓 For Your Project Report

### Include:
1. **Architecture Diagram**: Frontend (GitHub Pages) ↔ Backend (Railway) ↔ Database (MySQL)
2. **Screenshots**: Login, Menu, Cart, Comments
3. **Code Snippets**: Authentication, Cart API, Database queries
4. **Deployment Process**: Steps taken to deploy both parts
5. **Challenges**: How you solved CORS, database hosting, etc.

---

## 🆘 Troubleshooting

### Issue: GitHub Pages shows 404
- **Solution**: Make sure `homepage` in `package.json` is correct
- Wait 2-5 minutes after deployment

### Issue: Backend API not connecting
- **Solution**: Check CORS settings, verify backend URL in frontend code

### Issue: Database connection failed
- **Solution**: Verify environment variables in Railway/Render
