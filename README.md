# Plantorium

A React landing page for a planting/landscaping brand, featuring animations, contact forms, and smooth scrolling. Full-stack app with Node/Express backend and MongoDB.

## Project Structure

```
plantorium/
├── frontend/   # React + Vite app
├── backend/    # Node/Express API + CMS
└── package.json
```

## How to Run

```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Start frontend dev server (from root)
npm run dev
# Or: npm run dev --prefix frontend

# Start backend dev server (separate terminal)
npm run dev:backend
```

The frontend runs at `http://localhost:5173`. The backend API runs at `http://localhost:5000` and is proxied in development.

```bash
# Build frontend for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Tech Stack

| Category      | Technology |
|---------------|------------|
| **Framework** | React 19 |
| **Build**     | Vite 7 |
| **Styling**   | Tailwind CSS, tailwindcss-animate, PostCSS, Autoprefixer |
| **Animation** | GSAP, Lenis (smooth scroll) |
| **UI**        | Radix UI (Avatar, Separator, Slot), Lucide React (icons), class-variance-authority, clsx, tailwind-merge |
| **Email**     | EmailJS (contact form) |
| **Routing**   | React Router DOM |
| **Linting**   | ESLint |
