import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const createCheckout = asyncHandler(async (req, res) => {
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
    success_url: `${process.env.CLIENT_URL}/payment-success`,
    cancel_url: process.env.CLIENT_URL,
  });

  user.stripeSessionId = session.id;
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, url: session.url },
        "Checkout session created"
      )
    );
});

export const confirmPayment = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user.stripeSessionId) throw new ApiError(400, "Session id is required");

  const session = await stripe.checkout.sessions.retrieve(user.stripeSessionId);

  if (!session) throw new ApiError(404, "Session doesn't exist");

  if (session.payment_status !== "paid") {
    throw new ApiError(400, "User hasn't paid yet");
  }

  user.isPaidUser = true;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Updated user payment status"));
});
