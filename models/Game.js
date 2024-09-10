// models/Game.js
const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  clubNightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClubNight',
    required: true,
  }, // Reference to ClubNight
  courtId: { type: Number, required: true },
  players: [{ name: String, tier: String }],
  date: { type: Date, default: Date.now },
})

const Game = mongoose.model('Game', gameSchema)
module.exports = Game
