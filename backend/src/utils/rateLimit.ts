import { redis } from "../config/redis";

export async function enforceHourlyLimit(
  sender: string,
  maxPerHour: number
): Promise<boolean> {
  const hourKey = `email_limit:${sender}:${new Date()
    .toISOString()
    .slice(0, 13)}`;

  const count = await redis.incr(hourKey);

  if (count === 1) {
    await redis.expire(hourKey, 3600);
  }

  return count <= maxPerHour;
}
