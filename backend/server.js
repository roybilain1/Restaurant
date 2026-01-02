const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// JWT Secret Key (In production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Database connection configuration with pool for better handling
const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'restaurant',
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const db = pool.promise();

// Test database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error connecting to database:', err);
        console.error('DB Config:', {
            host: process.env.DB_HOST || process.env.MYSQLHOST,
            user: process.env.DB_USER || process.env.MYSQLUSER,
            database: process.env.DB_NAME || process.env.MYSQLDATABASE,
            port: process.env.DB_PORT || process.env.MYSQLPORT
        });
        return;
    }
    console.log('✅ Connected to MySQL database');
    connection.release();
});

// ============================================
// MENU ENDPOINTS
// ============================================

// GET all sections for menu
app.get("/api/sections", async (req, res) => {
    try {
        const sql = `SELECT * FROM sections ORDER BY display_order`;
        const [result] = await db.query(sql);
        res.json(result);
    } catch (err) {
        console.error('Error fetching sections:', err);
        res.status(500).json({ error: 'Failed to fetch sections', details: err.message });
    }
});

// GET all foods for menu
app.get("/api/foods", async (req, res) => {
    try {
        const sql = `SELECT * FROM foods ORDER BY section_id, display_order`;
        const [result] = await db.query(sql);
        res.json(result);
    } catch (err) {
        console.error('Error fetching foods:', err);
        res.status(500).json({ error: 'Failed to fetch foods', details: err.message });
    }
});

// GET restaurant info
app.get("/restaurant", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM restaurant");
        res.json(results);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================

// Sign Up - Register new user
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingUsers] = await db.query(checkUserQuery, [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(insertQuery, [name, email, hashedPassword]);

        // Create JWT token
        const token = jwt.sign(
            { id: result.insertId, name, email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Account created successfully',
            token,
            user: { id: result.insertId, name, email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login - Authenticate user
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const query = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.query(query, [email]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Verify Token - Check if user is logged in
app.get("/api/auth/verify", (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            res.json({
                success: true,
                user: { id: decoded.id, name: decoded.name, email: decoded.email }
            });
        });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// COMMENTS ENDPOINTS (About Page)
// ============================================

// Get all comments
app.get("/api/comments", async (req, res) => {
    try {
        const query = 'SELECT * FROM comments ORDER BY created_at DESC';
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Add new comment (Protected - requires authentication)
app.post("/api/comments", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { rating, comment } = req.body;

        // Validate input
        if (!rating || !comment) {
            return res.status(400).json({ error: 'Rating and comment are required' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        // Insert comment with user info
        const insertQuery = 'INSERT INTO comments (user_id, name, rating, comment) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(insertQuery, [decoded.id, decoded.name, rating, comment]);

        res.json({
            success: true,
            message: 'Comment added successfully',
            commentId: result.insertId
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// CART ENDPOINTS
// ============================================

// Get user's cart items
app.get("/api/cart", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const query = 'SELECT * FROM cart_items WHERE user_id = ? ORDER BY created_at DESC';
        const [results] = await db.query(query, [decoded.id]);
        res.json(results);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

// Add item to cart
app.post("/api/cart", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const { food_id, food_name, food_price, image_path, quantity } = req.body;

        // Validate input
        if (!food_name || !food_price) {
            return res.status(400).json({ error: 'Food name and price are required' });
        }

        // Insert cart item with user name and email from JWT token
        const insertQuery = 'INSERT INTO cart_items (user_id, user_name, user_email, food_id, food_name, food_price, image_path, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(insertQuery, [decoded.id, decoded.name, decoded.email, food_id || null, food_name, food_price, image_path, quantity || 1]);

        res.json({
            success: true,
            message: 'Item added to cart',
            cartItemId: result.insertId
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove item from cart
app.delete("/api/cart/:id", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const cartItemId = req.params.id;

        // Delete cart item (ensure it belongs to the user)
        const deleteQuery = 'DELETE FROM cart_items WHERE id = ? AND user_id = ?';
        const [result] = await db.query(deleteQuery, [cartItemId, decoded.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.json({
            success: true,
            message: 'Item removed from cart'
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Clear all cart items for user
app.delete("/api/cart", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const deleteQuery = 'DELETE FROM cart_items WHERE user_id = ?';
        const [result] = await db.query(deleteQuery, [decoded.id]);

        res.json({
            success: true,
            message: 'Cart cleared',
            itemsRemoved: result.affectedRows
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// TEST ENDPOINT
// ============================================

app.get("/", (req, res) => {
    res.json({ 
        message: "🍽️ Chez Roy Restaurant Backend Server is running!",
        endpoints: {
            menu: [
                "GET /api/sections - Get menu sections",
                "GET /api/foods - Get all foods"
            ],
            auth: [
                "POST /api/auth/signup - Create account",
                "POST /api/auth/login - Login",
                "GET /api/auth/verify - Verify token"
            ],
            comments: [
                "GET /api/comments - Get all comments",
                "POST /api/comments - Add comment (requires auth)"
            ],
            cart: [
                "GET /api/cart - Get user's cart items (requires auth)",
                "POST /api/cart - Add item to cart (requires auth)",
                "DELETE /api/cart/:id - Remove item from cart (requires auth)",
                "DELETE /api/cart - Clear cart (requires auth)"
            ]
        }
    });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Chez Roy Backend Server running on http://localhost:${PORT}`);
    console.log(`📋 Menu API: Ready`);
    console.log(`🔐 Authentication API: Ready`);
    console.log(`💬 Comments API: Ready`);
    console.log(`🛒 Cart API: Ready`);
});

