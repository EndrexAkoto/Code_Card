import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null); // Track correct/incorrect
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Track correct answers
  const [error, setError] = useState(null);

  // Fetch all quizzes
  useEffect(() => {
    fetch('http://localhost:5000/api/quizzes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        return response.json();
      })
      .then((data) => setQuizzes(data))
      .catch((err) => setError(err.message));
  }, []);

  // Fetch questions for a selected language
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    fetch(`http://localhost:5000/api/quizzes/${language}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((err) => setError(err.message));
  };

  // Handle selecting an answer
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setIsFlipped(true);
    const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    
    // Increment correct answer count if the answer is correct
    if (isCorrect) {
      setCorrectAnswersCount(prevCount => prevCount + 1);
    }
  };

  // Navigation functions
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setIsFlipped(false);
      setAnswerStatus(null);
      setSelectedAnswer(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsFlipped(false);
      setAnswerStatus(null);
      setSelectedAnswer(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleResetQuiz = () => {
    setSelectedLanguage(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsFlipped(false);
    setAnswerStatus(null);
    setCorrectAnswersCount(0); // Reset correct answer count
  };

  const handleEndQuiz = () => {
    const totalQuestions = questions.length;
    const percentage = ((correctAnswersCount / totalQuestions) * 100).toFixed(2); // Calculate percentage
    alert(`Quiz Completed! You scored ${percentage}%`);
    handleResetQuiz();
  };

  // Get unique languages
  const uniqueLanguages = [...new Set(quizzes.map((quiz) => quiz.language))];

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <h1>Code Card Quizzes</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!selectedLanguage ? (
        <div>
          <h2>Select a language to view quizzes</h2>
          <ul>
            {uniqueLanguages.map((language, index) => (
              <li key={index} onClick={() => handleLanguageSelect(language)}>
                {language}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Questions for {selectedLanguage}</h2>
          {currentQuestion && (
            <div className={`flip-card ${answerStatus}`}>
              <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                <div className="flip-card-front">
                  <p>{currentQuestion.question}</p>
                </div>
                <div className="flip-card-back">
                  {isFlipped && (
                    <div>
                      <p>
                        {answerStatus === 'correct' ? (
                          <span className="correct">Correct!</span>
                        ) : (
                          <span className="incorrect">Incorrect!</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="answer-container">
            <button
              className={selectedAnswer === currentQuestion?.option_a ? 'selected' : ''}
              onClick={() => handleAnswerSelect(currentQuestion?.option_a)}
            >
              A. {currentQuestion?.option_a}
            </button>
            <button
              className={selectedAnswer === currentQuestion?.option_b ? 'selected' : ''}
              onClick={() => handleAnswerSelect(currentQuestion?.option_b)}
            >
              B. {currentQuestion?.option_b}
            </button>
            <button
              className={selectedAnswer === currentQuestion?.option_c ? 'selected' : ''}
              onClick={() => handleAnswerSelect(currentQuestion?.option_c)}
            >
              C. {currentQuestion?.option_c}
            </button>
            <button
              className={selectedAnswer === currentQuestion?.option_d ? 'selected' : ''}
              onClick={() => handleAnswerSelect(currentQuestion?.option_d)}
            >
              D. {currentQuestion?.option_d}
            </button>
          </div>

          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion}>Back</button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion}>Next</button>
            ) : (
              <button onClick={handleEndQuiz}>End Quiz</button>
            )}
            <button onClick={handleResetQuiz}>Reset Quiz</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
