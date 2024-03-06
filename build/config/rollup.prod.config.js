import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import styles from 'rollup-plugin-styles';
import esbuild, { minify } from 'rollup-plugin-esbuild';

import base from './rollup.base.config.js';
import { CJS_DIR, ES_DIR } from '../common/constant.js';
import { GLOBAL_NAME, PACKAGE_NAME } from '../common/constant.js';

export const esbuildOptions = {
  ...base,
  input: `${ES_DIR}/index.mjs`,
  output: [
    {
      format: 'es',
      dir: ES_DIR,
      entryFileNames: `${PACKAGE_NAME}.esm.js`,
    },
    {
      format: 'cjs',
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.cjs.js`,
      exports: 'named',
    },
    {
      format: 'umd',
      name: GLOBAL_NAME,
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.js`,
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
    },
    {
      format: 'umd',
      name: GLOBAL_NAME,
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.min.js`,
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
      plugins: [minify()],
    },
  ],
  external: ['vue'],
  plugins: [...base.plugins, esbuild()],
};
export const babelOptions = {
  ...base,
  input: `${ES_DIR}/index.mjs`,
  output: [
    {
      format: 'es',
      dir: ES_DIR,
      entryFileNames: `${PACKAGE_NAME}.esm.js`,
    },
    {
      format: 'cjs',
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.cjs.js`,
      exports: 'named',
    },
    {
      format: 'umd',
      name: GLOBAL_NAME,
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.js`,
      exports: 'named',
      globals: {
        vue: 'Vue',
      },
    },
    {
      format: 'umd',
      name: GLOBAL_NAME,
      dir: CJS_DIR,
      entryFileNames: `${PACKAGE_NAME}.min.js`,
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
    babel({
      exclude: ['node_modules/**'],
      babelHelpers: 'runtime',
    }),
  ],
};
export const styleOptions = {
  ...base,
  input: `${ES_DIR}/style.mjs`,
  output: [
    {
      format: 'es',
      dir: ES_DIR,
      entryFileNames: `[name].bundle.mjs`,
      assetFileNames: '[name][extname]',
    },
    {
      format: 'cjs',
      dir: CJS_DIR,
      entryFileNames: `[name].bundle.js`,
      assetFileNames: '[name][extname]',
    },
  ],
  plugins: [
    ...base.plugins,
    styles({
      // 遵从 assetFileNames 路径
      mode: 'extract',
      plugins: [
        // 依据 browserlist 自动加浏览器私有前缀
        autoprefixer(),
        postcssPresetEnv(),
        // // 压缩 css
        cssnanoPlugin(),
      ],
    }),
  ],
  logLevel: 'silent',
};

export default [esbuildOptions, styleOptions];
