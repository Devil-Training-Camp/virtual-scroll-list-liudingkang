import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import base from './rollup.base.common/constant.js';
import esbuild from 'rollup-plugin-esbuild';
import del from 'rollup-plugin-delete';
import styles from 'rollup-plugin-styles';
import html from 'rollup-plugin-html2';

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
    html({
      template: 'demo/index.html',
      onlinePath: '.',
    }),
    serve({
      // open: true,
      // openPage: '/dist/index.html',
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
