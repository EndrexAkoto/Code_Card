// services/quizService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getQuestionsByLanguage = async (language) => {
  const questions = await prisma.question.findMany({
    where: { language: { name: language } },
  });
  return questions.map(q => ({
    id: q.id,
    question: q.question,
    options: JSON.parse(q.options),
    language: language
  }));
};

exports.submitAnswer = async (userId, questionId, answer) => {
  const question = await prisma.question.findUnique({ where: { id: questionId } });
  const isCorrect = question.answer.toLowerCase() === answer.toLowerCase();
  const points = isCorrect ? 1 : -1;

  await prisma.attempt.create({
    data: {
      userId,
      questionId,
      isCorrect,
      points,
    },
  });

  return {
    isCorrect,
    message: isCorrect ? "Success! Correct Answer!" : `Wrong! Correct answer: ${question.answer}`,
    points,
  };
};

exports.getUserScores = async (userId) => {
  const attempts = await prisma.attempt.findMany({ where: { userId } });
  const score = attempts.reduce((sum, attempt) => sum + attempt.points, 0);
  return { userId, score };
};
