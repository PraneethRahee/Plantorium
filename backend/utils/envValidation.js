/**
 * Validates required environment variables at startup.
 * Exits with clear message in production if critical vars are missing.
 */

const REQUIRED = ["MONGODB_URI"];
const CLOUDINARY_VARS = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];

function hasValue(v) {
  return v != null && String(v).trim() !== "";
}

export function validateEnv() {
  const isProd = process.env.NODE_ENV === "production";

  for (const key of REQUIRED) {
    const val = process.env[key];
    if (!hasValue(val)) {
      if (isProd) {
        console.error(`FATAL: ${key} is required in production. Set it in .env`);
        process.exit(1);
      }
      console.warn(`Warning: ${key} not set. Using default.`);
    }
  }

  const cloudinarySet = CLOUDINARY_VARS.filter((k) => hasValue(process.env[k]));
  if (cloudinarySet.length > 0 && cloudinarySet.length < 3) {
    console.error(
      "FATAL: Cloudinary requires all three vars. Missing:",
      CLOUDINARY_VARS.filter((k) => !hasValue(process.env[k])).join(", ")
    );
    process.exit(1);
  }
  if (cloudinarySet.length === 0) {
    console.warn("Warning: Cloudinary not configured. Image/video uploads will fail.");
  }
}
