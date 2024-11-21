const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 5000

// Middleware for CORS
app.use(cors())

// Middleware for JSON parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // If necessary for form submissions

// Import quizRoutes
const quizRoutes = require('./routes/quizRoutes')

// Use the quizRoutes for /api path
app.use('/api', quizRoutes)

// Serve static files from the React app (production build)
app.use(express.static(path.join(__dirname, '../frontend/build')))

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Code Card API!')
})

// For all other routes, send the React index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
