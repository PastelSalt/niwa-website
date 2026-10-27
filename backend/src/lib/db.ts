import { MongoClient, Db, type MongoClientOptions } from "mongodb";
import { getEnv } from "../config/env";

const uri: string | undefined = getEnv().MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI environment variable is not defined. " +
      "Set it in .env (local development) or your platform's environment variables (production).",
  );
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const options: MongoClientOptions = {
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

if (getEnv().NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

/**
 * Establishes (or reuses) a connection to MongoDB Atlas.
 * Resolves once the client is connected. Rejects if the connection fails.
 */
export async function connectToMongoDB(): Promise<MongoClient> {
  return clientPromise;
}

/**
 * Returns a reference to a specific database on the connected client.
 * @param dbName - The name of the database to reference (default: "niwa")
 */
export async function getDatabase(dbName: string = "niwa"): Promise<Db> {
  const client = await connectToMongoDB();
  return client.db(dbName);
}

/**
 * Closes the MongoDB client connection. Useful in tests or teardown routines.
 */
export async function closeMongoDB(): Promise<void> {
  const client = await clientPromise;
  await client.close();
  if (getEnv().NODE_ENV === "development" && global._mongoClientPromise) {
    global._mongoClientPromise = undefined;
  }
}
