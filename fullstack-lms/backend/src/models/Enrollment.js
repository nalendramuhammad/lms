import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student is required"],
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled", "expired"],
      default: "active",
      index: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    completedAt: {
      type: Date,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    certificate: {
      issued: {
        type: Boolean,
        default: false,
      },
      issuedAt: {
        type: Date,
      },
      certificateId: {
        type: String,
      },
    },
    payment: {
      amount: {
        type: Number,
        required: function () {
          return this.course && !this.course.isFree;
        },
      },
      currency: {
        type: String,
        default: "IDR",
      },
      status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "completed",
      },
      paymentMethod: {
        type: String,
      },
      transactionId: {
        type: String,
      },
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot be more than 500 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound indexes
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ status: 1, enrolledAt: -1 });
enrollmentSchema.index({ course: 1, status: 1 });

// Virtual for enrollment duration
enrollmentSchema.virtual("duration").get(function () {
  if (this.completedAt && this.enrolledAt) {
    return Math.ceil(
      (this.completedAt - this.enrolledAt) / (1000 * 60 * 60 * 24)
    );
  }
  return null;
});

// Pre-save middleware to handle certificate
enrollmentSchema.pre("save", function (next) {
  if (this.progress === 100 && this.status === "active") {
    this.status = "completed";
    this.completedAt = new Date();
  }
  next();
});

export default mongoose.model("Enrollment", enrollmentSchema);
