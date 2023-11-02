import { readFile, writeFile } from 'fs/promises';
import {
  parse,
  compileStyle,
  compileTemplate,
  compileScript as compileSfcScript,
} from 'vue/compiler-sfc';
import hash_sum from 'hash-sum';
import path from 'path';

import { compileSass } from './comlie-sass.js';
import { replaceExt } from '../utils.js';

const SFC_COMPONENT_NAME = '__SFC__';
const SFC_DECLAREION = `const ${SFC_COMPONENT_NAME} =`;

function injectRender(script, render) {}

function replaceExportToDeclaration(script) {
  return script.replace('export default', SFC_DECLAREION);
}

export async function compileSfc(filePath, mode) {
  let source = await readFile(filePath, 'utf-8');
  const { descriptor } = parse(source, { sourceMap: false });
  let { styles, template, script, scriptSetup } = descriptor;

  // const sourceRoot = process.cwd();
  // const shortFilePath = path
  //   .relative(sourceRoot, filePath)
  //   .replace(/^(\.\.[/\\])+/, '')
  //   .replace(/\\/g, '/');
  // // hash 单文件路径生成 id
  // const id = hash_sum(shortFilePath);

  // hash 单文件路径生成 id
  const id = hash_sum(source);
  // 检查是否存在 scoped 作用域的样式块
  const hasScope = styles.some(style => style.scoped);
  // 生成 scopedId
  const scopeId = hasScope ? `data-v-${id}` : '';
  // 处理 script
  let scriptContent = '';
  const { content, bindings } = compileSfcScript(descriptor, {
    id,
  });
  scriptContent += content;

  console.dir(descriptor, { depth: 1 });
  // 处理 template
  if (template) {
    const { code } = compileTemplate({
      id,
      source: template.content,
      filename: filePath,
      compilerOptions: {
        expressionPlugins: scopeId,
        bindingMetadata: bindings,
      },
    });
    // 将导出语句替换成声明语句
    scriptContent = replaceExportToDeclaration(scriptContent);
    // 替换掉
    // scriptContent = injectRender(scriptContent, code);
    console.dir(scriptContent, { depth: 1 });
    console.log('===========================');
    console.dir(code, { depth: 1 });
  }
  const scirptFilePath = replaceExt(filePath, '.css');
  // 处理 css
  for (const { content, lang, scoped } of styles) {
    const cssFilePath = replaceExt(filePath, '.css');
    // vue 编译 css
    let { code } = compileStyle({
      source: content,
      filename: cssFilePath,
      id: scopeId,
      scoped,
    });
    code = lang === 'scss' ? await compileSass(code) : code;
    // writeFile(outputdir + '/index.css', code.trim(), 'utf-8');
  }
}
