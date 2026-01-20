import { Worker } from "bullmq";
import connection from "../queue/redis";
import { sendEmail } from "../services/emailService";

interface EmailJob {
  to: string;
  subject: string;
  body: string;
  sendAt: string;
}

new Worker<EmailJob>(
  "email-queue",
  async (job) => {
    console.log("⏰ Job triggered at:", new Date().toISOString());
    console.log("📩 Sending email to:", job.data.to);

    await sendEmail(job.data.to, job.data.subject, job.data.body);

    console.log("✅ Email sent successfully");
  },
  { connection }
);
