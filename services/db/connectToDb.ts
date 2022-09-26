import { MongoClient } from "mongodb";

// Connection URI
const uri = `mongodb+srv://AshrafAinia:${process.env.DB_PASSWORD}@cluster0.zmqewk9.mongodb.net/?retryWrites=true&w=majority`;

// Create a new MongoClient
const client: MongoClient = new MongoClient(uri);

async function connectToDb() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
  } catch (e) {
    console.log("DB connection error: ", e);
  }
  return client;
}

export default connectToDb;
