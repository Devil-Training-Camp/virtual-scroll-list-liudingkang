import { compileStringAsync } from 'sass';

export async function compileSass(code) {
  const { css } = await compileStringAsync(code);
  return css;
}
