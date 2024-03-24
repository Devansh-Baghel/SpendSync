import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkout } from "../controllers/payment.controller.js";

const router = Router();

// secure routes
router.route("/checkout").post(verifyJWT, checkout);

export default router;
