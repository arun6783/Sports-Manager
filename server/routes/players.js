// server/routes/players.js
const express = require('express')
const { db } = require('../firebaseConfig')

const router = express.Router()

// Endpoint to add a new player
router.post('/add', async (req, res) => {
  const { clubId, playerName, playerEmail, isGuest } = req.body

  try {
    const playerRef = await db
      .collection('clubs')
      .doc(clubId)
      .collection('players')
      .add({
        playerName,
        playerEmail,
        isGuest,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })

    res
      .status(201)
      .send({ message: 'Player added successfully', playerId: playerRef.id })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

// Endpoint to set player as admin
router.post('/setAdmin', async (req, res) => {
  const { clubId, playerId, isAdmin } = req.body

  try {
    await db
      .collection('clubs')
      .doc(clubId)
      .collection('players')
      .doc(playerId)
      .update({
        isAdmin,
      })

    res.status(200).send({ message: 'Player role updated successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
