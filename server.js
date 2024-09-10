const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const saveClubHandler = require('./api/saveClub')
const getClubHandler = require('./api/getClub')
const deleteClubHandler = require('./api/deleteClub')
const endClubNightHandler = require('./api/endClubNight')
const endGameHandler = require('./api/endGame')
const { connectToDatabase } = require('./lib/db')
const startClubNightHandler = require('./api/startClubNight')

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

// Static route handling
app.use('/api/saveClub', saveClubHandler)
app.use('/api/getClub', getClubHandler)
app.use('/api/deleteClub', deleteClubHandler)
app.use('/api/endClubNight', endClubNightHandler)
app.use('/api/endGame', endGameHandler)
app.use('/api/startClubNight', startClubNightHandler)

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is running!' })
})

async function connect() {
  await connectToDatabase()
}

connect()
// Start the server
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`)
})
