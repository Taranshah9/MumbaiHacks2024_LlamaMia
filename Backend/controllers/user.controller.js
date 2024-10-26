import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { cookieOptions, ErrorHandler, sendToken } from "../lib/helper.js";
import { compare } from "bcrypt";

export const newUser = TryCatch(async (req, res, next) => {
  const { firstname, lastname, password, email } = req.body;
  
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
  });

  sendToken(res, user, 201, "User created");
});

export const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid Username or Password", 404));

  sendToken(res, user, 200, `Welcome back ${user.firstname}`);
});

export const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  return res.status(200).json({
    success: true,
    user,
  });
});

export const logout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("chat-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});
