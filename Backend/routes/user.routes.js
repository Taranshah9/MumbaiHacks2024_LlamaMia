import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", newUser);
router.post("/login", login);

router.use(isAuthenticated);

router.get("/me", getMyProfile);
router.get("/logout", logout);

export default router;
