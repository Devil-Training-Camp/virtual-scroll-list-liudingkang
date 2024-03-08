import { logger } from 'rslog';
import { copy, remove } from 'fs-extra';

import { CJS_DIR, ES_DIR, SRC_DIR } from '../common/constant.js';
import { buildStyleEntry } from '../compiler/gen-component-style.js';
import { buildModuleEntry } from '../compiler/gen-module-entry.js';
import { compileBundle, compileModule } from '../compiler/compile-module.js';
import { compileTypes } from '../compiler/compile-types.js';
import { setBuildConfig } from '../config/config.js';

async function copySource() {
  await Promise.all([remove(ES_DIR), remove(CJS_DIR)]);
  await Promise.all([copy(SRC_DIR, ES_DIR)], copy(SRC_DIR, CJS_DIR));
}

const tasks = [
  {
    text: 'copy source',
    task: copySource,
  },
  {
    text: 'build module entry',
    task: buildModuleEntry,
  },
  {
    text: 'build types',
    task: compileTypes,
  },
  {
    text: 'gen style entry',
    task: buildStyleEntry,
  },
  {
    text: 'build module',
    task: compileModule,
  },
  {
    text: 'build bundle',
    task: compileBundle,
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
export async function build(options) {
  process.env.NODE_ENV = 'production';
  setBuildConfig(options);
  try {
    await runBuildTasks();
  } catch {
    logger.error('build error!');
    process.exit(1);
  }
}
