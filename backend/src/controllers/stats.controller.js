import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";

export const getIncomeAndExpenseByTimeRange = asyncHandler(async (req, res) => {
  const { timeRange } = req.body;
  const user = req.user;

  if (!timeRange) {
    throw new ApiError(400, "Time range is required");
  }

  if (!["week", "month", "year"].includes(timeRange)) {
    throw new ApiError(400, "Time range must be in week, month or year");
  }

  if (!user.transactionHistory) {
    throw new ApiError(400, "This user hasn't made any transactions yet");
  }

  const transactions = await Transaction.find({
    _id: { $in: user.transactionHistory },
  });

  console.log(transactions);

  // switch (timeRange) {
  //   case "week":
  // }

  return res.status(200).json(new ApiResponse(200, {}, "hgotasdf "));
});
