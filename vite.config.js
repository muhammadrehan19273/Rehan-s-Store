import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Update this to '/YOUR-REPOSITORY-NAME/' before deploying to GitHub Pages.
  base: '/',
})