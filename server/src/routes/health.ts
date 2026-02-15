import { Router } from "express";
import { prisma } from "../config/database";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      data: {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
      },
    });
  } catch {
    res.status(503).json({
      success: false,
      data: {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
      },
    });
  }
});

export default router;
