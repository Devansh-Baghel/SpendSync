import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createExpense } from "../controllers/transaction.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// secure routes
router
  .route("/create-expense")
  .post(verifyJWT, upload.single("receipt"), createExpense);

export default router;
