import express from "express";
import { addTocart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/",protectRoute, addTocart);
router.get("/",protectRoute, getCartProducts);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/", protectRoute, updateQuantity);
export default router;