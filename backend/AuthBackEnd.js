const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

// JWT Secret Key (In production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// ============= AUTHENTICATION ROUTES =============

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
        db.query(checkUserQuery, [email], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert new user
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.status(500).json({ error: 'Failed to create account' });
                }

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
            });
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login - Authenticate user
app.post("/api/auth/login", (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

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

// ============= COMMENTS ROUTES =============

// Get all comments
app.get("/api/comments", async (req, res) => {
    try {
        const query = 'SELECT * FROM comments ORDER BY created_at DESC';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching comments:', err);
                return res.status(500).json({ error: 'Failed to fetch comments' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add new comment (Protected - requires authentication)
app.post("/api/comments", (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

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
            db.query(insertQuery, [decoded.id, decoded.name, rating, comment], (err, result) => {
                if (err) {
                    console.error('Error adding comment:', err);
                    return res.status(500).json({ error: 'Failed to add comment' });
                }

                res.json({
                    success: true,
                    message: 'Comment added successfully',
                    commentId: result.insertId
                });
            });
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============= TEST ENDPOINT =============

app.get("/", (req, res) => {
    res.json({ message: "Restaurant backend server is running!" });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
