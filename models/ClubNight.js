// // models/ClubNight.js
// const mongoose = require('mongoose')

// const clubNightSchema = new mongoose.Schema({
//   clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true }, // Reference to Club
//   date: { type: Date, default: Date.now },
//   shuttlesUsed: { type: Number, required: true },
//   players: [{ name: String, tier: String }],
//   games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }], // Array of game references
// })

// const ClubNight = mongoose.model('ClubNight', clubNightSchema)
// module.exports = ClubNight

const mongoose = require('mongoose')

const clubNightSchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: [true, 'Club ID is required'],
  },
  clubName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  players: [
    {
      name: String,
      tier: String,
    },
  ],
  shuttlesUsed: {
    type: Number,
    default: 0, // Set a default value so it's not required initially
  },
})

const ClubNight = mongoose.model('ClubNight', clubNightSchema)

module.exports = ClubNight
