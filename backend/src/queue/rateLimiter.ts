import IORedis from "ioredis";

const redis = new IORedis({
  host: "127.0.0.1",
  port: 6379,
});

const EMAILS_PER_HOUR = Number(process.env.EMAILS_PER_HOUR || 200);

export async function getDelayIfRateLimited(): Promise<number> {
  const hour = new Date().getHours();
  const hourKey = `email_count:${hour}`;

  const count = await redis.incr(hourKey);

  if (count === 1) {
    await redis.expire(hourKey, 3600);
  }

  if (count > EMAILS_PER_HOUR) {
    const ttl = await redis.ttl(hourKey);
    return ttl > 0 ? ttl * 1000 : 0;
  }

  return 0;
}
