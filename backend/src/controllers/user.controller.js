import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
      "Something went wrong while generating access and refresh tokens"
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
    "-password -refreshToken"
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
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
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
        "User logged in successfully"
      )
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
    }
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

export const addIncomeAndExpense = asyncHandler(async (req, res) => {
  const { income, expense } = req.body;
  const user = req.user;

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

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      hasSetIncomeAndExpense: true,
      income,
      expense,
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!updatedUser) throw new ApiError(404, "User not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: updatedUser,
      },
      "Income and expense added successfully"
    )
  );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) throw new ApiError(401, "Invalid refresh token");

  if (incomingRefreshToken !== user?.refreshToken)
    throw new ApiError(401, "Refresh token is expired or used");

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access token refreshed"
      )
    );
});

export const initialDeposit = asyncHandler(async (req, res) => {
  const user = req.user;
  const { depositAmount } = req.body;

  if (!depositAmount) throw new ApiError(400, "Deposit amount is required");
  if (isNaN(depositAmount))
    throw new ApiError(400, "Deposit amount must be a number");
  if (depositAmount < 1)
    throw new ApiError(400, "Deposit amount must be at least 1");
  if (user.currentBalance !== 0)
    throw new ApiError(400, "User already has money in their account");

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      currentBalance: depositAmount,
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, { user: updatedUser }, "Initial deposit added"));
});

export const updateAccountBalance = asyncHandler(async (req, res) => {
  const user = req.user;
  const { newAmount } = req.body;

  if (!newAmount) throw new ApiError(400, "New amount is required");
  if (isNaN(newAmount)) throw new ApiError(400, "New amount must be a number");
  if (newAmount < 1) throw new ApiError(400, "New amount must be at least 1");

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      currentBalance: newAmount,
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, "Updated account balance")
    );
});

export const updateDate = asyncHandler(async (req, res) => {
  const { date } = req.body;
  const user = req.user;

  if (!date) throw new ApiError(400, "Date is required");

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { dateOfBirth: date },
    { new: true }
  ).select("-password -refreshToken");
  if (!updatedUser) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { user: updatedUser }, "Date of birth added"));
});

export const updateUserDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  const { name, bio } = req.body;

  const updateFields = {};
  if (name) updateFields.fullName = name;
  if (bio) updateFields.bio = bio;

  const updatedUser = await User.findByIdAndUpdate(user._id, updateFields, {
    new: true,
  }).select("-password -refreshToken");

  if (!updatedUser) throw new ApiError(404, "User doesn't exist");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        "Updated user fields successfully"
      )
    );
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file.path;
  const user = req.user;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) throw new ApiError(400, "Avatar file is required");

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { avatar: avatar.url },
    { new: true }
  ).select("-password -refreshToken");

  if (!updatedUser)
    throw new ApiError(500, "Something went wrong uploading avatar");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, "Avatar uploaded sucessfully")
    );
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    throw new ApiError(400, "Both old and new passwords are required");

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export const updateCurrency = asyncHandler(async (req, res) => {
  const user = req.user;
  const { newCurrency } = req.body;

  if (!newCurrency) throw new ApiError(400, "New currency is required");

  if (!["$", "€", "¥", "₹", "A$", "C$"].includes(newCurrency))
    throw new ApiError(400, "Currency is not supported");

  user.currency = newCurrency;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Currency updated successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: req.user }, "User fetched successfully")
    );
});
