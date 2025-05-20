import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app?retryWrites=true&w=majority`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};
