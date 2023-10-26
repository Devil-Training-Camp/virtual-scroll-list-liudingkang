import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import PluginVue from 'rollup-plugin-vue';

export default {
  plugins: [
    nodeResolve(), // 让 Rollup 可以找到外部模块
    commonjs({
      include: ['node_modules/**'],
    }), // 转换 commonjs module 为 es module
    PluginVue({
      // 默认支持 scss
      exclude: ['node_modules/**'],
      postcssPlugins: [
        // 依据 browserlist 自动加浏览器私有前缀
        autoprefixer(),
        postcssPresetEnv(),
        // 压缩 css
        cssnanoPlugin(),
      ],
      css: true,
    }),
    json(), // 让 rollup 能够导入 json
  ],
};
