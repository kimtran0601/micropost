// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import express from 'express'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
// import {apiUrl, port} from '/Users/trandacnguyenkim/Documents/CSDS221/project3/server/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ 
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  build: {
    outDir: path.resolve(__dirname, '../server/public'),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // target: 'http://localhost:5050',
        target: 'https://shimmering-twilight-f674f2.netlify.app'
      }
    },
    middleware: [
      express.static(path.resolve(__dirname, 'public')),
      (req, res, next) => {
        if (req.originalUrl.startsWith('/api')) {
          // Handle API requests separately
          return next();
        }

        // Serve index.html for all other routes
        return res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
      },
    ],
  },
})
