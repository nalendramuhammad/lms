import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import Certification from "../models/Certification.js";

const router = express.Router();

// @desc    Get certifications with search and filters
// @route   GET /api/certificates
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const {
      q,
      provider,
      level,
      status,
      featured,
      page = 1,
      limit = 20,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    if (provider) query.provider = new RegExp(provider, "i");
    if (level) query.level = level;
    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === "true";

    let mongoQuery = Certification.find(query);

    if (q) {
      mongoQuery = Certification.find({
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
      Certification.countDocuments(query),
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

// @desc    Create a certification
// @route   POST /api/certificates
// @access  Private (admin or instructor)
router.post(
  "/",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const certification = await Certification.create({
        ...req.body,
        createdBy: req.user?.id,
      });

      res.status(201).json({ success: true, data: certification });
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Update a certification
// @route   PUT /api/certificates/:id
// @access  Private (admin or owner)
router.put(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const certification = await Certification.findById(req.params.id);
      if (!certification) {
        return res
          .status(404)
          .json({ success: false, message: "Certification not found" });
      }

      // If not admin, ensure user is owner
      if (
        req.user.role !== "admin" &&
        String(certification.createdBy) !== String(req.user.id)
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }

      const updated = await Certification.findByIdAndUpdate(
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

// @desc    Delete a certification
// @route   DELETE /api/certificates/:id
// @access  Private (admin or owner)
router.delete(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const certification = await Certification.findById(req.params.id);
      if (!certification) {
        return res
          .status(404)
          .json({ success: false, message: "Certification not found" });
      }
      if (
        req.user.role !== "admin" &&
        String(certification.createdBy) !== String(req.user.id)
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }
      await certification.deleteOne();
      res.status(200).json({ success: true, data: {} });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
