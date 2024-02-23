import esbuild from 'esbuild';
import { outputFile } from 'fs-extra';
import { readFile } from 'fs/promises';
import { replaceExt } from '../utils.js';
import { replaceScriptImportExt } from './get-deps.js';

export function jsFileExt(format) {
  return format === 'esm' ? '.mjs' : '.js';
}

// 编译 js
export async function compileScript(filePath, format) {
  const script = await readFile(filePath, 'utf-8');
  let { code } = await esbuild.transform(script, {
    loader: 'ts',
    target: 'es2016',
    format,
  });
  const ext = jsFileExt(format);
  const file = replaceExt(filePath, ext);
  code = replaceScriptImportExt(code, ext);
  await outputFile(file, code, 'utf-8');
  // console.dir(code, { depth: 1 });
}
