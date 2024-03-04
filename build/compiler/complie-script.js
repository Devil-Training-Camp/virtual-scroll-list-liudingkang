import esbuild from 'esbuild';
import fsm from 'fs-extra';
import { readFile } from 'fs/promises';
import { jsFileExt, replaceExt } from '../utils.js';
import { replaceScriptImportExt } from './get-deps.js';
import { IMPORT_STYLE_RE, extractStyleDependencies } from './compile-style.js';

const { outputFile, removeSync } = fsm;

// 编译 js
export async function compileScript(filePath, format) {
  if (filePath.includes('.d.ts')) {
    return;
  }
  const script = await readFile(filePath, 'utf-8');
  let { code } = await esbuild.transform(script, {
    loader: 'ts',
    target: 'es2016',
    format: format === 'es' ? 'esm' : format,
  });
  const ext = jsFileExt(format);
  const file = replaceExt(filePath, ext);
  if (code) {
    code = extractStyleDependencies(file, code, IMPORT_STYLE_RE, format);
  }
  code = replaceScriptImportExt(code, ext);
  removeSync(filePath);
  await outputFile(file, code, 'utf-8');
  // console.dir(code, { depth: 1 });
}
