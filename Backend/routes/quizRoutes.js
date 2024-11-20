const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Ensure the path is correct

// Helper function to execute the query and return a promise
const executeQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        db.execute(query, params, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

// Endpoint to fetch all quizzes
router.get('/quizzes', async (req, res) => {
    try {
        const rows = await executeQuery('SELECT * FROM quizzes', []);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No quizzes available' });
        }

        res.json(rows);
    } catch (error) {
        console.error('Database query error: ', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Endpoint to fetch quizzes by language
router.get('/quizzes/:language', async (req, res) => {
    const { language } = req.params;

    try {
        const rows = await executeQuery('SELECT * FROM quizzes WHERE language = ?', [language]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: `No quizzes found for ${language}` });
        }

        res.json(rows);
    } catch (error) {
        console.error('Database query error: ', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Make the router available for use in other files
module.exports = router;
