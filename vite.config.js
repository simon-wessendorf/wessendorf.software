// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        germanContact: resolve(__dirname, '/de/kontakt/index.html'),
        germanPrivacy: resolve(__dirname, '/de/datenschutzerklärung/index.html'),
      },
    },
  },
})
