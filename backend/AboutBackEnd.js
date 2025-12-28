const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

// Database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Add your MySQL password here if you have one
    database: 'restaurant'
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database for About page');
});

// Get all comments from database
const getAllComments = () => {
    const selectQuery = `SELECT * FROM comments ORDER BY created_at DESC`;
    
    return new Promise((resolve, reject) => {
        db.query(selectQuery, (err, results) => {
            if (err) {
                console.error('Error fetching comments:', err);
                reject(err);
                return;
            }
            console.log(`Fetched ${results.length} comments`);
            resolve(results);
        });
    });
};

// Add a new comment to database
const addComment = (name, rating, comment) => {
    const insertQuery = `INSERT INTO comments (name, rating, comment) VALUES (?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
        db.query(insertQuery, [name, rating, comment], (err, result) => {
            if (err) {
                console.error('Error adding comment:', err);
                reject(err);
                return;
            }
            console.log('New comment added successfully');
            resolve(result);
        });
    });
};

// API Routes

// GET all comments for About page
app.get("/api/comments", async (req, res) => {
    try {
        const comments = await getAllComments();
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// POST new comment for About page
app.post("/api/comments", async (req, res) => {
    try {
        const { name, rating, comment } = req.body;
        
        // Validate input
        if (!name || !rating || !comment) {
            return res.status(400).json({ error: 'Name, rating, and comment are required' });
        }
        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }
        
        const result = await addComment(name, rating, comment);
        res.json({ success: true, message: 'Comment added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Test endpoint
app.get("/", (req, res) => {
    res.json({ message: "About page backend server is running!" });
});

// Start server
app.listen(3001, () => {
    console.log(`About page backend server running on http://localhost:3001`);
});

// Export functions if needed elsewhere
module.exports = {
    db,
    getAllComments,
    addComment,
    app
};
