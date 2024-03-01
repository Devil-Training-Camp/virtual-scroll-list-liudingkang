import path from 'path';
import { createRequire } from 'module';

import { glob } from 'glob';
import { outputFile } from 'fs-extra';

import { resolve } from '../utils.js';
import { jsFileExt } from './complie-script.js';

export async function genComponentStyle(dir, format) {
  const componentPaths = await glob(`${dir}/packages/*/`);
  componentPaths.forEach(async line => {
    const component = path.basename(line);
    const deps = getDeps(component);
    let content = deps
      .map(dep =>
        format === 'esm'
          ? `import '../../${dep}/${dep}.css';\n`
          : `require('../../${dep}/${dep}.css');\n`,
      )
      .join('');
    content = content.replace(`../${component}`, '');
    await outputFile(`${line}/style/index${jsFileExt(format)}`, content);
  });
}
function getDeps(component) {
  const request = createRequire(import.meta.url);
  const styleDeps = request(resolve('build/style-deps.json'));
  const deps = styleDeps[component];
  deps.push(component);
  return deps;
}
