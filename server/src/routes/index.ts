import { Router } from "express";
import healthRouter from "./health";
import visitorsRouter from "./visitors";
import mcpRouter from "./mcp";

const router = Router();

router.use("/health", healthRouter);
router.use("/visitors", visitorsRouter);
router.use("/mcp", mcpRouter);

export default router;
