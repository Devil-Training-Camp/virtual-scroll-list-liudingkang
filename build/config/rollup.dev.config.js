import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import esbuild from 'rollup-plugin-esbuild';
import del from 'rollup-plugin-delete';
import styles from 'rollup-plugin-styles';
import html from 'rollup-plugin-html2';
// import vue from 'rollup-plugin-vue';
import vue from '@vitejs/plugin-vue';

import base from './rollup.base.config.js';

export const devOptions = {
  ...base,
  input: 'demo/main.ts',
  output: [
    {
      format: 'umd',
      file: 'dist/main.js',
      globals: {
        vue: 'Vue',
      },
      sourcemap: true,
    },
  ],
  plugins: [
    ...base.plugins,
    del({ targets: 'dist/*' }), // 每次 build 之前删除 dist
    vue(),
    esbuild({
      include: /\.[tj]s?$/,
    }),
    styles({
      // 遵从 assetFileNames 路径
      mode: 'extract',
    }),
    html({
      template: 'demo/index.html',
      onlinePath: '.',
    }),
    serve({
      open: true,
      openPage: '/dist/index.html',
      port: 8080,
    }),
    livereload({
      watch: 'dist',
    }),
  ],
  watch: {
    exclude: 'node_modules/**',
  },
  external: ['vue'],
};

export default [devOptions];
