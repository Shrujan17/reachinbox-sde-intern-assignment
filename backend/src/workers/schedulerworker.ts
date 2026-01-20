import { Worker } from "bullmq";

const worker = new Worker(
  "email-queue",
  async (job) => {
    // send email logic
  },
  {
    connection: {
      url: process.env.REDIS_URL!,
    },
  }
);
