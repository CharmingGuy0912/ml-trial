import path from 'path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import {VitePWA} from 'vite-plugin-pwa'
import {kebabCase} from 'lodash'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{
      find: '@/config',
      replacement: () => {
        const appEnv = process.env.APP_ENV || 'default'
        const config = kebabCase(appEnv)
        return path.resolve(__dirname, `./app/config/${config}.js`)
      }
    }, {
      find: '@',
      replacement: path.resolve(__dirname, './app/')
    }]
  },
  server: {
    port: process.env.PORT || 3001
  },
  plugins: [
    react(),
    legacy(),
    VitePWA({
      useCredentials: process.env.APP_ENV !== 'production',
      workbox: {
        globPatterns: ['**/!(*-legacy*).{js,css,html}'],
        globIgnores: ['**/node_modules/**/*'],
        navigateFallbackDenylist: [/^\/storybook/],

      }
    }),
    svgrPlugin()
  ]
})
