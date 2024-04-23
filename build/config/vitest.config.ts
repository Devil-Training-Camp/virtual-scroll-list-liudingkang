import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // 测试
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['src/**'],
      exclude: [
        '**/example/**',
        '**/__tests__/**',
        '**/docs/**',
        '**/*.md',
        '**/**.d.ts',
        'build/**',
        'demo/**',
        'dist/**',
        'docs/**',
        'es/**',
        'lib/**',
        'node_modules/**',
      ],
    },
  },
});
