import { defineConfig } from 'vite'
import { builtinModules } from 'node:module'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)

const ROOT = path.dirname(__filename)

const NODE_VERSION = 20
const EXTERNAL = builtinModules
  .map((bm) => `node:${bm}`)
  .concat(builtinModules)
  .concat('electron', 'electron/main', 'electron/renderer', 'electron/common')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      sourcemap: mode === 'development' ? 'inline' : false,
      target: `node${NODE_VERSION}`,
      outDir: path.join(ROOT, 'dist'),
      emptyOutDir: true,
      minify: mode === 'development' ? false : 'esbuild',
      rollupOptions: {
        input: {
          preload: path.join(ROOT, '/src-main/preload/main.ts'),
          'pin-preload': path.join(ROOT, '/src-main/preload/pin.ts'),
          'screenshot-preload': path.join(ROOT, '/src-main/preload/screenshot.ts'),
          'editor-preload': path.join(ROOT, '/src-main/preload/editor.ts'),
        },
        output: {
          format: 'cjs',
          entryFileNames: '[name].cjs',
        },
        external: EXTERNAL,
      },
    },
  }
})
