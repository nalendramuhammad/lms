import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a course title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [200, "Short description cannot be more than 200 characters"],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price must be at least 0"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price must be at least 0"],
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    duration: {
      type: Number, // in minutes
      default: 0,
    },
    lessons: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Lesson",
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    learningOutcomes: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: "English",
    },
    certificate: {
      type: Boolean,
      default: true,
    },
    access: {
      type: String,
      enum: ["lifetime", "1_year", "6_months", "3_months"],
      default: "lifetime",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for course URL
courseSchema.virtual("courseUrl").get(function () {
  return `/courses/${this.slug}`;
});

// Virtual for average rating
courseSchema.virtual("averageRating").get(function () {
  return this.rating / this.numReviews;
});

// Create slug from title
courseSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    return next();
  }

  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  next();
});

export default mongoose.model("Course", courseSchema);
