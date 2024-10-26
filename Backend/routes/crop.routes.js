import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  deleteCrop,
  getCrops,
  postcrop,
  searchCrop,
} from "../controllers/crop.controller.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/getcrops", getCrops);
router.post("/createcrop", postcrop);
router.delete("/deletecrop", deleteCrop);
router.get("/searhcrop", searchCrop);

export default router;
