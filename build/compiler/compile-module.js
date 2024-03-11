import { remove } from 'fs-extra';
import { rollup } from 'rollup';
import { glob } from 'glob';

import { CJS_DIR, ES_DIR } from '../common/constant.js';
import { isScript, isSfc, isStyle } from '../common/utils.js';
import { getBuildConfig } from '../config/config.js';

import { compileScript } from './complie-script.js';
import { compileStyle } from './compile-style.js';
import { compileSfc } from './complie-sfc.js';

export async function compileBundle() {
  const config = await getBuildConfig();
  const startTime = performance.now();
  const tasks = [];
  const { esbuildOptions, styleOptions, babelOptions } = await import(
    '../config/rollup.prod.config.js'
  );
  const jsOptions = config.modern ? esbuildOptions : babelOptions;
  const rollupTasks = [jsOptions, styleOptions].map(options => {
    return async () => {
      const bundle = await rollup(options);
      return Promise.all(options.output.map(bundle.write));
    };
  });
  tasks.push(...rollupTasks);
  await Promise.all(tasks.map(task => task()));
  await removeStyleBundleFile();
  const endTime = performance.now();
  console.log(
    `${config.modern ? 'esbuild' : 'babel'} bundle time: ${(endTime - startTime).toFixed(1)} ms`,
  );
}
async function removeStyleBundleFile() {
  await remove('es/style.bundle.mjs');
  await remove('lib/style.bundle.js');
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
