import { rollup } from 'rollup';
import { CJS_DIR, ES_DIR } from '../config.js';
import { jsFileExt, isScript, isSfc, isStyle } from '../utils.js';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import styles from 'rollup-plugin-styles';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { compileScript } from './complie-script.js';
import { compileStyle } from './compile-style.js';
import { compileSfc } from './complie-sfc.js';
import { glob } from 'glob';

const commonPlugins = [
  nodeResolve(), // 让 Rollup 可以找到外部模块
  commonjs({
    include: ['node_modules/**'],
  }), // 转换 commonjs module 为 es module
];
const buildOptions = [];

function getCompileStyleOptions(dir, format) {
  const jsExt = jsFileExt(format);
  return {
    input: `${dir}/style${jsExt}`,
    output: [
      {
        format,
        dir,
        entryFileNames: `[name]${jsExt}`,
        assetFileNames: '[name][extname]',
      },
    ],
    plugins: [
      ...commonPlugins,
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
  };
}
function compileStyleTask() {
  buildOptions.push(getCompileStyleOptions(ES_DIR, 'es'), getCompileStyleOptions(CJS_DIR, 'cjs'));
}
function compileScriptTask() {
  const options = {};
}
export async function compileBundle() {
  compileStyleTask();
  const tasks = buildOptions.map(async options => {
    const bundle = await rollup(options);
    await Promise.all(options.output.map(bundle.write));
  });
  await Promise.all(tasks);
}
async function complieFile(filePath, format) {
  if (isSfc(filePath)) {
    await compileSfc(filePath, format);
  }
  if (isScript(filePath)) {
    await compileScript(filePath, format);
  }
  if (isStyle(filePath)) {
    await compileStyle(filePath);
  }
  // await remove(filePath);
}
async function compileDir(dir, format) {
  // 构建 es
  const entries = await glob(`${dir}/**/*`, {
    nodir: true,
  });
  for (const filePath of entries) {
    await complieFile(filePath, format);
  }
}
export async function compileModule() {
  await compileDir(ES_DIR, 'es');
  await compileDir(CJS_DIR, 'cjs');
}
