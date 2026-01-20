import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    // ✅ Use emailJob to match your schema.prisma
    const emails = await prisma.emailJob.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(emails);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

export default router;