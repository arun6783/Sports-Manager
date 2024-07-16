const express = require('express')
const router = express.Router()

// Example route: POST /api/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body

  console.log('***name', name)

  res.status(200).json({ message: 'User registered successfully' })
})

// Add more routes here

module.exports = router
