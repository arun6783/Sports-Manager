const { validationResult } = require('express-validator')
const { validateClubNameQuery } = require('../middleware/validations')
const { deleteClubByName } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'DELETE') {
    await validateClubNameQuery(req, res, () => {})
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { clubName } = req.query

    try {
      const result = await deleteClubByName(clubName)
      res.status(200).json(result)
    } catch (error) {
      console.error('Error deleting club:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
