import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createFeedback } from "../controllers/feedback.controller.js";

const router = Router();

// secure routes
router.route("/create-feedback").post(verifyJWT, createFeedback);

export default router;
