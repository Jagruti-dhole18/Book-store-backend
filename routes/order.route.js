import express from "express"
import {getAllOrders, getOrderHistory, placeOrder} from "../controllers/order.controller.js"
import {protectRoute ,isAdmin } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/placeorder" , protectRoute , placeOrder);
router.get("/",protectRoute,getAllOrders);
router.get("/history",protectRoute,getOrderHistory);
export default router;