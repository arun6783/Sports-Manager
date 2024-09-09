const { getClubByName } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const { clubName } = req.query

    // Manual validation to check if clubName is provided
    if (!clubName || clubName.trim() === '') {
      return res.status(400).json({ message: 'Club name is required' })
    }

    try {
      const clubData = await getClubByName(clubName)

      // Return 404 if club not found
      if (!clubData) {
        return res.status(404).json({ message: 'Club not found' })
      }

      // Return 200 if club is found
      res.status(200).json(clubData)
    } catch (error) {
      console.error('Error fetching club:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
