import { config } from "dotenv";
import { z } from "zod";

// Load .env file in non-production environments
if (process.env.NODE_ENV !== "production") {
  config();
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("4000").transform(Number),
  DATABASE_URL: z.string(),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  IP_HASH_SALT: z.string().default("change-this-to-a-random-secret"),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default("900000")
    .transform(Number), // 15 minutes
  RATE_LIMIT_MAX: z.string().default("100").transform(Number),
  MCP_RATE_LIMIT_MAX: z.string().default("20").transform(Number),
  ANTHROPIC_API_KEY: z.string().optional(), // Optional: falls back to keyword matching if not provided
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(
      "Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

export const env = loadEnv();
