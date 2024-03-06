import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  plugins: [
    nodeResolve(), // 让 Rollup 可以找到外部模块
    commonjs({
      include: ['node_modules/**'],
    }), // 转换 commonjs module 为 es module
  ],
};
