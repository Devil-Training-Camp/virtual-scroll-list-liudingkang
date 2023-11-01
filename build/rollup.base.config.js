import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import PluginVue from 'rollup-plugin-vue';

export default {
  plugins: [
    nodeResolve(), // 让 Rollup 可以找到外部模块
    commonjs({
      include: ['node_modules/**'],
    }), // 转换 commonjs module 为 es module
    PluginVue({
      css: true,
    }),
    json(), // 让 rollup 能够导入 json
  ],
};
