import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: [true, "Please add testimonial content"],
      maxlength: [1000, "Content too long"],
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    course: {
      type: String,
      required: [true, "Please specify the course"],
      trim: true,
      maxlength: [100, "Course name too long"],
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
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
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Text index for search
testimonialSchema.index({
  name: "text",
  content: "text",
  course: "text",
  title: "text",
});

// Compound indexes
testimonialSchema.index({ status: 1, featured: 1, date: -1 });
testimonialSchema.index({ rating: -1, date: -1 });

export default mongoose.model("Testimonial", testimonialSchema);
