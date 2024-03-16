import { Goal } from "../models/goal.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const createGoal = asyncHandler(async (req, res) => {
  const { title, finalAmount, category, description } = req.body;
  const userId = req.user._id;
  const user = req.user;

  if (!title) throw new ApiError(400, "Goal title is required");
  if (!finalAmount) throw new ApiError(400, "Final amount is required");

  const goal = await Goal.create({
    madeBy: userId,
    title,
    finalAmount,
    category: category ? category : "Savings",
    description: description ? description : "",
  });

  user.goals.push(goal._id);
  await user.save();

  return res
    .status(201)
    .json(
      new ApiResponse(201, { user, goal }, "New goal successfully created")
    );
});

export const getGoals = asyncHandler(async (req, res) => {
  const userGoals = req.user.goals;

  if (!userGoals || userGoals.length === 0)
    throw new ApiError(404, "User doesn't have any goals");

  const goals = await Goal.find({ _id: { $in: userGoals } });

  return res
    .status(200)
    .json(new ApiResponse(200, { goals }, "Goals sent successfully"));
});

export const updateGoal = asyncHandler(async (req, res) => {
  const { goalId, title, finalAmount, description, category } = req.body;
  const user = req.user;

  if (!goalId) throw new ApiError(400, "Goal id is required to update goal");

  const updateFields = {};
  if (category) updateFields.category = category;
  if (description) updateFields.description = description;
  if (finalAmount) updateFields.finalAmount = finalAmount;
  if (title) updateFields.title = title;

  const updatedGoal = await Goal.findByIdAndUpdate(goalId, updateFields, {
    new: true,
  });

  if (!updatedGoal) throw new ApiError(404, "Goal doesn't exist");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, goal: updatedGoal },
        "Goal updated successfully"
      )
    );
});

export const addMoneyToGoal = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const user = req.user;
  const { goalId, currentAmount } = req.body;

  if (!goalId)
    throw new ApiError(400, "Goal id is required to add money to goal");
  if (!currentAmount)
    throw new ApiError(400, "Current ammount is required to add money to goal");

  if (currentAmount > user.currentBalance)
    throw new ApiError(
      403,
      "Goal current amount can't be greater than user's balance"
    );

  if (!user.goals.includes(goalId))
    throw new ApiError(400, "This goal isn't created by this user");

  const updatedGoal = await Goal.findByIdAndUpdate(
    goalId,
    {
      $inc: { currentAmount: currentAmount }, // Increment the amount by currentAmount
    },
    {
      new: true,
      session,
    }
  );

  if (!updatedGoal) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(404, "Goal doesn't exist");
  }

  if (updatedGoal.currentAmount > updatedGoal.finalAmount) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(
      400,
      "The amount that you are trying to add can't be greater than the final amount of this goal"
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $inc: { currentBalance: -currentAmount }, // Decrement the current balance by currentAmount
    },
    {
      new: true,
      session,
    }
  ).select("-password -refreshToken");

  if (!updatedUser) throw new ApiError(404, "User doesn't exist");

  await session.commitTransaction();
  session.endSession();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser, goal: updatedGoal },
        "Added money to goal"
      )
    );
});

export const deleteGoal = asyncHandler(async (req, res) => {
  const { goalId, goalCurrentAmount } = req.body;
  const user = req.user;

  if (user.goals.length === 0 || !user.goals)
    throw new ApiError(401, "User doesn't have any goals");

  if (!goalId) throw new ApiError(400, "Goal id is required to delete goal");
  if (goalCurrentAmount === undefined)
    throw new ApiError(400, "Current goal amount is required");

  if (!user.goals.includes(goalId))
    throw new ApiError(400, "This goal isn't created by this user");

  user.goals = user.goals.filter((item) => item.toString() !== goalId);
  user.currentBalance += +goalCurrentAmount;

  await user.save();
  await Goal.deleteOne({ _id: goalId });

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Goal deleted successfully"));
});
