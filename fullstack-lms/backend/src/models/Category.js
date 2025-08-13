import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a category name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot be more than 200 characters"],
    },
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    parentCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for category URL
categorySchema.virtual("categoryUrl").get(function () {
  return `/categories/${this.slug}`;
});

// Create slug from name
categorySchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    return next();
  }

  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  next();
});

export default mongoose.model("Category", categorySchema);
