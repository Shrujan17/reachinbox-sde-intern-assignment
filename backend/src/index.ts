import dotenv from "dotenv";
dotenv.config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");

import passport from "./auth/google";
import authRoutes from "./routes/authRoutes";
import emailRoutes from "./routes/emailRoutes";
import getEmailsRoute from "./routes/getEmails";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
