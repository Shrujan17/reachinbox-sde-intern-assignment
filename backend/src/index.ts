import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import "./config/google";
import authRoutes from "./routes/authRoutes";
import scheduleRoutes from "./routes/schedulerRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/schedule", scheduleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
