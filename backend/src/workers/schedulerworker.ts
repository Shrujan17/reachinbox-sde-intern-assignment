import { Worker } from "bullmq";
import redisConnection from "../queue/redis";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!, // App password
  },
});

new Worker(
  "email-queue",
  async (job) => {
    const { to, subject, body } = job.data;

    await transporter.sendMail({
      from: `"ReachInbox" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: body,
    });

    console.log("✅ Email sent to", to);
  },
  {
    connection: redisConnection,
  }
);
