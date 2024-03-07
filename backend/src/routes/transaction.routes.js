import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createExpense,
  getTransactions,
} from "../controllers/transaction.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// secure routes
router
  .route("/create-expense")
  .post(verifyJWT, upload.single("receipt"), createExpense);

router.route("/get-transactions").get(verifyJWT, getTransactions);

export default router;
