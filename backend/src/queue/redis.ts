import { ConnectionOptions } from "bullmq";

const redisConnection: ConnectionOptions = {
  url: process.env.REDIS_URL!, // Upstash / Render Redis URL
};

export default redisConnection;
