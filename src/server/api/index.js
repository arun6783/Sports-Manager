import express from 'express'

const router = express.Router()

// Define your API routes here
router.get('/example', (req, res) => {
  res.send('API works!')
})

export default router
