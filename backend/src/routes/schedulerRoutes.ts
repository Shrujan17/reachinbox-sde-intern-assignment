import { Router } from "express";
import { emailQueue } from "../queue/jobQueue";

const router = Router();

router.post("/schedule", async (req, res) => {
  const { to, subject, body, sendAt } = req.body;

  const delay = new Date(sendAt).getTime() - Date.now();

  await emailQueue.add(
    "send-email",
    { to, subject, body },
    { delay }
  );

  res.json({ message: "Email scheduled successfully" });
});

export default router;
