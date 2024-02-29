import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  // addIncome,
  // addExpense,
  addIncomeAndExpense,
  refreshAccessToken,
  initialDeposit,
  updateAccountBalance,
  updateDate,
  updateUserDetails,
  uploadAvatar,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);
// router.route("/add-income").post(verifyJWT, addIncome);
// router.route("/add-expense").post(verifyJWT, addExpense);
router.route("/add-income-and-expense").post(verifyJWT, addIncomeAndExpense);
router.route("/refresh-access-token").post(verifyJWT, refreshAccessToken);
router.route("/initial-deposit").post(verifyJWT, initialDeposit);
router.route("/update-account-balance").post(verifyJWT, updateAccountBalance);
router.route("/update-date").post(verifyJWT, updateDate);
router.route("/update-details").post(verifyJWT, updateUserDetails);
router
  .route("/upload-avatar")
  .post(verifyJWT, upload.single("avatar"), uploadAvatar);

export default router;
