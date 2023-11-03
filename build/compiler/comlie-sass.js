import { outputFile, readFile } from 'fs-extra';
import { compileStringAsync } from 'sass';
import { replaceExt } from '../utils';

// 编译 scss
export async function compileSass(filePath) {
  const code = await readFile(filePath);
  const { css } = await compileStringAsync(code);
  await outputFile(replaceExt(filePath, '.css'), css, 'utf-8');
}
