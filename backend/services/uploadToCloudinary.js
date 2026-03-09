import cloudinary from "../config/cloudinary.js";

/**
 * Upload a file buffer to Cloudinary.
 * Accepts both images and videos - resource_type 'auto' lets Cloudinary detect.
 * @param {Buffer} buffer - File buffer from multer
 * @param {string} mimetype - e.g. 'image/jpeg', 'video/mp4'
 * @param {string} folder - Cloudinary folder (e.g. 'plantorium/hero', 'plantorium/contact')
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadToCloudinary(buffer, mimetype, folder = "plantorium") {
  const isVideo = mimetype.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";

  const dataUri = `data:${mimetype};base64,${buffer.toString("base64")}`;

  const folderPath = folder.startsWith("plantorium") ? folder : `plantorium/${folder}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    resource_type: resourceType,
    folder: folderPath,
    use_filename: true,
    unique_filename: true,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Upload an image or video from a remote URL to Cloudinary.
 * Use when admin pastes a URL - ensures the asset is stored in Cloudinary and returns the Cloudinary link.
 * @param {string} imageUrl - Full URL to the image/video (e.g. https://images.unsplash.com/...)
 * @param {string} folder - Cloudinary folder (e.g. 'plantorium/heroSlider')
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadFromUrl(imageUrl, folder = "plantorium") {
  if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.startsWith("http")) {
    throw new Error("Invalid image URL");
  }

  const urlLower = imageUrl.toLowerCase();
  const isVideo =
    /\.(mp4|webm|mov|ogg|m4v)$/.test(urlLower) || urlLower.includes("/video/");
  const resourceType = isVideo ? "video" : "image";

  const folderPath = folder.startsWith("plantorium") ? folder : `plantorium/${folder}`;
  const result = await cloudinary.uploader.upload(imageUrl, {
    resource_type: resourceType,
    folder: folderPath,
    use_filename: true,
    unique_filename: true,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}
