const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  courtId: {
    type: Number,
    required: true,
  },
  players: [
    {
      name: String,
      tier: String,
    },
  ],
  date: {
    type: Date,
    required: true,
  },
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
