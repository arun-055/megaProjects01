import Redis from "ioredis"
import dotenv from "dotenv";
export const client = new Redis(process.env.UPSTASH_REDIS_URL);

