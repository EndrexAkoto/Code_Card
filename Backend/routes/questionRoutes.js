const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Define route to fetch questions
router.get('/', questionController.getQuestions);  // Fetch actual questions from DB

// POST route to add questions
router.post('/add', questionController.addQuestions);  // Add question to DB

module.exports = router;
