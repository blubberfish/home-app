import { MongoClient } from 'mongodb'
import { User } from '@blubberfish/types'

const DB = 'cradle'
const USERS = 'people'

let dbclient: MongoClient | null = null

const clientFactory = async () => {
  if (!dbclient) {
    const { DB_H, DB_S, DB_U } = process.env
    dbclient = new MongoClient(`mongodb+srv://${DB_U}:${DB_S}@${DB_H}/`, { w: 'majority', retryWrites: true })
    await dbclient.connect()
  }
  return dbclient
}

export const usersCollectionFactory = async () => await (await clientFactory()).db(DB).collection<User>(USERS)