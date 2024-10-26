import { ErrorHandler } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Crop } from "../models/crop.model.js";
import { User } from "../models/user.model.js";

export const getCrops = TryCatch(async (req, res, next) => {
  const crops = await Crop.find({
    userId: req.user,
  });

  res.status(200).json({ crops });
});

export const postcrop = TryCatch(async (req, res, next) => {
  const { cropName, qty, date, month, year } = req.body;

  if ([cropName, qty, month, year].some((field) => field?.trim() === "")) {
    next(new ErrorHandler(400, "All the fields are required"));
  }

  const crops = await Crop.create({
    cropName,
    qty,
    date,
    month,
    year,
    userId: req.user,
  });

  const update = await User.findByIdAndUpdate(req.user, {
    $push: {
      crops: crops._id,
    },
  });

  return res.status(201).json({
    success: true,
    crops,
  });
});

export const deleteCrop = TryCatch(async (req, res) => {
  const { cropId } = req.body;

  await Crop.deleteOne({
    id: cropId,
  });

  return res.status(201).json({
    success: true,
    message: "Deleted Successfully",
  });
});

export const searchCrop = TryCatch(async (req, res) => {
  const { cropQuery = "" } = req.query;

  const crops = await Crop.find({
    userId: req.user,
    cropName: {
      $regex: cropQuery,
      $options: "i",
    },
  });
  return res.status(201).json({
    success: true,
    message: "Result Successfully",
    crops,
  });
});
