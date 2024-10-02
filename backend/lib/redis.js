import Redis from "ioredis"

const client = new Redis("rediss://default:AWRIAAIjcDEyMWI4MjY5ZjFmMWU0ZmU4YjA0NjJhNDEzYmJhZDI2M3AxMA@glad-beetle-25672.upstash.io:6379");
await client.set('foo', 'bar');