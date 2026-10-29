# Rehan's Store — starter frontend

A responsive React/Vite storefront concept with product search, category filters, animated product cards, wishlist toggles, and a local cart UI.

## Current status
This is **Phase 1: frontend prototype**. Products are sample data in `src/App.jsx`. The cart is local to the current browser session. Firebase is only scaffolded; customer authentication, real product database, admin-only product management, secure COD order creation, order tracking, and image upload are **not yet connected**. Do not accept real customer orders with this prototype.

## Run locally
Requires Node.js and npm:
```bash
npm install
npm run dev
```

## Firebase free-plan setup (later phase)
1. Create a project in Firebase Console and stay on the Spark plan.
2. Add a Web App and copy the web config into `src/firebase.js`.
3. Enable only the authentication methods you need, and create a Firestore database.
4. Before storing real customer information or orders, deploy strict Firestore Security Rules. Do not make the database publicly readable/writable.
5. Firebase Storage may require Blaze for default buckets under current policy; this project does not configure Firebase Storage. We will choose and verify an image-hosting option before product uploads.

## GitHub Pages deployment
1. Create a GitHub repository, for example `rehans-store`.
2. If the repo URL is `https://USERNAME.github.io/rehans-store/`, edit `vite.config.js` and set `base: '/rehans-store/'` (the exact repo name, including slashes).
3. Push the project to GitHub.
4. In repository Settings → Pages, choose GitHub Actions or configure a Vite build workflow. Easiest: use a workflow that runs `npm ci`, `npm run build`, and uploads the `dist` folder using the official Pages actions.
5. A custom domain is optional. GitHub Pages hosts the frontend only; it is not the backend.

## Important
- Never commit passwords, private keys, service-account JSON, or customer data.
- The Firebase web config is designed to be present in client-side apps, but Firestore Security Rules and Authentication must protect data.
- Product image URLs are sample Unsplash URLs and should be replaced with assets you have permission to use.
