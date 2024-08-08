const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { admin } = require('./firebaseConfig') // Ensure Firebase Admin SDK is initialized
const authRoutes = require('./routes/auth')
const playerRoutes = require('./routes/players')
const clubNightRoutes = require('./routes/clubNights')
const gameRoutes = require('./routes/games')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api/auth', authRoutes)
app.use('/api/players', playerRoutes)
app.use('/api/clubNights', clubNightRoutes)
app.use('/api/games', gameRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
