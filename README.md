# Rehan's Store — Hybrid Premium Frontend v1.1

A frontend redesign using a hybrid direction: luxury shopping layout + dark cinematic hero + electric-lime accents and smooth motion.

## Run locally
1. Install Node.js.
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`

## Build
Run `npm run build`. The production files are created in `dist/`.

## GitHub Pages
The Vite base is set to `/Rehan-s-Store/`. If your repository has a different name, update `base` in `vite.config.js`.
Upload the source files to GitHub and use a GitHub Actions workflow that runs `npm install`, `npm run build`, then deploys the `dist` folder.

## Important
- This is a frontend prototype. Product data is demo data in `src/App.jsx`.
- Cart and wishlist are browser-memory only and reset on refresh.
- Checkout is a placeholder; no real orders or payments are processed.
- Firebase is not connected. The Admin Panel and secure product/order database must be built after the frontend is approved.
- Product photography is loaded from Unsplash URLs, so internet access is needed to see those images.
