const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')

dotenv.config()

const uri = process.env.MONGO_URI

let client
let db

const connectToDatabase = async () => {
  try {
    if (db) {
      return db
    }

    if (!client) {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      await client.connect()
    }

    db = client.db(process.env.DATABASE_NAME)
    return db
  } catch (error) {
    console.error('Database connection failed:', error)
    throw new Error('Database connection failed')
  }
}

module.exports = { connectToDatabase }
