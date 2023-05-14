import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import { globalErrorHandler } from "./src/utils/errorHandler.js";
import { router as userRouter } from "./src/router/user.route.js";
import { router as genreRouter } from "./src/router/genre.route.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.DATABASE_CONNECTION_URL).then(() => console.log("Database connection established")).catch((e) => console.log(e.message));

const port = Number(process.env.PORT) || 4000;

app.use(morgan("tiny"));
app.use(express.json());

app.use("/movie/api/v1/user", userRouter);
app.use("/movie/api/v1/genre", genreRouter);

app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`To the glory of God server running on port: ${port}`);
});