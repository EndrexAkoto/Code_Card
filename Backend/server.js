// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/questions', questionRoutes);
app.use('/quiz', quizRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});