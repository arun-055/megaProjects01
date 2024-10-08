import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"

import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.routes.js"

dotenv.config();

console.log(`Loaded PORT: ${process.env.PORT}`);

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

