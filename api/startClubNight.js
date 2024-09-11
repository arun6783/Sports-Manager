const ClubNight = require('../models/ClubNight')

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    const { clubName, clubId } = req.body

    // Ensure the clubName and clubId are provided
    if (!clubName || !clubId) {
      return res
        .status(400)
        .json({ message: 'Club name and Club ID are required' })
    }

    try {
      // Create a new club night entry
      const newClubNight = new ClubNight({
        clubName,
        clubId, // Pass the clubId when starting the club night
      })

      // Save the new club night to the database
      const savedClubNight = await newClubNight.save()

      // Respond with the created clubNightId
      res.status(201).json({
        _id: savedClubNight._id,
        message: 'Club night started successfully',
      })
    } catch (error) {
      console.error('Error starting club night:', error)
      res.status(500).json({ message: 'Failed to start club night' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
