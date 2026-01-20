"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDelayIfRateLimited = getDelayIfRateLimited;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default({
    host: "127.0.0.1",
    port: 6379,
});
const EMAILS_PER_HOUR = Number(process.env.EMAILS_PER_HOUR || 200);
async function getDelayIfRateLimited() {
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
