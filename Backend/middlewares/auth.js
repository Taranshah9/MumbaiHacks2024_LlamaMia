import jwt from "jsonwebtoken";
import { ErrorHandler } from "../lib/helper.js";
import { TryCatch } from "./error.js";

export const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["chat-token"];

  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET || "niodhfhgidabi"
  );

  req.user = decodedData._id;

  next();
});
