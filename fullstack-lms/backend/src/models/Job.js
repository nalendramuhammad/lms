import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a job title"],
      trim: true,
      maxlength: [120, "Title cannot be more than 120 characters"],
    },
    company: {
      type: String,
      required: [true, "Please add a company name"],
      trim: true,
      maxlength: [120, "Company cannot be more than 120 characters"],
    },
    companyLogo: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Please add a job description"],
      maxlength: [5000, "Description too long"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
      trim: true,
    },
    // Salary fields: store both display text and numeric range for filtering
    salaryText: {
      type: String,
      default: "",
    },
    salaryMin: {
      type: Number,
      min: 0,
    },
    salaryMax: {
      type: Number,
      min: 0,
    },
    salaryCurrency: {
      type: String,
      default: "IDR",
    },
    type: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "contract",
        "internship",
        "freelance",
        "temporary",
      ],
      default: "full-time",
    },
    // Experience fields: keep numeric range plus display text used in UI
    experienceText: {
      type: String,
      default: "",
    },
    experienceMinYears: {
      type: Number,
      min: 0,
      default: 0,
    },
    experienceMaxYears: {
      type: Number,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    remote: {
      type: Boolean,
      default: false,
      index: true,
    },
    applyUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Text index for full-text search across common fields
jobSchema.index({
  title: "text",
  company: "text",
  description: "text",
  location: "text",
  tags: "text",
});

// Common compound indexes to speed up filtering/sorting
jobSchema.index({ type: 1, location: 1, postedDate: -1 });
jobSchema.index({ status: 1, postedDate: -1 });
jobSchema.index({ salaryMin: 1, salaryMax: 1 });

export default mongoose.model("Job", jobSchema);
