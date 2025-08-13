import express from "express";
import Promotion from "../models/Promotion.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// GET /api/promotions
router.get("/", async (req, res, next) => {
  try {
    const {
      q,
      status,
      activeOnly,
      page = 1,
      limit = 20,
      sort = "-createdAt",
    } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (activeOnly === "true") {
      const now = new Date();
      filter.validFrom = { $lte: now };
      filter.validUntil = { $gte: now };
      filter.status = "active";
    }
    if (q) filter.$text = { $search: q };
    const skip = (Number(page) - 1) * Number(limit);
    const items = await Promotion.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    const total = await Promotion.countDocuments(filter);
    res.json({ success: true, data: items, total, page: Number(page) });
  } catch (err) {
    next(err);
  }
});

// POST /api/promotions
router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const body = { ...req.body, createdBy: req.user?._id };
    const item = await Promotion.create(body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// PUT /api/promotions/:code
router.put("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const item = await Promotion.findByIdAndUpdate(req.params.id, req.body, {
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

// DELETE /api/promotions/:id
router.delete("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const item = await Promotion.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
