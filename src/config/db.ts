import mongoose from "mongoose";

interface IsConnected {
  connection?: number;
}

const isConnected: IsConnected = {};

export const connectDB = async () => {
  if (isConnected.connection) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: process.env.DATABASE_NAME as string,
    });
    isConnected.connection = conn.connections[0].readyState;
    console.log(`Connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log("Something went wrong while connecting to MongoDB", error);
    process.exit(1);
  }
};
