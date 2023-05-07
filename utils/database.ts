import mongoose from "mongoose";

/**
Establishes a connection to a MongoDB database using Mongoose.
If a connection is already established, it logs a message and returns.
Otherwise, it attempts to connect to the specified MongoDB URI.
@async
@function connectToDB
@returns {Promise<void>}
*/
export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  let isConnected = false;

  if (isConnected) {
    console.info("Mongo DB is already connected");
    return;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "share_prompt",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    );

    isConnected = true;

    console.info("Mongo DB is connected");
  } catch (error) {
    console.error("Error connecting to Mongo DB", error);
  }
};
