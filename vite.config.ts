import { fileURLToPath, URL } from 'node:url'
import { copy } from 'copy-vite-plugin'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/assets/sass/quasar-variables.sass'
    }),
    copy({
      pattern: [
          {
            from: './node_modules/dwv/decoders',
            to: 'assets/dwv/decoders'
          }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
