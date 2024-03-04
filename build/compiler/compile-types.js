import { glob } from 'glob';
import { execSync } from 'child_process';
import fsm from 'fs-extra';
import { CJS_DIR, ES_DIR } from '../config.js';

const { remove } = fsm;

// 生成类型
export async function compileTypes() {
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
