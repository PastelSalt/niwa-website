import { MongoClient, Db, type MongoClientOptions } from "mongodb";

/**
 * MongoDB Atlas connection utility.
 *
 * This module is intended for server-side use only (API routes, server actions,
 * Node.js scripts). The `mongodb` driver is a Node.js package and must not be
 * imported in browser-rendered frontend code.
 *
 * Connection credentials are never hardcoded. The `MONGODB_URI` environment
 * variable must be set before calling `connectToMongoDB`.
 */

const uri: string | undefined = process.env["MONGODB_URI"];

if (!uri) {
  throw new Error(
    "MONGODB_URI environment variable is not defined. " +
      "Set it in .env.local (local development) or your platform's " +
      "environment variables (production).",
  );
}

/**
 * Cached MongoClient instance used across serverless invocations to avoid
 * exhausting the connection limit. Stored on `globalThis` so it persists
 * across hot reloads in development and is shared across requests in production.
 */
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
} as MongoClientOptions;

if (process.env["NODE_ENV"] === "development") {
  // In development, preserve the connection across module hot reloads.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client per module load.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

/**
 * Establishes (or reuses) a connection to MongoDB Atlas.
 *
 * Resolves once the client is connected. Rejects if the connection fails.
 *
 * @returns A promise that resolves to the connected `MongoClient`.
 * @throws {Error} If `MONGODB_URI` is missing or the connection fails.
 */
export async function connectToMongoDB(): Promise<MongoClient> {
  return clientPromise;
}

/**
 * Returns a reference to a specific database on the connected client.
 *
 * @param dbName - The name of the database to reference.
 * @returns A promise that resolves to the `Db` instance.
 */
export async function getDatabase(dbName: string = "niwa"): Promise<Db> {
  const client = await connectToMongoDB();
  return client.db(dbName);
}

/**
 * Closes the MongoDB client connection. Primarily useful in tests or
 * teardown routines.
 */
export async function closeMongoDB(): Promise<void> {
  const client = await clientPromise;
  await client.close();
  if (process.env["NODE_ENV"] === "development" && global._mongoClientPromise) {
    global._mongoClientPromise = undefined;
  }
}
