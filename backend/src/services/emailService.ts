import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, body: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Reachinbox Scheduler" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text: body,
  });

  console.log("✅ Real email sent to:", to);
}
