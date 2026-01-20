import { Router, Request, Response } from "express";
import { emailQueue } from "../queue/jobQueue";
import { PrismaClient } from "@prisma/client"; // Ensure Prisma is installed

const router = Router();
const prisma = new PrismaClient();

// 1. Schedule the Email
router.post("/schedule", async (req: Request, res: Response) => {
  try {
    const { to, subject, body, sendAt } = req.body;
    const delay = new Date(sendAt).getTime() - Date.now();

    // Add to Redis Queue
    await emailQueue.add(
      "send-email",
      { to, subject, body },
      { delay: Math.max(0, delay) }
    );

    // Save to Database so it appears in the Dashboard
    const email = await prisma.emailJob.create({
      data: {
        recipient: to,
        subject,
        body,
        scheduledAt: new Date(sendAt),
        status: "pending"
      }
    });

    res.json({ message: "Email scheduled successfully", email });
  } catch (error) {
    console.error("Scheduling error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. Fetch Emails for the Dashboard (Fixes empty tables)
router.get("/emails", async (req: Request, res: Response) => {
  try {
    const emails = await prisma.emailJob.findMany({
      orderBy: { scheduledAt: 'desc' }
    });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

export default router;