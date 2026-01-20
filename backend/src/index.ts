import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import schedulerRoutes from "./routes/schedulerRoutes";
import getEmailsRoute from "./routes/getEmails"; // ✅ Add this import
import "./config/google";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://reachinbox-frontend-n3dd.onrender.com",
    credentials: true, 
  })
);

app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/schedule", schedulerRoutes);
app.use("/api/emails", getEmailsRoute); // ✅ Link the email fetching route

app.get("/", (req, res) => res.send("ReachInbox API is Live 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});