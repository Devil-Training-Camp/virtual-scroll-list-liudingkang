import { glob } from 'glob';
import { basename } from 'path';
import { writeFile } from 'fs/promises';

import { jsFileExt, resolve } from '../common/utils.js';
import { CJS_DIR, ES_DIR } from '../common/constant.js';

async function genESModuleEntryTemplate(options) {
  const { dir, ext } = options;
  const styleImports = [];
  const componentPaths = await glob(`${dir}/packages/*/`);

  componentPaths.forEach(componentPath => {
    const componentName = basename(componentPath);
    styleImports.push(`import './packages/${componentName}/style/index${ext}';`);
  });
  const styleTemplate = `
${styleImports.join('\n')}
  `;
  return {
    styleTemplate,
  };
}
async function genCJSModuleEntryTemplate(options) {
  const { dir, ext } = options;
  const styleImports = [];
  const componentPaths = await glob(`${dir}/packages/*/`);

  componentPaths.forEach(componentPath => {
    const componentName = basename(componentPath);
    styleImports.push(`require('./packages/${componentName}/style/index${ext}');`);
  });
  const styleTemplate = `
${styleImports.join('\n')}
  `;
  return {
    styleTemplate,
  };
}
async function generateModuleEntry(dir, format) {
  const genOptions = {
    dir,
    ext: jsFileExt(format),
  };
  const { styleTemplate } =
    format === 'es'
      ? await genESModuleEntryTemplate(genOptions)
      : await genCJSModuleEntryTemplate(genOptions);
  await writeFile(resolve(`${dir}/style${genOptions.ext}`), styleTemplate);
}
export async function buildModuleEntry() {
  await generateModuleEntry(ES_DIR, 'es');
  await generateModuleEntry(CJS_DIR, 'cjs');
}
