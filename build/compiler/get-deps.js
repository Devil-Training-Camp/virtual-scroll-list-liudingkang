import path from 'path';
import { existsSync } from 'fs';

const IMPORT_RE = /import\s+?[\w\s{},$*]+\s+from\s+?(".*?"|'.*?')/g;
const EXPORT_RE = /export\s+?[\w\s{},$*]+\s+from\s+?(".*?"|'.*?')/g;
const scriptExtNames = ['.vue', '.ts', '.tsx', '.mjs', '.js', '.jsx'];

export function matchImports(code) {
  const imports = code.match(IMPORT_RE) || [];
  return imports.filter(line => !line.includes('import type'));
}
// import a.vue -> a.mjs/js
export function replaceScriptImportExt(code, ext) {
  const imports = [...matchImports(code)];
  const updateImport = (index, newImport) => {
    code = code.replace(imports[index], newImport);
    imports[index] = newImport;
  };
  imports.forEach((line, index) => {
    if (line.includes('.vue')) {
      updateImport(index, line.replace('.vue', ext));
    }
  });
  return code;
}
export function resolveDependences(code, filePath, targetExt) {
  const resolver = (source, dependence) => {
    dependence = dependence.slice(1, dependence.length - 1);
    // import type or export type -> import type or export type
    if (source.includes('import type') || source.includes('export type')) {
      return source;
    }
    // 'vue' -> 'vue'
    if (!dependence.startsWith('.')) {
      return source;
    }
    const sourcePath = path.resolve(path.dirname(filePath), dependence);
    const ext = path.extname(sourcePath);
    const update = target => source.replace(dependence, target);
    if (ext) {
      // .vue -> .mjs
      if (scriptExtNames.includes(ext)) {
        return update(dependence.replace(ext, targetExt));
      }
    }
    const hasIndexFile = matchIndexFile(sourcePath, scriptExtNames);
    // ../utils -> ../utils/index.mjs
    if (hasIndexFile) {
      return update(`${dependence}/index${targetExt}`);
    }
    // ./props -> ./props.mjs
    return update(`${dependence}${targetExt}`);
  };
  return code.replace(IMPORT_RE, resolver).replace(EXPORT_RE, resolver);
}
function matchIndexFile(filePath, extNames) {
  return extNames.some(ext => {
    const pathName = `${filePath}/index${ext}`;
    return existsSync(pathName);
  });
}
