import { logger } from 'rslog';
import { glob } from 'glob';
import { execSync } from 'child_process';
import { copy, remove } from 'fs-extra';

import { CJS_DIR, ES_DIR, SRC_DIR } from './config.js';
import { compileSfc } from './compiler/complie-sfc.js';
import { isScript, isSfc, isStyle } from './utils.js';
import { compileScript } from './compiler/complie-script.js';
import { compileStyle } from './compiler/compile-style.js';
import { genComponentStyle } from './compiler/gen-component-style.js';

async function setEnv() {
  process.env.NODE_ENV = 'production';
}
async function copySource() {
  await Promise.all([remove(ES_DIR), remove(CJS_DIR)]);
  await Promise.all([copy(SRC_DIR, ES_DIR)], copy(SRC_DIR, CJS_DIR));
}
async function complieFile(filePath, format) {
  // console.log(filePath);
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
// 类型检测
async function check() {
  execSync(`vue-tsc --noEmit`, {
    stdio: 'inherit',
    shell: true,
  });
}
// 构建
async function buildOutputs() {
  execSync(`rollup -c ./build/rollup.prod.config.js`, {
    stdio: 'inherit',
    shell: true,
  });
}
// 生成类型
async function buildTypes() {
  const decPath = './tsconfig.declaration.json';
  execSync(`vue-tsc -p ${decPath}`, {
    stdio: 'inherit',
    shell: true,
  });
  await removeVueTypes(ES_DIR);
  await removeVueTypes(CJS_DIR);
}
async function removeVueTypes(dir) {
  const entries = await glob(`${dir}/**/*.vue.d.ts`, {
    nodir: true,
  });
  for (const filePath of entries) {
    await remove(filePath);
  }
}
async function buildStyleEntry() {
  genComponentStyle(ES_DIR, 'esm');
  genComponentStyle(CJS_DIR, 'cjs');
}
// 构建 esm
async function buildEs() {
  const entries = await glob(`${ES_DIR}/**/*`, {
    nodir: true,
  });
  for (const filePath of entries) {
    await complieFile(filePath, 'esm');
    // await compileSfc(filePath, 'esm');
  }
}
// 构建 cjs
async function buildCjs() {
  const sfcEntries = await glob(`${CJS_DIR}/packages/+(**)/*.vue`);
  for (const filePath of sfcEntries) {
    await compileSfc(filePath, 'cjs');
  }
}
const tasks = [
  {
    text: 'copy source',
    task: copySource,
  },
  // {
  //   text: 'type check',
  //   task: check,
  // },
  // {
  //   text: 'build outputs',
  //   task: buildOutputs,
  // },
  {
    text: 'build types',
    task: buildTypes,
  },
  {
    text: 'gen style entry',
    task: buildStyleEntry,
  },
  {
    text: 'build esm',
    task: buildEs,
  },
  // {
  //   text: 'build cjs',
  //   task: buildCjs,
  // },
];

async function runBuildTasks() {
  for (const { text, task } of tasks) {
    try {
      logger.info(`running ${text}`);
      await task();
      logger.success(`success: ${text}`);
    } catch (err) {
      logger.error(`error: ${text}!`);
      logger.error(err);
      throw err;
    }
  }
}
async function build() {
  await setEnv();
  try {
    await runBuildTasks();
  } catch {
    logger.error('build error!');
    process.exit(1);
  }
}
build();
