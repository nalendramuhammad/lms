import express from "express";
import Course from "../models/Course.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      level,
      price,
      status,
      featured,
      sort = "-createdAt",
      includeAllStatuses,
    } = req.query;

    // Build query
    const query = {};

    // Status handling: by default only published, unless includeAllStatuses is true
    if (includeAllStatuses === "true") {
      if (status) query.status = status; // allow explicit status even when including all
    } else {
      query.status = status || "published";
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (category) query.category = category;
    if (level) query.level = level;
    if (featured) query.isFeatured = featured === "true";

    if (price) {
      if (price === "free") {
        query.isFree = true;
      } else if (price === "paid") {
        query.isFree = false;
      }
    }

    // Pagination parsing (support limitless with limit=all or 0)
    const pageNum = parseInt(page) || 1;
    let limitNum;
    if (String(limit).toLowerCase() === "all") {
      limitNum = 0; // no limit
    } else {
      const parsedLimit = parseInt(limit);
      limitNum = Number.isNaN(parsedLimit) ? 10 : parsedLimit;
    }

    const skipNum = limitNum === 0 ? 0 : (pageNum - 1) * limitNum;

    // Execute query
    let queryBuilder = Course.find(query)
      .populate("instructor", "name avatar")
      .populate("category", "name")
      .sort(sort)
      .skip(skipNum);

    if (limitNum !== 0) {
      queryBuilder = queryBuilder.limit(limitNum);
    }

    const courses = await queryBuilder.exec();

    // Get total count
    const total = await Course.countDocuments(query);

    const pagination =
      limitNum === 0
        ? { page: 1, limit: total, pages: 1 }
        : {
            page: pageNum,
            limit: limitNum,
            pages: Math.ceil(total / limitNum),
          };

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      pagination,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name avatar bio")
      .populate("category", "name")
      .populate("lessons", "title duration type");

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (instructor, admin)
router.post(
  "/",
  protect,
  authorize("instructor", "admin"),
  async (req, res) => {
    try {
      // Add instructor to request body
      req.body.instructor = req.user.id;

      const course = await Course.create(req.body);

      res.status(201).json({
        success: true,
        data: course,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (instructor, admin)
router.put(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  async (req, res) => {
    try {
      let course = await Course.findById(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Course not found",
        });
      }

      // Make sure user is course instructor or admin
      if (
        course.instructor.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(401).json({
          success: false,
          error: "Not authorized to update this course",
        });
      }

      course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (instructor, admin)
router.delete(
  "/:id",
  protect,
  authorize("instructor", "admin"),
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Course not found",
        });
      }

      // Make sure user is course instructor or admin
      if (
        course.instructor.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(401).json({
          success: false,
          error: "Not authorized to delete this course",
        });
      }

      await course.deleteOne();

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

export default router;
