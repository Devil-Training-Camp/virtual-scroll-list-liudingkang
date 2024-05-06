import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import del from 'rollup-plugin-delete';
import styles from 'rollup-plugin-styles';
import esbuild from 'rollup-plugin-esbuild';
import vue from '@vitejs/plugin-vue';

import base from './rollup.base.config.js';
export default {
  ...base,
  input: {
    'packages/fixed-size-list/fixed-size-list': 'src/packages/fixed-size-list/index.ts',
    'packages/list-item/list-item': 'src/packages/list-item/index.ts',
  },
  output: [
    {
      format: 'es',
      dir: 'dist',
      entryFileNames: `[name].mjs`,
      assetFileNames: '[name][extname]',
    },
  ],
  external: ['vue'],
  plugins: [
    ...base.plugins,
    del({ targets: 'dist/*' }), // 每次 build 之前删除 dist
    vue(),
    esbuild(),
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
};
