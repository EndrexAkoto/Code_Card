// controllers/quizController.js
const { getQuestionsByLanguage, submitAnswer, getUserScores } = require('../services/quizService');

exports.getQuestions = async (req, res) => {
  const { language } = req.params;
  try {
    const questions = await getQuestionsByLanguage(language);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions.' });
  }
};

exports.submitAnswer = async (req, res) => {
  const { userId, questionId, answer } = req.body;
  try {
    const result = await submitAnswer(userId, questionId, answer);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit answer.' });
  }
};

exports.getScores = async (req, res) => {
  const { userId } = req.params;
  try {
    const scores = await getUserScores(userId);
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scores.' });
  }
};
