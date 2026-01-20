import dotenv from "dotenv";
dotenv.config(); // Must be the very first line

import express from "express";
import cors from "cors";
import passport from "passport";

// Import Routes
import authRoutes from "./routes/authRoutes";
import schedulerRoutes from "./routes/schedulerRoutes";

// Import Configurations
import "./config/google"; 

const app = express();

// --- 1. Middleware ---
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); // Allows the backend to read JSON from frontend
app.use(passport.initialize());

// --- 2. Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/schedule", schedulerRoutes);

// --- 3. Base Health Check ---
app.get("/", (req, res) => {
  res.send("ReachInbox Backend is running... 🚀");
});

// --- 4. Server Start (CRITICAL FOR RENDER) ---
// Render provides a dynamic PORT. If you hardcode 5000, it will crash.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});