import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { emailQueue } from "../queue/emailQueue";
import { verifyToken } from "../utils/jwt";

const router = Router();
const prisma = new PrismaClient();

router.post("/schedule", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const user = verifyToken(token!);

    const {
      to,
      subject,
      body,
      senderEmail,
      sendAt
    } = req.body;

    const email = await prisma.emailJob.create({
      data: {
        recipient: to,
        subject,
        body,
        senderEmail,
        scheduledAt: new Date(sendAt)
      }
    });

    const delay = new Date(sendAt).getTime() - Date.now();

    await emailQueue.add(
      "send-email",
      { emailId: email.id },
      {
        jobId: email.id,
        delay: Math.max(0, delay)
      }
    );

    res.json(email);
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
});

router.get("/emails", async (_, res) => {
  const emails = await prisma.emailJob.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(emails);
});

export default router;
