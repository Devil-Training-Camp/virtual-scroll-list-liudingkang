import { logger } from 'rslog';
import { glob } from 'glob';

import path from 'path';
import { execSync } from 'child_process';
import { copy } from 'fs-extra';

import { CJS_DIR, ES_DIR, SRC_DIR } from './config.js';
import { compileSfc } from './compiler/complie-sfc.js';

async function setEnv() {
  process.env.NODE_ENV = 'production';
}
async function copySource() {
  await Promise.all([copy(SRC_DIR, ES_DIR)], copy(SRC_DIR, CJS_DIR));
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
  execSync(
    `tsc -p ${decPath} -declarationDir ${ES_DIR} && tsc -p ${decPath} -declarationDir ${CJS_DIR}`,
    {
      stdio: 'inherit',
      shell: true,
    },
  );
}
// 构建 esm
async function buildEs() {
  const sfcEntries = await glob(`${ES_DIR}/packages/+(**)/*.vue`);
  for (const filePath of sfcEntries.slice(1, 2)) {
    await compileSfc(filePath, 'esm');
  }
}
// 构建 cjs
async function buildCjs() {
  const sfcEntries = await glob(`${CJS_DIR}/packages/+(**)/*.vue`);
  for (const filePath of sfcEntries.slice(-1)) {
    await compileSfc(filePath, 'cjs');
  }
}
const tasks = [
  {
    text: 'type copy source',
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
  // {
  //   text: 'build types',
  //   task: buildTypes,
  // },
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
