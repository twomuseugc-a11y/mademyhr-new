import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB Error:", error);
  }
}