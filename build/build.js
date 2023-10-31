import { logger } from 'rslog';

import { execSync } from 'child_process';
import { CJS_DIR, ES_DIR } from './config.js';
import { glob } from 'glob';
import { compileSfc } from './compiler/complie-sfc.js';
import { getFileEntries } from './utils.js';

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
// 生成按需加载样式入口
async function buildStyleEntries() {
  // const esEntries = await glob(`${ES_DIR}/packages/+(**)/`);
  // for (const entry of esEntries) {
  //   await writeFile(
  //     `${entry}/style/index.mjs`,
  //     `
  //     import '../../'
  //   `,
  //   );
  // }
  const sfcEntries = await glob(`src/packages/+(**)/*.vue`);
  // const fileEntries = getFileEntries();
  for (const filePath of sfcEntries) {
    await compileSfc(filePath);
  }
  // console.dir(res, { depth: null });
}
buildStyleEntries();
const tasks = [
  {
    text: 'type check',
    task: check,
  },
  {
    text: 'build outputs',
    task: buildOutputs,
  },
  {
    text: 'build types',
    task: buildTypes,
  },
  {
    text: 'build style entries',
    task: buildStyleEntries,
  },
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
  try {
    await runBuildTasks();
  } catch {
    logger.error('build error!');
    process.exit(1);
  }
}
build();
