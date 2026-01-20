import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be first

import express from "express";
import cors from "cors";
import passport from "passport";

import authRoutes from "./routes/authRoutes";
import schedulerRoutes from "./routes/schedulerRoutes";
import "./config/google";

const app = express();
