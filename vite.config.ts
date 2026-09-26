import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/katex/')) return 'vendor-katex'
          if (id.includes('/react/')
            || id.includes('/react-dom/')
            || id.includes('/react-router')
            || id.includes('/scheduler/')
            || id.includes('/react-is/')) return 'vendor-react'
          if (id.includes('/i18next') || id.includes('/react-i18next')) return 'vendor-i18n'
          if (id.includes('/lucide-react/') || id.includes('/canvas-confetti/')) return 'vendor-ui'
          return 'vendor'
        }
      }
    }
  }
})
