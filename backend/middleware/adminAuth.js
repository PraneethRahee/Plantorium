/**
 * Protects admin routes (PUT, upload) when ADMIN_API_KEY is set.
 * Clients must send X-Admin-Key header matching the env value.
 */
const ADMIN_KEY = process.env.ADMIN_API_KEY?.trim();

export function requireAdminKey(req, res, next) {
  if (!ADMIN_KEY) return next();

  const key = req.headers["x-admin-key"];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
