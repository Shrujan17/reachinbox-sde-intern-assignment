import { Queue } from "bullmq";
import redisConnection from "./redis";

export interface EmailJob {
  to: string;
  subject: string;
  body: string;
  sendAt: string;
}

export const emailQueue = new Queue<EmailJob>("email-queue", {
  connection: redisConnection,
});

export async function scheduleEmail(job: EmailJob) {
  const delay = new Date(job.sendAt).getTime() - Date.now();

  if (delay <= 0) {
    throw new Error("sendAt must be in the future");
  }

  await emailQueue.add("send-email", job, {
    delay,
    removeOnComplete: true,
    removeOnFail: false,
  });
}
