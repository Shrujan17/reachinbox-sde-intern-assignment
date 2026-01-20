import { Worker, Job } from "bullmq";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const worker = new Worker(
  "email-queue",
  async (job: Job) => {
    const { to, subject, body } = job.data;
    
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text: body,
    });

    // Update DB status to 'sent'
    await prisma.emailJob.updateMany({
      where: { recipient: to, subject: subject, status: "pending" },
      data: { status: "sent" }
    });
  },
  {
    connection: { url: process.env.REDIS_URL! }
  }
);