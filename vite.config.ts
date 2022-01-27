import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: process.cwd(),
  base: "./",
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@utils": "src/utils"
    }
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 4096, // 4KB base64地址大小
    cssCodeSplit: true, // css 文件拆分 否则会打包到一个css文件中
    sourcemap: false //是否生成sourcemap
  }
})
