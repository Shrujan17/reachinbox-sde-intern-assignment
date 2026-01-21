import { Router } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { emailQueue } from "../queue/jobQueue";

const router = Router();
const prisma = new PrismaClient();

const isAuth = (req: any, res: any, next: any) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Unauthorized" });

  try {
    const token = auth.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.post("/schedule", isAuth, async (req, res) => {
  const { to, subject, body, sendAt } = req.body;

  const delay = new Date(sendAt).getTime() - Date.now();

  await emailQueue.add(
    "send-email",
    { to, subject, body },
    { delay: Math.max(0, delay) }
  );

  const email = await prisma.emailJob.create({
    data: {
      recipient: to,
      subject,
      body,
      scheduledAt: new Date(sendAt),
      status: "pending",
    },
  });

  res.json(email);
});

router.get("/emails", isAuth, async (req, res) => {
  const emails = await prisma.emailJob.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(emails);
});

export default router;
