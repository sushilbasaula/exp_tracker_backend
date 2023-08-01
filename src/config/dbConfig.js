import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const mongoUrl = "mongodb://localhost:27017/ft_aug";
    const conn = await mongoose.connect(mongoUrl);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message, "from ConnectMongoDB function");
  }
};
