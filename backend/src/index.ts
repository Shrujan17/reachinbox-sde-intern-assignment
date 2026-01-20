import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import schedulerRoutes from "./routes/schedulerRoutes";
import "./config/google";

const app = express();

// 1. CORS Configuration: Crucial to stop the login loop
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://reachinbox-frontend-n3dd.onrender.com",
    credentials: true, // Allows cookies to pass from frontend to backend
  })
);

app.use(express.json());
app.use(passport.initialize());

// 2. Routes
app.use("/api/auth", authRoutes);
app.use("/api/schedule", schedulerRoutes);

// 3. Health Check
app.get("/", (req, res) => res.send("ReachInbox API is Live 🚀"));

// 4. Port Binding for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});