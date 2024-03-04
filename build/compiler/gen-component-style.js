import path from 'path';
import { createRequire } from 'module';

import { glob } from 'glob';
import { outputFile } from 'fs-extra';

import { jsFileExt, resolve } from '../utils.js';
import { CJS_DIR, ES_DIR } from '../config.js';

const request = createRequire(import.meta.url);
const styleDeps = request(resolve('build/style-deps.json'));

function getDeps(component) {
  const deps = styleDeps[component].slice(0);
  deps.push(component);
  return deps;
}
async function genComponentStyle(dir, format) {
  const componentPaths = await glob(`${dir}/packages/*/`);
  componentPaths.forEach(async line => {
    const component = path.basename(line);
    const deps = getDeps(component);
    let content = deps
      .map(dep =>
        format === 'es'
          ? `import '../../${dep}/${dep}.css';\n`
          : `require('../../${dep}/${dep}.css');\n`,
      )
      .join('');
    content = content.replace(`../${component}/`, '');
    await outputFile(`${line}/style/index${jsFileExt(format)}`, content);
  });
}
export async function buildStyleEntry() {
  await genComponentStyle(ES_DIR, 'es');
  await genComponentStyle(CJS_DIR, 'cjs');
}
