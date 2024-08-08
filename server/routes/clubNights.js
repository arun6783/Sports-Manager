// server/routes/clubNights.js
const express = require('express')
const { db } = require('../firebaseConfig')

const router = express.Router()

// Endpoint to configure club night session
router.post('/configure', async (req, res) => {
  const { clubId, sessionType, courts } = req.body

  try {
    await db.collection('clubs').doc(clubId).update({
      sessionType,
      courts,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    res.status(200).send({ message: 'Club night configured successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
