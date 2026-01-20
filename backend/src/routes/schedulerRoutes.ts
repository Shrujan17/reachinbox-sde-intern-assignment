import { Router } from "express";
import { scheduleEmail } from "../queue/jobQueue";

const router = Router();

router.post("/schedule", async (req, res) => {
  try {
    const { to, subject, body, sendAt } = req.body;

    await scheduleEmail({ to, subject, body, sendAt });

    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
