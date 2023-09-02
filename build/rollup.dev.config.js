import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import base from './rollup.base.config.js';

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
    postcss(),
    serve({
      open: true,
      openPage: '/demo/index.html',
      port: 8080,
    }),
    livereload({
      watch: 'dist',
      delay: 300,
    }),
  ],
  watch: {
    exclude: 'node_modules/**',
  },
  external: ['vue'],
};
