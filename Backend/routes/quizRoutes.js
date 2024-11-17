// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { getQuestions, submitAnswer, getScores } = require('../controllers/quizController');

router.get('/questions/:language', getQuestions);
router.post('/submit', submitAnswer);
router.get('/scores/:userId', getScores);

module.exports = router;
