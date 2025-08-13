import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a certification name"],
      trim: true,
      maxlength: [200, "Name cannot be more than 200 characters"],
    },
    code: {
      type: String,
      required: [true, "Please add a certification code"],
      trim: true,
      maxlength: [50, "Code cannot be more than 50 characters"],
      unique: true,
    },
    logo: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      required: [true, "Please specify the provider"],
      trim: true,
      maxlength: [100, "Provider name too long"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [2000, "Description too long"],
    },
    level: {
      type: String,
      enum: ["foundation", "entry", "associate", "professional", "expert"],
      required: [true, "Please specify the level"],
      index: true,
    },
    duration: {
      type: String,
      required: [true, "Please specify the duration"],
      trim: true,
      maxlength: [50, "Duration too long"],
    },
    price: {
      type: Number,
      required: [true, "Please specify the price"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "IDR"],
    },
    status: {
      type: String,
      enum: ["active", "draft", "discontinued"],
      default: "draft",
      index: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
      index: true,
    },
    examDetails: {
      examDuration: { type: Number }, // in minutes
      passingScore: { type: Number }, // percentage
      questionCount: { type: Number },
      examType: {
        type: String,
        enum: ["multiple-choice", "practical", "mixed"],
      },
    },
    validityPeriod: {
      type: Number, // in months
      default: 24,
    },
    renewalRequired: {
      type: Boolean,
      default: false,
    },
    renewalFee: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    enrollmentCount: {
      type: Number,
      default: 0,
    },
    completionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Text index for search
certificationSchema.index({
  name: "text",
  description: "text",
  provider: "text",
  skills: "text",
});

// Compound indexes
certificationSchema.index({ status: 1, level: 1, price: 1 });
certificationSchema.index({ provider: 1, status: 1 });
certificationSchema.index({ featured: 1, status: 1 });

export default mongoose.model("Certification", certificationSchema);
