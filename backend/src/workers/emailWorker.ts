import { Worker } from "bullmq";
import nodemailer from "nodemailer";

new Worker(
  "emailQueue",
  async (job) => {
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
      to: job.data.recipient,
      subject: job.data.subject,
      text: job.data.body,
    });

    console.log("Email sent:", nodemailer.getTestMessageUrl(info));
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
    concurrency: 5,
  }
);
