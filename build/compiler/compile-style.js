import fsm from 'fs-extra';
import path from 'path';
import { logger } from 'rslog';
import { replaceExt } from '../utils.js';
import { compileCss } from './compile-css.js';
import { compileSass } from './complie-sass.js';

const { outputFile, writeFileSync, existsSync, readFileSync, readFile, remove } = fsm;
export const IMPORT_STYLE_RE =
  /(?<!['"`])import\s+['"](\.{1,2}\/.+((\.css)|(\.scss)))['"]\s*;?(?!\s*['"`])/g;

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
    await remove(filePath);
    await outputFile(replaceExt(filePath, '.css'), code);
  } catch (error) {
    console.log(error);
    logger.error('Compile style failed: ' + filePath);
  }
}
export function normalizeStyleDependency(styleImport, styleReg) {
  styleImport = styleImport.replace(styleReg, '$1');
  styleImport = styleImport.replace(/(\.scss)|(\.css)/, '');
  styleImport = '../' + styleImport;
  return styleImport;
}
export function extractStyleDependencies(filePath, code, styleReg, format) {
  const cssFilePath = `${path.dirname(filePath)}/style/index${path.extname(filePath)}`;
  if (!existsSync(cssFilePath)) {
    return code;
  }
  let cssFile = readFileSync(cssFilePath, 'utf-8');
  const styleImports = code.match(styleReg) ?? [];
  const newImports = [];
  styleImports.forEach(styleImport => {
    const normalizePath = normalizeStyleDependency(styleImport, styleReg);
    newImports.push(
      format === 'es' ? `import '${normalizePath}.css';\n` : `require('${normalizePath}.css');\n`,
    );
  });
  cssFile = newImports.join('') + cssFile;
  writeFileSync(cssFilePath, cssFile);
  return code.replace(IMPORT_STYLE_RE, '');
}
