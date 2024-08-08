const express = require('express')
const admin = require('firebase-admin')
const { db } = require('../firebaseConfig')

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, password, clubName } = req.body

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: clubName,
    })

    await db.collection('clubs').doc(userRecord.uid).set({
      ownerEmail: email,
      clubName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    res.status(201).send({ message: 'Club registered successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
