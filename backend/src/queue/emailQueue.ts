import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const emailQueue = new Queue("email-queue", {
  connection: redis,
  limiter: {
    max: 1,
    duration: Number(process.env.MIN_DELAY_MS || 2000)
  }
});
