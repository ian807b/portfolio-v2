import rateLimit from "express-rate-limit";

interface RateLimiterOptions {
  windowMs: number;
  max: number;
}

export function createRateLimiter(options: RateLimiterOptions) {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    standardHeaders: true,
    legacyHeaders: false,
    // Trust API Gateway / Lambda proxy headers
    validate: { trustProxy: false },
    message: {
      success: false,
      error: "Too many requests, please try again later.",
    },
  });
}
