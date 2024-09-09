const { deleteClubByName } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { clubName } = req.query

    // Manual validation for clubName
    if (!clubName || clubName.trim() === '') {
      return res.status(400).json({ message: 'Club name is required' })
    }

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
