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
import { getFileEntries } from './utils.js';
import { CJS_DIR, ES_DIR } from './config.js';
function testPlugin() {
  return {
    name: 'my-example', // 此名称将出现在警告和错误中
    transform(code, id) {
      console.log(id, code);
      return {
        code: '',
        map: null,
      };
    },
  };
}

export default [
  {
    ...base,
    input: await getFileEntries('src', 'ts'),
    output: [
      {
        format: 'es',
        dir: ES_DIR,
        entryFileNames: '[name].mjs',
        assetFileNames: '[name][extname]',
      },
      {
        format: 'cjs',
        dir: CJS_DIR,
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    ],
    plugins: [
      ...base.plugins,
      // 每次 build 之前删除
      del({ targets: [`${CJS_DIR}/*`, `${ES_DIR}/*`] }),
      // @rollup/plugin-typescript 会报错
      typescript(),
      babel({
        exclude: ['node_modules/**'],
        babelHelpers: 'runtime',
        extensions: ['.ts', '.js'],
      }),
      // 压缩 es6+ 代码 / uglify 压缩 es5
      // terser(),
      // testPlugin(),
      styles({
        // 遵从 assetFileNames 路径
        mode: 'extract',
        plugins: [
          // 依据 browserlist 自动加浏览器私有前缀
          autoprefixer(),
          postcssPresetEnv(),
          // 压缩 css
          cssnanoPlugin(),
        ],
      }),
    ],
    external: ['vue'],
  },
];
