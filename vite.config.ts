import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Forwards /api/** to the Spring Boot backend during local dev,
      // so the frontend can call same-origin paths like /api/finance/overview
      // without CORS issues. Change the target to match your backend.
      '/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:8082',
        changeOrigin: true,
      },
    },
  },
})
