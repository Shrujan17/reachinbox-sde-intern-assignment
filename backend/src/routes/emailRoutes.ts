import { Router } from "express";
import { emailQueue } from "../queue/emailQueue";

const router = Router();

router.post("/schedule-email", async (req, res) => {
  try {
    const { recipient, subject, body, scheduledAt } = req.body;

    if (!recipient || !subject || !body || !scheduledAt) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const delay = new Date(scheduledAt).getTime() - Date.now();

    await emailQueue.add(
      "sendEmail",
      { recipient, subject, body },
      { delay }
    );

    res.json({ message: "Email scheduled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to schedule email" });
  }
});

export default router;
