import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { resetDemoUser } from "../controllers/demo.controller.js";

const router = Router();

// secure routes
router.route("/reset-demo-user").post(verifyJWT, resetDemoUser);

export default router
