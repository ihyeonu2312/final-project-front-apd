import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 👉 백엔드 주소
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // 선택사항
      },
    },
  },
})
