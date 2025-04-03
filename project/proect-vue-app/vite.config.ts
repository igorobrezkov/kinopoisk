import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgSpritePlugin({
      exportType: 'vue',
      include: '**/svg-sprite/*.svg'
    }),
  ],
})
