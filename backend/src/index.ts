import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/authRoutes";
import schedulerRoutes from "./routes/schedulerRoutes";
import getEmailsRoute from "./routes/getEmails";
import "./config/google";

const app = express();

// 1. CORS: Must allow credentials and match your frontend URL exactly
app.use(cors({
  origin: "https://reachinbox-frontend-n3dd.onrender.com", 
  credentials: true
}));

app.use(express.json());

// 2. Session: Must be configured for secure cross-site cookies on Render
app.use(session({
  secret: process.env.SESSION_SECRET || "reachinbox_prod_secret_123",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Required for HTTPS on Render
    sameSite: "none", // Required for cross-domain cookies
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/schedule", schedulerRoutes);
app.use("/api/emails", getEmailsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));