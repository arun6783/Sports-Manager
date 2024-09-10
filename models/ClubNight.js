// models/ClubNight.js
const mongoose = require('mongoose')

const clubNightSchema = new mongoose.Schema({
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true }, // Reference to Club
  date: { type: Date, default: Date.now },
  shuttlesUsed: { type: Number, required: true },
  players: [{ name: String, tier: String }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }], // Array of game references
})

const ClubNight = mongoose.model('ClubNight', clubNightSchema)
module.exports = ClubNight
