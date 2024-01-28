// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/sitemap/index.html'),

        germanContact: resolve(__dirname, '/de/kontakt/index.html'),
        germanNotice: resolve(__dirname, '/de/impressum/index.html'),
        germanPrivacy: resolve(__dirname, '/de/datenschutzerklärung/index.html'),
        germanNotFound: resolve(__dirname, '/de/404.html'),

        englishContact: resolve(__dirname, '/en/contact/index.html'),
        englishNotice: resolve(__dirname, '/en/site-notice/index.html'),
        englishPrivacy: resolve(__dirname, '/en/privacy-policy/index.html'),
        englishNotFound: resolve(__dirname, '/en/404.html'),
      },
    },
  },
})
