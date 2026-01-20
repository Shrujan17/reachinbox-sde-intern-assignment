import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./auth/google";

import authRoutes from "./routes/authRoutes";
import emailRoutes from "./routes/emailRoutes";
import getEmailsRoute from "./routes/getEmails";

if (process.env.NODE_ENV === "production") {
  import("./workers/emailWorker");
}

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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

app.use("/api", emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", getEmailsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
