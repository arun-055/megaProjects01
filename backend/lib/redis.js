import Redis from "ioredis"
import dotenv from "dotenv";
const client = new Redis(process.env.UPSTASH_REDIS_URL);
await Redis.set('foo', 'bar');