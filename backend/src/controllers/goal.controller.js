import { Goal } from "../models/goal.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
      new ApiResponse(201, { user, goal }, "New goal successfully created"),
    );
});
