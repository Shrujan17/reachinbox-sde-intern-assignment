import { Queue } from "bullmq";
import connection from "./redis";

export interface EmailJob {
  to: string;
  subject: string;
  body: string;
  sendAt: string;
}

export const emailQueue = new Queue("email-queue", {
  connection,
});

export async function scheduleJob(job: EmailJob) {
  const delay = new Date(job.sendAt).getTime() - Date.now();

  if (delay < 0) {
    throw new Error("Scheduled time must be in the future");
  }

  await emailQueue.add("send-email", job, {
    delay,
    removeOnComplete: true,
    removeOnFail: true,
  });
}
