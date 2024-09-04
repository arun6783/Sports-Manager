const { validationResult } = require('express-validator')
const { validateClubData } = require('../middleware/validations')
const { createOrUpdateClub } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    await validateClubData(req, res, () => {})
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const result = await createOrUpdateClub(req.body)
      res.status(200).json(result)
    } catch (error) {
      console.error('Error saving club:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
