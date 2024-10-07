import express from "express";
import {protectRoute} from "../middileware/auth.middileware.js";
import { getCoupon } from "../controllers/coupon.controller.js";
const router = express.Router();

router.get("/", getCoupon);
router.get("/validate", protectRoute, validateCoupon);
export default router();