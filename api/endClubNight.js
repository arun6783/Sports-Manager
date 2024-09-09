const { saveClubNightData } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { players, shuttlesUsed, date } = req.body

    // Validate inputs
    if (!players || players.length === 0 || !shuttlesUsed || !date) {
      return res.status(400).json({ message: 'Invalid input data' })
    }

    try {
      await saveClubNightData({ players, shuttlesUsed, date })
      res.status(200).json({ message: 'Club night ended successfully' })
    } catch (error) {
      console.error('Error saving club night data:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
