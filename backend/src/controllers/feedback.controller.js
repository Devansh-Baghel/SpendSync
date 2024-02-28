import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Feedback } from "../models/feedback.model.js";

export const createFeedback = asyncHandler(async (req, res) => {
  const user = req.user;
  const { rating, description } = req.body;

  if (!rating) throw new ApiError(400, "Rating is required");

  if (description) {
    if (typeof description !== "string")
      throw new ApiError(400, "Description must be a string!");
  }

  const ratingOptions = ["1-star", "2-star", "3-star", "4-star", "5-star"];

  if (!ratingOptions.includes(rating))
    throw new ApiError(
      400,
      "Rating must be in the <ratingNumber>-<star> format"
    );

  await Feedback.create({
    madeBy: user._id,
    rating,
    description: !description ? "" : description,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Feedback created successfully"));
});
