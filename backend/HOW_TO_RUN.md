# 🚀 How to Run Your Restaurant Backend

## ✨ ONE COMMAND TO RUN EVERYTHING!

All your backend features (Menu, About, Login) are now in **ONE unified server**!

---

## 📝 Quick Start

### **1. Install Dependencies (First time only)**
```bash
cd /Users/apple/LIU/react/project1/backend
npm install
```

### **2. Start the Backend Server**
```bash
cd /Users/apple/LIU/react/project1/backend
npm start
```

### **3. Start the Frontend (In a new terminal)**
```bash
cd /Users/apple/LIU/react/project1/restaurant
npm start
```

---

## ✅ What's Included

When you run `npm start` in the backend folder, you get:

### **🍽️ Menu APIs**
- `GET /api/sections` - Menu sections
- `GET /api/foods` - All food items

### **🔐 Authentication APIs**
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### **💬 Comments APIs (About Page)**
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Add comment (requires login)

---

## 📊 Server Status

When you run the server, you'll see:
```
✅ Connected to MySQL database
🚀 Chez Roy Backend Server running on http://localhost:3001
📋 Menu API: Ready
🔐 Authentication API: Ready
💬 Comments API: Ready
```

---

## 🎯 Complete Workflow

### **Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Keep this running!

### **Terminal 2 - Frontend:**
```bash
cd restaurant
npm start
```
Keep this running too!

---

## 🔍 Test the Server

Open browser and go to: http://localhost:3001

You'll see all available endpoints!

---

## ⚡ Quick Commands

### **Start backend:**
```bash
cd /Users/apple/LIU/react/project1/backend && npm start
```

### **Start frontend:**
```bash
cd /Users/apple/LIU/react/project1/restaurant && npm start
```

### **Restart backend** (if you make changes):
1. Press `Ctrl + C` to stop
2. Run `npm start` again

---

## 🎉 That's It!

Just one command: `npm start` in the backend folder runs EVERYTHING:
- ✅ Menu backend
- ✅ Login backend  
- ✅ Comments backend

**All in one server on port 3001!** 🚀
