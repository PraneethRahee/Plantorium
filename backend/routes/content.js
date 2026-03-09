import express from "express";
import SiteContent from "../models/SiteContent.js";
import { defaultContent } from "../data/defaultContent.js";
import { upload } from "../middleware/upload.js";
import { validateContentUpdate } from "../middleware/validateContent.js";
import { requireAdminKey } from "../middleware/adminAuth.js";
import { adminRateLimit } from "../middleware/rateLimit.js";
import { uploadToCloudinary, uploadFromUrl } from "../services/uploadToCloudinary.js";
import {
  getCached,
  getCachedEtag,
  setCache,
  invalidateCache,
} from "../utils/contentCache.js";

const router = express.Router();

// Get all content (public API for frontend)
// Uses in-memory cache + ETag for 304 when unchanged
router.get("/", async (req, res) => {
  try {
    const ifNoneMatch = req.headers["if-none-match"];
    const cached = getCached();
    const cachedTag = getCachedEtag();

    if (cached && ifNoneMatch === cachedTag) {
      return res.status(304).end();
    }

    let content = cached;
    if (!content) {
      content = await SiteContent.findOne();
      if (!content) {
        content = await SiteContent.create(defaultContent);
      }
      setCache(content.toObject ? content.toObject() : content);
    }

    const data = content.toObject ? content.toObject() : content;
    const etag = getCachedEtag();
    res.setHeader("Cache-Control", "public, max-age=60");
    res.setHeader("ETag", etag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update content (admin) - invalidates cache
router.put("/", adminRateLimit, requireAdminKey, validateContentUpdate, async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) content = await SiteContent.create(defaultContent);
    Object.assign(content, req.body);
    await content.save();
    invalidateCache();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload single file to Cloudinary
router.post("/upload", adminRateLimit, requireAdminKey, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const section = req.body.section || req.body.field || "general";
    const { url } = await uploadToCloudinary(req.file.buffer, req.file.mimetype, section);
    res.json({ url, filename: req.file.originalname });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

// Upload image/video from URL to Cloudinary (for pasted URLs - ensures all assets are in Cloudinary)
router.post("/upload-from-url", adminRateLimit, requireAdminKey, async (req, res) => {
  try {
    const { url, section } = req.body;
    if (!url || typeof url !== "string") return res.status(400).json({ error: "URL required" });
    const folder = section || req.body.field || "imported";
    const { url: cloudinaryUrl } = await uploadFromUrl(url.trim(), folder);
    res.json({ url: cloudinaryUrl });
  } catch (err) {
    console.error("Upload from URL error:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

// Upload multiple files to Cloudinary
router.post("/upload-many", adminRateLimit, requireAdminKey, upload.array("files", 20), async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ error: "No files uploaded" });
    const section = req.body.section || req.body.field || "general";
    const results = await Promise.all(
      req.files.map((f) => uploadToCloudinary(f.buffer, f.mimetype, section))
    );
    const urls = results.map((r) => r.url);
    res.json({ urls });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

export default router;
