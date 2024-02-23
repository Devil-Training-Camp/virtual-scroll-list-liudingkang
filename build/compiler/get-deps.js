const IMPORT_RE =
  /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

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
