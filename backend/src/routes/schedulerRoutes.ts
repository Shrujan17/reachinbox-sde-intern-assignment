import { Router } from "express";
import { scheduleJob } from "../queue/jobQueue";

const router = Router();

router.post("/schedule", async (req, res) => {
  try {
    const { to, subject, body, sendAt } = req.body;

    if (!to || !subject || !body || !sendAt) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    await scheduleJob({ to, subject, body, sendAt });

    return res.status(200).json({
      message: "Email scheduled successfully",
    });
  } catch (error) {
    console.error("Schedule error:", error);
    return res.status(500).json({
      error: "Failed to schedule email",
    });
  }
});

export default router;
