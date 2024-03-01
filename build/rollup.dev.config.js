import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import base from './rollup.base.config.js';
import esbuild from 'rollup-plugin-esbuild';
import del from 'rollup-plugin-delete';
import styles from 'rollup-plugin-styles';
import html from '@rollup/plugin-html';

export default {
  ...base,
  input: 'demo/main.ts',
  output: {
    format: 'umd',
    file: 'dist/main.js',
    globals: {
      vue: 'Vue',
    },
  },
  plugins: [
    ...base.plugins,
    del({ targets: 'dist/*' }), // 每次 build 之前删除 dist
    esbuild({
      include: /\.[tj]s?$/,
    }),
    styles({
      // 遵从 assetFileNames 路径
      mode: 'extract',
    }),
    serve({
      // open: true,
      // openPage: '/demo/index.html',
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
