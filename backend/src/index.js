import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";
import { PORT } from "./constants.js";

dotenv.config({
  path: "../.env",
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection failed !!!", err);
  });
