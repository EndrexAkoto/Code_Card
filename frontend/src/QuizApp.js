import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// Styled-components for styling
const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`

const LandingPage = styled.div`
  margin-top: 50px;
`

const Button = styled.button`
  margin: 10px;
  padding: 15px;
  font-size: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`

const QuizContainer = styled.div`
  text-align: center;
  padding: 20px;
`

const QuestionText = styled.p`
  font-size: 22px;
  font-weight: bold;
`

const OptionsList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Option = styled.li`
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ddd;
  margin: 5px 0;
`

const QuizApp = () => {
  const [quizzes, setQuizzes] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [error, setError] = useState(null)

  // Fetch all available quizzes
  useEffect(() => {
    fetch('http://localhost:5000/api/quizzes') // Your backend API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes')
        }
        return response.json()
      })
      .then((data) => setQuizzes(data))
      .catch((err) => setError(err.message))
  }, [])

  // Fetch questions for a selected language
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    fetch(`http://localhost:5000/api/quizzes/${language}`) // Your backend API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        return response.json()
      })
      .then((data) => setQuestions(data))
      .catch((err) => setError(err.message))
  }

  // Navigate to the next question
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1))
  }

  // Exit the quiz
  const exitQuiz = () => {
    setSelectedLanguage(null)
    setQuestions([])
    setCurrentQuestionIndex(0)
  }

  return (
    <Container>
      <h1>Code Card Quizzes</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!selectedLanguage ? (
        <LandingPage>
          <h2>Choose a Language</h2>
          <Button onClick={() => handleLanguageSelect('JavaScript')}>JavaScript</Button>
          <Button onClick={() => handleLanguageSelect('Python')}>Python</Button>
          <Button onClick={() => handleLanguageSelect('C')}>C</Button>
        </LandingPage>
      ) : (
        <QuizContainer>
          <h2>Questions for {selectedLanguage}</h2>
          {questions.length > 0 ? (
            <div>
              <QuestionText>{questions[currentQuestionIndex].question}</QuestionText>
              <OptionsList>
                <Option>{questions[currentQuestionIndex].option_a}</Option>
                <Option>{questions[currentQuestionIndex].option_b}</Option>
                <Option>{questions[currentQuestionIndex].option_c}</Option>
                <Option>{questions[currentQuestionIndex].option_d}</Option>
              </OptionsList>
              <Button onClick={nextQuestion}>Next</Button>
              <Button onClick={exitQuiz}>Exit</Button>
            </div>
          ) : (
            <p>Loading questions...</p>
          )}
        </QuizContainer>
      )}
    </Container>
  )
}

export default QuizApp
