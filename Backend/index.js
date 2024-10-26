import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cropRouter from "./routes/crop.routes.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(cookieParser());

app.get("/health", (req, res, next) => {
  return res.status(200).json({
    message: "ok!",
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/crop", cropRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
