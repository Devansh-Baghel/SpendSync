import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, wallet, category, date } = req.body;
  const user = req.user;

  if (!title) throw new ApiError(400, "Title is required");
  if (!amount) throw new ApiError(400, "Amount is required");
  if (!wallet) throw new ApiError(400, "Wallet is required");

  if (amount > user.currentBalance && wallet === "Cash") {
    throw new ApiError(
      400,
      "You don't have enough balance to make this transaction"
    );
  }

  const receiptLocalPath = req?.file?.path;

  const receipt = await uploadOnCloudinary(receiptLocalPath);

  const transaction = await Transaction.create({
    madeBy: user._id,
    type: "Expense",
    title,
    receipt: receipt?.url || "",
    amount,
    wallet,
    category: category || "",
    date: date || "",
  });

  const transactionHistory = user.transactionHistory || [];

  let updateQuery = {
    transactionHistory: [...transactionHistory, transaction._id],
  };

  // Check if the wallet is set to "Cash"
  if (wallet === "Cash") {
    updateQuery.$inc = { currentBalance: -amount }; // Decrement the current balance
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, updateQuery, {
    new: true,
  }).select("-password -refreshToken");

  if (!updatedUser)
    throw new ApiError(
      500,
      "Something went wrong while creating the transaction"
    );

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        "Created transaction successfully"
      )
    );
});

export const getTransactions = asyncHandler(async (req, res) => {
  const userTransactions = req.user.transactionHistory;

  if (!userTransactions || userTransactions.length === 0)
    throw new ApiError(404, "User doesn't have any transactions");

  const transactions = await Transaction.find({
    _id: { $in: userTransactions },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { transactions }, "Transactions sent successfully")
    );
});

export const createIncome = asyncHandler(async (req, res) => {
  const { title, amount, category, date } = req.body;
  const user = req.user;

  if (!title) throw new ApiError(400, "Title is required");
  if (!amount) throw new ApiError(400, "Amount is required");
  if (amount < 1) throw new ApiError(400, "Amount can't be less than 1");

  const receiptLocalPath = req?.file?.path;

  const receipt = await uploadOnCloudinary(receiptLocalPath);

  const transaction = await Transaction.create({
    madeBy: user._id,
    type: "Income",
    title,
    receipt: receipt?.url || "",
    amount,
    wallet: "Cash",
    category: category || "",
    date: date || "",
  });

  const transactionHistory = user.transactionHistory || [];

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      transactionHistory: [...transactionHistory, transaction._id],
      $inc: { currentBalance: +amount }, // Increment the current balance
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  if (!updatedUser)
    throw new ApiError(
      500,
      "Something went wrong while creating the transaction"
    );

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        "Created transaction successfully"
      )
    );
});

export const getTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.body;

  if (!transactionId) throw new ApiError(400, "Transaction id is required");

  const transaction = await Transaction.findById(transactionId);

  if (!transaction) throw new ApiError(404, "Transaction doesn't exist");

  return res
    .status(200)
    .json(new ApiResponse(200, { transaction }, "Here is your transaction"));
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.body;
  const user = req.user;

  if (!transactionId) throw new ApiError(400, "Transaction id is required");
  if (!user.transactionHistory.includes(transactionId))
    throw new ApiError(400, "This transaction isn't created by this user");

  user.transactionHistory = user.transactionHistory.filter(
    (item) => item.toString() !== transactionId
  );

  const transaction = await Transaction.deleteOne({ _id: transactionId });
  if (!transaction) throw new ApiError(404, "This transaction doesn't exist");

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Transaction deleted successfully"));
});

export const recentTransactions = asyncHandler(async (req, res) => {
  const userTransactions = req.user.transactionHistory;

  if (!userTransactions || userTransactions.length === 0)
    throw new ApiError(404, "User doesn't have any transactions");

  const transactions = await Transaction.find({
    _id: { $in: userTransactions },
  });

  const recentTransaction = transactions.reverse().slice(0, 5);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { transactions: recentTransaction },
        "Transactions sent successfully"
      )
    );
});
