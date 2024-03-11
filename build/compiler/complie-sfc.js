import { readFile } from 'fs/promises';

import {
  parse,
  compileStyle as compileSfcStyle,
  compileTemplate,
  compileScript as compileSfcScript,
} from 'vue/compiler-sfc';
import hash_sum from 'hash-sum';
import fsm from 'fs-extra';

import { replaceExt } from '../common/utils.js';

import { compileScript } from './complie-script.js';
import { compileStyle } from './compile-style.js';
const { outputFile, removeSync } = fsm;
const SFC_COMPONENT_NAME = '__SFC__';
const SFC_RENDER_NAME = '__render__';
const SFC_DECLAREION = `const ${SFC_COMPONENT_NAME} =`;
const SFC_EXPORT = `export default`;

// 将 template 编译后的 render 函数注入 script 中，同时替换名称
function injectRender(script, render) {
  script = script.trim();
  render = render.replace(`export function render`, `function ${SFC_RENDER_NAME}`);
  script = script.replace(`${SFC_DECLAREION}`, `${render}\n${SFC_DECLAREION}`);
  script += `\n${SFC_COMPONENT_NAME}.render = ${SFC_RENDER_NAME}`;
  return script;
}

// 替换掉 script 编译后的 导出声明 为 变量声明
function replaceExportToDeclaration(script) {
  return script.replace('export default', SFC_DECLAREION);
}
// 注入 scopeId
function injectScopeId(script, scopeId) {
  return script + `\n${SFC_COMPONENT_NAME}.__scopeId = "${scopeId}"`;
}
// 注入 导出语句
function injectExport(script) {
  return script + `\n${SFC_EXPORT} ${SFC_COMPONENT_NAME};`;
}

export async function compileSfc(filePath, format) {
  let source = await readFile(filePath, 'utf-8');
  removeSync(filePath);
  const { descriptor } = parse(source, { sourceMap: false });
  let { styles, template, script, scriptSetup } = descriptor;
  // hash 单文件路径生成 id
  const id = hash_sum(source);
  // 检查是否存在 scoped 作用域的样式块
  const hasScope = styles.some(style => style.scoped);
  // 生成 scopeId
  const scopeId = hasScope ? `data-v-${id}` : '';
  // 处理 script
  let scriptContent = '';
  const { content, bindings } = compileSfcScript(descriptor, {
    id,
  });
  scriptContent += content;

  // console.dir(descriptor, { depth: 1 });
  // 处理 template
  if (template) {
    const { code } = compileTemplate({
      id,
      source: template.content,
      filename: filePath,
      compilerOptions: {
        scopeId,
        bindingMetadata: bindings,
      },
    });
    // 将导出语句替换成声明语句
    scriptContent = replaceExportToDeclaration(scriptContent);
    // 将 template 编译后的 render 函数注入 script 中，同时替换名称
    scriptContent = injectRender(scriptContent, code);
  }
  // 注入 scopeId
  if (scopeId) {
    scriptContent = injectScopeId(scriptContent, scopeId);
  }
  // 注入 导出语句
  scriptContent = injectExport(scriptContent);
  const scriptFilePath = replaceExt(filePath, `.${script?.lang || scriptSetup?.lang || 'js'}`);
  await outputFile(scriptFilePath, scriptContent);
  // 编译 script
  await compileScript(scriptFilePath, format);
  // console.dir(scriptContent, { depth: 1 });

  // 处理 css
  for (const { content, lang, scoped } of styles) {
    const cssFilePath = replaceExt(filePath, `.${lang}`);
    // vue 编译 css
    let { code } = compileSfcStyle({
      source: content,
      filename: cssFilePath,
      id: scopeId,
      scoped,
    });
    await outputFile(cssFilePath, code.trim(), 'utf-8');
    await compileStyle(cssFilePath);
  }
}
