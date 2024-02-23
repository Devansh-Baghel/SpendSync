import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens",
    );
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) throw new ApiError(400, "Fullname is required");
  if (!password) throw new ApiError(400, "Password is required");
  if (!email) throw new ApiError(400, "Email is required");

  const emailExists = await User.findOne({ email });
  if (emailExists) throw new ApiError(409, "Email has already been used");

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered sucessfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new ApiError(400, "Email required");
  if (!password) throw new ApiError(400, "Password required");

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid Password");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully",
      ),
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

export const addIncome = asyncHandler(async (req, res) => {
  const { email, income } = req.body;

  if (!email) throw new ApiError(400, "User email is required to add income");
  if (!income)
    throw new ApiError(400, "Income ammount is required to add income");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  await User.updateOne(
    { _id: user._id },
    { hasSetIncome: true, income: income },
  );

  return res.status(200).json(new ApiResponse(200, {}, "Added income"));
});

export const addExpense = asyncHandler(async (req, res) => {
  const { email, expense } = req.body;

  if (!email) throw new ApiError(400, "User email is required to add income");
  if (!expense)
    throw new ApiError(400, "Expense ammount is required to add income");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  await User.updateOne(
    { _id: user._id },
    { hasSetExpense: true, expense: expense },
  );

  return res.status(200).json(new ApiResponse(200, {}, "Added expense"));
});

export const addIncomeAndExpense = asyncHandler(async (req, res) => {
  const { email, income, expense } = req.body;

  if (!email)
    throw new ApiError(400, "User email is required to add income and expense");
  if (income === undefined)
    throw new ApiError(400, "Income is required to add income and expense");
  if (expense === undefined)
    throw new ApiError(400, "Expense is required to add income and expense");

  if (isNaN(income) || isNaN(expense))
    throw new ApiError(400, "Income and Expense must be a number");

  if (income < 0 || expense < 0)
    throw new ApiError(400, "Income and Expense can't be less than zero");

  if (expense > income)
    throw new ApiError(400, "Expense can't be greater than income");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  await User.updateOne(
    { _id: user._id },
    {
      hasSetIncome: true,
      income: income,
      hasSetExpense: true,
      expense: expense,
    },
  );

  const updatedUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: updatedUser,
      },
      "Income and expense added successfully",
    ),
  );
});
