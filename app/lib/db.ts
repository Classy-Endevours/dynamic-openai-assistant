import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL || "";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to db')
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
