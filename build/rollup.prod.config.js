import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcss from 'rollup-plugin-postcss';

import base from './rollup.base.config.js';

export default {
  ...base,
  input: 'src/index.ts',
  output: [
    {
      name: 'virtualScrollList',
      format: 'umd',
      file: 'dist/virtual-scroll-list.umd.js',
      globals: {
        vue: 'Vue'
      }
    },
    {
      format: 'es',
      file: 'dist/virtual-scroll-list.esm.js'
    }
  ],
  plugins: [
    ...base.plugins,
    babel({
      exclude: ['node_modules/**']
    }),
    terser(), // 压缩 es6+ 代码 / uglify 压缩 es5
    postcss({
      plugins: [
        autoprefixer(), // 依据 browserlist 自动加浏览器私有前缀
        cssnanoPlugin() // 压缩 css
      ],
      extract: 'virtual-scroll-list.css' // 导出 css 为单文件
    })
  ],
  external: ['vue']
}