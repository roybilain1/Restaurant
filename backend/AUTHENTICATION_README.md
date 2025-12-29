# 🔐 Restaurant Authentication System - Complete Guide

## 📋 Overview

This authentication system allows users to:
1. **Sign Up** - Create an account
2. **Login** - Access their account
3. **Stay Logged In** - Session management with JWT tokens
4. **See their name** - Displayed in navbar when logged in
5. **Comment with their name** - Automatically use their account name

---

## 🎯 How It Works (Step by Step)

### **1. User Signs Up**
```
Frontend (React) → Backend (Express) → Database (MySQL)
```

**What happens:**
1. User fills signup form (name, email, password)
2. Frontend sends data to `/api/auth/signup`
3. Backend checks if email already exists
4. Backend **hashes the password** (security!)
5. Backend saves user to `users` table
6. Backend creates JWT token
7. Token sent to frontend and stored in `localStorage`
8. User is now logged in!

### **2. User Logs In**
```
Frontend → Backend → Verify Password → Create Token → Store Token
```

**What happens:**
1. User enters email and password
2. Frontend sends to `/api/auth/login`
3. Backend finds user by email
4. Backend compares password with hashed password
5. If correct, creates JWT token
6. Token sent to frontend and stored
7. User is logged in!

### **3. User Stays Logged In**
```
Page loads → Check localStorage → Verify token → User logged in
```

**What happens:**
1. App loads, checks for token in `localStorage`
2. Sends token to `/api/auth/verify`
3. Backend verifies token is valid
4. If valid, user info extracted
5. User stays logged in across page refreshes!

### **4. User Name Shows in Navbar**
```
UserContext → isAuthenticated? → Show name + Logout : Show Login
```

**What happens:**
1. NavBar checks `UserContext`
2. If logged in → Shows "Welcome, [Name]" + Logout button
3. If not logged in → Shows "Login" button

### **5. User Comments with Their Name**
```
Submit comment → Send with token → Backend extracts user → Save with name
```

**What happens:**
1. User writes comment
2. Token sent with request
3. Backend verifies token
4. Extracts user name from token
5. Saves comment with user's name automatically!

---

## 📊 Database Structure

### **Table 1: users**
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Hashed!
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Table 2: comments** (Updated)
```sql
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,           -- Links to users
    name VARCHAR(100) NOT NULL,     -- User's name
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 🚀 Setup Instructions

### **Step 1: Install Backend Dependencies**
```bash
cd /Users/apple/LIU/react/project1/backend
npm install
```

This installs:
- `bcrypt` - For password hashing
- `jsonwebtoken` - For creating/verifying tokens
- `express` - Web server
- `mysql2` - Database connection
- `cors` - Allow frontend to connect

### **Step 2: Create Database Tables**
1. Open **phpMyAdmin**
2. Select your `restaurant` database
3. Go to **SQL tab**
4. Run the SQL from `auth_setup.sql` file
5. Tables created!

### **Step 3: Start Backend Server**
```bash
cd /Users/apple/LIU/react/project1/backend
npm start
```

Server runs on: `http://localhost:3001`

### **Step 4: Start Frontend**
```bash
cd /Users/apple/LIU/react/project1/restaurant
npm start
```

App runs on: `http://localhost:3000`

---

## 🔑 API Endpoints

### **Authentication Endpoints**

#### 1. Sign Up
```
POST /api/auth/signup
Body: { name, email, password }
Response: { success, token, user }
```

#### 2. Login
```
POST /api/auth/login
Body: { email, password }
Response: { success, token, user }
```

#### 3. Verify Token
```
GET /api/auth/verify
Headers: { Authorization: "Bearer [token]" }
Response: { success, user }
```

### **Comments Endpoints**

#### 1. Get All Comments
```
GET /api/comments
Response: [{ id, user_id, name, rating, comment, created_at }]
```

#### 2. Add Comment (Protected)
```
POST /api/comments
Headers: { Authorization: "Bearer [token]" }
Body: { rating, comment }
Response: { success, message, commentId }
```

---

## 🔒 Security Features

### **1. Password Hashing**
- Passwords are **never** stored in plain text
- Uses `bcrypt` with 10 salt rounds
- Even if database is hacked, passwords are safe!

### **2. JWT Tokens**
- Tokens expire after 7 days
- Contains: user ID, name, email
- Verified on every protected request

### **3. Protected Routes**
- Only logged-in users can comment
- Token required for protected endpoints
- Invalid tokens are rejected

---

## 📱 Frontend Components

### **1. UserContext** (`src/context/UserContext.js`)
- Manages authentication state
- Functions: `login()`, `signup()`, `logout()`
- Provides user data to all components

### **2. Login Component** (`src/components/login.js`)
- Handles both login and signup
- Form validation
- Bootstrap styling
- Redirects to home after success

### **3. NavBar** (`src/components/NavBar.js`)
- Shows user name when logged in
- Logout button
- Shows "Login" button when not logged in

### **4. About Page** (`src/pages/About.js`)
- Users must be logged in to comment
- Automatically uses user's name
- Fetches comments from database

---

## 🎨 How to Use

### **For New Users:**
1. Click "Login" in navbar
2. Click "Sign Up"
3. Fill in: Name, Email, Password
4. Click "Create Account"
5. Automatically logged in!
6. Name appears in navbar

### **For Existing Users:**
1. Click "Login" in navbar
2. Enter email and password
3. Click "Sign In"
4. Name appears in navbar

### **To Comment:**
1. Must be logged in
2. Go to About page
3. Rate and write comment
4. Your name automatically added!

### **To Logout:**
1. Click "Logout" in navbar
2. Token removed
3. Back to login screen

---

## 🐛 Troubleshooting

### **Problem: "Email already registered"**
- Solution: User already exists, try logging in instead

### **Problem: "Invalid email or password"**
- Solution: Check credentials, try again

### **Problem: "Authentication required"**
- Solution: You must be logged in to perform this action

### **Problem: Token expired**
- Solution: Login again (tokens expire after 7 days)

### **Problem: Can't connect to backend**
- Solution: Make sure backend server is running on port 3001

---

## 📝 Notes

- **JWT_SECRET**: Change `'your-secret-key-change-this-in-production'` in production
- **Token Expiry**: Currently set to 7 days, can be changed in `AuthBackEnd.js`
- **Password Length**: Minimum 6 characters
- **Email Validation**: Must be valid email format

---

## ✅ Testing Checklist

- [ ] Sign up with new account
- [ ] Login with existing account
- [ ] Name shows in navbar when logged in
- [ ] Logout button works
- [ ] Can't comment when not logged in
- [ ] Can comment when logged in
- [ ] Comment shows user's name
- [ ] Page refresh keeps user logged in
- [ ] Invalid login shows error
- [ ] Duplicate email shows error

---

## 🎉 Success!

Your restaurant now has a fully functional authentication system just like big websites! Users can sign up, login, and their names will appear everywhere they interact with your site.

**Enjoy your professional restaurant website! 🍽️**
