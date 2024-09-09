const { saveGameData } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { courtId, players, date } = req.body

    // Validate request data
    if (!courtId || !players || players.length === 0 || !date) {
      return res.status(400).json({ message: 'Invalid input data' })
    }

    try {
      await saveGameData({ courtId, players, date })
      res.status(200).json({ message: 'Game data saved successfully' })
    } catch (error) {
      console.error('Error saving game data:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
