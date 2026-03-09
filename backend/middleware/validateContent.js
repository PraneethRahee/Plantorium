/**
 * Validates PUT /api/content request body.
 * Only allows known section keys; each value must be a plain object.
 */
const VALID_SECTIONS = ["hero", "features", "project", "latest", "siteReview", "contact", "footer"];

export function validateContentUpdate(req, res, next) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Request body must be a JSON object" });
  }

  const keys = Object.keys(req.body);
  for (const key of keys) {
    if (!VALID_SECTIONS.includes(key)) {
      return res.status(400).json({
        error: `Invalid section: "${key}". Allowed: ${VALID_SECTIONS.join(", ")}`,
      });
    }
    if (req.body[key] !== null && typeof req.body[key] !== "object") {
      return res.status(400).json({
        error: `Section "${key}" must be an object or null`,
      });
    }
  }

  next();
}
