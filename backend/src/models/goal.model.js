import { Schema } from "mongoose";
import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
  {
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    madeBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      default: "Savings",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Goal = mongoose.model("Goal", goalSchema);
