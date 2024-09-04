const { validationResult } = require('express-validator')
const { validateClubNameQuery } = require('../middleware/validations')
const { getClubByName } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    await validateClubNameQuery[0].run(req)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { clubName } = req.query

    try {
      const club = await getClubByName(clubName)
      if (club) {
        res.status(200).json(club)
      } else {
        res.status(404).json({ message: 'Club not found' })
      }
    } catch (error) {
      console.error('Error fetching club:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
