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
    'process.env.VITE_LASTFM_API_KEY': JSON.stringify(process.env.VITE_LASTFM_API_KEY)
  }
})
