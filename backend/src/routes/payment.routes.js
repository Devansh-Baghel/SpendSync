import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  confirmPayment,
  createCheckout,
} from "../controllers/payment.controller.js";

const router = Router();

// secure routes
router.route("/create-checkout").post(verifyJWT, createCheckout);
router.route("/confirm-payment").post(verifyJWT, confirmPayment);

export default router;
