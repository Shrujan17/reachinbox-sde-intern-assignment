import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { emailQueue } from "../queue/emailQueue";
// import { verifyToken } from "../utils/jwt"; // ⛔ disabled for demo

const router = Router();
const prisma = new PrismaClient();

/**
 * Schedule a new email (DEMO MODE – auth bypassed)
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    // 🔓 DEMO MODE: bypass auth
    const demoUser = {
      id: "demo-user",
      email: "demo@reachinbox.dev"
    };

    // 📩 Payload
    const {
      to,
      subject,
      body,
      senderEmail,
      sendAt
    } = req.body;

    if (!to || !subject || !body || !senderEmail || !sendAt) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // 🗄️ Persist in DB
    const email = await prisma.emailJob.create({
      data: {
        recipient: to,
        subject,
        body,
        senderEmail,
        scheduledAt: new Date(sendAt),
        status: "pending"
      }
    });

    // ⏳ Schedule job with BullMQ
    const delay = new Date(sendAt).getTime() - Date.now();

    await emailQueue.add(
      "send-email",
      { emailId: email.id },
      {
        jobId: email.id, // idempotency
        delay: Math.max(0, delay)
      }
    );

    return res.json(email);
  } catch (err) {
    console.error("Schedule error:", err);
    return res.status(500).json({ error: "Failed to schedule email" });
  }
});

/**
 * Get all scheduled & sent emails
 */
router.get("/emails", async (_: Request, res: Response) => {
  const emails = await prisma.emailJob.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.json(emails);
});

export default router;
