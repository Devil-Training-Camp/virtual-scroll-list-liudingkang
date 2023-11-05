import esbuild from 'esbuild';
import { outputFile } from 'fs-extra';
import { readFile } from 'fs/promises';
import { replaceExt } from '../utils.js';

function fileFromat(format) {
  return format === 'esm' ? '.mjs' : '.js';
}

// 编译 js
export async function compileScript(filePath, format) {
  const script = await readFile(filePath, 'utf-8');
  const { code } = await esbuild.transform(script, {
    loader: 'ts',
    target: 'es2016',
    format,
  });
  const file = replaceExt(filePath, fileFromat(format));
  await outputFile(file, code, 'utf-8');
  // console.dir(code, { depth: 1 });
}
