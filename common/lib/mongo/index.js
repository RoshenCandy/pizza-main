import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client = new MongoClient(uri);
let clientPromise;

if (!process.env.MONGODB_URI) throw new Error('Please add your Mongo URI to .env.local');

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
