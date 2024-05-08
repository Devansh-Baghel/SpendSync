import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN,
      "http://localhost:5173",
      "https://spendsync.baghel.dev",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.routes.js";
import goalRouter from "./routes/goal.routes.js";
import feedbackRouter from "./routes/feedback.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import demoRouter from "./routes/demo.routes.js";
import payRouter from "./routes/payment.routes.js";
import statsRouter from "./routes/stats.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/goals", goalRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/demo", demoRouter);
app.use("/api/v1/pay", payRouter);
app.use("/api/v1/stats", statsRouter);

export default app;
