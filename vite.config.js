import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig((opt) => {
  return {
    root: 'src',
    build: {
      outDir: '../extension',
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/index.ts'),
          background: resolve(__dirname, 'src/background.ts'),
        },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
  }
})
