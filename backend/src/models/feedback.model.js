import { Schema } from "mongoose";
import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    madeBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: String,
      required: true,
      enum: ["1-star", "2-star", "3-star", "4-star", "5-star"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
