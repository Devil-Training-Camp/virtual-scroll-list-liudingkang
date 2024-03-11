import path from 'path';
import { fileURLToPath } from 'url';

import { glob } from 'glob';

const EXT_RE = /(.*)\.[^.]*$/;
export const SFC_RE = /\.(vue)$/;
export const STYLE_RE = /\.(css|less|scss)$/;
export const SCRIPT_RE = /\.(js|ts|jsx|tsx)$/;

// 解析到根路径函数
export const resolve = dir => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '../../', dir);
};

// 获取导出入口
export async function getFileEntries(dir, extension) {
  const entries = await glob(`${dir}/**/*.${extension}`);
  return Object.fromEntries(
    entries.map(file => [
      path.relative('src', file.slice(0, file.length - path.extname(file).length)),
      resolve(file),
    ]),
  );
}
// 获取文件扩展名
export function getExt(filePath) {
  return path.extname(filePath);
}
// 替换文件扩展
export function replaceExt(filePath, ext = '') {
  return filePath.replace(EXT_RE, `$1${ext}`);
}
export const isSfc = path => SFC_RE.test(path);
export const isStyle = path => STYLE_RE.test(path);
export const isScript = path => SCRIPT_RE.test(path);

export function jsFileExt(format) {
  return format === 'es' ? '.mjs' : '.js';
}
