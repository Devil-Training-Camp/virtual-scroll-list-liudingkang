import { compileStringAsync } from 'sass';
import { readFile } from 'fs/promises';

// 编译 scss
export async function compileSass(filePath) {
  const code = await readFile(filePath, 'utf-8');
  const { css } = await compileStringAsync(code);
  return css;
}
