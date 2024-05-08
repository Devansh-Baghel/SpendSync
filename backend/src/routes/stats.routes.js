import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getIncomeAndExpenseByTimeRange } from "../controllers/stats.controller.js";

const router = Router();

// secure routes
router
  .route("/get-income-expense-by-time-range")
  .get(verifyJWT, getIncomeAndExpenseByTimeRange);

export default router;
