import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./auth/google";
import authRoutes from "./routes/authRoutes";
import emailRoutes from "./routes/emailRoutes"; // Ensure this is imported
import getEmailsRoute from "./routes/getEmails";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "reachinbox_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// The "/api" prefix here combines with "/schedule-email" in emailRoutes.ts
app.use("/api", emailRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api", getEmailsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));