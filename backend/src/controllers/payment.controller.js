import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const checkout = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user.isPaidUser) throw new ApiError(400, "Already paid user");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Lifetime SpendSync Pro Membership",
          },
          unit_amount: 3000,
        },
        quantity: 1,
      },
    ],
    success_url: process.env.CLIENT_URL,
    cancel_url: process.env.CLIENT_URL,
  });

  if (session.success_url) {
    user.isPaidUser === true;
    await user.save();
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user, url: session.url }, "Payment successfull")
    );
});
