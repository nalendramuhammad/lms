import mongoose from "mongoose";

const PricingPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
      trim: true,
      minlength: 3,
      maxlength: 3,
    },
    period: {
      type: String,
      enum: ["month", "year", "lifetime"],
      default: "month",
      index: true,
    },
    features: {
      type: [String],
      default: [],
    },
    subscribers: {
      type: Number,
      default: 0,
      min: 0,
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Text index for search
PricingPlanSchema.index({ name: "text", description: "text" });

export default mongoose.model("PricingPlan", PricingPlanSchema);
