import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Transaction } from "../models/transaction.model.js";

function getDateRange(type) {
  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();

  switch (type) {
    case "week":
      startDate.setDate(today.getDate() - today.getDay());
      endDate.setDate(startDate.getDate() + 6);
      break;
    case "month":
      startDate.setDate(1);
      endDate.setMonth(today.getMonth() + 1, 0);
      break;
    case "year":
      startDate.setMonth(0, 1);
      endDate.setFullYear(today.getFullYear(), 11, 31);
      break;
    default:
      break;
  }

  return { startDate, endDate };
}

function calculateSumForDateRange(startDate, endDate, transactions) {
  let incomeSum = 0;
  let expenseSum = 0;

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    if (transactionDate >= startDate && transactionDate <= endDate) {
      if (transaction.type === "Income") {
        incomeSum += transaction.amount;
      } else if (transaction.type === "Expense") {
        expenseSum += transaction.amount;
      }
    }
  });

  return { incomeSum, expenseSum };
}

export const getIncomeAndExpenseByTimeRange = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user.transactionHistory) {
    throw new ApiError(400, "This user hasn't made any transactions yet");
  }

  const transactions = await Transaction.find({
    _id: { $in: user.transactionHistory },
  });

  const { startDate: weekStart, endDate: weekEnd } = getDateRange("week");
  const { incomeSum: weekIncomeSum, expenseSum: weekExpenseSum } =
    calculateSumForDateRange(weekStart, weekEnd, transactions);

  const { startDate: monthStart, endDate: monthEnd } = getDateRange("month");
  const { incomeSum: monthIncomeSum, expenseSum: monthExpenseSum } =
    calculateSumForDateRange(monthStart, monthEnd, transactions);

  const { startDate: yearStart, endDate: yearEnd } = getDateRange("year");
  const { incomeSum: yearIncomeSum, expenseSum: yearExpenseSum } =
    calculateSumForDateRange(yearStart, yearEnd, transactions);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        week: {
          income: weekIncomeSum,
          expense: weekExpenseSum,
        },
        month: {
          income: monthIncomeSum,
          expense: monthExpenseSum,
        },
        year: {
          income: yearIncomeSum,
          expense: yearExpenseSum,
        },
      },
      "hgotasdf "
    )
  );
});
