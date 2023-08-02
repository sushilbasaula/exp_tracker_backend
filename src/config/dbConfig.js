import mongoose from "mongoose";

export const connectMongoDB = () => {
  try {
    const mongoUrl = "mongodb://localhost:27017/ft_aug_b";
    mongoose.set("strictQuery", true); // to suppress the warning in the console
    const conn = mongoose.connect(mongoUrl);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message, "from ConnectMongoDB function");
  }
};
