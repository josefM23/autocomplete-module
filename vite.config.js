import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000,
    open: false
  },
  define: {
    // Gör så att process.env hanteras korrekt av Vite under byggprocessen
    'process.env': process.env
  }
})
