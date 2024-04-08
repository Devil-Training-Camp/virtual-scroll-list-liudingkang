import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // 测试
  test: {
    environment: 'happy-dom',
  },
});
