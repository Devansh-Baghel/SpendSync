import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (!fullName) throw new ApiError(400, "Fullname is required");
  // if (!username) throw new ApiError(400, "Username is required");
  if (!password) throw new ApiError(400, "Password is required");
  if (!email) throw new ApiError(400, "Email is required");

  // const usernameExists = await User.findOne({ username });
  // if (usernameExists) throw new ApiError(409, "Username already exists");

  const emailExists = await User.findOne({ email });
  if (emailExists) throw new ApiError(409, "Email has already been used");


  const user = await User.create({
    fullName,
    email,
    password,
    // username: username.toLowerCase(),
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

export { registerUser };
