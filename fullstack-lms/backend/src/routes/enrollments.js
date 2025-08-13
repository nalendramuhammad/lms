import express from "express";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get user enrollments
// @route   GET /api/enrollments
// @access  Private
router.get("/", protect, async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Enrollments route - to be implemented",
  });
});

export default router;
