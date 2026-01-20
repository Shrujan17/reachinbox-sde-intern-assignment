import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";

// 🔹 ROUTES
import authRoutes from "./routes/authRoutes";
import scheduleRoutes from "./routes/schedulerRoutes";

// 🔹 GOOGLE PASSPORT CONFIG
import "./config/google";

// 🔹 WORKER
import "./workers/schedulerworker";

const app = express();

// 🔹 MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// 🔹 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api", scheduleRoutes);

// 🔹 SERVER
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`[Shrujan Scheduler] Server running on port ${PORT}`);
});
