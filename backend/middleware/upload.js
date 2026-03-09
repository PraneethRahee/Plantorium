import multer from "multer";

const fileFilter = (req, file, cb) => {
  const allowed = /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov)$/i;
  if (allowed.test(file.originalname) || file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed"), false);
  }
};

// Memory storage for Cloudinary upload (buffer in req.file.buffer)
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB for videos
});
