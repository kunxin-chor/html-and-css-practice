import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@data': path.resolve(__dirname, '../data'),
    },
  },
  server: {
    fs: {
      // Allow importing questions.json from the repo-root /data folder.
      allow: [path.resolve(__dirname, '..')],
    },
  },
})
