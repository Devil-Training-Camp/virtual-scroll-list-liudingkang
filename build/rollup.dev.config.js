import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import base from './rollup.base.config.js';
import esbuild from 'rollup-plugin-esbuild';
import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';

export default {
  ...base,
  input: 'demo/main.ts',
  output: {
    format: 'umd',
    file: 'dist/main.js',
    globals: {
      vue: 'Vue',
    },
  },
  plugins: [
    ...base.plugins,
    // typescript({
    //   // verbosity: 2,
    //   // check: false,
    //   useTsconfigDeclarationDir: true, // 使用 tsconfig.json 中的 declarationDir，而不是依据 output.file
    // }), // @rollup/plugin-typescript 会报错
    esbuild({
      include: /\.[tj]s?$/,
    }),
    postcss(),
    serve({
      open: true,
      // openPage: '/demo/index.html',
      port: 8080,
    }),
    livereload({
      watch: 'dist',
    }),
  ],
  watch: {
    exclude: 'node_modules/**',
  },
  external: ['vue'],
};
