import express from "express";
import cors from "cors";
import passport from "passport";

import authRoutes from "./routes/authRoutes";
import schedulerRoutes from "./routes/schedulerRoutes";
import "./config/google";

const app = express();

/**
 * ✅ CORS — MUST allow frontend domain
 */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://reachinbox-frontend.onrender.com" // Render frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

/**
 * ✅ Health check (important for Render)
 */
app.get("/", (_req, res) => {
  res.send("ReachInbox Backend is running 🚀");
});

/**
 * ✅ Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api", schedulerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Shrujan Scheduler] Server running on port ${PORT}`);
});
