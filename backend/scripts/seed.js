import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import SiteContent from "../models/SiteContent.js";
import { defaultContent } from "../data/defaultContent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "..", ".env") });

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/plantorium");
    const existing = await SiteContent.findOne();
    if (existing) {
      console.log("Content already exists. Use PUT /api/content to update.");
      process.exit(0);
      return;
    }
    await SiteContent.create(defaultContent);
    console.log("Default content seeded successfully.");
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
