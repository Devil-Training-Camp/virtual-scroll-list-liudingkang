import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';
import PluginVue from 'rollup-plugin-vue';

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'virtualScrollList',
      format: 'umd',
      file: 'dist/virtual-scroll-list.umd.js'
    },
    {
      format: 'es',
      file: 'dist/virtual-scroll-list.esm.js'
    }
  ],
  plugins: [
    nodeResolve(), // 让 Rollup 可以找到外部模块
    commonjs(), // 转换 commonjs module 为 es module
    json(), // 让 rollup 能够导入 json
    typescript(),
    PluginVue({
      exclude: ['node_modules/**']
    }),
    babel({
      exclude: ['node_modules/**']
    }),
    terser(), // 压缩 es6+ 代码 / uglify 压缩 es5
    css({
      output: 'virtual-scroll-list.css'
    }),
  ],
  external: ['vue']
}