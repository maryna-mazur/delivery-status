import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  env: {
    VITE_API_URL: process.env.API_URL,
    VITE_SECRET_KEY: process.env.SECRET_KEY,
  },
} as import('vite').UserConfigExport);
