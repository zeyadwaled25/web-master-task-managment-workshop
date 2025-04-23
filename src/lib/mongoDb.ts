import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    if (process.env.NODE_ENV !== "production") {
      console.log("connected to MongoDB");
    }
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
}
