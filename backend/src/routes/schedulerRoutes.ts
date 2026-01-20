import { Router } from "express";
import { scheduleJob } from "../queue/jobQueue";

const router = Router();

router.post("/schedule", async (req, res) => {
  const { to, subject, body, sendAt } = req.body;

  if (!to || !subject || !body || !sendAt) {
    return res.status(400).json({ error: "Missing fields" });
  }

  await scheduleJob({ to, subject, body, sendAt });

  res.json({ success: true });
});

export default router;
