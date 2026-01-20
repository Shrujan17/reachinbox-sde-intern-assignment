import express from "express";
import cors from "cors";
import passport from "passport";

import authRoutes from "./routes/authRoutes";
import schedulerRoutes from "./routes/schedulerRoutes";
import "./config/google";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://reachinbox-frontend-n3dd.onrender.com"
  ],
  credentials: true
}));

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api", schedulerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Shrujan Scheduler] Server running on port ${PORT}`);
});
