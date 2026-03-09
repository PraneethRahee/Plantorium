# Plantorium Backend

Node.js + Express + Mongoose + MongoDB backend for managing Plantorium site content. Upload images and edit content via the admin panel instead of hardcoding in the frontend.

## Setup

1. **Install dependencies** (from `backend` folder):
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `MONGODB_URI` (default: `mongodb://localhost:27017/plantorium`)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – from [Cloudinary Console](https://console.cloudinary.com/) → Settings → API Keys. Required for image/video uploads.
   - `ADMIN_API_KEY` (optional) – When set, PUT/upload require the `X-Admin-Key` header. Admin panel will prompt for the key when saving/uploading.

3. **Start MongoDB** (if running locally).

4. **Seed default content** (optional):
   ```bash
   npm run seed
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:5000`.

## Admin Panel

Open **http://localhost:5000/admin** to manage:

- **Hero**: Slider images, stats
- **Features**: Partner logos
- **Project**: Project features (title, description, image)
- **Latest Projects**: Project snapshot images
- **Site Review**: Orbit images
- **Contact**: Heading, description, video
- **Footer**: Social media links, tagline

## API

- `GET /api/content` – Fetch all site content (used by frontend)
- `PUT /api/content` – Update content (admin)
- `POST /api/content/upload` – Upload file (admin)

## Development

- Frontend (Vite) proxies `/api` and `/uploads` to this backend when both run locally.
- Set `VITE_API_URL` in the frontend `.env` for production (e.g. `https://api.yoursite.com`).
- For the contact form: copy `.env.example` to `.env` in the project root and set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` from [EmailJS](https://dashboard.emailjs.com).
