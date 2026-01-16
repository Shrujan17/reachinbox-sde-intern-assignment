import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", emailRoutes);


app.get("/", (_req, res) => {
  res.send("ReachInbox Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
