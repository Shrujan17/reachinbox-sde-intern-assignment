import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import prisma from "../db/prisma";

const worker = new Worker(
  "emailQueue",
  async (job) => {
    const { emailId } = job.data;

    // 1️⃣ Fetch email from DB
    const email = await prisma.email.findUnique({
      where: { id: emailId },
    });

    if (!email) {
      throw new Error("Email not found");
    }

    try {
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await transporter.sendMail({
        from: "ReachInbox <no-reply@reachinbox.ai>",
        to: email.recipient,
        subject: email.subject,
        text: email.body,
      });

      console.log("Email sent:", nodemailer.getTestMessageUrl(info));

      // 2️⃣ Mark as SENT
      await prisma.email.update({
        where: { id: emailId },
        data: {
          status: "SENT",
          sentAt: new Date(),
        },
      });
    } catch (err: any) {
      // 3️⃣ Mark as FAILED
      await prisma.email.update({
        where: { id: emailId },
        data: {
          status: "FAILED",
          error: err.message,
        },
      });

      throw err;
    }
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
    concurrency: 5, // ✅ required by assignment
  }
);

export default worker;
