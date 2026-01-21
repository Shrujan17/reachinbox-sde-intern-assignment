import { Worker, Job } from "bullmq";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { redis } from "../config/redis";
import { enforceHourlyLimit } from "../utils/rateLimit";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER!,
    pass: process.env.ETHEREAL_PASS!
  }
});

const MAX_EMAILS_PER_HOUR = Number(process.env.MAX_EMAILS_PER_HOUR || 200);

new Worker(
  "email-queue",
  async (job: Job) => {
    const email = await prisma.emailJob.findUnique({
      where: { id: job.data.emailId }
    });

    if (!email || email.status === "sent") return;

    const allowed = await enforceHourlyLimit(
      email.senderEmail,
      MAX_EMAILS_PER_HOUR
    );

    if (!allowed) {
      const delayUntilNextHour =
        3600000 - (Date.now() % 3600000);

      await job.moveToDelayed(Date.now() + delayUntilNextHour);
      return;
    }

    await transporter.sendMail({
      from: email.senderEmail,
      to: email.recipient,
      subject: email.subject,
      text: email.body
    });

    await prisma.emailJob.update({
      where: { id: email.id },
      data: {
        status: "sent",
        sentAt: new Date()
      }
    });
  },
  {
    concurrency: Number(process.env.WORKER_CONCURRENCY || 5),
    connection: redis
  }
);
