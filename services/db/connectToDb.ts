import { MongoClient } from "mongodb";


async function connectToDb() {
// Connection URI
const uri = process.env.MONGODB_CONN || "";

// Create a new MongoClient
const client: MongoClient = new MongoClient(uri);
  
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
  } catch (e) {
    console.log("DB connection error: ", e);
  }
  return client;
}

export default connectToDb;
