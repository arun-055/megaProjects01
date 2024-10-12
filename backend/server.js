import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

import authRoutes from "./routes/auth.route.js"

import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.routes.js"
import productRoutes from "./routes/product.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";


dotenv.config();

console.log(`Loaded PORT: ${process.env.PORT}`);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend origin
  credentials: true, // Allow cookies to be sent/received
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));
app.use(express.json({limit: "10mb"}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

