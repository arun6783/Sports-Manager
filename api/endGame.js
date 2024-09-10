// api/endGame.js
const { saveGameData, updateClubNightWithGame } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { courtId, players, clubNightId } = req.body

    if (!courtId || !players || players.length === 0 || !clubNightId) {
      return res.status(400).json({ message: 'Invalid input data' })
    }

    try {
      // Save the game data
      const game = await saveGameData({
        courtId,
        players,
        clubNightId,
        date: new Date(),
      })

      // Add the game to the ClubNight's games array
      await updateClubNightWithGame(clubNightId, game._id)

      res.status(200).json({ message: 'Game saved successfully' })
    } catch (error) {
      console.error('Error saving game data:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
