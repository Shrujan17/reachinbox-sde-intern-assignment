import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { emailQueue } from "../queue/jobQueue";

const router = Router();
const prisma = new PrismaClient();

router.post("/schedule", async (req, res) => {
  try {
    const { to, subject, body, sendAt } = req.body;
    const delay = new Date(sendAt).getTime() - Date.now();

    await emailQueue.add("send-email", { to, subject, body }, { delay: Math.max(0, delay) });

    const email = await prisma.emailJob.create({
      data: {
        recipient: to,
        subject,
        body,
        scheduledAt: new Date(sendAt),
        status: "pending"
      }
    });
    res.json(email);
  } catch (error) {
    res.status(500).json({ error: "Scheduling failed" });
  }
});

router.get("/emails", async (req, res) => {
  const emails = await prisma.emailJob.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(emails);
});

export default router;