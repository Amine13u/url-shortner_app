import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDB";

dotenv.config();

// Database Connection
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
