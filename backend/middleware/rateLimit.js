import rateLimit from "express-rate-limit";

/**
 * Rate limit for admin write operations (PUT, upload).
 * 30 requests per 15 minutes per IP.
 */
export const adminRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
