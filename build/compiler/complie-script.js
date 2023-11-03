import esbuild from 'esbuild';
import { outputFile } from 'fs-extra';
import { replaceExt } from '../utils.js';

function fileFromat(format) {
  return format === 'esm' ? '.mjs' : '.js';
}

// 编译 ts js
export async function compilerScript(script, filePath, format) {
  const { code } = await esbuild.transform(script, {
    loader: 'ts',
    target: 'es2016',
    format,
  });
  const file = replaceExt(filePath, fileFromat(format));
  await outputFile(file, code, 'utf-8');
  // console.dir(code, { depth: 1 });
}
