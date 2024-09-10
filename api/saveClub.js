const { createOrUpdateClub } = require('../lib/clubApi')

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { clubName, rules, numCourts, players, tiers } = req.body

    try {
      const result = await createOrUpdateClub({
        clubName,
        rules,
        numCourts,
        players,
        tiers, // Ensure allowedTiers are passed to MongoDB
      })
      res.status(200).json(result)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error saving club', error: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
