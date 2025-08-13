import express from "express";
import MarketingCampaign from "../models/MarketingCampaign.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// GET /api/campaigns
router.get("/", async (req, res, next) => {
  try {
    const { q, status, page = 1, limit = 20, sort = "-createdAt" } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (q) filter.$text = { $search: q };
    const skip = (Number(page) - 1) * Number(limit);
    const items = await MarketingCampaign.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    const total = await MarketingCampaign.countDocuments(filter);
    res.json({ success: true, data: items, total, page: Number(page) });
  } catch (err) {
    next(err);
  }
});

// POST /api/campaigns
router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const body = { ...req.body, createdBy: req.user?._id };
    const item = await MarketingCampaign.create(body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// PUT /api/campaigns/:id
router.put("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const item = await MarketingCampaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/campaigns/:id
router.delete("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    const item = await MarketingCampaign.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
