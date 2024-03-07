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
      default: "Other",
    },
    type: {
      type: String,
      emun: ["Income", "Expense"],
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
    receipt: { type: String },
    date: { type: Date, default: new Date() },
    wallet: {
      type: String,
      enum: ["Cash", "Credit card", "Debit card", "Bank"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
