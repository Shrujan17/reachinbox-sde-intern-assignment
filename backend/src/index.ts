import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

/**
 * Load Google OAuth ONLY if env vars exist
 * (prevents crash during demo / local testing)
 */
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  require("./config/google");
}

import authRoutes from "./routes/authRoutes";
import scheduleRoutes from "./routes/schedulerRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/schedule", scheduleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
