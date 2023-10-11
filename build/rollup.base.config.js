import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';
import PluginVue from 'rollup-plugin-vue';
// import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    nodeResolve(), // 让 Rollup 可以找到外部模块
    commonjs({
      include: ['node_modules/**'],
    }), // 转换 commonjs module 为 es module
    PluginVue({
      // 默认支持 scss
      exclude: ['node_modules/**'],
    }),
    typescript({
      // verbosity: 2,
      // check: false,
      useTsconfigDeclarationDir: true, // 使用 tsconfig.json 中的 declarationDir，而不是依据 output.file
    }), // @rollup/plugin-typescript 会报错
    json(), // 让 rollup 能够导入 json
    del({ targets: 'dist/*' }), // 每次 build 之前删除 dist
  ],
};
