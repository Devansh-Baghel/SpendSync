import mongoose, { Schema } from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    madeBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "other",
    },
    typeOfTransaction: {
      type: String,
      emun: ["add-money", "subtract-money"],
      required: true,
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

export const Transaction = mongoose.model("Transaction", transactionSchema);
