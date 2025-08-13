import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

// @desc    Get testimonials with search and filters
// @route   GET /api/testimonials
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const {
      q,
      rating,
      course,
      status = "active",
      featured,
      page = 1,
      limit = 20,
      sort = "-date",
    } = req.query;

    const query = { status };

    if (rating) query.rating = Number(rating);
    if (course) query.course = new RegExp(course, "i");
    if (featured !== undefined) query.featured = featured === "true";

    let mongoQuery = Testimonial.find(query);

    if (q) {
      mongoQuery = Testimonial.find({
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
      Testimonial.countDocuments(query),
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

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private (admin or instructor)
router.post(
  "/",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const testimonial = await Testimonial.create({
        ...req.body,
        createdBy: req.user?.id,
      });

      res.status(201).json({ success: true, data: testimonial });
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (admin or owner)
router.put(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (!testimonial) {
        return res
          .status(404)
          .json({ success: false, message: "Testimonial not found" });
      }

      // If not admin, ensure user is owner
      if (
        req.user.role !== "admin" &&
        String(testimonial.createdBy) !== String(req.user.id)
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }

      const updated = await Testimonial.findByIdAndUpdate(
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

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (admin or owner)
router.delete(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const testimonial = await Testimonial.findById(req.params.id);
      if (!testimonial) {
        return res
          .status(404)
          .json({ success: false, message: "Testimonial not found" });
      }
      if (
        req.user.role !== "admin" &&
        String(testimonial.createdBy) !== String(req.user.id)
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }
      await testimonial.deleteOne();
      res.status(200).json({ success: true, data: {} });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
