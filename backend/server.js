import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { validateEnv } from "./utils/envValidation.js";
import contentRoutes from "./routes/content.js";

validateEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// Connect to MongoDB
try {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/plantorium");
  console.log("MongoDB connected");
} catch (err) {
  console.error("MongoDB connection error:", err.message);
}

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check for load balancers / monitoring
app.get("/health", (req, res) => {
  const dbOk = mongoose.connection.readyState === 1;
  res.status(dbOk ? 200 : 503).json({
    status: dbOk ? "ok" : "degraded",
    mongodb: dbOk ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/content", contentRoutes);

// Serve admin UI
app.use("/admin", express.static(path.join(__dirname, "public", "admin")));
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
