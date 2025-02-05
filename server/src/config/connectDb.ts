import mongoose from "mongoose";
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection error : ", err);
    process.exit(1);
  }
};

export default connectDb;
