import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
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
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    currentBalance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
