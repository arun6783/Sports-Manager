const Club = require('../models/Club')
const Game = require('../models/Game')
const ClubNight = require('../models/ClubNight')

const getClubByName = async (clubName) => {
  try {
    console.log('trying to get club with clubname= ', clubName)
    const club = await Club.findOne({
      clubName: { $regex: new RegExp('^' + clubName + '$', 'i') },
    })

    if (!club) {
      return null
    }

    return club
  } catch (error) {
    console.error('Error fetching club:', error)
    throw new Error('Failed to fetch club data')
  }
}

const createOrUpdateClub = async (clubData) => {
  try {
    const existingClub = await Club.findOne({ clubName: clubData.clubName })

    if (existingClub) {
      await Club.updateOne({ clubName: clubData.clubName }, { $set: clubData })
      return { message: 'Club updated successfully' }
    } else {
      const club = new Club(clubData)
      await club.save()
      return { message: 'Club created successfully' }
    }
  } catch (error) {
    throw new Error('Failed to save club data')
  }
}

const deleteClubByName = async (clubName) => {
  try {
    const result = await Club.deleteOne({ clubName })
    if (result.deletedCount === 1) {
      return { message: 'Club deleted successfully' }
    } else {
      throw new Error('Club not found')
    }
  } catch (error) {
    throw new Error('Failed to delete club')
  }
}

const saveClubNightData = async (data) => {
  try {
    const clubNight = new ClubNight(data)
    await clubNight.save()
    return { message: 'Club night saved successfully' }
  } catch (error) {
    throw new Error('Failed to save club night data')
  }
}

const saveGameData = async (data) => {
  try {
    const game = new Game(data)
    await game.save()
    return { message: 'Game data saved successfully' }
  } catch (error) {
    throw new Error('Failed to save game data')
  }
}

module.exports = {
  getClubByName,
  createOrUpdateClub,
  deleteClubByName,
  saveClubNightData,
  saveGameData,
}
