import mongoose from "mongoose";

const marketingContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [200, "Subtitle cannot be more than 200 characters"],
    },
    thumbnail: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: [
        "video",
        "ebook",
        "webinar",
        "article",
        "course",
        "infographic",
        "case-study",
      ],
      required: [true, "Please specify content type"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [2000, "Description too long"],
    },
    campaign: {
      type: String,
      required: [true, "Please specify the campaign"],
      trim: true,
      maxlength: [100, "Campaign name too long"],
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "draft", "scheduled", "archived"],
      default: "draft",
      index: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    content: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    targetAudience: {
      type: String,
      trim: true,
      maxlength: [200, "Target audience too long"],
    },
    metrics: {
      views: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      conversions: { type: Number, default: 0 },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    publishedAt: {
      type: Date,
    },
    scheduledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Text index for search
marketingContentSchema.index({
  title: "text",
  subtitle: "text",
  description: "text",
  campaign: "text",
  tags: "text",
});

// Compound indexes
marketingContentSchema.index({ status: 1, type: 1, date: -1 });
marketingContentSchema.index({ campaign: 1, status: 1 });
marketingContentSchema.index({ scheduledAt: 1, status: 1 });

export default mongoose.model("MarketingContent", marketingContentSchema);
