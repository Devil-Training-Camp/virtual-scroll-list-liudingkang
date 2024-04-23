import { readFile } from 'fs/promises';

import esbuild from 'esbuild';
import fsm from 'fs-extra';

import { jsFileExt, replaceExt } from '../common/utils.js';

import { resolveDependences } from './get-deps.js';
import { IMPORT_STYLE_RE, extractStyleDependencies } from './compile-style.js';

const { outputFile, removeSync } = fsm;

// 编译 js
export async function compileScript(filePath, format) {
  if (filePath.includes('.d.ts')) {
    return;
  }
  let script = await readFile(filePath, 'utf-8');
  const ext = jsFileExt(format);
  const outputFilePath = replaceExt(filePath, ext);
  if (script) {
    script = extractStyleDependencies(outputFilePath, script, IMPORT_STYLE_RE, format);
  }
  script = resolveDependences(script, filePath, ext);
  let { code } = await esbuild.transform(script, {
    loader: 'ts',
    format: format === 'es' ? 'esm' : format,
  });
  removeSync(filePath);
  await outputFile(outputFilePath, code, 'utf-8');
  // console.dir(code, { depth: 1 });
}
