import { Router } from "express";
import prisma from "../db/prisma";

const router = Router();

router.get("/emails", async (_req, res) => {
  const emails = await prisma.email.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(emails);
});

router.get("/emails/sent", async (_req, res) => {
  const emails = await prisma.email.findMany({
    where: { status: "SENT" },
    orderBy: { sentAt: "desc" },
  });
  res.json(emails);
});

export default router;
