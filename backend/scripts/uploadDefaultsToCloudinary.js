/**
 * Upload all default images from defaultContent.js to Cloudinary
 * and update the database + defaultContent.js with Cloudinary URLs.
 * Run: node scripts/uploadDefaultsToCloudinary.js
 * Requires: CLOUDINARY_* env vars and MONGODB_URI
 */
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env BEFORE importing cloudinary (it reads env at import time)
dotenv.config({ path: join(__dirname, "..", ".env") });

// Dynamic imports so dotenv runs before cloudinary config
const mongoose = (await import("mongoose")).default;
const { default: fs } = await import("fs");
const { default: SiteContent } = await import("../models/SiteContent.js");
const { defaultContent } = await import("../data/defaultContent.js");
const { uploadFromUrl } = await import("../services/uploadToCloudinary.js");

async function uploadUrl(url, folder, label) {
  if (!url || !url.startsWith("http")) return url;
  if (url.includes("res.cloudinary.com")) return url; // already on Cloudinary
  console.log(`  Uploading: ${label}...`);
  try {
    const { url: cloudinaryUrl } = await uploadFromUrl(url, folder);
    console.log(`    → ${cloudinaryUrl}`);
    return cloudinaryUrl;
  } catch (err) {
    console.warn(`    ⚠ Failed (${err.message || err}), keeping original URL`);
    return url;
  }
}

async function run() {
  try {
    const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY;
    if (!hasCloudinary) {
      console.error("Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.");
      process.exit(1);
    }

    console.log("Uploading default images to Cloudinary...\n");

    // Hero slider images
    console.log("Hero slider images:");
    const heroSlides = await Promise.all(
      defaultContent.hero.sliderImages.map((url, i) => uploadUrl(url, "heroSlider", `slide-${i + 1}`))
    );

    // Hero logos & testimonial
    console.log("\nHero logos & testimonial:");
    const heroLogo = await uploadUrl(defaultContent.hero.logoUrl, "heroLogo", "logo");
    const heroLogoBg = await uploadUrl(defaultContent.hero.logoBackgroundUrl, "heroLogoBg", "logoBg");
    const heroBrandLogo = await uploadUrl(defaultContent.hero.brandLogoUrl, "heroBrandLogo", "brandLogo");
    const heroIcon = await uploadUrl(defaultContent.hero.iconUrl, "heroIcon", "icon");
    const heroMarquee = await uploadUrl(defaultContent.hero.marqueeLogoUrl, "heroMarquee", "marqueeLogo");
    const customerImage = await uploadUrl(
      defaultContent.hero.testimonial?.customerImageUrl,
      "testimonial",
      "customerImage"
    );

    // Partner logos
    console.log("\nPartner logos:");
    const partnerLogos = await Promise.all(
      defaultContent.features.partnerLogos.map(async (p, i) => ({
        name: p.name,
        src: await uploadUrl(p.src, "partnerLogo", p.name),
      }))
    );

    // Project features
    console.log("\nProject features:");
    const projectFeatures = await Promise.all(
      defaultContent.project.features.map(async (f, i) => ({
        title: f.title,
        description: f.description,
        image: await uploadUrl(f.image, "projectFeature", f.title),
      }))
    );

    // Latest project images
    console.log("\nLatest project images:");
    const projectImages = await Promise.all(
      defaultContent.latest.projectImages.map(async (img, i) => ({
        src: await uploadUrl(img.src, "latestProject", img.alt),
        alt: img.alt,
      }))
    );

    // Orbit images
    console.log("\nOrbit images:");
    const orbitImages = await Promise.all(
      defaultContent.siteReview.orbitImages.map((url, i) => uploadUrl(url, "orbitImage", `orbit-${i + 1}`))
    );

    // Footer
    console.log("\nFooter images:");
    const footerLogo = await uploadUrl(defaultContent.footer.logoUrl, "footerLogo", "footerLogo");
    const footerLogoBg = await uploadUrl(defaultContent.footer.logoBackgroundUrl, "footerLogoBg", "footerLogoBg");
    const footerAccent = await uploadUrl(defaultContent.footer.footerAccentImage, "footerAccent", "footerAccent");

    const contentWithCloudinary = {
      hero: {
        ...defaultContent.hero,
        sliderImages: heroSlides,
        logoUrl: heroLogo,
        logoBackgroundUrl: heroLogoBg,
        brandLogoUrl: heroBrandLogo,
        iconUrl: heroIcon,
        marqueeLogoUrl: heroMarquee,
        testimonial: {
          ...defaultContent.hero.testimonial,
          customerImageUrl: customerImage,
        },
      },
      features: { ...defaultContent.features, partnerLogos },
      project: { ...defaultContent.project, features: projectFeatures },
      latest: { ...defaultContent.latest, projectImages },
      siteReview: { ...defaultContent.siteReview, orbitImages },
      contact: defaultContent.contact,
      footer: {
        ...defaultContent.footer,
        logoUrl: footerLogo,
        logoBackgroundUrl: footerLogoBg,
        footerAccentImage: footerAccent,
      },
    };

    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/plantorium");

    let doc = await SiteContent.findOne();
    if (!doc) {
      doc = await SiteContent.create(contentWithCloudinary);
      console.log("\n✓ Created new content with Cloudinary URLs");
    } else {
      Object.assign(doc, contentWithCloudinary);
      await doc.save();
      console.log("\n✓ Updated existing content with Cloudinary URLs");
    }

    // Update defaultContent.js so future seeds use Cloudinary URLs
    const defaultContentPath = join(__dirname, "..", "data", "defaultContent.js");
    const newContent = `/**
 * Default content with all image URLs stored in Cloudinary.
 * Generated by scripts/uploadDefaultsToCloudinary.js
 */
export const defaultContent = ${JSON.stringify(contentWithCloudinary, null, 2)};
`;
    fs.writeFileSync(defaultContentPath, newContent, "utf8");
    console.log("✓ Updated data/defaultContent.js with Cloudinary URLs");

    console.log("\nDone. All default images are now in Cloudinary, saved to DB, and defaultContent.js updated.");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run();
