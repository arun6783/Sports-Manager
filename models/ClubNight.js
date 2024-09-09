const mongoose = require('mongoose')

const clubNightSchema = new mongoose.Schema({
  players: [
    {
      name: String,
      tier: String,
    },
  ],
  shuttlesUsed: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const ClubNight = mongoose.model('ClubNight', clubNightSchema)

module.exports = ClubNight
