import { rollup } from 'rollup';
import { CJS_DIR, ES_DIR, PACKAGE_NAME } from '../common/constant.js';
import { isScript, isSfc, isStyle } from '../common/utils.js';
import { compileScript } from './complie-script.js';
import { compileStyle } from './compile-style.js';
import { compileSfc } from './complie-sfc.js';
import { glob } from 'glob';

export async function compileBundle() {
  const startTime = performance.now();
  const tasks = [];
  const { esbuildOptions, styleOptions, babelOptions } = await import(
    '../config/rollup.prod.config.js'
  );
  const jsOptions = babelOptions;
  const rollupTasks = [esbuildOptions, styleOptions].map(options => {
    return async () => {
      const bundle = await rollup(options);
      return Promise.all(options.output.map(bundle.write));
    };
  });
  tasks.push(...rollupTasks);
  await Promise.all(tasks.map(task => task()));
  const endTime = performance.now();
  console.log(`bundle time: ${(endTime - startTime).toFixed(1)} 毫秒`);
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
