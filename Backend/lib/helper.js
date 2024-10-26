import jwt from "jsonwebtoken";

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const sendToken = (res, user, code, message) => {
  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET || "niodhfhgidabi"
  );

  return res.status(code).cookie("chat-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

export { ErrorHandler, sendToken };
