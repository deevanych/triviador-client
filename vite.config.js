import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import config from './svelte.config.mjs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(config)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
