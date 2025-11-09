import express from "express"
import {getBookInsights} from "../controllers/ai.controller.js"
import {protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.get("/:bookId" , protectRoute , getBookInsights);

export default router;