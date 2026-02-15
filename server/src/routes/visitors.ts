import { Router } from "express";
import { z } from "zod";
import { VisitorService } from "../services/visitorService";

const router = Router();
const visitorService = new VisitorService();

// Schema for tracking request
const trackSchema = z.object({
  path: z.string().max(500),
});

// Schema for duration beacon
const durationSchema = z.object({
  path: z.string().max(500),
  duration: z.number().int().min(0).max(86400), // max 24 hours
});

/**
 * POST /api/visitors/track
 * Record a page visit
 */
router.post("/track", async (req, res, next) => {
  try {
    const body = trackSchema.parse(req.body);
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      "unknown";
    const userAgent = req.get("user-agent") || undefined;
    const referrer = req.get("referer") || undefined;

    const stats = await visitorService.trackVisit({
      ip,
      userAgent,
      referrer,
      path: body.path,
    });

    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/visitors/count
 * Get total visitor count (public)
 */
router.get("/count", async (_req, res, next) => {
  try {
    const stats = await visitorService.getVisitorStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/visitors/duration
 * Record session duration via sendBeacon
 */
router.post("/duration", async (req, res, next) => {
  try {
    // sendBeacon sends text/plain, so we may need to parse it
    let body = req.body;
    if (typeof body === "string") {
      body = JSON.parse(body);
    }
    const data = durationSchema.parse(body);

    await visitorService.updateDuration(data.path, data.duration);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
