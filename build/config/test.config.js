// import { babel } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
// import styles from 'rollup-plugin-styles';
import { minify } from 'rollup-plugin-esbuild';
import typescript from 'rollup-plugin-typescript2';
import vue from '@vitejs/plugin-vue';
import del from 'rollup-plugin-delete';

import base from './rollup.base.config.js';
export default {
  ...base,
  input: 'src/index.ts',
  output: [
    {
      format: 'es',
      file: 'dist/virtual-scroll-list.esm.js',
      exports: 'named',
    },
    {
      format: 'cjs',
      file: 'dist/virtual-scroll-list.cjs.js',
      exports: 'named',
    },
    {
      format: 'umd',
      name: 'VirtualScrollList',
      file: 'dist/virtual-scroll-list.umd.js',
      globals: {
        vue: 'Vue',
      },
      exports: 'named', // 消除 export named 和 export default 同时存在警告
    },
    {
      format: 'umd',
      name: 'VirtualScrollList',
      file: 'dist/virtual-scroll-list.umd.min.js',
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
      plugins: [minify()],
    },
  ],
  external: ['vue'],
  plugins: [
    ...base.plugins,
    del({ targets: 'dist/*' }), // 每次 build 之前删除 dist
    vue(),
    typescript({
      // verbosity: 2,
      check: false,
      useTsconfigDeclarationDir: true, // 使用 tsconfig.json 中的 declarationDir，而不是依据 output.file
    }),
    // babel({
    //   exclude: ['node_modules/**'],
    //   babelHelpers: 'runtime',
    // }),
    postcss({
      plugins: [
        autoprefixer(), // 依据 browserlist 自动加浏览器私有前缀
        postcssPresetEnv(),
        cssnanoPlugin(), // 压缩 css
      ],
      // mode: 'extract',
      extract: 'virtual-scroll-list.css', // 导出 css 为单文件
    }),
  ],
};
