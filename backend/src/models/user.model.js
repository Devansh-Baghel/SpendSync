import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    transactionHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    goals: [
      {
        type: Schema.Types.ObjectId,
        ref: "Goal",
      },
    ],
    isPaidUser: {
      type: Boolean,
      default: false,
    },
    stripeSessionId: { type: String },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
    refershToken: {
      type: String,
    },
    hasSetIncomeAndExpense: {
      type: Boolean,
      default: false,
    },
    income: {
      type: Number,
      min: 0,
    },
    expense: {
      type: Number,
      min: 0,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    currency: {
      type: String,
      default: "$",
      enum: ["$", "€", "¥", "₹", "A$", "C$"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
