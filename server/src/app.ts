import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { createRateLimiter } from "./middleware/rateLimiter";
import routes from "./routes";

const app = express();

// Trust proxy for API Gateway / Lambda
app.set("trust proxy", true);

// ─── Security ───
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(","),
    credentials: true,
  })
);

// ─── Body Parsing ───
app.use(express.json({ limit: "1mb" }));
app.use(express.text({ type: "text/plain" }));

// ─── Logging ───
app.use(requestLogger);

// ─── Rate Limiting ───
app.use(
  "/api",
  createRateLimiter({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
  })
);

// ─── Routes ───
app.use("/api", routes);

// ─── Error Handling ───
app.use(errorHandler);

export default app;
