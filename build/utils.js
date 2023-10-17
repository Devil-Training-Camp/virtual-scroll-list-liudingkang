import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 解析到根路径函数
const resolve = dir => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '../', dir);
};

// 获取组件导出入口
// src/components
export function getComponentEntries(p) {
  const dirs = fs.readdirSync(resolve(p));
  const cEntries = {};
  dirs.reduce((prev, dirname) => {
    prev[dirname] = path.join(p, dirname, 'index.ts');
    return prev;
  }, cEntries);
  return cEntries;
}
