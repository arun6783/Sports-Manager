const { connectToDatabase } = require('../lib/db')

const clubsCollection = process.env.CLUBS_COLLECTION

const getClubByName = async (clubName) => {
  try {
    const db = await connectToDatabase()
    const clubs = db.collection(clubsCollection)
    const club = await clubs.findOne({ name: clubName })
    return club
  } catch (error) {
    throw new Error('Failed to fetch club data')
  }
}

const createOrUpdateClub = async (clubData) => {
  const { clubName, rules, numCourts, players, tiers } = clubData

  try {
    const db = await connectToDatabase()
    const clubs = db.collection(clubsCollection)

    const existingClub = await clubs.findOne({ name: clubName })

    if (existingClub) {
      await clubs.updateOne(
        { name: clubName },
        { $set: { rules, numCourts, players, tiers } }
      )
      return { message: 'Club updated successfully' }
    } else {
      await clubs.insertOne({
        name: clubName,
        rules,
        numCourts,
        players,
        tiers,
      })
      return { message: 'Club created successfully' }
    }
  } catch (error) {
    throw new Error('Failed to save club data')
  }
}

const deleteClubByName = async (clubName) => {
  try {
    const db = await connectToDatabase()
    const clubs = db.collection(clubsCollection)
    const result = await clubs.deleteOne({ name: clubName })

    if (result.deletedCount === 1) {
      return { message: 'Club deleted successfully' }
    } else {
      return { message: 'Club not found' }
    }
  } catch (error) {
    throw new Error('Failed to delete club')
  }
}

module.exports = {
  getClubByName,
  createOrUpdateClub,
  deleteClubByName,
}
