// utilities/db.ts
import { MongoClient, Db } from 'mongodb';

const connectionString= "mongodb+srv://hyde:An0ther12@hyde.9vshdl0.mongodb.net/";
const dbName = 'hotel-admin-panel';
const mClient: MongoClient = new MongoClient(connectionString);

export async function connectToDatabase() {
    const dtbs:MongoClient = await  mClient.connect();
    return dtbs.db(dbName);
}

export  async function closeClient() {
    await mClient.close();
}