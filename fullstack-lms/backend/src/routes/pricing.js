import express from "express";
import PricingPlan from "../models/PricingPlan.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// GET /api/pricing
router.get("/", async (req, res, next) => {
  try {
    const {
      q,
      status,
      period,
      minPrice,
      maxPrice,
      featured,
      page = 1,
      limit = 20,
      sort = "-createdAt",
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (period) filter.period = period;
    if (featured !== undefined) filter.featured = String(featured) === "true";
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (q) filter.$text = { $search: q };

    const skip = (Number(page) - 1) * Number(limit);
    const items = await PricingPlan.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    const total = await PricingPlan.countDocuments(filter);

    res.json({ success: true, data: items, total, page: Number(page) });
  } catch (err) {
    next(err);
  }
});

// POST /api/pricing
router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const body = { ...req.body, createdBy: req.user?._id };
    const item = await PricingPlan.create(body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// PUT /api/pricing/:id
router.put("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const item = await PricingPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/pricing/:id
router.delete("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const item = await PricingPlan.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
