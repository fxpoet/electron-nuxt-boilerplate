import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'node16',
    // 메인 프로세스는 브라우저 번들이 아니라 Node 환경으로 빌드
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'),
        preload: resolve(__dirname, 'src/preload.ts'),
        "io-worker": resolve(__dirname, 'src/io-worker.ts')
      },
      output: {
        entryFileNames: '[name].js',
        format: 'cjs'
      },
      external: [
        'electron',
        'path',
        'child_process',
        'fs',
        'fs/promises'
      ]
    }
  }
});
