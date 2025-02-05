import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./config/connectDb";
import urlRoutes from "./routes/urlRoutes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

// Database Connection
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", urlRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
