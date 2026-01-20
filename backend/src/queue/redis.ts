import { ConnectionOptions } from "bullmq";

const connection: ConnectionOptions = process.env.REDIS_URL
  ? {
      url: process.env.REDIS_URL,
      tls: {}, // 🔒 required for Upstash
    }
  : {
      host: "127.0.0.1",
      port: 6379,
    };

export default connection;
