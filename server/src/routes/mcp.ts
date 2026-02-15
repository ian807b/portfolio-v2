import { Router } from "express";
import { z } from "zod";
import { createRateLimiter } from "../middleware/rateLimiter";
import { env } from "../config/env";
import { McpService } from "../services/mcpService";

const router = Router();
const mcpService = new McpService();

// Stricter rate limit for MCP chat to prevent abuse
router.use(
  createRateLimiter({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.MCP_RATE_LIMIT_MAX,
  })
);

const chatSchema = z.object({
  conversationId: z.string().uuid().optional(),
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(300, "Message too long (max 300 characters)"), // Reduced to control input costs
});

/**
 * POST /api/mcp/chat
 * Send a message to the MCP-powered chat and get a response.
 */
router.post("/chat", async (req, res, next) => {
  try {
    const body = chatSchema.parse(req.body);

    const response = await mcpService.handleChat({
      conversationId: body.conversationId,
      message: body.message,
    });

    res.json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/mcp/info
 * Get information about available MCP capabilities.
 */
router.get("/info", (_req, res) => {
  res.json({
    success: true,
    data: {
      name: "ian-portfolio-mcp",
      version: "1.0.0",
      description:
        "AI-powered Q&A about Ian Hwang. Ask about skills, projects, experience, and availability.",
      availableTopics: [
        "Technical skills and proficiency",
        "Project details and tech stacks",
        "Education and coursework",
        "Work experience",
        "Availability and contact",
        "Career goals and interests",
      ],
    },
  });
});

export default router;
