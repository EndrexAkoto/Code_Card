// src/QuizList.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch quizzes from the backend API
    axios.get('http://localhost:5000/api/quizzes/javascript')  // Replace 'javascript' with the desired language
      .then(response => {
        setQuizzes(response.data)
      })
      .catch(err => {
        setError('Error fetching quizzes')
        console.error(err)
      })
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h2>Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul>
          {quizzes.map(quiz => (
            <li key={quiz.id}>{quiz.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default QuizList
