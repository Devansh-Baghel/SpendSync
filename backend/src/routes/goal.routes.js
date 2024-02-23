import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGoal } from "../controllers/goal.controller.js";

const router = Router();

// secure routes
router.route("/create-goal").post(verifyJWT, createGoal);

export default router
