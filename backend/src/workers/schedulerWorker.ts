import { Worker, Job } from "bullmq";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password here
  },
});

console.log("Worker starting...");

const worker = new Worker(
  "email-queue",
  async (job: Job) => {
    const { to, subject, body } = job.data;
    console.log(`Processing job ${job.id} - Sending email to ${to}`);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    });

    console.log(`✅ Success: Email sent to ${to}`);
  },
  {
    connection: {
      url: process.env.REDIS_URL!,
    },
  }
);

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed: ${err.message}`);
});