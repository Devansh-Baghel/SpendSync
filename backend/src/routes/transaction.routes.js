import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createExpense,
  createIncome,
  getTransactions,
} from "../controllers/transaction.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// secure routes
router
  .route("/create-expense")
  .post(verifyJWT, upload.single("receipt"), createExpense);

router
  .route("/create-income")
  .post(verifyJWT, upload.single("receipt"), createIncome);

router.route("/get-transactions").get(verifyJWT, getTransactions);

export default router;
