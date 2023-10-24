import { babel } from '@rollup/plugin-babel';
// import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
// import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import typescript from 'rollup-plugin-typescript2';
import styles from 'rollup-plugin-styles';
import del from 'rollup-plugin-delete';

import base from './rollup.base.config.js';
import { getComponentEntries } from './utils.js';

export default [
  {
    ...base,
    input: getComponentEntries(),
    output: [
      {
        format: 'es',
        dir: 'dist/es',
        entryFileNames: '[name].mjs',
        assetFileNames: '[name][extname]',
      },
      {
        format: 'cjs',
        dir: 'dist/lib',
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    ],
    plugins: [
      ...base.plugins,
      del({ targets: 'dist/*' }), // 每次 build 之前删除 dist
      typescript(), // @rollup/plugin-typescript 会报错
      babel({
        exclude: ['node_modules/**'],
        babelHelpers: 'runtime',
        extensions: ['.ts', '.js'],
      }),
      // terser(), // 压缩 es6+ 代码 / uglify 压缩 es5
      styles({
        mode: 'extract', // 遵从 assetFileNames 路径
        plugins: [
          autoprefixer(), // 依据 browserlist 自动加浏览器私有前缀
          postcssPresetEnv(),
          cssnanoPlugin(), // 压缩 css
        ],
      }),
    ],
    external: ['vue'],
  },
];
