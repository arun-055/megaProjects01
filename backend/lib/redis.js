import Redis from "ioredis"
import dotenv from "dotenv";
dotenv.config();
export const client = new Redis(process.env.UPSTASH_REDIS_URL);

/* import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

// Initialize Redis client with Upstash Redis URL from environment variables
export const client = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
}); */
