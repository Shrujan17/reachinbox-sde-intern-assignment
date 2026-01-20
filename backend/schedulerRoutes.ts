import { Router, Request, Response } from "express";
import { emailQueue } from "../queue/jobQueue";

const router = Router(); // This fixes the "Cannot find name 'router'" error

router.post("/schedule", async (req: Request, res: Response) => {
  try {
    const { to, subject, body, sendAt } = req.body;

    const delay = new Date(sendAt).getTime() - Date.now();

    await emailQueue.add(
      "send-email",
      { to, subject, body },
      { delay }
    );

    res.json({ message: "Email scheduled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// This fixes the "has no default export" error in index.ts
export default router;