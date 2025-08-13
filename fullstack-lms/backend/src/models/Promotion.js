import mongoose from "mongoose";

const PromotionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    used: {
      type: Number,
      default: 0,
      min: 0,
    },
    limit: {
      type: Number,
      default: 0,
      min: 0,
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "scheduled"],
      default: "active",
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

PromotionSchema.index({ code: "text", name: "text", description: "text" });

export default mongoose.model("Promotion", PromotionSchema);
