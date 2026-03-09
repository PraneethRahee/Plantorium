import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, default: "#" },
  platform: { type: String, enum: ["instagram", "facebook", "linkedin", "x", "youtube", "other"], default: "other" },
});

const heroSchema = new mongoose.Schema({
  sliderImages: [{ type: String }],
  statsData: [
    {
      value: { type: String },
      label: { type: String },
    },
  ],
  navigationItems: [{ label: { type: String } }],
  mainHeading: { type: String, default: "Reliable Planting Execution" },
  logoUrl: { type: String },
  logoBackgroundUrl: { type: String },
  brandLogoUrl: { type: String },
  iconUrl: { type: String },
  marqueeLogoUrl: { type: String },
  testimonial: {
    quote: { type: String },
    customerImageUrl: { type: String },
    customerName: { type: String },
    customerTitle: { type: String },
  },
});

const featuresSchema = new mongoose.Schema({
  badgeText: { type: String, default: "Trusted Partners" },
  heading: { type: String, default: "Work with Havier to tackle your toughest." },
  partnerLogos: [
    {
      name: { type: String },
      src: { type: String },
    },
  ],
});

const projectSchema = new mongoose.Schema({
  badgeText: { type: String, default: "Who We Work With" },
  heading: { type: String, default: "Work with Havier to tackle your toughest." },
  subheading: { type: String },
  features: [
    {
      title: { type: String },
      description: { type: String },
      image: { type: String },
    },
  ],
});

const latestProjectSchema = new mongoose.Schema({
  heading: { type: String, default: "Latest Project Snapshot" },
  subheading: { type: String, default: "Share basic details we'll assess feasibility and next step" },
  projectImages: [
    {
      src: { type: String },
      alt: { type: String },
    },
  ],
});

const siteReviewSchema = new mongoose.Schema({
  heading: { type: String, default: "Let's review your site requirement" },
  subheading: { type: String, default: "Share basic details we'll assess feasibility and next step" },
  orbitImages: [{ type: String }],
});

const contactSchema = new mongoose.Schema({
  heading: { type: String, default: "Speak With Our Team" },
  description: { type: String },
  formFields: [
    {
      placeholder: { type: String },
      type: { type: String, default: "text" },
      name: { type: String },
    },
  ],
  videoUrl: { type: String, default: "/garden-video.mp4" },
});

const footerSchema = new mongoose.Schema({
  logoUrl: { type: String },
  logoBackgroundUrl: { type: String },
  brandName: { type: String, default: "Plantorium" },
  tagline: { type: String, default: "Working together to protect our planet and build a sustainable future." },
  footerAccentImage: { type: String },
  socialLinks: [socialLinkSchema],
});

const siteContentSchema = new mongoose.Schema(
  {
    hero: { type: heroSchema, default: () => ({}) },
    features: { type: featuresSchema, default: () => ({}) },
    project: { type: projectSchema, default: () => ({}) },
    latest: { type: latestProjectSchema, default: () => ({}) },
    siteReview: { type: siteReviewSchema, default: () => ({}) },
    contact: { type: contactSchema, default: () => ({}) },
    footer: { type: footerSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model("SiteContent", siteContentSchema);
