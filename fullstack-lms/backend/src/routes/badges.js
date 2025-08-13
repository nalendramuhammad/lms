import express from "express";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @desc    Get all badges
// @route   GET /api/badges
// @access  Public
router.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Badges route - to be implemented",
  });
});

export default router;
