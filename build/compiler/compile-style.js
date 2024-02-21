import { outputFile, remove } from 'fs-extra';
import path from 'path';
import { logger } from 'rslog';
import { replaceExt } from '../utils.js';
import { compileCss } from './compile-css.js';
import { compileSass } from './complie-sass.js';
import { readFile } from 'fs/promises';

// 编译样式 css scss
export async function compileStyle(filePath) {
  const ext = path.extname(filePath);
  try {
    let css;
    switch (ext) {
      case '.scss':
        css = await compileSass(filePath);
        break;

      default:
        css = await readFile(filePath, 'utf-8');
        break;
    }
    const code = await compileCss(css);
    await outputFile(replaceExt(filePath, '.css'), code);
    // await remove(filePath);
  } catch (error) {
    console.log(error);
    logger.error('Compile style failed: ' + filePath);
  }
}
