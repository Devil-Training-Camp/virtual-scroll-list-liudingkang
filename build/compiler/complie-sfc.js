import { readFile, writeFile } from 'fs/promises';
import { parse, compileStyle } from '@vue/compiler-sfc';
import hash_sum from 'hash-sum';
import path from 'path';

import { compileSass } from './comlie-sass.js';

export async function compileSfc(filePath) {
  const source = await readFile(filePath, 'utf-8');
  const { descriptor } = parse(source, { sourceMap: false });
  const { styles } = descriptor;
  const sourceRoot = process.cwd();
  const shortFilePath = path
    .relative(sourceRoot, filePath)
    // .replace(/^(\.\.[\/\\])+/, '')
    .replace(/\\/g, '/');
  // hash 单文件路径生成 id
  const id = hash_sum(shortFilePath);
  // 检查是否存在 scoped 作用域的样式块
  const hasScope = styles.some(style => style.scoped);
  // 生成 scopedId
  const scopeId = hasScope ? `data-v-${id}` : '';
  // 处理 css
  for (const { content, lang, scoped } of styles) {
    const file = filePath.replace(/vue$/, 'css');
    // vue 编译 css
    let { code } = compileStyle({
      source: content,
      filename: file,
      id: scopeId,
      scoped,
    });
    code = lang === 'scss' ? await compileSass(code) : code;
    console.log(code);
    return writeFile(file, code.trim(), 'utf-8');
  }
}
