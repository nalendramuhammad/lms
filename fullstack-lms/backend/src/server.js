import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/courses.js";
import lessonRoutes from "./routes/lessons.js";
import enrollmentRoutes from "./routes/enrollments.js";
import badgeRoutes from "./routes/badges.js";
import certificateRoutes from "./routes/certificates.js";
import categoryRoutes from "./routes/categories.js";
import testimonialRoutes from "./routes/testimonials.js";
import jobRoutes from "./routes/jobs.js";
import marketingRoutes from "./routes/marketing.js";
import pricingRoutes from "./routes/pricing.js";
import campaignRoutes from "./routes/campaigns.js";
import promotionRoutes from "./routes/promotions.js";
import analyticsRoutes from "./routes/analytics.js";

// Import middleware
import { errorHandler } from "./middleware/errorHandler.js";
import { rateLimiter } from "./middleware/rateLimiter.js";

// Import database connection
import { connectDB } from "./config/database.js";

// Import models to register schemas
import "./models/User.js";
import "./models/Category.js";
import "./models/Course.js";
import "./models/Job.js";
import "./models/Testimonial.js";
import "./models/MarketingContent.js";
import "./models/PricingPlan.js";
import "./models/MarketingCampaign.js";
import "./models/Promotion.js";
import "./models/Certification.js";
import "./models/Enrollment.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
app.use(rateLimiter);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "LMS Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/marketing", marketingRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/analytics", analyticsRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 LMS Backend API: http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
