import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import esbuild from 'rollup-plugin-esbuild';

import base from './rollup.base.config.js';

export default {
  ...base,
  input: 'src/index.ts',
  output: [
    {
      name: 'VirtualScrollList',
      format: 'umd',
      file: 'dist/virtual-scroll-list.umd.js',
      globals: {
        vue: 'Vue',
      },
      exports: 'named', // 消除 export named 和 export default 同时存在警告
    },
    {
      format: 'es',
      file: 'dist/virtual-scroll-list.esm.js',
      exports: 'auto',
    },
  ],
  plugins: [
    ...base.plugins,
    // babel({
    //   exclude: ['node_modules/**'],
    //   babelHelpers: 'runtime',
    //   extensions: ['.ts', '.js'],
    // }),
    // terser(), // 压缩 es6+ 代码 / uglify 压缩 es5
    esbuild({
      include: /\.[tj]s?$/,
      // minify: true,
    }),
    postcss({
      plugins: [
        // autoprefixer(), // 依据 browserlist 自动加浏览器私有前缀
        postcssPresetEnv(),
        // cssnanoPlugin(), // 压缩 css
      ],
      extract: 'virtual-scroll-list.css', // 导出 css 为单文件
    }),
  ],
  external: ['vue'],
};
