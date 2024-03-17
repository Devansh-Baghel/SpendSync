import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Goal } from "../models/goal.model.js";
// import { User } from "../models/user.model.js";
// import { Transaction } from "../models/transaction.model.js";

export const resetDemoUser = asyncHandler(async (req, res) => {
  let user = req.user;

  if (user.email !== "demo@demo.demo")
    throw new ApiError("You aren't the demo user");

  user.avatar =
    "https://res.cloudinary.com/dmg2vyybm/image/upload/v1710250663/ttvr7uqkb46z3eciwjjp.jpg";
  const { deletedCount } = await Goal.deleteMany({ madeBy: user._id });
  console.log(`${deletedCount} goals made by demo user deleted`);
  const goals = await Goal.create([
    {
      madeBy: user._id,
      title: "Europe Vacation",
      finalAmount: 8000,
      currentAmount: 6200,
      category: "Travel",
      description: "The best vacation ever",
    },
    {
      madeBy: user._id,
      title: "Save For a New Car",
      finalAmount: 35000,
      currentAmount: 5600,
      category: "Savings",
      description: "Long way to go!",
    },
  ]);
  user.goals = [goals[0]._id, goals[1]._id];
  user.transactionHistory = [
    "65eb1b1e1c84f48b0bb5fcf9",
    "65eb1b991c84f48b0bb5fd05",
    "65eb1bb71c84f48b0bb5fd09",
    "65eb1be31c84f48b0bb5fd0d",
    "65eb1db91c84f48b0bb5fd45",
  ];
  user.fullName = "Demo User";
  user.bio = "Hello, i am the demo user!";
  user.income = 7800;
  user.expense = 2200;
  user.currentBalance = 65000;

  user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Demo user has been reset"));
});
