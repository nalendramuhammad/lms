import express from "express";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all lessons
// @route   GET /api/lessons
// @access  Public
router.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lessons route - to be implemented",
  });
});

export default router;
