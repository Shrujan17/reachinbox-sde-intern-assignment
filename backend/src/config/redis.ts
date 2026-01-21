import { createClient } from "redis";
import { ConnectionOptions } from "bullmq";

/**
 * Redis client (for rate limiting counters)
 */
export const redis = createClient({
  url: process.env.REDIS_URL
});

redis.connect();

/**
 * BullMQ connection config
 */
const redisConnection: ConnectionOptions = {
  url: process.env.REDIS_URL!
};

export default redisConnection;
