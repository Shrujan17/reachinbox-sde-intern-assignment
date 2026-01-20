import { Worker } from "bullmq";
import connection from "../queue/redis";

export const schedulerWorker = new Worker(
  "email-queue",
  async (job) => {
    console.log("📨 Processing job:", job.data);
  },
  {
    connection,
  }
);
