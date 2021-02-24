import mongoose, { Connection } from "mongoose";

const uri: string = process.env.MONGODB_URI;
let cachedDb: Connection = null;

export const dbConnect = async (): Promise<Connection> => {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  try {
    // If no connection is cached, create a new one
    const db = await mongoose.createConnection(uri, {
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    // Cache the database connection and return the connection
    cachedDb = db;
    return db;
  } catch (error) {
    console.error(error);
    // Exit process with failure
    process.exit(1);
  }
};
