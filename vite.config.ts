import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/PySan/', // 👈 This is the key change for GitHub Pages
  plugins: [react()],
})