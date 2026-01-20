import { Queue } from "bullmq";

export const emailQueue = new Queue("email-queue", {
  connection: {
    url: process.env.REDIS_URL!, // ✅ ONLY Redis config here
  },
});
