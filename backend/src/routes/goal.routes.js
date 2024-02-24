import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createGoal, getGoals } from "../controllers/goal.controller.js";

const router = Router();

// secure routes
router.route("/create-goal").post(verifyJWT, createGoal);
router.route("/get-goals").get(verifyJWT, getGoals);

export default router;
