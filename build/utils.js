import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// 解析到根路径函数
const resolve = dir => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '../', dir);
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
