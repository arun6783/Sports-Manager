const express = require('express')
const { db } = require('../firebaseConfig')

const router = express.Router()

router.post('/start', async (req, res) => {
  const { clubId, courtId, players } = req.body

  try {
    const gameRef = await db
      .collection('clubs')
      .doc(clubId)
      .collection('games')
      .add({
        courtId,
        players,
        startTime: admin.firestore.FieldValue.serverTimestamp(),
        endTime: null,
        active: true,
      })

    res
      .status(201)
      .send({ message: 'Game started successfully', gameId: gameRef.id })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/end', async (req, res) => {
  const { clubId, gameId } = req.body

  try {
    await db
      .collection('clubs')
      .doc(clubId)
      .collection('games')
      .doc(gameId)
      .update({
        endTime: admin.firestore.FieldValue.serverTimestamp(),
        active: false,
      })

    res.status(200).send({ message: 'Game ended successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
