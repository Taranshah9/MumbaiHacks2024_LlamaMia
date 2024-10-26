import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
    },
    qty: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Crop = mongoose.models.Crop || mongoose.model("Crop", cropSchema);
