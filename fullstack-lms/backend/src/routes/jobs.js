import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import Job from "../models/Job.js";

const router = express.Router();

// @desc    Get jobs with basic search and filters
// @route   GET /api/jobs
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const {
      q,
      location,
      type,
      minExp,
      maxExp,
      tags,
      status = "active",
      page = 1,
      limit = 20,
      sort = "-postedDate",
    } = req.query;

    const query = { status };

    if (location) query.location = new RegExp(location, "i");
    if (type) query.type = type;
    if (minExp) query.experienceMinYears = { $gte: Number(minExp) };
    if (maxExp)
      query.experienceMaxYears = Object.assign(query.experienceMaxYears || {}, {
        $lte: Number(maxExp),
      });

    if (tags) {
      const tagArr = Array.isArray(tags)
        ? tags
        : String(tags)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
      if (tagArr.length) query.tags = { $all: tagArr };
    }

    let mongoQuery = Job.find(query);

    if (q) {
      mongoQuery = Job.find({
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
      Job.countDocuments(query),
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

// @desc    Create a job posting
// @route   POST /api/jobs
// @access  Private (admin or instructor)
router.post(
  "/",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const payload = req.body;

      const job = await Job.create({
        title: payload.title,
        company: payload.company,
        companyLogo: payload.companyLogo,
        description: payload.description,
        location: payload.location,
        salaryText: payload.salaryText,
        salaryMin: payload.salaryMin,
        salaryMax: payload.salaryMax,
        salaryCurrency: payload.salaryCurrency,
        type: payload.type,
        experienceText: payload.experienceText,
        experienceMinYears: payload.experienceMinYears,
        experienceMaxYears: payload.experienceMaxYears,
        tags: payload.tags,
        postedDate: payload.postedDate,
        remote: payload.remote,
        applyUrl: payload.applyUrl,
        status: payload.status,
        createdBy: req.user?.id,
      });

      res.status(201).json({ success: true, data: job });
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Update a job posting
// @route   PUT /api/jobs/:id
// @access  Private (admin or owner)
router.put(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job)
        return res
          .status(404)
          .json({ success: false, message: "Job not found" });

      // If not admin, ensure user is owner
      if (
        req.user.role !== "admin" &&
        String(job.createdBy) !== String(req.user.id)
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }

      const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  }
);

// @desc    Delete a job posting
// @route   DELETE /api/jobs/:id
// @access  Private (admin or owner)
router.delete(
  "/:id",
  protect,
  authorize("admin", "instructor"),
  async (req, res, next) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job)
        return res
          .status(404)
          .json({ success: false, message: "Job not found" });
      if (
        req.user.role !== "admin" &&
        String(job.createdBy) !== String(req.user.id)
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Not authorized" });
      }
      await job.deleteOne();
      res.status(200).json({ success: true, data: {} });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
