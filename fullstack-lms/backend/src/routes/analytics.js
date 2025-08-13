import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private (admin only)
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  async (req, res, next) => {
    try {
      // Get current date and 6 months ago for trends
      const now = new Date();
      const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);

      // Calculate key metrics
      const [
        totalUsers,
        totalCourses,
        totalEnrollments,
        totalRevenue,
        monthlyRevenue,
        revenueByCategory,
        topCourses,
        userActivity,
        deviceUsage,
        geographicDistribution,
      ] = await Promise.all([
        // Total Users
        User.countDocuments({ role: "student" }),

        // Total Courses
        Course.countDocuments({ status: "published" }),

        // Active Enrollments
        Enrollment.countDocuments({ status: "active" }),

        // Total Revenue (simplified calculation)
        Course.aggregate([
          { $match: { status: "published", isFree: false } },
          { $group: { _id: null, total: { $sum: "$price" } } },
        ]),

        // Monthly Revenue (last 6 months)
        Course.aggregate([
          { $match: { status: "published", isFree: false } },
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
              },
              revenue: { $sum: "$price" },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
          { $limit: 6 },
        ]),

        // Revenue by Category
        Course.aggregate([
          { $match: { status: "published", isFree: false } },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "categoryInfo",
            },
          },
          { $unwind: "$categoryInfo" },
          {
            $group: { _id: "$categoryInfo.name", revenue: { $sum: "$price" } },
          },
          { $sort: { revenue: -1 } },
          { $limit: 5 },
        ]),

        // Top Performing Courses
        Course.aggregate([
          { $match: { status: "published" } },
          {
            $lookup: {
              from: "enrollments",
              localField: "_id",
              foreignField: "course",
              as: "enrollments",
            },
          },
          {
            $addFields: {
              enrollmentCount: { $size: "$enrollments" },
              revenue: { $multiply: ["$price", { $size: "$enrollments" }] },
            },
          },
          { $sort: { enrollmentCount: -1 } },
          { $limit: 5 },
          {
            $project: {
              title: 1,
              enrollmentCount: 1,
              revenue: 1,
              rating: 1,
              price: 1,
            },
          },
        ]),

        // User Activity (24h - simplified)
        User.aggregate([
          { $match: { role: "student" } },
          {
            $group: {
              _id: { $hour: "$lastLogin" },
              count: { $sum: 1 },
            },
          },
          { $sort: { _id: 1 } },
        ]),

        // Device Usage (mock data)
        Promise.resolve([
          { device: "Desktop", percentage: 42.4 },
          { device: "Mobile", percentage: 36.8 },
          { device: "Tablet", percentage: 20.8 },
        ]),

        // Geographic Distribution (mock data)
        Promise.resolve([
          { country: "Indonesia", users: 8920, percentage: 57.8 },
          { country: "Malaysia", users: 2340, percentage: 15.2 },
          { country: "Singapore", users: 1890, percentage: 12.3 },
          { country: "Thailand", users: 1230, percentage: 8.0 },
          { country: "Philippines", users: 1040, percentage: 6.7 },
        ]),
      ]);

      // Calculate growth percentages (mock data for now)
      const userGrowth = 12.5;
      const courseGrowth = 8.3;
      const revenueGrowth = 8.3;
      const enrollmentGrowth = 15.2;

      // Format monthly revenue data
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const formattedMonthlyRevenue = months.map((month, index) => ({
        month,
        revenue: monthlyRevenue[index]?.revenue || 0,
      }));

      // Calculate total revenue
      const totalRevenueAmount = totalRevenue[0]?.total || 0;

      res.status(200).json({
        success: true,
        data: {
          // Key Metrics
          keyMetrics: {
            totalUsers: {
              value: totalUsers,
              growth: userGrowth,
              icon: "👥",
            },
            totalCourses: {
              value: totalCourses,
              growth: courseGrowth,
              icon: "📚",
            },
            totalRevenue: {
              value: totalRevenueAmount,
              growth: revenueGrowth,
              icon: "💰",
            },
            activeEnrollments: {
              value: totalEnrollments,
              growth: enrollmentGrowth,
              icon: "✅",
            },
          },

          // Charts Data
          revenueTrend: formattedMonthlyRevenue,
          revenueByCategory,
          topPerformingCourses: topCourses,
          userActivity,
          deviceUsage,
          geographicDistribution,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Get analytics by date range
// @route   GET /api/analytics/range
// @access  Private (admin only)
router.get("/range", protect, authorize("admin"), async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    // Implementation for date range analytics
    res.status(200).json({
      success: true,
      message: "Date range analytics - to be implemented",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
