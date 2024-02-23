import path from 'path';
import { existsSync } from 'fs';
import { createRequire } from 'module';

import { glob } from 'glob';
import { outputFile } from 'fs-extra';

import { resolve } from '../utils.js';
import { jsFileExt } from './complie-script.js';

export async function genComponentStyle(dir, format) {
  const componentPaths = await glob(`${dir}/packages/*/`);
  componentPaths.forEach(async line => {
    const component = path.basename(line);
    const deps = getDeps(`${line}/${component}.scss`, component);
    const content = deps
      .map(dep =>
        format === 'esm'
          ? `import '../${component}/${dep}.css;'`
          : `require('../${component}/${dep}.css');`,
      )
      .join(`\n`);
    await outputFile(`${line}/style/index${jsFileExt(format)}`, content);
  });
}
function getDeps(path, component) {
  const request = createRequire(import.meta.url);
  const styleDeps = request(resolve('build/style-deps.json'));
  const deps = styleDeps[component];
  if (existsSync(path)) {
    deps.push(component);
  }
  return deps;
}
