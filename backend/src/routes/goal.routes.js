import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createGoal,
  getGoals,
  updateGoal,
} from "../controllers/goal.controller.js";

const router = Router();

// secure routes
router.route("/create-goal").post(verifyJWT, createGoal);
router.route("/get-goals").get(verifyJWT, getGoals);
router.route("/update-goal").post(verifyJWT, updateGoal);

export default router;
