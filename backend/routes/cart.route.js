import express from "express";
import addTocart from "../controllers/cart.controller.js";
const router = express.Router();

router.post("/",protecteRoute, addTocart);
router.get("/",protecteRoute, getCartProducts);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/", protectRoute, updateQuantity);
export default router;