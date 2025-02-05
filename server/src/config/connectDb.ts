import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error : ", err);
    process.exit(1);
  }
};

export default connectDb;
