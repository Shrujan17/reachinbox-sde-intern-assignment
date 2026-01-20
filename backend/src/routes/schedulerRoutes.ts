import { Router, Request, Response } from "express";
import { emailQueue } from "../queue/jobQueue";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/schedule", async (req: Request, res: Response) => {
  try {
    const { to, subject, body, sendAt } = req.body;
    const delay = new Date(sendAt).getTime() - Date.now();

    await emailQueue.add("send-email", { to, subject, body }, { delay: Math.max(0, delay) });

    // prisma.emailJob matches 'model EmailJob' in your schema
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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/emails", async (req: Request, res: Response) => {
  const emails = await prisma.emailJob.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(emails);
});

export default router;