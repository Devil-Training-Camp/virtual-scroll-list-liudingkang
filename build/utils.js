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
export function replaceExt(path, ext = '') {
  return path.replace(/(.*)\.[^.]*$/, `$1${ext}`);
}
// export function parseVuePartRequest(id) {
//   if (!id.includes('.vue')) return;
//   const filename = id.substr(0, id.lastIndexOf('.vue') + 4);
//   const params = getVueMetaFromQuery(id);
//   if (params === null) return;
//   return {
//     filename,
//     meta: params,
//   };
// }
// export function getVueMetaFromQuery(id) {
//   const match = GET_QUERY.exec(id);
//   if (match) {
//     const query = queryString.parse(match[2]);
//     if (PARAM_NAME in query) {
//       const data = Array.isArray(query[PARAM_NAME]) ? query[PARAM_NAME][0] : query[PARAM_NAME];
//       const [type, index, lang] = data.split('.');
//       return lang
//         ? { type, lang, index: parseInt(index) } // styles.0.css
//         : { type, lang: index }; // script.js
//     }
//   }
//   return null;
// }
