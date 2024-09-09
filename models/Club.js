const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: [true, 'Club name is required'],
  },
  rules: {
    type: String,
    required: [true, 'Club rules are required'],
  },
  numCourts: {
    type: String, // Use String to match your sample data structure
    required: [true, 'Number of courts is required'],
  },
  players: [
    {
      name: String,
      tier: String,
    },
  ],
  tiers: [
    {
      name: String,
      description: String,
    },
  ],
})

const Club = mongoose.model('Club', clubSchema)

module.exports = Club
