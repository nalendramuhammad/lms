import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import MarketingContent from "../models/MarketingContent.js";

const router = express.Router();

// @desc    Get marketing content with search and filters
// @route   GET /api/marketing
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const {
      q,
      type,
      campaign,
      status,
      page = 1,
      limit = 20,
      sort = "-date",
    } = req.query;

    const query = {};

    if (type) query.type = type;
    if (campaign) query.campaign = new RegExp(campaign, "i");
    if (status) query.status = status;

    let mongoQuery = MarketingContent.find(query);

    if (q) {
      mongoQuery = MarketingContent.find({
        ...query,
        $text: { $search: q },
      }).select({ score: { $meta: "textScore" } });
    }

    const currentPage = Math.max(1, parseInt(page, 10));
    const perPage = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (currentPage - 1) * perPage;

    const sortOption = q ? { score: { $meta: "textScore" } } : sort;

    const [items, total] = await Promise.all([
      mongoQuery.sort(sortOption).skip(skip).limit(perPage).lean(),
      MarketingContent.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: items.length,
      total,
      page: currentPage,
      limit: perPage,
      data: items,
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Create marketing content
// @route   POST /api/marketing
// @access  Private (admin or instructor)
router.post(
  "/",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const content = await MarketingContent.create({
        ...req.body,
        createdBy: req.user?.id,
      });

      res.status(201).json({ success: true, data: content });
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Update marketing content
// @route   PUT /api/marketing/:id
// @access  Private (admin or owner)
router.put(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const content = await MarketingContent.findById(req.params.id);
      if (!content) {
        return res
          .status(404)
          .json({ success: false, message: "Content not found" });
      }

      // If not admin, ensure user is owner
      if (
        req.user.role !== "admin" &&
        String(content.createdBy) !== String(req.user.id)
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }

      const updated = await MarketingContent.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Delete marketing content
// @route   DELETE /api/marketing/:id
// @access  Private (admin or owner)
router.delete(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const content = await MarketingContent.findById(req.params.id);
      if (!content) {
        return res
          .status(404)
          .json({ success: false, message: "Content not found" });
      }
      if (
        req.user.role !== "admin" &&
        String(content.createdBy) !== String(req.user.id)
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }
      await content.deleteOne();
      res.status(200).json({ success: true, data: {} });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
