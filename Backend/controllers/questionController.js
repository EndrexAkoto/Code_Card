const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addQuestions = async (req, res) => {
  try {
    const questions = req.body; // Expecting an array of question objects

    // Check if the request body is an array
    if (!Array.isArray(questions)) {
      return res.status(400).json({ error: 'Request body must be an array of questions.' });
    }

    // Prepare an array of questions to insert
    const questionsToInsert = questions.map(question => ({
      language: question.language,
      difficulty: question.difficulty,
      question: question.question,
      options: JSON.stringify(question.options), // Storing options as a JSON string
      answer: question.answer,
    }));

    // Insert all questions at once using Prisma's createMany (batch insert)
    await prisma.question.createMany({
      data: questionsToInsert,
    });

    res.status(200).json({ message: 'Questions added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add questions.' });
  }
};
