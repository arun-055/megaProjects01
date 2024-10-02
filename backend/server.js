import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"
import {connectDB} from "./lib/db.js";

dotenv.config();

console.log(`Loaded PORT: ${process.env.PORT}`);

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

