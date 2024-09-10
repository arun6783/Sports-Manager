// api/endClubNight.js
const { saveClubNightData } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { clubId, players, shuttlesUsed } = req.body

    if (!clubId || !players || players.length === 0 || !shuttlesUsed) {
      return res.status(400).json({ message: 'Invalid input data' })
    }

    try {
      // Save the club night
      const clubNight = await saveClubNightData({
        clubId,
        players,
        shuttlesUsed,
        date: new Date(),
      })

      res
        .status(200)
        .json({ message: 'Club night saved successfully', clubNight })
    } catch (error) {
      console.error('Error saving club night data:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
